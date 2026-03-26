import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Target, MapPin, Users, Calendar, Settings, ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './FractionsIntro5W1H.module.css';
import { LatexText } from '@/components/LatexText';

const QUESTIONS = [
    { label: 'WHAT', q: 'What are Fractions?', icon: '🍕', color: '#f59e0b', desc: 'Fractions represent equal parts of a whole. If you divide a pizza into 4 equal slices, each slice is 1/4 of the pizza!' },
    { label: 'WHY', q: 'Why do we use them?', icon: '🎯', color: '#d97706', desc: 'Fractions help us express quantities that are not whole numbers. They are essential for sharing and measuring!' },
    { label: 'WHO', q: 'Who uses Fractions?', icon: '👩‍🍳', color: '#b45309', desc: 'Architects, chefs, doctors, and scientists use fractions every day for precision and accuracy.' },
    { label: 'WHEN', q: 'When were they invented?', icon: '📜', color: '#f59e0b', desc: 'The concept of fractions dates back to Ancient Egypt (over 3000 years ago) for sharing and taxation.' },
    { label: 'WHERE', q: 'Where are they seen?', icon: '📏', color: '#d97706', desc: 'Look at a ruler, a measuring cup, or a fuel gauge — fractions are everywhere in the real world!' },
    { label: 'HOW', q: 'How do they work?', icon: '⚙️', color: '#b45309', desc: 'Fractions work by dividing a whole into equal parts. The more parts you divide it into, the smaller each part becomes.' }
];

export default function FractionsIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className={styles.pw_page}>
            <nav className={styles.pw_topic_nav}>
                <div className={styles.pw_back_link} onClick={() => navigate('/middle/grade/5/parts-and-wholes')}>← Back to Chapter</div>
                <div className={styles.pw_nav_links}>
                    <span className={styles.pw_nav_link_active}>🌟 Intro</span>
                    <span className={styles.pw_nav_link} onClick={() => navigate('/middle/grade/5/parts-and-wholes/terminology')}>📖 Terminology</span>
                    <span className={styles.pw_nav_link} onClick={() => navigate('/middle/grade/5/parts-and-wholes/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className={styles.pw_content}>
                <div className={styles.pw_intro_header}>
                    <h1 className={styles.pw_intro_title}>Introduction: <span className={styles.pw_intro_title_accent}>5W1H</span></h1>
                    <p className={styles.pw_intro_subtitle}>Deep dive into the world of fractions and parts through six foundational questions.</p>
                </div>

                <div className={styles.pw_intro_grid}>
                    {QUESTIONS.map((item, i) => (
                        <div key={i} className={styles.pw_intro_card}>
                            <div className={styles.pw_card_header}>
                                <div className={styles.pw_card_icon_box} style={{ background: `${item.color}15` }}>{item.icon}</div>
                                <div>
                                    <div className={styles.pw_card_label} style={{ color: item.color }}>{item.label}</div>
                                    <h3 className={styles.pw_card_q}>{item.q}</h3>
                                </div>
                            </div>
                            <p className={styles.pw_card_desc}>
                                <LatexText text={item.desc} />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
