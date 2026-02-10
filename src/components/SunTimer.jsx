import { motion } from 'framer-motion';

export function SunTimer({ timeLeft }) {
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const spinTransition = {
        repeat: Infinity,
        ease: "linear",
        duration: 10
    };

    return (
        // Container: 80px on mobile, 112px on desktop
        // CSS custom property --ray-center sets the rotation center for rays
        <div className="relative w-20 h-20 lg:w-28 lg:h-28 flex items-center justify-center [--ray-center:40px] lg:[--ray-center:56px]">
            {/* Spinning Sun Rays */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={spinTransition}
                className="absolute inset-0 w-full h-full"
            >
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-0 left-1/2 -ml-1 bg-[#FDBA74] rounded-full w-1.5 h-3 lg:w-2 lg:h-5"
                        style={{
                            transform: `rotate(${i * 30}deg) translateY(2px)`,
                            transformOrigin: '50% var(--ray-center)'
                        }}
                    />
                ))}
            </motion.div>

            {/* Sun Body */}
            <div className="relative w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#FCD34D] to-[#FDBA74] rounded-full shadow-lg flex items-center justify-center border-4 border-white/80 z-10 transition-transform hover:scale-105">
                <span className="text-[#31326F] font-black font-mono text-base lg:text-xl tracking-tight">
                    {formatTime(timeLeft)}
                </span>
            </div>
        </div>
    );
}

