import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowRight, Timer, Trophy, Star, ChevronLeft, RefreshCw, FileText, Check, X, Eye, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';
import Navbar from '@/components/Navbar';
import { TOPIC_CONFIGS } from '@/lib/topicConfig';
import { LatexText } from '@/components/LatexText';
import ExplanationModal from '@/components/ExplanationModal';
import StickerExit from '@/components/StickerExit';
import mascotImg from '@/assets/mascot.png';
import avatarImg from '@/assets/avatar.png';
import '@/pages/juniors/class-1/Grade1Practice.css';

const PencilSVG = ({ length, color, isVertical }) => (
    <svg width={isVertical ? 80 : length} height={isVertical ? length : 80} viewBox={`0 0 ${isVertical ? 80 : length} ${isVertical ? length : 80}`}>
        {isVertical ? (
            <g transform={`translate(20, 0)`}>
                <rect x="0" y="20" width="40" height={length - 40} fill={color} />
                <path d={`M 0 20 L 20 0 L 40 20 Z`} fill="#f3d2a2" />
                <path d={`M 15 5 L 20 0 L 25 5 Z`} fill="#333" />
                <rect x="0" y={length - 20} width="40" height="20" fill="#FFB6C1" rx="5" />
                <rect x="0" y={length - 25} width="40" height="5" fill="#C0C0C0" />
            </g>
        ) : (
            <g transform={`translate(0, 20)`}>
                <rect x="20" y="0" width={length - 40} height="40" fill={color} />
                <path d={`M ${length - 20} 0 L ${length} 20 L ${length - 20} 40 Z`} fill="#f3d2a2" />
                <path d={`M ${length - 5} 15 L ${length} 20 L ${length - 5} 25 Z`} fill="#333" />
                <rect x="0" y="0" width="20" height="40" fill="#FFB6C1" rx="5" />
                <rect x="15" y="0" width="5" height="40" fill="#C0C0C0" />
            </g>
        )}
    </svg>
);

const RibbonSVG = ({ length, color, isVertical }) => (
    <svg width={isVertical ? 60 : length} height={isVertical ? length : 60} viewBox={`0 0 ${isVertical ? 60 : length} ${isVertical ? length : 60}`}>
        <defs>
            <pattern id="ribbonPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="3" fill="rgba(255,255,255,0.4)" />
            </pattern>
        </defs>
        {isVertical ? (
            <g>
                <rect x="15" y="0" width="30" height={length} fill={color} rx="15" />
                <rect x="15" y="0" width="30" height={length} fill="url(#ribbonPattern)" rx="15" />
                <path d={`M 10 0 L 50 0 M 10 ${length} L 50 ${length}`} stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            </g>
        ) : (
            <g>
                <rect x="0" y="15" width={length} height="30" fill={color} rx="15" />
                <rect x="0" y="15" width={length} height="30" fill="url(#ribbonPattern)" rx="15" />
                <path d={`M 0 10 L 0 50 M ${length} 10 L ${length} 50`} stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            </g>
        )}
    </svg>
);

const SnakeSVG = ({ length, color, isVertical }) => {
    const segments = Math.floor(length / 40);
    return (
        <svg width={isVertical ? 60 : length} height={isVertical ? length : 60} viewBox={`0 0 ${isVertical ? 60 : length} ${isVertical ? length : 60}`}>
            {Array.from({ length: segments }).map((_, i) => (
                <circle
                    key={i}
                    cx={isVertical ? 30 : 20 + i * 35}
                    cy={isVertical ? 20 + i * 35 : 30}
                    r={i === 0 ? 18 : 15}
                    fill={color}
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="1"
                />
            ))}
            {/* Eyes for the head (first segment) */}
            <circle cx={isVertical ? 23 : 15} cy={isVertical ? 15 : 23} r="2" fill="white" />
            <circle cx={isVertical ? 37 : 15} cy={isVertical ? 15 : 37} r="2" fill="white" />
        </svg>
    );
};

const BuildingSVG = ({ height, color }) => (
    <svg width="100" height={height} viewBox={`0 0 100 ${height}`}>
        <rect x="20" y="0" width="60" height={height} fill={color} rx="5" />
        {Array.from({ length: Math.floor(height / 40) }).map((_, i) => (
            <g key={i} transform={`translate(30, ${20 + i * 40})`}>
                <rect x="0" y="0" width="15" height="15" fill="#E2E8F0" rx="2" />
                <rect x="25" y="0" width="15" height="15" fill="#E2E8F0" rx="2" />
            </g>
        ))}
        <rect x="35" y={height - 30} width="30" height="30" fill="#4B5563" rx="2" />
    </svg>
);

const CaterpillarSVG = ({ length, color }) => {
    const segments = Math.floor(length / 30);
    return (
        <svg width={length} height="60" viewBox={`0 0 ${length} 60`}>
            {Array.from({ length: segments }).map((_, i) => (
                <circle key={i} cx={20 + i * 25} cy="30" r={i === 0 ? 15 : 12} fill={color} stroke="rgba(0,0,0,0.1)" />
            ))}
            <circle cx="15" cy="27" r="2" fill="white" />
            <circle cx="25" cy="27" r="2" fill="white" />
            <path d="M 12 18 Q 15 10 18 18" fill="none" stroke="#333" strokeWidth="2" />
            <path d="M 22 18 Q 25 10 28 18" fill="none" stroke="#333" strokeWidth="2" />
        </svg>
    );
};

