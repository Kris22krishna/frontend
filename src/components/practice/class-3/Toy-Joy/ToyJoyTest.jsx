import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, Clock } from 'lucide-react';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import '../../../../pages/juniors/grade3/time-goes-ontest.css';
import mascotImg from '../../../../assets/mascot.png';

const SKILL_ID = 3020;
const SKILL_NAME = 'Toy Joy - Chapter Test';

const generateQuestions = () => {
    return [
        // TJ-01: Identifying 3D Shapes
        {
            id: 1,
            text: 'Which 3D shape has a pointed top and one flat circular base?',
            options: ['Cube', 'Cylinder', 'Cone', 'Sphere'],
            correctAnswer: 'Cone',
            solution: 'A cone has exactly ONE flat circular base at the bottom and a pointed tip at the top. An ice-cream cone and a birthday cap are real-life examples.'
        },
        {
            id: 2,
            text: 'Which shape looks like a ball and has NO flat faces at all?',
            options: ['Cylinder', 'Cuboid', 'Cube', 'Sphere'],
            correctAnswer: 'Sphere',
            solution: 'A sphere is perfectly round with only a curved surface — it has no flat faces and no edges. A football and a globe are spheres.'
        },
        // TJ-02: Counting Shapes in a Model
        {
            id: 3,
            text: "Jaya's rocket uses 1 cone, 1 cylinder, and 3 cuboids. How many shapes does she use in total?",
            options: ['3', '4', '5', '6'],
            correctAnswer: '5',
            solution: '1 cone + 1 cylinder + 3 cuboids = 1 + 1 + 3 = 5 shapes in total.'
        },
        {
            id: 4,
            text: "A model uses 2 cones, 1 cylinder, and 3 cuboids. How many shapes are used in total?",
            options: ['4', '5', '6', '7'],
            correctAnswer: '6',
            solution: '2 cones + 1 cylinder + 3 cuboids = 2 + 1 + 3 = 6 shapes in total.'
        },
        // TJ-03: Describing Position
        {
            id: 5,
            text: 'In a stack of shapes, the cylinder is on top of the cuboid. Where is the cuboid?',
            options: ['On top of the cylinder', 'Under the cylinder', 'Next to the cylinder', 'Between two cylinders'],
            correctAnswer: 'Under the cylinder',
            solution: 'If the cylinder is ON TOP of the cuboid, then the cuboid must be UNDER the cylinder. "On top of" and "under" are opposite position words.'
        },
        {
            id: 6,
            text: 'A cone is placed ON TOP of a cylinder. Where is the cylinder?',
            options: ['Above the cone', 'Next to the cone', 'Under the cone', 'Inside the cone'],
            correctAnswer: 'Under the cone',
            solution: 'If the cone is on top of the cylinder, the cylinder is UNDER the cone. The cone sits above and the cylinder supports it from below.'
        },
        // TJ-04: Properties of 3D Shapes
        {
            id: 7,
            text: 'How many flat faces does a cube have?',
            options: ['4', '5', '6', '8'],
            correctAnswer: '6',
            solution: 'A cube has exactly 6 flat faces — top, bottom, front, back, left and right. All 6 faces are equal squares.'
        },
        {
            id: 8,
            text: 'Which 3D shape has NO edges and NO vertices (corners)?',
            options: ['Cube', 'Cuboid', 'Cone', 'Sphere'],
            correctAnswer: 'Sphere',
            solution: 'A sphere has no edges and no corners (vertices) — it is a perfectly smooth round shape with only one curved surface.'
        },
        // TJ-05: Classifying Shapes
        {
            id: 9,
            text: 'Devika puts a cylinder, cone, and sphere in one group. What do they have in common?',
            options: ['All have only flat faces', 'All have curved surfaces', 'All have 6 faces', 'All have 8 corners'],
            correctAnswer: 'All have curved surfaces',
            solution: 'Cylinder, Cone, and Sphere all have at least one curved surface. Cube and Cuboid are the shapes with ONLY flat faces.'
        },
        {
            id: 10,
            text: 'A die (dice) and a sugar cube belong to which shape group?',
            options: ['Cylinder', 'Cuboid', 'Cube', 'Sphere'],
            correctAnswer: 'Cube',
            solution: 'A die and a sugar cube are both shaped like a CUBE — all 6 faces are equal squares of the same size.'
        },
        // TJ-06: Opposite Faces of a Cube
        {
            id: 11,
            text: 'On a standard die, opposite faces always add up to 7. What number is opposite to face showing 2?',
            options: ['3', '4', '5', '6'],
            correctAnswer: '5',
            solution: 'Opposite faces of a die always sum to 7. So face showing 2 is opposite to 7 - 2 = 5.'
        },
        // TJ-07: Building and Combining Shapes
        {
            id: 12,
            text: 'What shape do you get when you join 3 cubes in a row?',
            options: ['A bigger cube', 'A sphere', 'A longer cuboid', 'A cylinder'],
            correctAnswer: 'A longer cuboid',
            solution: 'When you join 3 cubes in a row, you get a LONGER CUBOID — it still has 6 flat rectangular faces, but is now wider than it is tall.'
        },
        {
            id: 13,
            text: 'Jaya stacks 2 cubes on top of each other. What shape is formed?',
            options: ['A taller cube', 'A cylinder', 'A cuboid', 'A cone'],
            correctAnswer: 'A cuboid',
            solution: 'When 2 cubes are stacked, the combined shape is a CUBOID (taller than a single cube). Joining box shapes always gives another box-shaped (cuboid) result.'
        },
        // TJ-08: Sequencing Model Construction
        {
            id: 14,
            text: "To build Jaya's rocket (cuboid base, cylinder middle, cone top), which shape should be placed FIRST?",
            options: ['Cone', 'Cylinder', 'Sphere', 'Cuboid'],
            correctAnswer: 'Cuboid',
            solution: 'When building a model, always start from the BASE (bottom). The cuboid is the base of the rocket, so it is placed FIRST on the ground.'
        },
        {
            id: 15,
            text: 'In a model: "Cylinder is ON the cuboid, cone is ON the cylinder." What is the CORRECT order from bottom to top?',
            options: [
                'Cone → Cylinder → Cuboid',
                'Cuboid → Cone → Cylinder',
                'Cylinder → Cuboid → Cone',
                'Cuboid → Cylinder → Cone'
            ],
            correctAnswer: 'Cuboid → Cylinder → Cone',
            solution: 'The description says: cylinder is ON the cuboid (so cuboid is below cylinder), cone is ON the cylinder (so cylinder is below cone). Bottom to top: Cuboid → Cylinder → Cone.'
        },
    ];
};

const ToyJoyTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({});
    const questionStartTime = useRef(Date.now());
    const [sessionId, setSessionId] = useState(null);
    const [questions] = useState(generateQuestions());

    useEffect(() => {
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            api.createPracticeSession(uid, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
        }
    }, []);

    useEffect(() => {
        if (isTestOver) return;
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, [isTestOver]);

    const handleRecordResponse = () => {
        const currentQ = questions[qIndex];
        const isCorrect = selectedOption ? selectedOption === currentQ.correctAnswer : null;
        const timeSpent = Math.round((Date.now() - questionStartTime.current) / 1000);
        const isSkipped = !selectedOption;
        const responseData = { selectedOption, isCorrect, timeTaken: (responses[qIndex]?.timeTaken || 0) + timeSpent, isSkipped };
        setResponses(prev => ({ ...prev, [qIndex]: responseData }));
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const attemptData = {
                user_id: uid, session_id: sessionId, skill_id: SKILL_ID,
                question_text: currentQ.text, correct_answer: currentQ.correctAnswer,
                student_answer: isSkipped ? 'SKIPPED' : selectedOption,
                is_correct: isSkipped ? false : isCorrect,
                solution_text: currentQ.solution, time_spent_seconds: timeSpent
            };
            api.recordAttempt(attemptData).catch(console.error);
        }
    };

    const navigateToQuestion = (targetIndex) => {
        handleRecordResponse();
        setQIndex(targetIndex);
        setSelectedOption(responses[targetIndex]?.selectedOption || null);
        questionStartTime.current = Date.now();
    };

    const handleNext = () => {
        if (qIndex < questions.length - 1) { navigateToQuestion(qIndex + 1); }
        else { handleRecordResponse(); finalizeTest(); }
    };

    const handlePrev = () => { if (qIndex > 0) navigateToQuestion(qIndex - 1); };

    const finalizeTest = async () => {
        setIsTestOver(true);
        if (sessionId) await api.finishSession(sessionId).catch(console.error);
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const correctCount = Object.values(responses).filter(r => r.isCorrect === true).length;
            const wrongCount = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
            const skippedCount = questions.length - correctCount - wrongCount;
            await api.createReport({
                title: SKILL_NAME, type: 'practice',
                score: (correctCount / questions.length) * 100,
                parameters: { skill_id: SKILL_ID, total_questions: questions.length, correct_answers: correctCount, skipped_questions: skippedCount, time_taken_seconds: timeElapsed },
                user_id: uid
            }).catch(console.error);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (questions.length === 0) return <div>Loading...</div>;

    if (isTestOver) {
        const correct = Object.values(responses).filter(r => r.isCorrect === true).length;
        const wrong = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
        const skipped = questions.length - correct - wrong;
        return (
            <div className="junior-practice-page grey-selection-theme result-page-wrapper" style={{ background: '#FFF8F0', minHeight: '100vh', overflowY: 'auto' }}>
                <div className="exam-report-container">
                    <div className="results-hero-section flex flex-col items-center mb-8 mt-4">
                        <img src={mascotImg} alt="Happy Mascot" className="w-40 h-40 mb-2 drop-shadow-lg object-contain" />
                        <h1 className="text-5xl font-black text-[#31326F] mb-2 tracking-tight text-center">Test Report</h1>
                        <p className="text-[#64748B] text-xl font-medium mb-8 text-center px-4">How you performed in <span className="font-bold">{SKILL_NAME}</span></p>
                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-5xl">
                            <div className="stat-card bg-[#FFF3E0] p-6 rounded-3xl shadow-sm border-2 border-[#FFE0B2] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#FF9800] mb-1">Score</span>
                                <span className="text-4xl font-black text-[#E65100]">{Math.round((correct / questions.length) * 100)}%</span>
                            </div>
                            <div className="stat-card bg-[#F0FDF4] p-6 rounded-3xl shadow-sm border-2 border-[#DCFCE7] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#22C55E] mb-1">Correct</span>
                                <span className="text-4xl font-black text-[#14532D]">{correct}</span>
                            </div>
                            <div className="stat-card bg-[#FEF2F2] p-6 rounded-3xl shadow-sm border-2 border-[#FEE2E2] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#EF4444] mb-1">Wrong</span>
                                <span className="text-4xl font-black text-[#7F1D1D]">{wrong}</span>
                            </div>
                            <div className="stat-card bg-[#F8FAFC] p-6 rounded-3xl shadow-sm border-2 border-[#E2E8F0] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#64748B] mb-1">Skipped</span>
                                <span className="text-4xl font-black text-[#334155]">{skipped}</span>
                            </div>
                            <div className="stat-card bg-[#FFF3E0] p-6 rounded-3xl shadow-sm border-2 border-[#FFE0B2] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#FF9800] mb-1">Total Time</span>
                                <span className="text-4xl font-black text-[#E65100]">{formatTime(timeElapsed)}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                        <button onClick={() => navigate(-1)} className="bg-white text-[#31326F] border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase tracking-wider hover:bg-[#31326F] hover:text-white transition-colors" style={{ fontSize: '1.1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                            Back to Topics
                        </button>
                    </div>
                    <div style={{ marginBottom: '2rem', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1E293B', marginBottom: '1.5rem' }}>Detailed Review &amp; Solutions</h2>
                        {questions.map((q, idx) => {
                            const res = responses[idx] || { isSkipped: true, timeTaken: 0 };
                            return (
                                <details key={idx} className="solution-accordion group">
                                    <summary className="solution-header cursor-pointer hover:bg-slate-50 transition-colors" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, overflow: 'hidden' }}>
                                            <span style={{ fontWeight: '800', minWidth: '32px', height: '32px', background: '#FF9800', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.9rem', flexShrink: 0 }}>{idx + 1}</span>
                                            <div className="hidden md:block truncate text-sm text-slate-500" style={{ flex: 1, maxWidth: '350px' }}><LatexText text={q.text} /></div>
                                            {res.isSkipped ? <span className="status-badge status-skipped shrink-0">Skipped</span> : res.isCorrect ? <span className="status-badge status-correct shrink-0">Correct</span> : <span className="status-badge status-wrong shrink-0">Incorrect</span>}
                                        </div>
                                        <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-orange-500 font-semibold text-sm whitespace-nowrap">Check Solution ↓</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {res.timeTaken}s</div>
                                        </div>
                                    </summary>
                                    <div className="solution-content">
                                        <div style={{ marginBottom: '1rem', padding: '1rem', borderLeft: '4px solid #FF9800', background: '#FFF8F0' }}><LatexText text={q.text} /></div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                            {q.options.map((opt, oIdx) => (
                                                <div key={oIdx} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', background: opt === q.correctAnswer ? '#DCFCE7' : (opt === res.selectedOption ? '#FEE2E2' : 'white'), color: opt === q.correctAnswer ? '#166534' : (opt === res.selectedOption ? '#991B1B' : '#475569') }}>
                                                    <LatexText text={opt} />
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Your Answer</h5>
                                                {res.isSkipped ? <span style={{ color: '#F59E0B', fontWeight: '700', fontSize: '1.1rem' }}>Skipped</span> : <span style={{ color: res.isCorrect ? '#166534' : '#DC2626', fontWeight: '700', fontSize: '1.1rem' }}>{res.selectedOption ? <LatexText text={res.selectedOption} /> : 'Skipped'}</span>}
                                            </div>
                                            <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Correct Answer</h5>
                                                <span style={{ color: '#166534', fontWeight: '700', fontSize: '1.1rem' }}><LatexText text={q.correctAnswer} /></span>
                                            </div>
                                        </div>
                                        <div style={{ background: '#FFF3E0', padding: '1.5rem', borderRadius: '12px', border: '1px solid #FFE0B2' }}>
                                            <h4 style={{ color: '#E65100', fontWeight: '800', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Solution:</h4>
                                            <LatexText text={q.solution} />
                                        </div>
                                    </div>
                                </details>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="junior-practice-page grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <header className="junior-practice-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', alignItems: 'center', padding: '0 2rem', gap: '1rem', background: 'linear-gradient(135deg, #FFF3E0, #FFCCBC)' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E65100', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>🧸 {SKILL_NAME}</div>
                <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border-2 border-[#FF9800]/30 text-[#E65100] font-black text-xl shadow-lg">{qIndex + 1} / {questions.length}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#FF9800]/30 text-[#E65100] font-bold text-lg shadow-md flex items-center gap-2">
                        <Clock size={20} /> {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>
            <main className="practice-content-wrapper" style={{ flex: 1, padding: '1rem 2rem 1rem 2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="practice-board-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '2rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'stretch', width: '100%', flex: 1, minHeight: 0 }}>
                    <div className="practice-left-col" style={{ width: '100%', minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className="question-card-modern test-card-layout" style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', borderTop: '4px solid #FF9800' }}>
                            <div className="question-header-modern">
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', maxHeight: 'none', fontWeight: '500', color: '#2D3748', lineHeight: '1.5', marginBottom: '1rem' }}>
                                    <LatexText text={questions[qIndex].text} />
                                </h2>
                            </div>
                            <div className="interaction-area-modern" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div className="options-grid-modern" style={{ display: 'grid', gap: '0.75rem', width: '100%', maxWidth: '800px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                    {questions[qIndex].options.map((option, idx) => (
                                        <button key={idx} className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`} onClick={() => setSelectedOption(option)}>
                                            <LatexText text={option} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="question-palette-container" style={{ width: '300px', background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', border: '2px solid #FFE0B2', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 220px)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#E65100', marginBottom: '1rem', textAlign: 'center', flexShrink: 0 }}>🧸 Question Palette</h3>
                        <div className="palette-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem', flex: 1, alignContent: 'start' }}>
                            {questions.map((_, idx) => {
                                const isCurrent = qIndex === idx;
                                const hasResponded = responses[idx] && !responses[idx].isSkipped;
                                const isSkipped = responses[idx] && responses[idx].isSkipped;
                                let btnBg = '#F8FAFC', btnColor = '#64748B', btnBorder = '1px solid #E2E8F0';
                                if (isCurrent) { btnBorder = '2px solid #FF9800'; btnBg = '#FFF3E0'; btnColor = '#E65100'; }
                                else if (hasResponded) { btnBg = '#DCFCE7'; btnColor = '#166534'; btnBorder = '1px solid #BBF7D0'; }
                                else if (isSkipped) { btnBg = '#FFF7ED'; btnColor = '#C2410C'; btnBorder = '1px solid #FFEDD5'; }
                                return (
                                    <button key={idx} onClick={() => navigateToQuestion(idx)} style={{ height: '36px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', background: btnBg, color: btnColor, border: btnBorder, padding: '0' }} className="hover:shadow-md hover:-translate-y-0.5">{idx + 1}</button>
                                );
                            })}
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '0.5rem', columnGap: '1rem', fontSize: '0.8rem', color: '#64748B' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#DCFCE7', border: '1px solid #BBF7D0' }}></div> Answered</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#FFF7ED', border: '1px solid #FFEDD5' }}></div> Skipped</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}></div> Unvisited</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#FFF3E0', border: '2px solid #FF9800' }}></div> Current</div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="junior-bottom-bar" style={{ background: 'linear-gradient(135deg, #FFF3E0, #FFCCBC)' }}>
                <div className="desktop-footer-controls">
                    <div className="bottom-left"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit Test</button></div>
                    <div className="bottom-right">
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handlePrev} disabled={qIndex === 0}><ChevronLeft size={20} /> Previous</button>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext}>{qIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'} <ChevronRight size={20} /></button>
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls">
                    <button className="nav-pill-next-btn nav-pastel-btn" style={{ padding: '0.5rem 1rem' }} onClick={handlePrev} disabled={qIndex === 0}><ChevronLeft size={24} /></button>
                    <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext} style={{ flex: 1 }}>{qIndex === questions.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={24} /></button>
                </div>
            </footer>
        </div>
    );
};

export default ToyJoyTest;
