import React from 'react';

// Vocabulary Visuals
export const DadajiVisual = () => (
    <svg viewBox="0 0 200 200" width="100%" height="200px" style={{ background: '#f8fafc', borderRadius: '16px' }}>
        <circle cx="100" cy="100" r="80" fill="#e0e7ff" />
        <circle cx="100" cy="70" r="30" fill="#fcd34d" />
        <rect x="75" y="110" width="50" height="60" fill="#818cf8" rx="10" />
        <path d="M 100 85 Q 120 100 100 115" fill="none" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
        <text x="100" y="180" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#4f46e5">Dadaji (Grandfather)</text>
    </svg>
);

export const DadijiVisual = () => (
    <svg viewBox="0 0 200 200" width="100%" height="200px" style={{ background: '#f8fafc', borderRadius: '16px' }}>
        <circle cx="100" cy="100" r="80" fill="#fce7f3" />
        <circle cx="100" cy="70" r="30" fill="#fcd34d" />
        <circle cx="100" cy="35" r="15" fill="#9ca3af" /> {/* Hair bun */}
        <rect x="75" y="110" width="50" height="60" fill="#f472b6" rx="10" />
        <text x="100" y="180" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#db2777">Dadiji (Grandmother)</text>
    </svg>
);

export const ChhupanVisual = () => (
    <svg viewBox="0 0 200 200" width="100%" height="200px" style={{ background: '#f8fafc', borderRadius: '16px' }}>
        <rect x="0" y="150" width="200" height="50" fill="#dcfce7" /> {/* Grass */}
        <rect x="40" y="60" width="60" height="100" fill="#8b5cf6" rx="5" /> {/* Tree trunk/obstacle */}
        <circle cx="70" cy="40" r="40" fill="#22c55e" /> {/* Leaves */}
        <circle cx="140" cy="120" r="20" fill="#fcd34d" /> {/* Kid hiding */}
        <path d="M 130 140 Q 140 160 150 140" fill="none" stroke="#f59e0b" strokeWidth="3" />
        <text x="100" y="180" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#15803d">Chhupan-Chhupai</text>
    </svg>
);

export const AntakshariVisual = () => (
    <svg viewBox="0 0 200 200" width="100%" height="200px" style={{ background: '#f8fafc', borderRadius: '16px' }}>
        <circle cx="100" cy="100" r="80" fill="#fef08a" />
        <text x="70" y="110" fontSize="40">🎤</text>
        <text x="120" y="80" fontSize="30">🎵</text>
        <text x="140" y="130" fontSize="25">🎶</text>
        <text x="100" y="180" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ca8a04">Singing Game</text>
    </svg>
);

export const RangoliVisual = () => (
    <svg viewBox="0 0 200 200" width="100%" height="200px" style={{ background: '#f8fafc', borderRadius: '16px' }}>
        <circle cx="100" cy="100" r="70" fill="#fde047" />
        <circle cx="100" cy="100" r="50" fill="#ef4444" />
        <circle cx="100" cy="100" r="30" fill="#3b82f6" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <circle key={angle} cx={100 + Math.cos(angle * Math.PI / 180) * 80} cy={100 + Math.sin(angle * Math.PI / 180) * 80} r="10" fill="#10b981" />
        ))}
        <text x="100" y="195" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#b91c1c">Colorful Pattern</text>
    </svg>
);

export const MausiVisual = () => (
    <svg viewBox="0 0 200 200" width="100%" height="200px" style={{ background: '#f8fafc', borderRadius: '16px' }}>
        <circle cx="100" cy="100" r="80" fill="#e0f2fe" />
        <circle cx="100" cy="70" r="25" fill="#fcd34d" />
        <path d="M 80 160 Q 100 110 120 160" fill="#ef4444" /> {/* Dress */}
        <text x="100" y="180" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0369a1">Mausi (Aunt)</text>
    </svg>
);


// Core Activities / Skills Visuals
export const PlayingTogetherVisual = () => (
    <svg viewBox="0 0 300 200" width="100%" height="200px" style={{ background: '#f0f9ff', borderRadius: '16px' }}>
        <rect x="0" y="150" width="300" height="50" fill="#dcfce7" />
        <circle cx="80" cy="120" r="25" fill="#fcd34d" />
        <path d="M 60 180 Q 80 140 100 180" fill="#3b82f6" />
        <circle cx="220" cy="110" r="20" fill="#fcd34d" />
        <path d="M 205 180 Q 220 140 235 180" fill="#ec4899" />
        <circle cx="150" cy="130" r="15" fill="#ef4444" /> {/* Ball */}
        <text x="150" y="190" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0369a1">Families playing and bonding</text>
    </svg>
);

