import React from 'react';
import { motion } from "framer-motion";
import {
    Sparkles,
    Users,
    PresentationIcon,
    BrainCircuit,
    HeartHandshake,
    Award,
    Clock,
    Star,
} from "lucide-react";

const learnItems = [
    { icon: BrainCircuit, text: "Think creatively and solve problems" },
    { icon: Users, text: "Work effectively in teams" },
    { icon: Sparkles, text: "Apply concepts in real scenarios" },
    { icon: PresentationIcon, text: "Present ideas confidently" },
    { icon: HeartHandshake, text: "Build a growth mindset" },
];

const gains = [
    { icon: Sparkles, text: "Exposure to future technologies" },
    { icon: Star, text: "Improved confidence & communication" },
    { icon: Award, text: "Valuable learning certificate" },
    { icon: Clock, text: "Strong addition to academic profile" },
];

const FeaturesSection = () => {
    return (
        <section className="py-24 bg-slate-950 relative">
            <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Learn by Doing */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            Learn by <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Doing</span>,
                            <br />Not Just Listening
                        </h2>
                        <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                            Instead of passive lectures, students participate in practical activities,
                            demonstrations, and guided exercises that build both knowledge and confidence.
                        </p>
                        <div className="space-y-4">
                            {learnItems.map((item, i) => (
                                <motion.div
                                    key={item.text}
                                    className="flex items-center gap-4 group"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.08 }}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                                        <item.icon className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <span className="text-slate-300 font-medium">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-10 border border-slate-800 shadow-2xl relative overflow-hidden"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[60px] rounded-full" />

                        <h3 className="text-2xl font-bold mb-3 text-white">
                            Mentorship from <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">Industry Experts</span>
                        </h3>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Learn from professionals actively working in technology and innovation.
                            They share real insights, practical knowledge, and career advice students
                            usually don't get in schools.
                        </p>
                        <ul className="space-y-3 text-slate-300">
                            <li className="flex gap-3 items-center group"><span className="text-orange-400 group-hover:translate-x-1 transition-transform">→</span> Understand real career opportunities</li>
                            <li className="flex gap-3 items-center group"><span className="text-orange-400 group-hover:translate-x-1 transition-transform">→</span> Learn what skills are actually required</li>
                            <li className="flex gap-3 items-center group"><span className="text-orange-400 group-hover:translate-x-1 transition-transform">→</span> Clear doubts with direct Q&A</li>
                            <li className="flex gap-3 items-center group"><span className="text-orange-400 group-hover:translate-x-1 transition-transform">→</span> Gain clarity about future education paths</li>
                        </ul>
                    </motion.div>
                </div>

                {/* Short Duration, Long Impact */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        Short Duration, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Long-Term Impact</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg">
                        1 to 3 weeks that can change the trajectory of your future.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {gains.map((g, i) => (
                        <motion.div
                            key={i} /* Added key properly */
                            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 text-center hover:border-blue-500/30 transition-all hover:-translate-y-1"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <g.icon className="w-6 h-6 text-blue-400" />
                            </div>
                            <p className="text-sm text-slate-200 font-medium">{g.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
