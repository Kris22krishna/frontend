import React from 'react';
import { SpeedTestGame } from '../components/rapid-math/SpeedTestGame';
import SEO from '../components/common/SEO';
import { SEO_CONFIG } from '../lib/seoConfig';
import Navbar from '../components/Navbar';

const RapidMathPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
            <SEO
                title={SEO_CONFIG.rapidMath.title}
                description={SEO_CONFIG.rapidMath.description}
                keywords={SEO_CONFIG.rapidMath.keywords}
                canonical={SEO_CONFIG.rapidMath.canonical}
            />
            <Navbar />
            <main className="flex-1 flex flex-col pt-[80px]">
                <SpeedTestGame />
            </main>
        </div>
    );
};

export default RapidMathPage;
