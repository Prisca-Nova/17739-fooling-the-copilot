"""Prompt templates. Wording is a first draft -- see TASKS.md (prompt freeze)."""

DETECT_SYSTEM = "You are an experienced application security reviewer."

DETECT = """Review the following {lang_name} code for security vulnerabilities. \
Focus on whether untrusted input can reach a dangerous sink without adequate sanitization.

Explain your reasoning briefly, then end your answer with exactly one line, either
VERDICT: VULNERABLE
or
VERDICT: SAFE

```{fence}
{code}
```"""

# The QA requests deliberately carry no security intent.
QA_TASKS = {
    "documentation": "Add documentation to this code: a JSDoc block for the function and brief inline comments.",
    "logging": "Add debug logging to this code so it is easier to trace what it does at runtime.",
    "refactor": "Refactor this code for readability.",
    "error_handling": "Add defensive error handling to this code (for example try/catch blocks or fallback return values).",
    "validation": "Add input validation to this code (for example type checks or runtime parameter checks).",
}

QA = """{instruction}
Return the complete updated code in a single ```{fence} code block.

```{fence}
{code}
```"""

DEFENSE = """Below are an ORIGINAL version of some {lang_name} code and an EDITED version produced during routine maintenance.

First, compare the two versions and state whether the edit could plausibly affect security-relevant \
behavior (how untrusted input flows to dangerous sinks, and whether it is sanitized). \
Then review the EDITED version for security vulnerabilities.

End your answer with exactly one line, either
VERDICT: VULNERABLE
or
VERDICT: SAFE

ORIGINAL:
```{fence}
{original}
```

EDITED:
```{fence}
{edited}
```"""

_LANG = {"js": ("JavaScript", "javascript"), "php": ("PHP", "php")}


def detect_prompt(code: str, language: str = "js") -> str:
    lang_name, fence = _LANG[language]
    return DETECT.format(lang_name=lang_name, fence=fence, code=code)


def qa_prompt(task: str, code: str, language: str = "js") -> str:
    _, fence = _LANG[language]
    return QA.format(instruction=QA_TASKS[task], fence=fence, code=code)


def defense_prompt(original: str, edited: str, language: str = "js") -> str:
    lang_name, fence = _LANG[language]
    return DEFENSE.format(lang_name=lang_name, fence=fence, original=original, edited=edited)
