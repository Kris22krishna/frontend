import React from 'react';

/* ─── 1.1: Dissolving Salt ─────────────────────────── */
export function DissolveScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    return (
        <svg viewBox="0 0 280 280" style={{ width: '100%', height: '100%', maxHeight: 300 }}>
            <style>{`
                @keyframes saltFall {
                    0% { transform: translateY(-50px); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: translateY(120px); opacity: 0; }
                }
                @keyframes particleVibrate {
                    0%, 100% { transform: translate(0,0); }
                    50% { transform: translate(1px, 1px); }
                }
                @keyframes waterSway {
                    0%, 100% { d: path("M40 120 Q140 115 240 120 L240 240 Q140 245 40 240 Z"); }
                    50% { d: path("M40 125 Q140 130 240 125 L240 240 Q140 245 40 240 Z"); }
                }
            `}</style>
            
            {/* Lab Bench */}
            <rect x="10" y="250" width="260" height="10" fill="#cbd5e1" rx="5" />

            {/* Beaker */}
            <path d="M60 60 L60 230 Q60 245 75 245 L205 245 Q220 245 220 230 L220 60" 
                fill="none" stroke="#94a3b8" strokeWidth="3" />
            <rect x="52" y="50" width="176" height="12" fill="#94a3b8" rx="4" />

            {/* Water */}
            <path d="M63 130 Q140 125 217 130 L217 242 L63 242 Z" fill="#bae6fd" opacity="0.6">
                <animate attributeName="d" 
                    values="M63 130 Q140 125 217 130 L217 242 L63 242 Z; M63 128 Q140 132 217 128 L217 242 L63 242 Z; M63 130 Q140 125 217 130 L217 242 L63 242 Z" 
                    dur="3s" repeatCount="indefinite" />
            </path>

            {/* Salt Particles Falling */}
            {isRunning && Array.from({ length: 15 }).map((_, i) => (
                <circle key={i} r="2" fill="#fff" stroke="#e2e8f0" strokeWidth="0.5"
                    style={{
                        cx: 100 + Math.random() * 80,
                        animation: `saltFall 1.5s ${i * 0.1}s infinite linear`
                    }}
                />
            ))}

            {/* Dissolved State (Invisible but conceptually present) */}
            {isDone && (
                <text x="140" y="180" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="800" opacity="0.6">
                    Salt particles occupy molecular spaces
                </text>
            )}

            {/* Glass Rod (Static) */}
            <rect x="135" y="40" width="5" height="140" fill="rgba(255,255,255,0.4)" stroke="#94a3b8" strokeWidth="0.5" rx="2" 
                style={{ transformOrigin: '137px 40px', transform: isRunning ? 'rotate(10deg)' : 'none', transition: 'transform 0.5s' }} />
        </svg>
    );
}

/* ─── 1.3: Particles are Moving ───────────────────── */
export function MotionScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    return (
        <svg viewBox="0 0 280 280" style={{ width: '100%', height: '100%', maxHeight: 300 }}>
            <style>{`
                @keyframes smokeRise {
                    0% { transform: translate(0,0) scale(1); opacity: 0.8; }
                    100% { transform: translate(var(--dx), -150px) scale(2); opacity: 0; }
                }
                @keyframes fireWobble {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1, 0.9); }
                }
            `}</style>

            {/* Incense Stick Holder */}
            <rect x="130" y="240" width="20" height="10" fill="#475569" rx="2" />
            
            {/* Incense Stick */}
            <line x1="140" y1="240" x2="140" y2="160" stroke="#78350f" strokeWidth="3" />

            {/* Unlit/Lit Tip */}
            <circle cx="140" cy="160" r="3" fill={isRunning || isDone ? '#ef4444' : '#451a03'} />

            {/* Fire (only while running) */}
            {isRunning && (
                <path d="M138 160 Q140 145 142 160 Z" fill="#fbbf24" style={{ transformOrigin: '140px 160px', animation: 'fireWobble 0.3s infinite' }} />
            )}

            {/* Smoke Plumes */}
            {(isRunning || isDone) && Array.from({ length: 8 }).map((_, i) => (
                <circle key={i} r="6" fill="#e2e8f0" opacity="0.5"
                    style={{
                        cx: 140,
                        cy: 155,
                        '--dx': `${(i % 2 === 0 ? 1 : -1) * (20 + i * 10)}px`,
                        animation: `smokeRise ${2 + i * 0.5}s ${i * 0.3}s infinite ease-out`
                    }}
                />
            ))}

            {isDone && (
                <g>
                    <text x="200" y="80" fill="#1e293b" fontSize="10" fontWeight="700">Smell reaches here!</text>
                    <path d="M160 100 Q180 90 200 100" stroke="#94a3b8" fill="none" strokeDasharray="4,2" />
                </g>
            )}
        </svg>
    );
}

