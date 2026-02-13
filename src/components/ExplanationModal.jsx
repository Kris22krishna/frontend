import React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import LatexContent from './LatexContent';
import './ExplanationModal.css';
import avatarImg from '../assets/avatar.png'; // Reusing the mascot

const ExplanationModal = ({ isOpen, isCorrect, correctAnswer, explanation, onClose, onNext }) => {
    if (!isOpen) return null;

    return (
        <div className="explanation-modal-overlay">
            <div className={`explanation-modal-content dark:bg-slate-900 dark:border-slate-800 ${isCorrect ? 'correct-theme' : 'wrong-theme'}`}>

                {/* Close Button Removed as per user request */}

                <div className="explanation-body">
                    {/* Mascot Side */}
                    <div className="explanation-mascot-col">
                        <img src={avatarImg} alt="Mascot" className="explanation-mascot-img" />
                    </div>

                    {/* Content Side */}
                    <div className="explanation-text-col">

                        {/* Scrollable Content Wrapper */}
                        <div className="explanation-scroll-content">
                            {/* Header */}
                            <div className="explanation-header">
                                {isCorrect ? (
                                    <>
                                        <div className="icon-circle correct"><Check size={32} /></div>
                                        <h2 className="dark:text-white">Great job!</h2>
                                    </>
                                ) : (
                                    <>
                                        <div className="icon-circle wrong"><X size={32} /></div>
                                        <h2 className="dark:text-white">Not quite right</h2>
                                    </>
                                )}
                            </div>

                            {/* Correct Answer Display (if wrong) */}
                            {!isCorrect && (
                                <div className="correct-answer-box dark:bg-teal-900/30 dark:border-teal-800">
                                    <span className="label dark:text-teal-400">CORRECT ANSWER</span>
                                    <div className="answer-value dark:text-teal-200">
                                        <Check size={20} className="mini-check" />
                                        <LatexContent html={correctAnswer} />
                                    </div>
                                </div>
                            )}

                            {/* Explanation Text */}
                            <div className="explanation-detail">
                                <h3 className="dark:text-slate-400">WHY IS THIS CORRECT?</h3>
                                <div className="explanation-html-content dark:text-slate-300">
                                    <LatexContent html={explanation || "Great effort! Keep practicing to master this concept."} />
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="explanation-actions dark:bg-slate-900">
                            <button className="action-main-btn" onClick={onNext || onClose}>
                                {isCorrect ? 'Keep going!' : 'Got it'}
                                <ArrowRight size={20} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplanationModal;
