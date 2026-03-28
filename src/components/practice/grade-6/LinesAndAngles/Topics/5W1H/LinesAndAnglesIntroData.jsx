// ─── SVG Illustrations for each card ─────────────────────────
const svgWhat = `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="40" x2="240" y2="40" stroke="#0891b2" stroke-width="3"/>
  <circle cx="40" cy="40" r="4" fill="#0891b2"/>
  <circle cx="240" cy="40" r="4" fill="#0891b2"/>
  <text x="140" y="32" font-size="14" font-weight="800" fill="#0891b2" text-anchor="middle" font-family="monospace">Line Segment AB</text>
  <text x="140" y="70" font-size="11" font-weight="600" fill="#64748b" text-anchor="middle">Building blocks: Points, Lines, Rays, and Segments</text>
</svg>`;

const svgWhy = (() => {
    return `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
      <polygon points="140,10 170,70 110,70" fill="#10b981" opacity="0.2" stroke="#10b981" stroke-width="2"/>
      <rect x="70" y="20" width="30" height="30" fill="#10b981" opacity="0.3" stroke="#10b981" stroke-width="2"/>
      <circle cx="210" cy="35" r="20" fill="#10b981" opacity="0.25" stroke="#10b981" stroke-width="2"/>
      <text x="140" y="76" text-anchor="middle" font-size="10" fill="#64748b" font-weight="600">They form 'Plane Geometry' leading to advanced shapes</text>
    </svg>`;
})();

const svgWho = (() => {
    return `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="140" cy="40" r="30" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4"/>
      <line x1="140" y1="40" x2="170" y2="40" stroke="#f59e0b" stroke-width="2"/>
      <text x="155" y="35" font-size="12" font-weight="800" fill="#f59e0b">360°</text>
      <text x="140" y="78" text-anchor="middle" font-size="10" fill="#64748b" font-weight="600">Babylonians (Base 60) and ancients who divided circles</text>
    </svg>`;
})();

const svgWhere = (() => {
    return `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="140" cy="40" r="25" fill="none" stroke="#ec4899" stroke-width="3"/>
      <line x1="140" y1="40" x2="140" y2="20" stroke="#ec4899" stroke-width="3" stroke-linecap="round"/>
      <line x1="140" y1="40" x2="160" y2="40" stroke="#ec4899" stroke-width="3" stroke-linecap="round"/>
      <text x="140" y="77" text-anchor="middle" font-size="10" fill="#64748b" font-weight="600">In clocks, open doors, scissor blades, and daily life</text>
    </svg>`;
})();

const svgWhen = (() => {
    return `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M 100 40 L 140 40 L 160 20" fill="none" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
      <path d="M 152 40 A 12 12 0 0 0 148 28" fill="none" stroke="#a855f7" stroke-width="2"/>
      <circle cx="140" cy="40" r="3" fill="#a855f7"/>
      <text x="140" y="76" text-anchor="middle" font-size="10" fill="#64748b" font-weight="600">When two rays rotate around a common vertex</text>
    </svg>`;
})();

const svgHow = (() => {
    return `<svg width="280" height="80" viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M 90 50 A 50 50 0 0 1 190 50 Z" fill="#0369a1" opacity="0.15" stroke="#0369a1" stroke-width="2"/>
        <line x1="140" y1="50" x2="140" y2="10" stroke="#0369a1" stroke-width="1.5" stroke-dasharray="3,3"/>
        <line x1="140" y1="50" x2="175" y2="15" stroke="#0369a1" stroke-width="1.5"/>
        <text x="140" y="74" text-anchor="middle" font-size="10" fill="#64748b" font-weight="600">Measuring with protractors in 360-degree units</text>
    </svg>`;
})();

export const cards5W1H = [
    {
        q: 'WHAT',
        label: 'What are Basic Geometrical Ideas?',
        icon: '📐',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.35)',
        svg: svgWhat,
        content: `Geometry starts with the simplest concepts: a **Point** determines a location, a **Line Segment** is the shortest distance between two points, a **Line** extends forever, and a **Ray** starts at one point and goes on seamlessly.`,
        fact: '💡 These ideas form the fundamental building blocks of the entire universe of geometry!',
    },
    {
        q: 'WHY',
        label: 'Why study lines and angles?',
        icon: '🚀',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.35)',
        svg: svgWhy,
        content: `They form the core of "Plane Geometry". Understanding lines and how they intersect to form angles gives us the power to construct, analyze, and comprehend complex shapes, from basic polygons to amazing architectural structures.`,
        fact: '💡 Without angles, we wouldn\'t have squares, triangles, or any straight-edged mathematical shapes!',
    },
    {
        q: 'WHO',
        label: 'Who discovered angles?',
        icon: '🏺',
        gradFrom: '#b45309',
        gradTo: '#f59e0b',
        shadow: 'rgba(245,158,11,0.35)',
        svg: svgWho,
        content: `The division of a circle into $360$ parts goes back thousands of years. The Rigveda spoke of a wheel with 360 spokes. Ancient Babylonians used base-60 math, helping establish circles into 360 degrees, a tradition matching the $~360$ days in a year!`,
        fact: '💡 $360$ is highly divisible (by 2, 3, 4, 5, 6, 8, 9, 10, 12, etc.), making it incredibly useful for math!',
    },
    {
        q: 'WHERE',
        label: 'Where are they found?',
        icon: '🌍',
        gradFrom: '#be185d',
        gradTo: '#ec4899',
        shadow: 'rgba(236,72,153,0.35)',
        svg: svgWhere,
        content: `Angles are found literally everywhere! Look at the hands of a clock forming different angles over time, an open door rotating against a wall, a pair of scissors, or even a toy ramp with a steep slope.`,
        fact: '💡 The amount a door is opened directly represents the exact measure of an angle!',
    },
    {
        q: 'WHEN',
        label: 'When does an angle form?',
        icon: '🔄',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.35)',
        svg: svgWhen,
        content: `An angle is formed when two **rays** originate from a common starting point (the **vertex**). The size of an angle is practically the amount of 'turn' or 'rotation' needed to move one ray onto the other.`,
        fact: '💡 Even animals opening their mouths create vivid examples of varying angles!',
    },
    {
        q: 'HOW',
        label: 'How do we measure them?',
        icon: '📏',
        gradFrom: '#0369a1',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.35)',
        svg: svgHow,
        content: `We quantify angles by assigning a number based on $360$ equal unit parts of a circle, known as degrees ($^\\circ$). We use a **Protractor**—which is half a circle marked up to $180^\\circ$—to precisely measure these rotations.`,
        fact: '💡 You can even verify if angles are identical simply by superimposing them using tracing paper!',
    },
];
