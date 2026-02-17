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
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white dark:bg-slate-900 rounded-[32px] lg:rounded-[40px] max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto border-4 border-white dark:border-slate-800"
                    >
                        {/* Left Side: Mascot Area */}
                        <div className="flex-[4] bg-[#E0FBEF] flex flex-col items-center justify-center p-6 lg:p-8 relative min-h-[200px] lg:min-h-0 shrink-0">
                            <img src={mascotImg} alt="Mascot" className="w-32 h-32 lg:w-64 lg:h-64 object-contain drop-shadow-xl" />
                            <div className="mt-4 lg:mt-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-6 py-2 rounded-full border border-[#4FB7B3]/30">
                                <span className="text-[#31326F] dark:text-[#A8FBD3] font-bold">Keep going!</span>
                            </div>
                        </div>

                        {/* Right Side: Explanation Content */}
                        <div className="flex-[6] p-6 lg:p-12 flex flex-col">
                            <div className="flex items-center gap-3 mb-8">
                                {!isCorrect ? (
                                    <>
                                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                            <X className="w-6 h-6 text-red-500" />
                                        </div>
                                        <h3 className="text-3xl font-black text-[#31326F] dark:text-white">Not quite right</h3>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                                        </div>
                                        <h3 className="text-3xl font-black text-[#31326F] dark:text-white">Excellent!</h3>
                                    </>
                                )}
                            </div>

                            {!isCorrect && (
                                <div className="mb-8">
                                    <p className="text-[#4FB7B3] text-sm font-black uppercase tracking-widest mb-3">Correct Answer</p>
                                    <div className="bg-[#E0FBEF]/50 p-4 rounded-2xl flex items-center gap-3 border border-[#4FB7B3]/20">
                                        <div className="w-6 h-6 rounded-full border-2 border-[#4FB7B3] flex items-center justify-center shadow-sm">
                                            <div className="w-3 h-3 bg-[#4FB7B3] rounded-full" />
                                        </div>
                                        <span className="text-xl font-bold text-[#31326F] dark:text-white">
                                            <LatexText text={correctAnswer} />
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex-1">
                                <p className="text-blue-400 text-sm font-black uppercase tracking-widest mb-3">Why is this correct?</p>
                                <div className="text-gray-600 text-lg leading-relaxed pr-4">
                                    {/* Render explanation text with LaTeX support */}
                                    <LatexText text={explanation || "Great effort! Keep practicing to master this concept."} />
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={onNext || onClose}
                                    className="flex items-center gap-2 px-10 py-4 bg-[#31326F] text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:bg-[#25265E] transition-all"
                                >
                                    Got it
                                    <CheckCircle2 size={24} />
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
