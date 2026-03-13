import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './StructureOfAtomBranch.css';

const STATS = [
    { label: 'Core Skills', num: '5', color: '#6366f1' },
    { label: 'NEET/JEE', num: 'Level', color: '#0d9488' },
    { label: 'Dynamic Qs', num: '75', color: '#7c3aed' },
    { label: 'Definitions', num: '12+', color: '#f59e0b' }
];

const MODULES = [
        {
        id: 'connect',
        title: 'Connectomics',
        tagline: 'PREREQUISITES',
        desc: 'Checkpoints from previous classes and connections to other fields.',
        icon: '🔗',
        color: '#f59e0b',
        path: '/senior/grade/11/chemistry/structure-of-atom/connectomics'
    },
{
        id: 'intro',
        title: 'Introduction',
        tagline: 'THE BEGINNING',
        desc: 'Discovery of fundamental particles, early atomic models, and prerequisites.',
        icon: '🌟',
        color: '#6366f1',
        path: '/senior/grade/11/chemistry/structure-of-atom/introduction'
    },
    {
        id: 'terms',
        title: 'Terminology',
        tagline: 'THE LANGUAGE',
        desc: 'Key terms: Isotopes, Isobars, Quantum numbers, Orbitals, Node, Valency.',
        icon: '📖',
        color: '#0d9488',
        path: '/senior/grade/11/chemistry/structure-of-atom/terminology'
    },
    {
        id: 'skills',
        title: 'Skills',
        tagline: 'CORE PRACTICE',
        desc: 'Master electron configurations, quantum mechanics, Bohr model & isotopes.',
        icon: '🎯',
        color: '#7c3aed',
        path: '/senior/grade/11/chemistry/structure-of-atom/skills'
    },
    {
        id: 'exam',
        title: 'Exam Edge',
        tagline: 'TEST READY',
        desc: 'Previous year trends, weightage strategies for NEET, JEE & KCET.',
        icon: '🏆',
        color: '#ef4444',
        path: '/senior/grade/11/chemistry/structure-of-atom/exam-edge'
    }
];

export default function StructureOfAtomDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="atom-fullpage">
            {/* ── LEFT: Hero Panel ──────────────────────────────── */}
            <div className="atom-left">
                <div className="atom-deco atom-deco-a" />
                <div className="atom-deco atom-deco-b" />

                <div className="atom-left-content">
                    <button 
                        className="atom-nav-back" 
                        onClick={() => navigate('/senior/grade/11/chemistry')}
                        style={{ marginBottom: '40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                        ← Grade 11 Chemistry
                    </button>

                    <h1 className="atom-main-title">
                        Structure of <br />
                        <span className="atom-title-accent">Atom</span>
                    </h1>
                    <p className="atom-main-sub">
                        Journey into the microscopic world. Discover electrons, protons, quantum mechanics, and the invisible architecture that builds our universe.
                    </p>

                    <div className="atom-stats-grid">
                        {STATS.map((s, idx) => (
                            <div key={idx} className="atom-stat">
                                <span className="atom-stat-num">{s.num}</span>
                                <span className="atom-stat-lbl">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── RIGHT: Modules Panel ───────────────────────────── */}
            <div className="atom-right">
                <div className="atom-right-eyebrow">CHOOSE YOUR PATH</div>
                
                <div className="atom-cards-col">
                    {MODULES.map((m) => (
                        <button 
                            key={m.id} 
                            className="atom-card-btn"
                            onClick={() => navigate(m.path)}
                        >
                            <div className="atom-card-strip" style={{ background: m.color }} />
                            <div className="atom-card-icon" style={{ background: `${m.color}15`, color: m.color }}>
                                {m.icon}
                            </div>
                            <div className="atom-card-text">
                                <div className="atom-card-tagline">{m.tagline}</div>
                                <div className="atom-card-label">{m.title}</div>
                                <div className="atom-card-desc">{m.desc}</div>
                            </div>
                            <div className="atom-card-chevron">
                                <ChevronRight size={32} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
