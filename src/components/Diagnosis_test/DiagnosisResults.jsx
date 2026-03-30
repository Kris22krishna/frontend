import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, RotateCcw, Home, GraduationCap, ArrowRight } from 'lucide-react';
import MathRenderer from '../MathRenderer';
import './DiagnosisTest.css';
import { api } from '../../services/api';

const DiagnosisResults = ({ results, grade, onRetake }) => {
    const navigate = useNavigate();
    const { score, total, timeTaken, questionResults } = results;
    const percentage = Math.round((score / total) * 100);
    const wrongCount = total - score;
    const lastSubmittedRef = useRef(null);

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

    useEffect(() => {
        const submitResults = async () => {
            const submitKey = `diagnosis_submit_${grade}_${score}_${timeTaken}`;
            if (sessionStorage.getItem(submitKey)) {
                return; // Prevent duplicate submission of the exact same test run
            }

            // Mark as submitted synchronously before the async API call to block strict-mode race conditions
            sessionStorage.setItem(submitKey, 'true');

            try {
                const data = {
                    grade: grade,
                    score: score,
                    total_questions: total,
                    total_correct: results.totalCorrect || 0,
                    total_wrong: results.totalWrong || 0,
                    total_partial: results.totalPartial || 0,
                    time_taken: timeTaken,
                    question_results: questionResults
                };

                const response = await api.submitDiagnosisTest(data);
                console.log('Diagnosis results submitted successfully:', response);
            } catch (err) {
                console.error('Error submitting diagnosis results:', err);
                sessionStorage.removeItem(submitKey); // Rollback if failed
            }
        };

        if (results && lastSubmittedRef.current !== results) {
            submitResults();
            lastSubmittedRef.current = results;
        }
    }, [results, grade, score, total, timeTaken, questionResults]);

    return (
        <div className="diagnosis-runner bg-slate-50 min-h-screen pb-20">
            {/* Global Navbar */}
            <header className="cbt-header shadow-md px-3 sm:px-10 h-auto sm:h-20 py-2 sm:py-0 flex-wrap gap-2 mb-0">
                <div className="flex items-center gap-2 sm:gap-4">
                    <span className="font-extrabold text-sm sm:text-2xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        Skill Discovery Results • Grade {grade}
                    </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        className="px-3 sm:px-6 py-1.5 sm:py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg sm:rounded-xl font-bold transition-all flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base"
                        onClick={() => navigate('/')}
                    >
                        <Home size={14} className="sm:hidden" />
                        <Home size={18} className="hidden sm:block" />
                        Back Home
                    </button>
                    <button
                        className="px-3 sm:px-6 py-1.5 sm:py-2.5 bg-indigo-600 text-white rounded-lg sm:rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base"
                        onClick={onRetake}
                    >
                        <RotateCcw size={14} className="sm:hidden" />
                        <RotateCcw size={18} className="hidden sm:block" />
                        Retake
                    </button>
                </div>
            </header>

            {/* Header / Hero Section */}
            <div className="bg-white border-b border-slate-200 pt-8 sm:pt-16 pb-6 sm:pb-12 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-50 text-indigo-700 rounded-full font-bold text-xs sm:text-sm mb-4 sm:mb-6 animate-bounce">
                        <GraduationCap size={16} className="sm:hidden" />
                        <GraduationCap size={18} className="hidden sm:block" />
                        Grade {grade} Skill Discovery
                    </div>
                    <h1 className="text-2xl sm:text-5xl font-black text-slate-900 mb-2 sm:mb-4 tracking-tight">
                        Skill Discovery Result
                    </h1>
                    <p className="text-sm sm:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                        {getPerformanceMessage(percentage)}
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-3 sm:px-6 -mt-4 sm:-mt-8">
                {/* Summary Dashboard */}
                <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-5 gap-2 sm:gap-4 mb-6 sm:mb-12">
                    {/* Main Score Card */}
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-indigo-50 rounded-full -mr-8 sm:-mr-12 -mt-8 sm:-mt-12 transition-all group-hover:scale-110" />
                        <div className="relative">
                            <div className="text-2xl sm:text-4xl font-black text-indigo-600 mb-1">{percentage}%</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Accuracy</div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-3 sm:gap-4">
                        <div className="w-9 h-9 sm:w-12 sm:h-12 bg-green-50 rounded-lg sm:rounded-xl flex items-center justify-center text-green-500 shrink-0">
                            <CheckCircle2 size={18} className="sm:hidden" />
                            <CheckCircle2 size={24} className="hidden sm:block" />
                        </div>
                        <div>
                            <div className="text-lg sm:text-2xl font-black text-slate-900">{results.totalCorrect || 0}</div>
                            <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Correct</div>
                        </div>
                    </div>

                    <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-3 sm:gap-4">
                        <div className="w-9 h-9 sm:w-12 sm:h-12 bg-red-50 rounded-lg sm:rounded-xl flex items-center justify-center text-red-500 shrink-0">
                            <XCircle size={18} className="sm:hidden" />
                            <XCircle size={24} className="hidden sm:block" />
                        </div>
                        <div>
                            <div className="text-lg sm:text-2xl font-black text-slate-900">{results.totalWrong || 0}</div>
                            <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wrong</div>
                        </div>
                    </div>

                    <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-3 sm:gap-4">
                        <div className="w-9 h-9 sm:w-12 sm:h-12 bg-orange-50 rounded-lg sm:rounded-xl flex items-center justify-center text-orange-500 shrink-0">
                            <Clock size={18} className="rotate-45 sm:hidden" />
                            <Clock size={24} className="rotate-45 hidden sm:block" />
                        </div>
                        <div>
                            <div className="text-lg sm:text-2xl font-black text-slate-900">{results.totalPartial || 0}</div>
                            <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partial</div>
                        </div>
                    </div>

                    <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-3 sm:gap-4">
                        <div className="w-9 h-9 sm:w-12 sm:h-12 bg-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center text-blue-500 shrink-0">
                            <Clock size={18} className="sm:hidden" />
                            <Clock size={24} className="hidden sm:block" />
                        </div>
                        <div>
                            <div className="text-lg sm:text-2xl font-black text-slate-900">{formatTime(timeTaken)}</div>
                            <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time</div>
                        </div>
                    </div>
                </div>

                {/* Question Breakdown Section */}
                <div className="mb-6 sm:mb-12">
                    <div className="flex items-center justify-between mb-4 sm:mb-8">
                        <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">Question Analysis</h2>
                        <div className="flex gap-2 sm:gap-4">
                            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-slate-500">
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" /> Correct
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-slate-500">
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" /> Incorrect
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:gap-6">
                        {questionResults.map((q, idx) => (
                            <div
                                key={idx}
                                className={`p-4 sm:p-8 bg-white rounded-xl sm:rounded-[2rem] border-l-[6px] sm:border-l-[12px] shadow-sm hover:shadow-md transition-all ${q.isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}
                            >
                                <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                                            <span className="w-7 h-7 sm:w-10 sm:h-10 bg-slate-100 rounded-lg sm:rounded-xl flex items-center justify-center font-black text-slate-600 text-xs sm:text-base">
                                                {idx + 1}
                                            </span>
                                            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest">
                                                {q.topic || 'General'}
                                            </span>
                                            {q.status === 'correct' ? (
                                                <span className="flex items-center gap-1 text-green-600 font-bold text-[10px] sm:text-sm bg-green-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                                                    <CheckCircle2 size={12} /> Correct
                                                </span>
                                            ) : q.status === 'partial' ? (
                                                <span className="flex items-center gap-1 text-orange-600 font-bold text-[10px] sm:text-sm bg-orange-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                                                    <Clock size={12} className="rotate-45" /> Partial
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-red-600 font-bold text-[10px] sm:text-sm bg-red-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                                                    <XCircle size={12} /> Incorrect
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-base sm:text-xl font-bold text-slate-800 leading-snug mb-3 sm:mb-6">
                                            <MathRenderer text={q.question} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                                            <div className="p-3 sm:p-5 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
                                                <div className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">Your Answer</div>
                                                <div className={`text-sm sm:text-lg font-bold ${q.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                                    <MathRenderer text={typeof q.userAnswer === 'object' ? 'Completed' : q.userAnswer || 'Not Answered'} />
                                                </div>
                                            </div>
                                            {!q.isCorrect && (
                                                <div className="p-3 sm:p-5 bg-green-50/50 rounded-xl sm:rounded-2xl border border-green-100">
                                                    <div className="text-sm sm:text-lg font-bold text-green-700">
                                                        <MathRenderer text={typeof q.correctAnswer === 'string' ? q.correctAnswer : JSON.stringify(q.correctAnswer)} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {q.image && (
                                        <div className="w-full md:w-64 h-48 bg-slate-50 rounded-2xl flex items-center justify-center p-4 border border-slate-100 shrink-0">
                                            {q.image.includes('<svg') ? (
                                                <div
                                                    className="w-full h-full flex items-center justify-center overflow-hidden"
                                                    dangerouslySetInnerHTML={{ __html: q.image }}
                                                />
                                            ) : (
                                                <img src={q.image} alt="Question" className="max-w-full max-h-full object-contain" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col md:flex-row gap-3 sm:gap-4 justify-center items-center mt-6 sm:mt-12 bg-white p-4 sm:p-10 rounded-2xl sm:rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100">
                    <button
                        className="w-full md:w-auto px-6 sm:px-10 py-3 sm:py-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl sm:rounded-2xl font-black transition-all flex items-center justify-center gap-2 sm:gap-3 active:scale-95 text-sm sm:text-base"
                        onClick={() => navigate('/diagnosis-test')}
                    >
                        <ArrowRight className="rotate-180" size={18} />
                        Other Grade
                    </button>
                    <button
                        className="w-full md:w-auto px-8 sm:px-12 py-3 sm:py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl sm:rounded-2xl font-black shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-2 sm:gap-3 active:scale-95 text-sm sm:text-base"
                        onClick={onRetake}
                    >
                        <RotateCcw size={18} />
                        Retake Test
                    </button>
                    <button
                        className="w-full md:w-auto px-6 sm:px-10 py-3 sm:py-5 border-2 sm:border-4 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-xl sm:rounded-2xl font-black transition-all flex items-center justify-center gap-2 sm:gap-3 active:scale-95 text-sm sm:text-base"
                        onClick={() => navigate('/')}
                    >
                        <Home size={18} />
                        Back Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiagnosisResults;
