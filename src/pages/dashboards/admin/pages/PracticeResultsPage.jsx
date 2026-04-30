import React, { useState, useEffect } from 'react';
import { Search, Download, Loader2, RefreshCw, Trophy, Target, Clock, User, BookOpen } from 'lucide-react';
import { api } from '../../../../services/api';

// Known test configs for display enrichment
const GRADE_TESTS = {
    11: [
        // { skill_id: 11101, name: 'Biology — Cell: Structure and Functions', subject: 'Biology' },
    ],
    12: [
        { skill_id: 12201, name: 'Matrix Order', subject: 'Mathematics' },
        { skill_id: 12203, name: 'Matrix Types', subject: 'Mathematics' },
        { skill_id: 12206, name: 'Matrix Equality', subject: 'Mathematics' },
        { skill_id: 12207, name: 'Matrix Operations', subject: 'Mathematics' },
        { skill_id: 12214, name: 'Matrix Transpose', subject: 'Mathematics' },
        { skill_id: 12217, name: 'Invertible Matrices', subject: 'Mathematics' },
        { skill_id: 12200, name: 'Matrices Chapter Test', subject: 'Mathematics' },
    ],
};

const ALL_GRADE_SKILL_IDS = Object.values(GRADE_TESTS).flat().map(t => t.skill_id);
const SKILL_TO_GRADE = {};
Object.entries(GRADE_TESTS).forEach(([grade, tests]) => {
    tests.forEach(t => { SKILL_TO_GRADE[t.skill_id] = parseInt(grade); });
});

const ALL_GRADES = Object.keys(GRADE_TESTS).map(Number).sort((a, b) => a - b);

const PracticeResultsPage = () => {
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('All');
    const [error, setError] = useState(null);

    const fetchSessions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.getAllPracticeSessions(null, 500);
            setSessions(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Failed to fetch practice sessions:', err);
            setError('Failed to load practice sessions. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    // Filter sessions
    const filteredSessions = sessions.filter(s => {
        // Grade filter
        if (selectedGrade !== 'All') {
            const grade = parseInt(selectedGrade);
            const gradeSkillIds = (GRADE_TESTS[grade] || []).map(t => t.skill_id);
            if (!gradeSkillIds.includes(s.skill_id)) return false;
        }

        // Search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            if (
                !s.student_name?.toLowerCase().includes(term) &&
                !s.student_email?.toLowerCase().includes(term) &&
                !s.skill_name?.toLowerCase().includes(term)
            ) return false;
        }

        return true;
    });

    // Stats
    const totalAttempts = filteredSessions.length;
    const uniqueStudents = new Set(filteredSessions.map(s => s.user_id)).size;
    const avgAccuracy = totalAttempts > 0
        ? Math.round(filteredSessions.reduce((sum, s) => sum + (s.accuracy || 0), 0) / totalAttempts)
        : 0;

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
            ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const formatTime = (seconds) => {
        if (!seconds && seconds !== 0) return 'N/A';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        if (mins === 0) return `${secs}s`;
        return `${mins}m ${secs}s`;
    };

    const getAccuracyColor = (accuracy) => {
        if (accuracy >= 80) return 'text-green-700 bg-green-100';
        if (accuracy >= 60) return 'text-yellow-700 bg-yellow-100';
        if (accuracy >= 40) return 'text-orange-700 bg-orange-100';
        return 'text-red-700 bg-red-100';
    };

    // Enrich with known test config
    const getTestInfo = (skillId) => {
        const all = Object.values(GRADE_TESTS).flat();
        return all.find(t => t.skill_id === skillId);
    };

    // CSV Export
    const exportToCSV = () => {
        if (filteredSessions.length === 0) return;

        const headers = ['Student Name', 'Email', 'Grade', 'Test / Skill', 'Subject', 'Total Questions', 'Correct Answers', 'Accuracy (%)', 'Time Taken', 'Date', 'Status'];
        const rows = filteredSessions.map(s => {
            const info = getTestInfo(s.skill_id);
            return [
                s.student_name,
                s.student_email,
                s.student_grade,
                info?.name || s.skill_name,
                info?.subject || 'General',
                s.total_questions,
                s.total_correct,
                s.accuracy,
                formatTime(s.total_time_seconds),
                formatDate(s.started_at),
                s.status,
            ];
        });

        const csvContent = [headers, ...rows]
            .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        const gradePart = selectedGrade === 'All' ? 'all-grades' : `grade-${selectedGrade}`;
        link.setAttribute('download', `practice-results-${gradePart}-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Practice Results</h1>
                    <p className="text-sm text-gray-500 mt-1">View all practice test results by grade and subject</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchSessions}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
                        disabled={loading}
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                    <button
                        onClick={exportToCSV}
                        disabled={filteredSessions.length === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download className="h-4 w-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                    {error}
                </div>
            )}

            {/* Grade Tabs */}
            <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                <button
                    onClick={() => setSelectedGrade('All')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedGrade === 'All'
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    All Grades
                </button>
                {ALL_GRADES.map(grade => (
                    <button
                        key={grade}
                        onClick={() => setSelectedGrade(String(grade))}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedGrade === String(grade)
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Grade {grade}
                    </button>
                ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Attempts</p>
                            <p className="text-2xl font-bold text-gray-900">{totalAttempts}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <User className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Unique Students</p>
                            <p className="text-2xl font-bold text-gray-900">{uniqueStudents}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <Target className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Accuracy</p>
                            <p className="text-2xl font-bold text-gray-900">{avgAccuracy}%</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg">
                            <Trophy className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Sessions</p>
                            <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by student name, email, or test name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Grade</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Test / Skill</th>
                                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Score</th>
                                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Accuracy</th>
                                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredSessions.map((s, idx) => {
                                const info = getTestInfo(s.skill_id);
                                return (
                                    <tr key={s.session_id || idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4 text-sm text-gray-500">{idx + 1}</td>
                                        <td className="py-3 px-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{s.student_name}</p>
                                                <p className="text-xs text-gray-500">{s.student_email}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                                                {s.student_grade}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{info?.name || s.skill_name}</p>
                                                <p className="text-xs text-gray-400">{info?.subject || 'Practice'}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span className="text-sm font-semibold text-gray-800">
                                                {s.total_correct}/{s.total_questions}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${getAccuracyColor(s.accuracy)}`}>
                                                {s.accuracy}%
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                                                <Clock className="h-3.5 w-3.5" />
                                                {formatTime(s.total_time_seconds)}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600">
                                            {formatDate(s.started_at)}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.status === 'completed'
                                                    ? 'bg-green-100 text-green-700'
                                                    : s.status === 'in_progress'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {s.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            {filteredSessions.length === 0 && (
                                <tr>
                                    <td colSpan="9" className="py-12 text-center">
                                        <div className="text-gray-400">
                                            <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                            <p className="text-lg font-medium">No practice results found</p>
                                            <p className="text-sm mt-1">
                                                {selectedGrade !== 'All'
                                                    ? `No students have taken Grade ${selectedGrade} practice tests yet.`
                                                    : 'No practice test results available.'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer with count */}
                {filteredSessions.length > 0 && (
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
                        Showing {filteredSessions.length} result{filteredSessions.length !== 1 ? 's' : ''}
                        {selectedGrade !== 'All' && ` for Grade ${selectedGrade}`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PracticeResultsPage;
