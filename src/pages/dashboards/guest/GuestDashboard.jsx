import React from 'react';
import Navbar from '../../../components/Navbar';

const GuestDashboard = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="container mx-auto pt-24 px-4 text-center">
                <h1 className="text-3xl font-bold text-slate-800">Guest Dashboard</h1>
                <p className="mt-4 text-slate-600">Welcome! Limited access for guest users.</p>
            </div>
        </div>
    );
};

export default GuestDashboard;
