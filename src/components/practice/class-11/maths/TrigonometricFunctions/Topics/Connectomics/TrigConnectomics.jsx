import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../../class-12/Matrices/Matrices.css';
import '../../../../../class-12/Matrices/MatricesPages.css';
import MathRenderer from '../../../../../../MathRenderer';
import { Share2 } from 'lucide-react';

const BASE = '/senior/grade/11/maths/trigonometric-functions';

const connections = [
    {
        from: 'Sine & Cosine',
        to: 'Calculus',
        icon: '📈',
        type: 'Core Dependency',
        color: '#0891b2',
        note: 'Derivatives of trig functions form a perfect cycle: $\\frac{d}{dx}\\sin x = \\cos x$ and $\\frac{d}{dx}\\cos x = -\\sin x$. Without trig, differential calculus loses its most elegant examples.'
    },
    {
        from: 'Euler\'s Formula',
        to: 'Complex Numbers',
        icon: '🌀',
        type: 'Extension',
        color: '#7c3aed',
        note: 'Euler\'s identity $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ unifies trigonometry, exponentials, and imaginary numbers. It is the deepest bridge in all of mathematics.'
    },
    {
        from: 'Sine Wave',
        to: 'Physics (Waves)',
        icon: '🌊',
        type: 'Application',
        color: '#059669',
        note: 'Every wave — light, sound, water, electromagnetic — is modelled by $y = A\\sin(\\omega t + \\phi)$. Simple Harmonic Motion and wave optics are entirely trig-based.'
    },
    {
        from: 'Fourier Series',
        to: 'Signal Processing',
        icon: '📡',
        type: 'Application',
        color: '#d97706',
        note: 'Any periodic signal can be decomposed into a sum of sines and cosines: $f(x) = \\sum a_n\\cos(nx) + b_n\\sin(nx)$. Wi-Fi, 5G, and audio compression all depend on this.'
    },
    {
        from: 'Trig Ratios',
        to: 'Coordinate Geometry',
        icon: '📐',
        type: 'Foundation',
        color: '#be185d',
        note: 'The slope of a line equals $\\tan\\theta$. The distance formula uses the Pythagorean identity $\\sin^2\\theta + \\cos^2\\theta = 1$. Rotation of axes requires trig transformation formulas.'
    },
    {
        from: 'Trig Equations',
        to: 'Algebra',
        icon: '🧮',
        type: 'Core Dependency',
        color: '#6366f1',
        note: 'General solutions of trig equations (e.g., $\\sin x = \\frac{1}{2} \\Rightarrow x = n\\pi + (-1)^n \\frac{\\pi}{6}$) connect periodic functions to integer algebra and modular arithmetic.'
    },
    {
        from: 'Rotation Matrix',
        to: 'Computer Graphics',
        icon: '💻',
        type: 'Application',
        color: '#0369a1',
        note: 'Every 2D/3D rotation uses $\\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}$. Game engines, 3D movies, and robotics are built on this matrix.'
    },
    {
        from: 'Parallax & Bearing',
        to: 'Astronomy & Navigation',
        icon: '🌠',
        type: 'Application',
        color: '#0f766e',
        note: 'Astronomers use the sine rule to find stellar distances via parallax. Navigators use bearing angles and the cosine rule to chart ship/aircraft paths across Earth\'s surface.'
    }
];

const realWorld = [
    {
        title: 'Medical Imaging (MRI)',
        impact: 'Life-Saving',
        desc: 'MRI machines reconstruct body images using Fourier transforms — infinite sums of $\\sin$ and $\\cos$ waves. Without trig, modern medicine could not see inside the human body.'
    },
    {
        title: 'Electrical Engineering',
        impact: 'Essential',
        desc: 'Household AC power is $V = 220\\sin(100\\pi t)$ volts. Impedance, resonance, and phase angle in circuits are pure trigonometry. All power systems run on sine waves.'
    },
    {
        title: 'Seismology & Earthquakes',
        impact: 'Critical',
        desc: 'Seismic waves are modelled as superpositions of sine waves. Seismologists decompose $P$-waves and $S$-waves using Fourier analysis to locate earthquake epicentres.'
    },
    {
        title: 'Music & Sound Synthesis',
        impact: 'Universal',
        desc: 'Every musical note is a sine wave at a specific frequency. Instruments produce harmonics — integer multiples — and synthesizers add trig waves to create any sound.'
    }
];

export default function TrigConnectomics() {
    const navigate = useNavigate();

    return (
        <div className="mat-page">
            <nav className="mat-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', position: 'sticky', top: 0, zIndex: 50, background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                <button onClick={() => navigate(BASE)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px', color: '#64748b' }}>← Back to Trigonometric Functions</button>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/introduction`)}>🌟 Introduction</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/terminology`)}>📖 Terminology</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/skills`)}>🎯 Skills</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', color: '#fff', border: 'none', boxShadow: '0 4px 14px rgba(30,27,75,0.3)' }} onClick={() => navigate(`${BASE}/connectomics`)}>🌐 Connectomics</button>
                    <button style={{ padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', background: '#f8fafc', color: '#64748b', border: '1.5px solid #e2e8f0' }} onClick={() => navigate(`${BASE}/exam-edge`)}>⚔️ Exam Edge</button>
                </div>
            </nav>

            <div className="det-intro-hero" style={{ padding: '16px 24px 20px' }}>
                <div className="det-intro-hero-deco det-intro-hero-deco-a" />
                <div className="det-intro-hero-deco det-intro-hero-deco-b" />
                <div className="det-intro-hero-inner">
                    <h1 className="det-intro-hero-title">Trigonometric Functions <span className="det-intro-hero-highlight" style={{ color: '#f59e0b' }}>Connectomics</span></h1>
                    <p className="det-intro-hero-sub">Discover the hidden threads linking Trig to every corner of science and technology.</p>
                </div>
            </div>

            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>The Web of Trigonometry</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '24px', marginBottom: '60px' }}>
                    {connections.map((conn, idx) => (
                        <div key={idx} style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: conn.color }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ fontSize: '24px' }}>{conn.icon}</div>
                                <div style={{ fontSize: '12px', fontWeight: 800, background: `${conn.color}15`, color: conn.color, padding: '4px 10px', borderRadius: '100px' }}>{conn.type}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <span style={{ fontWeight: 800, color: '#1e1b4b' }}>{conn.from}</span>
                                <span style={{ color: '#94a3b8' }}>→</span>
                                <span style={{ fontWeight: 800, color: conn.color }}>{conn.to}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}><MathRenderer text={conn.note} /></p>
                        </div>
                    ))}
                </div>

                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '28px', fontWeight: 900, marginBottom: '32px', textAlign: 'center', color: '#1e1b4b' }}>Real World Systems</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '24px' }}>
                    {realWorld.map((app, idx) => (
                        <div key={idx} style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)', padding: '32px', borderRadius: '24px', color: '#fff' }}>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Impact: {app.impact}</div>
                            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '12px' }}>{app.title}</h3>
                            <p style={{ margin: 0, opacity: 0.8, fontSize: '15px', lineHeight: 1.6 }}><MathRenderer text={app.desc} /></p>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '60px', textAlign: 'center', background: '#f8fafc', padding: '40px', borderRadius: '32px', border: '2px dashed #e2e8f0' }}>
                    <Share2 size={48} color="#0891b2" style={{ marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1e1b4b' }}>Trig is Everywhere</h3>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b' }}>
                        Trigonometric functions aren't just a chapter — they are the language of oscillation, rotation, and waves. Every periodic phenomenon in the universe speaks in sine and cosine.
                    </p>
                </div>
            </main>
        </div>
    );
}
