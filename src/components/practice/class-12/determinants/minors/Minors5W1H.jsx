import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import LatexContent from '../../../../LatexContent';

const TILES = [
    { id: 'who', emoji: '👤', title: 'Who?', content: <><p>Placeholder content for Who: Minors</p></> },
    { id: 'what', emoji: '📖', title: 'What?', content: <><p>Placeholder content for What: Minors</p></> },
    { id: 'when', emoji: '⏰', title: 'When?', content: <><p>Placeholder content for When: Minors</p></> },
    { id: 'where', emoji: '📍', title: 'Where?', content: <><p>Placeholder content for Where: Minors</p></> },
    { id: 'why', emoji: '💡', title: 'Why?', content: <><p>Placeholder content for Why: Minors</p></> },
    { id: 'how', emoji: '🔧', title: 'How?', content: <><p>Placeholder content for How: Minors</p></> },
];

const Minors5W1H = () => {
    const navigate = useNavigate();
    const [activeTile, setActiveTile] = useState(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F8FAFF, #EEF2FF, #F5F3FF)', fontFamily: "'Inter', sans-serif", paddingBottom: 60 }}>
            <header style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', padding: '32px 24px 40px', color: '#fff', textAlign: 'center', position: 'relative' }}>
                <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 20, left: 20, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '8px 16px', borderRadius: 10, fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
                    <ArrowLeft size={18} /> Back
                </button>
                <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 12, border: '1px solid rgba(255,255,255,0.15)' }}>LEARN WITH 5W1H</div>
                <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 800 }}>Minors</h1>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, maxWidth: 450, margin: '8px auto 0' }}>Explore the concept through Who, What, When, Where, Why, and How.</p>
            </header>
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                    {TILES.map(tile => (
                        <div key={tile.id} onClick={() => setActiveTile(activeTile === tile.id ? null : tile.id)} style={{ background: activeTile === tile.id ? '#EEF2FF' : '#fff', border: "2px solid " + (activeTile === tile.id ? '#818CF8' : '#E2E8F0'), borderRadius: 16, padding: '20px', cursor: 'pointer', transition: 'all 0.25s', boxShadow: activeTile === tile.id ? '0 4px 16px rgba(79,70,229,0.12)' : 'none' }}>
                            <div style={{ fontSize: '2rem', marginBottom: 8 }}>{tile.emoji}</div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1E293B', margin: '0 0 4px' }}>{tile.title}</h3>
                            <p style={{ fontSize: '0.78rem', color: '#64748B', margin: 0 }}>Tap to explore</p>
                        </div>
                    ))}
                </div>
                {activeTile && (
                    <div style={{ marginTop: 24, background: '#fff', border: '2px solid #C7D2FE', borderRadius: 18, padding: '24px 28px', animation: 'fadeIn 0.3s', lineHeight: 1.8, fontSize: '0.92rem', color: '#1E293B' }}>
                        {TILES.find(t => t.id === activeTile)?.content}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Minors5W1H;