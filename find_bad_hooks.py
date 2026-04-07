import os
import re

base_dir = r"d:\learners\latest_version\frontend\src\components\practice"

# Let's find files where useSessionLogger() is called outside the component
hook_regex = re.compile(r"const \{ startSession, logAnswer, finishSession \} = useSessionLogger\(\);.*?(const v4AnswersPayload = useRef\(\[\]\);.*?const v4IsFinishedRef = useRef\(false\);)", re.DOTALL)

comp_regex = re.compile(r"(const [A-Z][a-zA-Z0-9]*\s*=\s*\([^)]*\)\s*=>\s*\{|function [A-Z][a-zA-Z0-9]*\s*\([^)]*\)\s*\{)")

bad_files = []

for root, _, files in os.walk(base_dir):
    for f in files:
        if f.endswith('.jsx'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            hook_match = hook_regex.search(content)
            if hook_match:
                comp_match = comp_regex.search(content)
                if comp_match:
                    if hook_match.start() < comp_match.start():
                        bad_files.append(path)

print(f"Found {len(bad_files)} files where the hook is called outside the component.")
for idx, p in enumerate(bad_files):
    if idx < 10:
        print(p)
