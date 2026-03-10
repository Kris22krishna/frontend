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

const formatDurationText = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    if (h > 0 && m > 0) return `${h} hour${h > 1 ? 's' : ''} ${m} mins`;
    if (h > 0) return `${h} hour${h > 1 ? 's' : ''}`;
    return `${m} mins`;
};

const generateDurationQuestions = () => {
    const questions = [];
    const events = ["Movie", "Math Class", "School Assembly", "Piano Lesson", "Baking a Cake", "Reading a Book", "Grocery Shopping", "Soccer Practice", "Playing Video Games", "Road Trip", "Flight", "Festival", "Zoo Trip", "Hiking", "Swimming"];
    const usedCombos = new Set();

    const addQ = (startMins, durMins) => {
        const sig = `${startMins}-${durMins}`;
        if (!usedCombos.has(sig)) {
            const endMins = startMins + durMins;
            const startStr = formatTime(startMins);
            const endStr = formatTime(endMins);
            const correctText = formatDurationText(durMins);

            // Generate wrong options
            const wrong1 = formatDurationText(durMins + 30);
            const wrong2 = formatDurationText(durMins > 60 ? durMins - 60 : durMins + 60);

            // Shuffle
            const opts = [correctText, wrong1, wrong2];
            for (let i = opts.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [opts[i], opts[j]] = [opts[j], opts[i]];
            }

            questions.push({
                id: questions.length,
                event: events[Math.floor(Math.random() * events.length)],
                start: startStr,
                end: endStr,
                options: opts,
                correctIndex: opts.indexOf(correctText),
                explanation: `From ${startStr} to ${endStr} is exactly ${correctText}.`,
                text: `How long is the ${events[Math.floor(Math.random() * events.length)]} from ${startStr} to ${endStr}?`
            });
            usedCombos.add(sig);
            return true;
        }
        return false;
    };

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // 1-5: Full hours only, no noon cross
    while (questions.length < 5) {
        let hr = rand(7, 10); // 7 AM to 10 AM
        let dur = rand(1, 3) * 60; // 1 to 3 hours
        addQ(hr * 60, dur);
    }

    // 6-10: Half hours, no noon cross
    while (questions.length < 10) {
        let hr = rand(13, 16); // 1 PM to 4 PM
        let mins = rand(0, 1) === 0 ? 0 : 30;
        let dur = randHourPieces(1, 5) * 30; // 30, 60, 90, 120, 150
        addQ((hr * 60) + mins, dur);
    }

    function randHourPieces(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

    // 11-15: Crosses noon, Mix of 15/45 mins
    while (questions.length < 15) {
        let hr = rand(10, 11); // 10 or 11 AM
        let mins = [15, 30, 45][rand(0, 2)];
        let durHours = rand(2, 4); // Cross into PM
        let durMins = [15, 30, 45][rand(0, 2)];
        addQ((hr * 60) + mins, (durHours * 60) + durMins);
    }

    // 16-20: Tricky times (random 5 min intervals)
    while (questions.length < 20) {
        let hr = rand(8, 15);
        let mins = rand(1, 11) * 5; // e.g. 5, 10, 55
        let durMins = rand(4, 15) * 10; // e.g. 40 mins to 150 mins
        addQ((hr * 60) + mins, durMins);
    }

    return questions;
};

// Visual representation of elapsed time on a timeline block
const DurationVisualizer = ({ start, end, eventName }) => {
    return (
        <div className="bg-slate-50 w-full rounded-2xl p-3 md:p-4 border-2 border-slate-200 shadow-inner flex flex-col gap-2 md:gap-3 items-center">
            <div className="text-base md:text-lg font-bold text-slate-500 uppercase tracking-widest">{eventName}</div>

            <div className="relative w-full max-w-[400px] h-12 flex items-center">
                {/* Background Track */}
                <div className="absolute w-full h-4 bg-slate-200 rounded-full"></div>

                {/* Highlighted Duration Track */}
                <div className="absolute left-[10%] w-[80%] h-4 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full shadow-md"></div>

                {/* Start Node */}
                <div className="absolute left-[10%] -translate-x-1/2 flex flex-col items-center gap-2">
                    <div className="w-6 h-6 bg-teal-600 rounded-full border-4 border-white shadow-md z-10"></div>
                    <div className="font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-xl shadow-sm">{start}</div>
                </div>

                {/* End Node */}
                <div className="absolute left-[90%] -translate-x-1/2 flex flex-col items-center gap-2">
                    <div className="w-6 h-6 bg-teal-600 rounded-full border-4 border-white shadow-md z-10"></div>
                    <div className="font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-xl shadow-sm">{end}</div>
                </div>
            </div>
        </div>
    );
};

const TimeDurationTimeline = ({ mode, onBack, onComplete }) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        setQuestions(generateDurationQuestions());
    }, []);

    const handleComplete = (history, totalTime, qList) => {
        if (onComplete) onComplete(history, totalTime, qList);
    };

    if (questions.length === 0) return <div>Loading timeline scenarios...</div>;

    return (
        <InteractiveQuizEngine
            mode={mode}
            title="Time Duration"
            questions={questions}
            onComplete={handleComplete}
            onExit={onBack}
        >
            {(currentQ, selectedOption, onSelect, isSubmitted, isCorrect) => (
                <div className="flex flex-col items-center justify-start p-1 h-full gap-2 md:gap-3">
                    <h2 className="text-base md:text-lg font-bold text-[#31326F] text-center font-['Outfit'] mb-1">
                        How long is this activity?
                    </h2>

                    <div className="w-full max-w-[450px]">
                        <DurationVisualizer start={currentQ.start} end={currentQ.end} eventName={currentQ.event} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full max-w-[550px] mt-1">
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
                                    className={`py-2 px-3 md:py-3 md:px-4 rounded-xl transition-all duration-200 text-base md:text-lg font-['Outfit'] ${bgClass}`}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>

                    {isSubmitted && mode === 'practice' && (
                        <div className={`w-full max-w-[500px] mt-4 p-4 rounded-xl font-bold text-center border-2 shadow-sm ${isCorrect ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                            {isCorrect ? "Correct! Good calculating!" : "Not quite!"}
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

export default TimeDurationTimeline;