const RopeSVG = ({ length, color, isVertical }) => (
    <svg width={isVertical ? 40 : length} height={isVertical ? length : 40} viewBox={`0 0 ${isVertical ? 40 : length} ${isVertical ? length : 40}`}>
        <path d={isVertical ? `M 20 0 L 20 ${length}` : `M 0 20 L ${length} 20`} stroke={color} strokeWidth="12" strokeDasharray="10 5" strokeLinecap="round" />
        <path d={isVertical ? `M 20 0 L 20 ${length}` : `M 0 20 L ${length} 20`} stroke="rgba(255,255,255,0.3)" strokeWidth="4" strokeLinecap="round" />
    </svg>
);

const LadderSVG = ({ height, color }) => (
    <svg width="80" height={height} viewBox={`0 0 80 ${height}`}>
        <rect x="25" y="0" width="6" height={height} fill={color} rx="3" />
        <rect x="55" y="0" width="6" height={height} fill={color} rx="3" />
        {Array.from({ length: Math.floor(height / 40) }).map((_, i) => (
            <rect key={i} x="28" y={30 + i * 40} width="30" height="4" fill={color} rx="2" />
        ))}
    </svg>
);

const LampPostSVG = ({ height, color }) => (
    <svg width="80" height={height} viewBox={`0 0 80 ${height}`}>
        <rect x="35" y="40" width="10" height={height - 40} fill="#4B5563" />
        <circle cx="40" cy="40" r="25" fill="#FDE047" stroke="#EAB308" strokeWidth="3" />
        <path d="M 40 15 L 40 40 M 15 40 L 65 40" stroke="#333" strokeWidth="2" opacity="0.5" />
    </svg>
);

const BucketSVG = ({ fill, waterColor = '#3498db' }) => (
    <svg width="80" height="120" viewBox="0 0 100 120">
        <defs>
            <clipPath id="bucketClip">
                <path d="M 20 20 L 80 20 L 70 110 L 30 110 Z" />
            </clipPath>
        </defs>
        {/* Handle */}
        <path d="M 20 30 Q 50 0 80 30" fill="none" stroke="#64748b" strokeWidth="4" />
        {/* Fill */}
        <rect x="0" y={110 - (fill * 0.9)} width="100" height="120" fill={waterColor} clipPath="url(#bucketClip)" />
        {/* Outline */}
        <path d="M 20 20 L 80 20 L 70 110 L 30 110 Z" fill="none" stroke="#64748b" strokeWidth="6" strokeLinejoin="round" />
    </svg>
);

const MugSVG = ({ fill, waterColor = '#3498db' }) => (
    <svg width="80" height="100" viewBox="0 0 100 100">
        <defs>
            <clipPath id="mugClip">
                <rect x="25" y="25" width="50" height="65" rx="5" />
            </clipPath>
        </defs>
        {/* Handle */}
        <path d="M 75 40 Q 95 40 95 55 Q 95 70 75 70" fill="none" stroke="#64748b" strokeWidth="6" />
        {/* Fill */}
        <rect x="0" y={90 - (fill * 0.65)} width="100" height="100" fill={waterColor} clipPath="url(#mugClip)" />
        {/* Outline */}
        <rect x="25" y="25" width="50" height="65" rx="5" fill="none" stroke="#64748b" strokeWidth="6" />
    </svg>
);

const JugSVG = ({ fill, waterColor = '#3498db' }) => (
    <svg width="80" height="120" viewBox="0 0 100 120">
        <defs>
            <clipPath id="jugClip">
                <path d="M 30 20 L 70 20 Q 85 20 85 40 L 85 95 Q 85 110 70 110 L 30 110 Q 15 110 15 95 L 15 40 Q 15 20 30 20" />
            </clipPath>
        </defs>
        {/* Spout */}
        <path d="M 30 20 L 10 15 L 15 35" fill="#64748b" />
        {/* Handle */}
        <path d="M 85 35 Q 105 35 105 65 Q 105 95 85 95" fill="none" stroke="#64748b" strokeWidth="6" />
        {/* Fill */}
        <rect x="0" y={110 - (fill * 0.9)} width="120" height="120" fill={waterColor} clipPath="url(#jugClip)" />
        {/* Outline */}
        <path d="M 30 20 L 70 20 Q 85 20 85 40 L 85 95 Q 85 110 70 110 L 30 110 Q 15 110 15 95 L 15 40 Q 15 20 30 20" fill="none" stroke="#64748b" strokeWidth="6" />
    </svg>
);

const GlassSVG = ({ fill, waterColor = '#3498db' }) => (
    <svg width="60" height="120" viewBox="0 0 60 120">
        <defs>
            <clipPath id="glassClip">
                <path d="M 10 10 L 50 10 L 45 110 L 15 110 Z" />
            </clipPath>
        </defs>
        {/* Fill */}
        <rect x="0" y={110 - fill} width="60" height="120" fill={waterColor} clipPath="url(#glassClip)" />
        {/* Outline */}
        <path d="M 10 10 L 50 10 L 45 110 L 15 110 Z" fill="none" stroke="#64748b" strokeWidth="4" />
    </svg>
);

