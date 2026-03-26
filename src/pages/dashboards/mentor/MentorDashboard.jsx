import React, { useState, useEffect, useRef } from 'react';
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
    ChevronDown,
    ChevronUp,
    ArrowLeft,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';

const MentorDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const dateInputRef = useRef(null);
    const [loading, setLoading] = useState(true);
    // Get initial name from storage if available
    const [mentorName, setMentorName] = useState(sessionStorage.getItem('firstName') || 'Mentor');
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [insights, setInsights] = useState({ total_time_seconds: 0, active_mentees: [], follow_up_mentees: [] });
    const [error, setError] = useState(null);

    const [expandedClasses, setExpandedClasses] = useState({});

    // Sync name whenever user object is updated
    useEffect(() => {
        if (user?.first_name) {
            setMentorName(user.first_name);
        } else if (user?.name) {
             setMentorName(user.name.split(' ')[0]);
        }
    }, [user]);

    const toggleClass = (grade) => {
        setExpandedClasses(prev => ({
            ...prev,
            [grade]: prev[grade] === undefined ? true : !prev[grade]
        }));
    };

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
    const MenteeCard = ({ student, showGrade = true }) => (
        <button
            onClick={() => setSelectedStudentId(student.user_id)}
            className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group text-left w-full"
        >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-600 flex items-center justify-center font-black text-lg shadow-inner border border-white shrink-0">
                {student.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 text-sm truncate">{student.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                    {showGrade && (
                        <span className="text-[9px] font-black bg-slate-100 text-slate-400 px-2 py-0.5 rounded uppercase tracking-widest">
                            Class {student.grade || 'N/A'}
                        </span>
                    )}
                    <span className="text-[9px] font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Dashboard →
                    </span>
                </div>
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
                                <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 font-black">{s.grade}</span>
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
                                <label 
                                    className="flex items-center gap-2 px-3 relative cursor-pointer hover:bg-white rounded-xl py-1.5 transition-colors group"
                                    onClick={(e) => {
                                        if (dateInputRef.current) {
                                            if (dateInputRef.current.showPicker) {
                                                dateInputRef.current.showPicker();
                                            } else {
                                                dateInputRef.current.click();
                                            }
                                        }
                                    }}
                                >
                                    <Calendar className="h-4 w-4 text-indigo-500 group-hover:scale-110 transition-transform pointer-events-none" />
                                    <span className="font-bold text-slate-700 text-sm whitespace-nowrap pointer-events-none">
                                        {selectedDate === new Date().toISOString().split('T')[0] ? 'Today' : selectedDate}
                                    </span>
                                    <input 
                                        ref={dateInputRef}
                                        type="date" 
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                                        max={new Date().toISOString().split('T')[0]}
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        title="Select Date"
                                    />
                                </label>
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

                    {/* SECTION 3: My Students List */}
                    <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Users className="h-5 w-5 text-indigo-500" />
                                My Students
                            </h2>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{students.length} Total Assigned</span>
                        </div>

                        {students.length > 0 ? (
                            students.length > 10 ? (
                                // Grouped by Class (Collapsible)
                                <div className="space-y-6">
                                    {Object.entries(
                                        students.reduce((acc, s) => {
                                            const grade = s.grade || 'N/A';
                                            if (!acc[grade]) acc[grade] = [];
                                            acc[grade].push(s);
                                            return acc;
                                        }, {})
                                    )
                                    .sort((a,b) => {
                                        const numA = parseInt(a[0].replace(/\D/g, '')) || 0;
                                        const numB = parseInt(b[0].replace(/\D/g, '')) || 0;
                                        return numA - numB;
                                    })
                                    .map(([grade, classStudents]) => {
                                        const isExpanded = expandedClasses[grade] === true; // Default false (closed)
                                        return (
                                            <div key={grade} className="bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden">
                                                <button 
                                                    onClick={() => toggleClass(grade)}
                                                    className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-100/80 transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">{grade}</h3>
                                                        <span className="text-[10px] font-bold bg-white text-slate-400 px-2 py-0.5 rounded-full border border-slate-100">{classStudents.length} Students</span>
                                                    </div>
                                                    <div className="h-px flex-1 bg-slate-200/60"></div>
                                                    {isExpanded ? (
                                                        <ChevronUp className="h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
                                                    )}
                                                </button>
                                                
                                                {isExpanded && (
                                                    <div className="p-6 pt-2">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                                            {classStudents.map((student, idx) => (
                                                                <MenteeCard key={student.user_id || idx} student={student} showGrade={false} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                // Simple Grid
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {students.map((student, idx) => (
                                        <MenteeCard key={student.user_id || idx} student={student} showGrade={true} />
                                    ))}
                                </div>
                            )
                        ) : (
                            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100 border-dashed">
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
