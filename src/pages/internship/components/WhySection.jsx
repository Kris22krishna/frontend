import React from 'react';
import { motion } from "framer-motion";
import { Rocket, TrendingUp, Lightbulb, Target } from "lucide-react";

const reasons = [
    {
        icon: TrendingUp,
        title: "Future-Proof Skills",
        desc: "AI, automation, and robotics are reshaping every industry. Students who start early gain a massive advantage.",
    },
    {
        icon: Lightbulb,
        title: "Hands-On Experience",
        desc: "No passive lectures. Real-world concepts, practical sessions, and guidance from industry experts.",
    },
    {
        icon: Target,
        title: "Career Clarity",
        desc: "At a stage where most students are still unsure, this program helps discover interests through real experience.",
    },
    {
        icon: Rocket,
        title: "Head Start",
        desc: "Specially designed for 10th-grade students to open doors to multiple career possibilities early on.",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1 },
    }),
};

const WhySection = () => {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden" id="why">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 opacity-50" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                        Why This Internship <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Matters</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Today's world is changing faster than ever. Careers that did not exist a few years ago are now in high demand.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reasons.map((r, i) => (
                        <motion.div
                            key={r.title}
                            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition-all hover:bg-slate-800/80 group"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={i}
                        >
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <r.icon className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{r.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{r.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhySection;
