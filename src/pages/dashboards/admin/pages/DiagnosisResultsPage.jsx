import React, { useState, useEffect } from 'react';
import { Search, Download, Loader2, RefreshCw, Trophy, Target, Clock, User, ClipboardList, CheckCircle2, XCircle, X, ArrowUp, ArrowDown } from 'lucide-react';
import { api } from '../../../../services/api';
import DiagnosisResults from '../../../../components/Diagnosis_test/DiagnosisResults';

const DiagnosisResultsPage = () => {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('All');
    const [error, setError] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });

    const fetchResults = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.getAdminDiagnosisResults(2000);
            setResults(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Failed to fetch diagnosis results:', err);
            setError('Failed to load diagnosis results. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    // Filter results
    const filteredResults = results.filter(r => {
        // Grade filter
        if (selectedGrade !== 'All' && r.grade != selectedGrade) return false;

        // Search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            if (
                !r.student_name?.toLowerCase().includes(term) &&
                !r.student_email?.toLowerCase().includes(term)
            ) return false;
        }
        return true;
    }).sort((a, b) => {
        if (!sortConfig.key) return 0;

        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        // Special handling for score/accuracy which are derived or nested
        if (sortConfig.key === 'accuracy') {
            aVal = (a.score / a.total_questions);
            bVal = (b.score / b.total_questions);
        } else if (sortConfig.key === 'student') {
            aVal = (a.student_name || '').toLowerCase();
            bVal = (b.student_name || '').toLowerCase();
        }

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <RefreshCw size={12} className="opacity-0 group-hover:opacity-50" />;
        return sortConfig.direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
    };

    // Stats
    const totalTests = filteredResults.length;
    const uniqueStudents = new Set(filteredResults.map(r => r.user_id)).size;
    const avgScore = totalTests > 0
        ? Math.round(filteredResults.reduce((sum, r) => sum + (r.score / r.total_questions * 100), 0) / totalTests)
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

    const getScoreColor = (score, total) => {
        const percentage = (score / total) * 100;
        if (percentage >= 80) return 'text-green-700 bg-green-100';
        if (percentage >= 60) return 'text-yellow-700 bg-yellow-100';
        if (percentage >= 40) return 'text-orange-700 bg-orange-100';
        return 'text-red-700 bg-red-100';
    };

    // CSV Export
    const exportToCSV = () => {
        if (filteredResults.length === 0) return;

        const headers = ['Student Name', 'Email', 'Grade', 'Score', 'Total Questions', 'Accuracy (%)', 'Time Taken (s)', 'Date'];
        const rows = filteredResults.map(r => [
            r.student_name,
            r.student_email,
            r.grade,
            r.score,
            r.total_questions,
            Math.round((r.score / r.total_questions) * 100),
            r.time_taken_seconds,
            formatDate(r.created_at)
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        const gradePart = selectedGrade === 'All' ? 'all-grades' : `grade-${selectedGrade}`;
        link.setAttribute('download', `diagnosis-results-${gradePart}-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const grades = [...new Set(results.map(r => r.grade))].sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }));

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
                    <h1 className="text-2xl font-bold text-gray-900">Diagnosis Test Results</h1>
                    <p className="text-sm text-gray-500 mt-1">Monitor initial student performance levels</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchResults}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors"
                        disabled={loading}
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                    <button
                        onClick={exportToCSV}
                        disabled={filteredResults.length === 0}
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
            <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
                <button
                    onClick={() => setSelectedGrade('All')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedGrade === 'All'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    All Grades
                </button>
                {grades.map(grade => (
                    <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedGrade === grade
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Grade {grade}
                    </button>
                ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <ClipboardList className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Tests</p>
                            <p className="text-2xl font-bold text-gray-900">{totalTests}</p>
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
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Average Score</p>
                            <p className="text-2xl font-bold text-gray-900">{avgScore}%</p>
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
                        placeholder="Search by student name or email..."
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
                                <th
                                    className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer group hover:bg-gray-100 transition-colors"
                                    onClick={() => requestSort('student')}
                                >
                                    <div className="flex items-center gap-1">
                                        Student {getSortIcon('student')}
                                    </div>
                                </th>
                                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Grade</th>
                                <th
                                    className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer group hover:bg-gray-100 transition-colors"
                                    onClick={() => requestSort('score')}
                                >
                                    <div className="flex items-center justify-center gap-1">
                                        Score {getSortIcon('score')}
                                    </div>
                                </th>
                                <th
                                    className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer group hover:bg-gray-100 transition-colors"
                                    onClick={() => requestSort('accuracy')}
                                >
                                    <div className="flex items-center justify-center gap-1">
                                        Accuracy {getSortIcon('accuracy')}
                                    </div>
                                </th>
                                <th
                                    className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer group hover:bg-gray-100 transition-colors"
                                    onClick={() => requestSort('time_taken_seconds')}
                                >
                                    <div className="flex items-center justify-center gap-1">
                                        Time {getSortIcon('time_taken_seconds')}
                                    </div>
                                </th>
                                <th
                                    className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer group hover:bg-gray-100 transition-colors"
                                    onClick={() => requestSort('created_at')}
                                >
                                    <div className="flex items-center gap-1">
                                        Date {getSortIcon('created_at')}
                                    </div>
                                </th>
                                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredResults.map((r, idx) => (
                                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4 text-sm text-gray-500">{idx + 1}</td>
                                    <td className="py-3 px-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{r.student_name}</p>
                                            <p className="text-xs text-gray-500">{r.student_email}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="text-sm text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                                            {r.grade}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="text-sm font-semibold text-gray-800">
                                            {r.score}/{r.total_questions}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${getScoreColor(r.score, r.total_questions)}`}>
                                            {Math.round((r.score / r.total_questions) * 100)}%
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                                            <Clock className="h-3.5 w-3.5" />
                                            {formatTime(r.time_taken_seconds)}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">
                                        {formatDate(r.created_at)}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <button
                                            onClick={() => setSelectedTest(r)}
                                            className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                                        >
                                            View Results
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredResults.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="py-12 text-center">
                                        <div className="text-gray-400">
                                            <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                            <p className="text-lg font-medium">No diagnosis results found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detailed Results Overlay - Using Student Design */}
            {selectedTest && (
                <div className="fixed inset-0 bg-white z-[100] overflow-y-auto w-full h-full">
                    <DiagnosisResults 
                        grade={selectedTest.grade} 
                        results={{
                            score: selectedTest.score,
                            total: selectedTest.total_questions,
                            timeTaken: selectedTest.time_taken_seconds,
                            questionResults: selectedTest.results || [],
                            totalCorrect: selectedTest.total_correct || selectedTest.score,
                            totalWrong: selectedTest.total_wrong || (selectedTest.total_questions - selectedTest.score),
                            totalPartial: selectedTest.total_partial || 0
                        }}
                        isAdmin={true}
                        onClose={() => setSelectedTest(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default DiagnosisResultsPage;
