import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '@/components/LatexText';
import styles from '../../data_handling.module.css';

const CARDS = [
    {
        key: 'what',
        label: 'WHAT',
        q: 'What is Data Handling?',
        icon: '📊',
        color: '#0f766e',
        items: [
            '📌 Data handling is the process of collecting, organising, representing, and interpreting numerical information.',
            '📌 Raw data is a collection of numbers or facts gathered from observation or surveys.',
            '📌 Organising data into frequency tables helps us see patterns and draw conclusions.',
            '📌 Data can be represented as bar graphs, pie charts, and histograms for easy comparison.',
            '📌 Probability is the branch of mathematics that measures how likely an event is to occur.',
        ],
    },
    {
        key: 'who',
        label: 'WHO',
        q: 'Who Uses Data Handling?',
        icon: '👥',
        color: '#1e40af',
        items: [
            '📌 Scientists and researchers use data handling to analyse experimental results and draw conclusions.',
            '📌 Governments collect census data to plan infrastructure, healthcare, and education.',
            '📌 Sports teams analyse player statistics using frequency tables and graphs to improve performance.',
            '📌 Businesses use sales data and pie charts to understand market trends and customer preferences.',
            '📌 Students and teachers use data handling to represent scores and track progress.',
        ],
    },
    {
        key: 'when',
        label: 'WHEN',
        q: 'When Do We Use Data Handling?',
        icon: '📅',
        color: '#7c3aed',
        items: [
            '📌 Whenever we conduct a survey or experiment and need to make sense of results.',
            '📌 During elections, to represent vote counts using bar graphs and pie charts.',
            '📌 In weather forecasting: temperature, rainfall, and humidity data are collected daily.',
            '📌 In schools: to record and compare class scores across subjects over time.',
            '📌 Probability is used when we want to predict outcomes: tossing a coin, rolling a die.',
        ],
    },
    {
        key: 'where',
        label: 'WHERE',
        q: 'Where Do We See Data Handling?',
        icon: '🌍',
        color: '#b45309',
        items: [
            '📌 Newspapers and news channels display bar graphs and pie charts for elections, sports, and finance.',
            '📌 Hospital records use frequency tables to track patient age groups and disease occurrence.',
            '📌 Cricket score cards and batting averages involve data organisation and representation.',
            '📌 Traffic surveys count vehicles in class intervals to decide road projects.',
            '📌 Stock market graphs show price movement over time using data representation.',
        ],
    },
    {
        key: 'why',
        label: 'WHY',
        q: 'Why Do We Learn Data Handling?',
        icon: '🎯',
        color: '#be185d',
        items: [
            '📌 To make informed decisions based on facts rather than guesses.',
            '📌 To identify trends and patterns hidden in large sets of raw numbers.',
            '📌 To compare groups fairly using a visual representation like bar graphs or pie charts.',
            '📌 To understand chance and predict outcomes rationally using probability.',
            '📌 Data literacy is an essential life skill in a world flooded with information.',
        ],
    },
    {
        key: 'how',
        label: 'HOW',
        q: 'How Do We Handle Data?',
        icon: '🔧',
        color: '#0369a1',
        items: [
            '📌 Step 1 — Collect: Gather raw data through surveys, experiments, or observation.',
            '📌 Step 2 — Organise: Use tally marks and frequency tables to group the data clearly.',
            '📌 Step 3 — Represent: Draw bar graphs for comparison or pie charts ($360^\\circ$ circles) for proportions.',
            '📌 Step 4 — Analyse: Calculate mode, range, or central angles to interpret the results.',
            '📌 Step 5 — Conclude: Use probability ($\\frac{\\text{Favourable}}{\\text{Total}}$) to predict future events.',
        ],
    },
];

export default function DataHandlingIntro5W1H() {
    const navigate = useNavigate();
    const [openKey, setOpenKey] = useState(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const toggle = (key) => setOpenKey((prev) => (prev === key ? null : key));

    return (
        <div className={styles['dh-page']}>
            {/* NAV */}
            <nav className={styles['dh-nav']}>
                <button className={styles['dh-nav-back']} onClick={() => navigate('/senior/grade/8/data-handling')}>
                    ← Data Handling
                </button>
                <div className={styles['dh-nav-links']}>
                    <button className={`${styles['dh-nav-link']} ${styles['dh-nav-link--active']}`}>Introduction</button>
                    <button className={styles['dh-nav-link']} onClick={() => navigate('/senior/grade/8/data-handling/terminology')}>Terminology</button>
                    <button className={styles['dh-nav-link']} onClick={() => navigate('/senior/grade/8/data-handling/skills')}>Skills</button>
                </div>
            </nav>

            {/* HERO */}
            <div className={styles['dh-module-hero']}>
                <h1 className={styles['dh-module-title']}>
                    Introduction to <span className={styles['dh-accent-text']}>Data Handling</span>
                </h1>
                <p className={styles['dh-module-subtitle']}>6 Big Questions · Tap any card to explore</p>
            </div>

            {/* GRID */}
            <div className={styles['dh-section']}>
                <div className={styles['dh-5w1h-grid']}>
                    {CARDS.map((card) => {
                        const isOpen = openKey === card.key;
                        return (
                            <div
                                key={card.key}
                                className={styles['dh-5w1h-card']}
                                style={{ borderColor: isOpen ? card.color : '#f1f5f9' }}
                            >
                                <div
                                    className={styles['dh-5w1h-header']}
                                    style={{ background: isOpen ? `${card.color}08` : 'transparent' }}
                                    onClick={() => toggle(card.key)}
                                >
                                    <div className={styles['dh-5w1h-icon']} style={{ background: `${card.color}15` }}>
                                        {card.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className={styles['dh-5w1h-label']} style={{ color: card.color }}>{card.label}</div>
                                        <div className={styles['dh-5w1h-q']}>{card.q}</div>
                                    </div>
                                    <span className={`${styles['dh-5w1h-chevron']}${isOpen ? ` ${styles['dh-5w1h-chevron--open']}` : ''}`} style={{ color: card.color }}>
                                        ⌄
                                    </span>
                                </div>

                                {isOpen && (
                                    <div className={styles['dh-5w1h-body']}>
                                        <ul className={styles['dh-5w1h-list']}>
                                            {card.items.map((item, idx) => (
                                                <li key={idx} className={styles['dh-5w1h-item']}>
                                                    <LatexText text={item} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{ textAlign: 'center', marginTop: 36 }}>
                    <button
                        className={`${styles['dh-btn-primary']} ${styles['dh-btn-large']}`}
                        onClick={() => navigate('/senior/grade/8/data-handling/terminology')}
                    >
                        Next: Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
