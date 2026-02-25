import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Download, Filter, Loader2, RefreshCw, UserPlus, X, Check, Eye } from 'lucide-react';
import { api } from '../../../../services/api';

const TeachersPage = () => {
    const [loading, setLoading] = useState(true);
    const [teachers, setTeachers] = useState([]);
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(50);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    // Assignment Modal State
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [allStudents, setAllStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [assigning, setAssigning] = useState(false);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [studentSearch, setStudentSearch] = useState('');
    const [assignmentGradeFilter, setAssignmentGradeFilter] = useState('All');

    // View Assignments Modal State
    const [showViewModal, setShowViewModal] = useState(false);
    const [assignedStudents, setAssignedStudents] = useState([]);
    const [loadingAssignments, setLoadingAssignments] = useState(false);

    const fetchTeachers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.getAdminTeachers(currentPage, limit);
            setTeachers(response.teachers || []);
            setTotalTeachers(response.total || 0);
        } catch (err) {
            console.error('Failed to fetch teachers:', err);
            setError('Failed to load teachers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, [currentPage]);

    const handleOpenAssignModal = async (teacher) => {
        setSelectedTeacher(teacher);
        setShowAssignModal(true);
        setLoadingStudents(true);
        try {
            // Parallel fetch all students (using large limit for "show all") and this teacher's current students
            const [studentsResponse, assignedData] = await Promise.all([
                api.getAdminStudents(1, 1000), // Fetch up to 1000 students for assignment
                api.getAdminMentorStudents(teacher.id)
            ]);

            setAllStudents(studentsResponse.students || []);
            // Pre-populate selected students with IDs of those already assigned
            setSelectedStudents(assignedData ? assignedData.map(s => s.id) : []);
        } catch (err) {
            console.error('Failed to fetch assignment data:', err);
        } finally {
            setLoadingStudents(false);
        }
    };

    const handleAssignStudents = async () => {
        if (!selectedTeacher || selectedStudents.length === 0) return;

        setAssigning(true);
        try {
            await api.assignStudents(selectedTeacher.id, selectedStudents);
            setShowAssignModal(false);
            setSelectedStudents([]);
            fetchTeachers(); // Refresh list to see updated student count
        } catch (err) {
            alert('Failed to assign students: ' + err.message);
        } finally {
            setAssigning(false);
        }
    };

    const toggleStudentSelection = (studentId) => {
        setSelectedStudents(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const handleOpenViewModal = async (teacher) => {
        setSelectedTeacher(teacher);
        setShowViewModal(true);
        setLoadingAssignments(true);
        try {
            const data = await api.getAdminMentorStudents(teacher.id);
            setAssignedStudents(data || []);
        } catch (err) {
            console.error('Failed to fetch assigned students:', err);
            alert('Failed to load assigned students');
        } finally {
            setLoadingAssignments(false);
        }
    };

    const handleUnassignStudent = async (studentId) => {
        if (!selectedTeacher) return;

        if (!confirm('Are you sure you want to unassign this student?')) return;

        try {
            await api.unassignStudent(selectedTeacher.id, studentId);
            // Refresh the assigned students list
            const data = await api.getAdminMentorStudents(selectedTeacher.id);
            setAssignedStudents(data || []);
            fetchTeachers(); // Refresh main list for counts
        } catch (err) {
            console.error('Failed to unassign student:', err);
            alert('Failed to unassign student');
        }
    };

    // Calculate stats from real data
    const stats = [
        { label: 'Total Teachers', value: totalTeachers },
        { label: 'Active (Last 7d)', value: teachers.filter(t => t.lastActive !== 'Never' && !t.lastActive?.includes('w ago')).length },
        { label: 'Inactive', value: teachers.filter(t => t.lastActive === 'Never' || t.lastActive?.includes('w ago')).length },
    ];

    // Filter teachers
    const filteredTeachers = teachers.filter(teacher => {
        const matchesSearch = teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.email?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const getStatusColor = (lastActive) => {
        if (lastActive === 'Today' || lastActive?.includes('h ago') || lastActive?.includes('min ago')) {
            return 'bg-green-100 text-green-700';
        } else if (lastActive?.includes('d ago')) {
            const days = parseInt(lastActive);
            if (days <= 7) return 'bg-green-100 text-green-700';
            return 'bg-yellow-100 text-yellow-700';
        }
        return 'bg-red-100 text-red-700';
    };

    const getStatusText = (lastActive) => {
        if (lastActive === 'Today' || lastActive?.includes('h ago') || lastActive?.includes('min ago')) {
            return 'Active';
        } else if (lastActive?.includes('d ago')) {
            const days = parseInt(lastActive);
            if (days <= 7) return 'Active';
            return 'Idle';
        }
        return 'Inactive';
    };

    if (loading && teachers.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchTeachers}
                        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600"
                        disabled={loading}
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Plus className="h-5 w-5" />
                        Add Teacher
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search teachers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4" />
                    Filters
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                    Export
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Name</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Email</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Students</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Classes</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Last Active</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeachers.map((teacher) => (
                            <tr key={teacher.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium">
                                            {teacher.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '?'}
                                        </div>
                                        <span className="font-medium text-gray-900">{teacher.name || 'Unknown'}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-gray-700">{teacher.email || 'N/A'}</td>
                                <td className="py-4 px-6 text-gray-700">{teacher.studentCount || 0}</td>
                                <td className="py-4 px-6 text-gray-700">{teacher.classesCount || 0}</td>
                                <td className="py-4 px-6 text-gray-700">{teacher.lastActive || 'Never'}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(teacher.lastActive)}`}>
                                        {getStatusText(teacher.lastActive)}
                                    </span>
                                </td>
                                <td className="py-4 px-6 flex items-center gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenViewModal(teacher);
                                        }}
                                        className="p-2 hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                        title="View Assigned Students"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenAssignModal(teacher);
                                        }}
                                        className="p-2 hover:bg-green-50 text-gray-500 hover:text-green-600 rounded-lg transition-colors border border-transparent hover:border-green-100"
                                        title="Assign Students"
                                    >
                                        <UserPlus className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                                        <MoreVertical className="h-4 w-4 text-gray-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredTeachers.length === 0 && !loading && (
                            <tr>
                                <td colSpan="7" className="py-8 text-center text-gray-500">
                                    No teachers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
                    <div className="text-sm text-gray-600 font-medium">
                        Showing <span className="text-gray-900">{(currentPage - 1) * limit + 1}</span> to <span className="text-gray-900">{Math.min(currentPage * limit, totalTeachers)}</span> of <span className="text-gray-900">{totalTeachers}</span> teachers
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
                            {[...Array(Math.ceil(totalTeachers / limit))].map((_, i) => {
                                const pageNum = i + 1;
                                if (pageNum === 1 || pageNum === Math.ceil(totalTeachers / limit) || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
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
                            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalTeachers / limit), prev + 1))}
                            disabled={currentPage === Math.ceil(totalTeachers / limit)}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Assign Students Modal */}
            {showAssignModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => !assigning && setShowAssignModal(false)} />

                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Assign Students</h3>
                                <p className="text-sm text-gray-500 mt-1">Assign students to {selectedTeacher?.name}</p>
                            </div>
                            <button
                                onClick={() => setShowAssignModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
                                disabled={assigning}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Student Search & Filter */}
                        <div className="px-6 py-4 border-b border-gray-100 bg-slate-50/50 flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    value={studentSearch}
                                    onChange={(e) => setStudentSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                            <select
                                value={assignmentGradeFilter}
                                onChange={(e) => setAssignmentGradeFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white font-medium text-gray-600"
                            >
                                <option value="All">All Grades</option>
                                {[...Array(12)].map((_, i) => (
                                    <option key={i} value={String(i + 1)}>Grade {i + 1}</option>
                                ))}
                            </select>
                        </div>

                        {/* Students List */}
                        <div className="flex-1 overflow-y-auto p-2 bg-white">
                            {loadingStudents ? (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
                                    <p className="text-sm">Loading students...</p>
                                </div>
                            ) : (
                                <div className="space-y-1 px-2">
                                    {allStudents
                                        .filter(s => {
                                            const matchesSearch = s.name?.toLowerCase().includes(studentSearch.toLowerCase()) ||
                                                s.email?.toLowerCase().includes(studentSearch.toLowerCase());
                                            const matchesGrade = assignmentGradeFilter === 'All' || String(s.grade) === assignmentGradeFilter;
                                            return matchesSearch && matchesGrade;
                                        })
                                        .sort((a, b) => {
                                            // Handle Grade Sorting specifically
                                            const aGrade = parseInt(String(a.grade).replace(/\D/g, '')) || 0;
                                            const bGrade = parseInt(String(b.grade).replace(/\D/g, '')) || 0;

                                            if (aGrade !== bGrade) return aGrade - bGrade;
                                            // If grades are same, sort by name
                                            return (a.name || "").localeCompare(b.name || "");
                                        })
                                        .map((student) => (
                                            <div
                                                key={student.id}
                                                onClick={() => toggleStudentSelection(student.id)}
                                                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${selectedStudents.includes(student.id)
                                                    ? 'bg-blue-50 border border-blue-200 shadow-sm'
                                                    : 'hover:bg-slate-50 border border-transparent'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${selectedStudents.includes(student.id) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {student.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '?'}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-sm font-bold text-gray-900 truncate">{student.name}</p>
                                                            <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-600">ID: {student.id}</span>
                                                        </div>
                                                        <p className="text-[11px] text-gray-500 truncate">{student.email || 'No email'}</p>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <p className="text-[10px] text-blue-600 font-bold uppercase">Grade {student.grade || 'N/A'}</p>
                                                            <div className="h-1 w-1 rounded-full bg-slate-300" />
                                                            <span className="text-[10px] text-slate-400">Joined {new Date(student.joinedDate).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {selectedStudents.includes(student.id) && (
                                                    <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                                                        <Check className="h-4 w-4 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    {allStudents.length === 0 && !loadingStudents && (
                                        <p className="text-center py-8 text-gray-500 text-sm italic">No students available for assignment.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0">
                            <div className="flex items-center justify-between gap-4">
                                <p className="text-sm text-gray-600">
                                    <span className="font-bold text-blue-600">{selectedStudents.length}</span> students selected
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowAssignModal(false)}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
                                        disabled={assigning}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAssignStudents}
                                        disabled={assigning || selectedStudents.length === 0}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
                                    >
                                        {assigning ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Assigning...
                                            </>
                                        ) : (
                                            'Assign Selected'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* View Assignments Modal */}
            {showViewModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowViewModal(false)} />

                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Assigned Students</h3>
                                <p className="text-sm text-gray-500 mt-1">{selectedTeacher?.name}'s Current Students</p>
                            </div>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Students List */}
                        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
                            {loadingAssignments ? (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
                                    <p className="text-sm">Loading assignments...</p>
                                </div>
                            ) : assignedStudents.length > 0 ? (
                                <div className="space-y-2">
                                    {assignedStudents.map((student) => (
                                        <div key={student.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                                    {student.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{student.name}</p>
                                                    <p className="text-xs text-gray-500">{student.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="text-right mr-2">
                                                    <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-full uppercase tracking-wider underline-offset-2">
                                                        Grade {student.grade}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => handleUnassignStudent(student.id)}
                                                    className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-xs font-bold border border-red-100"
                                                    title="Unassign Student"
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
                                        <Users className="h-8 w-8 text-slate-300" />
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium">No students assigned yet.</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-100 bg-white flex justify-end">
                            <button
                                onClick={() => setShowViewModal(false)}
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

export default TeachersPage;
