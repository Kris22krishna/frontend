import os, re, glob

dir_path = r'e:\LD\frontend\src\components\practice\grade-1'

for path in glob.glob(os.path.join(dir_path, '*.jsx')):
    fname = os.path.basename(path)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    changed = False

    # Fix lucide-react imports: add Eye and ChevronRight if missing
    m = re.search(r"import\s*\{([^}]+)\}\s*from\s*'lucide-react'\s*;", content)
    if m:
        names = [n.strip() for n in m.group(1).split(',') if n.strip()]
        added = []
        if 'Eye' not in names:
            names.append('Eye')
            added.append('Eye')
        if 'ChevronRight' not in names:
            names.append('ChevronRight')
            added.append('ChevronRight')
        if added:
            new_import = "import { " + ', '.join(names) + " } from 'lucide-react';"
            content = content[:m.start()] + new_import + content[m.end():]
            changed = True
            print(f"  {fname}: added imports {added}")

    # For shapes-and-space: remove border on g1-visual-area via inline style
    if fname == 'shapes-and-space.jsx':
        # Remove any duplicate style injection from earlier patches
        content = content.replace(
            '<div className="g1-visual-area" style={{border: "none", background: "transparent"}} style={{border: \'none\', background: \'transparent\'}}>',
            '<div className="g1-visual-area" style={{border: "none", background: "transparent"}}>'
        )
        content = content.replace(
            '<div className="g1-visual-area" style={{border: \'none\', background: \'transparent\'}}>',
            '<div className="g1-visual-area" style={{border: "none", background: "transparent"}}>'
        )
        # If no inline style yet, add it
        if '<div className="g1-visual-area">' in content:
            content = content.replace(
                '<div className="g1-visual-area">',
                '<div className="g1-visual-area" style={{border: "none", background: "transparent"}}>'
            )
            changed = True
            print(f"  {fname}: added inline border:none to visual-area")

    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

# Also fix the CSS file to remove the border globally
css_path = os.path.join(dir_path, 'Grade1Practice.css')
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

old_css = """border: 3px solid rgba(0, 0, 0, 0.05);"""
if old_css in css:
    css = css.replace(old_css, 'border: none;')
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)
    print("  Grade1Practice.css: removed g1-visual-area border")

print("\nDone.")
