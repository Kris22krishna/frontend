import React from 'react';
import { useNavigate } from 'react-router-dom';

const GenericReportCard = ({ score, totalQuestions, onRestart }) => {
    const navigate = useNavigate();

    const handleRestart = () => {
        if (onRestart) {
            onRestart();
        } else {
            window.location.reload();
        }
    };

    return (
        <div className="junior-practice-page results-view overflow-y-auto w-full h-full flex flex-col justify-center items-center">
            <div className="practice-content-wrapper flex-col items-center justify-center w-full">
                <h1 className="text-4xl font-black text-[#31326F] mb-6 text-center">Practice Complete! 🎉</h1>
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border-4 border-white text-center max-w-md w-full mx-auto">
                    <div className="flex justify-center mb-6">
                        <span className="text-8xl">🌟</span>
                    </div>
                    <h2 className="text-3xl font-bold text-[#31326F] mb-2">{score} / {totalQuestions} Correct</h2>
                    <p className="text-gray-500 mb-8 font-medium">Great effort!</p>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={handleRestart} className="py-3 rounded-xl bg-[#31326F] text-white font-bold text-lg hover:bg-[#25265E] transition-all">Practice Again</button>
                        <button onClick={() => navigate(-1)} className="py-3 rounded-xl border-2 border-[#31326F] text-[#31326F] font-bold text-lg hover:bg-blue-50 transition-all">Exit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenericReportCard;
