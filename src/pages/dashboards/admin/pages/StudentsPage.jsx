import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Download, Filter, Loader2, RefreshCw, X, Eye } from 'lucide-react';
import { api } from '../../../../services/api';

const StudentsPage = () => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(50);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('All');
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'joinedDate', direction: 'desc' });

    const fetchStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.getAdminStudents(currentPage, limit, selectedGrade, searchTerm);
            setStudents(response.students || []);
            setTotalStudents(response.total || 0);
        } catch (err) {
            console.error('Failed to fetch students:', err);
            setError('Failed to load students');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [currentPage, selectedGrade, searchTerm]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedGrade, searchTerm]);

    // Calculate stats from real data
    // Sorting Logic
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortData = (data) => {
        if (!sortConfig.key) return data;

        return [...data].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Special handling for grade (it's often a string like "5", "Grade 5", etc.)
            if (sortConfig.key === 'grade') {
                aValue = parseInt(String(aValue).replace(/\D/g, '')) || 0;
                bValue = parseInt(String(bValue).replace(/\D/g, '')) || 0;
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    // Calculate stats from real data
    const stats = [
        { label: 'Total Students', value: totalStudents },
        { label: 'Active', value: students.filter(s => s.status === 'active').length },
        { label: 'Inactive', value: students.filter(s => s.status !== 'active').length },
    ];

    // Students are already filtered and sorted from server, 
    // but we can still apply client-side sorting/filtering on the current page if desired.
    // Given the request, we'll keep the client-side sorting logic for immediate UI feedback.
    const filteredStudents = sortData(students);

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

    // Mentor Management State
    const [showMentorModal, setShowMentorModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [assignedMentors, setAssignedMentors] = useState([]);
    const [loadingMentors, setLoadingMentors] = useState(false);

    const handleOpenMentorModal = async (student) => {
        setSelectedStudent(student);
        setShowMentorModal(true);
        setLoadingMentors(true);
        try {
            const data = await api.getAdminStudentMentors(student.id);
            setAssignedMentors(data || []);
        } catch (err) {
            console.error('Failed to fetch assigned mentors:', err);
            alert('Failed to load assigned mentors');
        } finally {
            setLoadingMentors(false);
        }
    };

    const handleUnassignMentor = async (mentorId) => {
        if (!selectedStudent) return;

        if (!confirm('Are you sure you want to unassign this mentor?')) return;

        try {
            await api.unassignMentor(selectedStudent.id, mentorId);
            // Refresh the assigned mentors list
            const data = await api.getAdminStudentMentors(selectedStudent.id);
            setAssignedMentors(data || []);
        } catch (err) {
            console.error('Failed to unassign mentor:', err);
            alert('Failed to unassign mentor');
        }
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
                            <th
                                className="text-left py-4 px-6 text-sm font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                                onClick={() => handleSort('name')}
                            >
                                <div className="flex items-center gap-1">
                                    Name
                                    {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </div>
                            </th>
                            <th
                                className="text-left py-4 px-6 text-sm font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                                onClick={() => handleSort('grade')}
                            >
                                <div className="flex items-center gap-1">
                                    Grade
                                    {sortConfig.key === 'grade' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </div>
                            </th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Email</th>
                            <th
                                className="text-left py-4 px-6 text-sm font-medium text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                                onClick={() => handleSort('joinedDate')}
                            >
                                <div className="flex items-center gap-1">
                                    Joined
                                    {sortConfig.key === 'joinedDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                </div>
                            </th>
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
                                            {student.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '?'}
                                        </div>
                                        <span className="font-medium text-gray-900">{student.name || 'Unknown'}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-gray-700">{student.grade || 'N/A'}</td>
                                <td className="py-4 px-6 text-gray-700">{student.email || 'N/A'}</td>
                                <td className="py-4 px-6 text-gray-700">{formatDate(student.joinedDate)}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusColor(student.status)}`}>
                                        {student.status || 'Unknown'}
                                    </span>
                                </td>
                                <td className="py-4 px-6 flex items-center gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenMentorModal(student);
                                        }}
                                        className="p-2 hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                        title="View Mentors"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </button>
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
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
                    <div className="text-sm text-gray-600 font-medium">
                        Showing <span className="text-gray-900">{(currentPage - 1) * limit + 1}</span> to <span className="text-gray-900">{Math.min(currentPage * limit, totalStudents)}</span> of <span className="text-gray-900">{totalStudents}</span> students
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm"
                        >
                            Previous
                        </button>
                        <div className="flex items-center gap-1">
                            {[...Array(Math.ceil(totalStudents / limit))].map((_, i) => {
                                const pageNum = i + 1;
                                // Simple logic to show only a few page buttons
                                if (pageNum === 1 || pageNum === Math.ceil(totalStudents / limit) || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${currentPage === pageNum ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                                    return <span key={pageNum} className="px-1 text-gray-400">...</span>;
                                }
                                return null;
                            })}
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalStudents / limit), prev + 1))}
                            disabled={currentPage === Math.ceil(totalStudents / limit)}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            {/* Assigned Mentors Modal */}
            {showMentorModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowMentorModal(false)} />

                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Assigned Mentors</h3>
                                <p className="text-sm text-gray-500 mt-1">{selectedStudent?.name}'s Assigned Mentors</p>
                            </div>
                            <button
                                onClick={() => setShowMentorModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Mentors List */}
                        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
                            {loadingMentors ? (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
                                    <p className="text-sm">Loading mentors...</p>
                                </div>
                            ) : assignedMentors.length > 0 ? (
                                <div className="space-y-2">
                                    {assignedMentors.map((mentor) => (
                                        <div key={mentor.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                                                    {mentor.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{mentor.name}</p>
                                                    <p className="text-xs text-gray-500">{mentor.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleUnassignMentor(mentor.id)}
                                                    className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-xs font-bold border border-red-100"
                                                    title="Unassign Mentor"
                                                >
                                                    <X className="h-4 w-4" />
                                                    Unassign
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 mx-2">
                                    <div className="p-4 bg-slate-50 rounded-full mb-3">
                                        <Search className="h-8 w-8 text-slate-300" />
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium">No mentors assigned yet.</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-100 bg-white flex justify-end">
                            <button
                                onClick={() => setShowMentorModal(false)}
                                className="px-6 py-2 bg-[#31326F] text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentsPage;
