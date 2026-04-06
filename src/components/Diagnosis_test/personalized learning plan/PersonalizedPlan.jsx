import React, { useState } from 'react';
import { CalendarDays, Clock, Download, BookOpen, GraduationCap, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const PersonalizedPlan = ({ questionResults, grade }) => {
    const [isPlanExpanded, setIsPlanExpanded] = useState(false);
    // 1. Identify missing topics
    // Filter out only the questions that were not correct
    const missedQuestions = questionResults.filter(q => !q.isCorrect);

    // Get unique topics from those missed questions
    const topicsToLearn = [...new Set(missedQuestions.map(q => q.topic || 'General Foundational Skills'))];

    // 2. Generate plan data table
    const getTopicAdvice = (topic) => {
        const t = topic.toLowerCase();
        if (t.includes('fraction')) return "Review identifying, adding, and subtracting fractions using visual models.";
        if (t.includes('algebra') || t.includes('equation')) return "Practice solving for unknowns and understanding mathematical expressions.";
        if (t.includes('geometry') || t.includes('shape') || t.includes('angle')) return "Focus on identifying properties of shapes, angles, and spatial reasoning.";
        if (t.includes('measure') || t.includes('length') || t.includes('weight') || t.includes('capacity')) return "Review units of measurement and practice real-world conversions.";
        if (t.includes('decimal')) return "Practice place value with decimals and basic operations (add/subtract).";
        if (t.includes('multiply') || t.includes('multiplication')) return "Review your times tables and practice multi-digit multiplication strategies.";
        if (t.includes('divide') || t.includes('division')) return "Practice division strategies, grouping, and understanding remainders.";
        if (t.includes('pattern')) return "Look for repeating sequences and practice predicting the next rule or item.";
        if (t.includes('time') || t.includes('clock')) return "Practice reading analog clocks and calculating elapsed time.";
        if (t.includes('data') || t.includes('graph')) return "Review reading charts, plotting graphs, and interpreting data points.";
        return `Review the core concepts of ${topic} and complete related practice exercises.`;
    };

    const planData = topicsToLearn.map((topic, idx) => ({
        day: `Day ${idx + 1}`,
        learning: topic,
        time: '45 mins',
        details: getTopicAdvice(topic)
    }));

    // Generate PDF function
    const downloadPDF = () => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(22);
        doc.setTextColor(79, 70, 229); // indigo-600
        doc.text(`Grade ${grade} Personalized Learning Plan`, 14, 22);

        // Subtitle
        doc.setFontSize(12);
        doc.setTextColor(100, 116, 139); // slate-500
        doc.text(`Created based on your recent skill discovery assessment.`, 14, 32);

        // Table
        autoTable(doc, {
            startY: 40,
            head: [['Day', 'Topic to Learn', 'Suggested Time', 'What to Focus On']],
            body: planData.map(item => [item.day, item.learning, item.time, item.details]),
            theme: 'grid',
            headStyles: {
                fillColor: [79, 70, 229],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'center'
            },
            bodyStyles: {
                textColor: [51, 65, 85], // slate-700
            },
            columnStyles: {
                0: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
                1: { cellWidth: 45 },
                2: { cellWidth: 30, halign: 'center' },
                3: { cellWidth: 85 }
            },
            styles: {
                fontSize: 11,
                cellPadding: 8
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252] // slate-50
            }
        });

        // Footer
        const finalY = doc.lastAutoTable.finalY || 40;
        doc.setFontSize(10);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text(`Keep learning and practicing! You are doing great.`, 14, finalY + 15);

        // Save
        doc.save(`Learning_Plan_Grade_${grade}.pdf`);
    };

    // If perfectly scored
    if (planData.length === 0) {
        return (
            <div className="bg-emerald-50 rounded-[2rem] border border-emerald-100 p-8 sm:p-12 mb-6 sm:mb-12 mt-6 sm:mt-12 text-center shadow-lg shadow-emerald-100/50">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                    <GraduationCap size={32} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-emerald-800 mb-3 tracking-tight">Incredible Work!</h3>
                <p className="text-emerald-700 text-base sm:text-lg font-medium max-w-xl mx-auto">
                    You mastered every topic on this assessment. No special learning plan is needed. You are ready for the next challenge!
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10 mb-6 sm:mb-12 mt-6 sm:mt-12">
            {/* Header section with heading and button side-by-side on desktop */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <button
                    onClick={() => setIsPlanExpanded(!isPlanExpanded)}
                    className="flex-1 text-left flex items-start sm:items-center justify-between gap-4 group"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg font-bold text-xs mb-3 uppercase tracking-widest group-hover:bg-indigo-100 transition-colors">
                            <BookOpen size={14} /> Action Plan
                        </div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                                Your Personalized Plan
                            </h2>
                            <div className="hidden sm:flex w-10 h-10 rounded-full bg-slate-50 items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shrink-0">
                                {isPlanExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                            </div>
                        </div>
                        <p className="text-sm sm:text-base text-slate-500 font-medium mt-2">
                            Based on your results, here is a day-by-day roadmap to master the concepts you missed.
                        </p>
                    </div>
                    <div className="sm:hidden w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shrink-0 mt-2">
                        {isPlanExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                </button>

                <div className="shrink-0 flex self-start md:self-center w-full md:w-auto pt-4 md:pt-0 border-t border-slate-100 md:border-0 mt-2 md:mt-0">
                    <button
                        onClick={(e) => { e.stopPropagation(); downloadPDF(); }}
                        className="w-full md:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        <Download size={18} />
                        Download PDF
                    </button>
                </div>
            </div>

            {isPlanExpanded && (
                <div className="pt-8 mt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-300">
                    {/* Plan Table layout */}
                    <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
                        <div className="grid grid-cols-[100px_1fr_120px] sm:grid-cols-[120px_1fr_150px] bg-slate-50 border-b border-slate-200">
                            <div className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <CalendarDays size={14} className="text-slate-400" /> Day
                            </div>
                            <div className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-black text-slate-500 uppercase tracking-widest border-l border-slate-200 flex items-center gap-2">
                                <BookOpen size={14} className="text-slate-400" /> Topic to Learn
                            </div>
                            <div className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-black text-slate-500 uppercase tracking-widest border-l border-slate-200 text-center flex items-center justify-center gap-2">
                                <Clock size={14} className="text-slate-400" /> Time
                            </div>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {planData.map((item, index) => (
                                <div key={index} className="grid grid-cols-[100px_1fr_120px] sm:grid-cols-[120px_1fr_150px] hover:bg-slate-50 transition-colors group">
                                    {/* Day cell */}
                                    <div className="px-4 py-4 sm:px-6 sm:py-5 flex items-center">
                                        <span className="inline-flex items-center justify-center bg-indigo-100 text-indigo-700 font-black text-sm sm:text-base px-3 py-1 rounded-lg">
                                            {item.day}
                                        </span>
                                    </div>

                                    {/* Topic cell */}
                                    <div className="px-4 py-4 sm:px-6 sm:py-4 flex flex-col justify-center border-l border-slate-100">
                                        <span className="text-sm sm:text-lg font-bold text-slate-800 flex items-center gap-3 mb-1.5">
                                            <ArrowRight size={16} className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity -ml-3 shrink-0" />
                                            {item.learning}
                                        </span>
                                        <span className="text-xs sm:text-sm text-slate-500 font-medium pl-3 ml-2 border-l-2 border-indigo-200">
                                            {item.details}
                                        </span>
                                    </div>

                                    {/* Time cell */}
                                    <div className="px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-center border-l border-slate-100">
                                        <span className="inline-flex items-center gap-1.5 text-slate-600 font-bold text-xs sm:text-sm bg-slate-100 px-3 py-1.5 rounded-full">
                                            <Clock size={14} className="text-slate-500" />
                                            {item.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 text-center text-sm text-slate-500 font-medium">
                        Aim to complete one topic per day to stay on track. You got this!
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalizedPlan;
