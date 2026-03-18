import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './CirclesBranch.css';

const STATS = [
    { label: 'Core Topics', num: '6', color: '#2563eb' },
    { label: 'Practice Problems', num: '24+', color: '#0891b2' },
    { label: 'Chapter Links', num: '4', color: '#7c3aed' },
    { label: 'Mastery', num: '0%', color: '#f59e0b' }
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'START HERE',
        desc: 'Explore circles, tangents, secants, and the big ideas that run through the whole chapter.',
        icon: '⭕',
        color: '#2563eb',
        path: '/senior/grade/10/circles/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Master the theorem words, tangent properties, and circle language needed for proofs.',
        icon: '📘',
        color: '#0891b2',
        path: '/senior/grade/10/circles/terminology'
    },
    {
        id: 'skills',
        title: 'Skills',
        tagline: 'CORE PRACTICE',
        desc: 'Work through tangent lengths, perpendicularity concepts, problem solving, and proofs.',
        icon: '🎯',
        color: '#7c3aed',
        path: '/senior/grade/10/circles/skills'
    },
    {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'BIG PICTURE',
        desc: 'See how circles connect to engineering, wheels, pulley systems, and real-world mechanisms.',
        icon: '🔗',
        color: '#f59e0b',
        path: '/senior/grade/10/circles/connectomics'
    }
];

export default function CirclesDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="rn-fullpage">
            <div className="rn-left" style={{ background: 'linear-gradient(145deg, #0f172a 0%, #1d4ed8 40%, #0c4a6e 100%)' }}>
                <div className="rn-deco rn-deco-a" />
                <div className="rn-deco rn-deco-b" />

                <div className="rn-left-content">
                    <button
                        className="rn-nav-back"
                        onClick={() => navigate('/senior/grade/10')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        ← Grade 10 Maths
                    </button>

                    <h1 className="rn-main-title">
                        Master <br />
                        <span className="rn-title-accent">Circles</span>
                    </h1>
                    <p className="rn-main-sub">
                        Learn how tangents interact with circles, uncover deep geometric properties, and explore the mechanisms behind wheels and engineering.
                    </p>

                    <div className="rn-stats-grid">
                        {STATS.map((item) => (
                            <div key={item.label} className="rn-stat">
                                <span className="rn-stat-num">{item.num}</span>
                                <span className="rn-stat-lbl">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="rn-right">
                <div className="rn-right-eyebrow">CHOOSE YOUR PATH</div>

                <div className="rn-cards-col">
                    {MODULES.map((module) => (
                        <button
                            key={module.id}
                            className="rn-card-btn"
                            onClick={() => navigate(module.path)}
                        >
                            <div className="rn-card-strip" style={{ background: module.color }} />
                            <div className="rn-card-icon" style={{ background: `${module.color}15`, color: module.color }}>
                                {module.icon}
                            </div>
                            <div className="rn-card-text">
                                <div className="rn-card-tagline">{module.tagline}</div>
                                <div className="rn-card-label">{module.title}</div>
                                <div className="rn-card-desc">{module.desc}</div>
                            </div>
                            <div className="rn-card-chevron">
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
