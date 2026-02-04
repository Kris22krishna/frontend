import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Download, Loader2 } from 'lucide-react';

const ParentsPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const parents = [
        { id: 1, name: 'Jane Johnson', email: 'jane@email.com', children: 2, lastActive: '1h ago', engagement: 'High', status: 'Active' },
        { id: 2, name: 'Robert Chen', email: 'robert@email.com', children: 1, lastActive: '15d ago', engagement: 'Medium', status: 'Idle' },
        { id: 3, name: 'Lisa Kumar', email: 'lisa@email.com', children: 3, lastActive: '45d ago', engagement: 'Low', status: 'Inactive' },
        { id: 4, name: 'David Wilson', email: 'david@email.com', children: 2, lastActive: '2h ago', engagement: 'High', status: 'Active' },
    ];

    const stats = [
        { label: 'Total Parents', value: 980 },
        { label: 'Active (Last 7d)', value: 654 },
        { label: 'Inactive', value: 326 },
    ];

    const getEngagementColor = (level) => {
        switch (level) {
            case 'High': return 'text-green-600';
            case 'Medium': return 'text-yellow-600';
            case 'Low': return 'text-red-600';
            default: return 'text-gray-600';
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
                <h1 className="text-2xl font-bold text-gray-900">Parents</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="h-5 w-5" />
                    Add Parent
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
                    <input type="text" placeholder="Search parents..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg" />
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
                        {parents.map((parent) => (
                            <tr key={parent.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-medium">
                                            {parent.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="font-medium text-gray-900">{parent.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-gray-700">{parent.email}</td>
                                <td className="py-4 px-6 text-gray-700">{parent.children} linked</td>
                                <td className="py-4 px-6 text-gray-700">{parent.lastActive}</td>
                                <td className="py-4 px-6">
                                    <span className={`font-medium ${getEngagementColor(parent.engagement)}`}>
                                        {parent.engagement}
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

export default ParentsPage;
