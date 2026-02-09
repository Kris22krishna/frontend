import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './lib/data';
import { QuestionCard } from './components/QuestionCard';
import { QuestionPalette } from './components/QuestionPalette';
import { RoughWork } from './components/RoughWork';
import { ExplanationScreen } from './components/ExplanationScreen';
import { SunTimer } from './components/SunTimer';
import { ChevronLeft, ChevronRight, PenTool } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import mascotImg from 'figma:asset/4a6128b1ee9c443467e5f01abb788bd21fb8bf81.png';

export default function App() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [isRoughWorkOpen, setIsRoughWorkOpen] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15:00

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQuestion = QUESTIONS[currentQuestionIdx];

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const handleClear = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion.id];
    setAnswers(newAnswers);
  };

  const toggleReview = () => {
    const newMarked = new Set(markedForReview);
    if (newMarked.has(currentQuestion.id)) {
      newMarked.delete(currentQuestion.id);
    } else {
      newMarked.add(currentQuestion.id);
    }
    setMarkedForReview(newMarked);
  };

  const handleNext = () => {
    const userAnswer = answers[currentQuestion.id];
    
    // Logic: If user has answered AND the answer is wrong, show explanation
    // Otherwise proceed (allow skipping)
    
    if (userAnswer && currentQuestion.correctAnswer) {
      // Simple string comparison - in real app, might need more robust matching
      const isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
      
      if (!isCorrect) {
        setShowExplanation(true);
        return;
      }
    }
    
    // If correct or no answer, move to next
    proceedToNext();
  };

  const proceedToNext = () => {
    setShowExplanation(false);
    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Reached end
      alert("End of Test Questions!");
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#E0FBEF] to-[#E6FFFA] flex flex-col overflow-hidden font-sans text-[#31326F]">
      
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-2 shrink-0 z-20 h-20">
        <SunTimer timeLeft={timeLeft} />
        
        <div className="flex items-center gap-4">
           {/* Mascot */}
           <img 
             src={mascotImg} 
             alt="Mascot" 
             className="h-16 w-auto object-contain drop-shadow-sm"
           />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 px-6 pb-6 overflow-hidden max-w-[1400px] mx-auto w-full">
        
        {/* Center: Question Area + Navigation */}
        <main className="flex-1 flex flex-col min-w-0 h-full">
          
          {/* Question Card Wrapper */}
          <div className="flex-1 relative mb-4 h-full min-h-0">
             <AnimatePresence mode="wait">
               <motion.div
                 key={currentQuestion.id}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 10 }}
                 transition={{ duration: 0.2 }}
                 className="h-full"
               >
                 <QuestionCard 
                   question={currentQuestion}
                   selectedAnswer={answers[currentQuestion.id]}
                   onAnswer={handleAnswer}
                   onClear={handleClear}
                 />
               </motion.div>
             </AnimatePresence>
          </div>

          {/* Bottom Navigation */}
          <div className="shrink-0 flex items-center justify-between px-2 h-16">
            
            {/* Previous */}
            <button
              onClick={() => setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))}
              disabled={currentQuestionIdx === 0}
              className="px-6 py-3 bg-[#31326F] text-white rounded-xl font-semibold shadow-md hover:bg-[#25265E] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm"
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            {/* Rough Work & Review */}
            <div className="flex gap-3">
               <button
                  onClick={() => setIsRoughWorkOpen(true)}
                  className="px-5 py-3 bg-white border border-[#4FB7B3] text-[#4FB7B3] rounded-xl font-medium hover:bg-[#F0FDFA] transition-all flex items-center gap-2 text-sm"
                >
                  <PenTool size={16} />
                  Rough Work
                </button>
                
                <button
                  onClick={toggleReview}
                  className={`px-5 py-3 border rounded-xl font-medium transition-all text-sm ${
                    markedForReview.has(currentQuestion.id)
                      ? 'bg-[#4300FF] text-white border-[#4300FF]'
                      : 'bg-white border-[#4300FF] text-[#4300FF] hover:bg-gray-50'
                  }`}
                >
                  {markedForReview.has(currentQuestion.id) ? 'Marked' : 'Mark for Review'}
                </button>
            </div>

            {/* Next (Functions as Submit/Check for this flow) */}
            <button
              onClick={handleNext}
              disabled={currentQuestionIdx === QUESTIONS.length - 1 && !showExplanation} 
              // Note: Logic allows checking last question too
              className="px-6 py-3 bg-[#31326F] text-white rounded-xl font-semibold shadow-md hover:bg-[#25265E] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-sm"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>

        </main>

        {/* Right Panel: Palette */}
        <aside className="hidden lg:block shrink-0 h-full pt-2">
          <QuestionPalette 
            currentQuestionId={currentQuestion.id}
            answers={answers}
            markedForReview={markedForReview}
            onSelectQuestion={(id) => setCurrentQuestionIdx(QUESTIONS.findIndex(q => q.id === id))}
            onSubmit={() => alert('Submit')}
          />
        </aside>

      </div>

      {/* Rough Work Pad */}
      <RoughWork 
        isOpen={isRoughWorkOpen}
        onClose={() => setIsRoughWorkOpen(false)}
        mode="junior"
      />

      {/* Explanation Modal */}
      <AnimatePresence>
        {showExplanation && (
          <ExplanationScreen 
            correctAnswer={currentQuestion.correctAnswer || "Check your notes"}
            explanation={currentQuestion.explanation || "No explanation provided."}
            onNext={proceedToNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
