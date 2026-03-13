import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles, ArrowRight, GraduationCap, Github } from 'lucide-react';
import idmLogo from './IDM-logo.png';
import './IDMDashboard.css';

const IDMDashboard = ({ profile, getGradeNumber }) => {
    const navigate = useNavigate();

    return (
        <div className="idm-v2-wrapper">
            <div className="idm-v2-container">
                {/* Left Panel: Hero & Branding */}
                <div className="idm-v2-hero">
                    <img src={idmLogo} alt="IDM Logo" className="idm-v2-full-logo" />
                    <div className="idm-v2-content">
                        <h1 className="idm-v2-title">International Day of Mathematics</h1>
                        <p className="idm-v2-description">
                            Mathematics is the language of the universe. Explore its beauty,
                            challenge your logic, and discover the hidden patterns that shape our world.
                        </p>
                        <div className="idm-v2-welcome">
                            Happy IDM{profile?.first_name ? `, ${profile.first_name}` : ''}! 📐
                        </div>
                    </div>
                </div>

                {/* Right Panel: Actions */}
                <div className="idm-v2-actions">
                    <div className="idm-v2-actions-grid">
                        {/* Learn Card */}
                        <div
                            className="idm-v2-card card-learn"
                            onClick={() => navigate('/algebra')}
                        >
                            <div className="idm-v2-card-icon icon-blue">
                                <BookOpen size={32} />
                            </div>
                            <div className="idm-v2-card-info">
                                <h3>Learn</h3>
                                <p>Interactive modules and visual lessons to master concepts.</p>
                            </div>
                            <div className="idm-v2-card-arrow">
                                <ArrowRight size={20} />
                            </div>
                        </div>

                        {/* Assessment Card */}
                        <div
                            className="idm-v2-card card-assessment"
                            onClick={() => navigate('/algebra-mastery')}
                        >
                            <div className="idm-v2-card-icon icon-purple">
                                <Sparkles size={32} />
                            </div>
                            <div className="idm-v2-card-info">
                                <h3>Assessment</h3>
                                <p>Test your logic with our specialized diagnostic tools.</p>
                            </div>
                            <div className="idm-v2-card-arrow">
                                <ArrowRight size={20} />
                            </div>
                        </div>

                        {/* Bonus/Fun Card */}
                        <div
                            className="idm-v2-card card-fun"
                            onClick={() => navigate('/rapid-math')}
                        >
                            <div className="idm-v2-card-icon icon-orange">
                                <GraduationCap size={32} />
                            </div>
                            <div className="idm-v2-card-info">
                                <h3>Rapid Challenge</h3>
                                <p>Can you beat the clock in our speed test challenge?</p>
                            </div>
                            <div className="idm-v2-card-arrow">
                                <ArrowRight size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="idm-v2-footer-note hidden-mobile">
                "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding." — William Paul Thurston
            </div>
        </div>
    );
};

export default IDMDashboard;
