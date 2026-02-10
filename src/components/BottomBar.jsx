import { ChevronRight, Eraser, Eye, LogOut } from 'lucide-react';
import clsx from 'clsx';

// BottomBar Component
// Renders the bottom navigation bar with context-aware buttons.
// - "View Explanation" button logic: Centered and only shown when allowed.
// - "Next" button logic: Shows "Finish" on the last question.
export function BottomBar({
    mode,
    onClear,
    onNext,
    onExit,
    onViewExplanation,
    canGoNext,
    showViewExplanation,
    onToggleScratchpad
}) {
    const isJunior = mode === 'junior';

    const buttonBase = "flex items-center justify-center gap-2 px-4 py-2 lg:px-6 lg:py-3 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed";

    const secondaryBtn = isJunior
        ? "bg-white text-[#637AB9] border-2 border-[#A8FBD3] rounded-xl hover:border-[#4FB7B3] hover:text-[#4FB7B3]"
        : "bg-white text-[#31326F] border border-gray-300 rounded-sm hover:bg-gray-50";

    const primaryBtn = isJunior
        ? "bg-[#4FB7B3] text-white rounded-xl shadow-md hover:bg-[#3da09c] hover:shadow-lg transform active:scale-95"
        : "bg-[#637AB9] text-white rounded-sm hover:bg-[#5266a0]";

    const explanationBtn = "bg-[#637AB9]/10 text-[#637AB9] border-2 border-[#637AB9]/30 rounded-xl hover:bg-[#637AB9]/20 hover:border-[#637AB9]/50 font-bold";

    return (
        <div className="h-20 lg:h-24 bg-white rounded-3xl shadow-sm border border-[#A8FBD3]/50 px-4 lg:px-8 flex items-center justify-between relative">

            {/* Left Side: Exit & Scratchpad Toggle & Clear */}
            <div className="flex items-center gap-2 lg:gap-4">
                {/* Exit Button */}
                <button
                    onClick={onExit}
                    className={clsx(buttonBase, secondaryBtn, "px-3 lg:px-6")}
                    title="Exit Practice"
                >
                    <LogOut size={18} className="rotate-180" />
                    <span className="hidden lg:inline">Exit</span>
                </button>

                {/* Clear Answer (only shows if we have an answer to clear? No, always show to confirm user intent, maybe disable if no answer? Logic in parent handles validation) */}
                <button onClick={onClear} className={clsx(buttonBase, secondaryBtn, "hidden lg:flex")}>
                    <Eraser size={18} />
                    Clear Answer
                </button>

                {/* Mobile: Scratchpad Toggle Button */}
                <button
                    onClick={onToggleScratchpad}
                    className={clsx(buttonBase, secondaryBtn, "lg:hidden flex px-3 py-2")}
                    aria-label="Open Scratchpad"
                >
                    <span className="text-xl">✏️</span>
                </button>
            </div>

            {/* Center: View Explanation Button */}
            {/* Centered absolutely to ensure it stays in the middle regardless of other buttons */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {showViewExplanation && (
                    <button
                        onClick={onViewExplanation}
                        className={clsx(buttonBase, explanationBtn)}
                    >
                        <Eye size={18} />
                        <span className="hidden lg:inline">View Explanation</span>
                        <span className="lg:hidden">Explain</span>
                    </button>
                )}
            </div>

            {/* Right Group (Navigation) */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onNext}
                    disabled={!canGoNext}
                    className={clsx(buttonBase, primaryBtn)}
                >
                    <span>Next</span>
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
