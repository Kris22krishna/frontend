import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, GraduationCap, Dumbbell, Target, Sparkles } from 'lucide-react';
import { OUR_COMMUNITY_SKILLS, generateEvsQuestions } from './OurCommunitySkillsData';
import styles from '../../OurCommunityShared.module.css';
import { getPlaceVisual, getTermVisual, BuilderScene, ParkScene, MarketScene, PostOfficeScene, HospitalScene, VanMahotsavScene } from '../OurCommunityVisuals';
import InteractiveGameMapper from './OurCommunityInteractiveGames';
import JuniorEvsAssessmentEngine from './OurCommunityAssessmentEngine';

/* ── LEARN DATA: Step-by-step slides per skill ───── */
const LEARN_SLIDES = {
  'community-places': [
    { title: 'The Market 🏪', content: 'The market is a busy place where people buy and sell food, clothes, and other goods. Shopkeepers arrange everything neatly for us!', visual: 'market', emoji: '🛒', color: '#f59e0b' },
    { title: 'The Post Office ✉️', content: 'When you want to send a letter to your grandmother, you visit the post office. You put a stamp on the envelope, and the postman delivers it!', visual: 'post-office', emoji: '📮', color: '#4f46e5' },
    { title: 'The Hospital 🏥', content: 'If someone gets sick or hurt, they visit the hospital. Doctors and nurses take care of patients and help them feel better!', visual: 'hospital', emoji: '🏥', color: '#ef4444' },
    { title: 'The Park 🌳', content: 'Parks are open spaces for everyone! We play games, do exercises, and enjoy nature. Parks have trees, flowers, and benches.', visual: 'park', emoji: '🌳', color: '#10b981' },
    { title: 'Quick Quiz!', content: null, quiz: { q: 'Where do you go to buy fresh vegetables?', opts: ['Park', 'Market', 'Hospital'], ans: 1 } },
  ],
  'people-at-work': [
    { title: 'The Mason 🧱', content: 'A mason builds walls, houses, and buildings using bricks, cement, and a trowel. Without masons, we wouldn\'t have homes!', emoji: '🧱', color: '#f97316' },
    { title: 'The Teacher 📚', content: 'Teachers help us learn reading, writing, and numbers. They guide us to become better people. Every school needs great teachers!', emoji: '📚', color: '#4f46e5' },
    { title: 'The Gardener 🌿', content: 'Gardeners take care of trees, flowers, and plants. They water them, trim them, and make parks beautiful for everyone.', emoji: '🌿', color: '#10b981' },
    { title: 'The Driver 🚌', content: 'Drivers help us travel from one place to another. They drive buses, auto-rickshaws, and taxis safely on the roads.', emoji: '🚌', color: '#3b82f6' },
    { title: 'Quick Quiz!', content: null, quiz: { q: 'Who uses bricks and a trowel to build walls?', opts: ['Teacher', 'Gardener', 'Mason'], ans: 2 } },
  ],
  'festivals-togetherness': [
    { title: 'Van Mahotsav 🌱', content: 'Every year from 1–7 July, people celebrate Van Mahotsav by planting trees together. This helps protect our environment and make the earth greener!', emoji: '🌱', color: '#10b981' },
    { title: 'Uruka & Magh Bihu 🔥', content: 'In Assam, on 14th January, people celebrate Uruka. They build a bamboo hut called Bhela Ghar, cook together, and dance around bonfires!', emoji: '🔥', color: '#f59e0b' },
    { title: 'Community Feast 🍽️', content: 'During festivals, everyone cooks and eats together. After the feast, leaves are buried in a pit to become manure — nothing goes to waste!', emoji: '🍽️', color: '#ec4899' },
    { title: 'Quick Quiz!', content: null, quiz: { q: 'What is the bamboo hut built during Uruka called?', opts: ['Van Mahotsav', 'Bhela Ghar', 'Khetala'], ans: 1 } },
  ],
  'teamwork': [
    { title: 'Khetala 🌾', content: 'In Sikkim, farming specialists called Khetala help each other harvest crops. Working together makes the task easy and creates strong bonds!', emoji: '🌾', color: '#f97316' },
    { title: 'Building Bridges 🌉', content: 'When the Chinar river in Chhattisgarh flooded, the community worked together. Using bamboo and stones, they built a strong bridge in just 2 days!', emoji: '🌉', color: '#3b82f6' },
    { title: 'Nature\'s Teams 🐜', content: 'Ants and bees work in colonies. Each insect has a special job — collecting food, protecting the home, or caring for babies. Humans work the same way!', emoji: '🐜', color: '#10b981' },
    { title: 'Quick Quiz!', content: null, quiz: { q: 'What did communities in Kanker build together?', opts: ['A big market', 'A bamboo bridge', 'A new school'], ans: 1 } },
  ],
};

