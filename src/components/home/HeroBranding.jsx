import React from 'react';
import './HeroSection.css';
import CourseCarousel from './CourseCarousel';

import { Search } from 'lucide-react';

const HeroBranding = ({ selectedRole }) => {
    return (
        <div className="hero-left">
            <h1 className="hero-title">
                <span className="gradient-text">Skill100.AI</span><br />
            </h1>
            {/* <p className="hero-subtitle">
                An Initiative of Learners Digital
            </p> */}

            {selectedRole ? (
                // Role Information Box (Placeholder)
                <div className="brand-info-box animate-fade-in">
                    <div className="info-icon-wrapper">
                        {/* Placeholder for role specific icon */}
                        <div className="info-icon-placeholder" />
                    </div>
                    <div className="info-content">
                        <h3>{selectedRole === 'learner' ? 'For Learners' : selectedRole === 'teacher' ? 'For Teachers' : 'For Parents'}</h3>
                        <p>Unlock personalized tools and resources tailored for your journey.</p>
                    </div>
                </div>
            ) : (
                // Empty state as requested
                null
            )}
        </div>
    );
};

export default HeroBranding;
