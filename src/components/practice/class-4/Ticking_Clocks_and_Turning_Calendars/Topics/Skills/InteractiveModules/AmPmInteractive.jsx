import React, { useState, useEffect } from 'react';
import InteractiveQuizEngine from './InteractiveQuizEngine';
import { Sun, Moon, CloudSun, Stars } from 'lucide-react';

const generateAmPmQuestions = () => {
    const questions = [];
    const usedIds = new Set(); // Ensure uniqueness by string signature

    const addQ = (text, hour, isAm, expl) => {
        const sig = `${text}-${hour}`;
        if (!usedIds.has(sig)) {
            questions.push({
                id: questions.length,
                text,
                hour,
                options: ["AM", "PM"],
                correctIndex: isAm ? 0 : 1,
                explanation: expl
            });
            usedIds.add(sig);
            return true;
        }
        return false;
    };

    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randHour = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // 1-5: Obvious Morning
    const morningActs = ["Waking up", "Eating breakfast", "Waiting for the school bus", "Sun is rising", "Morning recess", "First class of the day", "Brushing teeth after waking up"];
    while (questions.length < 5) {
        const act = rand(morningActs);
        const hr = randHour(6, 11);
        addQ(`${act} at ${hr}:00`, hr, true, `Morning activities happen in the AM before noon.`);
    }

    // 6-10: Obvious Evening/Night
    const eveningActs = ["Going to sleep", "Watching the stars", "Eating dinner", "Snack after school", "Doing evening homework", "Watching the sunset", "Story time before bed"];
    while (questions.length < 10) {
        const act = rand(eveningActs);
        const hr = randHour(5, 10);
        addQ(`${act} at ${hr}:00`, hr, false, `Evening and night activities happen in the PM.`);
    }

    // 11-15: Tricky times (afternoon vs early morning)
    const afternoonActs = ["Eating lunch at school", "Afternoon recess", "Leaving school", "Mid-day break"];
    const lateNightActs = ["Deep asleep", "Middle of the night", "Too dark to see outside"];
    while (questions.length < 15) {
        if (Math.random() > 0.5) {
            const act = rand(afternoonActs);
            const hr = randHour(1, 4);
            addQ(`${act} at ${hr}:00`, hr, false, `Afternoon hours (after 12 Noon) are PM.`);
        } else {
            const act = rand(lateNightActs);
            const hr = randHour(1, 4);
            addQ(`${act} at ${hr}:00`, hr, true, `The dark hours early in the day (like ${hr}:00) are actually AM.`);
        }
    }

    // 16-20: Noon vs Midnight boundaries
    const boundaryActs = [
        { text: "Exactly Noon (middle of the day)", hour: 12, isAm: false, expl: "Noon is exactly 12:00 PM." },
        { text: "Exactly Midnight (middle of the night)", hour: 12, isAm: true, expl: "Midnight is exactly 12:00 AM." },
        { text: "One minute before Noon (11:59 daytime)", hour: 11, isAm: true, expl: "It is still morning right before noon, so it's 11:59 AM." },
        { text: "One minute after Noon (12:01 daytime)", hour: 12, isAm: false, expl: "Right after noon starts the PM cycle." },
        { text: "One minute after Midnight (12:01 night)", hour: 12, isAm: true, expl: "Right after midnight starts the AM cycle." },
        { text: "Eating a late lunch at 12:30", hour: 12, isAm: false, expl: "Any time between 12 Noon and midnight is PM." },
        { text: "Hearing a spooky owl at 12:30 at night", hour: 12, isAm: true, expl: "Any time between 12 Midnight and noon is AM." },
        { text: "Lunchtime bell rings at 12:00 exactly", hour: 12, isAm: false, expl: "12:00 in the daytime is 12:00 PM." }
    ];
    while (questions.length < 20) {
        const act = rand(boundaryActs);
        addQ(act.text, act.hour, act.isAm, act.expl);
    }

    return questions;
};

