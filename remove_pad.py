import os
import re

dir_path = r'e:\LD\frontend\src\components\practice\grade-1'
files = [f for f in os.listdir(dir_path) if f.endswith('.jsx')]

for file in files:
    path = os.path.join(dir_path, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Remove the padOptions helper function block
    content = re.sub(
        r'\n\s*// Ensure exactly 4 unique options\s*\n\s*const padOptions = \(opts, correct\) => \{[\s\S]*?\};\s*\n',
        '\n',
        content
    )

    # Remove the padOptions call before questions.push
    content = content.replace(
        'question.options = padOptions(question.options, question.correct);\n            questions.push(question);',
        'questions.push(question);'
    )

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  {file}: removed padOptions")

print("Done.")
