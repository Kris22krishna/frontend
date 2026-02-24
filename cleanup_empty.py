import os
import re

dir_path = r'e:\LD\frontend\src\components\practice\grade-1'
files = [f for f in os.listdir(dir_path) if f.endswith('.jsx')]

for file in files:
    path = os.path.join(dir_path, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Remove empty conditional blocks like: {qIndex > 0 && (\n)}
    content = re.sub(r'\{qIndex > 0 && \(\s*\)\}', '', content)

    # Also remove any leftover empty lines around the removal
    content = re.sub(r'\n{3,}', '\n\n', content)

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  {file}: cleaned up empty conditional block")

print("Cleanup complete.")