const SkyIllustration = ({ isAm }) => {
    if (isAm) {
        return (
            <div className="relative w-full h-32 md:h-40 rounded-3xl overflow-hidden bg-gradient-to-b from-sky-400 to-sky-100 flex items-center justify-center border-4 border-sky-200">
                <Sun className="text-yellow-400 w-20 h-20 md:w-24 md:h-24 absolute top-2 md:top-4 left-6 md:left-8 animate-spin-slow" />
                <CloudSun className="text-white/80 w-24 h-24 md:w-32 md:h-32 absolute bottom-1 right-2 md:right-4" />
                <div className="absolute bottom-0 w-full h-10 md:h-12 bg-green-400 rounded-t-[50%] opacity-80" />
            </div>
        );
    } else {
        return (
            <div className="relative w-full h-32 md:h-40 rounded-3xl overflow-hidden bg-gradient-to-b from-indigo-900 to-indigo-600 flex items-center justify-center border-4 border-indigo-400">
                <Moon className="text-yellow-100 w-16 h-16 md:w-20 md:h-20 absolute top-4 md:top-6 right-6 md:right-8" />
                <Stars className="text-white/60 w-24 h-24 md:w-32 md:h-32 absolute top-2 left-4 animate-pulse" />
                <div className="absolute bottom-0 w-full h-10 md:h-12 bg-indigo-950 rounded-t-[50%] opacity-80" />
            </div>
        );
    }
};

const AmPmInteractive = ({ mode, onBack, onComplete }) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        setQuestions(generateAmPmQuestions());
    }, []);

    const handleComplete = (history, totalTime, qList) => {
        if (onComplete) onComplete(history, totalTime, qList);
    };

    if (questions.length === 0) return <div>Loading AM/PM scenarios...</div>;

    return (
        <InteractiveQuizEngine
            mode={mode}
            title="AM and PM"
            questions={questions}
            onComplete={handleComplete}
            onExit={onBack}
        >
            {(currentQ, selectedOption, onSelect, isSubmitted, isCorrect) => {
                // Determine what sky to show based on selected option. If none, show neutral or random
                const showAm = selectedOption === 0 || (isSubmitted && currentQ.correctIndex === 0 && selectedOption === null);

                return (
                    <div className="flex flex-col items-center justify-start p-1 h-full gap-2 md:gap-3">
                        <h2 className="text-base md:text-lg font-bold text-[#31326F] text-center font-['Outfit'] mt-1">
                            {currentQ.text}
                        </h2>

                        <div className="w-full max-w-[350px]">
                            {/* Dynamic Illustration based on selection */}
                            {selectedOption !== null ? (
                                <SkyIllustration isAm={selectedOption === 0} />
                            ) : (
                                <div className="relative w-full h-32 md:h-40 rounded-3xl overflow-hidden bg-gradient-to-r from-sky-400 to-indigo-900 flex items-center justify-center border-4 border-slate-200">
                                    <div className="text-white font-bold text-base md:text-xl drop-shadow-md">Select AM or PM</div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 w-full justify-center mt-1 max-w-[400px]">
                            {currentQ.options.map((opt, i) => {
                                const isSelected = selectedOption === i;
                                const isCorrectOpt = currentQ.correctIndex === i;

                                let bgClass = "bg-white border-2 border-slate-200 text-slate-700 hover:border-[#f59e0b] hover:shadow-md";
                                if (!isSubmitted && isSelected) {
                                    bgClass = i === 0
                                        ? "bg-sky-100 border-4 border-sky-400 text-sky-800 scale-105 shadow-md font-bold"
                                        : "bg-indigo-100 border-4 border-indigo-400 text-indigo-900 scale-105 shadow-md font-bold";
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
                                        className={`py-4 px-4 rounded-2xl transition-all duration-200 text-xl md:text-2xl font-['Outfit'] ${bgClass} flex items-center justify-center gap-2 w-full`} // Ensure buttons shrink nicely
                                    >
                                        {i === 0 ? <Sun className={isSelected ? "text-yellow-500" : "text-slate-400"} size={20} /> : <Moon className={isSelected ? "text-indigo-500" : "text-slate-400"} size={20} />}
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>

                        {
                            isSubmitted && mode === 'practice' && (
                                <div className={`w-full max-w-[400px] mt-4 p-4 rounded-xl font-bold text-center border-2 shadow-sm ${isCorrect ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                                    {isCorrect ? "Correct! Great job!" : "Not quite!"}
                                    <div className="text-sm font-normal mt-2 opacity-80">
                                        {currentQ.explanation}
                                    </div>
                                </div>
                            )
                        }
                    </div >
                )
            }}
        </InteractiveQuizEngine >
    );
};

export default AmPmInteractive;
