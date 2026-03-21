import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, ArrowRight, Sparkles, Target, Award, Rocket, Compass, BookOpen, Lightbulb, Zap, Flag, GraduationCap } from 'lucide-react';

const DiagnosisLanding = () => {
    const navigate = useNavigate();
    const grades = Array.from({ length: 10 }, (_, i) => i + 1);

    const getGradeInfo = (grade) => {
        const info = {
            1: { icon: "🍎", title: "Early Explorers", color: "from-red-400 to-rose-500", glow: "group-hover:shadow-rose-300" },
            2: { icon: "🎈", title: "Little Learners", color: "from-blue-400 to-cyan-500", glow: "group-hover:shadow-cyan-300" },
            3: { icon: "🎨", title: "Creative Minds", color: "from-yellow-400 to-amber-500", glow: "group-hover:shadow-amber-300" },
            4: { icon: "🚀", title: "Rising Stars", color: "from-indigo-400 to-blue-500", glow: "group-hover:shadow-blue-300" },
            5: { icon: "🔭", title: "Space Cadets", color: "from-purple-400 to-fuchsia-500", glow: "group-hover:shadow-fuchsia-300" },
            6: { icon: "🧬", title: "Young Scientists", color: "from-emerald-400 to-green-500", glow: "group-hover:shadow-green-300" },
            7: { icon: "📐", title: "Math Magicians", color: "from-sky-400 to-indigo-500", glow: "group-hover:shadow-indigo-300" },
            8: { icon: "🧪", title: "Logic Masters", color: "from-orange-400 to-amber-600", glow: "group-hover:shadow-orange-300" },
            9: { icon: "🏛️", title: "Future Leaders", color: "from-teal-400 to-emerald-500", glow: "group-hover:shadow-teal-300" },
            10: { icon: "🎓", title: "Senior Scholars", color: "from-slate-700 to-black", glow: "group-hover:shadow-slate-400" }
        };
        return info[grade] || { icon: "📚", title: "Scholars", color: "from-gray-400 to-gray-500", glow: "group-hover:shadow-gray-300" };
    };

    return (
        <div className="min-h-screen bg-[#fafcff] py-6 px-3 sm:px-6 lg:px-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 blur-3xl opacity-20 rounded-full -z-10 transform -translate-y-1/2"></div>
                
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center p-2.5 bg-white rounded-xl shadow-sm border border-indigo-100 mb-2 animate-bounce-slow">
                        <Brain className="w-6 h-6 text-indigo-600" />
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 tracking-tight">
                        Diagnosis Test
                    </h1>
                    
                    <p className="max-w-xl mx-auto text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                        Discover your strengths, identify your growth areas, and embark on a personalized learning journey crafted just for you.
                    </p>
                </div>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {grades.map((grade) => {
                        const { icon, title, color, glow } = getGradeInfo(grade);
                        return (
                            <div
                                key={grade}
                                onClick={() => navigate(`/diagnosis-test/${grade}`)}
                                className={`group relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1 ${glow}`}
                            >
                                {/* Background Decoration */}
                                <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-full z-0 group-hover:scale-150 transition-transform duration-500 ease-in-out"></div>
                                
                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Icon header */}
                                    <div className="flex justify-between items-start mb-3">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center text-xl shadow-md transform group-hover:rotate-12 transition-transform duration-300`}>
                                            {icon}
                                        </div>
                                        <div className="bg-slate-50 text-slate-400 font-bold px-2 py-0.5 rounded-full text-xs group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                            Grade {grade}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow">
                                        <h2 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-indigo-900 transition-colors">
                                            {title}
                                        </h2>
                                        <p className="text-slate-500 text-xs leading-snug mb-3">
                                            Comprehensive assessment of core concepts.
                                        </p>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-auto pt-3 border-t border-slate-50">
                                        <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:text-indigo-700">
                                            <span>Start Test</span>
                                            <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {/* Footer decoration */}
            <div className="mt-10 text-center pb-6">
                <div className="inline-flex items-center justify-center space-x-1.5 text-slate-400 text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Powered by Skill100.ai Adaptive Engine</span>
                </div>
            </div>
        </div>
    );
};

export default DiagnosisLanding;
