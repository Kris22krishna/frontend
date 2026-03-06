import React from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FunWithSymmetryReportModal = ({ isOpen, stats, onContinue }) => {
    if (!isOpen) return null;

    const { timeTaken, correctAnswers, totalQuestions } = stats;
    const wrongAnswers = totalQuestions - correctAnswers;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-[32px] max-w-sm w-full shadow-2xl overflow-hidden p-8 flex flex-col items-center text-center border-4 border-[#E0F7FA]"
                    >
                        <h2 className="text-3xl font-black text-[#31326F] mb-2">Practice Complete!</h2>
                        <div className="text-5xl mb-6">🎉</div>

                        <div className="w-full space-y-3 mb-8">
                            {/* Time Taken */}
                            <div className="bg-blue-50 p-4 rounded-2xl flex items-center justify-between border border-blue-100">
                                <div className="flex items-center gap-3 text-blue-800 font-bold">
                                    <Clock size={20} className="text-blue-500" />
                                    <span>Time Taken:</span>
                                </div>
                                <span className="text-[#31326F] font-black tracking-wider text-xl">{timeTaken}</span>
                            </div>

                            {/* Correct Answers */}
                            <div className="bg-green-50 p-4 rounded-2xl flex items-center justify-between border border-green-100">
                                <div className="flex items-center gap-3 text-green-700 font-bold">
                                    <CheckCircle2 size={20} className="text-green-500" />
                                    <span>Correct:</span>
                                </div>
                                <span className="text-green-600 font-black text-xl">{correctAnswers} / {totalQuestions}</span>
                            </div>

                            {/* Wrong Answers */}
                            <div className="bg-red-50 p-4 rounded-2xl flex items-center justify-between border border-red-100">
                                <div className="flex items-center gap-3 text-red-700 font-bold">
                                    <XCircle size={20} className="text-red-500" />
                                    <span>Wrong:</span>
                                </div>
                                <span className="text-red-600 font-black text-xl">{wrongAnswers} / {totalQuestions}</span>
                            </div>
                        </div>

                        <button
                            onClick={onContinue}
                            className="w-full py-4 bg-[#0097A7] text-white rounded-2xl font-black text-xl shadow-lg hover:bg-[#00838F] border-b-4 border-[#006064] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                        >
                            Back to Topics
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FunWithSymmetryReportModal;
