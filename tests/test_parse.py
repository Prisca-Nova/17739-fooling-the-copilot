from copilot_eval.parse import extract_code, parse_verdict


def test_verdict_takes_last_line():
    text = "At first glance VERDICT: SAFE, but on reflection...\nVERDICT: VULNERABLE"
    assert parse_verdict(text) == "VULNERABLE"


def test_verdict_tolerates_markdown_and_case():
    assert parse_verdict("**Verdict:** safe") == "SAFE"
    assert parse_verdict("VERDICT: **SAFE**") == "SAFE"
    assert parse_verdict("verdict: vulnerable") == "VULNERABLE"


def test_verdict_missing():
    assert parse_verdict("I think it is probably fine.") is None


def test_extract_longest_block():
    text = "Use `x`:\n```js\nfoo();\n```\nFull code:\n```javascript\nconst a = 1;\nfoo(a);\n```"
    assert extract_code(text) == "const a = 1;\nfoo(a);\n"


def test_extract_none():
    assert extract_code("no code here") is None
