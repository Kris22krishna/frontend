import os
import re

dir_path = r'e:\LD\frontend\src\components\practice\grade-1'
files = [f for f in os.listdir(dir_path) if f.endswith('.jsx')]

footer_template = '''
                    {/* --- INJECTED FOOTER V2 --- */}
                    <div className="g1-navigation-footer" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', width: '100%', padding: '0 20px' }}>
                        <button className="g1-nav-btn prev-btn" onClick={() => { if (qIndex > 0) setQIndex(qIndex - 1); }} disabled={qIndex === 0} style={{ padding: '15px 30px', borderRadius: '25px', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: qIndex === 0 ? 'not-allowed' : 'pointer', opacity: qIndex === 0 ? 0.5 : 1, border: '2px solid #CBD5E0', background: 'white', color: '#4A5568' }}>
                            <ChevronLeft size={24} /> Prev
                        </button>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            {isAnswered && !isTest && !answers[qIndex]?.isCorrect && (
                                <button className="g1-nav-btn steps-btn" onClick={() => setShowExplanationModal(true)} style={{ padding: '15px 30px', borderRadius: '25px', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: '#FFE66D', color: '#B7950B', border: 'none', boxShadow: '0 4px 15px rgba(255, 230, 109, 0.4)' }}>
                                    <Eye size={24} /> Steps
                                </button>
                            )}

                            {!isAnswered ? (
                                <button className="g1-nav-btn next-btn" onClick={handleSubmit} disabled={selectedOption === null} style={{ padding: '15px 40px', borderRadius: '25px', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: selectedOption === null ? 'not-allowed' : 'pointer', opacity: selectedOption === null ? 0.5 : 1, background: '#4ECDC4', color: 'white', border: 'none', boxShadow: '0 4px 15px rgba(78, 205, 196, 0.4)' }}>
                                    Next <ChevronRight size={24} />
                                </button>
                            ) : (
                                <button className="g1-nav-btn next-btn" onClick={handleNext} style={{ padding: '15px 40px', borderRadius: '25px', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: '#FF6B6B', color: 'white', border: 'none', boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)' }}>
                                    {qIndex === totalQuestions - 1 ? (isTest ? 'Finish Test' : 'Finish') : 'Next Question'} <ChevronRight size={24} />
                                </button>
                            )}
                        </div>
                    </div>
'''

submit_replacer = r'''
    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const option = selectedOption;

        setIsAnswered(true);
        const isCorrect = option === sessionQuestions[qIndex].correct;
        // --- AUTO-INJECTED LOGGING ---
        try {
            const uid = user?.user_id || user?.id || sessionStorage.getItem('userId') || localStorage.getItem('userId');
            const qData = sessionQuestions[qIndex] || {};
            const skId = typeof selectedSkill !== 'undefined' ? selectedSkill : (typeof skillId !== 'undefined' ? skillId : '0');
            const currentTimer = typeof timer !== 'undefined' ? timer : 0;
            
            if (uid && sessionId) {
                api.recordAttempt({
                    user_id: parseInt(uid, 10),
                    session_id: sessionId,
                    skill_id: parseInt(skId, 10) || 0,
                    template_id: null,
                    difficulty_level: 'Medium',
                    question_text: String(qData.text || ''),
                    correct_answer: String(qData.correct || qData.correctAnswer || ''),
                    student_answer: String(option),
                    is_correct: isCorrect,
                    solution_text: String(qData.explanation || qData.solution || ''),
                    time_spent_seconds: currentTimer
                }).catch(err => console.error("Auto-log failed:", err));
            }
        } catch(err) {
            console.error("Auto-log error:", err);
        }
        // -----------------------------

        if (isCorrect) {
            setScore(s => s + 1);
        }

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option,
                isCorrect,
                questionText: sessionQuestions[qIndex].text,
                correctAnswer: sessionQuestions[qIndex].correct,
                explanation: sessionQuestions[qIndex].explanation || "Here is the explanation."
            }
        }));
        
        // Auto advance if correct, or show modal if incorrect
        if (!isTest && !isCorrect) {
            setShowExplanationModal(true);
        } else {
            // Give a tiny delay so they see the option highlight green
            setTimeout(() => {
                handleNext();
            }, 800);
        }
    };
'''

for file in files:
    path = os.path.join(dir_path, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the old handleSubmit block and replace it
    content = re.sub(r'const handleSubmit = \(\) => \{[\s\S]*?setShowExplanationModal\s*\(\s*true\s*\)\s*;\s*\}?\s*\};', submit_replacer.strip(), content)
    
    # Actually wait, `setShowExplanationModal(true)` might have been stripped of the enclosing if(!isTest) {} if it was empty block.
    # So let's fall back to looking for "const handleSubmit = () => { ... " until "const handleSkip" or "const handleNext".
    # Since earlier I replaced it, it might be simpler to just regex until the next function definition:
    content = re.sub(r'const handleSubmit = \(\) => \{[\s\S]*?(?=const handleNext|const handleSkip|const formatTime)', submit_replacer + '\n\n', content)

    # Replace old footer with V2 footer
    content = re.sub(r'\{\/\* --- INJECTED FOOTER --- \*\/\}[\s\S]*?</div>\s*</motion\.div>', footer_template.strip() + '\n                </motion.div>', content)

    # Shapes and space fix
    if file == 'shapes-and-space.jsx':
        content = content.replace('<div className="g1-visual-area">', '<div className="g1-visual-area" style={{border: "none", background: "transparent"}}>')
        content = content.replace('className="position-visual"', 'className="position-visual" style={{border: "none"}}')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Grade 1 UI patched.")
