import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import {
    Play,
    BookOpen,
    ChevronRight,
    Loader2,
} from 'lucide-react';
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
        const match = profile.grade.match(/\d+/);
        return match ? parseInt(match[0]) : 5;
    };

    // Subjects (static for now, could be dynamic later)
    const subjects = [
        { name: 'Mathematics', icon: '🔢', color: 'bg-blue-500', path: '/math' },
        { name: 'Learn to Learn', icon: '🧠', color: 'bg-purple-500', path: '/learn-to-learn' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <Navbar />
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-cyan-500 mx-auto mb-4" />
                        <p className="text-slate-500">Loading your dashboard...</p>
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Navbar />

            <div className="container mx-auto px-4 pt-24 pb-12 max-w-5xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                            Welcome back{profile?.first_name ? `, ${profile.first_name}` : ''}! 👋
                        </h1>
                        <p className="text-slate-500">Ready to learn something new today?</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Quick Actions */}
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate(`/math/grade/${getGradeNumber()}`)}
                            className="w-full group bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-left hover:shadow-xl hover:shadow-cyan-200 transition-all"
                        >
                            <Play className="h-10 w-10 text-white mb-3 group-hover:scale-110 transition-transform" />
                            <div className="text-white font-bold text-lg">Start Practice</div>
                            <div className="text-cyan-100 text-sm">{profile?.grade || 'Grade 5'} Math</div>
                        </button>

                        <button
                            onClick={() => navigate('/math')}
                            className="w-full group bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-left hover:shadow-xl hover:shadow-purple-200 transition-all"
                        >
                            <BookOpen className="h-10 w-10 text-white mb-3 group-hover:scale-110 transition-transform" />
                            <div className="text-white font-bold text-lg">Explore Topics</div>
                            <div className="text-purple-100 text-sm">Browse all subjects</div>
                        </button>
                    </div>

                    {/* Subjects */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-cyan-500" />
                                My Subjects
                            </h2>
                            <button className="text-cyan-500 text-sm hover:text-cyan-600 flex items-center gap-1">
                                View All <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {subjects.map((subject, i) => (
                                <div
                                    key={i}
                                    onClick={() => navigate(subject.path)}
                                    className="bg-slate-50 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-100 transition-all group border border-slate-100"
                                >
                                    <div className="text-4xl">{subject.icon}</div>
                                    <div className="flex-1">
                                        <div className="text-slate-800 font-semibold mb-1">{subject.name}</div>
                                        <div className="text-slate-400 text-xs">Click to start learning</div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
