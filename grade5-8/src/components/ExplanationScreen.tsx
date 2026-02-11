import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import mascotImg from 'figma:asset/4a6128b1ee9c443467e5f01abb788bd21fb8bf81.png';

interface ExplanationScreenProps {
  correctAnswer: string;
  explanation: string;
  onNext: () => void;
}

export function ExplanationScreen({ correctAnswer, explanation, onNext }: ExplanationScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#31326F]/20 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[80vh] md:h-[600px]"
      >
        {/* Left Column: Mascot Area */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-[#E0FBEF] to-[#A8FBD3]/30 flex flex-col items-center justify-center p-8 relative overflow-hidden">
           {/* Decorative circles */}
           <div className="absolute top-10 left-10 w-32 h-32 bg-[#4FB7B3]/10 rounded-full blur-2xl" />
           <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#637AB9]/10 rounded-full blur-2xl" />
           
           <motion.img 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.2 }}
             src={mascotImg} 
             alt="Learning Mascot" 
             className="w-48 md:w-64 object-contain drop-shadow-xl relative z-10"
           />
           <div className="mt-8 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full text-[#31326F] font-bold shadow-sm border border-[#A8FBD3]">
             Keep going!
           </div>
        </div>

        {/* Right Column: Explanation Content */}
        <div className="flex-1 p-8 md:p-12 flex flex-col relative bg-white">
          <div className="flex-1 overflow-y-auto">
            
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="text-[#FF6B6B]" size={32} />
              <h2 className="text-3xl font-bold text-[#31326F]">Not quite right</h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-sm font-bold uppercase tracking-wider text-[#4FB7B3]">Correct Answer</span>
                <div className="text-xl md:text-2xl font-bold text-[#31326F] bg-[#F0FDFA] p-4 rounded-xl border border-[#A8FBD3]/50 flex items-center gap-3">
                  <CheckCircle2 className="text-[#4FB7B3] shrink-0" size={24} />
                  {correctAnswer}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-bold uppercase tracking-wider text-[#637AB9]">Why is this correct?</span>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {explanation}
                </p>
              </div>
            </div>

          </div>

          <div className="pt-8 mt-auto border-t border-gray-100">
            <button
              onClick={onNext}
              className="w-full md:w-auto md:float-right px-8 py-4 bg-[#31326F] text-white text-lg font-bold rounded-xl shadow-lg hover:bg-[#25265E] hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              Got it
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
