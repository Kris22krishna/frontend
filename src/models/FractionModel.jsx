import React, { useState, useEffect } from 'react';

const FractionModel = ({ question, userAnswer, setUserAnswer, feedback, disabled, onCheck }) => {
    // Expect userAnswer to be "num/den" or just "num"
    const [num, setNum] = useState('');
    const [den, setDen] = useState('');

    useEffect(() => {
        if (userAnswer && typeof userAnswer === 'string' && userAnswer.includes('/')) {
            const [n, d] = userAnswer.split('/');
            setNum(n || '');
            setDen(d || '');
        } else {
            setNum(userAnswer || '');
            setDen('');
        }
    }, [userAnswer]);

    const handleChange = (newNum, newDen) => {
        setNum(newNum);
        setDen(newDen);
        if (newDen) {
            setUserAnswer(`${newNum}/${newDen}`);
        } else {
            setUserAnswer(newNum);
        }
    };

    return (
        <div className="fraction-model flex flex-col items-center gap-4 py-6">
            <div className="fraction-input-wrapper flex flex-col items-center">
                <input
                    type="text"
                    className="fraction-input num-input text-center text-2xl w-20 border-b-2 border-slate-400 p-2 focus:border-blue-500 outline-none"
                    value={num}
                    onChange={(e) => handleChange(e.target.value, den)}
                    placeholder="Num"
                    disabled={disabled}
                />
                <input
                    type="text"
                    className="fraction-input den-input text-center text-2xl w-20 p-2 focus:border-blue-500 outline-none"
                    value={den}
                    onChange={(e) => handleChange(num, e.target.value)}
                    placeholder="Den"
                    disabled={disabled}
                    onKeyDown={(e) => e.key === 'Enter' && !disabled && onCheck && onCheck()}
                />
            </div>

            {feedback && (
                <div className="correct-fraction-display mt-2 animate-bounce">
                    {feedback === 'incorrect' && (
                        <div className="text-sm text-slate-500">
                            Correct: {question.correctAnswer}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FractionModel;
