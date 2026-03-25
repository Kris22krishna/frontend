import React, { useState } from 'react';
import QuizEngine from './QuizEngine';

const CategorizedPracticeEngine = ({ skill, onBack }) => {
    const [activeCat, setActiveCat] = useState(0);
    const category = skill.practiceCategories[activeCat];

    return (
        <div className="tri-practice-layout">
            <aside className="tri-learn-sidebar">
                <button onClick={onBack} style={{ marginBottom: 16, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--tri-muted)', textAlign: 'left', fontWeight: 'bold' }}>← Back to Skills</button>
                <h3 style={{ margin: '0 0 12px 0', fontSize: 16, textTransform: 'uppercase', letterSpacing: 1, color: skill.color }}>Categories</h3>
                {skill.practiceCategories.map((c, i) => (
                    <button key={i} onClick={() => setActiveCat(i)} className={`tri-sidebar-btn ${activeCat === i ? 'active' : ''}`} style={{
                        '--skill-color': skill.color,
                        '--skill-color-15': `${skill.color}15`,
                        '--skill-color-40': `${skill.color}40`,
                        '--skill-color-05': `${skill.color}05`,
                        textAlign: 'left',
                        fontSize: 14,
                        lineHeight: 1.4,
                    }}>
                        {c.title}
                    </button>
                ))}
            </aside>
            <main>
                <QuizEngine
                    key={activeCat} // Force remount to reset state
                    questions={category.questions}
                    title={`Practice: ${category.title}`}
                    onBack={onBack}
                    color={skill.color}
                />
            </main>
        </div>
    );
};

export default CategorizedPracticeEngine;
