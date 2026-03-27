import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BookOpen, MapPin, Zap, RotateCcw } from 'lucide-react';
import styles from '../../OurCommunityShared.module.css';
import { TERMS, PLACES_AND_PEOPLE } from './OurCommunityTerminologyData';
import { getTermVisual, getPlaceVisual } from '../OurCommunityVisuals';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/* ── Flashcard Component ─────────────────────────── */
function Flashcard({ item, isFlipped, onFlip, visual }) {
  return (
    <div onClick={onFlip} style={{
      perspective: 1000, cursor: 'pointer', width: '100%', height: 280,
      marginBottom: 24
    }}>
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transition: 'transform 0.6s', transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
      }}>
        {/* Front */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
          background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
          borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', color: '#fff', padding: 32, textAlign: 'center'
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>{item.name.charAt(0)}</div>
          <h3 style={{ fontSize: 28, fontWeight: 900, fontFamily: 'Outfit', margin: 0 }}>{item.name}</h3>
          <p style={{ fontSize: 15, opacity: 0.85, marginTop: 8 }}>{item.shortDef}</p>
          <div style={{ marginTop: 16, fontSize: 13, opacity: 0.7, fontWeight: 700 }}>👆 Tap to flip!</div>
        </div>
        {/* Back */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)', background: '#fff', borderRadius: 20,
          border: `3px solid ${item.color}30`, padding: 28, overflow: 'auto'
        }}>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: item.color, fontFamily: 'Outfit', margin: '0 0 12px' }}>{item.name}</h3>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: '#475569', margin: '0 0 16px' }}>{item.definition}</p>
          <div style={{ background: '#f8fafc', padding: 14, borderRadius: 12, borderLeft: `4px solid ${item.color}`, fontSize: 14, color: '#334155' }}>
            <strong>Example:</strong> {item.example}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.6, fontWeight: 700, textAlign: 'center' }}>👆 Tap to flip back</div>
        </div>
      </div>
    </div>
  );
}

