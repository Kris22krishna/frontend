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
                        <div className="flex-shrink-0 bg-[#E0FBEF] flex flex-col items-center justify-center p-3 lg:p-6 lg:w-[220px] relative">
                            <img src={mascotImg} alt="Mascot" className="w-20 h-20 lg:w-36 lg:h-36 object-contain drop-shadow-xl" />
                            <div className="mt-2 lg:mt-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-1 rounded-full border border-[#4FB7B3]/30">
                                <span className="text-[#31326F] dark:text-[#A8FBD3] font-bold text-sm lg:text-base">Keep going!</span>
                            </div>
                        </div>

                        {/* Right: Scrollable Explanation Content */}
                        <div className="flex-1 overflow-y-auto p-4 pb-6 lg:p-8">
                            <div className="flex items-center gap-3 mb-4 lg:mb-6">
                                {!isCorrect ? (
                                    <>
                                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-red-100 rounded-full flex items-center justify-center">
                                            <X className="w-5 h-5 lg:w-6 lg:h-6 text-red-500" />
                                        </div>
                                        <h3 className="text-xl lg:text-3xl font-black text-[#31326F] dark:text-white">Not quite right</h3>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" />
                                        </div>
                                        <h3 className="text-xl lg:text-3xl font-black text-[#31326F] dark:text-white">Excellent!</h3>
                                    </>
                                )}
                            </div>

                            {!isCorrect && (
                                <div className="mb-4 lg:mb-6">
                                    <p className="text-[#4FB7B3] text-xs lg:text-sm font-black uppercase tracking-widest mb-2">Correct Answer</p>
                                    <div className="bg-[#E0FBEF]/50 p-3 lg:p-4 rounded-2xl flex items-center gap-3 border border-[#4FB7B3]/20">
                                        <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 border-[#4FB7B3] flex items-center justify-center shadow-sm">
                                            <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 bg-[#4FB7B3] rounded-full" />
                                        </div>
                                        <span className="text-lg lg:text-xl font-bold text-[#31326F] dark:text-white">
                                            <LatexText text={correctAnswer} />
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex-1">
                                <p className="text-blue-400 text-sm font-black uppercase tracking-widest mb-3">Why is this correct?</p>
                                <div className="text-gray-600 text-lg leading-relaxed pr-4 scrollbar-thin whitespace-pre-line">
                                    {/* Render explanation text with LaTeX support */}
                                    <LatexText text={explanation || "Great effort! Keep practicing to master this concept."} />
                                </div>
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={onNext || onClose}
                                    className="flex items-center gap-2 px-6 lg:px-10 py-3 lg:py-4 bg-[#31326F] text-white rounded-2xl font-black text-base lg:text-lg shadow-lg hover:shadow-xl hover:bg-[#25265E] transition-all"
                                >
                                    Got it
                                    <CheckCircle2 size={20} className="lg:w-6 lg:h-6" />
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
