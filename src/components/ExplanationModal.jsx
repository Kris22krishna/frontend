import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LatexText } from './LatexText';
import mascotImg from '../assets/mascot.png';
import './ExplanationModal.css';

const ExplanationModal = ({ isOpen, isCorrect, correctAnswer, explanation, onClose, onNext }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-2">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white dark:bg-slate-900 rounded-[20px] lg:rounded-[32px] max-w-3xl w-full shadow-2xl flex flex-col lg:flex-row max-h-[85vh] sm:max-h-[95vh] border-4 border-white dark:border-slate-800 overflow-hidden"
                    >
                        {/* Left: Mascot Area (side panel on desktop, top on mobile) */}
                        <div className="flex-shrink-0 bg-[#E0FBEF] flex flex-col items-center justify-center p-2 lg:p-4 lg:w-[180px] relative">
                            <img src={mascotImg} alt="Mascot" className="w-16 h-16 lg:w-28 lg:h-28 object-contain drop-shadow-xl" />
                            <div className="mt-1 lg:mt-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-3 py-0.5 rounded-full border border-[#4FB7B3]/30">
                                <span className="text-[#31326F] dark:text-[#A8FBD3] font-bold text-xs lg:text-sm">Keep going!</span>
                            </div>
                        </div>

                        {/* Right: Content Area */}
                        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-900">
                            {/* Scrollable Explanation Content */}
                            <div className="flex-1 overflow-y-auto p-4 lg:p-6 pb-2">
                                <div className="flex items-center gap-3 mb-3 lg:mb-4">
                                    {!isCorrect ? (
                                        <>
                                            <div className="w-8 h-8 lg:w-9 lg:h-9 bg-red-100 rounded-full flex items-center justify-center">
                                                <X className="w-5 h-5 lg:w-6 lg:h-6 text-red-500" />
                                            </div>
                                            <h3 className="text-lg lg:text-2xl font-black text-[#31326F] dark:text-white">Not quite right</h3>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-8 h-8 lg:w-9 lg:h-9 bg-green-100 rounded-full flex items-center justify-center">
                                                <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" />
                                            </div>
                                            <h3 className="text-lg lg:text-2xl font-black text-[#31326F] dark:text-white">Excellent!</h3>
                                        </>
                                    )}
                                </div>

                                {!isCorrect && (
                                    <div className="mb-3 lg:mb-4">
                                        <p className="text-[#4FB7B3] text-[10px] lg:text-xs font-black uppercase tracking-widest mb-1">Correct Answer</p>
                                        <div className="bg-[#E0FBEF]/50 p-2 lg:p-3 rounded-xl flex items-center gap-3 border border-[#4FB7B3]/20">
                                            <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 border-[#4FB7B3] flex items-center justify-center shadow-sm">
                                                <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-[#4FB7B3] rounded-full" />
                                            </div>
                                            <span className="text-base lg:text-lg font-bold text-[#31326F] dark:text-white">
                                                {React.isValidElement(correctAnswer) ? correctAnswer : <LatexText text={correctAnswer} />}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-2">
                                    <p className="text-blue-400 text-[10px] lg:text-xs font-black uppercase tracking-widest mb-2">Why is this correct?</p>
                                    <div className="explanation-text-container text-gray-600 text-sm lg:text-base leading-loose whitespace-pre-line">
                                        <LatexText text={explanation || "Great effort! Keep practicing to master this concept."} />
                                    </div>
                                </div>
                            </div>

                            {/* Fixed Action Area */}
                            <div className="flex justify-end p-4 lg:p-6 pt-2 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                                <button
                                    onClick={onNext || onClose}
                                    className="flex items-center gap-2 px-6 lg:px-8 py-2.5 lg:py-3 bg-[#31326F] text-white rounded-xl font-black text-sm lg:text-base shadow-lg hover:shadow-xl hover:bg-[#25265E] transition-all"
                                >
                                    Got it
                                    <CheckCircle2 size={18} className="lg:w-5 lg:h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ExplanationModal;
