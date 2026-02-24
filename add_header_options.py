import os
import re

dir_path = r'e:\LD\frontend\src\components\practice\grade-1'
files = [f for f in os.listdir(dir_path) if f.endswith('.jsx')]

for file in files:
    path = os.path.join(dir_path, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    changed = False

    # 1. Add a compact topic header between the progress bar and question card.
    #    Currently: <div className="g1-progress-container" ...>...</div>
    #              <motion.div key={qIndex} ...>
    #    We want:   <div className="g1-progress-container" ...>...</div>
    #              <div className="g1-topic-header-compact">topicName</div>
    #              <motion.div key={qIndex} ...>
    
    # Check if compact header already exists
    if 'g1-topic-header-compact' not in content:
        # Find the pattern: progress bar followed by motion.div
        pattern = r'(</div>\s*\n\s*<motion\.div key=\{qIndex\})'
        replacement = r'''</div>
                <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>{topicName}</div>
                <motion.div key={qIndex}'''
        
        new_content = re.sub(pattern, replacement, content, count=1)
        if new_content != content:
            content = new_content
            changed = True
            print(f"  {file}: added compact topic header")

    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

print("\nTopic header addition complete.")
