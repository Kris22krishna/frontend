import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import RegistrationForm from '../auth/RegistrationForm';
import './HeroSection.css';

const HeroRegistration = ({ selectedRole, setSelectedRole }) => {

    if (selectedRole) {
        return (
            <div className="hero-right">
                <RegistrationForm
                    role={selectedRole}
                    onBack={() => setSelectedRole(null)}
                />
            </div>
        );
    }

    return (
        <div className="hero-right">
            <div className="hero-role-selection">
                <h3 className="role-title">Start skilling up today!</h3>

                <button className="role-card" onClick={() => setSelectedRole('learner')}>
                    <span>I'm a learner</span>
                    <ArrowRight size={20} />
                </button>

                <button className="role-card" onClick={() => setSelectedRole('teacher')}>
                    <span>I'm a teacher</span>
                    <ArrowRight size={20} />
                </button>

                <button className="role-card" onClick={() => setSelectedRole('parent')}>
                    <span>I'm a parent</span>
                    <ArrowRight size={20} />
                </button>

                <p className="role-footer">
                    Already have an account? <a href="/login" className="link-primary">Log in</a>
                </p>
            </div>
        </div>
    );
};

export default HeroRegistration;
