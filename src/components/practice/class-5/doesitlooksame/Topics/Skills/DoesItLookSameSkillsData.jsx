import React from 'react';
import butterflyImg from '@/assets/class-5/doesitlooksame/butterfly.png';
import rangoliImg from '@/assets/class-5/doesitlooksame/rangoli.png';
import polygonsImg from '@/assets/class-5/doesitlooksame/polygons.png';
import reflectionImg from '@/assets/class-5/doesitlooksame/reflection.png';
import tajMahalImg from '@/assets/class-5/doesitlooksame/tajmahal.png';

export const SKILLS = [
    {
        id: 'visual-symmetry',
        nodeId: 'a4051005-0001-0000-0000-000000000000',
        title: 'Visual Symmetry Recognition',
        subtitle: 'Mirror Images',
        icon: '🦋',
        image: butterflyImg,
        color: '#3b82f6',
        desc: 'Identify symmetrical shapes, mirror images, and lines of symmetry in complex patterns.',
        learn: {
            rules: [
                {
                    title: 'Bilateral Symmetry',
                    f: '$$\\text{Left Half} \\cong \\text{Right Half}$$',
                    d: 'A shape has bilateral symmetry if it can be divided into two halves that are identical mirror images of each other.',
                    ex: 'The wings of a butterfly or the letter **M**.',
                    figure: (
                        <svg viewBox="0 0 100 60" className="dils-learn-figure">
                            <path d="M20,30 Q35,10 50,30 Q65,10 80,30 Q65,50 50,30 Q35,50 20,30" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1" />
                            <line x1="50" y1="5" x2="50" y2="55" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2" />
                        </svg>
                    )
                },
                {
                    title: 'Finding the Line',
                    f: '$$L = \\text{Mirror Axis}$$',
                    d: 'A line of symmetry is the axis where you can place a mirror to see the complete shape.',
                    ex: 'A circle has an infinite number of these axes.',
                    figure: (
                        <svg viewBox="0 0 100 100" className="dils-learn-figure">
                            <circle cx="50" cy="50" r="40" fill="#fef3c7" stroke="#fbbf24" strokeWidth="2" />
                            <line x1="10" y1="50" x2="90" y2="50" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,2" />
                            <line x1="50" y1="10" x2="50" y2="90" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,2" />
                            <line x1="21.7" y1="21.7" x2="78.3" y2="78.3" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,2" />
                            <line x1="78.3" y1="21.7" x2="21.7" y2="78.3" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,2" />
                        </svg>
                    )
                }
            ]
        },
        practice: () => generateQuestions('visual-symmetry', 20),
        assessment: () => generateQuestions('visual-symmetry', 15)
    },
    {
        id: 'pattern-observation',
        nodeId: 'a4051005-0002-0000-0000-000000000000',
        title: 'Pattern Observation',
        subtitle: 'Repeated Designs',
        icon: '🎨',
        image: rangoliImg,
        color: '#8b5cf6',
        desc: 'Observe and predict how patterns behave when reflected or rotated.',
        learn: {
            rules: [
                {
                    title: 'Reflection in Patterns',
                    f: '$$P \\xleftrightarrow{\\text{Mirror}} P\'$$',
                    d: 'In a reflection, every point $P$ is mapped to a point $P\'$ at an equal distance from the line of symmetry.',
                    ex: 'Tile designs often use reflections to create continuous patterns.',
                    figure: (
                        <svg viewBox="0 0 120 60" className="dils-learn-figure">
                            <rect x="10" y="10" width="40" height="40" fill="#ddd6fe" stroke="#8b5cf6" />
                            <path d="M15,15 L35,35 M15,35 L35,15" stroke="#8b5cf6" />
                            <line x1="60" y1="5" x2="60" y2="55" stroke="#a78bfa" strokeWidth="2" />
                            <rect x="70" y="10" width="40" height="40" fill="#ddd6fe" stroke="#8b5cf6" />
                            <path d="M75,15 L95,35 M75,35 L95,15" stroke="#8b5cf6" />
                        </svg>
                    )
                },
                {
                    title: 'Repeating Units',
                    f: '$$\\sum \\text{Units} = \\text{Pattern}$$',
                    d: 'Complex geometric designs are often built by repeating a single base unit using reflections and translations.',
                    ex: 'Traditional floor patterns (Rangoli) frequently use this principle.',
                    figure: (
                        <svg viewBox="0 0 100 100" className="dils-learn-figure">
                            <g transform="translate(50,50)">
                                {[0, 72, 144, 216, 288].map(deg => (
                                    <path key={deg} transform={`rotate(${deg})`} d="M0,0 Q15,-20 30,0 Q15,20 0,0" fill="#f5d0fe" stroke="#d946ef" />
                                ))}
                                <circle r="5" fill="#d946ef" />
                            </g>
                        </svg>
                    )
                }
            ]
        },
        practice: () => generateQuestions('pattern-observation', 20),
        assessment: () => generateQuestions('pattern-observation', 15)
    },
    {
        id: 'geometric-reasoning',
        nodeId: 'a4051005-0003-0000-0000-000000000000',
        title: 'Geometric Reasoning',
        subtitle: 'Logic & Rotation',
        icon: '🧩',
        image: polygonsImg,
        color: '#ec4899',
        desc: 'Reason about half-turns, quarter-turns, and the number of symmetry lines in complex polygon shapes.',
        learn: {
            rules: [
                {
                    title: 'Order of Rotation',
                    f: '$$N = \\frac{360^\\circ}{\\theta}$$',
                    d: 'The number of times a shape looks identical during a full $360^\\circ$ rotation is its order of symmetry.',
                    ex: 'A square has an order of 4.',
                    figure: (
                        <svg viewBox="0 0 100 60" className="dils-learn-figure">
                            <rect x="10" y="10" width="30" height="30" fill="#fbcfe8" stroke="#ec4899" rx="4" />
                            <path d="M50,25 L65,25" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrow)" />
                            <rect x="70" y="10" width="30" height="30" fill="#fbcfe8" stroke="#ec4899" rx="4" transform="rotate(90, 85, 25)" />
                            <defs>
                                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#ec4899" />
                                </marker>
                            </defs>
                        </svg>
                    )
                },
                {
                    title: 'Polygon Symmetry',
                    f: '$$\\text{Lines} = \\text{Sides}$$',
                    d: 'In regular polygons (where all sides and angles are equal), the number of lines of symmetry is equal to the number of sides.',
                    ex: 'A regular pentagon has 5 lines of symmetry.',
                    figure: (
                        <svg viewBox="0 0 100 100" className="dils-learn-figure">
                            <polygon points="50,10 90,40 75,90 25,90 10,40" fill="#fce7f3" stroke="#f472b6" strokeWidth="2" />
                            <line x1="50" y1="10" x2="50" y2="90" stroke="#f472b6" strokeWidth="1" strokeDasharray="4,2" />
                        </svg>
                    )
                }
            ]
        },
        practice: () => generateQuestions('geometric-reasoning', 20),
        assessment: () => generateQuestions('geometric-reasoning', 15)
    }
];

