import { ChevronRight, Eraser, Eye } from 'lucide-react';
import clsx from 'clsx';

// BottomBar Component
// Renders the bottom navigation bar with context-aware buttons.
// - "View Explanation" button logic: Centered and only shown when allowed.
// - "Next" button logic: Shows "Finish" on the last question.
export function BottomBar({
    mode,
    onClear,
    onNext,
    onViewExplanation,
    canGoNext,
    showViewExplanation
}) {
    const isJunior = mode === 'junior';

    const buttonBase = "flex items-center justify-center gap-2 px-6 py-3 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed";

    const secondaryBtn = isJunior
        ? "bg-white text-[#637AB9] border-2 border-[#A8FBD3] rounded-xl hover:border-[#4FB7B3] hover:text-[#4FB7B3]"
        : "bg-white text-[#31326F] border border-gray-300 rounded-sm hover:bg-gray-50";

    const primaryBtn = isJunior
        ? "bg-[#4FB7B3] text-white rounded-xl shadow-md hover:bg-[#3da09c] hover:shadow-lg transform active:scale-95"
        : "bg-[#637AB9] text-white rounded-sm hover:bg-[#5266a0]";

    const explanationBtn = "bg-[#637AB9]/10 text-[#637AB9] border-2 border-[#637AB9]/30 rounded-xl hover:bg-[#637AB9]/20 hover:border-[#637AB9]/50 font-bold";

    return (
        <div className="h-24 bg-white rounded-3xl shadow-sm border border-[#A8FBD3]/50 px-8 flex items-center justify-between relative">

            {/* Left Side: Scratchpad Toggle (Clear button - Hidden on small screens if needed, logic preserved) */}
            <div className="flex items-center gap-4">
                {/* Previous button removed as per user request */}
                <button onClick={onClear} className={clsx(buttonBase, secondaryBtn, "hidden md:flex")}>
                    <Eraser size={18} />
                    Clear Answer
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
                        View Explanation
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
