import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import Navbar from '../../../components/Navbar';
import StudentDetailView from '../../../components/StudentDetailView';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart
} from 'recharts';
import {
    Users, Search, Loader2, UserCircle, Clock, Activity, BookOpen, Sparkles
} from 'lucide-react';

const MentorDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [mentorName, setMentorName] = useState('');
    const [students, setStudents] = useState([]);
    const [stats, setStats] = useState({ total_students: 0, total_time_seconds: 0, avg_time_seconds: 0, active_students_count: 0 });
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedGrade, setSelectedGrade] = useState('All');
    const [selectedStatsDate, setSelectedStatsDate] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch mentor profile
                const profile = await api.getMentorProfile();
                setMentorName(profile?.name || localStorage.getItem('firstName') || 'Mentor');

                // Fetch students list
                const studentList = await api.getMentorStudents();
                setStudents(studentList || []);

                // Fetch stats
                try {
                    const statsData = await api.getMentorStats();
                    setStats(statsData);
                } catch (e) {
                    console.warn("Failed to fetch stats", e);
                }

            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError(err.message);
                setMentorName(localStorage.getItem('firstName') || 'Mentor');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper to format time
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        if (h > 0) return `${h}h ${m}m`;
        return `${m}m`;
    };

    // Filter students by search
    const searchedStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Group by Grade
    const grades = ['All', ...new Set(students.map(s => s.grade || 'Ungraded'))].sort();

    // Filter by Grade
    const filteredStudents = selectedGrade === 'All'
        ? searchedStudents
        : searchedStudents.filter(s => (s.grade || 'Ungraded') === selectedGrade);

    // Compute stats for the selected date from the daily_stats array
    const selectedDateStr = selectedStatsDate.toISOString().split('T')[0];
    const selectedDayStat = stats.daily_stats ? stats.daily_stats.find(d => d.date === selectedDateStr) : null;

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-500">Loading dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-12 font-sans text-slate-900">
            <Navbar />
            <div className="container mx-auto pt-24 px-4 max-w-7xl space-y-8">

                {/* Hero Section */}
                <div className="bg-gradient-to-br from-[#A8FBD3] via-[#4FB7B3] to-[#637AB9] rounded-3xl p-8 md:p-10 text-[#31326F] relative overflow-hidden shadow-lg">
                    <div className="absolute top-4 right-4 text-6xl opacity-20 animate-pulse">✨</div>
                    <div className="absolute bottom-4 left-4 text-5xl opacity-20">🌟</div>

                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                        <div className="hidden md:block text-8xl md:text-9xl animate-bounce-slow">👨‍🏫</div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                                <Sparkles className="h-5 w-5" />
                                <span className="text-sm font-medium opacity-90 tracking-wide">Mentor Dashboard</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
                                Welcome, {mentorName}!
                            </h1>
                            <p className="text-lg opacity-90 mb-6 font-medium max-w-2xl">
                                Track your students' progress and guide them towards excellence.
                            </p>

                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium border border-white/30">
                                <Users size={18} />
                                <span>{students.length} Assigned Students</span>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        {error}
                    </div>
                )}

                {/* Stats Cards - Now with Day Navigation */}
                <div className="flex flex-col gap-4 mb-6">
                    {/* Date Selector Header */}
                    <div className="flex items-center justify-end gap-3 mb-2">
                        <button
                            onClick={() => {
                                const newDate = new Date(selectedStatsDate);
                                newDate.setDate(newDate.getDate() - 1);
                                setSelectedStatsDate(newDate);
                            }}
                            className="bg-white p-2 rounded-full shadow-sm hover:shadow-md border border-slate-200 text-slate-500 hover:text-slate-700 transition-all font-bold"
                            title="Previous Day"
                        >
                            &larr;
                        </button>

                        <div className="bg-white px-5 py-2 rounded-full shadow-sm border border-slate-200 font-bold text-[#31326F] min-w-[150px] text-center">
                            {new Date().toDateString() === selectedStatsDate.toDateString()
                                ? "Today"
                                : selectedStatsDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>

                        <button
                            onClick={() => {
                                const newDate = new Date(selectedStatsDate);
                                newDate.setDate(newDate.getDate() + 1);
                                if (newDate <= new Date()) {
                                    setSelectedStatsDate(newDate);
                                }
                            }}
                            disabled={new Date().toDateString() === selectedStatsDate.toDateString()}
                            className={`p-2 rounded-full shadow-sm border border-slate-200 transition-all font-bold ${new Date().toDateString() === selectedStatsDate.toDateString()
                                ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                                : 'bg-white hover:shadow-md text-slate-500 hover:text-slate-700'
                                }`}
                            title="Next Day"
                        >
                            &rarr;
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Total Students Card (Always Static) */}
                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex items-center gap-4">
                            <div className="p-4 bg-blue-100 rounded-full text-blue-600">
                                <Users className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Total Students</p>
                                <p className="text-3xl font-bold text-[#31326F]">{stats.total_students}</p>
                            </div>
                        </div>

                        {/* Total Time Card */}
                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex items-center gap-4">
                            <div className="p-4 bg-teal-100 rounded-full text-teal-600">
                                <Clock className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Time Spent</p>
                                <p className="text-3xl font-bold text-[#31326F]">
                                    {formatTime(selectedDayStat ? selectedDayStat.total_time_seconds : (new Date().toDateString() === selectedStatsDate.toDateString() ? stats.total_time_seconds : 0))}
                                </p>
                            </div>
                        </div>

                        {/* Questions Solved Card */}
                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex items-center gap-4">
                            <div className="p-4 bg-purple-100 rounded-full text-purple-600">
                                <BookOpen className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Questions Solved</p>
                                <p className="text-3xl font-bold text-[#31326F]">
                                    {selectedDayStat ? selectedDayStat.total_solved : (new Date().toDateString() === selectedStatsDate.toDateString() ? (stats.today_questions_solved || 0) : 0)}
                                </p>
                            </div>
                        </div>

                        {/* Avg Engagement Card */}
                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex items-center gap-4">
                            <div className="p-4 bg-orange-100 rounded-full text-orange-600">
                                <Activity className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Avg Engagement</p>
                                <p className="text-3xl font-bold text-[#31326F]">
                                    {formatTime(selectedDayStat ? selectedDayStat.avg_time_seconds : (new Date().toDateString() === selectedStatsDate.toDateString() ? stats.avg_time_seconds : 0))}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">Per student</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                {stats.daily_stats && stats.daily_stats.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-[#31326F] flex items-center gap-2">
                                <Activity className="h-5 w-5 text-teal-500" />
                                Daily Engagement
                            </h3>
                            <span className="text-sm text-slate-400">Time spent by all students</span>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={stats.daily_stats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                    <YAxis yAxisId="left" orientation="left" stroke="#0f766e" label={{ value: 'Total Time (min)', angle: -90, position: 'insideLeft', fill: '#0f766e', fontSize: 12 }}
                                        tickFormatter={(val) => Math.round(val / 60)}
                                        tick={{ fontSize: 12, fill: '#64748b' }}
                                        axisLine={false} tickLine={false}
                                    />
                                    <YAxis yAxisId="right" orientation="right" stroke="#db2777" label={{ value: 'Avg Time (min)', angle: 90, position: 'insideRight', fill: '#db2777', fontSize: 12 }}
                                        tickFormatter={(val) => Math.round(val / 60)}
                                        tick={{ fontSize: 12, fill: '#64748b' }}
                                        axisLine={false} tickLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ fontSize: '14px', fontWeight: 500 }}
                                        labelStyle={{ color: '#31326F', fontWeight: 'bold', marginBottom: '4px' }}
                                        formatter={(value, name) => [formatTime(value), name === 'total_time_seconds' ? 'Total Time' : 'Avg Time']}
                                    />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                    <Bar yAxisId="left" dataKey="total_time_seconds" name="Total Time" fill="url(#colorTotal)" radius={[4, 4, 0, 0]} barSize={50} />
                                    <Line yAxisId="right" type="monotone" dataKey="avg_time_seconds" name="Avg Time" stroke="#db2777" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                                    <defs>
                                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Main Content - Student List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[500px] flex flex-col overflow-hidden">
                    {/* Toolbar */}
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/30">
                        {/* Tabs */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
                            {grades.map(grade => (
                                <button
                                    key={grade}
                                    onClick={() => setSelectedGrade(grade)}
                                    className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedGrade === grade
                                        ? 'bg-[#31326F] text-white shadow-md transform scale-105'
                                        : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                                        }`}
                                >
                                    {grade.startsWith('Grade') ? grade : `Grade ${grade}`}
                                    {grade === 'All' && ''}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search students by name..."
                                className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4FB7B3] focus:border-transparent bg-white shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Student Grid */}
                    <div className="p-6 flex-1 bg-slate-50/50">
                        {filteredStudents.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredStudents.map((student, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedStudent(student)}
                                        className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#4FB7B3]/30 transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A8FBD3] to-[#637AB9] opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 text-[#31326F] flex items-center justify-center font-bold text-2xl mb-3 group-hover:scale-110 transition-transform shadow-inner border border-white">
                                            {student.name.charAt(0)}
                                        </div>
                                        <h3 className="font-bold text-[#31326F] text-lg group-hover:text-[#4FB7B3] transition-colors">
                                            {student.name}
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-4 truncate w-full">{student.email || 'No email provided'}</p>

                                        <span className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase tracking-wider">
                                            {student.grade || 'N/A'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full py-20">
                                <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                                    <UserCircle className="text-slate-300 h-12 w-12" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700">No students found</h3>
                                <p className="text-slate-500 mt-1 max-w-md text-center">
                                    {searchTerm
                                        ? `No results for "${searchTerm}" in ${selectedGrade}`
                                        : `No students assigned in ${selectedGrade}.`}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Detail View Modal */}
            {selectedStudent && (
                <StudentDetailView
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                />
            )}
        </div>
    );
};

export default MentorDashboard;
