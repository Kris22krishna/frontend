import React from 'react';
import { motion } from "framer-motion";

const CTASection = ({ onRegisterClick }) => {
    return (
        <section className="py-24 relative overflow-hidden bg-slate-950" id="register">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                        Don't Just <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">Pass Time</span> —
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Invest in Your Future</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto mb-4">
                        Success does not come from waiting. It comes from starting early, exploring boldly, and learning continuously.
                    </p>
                    <p className="text-white font-semibold mb-10 text-xl">
                        Open it at your own risk… because success is waiting inside.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <button
                            onClick={onRegisterClick}
                            className="px-10 py-4 rounded-lg font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:brightness-110 transition-all shadow-lg shadow-orange-500/20 text-lg"
                        >
                            Register Now — ₹100 Only
                        </button>
                    </div>

                    <p className="text-slate-500 text-sm">
                        Only 30 seats available • Registration fee: ₹100 • For 10th-grade students
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