/* ── Quiz Mode ──────────────────────────────────── */
function TermQuiz({ allTerms, onBack }) {
  const [questions] = useState(() => {
    const qs = allTerms.map(t => ({
      question: `What is "${t.name}"?`,
      correct: t.shortDef,
      options: shuffle([t.shortDef, ...shuffle(allTerms.filter(x => x.id !== t.id).map(x => x.shortDef)).slice(0, 2)])
    }));
    return shuffle(qs);
  });
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];

  const handleAnswer = (opt) => {
    if (answer !== null) return;
    setAnswer(opt);
    if (opt === q.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (idx < questions.length - 1) {
      setIdx(i => i + 1);
      setAnswer(null);
    } else {
      setDone(true);
    }
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div style={{ textAlign: 'center', padding: 40, background: '#fff', borderRadius: 24 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{pct >= 70 ? '🎉' : '📖'}</div>
        <h3 style={{ fontSize: 28, fontWeight: 900, color: '#1e293b' }}>Quiz Complete!</h3>
        <p style={{ fontSize: 20, color: '#64748b', marginBottom: 24 }}>{score}/{questions.length} correct ({pct}%)</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={onBack} style={{ padding: '12px 24px', borderRadius: 100, border: '2px solid #e2e8f0', background: '#fff', fontWeight: 700, cursor: 'pointer', color: '#475569' }}>
            ← Back to Glossary
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: 24, padding: 32, maxWidth: 600, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
        <span style={{ fontWeight: 800, color: '#64748b' }}>Q {idx + 1}/{questions.length}</span>
        <span style={{ fontWeight: 800, color: '#10b981' }}>Score: {score}</span>
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 800, color: '#1e293b', marginBottom: 24 }}>{q.question}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(opt)} disabled={answer !== null} style={{
            padding: '16px 20px', borderRadius: 14, textAlign: 'left', fontSize: 16, fontWeight: 700, cursor: answer !== null ? 'default' : 'pointer',
            background: answer === null ? '#f8fafc' : opt === q.correct ? '#dcfce7' : answer === opt ? '#fecaca' : '#f8fafc',
            border: answer === null ? '2px solid #e2e8f0' : opt === q.correct ? '2px solid #22c55e' : answer === opt ? '2px solid #ef4444' : '2px solid #e2e8f0',
            color: answer !== null && opt === q.correct ? '#166534' : answer === opt && opt !== q.correct ? '#991b1b' : '#334155'
          }}>
            {opt} {answer !== null && opt === q.correct && ' ✅'}{answer === opt && opt !== q.correct && ' ❌'}
          </button>
        ))}
      </div>
      {answer !== null && (
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <button onClick={handleNext} style={{ padding: '12px 28px', borderRadius: 100, border: 'none', background: '#4f46e5', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>
            {idx < questions.length - 1 ? 'Next →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Main Terminology Component ────────────────── */
export default function OurCommunityTerminology() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('terms');
  const [activeTerm, setActiveTerm] = useState(TERMS[0]);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [viewMode, setViewMode] = useState('explore'); // 'explore' | 'quiz'

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleCategorySwitch = (category) => {
    setActiveCategory(category);
    setActiveTerm(category === 'terms' ? TERMS[0] : PLACES_AND_PEOPLE[0]);
    setFlippedCards(new Set());
  };

  const currentList = activeCategory === 'terms' ? TERMS : PLACES_AND_PEOPLE;
  const VisualComponent = activeCategory === 'terms' ? getTermVisual(activeTerm.id) : getPlaceVisual(activeTerm.id);

  const toggleFlip = (id) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (viewMode === 'quiz') {
    return (
      <div className={styles.chemPage}>
        <nav className={styles.chemNav}>
          <button className={styles.chemNavBack} onClick={() => setViewMode('explore')}>
            <ChevronLeft size={20} /> <span>Back to Glossary</span>
          </button>
        </nav>
        <div className={styles.chemHero} style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
          <h1 className={styles.chemHeroTitle}>🧠 Terminology Quiz</h1>
          <p className={styles.chemHeroSub}>Test how well you know the community terms!</p>
        </div>
        <div style={{ padding: '40px 24px' }}>
          <TermQuiz allTerms={[...TERMS, ...PLACES_AND_PEOPLE]} onBack={() => setViewMode('explore')} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chemPage}>
      <nav className={styles.chemNav}>
        <button className={styles.chemNavBack} onClick={() => navigate('/junior/grade/4/science/our-community')}>
          <ChevronLeft size={20} /> <span>Back to Our Community</span>
        </button>
      </nav>

      <div className={styles.chemHero} style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)' }}>
        <h1 className={styles.chemHeroTitle}>Community Glossary</h1>
        <p className={styles.chemHeroSub}>Learn important words like Van Mahotsav, Uruka, and more!</p>
      </div>

      {/* Mode Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, padding: '24px 24px 0' }}>
        <button onClick={() => handleCategorySwitch('terms')} style={{
          padding: '12px 24px', borderRadius: 100, border: 'none', fontWeight: 'bold', cursor: 'pointer',
          background: activeCategory === 'terms' ? '#4f46e5' : '#e2e8f0', color: activeCategory === 'terms' ? 'white' : '#64748b',
          display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s'
        }}>
          <BookOpen size={18} /> Community Events
        </button>
        <button onClick={() => handleCategorySwitch('places')} style={{
          padding: '12px 24px', borderRadius: 100, border: 'none', fontWeight: 'bold', cursor: 'pointer',
          background: activeCategory === 'places' ? '#ec4899' : '#e2e8f0', color: activeCategory === 'places' ? 'white' : '#64748b',
          display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s'
        }}>
          <MapPin size={18} /> Places & People
        </button>
        <button onClick={() => setViewMode('quiz')} style={{
          padding: '12px 24px', borderRadius: 100, border: 'none', fontWeight: 'bold', cursor: 'pointer',
          background: '#f59e0b', color: '#fff', display: 'flex', alignItems: 'center', gap: 8
        }}>
          <Zap size={18} /> Quiz Me!
        </button>
      </div>

      <div className={styles.chemLexiconContainer}>
        <div className={styles.chemLexiconGrid}>
          {/* Left Column - Interactive Flashcards */}
          <div className={styles.chemSelectorContainer}>
            {currentList.map((item) => (
              <button key={item.id}
                className={`${styles.chemTermBtnMini} ${activeTerm.id === item.id ? styles.active : ''}`}
                onClick={() => setActiveTerm(item)}
                style={{
                  borderColor: activeTerm.id === item.id ? item.color : 'transparent',
                  background: activeTerm.id === item.id ? item.color : '#fff'
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: activeTerm.id === item.id ? 'rgba(255,255,255,0.2)' : `${item.color}15`,
                  color: activeTerm.id === item.id ? '#fff' : item.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                }}>
                  {item.name.charAt(0)}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold', fontSize: 15, color: activeTerm.id === item.id ? '#fff' : '#1e293b' }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: activeTerm.id === item.id ? 'rgba(255,255,255,0.8)' : '#64748b' }}>{item.shortDef}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column - Flashcard + Details */}
          <div className={styles.chemDetailsWindow} key={activeTerm.id}>
            {/* Flashcard */}
            <Flashcard
              item={activeTerm}
              isFlipped={flippedCards.has(activeTerm.id)}
              onFlip={() => toggleFlip(activeTerm.id)}
              visual={VisualComponent}
            />

            {/* Visual */}
            <div style={{
              height: 240, background: '#f8fafc', borderRadius: 16, overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {VisualComponent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
