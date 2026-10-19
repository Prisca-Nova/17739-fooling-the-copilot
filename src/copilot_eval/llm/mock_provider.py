"""Deterministic offline provider for tests and dry runs. Makes no network calls."""

import re

from .base import ChatResult, LLMProvider

_CODE = re.compile(r"```[a-z]*\n(.*?)```", re.DOTALL)
_SAFE_MARKERS = ("try {", "escapeHtml", ".test(", "startsWith(")


class MockProvider(LLMProvider):
    """Says SAFE when the code contains a recognizable sanitizer or a try block
    (mimicking the pitch's judgment-flip example), and VULNERABLE otherwise.
    QA requests for error handling wrap the body in try/catch; other QA
    requests add a comment."""

    name = "mock"

    def chat(self, messages, system=None):
        prompt = messages[-1]["content"]
        blocks = _CODE.findall(prompt)
        code = blocks[-1] if blocks else ""
        if "VERDICT" in prompt:
            verdict = "SAFE" if any(m in code for m in _SAFE_MARKERS) else "VULNERABLE"
            text = f"Mock review.\nVERDICT: {verdict}"
        elif "error handling" in prompt:
            text = "```javascript\n" + _wrap_in_try(code) + "```"
        else:
            text = "```javascript\n// reviewed\n" + code + "```"
        return ChatResult(text=text, assistant_message={"role": "assistant", "content": text}, stop_reason="end_turn")


def _wrap_in_try(code: str) -> str:
    """Wrap the body of `module.exports = function handler(req, res) { ... };` in try/catch."""
    head, sep, rest = code.partition("function handler(req, res) {\n")
    if not sep:
        return code
    body, _, tail = rest.rpartition("};")
    return f"{head}{sep}  try {{\n{body}  }} catch (e) {{\n    res.status(500).send('error');\n  }}\n}};{tail}"
