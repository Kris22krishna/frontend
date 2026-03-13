import React from 'react';
import { useNavigate } from 'react-router-dom';
import './algebra.css';

const MODULES = [
    {
        id: 'introduction',
        path: '/algebra/introduction',
        label: 'Introduction',
        emoji: '\uD83C\uDF1F',
        tagline: '5W1H Exploration',
        desc: '6 big questions about Algebra: what, why, who, when, where, and how.',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.4)',
    },
    {
        id: 'terminology',
        path: '/algebra/terminology',
        label: 'Terminology',
        emoji: '\uD83D\uDCD8',
        tagline: '7 Key Terms and 5 Rules',
        desc: 'Master the language of Algebra: variables, constants, coefficients, and the five golden rules.',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.4)',
    },
    {
        id: 'skills',
        path: '/algebra/skills',
        label: 'Skills',
        emoji: '\uD83C\uDFAF',
        tagline: 'Learn, Practice and Assess',
        desc: 'Core skills with dedicated learn, practice, and assessment flows.',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.4)',
    },
];

const STATS = [
    { val: '6', label: 'Big Questions', color: '#0891b2' },
    { val: '7', label: 'Key Terms', color: '#7c3aed' },
    { val: '5', label: 'Rules', color: '#059669' },
    { val: '5', label: 'Skills', color: '#0369a1' },
];

export default function Algebra() {
    const navigate = useNavigate();

    return (
        <div className="alg-fullpage">
            <div className="alg-left">
                <div className="alg-deco alg-deco-a" />
                <div className="alg-deco alg-deco-b" />
                <div className="alg-deco alg-deco-c" />

                <div className="alg-left-content">
                    <h1 className="alg-main-title">
                        Master
                        <br />
                        <span className="alg-title-accent">Algebra</span>
                    </h1>

                    <p className="alg-main-sub">
                        From mystery unknowns to powerful equations, learn Algebra the way it was meant to be taught.
                    </p>

                    <div className="alg-stats-grid">
                        {STATS.map((item) => (
                            <div className="alg-stat" key={item.label}>
                                <span className="alg-stat-num" style={{ color: item.color }}>
                                    {item.val}
                                </span>
                                <span className="alg-stat-lbl">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="alg-right">
                <p className="alg-right-eyebrow">Choose a topic to explore</p>

                <div className="alg-cards-col">
                    {MODULES.map((moduleItem) => (
                        <button
                            key={moduleItem.id}
                            className="alg-card-btn"
                            onClick={() => navigate(moduleItem.path)}
                        >
                            <div
                                className="alg-card-strip"
                                style={{ background: `linear-gradient(180deg, ${moduleItem.gradFrom}, ${moduleItem.gradTo})` }}
                            />

                            <div
                                className="alg-card-icon"
                                style={{
                                    background: `linear-gradient(135deg, ${moduleItem.gradFrom}, ${moduleItem.gradTo})`,
                                    boxShadow: `0 6px 20px ${moduleItem.shadow}`,
                                }}
                            >
                                {moduleItem.emoji}
                            </div>

                            <div className="alg-card-text">
                                <div className="alg-card-label" style={{ color: moduleItem.gradFrom }}>
                                    {moduleItem.label}
                                </div>
                                <div className="alg-card-tagline">{moduleItem.tagline}</div>
                                <div className="alg-card-desc">{moduleItem.desc}</div>
                            </div>

                            <div className="alg-card-chevron" style={{ color: moduleItem.gradFrom }}>
                                {'>'}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
