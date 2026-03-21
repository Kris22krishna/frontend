import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShapesAndAngles.module.css';
import { LatexText } from '@/components/LatexText';

const MODULES = [
    {
        id: 'introduction',
        path: '/shapes-and-angles/introduction',
        label: 'Introduction',
        emoji: '📐',
        tagline: '5W1H Exploration',
        desc: 'Meet the characters and understand the "why" behind geometry.',
        color: '#6366f1'
    },
    {
        id: 'terminology',
        path: '/shapes-and-angles/terminology',
        label: 'Terminology',
        emoji: '📒',
        tagline: 'Geometry Basics',
        desc: 'Arms, Vertices, and Degrees — the language of angles.',
        color: '#8b5cf6'
    },
    {
        id: 'skills',
        path: '/shapes-and-angles/skills',
        label: 'Skills',
        emoji: '🎯',
        tagline: 'Learn & Practice',
        desc: 'Master measuring, identifying, and rotating angles.',
        color: '#4f46e5'
    }
];

export default function ShapesAndAnglesLanding() {
    const navigate = useNavigate();

    return (
        <div className={styles.sa_fullpage}>
            <div className={styles.sa_left}>
                <button
                    className={styles.sa_back_btn_top}
                    onClick={() => navigate('/middle/grade/5')}
                >
                    ← Back to Syllabus
                </button>
                <div className={styles.sa_left_content}>
                    <h1 className={styles.sa_main_title}>
                        Shapes &<br />
                        <span className={styles.sa_title_accent}>Angles</span>
                    </h1>
                    <p className={styles.sa_hero_desc}>
                        Discover the hidden angles in everyday objects and master the art of geometry visualization.
                    </p>
                    <div className={styles.sa_stats_container}>
                        <div className={styles.sa_stat_box}>
                            <span className={styles.sa_stat_value}>6</span>
                            <span className={styles.sa_stat_label}>Questions</span>
                        </div>
                        <div className={styles.sa_stat_box}>
                            <span className={styles.sa_stat_value}>5</span>
                            <span className={styles.sa_stat_label}>Skills</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.sa_right}>
                <div style={{ maxWidth: 500, margin: '0 auto', width: '100%' }}>
                    <p className={styles.sa_topic_selection_label}>Choose a topic</p>
                    {MODULES.map(mod => (
                        <button key={mod.id} className={styles.sa_card_btn} onClick={() => navigate(mod.path)}>
                            <div className={styles.sa_card_icon}>{mod.emoji}</div>
                            <div className={styles.sa_card_content}>
                                <div className={styles.sa_card_label} style={{ color: mod.color }}>{mod.label}</div>
                                <div className={styles.sa_card_tagline}>{mod.tagline}</div>
                                <div className={styles.sa_card_desc}><LatexText text={mod.desc} /></div>
                            </div>
                        </button>
                    ))}
                    <button
                        className={`${styles.sa_card_btn} ${styles.sa_chapter_test_btn}`}
                        onClick={() => navigate('/middle/grade/5/shapes-angles/chapter-test')}
                    >
                        <div className={`${styles.sa_card_icon} ${styles.sa_chapter_test_icon}`}>🎓</div>
                        <div className={styles.sa_card_content}>
                            <div className={styles.sa_card_label}>Chapter Test</div>
                            <div className={styles.sa_card_tagline}>Final Assessment</div>
                            <div className={styles.sa_card_desc}>Test your overall understanding of Shapes and Angles.</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
