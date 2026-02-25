import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "../ui/card";
import { CalculatorKeypad } from "./CalculatorKeypad";
import { CheckCircle2, XCircle } from "lucide-react";

export function SpeedTestQuestionCard({
    question,
    onSubmit,
    onSkip,
    elapsedSeconds,
    questionNumber,
    totalQuestions,
}) {
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [timeoutId, setLocalTimeoutId] = useState(null);

    const handleAnswerChange = useCallback((value) => {
        if (submitted || feedback === "correct") return;

        // Clear any pending "incorrect" timer immediately
        if (timeoutId) {
            clearTimeout(timeoutId);
            setLocalTimeoutId(null);
        }

        if (value === "" || value === "-") {
            setUserAnswer(value);
            setFeedback(null);
            return;
        }

        // Basic string validation to prevent weird non-number entries
        const valueStr = value.toString();
        const correctStr = question.correctAnswer.toString();

        // Check if current value is exactly the correct answer
        const currentNum = Number(value);
        if (!isNaN(currentNum) && currentNum === question.correctAnswer && valueStr === correctStr) {
            setUserAnswer(value);
            setFeedback("correct");
            setSubmitted(true);
            setTimeout(() => {
                onSubmit(currentNum);
            }, 500);
            return;
        }

        // If it starts with the correct answer, keep letting them type
        if (correctStr.startsWith(valueStr)) {
            setUserAnswer(value);
            setFeedback(null);
        } else {
            // Incorrect - show feedback and clear after a delay
            setUserAnswer(value);
            setFeedback("incorrect");
            const newTimeout = setTimeout(() => {
                setUserAnswer("");
                setFeedback(null);
                setLocalTimeoutId(null);
            }, 300);
            setLocalTimeoutId(newTimeout);
        }
    }, [submitted, feedback, timeoutId, question.correctAnswer, onSubmit]);

    useEffect(() => {
        setUserAnswer("");
        setFeedback(null);
        setSubmitted(false);
        if (timeoutId) {
            clearTimeout(timeoutId);
            setLocalTimeoutId(null);
        }
    }, [question.id]);

    // Keyboard input handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (submitted || feedback === "correct") return;

            if (e.key >= '0' && e.key <= '9') {
                e.preventDefault();
                handleAnswerChange(userAnswer + e.key);
            }
            else if (e.key === 'Backspace' || e.key === 'Delete') {
                e.preventDefault();
                handleAnswerChange(userAnswer.slice(0, -1));
            }
            else if (e.key === '.' && !userAnswer.includes('.')) {
                e.preventDefault();
                handleAnswerChange(userAnswer + '.');
            }
            else if (e.key === '-' && userAnswer === '') {
                e.preventDefault();
                handleAnswerChange('-');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [userAnswer, submitted, feedback, handleAnswerChange]);
    return (
        <Card className="w-full max-w-4xl mx-auto border-none shadow-2xl bg-white dark:bg-slate-900 backdrop-blur-xl rounded-[2.5rem] overflow-hidden relative">
            {/* Progress Bar mapped from Image 2 top blue stripe layout */}
            <div className="absolute top-0 left-0 h-1.5 bg-slate-100 dark:bg-slate-800 w-full z-10">
                <div
                    className="h-full bg-blue-500 rounded-r-full transition-all duration-300"
                    style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                />
            </div>

            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row min-h-[380px]">
                    <div className="flex-[1.2] p-6 pt-10 flex flex-col items-center justify-center relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800/50">

                        <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full mb-8 shadow-sm">
                            QUESTION {questionNumber} / {totalQuestions}
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center w-full space-y-4">
                            <div className="text-6xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter whitespace-nowrap">
                                {question.num1} {question.operation.replace('*', '×').replace('/', '÷')} {question.num2}
                            </div>

                            <div className="text-3xl text-slate-300 dark:text-slate-600 font-black">=</div>

                            <div className={`
                        relative w-full max-w-[280px] h-20 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-mono font-bold tracking-widest
                        transition-all duration-200 border-2
                        ${feedback === "correct"
                                    ? "bg-green-50 border-green-200 text-green-600 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                                    : "bg-white dark:bg-black/20 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-inner"
                                }
                            `}>
                                {userAnswer || <span className="opacity-20">?</span>}

                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    {feedback === "correct" && <CheckCircle2 size={40} className="text-green-500 animate-in zoom-in spin-in-12 duration-300" />}
                                    {feedback === "incorrect" && <XCircle size={40} className="text-red-500 animate-in zoom-in duration-300" />}
                                </div>
                            </div>
                        </div>

                        {/* Skip Button (visible after 15s) */}
                        <div className="h-10 mt-4 w-full flex justify-center items-end">
                            {elapsedSeconds >= 15 && (
                                <button
                                    onClick={onSkip}
                                    className="animate-in fade-in slide-in-from-bottom-2 duration-300 px-6 py-2 rounded-full border border-orange-200 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-bold text-sm transition-colors"
                                >
                                    Skip Question
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 bg-slate-50/50 dark:bg-black/20 p-6 flex items-center justify-center border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800">
                        <CalculatorKeypad
                            value={userAnswer}
                            onChange={handleAnswerChange}
                            disabled={submitted}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
