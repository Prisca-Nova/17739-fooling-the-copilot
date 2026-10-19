"""Manual-review folders: QA edits the verifier could not run, and model refusals.

Each case is one Markdown file with a checkbox that reviewers tick by hand.
Case files are never overwritten once created, so manual notes are safe;
CHECKLIST.md is regenerated from the case files' checkboxes.
"""

import json
import re
from pathlib import Path

CATEGORIES = {
    "unverifiable": ("Unverifiable QA edits", "Reviewed"),
    "refusals": ("Model refusals", "Investigated"),
}

_CHECKED = re.compile(r"^- \[[xX]\] (Reviewed|Investigated)", re.MULTILINE)
_FIELD = re.compile(r"^- (Manual result|Resolution):[ \t]*(.*)$", re.MULTILINE)


class ReviewWriter:
    def __init__(self, root: str | Path, run_name: str):
        self.root = Path(root) / run_name
        self.run_name = run_name

    def _write_case(self, category: str, case_id: str, body: str) -> Path:
        path = self.root / category / f"{case_id}.md"
        path.parent.mkdir(parents=True, exist_ok=True)
        if not path.exists():
            path.write_text(body, encoding="utf-8")
        return path

    def unverifiable(self, record: dict, original_code: str, fence: str = "javascript") -> Path:
        case_id = f"{record['stub_id']}__{record['qa_task']}__r{record['repeat']}"
        reason = record.get("verifier_error") or ("no code block in QA response" if record.get("outcome") == "no_code"
                                                 else "verifier could not run the edited code")
        body = f"""# Unverifiable: {record['stub_id']} / {record['qa_task']} / repeat {record['repeat']}

- Run: `{self.run_name}`
- Model: `{record['provider']}:{record['model']}`
- Original label: **{record['label']}** ({record['vuln_class']})
- Reason: {reason}
- Model re-evaluation verdict: {record.get('reeval_verdict')}

## Manual check

Does the attack input still reach the sink unsanitized in the EDITED code?

- [ ] Reviewed
- Manual result: <!-- tainted | not tainted | broken code -->
- Reviewer:
- Notes:

## Original code

```{fence}
{original_code.rstrip()}
```

## Edited code

```{fence}
{(record.get('edited_code') or '(none)').rstrip()}
```

## QA response (raw)

```text
{(record.get('qa_response') or '').rstrip()}
```
"""
        return self._write_case("unverifiable", case_id, body)

    def refusal(self, record: dict, step: str, prompt: str, response_text: str, details) -> Path:
        case_id = f"{record['stub_id']}__{record['qa_task']}__{step}__r{record['repeat']}"
        body = f"""# Refusal: {record['stub_id']} / {record['qa_task']} / {step} / repeat {record['repeat']}

- Run: `{self.run_name}`
- Model: `{record['provider']}:{record['model']}`
- Step refused: **{step}**
- Original label: {record['label']} ({record['vuln_class']})
- Stop details: `{json.dumps(details, default=str)}`

## Tracking

- [ ] Investigated
- Resolution: <!-- excluded | rerun ok | prompt changed | accepted as data -->
- Notes:

## Prompt

````text
{prompt.rstrip()}
````

## Response (partial, if any)

```text
{(response_text or '').rstrip()}
```
"""
        return self._write_case("refusals", case_id, body)

    def write_index(self) -> Path | None:
        return write_index(self.root)


def write_index(run_dir: str | Path) -> Path | None:
    """Regenerate CHECKLIST.md for one run's review folder from the case files."""
    run_dir = Path(run_dir)
    sections, total, done = [], 0, 0
    for category, (title, verb) in CATEGORIES.items():
        cases = sorted((run_dir / category).glob("*.md"))
        if not cases:
            continue
        rows, n_done = [], 0
        for case in cases:
            text = case.read_text(encoding="utf-8")
            checked = bool(_CHECKED.search(text))
            field = _FIELD.search(text)
            value = re.sub(r"<!--.*?-->", "", field.group(2)).strip() if field else ""
            rows.append(f"| [{'x' if checked else ' '}] | [{case.stem}]({category}/{case.name}) | {value} |")
            n_done += checked
        total += len(rows)
        done += n_done
        sections.append(f"## {title} ({n_done}/{len(rows)} {verb.lower()})\n\n| {verb} | Case | Result |\n|---|---|---|\n"
                        + "\n".join(rows))
    if not sections:
        return None
    index = run_dir / "CHECKLIST.md"
    index.write_text(f"# Manual review checklist: `{run_dir.name}`\n\n**{done}/{total} done.** "
                     "Tick the checkbox inside each case file, then run "
                     f"`python -m copilot_eval review-index {run_dir.as_posix()}` to refresh this page.\n\n"
                     + "\n\n".join(sections) + "\n", encoding="utf-8")
    return index
