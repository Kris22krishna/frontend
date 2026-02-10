import React, { useState, useEffect } from 'react';

const BoxModel = ({ question, userAnswer, setUserAnswer, feedback, disabled, onCheck }) => {
    // We'll parse the question text and find boxes.
    // The structure will be: text... [input] ...text... [input]
    // We'll store an array of values for the boxes.
    const [boxValues, setBoxValues] = useState([]);

    // We'll use a regex to split the text. We support □ and {} as box markers.
    const placeholderRegex = /[□{}]/g;
    const parts = question.text ? question.text.split(placeholderRegex) : ["Text missing"];
    const boxCount = parts.length - 1;

    useEffect(() => {
        if (userAnswer && typeof userAnswer === 'string') {
            const vals = userAnswer.split('|');
            // If we have fewer values than boxes, pad with empty strings
            const padded = [...vals];
            while (padded.length < boxCount) padded.push('');
            setBoxValues(padded.slice(0, boxCount));
        } else {
            setBoxValues(new Array(boxCount).fill(''));
        }
    }, [userAnswer, boxCount]);

    const handleBoxChange = (index, value) => {
        const newVals = [...boxValues];
        newVals[index] = value;
        setBoxValues(newVals);
        setUserAnswer(newVals.join('|'));
    };

    if (boxCount === 0 && question.text) {
        // Fallback for when model is set to Box but no placeholders are found
        return (
            <div className="box-model py-4 flex flex-col items-center">
                <p dangerouslySetInnerHTML={{ __html: question.text }} className="mb-4 text-xl" />
                <input
                    type="text"
                    className="middle-input max-w-sm"
                    value={userAnswer || ''}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    disabled={disabled}
                    onKeyDown={(e) => e.key === 'Enter' && !disabled && onCheck && onCheck()}
                />
            </div>
        );
    }

    return (
        <div className="box-model py-6">
            <div className="box-container flex flex-wrap items-center justify-center gap-4 text-4xl font-bold text-slate-800 leading-relaxed">
                {parts.map((text, idx) => (
                    <React.Fragment key={idx}>
                        <span dangerouslySetInnerHTML={{ __html: text }} />
                        {idx < boxCount && (
                            <input
                                type="text"
                                className={`inline-box w-32 h-24 text-center text-4xl border-4 border-slate-200 rounded-2xl focus:border-indigo-500 outline-none transition-all shadow-sm ${feedback ? (feedback === 'correct' ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50') : 'hover:border-indigo-300'
                                    } ${disabled ? 'opacity-90 cursor-default' : ''}`}
                                value={boxValues[idx] || ''}
                                onChange={(e) => handleBoxChange(idx, e.target.value)}
                                disabled={disabled}
                                onKeyDown={(e) => e.key === 'Enter' && !disabled && onCheck && onCheck()}
                                autoComplete="off"
                                placeholder="?"
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {feedback === 'incorrect' && question.correctAnswer && (
                <div className="mt-8 text-center">
                    <div className="inline-block px-4 py-2 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 font-medium">
                        Correct Answer: <span className="font-bold">{question.correctAnswer.replace(/\|/g, ' ')}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoxModel;
