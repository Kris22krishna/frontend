import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HowManySquaresIntro5W1H.module.css';
import terminologyStyles from '../Terminology/HowManySquaresTerminology.module.css';
import { LatexText } from '@/components/LatexText';

const QUESTIONS = [
    { label: 'WHAT', q: 'What is Area?', icon: '📏', color: '#3b82f6', desc: 'Area is the amount of space taken up by a flat, 2D shape. We measure it in square units!' },
    { label: 'WHY', q: 'Why count squares?', icon: '🤔', color: '#8b5cf6', desc: 'Counting squares is an easy way to understand area before learning complex formulas.' },
    { label: 'WHO', q: 'Who uses squares?', icon: '👷', color: '#ec4899', desc: 'Architects lay square tiles, farmers divide fields into grids, and map makers use coordinates.' },
    { label: 'WHEN', q: 'When do shapes overlap?', icon: '🧩', color: '#3b82f6', desc: 'When shapes combine, their total area changes! They might share space or cover each other.' },
    { label: 'WHERE', q: 'Where are grids used?', icon: '🗺️', color: '#8b5cf6', desc: 'Look at a chessboard, a city block map, or a piece of graph paper - grids are everywhere!' },
    { label: 'HOW', q: 'How to find the perimeter?', icon: '📐', color: '#ec4899', desc: 'Perimeter is the length of the boundary. Just add up the lengths of all outer sides!' }
];

export default function HowManySquaresIntro5W1H() {
    const navigate = useNavigate();

    return (
        <div className={terminologyStyles.hms_page}>
            <nav className={terminologyStyles.hms_topic_nav}>
                <div className={terminologyStyles.hms_back_link} onClick={() => navigate('/middle/grade/5/how-many-squares')}>← Back to Chapter</div>
                <div className={terminologyStyles.hms_nav_links}>
                    <span className={terminologyStyles.hms_nav_link_active}>🌟 Intro</span>
                    <span className={terminologyStyles.hms_nav_link} onClick={() => navigate('/middle/grade/5/how-many-squares/terminology')}>📖 Terminology</span>
                    <span className={terminologyStyles.hms_nav_link} onClick={() => navigate('/middle/grade/5/how-many-squares/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className={terminologyStyles.hms_content}>
                <div className={styles.hms_intro_header}>
                    <h1 className={styles.hms_intro_title}>Introduction: <span className={styles.hms_intro_title_accent}>5W1H</span></h1>
                    <p className={styles.hms_intro_subtitle}>Deep dive into the world of squares and area through six foundational questions.</p>
                </div>

                <div className={styles.hms_intro_grid}>
                    {QUESTIONS.map((item, i) => (
                        <div key={i} className={styles.hms_intro_card}>
                            <div className={styles.hms_card_header}>
                                <div className={styles.hms_card_icon_box} style={{ background: `${item.color}15` }}>{item.icon}</div>
                                <div>
                                    <div className={styles.hms_card_label} style={{ color: item.color }}>{item.label}</div>
                                    <h3 className={styles.hms_card_q}>{item.q}</h3>
                                </div>
                            </div>
                            <p className={styles.hms_card_desc}>
                                <LatexText text={item.desc} />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
