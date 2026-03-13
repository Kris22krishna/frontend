import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, LayoutPanelLeft, ChevronLeft, ChevronRight, Bookmark, CheckCircle, HelpCircle, Trophy, BarChart3, Clock, Target, AlertCircle, LogOut, Home } from 'lucide-react';
import { genPhysics } from '../data/neetPhysics';
import { genChemistry } from '../data/neetChemistry';
import { genBotany, genZoology } from '../data/neetBiology';

const NeetMockTest = () => {
    const navigate = useNavigate();
    const [gameState, setGameState] = useState('splash'); // 'splash', 'exam', 'result'
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [marked, setMarked] = useState({});
    const [visited, setVisited] = useState({});
    const [timeLeft, setTimeLeft] = useState(200 * 60); // 200 minutes
    const [stats, setStats] = useState(null);
    const [reviewMode, setReviewMode] = useState(false);

    // Filtered arrays for UI
    const physicsQs = questions.filter(q => q.subject === 'Physics');
    const chemistryQs = questions.filter(q => q.subject === 'Chemistry');
    const botanyQs = questions.filter(q => q.subject === 'Botany');
    const zoologyQs = questions.filter(q => q.subject === 'Zoology');

    const startExam = () => {
        const allQs = [...genPhysics(), ...genChemistry(), ...genBotany(), ...genZoology()];
        setQuestions(allQs);
        setAnswers({});
        setMarked({});
        setVisited({ 0: true });
        setTimeLeft(200 * 60);
        setCurrentIdx(0);
        setGameState('exam');
    };

    useEffect(() => {
        if (gameState === 'exam' && !reviewMode) {
            setVisited(prev => ({ ...prev, [currentIdx]: true }));
        }
    }, [currentIdx, gameState, reviewMode]);

    useEffect(() => {
        let timer;
        if (gameState === 'exam' && !reviewMode && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && gameState === 'exam' && !reviewMode) {
            submitExam();
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft, reviewMode]);

    const formatTime = (s) => {
        const h = Math.floor(s / 3600);
        const m = Math.floor((s % 3600) / 60);
        const rs = s % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${rs.toString().padStart(2, '0')}`;
    };

    const submitExam = () => {
        let score = 0, correct = 0, wrong = 0, skipped = 0;
        const subjData = { Physics: { c: 0, w: 0 }, Chemistry: { c: 0, w: 0 }, Botany: { c: 0, w: 0 }, Zoology: { c: 0, w: 0 } };

        questions.forEach((q, i) => {
            if (answers[i] === undefined) {
                skipped++;
            } else if (answers[i] === q.answer) {
                correct++;
                score += 4;
                subjData[q.subject].c++;
            } else {
                wrong++;
                score -= 1;
                subjData[q.subject].w++;
            }
        });

        setStats({ score, correct, wrong, skipped, subjData, total: questions.length });
        setGameState('result');
    };

    const currentQuestion = questions[currentIdx];

    const getStatusColor = (i) => {
        if (reviewMode) {
            if (i === currentIdx) return 'border-2 border-teal-500 text-teal-600 bg-teal-50 ring-2 ring-teal-500/10';
            if (answers[i] !== undefined && answers[i] === questions[i]?.answer) return 'bg-emerald-500 text-white';
            if (answers[i] !== undefined && answers[i] !== questions[i]?.answer) return 'bg-rose-500 text-white';
            return 'bg-slate-100 text-slate-400';
        }
        if (i === currentIdx) return 'border-2 border-teal-500 text-teal-600 bg-teal-50 ring-2 ring-teal-500/10';
        if (marked[i]) return 'bg-[#8b5cf6] text-white shadow-sm shadow-[#8b5cf6]/20';
        if (answers[i] !== undefined) return 'bg-emerald-500 text-white';
        if (visited[i]) return 'bg-rose-500 text-white';
        return 'bg-slate-100 text-slate-400 hover:bg-slate-200';
    };

    const reviewAnswers = () => {
        setReviewMode(true);
        setCurrentIdx(0);
        setGameState('exam');
    };

    if (gameState === 'splash') {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-[#f8fafc] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
                {/* Decorative background elements */}
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-5xl w-full relative z-10">
                    <div className="flex flex-col items-center text-center mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 w-full">
                        <button 
                            onClick={() => navigate('/')}
                            className="self-start mb-4 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors"
                        >
                            <Home size={16} /> Back to Home
                        </button>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-3 tracking-tight w-full">
                            NEET Full Mock Test Series
                        </h1>
                        
                        <p className="text-base md:text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
                            Master the NEET exam pattern with our high-fidelity, pattern-aligned mock tests. 
                            Experience the real pressure, timing, and complexity.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        {[
                            { name: 'Physics', icon: <LayoutPanelLeft size={20} className="text-orange-500" />, desc: 'Conceptual & Numerical' },
                            { name: 'Chemistry', icon: <BarChart3 size={20} className="text-blue-500" />, desc: 'Organic & Inorganic' },
                            { name: 'Botany', icon: <Target size={20} className="text-emerald-500" />, desc: 'Plant Physiology' },
                            { name: 'Zoology', icon: <Trophy size={20} className="text-indigo-500" />, desc: 'Human Biology' }
                        ].map((s, idx) => (
                            <div key={s.name} className="group p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-teal-200 transition-all duration-300 transform hover:-translate-y-1">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-2 group-hover:bg-teal-50 transition-colors">
                                    {s.icon}
                                </div>
                                <div className="text-base font-bold text-slate-900 mb-0.5">{s.name}</div>
                                <div className="text-slate-500 text-[10px] leading-tight mb-2 uppercase tracking-tight">{s.desc}</div>
                                <div className="pt-2 border-t border-slate-50 text-[10px] font-bold text-teal-600 uppercase tracking-widest">
                                    45 Questions
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 items-center bg-white/70 backdrop-blur-md rounded-[2rem] p-6 border border-white shadow-xl mb-4 animate-in fade-in slide-in-from-bottom-16 duration-1000">
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                    <AlertCircle size={18} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Internal Guidelines</h3>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                <div className="flex items-start gap-2">
                                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mt-0.5 shrink-0 text-[10px]">✓</div>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-slate-800">+4 Correct | -1 Wrong</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mt-0.5 shrink-0 text-[10px]">✓</div>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-slate-800">200 Minutes</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mt-0.5 shrink-0 text-[10px]">✓</div>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-slate-800">All Sections</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 mt-0.5 shrink-0 text-[10px]">✓</div>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-slate-800">One-way Flow</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-auto flex flex-col items-center">
                            <button 
                                onClick={startExam}
                                className="w-full lg:w-auto px-10 py-4 bg-[#0f172a] hover:bg-[#1e293b] text-white text-lg font-bold rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 group"
                            >
                                Start Exam 
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </button>
                            <p className="mt-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Ready to take the challenge?</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === 'exam') {
        return (
            <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden bg-slate-50">
                {/* Exam Header */}
                <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <h2 className="font-bold text-slate-800 text-base sm:text-lg hidden xs:block">{reviewMode ? 'Review Answers' : 'NEET Mock Test'}</h2>
                        {reviewMode ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg font-semibold border border-emerald-100 text-sm">
                                Q {currentIdx + 1} / {questions.length}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg font-mono border border-rose-100 shadow-sm">
                                <Clock size={16} className="animate-pulse" />
                                <span className="font-bold text-sm sm:text-base">{formatTime(timeLeft)}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {reviewMode ? (
                            <button 
                                onClick={() => { setReviewMode(false); setGameState('result'); }}
                                className="bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold px-4 sm:px-6 py-2 rounded-xl transition-all flex items-center gap-2 active:scale-95"
                            >
                                <ChevronLeft size={18} /> Back to Results
                            </button>
                        ) : (
                            <>
                                <button 
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
                                            setGameState('splash');
                                        }
                                    }}
                                    className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 text-sm"
                                >
                                    <LogOut size={16} /> <span className="hidden sm:inline">Exit Test</span>
                                </button>
                                <button 
                                    onClick={submitExam}
                                    className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-4 sm:px-6 py-2 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-rose-200 active:scale-95"
                                >
                                    <CheckCircle size={18} /> <span className="hidden sm:inline">Submit Exam</span><span className="sm:hidden">Submit</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden min-h-0">
                    {/* Main Question Panel */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-14 flex flex-col items-center">
                        <div className="w-full max-w-3xl">
                            {/* Question Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Question {currentIdx + 1}</span>
                                    <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-bold rounded uppercase">{currentQuestion.subject}</span>
                                </div>
                                <button 
                                    onClick={() => !reviewMode && setMarked(prev => ({...prev, [currentIdx]: !prev[currentIdx]}))}
                                    className={`flex items-center gap-1 text-sm font-semibold transition-colors ${reviewMode ? 'hidden' : ''} ${marked[currentIdx] ? 'text-[#8b5cf6]' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <Bookmark size={16} fill={marked[currentIdx] ? "currentColor" : "none"} />
                                    {marked[currentIdx] ? 'Marked' : 'Mark for Review'}
                                </button>
                            </div>

                            {/* Question Content */}
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-4">
                                <p className="text-lg sm:text-xl font-medium text-slate-800 mb-8 leading-relaxed whitespace-pre-wrap">
                                    {currentQuestion.text}
                                </p>
                                
                                <div className="space-y-3">
                                    {currentQuestion.options.map((opt, i) => {
                                    let optionStyle = '';
                                    if (reviewMode) {
                                        if (i === currentQuestion.answer) {
                                            optionStyle = 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500/20';
                                        } else if (i === answers[currentIdx] && answers[currentIdx] !== currentQuestion.answer) {
                                            optionStyle = 'border-rose-500 bg-rose-50 ring-1 ring-rose-500/20';
                                        } else {
                                            optionStyle = 'border-slate-100 opacity-50';
                                        }
                                    } else {
                                        optionStyle = answers[currentIdx] === i 
                                            ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-500/20 shadow-md transform -translate-y-0.5' 
                                            : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50';
                                    }
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => !reviewMode && setAnswers(prev => ({...prev, [currentIdx]: i}))}
                                            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${optionStyle} ${reviewMode ? 'cursor-default' : 'cursor-pointer'}`}
                                        >
                                            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                                                reviewMode && i === currentQuestion.answer
                                                ? 'bg-emerald-500 text-white'
                                                : reviewMode && i === answers[currentIdx] && answers[currentIdx] !== currentQuestion.answer
                                                ? 'bg-rose-500 text-white'
                                                : answers[currentIdx] === i && !reviewMode
                                                ? 'bg-teal-500 text-white' 
                                                : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                {String.fromCharCode(65 + i)}
                                            </span>
                                            <span className={`flex-1 font-medium ${
                                                reviewMode && i === currentQuestion.answer ? 'text-emerald-900' :
                                                reviewMode && i === answers[currentIdx] && answers[currentIdx] !== currentQuestion.answer ? 'text-rose-900' :
                                                answers[currentIdx] === i && !reviewMode ? 'text-teal-900' : 'text-slate-700'
                                            }`}>
                                                {opt}
                                            </span>
                                            {reviewMode && i === currentQuestion.answer && (
                                                <CheckCircle size={18} className="text-emerald-500 shrink-0" />
                                            )}
                                        </button>
                                    );
                                })}
                                </div>
                            </div>

                            {/* Explanation in Review Mode */}
                            {reviewMode && currentQuestion.exp && (
                                <div className="bg-emerald-50 border border-emerald-200 border-l-4 border-l-emerald-500 rounded-xl p-5 mb-4">
                                    <div className="font-bold text-emerald-800 text-sm mb-1">Explanation</div>
                                    <p className="text-emerald-700 text-sm leading-relaxed">{currentQuestion.exp}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Question Palette - Hidden on Mobile */}
                    <div className="w-80 border-l border-slate-200 bg-white overflow-y-auto hidden lg:flex flex-col p-6 animate-in slide-in-from-right duration-500">
                        <div className="flex items-center gap-2 mb-6">
                            <LayoutPanelLeft size={20} className="text-teal-600" />
                            <h3 className="font-bold text-slate-900">Question Palette</h3>
                        </div>

                        {['Physics', 'Chemistry', 'Botany', 'Zoology'].map(subj => (
                            <div key={subj} className="mb-6 last:mb-0">
                                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 flex justify-between">
                                    {subj}
                                    <span className="text-teal-600">{questions.filter((q,i) => q.subject === subj && answers[i] !== undefined).length}/45</span>
                                </h4>
                                <div className="grid grid-cols-5 gap-2">
                                    {questions.map((q, i) => {
                                        if (q.subject !== subj) return null;
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    setCurrentIdx(i);
                                                }}
                                                className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${getStatusColor(i)}`}
                                            >
                                                {i + 1}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                <span className="w-4 h-4 rounded-md bg-emerald-500 shadow-sm shadow-emerald-500/20"></span> Answered
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                <span className="w-4 h-4 rounded-md bg-rose-500 shadow-sm shadow-rose-500/20"></span> Not Answered
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                <span className="w-4 h-4 rounded-md bg-[#8b5cf6] shadow-sm shadow-[#8b5cf6]/20"></span> Marked
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                <span className="w-4 h-4 rounded-md bg-slate-100 border border-slate-200"></span> Not Visited
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                <span className="w-4 h-4 rounded-md border-2 border-teal-500 bg-teal-50"></span> Current
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Navigation - fixed to viewport bottom like a taskbar */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 sm:px-6 flex justify-between items-center z-50 h-12">
                    <button 
                        disabled={currentIdx === 0}
                        onClick={() => setCurrentIdx(prev => prev - 1)}
                        className="px-4 py-1.5 rounded-md border border-slate-200 bg-white font-semibold text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-50 hover:text-teal-600 flex items-center gap-1.5 transition-all text-sm"
                    >
                        <ChevronLeft size={16} /> Previous
                    </button>

                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                        <span className="text-teal-600 font-bold">{Object.keys(answers).length}</span>/{questions.length} solved
                    </div>

                    <button 
                        onClick={() => {
                            if (currentIdx < questions.length - 1) {
                                setCurrentIdx(prev => prev + 1);
                            } else {
                                submitExam();
                            }
                        }}
                        className="px-5 py-1.5 rounded-md bg-[#0f172a] text-white font-semibold hover:bg-[#1e293b] flex items-center gap-1.5 transition-all text-sm"
                    >
                        {currentIdx < questions.length - 1 ? (
                            <>Save & Next <ChevronRight size={16} /></>
                        ) : (
                            <>Finish <CheckCircle size={16} /></>
                        )}
                    </button>
                </div>
            </div>
        );
    }

    if (gameState === 'result') {
        return (
            <div className="max-w-4xl mx-auto px-6 py-12 animate-in zoom-in-95 duration-500">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-8">
                    {/* Result Header */}
                    <div className="bg-[#0f172a] px-8 py-10 text-center text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold mb-2">NEET Test Summary</h1>
                            <p className="text-white/80">Great job! Here is how you performed today.</p>
                        </div>
                        <div className="absolute top-[-20px] right-[-20px] opacity-10">
                            <Trophy size={160} />
                        </div>
                    </div>

                    {/* Result Stats Grid */}
                    <div className="p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                            <div className="p-6 rounded-2xl bg-teal-50 border border-teal-100 text-center">
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Score</div>
                                <div className="text-3xl font-black text-teal-600">{stats.score}</div>
                                <div className="text-[10px] text-teal-600/60 mt-1">out of 720</div>
                            </div>
                            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Correct</div>
                                <div className="text-3xl font-black text-emerald-600">{stats.correct}</div>
                                <div className="text-[10px] text-emerald-600/60 mt-1">+{stats.correct*4} Marks</div>
                            </div>
                            <div className="p-6 rounded-2xl bg-rose-50 border border-rose-100 text-center">
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Wrong</div>
                                <div className="text-3xl font-black text-rose-600">{stats.wrong}</div>
                                <div className="text-[10px] text-rose-600/60 mt-1">-{stats.wrong} Marks</div>
                            </div>
                            <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-center">
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Skipped</div>
                                <div className="text-3xl font-black text-slate-600">{stats.skipped}</div>
                                <div className="text-[10px] text-slate-500/60 mt-1">0 Marks</div>
                            </div>
                        </div>

                        {/* Subject Progress */}
                        <div className="space-y-6 mb-12">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <BarChart3 size={20} className="text-teal-500" /> Subject-wise Breakdown
                            </h3>
                            {Object.entries(stats.subjData).map(([name, data]) => {
                                const total = 45;
                                const pct = (data.c / total) * 100;
                                return (
                                    <div key={name} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="font-bold text-slate-700">{name}</span>
                                            <span className="text-xs text-slate-500 font-mono">
                                                <span className="text-emerald-500">{data.c} Correct</span> • 
                                                <span className="text-rose-500"> {data.w} Wrong</span>
                                            </span>
                                        </div>
                                        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                                            <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${(data.c/total)*100}%` }}></div>
                                            <div className="bg-rose-500 h-full transition-all duration-1000" style={{ width: `${(data.w/total)*100}%` }}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Extra Insights */}
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="p-5 rounded-2xl border border-slate-200 flex items-center gap-4 bg-white hover:border-teal-200 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                    <Target size={24} />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800">Accuracy</div>
                                    <div className="text-sm text-slate-500">{stats.correct + stats.wrong > 0 ? Math.round((stats.correct/(stats.correct+stats.wrong))*100) : 0}% precision in attempts</div>
                                </div>
                            </div>
                            <div className="p-5 rounded-2xl border border-slate-200 flex items-center gap-4 bg-white hover:border-teal-200 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                                    <HelpCircle size={24} />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800">Efficiency</div>
                                    <div className="text-sm text-slate-500">{Math.round((stats.total - stats.skipped)/stats.total*100)}% question coverage</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-4 justify-center">
                        <button 
                            onClick={reviewAnswers}
                            className="px-8 py-3 bg-[#0f172a] text-white font-bold rounded-xl hover:bg-[#1e293b] transition-all shadow-md"
                        >
                            Review Answers
                        </button>
                        <button 
                            onClick={startExam}
                            className="px-8 py-3 bg-white border-2 border-[#0f172a] text-[#0f172a] font-bold rounded-xl hover:bg-slate-100 transition-all"
                        >
                            Try Again
                        </button>
                        <button 
                            onClick={() => navigate('/')}
                            className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-all"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default NeetMockTest;
