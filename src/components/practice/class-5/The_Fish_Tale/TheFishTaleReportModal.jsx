import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, Target, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TheFishTaleReportModal = ({ isOpen, stats, onClose, onContinue }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const percentage = Math.round((stats.correctAnswers / stats.totalQuestions) * 100);

    let message = "Good effort!";
    if (percentage >= 90) message = "Outstanding!";
    else if (percentage >= 70) message = "Great job!";
    else if (percentage >= 50) message = "You're getting there!";

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl relative overflow-hidden flex flex-col items-center text-center border-4 border-[#80DEEA]"
                >
                    <div className="absolute top-0 left-0 w-full h-32 bg-[#00ACC1] rounded-b-[50%] -z-10" />

                    <div className="bg-white p-4 rounded-full shadow-lg mb-4 border-4 border-[#00ACC1]">
                        <Trophy size={48} className="text-[#FFB300]" />
                    </div>

                    <h2 className="text-3xl font-bold text-[#006064] mb-2">{message}</h2>
                    <p className="text-[#00838F] font-bold mb-6">Chapter Completed!</p>

                    <div className="grid grid-cols-2 gap-4 w-full mb-8">
                        <div className="bg-[#E0F7FA] p-4 rounded-2xl flex flex-col items-center">
                            <Target size={24} className="text-[#00838F] mb-1" />
                            <span className="text-sm text-[#00838F] font-bold">Score</span>
                            <span className="text-xl font-bold text-[#006064]">
                                {stats.correctAnswers}/{stats.totalQuestions}
                            </span>
                        </div>
                        <div className="bg-[#E0F7FA] p-4 rounded-2xl flex flex-col items-center">
                            <Clock size={24} className="text-[#00838F] mb-1" />
                            <span className="text-sm text-[#00838F] font-bold">Time</span>
                            <span className="text-xl font-bold text-[#006064]">
                                {stats.timeTaken}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            if (onContinue) onContinue();
                            else navigate(-1);
                        }}
                        className="w-full py-4 bg-[#00838F] text-white rounded-2xl font-bold text-lg flex justify-center items-center gap-2 hover:bg-[#006064] transition-colors border-b-4 border-[#004D40] active:border-b-0 active:translate-y-1"
                    >
                        Continue <ArrowRight size={20} />
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default TheFishTaleReportModal;
