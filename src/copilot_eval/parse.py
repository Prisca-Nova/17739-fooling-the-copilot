"""Extracting verdicts and code from model responses."""

import re

_VERDICT = re.compile(r"VERDICT\s*:\s*\**\s*(VULNERABLE|SAFE)\b", re.IGNORECASE)
_FENCE = re.compile(r"```[ \t]*([A-Za-z0-9_+-]*)[ \t]*\r?\n(.*?)```", re.DOTALL)


def parse_verdict(text: str) -> str | None:
    """Return 'VULNERABLE' or 'SAFE' from the last VERDICT line, or None if absent."""
    matches = _VERDICT.findall(text or "")
    return matches[-1].upper() if matches else None


def extract_code(text: str) -> str | None:
    """Return the longest fenced code block in the response, or None if there is none."""
    blocks = [m.group(2) for m in _FENCE.finditer(text or "")]
    if not blocks:
        return None
    return max(blocks, key=len).rstrip() + "\n"
