import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '@/components/LatexText';
import styles from '../../cubes_and_cube_roots.module.css';

const CARDS = [
    {
        key: 'what',
        label: 'WHAT',
        q: 'What are Perfect Cubes?',
        icon: '🧊',
        color: '#0f766e',
        items: [
            '📌 A perfect cube is the result of multiplying an integer by itself three times (e.g., $2 \\times 2 \\times 2 = 8$).',
            '📌 In geometry, a cube is a 3D solid with equal length, width, and height.',
            '📌 The cube root ($\\sqrt[3]{x}$) is the inverse operation, finding what number was cubed to get $x$.',
            '📌 A number like 27 is a perfect cube ($3^3$), but 25 is not (it\'s a perfect square).',
            '📌 The Hardy-Ramanujan number 1729 is the smallest number expressible as the sum of two cubes in two different ways!',
        ],
    },
    {
        key: 'who',
        label: 'WHO',
        q: 'Who Uses Cubes & Cube Roots?',
        icon: '👥',
        color: '#1e40af',
        items: [
            '📌 Mathematicians study patterns in cube numbers and odd number series.',
            '📌 Architects and engineers use cube calculations for 3D volumes in construction.',
            '📌 Packaging designers determine the structural volume ($V = s^3$) of cubic containers.',
            '📌 Computer scientists use cubic calculations in 3D graphics and rendering algorithms.',
            '📌 Students use these concepts to build strong foundations in algebra and geometry.',
        ],
    },
    {
        key: 'when',
        label: 'WHEN',
        q: 'When Do We Use Perfect Cubes?',
        icon: '📅',
        color: '#7c3aed',
        items: [
            '📌 When calculating the space (volume) inside a 3-dimensional object or room.',
            '📌 When estimating quantities stored in cubic containers or water tanks.',
            '📌 When simplifying algebraic expressions involving powers and indices.',
            '📌 When working with prime factorisation to determine if a grouping is complete (triplets).',
            '📌 When analyzing geometric scaling, where a shape scaled by $k$ has its volume scaled by $k^3$.',
        ],
    },
    {
        key: 'where',
        label: 'WHERE',
        q: 'Where Do We See Perfect Cubes?',
        icon: '🌍',
        color: '#b45309',
        items: [
            '📌 In dice, Rubik\'s Cubes, and sugar cubes, which are perfect cubic objects.',
            '📌 In liquid measurements where 1 litre equals 1000 cubic centimetres ($1000 \\text{ cm}^3$).',
            '📌 In crystal structures like salt (NaCl) which naturally form cubic lattices.',
            '📌 In shipping logistics where freight is often measured in cubic meters.',
            '📌 In astronomy, where Kepler\'s laws relate orbital periods squared to semi-major axes cubed.',
        ],
    },
    {
        key: 'why',
        label: 'WHY',
        q: 'Why Do We Learn Cubes & Roots?',
        icon: '🎯',
        color: '#be185d',
        items: [
            '📌 To understand relationship between 1D length and 3D volume.',
            '📌 To master prime factorisation and the concept of numerical "triplets".',
            '📌 To solve complex equations involving cubic terms ($x^3 = 64$).',
            '📌 To develop numerical estimation skills for finding approximate roots of large numbers.',
            '📌 To recognize fascinating mathematical properties, like the fact that the sum of consecutive odd numbers yields perfect cubes.',
        ],
    },
    {
        key: 'how',
        label: 'HOW',
        q: 'How Do We Find Them?',
        icon: '🔧',
        color: '#0369a1',
        items: [
            '📌 Prime Factorisation: Group prime factors into sets of three (triplets). If every factor forms a triplet, it\'s a perfect cube.',
            '📌 Estimation: For large numbers, group digits in threes from the right, then use known cubes to estimate the root.',
            '📌 Unit Digits: A cube’s unit digit uniquely determines its cube root’s unit digit (e.g., if a cube ends in 8, its root ends in 2).',
            '📌 Missing Multiples: If a factor lacks a triplet, multiply or divide by that factor to create a perfect cube.',
            '📌 Inverse Operation: Use the $\\sqrt[3]{}$ symbol to denote finding the original side length from a given volume.',
        ],
    },
];

export default function CubesIntro5W1H() {
    const navigate = useNavigate();
    const [openKey, setOpenKey] = useState(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const toggle = (key) => setOpenKey((prev) => (prev === key ? null : key));

    return (
        <div className={styles['ccr-page']}>
            {/* NAV */}
            <nav className={styles['ccr-nav']}>
                <button className={styles['ccr-nav-back']} onClick={() => navigate('/senior/grade/8/cubes-and-cube-roots')}>
                    ← Cubes & Cube Roots
                </button>
                <div className={styles['ccr-nav-links']}>
                    <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Introduction</button>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/cubes-and-cube-roots/terminology')}>Terminology</button>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/cubes-and-cube-roots/skills')}>Skills</button>
                </div>
            </nav>

            {/* HERO */}
            <div className={styles['ccr-module-hero']}>
                <h1 className={styles['ccr-module-title']}>
                    Introduction to <span className={styles['ccr-accent-text']}>Cubes & Cube Roots</span>
                </h1>
                <p className={styles['ccr-module-subtitle']}>6 Big Questions · Tap any card to explore</p>
            </div>

            {/* GRID */}
            <div className={styles['ccr-section']}>
                <div className={styles['ccr-5w1h-grid']}>
                    {CARDS.map((card) => {
                        const isOpen = openKey === card.key;
                        return (
                            <div
                                key={card.key}
                                className={styles['ccr-5w1h-card']}
                                style={{ borderColor: isOpen ? card.color : '#f1f5f9' }}
                            >
                                <div
                                    className={styles['ccr-5w1h-header']}
                                    style={{ background: isOpen ? `${card.color}08` : 'transparent' }}
                                    onClick={() => toggle(card.key)}
                                >
                                    <div className={styles['ccr-5w1h-icon']} style={{ background: `${card.color}15` }}>
                                        {card.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className={styles['ccr-5w1h-label']} style={{ color: card.color }}>{card.label}</div>
                                        <div className={styles['ccr-5w1h-q']}>{card.q}</div>
                                    </div>
                                    <span className={`${styles['ccr-5w1h-chevron']}${isOpen ? ` ${styles['ccr-5w1h-chevron--open']}` : ''}`} style={{ color: card.color }}>
                                        ⌄
                                    </span>
                                </div>

                                {isOpen && (
                                    <div className={styles['ccr-5w1h-body']}>
                                        <ul className={styles['ccr-5w1h-list']}>
                                            {card.items.map((item, idx) => (
                                                <li key={idx} className={styles['ccr-5w1h-item']}>
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
                        className={`${styles['ccr-btn-primary']} ${styles['ccr-btn-large']}`}
                        onClick={() => navigate('/senior/grade/8/cubes-and-cube-roots/terminology')}
                    >
                        Next: Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
