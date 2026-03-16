import React, { useState } from 'react';
import { algebraQuestions } from './algebraQuestions';
import AlgebraAssessmentEngine from './AlgebraAssessmentEngine';

const AlgebraMasteryTest = () => {
    const [started, setStarted] = useState(false);

    const handleBack = () => {
        setStarted(false);
        // In a real app, this might navigate back to dashboard
        window.history.back();
    };

    if (!started) {
        return (
            <div className="idm-assessment-landing" style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
                padding: '80px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{
                    maxWidth: '700px',
                    width: '100%',
                    background: '#fff',
                    borderRadius: '32px',
                    padding: '48px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '8px 20px',
                        background: '#e0e7ff',
                        color: '#4338ca',
                        borderRadius: '100px',
                        fontSize: '14px',
                        fontWeight: '700',
                        marginBottom: '24px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Mathematics Assessment
                    </div>

                    <h1 style={{
                        fontSize: '40px',
                        fontWeight: '900',
                        color: '#1e293b',
                        marginBottom: '16px',
                        letterSpacing: '-0.025em'
                    }}>
                        ALGEBRA MASTERY TEST
                    </h1>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '12px',
                        color: '#64748b',
                        fontWeight: '600',
                        marginBottom: '40px'
                    }}>
                        <span>30 Questions</span>
                        <span>•</span>
                        <span>7 Skill Areas</span>
                        <span>•</span>
                        <span>Mixed Format</span>
                    </div>

                    <div style={{
                        textAlign: 'left',
                        background: '#f8fafc',
                        borderRadius: '24px',
                        padding: '32px',
                        marginBottom: '40px'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#334155', marginBottom: '16px' }}>Instructions</h3>
                        <ul style={{ color: '#475569', lineHeight: '1.8', fontSize: '15px', paddingLeft: '20px' }}>
                            <li>Read each question carefully before answering.</li>
                            <li><strong>MCQ:</strong> Select one option from given choices.</li>
                            <li><strong>Numeric Input:</strong> Enter whole numbers or fractions (e.g., 22/5).</li>
                            <li>You can navigate between questions using the palette or buttons.</li>
                            <li>The test is timed for 30 minutes.</li>
                        </ul>
                    </div>

                    <button
                        onClick={() => setStarted(true)}
                        style={{
                            width: '100%',
                            padding: '20px',
                            background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '16px',
                            fontSize: '18px',
                            fontWeight: '800',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Start Assessment Now
                    </button>

                    <button
                        onClick={() => window.history.back()}
                        style={{
                            marginTop: '20px',
                            background: 'none',
                            border: 'none',
                            color: '#64748b',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AlgebraAssessmentEngine
            questions={algebraQuestions}
            title="Algebra Mastery Test"
            onBack={handleBack}
            color="#4f46e5"
        />
    );
};

export default AlgebraMasteryTest;
