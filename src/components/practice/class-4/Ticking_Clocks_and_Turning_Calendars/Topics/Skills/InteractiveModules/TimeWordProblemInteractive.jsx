import React, { useState, useEffect } from 'react';
import InteractiveQuizEngine from './InteractiveQuizEngine';

const formatTime = (totalMins) => {
    let hrs = Math.floor(totalMins / 60);
    let mins = totalMins % 60;
    let ampm = hrs >= 12 && hrs < 24 ? "PM" : "AM";
    let displayHrs = hrs % 12 || 12;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    return `${displayHrs}:${displayMins} ${ampm}`;
};

const formatDur = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    if (h > 0 && m > 0) return `${h} hr ${m} min`;
    if (h > 0) return `${h} hr`;
    return `${m} min`;
};

const generateWordProblems = () => {
    const questions = [];
    const usedSigs = new Set();

    const addQ = (icon, text, correctAns, wrong1, wrong2, expl) => {
        const sig = `${icon}-${text}`;
        if (!usedSigs.has(sig)) {
            const opts = [correctAns, wrong1, wrong2];
            for (let i = opts.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [opts[i], opts[j]] = [opts[j], opts[i]];
            }
            questions.push({
                id: questions.length,
                icon, text, options: opts, correctIndex: opts.indexOf(correctAns), explanation: expl
            });
            usedSigs.add(sig);
            return true;
        }
        return false;
    };

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // 1-5: Add fixed minutes
    while (questions.length < 5) {
        let hr = rand(7, 10);
        let startM = hr * 60 + [0, 15, 30][rand(0, 2)];
        let delayM = [15, 20, 30, 45][rand(0, 3)];
        let endM = startM + delayM;
        const eventOpt = ["school bus arrives at", "train leaves at", "movie starts at"][rand(0, 2)];
        const icon = eventOpt.includes('bus') ? '🚌' : eventOpt.includes('train') ? '🚂' : '🎬';
        addQ(icon, `The ${eventOpt} ${formatTime(startM)}. Today it was ${delayM} minutes late. What time did it arrive?`, formatTime(endM), formatTime(startM + delayM + 15), formatTime(startM + delayM - 15), `${formatTime(startM)} + ${delayM} mins = ${formatTime(endM)}`);
    }

    // 6-10: Subtract fixed minutes
    while (questions.length < 10) {
        let hr = rand(14, 18); // 2 PM to 6 PM
        let endM = hr * 60 + [15, 30, 45][rand(0, 2)];
        let cookM = [30, 45, 60, 90][rand(0, 3)];
        let startM = endM - cookM;
        addQ("🎂", `A cake takes ${formatDur(cookM)} to bake. It finished baking at ${formatTime(endM)}. What time did it go into the oven?`, formatTime(startM), formatTime(startM - 30), formatTime(startM + 30), `${formatTime(endM)} minus ${formatDur(cookM)} = ${formatTime(startM)}`);
    }

    // 11-15: Find duration cross AM/PM
    while (questions.length < 15) {
        let hr = rand(18, 21); // 6 PM to 9 PM
        let startM = hr * 60 + [0, 15, 30][rand(0, 2)];
        let sleepH = rand(8, 11);
        let endM = startM + (sleepH * 60);
        addQ("🛌", `Rani went to sleep at ${formatTime(startM)} and woke up at ${formatTime(endM)}. How long did she sleep?`, `${sleepH} hours`, `${sleepH - 1} hours`, `${sleepH + 1} hours`, `From ${formatTime(startM)} to ${formatTime(endM)} is exactly ${sleepH} hours.`);
    }

    // 16-20: Multi-step/Weeks
    while (questions.length < 20) {
        let days = rand(15, 35);
        let events = ["summer camp", "vacation", "school project", "art workshop"];
        let event = events[rand(0, events.length - 1)];
        let weeks = Math.floor(days / 7);
        let extraDays = days % 7;
        let ans = extraDays === 0 ? `${weeks} weeks` : `${weeks} weeks and ${extraDays} days`;
        let w1 = extraDays === 0 ? `${weeks - 1} weeks` : `${weeks - 1} weeks and ${extraDays + 2} days`;
        let w2 = `${weeks + 1} weeks`;
        addQ("📅", `A ${event} lasts exactly ${days} days. How many weeks and days is that?`, ans, w1, w2, `There are 7 days in a week. ${days} ÷ 7 = ${weeks} weeks with ${extraDays} days left over.`);
    }

    return questions;
};

const WordProblemScene = ({ icon }) => {
    return (
        <div className="w-full max-w-[300px] h-[100px] bg-indigo-50 rounded-3xl border-2 border-indigo-100 flex items-center justify-center relative shadow-inner overflow-hidden mx-auto">
            {/* Background Decorations */}
            <div className="absolute top-[-20%] left-[-10%] w-[100px] h-[100px] bg-indigo-200 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute bottom-[-30%] right-[-10%] w-[100px] h-[100px] bg-pink-200 rounded-full blur-2xl opacity-50"></div>

            <div className="text-[4rem] animate-bounce z-10 filter drop-shadow-md">
                {icon}
            </div>
        </div>
    );
};

const TimeWordProblemInteractive = ({ mode, onBack, onComplete }) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        setQuestions(generateWordProblems());
    }, []);

    const handleComplete = (history, totalTime, qList) => {
        if (onComplete) onComplete(history, totalTime, qList);
    };

    if (questions.length === 0) return <div>Loading puzzles...</div>;

    return (
        <InteractiveQuizEngine
            mode={mode}
            title="Time Logic Puzzles"
            questions={questions}
            onComplete={handleComplete}
            onExit={onBack}
        >
            {(currentQ, selectedOption, onSelect, isSubmitted, isCorrect) => (
                <div className="flex flex-col items-center justify-start p-1 h-full gap-2">

                    <WordProblemScene icon={currentQ.icon} />

                    <div className="bg-[#fffbeb] p-3 md:p-4 rounded-2xl border-2 border-[#fcd34d] shadow-sm w-full max-w-[500px]">
                        <h2 className="text-sm md:text-base font-semibold text-[#0f172a] text-center leading-relaxed font-['Outfit']">
                            {currentQ.text}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-[500px]">
                        {currentQ.options.map((opt, i) => {
                            const isSelected = selectedOption === i;
                            const isCorrectOpt = currentQ.correctIndex === i;

                            let bgClass = "bg-white border-2 border-slate-200 text-slate-700 hover:border-indigo-500 hover:shadow-md";
                            if (!isSubmitted && isSelected) {
                                bgClass = "bg-indigo-50 border-4 border-indigo-500 text-indigo-800 scale-105 shadow-md font-bold";
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
                                    className={`py-2 px-3 md:py-3 md:px-4 rounded-xl transition-all duration-200 text-base md:text-lg font-['Outfit'] ${bgClass}`}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>

                    {isSubmitted && mode === 'practice' && (
                        <div className={`w-full max-w-[600px] mt-4 p-4 rounded-xl font-bold text-center border-2 shadow-sm ${isCorrect ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                            {isCorrect ? "Correct! Excellent logic!" : "Hmm... that's not right."}
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

export default TimeWordProblemInteractive;
