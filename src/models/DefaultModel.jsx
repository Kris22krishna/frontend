import React from 'react';
import { Check } from 'lucide-react';

const DefaultModel = ({ question, userAnswer, setUserAnswer, feedback, disabled, onCheck }) => {
    const isMCQ = question.type === 'MCQ' || (question.options && question.options.length > 0);

    return (
        <div className="default-model">
            {isMCQ ? (
                <div className={`options-grid ${question.type === 'true_false' ? 'tf-grid' : ''}`}>
                    {question.options?.map((opt, idx) => {
                        const isSelected = userAnswer === opt;
                        let btnClass = `option-btn ${isSelected ? 'selected' : ''}`;
                        if (feedback) {
                            if (opt === question.correctAnswer) btnClass += ' correct';
                            else if (isSelected && feedback === 'incorrect') btnClass += ' wrong';
                        }

                        return (
                            <button
                                key={idx}
                                className={btnClass}
                                onClick={() => !disabled && setUserAnswer(opt)}
                                disabled={disabled}
                            >
                                <div className="opt-letter">{String.fromCharCode(65 + idx)}</div>
                                <span>{opt}</span>
                                {feedback && opt === question.correctAnswer && <Check size={20} className="ml-auto text-green-600" />}
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div className="input-container">
                    <input
                        type="text"
                        className="middle-input"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type your answer..."
                        disabled={disabled}
                        onKeyDown={(e) => e.key === 'Enter' && !disabled && onCheck && onCheck()}
                    />
                </div>
            )}
        </div>
    );
};

export default DefaultModel;
