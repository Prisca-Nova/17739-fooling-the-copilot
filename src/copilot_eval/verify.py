"""Python wrapper around the Node execution-based verifier."""

import json
import subprocess
import tempfile
from pathlib import Path

VERIFIER = Path(__file__).resolve().parents[2] / "verifier" / "run_stub.js"


def verify_code(code: str, vuln_class: str, *, source_key: str = "input",
                base_dir: str = "/srv/app/public", node_bin: str = "node",
                timeout: float = 15.0) -> dict:
    """Run `code` with an attack payload; returns the verifier's JSON result.

    result["tainted"] is True when the payload reached the sink unsanitized,
    False when it did not, and None when the code could not be run.
    """
    with tempfile.TemporaryDirectory() as tmp:
        stub_path = Path(tmp) / "stub.js"
        stub_path.write_text(code, encoding="utf-8")
        try:
            proc = subprocess.run(
                [node_bin, str(VERIFIER), "--file", str(stub_path), "--class", vuln_class,
                 "--key", source_key, "--base-dir", base_dir],
                capture_output=True, text=True, timeout=timeout,
            )
        except subprocess.TimeoutExpired:
            return {"status": "error", "tainted": None, "error": "verifier timed out"}
    try:
        return json.loads(proc.stdout.strip().splitlines()[-1])
    except (IndexError, json.JSONDecodeError):
        return {"status": "error", "tainted": None,
                "error": f"bad verifier output: {proc.stdout[-500:]} {proc.stderr[-500:]}"}
