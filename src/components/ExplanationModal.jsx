import React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import LatexContent from './LatexContent';
import './ExplanationModal.css';
import avatarImg from '../assets/avatar.png'; // Reusing the mascot

const ExplanationModal = ({ isOpen, isCorrect, correctAnswer, explanation, onClose, onNext }) => {
    if (!isOpen) return null;

    return (
        <div className="explanation-modal-overlay">
            <div className={`explanation-modal-content ${isCorrect ? 'correct-theme' : 'wrong-theme'}`}>

                {/* Close Button Removed as per user request */}

                <div className="explanation-body">
                    {/* Mascot Side */}
                    <div className="explanation-mascot-col">
                        <img src={avatarImg} alt="Mascot" className="explanation-mascot-img" />
                    </div>

                    {/* Content Side */}
                    <div className="explanation-text-col">

                        {/* Header */}
                        <div className="explanation-header">
                            {isCorrect ? (
                                <>
                                    <div className="icon-circle correct"><Check size={32} /></div>
                                    <h2>Great job!</h2>
                                </>
                            ) : (
                                <>
                                    <div className="icon-circle wrong"><X size={32} /></div>
                                    <h2>Not quite right</h2>
                                </>
                            )}
                        </div>

                        {/* Correct Answer Display (if wrong) */}
                        {!isCorrect && (
                            <div className="correct-answer-box">
                                <span className="label">CORRECT ANSWER</span>
                                <div className="answer-value">
                                    <Check size={20} className="mini-check" />
                                    <LatexContent html={correctAnswer} />
                                </div>
                            </div>
                        )}

                        {/* Explanation Text */}
                        <div className="explanation-detail">
                            <h3>WHY IS THIS CORRECT?</h3>
                            <div className="explanation-html-content">
                                <LatexContent html={explanation || "Great effort! Keep practicing to master this concept."} />
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="explanation-actions">
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
