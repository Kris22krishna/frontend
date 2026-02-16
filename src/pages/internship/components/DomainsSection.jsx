import React from 'react';
import { motion } from "framer-motion";
import { Brain, Cpu, UserCheck } from "lucide-react";

const domains = [
    {
        icon: Brain,
        title: "Artificial Intelligence",
        color: "primary",
        desc: "Learn how machines 'think,' how data works, and how AI powers smart assistants, recommendation systems, and modern automation across every industry.",
    },
    {
        icon: Cpu,
        title: "Robotics",
        color: "accent",
        desc: "Bring technology to life. Explore how machines move, sense, and respond through interactive sessions on automation and real-world applications.",
    },
    {
        icon: UserCheck,
        title: "Personality & Career",
        color: "primary",
        desc: "Build self-confidence, improve presentation skills, and gain clarity about career paths through communication, goal-setting, and strategic planning.",
    },
];

const DomainsSection = () => {
    return (
        <section className="py-24 bg-slate-900 relative border-t border-slate-800" id="domains">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                        Three Powerful <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">Domains</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg">
                        Focused growth areas that shape both technical and personal success.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {domains.map((d, i) => (
                        <motion.div
                            key={d.title}
                            className="relative group h-full"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                        >
                            <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-8 h-full border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/60 hover:scale-[1.02] transition-all duration-300 shadow-xl">
                                <div
                                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${d.color === "accent" ? "bg-red-500/10" : "bg-blue-500/10"
                                        }`}
                                >
                                    <d.icon
                                        className={`w-7 h-7 ${d.color === "accent" ? "text-red-500" : "text-blue-500"
                                            }`}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{d.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{d.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DomainsSection;
