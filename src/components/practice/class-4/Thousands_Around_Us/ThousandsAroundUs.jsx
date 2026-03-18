import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import './thousands-around-us.css';

const TABS = [
  {
    id: 'intro',
    label: 'WHAT & WHY?',
    title: 'Introduction',
    desc: 'Understand 4-digit numbers.',
    tag: 'EXPLORE',
    icon: '🌟',
    gradFrom: '#0ea5e9',
    gradTo: '#38bdf8',
    shadow: 'rgba(14,165,233,0.4)',
    path: '/junior/grade/4/thousands-around-us/introduction'
  },
  {
    id: 'terms',
    label: 'KEY TERMS',
    title: 'Terminology',
    desc: 'Learn place values and expanded forms.',
    tag: 'VOCABULARY',
    icon: '📖',
    gradFrom: '#8b5cf6',
    gradTo: '#a78bfa',
    shadow: 'rgba(139,92,246,0.4)',
    path: '/junior/grade/4/thousands-around-us/terminology'
  },
  {
    id: 'skills',
    label: 'LEARN, PRACTICE & ASSESS',
    title: 'Skills',
    desc: 'Practice adding, counting, and comparing.',
    tag: 'CHALLENGES',
    icon: '🎯',
    gradFrom: '#10b981',
    gradTo: '#34d399',
    shadow: 'rgba(16,185,129,0.4)',
    path: '/junior/grade/4/thousands-around-us/skills'
  }
];

export default function ThousandsAroundUs() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // document.documentElement.style.overflow = 'hidden';
    return () => {
      // document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
      <div className="tau-fullpage">
        {/* LEFT PANEL */}
        <div className="tau-left">
          <div className="tau-deco tau-deco-a"></div>
          <div className="tau-deco tau-deco-b"></div>
          <div className="tau-deco tau-deco-c"></div>

          <div className="tau-left-content" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
            <h1 className="tau-main-title">
              Thousands<br />
              <span className="tau-title-accent">Around Us</span>
            </h1>

            <p className="tau-main-sub">
              Get ready to explore big numbers! Let's learn to count, write, and play with thousands, hundreds, tens, and ones in the real world.
            </p>

            <div className="tau-stats-grid">
              <div className="tau-stat">
                <span className="tau-stat-num">4</span>
                <span className="tau-stat-lbl">Digits</span>
              </div>
              <div className="tau-stat">
                <span className="tau-stat-num">1000</span>
                <span className="tau-stat-lbl">Thousand</span>
              </div>
              <div className="tau-stat">
                <span className="tau-stat-num">∞</span>
                <span className="tau-stat-lbl">Fun</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="tau-right">
            <button
                onClick={() => navigate('/junior/grade/4')}
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
                    background: '#fff', border: '1px solid #e2e8f0', borderRadius: 50,
                    padding: '10px 22px', cursor: 'pointer', fontSize: 14, fontWeight: 700,
                    color: '#334155', marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'all 0.2s',
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(10px)',
                }}
                onMouseOver={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseOut={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
                <Home size={16} />
                Back
            </button>
            <p className="tau-right-eyebrow" style={{ color: '#2563eb', opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.5s 0.1s' }}>Choose a topic to explore</p>

            <div className="tau-cards-col">
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  className="tau-card-btn"
                  onClick={() => navigate(tab.path)}
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.1 + (i * 0.1)}s`
                  }}
                >
                  <div className="tau-card-strip" style={{ background: `linear-gradient(180deg, ${tab.gradFrom}, ${tab.gradTo})` }}></div>
                  <div className="tau-card-icon" style={{ 
                      background: `linear-gradient(135deg, ${tab.gradFrom}, ${tab.gradTo})`,
                      boxShadow: `0 6px 20px ${tab.shadow}`,
                  }}>
                    {tab.icon}
                  </div>

                  <div className="tau-card-text">
                    <div className="tau-card-label" style={{ color: tab.gradFrom }}>{tab.title}</div>
                    <div className="tau-card-tagline">{tab.tag} • {tab.label}</div>
                    <div className="tau-card-desc">{tab.desc}</div>
                  </div>

                  <div className="tau-card-chevron" style={{ color: tab.gradFrom }}>›</div>
                </button>
              ))}
            </div>
      </div>
    </div>
  );
}
