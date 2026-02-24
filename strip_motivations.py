import os
import re

dir_path = r'e:\LD\frontend\src\components\practice\grade-1'
files = [f for f in os.listdir(dir_path) if f.endswith('.jsx')]

for file in files:
    path = os.path.join(dir_path, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. Strip setMotivation calls. This matches `setMotivation(...)` or `setMotivation(null)` potentially spanning multiple lines.
    # Note: re.sub is tricky with nested braces, so we will be careful.
    content = re.sub(r'setMotivation\([\s\S]*?\);', '', content)
    
    # 2. Also strip `if (isCorrect) { \n setScore... \n } else { \n }` where else is now empty due to stripping.
    content = content.replace('} else {\n            \n        }', '}')
    content = content.replace('} else {\n        }', '}')

    # 3. Strip const MOTIVATIONS = [...]
    content = re.sub(r'const MOTIVATIONS\s*=\s*\[[\s\S]*?\];', '', content)
    
    # 4. Strip const [motivation, setMotivation] = useState(null);
    content = re.sub(r'const\s*\[\s*motivation\s*,\s*setMotivation\s*\]\s*=\s*useState\([^)]*\);?', '', content)
    
    # Let's clean up any empty if(!isTest) {} blocks
    content = re.sub(r'if\s*\(\!isTest\)\s*\{\s*\}', '', content)

    if content != original_content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Patched {file}")

print("Done stripping motivations.")
