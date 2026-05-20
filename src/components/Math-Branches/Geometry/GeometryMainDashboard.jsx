import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './geometry.module.css';

const BRANCHES = [
    {
        id: 'skill-sparks',
        path: '/geometry/sparks',
        label: 'Skill Sparks ⚡',
        emoji: '⚡',
        tagline: 'Interactive Playgrounds',
        desc: 'Explore all 7 geometry branches interactively — angles, polygons, circles, transformations and more.',
        gradFrom: '#f97316',
        gradTo: '#fde047',
        shadow: 'rgba(249,115,22,0.5)',
    },
    {
        id: 'basic-geometry',
        path: '/geometry/basic-geometry',
        label: 'Basic Geometry',
        emoji: '📐',
        tagline: 'Points, Lines, Angles & Shapes',
        desc: 'Master the fundamentals of Euclidean geometry — from rays and segments to triangles and polygons.',
        gradFrom: '#0ea5e9',
        gradTo: '#22d3ee',
        shadow: 'rgba(14,165,233,0.4)',
    },
    {
        id: 'polygons',
        path: '/geometry/polygons',
        label: 'Polygons',
        emoji: '🔷',
        tagline: 'Quadrilaterals & Special Shapes',
        desc: 'Explore squares, rectangles, parallelograms, rhombuses, kites, and trapeziums — properties, formulas, and angle relationships.',
        gradFrom: '#10b981',
        gradTo: '#34d399',
        shadow: 'rgba(16,185,129,0.4)',
    },
    {
        id: 'triangles',
        path: '/geometry/triangles',
        label: 'Triangles',
        emoji: '🔺',
        tagline: 'Congruence, Similarity & Pythagoras',
        desc: 'Deep-dive into triangle types, congruence rules, similarity ratios, and the Pythagorean theorem.',
        gradFrom: '#f59e0b',
        gradTo: '#fcd34d',
        shadow: 'rgba(245,158,11,0.4)',
    },
    {
        id: 'circles',
        path: '/geometry/circles',
        label: 'Circles',
        emoji: '⭕',
        tagline: 'Arcs, Chords, Tangents & Sectors',
        desc: 'Understand the properties of circles — from central angles and arcs to tangent lines and inscribed polygons.',
        gradFrom: '#f43f5e',
        gradTo: '#fb7185',
        shadow: 'rgba(244,63,94,0.4)',
    },
    {
        id: 'mensuration',
        path: '/geometry/mensuration',
        label: 'Mensuration',
        emoji: '📏',
        tagline: 'Area, Perimeter & Volume',
        desc: 'Calculate perimeters, areas, surface areas, and volumes of 2D and 3D shapes with precision.',
        gradFrom: '#8b5cf6',
        gradTo: '#a78bfa',
        shadow: 'rgba(139,92,246,0.4)',
    },
    {
        id: '3d-geometry',
        path: '/geometry/3d-geometry',
        label: '3D Geometry',
        emoji: '🧊',
        tagline: 'Solid Shapes & Space',
        desc: 'Explore three-dimensional solids — cubes, spheres, cones, and cylinders — and their surface area and volume.',
        gradFrom: '#ec4899',
        gradTo: '#f472b6',
        shadow: 'rgba(236,72,153,0.4)',
    },
    {
        id: 'transformations',
        path: '/geometry/transformations',
        label: 'Transformations',
        emoji: '🔄',
        tagline: 'Translation, Rotation & Reflection',
        desc: 'Move, flip, rotate, and scale shapes on the plane. Study symmetry, congruence, and similarity through motion.',
        gradFrom: '#06b6d4',
        gradTo: '#67e8f9',
        shadow: 'rgba(6,182,212,0.4)',
    },
];

const STATS = [
    { val: '7', label: 'Branches', color: '#0ea5e9' },
    { val: '20+', label: 'Skills', color: '#06b6d4' },
    { val: '∞', label: 'Shapes', color: '#0891b2' },
];

export default function GeometryMainDashboard() {
    const navigate = useNavigate();

    return (
        <div className={styles.fullpage}>
            <div className={styles.left}>
                <div className={`${styles.deco} ${styles.decoA}`} />
                <div className={`${styles.deco} ${styles.decoB}`} />
                <div className={`${styles.deco} ${styles.decoC}`} />

                <div className={styles.leftContent}>
                    <h1 className={styles.mainTitle} style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}>
                        Master
                        <br />
                        <span className={styles.titleAccent}>Geometry</span>
                    </h1>

                    <p className={styles.mainSub}>
                        Geometry is the mathematical study of shapes, sizes, positions, and dimensions.
                        Explore the visual and logical beauty of mathematics.
                    </p>

                    <div className={styles.statsGrid}>
                        {STATS.map((item) => (
                            <div className={styles.stat} key={item.label}>
                                <span className={styles.statNum} style={{ color: item.color }}>
                                    {item.val}
                                </span>
                                <span className={styles.statLbl}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <button onClick={() => navigate('/')} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '8px 18px', borderRadius: 100, width: 'fit-content',
                    background: '#fff', border: '1.5px solid #e2e8f0',
                    fontSize: 14, fontWeight: 700, color: '#334155',
                    cursor: 'pointer', marginBottom: 16,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}>🏠 Back</button>
                <p className={styles.rightEyebrow}>Choose a branch to explore</p>

                <div className={styles.cardsCol}>
                    {BRANCHES.map((b) => (
                        <button key={b.id} className={styles.cardBtn} onClick={() => navigate(b.path)}>
                            <div className={styles.cardStrip} style={{ background: `linear-gradient(180deg, ${b.gradFrom}, ${b.gradTo})` }} />
                            <div className={styles.cardIcon} style={{ background: `linear-gradient(135deg, ${b.gradFrom}, ${b.gradTo})`, boxShadow: `0 6px 20px ${b.shadow}` }}>
                                {b.emoji}
                            </div>
                            <div className={styles.cardText}>
                                <div className={styles.cardLabel} style={{ color: b.gradFrom }}>{b.label}</div>
                                <div className={styles.cardTagline}>{b.tagline}</div>
                                <div className={styles.cardDesc}>{b.desc}</div>
                            </div>
                            <div className={styles.cardChevron} style={{ color: b.gradFrom }}>{'>'}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