const VISUAL_MAP = {
  'market': <MarketScene />,
  'post-office': <PostOfficeScene />,
  'hospital': <HospitalScene />,
  'park': <ParkScene />,
};

/* ── LEARN MODE COMPONENT ─────────────────────────── */
function LearnMode({ skill, onBack, onPractice }) {
  const slides = LEARN_SLIDES[skill.id] || [];
  const [idx, setIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const slide = slides[idx];

  if (!slide) return null;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
        {slides.map((_, i) => (
          <div key={i} style={{
            width: 12, height: 12, borderRadius: '50%',
            background: i === idx ? (slide.color || skill.color) : i < idx ? '#10b981' : '#e2e8f0',
            transition: 'all 0.2s'
          }} />
        ))}
      </div>

      <div style={{
        background: '#fff', borderRadius: 24, overflow: 'hidden',
        border: `3px solid ${(slide.color || skill.color)}25`,
        boxShadow: `0 16px 40px ${(slide.color || skill.color)}12`
      }}>
        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${slide.color || skill.color}, ${slide.color || skill.color}cc)`, padding: '24px 32px', color: '#fff' }}>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, opacity: 0.8, marginBottom: 4 }}>
            STEP {idx + 1} OF {slides.length}
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 900, margin: 0, fontFamily: 'Outfit' }}>{slide.title}</h3>
        </div>

        {/* Visual */}
        {slide.visual && (
          <div style={{ height: 200, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {VISUAL_MAP[slide.visual] || null}
          </div>
        )}
        {!slide.visual && slide.emoji && (
          <div style={{ height: 160, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 80, animation: 'bounce 1s ease-in-out infinite' }}>{slide.emoji}</div>
          </div>
        )}

        <div style={{ padding: 32 }}>
          {slide.content && (
            <p style={{ fontSize: 18, lineHeight: 1.7, color: '#334155', margin: 0 }}>{slide.content}</p>
          )}

          {/* Quiz slide */}
          {slide.quiz && (
            <div style={{ background: '#fefce8', border: '2px solid #fef08a', borderRadius: 16, padding: 24 }}>
              <p style={{ fontWeight: 800, color: '#854d0e', marginBottom: 16, fontSize: 18 }}>🧠 {slide.quiz.q}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {slide.quiz.opts.map((opt, i) => (
                  <button key={i} onClick={() => setQuizAnswer(i)} disabled={quizAnswer !== null} style={{
                    padding: '14px 20px', borderRadius: 14, fontWeight: 700, fontSize: 16, textAlign: 'left', cursor: quizAnswer !== null ? 'default' : 'pointer',
                    background: quizAnswer === null ? '#fff' : i === slide.quiz.ans ? '#dcfce7' : quizAnswer === i ? '#fecaca' : '#fff',
                    border: quizAnswer !== null && i === slide.quiz.ans ? '2px solid #22c55e' : quizAnswer === i && i !== slide.quiz.ans ? '2px solid #ef4444' : '2px solid #e2e8f0',
                    color: quizAnswer !== null && i === slide.quiz.ans ? '#166534' : quizAnswer === i && i !== slide.quiz.ans ? '#991b1b' : '#334155'
                  }}>
                    {opt} {quizAnswer !== null && i === slide.quiz.ans && ' ✅'}{quizAnswer === i && i !== slide.quiz.ans && ' ❌'}
                  </button>
                ))}
              </div>
              {quizAnswer !== null && (
                <button onClick={onPractice} style={{
                  marginTop: 16, padding: '14px 32px', borderRadius: 100, border: 'none',
                  background: skill.color, color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: 16
                }}>
                  🎮 Start Practice Games!
                </button>
              )}
            </div>
          )}
        </div>

        {/* Nav */}
        <div style={{ padding: '0 32px 28px', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => { setIdx(i => i - 1); setQuizAnswer(null); }} disabled={idx === 0} style={{
            padding: '10px 20px', borderRadius: 100, border: '2px solid #e2e8f0', background: '#fff',
            fontWeight: 700, cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.4 : 1,
            display: 'flex', alignItems: 'center', gap: 6, color: '#475569'
          }}>
            <ChevronLeft size={18} /> Previous
          </button>
          {idx < slides.length - 1 && (
            <button onClick={() => { setIdx(i => i + 1); setQuizAnswer(null); }} style={{
              padding: '10px 24px', borderRadius: 100, border: 'none', background: slide.color || skill.color,
              color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: `0 4px 12px ${slide.color || skill.color}40`
            }}>
              Next <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
      <style>{`@keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`}</style>
    </div>
  );
}

/* ── MAIN SKILLS COMPONENT ────────────────────────── */
export default function OurCommunitySkills() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('list');
  const [currentSkill, setCurrentSkill] = useState(null);
  const [assessQuestions, setAssessQuestions] = useState([]);

  useEffect(() => { window.scrollTo(0, 0); }, [activeView]);

  const handleModeSelect = (skill, mode) => {
    setCurrentSkill(skill);
    if (mode === 'assess') {
      const q = generateEvsQuestions(skill.id);
      setAssessQuestions(q);
    }
    setActiveView(mode);
  };

  if (activeView === 'learn' && currentSkill) {
    return (
      <div className={styles.chemPage}>
        <nav className={styles.chemNav}>
          <button className={styles.chemNavBack} onClick={() => setActiveView('list')}>
            <ChevronLeft size={20} /> <span>Back to Skills</span>
          </button>
        </nav>
        <div className={styles.chemHero} style={{ background: `linear-gradient(135deg, ${currentSkill.color}dd, ${currentSkill.color})` }}>
          <h1 className={styles.chemHeroTitle}>📖 {currentSkill.name}</h1>
          <p className={styles.chemHeroSub}>Learn step by step with visuals and quick checks!</p>
        </div>
        <div style={{ padding: '40px 24px' }}>
          <LearnMode
            skill={currentSkill}
            onBack={() => setActiveView('list')}
            onPractice={() => handleModeSelect(currentSkill, 'practice')}
          />
        </div>
      </div>
    );
  }

  if (activeView === 'practice' && currentSkill) {
    return (
      <div className={styles.chemPage}>
        <nav className={styles.chemNav}>
          <button className={styles.chemNavBack} onClick={() => setActiveView('list')}>
            <ChevronLeft size={20} /> <span>Back to Skills</span>
          </button>
        </nav>
        <div style={{ padding: '40px 24px' }}>
          <InteractiveGameMapper
            key={Date.now()} // Force re-mount for randomization
            skillId={currentSkill.id}
            onComplete={() => setActiveView('list')}
          />
        </div>
      </div>
    );
  }

  if (activeView === 'assess' && currentSkill) {
    return (
      <div className={styles.chemPage}>
        <nav className={styles.chemNav}>
          <button className={styles.chemNavBack} onClick={() => setActiveView('list')}>
            <ChevronLeft size={20} /> <span>Back to Skills</span>
          </button>
        </nav>
        <div className={styles.chemHero} style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
          <h1 className={styles.chemHeroTitle}>📝 Assessment Mode</h1>
          <p className={styles.chemHeroSub}>{currentSkill.name} — {assessQuestions.length} questions</p>
        </div>
        <div style={{ padding: '40px 24px' }}>
          <JuniorEvsAssessmentEngine
            questions={assessQuestions}
            onComplete={() => setActiveView('list')}
          />
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className={styles.chemPage}>
      <nav className={styles.chemNav}>
        <button className={styles.chemNavBack} onClick={() => navigate('/junior/grade/4/science/our-community')}>
          <ChevronLeft size={20} /> <span>Back to Our Community</span>
        </button>
      </nav>
      <div className={styles.chemHero} style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)' }}>
        <h1 className={styles.chemHeroTitle}>Community Skills</h1>
        <p className={styles.chemHeroSub}>Interactive games and challenges about our community!</p>
      </div>
      <div className={styles.chemSkillsGrid}>
        {OUR_COMMUNITY_SKILLS.map((skill, index) => (
          <div key={skill.id} className={styles.chemSkillCard} style={{ '--skill-color': skill.color, animationDelay: `${index * 0.1}s` }}>
            <div className={styles.chemSkillIcon} style={{ background: `${skill.color}15`, color: skill.color }}>
              <Target size={32} />
            </div>
            <div className={styles.chemSkillInfo}>
              <h3 className={styles.chemSkillTitle}>{skill.name}</h3>
              <p className={styles.chemSkillDesc}>{skill.shortDesc}</p>
            </div>
            <div className={styles.chemSkillActions}>
              <button className={`${styles.chemBtn} ${styles.chemBtnOutline}`} onClick={() => handleModeSelect(skill, 'learn')}>
                <GraduationCap size={16} /> Learn
              </button>
              <button className={`${styles.chemBtn} ${styles.chemBtnOutline}`} onClick={() => handleModeSelect(skill, 'practice')}>
                <Dumbbell size={16} /> Play
              </button>
              <button className={`${styles.chemBtn} ${styles.chemBtnFilled}`} onClick={() => handleModeSelect(skill, 'assess')}>
                Assess
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
