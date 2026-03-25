import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShapesIntro5W1H.module.css';
import terminologyStyles from '../Terminology/ShapesTerminology.module.css';
import { LatexText } from '@/components/LatexText';

const QUESTIONS = [
    { label: 'WHAT', q: 'What are Shapes & Angles?', icon: '📐', color: '#6366f1', desc: 'Shapes are figures made of lines, and angles are the "corners" where two lines meet.' },
    { label: 'WHY', q: 'Why study angles?', icon: '🏗️', color: '#8b5cf6', desc: 'Angles help us build stable houses, design bridges, and even navigate ships!' },
    { label: 'WHO', q: 'Who uses geometry?', icon: '👷', color: '#4f46e5', desc: 'Architects, engineers, carpenters, and even artists use angles to create their work.' },
    { label: 'WHEN', q: 'When do angles change?', icon: '🕒', color: '#6366f1', desc: 'When lines rotate! Think of the hands of a clock or a opening door.' },
    { label: 'WHERE', q: 'Where are angles found?', icon: '🏠', color: '#8b5cf6', desc: 'Everywhere! In the roof of your house, the corner of your book, and the wings of a plane.' },
    { label: 'HOW', q: 'How to measure angles?', icon: '📏', color: '#4f46e5', desc: 'We use a tool called a Protractor and measure them in "Degrees".' }
];

export default function ShapesIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className={terminologyStyles.sa_page}>
            <nav className={terminologyStyles.sa_topic_nav}>
                <div className={terminologyStyles.sa_back_link} onClick={() => navigate('/shapes-and-angles')}>← Back to Chapter</div>
                <div className={terminologyStyles.sa_nav_links}>
                    <span className={terminologyStyles.sa_nav_link_active}>🌟 Intro</span>
                    <span className={terminologyStyles.sa_nav_link} onClick={() => navigate('/shapes-and-angles/terminology')}>📖 Terminology</span>
                    <span className={terminologyStyles.sa_nav_link} onClick={() => navigate('/shapes-and-angles/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className={terminologyStyles.sa_content}>
                <div className={styles.sa_intro_header}>
                    <h1 className={styles.sa_intro_title}>Introduction: <span className={styles.sa_intro_title_accent}>5W1H</span></h1>
                    <p className={styles.sa_intro_subtitle}>Deep dive into the world of shapes through six foundational questions.</p>
                </div>

                <div className={styles.sa_intro_grid}>
                    {QUESTIONS.map((item, i) => (
                        <div key={i} className={styles.sa_intro_card}>
                            <div className={styles.sa_card_header}>
                                <div className={styles.sa_card_icon_box} style={{ background: `${item.color}15` }}>{item.icon}</div>
                                <div>
                                    <div className={styles.sa_card_label} style={{ color: item.color }}>{item.label}</div>
                                    <h3 className={styles.sa_card_q}>{item.q}</h3>
                                </div>
                            </div>
                            <p className={styles.sa_card_desc}>
                                <LatexText text={item.desc} />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
