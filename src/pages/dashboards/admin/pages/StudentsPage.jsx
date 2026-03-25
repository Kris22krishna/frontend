import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Download, Filter, Loader2, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../../../../services/api';

const StudentsPage = () => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('All');
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const limit = 15;

    const fetchStudents = async (targetPage = page) => {
        setLoading(true);
        setError(null);
        try {
            const skip = (targetPage - 1) * limit;
            const data = await api.getAdminStudents(skip, limit, searchTerm, selectedGrade);
            setStudents(data?.students || []);
            setTotalStudents(data?.total || 0);
            setPage(targetPage);
        } catch (err) {
            console.error('Failed to fetch students:', err);
            setError('Failed to load students');
        } finally {
            setLoading(false);
        }
    };

    // Trigger fetch on search or grade filter changes (debounced)
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchStudents(1); // Back to page 1 on search change
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm, selectedGrade]);

    // Handle initial load and page changes
    useEffect(() => {
        const timer = setTimeout(() => fetchStudents(page), 0);
        return () => clearTimeout(timer);
    }, [page]);

    // Calculate stats from real data
    const stats = [
        { label: 'Total Students', value: totalStudents },
        { label: 'Active', value: (students || []).filter(s => s.status === 'active').length }, // Approximated per page
        { label: 'Inactive', value: (students || []).filter(s => s.status !== 'active').length },
    ];

    const totalPages = Math.ceil(totalStudents / limit);
    const filteredStudents = students || [];

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'bg-green-100 text-green-700';
            case 'idle': return 'bg-yellow-100 text-yellow-700';
            case 'inactive': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    if (loading && students.length === 0) {
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
                <h1 className="text-2xl font-bold text-gray-900">Students</h1>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchStudents}
                        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600"
                        disabled={loading}
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Plus className="h-5 w-5" />
                        Add Student
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                    {error}
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="All">All Grades</option>
                    {[...Array(12)].map((_, i) => (
                        <option key={i} value={String(i + 1)}>Grade {i + 1}</option>
                    ))}
                </select>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4" />
                    More Filters
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                    Export CSV
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">
                                <input type="checkbox" className="rounded" />
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Name</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Grade</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Email</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Joined</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student) => (
                            <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                                <td className="py-4 px-6">
                                    <input type="checkbox" className="rounded" />
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                                            {(student.name || '').split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2) || '?'}
                                        </div>
                                        <span className="font-medium text-gray-900">{student.name || 'Unknown'}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-gray-700">Grade {student.grade || 'N/A'}</td>
                                <td className="py-4 px-6 text-gray-700">{student.email || 'N/A'}</td>
                                <td className="py-4 px-6 text-gray-700">{formatDate(student.joinedDate)}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(student.status)}`}>
                                        {student.status || 'Unknown'}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                                        <MoreVertical className="h-4 w-4 text-gray-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredStudents.length === 0 && !loading && (
                            <tr>
                                <td colSpan="7" className="py-8 text-center text-gray-500">
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                {totalStudents > 0 && (
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            Showing <span className="font-bold text-gray-900">{(page - 1) * limit + 1}</span> to <span className="font-bold text-gray-900">{Math.min(page * limit, totalStudents)}</span> of <span className="font-bold text-gray-900">{totalStudents}</span> students
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || loading}
                                className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4 text-gray-600" />
                            </button>

                            <div className="flex items-center gap-1">
                                {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                                    let pageNum = page;
                                    if (totalPages <= 5) pageNum = idx + 1;
                                    else if (page <= 3) pageNum = idx + 1;
                                    else if (page >= totalPages - 2) pageNum = totalPages - 4 + idx;
                                    else pageNum = page - 2 + idx;

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setPage(pageNum)}
                                            disabled={loading}
                                            className={`w-8 h-8 rounded-lg text-sm font-bold transition-colors ${page === pageNum
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                                : 'text-gray-600 hover:bg-gray-200 bg-transparent'}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages || loading}
                                className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm transition-colors"
                            >
                                <ChevronRight className="h-4 w-4 text-gray-600" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentsPage;
