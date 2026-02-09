import { ChevronRight, Eraser, Eye } from 'lucide-react';
import clsx from 'clsx';

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
        <div className={clsx(
            "h-20 px-6 md:px-8 flex items-center justify-between z-10",
            isJunior
                ? "bg-white/90 backdrop-blur-md border-t border-[#A8FBD3]/30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-2xl"
                : "bg-white border-t border-gray-200"
        )}>

            {/* Left Group */}
            <div className="flex items-center gap-4">
                <button onClick={onClear} className={clsx(buttonBase, secondaryBtn, "hidden md:flex")}>
                    <Eraser size={18} />
                    Clear Answer
                </button>
            </div>

            {/* Center Group - View Explanation */}
            <div className="flex items-center justify-center">
                {showViewExplanation && onViewExplanation && (
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
