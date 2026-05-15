import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import '../chemistry.css';

const STATS = [
    { label: 'Skills', num: '3', color: '#f59e0b' },
    { label: 'Practice Qs', num: '30+', color: '#d97706' },
    { label: 'Key Terms', num: '8', color: '#b45309' },
    { label: 'Identities', num: '3', color: '#92400e' },
];

const MODULES = [
    {
        id: 'intro',
        title: 'Introduction',
        tagline: 'THE FOUNDATION',
        desc: 'Explore 6 big questions about Organic Chemistry: Who, What, When, Where, Why, and How.',
        icon: '🌟',
        color: '#f59e0b',
        path: '/chemistry/organic/introduction',
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Key terms: Organic compound, C–H bond rule, Tetravalency, Catenation, and bond types (single, double, triple).',
        icon: '📖',
        color: '#d97706',
        path: '/chemistry/organic/terminology',
    },
    {
        id: 'skills',
        title: 'Skills',
        tagline: 'CORE PRACTICE',
        desc: 'Master organic vs inorganic classification, molecule types (mono/di/tri/polyatomic), and carbon properties.',
        icon: '🎯',
        color: '#b45309',
        path: '/chemistry/organic/skills',
    },
];

export default function OrganicChemDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="chemFullpage">
            <div className="chemLeft" style={{ background: 'linear-gradient(145deg, #78350f 0%, #92400e 30%, #b45309 60%, #d97706 100%)' }}>
                <div className="chemDeco chemDecoA" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)' }} />
                <div className="chemDeco chemDecoB" style={{ background: 'radial-gradient(circle, rgba(253,230,138,0.2) 0%, transparent 70%)' }} />

                <div className="chemLeftContent">
                    <button
                        className="chemNavBack"
                        onClick={() => navigate('/')}
                        style={{ marginBottom: 40, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        🏠 Back
                    </button>

                    <h1 className="chemMainTitle" style={{ color: 'white' }}>
                        Organic <br />
                        <span className="chemTitleAccent" style={{ background: 'linear-gradient(90deg, #fde68a, #fef3c7, #fde68a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Chemistry</span>
                    </h1>

                    <p className="chemMainSub" style={{ color: 'rgba(255,255,255,0.85)' }}>
                        Carbon compounds, the C–H bond rule, tetravalency, and catenation — the chemistry that explains all living things.
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
