import React from 'react';
import DefiningFractionsInteractive from './Interactives/DefiningFractionsInteractive';
import ComponentsInteractive from './Interactives/ComponentsInteractive';
import EverydayFractionsAnimated from './Interactives/EverydayFractionsAnimated';
import EquivalentFractionsSlider from './Interactives/EquivalentFractionsSlider';
import MixedFractionStacker from './Interactives/MixedFractionStacker';
import CombiningFractionsInteractive from './Interactives/CombiningFractionsInteractive';

// Common SVGs mapped to the 5W1H data
export const cards5W1H = [
    {
        q: 'What?',
        label: 'Defining Fractions',
        icon: '🍕',
        gradFrom: '#0ea5e9',
        gradTo: '#38bdf8',
        shadow: 'rgba(14,165,233,0.35)',
        content: `A **fraction** represents a part of a whole or a collection. When a whole is divided into equal parts, each part becomes a **fractional unit** (like $$\\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}$$).`,
        fact: "The word fraction comes from the Latin word 'fractio', meaning 'to break'.",
        interactiveWidget: <DefiningFractionsInteractive />
    },
    {
        q: 'Why?',
        label: 'Components of a Fraction',
        icon: '🔢',
        gradFrom: '#a855f7',
        gradTo: '#c084fc',
        shadow: 'rgba(168,85,247,0.35)',
        content: `Why do fractions have a top and bottom number? The **denominator** (bottom) shows how many equal parts the whole is divided into. The **numerator** (top) tells us how many of those parts we have.`,
        fact: "Together they describe an exact quantity, like 3 times the fractional unit of $$\\frac{1}{4}$$ equals $$\\frac{3}{4}$$.",
        interactiveWidget: <ComponentsInteractive />
    },
    {
        q: 'Who?',
        label: 'Everyday Users',
        icon: '👨‍👩‍👧‍👦',
        gradFrom: '#f59e0b',
        gradTo: '#fbbf24',
        shadow: 'rgba(245,158,11,0.35)',
        content: `**Who uses fractions?** Everybody! From carpenters dividing wood, to you sharing a roti or chikki equally with your siblings.`,
        fact: "In ancient India, the Rig Veda referred to the fraction $$\\frac{3}{4}$$ as 'tri-pada'.",
        interactiveWidget: <EverydayFractionsAnimated />
    },
    {
        q: 'Where?',
        label: 'Spotting Equivalents',
        icon: '⚖️',
        gradFrom: '#10b981',
        gradTo: '#34d399',
        shadow: 'rgba(16,185,129,0.35)',
        content: `Where do we see **equivalent fractions**? When portions mean the exact same amount. Sharing 2 rotis among 4 children yields the same size share as 1 roti between 2 children ($$\\frac{2}{4} = \\frac{1}{2}$$)!`,
        fact: "Fractions in different forms can describe the exact same quantity.",
        interactiveWidget: <EquivalentFractionsSlider />
    },
    {
        q: 'When?',
        label: 'Fractions > 1',
        icon: '📦',
        gradFrom: '#ec4899',
        gradTo: '#f472b6',
        shadow: 'rgba(236,72,153,0.35)',
        content: `**When** is a fraction more than 1 whole unit? When the numerator is greater than the denominator. We call these improper fractions, which can be rearranged into **Mixed Fractions** (like $$1\\frac{1}{2}$$).`,
        fact: "For example, 3 halves ($$\\frac{3}{2}$$) is the same as one full unit plus a half ($$1 + \\frac{1}{2}$$).",
        interactiveWidget: <MixedFractionStacker />
    },
    {
        q: 'How?',
        label: 'Combining',
        icon: '🛠️',
        gradFrom: '#ef4444',
        gradTo: '#f87171',
        shadow: 'rgba(239,68,68,0.35)',
        content: `**How** do we compare or add fractions? We map them to the same denominator first. Once they share the same fractional unit (like pieces of the same size), we can easily add their numerators!`,
        fact: "Comparing $$\\frac{3}{4}$$ and $$\\frac{7}{10}$$ is much easier if you convert both to fractions over 40!",
        interactiveWidget: <CombiningFractionsInteractive />
    }
];
