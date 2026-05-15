import { genRectangleP, genRectangleA, genTriAreaP, genTriAreaA, genCircleP, genCircleA, genCuboidP, genCuboidA } from './MensurationSkillsData_Questions';

export const SKILLS = [
    {
        id: 'rectangles', title: 'Rectangles & Squares', subtitle: '2D Shapes', icon: '🟦', color: '#0ea5e9',
        desc: 'Calculate perimeter and area of rectangles and squares.',
        practice: genRectangleP, assessment: genRectangleA,
        learn: {
            concept: 'Rectangles are the most common shape in everyday life — rooms, screens, pages. Knowing their perimeter (boundary length) and area (surface covered) is essential for countless practical problems.',
            rules: [
                { title: 'Perimeter', f: 'P = 2(l + w)', d: 'Add the length and width, then multiply by 2. For a square, all four sides are equal so P = 4s.', ex: '$l=10, w=4 \\Rightarrow P=2(10+4)=28$ cm', tip: 'Perimeter uses the same units as sides (cm). Area uses cm² — don\'t confuse them.' },
                { title: 'Area', f: 'A = l \\times w', d: 'Multiply length by width. For a square, A = s². Area is the amount of surface the rectangle covers.', ex: '$l=10, w=4 \\Rightarrow A=40$ cm²', tip: 'If you know area and one side, find the other: missing side = Area ÷ known side.' }
            ]
        }
    },
    {
        id: 'triangle-area', title: 'Triangle Area', subtitle: '2D Shapes', icon: '🔺', color: '#f59e0b',
        desc: 'Find areas of triangles using the base-height formula.',
        practice: genTriAreaP, assessment: genTriAreaA,
        learn: {
            concept: 'The triangle area formula works for every type of triangle. The key is that the height must be perpendicular (at 90°) to the chosen base.',
            rules: [
                { title: 'Area Formula', f: 'A = \\frac{1}{2} \\times b \\times h', d: 'Multiply base by perpendicular height and divide by 2. Any side can be the base — pair it with the corresponding height.', ex: '$b=12, h=8 \\Rightarrow A=\\frac{1}{2}\\times12\\times8=48$ cm²', tip: 'For an obtuse triangle, the height may fall outside the triangle — extend the base and measure the perpendicular.' }
            ]
        }
    },
    {
        id: 'circles', title: 'Circle Mensuration', subtitle: '2D Shapes', icon: '⭕', color: '#f43f5e',
        desc: 'Calculate circumference and area of circles.',
        practice: genCircleP, assessment: genCircleA,
        learn: {
            concept: 'All circle measurements use π (≈ 3.14). The area grows with r² while the circumference grows with r — so doubling the radius doubles the circumference but quadruples the area.',
            rules: [
                { title: 'Area & Circumference', f: 'A = \\pi r^2, \\quad C = 2\\pi r', d: 'Area uses radius squared; circumference uses just radius. Always identify which you need.', ex: '$r=7 \\Rightarrow A=3.14\\times49=153.86$ cm², $C=2\\times3.14\\times7=43.96$ cm', tip: 'Diameter = 2r. If given diameter, halve it first before using either formula.' }
            ]
        }
    },
    {
        id: 'cuboids', title: 'Cuboid Volume & SA', subtitle: '3D Shapes', icon: '📦', color: '#8b5cf6',
        desc: 'Find volume and surface area of cuboids and cubes.',
        practice: genCuboidP, assessment: genCuboidA,
        learn: {
            concept: 'A cuboid has 6 rectangular faces. Volume measures how much space it occupies (cubic units). Surface area measures all 6 faces combined (square units).',
            rules: [
                { title: 'Volume', f: 'V = l \\times w \\times h', d: 'Multiply all three dimensions together. For a cube (l=w=h=s), V = s³.', ex: '$l=5, w=4, h=3 \\Rightarrow V=60$ cm³', tip: 'Volume is in cubic units (cm³). Exams often ask you to compare volumes of different shapes.' },
                { title: 'Surface Area', f: 'SA = 2(lw + lh + wh)', d: 'There are 3 pairs of identical faces. Calculate each pair\'s area and add them all together.', ex: '$l=5, w=4, h=3 \\Rightarrow SA=2(20+15+12)=94$ cm²', tip: 'Draw a net (unfolded box) to visualise the 6 faces if you\'re confused about which faces to include.' }
            ]
        }
    }
];
