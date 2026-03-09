import React, { useState, useEffect } from 'react';
import InteractiveQuizEngine from './InteractiveQuizEngine';

const generateLeapYearQuestions = () => {
    const questions = [];
    const usedYears = new Set();

    const addQ = (text, year, expl) => {
        if (!usedYears.has(year)) {
            const isCentury = year % 100 === 0;
            const divisor = isCentury ? 400 : 4;
            const isLeap = year % divisor === 0;

            questions.push({
                id: questions.length,
                text,
                year,
                options: ["Yes, it is!", "No, it's not."],
                correctIndex: isLeap ? 0 : 1,
                explanation: expl
            });
            usedYears.add(year);
            return true;
        }
        return false;
    };

    const randYear = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // 1-5: Recent obvious years (e.g. 2020-2035)
    while (questions.length < 5) {
        let y = randYear(2020, 2035);
        addQ(`Is ${y} a Leap Year?`, y, `${y} ÷ 4 = ${y / 4}. ${y % 4 === 0 ? "No remainder, so it is a leap year!" : "Leaves a decimal remainder, so it's not."}`);
    }

    // 6-15: Random non-century years across history (1701-2099)
    while (questions.length < 15) {
        let y = randYear(1701, 2099);
        if (y % 100 !== 0) {
            addQ(`Is ${y} a Leap Year?`, y, `Check by dividing by 4. ${y} ÷ 4 = ${y / 4}. ${y % 4 === 0 ? "Yes, it is!" : "No, it's not."}`);
        }
    }

    // 16-20: Century years testing the 400 rule
    const centuryYears = [1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600];
    while (questions.length < 20) {
        let y = centuryYears[Math.floor(Math.random() * centuryYears.length)];
        let isLeap = y % 400 === 0;
        addQ(`Century Year Check: Is ${y} a Leap Year?`, y, `Since it ends in "00", we divide by 400. ${y} ÷ 400 = ${y / 400}. ${isLeap ? "Yes, it is!" : "Because there is a decimal, it's not."}`);
    }

    return questions;
};

const CalculatorVisualizer = ({ year, isSubmitted }) => {
    // Determine the math to show
    let divisor = 4;
    let isCentury = year % 100 === 0;
    if (isCentury) divisor = 400;

    let result = (year / divisor).toFixed(2);
    let isLeap = year % divisor === 0;

    return (
        <div className="w-full max-w-[300px] bg-white rounded-3xl p-4 shadow-md border-2 border-slate-200 flex flex-col items-center gap-4 mx-auto">
            <div className="text-5xl animate-bounce">🐸</div>

            <div className="bg-slate-800 text-green-400 font-mono text-xl p-3 rounded-xl w-full text-right shadow-inner border-4 border-slate-700">
                {isSubmitted ? (
                    <div>
                        {year} ÷ {divisor} = <br />
                        <span className="text-2xl font-bold">{result}</span>
                    </div>
                ) : (
                    <div>{year} ÷ {divisor} = ?</div>
                )}
            </div>

            {isSubmitted && (
                <div className={`text-base font-bold font-['Outfit'] text-center ${isLeap ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                    {isLeap ? "No remainder! It's a Leap Year!" : "Has a decimal! Not a Leap Year."}
                </div>
            )}
        </div>
    );
};

const LeapYearInteractive = ({ mode, onBack, onComplete }) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        setQuestions(generateLeapYearQuestions());
    }, []);

    const handleComplete = (history, totalTime, qList) => {
        if (onComplete) onComplete(history, totalTime, qList);
    };

    if (questions.length === 0) return <div>Loading frog...</div>;

    return (
        <InteractiveQuizEngine
            mode={mode}
            title="Leap Year Checking"
            questions={questions}
            onComplete={handleComplete}
            onExit={onBack}
        >
            {(currentQ, selectedOption, onSelect, isSubmitted, isCorrect) => (
                <div className="flex flex-col items-center justify-start p-1 h-full gap-2 md:gap-3">

                    <CalculatorVisualizer year={currentQ.year} isSubmitted={isSubmitted} />

                    <h2 className="text-base md:text-lg font-bold text-[#31326F] text-center font-['Outfit'] mt-1">
                        Is {currentQ.year} a Leap Year?
                    </h2>

                    <div className="flex gap-2 lg:gap-4 w-full justify-center mt-1 max-w-[400px]">
                        {currentQ.options.map((opt, i) => {
                            const isSelected = selectedOption === i;
                            const isCorrectOpt = currentQ.correctIndex === i;

                            let bgClass = "bg-white border-2 border-slate-200 text-slate-700 hover:border-teal-500 hover:shadow-md";
                            if (!isSubmitted && isSelected) {
                                bgClass = "bg-teal-50 border-4 border-teal-500 text-teal-800 scale-105 shadow-md font-bold";
                            } else if (isSubmitted && isCorrectOpt) {
                                bgClass = "bg-[#D1FAE5] border-4 border-[#10B981] text-[#065F46] font-bold";
                            } else if (isSubmitted && isSelected && !isCorrectOpt) {
                                bgClass = "bg-[#FEE2E2] border-4 border-[#EF4444] text-[#991B1B] font-bold";
                            } else if (isSubmitted) {
                                bgClass = "bg-slate-50 border-2 border-slate-100 text-slate-400 opacity-60";
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => onSelect(i)}
                                    disabled={isSubmitted}
                                    className={`py-2 px-3 md:py-3 md:px-4 rounded-xl transition-all duration-200 text-base md:text-lg font-['Outfit'] w-full ${currentQ.options.length === 2 && i === 0 ? 'sm:col-start-1 lg:col-start-auto' : ''} ${bgClass}`}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>

                    {isSubmitted && mode === 'practice' && (
                        <div className={`w-full max-w-[600px] mt-4 p-4 rounded-xl font-bold text-center border-2 shadow-sm ${isCorrect ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                            {isCorrect ? "Correct! Great math!" : "Ribbit... Not quite!"}
                            <div className="text-sm font-normal mt-2 opacity-80">
                                {currentQ.explanation}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </InteractiveQuizEngine>
    );
};

export default LeapYearInteractive;