export function generateQuestions(skillType = 'visual-symmetry', count = 20) {
    const questions = [];

    for (let i = 0; i < count; i++) {
        if (skillType === 'visual-symmetry') {
            const types = ['definition', 'line-count', 'reflection', 'natural-objs'];
            const type = types[i % types.length];

            if (type === 'definition') {
                const variants = [
                    {
                        q: 'If a shape can be divided into two identical halves that are mirror images, what is it called?',
                        o: ['Asymmetrical', 'Symmetrical', 'Vertical', 'Duplicate'],
                        c: 1,
                        e: 'This is the definition of symmetry — having two halves that match exactly when reflected.'
                    },
                    {
                        q: 'What is the imaginary line that divides a symmetrical shape into two matching halves?',
                        o: ['Border line', 'Line of Symmetry', 'Dividing wall', 'Half-way mark'],
                        c: 1,
                        e: 'A Line of Symmetry is the axis that splits a shape into perfect mirror images.'
                    },
                    {
                        q: 'If a shape lacks any line that can divide it into matching halves, it is:',
                        o: ['Symmetrical', 'Balanced', 'Asymmetrical', 'Proportional'],
                        c: 2,
                        e: 'Asymmetry is the absence of symmetry.'
                    }
                ];
                const v = variants[Math.floor(i / types.length) % variants.length];
                questions.push({
                    question: v.q, options: v.o, correct: v.c, explanation: v.e,
                    svg: (
                        <svg viewBox="0 0 100 60" style={{ height: 100 }}>
                            <rect x="20" y="10" width="30" height="40" fill="#bae6fd" stroke="#0284c7" />
                            <rect x="50" y="10" width="30" height="40" fill="#bae6fd" stroke="#0284c7" />
                            <line x1="50" y1="5" x2="50" y2="55" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" />
                        </svg>
                    )
                });
            } else if (type === 'line-count') {
                const shapes = [
                    { name: 'Equilateral Triangle', lines: 3, svg: <polygon points="50,15 85,75 15,75" fill="#fef3c7" stroke="#d97706" /> },
                    { name: 'Square', lines: 4, svg: <rect x="25" y="25" width="50" height="50" fill="#fef3c7" stroke="#d97706" /> },
                    { name: 'Rectangle', lines: 2, svg: <rect x="20" y="30" width="60" height="40" fill="#fef3c7" stroke="#d97706" /> },
                    { name: 'Regular Hexagon', lines: 6, svg: <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="#fef3c7" stroke="#d97706" /> },
                    { name: 'Isosceles Triangle', lines: 1, svg: <polygon points="50,15 80,85 20,85" fill="#fef3c7" stroke="#d97706" /> },
                    { name: 'Circle', lines: Infinity, svg: <circle cx="50" cy="50" r="40" fill="#fef3c7" stroke="#d97706" /> },
                    { name: 'Parallelogram (General)', lines: 0, svg: <polygon points="30,30 90,30 70,70 10,70" fill="#fef3c7" stroke="#d97706" /> }
                ];
                const s = shapes[Math.floor(i / types.length) % shapes.length];
                const ansStr = s.lines === Infinity ? 'Infinite' : s.lines.toString();
                
                questions.push({
                    question: `How many lines of symmetry does a ${s.name} have?`,
                    options: s.lines === Infinity ? ['0', '2', '4', 'Infinite'] : ['0', '1', '2', '3', '4', '5', '6'].sort(() => Math.random() - 0.5).slice(0, 4),
                    correct: -1,
                    explanation: `A ${s.name} has ${ansStr} line(s) of symmetry.`,
                    svg: <svg viewBox="0 0 100 100" style={{ height: 120 }}>{s.svg}</svg>
                });
                if (!questions[questions.length-1].options.includes(ansStr)) {
                    questions[questions.length-1].options[0] = ansStr;
                }
                questions[questions.length-1].correct = questions[questions.length-1].options.indexOf(ansStr);
            } else if (type === 'reflection') {
                const letters = [
                    { l: 'A', sym: true, axis: 'Vertical' },
                    { l: 'H', sym: true, axis: 'Both' },
                    { l: 'M', sym: true, axis: 'Vertical' },
                    { l: 'B', sym: false, axis: 'Horizontal' }, // Horizontal only
                    { l: 'E', sym: false, axis: 'Horizontal' }, // Horizontal only
                    { l: 'F', sym: false, axis: 'None' },
                    { l: 'P', sym: false, axis: 'None' },
                    { l: 'X', sym: true, axis: 'Both' },
                    { l: 'T', sym: true, axis: 'Vertical' }
                ];
                const l = letters[Math.floor(i / types.length) % letters.length];
                const isVert = l.axis === 'Vertical' || l.axis === 'Both';

                questions.push({
                    question: `Does the letter '${l.l}' look the same in a vertical mirror reflection?`,
                    options: ['Yes', 'No', 'Only sometimes', 'Depends on font'],
                    correct: isVert ? 0 : 1,
                    explanation: isVert ? `Yes, '${l.l}' has vertical symmetry.` : `No, '${l.l}' does not have vertical symmetry.`,
                    svg: (
                        <svg viewBox="0 0 100 60" style={{ height: 100 }}>
                            <text x="30" y="45" fontSize="40" fontWeight="900" fill="#1e293b">{l.l}</text>
                            <line x1="50" y1="10" x2="50" y2="50" stroke="#94a3b8" strokeDasharray="2,2" />
                            <text x="70" y="45" fontSize="40" fontWeight="100" fill="#94a3b8" opacity="0.3" transform={isVert ? "" : "scale(-1, 1) translate(-140, 0)"}>{l.l}</text>
                        </svg>
                    )
                });
            } else {
                const objs = [
                    { name: 'Butterfly', type: 'Bilateral', icon: '🦋' },
                    { name: 'Starfish', type: 'Radial', icon: '⭐' },
                    { name: 'Maple Leaf', type: 'Bilateral', icon: '🍁' },
                    { name: 'Spider', type: 'Bilateral', icon: '🕷️' },
                    { name: 'Snowflake', type: 'Radial', icon: '❄️' }
                ];
                const o = objs[Math.floor(i / types.length) % objs.length];
                questions.push({
                    question: `What type of symmetry is most prominent in a ${o.name}?`,
                    options: ['Bilateral (Mirror)', 'Radial (Star)', 'No symmetry', 'Translational'],
                    correct: o.type === 'Bilateral' ? 0 : 1,
                    explanation: `A ${o.name} primarily shows ${o.type} symmetry.`,
                    svg: <div style={{ fontSize: 60, textAlign: 'center' }}>{o.icon}</div>
                });
            }
        } else if (skillType === 'pattern-observation') {
             const patterns = [
                 { name: 'Brick wall', repeat: 'Translation', color: '#b91c1c' },
                 { name: 'Tiled floor', repeat: 'Translation & Reflection', color: '#1d4ed8' },
                 { name: 'Honeycomb', repeat: 'Rotation & Translation', color: '#eab308' },
                 { name: 'Kaleidoscope', repeat: 'Multiple Reflections', color: '#d946ef' }
             ];
             const p = patterns[i % patterns.length];
             const qType = i % 2 === 0 ? 'transform' : 'unit';

             if (qType === 'transform') {
                 questions.push({
                    question: `In a ${p.name} pattern, how is the basic unit repeated?`,
                    options: ['Randomly', `By ${p.repeat}`, 'By size change only', 'It is not repeated'],
                    correct: 1,
                    explanation: `${p.name} patterns rely on ${p.repeat} to create a continuous design.`,
                    svg: (
                        <svg viewBox="0 0 100 60" style={{ height: 100 }}>
                            <rect width="100" height="60" fill={`${p.color}10`} />
                            {[0, 20, 40, 60, 80].map(x => (
                                <rect key={x} x={x+2} y="10" width="16" height="10" fill={p.color} opacity="0.6" />
                            ))}
                            {[10, 30, 50, 70, 90].map(x => (
                                <rect key={x} x={x-8} y="22" width="16" height="10" fill={p.color} opacity="0.6" />
                            ))}
                        </svg>
                    )
                 });
             } else {
                 questions.push({
                    question: `If you have a pattern and remove the 'Repeating Unit', what happens?`,
                    options: ['Nothing', 'The pattern remains', 'The pattern cannot exist', 'It gets larger'],
                    correct: 2,
                    explanation: 'A pattern is built from repeating units; without the unit, there is no pattern.',
                    svg: <div style={{ fontSize: 40, textAlign: 'center' }}>🧱 🧱 ? 🧱</div>
                 });
             }
        } else { // geometric-reasoning
            const poly = [
                { name: 'Square', order: 4, angle: 90 },
                { name: 'Equilateral Triangle', order: 3, angle: 120 },
                { name: 'Regular Pentagon', order: 5, angle: 72 },
                { name: 'Regular Hexagon', order: 6, angle: 60 }
            ];
            const p = poly[i % poly.length];
            const qVariant = i % 2 === 0 ? 'order' : 'angle';

            if (qVariant === 'order') {
                questions.push({
                    question: `What is the order of rotational symmetry for a ${p.name}?`,
                    options: ['2', '3', '4', '5', '6'].sort(() => Math.random() - 0.5).slice(0, 4),
                    correct: -1,
                    explanation: `A ${p.name} looks identical ${p.order} times during a full rotation.`,
                    svg: (
                        <svg viewBox="0 0 100 100" style={{ height: 100 }}>
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeDasharray="2,2" />
                            <text x="45" y="55" fontSize="20" fill="#94a3b8">⟳</text>
                        </svg>
                    )
                });
                const ansStr = p.order.toString();
                if (!questions[questions.length-1].options.includes(ansStr)) questions[questions.length-1].options[0] = ansStr;
                questions[questions.length-1].correct = questions[questions.length-1].options.indexOf(ansStr);
            } else {
                questions.push({
                    question: `To return a ${p.name} to its original look for the first time, you must turn it by:`,
                    options: [`$60^\circ$`, `$72^\circ$`, `$90^\circ$`, `$120^\circ$`, `$180^\circ$`],
                    correct: -1,
                    explanation: `A full turn ($360^\circ$) divided by the order (${p.order}) gives $${p.angle}^\circ$.`,
                    svg: (
                        <svg viewBox="0 0 100 100" style={{ height: 100 }}>
                            <path d="M 50 10 A 40 40 0 0 1 90 50" fill="none" stroke={i % 2 === 0 ? '#3b82f6' : '#ec4899'} strokeWidth="3" markerEnd="url(#arrowhead)" />
                            <defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill={i % 2 === 0 ? '#3b82f6' : '#ec4899'} /></marker></defs>
                        </svg>
                    )
                });
                const ansStr = `$${p.angle}^\circ$`;
                const filteredOpts = questions[questions.length-1].options.filter(o => o !== ansStr).sort(() => Math.random() - 0.5).slice(0, 3);
                questions[questions.length-1].options = [ansStr, ...filteredOpts].sort(() => Math.random() - 0.5);
                questions[questions.length-1].correct = questions[questions.length-1].options.indexOf(ansStr);
            }
        }
    }

    // Final shuffle to mixed questions if desired, but we keep order for consistency in practice
    return questions.slice(0, count);
}

