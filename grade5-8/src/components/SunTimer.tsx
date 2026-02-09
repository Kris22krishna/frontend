import React from 'react';
import { motion } from 'motion/react';

interface SunTimerProps {
  timeLeft: number;
}

export function SunTimer({ timeLeft }: SunTimerProps) {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      {/* Sun Rays */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 left-1/2 w-1.5 h-3 -ml-0.75 bg-[#FDBA74] rounded-full origin-bottom"
            style={{ 
              transform: `rotate(${i * 30}deg) translateY(-4px)`,
              transformOrigin: '50% 40px'
            }}
          />
        ))}
      </motion.div>

      {/* Sun Body */}
      <div className="relative w-14 h-14 bg-gradient-to-br from-[#FCD34D] to-[#FDBA74] rounded-full shadow-md flex items-center justify-center border-2 border-white/50 z-10">
        <span className="text-[#31326F] font-bold font-mono text-sm tracking-tighter">
          {formatTime(timeLeft)}
        </span>
      </div>
    </div>
  );
}
