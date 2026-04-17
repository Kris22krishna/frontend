import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LatexText } from '@/components/LatexText';
import styles from '../../algebraic_expressions.module.css';

const CARDS = [
    {
        key: 'what',
        label: 'WHAT',
        q: 'What are Algebraic Expressions and Identities?',
        icon: '🧠',
        color: '#0f766e',
        items: [
            '📌 An algebraic expression is a mathematical phrase made using variables, constants, and operations such as $+$, $-$, and multiplication.',
            '📌 Examples of expressions are $3x + 5$, $2a^2b$, and $7m - 4n + 9$. They do not contain an equality sign.',
            '📌 An identity is an equality that is true for every value of the variables, such as $(a+b)^2 = a^2 + 2ab + b^2$.',
            '📌 Expressions help us describe patterns and unknown quantities, while identities help us simplify and calculate quickly.',
            '📌 This chapter connects arithmetic, geometry, and algebra through terms, products, simplification, and standard formulas.',
        ],
    },
    {
        key: 'who',
        label: 'WHO',
        q: 'Who uses Algebraic Expressions?',
        icon: '👥',
        color: '#1e40af',
        items: [
            '📌 Shopkeepers use expressions like $20x + 35y$ to calculate the total price of different items.',
            '📌 Architects and engineers use variable formulas for area, perimeter, and material estimation.',
            '📌 Scientists use algebraic expressions to represent relationships such as distance, speed, and force.',
            '📌 Computer programmers use variables and expressions to build formulas, game logic, and data rules.',
            '📌 Students use identities to do mental calculations like $99^2$ or $103 \\times 97$ much faster.',
        ],
    },
    {
        key: 'when',
        label: 'WHEN',
        q: 'When do we use them?',
        icon: '⏰',
        color: '#7c3aed',
        items: [
            '📌 When a quantity is unknown or changing, we use a variable and write an expression for it.',
            '📌 When we need to add or subtract similar quantities, we combine like terms.',
            '📌 When we multiply expressions, we use distributive law and exponent rules.',
            '📌 When we want quick squares and products, identities give direct shortcuts.',
            '📌 When solving exercise problems, expressions help us model the situation before calculating.',
        ],
    },
    {
        key: 'where',
        label: 'WHERE',
        q: 'Where do we see them in real life?',
        icon: '🌍',
        color: '#b45309',
        items: [
            '📌 In shopping bills: if one notebook costs ₹$x$ and one pen costs ₹$y$, then 3 notebooks and 2 pens cost $3x + 2y$.',
            '📌 In geometry: the area of a rectangle with sides $x+2$ and $x+5$ is found by multiplying two algebraic expressions.',
            '📌 In patterns: the $n$th term of a sequence is often written as an algebraic expression.',
            '📌 In spreadsheets and coding, formulas change automatically as input values change.',
            '📌 In mental maths: identities turn lengthy multiplication into short structured steps.',
        ],
    },
    {
        key: 'why',
        label: 'WHY',
        q: 'Why do we learn Algebraic Identities?',
        icon: '🎯',
        color: '#be185d',
        items: [
            '📌 To understand how expressions are built from terms, factors, and coefficients.',
            '📌 To learn which terms can be combined and which must stay separate.',
            '📌 To expand products such as $(x+2)(x+3)$ correctly and confidently.',
            '📌 To use identities like $(a-b)^2$ and $(a+b)(a-b)$ as reliable shortcuts.',
            '📌 To prepare for later chapters such as factorisation, equations, and higher algebra.',
        ],
    },
    {
        key: 'how',
        label: 'HOW',
        q: 'How do we work with expressions?',
        icon: '🔧',
        color: '#0369a1',
        items: [
            '📌 Identify the terms by splitting the expression at $+$ and $-$ signs.',
            '📌 Find the factors and numerical coefficients inside each term.',
            '📌 Group like terms and add or subtract only their coefficients.',
            '📌 Multiply expressions using distributive law, step by step, term by term.',
            '📌 Apply identities when the pattern matches formulas such as $(a+b)^2$, $(a-b)^2$, and $(a+b)(a-b)$.',
        ],
    },
];

export default function AlgebraicExpressionsIntro5W1H() {
    const navigate = useNavigate();
    const [openKey, setOpenKey] = useState(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const toggle = (key) => setOpenKey((prev) => (prev === key ? null : key));

    return (
        <div className={styles['ccr-page']}>
            <nav className={styles['ccr-nav']}>
                <button className={styles['ccr-nav-back']} onClick={() => navigate('/senior/grade/8/algebraic-expressions-and-identities')}>
                    ← Expressions & Identities
                </button>
                <div className={styles['ccr-nav-links']}>
                    <button className={`${styles['ccr-nav-link']} ${styles['ccr-nav-link--active']}`}>Introduction</button>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/algebraic-expressions-and-identities/terminology')}>Terminology</button>
                    <button className={styles['ccr-nav-link']} onClick={() => navigate('/senior/grade/8/algebraic-expressions-and-identities/skills')}>Skills</button>
                </div>
            </nav>

            <div className={styles['ccr-module-hero']}>
                <h1 className={styles['ccr-module-title']}>
                    Introduction to <span className={styles['ccr-accent-text']}>Algebraic Expressions & Identities</span>
                </h1>
                <p className={styles['ccr-module-subtitle']}>6 Big Questions · Tap any card to explore</p>
            </div>

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
                        onClick={() => navigate('/senior/grade/8/algebraic-expressions-and-identities/terminology')}
                    >
                        Next: Terminology →
                    </button>
                </div>
            </div>
        </div>
    );
}
