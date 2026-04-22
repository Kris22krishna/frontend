import React from 'react';
import {
    CompassCircleInteractive,
    RulerMeasurementInteractive,
    SquareRectangleCompare,
    PerpendicularConstructor,
    DiagonalExplorer,
    HouseConstructionInteractive
} from '../components/ConstructionInteractives';

export const cards5W1H = [
    {
        q: 'What?',
        label: 'What are Constructions?',
        icon: '📐',
        gradFrom: '#0ea5e9',
        gradTo: '#38bdf8',
        shadow: 'rgba(14,165,233,0.35)',
        content: `**Geometric constructions** are drawings of shapes and figures made using only a **ruler** (straight edge) and a **compass**. By mastering these two tools, you can draw perfect circles, straight lines, perpendiculars, and complex artwork!`,
        fact: "The ancient Greeks believed constructions with just a compass and straightedge were the purest form of geometry.",
        interactiveWidget: <CompassCircleInteractive />
    },
    {
        q: 'Why?',
        label: 'Why Learn Constructions?',
        icon: '🔧',
        gradFrom: '#a855f7',
        gradTo: '#c084fc',
        shadow: 'rgba(168,85,247,0.35)',
        content: `Why do we construct figures instead of just drawing freehand? Because constructions are **precise and exact**. A compass ensures every point on a circle is at the **same distance** (radius) from the center. A ruler gives perfectly straight lines. This precision is vital in architecture, engineering, and design.`,
        fact: "Every building, bridge, and machine starts with precise geometric constructions on paper.",
        interactiveWidget: <RulerMeasurementInteractive />
    },
    {
        q: 'Who?',
        label: 'Who Uses Constructions?',
        icon: '👷',
        gradFrom: '#f59e0b',
        gradTo: '#fbbf24',
        shadow: 'rgba(245,158,11,0.35)',
        content: `**Who uses geometric constructions?** Architects design buildings, engineers plan bridges, artists create symmetrical patterns, and carpenters measure precise cuts — all using the principles of constructions you'll learn here!`,
        fact: "The famous Taj Mahal was designed using exact geometric constructions for its perfect symmetry.",
        interactiveWidget: <SquareRectangleCompare />
    },
    {
        q: 'Where?',
        label: 'Where Do We See Them?',
        icon: '🏗️',
        gradFrom: '#10b981',
        gradTo: '#34d399',
        shadow: 'rgba(16,185,129,0.35)',
        content: `**Where** do you see constructions in real life? Look at floor tiles (squares and rectangles), clock faces (circles), window grills (perpendicular lines), and even the rooftops of houses (triangles formed by arcs)!`,
        fact: "The 'House' figure you'll construct later uses the same principle — finding a point equidistant from two given points using intersecting arcs.",
        interactiveWidget: <HouseConstructionInteractive />
    },
    {
        q: 'When?',
        label: 'When to Use Which Tool?',
        icon: '⏰',
        gradFrom: '#ec4899',
        gradTo: '#f472b6',
        shadow: 'rgba(236,72,153,0.35)',
        content: `**When** do you use a compass vs a ruler? Use a **ruler** to draw straight lines and measure lengths. Use a **compass** to draw circles, arcs, and to transfer (copy) lengths from one place to another without measuring!`,
        fact: "A compass can copy a length perfectly — open it to match a segment, then swing it to mark the same length elsewhere.",
        interactiveWidget: <PerpendicularConstructor />
    },
    {
        q: 'How?',
        label: 'How to Construct Step-by-Step',
        icon: '🛠️',
        gradFrom: '#ef4444',
        gradTo: '#f87171',
        shadow: 'rgba(239,68,68,0.35)',
        content: `**How** do you approach a construction? 1) Draw a **rough diagram** first to plan. 2) Identify what measurements you know. 3) Decide the **order** of steps. 4) Use the compass for curves and the ruler for straight lines. 5) Verify your figure satisfies all required properties!`,
        fact: "The diagonals of a rectangle are always equal — you can verify this after every rectangle construction!",
        interactiveWidget: <DiagonalExplorer />
    }
];
