import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HowManySquaresTerminology.module.css';
import { LatexText } from '@/components/LatexText';

const TERMS = [
    { name: 'Area', def: 'The total amount of flat space a shape covers.', ex: 'The floor space in your bedroom' },
    { name: 'Perimeter', def: 'The total length of the boundary or outside edge of a shape.', ex: 'A fence around a garden' },
    { name: 'Grid', def: 'A framework of evenly spaced horizontal and vertical lines.', ex: 'Graph paper' },
    { name: 'Unit Square', def: 'A square with sides of exactly 1 unit length, used to measure area.', ex: '1 square centimeter ($1\\text{ cm}^2$)' },
    { name: 'Overlap', def: 'When two or more shapes cover the same area or share space.', ex: 'Two rugs crossing each other' },
    { name: 'Pattern', def: 'A repeated decorative design or sequence of shapes.', ex: 'Black and white squares on a chessboard' }
];

export default function HowManySquaresTerminology() {
    const navigate = useNavigate();

    return (
        <div className={styles.hms_page}>
            <nav className={styles.hms_topic_nav}>
                <div className={styles.hms_back_link} onClick={() => navigate('/middle/grade/5/how-many-squares')}>← Back to Chapter</div>
                <div className={styles.hms_nav_links}>
                    <span className={styles.hms_nav_link} onClick={() => navigate('/middle/grade/5/how-many-squares/introduction')}>🌟 Intro</span>
                    <span className={styles.hms_nav_link_active}>📖 Terminology</span>
                    <span className={styles.hms_nav_link} onClick={() => navigate('/middle/grade/5/how-many-squares/skills')}>🎯 Skills</span>
                </div>
            </nav>

            <div className={styles.hms_content}>
                <div className={styles.hms_header}>
                    <h1 className={styles.hms_title}>Terminology: <span className={styles.hms_title_accent}>Geometry Basics</span></h1>
                    <p className={styles.hms_subtitle}>Mastering the language of squares, grids, and area measurement.</p>
                </div>

                <div className={styles.hms_terms_grid}>
                    {TERMS.map((term, i) => (
                        <div key={i} className={styles.hms_term_card}>
                            <div className={styles.hms_term_name}>{term.name}</div>
                            <p className={styles.hms_term_def}>
                                <LatexText text={term.def} />
                            </p>
                            <div className={styles.hms_term_example_box}>
                                <div className={styles.hms_term_example_label}>Example</div>
                                <div className={styles.hms_term_example_value}>
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
