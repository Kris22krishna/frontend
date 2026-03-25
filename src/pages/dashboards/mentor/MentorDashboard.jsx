import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import Navbar from '../../../components/Navbar';
import StudentDashboard from '../student/StudentDashboard';
import { useAuth } from '../../../contexts/AuthContext';
import {
    Users, 
    Loader2, 
    UserCircle, 
    Clock, 
    Activity, 
    Sparkles, 
    Calendar,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';

const MentorDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    // Get initial name from storage if available
    const [mentorName, setMentorName] = useState(sessionStorage.getItem('firstName') || 'Mentor');
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [insights, setInsights] = useState({ total_time_seconds: 0, active_mentees: [], follow_up_mentees: [] });
    const [error, setError] = useState(null);

    // Sync name whenever user object is updated
    useEffect(() => {
        if (user?.first_name) {
            setMentorName(user.first_name);
        } else if (user?.name) {
             setMentorName(user.name.split(' ')[0]);
        }
    }, [user]);

    useEffect(() => {
        if (!selectedStudentId) {
            fetchDailyInsights();
        }
    }, [selectedDate, selectedStudentId]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [profile, studentList] = await Promise.all([
                api.getMentorProfile(),
                api.getMentorStudents()
            ]);
            setStudents(studentList || []);
        } catch (err) {
            console.error('Error fetching initial mentor data:', err);
            setError('Failed to load dashboard data. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const fetchDailyInsights = async () => {
        try {
            const data = await api.getMentorDailyInsights(selectedDate);
            setInsights(data);
        } catch (err) {
            console.error('Error fetching daily insights:', err);
        }
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        if (h > 0) return `${h}h ${m}m`;
        return `${m}m`;
    };

    const handleDateChange = (days) => {
        const d = new Date(selectedDate);
        d.setDate(d.getDate() + days);
        const dStr = d.toISOString().split('T')[0];
        if (dStr <= new Date().toISOString().split('T')[0]) {
            setSelectedDate(dStr);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    // --- Sub-Component: Mentee Card ---
    const MenteeCard = ({ student }) => (
        <button
            onClick={() => setSelectedStudentId(student.user_id)}
            className="flex flex-col items-center bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden text-center"
        >
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Activity className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-600 flex items-center justify-center font-black text-xl mb-3 shadow-inner border border-white">
                {student.name.charAt(0)}
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-1 truncate w-full">{student.name}</h3>
            <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest">
                Grade {student.grade || 'N/A'}
            </span>
            <div className="mt-4 text-[10px] font-bold text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                View Progress <ChevronRight className="h-3 w-3" />
            </div>
        </button>
    );

    // --- Sub-Component: Insight Card ---
    const InsightCard = ({ title, value, icon: Icon, colorClass, list }) => (
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative group overflow-visible">
            <div className="flex items-center gap-4 mb-2">
                <div className={`p-3 rounded-2xl ${colorClass.bg} ${colorClass.text}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
                    <p className="text-2xl font-black text-slate-800">{value}</p>
                </div>
            </div>

            {/* Hover List Overlay */}
            {list && list.length > 0 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 p-4 z-50 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 origin-top">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">
                        {list.length} {title}
                    </h4>
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {list.map((s, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs">
                                <span className="font-bold text-slate-700">{s.name}</span>
                                <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 font-black">G{s.grade}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <Navbar />

            {selectedStudentId ? (
                <div className="pt-24 space-y-4">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <button 
                            onClick={() => setSelectedStudentId(null)}
                            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors group"
                        >
                            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Mentor Overview
                        </button>
                    </div>
                    <StudentDashboard studentId={selectedStudentId} isEmbedded={true} />
                </div>
            ) : (
                <div className="container mx-auto px-4 pt-24 max-w-7xl space-y-8">
                    
                    {/* SECTION 1: Welcome Header */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-gradient-to-br from-white via-white to-indigo-50/30 border border-slate-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-full mb-3 uppercase tracking-widest">
                                    Mentor Overview
                                </div>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                                    Welcome, {mentorName}! 👋
                                </h1>
                                <p className="text-slate-500 mt-2 text-lg">Guiding {insights.active_mentees.length+insights.follow_up_mentees.length} students towards excellence.</p>
                            </div>
                            
                            {/* Date Selector */}
                            <div className="flex items-center gap-3 bg-slate-100/50 p-2 rounded-2xl border border-slate-200 shadow-inner">
                                <button 
                                    onClick={() => handleDateChange(-1)}
                                    className="p-2 bg-white rounded-xl shadow-sm hover:text-indigo-600 transition-all border border-slate-100"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="flex items-center gap-2 px-3 relative cursor-pointer hover:bg-white rounded-xl py-1.5 transition-colors">
                                    <Calendar className="h-4 w-4 text-indigo-500" />
                                    <span className="font-bold text-slate-700 text-sm whitespace-nowrap">
                                        {selectedDate === new Date().toISOString().split('T')[0] ? 'Today' : selectedDate}
                                    </span>
                                    <input 
                                        type="date" 
                                        className="absolute inset-0 opacity-0 cursor-pointer" 
                                        max={new Date().toISOString().split('T')[0]}
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        title="Select Date"
                                    />
                                </div>
                                <button 
                                    onClick={() => handleDateChange(1)}
                                    disabled={selectedDate === new Date().toISOString().split('T')[0]}
                                    className="p-2 bg-white rounded-xl shadow-sm hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-slate-100"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: Insight KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InsightCard 
                            title="Total Mentee Time" 
                            value={formatTime(insights.total_time_seconds)} 
                            icon={Clock} 
                            colorClass={{ bg: 'bg-indigo-50', text: 'text-indigo-500' }} 
                        />
                        <InsightCard 
                            title="Active Mentees" 
                            value={insights.active_mentees.length} 
                            icon={CheckCircle2} 
                            colorClass={{ bg: 'bg-emerald-50', text: 'text-emerald-500' }} 
                            list={insights.active_mentees}
                        />
                        <InsightCard 
                            title="Follow Up Required" 
                            value={insights.follow_up_mentees.length} 
                            icon={AlertCircle} 
                            colorClass={{ bg: 'bg-rose-50', text: 'text-rose-500' }} 
                            list={insights.follow_up_mentees}
                        />
                    </div>

                    {/* SECTION 3: My Students Grid */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Users className="h-5 w-5 text-indigo-500" />
                                My Students
                            </h2>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{students.length} Total Assigned</span>
                        </div>

                        {students.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {students.map((student, idx) => (
                                    <MenteeCard key={idx} student={student} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100 dashed">
                                <UserCircle className="h-12 w-12 text-slate-300 mx-auto mb-4" strokeWidth={1.5} />
                                <p className="text-slate-500 font-medium">No students assigned to you yet.</p>
                            </div>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
};

export default MentorDashboard;
