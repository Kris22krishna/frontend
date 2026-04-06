import React from 'react';
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
                        className="bg-white rounded-[32px] max-w-sm w-full shadow-2xl overflow-hidden p-8 flex flex-col items-center text-center"
                    >
                        <h2 className="text-3xl font-black text-[#31326F] mb-2 font-['Open_Sans']">Practice Complete!</h2>
                        <div className="text-5xl mb-8">🥳</div>

                        <div className="w-full space-y-4 mb-8">
                            {/* Time Taken */}
                            <div className="bg-[#F8FAFC] p-5 rounded-2xl flex items-center justify-between border border-[#E2E8F0]">
                                <span className="text-[#31326F] font-bold text-lg">Time Taken:</span>
                                <span className="text-[#31326F] font-black text-xl">{timeTaken}</span>
                            </div>

                            {/* Correct Answers */}
                            <div className="bg-[#F0FDF4] p-5 rounded-2xl flex items-center justify-between border border-[#DCFCE7]">
                                <span className="text-[#15803D] font-bold text-lg">Correct Answers:</span>
                                <span className="text-[#15803D] font-black text-xl">{correctAnswers} / {totalQuestions}</span>
                            </div>

                            {/* Wrong Answers */}
                            <div className="bg-[#FEF2F2] p-5 rounded-2xl flex items-center justify-between border border-[#FEE2E2]">
                                <span className="text-[#B91C1C] font-bold text-lg">Wrong Answers:</span>
                                <span className="text-[#B91C1C] font-black text-xl">{wrongAnswers} / {totalQuestions}</span>
                            </div>
                        </div>

                        <button
                            onClick={onContinue}
                            className="w-full py-4 bg-[#31326F] text-white rounded-2xl font-black text-xl shadow-lg hover:bg-[#252655] active:translate-y-1 transition-all"
                        >
                            Continue
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FunWithSymmetryReportModal;