const PotSVG = ({ fill, waterColor = '#3498db' }) => (
    <svg width="100" height="100" viewBox="0 0 120 100">
        <defs>
            <clipPath id="potClip">
                <rect x="20" y="30" width="80" height="50" rx="5" />
            </clipPath>
        </defs>
        {/* Handles */}
        <circle cx="15" cy="55" r="8" fill="none" stroke="#64748b" strokeWidth="4" />
        <circle cx="105" cy="55" r="8" fill="none" stroke="#64748b" strokeWidth="4" />
        {/* Fill */}
        <rect x="0" y={80 - (fill * 0.5)} width="120" height="100" fill={waterColor} clipPath="url(#potClip)" />
        {/* Outline */}
        <rect x="20" y="30" width="80" height="50" rx="5" fill="none" stroke="#64748b" strokeWidth="6" />
    </svg>
);

const BowlSVG = ({ fill, waterColor = '#3498db' }) => (
    <svg width="100" height="80" viewBox="0 0 100 80">
        <defs>
            <clipPath id="bowlClip">
                <path d="M 10 20 Q 50 80 90 20 L 90 20 Z" />
            </clipPath>
        </defs>
        {/* Fill */}
        <rect x="0" y={80 - (fill * 0.6)} width="100" height="80" fill={waterColor} clipPath="url(#bowlClip)" />
        {/* Outline */}
        <path d="M 10 20 Q 50 80 90 20" fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
    </svg>
);

const BathtubSVG = ({ fill, waterColor = '#3498db' }) => (
    <svg width="120" height="80" viewBox="0 0 150 100">
        <defs>
            <clipPath id="tubClip">
                <path d="M 20 40 Q 20 80 50 80 L 100 80 Q 130 80 130 40 Z" />
            </clipPath>
        </defs>
        {/* Faucet */}
        <path d="M 25 20 L 25 35 M 20 25 L 30 25" stroke="#94a3b8" strokeWidth="4" />
        {/* Fill */}
        <rect x="0" y={80 - (fill * 0.4)} width="150" height="100" fill={waterColor} clipPath="url(#tubClip)" />
        {/* Outline */}
        <path d="M 10 40 L 140 40 M 20 40 Q 20 80 50 80 L 100 80 Q 130 80 130 40" fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
    </svg>
);

const PoolSVG = ({ fill, waterColor = '#3498db' }) => (
    <svg width="140" height="100" viewBox="0 0 160 120">
        <rect x="10" y="20" width="140" height="80" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />
        <rect x="20" y="30" width="120" height="60" fill={waterColor} opacity={fill/100} />
        {/* Ladder */}
        <path d="M 120 10 L 120 40 M 130 10 L 130 40 M 120 20 L 130 20 M 120 30 L 130 30" stroke="#94a3b8" strokeWidth="2" />
    </svg>
);


const SpoonSVG = ({ fill, waterColor = '#3498db' }) => (
    <svg width="60" height="40" viewBox="0 0 60 40">
        <defs>
            <clipPath id="spoonClip">
                <ellipse cx="20" cy="20" rx="15" ry="10" />
            </clipPath>
        </defs>
        {/* Handle */}
        <path d="M 35 20 L 55 20" fill="none" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        {/* Fill */}
        <rect x="0" y={35 - (fill * 0.2)} width="60" height="40" fill={waterColor} clipPath="url(#spoonClip)" />
        {/* Outline */}
        <ellipse cx="20" cy="20" rx="15" ry="10" fill="none" stroke="#64748b" strokeWidth="3" />
    </svg>
);

const BottleSVG = ({ fill, waterColor = '#3498db' }) => (
    <svg width="60" height="120" viewBox="0 0 80 120">
        <defs>
            <clipPath id="bottleClip">
                <path d="M 30 10 L 50 10 L 50 30 L 70 50 L 70 110 L 10 110 L 10 50 L 30 30 Z" />
            </clipPath>
        </defs>
        {/* Cap */}
        <rect x="30" y="5" width="20" height="5" fill="#64748b" rx="1" />
        {/* Fill */}
        <rect x="0" y={110 - (fill * 0.9)} width="80" height="120" fill={waterColor} clipPath="url(#bottleClip)" />
        {/* Outline */}
        <path d="M 30 10 L 50 10 L 50 30 L 70 50 L 70 110 L 10 110 L 10 50 L 30 30 Z" fill="none" stroke="#64748b" strokeWidth="4" strokeLinejoin="round" />
    </svg>
);


const TreeSVG = ({ height }) => (
    <svg width="100" height={height} viewBox={`0 0 100 ${height}`}>
        <rect x="42" y={height / 2} width="16" height={height / 2} fill="#78350F" />
        <circle cx="50" cy={height / 2.5} r={height / 3} fill="#22C55E" />
        <circle cx="35" cy={height / 3} r={height / 4} fill="#16A34A" />
        <circle cx="65" cy={height / 3} r={height / 4} fill="#16A34A" />
    </svg>
);


