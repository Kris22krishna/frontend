import os
import re

file_paths = [
    r'e:\LD\frontend\src\components\practice\grade-1\shapes-and-space.jsx',
    r'e:\LD\frontend\src\components\practice\grade-1\addition.jsx',
    r'e:\LD\frontend\src\components\practice\grade-1\subtraction.jsx',
    r'e:\LD\frontend\src\components\practice\grade-1\time.jsx',
    r'e:\LD\frontend\src\components\practice\grade-1\patterns.jsx',
    r'e:\LD\frontend\src\components\practice\grade-1\numbers-51-100.jsx',
    r'e:\LD\frontend\src\components\practice\grade-1\numbers-21-50.jsx',
    r'e:\LD\frontend\src\components\practice\grade-1\numbers-10-20.jsx',
    r'e:\LD\frontend\src\components\practice\grade-1\numbers-1-9.jsx',
    r'e:\LD\frontend\src\components\practice\grade-1\measurement.jsx',
    r'e:\LD\frontend\src\components\practice\grade-1\data-handling.jsx'
]

footer_template = """
                    {/* --- INJECTED FOOTER --- */}
                    <div className="g1-navigation-footer" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', width: '100%', padding: '0 20px' }}>
                        <button className="g1-nav-btn prev-btn" onClick={() => { if (qIndex > 0) setQIndex(qIndex - 1); }} disabled={qIndex === 0} style={{ padding: '15px 30px', borderRadius: '25px', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: qIndex === 0 ? 'not-allowed' : 'pointer', opacity: qIndex === 0 ? 0.5 : 1, border: '2px solid #CBD5E0', background: 'white', color: '#4A5568' }}>
                            <ChevronLeft size={24} /> Prev
                        </button>

                        {!isAnswered ? (
                            <button className="g1-nav-btn submit-btn" onClick={handleSubmit} disabled={selectedOption === null} style={{ padding: '15px 40px', borderRadius: '25px', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: selectedOption === null ? 'not-allowed' : 'pointer', opacity: selectedOption === null ? 0.5 : 1, background: '#4ECDC4', color: 'white', border: 'none', boxShadow: '0 4px 15px rgba(78, 205, 196, 0.4)' }}>
                                Submit <Check size={24} />
                            </button>
                        ) : (
                            <div style={{ display: 'flex', gap: '15px' }}>
                                {!isTest && (
                                    <button className="g1-nav-btn steps-btn" onClick={() => setShowExplanationModal(true)} style={{ padding: '15px 30px', borderRadius: '25px', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: '#FFE66D', color: '#B7950B', border: 'none', boxShadow: '0 4px 15px rgba(255, 230, 109, 0.4)' }}>
                                        <Eye size={24} /> Steps
                                    </button>
                                )}
                                <button className="g1-nav-btn next-btn" onClick={handleNext} style={{ padding: '15px 40px', borderRadius: '25px', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: '#FF6B6B', color: 'white', border: 'none', boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)' }}>
                                    {qIndex === totalQuestions - 1 ? (isTest ? 'Finish Test' : 'Finish') : 'Next'} <ChevronRight size={24} />
                                </button>
                            </div>
                        )}
                    </div>
"""

for path in file_paths:
    if not os.path.exists(path): continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove emojis in Comparing Shapes and Sizes
    replacements = [
        ('Which bar is HIGHER? 🏢', 'Which bar is HIGHER?'),
        ('Which one is SMALLER? 🐜', 'Which one is SMALLER?'),
        ('Which bar is SHORTER? 📏', 'Which bar is SHORTER?'),
        ('Pick the LONGER one! 🚀', 'Pick the LONGER one!')
    ]
    for old, new in replacements:
        content = content.replace(old, new)

    # 2. Fix ExplanationModal onNext
    content = re.sub(r'onNext=\{handleNext\}', r'onNext={() => setShowExplanationModal(false)}', content)
    
    # Check if we already patched this file
    if 'const handleSubmit = () => {' in content:
        print(f"Already patched {path}")
        continue

    # 3. Refactor handleOptionSelect
    # We find handleOptionSelect
    match = re.search(r'const handleOptionSelect = \(option\) => \{(.*?)\};', content, re.DOTALL)
    if match:
        original_body = match.group(1)
        
        # New handleOptionSelect just sets the option
        new_handle_option = r'''const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const option = selectedOption;
'''
        # We replace the original body inside handleSubmit, but remove the `setSelectedOption(option);` part
        # since it's already set. Wait, original body has `setSelectedOption(option);` or similar?
        submit_body = original_body.replace('setSelectedOption(option);', '')
        # remove `if (isAnswered) return;`
        submit_body = re.sub(r'^\s*if\s*\(\s*isAnswered\s*\)\s*return;\s*$', '', submit_body, flags=re.MULTILINE)
        
        # Add setAnswers save explicitly if not present because we need history across ALL grade-1
        # Some already have setAnswers(prev => ({ ...prev, [qIndex]: ... }))
        if 'setAnswers' not in submit_body:
            submit_body = submit_body.replace('setIsAnswered(true);', 
                "setIsAnswered(true);\n        setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption: option, isCorrect } }));")
        
        new_functions = new_handle_option + submit_body + "\n    };\n"
        
        content = content.replace(match.group(0), new_functions)
        
    # 4. Remove the old "Next Challenge" mascot block
    mascot_block_regex = r'\{isAnswered && \(\s*<div className="flex flex-col items-center gap-4 mt-8">.*?</button>\s*</div>\s*\)\}'
    content = re.sub(mascot_block_regex, footer_template, content, flags=re.DOTALL)

    # Ensure Eye is imported from lucide-react
    if 'Eye' not in content:
        content = re.sub(r'(import .*? \{.*?)(ChevronLeft)(.*?) from \'lucide-react\';', r'\1\2, Eye\3 from \'lucide-react\';', content)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Patched {path}")
