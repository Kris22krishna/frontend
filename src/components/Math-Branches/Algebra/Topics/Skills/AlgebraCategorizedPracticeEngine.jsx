import React, { useState } from 'react';
import QuizEngine from './Engines/QuizEngine';

export default function AlgebraCategorizedPracticeEngine({ skill, onBack, nodeId }) {
    const [activeCategory, setActiveCategory] = useState(0);
    const category = skill.practiceCategories[activeCategory];

    return (
        <div className="algtest-practice-layout">
            <aside className="algtest-practice-sidebar">
                <button
                    type="button"
                    onClick={onBack}
                    className="algtest-sidebar-back"
                >
                    Back to Skills
                </button>

                <h3 style={{ margin: '0 0 12px 0', fontSize: 16, textTransform: 'uppercase', letterSpacing: 1, color: skill.color }}>
                    Categories
                </h3>

                {skill.practiceCategories.map((item, index) => (
                    <button
                        key={item.id ?? item.title}
                        type="button"
                        onClick={() => setActiveCategory(index)}
                        className={`algtest-sidebar-btn ${activeCategory === index ? 'active' : ''}`}
                        style={{
                            '--skill-color': skill.color,
                            '--skill-color-15': `${skill.color}15`,
                            '--skill-color-40': `${skill.color}40`,
                            '--skill-color-05': `${skill.color}05`
                        }}
                    >
                        <span className="algtest-sidebar-btn-num">{index + 1}</span>
                        <span className="algtest-sidebar-btn-title">{item.title}</span>
                    </button>
                ))}
            </aside>

            <main className="algtest-practice-main">
                <QuizEngine
                    key={category.id ?? category.title}
                    questions={category.questions}
                    title={`Practice: ${category.title}`}
                    onBack={onBack}
                    color={skill.color}
                    prefix="algtest"
                    nodeId={nodeId}
                />
            </main>
        </div>
    );
}
