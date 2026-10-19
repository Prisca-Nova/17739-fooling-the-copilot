"""Loading hand-built stubs and their ground-truth metadata."""

import json
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Stub:
    id: str
    vuln_class: str          # xss | cmdi | path
    label: str               # vulnerable | safe
    language: str
    code: str
    path: Path
    source_key: str = "input"
    base_dir: str = "/srv/app/public"

    @property
    def is_vulnerable(self) -> bool:
        return self.label == "vulnerable"


def load_stubs(stubs_dir: str | Path) -> list[Stub]:
    """Load every `<id>.js` that has a sibling `<id>.meta.json`, sorted by id."""
    stubs = []
    for meta_path in sorted(Path(stubs_dir).rglob("*.meta.json")):
        meta = json.loads(meta_path.read_text(encoding="utf-8"))
        ext = "php" if meta.get("language") == "php" else "js"
        code_path = meta_path.with_name(meta_path.name.replace(".meta.json", f".{ext}"))
        stubs.append(
            Stub(
                id=meta["id"],
                vuln_class=meta["vuln_class"],
                label=meta["label"],
                language=meta.get("language", "js"),
                code=code_path.read_text(encoding="utf-8"),
                path=code_path,
                source_key=meta.get("source_key", "input"),
                base_dir=meta.get("base_dir", "/srv/app/public"),
            )
        )
    return stubs
