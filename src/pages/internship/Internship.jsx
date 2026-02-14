import React from 'react';
import Navbar from '../../components/Navbar';
import HeroSection from './components/HeroSection';
import WhySection from './components/WhySection';
import DomainsSection from './components/DomainsSection';
import FeaturesSection from './components/FeaturesSection';
import DetailsSection from './components/DetailsSection';
import CTASection from './components/CTASection';

const Internship = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white">
            <Navbar />
            <HeroSection />
            <WhySection />
            <DomainsSection />
            <FeaturesSection />
            <DetailsSection />
            <CTASection />
            <footer className="py-8 border-t border-slate-800/50 text-center bg-slate-950">
                <p className="text-slate-500 text-sm">
                    © {new Date().getFullYear()} Skill100.ai by Learners Digital. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Internship;
