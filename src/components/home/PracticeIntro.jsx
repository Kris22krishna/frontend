import React from 'react';
import { motion } from 'framer-motion';

export function PracticeIntro() {
    const stats = [
        { value: '750+', label: 'Topics', color: 'text-blue-600' },
        { value: '50K+', label: 'Questions', color: 'text-cyan-500' },
        { value: '12', label: 'Grades', color: 'text-indigo-600' },
    ];

    return (
        <section className="py-12 bg-gray-50/50 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Text Content */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">🎯</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                            Practice Makes Perfect
                        </h2>
                    </div>
                    <p className="text-lg text-gray-500 font-medium">
                        Choose your level and master mathematics step by step
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-w-[140px] text-center hover:shadow-md transition-shadow"
                        >
                            <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                                {stat.value}
                            </div>
                            <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default PracticeIntro;
