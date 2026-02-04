import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Download, Filter, Loader2 } from 'lucide-react';

const TeachersPage = () => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const teachers = [
        { id: 1, name: 'Rahul Mehta', email: 'rahul@school.com', classes: 3, quizzes: 24, avgScore: '68%', lastActive: '1h ago', status: 'Active' },
        { id: 2, name: 'Sarah Khan', email: 'sarah.k@school.com', classes: 5, quizzes: 45, avgScore: '72%', lastActive: '2d ago', status: 'Active' },
        { id: 3, name: 'Mike Chen', email: 'mike@school.com', classes: 2, quizzes: 8, avgScore: '65%', lastActive: '12d ago', status: 'Idle' },
        { id: 4, name: 'Priya Sharma', email: 'priya@school.com', classes: 4, quizzes: 32, avgScore: '75%', lastActive: '3h ago', status: 'Active' },
    ];

    const stats = [
        { label: 'Total Teachers', value: 48 },
        { label: 'Active (Last 7d)', value: 32 },
        { label: 'Inactive', value: 16 },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700';
            case 'Idle': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
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
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="h-5 w-5" />
                    Add Teacher
                </button>
            </div>

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
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Classes</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Quizzes</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Avg Score</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Last Active</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium">
                                            {teacher.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="font-medium text-gray-900">{teacher.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-gray-700">{teacher.email}</td>
                                <td className="py-4 px-6 text-gray-700">{teacher.classes}</td>
                                <td className="py-4 px-6 text-gray-700">{teacher.quizzes}</td>
                                <td className="py-4 px-6 text-gray-700">{teacher.avgScore}</td>
                                <td className="py-4 px-6 text-gray-700">{teacher.lastActive}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(teacher.status)}`}>
                                        {teacher.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                                        <MoreVertical className="h-4 w-4 text-gray-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeachersPage;
