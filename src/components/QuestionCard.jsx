import { motion } from 'framer-motion';
import { ImageWithFallback } from './ImageWithFallback';

export function QuestionCard({ question, selectedAnswer, onAnswer }) {
    const isImageQuestion = question.type === 'image' && !!question.image;
    const hasAnswered = !!selectedAnswer;

    const OptionButton = ({ option, idx }) => {
        const isSelected = selectedAnswer === option;
        let ringColor = 'border-gray-300';
        let bgColor = 'bg-white hover:border-[#637AB9]/30 hover:bg-gray-50';
        let borderColor = 'border-gray-100';
        let textColor = 'text-gray-600';
        let dotColor = 'bg-[#637AB9]';

        if (isSelected) {
            if (String(option).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase()) {
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
                key={idx}
                whileHover={!hasAnswered ? { scale: 1.002 } : {}}
                whileTap={!hasAnswered ? { scale: 0.995 } : {}}
                onClick={() => !hasAnswered && onAnswer(option)}
                disabled={hasAnswered}
                className={`w-full p-3 md:p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3
          ${borderColor} ${bgColor} ${hasAnswered && !isSelected ? 'opacity-60 cursor-default' : ''}
        `}
            >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${ringColor}`}>
                    {isSelected && <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />}
                </div>
                <span className={`text-sm md:text-base font-medium leading-tight ${textColor}`}>
                    {option}
                </span>
            </motion.button>
        );
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-[#A8FBD3]/50 overflow-hidden flex flex-col h-full">
            <div className="flex-1 flex flex-col p-6 h-full overflow-hidden">

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
                            <div className="shrink-0 flex items-start gap-2 mb-2">
                                <span className="text-lg font-bold text-[#4FB7B3] mt-0.5">{question.id}.</span>
                                <div
                                    className="text-base md:text-lg font-bold text-[#31326F] leading-tight"
                                    dangerouslySetInnerHTML={{ __html: question.text }}
                                />
                            </div>

                            {/* Options List - Compact Vertical Stack */}
                            <div className="flex-1 overflow-y-auto min-h-0 pr-1">
                                <div className="grid grid-cols-1 gap-2">
                                    {question.options?.map((option, idx) => (
                                        <OptionButton key={idx} option={option} idx={idx} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* --- Standard Layout for Text/Input Questions --- */
                    <>
                        {/* Header */}
                        <div className="shrink-0 flex items-start gap-4 mb-6">
                            <span className="text-2xl font-bold text-[#4FB7B3] mt-0.5">{question.id}.</span>
                            <div
                                className="text-xl md:text-2xl font-bold text-[#31326F] leading-tight"
                                dangerouslySetInnerHTML={{ __html: question.text }}
                            />
                        </div>

                        <div className="flex-1 flex flex-col min-h-0 gap-6">
                            {question.type === 'input' ? (
                                <div className="pt-2">
                                    <input
                                        type="text"
                                        value={selectedAnswer || ''}
                                        onChange={(e) => !hasAnswered && onAnswer(e.target.value)}
                                        disabled={hasAnswered}
                                        placeholder="Type your answer here..."
                                        className={`w-full p-5 text-xl rounded-xl border-2 outline-none transition-all text-[#31326F] placeholder-gray-400
                                            ${hasAnswered
                                                ? (String(selectedAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase() ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                                                : 'border-gray-200 focus:border-[#637AB9] focus:ring-4 focus:ring-[#637AB9]/10'
                                            }`}
                                    />
                                    {question.hint && !hasAnswered && (
                                        <p className="mt-4 text-[#637AB9] text-sm bg-[#637AB9]/5 p-3 rounded-lg inline-block">
                                            <span className="font-bold mr-1">Hint:</span> {question.hint}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="flex-1 overflow-y-auto min-h-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {question.options?.map((option, idx) => (
                                            <OptionButton key={idx} option={option} idx={idx} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
