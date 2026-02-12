import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function HomeGrades() {
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
        if (id >= 1 && id <= 4) {
            navigate(`/junior/grade/${id}`);
        } else if (id >= 5 && id <= 7) {
            navigate(`/middle/grade/${id}`);
        } else {
            navigate(`/senior/grade/${id}`);
        }
    };

    return (
        <section className="py-16 px-8 bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Column 1: Grades 1-4 with Orange/Amber gradient */}
                    <div className="rounded-2xl p-8 bg-gradient-to-br from-orange-200 via-amber-200 to-orange-300 relative overflow-hidden">
                        <div className="space-y-4 relative z-10">
                            {column1Grades.map((grade) => (
                                <button
                                    key={grade.id}
                                    onClick={() => handleGradeClick(grade.id)}
                                    className="w-full text-left px-6 py-4 rounded-xl bg-white/80 hover:bg-amber-100 transition-all duration-300 shadow-[0_6px_12px_rgba(0,0,0,0.15),inset_0_-2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2),inset_0_-3px_6px_rgba(0,0,0,0.15)] hover:scale-105 border-b-4 border-orange-300/50 group flex items-center justify-between"
                                    style={{
                                        transform: 'translateZ(0)',
                                    }}
                                >
                                    <span className="text-gray-800 font-medium">{grade.label}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500 font-bold">→</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Grades 5-8 with Blue/Sky gradient */}
                    <div className="rounded-2xl p-8 bg-gradient-to-br from-blue-200 via-sky-200 to-blue-300 relative overflow-hidden">
                        <div className="space-y-4 relative z-10">
                            {column2Grades.map((grade) => (
                                <button
                                    key={grade.id}
                                    onClick={() => handleGradeClick(grade.id)}
                                    className="w-full text-left px-6 py-4 rounded-xl bg-white/80 hover:bg-sky-100 transition-all duration-300 shadow-[0_6px_12px_rgba(0,0,0,0.15),inset_0_-2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2),inset_0_-3px_6px_rgba(0,0,0,0.15)] hover:scale-105 border-b-4 border-blue-300/50 group flex items-center justify-between"
                                    style={{
                                        transform: 'translateZ(0)',
                                    }}
                                >
                                    <span className="text-gray-800 font-medium">{grade.label}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 font-bold">→</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Grades 9-12 with Purple/Violet gradient */}
                    <div className="rounded-2xl p-8 bg-gradient-to-br from-purple-200 via-violet-200 to-purple-300 relative overflow-hidden">
                        <div className="space-y-4 relative z-10">
                            {column3Grades.map((grade) => (
                                <button
                                    key={grade.id}
                                    onClick={() => handleGradeClick(grade.id)}
                                    className="w-full text-left px-6 py-4 rounded-xl bg-white/80 hover:bg-violet-100 transition-all duration-300 shadow-[0_6px_12px_rgba(0,0,0,0.15),inset_0_-2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2),inset_0_-3px_6px_rgba(0,0,0,0.15)] hover:scale-105 border-b-4 border-purple-300/50 group flex items-center justify-between"
                                    style={{
                                        transform: 'translateZ(0)',
                                    }}
                                >
                                    <span className="text-gray-800 font-medium">{grade.label}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-500 font-bold">→</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
