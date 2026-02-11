import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './ImageWithFallback';
import { Send, Eye, Eraser, LogOut, ChevronRight } from 'lucide-react';
import { LatexText } from './LatexText';

/**
 * OptionButton Component
 * Renders a single option for multiple-choice questions.
 * Extracted outside QuestionCard to prevent unnecessary re-renders and state resets.
 */
const OptionButton = ({ option, idx, selectedAnswer, question, onAnswer, hasAnswered }) => {
    const isSelected = selectedAnswer === option;

    // Style determination based on selection and correctness
    let ringColor = 'border-gray-400';
    let bgColor = 'bg-white hover:border-[#637AB9] hover:bg-[#637AB9]/5';
    let borderColor = 'border-gray-300';
    let textColor = 'text-gray-700';
    let dotColor = 'bg-[#637AB9]';

    if (isSelected) {
        const isCorrect = String(option).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();
        if (isCorrect) {
            borderColor = 'border-green-500';
            bgColor = 'bg-green-50';
            ringColor = 'border-green-500';
            textColor = 'text-green-700';
            dotColor = 'bg-green-500';
        } else {
            borderColor = 'border-red-500';
            bgColor = 'bg-red-50';
            ringColor = 'border-red-500';
            textColor = 'text-red-700';
            dotColor = 'bg-red-500';
        }
    }

    return (
        <motion.button
            whileHover={!hasAnswered ? { scale: 1.01 } : {}}
            whileTap={!hasAnswered ? { scale: 0.99 } : {}}
            onClick={() => !hasAnswered && onAnswer(option)}
            disabled={hasAnswered}
            className={`w-full p-[0.95rem] sm:p-4 md:p-6 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-[0.95rem] sm:gap-4 shadow-sm
      ${borderColor} ${bgColor} ${hasAnswered && !isSelected ? 'opacity-50 cursor-default' : ''}
    `}
        >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${ringColor}`}>
                {isSelected && <div className={`w-3 h-3 rounded-full ${dotColor}`} />}
            </div>
            <span className={`text-[1.4rem] sm:text-lg md:text-xl font-semibold leading-snug ${textColor}`}>
                {/* Render option text with Latex support */}
                <LatexText text={option} />
            </span>
        </motion.button>
    );
};

/**
 * InputSection Component
 * Renders an input field for questions without options.
 * Manages its own local state to ensure smooth typing without re-renders from parent.
 */
const InputSection = ({ question, selectedAnswer, onAnswer, hasAnswered }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    // Focus input on mount or when the question changes (handled by parent key)
    useEffect(() => {
        if (!hasAnswered) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [hasAnswered]);

    const handleSubmitInput = (e) => {
        if (e) e.preventDefault();
        if (inputValue.trim() && !hasAnswered) {
            onAnswer(inputValue.trim());
        }
    };

    const isCorrect = hasAnswered && String(selectedAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();

    return (
        <div className="w-full mt-4 sm:mt-0">
            <form
                onSubmit={handleSubmitInput}
                className="flex flex-col sm:flex-row gap-3"
            >
                <input
                    ref={inputRef}
                    type="text"
                    // Show selected answer if already answered, otherwise show local input
                    value={hasAnswered ? selectedAnswer : inputValue}
                    onChange={(e) => !hasAnswered && setInputValue(e.target.value)}
                    disabled={hasAnswered}
                    placeholder="Type your answer here..."
                    className={`flex-1 p-3 sm:p-4 lg:p-5 text-base sm:text-lg lg:text-xl rounded-2xl border-2 outline-none transition-all text-[#31326F] placeholder-gray-400 font-medium
                        ${hasAnswered
                            ? (isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                            : 'border-gray-300 focus:border-[#637AB9] focus:ring-4 focus:ring-[#637AB9]/10 bg-white'
                        }`}
                />
                {!hasAnswered && (
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-[#4FB7B3] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#3da09c] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                        <Send size={20} />
                        Submit
                    </button>
                )}
            </form>
            {question.hint && !hasAnswered && (
                <p className="mt-4 text-[#637AB9] text-sm bg-[#637AB9]/5 p-3 rounded-lg inline-block font-medium">
                    <span className="font-bold mr-1">Hint:</span> <LatexText text={question.hint} />
                </p>
            )}
        </div>
    );
};

export function QuestionCard({ question, selectedAnswer, onAnswer, onClear, onNext, onExit, onViewExplanation, onToggleScratchpad, showViewExplanation, canGoNext }) {
    const isImageQuestion = question.type === 'image' && !!question.image;
    const isInputQuestion = question.type === 'input' || (!question.options || question.options.length === 0);
    const hasAnswered = !!selectedAnswer;

    const mobileActionBar = (
        <div className="lg:hidden flex items-center justify-between gap-2 pt-4 mt-auto border-t border-gray-100 shrink-0 bg-white pb-2">
            {/* Left: Exit + Scratchpad */}
            <div className="flex items-center gap-2">
                <button
                    onClick={onExit}
                    className="flex items-center gap-1 px-3 py-2 bg-white text-[#637AB9] border-2 border-[#A8FBD3] rounded-xl hover:border-[#4FB7B3] text-sm font-medium transition-all"
                >
                    <LogOut size={16} className="rotate-180" />
                </button>
                <button
                    onClick={onToggleScratchpad}
                    className="flex items-center gap-1 px-3 py-2 bg-white text-[#637AB9] border-2 border-[#A8FBD3] rounded-xl hover:border-[#4FB7B3] text-sm font-medium transition-all"
                >
                    <span className="text-lg">✏️</span>
                </button>
            </div>

            {/* Center: Explain + Clear */}
            <div className="flex items-center gap-2">
                {showViewExplanation && (
                    <button
                        onClick={onViewExplanation}
                        className="flex items-center gap-1 px-3 py-2 bg-[#637AB9]/10 text-[#637AB9] border-2 border-[#637AB9]/30 rounded-xl hover:bg-[#637AB9]/20 text-sm font-bold transition-all"
                    >
                        <Eye size={16} />
                        Explain
                    </button>
                )}
            </div>

            {/* Right: Next */}
            <button
                onClick={onNext}
                disabled={!canGoNext}
                className="flex items-center gap-1 px-4 py-2 bg-[#4FB7B3] text-white rounded-xl font-bold shadow-md hover:bg-[#3da09c] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
                Next
                <ChevronRight size={18} />
            </button>
        </div>
    );

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-[#A8FBD3]/50 overflow-hidden flex flex-col h-full">
            <div className="flex-1 flex flex-col p-4 md:p-6 h-full overflow-hidden">

                {isImageQuestion ? (
                    /* --- Two-Column Layout for Image Questions --- */
                    <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
                        {/* Left Column: Image Area */}
                        <div className="flex-1 md:w-3/5 flex items-center justify-center min-h-0 bg-[#F0FDFA] rounded-2xl border-2 border-[#4FB7B3]/20 p-4 overflow-hidden relative group">
                            <div className="relative w-full h-full flex items-center justify-center">
                                <ImageWithFallback
                                    src={question.image}
                                    alt="Question Reference"
                                    className="max-w-full max-h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                            </div>
                        </div>

                        {/* Right Column: Question + Options */}
                        <div className="flex-1 md:w-2/5 flex flex-col min-h-0">
                            {/* Question Header */}
                            <div className="shrink-0 flex items-start gap-2 mb-4">
                                <span className="text-xl font-bold text-[#4FB7B3] mt-0.5">{question.id}.</span>
                                <div className="text-lg md:text-xl font-bold text-[#31326F] leading-snug">
                                    <LatexText text={question.text} />
                                </div>
                            </div>

                            {/* Options List or Input */}
                            <div className="flex-1 overflow-y-auto min-h-0 pr-1">
                                {isInputQuestion ? (
                                    <InputSection
                                        key={question.id} // Forces reset when question changes
                                        question={question}
                                        selectedAnswer={selectedAnswer}
                                        onAnswer={onAnswer}
                                        hasAnswered={hasAnswered}
                                    />
                                ) : (
                                    <div className="grid grid-cols-1 gap-3">
                                        {question.options?.map((option, idx) => (
                                            <OptionButton
                                                key={idx}
                                                option={option}
                                                idx={idx}
                                                selectedAnswer={selectedAnswer}
                                                question={question}
                                                onAnswer={onAnswer}
                                                hasAnswered={hasAnswered}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* --- Standard Layout for Text/Input Questions --- */
                    <>
                        {/* Header */}
                        <div className="shrink-0 flex items-start gap-4 mb-4 sm:mb-6">
                            <span className="text-lg md:text-2xl font-bold text-[#4FB7B3] mt-0.5">{question.id}.</span>
                            <div className="text-lg md:text-2xl font-bold text-[#31326F] leading-snug">
                                <LatexText text={question.text} />
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col min-h-0">
                            {isInputQuestion ? (
                                <InputSection
                                    key={question.id}
                                    question={question}
                                    selectedAnswer={selectedAnswer}
                                    onAnswer={onAnswer}
                                    hasAnswered={hasAnswered}
                                />
                            ) : (
                                <div className="flex-1 overflow-y-auto min-h-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {question.options?.map((option, idx) => (
                                            <OptionButton
                                                key={idx}
                                                option={option}
                                                idx={idx}
                                                selectedAnswer={selectedAnswer}
                                                question={question}
                                                onAnswer={onAnswer}
                                                hasAnswered={hasAnswered}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile action buttons */}
                        {mobileActionBar}
                    </>
                )}
            </div>
        </div>
    );
}
