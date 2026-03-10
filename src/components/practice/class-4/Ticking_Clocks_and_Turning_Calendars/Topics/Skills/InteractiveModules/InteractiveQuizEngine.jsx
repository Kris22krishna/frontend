import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, SkipForward, ArrowLeft, RefreshCw, BarChart3, Clock, HelpCircle, CheckCircle2, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveQuizEngine = ({
    mode = 'practice',
    title = 'Interactive Practice',
    questions = [],
    onComplete,
    onExit,
    children // Expects a render function: (currentQuestion, selectedAnswer, onSelectAnswer, isSubmitted, isCorrect) => ReactNode
}) => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [answers, setAnswers] = useState({});

    // References for time tracking
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);

    const currentQuestion = questions[qIndex];
    const TOTAL_QUESTIONS = questions.length;

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                accumulatedTime.current += Date.now() - questionStartTime.current;
                isTabActive.current = false;
            } else {
                questionStartTime.current = Date.now();
                isTabActive.current = true;
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    // Global timer
    useEffect(() => {
        const timer = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    // Load answers when jumping between questions via palette
    useEffect(() => {
        const previousAnswer = answers[qIndex];
        if (previousAnswer) {
            setSelectedOption(previousAnswer.selected);
            if (mode === 'practice' || previousAnswer.isSubmitted) {
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
                setIsSubmitted(false);
            }
        } else {
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
        }
        questionStartTime.current = Date.now();
        accumulatedTime.current = 0;
    }, [qIndex, questions, answers, mode]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (val) => {
        if (isSubmitted) return;
        setSelectedOption(val);
        // Instant save for Assess palette tracking
        if (mode === 'assess') {
            setAnswers(prev => ({ ...prev, [qIndex]: { selected: val, isSubmitted: false } }));
        }
    };

    const handleSubmit = () => {
        if (selectedOption === null) return;
        const isRight = selectedOption === currentQuestion.correctIndex;

        setIsCorrect(isRight);
        setIsSubmitted(true);

        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                isCorrect: isRight,
                selected: selectedOption,
                isSubmitted: true,
                timeSpent: Math.round(timeSpent / 1000)
            }
        }));

        if (!isRight && mode === 'practice') {
            setShowExplanationModal(true);
        }
    };

    const handleNext = () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
        } else if (mode === 'practice') {
            onComplete(answers, timeElapsed, questions);
        }
    };

    const handlePrevious = () => {
        if (qIndex > 0) setQIndex(prev => prev - 1);
    };

    const handleFinalSubmit = () => {
        onComplete(answers, timeElapsed, questions);
    };

    const handleMarkReview = () => {
        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                ...prev[qIndex],
                isMarked: !prev[qIndex]?.isMarked,
                selected: prev[qIndex]?.selected !== undefined ? prev[qIndex].selected : null
            }
        }));
    };

    const handleSkip = () => {
        handleNext();
    };

    if (!currentQuestion) return <div>Loading...</div>;

    const renderPaletteGrid = () => {
        const grids = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const ansData = answers[i] || {};
            const hasAnswered = ansData.selected !== null && ansData.selected !== undefined;
            const isMarked = ansData.isMarked;
            const isCurrent = parseInt(i) === qIndex;

            // Base styles
            let btnClass = "w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center font-bold text-sm md:text-base cursor-pointer transition-all border-2";

            // State styling
            if (isCurrent) {
                btnClass += " border-slate-800 shadow-md transform scale-105";
                if (hasAnswered) btnClass += " bg-indigo-500 text-white";
                else if (isMarked) btnClass += " bg-yellow-400 text-slate-800";
                else btnClass += " bg-white text-slate-800";
            } else if (isMarked) {
                btnClass += " bg-yellow-400 border-yellow-500 text-slate-900 shadow-sm";
            } else if (hasAnswered) {
                btnClass += " bg-indigo-500 border-indigo-500 text-white shadow-sm";
            } else {
                btnClass += " bg-white border-slate-200 text-slate-500 hover:border-slate-300 shadow-sm";
            }

            grids.push(
                <button key={i} className={btnClass} onClick={() => setQIndex(i)}>
                    {i + 1}
                </button>
            );
        }
        return grids;
    };

    return (
        <div className={`w-full max-w-7xl mx-auto flex flex-col ${mode === 'assess' ? 'lg:flex-row h-full max-h-[85vh]' : ''} gap-3 lg:gap-4 p-2 md:p-4 min-h-0`}>

            {/* Left Content Area (Main Quiz) */}
            <div className={`flex-1 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-3 md:p-5 lg:p-6 flex flex-col relative w-full overflow-y-auto ${mode !== 'assess' ? 'max-w-4xl mx-auto' : ''}`}>
                <div className="flex justify-between items-center mb-3 md:mb-4">
                    <span className="bg-indigo-50 text-indigo-600 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-100 shadow-sm">
                        Question {qIndex + 1}
                    </span>
                    {mode !== 'assess' ? (
                        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm bg-slate-50 px-3 py-1.5 rounded-full">
                            <Clock size={16} className="text-indigo-400" /> {formatTime(timeElapsed)}
                        </div>
                    ) : (
                        <div className="lg:hidden flex items-center gap-2 text-slate-500 font-bold text-sm bg-slate-50 px-3 py-1.5 rounded-full">
                            <Clock size={16} className="text-indigo-400" /> {formatTime(timeElapsed)}
                        </div>
                    )}
                </div>

                {/* Progress bar (only inside main content for practice mode, hidden in assess since sidebar has palette) */}
                {mode !== 'assess' && (
                    <div className="h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%` }} />
                    </div>
                )}

                <div className="flex-1 flex flex-col mb-2 min-h-[200px] items-center justify-center">
                    {children(currentQuestion, selectedOption, handleAnswer, isSubmitted, isCorrect)}
                </div>

                <div className="mt-auto pt-3 border-t-2 border-slate-50 flex flex-wrap justify-between items-center gap-3">
                    <button
                        className="tc-btn-secondary"
                        onClick={handlePrevious}
                        disabled={qIndex === 0}
                        style={{ opacity: qIndex === 0 ? 0.5 : 1 }}
                    >
                        ← Previous
                    </button>

                    <div className="flex flex-wrap items-center gap-3">
                        {mode === 'assess' ? (
                            <>
                                <button
                                    className={`px-4 py-3 md:py-4 rounded-2xl font-bold border-2 transition-all font-outfit flex items-center gap-2 ${answers[qIndex]?.isMarked ? 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                                    onClick={handleMarkReview}
                                >
                                    {answers[qIndex]?.isMarked ? 'Unmark Review' : 'Mark for Review'}
                                </button>
                                {qIndex < TOTAL_QUESTIONS - 1 ? (
                                    <button
                                        className="tc-btn-primary"
                                        style={{ padding: '12px 24px' }}
                                        onClick={handleNext}
                                    >
                                        Next ➔
                                    </button>
                                ) : (
                                    <button
                                        className="tc-btn-primary lg:hidden"
                                        style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', padding: '12px 24px' }}
                                        onClick={handleFinalSubmit}
                                    >
                                        Submit
                                    </button>
                                )}
                            </>
                        ) : (
                            isSubmitted ? (
                                <button className="tc-btn-primary" style={{ padding: '12px 24px' }} onClick={handleNext}>
                                    {qIndex < TOTAL_QUESTIONS - 1 ? "Next ➔" : "Finish Practice"}
                                </button>
                            ) : (
                                <button
                                    className="tc-btn-primary"
                                    onClick={handleSubmit}
                                    disabled={selectedOption === null}
                                    style={{ opacity: selectedOption === null ? 0.5 : 1, padding: '12px 24px' }}
                                >
                                    Check Answer
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Right Content Area (Palette sidebar only for assess) */}
            {mode === 'assess' && (
                <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-3 lg:gap-4 mt-4 lg:mt-0">

                    {/* Timer Panel */}
                    <div className="bg-white rounded-2xl md:rounded-3xl p-4 shadow-sm border border-slate-100 flex justify-center items-center gap-3">
                        <div className="bg-indigo-50 p-2 rounded-xl">
                            <Clock className="text-indigo-500" size={24} />
                        </div>
                        <span className="text-2xl lg:text-3xl font-black text-slate-700 tracking-tight font-outfit">{formatTime(timeElapsed)}</span>
                    </div>

                    {/* Palette Panel */}
                    <div className="bg-white rounded-2xl md:rounded-3xl p-4 lg:p-5 shadow-sm border border-slate-100 flex flex-col flex-1 overflow-y-auto">
                        <h3 className="text-base lg:text-lg font-black text-slate-800 mb-3 md:mb-4 tracking-wide font-outfit">Question Palette</h3>

                        <div className="grid grid-cols-5 md:grid-cols-10 lg:grid-cols-5 gap-3 mb-8">
                            {renderPaletteGrid()}
                        </div>

                        {/* Legend */}
                        <div className="flex flex-col gap-3 mt-auto pt-6 border-t-2 border-slate-50">
                            <div className="flex items-center gap-3 text-sm font-bold text-slate-500 font-outfit">
                                <div className="w-5 h-5 rounded-lg bg-indigo-500 shadow-inner"></div> Answered
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-slate-500 font-outfit">
                                <div className="w-5 h-5 rounded-lg bg-white border-2 border-slate-200"></div> Not Answered
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-slate-500 font-outfit">
                                <div className="w-5 h-5 rounded-lg bg-yellow-400 shadow-inner border border-yellow-500"></div> Marked for Review
                            </div>
                        </div>

                        <button
                            className="w-full mt-6 py-4 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all font-outfit tracking-wide text-lg"
                            onClick={handleFinalSubmit}
                        >
                            Submit Assessment
                        </button>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default InteractiveQuizEngine;
