import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import {
    Play,
    BookOpen,
    Loader2,
    Target,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Zap,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    ArrowUp,
    ArrowDown,
    ExternalLink,
    Filter
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

const ChapterAccordion = ({ chapter, skills, mode }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Filter to hide skills with NO attempts
    const attemptedSkills = (skills || []).filter(s => s.attempts > 0);
    
    // Simple average of all skills in the chapter
    const accuracies = (skills || []).map(s => mode === 'best' ? s.best_accuracy : s.latest_accuracy);
    const chapterProgress = accuracies.length > 0 
        ? Math.round(accuracies.reduce((a, b) => a + b, 0) / accuracies.length) 
        : 0;

    return (
        <div className="border border-slate-200 rounded-2xl mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all group/chapter">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex justify-between items-center p-5 transition-colors ${isOpen ? 'bg-slate-50' : 'bg-white'}`}
            >
                <div className="flex flex-col items-start gap-1">
                    <div className="font-extrabold text-slate-800 text-left text-base group-hover/chapter:text-cyan-600 transition-colors">{chapter}</div>
                    <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div 
                                className="h-full bg-cyan-500 rounded-full transition-all duration-700" 
                                style={{ width: `${chapterProgress}%` }} 
                            />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{chapterProgress}% Total</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Skills</span>
                        <span className="text-sm font-bold text-slate-600">{attemptedSkills.length} of {skills.length}</span>
                    </div>
                    {isOpen ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                </div>
            </button>
            {isOpen && (
                <div className="p-5 space-y-5 bg-white border-t border-slate-50">
                    {attemptedSkills.length > 0 ? (
                        attemptedSkills.map((skill, idx) => {
                            const minutes = Math.round(skill.time_spent / 60);
                            const displayAccuracy = mode === 'best' ? skill.best_accuracy : skill.latest_accuracy;
                            return (
                                <div key={idx} className="space-y-1.5 group/skill">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-bold text-slate-700 group-hover/skill:text-cyan-600 transition-colors">{skill.skill_name}</span>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                                                <Clock className="h-3 w-3" />
                                                {minutes}m
                                            </div>
                                            <span className={`font-black text-xs ${displayAccuracy >= 80 ? 'text-emerald-500' : displayAccuracy >= 50 ? 'text-amber-500' : 'text-slate-400'}`}>
                                                {displayAccuracy}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ease-out rounded-full ${
                                                displayAccuracy >= 80 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' 
                                                : displayAccuracy >= 50 ? 'bg-gradient-to-r from-amber-400 to-amber-500' 
                                                : 'bg-gradient-to-r from-cyan-400 to-blue-400'
                                            }`}
                                            style={{ width: `${displayAccuracy}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-4 text-xs text-slate-400 italic">No progress recorded for these skills yet.</div>
                    )}
                </div>
            )}
        </div>
    );
};

const ChronologicalSummary = ({ sessions }) => {
    const [filterCategory, setFilterCategory] = React.useState('all');
    const [sortOrder, setSortOrder] = React.useState('desc'); // 'asc' | 'desc'
    const [currentPage, setCurrentPage] = React.useState(1);
    const recordsPerPage = 10;

    // Filter and Sort
    const processedSessions = React.useMemo(() => {
        let result = [...sessions];
        if (filterCategory !== 'all') {
            result = result.filter(s => s.category.toLowerCase() === filterCategory.toLowerCase());
        }
        result.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });
        return result;
    }, [sessions, filterCategory, sortOrder]);

    // Pagination
    const totalPages = Math.ceil(processedSessions.length / recordsPerPage);
    const currentRecords = processedSessions.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

    if (sessions.length === 0) return null;

    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-8 w-full overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header with Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                        <div className="p-2 bg-cyan-100 rounded-xl">
                            <Clock className="h-6 w-6 text-cyan-600" />
                        </div>
                        Chronological Summary
                    </h2>
                    <p className="text-slate-500 text-sm mt-1 ml-11">Review your recent activities and performance</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                        <Filter className="h-4 w-4 text-slate-400 ml-2" />
                        <select 
                            value={filterCategory}
                            onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
                            className="bg-transparent text-slate-600 text-sm font-bold px-2 py-1 outline-none cursor-pointer"
                        >
                            <option value="all">All Categories</option>
                            <option value="practice">Practice</option>
                            <option value="assessment">Assessment</option>
                        </select>
                    </div>

                    <button 
                        onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                        className="flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold rounded-xl px-4 py-2.5 hover:bg-slate-100 transition-all active:scale-95"
                    >
                        Date {sortOrder === 'desc' ? <ArrowDown className="h-4 w-4 text-cyan-500" /> : <ArrowUp className="h-4 w-4 text-cyan-500" />}
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto -mx-6 md:mx-0">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="py-4 px-6 font-bold text-slate-500 text-[11px] uppercase tracking-wider rounded-l-2xl border-y border-slate-100">Sno</th>
                            <th className="py-4 px-4 font-bold text-slate-500 text-[11px] uppercase tracking-wider border-y border-slate-100">Date</th>
                            <th className="py-4 px-4 font-bold text-slate-500 text-[11px] uppercase tracking-wider border-y border-slate-100">Category</th>
                            <th className="py-4 px-4 font-bold text-slate-500 text-[11px] uppercase tracking-wider border-y border-slate-100">Skill Name</th>
                            <th className="py-4 px-4 font-bold text-slate-500 text-[11px] uppercase tracking-wider border-y border-slate-100">Sub Skill</th>
                            <th className="py-4 px-4 font-bold text-slate-500 text-[11px] uppercase tracking-wider border-y border-slate-100">Questions</th>
                            <th className="py-4 px-4 font-bold text-emerald-600 text-[11px] uppercase tracking-wider border-y border-slate-100">Correct</th>
                            <th className="py-4 px-4 font-bold text-rose-500 text-[11px] uppercase tracking-wider border-y border-slate-100">Incorrect</th>
                            <th className="py-4 px-4 font-bold text-slate-400 text-[11px] uppercase tracking-wider border-y border-slate-100">Skipped</th>
                            <th className="py-4 px-4 font-bold text-slate-500 text-[11px] uppercase tracking-wider border-y border-slate-100">Duration</th>
                            {/* <th className="py-4 px-6 font-bold text-slate-500 text-[11px] uppercase tracking-wider rounded-r-2xl border-y border-slate-100 text-center">Report</th> */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {currentRecords.map((session, idx) => (
                            <tr key={session.id} className="hover:bg-slate-50/80 transition-all group">
                                <td className="py-5 px-6 text-sm text-slate-400 font-medium">{(currentPage - 1) * recordsPerPage + idx + 1}</td>
                                <td className="py-5 px-4 text-sm text-slate-600 font-semibold whitespace-nowrap">
                                    {new Date(session.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="py-5 px-4">
                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                                        session.category.toLowerCase() === 'assessment' 
                                        ? 'bg-purple-100 text-purple-600 border border-purple-200' 
                                        : 'bg-cyan-100 text-cyan-600 border border-cyan-200'
                                    }`}>
                                        {session.category}
                                    </span>
                                </td>
                                <td className="py-5 px-4 text-sm text-slate-800 font-bold">{session.skill_name}</td>
                                <td className="py-5 px-4 text-sm text-slate-500 font-medium italic">{session.sub_skill_name || 'N/A'}</td>
                                <td className="py-5 px-4 text-sm text-slate-700 font-black">{session.total_questions}</td>
                                <td className="py-5 px-4 text-sm text-emerald-500 font-black">
                                    <div className="flex items-center gap-1">
                                        {session.correct}
                                        {session.correct > 0 && <CheckCircle2 className="h-3 w-3" />}
                                    </div>
                                </td>
                                <td className="py-5 px-4 text-sm text-rose-500 font-black">{session.incorrect}</td>
                                <td className="py-5 px-4 text-sm text-slate-400 font-bold">{session.skipped}</td>
                                <td className="py-5 px-4 text-sm text-slate-600 font-bold tabular-nums">
                                    {Math.floor(session.duration/60)}m {session.duration%60}s
                                </td>
                                {/* <td className="py-5 px-6 text-center">
                                    {session.has_report ? (
                                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-900 hover:text-white text-slate-700 rounded-xl text-xs font-black transition-all border border-slate-200 shadow-sm active:scale-95 group/btn">
                                            <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                            Report
                                        </button>
                                    ) : (
                                        <span className="text-slate-300 text-xs font-medium italic">Practice</span>
                                    )}
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-50">
                    <p className="text-sm text-slate-500 font-medium">
                        Showing <span className="text-slate-800 font-bold">{(currentPage - 1) * recordsPerPage + 1}</span>-
                        <span className="text-slate-800 font-bold">{Math.min(currentPage * recordsPerPage, processedSessions.length)}</span> of 
                        <span className="text-slate-800 font-bold ml-1">{processedSessions.length}</span> records
                    </p>
                    <div className="flex items-center gap-1">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-xl hover:bg-slate-100 disabled:opacity-20 transition-all active:scale-90"
                        >
                            <ChevronLeft className="h-5 w-5 text-slate-600" />
                        </button>
                        <div className="flex gap-1">
                            {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                // Show first, last, and pages around current
                                if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                                    return (
                                        <button 
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-9 h-9 rounded-xl text-sm font-black transition-all active:scale-90 ${
                                                currentPage === pageNum 
                                                ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-200 scale-110' 
                                                : 'text-slate-400 hover:bg-slate-50'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                }
                                if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                                    return <span key={pageNum} className="text-slate-300 px-1 pt-2">...</span>;
                                }
                                return null;
                            })}
                        </div>
                        <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-xl hover:bg-slate-100 disabled:opacity-20 transition-all active:scale-90"
                        >
                            <ChevronRight className="h-5 w-5 text-slate-600" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const StudentDashboard = ({ studentId, isEmbedded = false }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [mode, setMode] = useState('latest'); // 'latest' | 'best'

    useEffect(() => {
        fetchDashboardData();
    }, [studentId]); // Refetch if studentId changes

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [profileData, analyticsData, sessionsData] = await Promise.all([
                api.getStudentProfile(),
                api.getStudentDashboardAnalytics(studentId),
                api.getStudentSessionHistory(100)
            ]);
            setProfile(profileData);
            setAnalytics(analyticsData);
            setSessions(sessionsData || []);
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
            {!isEmbedded && <Navbar />}

            <div className={`container mx-auto px-4 max-w-6xl space-y-8 ${isEmbedded ? 'pt-4' : 'pt-24'}`}>

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
                                Go to {profile?.grade}
                            </button>
                            <button
                                onClick={() => navigate('/algebra')}
                                className="flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 transition-all group"
                            >
                                <BookOpen className="h-5 w-5 text-purple-500 group-hover:scale-110 transition-transform" />
                                Algebra
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* SECTION 3: Chapter Time Analytics */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-blue-500" />
                            Time Spent by Chapter & Module
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
                            Learning Insights
                        </h2>

                        {/* Total Attempts */}
                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-100 transition-all hover:shadow-md">
                            <div className="flex items-center gap-3 mb-2">
                                <Target className="h-5 w-5 text-indigo-500" />
                                <div className="text-sm font-bold text-indigo-900">Questions Attempted</div>
                            </div>
                            <div className="text-3xl font-black text-slate-800">
                                {quick_stats?.total_questions || 0}
                            </div>
                            <div className="text-sm text-indigo-600 font-medium mt-1">
                                Total questions solved so far
                            </div>
                        </div>

                        {/* Correct Answers */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-100 transition-all hover:shadow-md">
                            <div className="flex items-center gap-3 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <div className="text-sm font-bold text-emerald-900">Correct Answers</div>
                            </div>
                            <div className="text-3xl font-black text-slate-800">
                                {quick_stats?.total_correct || 0}
                            </div>
                            <div className="text-sm text-emerald-600 font-medium mt-1">
                                {accuracy}% Accuracy rate
                            </div>
                        </div>

                        {/* Total Time */}
                        <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-5 rounded-2xl border border-purple-100 transition-all hover:shadow-md">
                            <div className="flex items-center gap-3 mb-2">
                                <Clock className="h-5 w-5 text-purple-500" />
                                <div className="text-sm font-bold text-purple-900">Total Learning Time</div>
                            </div>
                            <div className="text-3xl font-black text-slate-800">
                                {totalMinutes} <span className="text-xl text-slate-600 font-bold">min</span>
                            </div>
                            <div className="text-sm text-purple-600 font-medium mt-1">
                                Practice & Assessment sessions
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 7: Chronological Summary */}
                <ChronologicalSummary sessions={sessions} />

                {/* SECTION 4: Chapter-wise Skill Breakdown */}
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-cyan-500" />
                            Curriculum Progress
                        </h2>
                        
                        {/* Latest/Best Toggle */}
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setMode('latest')}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                    mode === 'latest' 
                                    ? 'bg-white text-cyan-600 shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                Latest Attempt
                            </button>
                            <button
                                onClick={() => setMode('best')}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                    mode === 'best' 
                                    ? 'bg-white text-cyan-600 shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                Best Score
                            </button>
                        </div>
                    </div>

                    {chapter_wise && Object.keys(chapter_wise).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            {Object.entries(chapter_wise)
                                .map(([chapter, skills]) => (
                                    <ChapterAccordion key={chapter} chapter={chapter} skills={skills} mode={mode} />
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

