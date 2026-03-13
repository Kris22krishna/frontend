import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Loader2 } from 'lucide-react';
import { api } from '../services/api';
import IDMDashboard from '../components/IDM/IDMDashboard';

const IDMPage = () => {
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
            setError(err.message || 'Failed to load IDM dashboard');
        } finally {
            setLoading(false);
        }
    };

    const getGradeNumber = () => {
        if (!profile?.grade) return 5;
        const match = profile.grade.match(/\d+/);
        return match ? parseInt(match[0]) : 5;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <Navbar />
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-cyan-500 mx-auto mb-4" />
                        <p className="text-slate-500">Loading International Mathematics Day content...</p>
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
            <div className="container mx-auto px-4 pt-24 pb-8 max-w-6xl min-h-[calc(100vh-80px)] flex items-center justify-center">
                <IDMDashboard profile={profile} getGradeNumber={getGradeNumber} />
            </div>
        </div>
    );
};

export default IDMPage;
