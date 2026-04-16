import React from 'react';
import { 
    DynamicChikkiBar, 
    CircularPieFraction, 
    StaticNumberLine, 
    EquivalentFractionStrips, 
    AdditionVisualizer 
} from '../components/FractionsDynamicCharts';
import { fractionsQuestions } from './fractions6Questions';

// Extract subsets of questions per skill (20 per skill as requested)
const getQuestions = (skillId) => {
    return fractionsQuestions.filter(q => q.skill === skillId);
};

export const SKILLS = [
    {
        id: 'parts-of-a-whole',
        nodeId: 'parts-of-a-whole',
        title: 'Parts of a Whole',
        subtitle: 'Skill 1',
        desc: 'Understand how a whole object like a roti or chikki is broken down into equal fractional units.',
        color: '#f59e0b',
        icon: '🍕',
        learn: {
            rules: [
                {
                    title: 'Fractional Units',
                    f: '\\text{Fraction} = \\frac{\\text{Parts you have}}{\\text{Total equal parts}}',
                    d: 'When one unit is divided into several equal parts, each part is called a fractional unit. If you divide a chikki into 4 equal pieces, the fractional unit is $$\\frac{1}{4}$$. If you take 3 such pieces, you have $$\\frac{3}{4}$$ of the chikki.',
                    tip: 'Count the total number of parts first. That’s your denominator!',
                    ex: '3 out of 4 slices = $$\\frac{3}{4}$$',
                    img: <DynamicChikkiBar numCols={4} filledCols={3} />
                },
                {
                    title: 'Numerator and Denominator',
                    f: '\\frac{\\text{Numerator (Top)}}{\\text{Denominator (Bottom)}}',
                    d: 'The **Denominator** tells you how many equal pieces the whole is cut into. The **Numerator** tells you how many of those pieces you are counting.',
                    tip: 'Think: D for Down (Denominator).',
                    ex: 'In $$\\frac{5}{8}$$, 5 is the Numerator, 8 is the Denominator.',
                    img: <CircularPieFraction totalSlices={8} filledSlices={5} />
                }
            ]
        },
        practice: getQuestions('parts-of-a-whole'),
        assessment: getQuestions('parts-of-a-whole')
    },
    {
        id: 'number-line',
        nodeId: 'number-line',
        title: 'Number Line Representation',
        subtitle: 'Skill 2',
        desc: 'Learn how to visualize and plot the exact lengths of fractions between numbers like 0 and 1.',
        color: '#8b5cf6',
        icon: '📏',
        learn: {
            rules: [
                {
                    title: 'Spacing is Key',
                    f: '\\text{Between 0 and 1}',
                    d: 'A fraction acts like a distance on a ruler. The distance between 0 and 1 represents `1 whole unit`. To find $$\\frac{3}{5}$$, divide the space between 0 and 1 into 5 equal jumps, and go forward 3 jumps.',
                    tip: 'The number of jumps between 0 and 1 should equal the denominator.',
                    ex: 'Marker placed at 3 out of 5 subdivisions.',
                    img: <StaticNumberLine fraction="3/5" />
                },
                {
                    title: 'Greater than 1',
                    f: '\\text{Past 1 whole unit}',
                    d: 'If the numerator is larger than the denominator, the fraction exists past 1! For example, $$\\frac{7}{4}$$ means you need to split every whole unit into 4 parts, and take 7 jumps. That places you past 1 whole.',
                    tip: 'Improper fractions are always > 1.',
                    ex: 'Marker placed at $$\\frac{7}{4}$$, which is $$1 \\frac{3}{4}$$.',
                    img: <StaticNumberLine fraction="7/4" maxUnit={2} />
                }
            ]
        },
        practice: getQuestions('number-line'),
        assessment: getQuestions('number-line')
    },
    {
        id: 'equivalent-mixed',
        nodeId: 'equivalent-mixed',
        title: 'Mixed & Equivalent Fractions',
        subtitle: 'Skill 3',
        desc: 'Identify fractions that look different but have the same value, and convert improper fractions into mixed numbers.',
        color: '#10b981',
        icon: '⚖️',
        learn: {
            rules: [
                {
                    title: 'Equivalent Fractions',
                    f: '\\frac{1}{2} = \\frac{1 \\times 2}{2 \\times 2} = \\frac{2}{4}',
                    d: 'Two fractions are equivalent if they represent the exact same quantity. Multiplying or dividing both the numerator and denominator by the same number yields an equivalent fraction.',
                    tip: 'Always do the same operation to the top and bottom!',
                    ex: '1 out of 2 parts is identical in size to 2 out of 4 parts.',
                    img: <EquivalentFractionStrips />
                },
                {
                    title: 'Improper to Mixed',
                    f: '\\frac{5}{3} = 1 \\frac{2}{3}',
                    d: 'When the numerator is bigger than the denominator, you have an improper fraction. Divide the numerator by the denominator to get the whole number (quotient), and write the remainder over the original denominator to get the fraction.',
                    tip: 'Keep the original denominator the same.',
                    ex: '$$5 \\div 3 = 1$$ with remainder $$2 \\rightarrow 1 \\frac{2}{3}$$',
                    img: <EquivalentFractionStrips num1={5} den1={3} num2={5} den2={3} />
                }
            ]
        },
        practice: getQuestions('equivalent-mixed'),
        assessment: getQuestions('equivalent-mixed')
    },
    {
        id: 'comparing-operations',
        nodeId: 'comparing-operations',
        title: 'Comparing & Operations',
        subtitle: 'Skill 4',
        desc: 'Compare, add, and subtract fractions by finding a common denominator that ensures equal slice sizes.',
        color: '#ef4444',
        icon: '➕',
        learn: {
            rules: [
                {
                    title: 'Comparing Sizes',
                    f: '\\frac{\\text{Larger Numerator}}{\\text{Common Denominator}} = \\text{Larger Value}',
                    d: 'If two fractions share the same denominator, the one with the larger numerator is bigger. If the denominators are different, you must find a common denominator first to ensure fairness.',
                    tip: 'To compare $$\\frac{3}{4}$$ and $$\\frac{4}{5}$$, convert both to 20ths! $$\\frac{15}{20} < \\frac{16}{20}$$',
                    ex: '$$\\frac{3}{4}$$ vs $$\\frac{4}{5}$$',
                    img: <EquivalentFractionStrips num1={15} den1={20} num2={16} den2={20} color1="#3b82f6" color2="#ef4444" />
                },
                {
                    title: 'Adding with Common Denominators',
                    f: '\\frac{a}{d} + \\frac{b}{d} = \\frac{a+b}{d}',
                    d: 'You can only add or subtract fractions smoothly if their fractional units (denominators) are identical. Once they match, simply add or subtract the numerators and keep the denominator the exact same.',
                    tip: 'Never add the denominators together!',
                    ex: '$$\\frac{1}{4} + \\frac{2}{4} = \\frac{3}{4}$$',
                    img: <AdditionVisualizer />
                }
            ]
        },
        practice: getQuestions('comparing-operations'),
        assessment: getQuestions('comparing-operations')
    }
];
