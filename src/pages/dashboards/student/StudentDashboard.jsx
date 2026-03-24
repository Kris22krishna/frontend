import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import {
    Play,
    BookOpen,
    Loader2,
    Target,
    CheckCircle2,
    Percent,
    Clock,
    Award,
    AlertTriangle,
    Zap,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { api } from '../../../services/api';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const ChapterAccordion = ({ chapter, skills }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-slate-200 rounded-xl mb-3 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
                <div className="font-bold text-slate-700 text-left">{chapter}</div>
                {isOpen ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
            </button>
            {isOpen && (
                <div className="p-4 space-y-4">
                    {skills.map((skill, idx) => {
                        const minutes = Math.round(skill.time_spent / 60);
                        // Assuming max time per skill is around 60 mins for full visual bar
                        const progress = Math.min((minutes / 60) * 100, 100);
                        return (
                            <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-sm text-slate-600">
                                    <span className="font-medium">{skill.skill_name}</span>
                                    <span>{minutes} minutes</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div
                                        className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [profileData, analyticsData] = await Promise.all([
                api.getStudentProfile(),
                api.getStudentDashboardAnalytics()
            ]);
            setProfile(profileData);
            setAnalytics(analyticsData);
        } catch (err) {
            console.error('Failed to fetch student dashboard:', err);
            setError(err.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const getGradeNumber = () => {
        if (!profile?.grade) return 5;
        const match = profile.grade.match(/\d+/);
        return match ? parseInt(match[0]) : 5;
    };

    const getGradePath = () => {
        const gradeNum = getGradeNumber();
        if (gradeNum >= 1 && gradeNum <= 4) return `/junior/grade/${gradeNum}`;
        if (gradeNum >= 5 && gradeNum <= 7) return `/middle/grade/${gradeNum}`;
        if (gradeNum >= 8) return `/senior/grade/${gradeNum}`;
        return `/junior/grade/5`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="text-center space-y-4">
                        <Loader2 className="h-12 w-12 animate-spin text-cyan-500 mx-auto" />
                        <p className="text-slate-500 font-medium animate-pulse">Loading amazing insights...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="text-center max-w-md p-6 bg-white rounded-2xl shadow-xl border border-slate-100">
                        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <p className="text-slate-800 font-bold text-lg mb-2">Oops! Something went wrong</p>
                        <p className="text-slate-500 mb-6">{error}</p>
                        <button
                            onClick={fetchDashboardData}
                            className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/30"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const { quick_stats, chapter_time, chapter_wise, learning_insights } = analytics || {};

    // Quick Stats Preparation
    const accuracy = quick_stats?.total_questions >
        0 ? Math.round((quick_stats.total_correct * 100) / quick_stats.total_questions)
        : 0;
    const totalMinutes = Math.round((quick_stats?.total_time_seconds || 0) / 60);

    // Chart Data Preparation
    const chartData = (chapter_time || []).map(c => ({
        name: c.chapter_name.length > 9 ? c.chapter_name.substring(0, 9) + '..' : c.chapter_name,
        full_name: c.chapter_name,
        minutes: Math.round(c.time_spent / 60)
    }));

    // Recharts custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-slate-100 shadow-xl rounded-xl z-50">
                    <p className="font-bold text-slate-700 text-sm mb-1">{payload[0].payload.full_name}</p>
                    <p className="text-cyan-600 font-medium text-sm">
                        {payload[0].value} minutes spent
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            <Navbar />

            <div className="container mx-auto px-4 pt-24 max-w-6xl space-y-8">

                {/* SECTION 1: Welcome Header */}
                <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-gradient-to-br from-white to-cyan-50/50 border border-slate-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-block px-3 py-1 bg-cyan-100 text-cyan-700 text-sm font-bold rounded-full mb-3">
                                {profile?.grade || 'Grade 5'} Student
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                                Welcome back{profile?.first_name ? `, ${profile.first_name}` : ''}! 👋
                            </h1>
                            <p className="text-slate-500 mt-2 text-lg">Ready to continue your learning journey today?</p>
                        </div>
                        {/* SECTION 6: Quick Actions */}
                        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                            <button
                                onClick={() => navigate(`/math/grade/${getGradeNumber()}`)}
                                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all group"
                            >
                                <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                Start Practice
                            </button>
                            <button
                                onClick={() => navigate('/math')}
                                className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                            >
                                <BookOpen className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
                                Explore
                            </button>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: Quick Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                        <Target className="h-8 w-8 text-cyan-500 mb-4 relative z-10" />
                        <div className="text-3xl font-black text-slate-800 relative z-10">{quick_stats?.total_questions || 0}</div>
                        <div className="text-slate-500 font-medium text-sm relative z-10">Questions Attempted</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                        <CheckCircle2 className="h-8 w-8 text-emerald-500 mb-4 relative z-10" />
                        <div className="text-3xl font-black text-slate-800 relative z-10">{quick_stats?.total_correct || 0}</div>
                        <div className="text-slate-500 font-medium text-sm relative z-10">Correct Answers</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                        <Percent className="h-8 w-8 text-purple-500 mb-4 relative z-10" />
                        <div className="text-3xl font-black text-slate-800 relative z-10">{accuracy}%</div>
                        <div className="text-slate-500 font-medium text-sm relative z-10">Overall Accuracy</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                        <Clock className="h-8 w-8 text-blue-500 mb-4 relative z-10" />
                        <div className="text-3xl font-black text-slate-800 relative z-10">{totalMinutes} <span className="text-xl text-slate-600 font-bold">min</span></div>
                        <div className="text-slate-500 font-medium text-sm relative z-10">Total Practice Time</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* SECTION 3: Chapter Time Analytics */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-blue-500" />
                            Time Spent by Chapter
                        </h2>
                        {chartData.length > 0 ? (
                            <div className="h-[380px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 90 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#475569', fontSize: 11, fontWeight: 'bold' }}
                                            interval={0}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 12 }}
                                            tickFormatter={(value) => `${value}m`}
                                        />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                                        <Bar
                                            dataKey="minutes"
                                            fill="#06b6d4"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={40}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-[300px] flex items-center justify-center text-slate-400 font-medium">
                                No practice data available yet. Start practicing!
                            </div>
                        )}
                    </div>

                    {/* SECTION 5: Learning Insights */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2 px-1">
                            <Zap className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            Insights
                        </h2>

                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-2xl border border-indigo-100 transition-all hover:shadow-md">
                            <div className="flex items-center gap-3 mb-2">
                                <Award className="h-5 w-5 text-indigo-500" />
                                <div className="text-sm font-bold text-indigo-900">Most Practiced Skill</div>
                            </div>
                            <div className="text-lg font-bold text-slate-800 line-clamp-2 leading-tight">
                                {learning_insights?.most_practiced?.skill_name || 'N/A'}
                            </div>
                            <div className="text-sm text-indigo-600 font-medium mt-2">
                                {learning_insights?.most_practiced?.total
                                    ? `${learning_insights.most_practiced.total} questions`
                                    : 'Start practicing to see insights'}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-rose-50 to-orange-50 p-5 rounded-2xl border border-rose-100 transition-all hover:shadow-md">
                            <div className="flex items-center gap-3 mb-2">
                                <Target className="h-5 w-5 text-rose-500" />
                                <div className="text-sm font-bold text-rose-900">Area for Improvement</div>
                            </div>
                            <div className="text-lg font-bold text-slate-800 line-clamp-2 leading-tight">
                                {learning_insights?.weakest_skill?.skill_name || 'N/A'}
                            </div>
                            <div className="text-sm text-rose-600 font-medium mt-2">
                                {learning_insights?.weakest_skill?.accuracy !== undefined
                                    ? `${Math.round(learning_insights.weakest_skill.accuracy * 100)}% accuracy - Needs review`
                                    : 'Keep practicing to find weak spots'}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-100 transition-all hover:shadow-md">
                            <div className="flex items-center gap-3 mb-2">
                                <Clock className="h-5 w-5 text-emerald-500" />
                                <div className="text-sm font-bold text-emerald-900">Avg Time per Question</div>
                            </div>
                            <div className="text-3xl font-black text-slate-800">
                                {learning_insights?.avg_time_per_question
                                    ? `${learning_insights.avg_time_per_question.toFixed(1)}s`
                                    : '0s'}
                            </div>
                            <div className="text-sm text-emerald-600 font-medium mt-1">
                                Overall answering speed
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 4: Chapter-wise Skill Breakdown */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-cyan-500" />
                        Time Spent by Chapter
                    </h2>

                    {chapter_wise && Object.keys(chapter_wise).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {Object.entries(chapter_wise)
                                .map(([chapter, skills]) => (
                                    <ChapterAccordion key={chapter} chapter={chapter} skills={skills} />
                                ))
                            }
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-500 font-medium bg-slate-50 rounded-xl border border-slate-100 dashed">
                            No chapter data found. Complete some practices to see a breakdown!
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default StudentDashboard;

