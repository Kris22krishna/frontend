import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SetsBranch.css';

export default function SetsPlaceholder({ title }) {
    const navigate = useNavigate();
    return (
        <div className="sets-page">
            <nav className="sets-nav">
                <button className="sets-nav-back" onClick={() => navigate('/senior/grade/11/maths/sets')}>← Back</button>
            </nav>
            <div className="sets-hero">
                <h1 className="sets-hero-title">{title}</h1>
                <p className="sets-hero-sub">This section is coming soon! Stay tuned.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <div style={{ fontSize: '80px', marginBottom: '20px' }}>🚧</div>
                <h2 style={{ fontSize: '24px', color: '#64748b' }}>Under Construction</h2>
            </div>
        </div>
    );
}
