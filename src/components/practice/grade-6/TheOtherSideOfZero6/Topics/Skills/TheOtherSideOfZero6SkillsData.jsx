import React from 'react';
import {
    generateNumberLineQuestions,
    generateBuildingQuestions,
    generateTokenQuestions,
    generateRealWorldQuestions
} from './theOtherSideOfZero6Questions';

export const SKILLS = [
    {
        id: 'number-line-basics',
        nodeId: 'a4061011-1001-0000-0000-000000000000',
        title: 'Number Line & Integer Basics',
        subtitle: 'Skill 1',
        icon: '📏',
        color: '#3b82f6',
        desc: 'Understand positive, negative integers, and zero. Compare, order, and locate integers on the number line.',
        practice: generateNumberLineQuestions,
        assessment: generateNumberLineQuestions,
        learn: {
            concept: 'Integers extend infinitely in both directions from zero on a number line.',
            rules: [
                {
                    title: 'The Number Line',
                    img: (
                        <svg viewBox="0 0 500 100" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
                            <line x1="20" y1="50" x2="480" y2="50" stroke="#3b82f6" strokeWidth="3"/>
                            <polygon points="480,44 495,50 480,56" fill="#3b82f6"/>
                            <polygon points="20,44 5,50 20,56" fill="#3b82f6"/>
                            {[-5,-4,-3,-2,-1,0,1,2,3,4,5].map((n,i) => {
                                const x = 40 + i * 40;
                                return <g key={n}>
                                    <line x1={x} y1="42" x2={x} y2="58" stroke={n===0 ? '#f59e0b' : '#3b82f6'} strokeWidth={n===0 ? 4 : 2}/>
                                    <text x={x} y="78" textAnchor="middle" fontFamily="sans-serif" fontSize="16" fontWeight="800" fill={n < 0 ? '#ef4444' : n > 0 ? '#10b981' : '#f59e0b'}>{n}</text>
                                </g>;
                            })}
                            <text x="25" y="32" fontSize="12" fill="#ef4444" fontWeight="800">← Smaller</text>
                            <text x="410" y="32" fontSize="12" fill="#10b981" fontWeight="800">Greater →</text>
                        </svg>
                    ),
                    f: '\\text{← Negative  |  0  |  Positive →}',
                    d: 'Numbers to the right are always greater. Numbers to the left are always smaller. Zero sits in the middle as the reference point.',
                    ex: '$-3 < -1 < 0 < 2 < 5$',
                    tip: 'Moving RIGHT = increasing. Moving LEFT = decreasing. Always!'
                },
                {
                    title: 'Positive & Negative',
                    img: (
                        <svg viewBox="0 0 400 160" width="100%" height="120" xmlns="http://www.w3.org/2000/svg">
                            <rect x="20" y="20" width="160" height="120" rx="16" fill="#ecfdf5" stroke="#10b981" strokeWidth="4"/>
                            <text x="100" y="60" textAnchor="middle" fontSize="20" fontWeight="900" fill="#10b981">Positive (+)</text>
                            <text x="100" y="90" textAnchor="middle" fontSize="14" fill="#047857">Above zero</text>
                            <text x="100" y="115" textAnchor="middle" fontSize="24" fontWeight="900" fill="#10b981">+1, +2, +3 ...</text>
                            
                            <rect x="220" y="20" width="160" height="120" rx="16" fill="#fef2f2" stroke="#ef4444" strokeWidth="4"/>
                            <text x="300" y="60" textAnchor="middle" fontSize="20" fontWeight="900" fill="#ef4444">Negative (−)</text>
                            <text x="300" y="90" textAnchor="middle" fontSize="14" fill="#dc2626">Below zero</text>
                            <text x="300" y="115" textAnchor="middle" fontSize="24" fontWeight="900" fill="#ef4444">−1, −2, −3 ...</text>
                        </svg>
                    ),
                    f: '\\text{+n > 0 > -n}',
                    d: 'Positive integers are above zero (to the right). Negative integers are below zero (to the left). Every positive integer is greater than every negative integer.',
                    ex: 'Temperature: +30°C is warm, −10°C is freezing cold.',
                    tip: 'Think of a lift: + goes UP (positive), − goes DOWN (negative)!'
                },
                {
                    title: 'Comparing Integers',
                    img: (
                        <svg viewBox="0 0 400 120" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
                            <line x1="20" y1="60" x2="380" y2="60" stroke="#6366f1" strokeWidth="3"/>
                            <circle cx="120" cy="60" r="20" fill="#ef4444" opacity="0.8"/>
                            <text x="120" y="66" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">−3</text>
                            <circle cx="280" cy="60" r="20" fill="#10b981" opacity="0.8"/>
                            <text x="280" y="66" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">+2</text>
                            <text x="200" y="50" textAnchor="middle" fontWeight="900" fontSize="28" fill="#6366f1">{"<"}</text>
                            <text x="200" y="100" textAnchor="middle" fontSize="14" fontWeight="700" fill="#64748b">−3 is to the LEFT of +2</text>
                        </svg>
                    ),
                    f: '\\text{Left < Right on number line}',
                    d: 'To compare any two integers, imagine them on a number line. The one further to the RIGHT is always greater. So −2 > −5 (because −2 is to the right of −5).',
                    ex: '$-7 < -3 < 0 < 4 < 9$',
                    tip: 'For negative numbers: closer to zero means GREATER (−1 > −100)!'
                }
            ]
        }
    },
    {
        id: 'building-lift',
        nodeId: 'a4061011-1002-0000-0000-000000000000',
        title: 'Building / Lift Model',
        subtitle: 'Skill 2',
        icon: '🏢',
        color: '#10b981',
        desc: 'Use the Building of Fun elevator context to add and subtract integers using floor movements.',
        practice: generateBuildingQuestions,
        assessment: generateBuildingQuestions,
        learn: {
            concept: 'Integer addition is like moving floors in a building: + goes UP, − goes DOWN.',
            rules: [
                {
                    title: 'The Building',
                    img: (
                        <svg viewBox="0 0 200 250" width="180" height="220" xmlns="http://www.w3.org/2000/svg">
                            <rect x="30" y="10" width="140" height="230" rx="8" fill="none" stroke="#10b981" strokeWidth="4"/>
                            {[3,2,1,0,-1,-2,-3].map((f, i) => {
                                const y = 20 + i * 32;
                                const bg = f === 0 ? '#fef3c7' : f > 0 ? '#ecfdf5' : '#fef2f2';
                                const tc = f === 0 ? '#92400e' : f > 0 ? '#047857' : '#dc2626';
                                return <g key={f}>
                                    <rect x="35" y={y} width="130" height="28" rx="4" fill={bg}/>
                                    <text x="100" y={y + 20} textAnchor="middle" fontSize="16" fontWeight="800" fill={tc} fontFamily="sans-serif">
                                        {f >= 0 ? `+${f}` : f}
                                    </text>
                                </g>;
                            })}
                            <rect x="10" y="116" width="16" height="28" rx="4" fill="#f59e0b"/>
                            <text x="18" y="134" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">G</text>
                        </svg>
                    ),
                    f: '\\text{Floor } + \\text{Button} = \\text{Target Floor}',
                    d: 'Ground Floor = 0. Floors above: +1, +2, +3... Floors below: −1, −2, −3... Pressing + moves UP, pressing − moves DOWN.',
                    ex: 'Floor +2, press −5 → Floor −3',
                    tip: 'Starting Floor + Movement = Target Floor. This IS integer addition!'
                },
                {
                    title: 'Going Up & Down',
                    img: (
                        <svg viewBox="0 0 300 180" width="100%" height="140" xmlns="http://www.w3.org/2000/svg">
                            <rect x="20" y="20" width="120" height="140" rx="12" fill="#ecfdf5" stroke="#10b981" strokeWidth="3"/>
                            <text x="80" y="55" textAnchor="middle" fontSize="16" fontWeight="900" fill="#047857">Going UP ↑</text>
                            <text x="80" y="85" textAnchor="middle" fontSize="14" fill="#059669">Press + button</text>
                            <text x="80" y="115" textAnchor="middle" fontSize="22" fontWeight="900" fill="#10b981">+3, +5</text>
                            <text x="80" y="145" textAnchor="middle" fontSize="12" fill="#64748b">Add positive</text>
                            
                            <rect x="160" y="20" width="120" height="140" rx="12" fill="#fef2f2" stroke="#ef4444" strokeWidth="3"/>
                            <text x="220" y="55" textAnchor="middle" fontSize="16" fontWeight="900" fill="#dc2626">Going DOWN ↓</text>
                            <text x="220" y="85" textAnchor="middle" fontSize="14" fill="#ef4444">Press − button</text>
                            <text x="220" y="115" textAnchor="middle" fontSize="22" fontWeight="900" fill="#ef4444">−2, −4</text>
                            <text x="220" y="145" textAnchor="middle" fontSize="12" fill="#64748b">Add negative</text>
                        </svg>
                    ),
                    f: '(+3) + (-5) = -2',
                    d: 'If you press +3, you go up 3 floors. If you press −5, you go down 5 floors. Multiple presses add up!',
                    ex: 'Floor +1, press +3 then −6: 1+3=4, 4+(−6)=−2',
                    tip: 'Multi-step problems: just do one move at a time!'
                },
                {
                    title: 'Finding the Button',
                    img: (
                        <svg viewBox="0 0 300 120" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
                            <rect x="20" y="30" width="80" height="60" rx="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="3"/>
                            <text x="60" y="68" textAnchor="middle" fontSize="18" fontWeight="900" fill="#1d4ed8">Start</text>
                            
                            <line x1="110" y1="60" x2="180" y2="60" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 3"/>
                            <polygon points="180,54 192,60 180,66" fill="#f59e0b"/>
                            <text x="145" y="50" textAnchor="middle" fontSize="14" fontWeight="800" fill="#d97706">Button = ?</text>
                            
                            <rect x="200" y="30" width="80" height="60" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3"/>
                            <text x="240" y="68" textAnchor="middle" fontSize="18" fontWeight="900" fill="#92400e">Target</text>
                        </svg>
                    ),
                    f: '\\text{Button} = \\text{Target} - \\text{Start}',
                    d: 'If you know where you started and where you ended, you can find what button was pressed by subtracting: Target − Start = Button.',
                    ex: 'Start at +2, end at −1: Button = −1 − (+2) = −3',
                    tip: 'This is subtraction of integers disguised as a lift problem!'
                }
            ]
        }
    },
    {
        id: 'token-model',
        nodeId: 'a4061011-1003-0000-0000-000000000000',
        title: 'Token Model (+ and −)',
        subtitle: 'Skill 3',
        icon: '🟢',
        color: '#8b5cf6',
        desc: 'Master integer addition and subtraction using positive (green) and negative (red) tokens and zero pairs.',
        practice: generateTokenQuestions,
        assessment: generateTokenQuestions,
        learn: {
            concept: 'Tokens let us physically model integers. Green = positive, Red = negative.',
            rules: [
                {
                    title: 'Token Basics',
                    img: (
                        <svg viewBox="0 0 400 100" width="100%" height="80" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="80" cy="50" r="30" fill="#10b981"/>
                            <text x="80" y="62" textAnchor="middle" fill="white" fontWeight="bold" fontSize="36">+</text>
                            <text x="80" y="95" textAnchor="middle" fontSize="12" fontWeight="700" fill="#047857">Positive Token</text>
                            
                            <circle cx="200" cy="50" r="30" fill="#ef4444"/>
                            <text x="200" y="62" textAnchor="middle" fill="white" fontWeight="bold" fontSize="36">−</text>
                            <text x="200" y="95" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">Negative Token</text>
                            
                            <text x="320" y="56" textAnchor="middle" fontSize="16" fontWeight="900" fill="#6366f1">Each = 1 unit</text>
                        </svg>
                    ),
                    f: '\\text{Green} = +1, \\text{Red} = -1',
                    d: 'A green token represents +1 (positive one) and a red token represents −1 (negative one). Use these to model any integer!',
                    ex: '+5 = five green tokens; −3 = three red tokens',
                    tip: 'Think of green as "earning" and red as "spending"!'
                },
                {
                    title: 'Zero Pairs',
                    img: (
                        <svg viewBox="0 0 400 120" width="100%" height="100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="120" cy="40" r="24" fill="#10b981"/>
                            <text x="120" y="50" textAnchor="middle" fill="white" fontWeight="bold" fontSize="28">+</text>
                            <text x="170" y="48" textAnchor="middle" fontSize="28" fontWeight="900" fill="#64748b">+</text>
                            <circle cx="220" cy="40" r="24" fill="#ef4444"/>
                            <text x="220" y="50" textAnchor="middle" fill="white" fontWeight="bold" fontSize="28">−</text>
                            <text x="280" y="48" textAnchor="middle" fontSize="28" fontWeight="900" fill="#6366f1">=</text>
                            <text x="340" y="52" textAnchor="middle" fontSize="36" fontWeight="900" fill="#f59e0b">0</text>
                            
                            <rect x="80" y="70" width="240" height="36" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
                            <text x="200" y="94" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e">One green + One red = ZERO PAIR</text>
                        </svg>
                    ),
                    f: '(+1) + (-1) = 0',
                    d: 'When a positive token and a negative token are paired, they cancel each other out. This is called a "zero pair" — its value is 0.',
                    ex: '4 green + 4 red = 4 zero pairs = 0',
                    tip: 'Remove all zero pairs first, then count what remains!'
                },
                {
                    title: 'Subtraction Trick',
                    img: (
                        <svg viewBox="0 0 400 130" width="100%" height="110" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="10" width="380" height="50" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2"/>
                            <text x="200" y="42" textAnchor="middle" fontSize="16" fontWeight="800" fill="#6d28d9">
                                Subtracting (−n) = Adding (+n)
                            </text>
                            <rect x="10" y="70" width="380" height="50" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="2"/>
                            <text x="200" y="102" textAnchor="middle" fontSize="16" fontWeight="800" fill="#dc2626">
                                5 − (−3) = 5 + 3 = 8
                            </text>
                        </svg>
                    ),
                    f: 'a - (-b) = a + b',
                    d: 'To subtract a negative, first add zero pairs until you have enough red tokens to take away. The shortcut: "subtracting a negative = adding a positive".',
                    ex: '(+3) − (−4) = (+3) + (+4) = +7',
                    tip: 'Two negatives (subtract + negative) make a positive!'
                }
            ]
        }
    },
    {
        id: 'real-world',
        nodeId: 'a4061011-1004-0000-0000-000000000000',
        title: 'Real-World Integer Contexts',
        subtitle: 'Skill 4',
        icon: '🌍',
        color: '#0891b2',
        desc: 'Apply integers to banking (credits/debits), temperature, geography (sea level), and historical timelines.',
        practice: generateRealWorldQuestions,
        assessment: generateRealWorldQuestions,
        learn: {
            concept: 'Integers are everywhere: money, temperature, altitude, and time.',
            rules: [
                {
                    title: 'Banking: Credits & Debits',
                    img: (
                        <svg viewBox="0 0 400 140" width="100%" height="120" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="10" width="180" height="120" rx="14" fill="#ecfdf5" stroke="#10b981" strokeWidth="3"/>
                            <text x="100" y="45" textAnchor="middle" fontSize="18" fontWeight="900" fill="#047857">CREDIT ↑</text>
                            <text x="100" y="75" textAnchor="middle" fontSize="14" fill="#059669">Money received</text>
                            <text x="100" y="105" textAnchor="middle" fontSize="24" fontWeight="900" fill="#10b981">+₹100</text>
                            
                            <rect x="210" y="10" width="180" height="120" rx="14" fill="#fef2f2" stroke="#ef4444" strokeWidth="3"/>
                            <text x="300" y="45" textAnchor="middle" fontSize="18" fontWeight="900" fill="#dc2626">DEBIT ↓</text>
                            <text x="300" y="75" textAnchor="middle" fontSize="14" fill="#ef4444">Money spent/owed</text>
                            <text x="300" y="105" textAnchor="middle" fontSize="24" fontWeight="900" fill="#ef4444">−₹50</text>
                        </svg>
                    ),
                    f: '\\text{Balance} = \\text{Credits} + \\text{Debits}',
                    d: 'Credits (money received) are positive. Debits (money spent) are negative. Your bank balance is the sum of all credits and debits.',
                    ex: 'Credits: +150, +200. Debits: −100, −80. Balance = 350 − 180 = +170.',
                    tip: 'If debits exceed credits, the balance becomes negative (you owe money)!'
                },
                {
                    title: 'Temperature',
                    img: (
                        <svg viewBox="0 0 400 160" width="100%" height="130" xmlns="http://www.w3.org/2000/svg">
                            <rect x="180" y="10" width="40" height="140" rx="20" fill="#f1f5f9" stroke="#64748b" strokeWidth="2"/>
                            <rect x="185" y="80" width="30" height="65" rx="15" fill="linear-gradient(to top, #ef4444, #3b82f6)"/>
                            <line x1="175" y1="80" x2="225" y2="80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2"/>
                            <text x="150" y="84" textAnchor="end" fontSize="14" fontWeight="800" fill="#f59e0b">0°C</text>
                            <text x="150" y="50" textAnchor="end" fontSize="12" fontWeight="700" fill="#10b981">+20°C (Hot)</text>
                            <text x="150" y="130" textAnchor="end" fontSize="12" fontWeight="700" fill="#ef4444">−10°C (Cold)</text>
                        </svg>
                    ),
                    f: '\\text{Above 0°C} = +, \\text{Below 0°C} = -',
                    d: 'Temperatures above freezing (0°C) are positive. Below freezing are negative. Comparing: −5°C is colder than −2°C.',
                    ex: 'Shimla: −4°C. Mumbai: +32°C. Difference = 32 − (−4) = 36°C.',
                    tip: 'Temperature drop = subtraction. A rise = addition.'
                },
                {
                    title: 'Geography: Sea Level',
                    img: (
                        <svg viewBox="0 0 400 160" width="100%" height="120" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="0" width="400" height="70" fill="#e0f2fe"/>
                            <rect x="0" y="70" width="400" height="90" fill="#bfdbfe"/>
                            <line x1="0" y1="70" x2="400" y2="70" stroke="#0369a1" strokeWidth="3"/>
                            <text x="200" y="66" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0369a1">— Sea Level (0 m) —</text>
                            
                            <polygon points="80,70 100,15 120,70" fill="#a3e635" stroke="#65a30d" strokeWidth="2"/>
                            <text x="100" y="10" textAnchor="middle" fontSize="11" fontWeight="800" fill="#166534">+500 m</text>
                            
                            <ellipse cx="300" cy="130" rx="40" ry="15" fill="#1e3a5f"/>
                            <text x="300" y="155" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e40af">−200 m</text>
                        </svg>
                    ),
                    f: '\\text{Above sea level} = +, \\text{Below} = -',
                    d: 'Heights above sea level are positive, depths below are negative. The Dead Sea is at −430 m, Mt. Everest at +8849 m.',
                    ex: 'Difference between a hill (+300 m) and a valley (−100 m) = 300 + 100 = 400 m.',
                    tip: 'The vertical distance between two points = |Height₁ − Height₂|.'
                }
            ]
        }
    }
];