export const HelpingOutVisual = () => (
    <svg viewBox="0 0 300 200" width="100%" height="200px" style={{ background: '#fdf4ff', borderRadius: '16px' }}>
        <rect x="50" y="80" width="80" height="100" fill="#d1d5db" /> {/* Fridge/cabinet */}
        <circle cx="180" cy="90" r="20" fill="#fcd34d" /> {/* Parent */}
        <rect x="165" y="115" width="30" height="65" fill="#8b5cf6" />
        <circle cx="240" cy="110" r="15" fill="#fcd34d" /> {/* Child */}
        <rect x="230" y="130" width="20" height="50" fill="#34d399" />
        <text x="150" y="195" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7e22ce">Helping with chores</text>
    </svg>
);

export const AnimalsVisual = () => (
    <svg viewBox="0 0 300 200" width="100%" height="200px" style={{ background: '#f0fdf4', borderRadius: '16px' }}>
        <rect x="0" y="150" width="300" height="50" fill="#bbf7d0" />
        <circle cx="100" cy="100" r="25" fill="#fcd34d" /> {/* Kid */}
        <path d="M 80 180 Q 100 130 120 180" fill="#3b82f6" />
        <path d="M 180 150 Q 200 130 220 150 L 220 180 L 180 180 Z" fill="#9ca3af" /> {/* Dog body */}
        <circle cx="220" cy="135" r="15" fill="#9ca3af" /> {/* Dog head */}
        <circle cx="225" cy="130" r="2" fill="#000" />
        <text x="150" y="195" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#166534">Caring for Animals</text>
    </svg>
);

export const FestivalsVisual = () => (
    <svg viewBox="0 0 300 200" width="100%" height="200px" style={{ background: '#fffbeb', borderRadius: '16px' }}>
        <path d="M 50 50 Q 150 30 250 50" fill="none" stroke="#fcd34d" strokeWidth="2" /> {/* Banner string */}
        {[80, 150, 220].map(x => <polygon key={x} points={`${x},50 ${x-15},80 ${x+15},80`} fill="#ef4444" />)}
        <circle cx="150" cy="120" r="40" fill="#fde047" /> {/* Sweets plate */}
        <circle cx="130" cy="110" r="10" fill="#f59e0b" />
        <circle cx="150" cy="130" r="10" fill="#f59e0b" />
        <circle cx="170" cy="110" r="10" fill="#f59e0b" />
        <text x="150" y="190" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#b45309">Celebrating Together</text>
    </svg>
);

export const RainyDayVisual = () => (
    <svg viewBox="0 0 300 200" width="100%" height="200px" style={{ background: '#e0f2fe', borderRadius: '16px' }}>
        <path d="M 100 80 Q 130 50 160 80 Q 190 50 220 80 Q 240 100 220 120 L 100 120 Q 80 100 100 80" fill="#bae6fd" /> {/* Cloud */}
        <path d="M 120 130 L 110 150 M 150 130 L 140 150 M 180 130 L 170 150 M 210 130 L 200 150" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4,4" />
        <circle cx="80" cy="160" r="20" fill="#fcd34d" />
        <rect x="65" y="180" width="30" height="20" fill="#ef4444" />
        <path d="M 80 180 L 60 140 L 100 140 Z" fill="#ec4899" opacity="0.8" /> {/* Umbrella */}
        <text x="150" y="195" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0369a1">Enjoying the Rain</text>
    </svg>
);

export const FamilyRolesVisual = () => (
    <svg viewBox="0 0 300 200" width="100%" height="200px" style={{ background: '#fdf2f8', borderRadius: '16px' }}>
        <circle cx="100" cy="80" r="25" fill="#fcd34d" />
        <rect x="85" y="110" width="30" height="50" fill="#3b82f6" />
        <circle cx="200" cy="90" r="20" fill="#fcd34d" />
        <rect x="185" y="115" width="30" height="45" fill="#ec4899" />
        <circle cx="150" cy="130" r="15" fill="#fcd34d" />
        <rect x="140" y="150" width="20" height="30" fill="#22c55e" />
        <text x="150" y="190" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#be185d">Understanding Family Roles</text>
    </svg>
);

export function getTermVisual(name) {
    if (name.includes('Dadaji')) return <DadajiVisual />;
    if (name.includes('Chhupan')) return <ChhupanVisual />;
    if (name.includes('Antakshari')) return <AntakshariVisual />;
    if (name.includes('Rangoli')) return <RangoliVisual />;
    if (name.includes('Mausi')) return <MausiVisual />;
    return <DadijiVisual />;
}

export function getActivityVisual(title) {
    if (title.includes('Playing')) return <PlayingTogetherVisual />;
    if (title.includes('Helping')) return <HelpingOutVisual />;
    if (title.includes('Animals')) return <AnimalsVisual />;
    if (title.includes('Festivals')) return <FestivalsVisual />;
    if (title.includes('Rainy')) return <RainyDayVisual />;
    return <PlayingTogetherVisual />;
}

export function getSkillVisual(skillId) {
    if (skillId === 'family-roles') return <FamilyRolesVisual />;
    if (skillId === 'playing-together') return <PlayingTogetherVisual />;
    if (skillId === 'helping-out') return <HelpingOutVisual />;
    if (skillId === 'animals-surroundings') return <AnimalsVisual />;
    return <FamilyRolesVisual />;
}
