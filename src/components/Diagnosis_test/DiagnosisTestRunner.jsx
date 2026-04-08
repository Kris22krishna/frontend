import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, CheckCircle, Grid, AlertCircle, X } from 'lucide-react';
import MathRenderer from '../MathRenderer';
import DiagnosisResults from './DiagnosisResults';
import './DiagnosisTest.css';
import { useViolationTracker } from './violation/useViolation';
import ViolationWarning from './violation/ViolationWarning';
import { api } from '../../services/api';

const generateFactorTreeResultsSVG = (tree, userAnswers, correctAnswers) => {
    const getNodes = (n, x, y, level, answersToShow) => {
        const hGap = 120 / Math.pow(1.6, level);
        const vGap = 80;
        const radius = 25;
        let content = "";

        if (n.children) {
            n.children.forEach((child, idx) => {
                const cx = idx === 0 ? x - hGap : x + hGap;
                const cy = y + vGap;
                content += `<line x1="${x}" y1="${y + radius}" x2="${cx}" y2="${cy - radius}" stroke="#cbd5e1" stroke-width="2" />`;
                content += getNodes(child, cx, cy, level + 1, answersToShow);
            });
        }

        content += `<circle cx="${x}" cy="${y}" r="${radius}" fill="${n.isInput ? "#fff" : "#f1f5f9"}" stroke="${n.isInput ? "#4f46e5" : "#cbd5e1"}" stroke-width="2" />`;

        const displayVal = n.isInput ? (answersToShow[n.id] || "?") : n.val;
        content += `<text x="${x}" y="${y + 5}" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="14" fill="#334155">${displayVal}</text>`;

        return content;
    };

    return `
    <svg width="100%" height="auto" viewBox="0 0 1000 450" xmlns="http://www.w3.org/2000/svg" style="background:white; border-radius:1rem; max-width:1000px; display:block; margin:auto;">
        <rect width="100%" height="100%" fill="#fff" />
        <text x="250" y="40" text-anchor="middle" font-family="Arial" font-weight="900" font-size="20" fill="#6366f1">YOUR TREE</text>
        ${getNodes(tree, 250, 100, 0, userAnswers)}
        <line x1="500" y1="30" x2="500" y2="420" stroke="#f1f5f9" stroke-width="4" stroke-dasharray="10 5" />
        <text x="750" y="40" text-anchor="middle" font-family="Arial" font-weight="900" font-size="20" fill="#10b981">CORRECT TREE</text>
        ${getNodes(tree, 750, 100, 0, correctAnswers)}
    </svg>`;
};

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
    const [startTime, setStartTime] = useState(null);
    const [showGrid, setShowGrid] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const STORAGE_KEY = `diagnosis_test_g${grade}`;

    const maxViolations = 3;
    const {
        violationCount,
        showWarning,
        violationMessage,
        dismissWarning,
        requestFullscreen,
    } = useViolationTracker(maxViolations);

    useEffect(() => {
        if (violationCount >= maxViolations && !isSubmitted && !submitting) {
            handleSubmit();
        }
    }, [violationCount, isSubmitted, submitting]);

    useEffect(() => {
        if (!loading && !isSubmitted && questions.length > 0) {
            requestFullscreen();
        }
    }, [loading, isSubmitted, questions.length]);

    const loadQuestions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Check for existing state in localStorage first
            const savedState = localStorage.getItem(STORAGE_KEY);
            if (savedState) {
                try {
                    const parsed = JSON.parse(savedState);
                    if (parsed.questions && parsed.questions.length > 0) {
                        const savedStartTime = parsed.startTime || Date.now();
                        const elapsedSeconds = Math.floor((Date.now() - savedStartTime) / 1000);
                        const realTimeLeft = Math.max(0, (30 * 60) - elapsedSeconds);

                        setQuestions(parsed.questions);
                        setAnswers(parsed.answers || {});
                        setCurrentIndex(parsed.currentIndex || 0);
                        setStartTime(savedStartTime);

                        if (parsed.isSubmitted || realTimeLeft === 0) {
                            setTimeLeft(0);
                            setIsSubmitted(true);
                        } else {
                            setTimeLeft(realTimeLeft);
                            setIsSubmitted(false);
                        }

                        setLoading(false);
                        return; // Successfully restored, skip loading new questions
                    }
                } catch (e) {
                    console.error("Failed to parse saved state:", e);
                    localStorage.removeItem(STORAGE_KEY);
                }
            }

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
            setStartTime(Date.now());
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

    // Save state to localStorage whenever it changes
    useEffect(() => {
        if (!loading && questions.length > 0) {
            const stateToSave = {
                questions,
                answers,
                currentIndex,
                timeLeft,
                startTime,
                isSubmitted,
                lastUpdated: Date.now()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        }
    }, [questions, answers, currentIndex, timeLeft, startTime, isSubmitted, loading, STORAGE_KEY]);

    useEffect(() => {
        if (loading || isSubmitted || questions.length === 0 || !startTime) return;

        const timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const remaining = Math.max(0, (30 * 60) - elapsed);

            setTimeLeft(remaining);

            if (remaining <= 0 && !isSubmitted && !submitting) {
                clearInterval(timer);
                handleSubmit();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [loading, isSubmitted, questions.length, startTime]);

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
        const hGap = 120 / Math.pow(1.6, level);
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

    const handleSubmit = () => {
        if (submitting || isSubmitted) return;

        setSubmitting(true);

        let results;
        try {
            results = calculateDetailedResults();
        } catch (err) {
            console.error('Error calculating results:', err);
            setIsSubmitted(true);
            setSubmitting(false);
            return;
        }

        // Show results immediately — never block the user
        setIsSubmitted(true);
        setSubmitting(false);

        // Submit to backend in background (fire and forget)
        const data = {
            grade: grade,
            score: results.score,
            total_questions: results.total,
            total_correct: results.totalCorrect || 0,
            total_wrong: results.totalWrong || 0,
            total_partial: results.totalPartial || 0,
            time_taken: results.timeTaken,
            question_results: results.questionResults
        };
        api.submitDiagnosisTest(data).catch(err => {
            console.error('Background submission failed:', err);
        });
    };

    const normalizeMath = (str) => {
        if (!str) return "";
        return String(str)
            .replace(/\$/g, "") // Remove LaTeX delimiters
            .replace(/\\ /g, "") // Remove escaped spaces
            .replace(/\s+/g, "") // Remove all whitespace
            .replace(/\{/g, "") // Remove LaTeX braces
            .replace(/\}/g, "") // Remove LaTeX braces
            .replace(/\\cdot/g, "*") // Normalize multiplication dot
            .replace(/\\times/g, "*")
            .toLowerCase();
    };

    const isEquivalentFractions = (val1, val2) => {
        const parseFraction = (s) => {
            const normalized = normalizeMath(s);
            if (!normalized.includes("/")) {
                if (normalized.includes("^")) {
                    const parts = normalized.split("^");
                    return { n: Math.pow(parseFloat(parts[0]), parseFloat(parts[1])), d: 1 };
                }
                return { n: parseFloat(normalized), d: 1 };
            }
            const parts = normalized.split("/");

            const parsePart = (p) => {
                if (p.includes("^")) {
                    const [b, e] = p.split("^").map(parseFloat);
                    return Math.pow(b, e);
                }
                return parseFloat(p);
            };

            return { n: parsePart(parts[0]), d: parsePart(parts[1]) };
        };

        try {
            const f1 = parseFraction(val1);
            const f2 = parseFraction(val2);

            if (isNaN(f1.n) || isNaN(f1.d) || isNaN(f2.n) || isNaN(f2.d)) return false;
            if (f1.d === 0 || f2.d === 0) return false;

            return Math.abs((f1.n / f1.d) - (f2.n / f2.d)) < 0.0001;
        } catch (e) {
            return false;
        }
    };

    const calculateDetailedResults = () => {
        let correctCount = 0;
        let totalCorrect = 0;
        let totalWrong = 0;
        let totalPartial = 0;

        const questionResults = [];

        questions.forEach(q => {
            const userAnswer = answers[q.id];
            let isCorrect = false;
            let qScore = 0;

            if (q.type === 'tableInput') {
                try {
                    const expected = JSON.parse(q.answer);
                    let totalInputs = 0;
                    let correctInputs = 0;

                    Object.keys(expected).forEach(rowIdx => {
                        const rowExpected = expected[rowIdx];
                        if (typeof rowExpected === 'object' && rowExpected !== null) {
                            Object.keys(rowExpected).forEach(key => {
                                if (key.startsWith('_')) return; // Skip internal keys
                                totalInputs++;
                                const userVal = String(userAnswer?.[rowIdx]?.[key] || '').trim().toLowerCase();
                                const expVal = String(rowExpected[key] || '').trim().toLowerCase();
                                if (userVal === expVal) correctInputs++;
                            });
                        } else {
                            totalInputs++;
                            const userVal = String(userAnswer?.[rowIdx]?.["0"] || userAnswer?.[rowIdx] || '').trim().toLowerCase();
                            const expVal = String(rowExpected || '').trim().toLowerCase();
                            if (userVal === expVal) correctInputs++;
                        }
                    });

                    if (totalInputs > 0) {
                        qScore = correctInputs / totalInputs;
                        correctCount += qScore;
                        if (qScore === 1) isCorrect = true;
                    }
                } catch (e) {
                    console.error("Error parsing table answer:", e);
                }
            } else if (q.type === 'factorTree') {
                try {
                    const expected = JSON.parse(q.answer);
                    let totalNodes = 0;
                    let correctNodes = 0;

                    Object.keys(expected).forEach(nodeId => {
                        totalNodes++;
                        if (String(userAnswer?.[nodeId]) === String(expected[nodeId])) {
                            correctNodes++;
                        }
                    });

                    if (totalNodes > 0 && correctNodes > 0) {
                        qScore = correctNodes / totalNodes;
                        correctCount += qScore;
                        if (qScore === 1) isCorrect = true;
                    }
                } catch (e) {
                    console.error("Error parsing factor tree answer:", e);
                }
            } else {
                const normUser = normalizeMath(userAnswer);
                const normCorrect = normalizeMath(q.answer);

                if (normUser === normCorrect) {
                    isCorrect = true;
                    qScore = 1;
                    correctCount++;
                } else if (isEquivalentFractions(userAnswer, q.answer)) {
                    isCorrect = true;
                    qScore = 1;
                    correctCount++;
                } else if (q.type === 'mcq') {
                    // Fallback for duplicates: if selected option text matches correct answer text
                    const selectedOption = q.options?.find(opt => opt.value === userAnswer);
                    if (selectedOption && normalizeMath(selectedOption.label) === normCorrect) {
                        isCorrect = true;
                        qScore = 1;
                        correctCount++;
                    }
                }
            }

            let userDisplay = userAnswer;
            let correctDisplay = q.answer;

            const formatTableValue = (val, variant) => {
                if (val === null || val === undefined) return "_None_";
                if (typeof val === 'object') {
                    if (variant === 'fraction' && val.num !== undefined) {
                        return `$${val.num}/${val.den}$`;
                    }
                    if (variant === 'coordinate' && val.x !== undefined) {
                        return `(${val.x}, ${val.y})`;
                    }
                    if (val["0"] !== undefined && typeof val["0"] !== 'object') return val["0"];

                    const keys = Object.keys(val).filter(k => !k.startsWith('_'));
                    if (keys.length > 0) {
                        return keys.map(k => val[k]).join(', ');
                    }
                    return JSON.stringify(val);
                }
                return String(val);
            };

            if (q.type === 'tableInput') {
                try {
                    const expected = JSON.parse(q.answer);
                    const rows = q.rows || [];

                    const formatRow = (row, ans) => {
                        const resStr = formatTableValue(ans, q.variant);
                        if (row.left !== undefined) {
                            const f = (val) => (typeof val === 'object' && val.n !== undefined) ? `${val.n}/${val.d}` : val;
                            return `$${f(row.left)} ${row.op || ''} ${f(row.right)}$\n**Ans:** ${resStr}`;
                        }
                        return `${row.text || "Row"}\n**Ans:** ${resStr}`;
                    };

                    const formatExpectedRow = (row, expVal) => {
                        const resStr = formatTableValue(expVal, q.variant);
                        if (row.left !== undefined) {
                            const f = (val) => (typeof val === 'object' && val.n !== undefined) ? `${val.n}/${val.d}` : val;
                            return `$${f(row.left)} ${row.op || ''} ${f(row.right)}$\n**Ans:** ${resStr}`;
                        }
                        return `${row.text || "Row"}\n**Ans:** ${resStr}`;
                    };

                    userDisplay = rows.map((row, i) => formatRow(row, userAnswer?.[i])).join('\n\n');
                    correctDisplay = rows.map((row, i) => formatExpectedRow(row, expected[i])).join('\n\n');
                } catch (e) {
                    console.error("Error formatting table results:", e);
                    userDisplay = isCorrect ? "Completed Correctly" : "Incorrectly Filled";
                    correctDisplay = "Check Table Properties";
                }
            } else if (q.type === 'factorTree') {
                try {
                    const expected = JSON.parse(q.answer);
                    userDisplay = isCorrect ? "All nodes filled correctly" : "Some nodes missing or incorrect";
                    correctDisplay = "Refer to the comparison diagram on the right";

                    // Generate a side-by-side SVG comparison
                    const comparisonSvg = generateFactorTreeResultsSVG(q.tree, userAnswer || {}, expected);
                    q.image = comparisonSvg; // Override q.image so it shows in Results UI
                } catch (e) {
                    console.error("Error generating factor tree comparison:", e);
                    userDisplay = isCorrect ? "Completed" : "Incomplete";
                    correctDisplay = "Check branches";
                }
            }

            let status = 'wrong';
            if (qScore === 1) {
                totalCorrect++;
                status = 'correct';
            } else if (qScore > 0) {
                totalPartial++;
                status = 'partial';
            } else {
                totalWrong++;
                status = 'wrong';
            }

            questionResults.push({
                question: q.question,
                userAnswer: userDisplay,
                correctAnswer: correctDisplay,
                isCorrect,
                marks: qScore,
                status,
                type: q.type,
                topic: q.topic,
                image: q.img || q.image
            });
        });

        // Calculate time based on timeLeft to ensure consistency across page reloads
        const timeTaken = Math.max(0, (30 * 60) - timeLeft);

        return {
            score: correctCount,
            total: questions.length,
            totalCorrect,
            totalWrong,
            totalPartial,
            timeTaken,
            questionResults
        };
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
        const results = calculateDetailedResults();
        return (
            <DiagnosisResults
                results={results}
                grade={grade}
                onRetake={() => {
                    localStorage.removeItem(STORAGE_KEY);
                    if (document.fullscreenElement) {
                        document.exitFullscreen().catch(() => {}).finally(() => {
                            window.location.href = `/diagnosis-test/${grade}`;
                        });
                    } else {
                        window.location.href = `/diagnosis-test/${grade}`;
                    }
                }}
            />
        );
    }


    return (
        <div className="diagnosis-runner min-h-screen font-sans relative">
            <ViolationWarning
                show={showWarning && violationCount < maxViolations}
                onDismiss={dismissWarning}
                violationCount={violationCount}
                maxViolations={maxViolations}
                message={violationMessage}
            />
            <header className="cbt-header shadow-md px-3 sm:px-10 h-14 sm:h-20">
                <div className="flex items-center gap-2 sm:gap-4">
                    <span className="font-extrabold text-sm sm:text-2xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        Skill Discovery • Grade {grade}
                    </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-6">
                    <div className="timer-box font-mono px-3 sm:px-5 py-1 sm:py-2">
                        <Clock size={16} className="sm:hidden" />
                        <Clock size={22} className="hidden sm:block" />
                        <span className="text-sm sm:text-xl">{formatTime(timeLeft)}</span>
                    </div>
                    <button
                        type="button"
                        style={{ position: 'relative', zIndex: 201, cursor: submitting ? 'not-allowed' : 'pointer' }}
                        className={`px-4 sm:px-8 py-2 sm:py-3 text-white rounded-lg sm:rounded-xl font-bold text-xs sm:text-base transition-all shadow-lg active:scale-95 flex items-center gap-2 ${submitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'}`}
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                        {submitting ? 'Submitting...' : 'Final Submit'}
                    </button>
                </div>
            </header>

            <div className="cbt-layout max-w-[1600px] mx-auto">
                {/* Floating Question Grid Toggle Button (mobile only) */}
                <button
                    className="sm:hidden fixed top-[70px] right-4 z-50 w-11 h-11 bg-indigo-600 text-white rounded-full shadow-xl shadow-indigo-300 flex items-center justify-center active:scale-90 transition-transform"
                    onClick={() => setShowGrid(!showGrid)}
                >
                    {showGrid ? <X size={22} /> : <Grid size={22} />}
                </button>

                {/* Question Grid Overlay (mobile) */}
                {showGrid && (
                    <div
                        className="sm:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        onClick={() => setShowGrid(false)}
                    />
                )}

                <aside className={`palette-area border border-slate-100 flex flex-col sm:sticky sm:top-24 transition-transform duration-300 sm:order-2 ${showGrid ? 'fixed inset-x-4 top-[70px] bottom-auto z-50 sm:relative sm:inset-auto max-h-[60vh] overflow-y-auto rounded-2xl shadow-2xl' : 'hidden sm:flex'}`}>
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <div className="p-2 bg-slate-50 rounded-lg">
                            <Grid size={20} className="text-slate-500 sm:hidden" />
                            <Grid size={24} className="text-slate-500 hidden sm:block" />
                        </div>
                        <h3 className="font-black text-base sm:text-xl text-slate-800 uppercase tracking-tight flex-1">Question Grid</h3>
                        <button
                            className="sm:hidden p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                            onClick={() => setShowGrid(false)}
                        >
                            <X size={18} className="text-slate-400" />
                        </button>
                    </div>
                    <div className="palette-grid flex-1">
                        {questions.map((_, idx) => (
                            <button
                                key={idx}
                                className={`palette-btn text-sm sm:text-lg h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl transition-all hover:scale-105 active:scale-95 ${currentIndex === idx ? 'active shadow-lg shadow-indigo-200 ring-4 ring-indigo-50' : answers[questions[idx].id] ? 'answered' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                                onClick={() => { setCurrentIndex(idx); setShowGrid(false); }}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>

                    <div className="mt-4 sm:mt-10 space-y-2 sm:space-y-4 pt-4 sm:pt-8 border-t border-slate-100">
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-slate-600">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-md bg-indigo-600"></div>
                            <span>Current View</span>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-slate-600">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-md" style={{ backgroundColor: '#dcfce7', border: '1px solid #bbf7d0' }}></div>
                            <span>Answered</span>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-slate-600">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-md" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}></div>
                            <span>Not Started</span>
                        </div>
                    </div>
                </aside>

                <main className="question-area border border-slate-100 flex flex-col sm:order-1">
                    <div className="mb-4 sm:mb-10">
                        <div className="flex items-center justify-between mb-3 sm:mb-6">
                            <span className="text-xs sm:text-sm font-black text-indigo-600 uppercase tracking-widest px-2 sm:px-4 py-1 sm:py-2 bg-indigo-50 rounded-lg">
                                Question {currentIndex + 1} / {questions.length}
                            </span>
                            <div className="flex items-center gap-3">
                                {q.topic && (
                                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest px-2 sm:px-3 py-1 bg-slate-100 text-slate-500 rounded-md">
                                        {q.topic}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="text-lg sm:text-3xl font-bold text-slate-800 leading-snug">
                            <MathRenderer text={q.question} />
                        </div>
                        {(q.img || q.image) && (
                            <div className="mt-6 flex justify-center bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
                                {(typeof (q.img || q.image) === 'string' && (q.img || q.image).trim().startsWith('<')) ? (
                                    <div
                                        className="max-h-64 flex items-center justify-center svg-container w-full"
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
                            <div className="mt-2 sm:mt-4">
                                <label className="block text-xs sm:text-sm font-bold text-slate-500 mb-2 uppercase tracking-tight">Your Answer</label>
                                <input
                                    type="text"
                                    autoFocus
                                    className="w-full text-xl sm:text-3xl font-bold p-3 sm:p-6 border-4 border-slate-100 rounded-xl sm:rounded-2xl focus:border-indigo-600 focus:outline-none transition-all placeholder:text-slate-200"
                                    placeholder="Enter your answer here..."
                                    value={answers[q.id] || ''}
                                    onChange={handleUserInput}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && currentIndex < questions.length - 1) {
                                            setCurrentIndex(currentIndex + 1);
                                        }
                                    }}
                                />
                                <p className="mt-2 sm:mt-4 text-slate-400 font-medium italic text-xs sm:text-base">Type your answer above and press Enter to go to the next question.</p>
                            </div>
                        ) : q.type === 'tableInput' ? (
                            <div className="mt-4 space-y-3">
                                {q.variant === 'visual' || q.variant === 'fraction' || q.variant === 'coordinate' ? (
                                    <div className="space-y-3">
                                        {q.rows.map((row, rowIdx) => {
                                            const f = (p) => {
                                                if (typeof p === 'object' && p !== null && p.n !== undefined) {
                                                    return `\\frac{${p.n}}{${p.d}}`;
                                                }
                                                return p;
                                            };
                                            return (
                                                <div key={rowIdx} className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group animate-in fade-in slide-in-from-bottom-2 duration-500">
                                                    <div className="flex items-center justify-center gap-1 sm:gap-4 flex-wrap">
                                                        {row.left !== undefined ? (
                                                            <>
                                                                {/* Operand 1 */}
                                                                <div className="min-w-[60px] sm:min-w-[90px] p-3 sm:p-4 bg-sky-50 rounded-xl text-center font-black text-slate-800 text-xl sm:text-2xl shadow-sm border border-sky-100 group-hover:bg-sky-100 transition-colors">
                                                                    <MathRenderer text={typeof row.left === 'object' ? `$${f(row.left)}$` : String(row.left)} />
                                                                </div>
                                                                {/* Operator */}
                                                                <div className="p-2 sm:p-3 text-center font-black text-sky-500 text-xl sm:text-2xl">
                                                                    <MathRenderer text={row.op} />
                                                                </div>
                                                                {/* Operand 2 */}
                                                                <div className="min-w-[60px] sm:min-w-[90px] p-3 sm:p-4 bg-sky-50 rounded-xl text-center font-black text-slate-800 text-xl sm:text-2xl shadow-sm border border-sky-100 group-hover:bg-sky-100 transition-colors">
                                                                    <MathRenderer text={typeof row.right === 'object' ? `$${f(row.right)}$` : String(row.right)} />
                                                                </div>
                                                                {/* Equals */}
                                                                <div className="p-2 sm:p-3 text-slate-300 font-black text-2xl">
                                                                    =
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="p-2 text-2xl font-bold text-slate-700">
                                                                <MathRenderer text={row.text} />
                                                            </div>
                                                        )}

                                                        {/* Input Area */}
                                                        <div className="flex items-center gap-2">
                                                            {q.variant === 'fraction' ? (
                                                                <div className="flex flex-col items-center gap-2 bg-slate-50 p-3 rounded-2xl border-2 border-slate-100 group-hover:border-indigo-100 transition-all">
                                                                    <input
                                                                        type="text" inputMode="numeric"
                                                                        className="w-14 sm:w-16 p-2 border-2 border-transparent rounded-lg focus:border-indigo-600 focus:bg-white focus:outline-none transition-all font-black text-lg text-center placeholder:text-slate-300"
                                                                        placeholder="N"
                                                                        value={answers[q.id]?.[rowIdx]?.num || ''}
                                                                        onChange={(e) => handleTableInputChange(rowIdx, 'num', e.target.value)}
                                                                    />
                                                                    <div className="h-1 bg-slate-300 w-full rounded-full opacity-50" />
                                                                    <input
                                                                        type="text" inputMode="numeric"
                                                                        className="w-14 sm:w-16 p-2 border-2 border-transparent rounded-lg focus:border-indigo-600 focus:bg-white focus:outline-none transition-all font-black text-lg text-center placeholder:text-slate-300"
                                                                        placeholder="D"
                                                                        value={answers[q.id]?.[rowIdx]?.den || ''}
                                                                        onChange={(e) => handleTableInputChange(rowIdx, 'den', e.target.value)}
                                                                    />
                                                                </div>
                                                            ) : q.variant === 'coordinate' ? (
                                                                <div className="flex items-center gap-1 font-mono text-lg text-slate-600 bg-white p-3 rounded-xl border-3 border-slate-100 shadow-inner group-hover:shadow-md transition-all">
                                                                    <span className="font-bold">(</span>
                                                                    <input
                                                                        type="text"
                                                                        className="w-12 text-center border-b-2 border-slate-100 focus:border-indigo-500 outline-none p-0 bg-transparent transition-colors font-bold"
                                                                        placeholder="x"
                                                                        value={answers[q.id]?.[rowIdx]?.x || ''}
                                                                        onChange={(e) => handleTableInputChange(rowIdx, 'x', e.target.value)}
                                                                    />
                                                                    <span className="font-bold">,</span>
                                                                    <input
                                                                        type="text"
                                                                        className="w-12 text-center border-b-2 border-slate-100 focus:border-indigo-500 outline-none p-0 bg-transparent transition-colors font-bold"
                                                                        placeholder="y"
                                                                        value={answers[q.id]?.[rowIdx]?.y || ''}
                                                                        onChange={(e) => handleTableInputChange(rowIdx, 'y', e.target.value)}
                                                                    />
                                                                    <span className="font-bold">)</span>
                                                                </div>
                                                            ) : (
                                                                <div className="relative group/input">
                                                                    <input
                                                                        type="text" inputMode="numeric"
                                                                        className="w-24 sm:w-32 p-3 sm:p-4 border-3 border-slate-100 rounded-xl focus:border-indigo-600 focus:outline-none transition-all font-black text-xl text-center bg-white shadow-inner group-hover:shadow-md"
                                                                        placeholder="?"
                                                                        value={answers[q.id]?.[rowIdx]?.["0"] || ''}
                                                                        onChange={(e) => handleTableInputChange(rowIdx, '0', e.target.value)}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto pb-6">
                                        <table className="w-full border-collapse bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
                                            {q.headers && q.headers.length > 0 && !q.headers.every(h => ['expression', 'result'].includes(h.toLowerCase())) && (
                                                <thead>
                                                    <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black tracking-widest border-b border-slate-100">
                                                        {q.headers.map((header, i) => (
                                                            <th key={i} className="p-4 text-center">{header}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                            )}
                                            <tbody>
                                                {q.rows.map((row, rowIdx) => (
                                                    <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="p-5 border-b border-slate-50">
                                                            <div className="flex flex-col gap-3">
                                                                <div className="font-bold text-slate-800 text-lg">
                                                                    {row.text ? (
                                                                        <MathRenderer text={row.text} />
                                                                    ) : row.left !== undefined ? (
                                                                        <MathRenderer text={(() => {
                                                                            const f = (p) => {
                                                                                if (typeof p === 'object' && p !== null && p.n !== undefined) {
                                                                                    return `\\frac{${p.n}}{${p.d}}`;
                                                                                }
                                                                                return p;
                                                                            };
                                                                            return `$${f(row.left)} ${row.op || ''} ${f(row.right)}$`;
                                                                        })()} />
                                                                    ) : row.shape ? (
                                                                        <span className="font-bold text-slate-800">{row.shape}</span>
                                                                    ) : null}
                                                                </div>
                                                                {row.image && (
                                                                    row.image.startsWith('<svg') ? (
                                                                        <div
                                                                            className="w-24 h-24 bg-white rounded-xl border border-slate-100 p-2 flex items-center justify-center"
                                                                            dangerouslySetInnerHTML={{ __html: row.image }}
                                                                        />
                                                                    ) : (
                                                                        <img src={row.image} alt={row.text || row.shape || "visual"} className="w-24 h-24 object-contain bg-white rounded-xl border border-slate-100 p-2" />
                                                                    )
                                                                )}
                                                            </div>
                                                        </td>
                                                        {(q.inputKeys || ["0"]).map((key, kIdx) => (
                                                            <td key={kIdx} className="p-5 border-b border-slate-50">
                                                                <div className="flex flex-col gap-1">
                                                                    {row.inputType === 'select' ? (
                                                                        <select
                                                                            className="w-full max-w-[240px] mx-auto p-4 border-2 border-slate-100 rounded-xl focus:border-indigo-600 focus:outline-none transition-all font-bold text-lg sm:text-xl text-center bg-white appearance-none cursor-pointer"
                                                                            value={answers[q.id]?.[rowIdx]?.[key] || ''}
                                                                            onChange={(e) => handleTableInputChange(rowIdx, key, e.target.value)}
                                                                        >
                                                                            <option value="">Select...</option>
                                                                            {(row.options || q.options || []).map((opt, oIdx) => (
                                                                                <option key={oIdx} value={typeof opt === 'object' ? opt.value : opt}>
                                                                                    {typeof opt === 'object' ? opt.label : opt}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    ) : row.inputType === 'radio' ? (
                                                                        <div className="flex items-center justify-center gap-4">
                                                                            {(row.options || q.options || ["True", "False"]).map((opt, oIdx) => {
                                                                                const optValue = typeof opt === 'object' ? opt.value : opt;
                                                                                const optLabel = typeof opt === 'object' ? opt.label : opt;
                                                                                const isSelected = answers[q.id]?.[rowIdx]?.[key] === optValue;
                                                                                return (
                                                                                    <button
                                                                                        key={oIdx}
                                                                                        onClick={() => handleTableInputChange(rowIdx, key, optValue)}
                                                                                        className={`px-6 py-3 rounded-xl border-2 font-bold transition-all duration-200 ${isSelected
                                                                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                                                                                            : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300'
                                                                                            }`}
                                                                                    >
                                                                                        {optLabel}
                                                                                    </button>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    ) : (
                                                                        <input
                                                                            type="text"
                                                                            className="w-full max-w-[160px] sm:max-w-[220px] mx-auto p-3 sm:p-4 border-2 border-slate-100 rounded-xl focus:border-indigo-600 focus:outline-none transition-all font-bold text-lg sm:text-xl text-center placeholder:text-slate-200"
                                                                            placeholder={q.placeholders?.[kIdx] || (q.headers && q.headers[kIdx + 1] ? q.headers[kIdx + 1] : "0")}
                                                                            value={answers[q.id]?.[rowIdx]?.[key] || ''}
                                                                            onChange={(e) => handleTableInputChange(rowIdx, key, e.target.value)}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ) : q.type === 'factorTree' ? (
                            <div className="mt-6 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm overflow-x-auto overflow-y-visible">
                                <svg width="100%" height="auto" viewBox="0 0 600 450" className="mx-auto overflow-visible max-w-[600px]">
                                    {renderFactorTree(q.tree, 300, 40, 0)}
                                </svg>
                            </div>
                        ) : (
                            q.options && q.options.map((opt, idx) => {
                                const optValue = typeof opt === 'object' ? (opt.value || opt.label) : opt;
                                const isSelected = answers[q.id] === optValue;

                                return (
                                    <div
                                        key={idx}
                                        className={`p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 sm:gap-5 group ${isSelected ? 'border-indigo-600 bg-indigo-50/50 shadow-md' : 'border-slate-100 hover:border-indigo-200 bg-white'}`}
                                        onClick={() => handleAnswer(opt)}
                                    >
                                        <div className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300 group-hover:border-indigo-300'}`}>
                                            {isSelected && <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>}
                                        </div>
                                        <span className={`text-base sm:text-xl font-semibold transition-colors flex flex-col gap-2 ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
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

                    <div className="mt-6 sm:mt-12 pt-4 sm:pt-8 border-t border-slate-100 flex justify-between">
                        <button
                            className={`flex items-center gap-1 sm:gap-3 px-3 sm:px-8 py-2 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all ${currentIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-50'}`}
                            onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
                            disabled={currentIndex === 0}
                        >
                            <ChevronLeft size={18} className="sm:hidden" />
                            <ChevronLeft size={24} className="hidden sm:block" />
                            <span className="hidden sm:inline">Previous</span>
                            <span className="sm:hidden">Prev</span>
                        </button>
                        <button
                            className={`flex items-center gap-1 sm:gap-3 px-4 sm:px-10 py-2 sm:py-4 rounded-xl sm:rounded-2xl font-extrabold text-sm sm:text-lg transition-all active:scale-95 ${currentIndex === questions.length - 1 ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200' : 'bg-slate-50 text-indigo-600 hover:bg-indigo-50 border-2 border-transparent hover:border-indigo-100'}`}
                            onClick={() => currentIndex < questions.length - 1 ? setCurrentIndex(currentIndex + 1) : handleSubmit()}
                        >
                            <span className="hidden sm:inline">{currentIndex === questions.length - 1 ? 'Last Question' : 'Next Question'}</span>
                            <span className="sm:hidden">{currentIndex === questions.length - 1 ? 'Last' : 'Next'}</span>
                            <ChevronRight size={18} className="sm:hidden" />
                            <ChevronRight size={24} className="hidden sm:block" />
                        </button>
                    </div>
                </main>


            </div>
        </div>
    );
};

export default DiagnosisTestRunner;
