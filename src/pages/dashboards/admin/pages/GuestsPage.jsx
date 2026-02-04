import React, { useState, useEffect } from 'react';
import { Search, Eye, Clock, Target, Loader2 } from 'lucide-react';

const GuestsPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const guests = [
        { id: 'GST-4829', firstSeen: 'Today 2pm', quizzes: 4, topics: 'Fractions(3), Algebra(1)', time: '12 min', status: 'Hot' },
        { id: 'GST-4821', firstSeen: 'Yesterday', quizzes: 8, topics: 'Geometry(5), Algebra(3)', time: '28 min', status: 'Hot' },
        { id: 'GST-4812', firstSeen: '3 days ago', quizzes: 2, topics: 'Fractions(2)', time: '5 min', status: 'Cold' },
        { id: 'GST-4805', firstSeen: 'Today 10am', quizzes: 3, topics: 'Decimals(3)', time: '15 min', status: 'Warm' },
    ];

    const stats = [
        { label: 'Guests Today', value: 312, delta: '+45 from yesterday', icon: Eye },
        { label: 'Quiz Attempts', value: 856, delta: '+12% from yesterday', icon: Target },
        { label: 'Conversion Rate', value: '15%', delta: '+2% this week', icon: Clock },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Hot': return 'bg-green-100 text-green-700';
            case 'Warm': return 'bg-yellow-100 text-yellow-700';
            case 'Cold': return 'bg-gray-100 text-gray-700';
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
            <h1 className="text-2xl font-bold text-gray-900">Guest Users</h1>

            <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">{stat.label}</p>
                            <stat.icon className="h-5 w-5 text-gray-400" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.delta}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="text" placeholder="Search by Guest ID..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg" />
                </div>
                <select className="px-4 py-2 border border-gray-200 rounded-lg">
                    <option>All Statuses</option>
                    <option>Hot Leads</option>
                    <option>Warm Leads</option>
                    <option>Cold Leads</option>
                </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Guest ID</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">First Seen</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Quizzes</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Topics</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Time Spent</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guests.map((guest) => (
                            <tr key={guest.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                                <td className="py-4 px-6 font-medium text-gray-900">{guest.id}</td>
                                <td className="py-4 px-6 text-gray-700">{guest.firstSeen}</td>
                                <td className="py-4 px-6 text-gray-700">{guest.quizzes}</td>
                                <td className="py-4 px-6 text-gray-700">{guest.topics}</td>
                                <td className="py-4 px-6 text-gray-700">{guest.time}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(guest.status)}`}>
                                        {guest.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                                        View Activity
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

export default GuestsPage;
