import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../doesitlooksame.css';
import MathRenderer from '@/components/MathRenderer';
import tajMahalImg from '@/assets/class-5/doesitlooksame/tajmahal.png';
import butterflyImg from '@/assets/class-5/doesitlooksame/butterfly.png';
import reflectionImg from '@/assets/class-5/doesitlooksame/reflection.png';

const QUESTIONS = [
    { 
        label: 'WHAT', q: 'What is Symmetry?', icon: '🦋', color: '#3b82f6', 
        desc: 'Symmetry is where a shape looks exactly the same on both sides of a dividing line. It implies that $\\text{Left Half} \\cong \\text{Right Half}$.',
        illus: <img src={butterflyImg} alt="Symmetry" style={{ width: '100%', borderRadius: 8 }} />
    },
    { 
        label: 'WHY', q: 'Why do we study it?', icon: '🤔', color: '#8b5cf6', 
        desc: 'It helps us understand the order in nature and simplifies spatial problems by using the property of mirror-imaging.',
        illus: <img src={reflectionImg} alt="Nature" style={{ width: '100%', borderRadius: 8 }} />
    },
    { 
        label: 'WHO', q: 'Who uses symmetry?', icon: '🎨', color: '#ec4899', 
        desc: 'Artists, architects, and engineers use it to create balance and stability in everything from paintings to skyscrapers.',
        illus: (
            <svg viewBox="0 0 100 60" style={{ width: '100%' }}>
                {/* Building / Architecture SVG */}
                <rect x="20" y="45" width="60" height="10" fill="#fbcfe8" />
                <rect x="30" y="20" width="40" height="25" fill="#f9a8d4" stroke="#ec4899" strokeWidth="1" />
                <path d="M30,20 L50,5 L70,20 Z" fill="#ec4899" />
                <line x1="50" y1="5" x2="50" y2="55" stroke="#fff" strokeWidth="0.5" strokeDasharray="2,1" />
            </svg>
        )
    },
    { 
        label: 'WHEN', q: 'When is it balanced?', icon: '⚖️', color: '#3b82f6', 
        desc: 'A shape is balanced when it has at least one **Line of Symmetry**, dividing it into two matching mirror-images.',
        illus: (
            <svg viewBox="0 0 100 60" style={{ width: '100%' }}>
                <circle cx="30" cy="30" r="15" fill="#bfdbfe" />
                <circle cx="70" cy="30" r="15" fill="#bfdbfe" />
                <line x1="50" y1="5" x2="50" y2="55" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,2" />
            </svg>
        )
    },
    { 
        label: 'WHERE', q: 'Where is it seen?', icon: '🏙️', color: '#8b5cf6', 
        desc: 'From the **Taj Mahal** to a butterfly\'s wings, symmetry is a signature pattern found throughout the universe.',
        illus: <img src={tajMahalImg} alt="Taj Mahal Symmetry" style={{ width: '100%', borderRadius: 8, height: 120, objectFit: 'cover' }} />
    },
    { 
        label: 'HOW', q: 'How to check it?', icon: '🪞', color: '#ec4899', 
        desc: 'Use the **Mirror Test**: place a mirror on the line of symmetry. The reflection should complete the shape perfectly.',
        illus: (
            <svg viewBox="0 0 100 60" style={{ width: '100%' }}>
                <rect x="48" y="5" width="4" height="50" fill="#94a3b8" rx="2" />
                <path d="M15,20 L40,20 L30,40 Z" fill="#fdf2f8" stroke="#ec4899" strokeWidth="1.5" />
                <path d="M85,20 L60,20 L70,40 Z" fill="#fdf2f8" stroke="#ec4899" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,1" />
            </svg>
        )
    }
];

export default function DoesItLookSameIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className="dils-page">
            <nav className="dils-topic-nav">
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <button className="dils-back-link" onClick={() => navigate('/middle/grade/5/does-it-look-same')}>← Back to Chapter</button>
                </div>
                <div className="dils-nav-links">
                    <span className="dils-nav-link-active">🌟 Intro</span>
                    <span className="dils-nav-link" onClick={() => navigate('/middle/grade/5/does-it-look-same/terminology')}>📖 Terminology</span>
                    <span className="dils-nav-link" onClick={() => navigate('/middle/grade/5/does-it-look-same/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className="dils-content" style={{ padding: '40px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Introduction: <span style={{ color: '#4f46e5' }}>5W1H</span>
                    </h1>
                    <p style={{ color: '#64748b', fontWeight: 600, fontSize: 16, margin: 0 }}>
                        Exploring the world of symmetry and balance through six foundational questions.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
                    {QUESTIONS.map((item, i) => (
                        <div key={i} style={{ background: '#fff', padding: 24, borderRadius: 20, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{item.icon}</div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 900, color: item.color, textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</div>
                                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', margin: 0 }}>{item.q}</h3>
                                </div>
                            </div>
                            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, margin: '0 0 16px' }}>
                                <MathRenderer text={item.desc} />
                            </p>
                            <div style={{ background: '#f8fafc', borderRadius: 12, padding: 12, border: '1px dashed #e2e8f0' }}>
                                {item.illus}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
