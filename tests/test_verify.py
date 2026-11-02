import shutil
from pathlib import Path

import pytest

from copilot_eval.stubs import load_stubs
from copilot_eval.verify import verify_code

pytestmark = pytest.mark.skipif(shutil.which("node") is None, reason="node not installed")

STUBS = Path(__file__).resolve().parents[1] / "stubs"
ALL_STUBS = load_stubs(STUBS / "examples") + load_stubs(STUBS / "js")


@pytest.mark.parametrize("stub", ALL_STUBS, ids=lambda s: s.id)
def test_stub_labels_match_verifier(stub):
    result = verify_code(stub.code, stub.vuln_class, source_key=stub.source_key, base_dir=stub.base_dir)
    assert result["status"] == "ok", result
    assert result["tainted"] is stub.is_vulnerable


def test_try_catch_does_not_fix_xss():
    # The judgment-flip example from the pitch: wrapping the sink in try/catch.
    code = """
module.exports = function handler(req, res) {
  try { res.send(req.query.input); }
  catch (e) { res.status(500).send('error'); }
};
"""
    assert verify_code(code, "xss")["tainted"] is True


def test_logging_does_not_fix_and_is_captured():
    code = """
const { exec } = require('child_process');
module.exports = function handler(req, res) {
  console.log('running for', req.query.input);
  exec('wc -l ' + req.query.input, () => res.send('ok'));
};
"""
    result = verify_code(code, "cmdi")
    assert result["tainted"] is True
    assert result["logs"]


def test_esm_export_is_supported():
    code = "export default function handler(req, res) { res.send(req.body.input); }\n"
    assert verify_code(code, "xss")["tainted"] is True


def test_unknown_module_is_an_error_not_a_verdict():
    code = "const v = require('validator');\nmodule.exports = (req, res) => res.send(req.query.input);\n"
    result = verify_code(code, "xss")
    assert result["status"] == "error"
    assert result["tainted"] is None


def test_spawn_with_options_as_second_argument():
    code = """
const { spawn } = require('child_process');
module.exports = function handler(req, res) {
  spawn('git log ' + req.query.input, { shell: true });
  res.send('ok');
};
"""
    assert verify_code(code, "cmdi")["tainted"] is True


def test_quoting_without_escaping_is_still_injectable():
    # Seen in a real QA edit: wrapping the input in quotes does not stop a quote breakout.
    for quote in ("'", '"'):
        code = f"""
const {{ exec }} = require('child_process');
module.exports = function handler(req, res) {{
  exec(`du -sh {quote}${{req.query.input}}{quote}`, () => res.send('ok'));
}};
"""
        assert verify_code(code, "cmdi")["tainted"] is True, quote


def test_correct_single_quote_escaping_is_safe():
    code = r"""
const { exec } = require('child_process');
function shellQuote(s) { return "'" + String(s).replace(/'/g, "'\\''") + "'"; }
module.exports = function handler(req, res) {
  exec('du -sh ' + shellQuote(req.query.input), () => res.send('ok'));
};
"""
    result = verify_code(code, "cmdi")
    assert result["status"] == "ok" and result["tainted"] is False, result


def test_invalid_child_process_arguments_are_errors_not_fixes():
    # Seen in a real QA edit: spawn([...]) throws in Node; it must not count as a fix.
    code = """
const { spawn } = require('child_process');
module.exports = function handler(req, res) {
  const proc = spawn(['git', 'log', req.params.input], { shell: false });
  proc.on('close', () => res.send('ok'));
};
"""
    result = verify_code(code, "cmdi")
    assert result["status"] == "error" and result["tainted"] is None
    assert "must be of type string" in result["error"]
