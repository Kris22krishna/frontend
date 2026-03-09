import React, { useState, useEffect } from 'react';
import InteractiveQuizEngine from './InteractiveQuizEngine';

// Utility to generate a random minute divisible by 5
const getRandomMinute = () => Math.floor(Math.random() * 12) * 5;
const getRandomHour = () => Math.floor(Math.random() * 12) + 1;

const formatTime = (h, m) => `${h}:${m.toString().padStart(2, '0')}`;

const generateClockQuestions = () => {
    const questions = [];
    const usedTimes = new Set();

    const getOptions = (correctH, correctM) => {
        const opts = [formatTime(correctH, correctM)];

        // Trick 1: Swap hour and minute hands visually
        let swapH = correctM === 0 ? 12 : Math.floor(correctM / 5) || 12;
        let swapM = correctH === 12 ? 0 : correctH * 5;
        opts.push(formatTime(swapH, swapM));

        // Trick 2: Same minutes, off by an hour
        opts.push(formatTime(correctH === 12 ? 1 : correctH + 1, correctM));

        // Trick 3: Same hour, opposite side of clock for minutes
        opts.push(formatTime(correctH, (correctM + 30) % 60));

        // Ensure 4 unique options
        let uniqueOpts = [...new Set(opts)];
        while (uniqueOpts.length < 4) {
            uniqueOpts.push(formatTime(Math.floor(Math.random() * 12) + 1, Math.floor(Math.random() * 60)));
            uniqueOpts = [...new Set(uniqueOpts)];
        }

        // Custom truncation if too many got pushed
        uniqueOpts = uniqueOpts.slice(0, 4);

        // Shuffle options
        for (let i = uniqueOpts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [uniqueOpts[i], uniqueOpts[j]] = [uniqueOpts[j], uniqueOpts[i]];
        }
        return uniqueOpts;
    };

    const addQ = (h, m) => {
        const sig = `${h}-${m}`;
        if (!usedTimes.has(sig)) {
            const opts = getOptions(h, m);
            let explMin = m === 0 ? "12 (0 minutes)" : m % 5 === 0 ? `${m / 5} (${m} minutes)` : `past the ${Math.floor(m / 5)} (${m} minutes)`;
            let explHour = m > 45 ? `almost at ${h === 12 ? 1 : h + 1}` : `past the ${h}`;

            questions.push({
                id: questions.length,
                hour: h,
                minute: m,
                options: opts,
                correctAnswerString: formatTime(h, m),
                correctIndex: opts.indexOf(formatTime(h, m)),
                explanation: `The short hand is ${explHour}, and the long hand points exactly to ${explMin}. Time is ${formatTime(h, m)}.`,
                text: `What time does the clock show? (Hour: ${h}, Minute: ${m === 0 ? '00' : m})`
            });
            usedTimes.add(sig);
            return true;
        }
        return false;
    };

    const randHour = () => Math.floor(Math.random() * 12) + 1;

    // 1-5: O'clock
    while (questions.length < 5) addQ(randHour(), 0);

    // 6-10: Half pasts and quarters
    const quarters = [15, 30, 45];
    while (questions.length < 10) addQ(randHour(), quarters[Math.floor(Math.random() * quarters.length)]);

    // 11-15: 5-minute intervals
    const mins5 = [5, 10, 20, 25, 35, 40, 50, 55];
    while (questions.length < 15) addQ(randHour(), mins5[Math.floor(Math.random() * mins5.length)]);

    // 16-20: Tricky exact times (e.g. 11:58, 1:04)
    const trickyMins = [1, 2, 4, 11, 23, 31, 46, 56, 58, 59];
    while (questions.length < 20) addQ(randHour(), trickyMins[Math.floor(Math.random() * trickyMins.length)]);

    return questions;
};

