import React from 'react';

export const cards5W1H = [
    {
        id: 'what',
        q: 'What is Data?',
        label: 'The Definition',
        icon: '📊',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.4)',
        content: `**Data** is a collection of numbers gathered to give some information.
        
Every time we record how many runs a cricketer scored, what temperature it was during the week, or how many absent students there are in class, we are collecting data. Data handles raw facts and figures.`,
        fact: `The word "data" is technically plural! The singular form is "datum," though people commonly use "data" for both.`,
    },
    {
        id: 'why',
        q: 'Why organize Data?',
        label: 'The Purpose',
        icon: '🧠',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.4)',
        content: `Unorganized data is just a confusing list of numbers! We organize data so we can **make sense of it quickly**. 
        
By organizing data into tables or charts, we can easily answer questions like *"Who scored the highest?"* or *"Which is the most popular fruit?"* without having to recount everything.`,
        fact: `When data is initially collected in an unorganized way, it's called "Raw Data."`,
    },
    {
        id: 'who',
        q: 'Who uses Data Handling?',
        label: 'The People',
        icon: '👨‍💼',
        gradFrom: '#ea580c',
        gradTo: '#f97316',
        shadow: 'rgba(249,115,22,0.4)',
        content: `**Everyone!** 
- **Teachers** use it to track test scores. 
- **Scientists** use it to record weather patterns. 
- **Business owners** use it to see what products sell best. 
- Even **you** use it when you count your pocket money or see your video game stats!`,
        fact: `A "Data Scientist" is someone whose entire job is to analyze giant amounts of data to find hidden patterns!`,
    },
    {
        id: 'when',
        q: 'When do we use Tally Marks?',
        label: 'The Timing',
        icon: '📝',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.4)',
        content: `We use **Tally Marks** when we need to count large numbers or count things as they happen one by one. 
        
Instead of writing numbers that constantly change, we draw straight lines $\\|\\|, \\|\\|\\|, \\|\\|\\|\\|$ and group them in fives by crossing the fifth line. This makes counting fast and error-free!`,
        fact: `Tally marks have been used for thousands of years. Early humans carved tally marks into bones to keep track of hunting or days!`,
        svg: `<svg viewBox="0 0 100 50" width="100%" height="80">
                <g stroke="#059669" stroke-width="4" stroke-linecap="round">
                    <line x1="20" y1="10" x2="20" y2="40" />
                    <line x1="35" y1="10" x2="35" y2="40" />
                    <line x1="50" y1="10" x2="50" y2="40" />
                    <line x1="65" y1="10" x2="65" y2="40" />
                    <line x1="10" y1="25" x2="75" y2="25" />
                    <line x1="85" y1="10" x2="85" y2="40" />
                </g>
                <text x="50" y="55" text-anchor="middle" fill="#047857" font-weight="bold" font-family="sans-serif">Tally Mark for 6</text>
              </svg>`
    },
    {
        id: 'where',
        q: 'Where do we use Pictographs?',
        label: 'The Location',
        icon: '🖼️',
        gradFrom: '#eab308',
        gradTo: '#facc15',
        shadow: 'rgba(250,204,21,0.4)',
        content: `A **Pictograph** uses pictures or symbols to represent data. We use them where we want data to look attractive and easy to understand at a glance.
        
For example, a chart showing the number of apples sold might use a picture of an apple 🍎 to represent 10 apples.`,
        fact: `Pictographs were one of the earliest forms of writing, used in ancient Egypt (hieroglyphics) and Mesopotamia!`,
        svg: `<svg viewBox="0 0 150 60" width="100%" height="80">
                <text x="10" y="30" font-size="20">🍎</text>
                <text x="40" y="30" font-size="20">🍎</text>
                <text x="70" y="30" font-size="20">🍎</text>
                <text x="100" y="25" font-size="14" font-weight="bold" fill="#ca8a04">= 30 Apples</text>
                <text x="60" y="55" text-anchor="middle" fill="#a16207" font-size="12" font-weight="bold">If 1 🍎 = 10 Apples</text>
              </svg>`
    },
    {
        id: 'how',
        q: 'How do Bar Graphs help us?',
        label: 'The Method',
        icon: '📊',
        gradFrom: '#2563eb',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.4)',
        content: `Sometimes displaying pictures takes too much time. So, we use **Bar Graphs**! 
        
A bar graph uses solid bars of uniform width. The height (or length) of each bar tells us the quantity. They make comparing different groups super easy—tallest bar means the highest amount!`,
        fact: `In a bar graph, the bars can be drawn vertically or horizontally, but the width of the bars and the gap between them must remain the same!`,
        svg: `<svg viewBox="0 0 120 80" width="100%" height="100">
                <line x1="20" y1="10" x2="20" y2="70" stroke="#1e3a8a" stroke-width="2" /> <!-- Y Axis -->
                <line x1="20" y1="70" x2="110" y2="70" stroke="#1e3a8a" stroke-width="2" /> <!-- X Axis -->
                <rect x="30" y="40" width="15" height="30" fill="#3b82f6" rx="2" />
                <rect x="55" y="20" width="15" height="50" fill="#6366f1" rx="2" />
                <rect x="80" y="50" width="15" height="20" fill="#0ea5e9" rx="2" />
                <text x="62" y="10" text-anchor="middle" fill="#1e40af" font-weight="bold" font-size="8">Bar Graph</text>
              </svg>`
    }
];
