import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function NewHero() {
    const navigate = useNavigate();
    return (
        <section className="relative bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 py-12 md:py-16 px-8 overflow-hidden min-h-[420px] flex items-center">
            {/* Background Road Illustration - Adjusted for shorter height */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1400 420"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Continuous snake-like road */}
                <path
                    d="M 0 380 C 150 350, 250 280, 400 260 C 550 240, 750 260, 950 200 C 1150 140, 1300 80, 1400 20"
                    stroke="rgba(96, 165, 250, 0.4)"
                    strokeWidth="60"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* White dashed road markings */}
                <path
                    d="M 0 380 C 150 350, 250 280, 400 260 C 550 240, 750 260, 950 200 C 1150 140, 1300 80, 1400 20"
                    stroke="rgba(255, 255, 255, 0.8)"
                    strokeWidth="4"
                    strokeDasharray="25,20"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Roadsign board with "0" */}
                <g transform="translate(40, 370)">
                    <rect x="-2" y="0" width="4" height="25" fill="#64748b" rx="2" />
                    <rect x="-20" y="-25" width="40" height="25" fill="white" stroke="#3b82f6" strokeWidth="2" rx="4" />
                    <text x="0" y="-7" textAnchor="middle" fill="#2563eb" fontSize="18" fontWeight="700">0</text>
                </g>

                {/* Stickman on bicycle */}
                <g transform="translate(180, 320) scale(0.9)">
                    <g>
                        <circle cx="0" cy="15" r="10" fill="none" stroke="rgba(37, 99, 235, 0.8)" strokeWidth="2" />
                        <circle cx="35" cy="15" r="10" fill="none" stroke="rgba(37, 99, 235, 0.8)" strokeWidth="2" />
                        <path d="M0 15 L16 -6 L35 15 M16 -6 L16 5" stroke="rgba(37, 99, 235, 0.8)" strokeWidth="2" fill="none" />
                    </g>
                    <g transform="translate(12, -15)">
                        <circle cx="5" cy="-8" r="4" fill="none" stroke="rgba(37, 99, 235, 1)" strokeWidth="2" />
                        <line x1="5" y1="-4" x2="5" y2="10" stroke="rgba(37, 99, 235, 1)" strokeWidth="2" />
                        <path d="M5 0 L15 5 M5 0 L-2 4" stroke="rgba(37, 99, 235, 1)" strokeWidth="2" fill="none" />
                        <path d="M5 10 L5 20 M5 10 L10 18" stroke="rgba(37, 99, 235, 1)" strokeWidth="2" fill="none" />
                    </g>
                </g>
            </svg>

            {/* Floating Decorative SVGs */}

            {/* Rocket SVG */}
            <motion.div
                className="absolute top-12 left-1/4 opacity-40 hidden md:block"
                animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.71-2.13.09-2.91a2.18 2.18 0 0 0-3.09-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
                    <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
                </svg>
            </motion.div>

            {/* Lightbulb SVG */}
            <motion.div
                className="absolute top-24 right-1/4 opacity-30 hidden md:block"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                </svg>
            </motion.div>

            {/* Brain/Idea SVG */}
            <motion.div
                className="absolute bottom-16 left-16 opacity-25 hidden lg:block"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.2">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z" />
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z" />
                </svg>
            </motion.div>

            <motion.div
                className="absolute top-10 right-10 opacity-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m16 12-4-4-4 4M12 16V8" />
                </svg>
            </motion.div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
                {/* Main Headline with decorative icons */}
                <div className="flex items-center justify-center flex-wrap gap-3 md:gap-5 mb-6">
                    <span className="text-3xl md:text-5xl filter drop-shadow-md animate-bounce">📊</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight text-gray-900 tracking-tight">
                        Go Beyond <span className="text-blue-600 italic font-bold">100</span>
                    </h1>
                    <div className="flex gap-2">
                        <span className="text-3xl md:text-5xl filter drop-shadow-md delay-75 animate-bounce">🎯</span>
                        <span className="text-3xl md:text-5xl filter drop-shadow-md delay-150 animate-bounce">🌟</span>
                    </div>
                </div>

                {/* Subheading */}
                <p className="text-lg md:text-xl lg:text-2xl text-gray-500 mb-8 md:mb-10 max-w-2xl mx-auto font-medium leading-relaxed px-4">
                    With personalized, expert-led guidance<br className="hidden md:block" />
                    at every grade
                </p>

                {/* CTA Buttons - Premium Pill Shape */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                    <motion.button
                        whileHover={{ scale: 1.05, translateY: -3, boxShadow: '0 10px 25px -5px rgba(29, 78, 216, 0.4)' }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/math?category=junior')}
                        className="px-8 md:px-12 py-3.5 md:py-4.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-blue-200/50 min-w-[200px] md:min-w-[240px] border-none outline-none"
                    >
                        Start Practicing
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, translateY: -3, boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.2)' }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/rapid-math')}
                        className="px-8 md:px-12 py-3.5 md:py-4.5 bg-white text-orange-600 border-2 border-orange-500 rounded-full font-bold text-lg transition-all min-w-[200px] md:min-w-[240px] flex items-center justify-center gap-2 hover:bg-orange-50"
                    >
                        <span className="text-2xl">⚡</span> Rapid Math Challenge
                    </motion.button>
                </div>
            </div>
        </section>
    );
}

export default NewHero;
