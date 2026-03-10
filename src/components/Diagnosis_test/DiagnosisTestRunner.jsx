import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, CheckCircle, Grid, AlertCircle } from 'lucide-react';
import MathRenderer from '../MathRenderer';
import DiagnosisResults from './DiagnosisResults';
import './DiagnosisTest.css';

const DiagnosisTestRunner = () => {
    const { grade } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadQuestions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let module;
            // Using more explicit imports to help bundlers
            try {
                if (grade === '1') {
                    module = await import('./Grade1/GetGrade1Question.js');
                } else if (grade === '2') {
                    module = await import('./Grade2/GetGrade2Question.mjs');
                } else if (grade === '3') {
                    module = await import('./Grade3/GetGrade3Question.mjs');
                } else if (grade === '4') {
                    module = await import('./Grade4/GetGrade4Question.mjs');
                } else if (grade === '5') {
                    module = await import('./Grade5/GetGrade5Question.mjs');
                } else if (grade === '6') {
                    module = await import('./Grade6/GetGrade6Question.mjs');
                } else if (grade === '7') {
                    module = await import('./Grade7/GetGrade7Question.mjs');
                } else if (grade === '8') {
                    module = await import('./Grade8/GetGrade8Question.mjs');
                } else if (grade === '9') {
                    module = await import('./Grade9/GetGrade9Question.mjs');
                } else if (grade === '10') {
                    module = await import('./Grade10/GetGrade10Question.mjs');
                } else {
                    throw new Error(`Grade ${grade} not supported`);
                }
            } catch (importErr) {
                console.error("Import failed:", importErr);
                setError(`Assessment for Grade ${grade} is not yet available or failed to load.`);
                setLoading(false);
                return;
            }

            const questionsObj = module.default || module;
            if (!questionsObj) throw new Error("Could not find question data in module");

            let generated = [];

            // Check if the module has a default export with categories (e.g., q1, q2...)
            const categories = Object.keys(questionsObj || {});
            const hasQuestionBank = categories.length > 0 && Array.isArray(questionsObj[categories[0]]);

            if (hasQuestionBank) {
                // Use all categories from the pre-generated question bank
                categories.forEach((key, index) => {
                    const questionList = questionsObj[key];
                    if (Array.isArray(questionList) && questionList.length > 0) {
                        const q = questionList[Math.floor(Math.random() * questionList.length)];
                        generated.push({ id: index + 1, type: key, ...q });
                    }
                });
            } else {
                // Fallback to generator map if no pre-generated bank exists
                const mapKey = `Grade${grade}GeneratorMap`;
                const generatorMap = module[mapKey] || module.Grade1GeneratorMap;

                if (generatorMap) {
                    const questionTypes = Object.keys(generatorMap).sort(() => 0.5 - Math.random());
                    generated = questionTypes.map((type, index) => {
                        const q = generatorMap[type]();
                        return { id: index + 1, type, ...q };
                    });
                }
            }

            if (generated.length === 0) throw new Error("No questions were generated");
            setQuestions(generated);
            setLoading(false);
        } catch (err) {
            console.error("Initialization error:", err);
            setError(err.message || "Failed to initialize assessment. Please try again.");
            setLoading(false);
        }
    }, [grade]);

    useEffect(() => {
        loadQuestions();
    }, [loadQuestions]);

    useEffect(() => {
        if (loading || isSubmitted || questions.length === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    setIsSubmitted(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [loading, isSubmitted, questions.length]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAnswer = (val) => {
        if (!questions[currentIndex]) return;
        // Store only the value if it's an object, otherwise store the value directly
        const answerValue = typeof val === 'object' ? (val.value || val.label) : val;
        setAnswers({ ...answers, [questions[currentIndex].id]: answerValue });
    };

    const handleUserInput = (e) => {
        const val = e.target.value;
        setAnswers({ ...answers, [questions[currentIndex].id]: val });
    };

    const handleTableInputChange = (rowIdx, key, val) => {
        const currentQId = questions[currentIndex].id;
        const currentTableAnswers = answers[currentQId] || {};
        const updatedRow = { ...(currentTableAnswers[rowIdx] || {}), [key]: val };

        setAnswers({
            ...answers,
            [currentQId]: {
                ...currentTableAnswers,
                [rowIdx]: updatedRow
            }
        });
    };

    const handleFactorTreeChange = (nodeId, val) => {
        const currentQId = questions[currentIndex].id;
        const currentTreeAnswers = answers[currentQId] || {};

        setAnswers({
            ...answers,
            [currentQId]: {
                ...currentTreeAnswers,
                [nodeId]: val
            }
        });
    };

    const renderFactorTree = (node, x, y, level, parentX, parentY) => {
        const hGap = 160 / (level + 1);
        const vGap = 80;
        const radius = 25;
        const currentQId = questions[currentIndex].id;
        const currentAnswers = answers[currentQId] || {};

        return (
            <g key={node.id}>
                {parentX !== undefined && (
                    <line
                        x1={parentX} y1={parentY + radius}
                        x2={x} y2={y - radius}
                        stroke="#cbd5e1" strokeWidth="2"
                    />
                )}
                <circle
                    cx={x} cy={y} r={radius}
                    fill={node.isInput ? "#fff" : "#f1f5f9"}
                    stroke={node.isInput ? "#4f46e5" : "#cbd5e1"}
                    strokeWidth="2"
                />
                {node.isInput ? (
                    <foreignObject x={x - 20} y={y - 15} width="40" height="30">
                        <input
                            type="text"
                            className="w-full h-full text-center font-bold text-sm focus:outline-none border-b-2 border-indigo-200 focus:border-indigo-600 transition-colors"
                            value={currentAnswers[node.id] || ''}
                            onChange={(e) => handleFactorTreeChange(node.id, e.target.value)}
                        />
                    </foreignObject>
                ) : (
                    <text
                        x={x} y={y + 5}
                        textAnchor="middle"
                        className="font-bold fill-slate-700 text-sm"
                    >
                        {node.val}
                    </text>
                )}
                {node.children && node.children.map((child, idx) => {
                    const childX = idx === 0 ? x - hGap : x + hGap;
                    const childY = y + vGap;
                    return renderFactorTree(child, childX, childY, level + 1, x, y);
                })}
            </g>
        );
    };

    const handleSubmit = () => setIsSubmitted(true);

    const calculateScore = () => {
        let score = 0;
        questions.forEach(q => {
            const userAnswer = answers[q.id];

            if (q.type === 'tableInput') {
                try {
                    const expected = JSON.parse(q.answer);
                    // Check if all keys match
                    let allCorrect = true;
                    Object.keys(expected).forEach(rowIdx => {
                        Object.keys(expected[rowIdx]).forEach(key => {
                            if (String(userAnswer?.[rowIdx]?.[key]) !== String(expected[rowIdx][key])) {
                                allCorrect = false;
                            }
                        });
                    });
                    if (allCorrect && userAnswer) score++;
                } catch (e) {
                    console.error("Error parsing table answer:", e);
                }
            } else if (q.type === 'factorTree') {
                try {
                    const expected = JSON.parse(q.answer);
                    let allCorrect = true;
                    Object.keys(expected).forEach(nodeId => {
                        if (String(userAnswer?.[nodeId]) !== String(expected[nodeId])) {
                            allCorrect = false;
                        }
                    });
                    if (allCorrect && userAnswer) score++;
                } catch (e) {
                    console.error("Error parsing factor tree answer:", e);
                }
            } else {
                if (userAnswer === q.answer) score++;
            }
        });
        return score;
    };

    if (loading) {
        return (
            <div className="diagnosis-runner flex items-center justify-center min-h-screen bg-slate-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-slate-600 font-bold text-lg animate-pulse">Preparing Grade {grade} Assessment...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="diagnosis-runner flex items-center justify-center min-h-screen bg-slate-50">
                <div className="max-w-md p-10 bg-white rounded-3xl shadow-2xl text-center border border-slate-100">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Initialization Error</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed font-medium">{error}</p>
                    <button
                        onClick={() => navigate('/diagnosis-test')}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                        Try Different Grade
                    </button>
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="diagnosis-runner flex items-center justify-center min-h-screen bg-slate-50">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 font-bold">No questions were found for Grade {grade}.</p>
                    <button onClick={() => navigate('/diagnosis-test')} className="mt-4 text-indigo-600 font-extrabold hover:underline">Select Another Grade</button>
                </div>
            </div>
        );
    }

    const q = questions[currentIndex];
    if (!q) return null;

    if (isSubmitted) {
        return (
            <DiagnosisResults
                score={calculateScore()}
                total={questions.length}
                grade={grade}
                onRetake={() => {
                    setIsSubmitted(false);
                    setAnswers({});
                    setCurrentIndex(0);
                    setTimeLeft(30 * 60);
                    loadQuestions();
                }}
            />
        );
    }


    return (
        <div className="diagnosis-runner min-h-screen font-sans">
            <header className="cbt-header shadow-md px-10 h-20">
                <div className="flex items-center gap-4">
                    <span className="font-extrabold text-2xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        Diagnosis Test • Grade {grade}
                    </span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="timer-box font-mono px-5 py-2">
                        <Clock size={22} />
                        <span className="text-xl">{formatTime(timeLeft)}</span>
                    </div>
                    <button
                        className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                        onClick={handleSubmit}
                    >
                        Submit Test
                    </button>
                </div>
            </header>

            <div className="cbt-layout max-w-[1600px] mx-auto">
                <main className="question-area border border-slate-100 min-h-[600px] flex flex-col">
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-sm font-black text-indigo-600 uppercase tracking-widest px-4 py-2 bg-indigo-50 rounded-lg">
                                Question {currentIndex + 1} / {questions.length}
                            </span>
                            <span className="text-slate-400 font-medium text-sm">
                                {q.type}
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-slate-800 leading-snug">
                            <MathRenderer text={q.question} />
                        </div>
                        {(q.img || q.image) && (
                            <div className="mt-6 flex justify-center bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
                                {(typeof (q.img || q.image) === 'string' && (q.img || q.image).includes('<svg')) ? (
                                    <div
                                        className="max-h-64 flex items-center justify-center svg-container"
                                        dangerouslySetInnerHTML={{ __html: (q.img || q.image) }}
                                    />
                                ) : (
                                    <img
                                        src={q.img || q.image}
                                        alt="Question Visual"
                                        className="max-h-64 object-contain rounded-lg shadow-sm"
                                        onError={(e) => {
                                            console.error("Image failed to load:", q.img || q.image);
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    <div className="space-y-4 flex-1">
                        {q.type === 'userInput' ? (
                            <div className="mt-4">
                                <label className="block text-sm font-bold text-slate-500 mb-2 uppercase tracking-tight">Your Answer</label>
                                <input
                                    type="text"
                                    autoFocus
                                    className="w-full text-3xl font-bold p-6 border-4 border-slate-100 rounded-2xl focus:border-indigo-600 focus:outline-none transition-all placeholder:text-slate-200"
                                    placeholder="Enter your answer here..."
                                    value={answers[q.id] || ''}
                                    onChange={handleUserInput}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && currentIndex < questions.length - 1) {
                                            setCurrentIndex(currentIndex + 1);
                                        }
                                    }}
                                />
                                <p className="mt-4 text-slate-400 font-medium italic">Type your answer above and press Enter to go to the next question.</p>
                            </div>
                        ) : q.type === 'tableInput' ? (
                            <div className="mt-6 overflow-x-auto pb-6">
                                <table className="w-full border-collapse bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-black tracking-widest">
                                            {q.headers?.map((header, i) => (
                                                <th key={i} className="p-5 text-left border-b border-slate-100">{header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {q.rows.map((row, rowIdx) => (
                                            <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="p-5 border-b border-slate-50">
                                                    <div className="flex flex-col gap-3">
                                                        <span className="font-bold text-slate-800 text-lg">{row.text}</span>
                                                        {row.image && (
                                                            row.image.startsWith('<svg') ? (
                                                                <div
                                                                    className="w-24 h-24 bg-white rounded-xl border border-slate-100 p-2 flex items-center justify-center"
                                                                    dangerouslySetInnerHTML={{ __html: row.image }}
                                                                />
                                                            ) : (
                                                                <img src={row.image} alt={row.text} className="w-24 h-24 object-contain bg-white rounded-xl border border-slate-100 p-2" />
                                                            )
                                                        )}
                                                    </div>
                                                </td>
                                                {q.inputKeys?.map((key, kIdx) => (
                                                    <td key={kIdx} className="p-5 border-b border-slate-50">
                                                        <input
                                                            type="number"
                                                            className="w-full p-4 border-2 border-slate-100 rounded-xl focus:border-indigo-600 focus:outline-none transition-all font-bold text-xl text-center placeholder:text-slate-200"
                                                            placeholder={q.placeholders?.[kIdx] || "0"}
                                                            value={answers[q.id]?.[rowIdx]?.[key] || ''}
                                                            onChange={(e) => handleTableInputChange(rowIdx, key, e.target.value)}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="mt-6 text-slate-400 font-medium italic text-center">Fill in each cell of the table to complete the question.</p>
                            </div>
                        ) : q.type === 'factorTree' ? (
                            <div className="mt-6 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm overflow-x-auto overflow-y-visible">
                                <svg width="600" height="400" className="mx-auto overflow-visible">
                                    {renderFactorTree(q.tree, 300, 40, 0)}
                                </svg>
                                <p className="mt-8 text-slate-400 font-medium italic text-center border-t border-slate-50 pt-6">Fill in the missing numbers in the factor tree branches.</p>
                            </div>
                        ) : (
                            q.options && q.options.map((opt, idx) => {
                                const optValue = typeof opt === 'object' ? (opt.value || opt.label) : opt;
                                const isSelected = answers[q.id] === optValue;

                                return (
                                    <div
                                        key={idx}
                                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-5 group ${isSelected ? 'border-indigo-600 bg-indigo-50/50 shadow-md' : 'border-slate-100 hover:border-indigo-200 bg-white'}`}
                                        onClick={() => handleAnswer(opt)}
                                    >
                                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 group-hover:border-indigo-300'}`}>
                                            {isSelected && <div className="w-3 h-3 bg-white rounded-full"></div>}
                                        </div>
                                        <span className={`text-xl font-semibold transition-colors flex flex-col gap-2 ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                                            {opt.image ? (
                                                <img
                                                    src={opt.image}
                                                    alt={opt.label || "Option"}
                                                    className="max-h-32 object-contain rounded-lg"
                                                    onError={(e) => {
                                                        console.error("Option image failed to load:", opt.image);
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <MathRenderer text={opt} />
                                            )}
                                        </span>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between">
                        <button
                            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${currentIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-50'}`}
                            onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
                            disabled={currentIndex === 0}
                        >
                            <ChevronLeft size={24} /> Previous
                        </button>
                        <button
                            className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-extrabold text-lg transition-all active:scale-95 ${currentIndex === questions.length - 1 ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200' : 'bg-slate-50 text-indigo-600 hover:bg-indigo-50 border-2 border-transparent hover:border-indigo-100'}`}
                            onClick={() => currentIndex < questions.length - 1 ? setCurrentIndex(currentIndex + 1) : handleSubmit()}
                        >
                            {currentIndex === questions.length - 1 ? 'Last Question' : 'Next Question'} <ChevronRight size={24} />
                        </button>
                    </div>
                </main>

                <aside className="palette-area border border-slate-100 flex flex-col sticky top-24">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-slate-50 rounded-lg">
                            <Grid size={24} className="text-slate-500" />
                        </div>
                        <h3 className="font-black text-xl text-slate-800 uppercase tracking-tight">Question Grid</h3>
                    </div>
                    <div className="palette-grid flex-1">
                        {questions.map((_, idx) => (
                            <button
                                key={idx}
                                className={`palette-btn text-lg h-12 w-12 rounded-xl transition-all hover:scale-105 active:scale-95 ${currentIndex === idx ? 'active shadow-lg shadow-indigo-200 ring-4 ring-indigo-50' : answers[questions[idx].id] ? 'answered' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                                onClick={() => setCurrentIndex(idx)}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 space-y-4 pt-8 border-t border-slate-100">
                        <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                            <div className="w-4 h-4 rounded-md bg-indigo-600"></div>
                            <span>Current View</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                            <div className="w-4 h-4 rounded-md" style={{ backgroundColor: '#dcfce7', border: '1px solid #bbf7d0' }}></div>
                            <span>Answered</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold text-slate-600">
                            <div className="w-4 h-4 rounded-md" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}></div>
                            <span>Not Started</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DiagnosisTestRunner;
