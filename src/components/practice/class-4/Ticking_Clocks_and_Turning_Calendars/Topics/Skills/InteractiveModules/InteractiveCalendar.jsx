import React, { useState, useEffect } from 'react';
import InteractiveQuizEngine from './InteractiveQuizEngine';

// Helpers
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const generateCalendarQuestions = () => {
    const questions = [];
    const usedSigs = new Set();
    const year = 2026;
    const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const addQ = (month, targetDate, text, correctIndex, expl) => {
        const sig = `${month}-${targetDate}-${correctIndex}-${text.substring(0, 15)}`;
        if (!usedSigs.has(sig) && correctIndex >= 1 && correctIndex <= daysInMonth(year, month)) {
            questions.push({
                id: questions.length,
                text, year, month, targetDate, correctIndex, explanation: expl
            });
            usedSigs.add(sig);
            return true;
        }
        return false;
    };

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // 1-5: Basic target lookups
    while (questions.length < 5) {
        let m = rand(0, 11);
        let d = rand(1, daysInMonth(year, m));
        addQ(m, null, `Click on ${MONTH_NAMES[m]} ${d}.`, d, `Find the number ${d} on the calendar.`);
    }

    // 6-10: Week offsets (1 or 2 weeks)
    while (questions.length < 10) {
        let m = rand(0, 11);
        let days = daysInMonth(year, m);
        let weeks = rand(1, 2);
        let dur = weeks * 7;
        let isPast = Math.random() > 0.5;

        let start = rand(1, days);
        let end = isPast ? start - dur : start + dur;

        if (end >= 1 && end <= days) {
            let direction = isPast ? "ago" : "from today";
            addQ(m, start, `If today is ${MONTH_NAMES[m]} ${start} (highlighted), click the date exactly ${weeks} ${weeks > 1 ? 'weeks' : 'week'} ${direction}.`, end, `${weeks} ${weeks > 1 ? 'weeks' : 'week'} is ${dur} days. ${start} ${isPast ? '-' : '+'} ${dur} = ${end}.`);
        }
    }

    // 11-15: Day offsets (Random days)
    while (questions.length < 15) {
        let m = rand(0, 11);
        let days = daysInMonth(year, m);
        let start = rand(1, days);
        let offset = rand(3, 15);
        let isPast = Math.random() > 0.5;
        let end = isPast ? start - offset : start + offset;

        if (end >= 1 && end <= days) {
            let direction = isPast ? "before" : "after";
            addQ(m, start, `A project is due ${offset} days ${direction} ${MONTH_NAMES[m]} ${start} (highlighted). Click the due date.`, end, `${start} ${isPast ? '-' : '+'} ${offset} = ${end}.`);
        }
    }

    // 16-20: Advanced Spatial (1st, 2nd, 3rd, last day of week)
    while (questions.length < 20) {
        let m = rand(0, 11);
        let days = daysInMonth(year, m);
        let targetWeekday = rand(0, 6);
        let ordinal = rand(1, 4); // 1st, 2nd, 3rd, 4th
        let ordStr = ["first", "second", "third", "fourth"][ordinal - 1];

        // Find the nth weekday
        let count = 0;
        let foundDate = null;
        for (let d = 1; d <= days; d++) {
            if (new Date(year, m, d).getDay() === targetWeekday) {
                count++;
                if (count === ordinal) {
                    foundDate = d;
                    break;
                }
            }
        }

        if (foundDate) {
            addQ(m, null, `Click on the ${ordStr} ${DAY_NAMES[targetWeekday]} of the month.`, foundDate, `Count down the ${DAY_NAMES[targetWeekday].substring(0, 3)} column until you reach the ${ordStr} number.`);
        }
    }

    return questions;
};

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const VisualCalendar = ({ year, month, highlightDate, selectedDate, correctDate, isSubmitted, onDateClick }) => {
    const daysCount = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    const blanks = Array(startDay).fill(null);
    const days = Array.from({ length: daysCount }, (_, i) => i + 1);
    const allCells = [...blanks, ...days];

    return (
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-200 p-2 md:p-4 w-full max-w-[400px]">
            {/* Header */}
            <div className="flex justify-between items-center mb-2 md:mb-4 px-2">
                <h3 className="text-xl font-bold text-[#c026d3] font-['Outfit'] tracking-wide">
                    {MONTH_NAMES[month]} {year}
                </h3>
            </div>
            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 md:gap-2">
                {DAY_NAMES_SHORT.map(d => (
                    <div key={d} className="text-center text-xs md:text-sm font-bold text-slate-400 mb-1 md:mb-2">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {allCells.map((day, i) => {
                    const isTarget = highlightDate && day === highlightDate;
                    const isSelected = selectedDate === day;
                    const isCorrectCell = correctDate === day;

                    if (!day) return <div key={`blank-${i}`} className="h-10 md:h-12"></div>;

                    let bgClass = "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300 border-2 border-transparent cursor-pointer";

                    if (isTarget && !isSelected && !isSubmitted) {
                        bgClass = "bg-[#fdf4ff] border-2 border-[#c026d3] text-[#a21caf] font-extrabold cursor-pointer";
                    }

                    if (!isSubmitted && isSelected) {
                        bgClass = "bg-[#f3e8ff] border-4 border-[#9333ea] text-[#581c87] scale-110 shadow-md font-bold z-10";
                    } else if (isSubmitted && isCorrectCell) {
                        bgClass = "bg-[#D1FAE5] border-4 border-[#10B981] text-[#065F46] font-bold scale-110 z-10";
                    } else if (isSubmitted && isSelected && !isCorrectCell) {
                        bgClass = "bg-[#FEE2E2] border-4 border-[#EF4444] text-[#991B1B] font-bold opacity-80";
                    } else if (isSubmitted && !isCorrectCell && isTarget) {
                        bgClass = "bg-[#fdf4ff] border-2 border-[#c026d3] text-[#a21caf] opacity-80 cursor-default";
                    } else if (isSubmitted) {
                        bgClass = "bg-slate-50 border-2 border-slate-100 text-slate-400 opacity-50 cursor-default";
                    }

                    return (
                        <button
                            key={day}
                            disabled={isSubmitted}
                            onClick={() => onDateClick(day)}
                            className={`h-8 md:h-10 flex items-center justify-center rounded-xl font-bold transition-all text-sm md:text-base ${bgClass}`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const InteractiveCalendar = ({ mode, skillId, onBack, onComplete }) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        setQuestions(generateCalendarQuestions(skillId));
    }, [skillId]);

    const handleComplete = (history, totalTime, qList) => {
        if (onComplete) onComplete(history, totalTime, qList);
    };

    if (questions.length === 0) return <div>Loading calendar scenarios...</div>;

    return (
        <InteractiveQuizEngine
            mode={mode}
            title="Interactive Calendars"
            questions={questions}
            onComplete={handleComplete}
            onExit={onBack}
        >
            {(currentQ, selectedOption, onSelect, isSubmitted, isCorrect) => (
                <div className="flex flex-col items-center justify-start p-1 h-full gap-2 md:gap-4">
                    <h2 className="text-base md:text-lg font-bold text-[#31326F] text-center font-['Outfit'] max-w-[500px] mb-1">
                        {currentQ.text}
                    </h2>

                    <VisualCalendar
                        year={currentQ.year}
                        month={currentQ.month}
                        highlightDate={currentQ.targetDate}
                        selectedDate={selectedOption}
                        correctDate={currentQ.correctIndex}
                        isSubmitted={isSubmitted}
                        onDateClick={onSelect}
                    />

                    {isSubmitted && mode === 'practice' && (
                        <div className={`w-full max-w-[450px] mt-2 p-4 rounded-xl font-bold text-center border-2 shadow-sm ${isCorrect ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                            {isCorrect ? "Correct! You clicked the right date!" : "Not quite! Check the calendar again."}
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

export default InteractiveCalendar;
