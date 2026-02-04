import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

const UploadersPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const uploaders = [
        { id: 1, name: 'ContentPro', code: 'UP-8472', questions: 456, accuracy: '78%', reports: 2, lastActive: '1d ago', status: 'Good' },
        { id: 2, name: 'MathQuest', code: 'UP-8463', questions: 328, accuracy: '82%', reports: 0, lastActive: '2d ago', status: 'Good' },
        { id: 3, name: 'QuizMaster', code: 'UP-8401', questions: 89, accuracy: '45%', reports: 12, lastActive: '5d ago', status: 'Problematic' },
        { id: 4, name: 'EduContent', code: 'UP-8392', questions: 234, accuracy: '72%', reports: 1, lastActive: '10d ago', status: 'Review' },
    ];

    const stats = [
        { label: 'Total Uploaders', value: 8 },
        { label: 'Active This Month', value: 6 },
        { label: 'Questions Added', value: 1247 },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Good': return { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle };
            case 'Review': return { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertTriangle };
            case 'Problematic': return { bg: 'bg-red-100', text: 'text-red-700', icon: AlertTriangle };
            default: return { bg: 'bg-gray-100', text: 'text-gray-700', icon: null };
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
                <h1 className="text-2xl font-bold text-gray-900">Uploaders</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="h-5 w-5" />
                    Create Uploader
                </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Uploader</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Access Code</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Questions</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Avg Accuracy</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Reports</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Last Active</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uploaders.map((uploader) => {
                            const style = getStatusStyle(uploader.status);
                            return (
                                <tr key={uploader.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                                    <td className="py-4 px-6 font-medium text-gray-900">{uploader.name}</td>
                                    <td className="py-4 px-6 text-gray-700 font-mono">{uploader.code}</td>
                                    <td className="py-4 px-6 text-gray-700">{uploader.questions}</td>
                                    <td className="py-4 px-6 text-gray-700">{uploader.accuracy}</td>
                                    <td className="py-4 px-6 text-gray-700">{uploader.reports}</td>
                                    <td className="py-4 px-6 text-gray-700">{uploader.lastActive}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-sm ${style.bg} ${style.text}`}>
                                            {uploader.status}
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
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UploadersPage;
