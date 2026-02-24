import os
import re

dir_path = r'e:\LD\frontend\src\components\practice\grade-1'
files = [f for f in os.listdir(dir_path) if f.endswith('.jsx')]

for file in files:
    path = os.path.join(dir_path, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    changed = False

    # 1. Remove the Back button block:
    #    <button className="g1-back-btn" onClick={() => navigate('/junior/grade/1')}>
    #        <ChevronLeft size={20} /> Back
    #    </button>
    back_btn_pattern = r'\s*<button className="g1-back-btn"[^>]*>[\s\S]*?</button>\s*'
    if re.search(back_btn_pattern, content):
        content = re.sub(back_btn_pattern, '\n', content)
        changed = True
        print(f"  {file}: removed back button")

    # 2. Remove the separate topic-skill-header section:
    #    <div className="g1-topic-skill-header">
    #        <span className="g1-topic-name">{topicName}</span>
    #        <h1 className="g1-skill-name">...</h1>
    #    </div>
    topic_header_pattern = r'\s*<div className="g1-topic-skill-header">[\s\S]*?</div>\s*'
    if re.search(topic_header_pattern, content):
        content = re.sub(topic_header_pattern, '\n', content)
        changed = True
        print(f"  {file}: removed topic-skill-header block")

    # 3. Replace the question counter div to include the skill name inline:
    # Old:
    #    <div style={{ fontWeight: 400, color: '#666', ... }}>
    #        Question {qIndex + 1} of {totalQuestions}
    #    </div>
    # New: Question count + skill name inline
    old_q_counter = r"<div style=\{\{ fontWeight: 400, color: '#666'.*?\}\}>\s*Question \{qIndex \+ 1\} of \{totalQuestions\}\s*</div>"
    new_q_counter = '''<div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
                            Q {qIndex + 1}/{totalQuestions}
                        </span>
                        <span style={{ fontWeight: 400, color: '#2D3436', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <LatexText text={skillName} />
                        </span>
                    </div>'''

    if re.search(old_q_counter, content, re.DOTALL):
        content = re.sub(old_q_counter, new_q_counter, content, flags=re.DOTALL)
        changed = True
        print(f"  {file}: merged title into question counter")

    # 4. Reduce progress bar margin:
    old_progress = "style={{ margin: '0 0 30px 0' }}"
    new_progress = "style={{ margin: '0 0 10px 0' }}"
    if old_progress in content:
        content = content.replace(old_progress, new_progress)
        changed = True
        print(f"  {file}: reduced progress bar margin")

    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

print("\nHeader compaction complete.")
