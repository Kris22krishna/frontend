import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import '../chemistry.css';

const STATS = [
    { label: 'Skills', num: '3', color: '#818cf8' },
    { label: 'Practice Qs', num: '30+', color: '#6366f1' },
    { label: 'Key Terms', num: '10', color: '#4f46e5' },
    { label: 'Identities', num: '3', color: '#4338ca' },
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'THE FOUNDATION',
        desc: 'Explore 6 big questions about Physical Chemistry: Who, What, When, Where, Why, and How.',
        icon: '🌟',
        color: '#6366f1',
        path: '/chemistry/physical/introduction',
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Key terms: Matter, States (Solid/Liquid/Gas), Interparticle Forces and Spaces, Compressibility, Rigidity.',
        icon: '📖',
        color: '#4f46e5',
        path: '/chemistry/physical/terminology',
    },
    {
        id: 'skills',
        title: 'Skills',
        tagline: 'CORE PRACTICE',
        desc: 'Classify states of matter, compare properties across states, and balance chemical equations.',
        icon: '🎯',
        color: '#4338ca',
        path: '/chemistry/physical/skills',
    },
];

export default function PhysicalChemDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="chemFullpage">
            <div className="chemLeft" style={{ background: 'linear-gradient(145deg, #1e1b4b 0%, #312e81 30%, #3730a3 60%, #4338ca 100%)' }}>
                <div className="chemDeco chemDecoA" style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.3) 0%, transparent 70%)' }} />
                <div className="chemDeco chemDecoB" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)' }} />

                <div className="chemLeftContent">
                    <button
                        className="chemNavBack"
                        onClick={() => navigate('/')}
                        style={{ marginBottom: 40, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        🏠 Back
                    </button>

                    <h1 className="chemMainTitle" style={{ color: 'white' }}>
                        Physical <br />
                        <span className="chemTitleAccent" style={{ background: 'linear-gradient(90deg, #c7d2fe, #e0e7ff, #c7d2fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Chemistry</span>
                    </h1>

                    <p className="chemMainSub" style={{ color: 'rgba(255,255,255,0.85)' }}>
                        States of matter, their properties, and chemical equation balancing — the mathematical and physical foundations of chemistry.
                    </p>

                    <div className="chemStatsGrid">
                        {STATS.map((s) => (
                            <div className="chemStat" key={s.label}>
                                <span className="chemStatNum" style={{ color: s.color }}>{s.num}</span>
                                <span className="chemStatLbl" style={{ color: 'rgba(255,255,255,0.7)' }}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="chemRight">
                <p className="chemRightEyebrow">CHOOSE YOUR PATH</p>

                <div className="chemCardsCol">
                    {MODULES.map((m) => (
                        <button
                            key={m.id}
                            className="chemCardBtn"
                            onClick={() => navigate(m.path)}
                        >
                            <div className="chemCardStrip" style={{ background: m.color }} />
                            <div className="chemCardIcon" style={{ background: `${m.color}15`, color: m.color }}>
                                {m.icon}
                            </div>
                            <div className="chemCardText">
                                <div className="chemCardTagline">{m.tagline}</div>
                                <div className="chemCardLabel" style={{ color: m.color }}>{m.title}</div>
                                <div className="chemCardDesc">{m.desc}</div>
                            </div>
                            <div className="chemCardChevron">
                                <ChevronRight size={28} color={m.color} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