const DynamicVisual = ({ type, data }) => {
    if (type === 'length' || type === 'height') {
        const { l1, l2, color1, color2, label1, label2, isVertical, objectType } = data;
        
        const renderObject = (len, color, label) => {
            if (objectType === 'pencil') return <PencilSVG length={len} color={color} isVertical={isVertical} />;
            if (objectType === 'ribbon') return <RibbonSVG length={len} color={color} isVertical={isVertical} />;
            if (objectType === 'snake') return <SnakeSVG length={len} color={color} isVertical={isVertical} />;
            if (objectType === 'caterpillar') return <CaterpillarSVG length={len} color={color} />;
            if (objectType === 'rope') return <RopeSVG length={len} color={color} isVertical={isVertical} />;
            if (objectType === 'building') return <BuildingSVG height={len} color={color} />;
            if (objectType === 'tree') return <TreeSVG height={len} />;
            if (objectType === 'ladder') return <LadderSVG height={len} color={color} />;
            if (objectType === 'lamppost') return <LampPostSVG height={len} color={color} />;

            
            // Fallback to original stylized bars if no object type
            return (
                <motion.div
                    initial={{ width: 0, height: 0 }}
                    animate={{ width: isVertical ? 35 : len, height: isVertical ? len : 35 }}
                    style={{ background: `linear-gradient(${isVertical ? '0' : '90'}deg, ${color}, ${color}dd)`, borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                />
            );
        };

        return (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="g1-measure-visual">
                <div style={{
                    display: 'flex',
                    flexDirection: isVertical ? 'row' : 'column',
                    gap: '40px',
                    alignItems: isVertical ? 'flex-end' : 'flex-start',
                    justifyContent: 'center',
                    padding: '40px',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    borderRadius: '35px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.06)',
                    width: '100%',
                    minHeight: '250px'
                }}>
                    <div style={{ display: 'flex', flexDirection: isVertical ? 'column-reverse' : 'row', alignItems: 'center', gap: '20px' }}>
                        {renderObject(l1, color1, label1)}
                        <span style={{ fontWeight: 600, color: '#31326F', fontSize: '1.1rem' }}>{label1}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: isVertical ? 'column-reverse' : 'row', alignItems: 'center', gap: '20px' }}>
                        {renderObject(l2, color2, label2)}
                        <span style={{ fontWeight: 600, color: '#31326F', fontSize: '1.1rem' }}>{label2}</span>
                    </div>
                </div>
            </motion.div>
        );
    }

    if (type === 'weight') {
        const { label1, label2, objA, objB } = data;
        return (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', gap: '60px', alignItems: 'center', justifyContent: 'center', background: 'white', padding: '40px', borderRadius: '35px', boxShadow: '0 15px 35px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <div style={{ fontSize: '80px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))', animation: 'bounce 2s infinite' }}>
                        {objA.emoji}
                    </div>
                    <span style={{ fontWeight: 600, color: '#31326F', fontSize: '1.2rem' }}>{label1}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.8rem', color: '#94a3b8', fontWeight: 800, fontFamily: 'Nunito' }}>VS</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <div style={{ fontSize: '80px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))', animation: 'bounce 2s infinite' }}>
                        {objB.emoji}
                    </div>
                    <span style={{ fontWeight: 600, color: '#31326F', fontSize: '1.2rem' }}>{label2}</span>
                </div>
            </motion.div>
        );
    }

    if (type === 'capacity') {
        const { f1, f2, color1, color2, label1, label2, isAnswered } = data;

        const renderCapacityObject = (label, fill, waterColor) => {
            const name = label.toLowerCase();
            if (name.includes('bucket')) return <BucketSVG fill={fill} waterColor={waterColor} />;
            if (name.includes('mug') || name.includes('cup')) return <MugSVG fill={fill} waterColor={waterColor} />;
            if (name.includes('jug')) return <JugSVG fill={fill} waterColor={waterColor} />;
            if (name.includes('glass')) return <GlassSVG fill={fill} waterColor={waterColor} />;
            if (name.includes('bowl')) return <BowlSVG fill={fill} waterColor={waterColor} />;
            if (name.includes('pot')) return <PotSVG fill={fill} waterColor={waterColor} />;
            if (name.includes('bathtub')) return <BathtubSVG fill={fill} waterColor={waterColor} />;
            if (name.includes('pool')) return <PoolSVG fill={fill} waterColor={waterColor} />;
            if (name.includes('bottle')) return <BottleSVG fill={fill} waterColor={waterColor} />;
            if (name.includes('spoon')) return <SpoonSVG fill={fill} waterColor={waterColor} />;
            if (name.includes('tank')) return <BucketSVG fill={fill} waterColor={waterColor} />; // Tank as large bucket

            // Default beaker
            return (
                <div style={{ position: 'relative', width: '80px', height: '120px', border: '4px solid #64748b', borderTop: 'none', borderRadius: '0 0 20px 20px', overflow: 'hidden', background: '#f8fafc' }}>
                    <motion.div initial={{ height: 0 }} animate={{ height: `${fill}%` }} style={{ position: 'absolute', bottom: 0, width: '100%', background: `linear-gradient(180deg, ${waterColor}aa, ${waterColor})`, borderTop: '2px solid white' }} />
                </div>
            );
        };

        return (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', gap: '60px', alignItems: 'center', justifyContent: 'center', background: 'white', padding: '40px', borderRadius: '35px', boxShadow: '0 15px 35px rgba(0,0,0,0.06)', minHeight: '200px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <div style={{ position: 'relative' }}>
                        {renderCapacityObject(label1, f1, color1)}
                        <AnimatePresence>
                            {isAnswered && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 800, color: '#1e3a8a', fontSize: '1.2rem', textShadow: '0 0 10px white', pointerEvents: 'none' }}>
                                    {f1}%
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <span style={{ fontWeight: 700, color: '#31326F' }}>{label1}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <div style={{ position: 'relative' }}>
                        {renderCapacityObject(label2, f2, color2)}
                        <AnimatePresence>
                            {isAnswered && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 800, color: '#1e3a8a', fontSize: '1.2rem', textShadow: '0 0 10px white', pointerEvents: 'none' }}>
                                    {f2}%
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <span style={{ fontWeight: 700, color: '#31326F' }}>{label2}</span>
                </div>
            </motion.div>
        );
    }

    return null;
};

