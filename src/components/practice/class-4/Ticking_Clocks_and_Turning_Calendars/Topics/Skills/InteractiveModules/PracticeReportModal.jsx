import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

const PracticeReportModal = ({ isOpen, stats, onTryAgain, onReturn }) => {
    if (!isOpen || !stats) return null;

    const { correctAnswers, totalQuestions, timeTaken } = stats;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const dashArray = `${percentage} ${100 - percentage}`;

    // Determine medal/emoji based on score
    let emoji = '💪';
    let message = 'Keep Learning!';
    let subMessage = 'Review the concepts and try again for 100%.';

    if (percentage === 100) {
        emoji = '🏆';
        message = 'Perfect Score!';
        subMessage = 'Excellent work mastering this skill!';
    } else if (percentage >= 80) {
        emoji = '🌟';
        message = 'Great Job!';
        subMessage = 'You are very close to perfection.';
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 font-outfit">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden p-8 flex flex-col items-center text-center"
                    >
                        {/* Doughnut Chart */}
                        <div className="relative w-48 h-48 mb-6">
                            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                {/* Background Circle */}
                                <path
                                    className="text-slate-100"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                {/* Progress Circle */}
                                <path
                                    className="text-indigo-500 transition-all duration-1000 ease-out"
                                    strokeDasharray={dashArray}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                            </svg>
                            {/* Inner Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800">
                                <span className="text-5xl font-black">{correctAnswers}</span>
                                <span className="text-sm font-bold text-slate-400 mt-1">out of {totalQuestions}</span>
                            </div>
                        </div>

                        {/* Time Taken */}
                        <div className="bg-indigo-50 text-indigo-600 px-5 py-2.5 rounded-full flex items-center gap-2 font-bold mb-8">
                            <Clock size={18} />
                            Time Taken: {Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, '0')}
                        </div>

                        {/* Encouragement */}
                        <div className="text-4xl mb-3">{emoji}</div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">{message}</h2>
                        <p className="text-slate-500 font-medium mb-8">
                            {subMessage}
                        </p>

                        {/* Actions */}
                        <div className="flex w-full gap-3">
                            <button
                                onClick={onTryAgain}
                                className="flex-1 py-4 bg-indigo-500 text-white rounded-2xl font-bold hover:bg-indigo-600 shadow-md transition-all active:scale-95"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={onReturn}
                                className="flex-1 py-4 bg-white text-slate-700 rounded-2xl font-bold border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
                            >
                                Return to Skills
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PracticeReportModal;