// ─── CHAPTER TEST POOL (25 QUESTIONS) ──────────────────────────────────────────
export const CHAPTER_TEST_QUESTIONS = [
    // ─── VISUAL SYMMETRY & DEFINITIONS ──────────────────────────────────────
    {
        question: "Which of these capital letters has exactly TWO lines of symmetry?",
        options: ["A", "H", "M", "S"],
        correct: 1,
        explanation: "The letter **H** has one vertical and one horizontal line of symmetry. A and M have only one, and S has rotational symmetry but no lines of symmetry.",
        svg: (
            <svg viewBox="0 0 100 40" style={{ height: 60 }}>
                <text x="10" y="30" fontSize="24" fontWeight="900" fill="#1e293b">A</text>
                <text x="35" y="30" fontSize="24" fontWeight="900" fill="#1e293b">H</text>
                <text x="60" y="30" fontSize="24" fontWeight="900" fill="#1e293b">M</text>
                <text x="85" y="30" fontSize="24" fontWeight="900" fill="#1e293b">S</text>
            </svg>
        )
    },
    {
        question: "What is the imaginary line that divides a symmetrical shape into two matching halves?",
        options: ["Mirror Wall", "Axis of Rotation", "Line of Symmetry", "Dividing Mark"],
        correct: 2,
        explanation: "A Line of Symmetry acts like a mirror that splits a shape into identical halves.",
        svg: (
            <svg viewBox="0 0 100 60" style={{ height: 100 }}>
                <rect x="25" y="10" width="50" height="40" fill="#bae6fd" stroke="#0284c7" />
                <line x1="50" y1="5" x2="50" y2="55" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" />
            </svg>
        )
    },
    {
        question: "How many lines of symmetry does a regular hexagon have?",
        options: ["3", "4", "6", "12"],
        correct: 2,
        explanation: "A regular polygon with $n$ sides has $n$ lines of symmetry. A hexagon has 6.",
        svg: (
            <svg viewBox="0 0 100 100" style={{ height: 100 }}>
                <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="#fef3c7" stroke="#d97706" />
            </svg>
        )
    },
    {
        question: "Which of these polygons has NO lines of symmetry?",
        options: ["Square", "Rhombus", "Scalene Triangle", "Rectangle"],
        correct: 2,
        explanation: "A scalene triangle has no equal sides and no lines of symmetry.",
        svg: (
             <svg viewBox="0 0 100 100" style={{ height: 100 }}>
                <polygon points="20,20 80,40 40,90" fill="#fef3c7" stroke="#d97706" />
            </svg>
        )
    },
    {
        question: "Which shape has an infinite number of lines of symmetry?",
        options: ["Square", "Circle", "Rectangle", "Equilateral Triangle"],
        correct: 1,
        explanation: "Any diameter of a circle is a line of symmetry, so it has infinite lines.",
        svg: <svg viewBox="0 0 100 100" style={{ height: 100 }}><circle cx="50" cy="50" r="40" fill="#dcfce7" stroke="#16a34a" /></svg>
    },
    {
        question: "If a shape lacks any line of symmetry, it is described as:",
        options: ["Radial", "Asymmetrical", "Bilateral", "Rotational"],
        correct: 1,
        explanation: "Asymmetry means a lack of symmetry in any direction."
    },

    // ─── REFLECTIONS ──────────────────────────────────────────────────────────
    {
        question: "When you look at your left hand in a mirror, the image looks like:",
        options: ["An upside down hand", "A left hand", "A right hand", "An invisible hand"],
        correct: 2,
        explanation: "Mirror reflections show lateral inversion, making a left hand appear like a right hand.",
        svg: (
            <svg viewBox="0 0 100 60" style={{ height: 80 }}>
                <path d="M20,45 Q15,45 15,35 L15,20 Q15,15 20,15 L25,15 Q30,15 30,20 L30,45 Z" fill="#fbcfe8" />
                <line x1="50" y1="10" x2="50" y2="50" stroke="#94a3b8" strokeWidth="2" />
                <path d="M80,45 Q85,45 85,35 L85,20 Q85,15 80,15 L75,15 Q70,15 70,20 L70,45 Z" fill="#fbcfe8" opacity="0.5" />
            </svg>
        )
    },
    {
        question: "Which of these words looks the same in a mirror reflection?",
        options: ["MATH", "HELLO", "WOW", "BOOK"],
        correct: 2,
        explanation: "The letters W, O, W all have vertical symmetry, so WOW reads the same in a mirror.",
        svg: (
            <svg viewBox="0 0 100 40" style={{ height: 60 }}>
                <text x="20" y="30" fontSize="24" fontWeight="900" fill="#1e293b">WOW</text>
                <line x1="70" y1="5" x2="70" y2="35" stroke="#94a3b8" />
                <text x="75" y="30" fontSize="24" fontWeight="900" fill="#94a3b8" transform="scale(-1,1) translate(-170,0)">WOW</text>
            </svg>
        )
    },
    {
        question: "In a reflection, the distance between the object and the mirror is:",
        options: ["Double the image distance", "Equal to the image distance", "Less than the image distance", "Zero"],
        correct: 1,
        explanation: "An image in a mirror is exactly as far 'behind' the mirror as the object is in front of it.",
        svg: (
            <svg viewBox="0 0 100 60" style={{ height: 70 }}>
                <circle cx="20" cy="30" r="5" fill="#ef4444" />
                <line x1="50" y1="10" x2="50" y2="50" stroke="#000" strokeWidth="2" />
                <circle cx="80" cy="30" r="5" fill="#ef4444" opacity="0.4" />
                <line x1="20" y1="35" x2="80" y2="35" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
            </svg>
        )
    },
    {
        question: "Can double reflection across the same mirror line return an object to its original state?",
        options: ["Yes, always", "No, never", "Only for circles", "Only if it is small"],
        correct: 0,
        explanation: "Reflecting once flips it, reflecting again across the same line flips it back."
    },

    // ─── ROTATIONS ────────────────────────────────────────────────────────────
    {
        question: "What is the angle of rotation for a $1/2$ turn?",
        options: ["$90^\circ$", "$180^\circ$", "$270^\circ$", "$360^\circ$"],
        correct: 1,
        explanation: "A half circle turn is $180$ degrees.",
        svg: (
            <svg viewBox="0 0 100 100" style={{ height: 80 }}>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                <path d="M 50 10 A 40 40 0 0 1 50 90" fill="none" stroke="#ec4899" strokeWidth="4" />
            </svg>
        )
    },
    {
        question: "What is the order of rotational symmetry for a square?",
        options: ["1", "2", "3", "4"],
        correct: 3,
        explanation: "A square looks identical 4 times (at $90^\circ, 180^\circ, 270^\circ, 360^\circ$) during a full turn.",
        svg: <svg viewBox="0 0 100 100" style={{ height: 80 }}><rect x="25" y="25" width="50" height="50" fill="#bae6fd" stroke="#0284c7" /></svg>
    },
    {
        question: "An equilateral triangle looks the same for the first time after turning by:",
        options: ["$60^\circ$", "$90^\circ$", "$120^\circ$", "$180^\circ$"],
        correct: 2,
        explanation: "A $360^\circ$ full turn divided by order 3 equals $120^\circ$.",
        svg: <svg viewBox="0 0 100 100" style={{ height: 80 }}><polygon points="50,15 90,85 10,85" fill="#fef3c7" stroke="#d97706" /></svg>
    },
    {
        question: "Which of these numbers looks the same after a $1/2$ turn ($180^\circ$)?",
        options: ["6", "8", "9", "4"],
        correct: 1,
        explanation: "The number 8 remains 8 when rotated halfway around.",
        svg: (
            <svg viewBox="0 0 100 60" style={{ height: 60 }}>
               <text x="20" y="45" fontSize="40" fontWeight="900" fill="#1e293b">8</text>
               <path d="M50,30 A15,15 0 1 1 80,30" fill="none" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow-head)" />
               <text x="85" y="45" fontSize="40" fontWeight="900" fill="#1e293b" transform="rotate(180, 100, 30)">8</text>
               <defs><marker id="arrow-head" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/></marker></defs>
           </svg>
       )
    },
    {
        question: "Point symmetry is equivalent to which rotation?",
        options: ["$90^\circ$", "$180^\circ$", "$270^\circ$", "$360^\circ$"],
        correct: 1,
        explanation: "Point symmetry (symmetry about a point) is mathematically identical to a $180^\circ$ rotation."
    },

    // ─── PATTERNS & NATURE ──────────────────────────────────────────────────
    {
        question: "A daisy flower seen from the top usually displays which symmetry?",
        options: ["Bilateral", "Asymmetrical", "Radial", "Vertical only"],
        correct: 2,
        explanation: "Radial symmetry passes through many lines in the center, like petals around a disk.",
        svg: (
            <svg viewBox="0 0 100 100" style={{ height: 100 }}>
                <g transform="translate(50,50)">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                        <ellipse key={deg} rx="8" ry="30" fill="#fff" stroke="#e2e8f0" transform={`rotate(${deg})`} />
                    ))}
                    <circle r="10" fill="#facc15" stroke="#eab308" />
                </g>
            </svg>
        )
    },
    {
        question: "Which of these is a symmetrical 3D object?",
        options: ["A jagged mountain", "A perfect sphere", "A twisted tree", "A cloud"],
        correct: 1,
        explanation: "A sphere is perfectly symmetrical across any plane passing through its center."
    },
    {
        question: "In a brick wall pattern, the bricks are repeated using:",
        options: ["Shrinking", "Random placement", "Translation (sliding)", "Rotation only"],
        correct: 2,
        explanation: "Translation is the mathematical term for sliding a unit to different positions to create a pattern.",
        svg: (
             <svg viewBox="0 0 100 50" style={{ height: 80 }}>
                <rect x="5" y="5" width="25" height="15" fill="#f87171" stroke="#b91c1c" />
                <rect x="35" y="5" width="25" height="15" fill="#f87171" stroke="#b91c1c" />
                <rect x="65" y="5" width="25" height="15" fill="#f87171" stroke="#b91c1c" />
                <rect x="20" y="25" width="25" height="15" fill="#f87171" stroke="#b91c1c" />
            </svg>
        )
    },
    {
        question: "What type of symmetry is most prominent in a butterfly?",
        options: ["Bilateral", "Radial", "Spherical", "None"],
        correct: 0,
        explanation: "A butterfly has two matching halves separated by one vertical line (Bilateral symmetry).",
        svg: <div style={{ fontSize: 50, textAlign: 'center' }}>🦋</div>
    },

    // ─── MIXED CONCEPTS ──────────────────────────────────────────────────────
    {
        question: "How many lines of symmetry does a general parallelogram have?",
        options: ["0", "1", "2", "4"],
        correct: 0,
        explanation: "While a parallelogram has rotational symmetry, it has NO lines of symmetry unless it is a rectangle or rhombus.",
        svg: <svg viewBox="0 0 100 100" style={{ height: 100 }}><polygon points="30,30 90,30 70,70 10,70" fill="#bae6fd" stroke="#0284c7" /></svg>
    },
    {
        question: "If a shape has order 3 rotational symmetry, how many times will it look the same in one full turn?",
        options: ["1", "2", "3", "6"],
        correct: 2,
        explanation: "The order describes exactly how many times the shape repeats its look in $360^\circ$."
    },
    {
        question: "Which letter has ONLY a horizontal line of symmetry?",
        options: ["A", "M", "E", "W"],
        correct: 2,
        explanation: "A, M, and W have vertical lines. E has a horizontal line.",
        svg: (
             <svg viewBox="0 0 100 40" style={{ height: 50 }}>
                <text x="10" y="30" fontSize="24" fontWeight="100" fill="#94a3b8">A</text>
                <text x="35" y="30" fontSize="24" fontWeight="100" fill="#94a3b8">M</text>
                <text x="60" y="30" fontSize="24" fontWeight="900" fill="#1e293b">E</text>
                <text x="85" y="30" fontSize="24" fontWeight="100" fill="#94a3b8">W</text>
            </svg>
        )
    },
    {
        question: "Bilateral symmetry is also commonly known as:",
        options: ["Point Symmetry", "Mirror Symmetry", "Central Symmetry", "Radial Symmetry"],
        correct: 1,
        explanation: "It is called mirror symmetry because the two halves reflect each other."
    },
    {
        question: "A shape that looks identical after every $90^\circ$ turn has an order of:",
        options: ["2", "4", "8", "90"],
        correct: 1,
        explanation: "$360 / 90 = 4$."
    },
    {
        question: "How many lines of symmetry does the number **0** usually have?",
        options: ["0", "1", "2", "Infinite"],
        correct: 2,
        explanation: "An oval shape (typical 0) has one vertical and one horizontal line of symmetry.",
        svg: (
            <svg viewBox="0 0 100 60" style={{ height: 60 }}>
                <ellipse cx="50" cy="30" rx="15" ry="25" fill="none" stroke="#1e293b" strokeWidth="3" />
            </svg>
        )
    }
];
