import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import { Loader2, BookOpen, Trophy, Sparkles, ArrowRight, GraduationCap, Activity } from 'lucide-react';
import { api } from '../../../services/api';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await api.getStudentProfile();
            setProfile(data);
        } catch (err) {
            console.error('Failed to fetch student profile:', err);
            setError(err.message || 'Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    // Helper to get grade number from grade string (e.g., "Grade 5" -> 5)
    const getGradeNumber = () => {
        if (!profile?.grade) return 5; // Default to grade 5
        const match = profile.grade.toString().match(/\d+/);
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
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <Navbar />
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-cyan-500 mx-auto mb-4" />
                        <p className="text-slate-500">Loading your personal dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <Navbar />
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="text-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                            onClick={fetchProfile}
                            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/50">
            <Navbar />

            <div className="container mx-auto px-4 pt-28 pb-12 max-w-6xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
                            Welcome back{profile?.first_name ? `, ${profile.first_name}` : ''}! 👋
                        </h1>
                        <p className="text-slate-500 text-lg">Your mathematics journey continues here.</p>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* My Class Card */}
                    <div
                        onClick={() => navigate(getGradePath())}
                        className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:bg-indigo-100 transition-colors" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform">
                                <GraduationCap size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">My Class</h3>
                            <p className="text-slate-500 mb-6 leading-relaxed">
                                Access your Grade {getGradeNumber()} syllabus, lessons, and practice materials.
                            </p>
                            <div className="flex items-center text-indigo-600 font-bold">
                                <span>Go to Class</span>
                                <ArrowRight size={18} className="ml-2 group-hover:ml-4 transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Rapid Math Card */}
                    <div
                        onClick={() => navigate('/rapid-math')}
                        className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-16 -mt-16 group-hover:bg-amber-100 transition-colors" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform">
                                <Trophy size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Rapid Math</h3>
                            <p className="text-slate-500 mb-6 leading-relaxed">
                                Test your speed and accuracy with daily challenges and climb the leaderboard.
                            </p>
                            <div className="flex items-center text-amber-600 font-bold">
                                <span>Start Challenge</span>
                                <ArrowRight size={18} className="ml-2 group-hover:ml-4 transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* IDM 2026 Special Card */}
                    <div
                        onClick={() => navigate('/idm-dashboard')}
                        className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer group relative overflow-hidden text-white"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:bg-white/20 transition-colors" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform border border-white/20">
                                <Sparkles size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">IDM 2026</h3>
                            <p className="text-blue-100 mb-6 leading-relaxed">
                                International Mathematics Day special content, puzzles, and hidden treasures!
                            </p>
                            <div className="flex items-center font-bold">
                                <span>Explore IDM</span>
                                <ArrowRight size={18} className="ml-2 group-hover:ml-4 transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Diagnosis Test Card */}
                    <div
                        onClick={() => navigate('/diagnosis-test')}
                        className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform">
                                <Activity size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Diagnosis Test</h3>
                            <p className="text-slate-500 mb-6 leading-relaxed">
                                Take a diagnosis test to evaluate your current understanding and get personalized recommendations.
                            </p>
                            <div className="flex items-center text-emerald-600 font-bold">
                                <span>Start Test</span>
                                <ArrowRight size={18} className="ml-2 group-hover:ml-4 transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Diagnosis Results Card */}
                    <div
                        onClick={() => navigate('/student/diagnosis-results')}
                        className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -mr-16 -mt-16 group-hover:bg-teal-100 transition-colors" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform">
                                <BookOpen size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Diagnosis Results</h3>
                            <p className="text-slate-500 mb-6 leading-relaxed">
                                View your past diagnosis tests, detailed analysis, and track your overall improvement.
                            </p>
                            <div className="flex items-center text-teal-600 font-bold">
                                <span>View Results</span>
                                <ArrowRight size={18} className="ml-2 group-hover:ml-4 transition-all" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
