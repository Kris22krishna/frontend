import React from 'react';
import { SpeedTestGame } from '../components/rapid-math/SpeedTestGame';
import SEO from '../components/common/SEO';
import Navbar from '../components/Navbar';

const RapidMathPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
            <SEO
                title="Rapid Math - Speed Challenge"
                description="Test your mathematical speed and accuracy in the Rapid Math challenge."
            />
            <Navbar />
            <main className="flex-1 flex flex-col">
                <SpeedTestGame />
            </main>
        </div>
    );
};

export default RapidMathPage;
