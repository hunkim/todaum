from pathlib import Path
import json
import zipfile

root = Path(__file__).resolve().parent
public = root.parent / "public"
manifest = json.loads((root / "manifest.json").read_text())
version = manifest["version"]
out = public / f"ToDaum-{version}.zip"
public.mkdir(exist_ok=True)
# drop old unversioned / previous zips so only current is served
for old in public.glob("ToDaum-*.zip"):
    old.unlink()
legacy = public / "todaum-chrome.zip"
if legacy.exists():
    legacy.unlink()

with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for p in sorted(root.rglob("*")):
        if not p.is_file():
            continue
        rel = p.relative_to(root)
        if rel.parts[0] in {"store"} or rel.name == "pack.py":
            continue
        z.write(p, Path("ToDaum") / rel)
print(out.name, out.stat().st_size)
