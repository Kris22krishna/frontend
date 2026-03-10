import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const AssessReportModal = ({ isOpen, stats, reviewData, onReturn }) => {
    const [expandedQ, setExpandedQ] = useState(null);

    if (!isOpen || !stats || !reviewData) return null;

    const { correctAnswers, totalQuestions, timeTaken } = stats;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

    const toggleExpand = (index) => {
        if (expandedQ === index) setExpandedQ(null);
        else setExpandedQ(index);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 md:p-8 font-outfit">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header Metrics */}
                        <div className="bg-slate-50 p-6 md:p-8 border-b border-slate-100 shrink-0">
                            <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
                                📊 Assessment Report
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                                    <div className="text-slate-500 font-bold mb-1">Total Score</div>
                                    <div className="text-3xl font-black text-indigo-600">{correctAnswers} <span className="text-xl text-slate-400">/ {totalQuestions}</span></div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                                    <div className="text-slate-500 font-bold mb-1">Accuracy</div>
                                    <div className="text-3xl font-black text-teal-500">{accuracy}%</div>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                                    <div className="text-slate-500 font-bold mb-1">Time Taken</div>
                                    <div className="text-3xl font-black text-amber-500 flex items-center gap-2">
                                        <Clock size={24} />
                                        {formatTime(timeTaken)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Question Breakdown Scroll Area */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-8 shrink min-h-0 bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-700 mb-6 px-2">Question Breakdown</h3>

                            <div className="space-y-4">
                                {reviewData.map((data, index) => {
                                    const isCorrect = data.isCorrect;
                                    const isSkipped = data.selected === null || data.selected === undefined;
                                    const isExpanded = expandedQ === index;

                                    // Badge styling
                                    let statusBadge = null;
                                    let borderColor = "border-slate-200";

                                    if (isSkipped) {
                                        statusBadge = <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200 flex items-center gap-1"><AlertCircle size={14} /> Skipped</span>;
                                    } else if (isCorrect) {
                                        statusBadge = <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 flex items-center gap-1"><CheckCircle2 size={14} /> Correct</span>;
                                        borderColor = "border-green-200";
                                    } else {
                                        statusBadge = <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200 flex items-center gap-1"><XCircle size={14} /> Incorrect</span>;
                                        borderColor = "border-red-200";
                                    }

                                    return (
                                        <div key={index} className={`bg-white rounded-2xl border-2 ${isExpanded ? borderColor : 'border-slate-200'} p-5 shadow-sm transition-all`}>
                                            <div className="flex justify-between items-start mb-4 gap-4">
                                                <div className="flex gap-4">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold shrink-0">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        {/* Attempt to display question text context if available from ReviewData */}
                                                        {data.questionText ? (
                                                            <div className="text-slate-800 font-bold text-lg leading-snug">
                                                                {data.questionText}
                                                            </div>
                                                        ) : (
                                                            <div className="text-slate-500 font-bold italic">Interactive Mathematical Question</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2 shrink-0">
                                                    {statusBadge}
                                                    <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 flex items-center gap-1">
                                                        <Clock size={12} /> {data.timeSpent || 0}s
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Details section */}
                                            <div className="pl-12">
                                                {data.options ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                                        {data.options.map((opt, optIdx) => {
                                                            let optBg = "bg-slate-50";
                                                            let optBorder = "border-slate-200";
                                                            let optText = "text-slate-600 font-medium";
                                                            let Icon = null;

                                                            if (optIdx === data.correctIndex) {
                                                                optBg = "bg-green-50/50";
                                                                optBorder = "border-green-400 outline outline-2 outline-green-400 shadow-sm";
                                                                optText = "text-green-800 font-bold";
                                                                Icon = <CheckCircle2 size={16} className="text-green-600 shrink-0" />;
                                                            } else if (optIdx === data.selected && !isCorrect) {
                                                                optBg = "bg-red-50/50";
                                                                optBorder = "border-red-300";
                                                                optText = "text-red-700 font-bold opacity-80";
                                                                Icon = <XCircle size={16} className="text-red-500 shrink-0" />;
                                                            }

                                                            return (
                                                                <div key={optIdx} className={`p-3 rounded-xl border ${optBorder} ${optBg} flex items-center gap-3 transition-all`}>
                                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${optIdx === data.correctIndex ? 'bg-green-200 text-green-800' : (optIdx === data.selected && !isCorrect) ? 'bg-red-200 text-red-800' : 'bg-slate-200 text-slate-500'}`}>
                                                                        {String.fromCharCode(65 + optIdx)}
                                                                    </div>
                                                                    <span className={`flex-1 text-sm md:text-base ${optText}`}>{opt}</span>
                                                                    {Icon}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Your Answer</span>
                                                            <span className={`font-bold ${isSkipped ? 'text-slate-400 italic' : isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                                                {isSkipped ? 'None' : (data.selectedText || `Option ${data.selected + 1}`)}
                                                            </span>
                                                        </div>
                                                        <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
                                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Correct Answer</span>
                                                            <span className="font-bold text-indigo-600">
                                                                {data.correctText || `Option ${data.correctIndex + 1}`}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Expandable Solution */}
                                                <div className="mt-2">
                                                    <button
                                                        onClick={() => toggleExpand(index)}
                                                        className="flex items-center gap-2 text-indigo-500 font-bold text-sm hover:text-indigo-600 transition-colors bg-indigo-50/50 px-3 py-1.5 rounded-lg border border-indigo-100/50 active:scale-[0.98]"
                                                    >
                                                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                        {isExpanded ? 'Hide Solution' : 'Check Solution'}
                                                    </button>

                                                    <AnimatePresence>
                                                        {isExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="bg-amber-50 rounded-xl p-4 mt-3 border border-amber-100 text-slate-700 text-sm font-medium leading-relaxed">
                                                                    <div className="font-bold text-amber-800 mb-1 flex items-center gap-2">
                                                                        💡 Step-by-Step Logic
                                                                    </div>
                                                                    {data.explanation || "The solution logic is derived from the mathematical properties of the question above."}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="bg-white p-6 border-t border-slate-100 shrink-0">
                            <button
                                onClick={onReturn}
                                className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold text-lg hover:bg-slate-900 shadow-xl shadow-slate-200 transition-all active:scale-[0.98]"
                            >
                                Return to Skills Hub
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AssessReportModal;