/* ─── 1.9: Compressibility ────────────────────────── */
export function CompressScene({ phase }) {
    const isRunning = phase === 'running';
    const activeY = isRunning ? 180 : 80; // Only gas moves much
    
    return (
        <svg viewBox="0 0 300 280" style={{ width: '100%', height: '100%', maxHeight: 300 }}>
            {/* 3 Syringes side by side */}
            <style>{`
                .piston { transition: transform 2s ease-in-out; }
            `}</style>

            {/* Labeling */}
            <text x="50" y="260" textAnchor="middle" fontSize="10" fontWeight="800" fill="#475569">CHALK</text>
            <text x="150" y="260" textAnchor="middle" fontSize="10" fontWeight="800" fill="#475569">WATER</text>
            <text x="250" y="260" textAnchor="middle" fontSize="10" fontWeight="800" fill="#475569">AIR</text>

            {/* Syringe 1: Chalk (Solid) */}
            <g transform="translate(30, 40)">
                <rect x="0" y="0" width="40" height="200" fill="rgba(226,232,240,0.3)" stroke="#94a3b8" />
                <rect x="2" y="160" width="36" height="38" fill="#e2e8f0" /> {/* Chalk block */}
                <rect className="piston" x="5" y="0" width="30" height="155" fill="#64748b" 
                    style={{ transform: isRunning ? 'translateY(5px)' : 'none' }} />
                <rect x="-5" y="0" width="50" height="5" fill="#475569" style={{ transform: isRunning ? 'translateY(5px)' : 'none' }} className="piston" />
            </g>

            {/* Syringe 2: Water (Liquid) */}
            <g transform="translate(130, 40)">
                <rect x="0" y="0" width="40" height="200" fill="rgba(226,232,240,0.3)" stroke="#94a3b8" />
                <rect x="2" y="100" width="36" height="98" fill="#bae6fd" /> {/* Water */}
                <rect className="piston" x="5" y="0" width="30" height="95" fill="#64748b" 
                    style={{ transform: isRunning ? 'translateY(3px)' : 'none' }} />
                <rect x="-5" y="0" width="50" height="5" fill="#475569" style={{ transform: isRunning ? 'translateY(3px)' : 'none' }} className="piston" />
            </g>

            {/* Syringe 3: Air (Gas) */}
            <g transform="translate(230, 40)">
                <rect x="0" y="0" width="40" height="200" fill="rgba(226,232,240,0.3)" stroke="#94a3b8" />
                {/* Air particles */}
                {Array.from({ length: 10 }).map((_, i) => (
                    <circle key={i} r="2" fill="#94a3b8" opacity={isRunning ? 1 : 0.4}
                        cx={5 + Math.random() * 30}
                        cy={isRunning ? 170 + Math.random() * 25 : 50 + Math.random() * 140}
                        style={{ transition: 'all 2s' }}
                    />
                ))}
                <rect className="piston" x="5" y="-120" width="30" height="200" fill="#64748b" 
                    style={{ transform: isRunning ? 'translateY(285px)' : 'none' }} />
                <rect x="-5" y="0" width="50" height="5" fill="#475569" style={{ transform: isRunning ? 'translateY(165px)' : 'none', transition: 'transform 2s' }} />
            </g>
        </svg>
    );
}

/* ─── 1.14: Sublimation ────────────────────────────── */
export function SublimeScene({ phase }) {
    const isRunning = phase === 'running';
    const isDone = phase === 'done';

    return (
        <svg viewBox="0 0 280 280" style={{ width: '100%', height: '100%', maxHeight: 300 }}>
            <style>{`
                @keyframes vaporRise {
                    0% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { transform: translateY(-60px); opacity: 0; }
                }
                @keyframes flameFlicker {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1, 0.9); opacity: 1; }
                }
            `}</style>

            {/* Tripod Stand */}
            <path d="M80 250 L100 180 L180 180 L200 250" stroke="#475569" strokeWidth="4" fill="none" />
            <line x1="100" y1="180" x2="180" y2="180" stroke="#475569" strokeWidth="5" />

            {/* Burner */}
            <rect x="130" y="210" width="20" height="40" fill="#94a3b8" />
            {isRunning && (
                <path d="M130 210 Q140 180 150 210 Z" fill="#3b82f6" style={{ transformOrigin: '140px 210px', animation: 'flameFlicker 0.2s infinite' }} />
            )}

            {/* China Dish */}
            <path d="M100 180 Q100 200 140 200 Q180 200 180 180 Z" fill="#f8fafc" stroke="#94a3b8" />
            
            {/* Ammonium Chloride (Solid) */}
            {!isDone && (
                <ellipse cx="140" cy="192" rx="25" ry="5" fill="#e2e8f0" />
            )}

            {/* Inverted Funnel */}
            <path d="M105 180 L135 100 L145 100 L175 180 Z" fill="rgba(255,255,255,0.2)" stroke="#94a3b8" />
            <rect x="135" y="80" width="10" height="20" fill="rgba(255,255,255,0.2)" stroke="#94a3b8" />
            
            {/* Cotton Plug */}
            <circle cx="140" cy="80" r="6" fill="#fff" />

            {/* Sublimation Vapors */}
            {isRunning && Array.from({ length: 6 }).map((_, i) => (
                <ellipse key={i} rx="15" ry="8" fill="#fff" opacity="0.3"
                    style={{
                        cx: 140,
                        cy: 170,
                        animation: `vaporRise 2s ${i * 0.4}s infinite ease-out`
                    }}
                />
            ))}

            {/* Deposited Solid */}
            {isDone && (
                <g>
                    <path d="M115 155 Q125 145 130 130" stroke="#fff" strokeWidth="4" opacity="0.8" />
                    <path d="M165 155 Q155 145 150 130" stroke="#fff" strokeWidth="4" opacity="0.8" />
                    <text x="210" y="130" fill="#475569" fontSize="10" fontWeight="800">Solidened Vapor</text>
                </g>
            )}
        </svg>
    );
}
