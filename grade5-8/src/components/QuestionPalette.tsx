import React from 'react';
import { QUESTIONS } from '../lib/data';
import clsx from 'clsx';
import { Flag } from 'lucide-react';

interface QuestionPaletteProps {
  currentQuestionId: number;
  answers: Record<number, string>;
  markedForReview: Set<number>;
  onSelectQuestion: (id: number) => void;
  onSubmit: () => void;
}

export function QuestionPalette({
  currentQuestionId,
  answers,
  markedForReview,
  onSelectQuestion,
  onSubmit,
}: QuestionPaletteProps) {
  
  return (
    <div className="w-64 bg-[#F0FDFA] rounded-2xl shadow-sm border border-[#A8FBD3]/50 flex flex-col overflow-hidden h-full max-h-[calc(100vh-140px)]">
      {/* Title */}
      <div className="p-4 border-b border-[#A8FBD3]/30 bg-[#A8FBD3]/10">
        <h3 className="font-bold text-[#31326F] text-center">Question Palette</h3>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-4 gap-2">
          {QUESTIONS.map((q) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = currentQuestionId === q.id;
            const isMarked = markedForReview.has(q.id);

            // States:
            // Current = Blue highlight (#637AB9)
            // Answered = Teal filled (#4FB7B3)
            // Unanswered = Mint outline (#A8FBD3)
            // Marked = Small flag
            
            let bgClass = 'bg-white';
            let borderClass = 'border border-[#A8FBD3]'; // Default Mint outline
            let textClass = 'text-[#31326F]';

            if (isCurrent) {
              bgClass = 'bg-[#637AB9]'; // Blue highlight
              borderClass = 'border-transparent';
              textClass = 'text-white font-bold';
            } else if (isAnswered) {
              bgClass = 'bg-[#4FB7B3]'; // Teal filled
              borderClass = 'border-transparent';
              textClass = 'text-white';
            }

            return (
              <button
                key={q.id}
                onClick={() => onSelectQuestion(q.id)}
                className={clsx(
                  "relative aspect-square flex items-center justify-center rounded-lg text-sm transition-all duration-200",
                  bgClass,
                  borderClass,
                  textClass,
                  !isCurrent && !isAnswered && "hover:bg-[#A8FBD3]/20"
                )}
              >
                {q.id}
                {isMarked && (
                  <div className="absolute -top-1 -right-1">
                    <div className="bg-[#4300FF] text-white p-[2px] rounded-full shadow-sm">
                        <Flag size={8} fill="currentColor" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer / Submit */}
      <div className="p-4 border-t border-[#A8FBD3]/30 bg-white/50">
        <button
          onClick={onSubmit}
          className="w-full py-3 px-4 bg-[#31326F] hover:bg-[#25265E] text-white font-bold rounded-xl shadow-sm transition-transform active:scale-95 text-sm"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}
