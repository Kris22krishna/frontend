import { genCircumferenceP, genCircumferenceA, genAreaP, genAreaA, genArcSectorP, genArcSectorA } from './CirclesSkillsData_Questions';

export const SKILLS = [
    {
        id: 'circumference', title: 'Circumference', subtitle: 'Perimeter of a Circle', icon: '⭕', color: '#0ea5e9',
        desc: 'Calculate the total distance around a circle using radius or diameter.',
        practice: genCircumferenceP, assessment: genCircumferenceA,
        learn: {
            concept: 'The circumference is the total distance around a circle. It is related to the diameter by the constant π (pi ≈ 3.14159), which is the same for every circle of any size.',
            rules: [
                { title: 'Using Radius', f: 'C = 2\\pi r', d: 'Multiply the radius by 2π to get the circumference. Always check if the question gives radius or diameter.', ex: '$r=7 \\Rightarrow C=2\\times3.14\\times7=43.96$ cm', tip: 'If given diameter, halve it to get radius first, OR use C = πd directly.' },
                { title: 'Using Diameter', f: 'C = \\pi d', d: 'Multiply the diameter by π. The diameter is twice the radius.', ex: '$d=10 \\Rightarrow C=3.14\\times10=31.4$ cm', tip: 'Memorise: d = 2r. Exams often switch between giving radius and diameter.' }
            ]
        }
    },
    {
        id: 'area', title: 'Area of a Circle', subtitle: 'Surface Enclosed', icon: '🔴', color: '#f43f5e',
        desc: 'Find the area enclosed within a circle using the radius.',
        practice: genAreaP, assessment: genAreaA,
        learn: {
            concept: 'The area of a circle is the total surface it covers. It grows with the square of the radius, meaning doubling the radius quadruples the area.',
            rules: [
                { title: 'Area Formula', f: 'A = \\pi r^2', d: 'Square the radius and multiply by π. Note: area uses r², not r.', ex: '$r=5 \\Rightarrow A=3.14\\times25=78.5$ cm²', tip: 'The most common mistake is confusing C = 2πr with A = πr² — note that area uses r squared.' },
                { title: 'Finding Radius from Area', f: 'r = \\sqrt{\\frac{A}{\\pi}}', d: 'Rearrange the area formula: divide area by π and take the square root.', ex: '$A=78.5 \\Rightarrow r=\\sqrt{78.5/3.14}=\\sqrt{25}=5$ cm', tip: 'Always take the positive square root — radius cannot be negative.' }
            ]
        }
    },
    {
        id: 'arc-sector', title: 'Arc & Sector', subtitle: 'Parts of a Circle', icon: '🍕', color: '#8b5cf6',
        desc: 'Calculate arc length and sector area using the central angle.',
        practice: genArcSectorP, assessment: genArcSectorA,
        learn: {
            concept: 'A sector is a fraction of the full circle, like a pizza slice. The fraction is determined by the central angle θ divided by 360°. Both arc length and sector area use this fraction.',
            rules: [
                { title: 'Arc Length', f: 'l = \\frac{\\theta}{360°} \\times 2\\pi r', d: 'Multiply the full circumference by the angle fraction (θ/360°).', ex: '$\\theta=90°, r=8 \\Rightarrow l=\\frac{90}{360}\\times2\\times3.14\\times8=12.56$ cm', tip: 'Think: arc length = fraction of circumference. 90° = quarter circle, so arc = ¼ × C.' },
                { title: 'Sector Area', f: 'A = \\frac{\\theta}{360°} \\times \\pi r^2', d: 'Multiply the full circle area by the angle fraction (θ/360°).', ex: '$\\theta=90°, r=8 \\Rightarrow A=\\frac{90}{360}\\times3.14\\times64=50.24$ cm²', tip: 'Sector area = fraction of full circle area. Use the same θ/360 fraction for both arc and sector formulas.' }
            ]
        }
    }
];
