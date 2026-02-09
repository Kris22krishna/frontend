import { ChevronLeft, ChevronRight, Eraser, PenTool } from 'lucide-react';
import clsx from 'clsx';

export function BottomBar({
    mode,
    onClear,
    onRoughWork,
    onNext,
    onPrev,
    onMarkReview,
    isMarked,
    canGoNext,
    canGoPrev
}) {
    const isJunior = mode === 'junior';

    const buttonBase = "flex items-center justify-center gap-2 px-6 py-3 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed";

    const secondaryBtn = isJunior
        ? "bg-white text-[#637AB9] border-2 border-[#A8FBD3] rounded-xl hover:border-[#4FB7B3] hover:text-[#4FB7B3]"
        : "bg-white text-[#31326F] border border-gray-300 rounded-sm hover:bg-gray-50";

    const primaryBtn = isJunior
        ? "bg-[#4FB7B3] text-white rounded-xl shadow-md hover:bg-[#3da09c] hover:shadow-lg transform active:scale-95"
        : "bg-[#637AB9] text-white rounded-sm hover:bg-[#5266a0]";

    return (
        <div className={clsx(
            "h-20 px-6 md:px-8 flex items-center justify-between z-10",
            isJunior
                ? "bg-white/90 backdrop-blur-md border-t border-[#A8FBD3]/30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
                : "bg-white border-t border-gray-200"
        )}>

            {/* Left Group */}
            <div className="flex items-center gap-4">
                <button onClick={onClear} className={clsx(buttonBase, secondaryBtn, "hidden md:flex")}>
                    <Eraser size={18} />
                    Clear Answer
                </button>

                {onRoughWork && (
                    <button onClick={onRoughWork} className={clsx(buttonBase, secondaryBtn)}>
                        <PenTool size={18} />
                        <span className="hidden sm:inline">Rough Work</span>
                    </button>
                )}

                {onMarkReview && (
                    <button
                        onClick={onMarkReview}
                        className={clsx(
                            buttonBase,
                            isMarked
                                ? (isJunior ? "bg-[#4300FF]/10 text-[#4300FF] border-2 border-[#4300FF] rounded-xl" : "bg-[#4300FF] text-white rounded-sm")
                                : secondaryBtn
                        )}
                    >
                        <span className="hidden sm:inline">{isMarked ? "Unmark Review" : "Mark for Review"}</span>
                        <span className="sm:hidden">{isMarked ? "Unmark" : "Mark"}</span>
                    </button>
                )}
            </div>

            {/* Right Group (Navigation) */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onPrev}
                    disabled={!canGoPrev}
                    className={clsx(buttonBase, secondaryBtn)}
                >
                    <ChevronLeft size={20} />
                    <span className="hidden sm:inline">Previous</span>
                </button>

                <button
                    onClick={onNext}
                    disabled={!canGoNext}
                    className={clsx(buttonBase, primaryBtn)}
                >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={20} />
                </button>
            </div>

        </div>
    );
}
