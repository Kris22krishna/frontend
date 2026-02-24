import os
import re

dir_path = r'e:\LD\frontend\src\components\practice\grade-1'
files = [f for f in os.listdir(dir_path) if f.endswith('.jsx')]

# The padOptions helper function to inject
pad_helper = '''
    // Ensure exactly 4 unique options
    const padOptions = (opts, correct) => {
        const unique = [...new Set(opts)];
        let next = typeof correct === 'number' ? correct + 2 : 0;
        while (unique.length < 4) {
            next++;
            if (!unique.includes(next) && next !== correct) {
                unique.push(typeof correct === 'string' ? String(next) : next);
            }
        }
        return unique.slice(0, 4).sort(() => 0.5 - Math.random());
    };

'''

for file in files:
    path = os.path.join(dir_path, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    changed = False

    # Only add padOptions if not already present
    if 'padOptions' not in content:
        # Insert right before generateQuestions
        pattern = r'(const generateQuestions = \(selectedSkill\) => \{)'
        if re.search(pattern, content):
            content = re.sub(pattern, pad_helper + r'\1', content)
            changed = True
            print(f"  {file}: added padOptions helper")
        else:
            # Try alternate pattern
            pattern2 = r'(const generateQuestions = \(\) => \{)'
            if re.search(pattern2, content):
                content = re.sub(pattern2, pad_helper + r'\1', content)
                changed = True
                print(f"  {file}: added padOptions helper (alt pattern)")

    # Now wrap existing options arrays with padOptions
    # Pattern: options: [something].filter(...).sort(...)
    # or: options: [something].sort(...)
    # or: options: ['a', 'b', 'c'].sort(...)
    # We want: options: padOptions([something].filter(...).sort(...), correct_answer)
    
    # Actually, it's simpler to just add a post-processing step after question generation.
    # After `questions.push(question);` add `question.options = padOptions(question.options, question.correct);`
    
    if 'padOptions' in content and 'padOptions(question.options' not in content:
        old_push = 'questions.push(question);'
        new_push = 'question.options = padOptions(question.options, question.correct);\n            questions.push(question);'
        content = content.replace(old_push, new_push, 1)  # Only first occurrence
        changed = True
        print(f"  {file}: added padOptions call before push")

    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

print("\n4-option padding complete.")
