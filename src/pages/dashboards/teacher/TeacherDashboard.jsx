import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api';
import {
    Users, BookOpen, Activity, Search, Bell, Loader2
} from 'lucide-react';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [teacherName, setTeacherName] = useState('');
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch teacher profile
                const profile = await api.getTeacherProfile();
                setTeacherName(profile?.first_name || localStorage.getItem('firstName') || 'Teacher');

                // Fetch students list (real data) instead of mock stats
                try {
                    const studentList = await api.getTeacherStudents();
                    setStudents(studentList || []);
                } catch (e) {
                    console.warn("Failed to fetch students list", e);
                }

            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError(err.message);
                setTeacherName(localStorage.getItem('firstName') || 'Teacher');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-500">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {teacherName}! 👋</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input type="search" placeholder="Search students..." className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="relative cursor-pointer">
                        <Bell className="h-6 w-6 text-gray-600" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                    </div>
                    <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                        {teacherName.charAt(0).toUpperCase()}
                    </div>
                </div>
            </div>

            {/* Main Content - Simplified */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
                <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-800">My Students</h2>
                </div>

                {students.length > 0 ? (
                    <div className="space-y-2">
                        {students.map((student, i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-100 transition-all">
                                <div>
                                    <div className="font-medium text-gray-800">{student.name}</div>
                                    <div className="text-sm text-gray-500">{student.email}</div>
                                </div>
                                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                    Grade {student.grade || 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        <p>No students found.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default TeacherDashboard;

