import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Download, Loader2, RefreshCw } from 'lucide-react';
import { api } from '../../../../services/api';

const ParentsPage = () => {
    const [loading, setLoading] = useState(true);
    const [parents, setParents] = useState([]);
    const [totalParents, setTotalParents] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(50);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    const fetchParents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.getAdminParents(currentPage, limit);
            setParents(response.parents || []);
            setTotalParents(response.total || 0);
        } catch (err) {
            console.error('Failed to fetch parents:', err);
            setError('Failed to load parents');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchParents();
    }, [currentPage]);

    // Calculate stats from real data
    const stats = [
        { label: 'Total Parents', value: totalParents },
        { label: 'Active (Last 7d)', value: parents.filter(p => p.lastActive !== 'Never' && !p.lastActive?.includes('w ago')).length },
        { label: 'With Children', value: parents.filter(p => p.childrenCount > 0).length },
    ];

    // Filter parents
    const filteredParents = parents.filter(parent => {
        const matchesSearch = parent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parent.email?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const getEngagementLevel = (lastActive, childrenCount) => {
        if (childrenCount === 0) return 'Low';
        if (lastActive === 'Today' || lastActive?.includes('h ago') || lastActive?.includes('min ago')) {
            return 'High';
        } else if (lastActive?.includes('d ago')) {
            const days = parseInt(lastActive);
            if (days <= 7) return 'High';
            if (days <= 14) return 'Medium';
        }
        return 'Low';
    };

    const getEngagementColor = (level) => {
        switch (level) {
            case 'High': return 'text-green-600';
            case 'Medium': return 'text-yellow-600';
            case 'Low': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    if (loading && parents.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Parents</h1>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchParents}
                        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600"
                        disabled={loading}
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Plus className="h-5 w-5" />
                        Add Parent
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
                        placeholder="Search parents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
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
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Children</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Last Active</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Engagement</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredParents.map((parent) => {
                            const engagement = getEngagementLevel(parent.lastActive, parent.childrenCount);
                            return (
                                <tr key={parent.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-medium">
                                                {parent.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || '?'}
                                            </div>
                                            <span className="font-medium text-gray-900">{parent.name || 'Unknown'}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-700">{parent.email || 'N/A'}</td>
                                    <td className="py-4 px-6 text-gray-700">{parent.childrenCount || 0} linked</td>
                                    <td className="py-4 px-6 text-gray-700">{parent.lastActive || 'Never'}</td>
                                    <td className="py-4 px-6">
                                        <span className={`font-medium ${getEngagementColor(engagement)}`}>
                                            {engagement}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                                            <MoreVertical className="h-4 w-4 text-gray-500" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {filteredParents.length === 0 && !loading && (
                            <tr>
                                <td colSpan="6" className="py-8 text-center text-gray-500">
                                    No parents found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
                    <div className="text-sm text-gray-600 font-medium">
                        Showing <span className="text-gray-900">{(currentPage - 1) * limit + 1}</span> to <span className="text-gray-900">{Math.min(currentPage * limit, totalParents)}</span> of <span className="text-gray-900">{totalParents}</span> parents
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
                            {[...Array(Math.ceil(totalParents / limit))].map((_, i) => {
                                const pageNum = i + 1;
                                if (pageNum === 1 || pageNum === Math.ceil(totalParents / limit) || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
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
                            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalParents / limit), prev + 1))}
                            disabled={currentPage === Math.ceil(totalParents / limit)}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentsPage;
