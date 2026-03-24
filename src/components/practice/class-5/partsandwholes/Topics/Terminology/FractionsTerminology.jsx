import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, ChevronRight, ArrowLeft } from 'lucide-react';
import styles from './FractionsTerminology.module.css';
import { LatexText } from '@/components/LatexText';

const TERMS = [
    { name: 'Numerator', def: 'The top number of a fraction that shows how many equal parts we have.', ex: 'In $\\frac{3}{4}$, 3 is the numerator.' },
    { name: 'Denominator', def: 'The bottom number of a fraction that shows the total number of equal parts in a whole.', ex: 'In $\\frac{3}{4}$, 4 is the denominator.' },
    { name: 'Proper Fraction', def: 'A fraction where the numerator is smaller than the denominator.', ex: '$\\frac{1}{2}, \\frac{2}{3}, \\frac{7}{8}$' },
    { name: 'Equivalent Fractions', def: 'Fractions that represent the same part of a whole, even if they look different.', ex: '$\\frac{1}{2} = \\frac{2}{4} = \\frac{4}{8}$' },
    { name: 'Unit Fraction', def: 'A fraction where the numerator is always 1.', ex: '$\\frac{1}{2}, \\frac{1}{3}, \\frac{1}{10}$' },
    { name: 'Mixed Number', def: 'A combination of a whole number and a proper fraction.', ex: '$1\\frac{1}{2}$ (One and a half)' }
];

export default function FractionsTerminology() {
    const navigate = useNavigate();

    return (
        <div className={styles.pw_page}>
            <nav className={styles.pw_topic_nav}>
                <div className={styles.pw_back_link} onClick={() => navigate('/middle/grade/5/parts-and-wholes')}>← Back to Chapter</div>
                <div className={styles.pw_nav_links}>
                    <span className={styles.pw_nav_link} onClick={() => navigate('/middle/grade/5/parts-and-wholes/introduction')}>🌟 Intro</span>
                    <span className={styles.pw_nav_link_active}>📖 Terminology</span>
                    <span className={styles.pw_nav_link} onClick={() => navigate('/middle/grade/5/parts-and-wholes/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className={styles.pw_content}>
                <div className={styles.pw_header}>
                    <h1 className={styles.pw_title}>Terminology: <span className={styles.pw_title_accent}>Fraction Basics</span></h1>
                    <p className={styles.pw_subtitle}>Mastering the language of parts, wholes, and equal divisions.</p>
                </div>

                <div className={styles.pw_terms_grid}>
                    {TERMS.map((term, i) => (
                        <div key={i} className={styles.pw_term_card}>
                            <div className={styles.pw_term_name}>{term.name}</div>
                            <p className={styles.pw_term_def}>
                                <LatexText text={term.def} />
                            </p>
                            <div className={styles.pw_term_example_box}>
                                <div className={styles.pw_term_example_label}>Example</div>
                                <div className={styles.pw_term_example_value}>
                                    <LatexText text={term.ex} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