const SKILL_ID_MAP = {
    '701': NODE_IDS.g1MathMeasurementLengthHeight,
    '702': NODE_IDS.g1MathMeasurementWeight,
    '703': NODE_IDS.g1MathMeasurementCapacity,
    '704': NODE_IDS.g1MathMeasurementMixed,
};

const Measurement = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { startSession, logAnswer, finishSession } = useSessionLogger();

    const queryParams = new URLSearchParams(location.search);
    const skillId = queryParams.get('skillId');
    const isTest = skillId === '704';
    const totalQuestions = isTest ? 10 : 5;

    const [qIndex, setQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timer, setTimer] = useState(0);
    const [answers, setAnswers] = useState({});
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [showExplanationModal, setShowExplanationModal] = useState(false);

    const getTopicInfo = () => {
        const grade1Config = TOPIC_CONFIGS['1'];
        for (const gradeKey of Object.keys(TOPIC_CONFIGS)) {
            const gradeConfig = TOPIC_CONFIGS[gradeKey];
            for (const [topicName, skills] of Object.entries(gradeConfig)) {
                const skill = skills.find(s => s.id === skillId);
                if (skill) return { topicName, skillName: skill.name, grade: gradeKey };
            }
        }
        return { topicName: 'Measurement', skillName: 'Mathematics', grade: '1' };
    };

    const { topicName, skillName } = getTopicInfo();

    const getNextSkill = () => {
        const { grade } = getTopicInfo();
        const gradeConfig = TOPIC_CONFIGS[grade];
        const topics = Object.keys(gradeConfig);
        let currentTopicIdx = -1;
        let currentSkillIdx = -1;
        for (let i = 0; i < topics.length; i++) {
            const skills = gradeConfig[topics[i]];
            const idx = skills.findIndex(s => s.id === skillId);
            if (idx !== -1) { currentTopicIdx = i; currentSkillIdx = idx; break; }
        }
        if (currentTopicIdx === -1) return null;
        const currentTopicSkills = gradeConfig[topics[currentTopicIdx]];
        if (currentSkillIdx < currentTopicSkills.length - 1) {
            return { ...currentTopicSkills[currentSkillIdx + 1], topicName: topics[currentTopicIdx] };
        }
        if (currentTopicIdx < topics.length - 1) {
            const nextTopicName = topics[currentTopicIdx + 1];
            const nextTopicSkills = gradeConfig[nextTopicName];
            if (nextTopicSkills.length > 0) return { ...nextTopicSkills[0], topicName: nextTopicName };
        }
        return null;
    };

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const generateQuestions = (selectedSkill) => {
        const questions = [];
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#98D8C8', '#A9D18E', '#FF9F43', '#8395A7'];
        
        // Define pools for each type to avoid repeats within a session
        const lengthPool = shuffle([
            { name: 'Pencil', type: 'pencil' }, { name: 'Ribbon', type: 'ribbon' },
            { name: 'Snake', type: 'snake' }, { name: 'Caterpillar', type: 'caterpillar' },
            { name: 'Rope', type: 'rope' }, { name: 'Pencil', type: 'pencil' }
        ]);
        const heightPool = shuffle([
            { name: 'Building', type: 'building' }, { name: 'Tree', type: 'tree' },
            { name: 'Ladder', type: 'ladder' }, { name: 'Lamp Post', type: 'lamppost' },
            { name: 'Tree', type: 'tree' }, { name: 'Building', type: 'building' }
        ]);
        const weightPool = shuffle([
            { h: { name: 'Elephant', emoji: '🐘' }, l: { name: 'Mouse', emoji: '🐭' } },
            { h: { name: 'School Bus', emoji: '🚌' }, l: { name: 'Bicycle', emoji: '🚲' } },
            { h: { name: 'Truck', emoji: '🚛' }, l: { name: 'Toy Car', emoji: '🏎️' } },
            { h: { name: 'Watermelon', emoji: '🍉' }, l: { name: 'Apple', emoji: '🍎' } },
            { h: { name: 'Hippopotamus', emoji: '🦛' }, l: { name: 'Butterfly', emoji: '🦋' } },
            { h: { name: 'Lion', emoji: '🦁' }, l: { name: 'Spider', emoji: '🕷️' } },
            { h: { name: 'Anchor', emoji: '⚓' }, l: { name: 'Balloon', emoji: '🎈' } },
            { h: { name: 'Bowling Ball', emoji: '🎳' }, l: { name: 'Popcorn', emoji: '🍿' } }
        ]);
        const capacityPool = shuffle([
            { a: "Swimming Pool", b: "Bathtub", emoji: "🏊" },
            { a: "Bucket", b: "Mug", emoji: "🪣" },
            { a: "Jug", b: "Glass", emoji: "🥛" },
            { a: "Cooking Pot", b: "Bowl", emoji: "🍲" },
            { a: "Milk Bottle", b: "Spoon", emoji: "🥄" },
            { a: "Water Tank", b: "Water Bottle", emoji: "🧴" }
        ]);

        let lIdx = 0, hIdx = 0, wIdx = 0, cIdx = 0;

        for (let i = 0; i < totalQuestions; i++) {
            let question = {};
            const color1 = colors[i % colors.length];
            const color2 = colors[(i + 1) % colors.length];
            let type = 'length';

            if (isTest) {
                if (i < 4) type = (i % 2 === 0) ? 'length' : 'height';
                else if (i < 7) type = 'weight';
                else type = 'capacity';
            } else if (selectedSkill === '701') {
                type = (i % 2 === 0) ? 'length' : 'height';
            } else if (selectedSkill === '702') {
                type = 'weight';
            } else if (selectedSkill === '703') {
                type = 'capacity';
            } else {
                const types = ['length', 'height', 'weight', 'capacity'];
                type = types[i % 4];
            }

            if (type === 'length' || type === 'height') {
                const isLongerGoal = Math.random() > 0.5;
                const pool = type === 'length' ? lengthPool : heightPool;
                const idx = type === 'length' ? (lIdx++ % pool.length) : (hIdx++ % pool.length);
                const choice = pool[idx];

                const l1 = 150 + Math.floor(Math.random() * 40);
                const l2 = l1 + (Math.random() > 0.5 ? 60 : -60);
                const label1 = `${choice.name} A`; 
                const label2 = `${choice.name} B`;
                
                const adjLong = type === 'height' ? "taller" : "longer";
                const adjShort = "shorter";
                const adj = isLongerGoal ? adjLong : adjShort;
                const correct = (isLongerGoal ? (l1 > l2 ? label1 : label2) : (l1 < l2 ? label1 : label2));
                
                question = {
                    text: `Which ${choice.name} is ${adj}?`,
                    options: [label1, label2].sort(() => 0.5 - Math.random()),
                    correct, type,
                    visualData: { l1, l2, color1, color2, label1, label2, isVertical: type === 'height', objectType: choice.type },
                    explanation: `Compare the ends of the ${choice.name}s. ${correct} is clearly ${adj}.`
                };
            } else if (type === 'weight') {
                const isHeavierGoal = Math.random() > 0.5;
                const pair = weightPool[wIdx++ % weightPool.length];
                const objA = pair.h; const objB = pair.l;
                const adj = isHeavierGoal ? 'heavier' : 'lighter';
                const correct = isHeavierGoal ? objA.name : objB.name;
                
                question = {
                    text: `Which one is ${adj}?`,
                    options: [objA.name, objB.name].sort(() => 0.5 - Math.random()),
                    correct, type,
                    visualData: { objA, objB, label1: objA.name, label2: objB.name },
                    explanation: `A ${objA.name} is much ${isHeavierGoal ? 'heavier' : 'more solid'} than a ${objB.name}.`
                };
            } else if (type === 'capacity') {
                const isMoreGoal = Math.random() > 0.5;
                const pair = capacityPool[cIdx++ % capacityPool.length];
                const f1 = 80; // Larger container visual fill
                const f2 = 20; // Smaller container visual fill
                const adj = isMoreGoal ? 'holds more' : 'holds less';
                const correct = isMoreGoal ? pair.a : pair.b;
                
                question = {
                    text: `Which one ${adj}?`,
                    options: [pair.a, pair.b].sort(() => 0.5 - Math.random()),
                    correct, type,
                    visualData: { f1, f2, color1: '#3498db', color2: '#3498db', label1: pair.a, label2: pair.b },
                    explanation: `A ${pair.a} is bigger and can hold much more than a ${pair.b}.`
                };
            }
            questions.push(question);
        }
        return questions;
    };


    useEffect(() => {
        const qs = generateQuestions(skillId);
        setSessionQuestions(qs);
        const nodeId = SKILL_ID_MAP[skillId] || NODE_IDS.g1MathMeasurementMixed;
        startSession({ nodeId, sessionType: isTest ? 'assessment' : 'practice' });
    }, [skillId, isTest, startSession]);

    useEffect(() => {
        let interval;
        if (!showResults && sessionQuestions.length > 0) {
            interval = setInterval(() => setTimer(v => v + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [showResults, sessionQuestions]);

    useEffect(() => {
        setShowExplanationModal(false);
    }, [qIndex]);

    useEffect(() => {
        if (answers[qIndex]) {
            setSelectedOption(answers[qIndex].selectedOption);
            setIsAnswered(true);
        } else {
            setSelectedOption(null);
            setIsAnswered(false);
        }
    }, [qIndex, answers]);

    const handleExit = async () => {
        navigate('/junior/grade/1');
    };

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (isAnswered || selectedOption === null) return;
        const option = selectedOption;
        const currentQ = sessionQuestions[qIndex];
        const isCorrect = option === currentQ.correct;

        setIsAnswered(true);
        if (isCorrect) setScore(s => s + 1);

        const answerData = {
            question_text: currentQ.text,
            selected: option,
            correct: currentQ.correct,
            isCorrect
        };

        logAnswer({
            question_index: qIndex,
            answer_json: answerData,
            is_correct: isCorrect ? 1 : 0
        });

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: option,
                isCorrect,
                type: currentQ.type,
                visualData: currentQ.visualData,
                questionText: currentQ.text,
                correctAnswer: currentQ.correct,
                explanation: currentQ.explanation || "Detailed explanation is coming soon!"
            }
        }));

        if (!isTest) {
            setShowExplanationModal(true);
        } else {
            setTimeout(() => {
                handleNext();
            }, 800);
        }
    };

    const handleNext = async () => {
        if (qIndex < totalQuestions - 1) {
            setQIndex(v => v + 1);
        } else {
            finishSession({
                totalQuestions,
                questionsAnswered: Object.keys(answers).length,
                answersPayload: answers
            });
            setShowResults(true);
        }
    };

    const handleSkip = () => {
        if (isAnswered) return;
        const currentQ = sessionQuestions[qIndex];
        
        logAnswer({
            question_index: qIndex,
            answer_json: { question_text: currentQ.text, selected: 'Skipped', correct: currentQ.correct, isCorrect: false },
            is_correct: 0
        });

        setAnswers(prev => ({
            ...prev,
            [qIndex]: {
                selectedOption: 'Skipped',
                isCorrect: false,
                type: currentQ.type,
                visualData: currentQ.visualData,
                questionText: currentQ.text,
                correctAnswer: currentQ.correct,
                explanation: "This question was skipped. " + currentQ.explanation
            }
        }));
        handleNext();
    };

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (sessionQuestions.length === 0) return <div className="grade1-practice-page"><div className="g1-loading-blob" /></div>;

    if (showResults) {
        const percentage = Math.round((score / totalQuestions) * 100);
        return (
            <div className="grade1-practice-page results-view overflow-y-auto">
                <Navbar />
                <header className="results-header">
                    <h1 className="results-title">Adventure Report</h1>
                    <div className="exit-container">
                        <StickerExit onClick={handleExit} />
                    </div>
                </header>

                <main className="results-content">
                    <div className="results-hero-section">
                        <img src={avatarImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#31326F', fontFamily: 'Nunito, sans-serif' }}>Quest Complete! 🎉</h2>

                        <div className="stars-container">
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="star-wrapper"
                                >
                                    <Star
                                        size={60}
                                        fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"}
                                        color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <div className="results-stats-grid">
                            <div className="stat-card">
                                <span className="stat-label">Correct</span>
                                <span className="stat-value-large">{score}/{totalQuestions}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Time</span>
                                <span className="stat-value-large">{formatTime(timer)}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Accuracy</span>
                                <span className="stat-value-large">{percentage}%</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Score</span>
                                <span className="stat-value-large">{score * 10}</span>
                            </div>
                        </div>
                    </div>

                    {isTest ? (
                        <div className="detailed-breakdown">
                            <h3 className="breakdown-title">Quest Log 📜</h3>
                            <div className="quest-log-list">
                                {sessionQuestions.map((q, idx) => {
                                    const ans = answers[idx];
                                    if (!ans) return null;
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="quest-log-item"
                                        >
                                            <div className={`log-number ${!ans.isCorrect ? 'wrong' : ''}`}>
                                                {idx + 1}
                                            </div>
                                            <div className="log-content">
                                                <div className="log-question">
                                                    <LatexText text={ans.questionText} />
                                                    {ans.visualData && (
                                                        <div className="log-visual-area" style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                                                            <DynamicVisual type={ans.type} data={{ ...ans.visualData, isAnswered: true }} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="log-answers">
                                                    <div className={`log-answer-box ${ans.isCorrect ? 'correct-box' : 'wrong-box'}`}>
                                                        <span className="log-label">Your Answer</span>
                                                        <span className="log-value">{ans.selectedOption}</span>
                                                    </div>
                                                    {!ans.isCorrect && (
                                                        <div className="log-answer-box correct-box">
                                                            <span className="log-label">Correct Answer</span>
                                                            <span className="log-value">{ans.correctAnswer}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="log-explanation">
                                                    <span className="log-label" style={{ color: '#4C51BF' }}>Explain? 💡</span>
                                                    <LatexText text={ans.explanation} />
                                                </div>
                                            </div>
                                            <div className="log-icon">
                                                {ans.isCorrect ? (
                                                    <Check size={32} color="#4FB7B3" strokeWidth={3} />
                                                ) : (
                                                    <X size={32} color="#FF6B6B" strokeWidth={3} />
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="practice-summary" style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                                {Object.values(answers).map((ans, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        style={{
                                            width: '50px', height: '50px', borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '1.5rem',
                                            background: ans.isCorrect ? '#C6F6D5' : '#FED7D7',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        {ans.isCorrect ? '✅' : '❌'}
                                    </motion.div>
                                ))}
                            </div>
                            <p style={{ fontSize: '1.3rem', fontWeight: 400, color: '#4A5568', marginBottom: '10px' }}>
                                {percentage >= 80 ? '🌟 Amazing work! Keep it up!' :
                                    percentage >= 60 ? '💪 Good effort! Keep practicing!' :
                                        '🌱 Nice try! Practice makes perfect!'}
                            </p>
                        </div>
                    )}

                    <div className="results-actions">
                        <button className="action-btn-large retake-skill-btn" onClick={() => window.location.reload()}>
                            <RefreshCw size={24} /> Retake Skill
                        </button>

                        {getNextSkill() && (
                            <button className="action-btn-large next-skill-btn" onClick={() => {
                                const next = getNextSkill();
                                navigate(`/junior/grade/1/${next.route}?skillId=${next.id}`);
                                window.location.reload();
                            }}>
                                Next Skill <ArrowRight size={24} />
                            </button>
                        )}

                        <button className="action-btn-large back-topics-btn" onClick={() => navigate('/junior/grade/1')}>
                            <FileText size={24} /> Back to Topics
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    const currentQ = sessionQuestions[qIndex];

    return (
        <div className="grade1-practice-page">
            <div className="g1-bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="g1-practice-container">
                <div className="g1-header-nav">
                    <div className="g1-timer-badge">
                        <Timer size={18} />
                        {formatTime(timer)}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, minWidth: 0 }}>
                        <span style={{ fontWeight: 400, color: '#666', fontSize: '1rem', background: 'white', padding: '8px 15px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
                            Q {qIndex + 1}/{totalQuestions}
                        </span>
                        <span style={{ fontWeight: 400, color: '#2D3436', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <LatexText text={skillName} />
                        </span>
                    </div>

                    {isTest && !isAnswered && (
                        <button className="g1-skip-btn" onClick={handleSkip}>
                            Skip Quest ⏭️
                        </button>
                    )}

                    <div className="exit-practice-sticker" style={{ marginLeft: 'auto' }}>
                        <StickerExit onClick={handleExit} />
                    </div>
                </div>

                <div className="g1-progress-container" style={{ margin: '0 0 10px 0' }}>
                    <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
                <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '5px 0', fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 400 }}>{topicName}</div>
                <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
                    <h2 className="g1-question-text"><LatexText text={currentQ.text} /></h2>

                    <div className="g1-content-split">
                        <div className="g1-visual-area">
                            <DynamicVisual type={currentQ.type} data={{ ...currentQ.visualData, isAnswered }} />
                        </div>

                        <div className="g1-quiz-side">
                            <div className="g1-options-grid">
                                {currentQ.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`g1-option-btn 
                                            ${selectedOption === opt ? (isTest ? 'selected-test' : (isAnswered ? (opt === currentQ.correct ? 'selected-correct' : 'selected-wrong') : 'selected-test')) : ''}
                                            ${!isTest && isAnswered && opt === currentQ.correct ? 'revealed-correct' : ''}
                                        `}
                                        onClick={() => handleOptionSelect(opt)}
                                        disabled={isAnswered}
                                    >
                                        <LatexText text={opt.toString()} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* --- INJECTED FOOTER V2 --- */}
                    <div className="g1-navigation-footer">
                        <button className="g1-nav-btn prev-btn" onClick={() => { if (qIndex > 0) setQIndex(qIndex - 1); }} disabled={qIndex === 0}>
                            <ChevronLeft size={24} /> Prev
                        </button>

                        <div>
                            {isAnswered && !isTest && !answers[qIndex]?.isCorrect && (
                                <button className="g1-nav-btn steps-btn" onClick={() => setShowExplanationModal(true)}>
                                    <Eye size={24} /> Steps
                                </button>
                            )}

                            {!isAnswered ? (
                                <button className="g1-nav-btn submit-btn" onClick={handleSubmit} disabled={selectedOption === null}>
                                    {isTest ? 'Next' : 'Check Answer'} <ChevronRight size={24} />
                                </button>
                            ) : (
                                <button className="g1-nav-btn next-btn" onClick={handleNext}>
                                    {qIndex === totalQuestions - 1 ? (isTest ? 'Finish Test' : 'Finish') : 'Next Question'} <ChevronRight size={24} />
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            <ExplanationModal
                isOpen={showExplanationModal}
                isCorrect={answers[qIndex]?.isCorrect}
                correctAnswer={currentQ.correct}
                explanation={currentQ.explanation}
                onClose={() => setShowExplanationModal(false)}
                onNext={() => {
                    setShowExplanationModal(false);
                    handleNext();
                }}
            />
        </div>
    );
};

export default Measurement;
