import React from 'react';
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Background with overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-black">
                <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full" />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-blue-500/40"
                        style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
                        animate={{ y: [-20, 20, -20], opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-8 backdrop-blur-sm">
                        Summer Internship 2026 — Only 30 Seats
                    </span>
                </motion.div>

                <motion.h1
                    className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                >
                    <span className="text-white">Open It at Your</span>{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">Own Risk</span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Because Success Is Inside</span>
                </motion.h1>

                <motion.p
                    className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    What if your summer could become the turning point of your life?
                    The <strong className="text-white">Skill100.ai</strong> Summer Internship by{" "}
                    <strong className="text-white">Learners Digital</strong> — a powerful launchpad
                    for young minds to explore AI, Robotics & beyond.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                >
                    <a
                        href="#register"
                        className="px-8 py-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-lg"
                    >
                        Register Now — ₹100 Only
                    </a>
                    <a
                        href="#domains"
                        className="px-8 py-4 rounded-lg font-semibold text-blue-400 border border-blue-500/30 hover:bg-blue-500/10 transition-all text-lg"
                    >
                        Explore Domains
                    </a>
                </motion.div>

                <motion.div
                    className="mt-20"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ChevronDown className="mx-auto w-8 h-8 text-slate-500" />
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
