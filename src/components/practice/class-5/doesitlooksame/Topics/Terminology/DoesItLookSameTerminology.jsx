import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../doesitlooksame.css';
import MathRenderer from '@/components/MathRenderer';

const TERMS = [
    { 
        name: 'Symmetry', 
        def: 'A mathematical property where one half of a shape is the exact mirror image of the other half.', 
        ex: 'The letter $M$ or an equilateral triangle.',
        illus: (
            <svg viewBox="0 0 100 40" style={{ height: 40 }}>
                <path d="M20,20 Q35,5 50,20 Q65,5 80,20 Q65,35 50,20 Q35,35 20,20" fill="#bfdbfe" stroke="#3b82f6" />
                <line x1="50" y1="5" x2="50" y2="35" stroke="#ef4444" strokeDasharray="2,2" />
            </svg>
        )
    },
    { 
        name: 'Line of Symmetry', 
        def: 'The imaginary "fold line" that divides a geometrical shape into two identical halves.', 
        ex: 'A vertical line through the center of a heart shape.',
        illus: (
            <svg viewBox="0 0 100 40" style={{ height: 40 }}>
                <path d="M50,35 C50,35 20,25 20,15 C20,10 25,5 35,5 C42,5 47,8 50,12 C53,8 58,5 65,5 C75,5 80,10 80,15 C80,25 50,35 50,35" fill="#fecaca" stroke="#ef4444" />
                <line x1="50" y1="2" x2="50" y2="38" stroke="#334155" strokeDasharray="3,2" />
            </svg>
        )
    },
    { 
        name: 'Reflection', 
        def: 'The result of a shape being "flipped" across a line, creating a mirror image.', 
        ex: 'The mountains reflected in a calm, still lake.',
        illus: (
            <svg viewBox="0 0 100 40" style={{ height: 40 }}>
                <path d="M10,20 L30,5 L50,20" stroke="#3b82f6" fill="none" />
                <line x1="10" y1="20" x2="90" y2="20" stroke="#94a3b8" />
                <path d="M10,20 L30,35 L50,20" stroke="#3b82f6" fill="none" opacity="0.5" />
            </svg>
        )
    },
    { 
        name: 'Rotational Symmetry', 
        def: 'When a shape can be rotated around its center point and still looks exactly the same.', 
        ex: 'A ceiling fan with 3 blades or a snowflake.',
        illus: (
            <svg viewBox="0 0 100 40" style={{ height: 40 }}>
                <g transform="translate(50,20)">
                    {[0, 120, 240].map(deg => (
                        <rect key={deg} x="-2" y="-15" width="4" height="15" fill="#ddd6fe" stroke="#8b5cf6" transform={`rotate(${deg})`} />
                    ))}
                    <circle r="3" fill="#8b5cf6" />
                </g>
            </svg>
        )
    },
    { 
        name: 'Half-Turn', 
        def: 'A rotation of exactly $180^\\circ$, which makes a shape appear upside down.', 
        ex: 'Rotating the digit 8 or the letter $H$ by $180^\\circ$.',
        illus: (
            <svg viewBox="0 0 100 40" style={{ height: 40 }}>
                <text x="25" y="28" fontSize="24" fontFamily="serif" fill="#64748b">F</text>
                <path d="M45,20 Q50,10 55,20" stroke="#94a3b8" fill="none" markerEnd="url(#arrow)" />
                <text x="75" y="28" fontSize="24" fontFamily="serif" fill="#64748b" transform="rotate(180, 81, 20)">F</text>
            </svg>
        )
    },
    { 
        name: 'Quarter-Turn', 
        def: 'A rotation of $90^\\circ$, which is one-fourth of a full circle.', 
        ex: 'Turning a square clock-wise so its top side moves to the right.',
        illus: (
            <svg viewBox="0 0 100 40" style={{ height: 40 }}>
                <rect x="20" y="10" width="20" height="20" fill="#fef3c7" stroke="#fbbf24" />
                <path d="M45,20 Q50,10 55,20" stroke="#94a3b8" fill="none" markerEnd="url(#arrow)" />
                <rect x="70" y="10" width="20" height="20" fill="#fef3c7" stroke="#fbbf24" transform="rotate(90, 80, 20)" />
            </svg>
        )
    }
];

export default function DoesItLookSameTerminology() {
    const navigate = useNavigate();

    return (
        <div className="dils-page">
            <nav className="dils-topic-nav">
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <button className="dils-back-link" onClick={() => navigate('/middle/grade/5/does-it-look-same')}>← Back to Chapter</button>
                </div>
                <div className="dils-nav-links">
                    <span className="dils-nav-link" onClick={() => navigate('/middle/grade/5/does-it-look-same/introduction')}>🌟 Intro</span>
                    <span className="dils-nav-link-active">📖 Terminology</span>
                    <span className="dils-nav-link" onClick={() => navigate('/middle/grade/5/does-it-look-same/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className="dils-content" style={{ padding: '40px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.8rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
                        Terminology: <span style={{ color: '#4f46e5' }}>Balance Basics</span>
                    </h1>
                    <p style={{ color: '#64748b', fontWeight: 600, fontSize: 16, margin: 0 }}>
                        Mastering the language of symmetry, reflections, and rotational patterns.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
                    {TERMS.map((term, i) => (
                        <div key={i} style={{ background: '#fff', padding: 24, borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#4f46e5', margin: 0 }}>{term.name}</h3>
                                {term.illus && (
                                    <div style={{ opacity: 0.8 }}>{term.illus}</div>
                                )}
                            </div>
                            <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, margin: '0 0 16px', flexGrow: 1 }}>
                                <MathRenderer text={term.def} />
                            </p>
                            <div style={{ background: '#f8fafc', padding: 12, borderRadius: 12, border: '1px solid rgba(0,0,0,0.03)' }}>
                                <div style={{ fontSize: 9, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Example</div>
                                <div style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>
                                    <MathRenderer text={term.ex} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
