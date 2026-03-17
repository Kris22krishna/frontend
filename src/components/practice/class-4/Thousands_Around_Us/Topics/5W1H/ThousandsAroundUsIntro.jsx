import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../thousands-around-us.css';

const INTRO_CARDS = [
  {
    id: "what-is-it",
    icon: "🔢",
    q: "WHAT",
    sub: "What are 4-digit numbers?",
    gradFrom: '#2563eb', // blue
    gradTo: '#3b82f6',
    shadow: 'rgba(37,99,235,0.35)',
    content: "When you have 999 and add 1 more, you get a 4-digit number: 1000! It has four places. The newest and biggest place is the Thousands place. For example, in 3,456, the 3 means three thousand.",
    fact: "💡 1000 is the smallest 4-digit number, and 9999 is the largest!"
  },
  {
    id: "where-we-see",
    icon: "💵",
    q: "WHERE",
    sub: "Where do we see them?",
    gradFrom: '#059669', // emerald
    gradTo: '#10b981',
    shadow: 'rgba(5,150,105,0.35)',
    content: "We use 4-digit numbers all the time without even knowing it! Think about the price of a bicycle (₹4,500), the year you were born (2015), or the distance between two far-off cities like Delhi and Mumbai (1,400 km).",
    fact: "💡 Mount Everest is 8,848 meters tall! That's a huge 4-digit number."
  },
  {
    id: "when-do-we",
    icon: "⏳",
    q: "WHEN",
    sub: "When do we use thousands?",
    gradFrom: '#b45309', // amber/orange
    gradTo: '#f59e0b',
    shadow: 'rgba(245,158,11,0.35)',
    content: "We use thousands when counting large groups of things, measuring long times (like the year 2024), or weighing heavy objects like a car (which can weigh 1,500 kilograms)!",
    fact: "💡 A leap year happens every 4 years, starting from year 0 all the way to year 2024 and beyond!"
  },
  {
    id: "why-important",
    icon: "📏",
    q: "WHY",
    sub: "Why do we need them?",
    gradFrom: '#8b5cf6', // violet
    gradTo: '#a855f7',
    shadow: 'rgba(139,92,246,0.35)',
    content: "If we only had 3-digit numbers (like up to 999), we couldn't count the stars, measure long distances, or correctly say the year! The Thousands place lets us express much larger quantities.",
    fact: "💡 A single tree can have over 5,000 leaves!"
  },
  {
    id: "who-uses",
    icon: "🧑‍🚀",
    q: "WHO",
    sub: "Who uses big numbers?",
    gradFrom: '#0284c7', // sky blue
    gradTo: '#38bdf8',
    shadow: 'rgba(56,189,248,0.35)',
    content: "Astronomers looking at stars millions of miles away, bankers counting money, store owners tracking thousands of items, and scientists measuring the oceans use big numbers every single day!",
    fact: "💡 The human body has over 100,000 miles of blood vessels. Big numbers are inside you!"
  },
  {
    id: "how-to-say",
    icon: "🗣️",
    q: "HOW",
    sub: "How do we say them?",
    gradFrom: '#ea580c', // orange/red
    gradTo: '#f97316',
    shadow: 'rgba(234,88,12,0.35)',
    content: "To read a 4-digit number, you read the thousands place, then the hundreds, and finally the tens and ones together. For example: 8,342 is read as 'Eight thousand, three hundred forty-two'.",
    fact: "💡 It usually has a comma after the thousands place just to make it easier to read!"
  }
];

export default function ThousandsAroundUsIntro() {
  const navigate = useNavigate();
  const [openCard, setOpenCard] = useState(null);

  const toggleCard = (id) => {
    setOpenCard(openCard === id ? null : id);
  };

  return (
    <div className="tau-intro-page" style={{ background: '#eff6ff' }}>
      <nav className="tau-nav">
        <button className="tau-nav-back" style={{ color: '#2563eb' }} onClick={() => navigate('/junior/grade/4/thousands-around-us')}>
          ← Back to Thousands Around Us
        </button>
        <div className="tau-nav-links">
          <button className="tau-nav-link tau-nav-link--active" style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }} onClick={() => navigate('/junior/grade/4/thousands-around-us/introduction')}>🌟 Introduction</button>
          <button className="tau-nav-link" onClick={() => navigate('/junior/grade/4/thousands-around-us/terminology')}>📖 Terminology</button>
          <button className="tau-nav-link" onClick={() => navigate('/junior/grade/4/thousands-around-us/skills')}>🎯 Skills</button>
        </div>
      </nav>

      <div className="tau-intro-hero" style={{ padding: '16px 24px 20px', background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)' }}>
        <div className="tau-intro-hero-deco tau-intro-hero-deco-a" />
        <div className="tau-intro-hero-deco tau-intro-hero-deco-b" />
        <div className="tau-intro-hero-inner">
          <h1 className="tau-intro-hero-title">
            Discover 4-Digit Numbers Through{' '}
            <span className="tau-intro-hero-highlight" style={{ background: 'linear-gradient(90deg, #2563eb, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>6 Big Questions</span>
          </h1>
          <p className="tau-intro-hero-sub">Tap each card to explore ✨</p>
        </div>
      </div>

      <div className="tau-intro-content" style={{ padding: '10px 24px 20px' }}>
        <div className="tau-intro-grid">
          {INTRO_CARDS.map(card => {
            const isOpen = openCard === card.id;
            return (
              <div
                key={card.id}
                className={`tau-intro-card ${isOpen ? 'tau-intro-card--open' : ''}`}
                onClick={() => toggleCard(card.id)}
                style={{
                  borderColor: isOpen ? card.gradFrom + '60' : '#e2e8f0',
                  boxShadow: isOpen ? `0 8px 32px ${card.shadow}` : '0 2px 10px rgba(0,0,0,0.07)',
                }}
              >
                <div
                  className="tau-intro-card-strip"
                  style={{ background: `linear-gradient(90deg, ${card.gradFrom}, ${card.gradTo})` }}
                />
                <div className="tau-intro-card-header">
                  <div
                    className="tau-intro-card-icon"
                    style={{
                      background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                      boxShadow: `0 4px 14px ${card.shadow}`,
                      color: '#fff'
                    }}
                  >
                    {card.icon}
                  </div>
                  <div className="tau-intro-card-title-block">
                    <div className="tau-intro-card-q" style={{ color: card.gradFrom }}>{card.q}</div>
                    <div className="tau-intro-card-sublabel">{card.sub}</div>
                  </div>
                  <div
                    className="tau-intro-card-chevron"
                    style={{
                      color: isOpen ? card.gradFrom : '#94a3b8',
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                    }}
                  >
                    ▼
                  </div>
                </div>

                {!isOpen && <div className="tau-intro-card-hint">Tap to explore →</div>}

                {isOpen && (
                  <div className="tau-intro-card-body">
                    <div className="tau-intro-card-content">{card.content}</div>
                    <div
                      className="tau-intro-card-fact"
                      style={{
                        background: `linear-gradient(135deg, ${card.gradFrom}12, ${card.gradTo}18)`,
                        borderColor: card.gradFrom + '30',
                      }}
                    >
                      {card.fact}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="tau-intro-cta-strip">
          <p className="tau-intro-cta-sub" style={{ margin: 0 }}>
            Up next: Key terms &amp; number words
          </p>
          <button
            className="tau-intro-cta-btn"
            style={{ background: 'linear-gradient(135deg, #2563eb, #3b82f6)' }}
            onClick={() => navigate('/junior/grade/4/thousands-around-us/terminology')}
          >
            Terminology →
          </button>
        </div>
      </div>
    </div>
  );
}
