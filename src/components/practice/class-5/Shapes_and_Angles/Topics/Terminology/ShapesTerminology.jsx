import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShapesTerminology.module.css';
import { LatexText } from '@/components/LatexText';

const TERMS = [
    { name: 'Vertex', def: 'The corner point where two lines meet to form an angle.', ex: 'The corner of a square' },
    { name: 'Arm', def: 'One of the two lines that form an angle.', ex: 'The hands on a clock' },
    { name: 'Degree ($^\\circ$)', def: 'The unit used to measure angles. A full circle is $360^\\circ$.', ex: 'A right angle is $90^\\circ$' },
    { name: 'Protractor', def: 'A semi-circular tool used for measuring or drawing angles.', ex: 'Using it to find a $45^\\circ$ angle' },
    { name: 'Ray', def: 'A part of a line with one fixed endpoint and extending forever in one direction.', ex: 'A beam of light from a torch' },
    { name: 'Clockwise', def: 'Moving in the same direction as the hands of a clock.', ex: 'Rotating $90^\\circ$ to the right' }
];

export default function ShapesTerminology() {
    const navigate = useNavigate();

    return (
        <div className={styles.sa_page}>
            <nav className={styles.sa_topic_nav}>
                <div className={styles.sa_back_link} onClick={() => navigate('/shapes-and-angles')}>← Back to Chapter</div>
                <div className={styles.sa_nav_links}>
                    <span className={styles.sa_nav_link} onClick={() => navigate('/shapes-and-angles/introduction')}>🌟 Intro</span>
                    <span className={styles.sa_nav_link_active}>📖 Terminology</span>
                    <span className={styles.sa_nav_link} onClick={() => navigate('/shapes-and-angles/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className={styles.sa_content}>
                <div className={styles.sa_header}>
                    <h1 className={styles.sa_title}>Terminology: <span className={styles.sa_title_accent}>Geometry Basics</span></h1>
                    <p className={styles.sa_subtitle}>Mastering the language of shapes and measurements.</p>
                </div>

                <div className={styles.sa_terms_grid}>
                    {TERMS.map((term, i) => (
                        <div key={i} className={styles.sa_term_card}>
                            <div className={styles.sa_term_name}>{term.name}</div>
                            <p className={styles.sa_term_def}>
                                <LatexText text={term.def} />
                            </p>
                            <div className={styles.sa_term_example_box}>
                                <div className={styles.sa_term_example_label}>Example</div>
                                <div className={styles.sa_term_example_value}>
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
