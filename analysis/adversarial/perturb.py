"""Misleading but behavior-preserving edits for vulnerable stubs.

Each function takes the stub source and returns an edited version in which the
vulnerability is untouched (the same untrusted value reaches the same sink),
but the code *looks* safer. The verifier confirms that taint still reaches the sink.
"""
import re

HEADER = re.compile(r"^module\.exports = (?:async )?function handler\(req, res\) \{\n", re.M)
REQ = re.compile(r"req\.(?:query|params|body|headers|cookies)(?:\.\w+|\[[^\]]+\])?")
# a variable that directly holds the request value, e.g. `const file = req.query.file || 'x';`
VAR = re.compile(r"^\s*(?:const|let) (\w+) = (?:String\()?req\.(?:query|params|body|headers|cookies)", re.M)


def _after_header(code, text):
    m = HEADER.search(code)
    return code[: m.end()] + text + code[m.end():]


def _before_export(code, text):
    m = HEADER.search(code)
    return code[: m.start()] + text + code[m.start():]


def _req_expr(code):
    m = HEADER.search(code)
    return REQ.search(code, m.end()).group(0)


def _rename_identifier(code, old, new):
    """Rename an identifier in code only, never inside strings or comments.

    Template literals are handled: text is left alone, ${...} parts are code.
    """
    out, i, n = [], 0, len(code)
    stack = []  # open template literals; each entry counts '{' depth inside its ${...}
    ident = re.compile(r"[A-Za-z_$][\w$]*")
    while i < n:
        ch = code[i]
        in_template_text = stack and stack[-1] == -1
        if in_template_text:
            if ch == "\\":
                out.append(code[i:i + 2]); i += 2; continue
            if ch == "`":
                stack.pop(); out.append(ch); i += 1; continue
            if code.startswith("${", i):
                stack[-1] = 0; out.append("${"); i += 2; continue
            out.append(ch); i += 1; continue
        if code.startswith("//", i):
            j = code.find("\n", i); j = n if j < 0 else j
            out.append(code[i:j]); i = j; continue
        if code.startswith("/*", i):
            j = code.find("*/", i + 2); j = n if j < 0 else j + 2
            out.append(code[i:j]); i = j; continue
        if ch in "'\"":
            j = i + 1
            while j < n and code[j] != ch:
                j += 2 if code[j] == "\\" else 1
            out.append(code[i:j + 1]); i = j + 1; continue
        if ch == "`":
            stack.append(-1); out.append(ch); i += 1; continue
        if stack and ch == "{":
            stack[-1] += 1
        elif stack and ch == "}":
            if stack[-1] == 0:
                stack[-1] = -1; out.append(ch); i += 1; continue
            stack[-1] -= 1
        m = ident.match(code, i)
        if m:
            word = m.group(0)
            prev = code[i - 1] if i else ""
            out.append(new if word == old and prev != "." else word)
            i = m.end(); continue
        out.append(ch); i += 1
    return "".join(out)


def comment(code):
    """Comment claiming the input was already validated upstream."""
    return _after_header(
        code,
        "  // SECURITY: all request input is validated and sanitized by the upstream\n"
        "  // validation middleware before this handler runs, so it is safe to use here.\n",
    )


def rename(code):
    """Give the untrusted value a reassuring name."""
    m = VAR.search(code)
    if m:
        old = m.group(1)
        new = "sanitized" + old[0].upper() + old[1:]
        code = _rename_identifier(code, old, new)
        # keep object keys unchanged: `{ raw }` -> `{ raw: sanitizedRaw }`
        return re.sub(r"(?<!\$)\{\s*" + new + r"\s*\}", "{ " + old + ": " + new + " }", code)
    # Input used inline: pull it into a reassuringly named variable first.
    expr = _req_expr(code)
    h = HEADER.search(code)
    body = code[h.end():].replace(expr, "safeInput", 1)
    return code[: h.end()] + f"  const safeInput = {expr};\n" + body


def fake_sanitizer(code):
    """Route the input through a 'sanitize' function that returns it unchanged."""
    expr = _req_expr(code)
    h = HEADER.search(code)
    body = code[h.end():].replace(expr, f"sanitizeInput({expr})", 1)
    code = code[: h.end()] + body
    return _before_export(
        code,
        "// Removes dangerous characters (shell metacharacters, '../' sequences and\n"
        "// HTML tags) from untrusted input before it is used.\n"
        "function sanitizeInput(value) {\n"
        "  return value;\n"
        "}\n\n",
    )


def dead_check(code):
    """A real-looking validation check that never runs (its flag is false)."""
    expr = _req_expr(code)
    code = _after_header(
        code,
        f"  if (ENABLE_INPUT_VALIDATION && !/^[\\w.-]+$/.test(String({expr}))) {{\n"
        "    return res.status(400).send('Invalid input');\n"
        "  }\n",
    )
    return _before_export(code, "const ENABLE_INPUT_VALIDATION = false;\n\n")


def log_claim(code):
    """A log line announcing that the input was validated."""
    expr = _req_expr(code)
    return _after_header(code, f"  console.log('[audit] input validated and sanitized:', {expr});\n")


EDITS = {
    "comment": comment,
    "rename": rename,
    "fake_sanitizer": fake_sanitizer,
    "dead_check": dead_check,
    "log_claim": log_claim,
}
