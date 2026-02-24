import os
import re

directories = [
    r'e:\LD\frontend\src\components\practice\grade-1',
    r'e:\LD\frontend\src\components\practice\class-2',
    r'e:\LD\frontend\src\components\practice\class-3'
]

log_template = """
        // --- AUTO-INJECTED LOGGING ---
        try {
            const uid = user?.user_id || user?.id || sessionStorage.getItem('userId') || localStorage.getItem('userId');
            const qData = sessionQuestions[qIndex] || (typeof currentQ !== 'undefined' ? currentQ : (typeof currentQuestion !== 'undefined' ? currentQuestion : {}));
            const skId = typeof selectedSkill !== 'undefined' ? selectedSkill : (typeof skillId !== 'undefined' ? skillId : (typeof SKILL_ID !== 'undefined' ? SKILL_ID : '0'));
            const currentTimer = typeof timer !== 'undefined' ? timer : (typeof timeElapsed !== 'undefined' ? timeElapsed : 0);
            
            if (uid && sessionId) {
                api.recordAttempt({
                    user_id: parseInt(uid, 10),
                    session_id: sessionId,
                    skill_id: parseInt(skId, 10) || 0,
                    template_id: null,
                    difficulty_level: 'Medium',
                    question_text: String(qData.text || ''),
                    correct_answer: String(qData.correct || qData.correctAnswer || ''),
                    student_answer: String(typeof option !== 'undefined' ? option : (typeof selectedOption !== 'undefined' ? selectedOption : 'Skipped')),
                    is_correct: isCorrect,
                    solution_text: String(qData.explanation || qData.solution || ''),
                    time_spent_seconds: currentTimer
                }).catch(err => console.error("Auto-log failed:", err));
            }
        } catch(err) {
            console.error("Auto-log error:", err);
        }
        // -----------------------------
"""

files_modified = 0

for d in directories:
    for root, dirs, files in os.walk(d):
        for f in files:
            if f.endswith('.jsx'):
                path = os.path.join(root, f)
                with open(path, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                # Check if it already has recordAttempt
                if 'api.recordAttempt' in content:
                    continue

                original_content = content
                
                # Replace in handleOptionSelect where isCorrect is defined
                # Some files have: const isCorrect = ...;
                # We want to insert right after it
                
                # We also need to make sure we don't insert it multiple times.
                if '// --- AUTO-INJECTED LOGGING ---' in content:
                    continue
                    
                pattern = re.compile(r'(const\s+isCorrect\s*=\s*[^;]+;)')
                
                if pattern.search(content):
                    content = pattern.sub(r'\g<1>' + log_template, content)
                    if content != original_content:
                        with open(path, 'w', encoding='utf-8') as file:
                            file.write(content)
                        files_modified += 1
                        print(f'Modified {path}')

print(f'Total files modified: {files_modified}')
