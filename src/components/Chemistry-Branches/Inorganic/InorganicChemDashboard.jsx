import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import '../chemistry.css';

const STATS = [
    { label: 'Skills', num: '4', color: '#10b981' },
    { label: 'Practice Qs', num: '40+', color: '#0d9488' },
    { label: 'Key Terms', num: '9', color: '#059669' },
    { label: 'Identities', num: '5', color: '#047857' },
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'THE FOUNDATION',
        desc: 'Explore 6 big questions: Who, What, When, Where, Why, and How of Inorganic Chemistry.',
        icon: '🌟',
        color: '#10b981',
        path: '/chemistry/inorganic/introduction',
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Key terms: Atom, Z, A, Isotope, Valency, Ionic Bond, Covalent Bond, and 5 Key Identities.',
        icon: '📖',
        color: '#0d9488',
        path: '/chemistry/inorganic/terminology',
    },
    {
        id: 'skills',
        title: 'Skills',
        tagline: 'CORE PRACTICE',
        desc: 'Master atomic structure calculations, electronic configuration, bond types, and element classification.',
        icon: '🎯',
        color: '#059669',
        path: '/chemistry/inorganic/skills',
    },
];

export default function InorganicChemDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="chemFullpage">
            <div className="chemLeft" style={{ background: 'linear-gradient(145deg, #064e3b 0%, #065f46 30%, #047857 60%, #059669 100%)' }}>
                <div className="chemDeco chemDecoA" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.3) 0%, transparent 70%)' }} />
                <div className="chemDeco chemDecoB" style={{ background: 'radial-gradient(circle, rgba(110,231,183,0.2) 0%, transparent 70%)' }} />

                <div className="chemLeftContent">
                    <button
                        className="chemNavBack"
                        onClick={() => navigate('/')}
                        style={{ marginBottom: 40, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        🏠 Back
                    </button>

                    <h1 className="chemMainTitle" style={{ color: 'white' }}>
                        Inorganic <br />
                        <span className="chemTitleAccent" style={{ background: 'linear-gradient(90deg, #6ee7b7, #a7f3d0, #fef3c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Chemistry</span>
                    </h1>

                    <p className="chemMainSub" style={{ color: 'rgba(255,255,255,0.85)' }}>
                        Atoms, bonds, the periodic table, and element classification — the language of all non-carbon chemistry.
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
