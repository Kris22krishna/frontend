import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import HeroSection from './components/HeroSection';
import WhySection from './components/WhySection';
import DomainsSection from './components/DomainsSection';
import FeaturesSection from './components/FeaturesSection';
import DetailsSection from './components/DetailsSection';
import CTASection from './components/CTASection';
import RegistrationModal from './components/RegistrationModal';

const Internship = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (e) => {
        if (e) e.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white">
            <Navbar />
            <HeroSection onRegisterClick={openModal} />
            <WhySection />
            <DomainsSection />
            <FeaturesSection />
            <DetailsSection />
            <CTASection onRegisterClick={openModal} />
            <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
            <footer className="py-8 border-t border-slate-800/50 text-center bg-slate-950">
                <p className="text-slate-500 text-sm">
                    © {new Date().getFullYear()} Skill100.ai by Learners Digital. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Internship;
