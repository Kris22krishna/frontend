import React from 'react';
import ButterflyReflectionInteractive from './Interactives/ButterflyReflectionInteractive';
import InkBlotMirrorInteractive from './Interactives/InkBlotMirrorInteractive';
import MultipleSymmetryLinesInteractive from './Interactives/MultipleSymmetryLinesInteractive';
import TajMahalSymmetryInteractive from './Interactives/TajMahalSymmetryInteractive';
import RotationalWindmillInteractive from './Interactives/RotationalWindmillInteractive';
import PaperPunchInteractive from './Interactives/PaperPunchInteractive';

export const cards5W1H = [
    {
        q: 'What?',
        label: 'What Is Symmetry?',
        icon: '🦋',
        gradFrom: '#0ea5e9',
        gradTo: '#38bdf8',
        shadow: 'rgba(14,165,233,0.35)',
        content: `**Symmetry** is when parts of a figure repeat in a definite pattern. A butterfly's left wing is a perfect mirror of its right wing along its body. We call such figures **symmetrical**.`,
        fact: "The word symmetry comes from the Greek 'symmetria', meaning 'agreement in dimensions'. Nature is full of symmetry — from leaves to snowflakes!",
        interactiveWidget: <ButterflyReflectionInteractive />
    },
    {
        q: 'Why?',
        label: 'Why Do Patterns Mirror?',
        icon: '🪞',
        gradFrom: '#a855f7',
        gradTo: '#c084fc',
        shadow: 'rgba(168,85,247,0.35)',
        content: `Why does folding along a special line make both halves overlap perfectly? Because that line divides the figure into two **mirror halves**. This line is called a **Line of Symmetry** (or Axis of Symmetry).`,
        fact: "When you spill ink on one half of a folded paper and press, the blob creates a perfectly symmetric ink-blot devil — try it!",
        interactiveWidget: <InkBlotMirrorInteractive />
    },
    {
        q: 'Where?',
        label: 'Symmetry in Architecture',
        icon: '🕌',
        gradFrom: '#f59e0b',
        gradTo: '#fbbf24',
        shadow: 'rgba(245,158,11,0.35)',
        content: `**Where** do we see symmetry? Everywhere! The Taj Mahal, Gopurams, Rangoli patterns, and even the Parliament building all have beautiful lines of symmetry that architects plan carefully.`,
        fact: "The Taj Mahal has a single vertical line of symmetry running through its central dome and gateway. Its perfect balance is what makes it one of the world's most beautiful structures.",
        interactiveWidget: <TajMahalSymmetryInteractive />
    },
    {
        q: 'How Many?',
        label: 'Multiple Lines of Symmetry',
        icon: '📐',
        gradFrom: '#10b981',
        gradTo: '#34d399',
        shadow: 'rgba(16,185,129,0.35)',
        content: `A figure can have **more than one** line of symmetry! A square has **4 lines** of symmetry (vertical, horizontal, and two diagonal). An equilateral triangle has **3**, and a regular hexagon has **6**!`,
        fact: "The number of lines of symmetry of a regular polygon equals the number of its sides. A regular 10-sided polygon (decagon) has exactly 10 lines of symmetry.",
        interactiveWidget: <MultipleSymmetryLinesInteractive />
    },
    {
        q: 'When?',
        label: 'Rotational Symmetry',
        icon: '🎡',
        gradFrom: '#ec4899',
        gradTo: '#f472b6',
        shadow: 'rgba(236,72,153,0.35)',
        content: `**When** you rotate a windmill by 90° about its centre, it looks exactly the same! This is called **Rotational Symmetry**. The smallest angle that makes the figure overlap itself is the **angle of symmetry**.`,
        fact: "A windmill has 4 angles of symmetry: 90°, 180°, 270°, and 360°. The angles are always multiples of the smallest one!",
        interactiveWidget: <RotationalWindmillInteractive />
    },
    {
        q: 'How?',
        label: 'Paper Folding & Punching',
        icon: '✂️',
        gradFrom: '#ef4444',
        gradTo: '#f87171',
        shadow: 'rgba(239,68,68,0.35)',
        content: `**How** do we create symmetric patterns? Fold a piece of paper along a line of symmetry, then punch holes or make cuts. When you unfold, every hole appears on both sides — perfectly mirrored!`,
        fact: "If you fold a paper along two perpendicular lines (both vertical and horizontal) and punch one hole, you get 4 symmetric holes when you unfold!",
        interactiveWidget: <PaperPunchInteractive />
    }
];
