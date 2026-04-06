import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, RotateCcw, Home, GraduationCap, ArrowRight, ChevronDown, ChevronUp, X, Target } from 'lucide-react';
import MathRenderer from '../MathRenderer';
import './DiagnosisTest.css';
import PersonalizedPlan from './personalized learning plan/PersonalizedPlan';

const DiagnosisResults = ({ results, grade, onRetake, isAdmin = false, onClose }) => {
    const navigate = useNavigate();
    const [isAnalysisExpanded, setIsAnalysisExpanded] = useState(false);
    const { score, total, timeTaken, questionResults } = results;
    const rawPercentage = (score / total) * 100;
    const percentage = rawPercentage > 0 && rawPercentage < 1 ? 1 : Math.round(rawPercentage);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    const getPerformanceMessage = (pct) => {
        if (pct >= 90) return "Outstanding! You've mastered this grade.";
        if (pct >= 80) return "Excellent work! Great understanding.";
        if (pct >= 60) return "Good job! A little more practice will make you perfect.";
        return "Keep practicing! You can do better next time.";
    };

    const handleBackHome = () => {
        navigate('/diagnosis-test');
    };

    const handleRetake = () => {
        if (typeof onRetake === 'function') {
            onRetake();
        }
    };

    const renderAnswer = (ans) => {
        if (typeof ans === 'string' && (ans.startsWith('/assets/') || ans.includes('.jpg') || ans.includes('.png'))) {
            return <img src={ans} alt="Answer" className="max-h-16 object-contain inline-block" />;
        }
        return <MathRenderer text={typeof ans === 'object' ? JSON.stringify(ans) : String(ans)} />;
    };

    return (
        <div className="diagnosis-runner bg-slate-50 min-h-screen pb-20">
            {/* Global Navbar */}
            <header className="cbt-header shadow-md px-3 sm:px-10 h-auto sm:h-20 py-2 sm:py-0 flex items-center justify-between gap-2 mb-0" style={{ position: 'sticky', top: 0, zIndex: 200 }}>
                <div className="flex items-center gap-2 sm:gap-4">
                    <span className="font-extrabold text-sm sm:text-2xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        Skill Discovery Results • Grade {grade}
                    </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-4" style={{ position: 'relative', zIndex: 201 }}>
                    {isAdmin ? (
                        <button
                            type="button"
                            style={{ position: 'relative', zIndex: 201, cursor: 'pointer' }}
                            className="px-3 sm:px-6 py-1.5 sm:py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg sm:rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base"
                            onClick={onClose}
                        >
                            <X size={18} />
                            Close Report
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                style={{ position: 'relative', zIndex: 201, cursor: 'pointer' }}
                                className="px-3 sm:px-6 py-1.5 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg sm:rounded-xl font-bold transition-all flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base active:scale-95"
                                onClick={handleBackHome}
                            >
                                <Home size={18} />
                                Back Home
                            </button>
                            <button
                                type="button"
                                style={{ position: 'relative', zIndex: 201, cursor: 'pointer' }}
                                className="px-3 sm:px-6 py-1.5 sm:py-2.5 bg-indigo-600 text-white rounded-lg sm:rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base"
                                onClick={handleRetake}
                            >
                                <RotateCcw size={18} />
                                Retake
                            </button>
                        </>
                    )}
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
                {/* Score Summary */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-slate-900 mb-2">Final Summary</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                        {getPerformanceMessage(percentage)}
                    </p>
                </div>

                {/* 5 Card Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                    {/* Correct */}
                    <div className="bg-white p-6 rounded-[2rem] border-b-8 border-green-500 shadow-xl shadow-green-100 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-3">
                            <CheckCircle2 size={28} />
                        </div>
                        <div className="text-2xl font-black text-slate-900 leading-none mb-1">
                            {score % 1 === 0 ? score : score.toFixed(2)}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Correct</div>
                    </div>

                    {/* Wrong */}
                    <div className="bg-white p-6 rounded-[2rem] border-b-8 border-red-500 shadow-xl shadow-red-100 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-3">
                            <XCircle size={28} />
                        </div>
                        <div className="text-2xl font-black text-slate-900 leading-none mb-1">
                            {results.totalWrong || (total - Math.ceil(score))}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wrong</div>
                    </div>

                    {/* Partial */}
                    <div className="bg-white p-6 rounded-[2rem] border-b-8 border-amber-500 shadow-xl shadow-amber-100 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-3">
                            <Clock size={28} className="rotate-45" />
                        </div>
                        <div className="text-2xl font-black text-slate-900 leading-none mb-1">
                            {results.totalPartial || 0}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partial</div>
                    </div>

                    {/* Accuracy */}
                    <div className="bg-white p-6 rounded-[2rem] border-b-8 border-indigo-500 shadow-xl shadow-indigo-100 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-3">
                            <Target size={28} />
                        </div>
                        <div className="text-2xl font-black text-slate-900 leading-none mb-1">
                            {percentage}%
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accuracy</div>
                    </div>

                    {/* Time */}
                    <div className="bg-white p-6 rounded-[2rem] border-b-8 border-violet-500 shadow-xl shadow-violet-100 flex flex-col items-center justify-center text-center col-span-2 md:col-span-1">
                        <div className="w-12 h-12 bg-violet-50 text-violet-500 rounded-2xl flex items-center justify-center mb-3">
                            <Clock size={28} />
                        </div>
                        <div className="text-2xl font-black text-slate-900 leading-none mb-1">
                            {formatTime(timeTaken)}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time Taken</div>
                    </div>
                </div>

                {/* Question Analysis */}
                <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 mb-12">
                    <button
                        type="button"
                        className="w-full flex items-center justify-between mb-10 border-b border-slate-100 pb-6 group cursor-pointer"
                        onClick={() => setIsAnalysisExpanded(!isAnalysisExpanded)}
                    >
                        <div className="text-left">
                            <h2 className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">Question Analysis</h2>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">Review your performance by topic</p>
                        </div>
                        <div className={`p-3 rounded-full bg-slate-50 text-slate-400 transition-all ${isAnalysisExpanded ? 'rotate-180 bg-indigo-50 text-indigo-600' : ''}`}>
                            <ChevronDown size={28} />
                        </div>
                    </button>

                    {isAnalysisExpanded && (
                        <div className="grid grid-cols-1 gap-6">
                            {questionResults.map((q, idx) => (
                                <div key={idx} className={`p-6 sm:p-8 rounded-[2rem] border-l-[12px] bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 ${q.isCorrect ? 'border-l-green-500' : q.marks > 0 ? 'border-l-amber-500' : 'border-l-red-500'}`}>
                                    <div className={`flex flex-col ${q.type === 'factorTree' ? '' : 'md:flex-row'} gap-8`}>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-slate-600 border border-slate-100 shadow-sm">
                                                    {idx + 1}
                                                </span>
                                                <span className="px-4 py-1.5 bg-white text-indigo-600 rounded-lg text-xs font-black uppercase tracking-widest border border-indigo-50">
                                                    {q.topic}
                                                </span>
                                                {q.isCorrect ? (
                                                    <span className="flex items-center gap-1.5 text-green-600 font-bold text-sm bg-green-50 px-4 py-1 rounded-full">
                                                        <CheckCircle2 size={16} /> Correct
                                                    </span>
                                                ) : q.marks > 0 ? (
                                                    <span className="flex items-center gap-1.5 text-amber-600 font-bold text-sm bg-amber-50 px-4 py-1 rounded-full">
                                                        <Clock size={16} className="rotate-45" /> Partial ({q.marks.toFixed(1)})
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 text-red-600 font-bold text-sm bg-red-50 px-4 py-1 rounded-full">
                                                        <XCircle size={16} /> Incorrect
                                                    </span>
                                                )}
                                            </div>

                                            <div className="text-xl font-bold text-slate-800 leading-snug mb-8">
                                                <MathRenderer text={q.question} />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Your Answer</div>
                                                    <div className={`text-lg font-bold ${q.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                                        {renderAnswer(q.userAnswer || 'Not Answered')}
                                                    </div>
                                                </div>
                                                {!q.isCorrect && (
                                                    <div className="p-5 bg-green-50/30 rounded-2xl border border-green-100 shadow-sm">
                                                        <div className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-2">Correct Answer</div>
                                                        <div className="text-lg font-bold text-green-700">
                                                            {renderAnswer(q.correctAnswer)}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {(q.img || q.image) && (
                                            <div className={`w-full ${q.type === 'factorTree' ? 'mt-4' : 'md:w-80'} h-auto min-h-[12rem] bg-white rounded-3xl flex items-center justify-center p-4 sm:p-8 border border-slate-100 shadow-inner shrink-0 overflow-hidden`}>
                                                {(q.img || q.image).trim().startsWith('<') ? (
                                                    <div
                                                        className="w-full h-full flex items-center justify-center svg-container"
                                                        style={{ maxWidth: q.type === 'factorTree' ? '1000px' : '100%' }}
                                                        dangerouslySetInnerHTML={{ __html: (q.img || q.image) }}
                                                    />
                                                ) : (
                                                    <img src={q.img || q.image} alt="Question" className="max-w-full max-h-48 object-contain" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <PersonalizedPlan questionResults={questionResults} grade={grade} />

                {/* Actions */}
                {!isAdmin && (
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-12" style={{ position: 'relative', zIndex: 10 }}>
                        <button
                            type="button"
                            style={{ position: 'relative', zIndex: 10, cursor: 'pointer' }}
                            className="w-full md:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-95"
                            onClick={handleRetake}
                        >
                            <RotateCcw size={20} />
                            Retake Test
                        </button>
                        <button
                            type="button"
                            style={{ position: 'relative', zIndex: 10, cursor: 'pointer' }}
                            className="w-full md:w-auto px-10 py-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-black transition-all flex items-center justify-center gap-3 active:scale-95"
                            onClick={handleBackHome}
                        >
                            <Home size={20} />
                            Back Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiagnosisResults;
