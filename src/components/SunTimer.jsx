import { motion } from 'framer-motion';

export function SunTimer({ timeLeft }) {
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Animation variants for the rotating sun rays
    const spinTransition = {
        repeat: Infinity,
        ease: "linear",
        duration: 10
    };

    return (
        // Enlarged container (w-28 h-28) for better visibility in the header
        <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Spinning Sun Rays Background */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={spinTransition}
                className="absolute inset-0 w-full h-full"
            >
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-0 left-1/2 w-2 h-5 -ml-1 bg-[#FDBA74] rounded-full"
                        style={{
                            transform: `rotate(${i * 30}deg) translateY(4px)`,
                            transformOrigin: '50% 56px'
                        }}
                    />
                ))}
            </motion.div>

            {/* Sun Body */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-[#FCD34D] to-[#FDBA74] rounded-full shadow-lg flex items-center justify-center border-4 border-white/80 z-10 transition-transform hover:scale-105">
                <span className="text-[#31326F] font-black font-mono text-xl tracking-tight">
                    {formatTime(timeLeft)}
                </span>
            </div>
        </div>
    );
}
