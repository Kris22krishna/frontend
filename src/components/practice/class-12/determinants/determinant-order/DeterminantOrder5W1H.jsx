import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import LatexContent from '../../../../LatexContent';

const TILES = [
    {
        id: 'who', emoji: '👤', title: 'Who?',
        content: (
            <>
                <p><strong>Who uses determinants?</strong></p>
                <p>Engineers, physicists, economists, computer scientists, and data analysts all rely on determinants. Whenever you need to solve a system of equations, check if a matrix is invertible, or compute areas and volumes, determinants are the go-to tool.</p>
                <p>Historically, mathematicians like <strong>Leibniz</strong> (1693) and <strong>Cramer</strong> (1750) formalized the theory of determinants that we study today.</p>
            </>
        ),
    },
    {
        id: 'what', emoji: '📖', title: 'What?',
        content: (
            <>
                <p><strong>What is a determinant?</strong></p>
                <p>A determinant is a special <em>scalar value</em> computed from a square matrix. For a 2×2 matrix:</p>
                <BlockMath math={String.raw`\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc`} />
                <p>For a 3×3 matrix, you expand along a row or column to reduce it to sums of 2×2 determinants.</p>
                <p><strong>Order 1:</strong> <InlineMath math="|a| = a" /></p>
                <p><strong>Order 2:</strong> <InlineMath math="ad - bc" /></p>
                <p><strong>Order 3:</strong> Expand using minors and cofactors.</p>
            </>
        ),
    },
    {
        id: 'when', emoji: '⏰', title: 'When?',
        content: (
            <>
                <p><strong>When do we use determinants?</strong></p>
                <ul>
                    <li>When solving systems of linear equations (Cramer's Rule).</li>
                    <li>When checking if a matrix is invertible (<InlineMath math="|A| \neq 0" />).</li>
                    <li>When finding the area of a triangle given vertices.</li>
                    <li>When computing cross products in physics or engineering.</li>
                    <li>In competitive exams like JEE, CBSE boards, and olympiads.</li>
                </ul>
            </>
        ),
    },
    {
        id: 'where', emoji: '📍', title: 'Where?',
        content: (
            <>
                <p><strong>Where are determinants applied?</strong></p>
                <ul>
                    <li><strong>Geometry:</strong> Finding areas, checking collinearity, equations of lines.</li>
                    <li><strong>Physics:</strong> Moment of inertia tensors, cross products.</li>
                    <li><strong>Economics:</strong> Input-output models (Leontief).</li>
                    <li><strong>Computer Graphics:</strong> Transformations and inversions.</li>
                    <li><strong>Cryptography:</strong> Hill cipher encryption/decryption.</li>
                </ul>
            </>
        ),
    },
    {
        id: 'why', emoji: '💡', title: 'Why?',
        content: (
            <>
                <p><strong>Why study determinants?</strong></p>
                <p>Determinants unlock the ability to:</p>
                <ul>
                    <li>Determine the invertibility of a matrix — crucial for solving equations.</li>
                    <li>Calculate areas and volumes elegantly.</li>
                    <li>Understand whether a system of equations has a unique solution, infinitely many solutions, or none.</li>
                </ul>
                <p>Without determinants, you can't fully use the matrix inverse method or Cramer's rule for solving real-world problems.</p>
            </>
        ),
    },
    {
        id: 'how', emoji: '🔧', title: 'How?',
        content: (
            <>
                <p><strong>How to evaluate a determinant?</strong></p>
                <p><strong>2×2:</strong></p>
                <BlockMath math={String.raw`\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc`} />
                <p><strong>3×3 (Expansion along R1):</strong></p>
                <BlockMath math={String.raw`\begin{vmatrix} a_1 & b_1 & c_1 \\ a_2 & b_2 & c_2 \\ a_3 & b_3 & c_3 \end{vmatrix} = a_1(b_2c_3 - b_3c_2) - b_1(a_2c_3 - a_3c_2) + c_1(a_2b_3 - a_3b_2)`} />
                <p>Tip: Expand along the row/column with the most zeros for easier computation.</p>
            </>
        ),
    },
];

const DeterminantOrder5W1H = () => {
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
                <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 800 }}>Determinant of Order 1, 2, 3</h1>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, maxWidth: 450, margin: '8px auto 0' }}>Explore the concept through Who, What, When, Where, Why, and How.</p>
            </header>

            <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                    {TILES.map(tile => (
                        <div key={tile.id} onClick={() => setActiveTile(activeTile === tile.id ? null : tile.id)} style={{ background: activeTile === tile.id ? '#EEF2FF' : '#fff', border: `2px solid ${activeTile === tile.id ? '#818CF8' : '#E2E8F0'}`, borderRadius: 16, padding: '20px', cursor: 'pointer', transition: 'all 0.25s', boxShadow: activeTile === tile.id ? '0 4px 16px rgba(79,70,229,0.12)' : 'none' }}>
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

export default DeterminantOrder5W1H;
