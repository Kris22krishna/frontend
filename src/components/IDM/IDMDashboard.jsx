import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles, ArrowRight, GraduationCap } from 'lucide-react';
import './IDMDashboard.css';

const IDMDashboard = ({ profile, getGradeNumber }) => {
    const navigate = useNavigate();

    return (
        <div className="idm-dashboard-container">
            {/* Hero Section */}
            <div className="idm-hero">
                <div className="idm-hero-content">
                    <div className="idm-badge">March 14 • IDM 2026</div>
                    <h1 className="idm-title">International Mathematics Day</h1>
                    <p className="idm-description">
                        Mathematics is everywhere! Celebrated every year on March 14,
                        International Mathematics Day is an opportunity to explore the
                        beauty and importance of mathematics in our world.
                    </p>
                </div>
            </div>

            {/* Action Cards Grid */}
            <div className="idm-actions-grid">
                {/* Learn Card */}
                <div
                    className="idm-card idm-card-learn"
                    onClick={() => navigate('/algebra')}
                >
                    <div className="idm-card-top">
                        <div className="idm-icon-wrapper icon-blue">
                            <BookOpen size={24} />
                        </div>
                        <div className="idm-card-content">
                            <h3>Learn</h3>
                            <p>Dive into interactive lessons, explore new concepts, and master your math skills at your own pace.</p>
                        </div>
                    </div>
                    <div className="idm-card-footer text-blue">
                        <span>Start Learning</span>
                        <ArrowRight size={16} className="idm-arrow" />
                    </div>
                </div>

                {/* Assessment Card */}
                <div
                    className="idm-card idm-card-assessment"
                    onClick={() => navigate('/algebra-mastery')}
                >
                    <div className="idm-card-top">
                        <div className="idm-icon-wrapper icon-purple">
                            <Sparkles size={24} />
                        </div>
                        <div className="idm-card-content">
                            <h3>Assessment</h3>
                            <p>Challenge yourself with diagnostic tests to identify your strengths and discover areas for improvement.</p>
                        </div>
                    </div>
                    <div className="idm-card-footer text-purple">
                        <span>Take Assessment</span>
                        <ArrowRight size={16} className="idm-arrow" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IDMDashboard;
