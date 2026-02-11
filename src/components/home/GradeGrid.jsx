import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function GradeGrid() {
    const navigate = useNavigate();

    const column1Grades = [
        { id: 1, label: 'Grade 1' },
        { id: 2, label: 'Grade 2' },
        { id: 3, label: 'Grade 3' },
        { id: 4, label: 'Grade 4' },
    ];

    const column2Grades = [
        { id: 5, label: 'Grade 5' },
        { id: 6, label: 'Grade 6' },
        { id: 7, label: 'Grade 7' },
        { id: 8, label: 'Grade 8' },
    ];

    const column3Grades = [
        { id: 9, label: 'Grade 9' },
        { id: 10, label: 'Grade 10' },
        { id: 11, label: 'Grade 11' },
        { id: 12, label: 'Grade 12' },
    ];

    const handleGradeClick = (id) => {
        navigate(`/math/grade/${id}`);
    };

    return (
        <section className="py-16 px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center serif-font">Explore by Grade</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: Grades 1-4 with Cyan/Teal gradient */}
                    <div className="rounded-2xl p-8 bg-gradient-to-br from-cyan-100 via-teal-100 to-cyan-200 relative overflow-hidden min-h-[400px]">
                        {/* Floating math symbols for grades 1-4 */}
                        <motion.div
                            className="absolute top-4 left-4 text-3xl text-cyan-400/50"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            +
                        </motion.div>
                        <motion.div
                            className="absolute top-16 right-8 text-4xl text-teal-400/50"
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                            7
                        </motion.div>
                        <motion.div
                            className="absolute bottom-20 left-12 text-3xl text-cyan-500/45"
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            −
                        </motion.div>
                        <motion.div
                            className="absolute bottom-32 right-6 text-3xl text-teal-500/45"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                        >
                            3
                        </motion.div>
                        <motion.div
                            className="absolute top-1/2 right-12 text-2xl text-cyan-400/50"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                        >
                            ×
                        </motion.div>

                        <div className="space-y-4 relative z-10">
                            <h3 className="text-xl font-bold text-teal-800 mb-4 px-2 uppercase tracking-wide">Early Learners</h3>
                            {column1Grades.map((grade) => (
                                <button
                                    key={grade.id}
                                    onClick={() => handleGradeClick(grade.id)}
                                    className="w-full text-left px-6 py-4 rounded-xl bg-white/70 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-[1.02] border border-white/50 group flex items-center justify-between"
                                >
                                    <span className="text-gray-800 font-semibold">{grade.label}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-500">→</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Grades 5-8 with Emerald/Green gradient */}
                    <div className="rounded-2xl p-8 bg-gradient-to-br from-emerald-100 via-green-100 to-emerald-200 relative overflow-hidden min-h-[400px]">
                        {/* Floating math symbols for grades 5-8 */}
                        <motion.div
                            className="absolute top-6 left-6 text-2xl text-emerald-400/55"
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            p/q
                        </motion.div>
                        <motion.div
                            className="absolute top-20 right-10 text-3xl text-green-400/55"
                            animate={{ y: [0, -14, 0] }}
                            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                        >
                            π
                        </motion.div>
                        <motion.div
                            className="absolute bottom-24 left-8 text-2xl text-emerald-500/50"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                        >
                            0.75
                        </motion.div>

                        <div className="space-y-4 relative z-10">
                            <h3 className="text-xl font-bold text-emerald-800 mb-4 px-2 uppercase tracking-wide">Junior School</h3>
                            {column2Grades.map((grade) => (
                                <button
                                    key={grade.id}
                                    onClick={() => handleGradeClick(grade.id)}
                                    className="w-full text-left px-6 py-4 rounded-xl bg-white/70 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-[1.02] border border-white/50 group flex items-center justify-between"
                                >
                                    <span className="text-gray-800 font-semibold">{grade.label}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500">→</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Grades 9-12 with Blue/Indigo gradient */}
                    <div className="rounded-2xl p-8 bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 relative overflow-hidden min-h-[400px]">
                        {/* Floating math symbols for grades 9-12 */}
                        <motion.div
                            className="absolute top-5 left-8 text-3xl text-blue-400/55"
                            animate={{ y: [0, -13, 0] }}
                            transition={{ duration: 3.3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            Σ
                        </motion.div>
                        <motion.div
                            className="absolute top-18 right-6 text-2xl text-indigo-400/55"
                            animate={{ y: [0, -11, 0] }}
                            transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                        >
                            α
                        </motion.div>
                        <motion.div
                            className="absolute bottom-28 left-10 text-2xl text-blue-500/50"
                            animate={{ y: [0, -14, 0] }}
                            transition={{ duration: 3.7, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
                        >
                            β
                        </motion.div>

                        <div className="space-y-4 relative z-10">
                            <h3 className="text-xl font-bold text-indigo-800 mb-4 px-2 uppercase tracking-wide">High School</h3>
                            {column3Grades.map((grade) => (
                                <button
                                    key={grade.id}
                                    onClick={() => handleGradeClick(grade.id)}
                                    className="w-full text-left px-6 py-4 rounded-xl bg-white/70 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-[1.02] border border-white/50 group flex items-center justify-between"
                                >
                                    <span className="text-gray-800 font-semibold">{grade.label}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500">→</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GradeGrid;