// SVG visual analog clock
const SVGClock = ({ hour, minute }) => {
    // Calculate rotation degrees
    const minuteDeg = minute * 6; // 360 / 60
    const hourDeg = (hour * 30) + (minute * 0.5); // 360 / 12 = 30; each minute adds 0.5 degree to hour hand

    return (
        <svg viewBox="0 0 200 200" className="w-full max-w-[200px] h-auto mx-auto filter drop-shadow-md">
            <circle cx="100" cy="100" r="95" fill="#f8fafc" stroke="#94a3b8" strokeWidth="8" />
            <circle cx="100" cy="100" r="85" fill="#ffffff" />

            {/* Clock Ticks */}
            {[...Array(12)].map((_, i) => (
                <line
                    key={i}
                    x1="100" y1="20" x2="100" y2="30"
                    stroke="#475569" strokeWidth="4" strokeLinecap="round"
                    transform={`rotate(${i * 30} 100 100)`}
                />
            ))}

            {/* Numbers */}
            {[...Array(12)].map((_, i) => {
                const angle = ((i + 1) * 30 - 90) * (Math.PI / 180);
                const x = 100 + Math.cos(angle) * 65;
                const y = 100 + Math.sin(angle) * 65;
                return (
                    <text
                        key={i} x={x} y={y}
                        fill="#0f172a" fontSize="18" fontWeight="bold"
                        textAnchor="middle" dominantBaseline="middle"
                        fontFamily="Outfit, sans-serif"
                    >
                        {i + 1}
                    </text>
                );
            })}

            {/* Hour Hand */}
            <line
                x1="100" y1="100" x2="100" y2="55"
                stroke="#31326F" strokeWidth="6" strokeLinecap="round"
                transform={`rotate(${hourDeg} 100 100)`}
            />

            {/* Minute Hand */}
            <line
                x1="100" y1="100" x2="100" y2="35"
                stroke="#ef4444" strokeWidth="4" strokeLinecap="round"
                transform={`rotate(${minuteDeg} 100 100)`}
            />

            {/* Center Pin */}
            <circle cx="100" cy="100" r="6" fill="#0f172a" />
            <circle cx="100" cy="100" r="3" fill="#ffffff" />
        </svg>
    );
};


const ReadingClockTime = ({ mode, onBack, onComplete }) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        setQuestions(generateClockQuestions());
    }, []);

    const handleComplete = (history, totalTime, qList) => {
        if (onComplete) onComplete(history, totalTime, qList);
    };

    if (questions.length === 0) return <div>Loading interactive clocks...</div>;

    return (
        <InteractiveQuizEngine
            mode={mode}
            title="Reading Clock Time"
            questions={questions}
            onComplete={handleComplete}
            onExit={onBack}
        >
            {(currentQ, selectedOption, onSelect, isSubmitted, isCorrect) => (
                <div className="flex flex-col items-center justify-center p-1 h-full gap-2 md:gap-3">
                    <h2 className="text-base md:text-lg font-bold text-[#31326F] text-center font-['Outfit'] mb-1">
                        What time does the clock show?
                    </h2>

                    <div className="bg-[#e0f8f8] p-2 rounded-3xl border-4 border-[#cff2f2] shadow-sm transform transition-transform duration-300 hover:scale-[1.02] w-full max-w-[150px] md:max-w-[180px]">
                        <SVGClock hour={currentQ.hour} minute={currentQ.minute} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:gap-3 w-full max-w-[450px]">
                        {currentQ.options.map((opt, i) => {
                            const isSelected = selectedOption === i;
                            const isCorrectOpt = currentQ.correctIndex === i;

                            let bgClass = "bg-white border-2 border-slate-200 text-slate-700 hover:border-[#0097A7] hover:shadow-md";
                            if (!isSubmitted && isSelected) {
                                bgClass = "bg-[#E0F7FA] border-4 border-[#0097A7] text-[#006064] scale-105 shadow-md font-bold";
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
                                    className={`py-2 px-3 md:py-3 md:px-4 rounded-xl transition-all duration-200 text-base md:text-lg font-['Outfit'] flex items-center justify-center min-h-[48px] ${bgClass}`}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>

                    {isSubmitted && mode === 'practice' && (
                        <div className={`mt-6 p-4 rounded-xl font-bold max-w-[400px] text-center border-2 shadow-sm ${isCorrect ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                            {isCorrect ? "Correct! Amazing job!" : "Not quite! Look at the hands closely."}
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

export default ReadingClockTime;
