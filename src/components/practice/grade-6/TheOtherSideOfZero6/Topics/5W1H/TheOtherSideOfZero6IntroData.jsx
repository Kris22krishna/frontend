import React from 'react';
import liftImg from '../../assets/lift_building_integers_1776748747985.png';
import tempImg from '../../assets/temperature_integers_1776748763645.png';
import seaImg from '../../assets/sea_level_integers_1776748885403.png';
import tokenImg from '../../assets/token_integers_1776748900797.png';

export const cards5W1H = [
    {
        id: 'what',
        q: 'What are Integers?',
        label: 'The Definition',
        icon: '🔢',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.4)',
        content: `**Integers** are a collection of numbers that include all positive numbers, all negative numbers, and zero. For example: ... -3, -2, -1, 0, 1, 2, 3 ...
        
Unlike fractions or decimals, integers represent "whole" steps on a number line without any parts broken off. Zero is right in the middle—it's neither positive nor negative!`,
        fact: `The word "Integer" comes from Latin, meaning "whole" or "untouched".`,
    },
    {
        id: 'why',
        q: 'Why do we need Negative Numbers?',
        label: 'The Purpose',
        icon: '🤔',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.4)',
        content: `Imagine an elevator only going up from the ground floor. What about the basement? We need a way to represent going **below zero** or in the **opposite direction**. 
        
Negative numbers solve this! They help us measure freezing temperatures below zero, basement floors in a building, or even money we owe (a debt).`,
        fact: `Mathematicians in ancient India, like Brahmagupta (around 628 CE), were among the first to formally use negative numbers to represent debts!`,
        image: liftImg
    },
    {
        id: 'who',
        q: 'Who uses Integers?',
        label: 'The People',
        icon: '👨‍🚀',
        gradFrom: '#ea580c',
        gradTo: '#f97316',
        shadow: 'rgba(249,115,22,0.4)',
        content: `**Everyone!** 
- **Bankers** use negatives for withdrawals and positives for deposits. 
- **Scientists** measure extremely cold temperatures in negative degrees. 
- **Geographers** measure valleys and ocean trenches as negative elevations below sea level. 
- **Astronauts** use negatives for the countdown before rocket launch: "T-minus 10, 9, 8..."`,
        fact: `In accounting, negative numbers are traditionally written in red ink, which is where the phrase "being in the red" (in debt) comes from!`,
        image: tokenImg
    },
    {
        id: 'when',
        q: 'When do numbers cancel out?',
        label: 'The Timing',
        icon: '⚖️',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.4)',
        content: `Numbers cancel out when we combine a positive integer and a negative integer of the exact same size. These are called **inverses** or **Zero Pairs**.
        
If you earn 5 tokens (+5) but then spend 5 tokens (-5), you are left with zero. $(+5) + (-5) = 0$! Positive and negative forces balance each other perfectly.`,
        fact: `Zero was a revolutionary concept in mathematics because bringing a value to "nothing" required a number just to hold the place!`,
        svg: `<svg viewBox="0 0 100 50" width="100%" height="80">
                <circle cx="30" cy="25" r="15" fill="#10b981" />
                <text x="30" y="32" text-anchor="middle" fill="white" font-weight="bold" font-size="20">+</text>
                <circle cx="70" cy="25" r="15" fill="#ef4444" />
                <text x="70" y="32" text-anchor="middle" fill="white" font-weight="bold" font-size="20">-</text>
                <text x="50" y="30" text-anchor="middle" font-weight="bold" font-size="20">+</text>
              </svg>`
    },
    {
        id: 'where',
        q: 'Where is Zero located?',
        label: 'The Location',
        icon: '📍',
        gradFrom: '#eab308',
        gradTo: '#facc15',
        shadow: 'rgba(250,204,21,0.4)',
        content: `Zero is the **reference point** or starting mark. 
        
For temperature, 0°C is the freezing point of water. Things hotter are positive, and frozen things are negative. For geography, "Sea Level" is 0. Mountains are positive, and the ocean floor is negative!`,
        fact: `The deepest point in the ocean is the Mariana Trench, which has an elevation of approx -10,984 meters!`,
        image: seaImg
    },
    {
        id: 'how',
        q: 'How do we compare them?',
        label: 'The Method',
        icon: '📏',
        gradFrom: '#2563eb',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.4)',
        content: `Using a number line! Imagine walking along it. 
        
Numbers to the **right are always greater** than numbers to the left. This means $+5 > +2$, but it also means $-2 > -5$! Think about temperature: $-2°C$ is warmer (greater) than a freezing $-5°C$.`,
        fact: `Every negative integer is smaller than zero, and smaller than any positive integer!`,
        image: tempImg
    }
];
