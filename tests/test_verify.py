import shutil
from pathlib import Path

import pytest

from copilot_eval.stubs import load_stubs
from copilot_eval.verify import verify_code

pytestmark = pytest.mark.skipif(shutil.which("node") is None, reason="node not installed")

STUBS = Path(__file__).resolve().parents[1] / "stubs" / "js"


@pytest.mark.parametrize("stub", load_stubs(STUBS), ids=lambda s: s.id)
def test_stub_labels_match_verifier(stub):
    result = verify_code(stub.code, stub.vuln_class)
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
