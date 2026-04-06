import React from 'react';
import {
    generateDataObservationsQuestions,
    generateTallyMarksQuestions,
    generatePictographQuestions,
    generateBarGraphQuestions
} from './dataHandling6Questions';

export const SKILLS = [
    {
        id: 'data-observations',
        nodeId: 'a4061011-0001-0000-0000-000000000000',
        title: 'Data & Observations',
        subtitle: 'Skill 1',
        icon: '📊',
        color: '#6366f1',
        desc: 'Understand what data is, recognize raw data, and identify individual observations in a dataset.',
        practice: generateDataObservationsQuestions,
        assessment: generateDataObservationsQuestions,
        learn: {
            concept: 'Data is a collection of facts and numbers gathered to give information.',
            rules: [
                {
                    title: 'The Data',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="100" y="20" width="200" height="200" rx="16" fill="#e0e7ff" stroke="#6366f1" strokeWidth="8"/>
                            <rect x="140" y="60" width="120" height="12" rx="6" fill="#6366f1" opacity="0.6"/>
                            <rect x="140" y="100" width="80" height="12" rx="6" fill="#6366f1" opacity="0.6"/>
                            <rect x="140" y="140" width="100" height="12" rx="6" fill="#6366f1" opacity="0.6"/>
                            <circle cx="300" cy="180" r="32" fill="#fcd34d" stroke="#f59e0b" strokeWidth="6"/>
                            <text x="300" y="194" fontSize="40" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#d97706">i</text>
                        </svg>
                    ),
                    f: '\\text{Numbers & Facts}',
                    d: 'Information collected for a specific purpose. It helps us answer questions without guessing.',
                    ex: 'Scores of 5 students',
                    tip: 'Data = Information.'
                },
                {
                    title: 'Observation',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <text x="200" y="130" fontSize="72" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#94a3b8" opacity="0.3">12, 5, 8, 9, 3</text>
                            <circle cx="200" cy="110" r="56" fill="#e0e7ff" stroke="#6366f1" strokeWidth="12"/>
                            <line x1="240" y1="150" x2="280" y2="190" stroke="#6366f1" strokeWidth="16" strokeLinecap="round"/>
                            <text x="200" y="136" fontSize="80" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#6366f1">8</text>
                        </svg>
                    ),
                    f: '\\text{Single Fact}',
                    d: 'Each individual entry or number in a collection of data is called an observation.',
                    ex: 'One student scoring 85',
                    tip: 'Think of one piece of the puzzle.'
                },
                {
                    title: 'Raw Data',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <text x="120" y="80" fontSize="48" fontWeight="800" fontFamily="sans-serif" fill="#f43f5e" transform="rotate(-15 120 80)">7</text>
                            <text x="280" y="100" fontSize="56" fontWeight="800" fontFamily="sans-serif" fill="#3b82f6" transform="rotate(25 280 100)">12</text>
                            <text x="180" y="180" fontSize="64" fontWeight="800" fontFamily="sans-serif" fill="#10b981" transform="rotate(-5 180 180)">3</text>
                            <text x="100" y="200" fontSize="40" fontWeight="800" fontFamily="sans-serif" fill="#8b5cf6" transform="rotate(40 100 200)">9</text>
                            <text x="300" y="200" fontSize="44" fontWeight="800" fontFamily="sans-serif" fill="#f59e0b" transform="rotate(-30 300 200)">5</text>
                            <text x="200" y="80" fontSize="52" fontWeight="800" fontFamily="sans-serif" fill="#06b6d4" transform="rotate(10 200 80)">8</text>
                        </svg>
                    ),
                    f: '\\text{Unorganized}',
                    d: 'Data collected initially before applying any sorting or arrangement. It can look very messy.',
                    ex: 'Random list: 5, 2, 9, 5, 1',
                    tip: 'Raw means "uncooked" or unready.'
                }
            ]
        }
    },
    {
        id: 'tally-marks',
        nodeId: 'a4061011-0002-0000-0000-000000000000',
        title: 'Tally Marks & Frequency',
        subtitle: 'Skill 2',
        icon: '📝',
        color: '#10b981',
        desc: 'Learn how to keep track of counting using tally marks and calculate the frequency of observations.',
        practice: generateTallyMarksQuestions,
        assessment: generateTallyMarksQuestions,
        learn: {
            concept: 'Tally marks make counting large quantities of individual items fast and reliable.',
            rules: [
                {
                    title: 'Tally Marks',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <line x1="140" y1="40" x2="140" y2="200" stroke="#10b981" strokeWidth="20" strokeLinecap="round"/>
                            <line x1="180" y1="40" x2="180" y2="200" stroke="#10b981" strokeWidth="20" strokeLinecap="round"/>
                            <line x1="220" y1="40" x2="220" y2="200" stroke="#10b981" strokeWidth="20" strokeLinecap="round"/>
                            <line x1="260" y1="40" x2="260" y2="200" stroke="#10b981" strokeWidth="20" strokeLinecap="round"/>
                            <line x1="100" y1="180" x2="300" y2="60" stroke="#059669" strokeWidth="20" strokeLinecap="round"/>
                        </svg>
                    ),
                    f: '\\|\\|, \\|\\|\\||',
                    d: 'Vertical lines drawn to count items. The fifth mark crosses the first four diagonally to make a group of 5.',
                    ex: '5 = |||| crossed',
                    tip: 'Always group in 5s for quick counting!'
                },
                {
                    title: 'Frequency',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="60" y="40" width="280" height="160" rx="24" fill="#d1fae5" stroke="#10b981" strokeWidth="8"/>
                            <text x="200" y="110" fontSize="36" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#047857">"Apples"</text>
                            <text x="200" y="160" fontSize="40" fontWeight="900" fontFamily="sans-serif" fill="#059669" textAnchor="middle">occur 7 times</text>
                            <circle cx="30" cy="50" r="20" fill="#ecfdf5" stroke="#10b981" strokeWidth="6"/>
                            <circle cx="370" cy="190" r="20" fill="#ecfdf5" stroke="#10b981" strokeWidth="6"/>
                        </svg>
                    ),
                    f: 'f = \\text{count}',
                    d: 'The number of times a particular observation occurs in the given raw data.',
                    ex: 'If 3 students get an A, frequency is 3',
                    tip: 'Frequency = How often?'
                },
                {
                    title: 'Frequency Table',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="40" y="20" width="320" height="200" fill="#fff" stroke="#10b981" strokeWidth="6" rx="8"/>
                            <path d="M 40 80 L 360 80" stroke="#10b981" strokeWidth="4"/>
                            <path d="M 146 20 L 146 220" stroke="#10b981" strokeWidth="4" opacity="0.3"/>
                            <path d="M 253 20 L 253 220" stroke="#10b981" strokeWidth="4" opacity="0.3"/>
                            
                            <rect x="40" y="20" width="320" height="60" fill="#10b981" rx="8"/>
                            <rect x="40" y="50" width="320" height="30" fill="#10b981" />
                            <text x="93" y="60" fontSize="24" fontWeight="800" fontFamily="sans-serif" fill="#fff" textAnchor="middle">Item</text>
                            <text x="200" y="60" fontSize="24" fontWeight="800" fontFamily="sans-serif" fill="#fff" textAnchor="middle">Tally</text>
                            <text x="306" y="60" fontSize="24" fontWeight="800" fontFamily="sans-serif" fill="#fff" textAnchor="middle">Freq</text>
                            
                            <text x="93" y="130" fontSize="28" fontFamily="sans-serif" fill="#334155" textAnchor="middle">Red</text>
                            <line x1="180" y1="105" x2="180" y2="145" stroke="#10b981" strokeWidth="6" strokeLinecap="round"/>
                            <line x1="200" y1="105" x2="200" y2="145" stroke="#10b981" strokeWidth="6" strokeLinecap="round"/>
                            <line x1="220" y1="105" x2="220" y2="145" stroke="#10b981" strokeWidth="6" strokeLinecap="round"/>
                            <text x="306" y="133" fontSize="32" fontWeight="800" fontFamily="sans-serif" fill="#059669" textAnchor="middle">3</text>
                            
                            <text x="93" y="190" fontSize="28" fontFamily="sans-serif" fill="#334155" textAnchor="middle">Blue</text>
                            <line x1="190" y1="165" x2="190" y2="205" stroke="#10b981" strokeWidth="6" strokeLinecap="round"/>
                            <line x1="210" y1="165" x2="210" y2="205" stroke="#10b981" strokeWidth="6" strokeLinecap="round"/>
                            <text x="306" y="193" fontSize="32" fontWeight="800" fontFamily="sans-serif" fill="#059669" textAnchor="middle">2</text>
                        </svg>
                    ),
                    f: '\\text{Table Format}',
                    d: 'A table with columns for Observation, Tally Marks, and Frequency to summarize raw data.',
                    ex: 'A summarized chart',
                    tip: 'Organizes raw data into manageable chunks.'
                }
            ]
        }
    },
    {
        id: 'pictographs',
        nodeId: 'a4061011-0003-0000-0000-000000000000',
        title: 'Interpreting Pictographs',
        subtitle: 'Skill 3',
        icon: '🖼️',
        color: '#f59e0b',
        desc: 'Represent data using pictures and symbols. Learn how to read the key and calculate total amounts.',
        practice: generatePictographQuestions,
        assessment: generatePictographQuestions,
        learn: {
            concept: 'A pictograph represents data visually using images or symbols.',
            rules: [
                {
                    title: 'The Symbol',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <text x="200" y="180" fontSize="140" textAnchor="middle">🍎</text>
                        </svg>
                    ),
                    f: '\\text{Picture Data}',
                    d: 'Using an icon (like an apple or a car) to represent quantities visually.',
                    ex: '🍎 represents apples',
                    tip: 'Pictures make data attractive!'
                },
                {
                    title: 'The Key',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="50" y="60" width="300" height="120" rx="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="8"/>
                            <text x="100" y="145" fontSize="64" textAnchor="middle">⭐</text>
                            <text x="160" y="145" fontSize="60" fontWeight="900" fontFamily="sans-serif" fill="#d97706" textAnchor="middle">=</text>
                            <text x="260" y="145" fontSize="48" fontWeight="800" fontFamily="sans-serif" fill="#b45309" textAnchor="middle">10 items</text>
                            <text x="200" y="40" fontSize="28" fontWeight="900" fontFamily="sans-serif" fill="#d97706" textAnchor="middle">LEGEND</text>
                        </svg>
                    ),
                    f: '1 \\text{ icon} = N',
                    d: 'A vital part of the pictograph telling you exactly what one full symbol equals.',
                    ex: '1 🍎 = 10 apples',
                    tip: 'Never read a pictograph without checking the key!'
                },
                {
                    title: 'Fractions',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <clipPath id="halfClipLocal">
                                <rect x="0" y="0" width="200" height="240" />
                            </clipPath>
                            <text x="200" y="180" fontSize="140" textAnchor="middle" clipPath="url(#halfClipLocal)" opacity="0.9">🍎</text>
                            <line x1="200" y1="40" x2="200" y2="200" stroke="#f59e0b" strokeWidth="8" strokeDasharray="12 8"/>
                        </svg>
                    ),
                    f: '\\text{Half Picture}',
                    d: 'Sometimes half a symbol is drawn. It represents exactly half the value assigned in the key.',
                    ex: 'Half 🍎 = 5 apples',
                    tip: 'Divide the key value by 2.'
                }
            ]
        }
    },
    {
        id: 'bar-graphs',
        nodeId: 'a4061011-0004-0000-0000-000000000000',
        title: 'Drawing & Reading Bar Graphs',
        subtitle: 'Skill 4',
        icon: '📈',
        color: '#0891b2',
        desc: 'Master the art of displaying data using uniform bars and reading values based on the axis scale.',
        practice: generateBarGraphQuestions,
        assessment: generateBarGraphQuestions,
        learn: {
            concept: 'A bar graph uses solid, uniform bars whose lengths are proportional to their value.',
            rules: [
                {
                    title: 'Uniform Width',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="100" y="60" width="60" height="140" fill="#0891b2" rx="4"/>
                            <rect x="240" y="100" width="60" height="100" fill="#0891b2" rx="4"/>
                            
                            <line x1="100" y1="40" x2="160" y2="40" stroke="#0e7490" strokeWidth="6"/>
                            <line x1="100" y1="30" x2="100" y2="50" stroke="#0e7490" strokeWidth="4"/>
                            <line x1="160" y1="30" x2="160" y2="50" stroke="#0e7490" strokeWidth="4"/>
                            
                            <line x1="240" y1="80" x2="300" y2="80" stroke="#0e7490" strokeWidth="6"/>
                            <line x1="240" y1="70" x2="240" y2="90" stroke="#0e7490" strokeWidth="4"/>
                            <line x1="300" y1="70" x2="300" y2="90" stroke="#0e7490" strokeWidth="4"/>
                            
                            <text x="130" y="24" fontSize="24" fontWeight="bold" fontFamily="sans-serif" fill="#0e7490" textAnchor="middle">W</text>
                            <text x="270" y="64" fontSize="24" fontWeight="bold" fontFamily="sans-serif" fill="#0e7490" textAnchor="middle">W</text>
                        </svg>
                    ),
                    f: '\\text{Equal Bars}',
                    d: 'All bars must have the exact same width. The gap between each bar must also be identical.',
                    ex: 'Bars of 1cm width',
                    tip: 'Only the height changes!'
                },
                {
                    title: 'The Scale',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <line x1="120" y1="20" x2="120" y2="220" stroke="#0f172a" strokeWidth="6"/>
                            <line x1="100" y1="40" x2="130" y2="40" stroke="#0f172a" strokeWidth="4"/>
                            <text x="80" y="50" fontSize="28" fontWeight="bold" fontFamily="sans-serif" fill="#0891b2" textAnchor="end">100</text>
                            
                            <line x1="100" y1="110" x2="130" y2="110" stroke="#0f172a" strokeWidth="4"/>
                            <text x="80" y="120" fontSize="28" fontWeight="bold" fontFamily="sans-serif" fill="#0891b2" textAnchor="end">50</text>
                            
                            <line x1="100" y1="180" x2="130" y2="180" stroke="#0f172a" strokeWidth="4"/>
                            <text x="80" y="190" fontSize="28" fontWeight="bold" fontFamily="sans-serif" fill="#0891b2" textAnchor="end">0</text>
                            
                            <path d="M 160 80 Q 240 -20 320 60" fill="none" stroke="#f59e0b" strokeWidth="6" strokeDasharray="8 4" markerEnd="url(#arrowScale)"/>
                            <text x="280" y="100" fontSize="24" fontWeight="bold" fontFamily="sans-serif" fill="#b45309" textAnchor="middle">Scale</text>
                            <defs>
                                <marker id="arrowScale" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b"/>
                                </marker>
                            </defs>
                        </svg>
                    ),
                    f: '1 \\text{ unit} = N',
                    d: 'The numbers marked on the axis to represent large data. It compresses giant numbers to fit the screen.',
                    ex: '1 mark = 100 students',
                    tip: 'Multiply bar height by scale to get the real number.'
                },
                {
                    title: 'Comparing',
                    img: (
                        <svg viewBox="0 0 400 240" width="100%" height="160" xmlns="http://www.w3.org/2000/svg">
                            <rect x="140" y="160" width="40" height="40" fill="#94a3b8" rx="4"/>
                            <rect x="220" y="40" width="40" height="160" fill="#0891b2" rx="4"/>
                            <line x1="100" y1="200" x2="300" y2="200" stroke="#0f172a" strokeWidth="6"/>
                            <text x="240" y="28" fontSize="28" fontWeight="900" fontFamily="sans-serif" fill="#164e63" textAnchor="middle">MAX</text>
                        </svg>
                    ),
                    f: '\\text{Tallest = Most}',
                    d: 'Bar graphs make it instantly obvious which category has the highest or lowest frequency.',
                    ex: 'Tallest bar = most popular',
                    tip: 'Bar graphs are best for quick comparisons.'
                }
            ]
        }
    }
];
