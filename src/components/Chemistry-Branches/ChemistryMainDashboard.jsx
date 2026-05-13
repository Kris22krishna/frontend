import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './chemistry.css';

const BRANCHES = [
    {
        id: 'inorganic',
        path: '/chemistry/inorganic',
        label: 'Inorganic Chemistry',
        emoji: '⛏️',
        tagline: 'Metals, Salts & the Periodic Table',
        desc: 'Explore atomic structure, electronic configuration, ionic/covalent bonds, and element classification.',
        gradFrom: '#10b981',
        gradTo: '#34d399',
        shadow: 'rgba(16,185,129,0.4)',
    },
    {
        id: 'organic',
        path: '/chemistry/organic',
        label: 'Organic Chemistry',
        emoji: '🌿',
        tagline: 'Carbon Compounds & Life Chemistry',
        desc: 'Discover the C–H bond rule, tetravalency, catenation, and classify organic vs inorganic compounds.',
        gradFrom: '#f59e0b',
        gradTo: '#fbbf24',
        shadow: 'rgba(245,158,11,0.4)',
    },
    {
        id: 'physical',
        path: '/chemistry/physical',
        label: 'Physical Chemistry',
        emoji: '⚗️',
        tagline: 'States of Matter & Chemical Equations',
        desc: 'Master states of matter (solid, liquid, gas), their properties, and learn to balance chemical equations.',
        gradFrom: '#6366f1',
        gradTo: '#818cf8',
        shadow: 'rgba(99,102,241,0.4)',
    },
];

const STATS = [
    { val: '3', label: 'Branches', color: '#34d399' },
    { val: '9+', label: 'Topics', color: '#fbbf24' },
    { val: '90+', label: 'Practice Qs', color: '#818cf8' },
];

export default function ChemistryMainDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="chemFullpage">
            <div className="chemLeft" style={{ background: 'linear-gradient(145deg, #064e3b 0%, #065f46 25%, #047857 50%, #059669 75%, #10b981 100%)' }}>
                <div className="chemDeco chemDecoA" style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.3) 0%, transparent 70%)' }} />
                <div className="chemDeco chemDecoB" style={{ background: 'radial-gradient(circle, rgba(110,231,183,0.2) 0%, transparent 70%)' }} />

                <div className="chemLeftContent">
                    <h1 className="chemMainTitle" style={{ color: 'white', fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}>
                        Explore
                        <br />
                        <span className="chemTitleAccent">Chemistry</span>
                    </h1>

                    <p className="chemMainSub" style={{ color: 'rgba(255,255,255,0.85)' }}>
                        From atoms and bonds in Inorganic, to carbon chains in Organic, to states of matter in Physical — the full foundation of chemistry, one branch at a time.
                    </p>

                    <div className="chemStatsGrid">
                        {STATS.map((item) => (
                            <div className="chemStat" key={item.label}>
                                <span className="chemStatNum" style={{ color: item.color }}>{item.val}</span>
                                <span className="chemStatLbl">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="chemRight">
                <button onClick={() => navigate('/')} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '8px 18px', borderRadius: 100, width: 'fit-content',
                    background: '#fff', border: '1.5px solid #e2e8f0',
                    fontSize: 14, fontWeight: 700, color: '#334155',
                    cursor: 'pointer', marginBottom: 16,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>🏠 Back</button>
                <p className="chemRightEyebrow">Choose a branch to explore</p>

                <div className="chemCardsCol">
                    {BRANCHES.map((branch) => (
                        <button
                            key={branch.id}
                            className="chemCardBtn"
                            onClick={() => navigate(branch.path)}
                        >
                            <div
                                className="chemCardStrip"
                                style={{ background: `linear-gradient(180deg, ${branch.gradFrom}, ${branch.gradTo})` }}
                            />
                            <div
                                className="chemCardIcon"
                                style={{
                                    background: `linear-gradient(135deg, ${branch.gradFrom}, ${branch.gradTo})`,
                                    boxShadow: `0 6px 20px ${branch.shadow}`,
                                }}
                            >
                                {branch.emoji}
                            </div>
                            <div className="chemCardText">
                                <div className="chemCardLabel" style={{ color: branch.gradFrom }}>
                                    {branch.label}
                                </div>
                                <div className="chemCardTagline">{branch.tagline}</div>
                                <div className="chemCardDesc">{branch.desc}</div>
                            </div>
                            <div className="chemCardChevron" style={{ color: branch.gradFrom }}>{'>'}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
