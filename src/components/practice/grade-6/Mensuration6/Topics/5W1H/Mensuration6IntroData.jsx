import React from 'react';

export const cards5W1H = [
    {
        id: 'what',
        q: 'What is Mensuration?',
        label: 'The Definition',
        icon: '📐',
        gradFrom: '#0891b2',
        gradTo: '#06b6d4',
        shadow: 'rgba(6,182,212,0.4)',
        content: `**Mensuration** is the branch of mathematics that studies the measurement of geometric figures.
        
Every time we calculate the length of a boundary (perimeter), the surface space covered (area), or the capacity of a solid object (volume), we are doing mensuration. In Class 6, we focus primarily on **Perimeter** and **Area** of flat 2D shapes like rectangles and squares.`,
        fact: `The word "mensuration" comes from the Latin word *"mensura"*, which means "to measure."`,
    },
    {
        id: 'why',
        q: 'Why measure Area and Perimeter?',
        label: 'The Purpose',
        icon: '🧠',
        gradFrom: '#7c3aed',
        gradTo: '#a855f7',
        shadow: 'rgba(168,85,247,0.4)',
        content: `Imagine you want to put a fence around your garden. How much wire do you need? That is **Perimeter**! 
        
Now imagine you want to plant grass inside the garden. How much grass seed do you buy? That depends on the surface space, or the **Area**! Measuring these ensures we don't waste materials or money.`,
        fact: `Ancient Egyptians used geometry and mensuration to redraw property boundaries after the Nile river flooded every year!`,
    },
    {
        id: 'who',
        q: 'Who uses Mensuration?',
        label: 'The People',
        icon: '👷',
        gradFrom: '#ea580c',
        gradTo: '#f97316',
        shadow: 'rgba(249,115,22,0.4)',
        content: `**Almost Everyone!** 
- **Architects & Engineers** use it to design buildings and calculate materials. 
- **Farmers** use it to measure their fields for planting crops. 
- **Tailors** use it to measure cloth for making dresses. 
- Even **you** use it when wrapping a gift box or framing a picture!`,
        fact: `A "Surveyor" is a professional whose job is to precisely measure land boundaries to determine property lines.`,
    },
    {
        id: 'when',
        q: 'When do we calculate Perimeter?',
        label: 'The Boundaries',
        icon: '📏',
        gradFrom: '#059669',
        gradTo: '#10b981',
        shadow: 'rgba(16,185,129,0.4)',
        content: `We calculate **Perimeter** when we need to find the total length of the outside boundary of a closed figure. 
        
We simply add up the lengths of all the outer sides. For a rectangle, it is $2 \\times (\\text{Length} + \\text{Breadth})$. For a square, it is $4 \\times \\text{side}$!`,
        fact: `If you walk exactly along the boundary of a park and return to your starting point, the distance you walked is the perimeter!`,
        svg: `<svg viewBox="0 0 100 50" width="100%" height="80">
                <rect x="25" y="10" width="50" height="30" fill="none" stroke="#059669" stroke-width="3" stroke-dasharray="4" />
                <text x="50" y="28" text-anchor="middle" fill="#047857" font-weight="bold" font-family="sans-serif" font-size="10">Boundary</text>
              </svg>`
    },
    {
        id: 'where',
        q: 'Where does Area apply?',
        label: 'The Space Inside',
        icon: '🟩',
        gradFrom: '#eab308',
        gradTo: '#facc15',
        shadow: 'rgba(250,204,21,0.4)',
        content: `**Area** applies to the physical space enclosed *within* a boundary. We measure it in "square units" (like $\\text{cm}^2$ or $\\text{m}^2$).
        
For a rectangle, Area is $\\text{Length} \\times \\text{Breadth}$. We use Area when buying carpets for a floor, painting a flat wall, or paving a road.`,
        fact: `A chessboard has $64$ identical squares. If each square has an area of $1 \\text{ cm}^2$, the total area of the board is $64 \\text{ cm}^2$!`,
        svg: `<svg viewBox="0 0 150 60" width="100%" height="80">
                <rect x="55" y="10" width="40" height="40" fill="#fef08a" stroke="#ca8a04" stroke-width="2" />
                <path d="M55 20 L95 20 M55 30 L95 30 M55 40 L95 40 M65 10 L65 50 M75 10 L75 50 M85 10 L85 50" stroke="#ca8a04" stroke-width="0.5" />
                <text x="75" y="32" text-anchor="middle" font-size="10" font-weight="bold" fill="#a16207">Inside Space</text>
              </svg>`
    },
    {
        id: 'how',
        q: 'How do regular polygons simplify things?',
        label: 'The Method',
        icon: '⬟',
        gradFrom: '#2563eb',
        gradTo: '#3b82f6',
        shadow: 'rgba(59,130,246,0.4)',
        content: `A **Regular Polygon** is a flat shape where all sides are equal and all angles are equal (like an equilateral triangle or a square). 
        
Because all sides are the same, calculating perimeter is incredibly fast! Instead of adding every side one by one, we just multiply: 
$\\text{Perimeter} = \\text{Number of sides} \\times \\text{Length of one side}$.`,
        fact: `A stop sign is a regular octagon. It has 8 equal sides. Its perimeter is simply $8 \\times \\text{side length}$!`,
        svg: `<svg viewBox="0 0 120 80" width="100%" height="100">
                <polygon points="60,10 90,30 90,65 60,85 30,65 30,30" fill="none" stroke="#2563eb" stroke-width="3" />
                <text x="60" y="52" text-anchor="middle" fill="#1e40af" font-weight="bold" font-size="12">Hexagon</text>
                <text x="60" y="100" text-anchor="middle" fill="#1e3a8a" font-size="9">6 Equal Sides</text>
              </svg>`
    }
];
