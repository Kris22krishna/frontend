import { genCylinderP, genCylinderA, genSphereP, genSphereA, genConeP, genConeA } from './SolidGeoSkillsData_Questions';

export const SKILLS = [
    {
        id: 'cylinder', title: 'Cylinder', subtitle: 'Curved Solid', icon: '🥫', color: '#0ea5e9',
        desc: 'Calculate volume and surface area of cylinders.',
        practice: genCylinderP, assessment: genCylinderA,
        learn: {
            concept: 'A cylinder has two circular bases of radius r and a curved lateral surface of height h. Volume measures how much it holds; total surface area measures all surfaces including both circles.',
            rules: [
                { title: 'Volume', f: 'V = \\pi r^2 h', d: 'The volume equals the area of the circular base (πr²) multiplied by the height h.', ex: '$r=5, h=10 \\Rightarrow V=3.14\\times25\\times10=785$ cm³', tip: 'Think of it as stacking circles. Base area × height = volume.' },
                { title: 'Total Surface Area', f: 'SA = 2\\pi r(r + h)', d: 'Two circular ends (2πr²) plus the curved side (2πrh), simplified as 2πr(r + h).', ex: '$r=5, h=10 \\Rightarrow SA=2\\times3.14\\times5\\times15=471$ cm²', tip: 'Lateral (curved) SA = 2πrh. Add 2πr² for both circular ends to get total SA.' }
            ]
        }
    },
    {
        id: 'sphere', title: 'Sphere', subtitle: 'Curved Solid', icon: '🌍', color: '#ec4899',
        desc: 'Calculate volume and surface area of spheres.',
        practice: genSphereP, assessment: genSphereA,
        learn: {
            concept: 'A sphere is perfectly round — every point on its surface is equidistant from the centre. Its formulas involve r³ for volume and r² for surface area.',
            rules: [
                { title: 'Volume', f: 'V = \\frac{4}{3}\\pi r^3', d: 'Multiply ⁴⁄₃ × π × radius cubed. Note that r is cubed (not squared) because this is a 3D measurement.', ex: '$r=3 \\Rightarrow V=\\frac{4}{3}\\times3.14\\times27=113.04$ cm³', tip: 'Archimedes proved the sphere\'s volume is ⅔ of its circumscribed cylinder\'s volume — a beautiful result!' },
                { title: 'Surface Area', f: 'SA = 4\\pi r^2', d: 'The total curved surface area equals four times the area of a great circle.', ex: '$r=3 \\Rightarrow SA=4\\times3.14\\times9=113.04$ cm²', tip: 'Note: for r=3, V = SA numerically! This is a special coincidence, not a general rule.' }
            ]
        }
    },
    {
        id: 'cone', title: 'Cone', subtitle: 'Curved Solid', icon: '🍦', color: '#f59e0b',
        desc: 'Calculate volume and surface area of cones using slant height.',
        practice: genConeP, assessment: genConeA,
        learn: {
            concept: 'A cone has one circular base and a curved surface that tapers to a point (apex). The slant height l is the distance from the apex to the edge of the base circle (not the vertical height h).',
            rules: [
                { title: 'Volume', f: 'V = \\frac{1}{3}\\pi r^2 h', d: 'One-third of the cylinder with the same base and height. This is always exactly ⅓ of the corresponding cylinder.', ex: '$r=6, h=8 \\Rightarrow V=\\frac{1}{3}\\times3.14\\times36\\times8=301.44$ cm³', tip: 'A cone holds exactly ⅓ as much as a cylinder of the same base and height.' },
                { title: 'Total Surface Area', f: 'SA = \\pi r(r + l)', d: 'Circular base (πr²) plus curved lateral surface (πrl), simplified as πr(r + l). Slant height l = √(r² + h²).', ex: '$r=3, l=5 \\Rightarrow SA=3.14\\times3\\times8=75.36$ cm²', tip: 'If given vertical height h, find slant height first: l = √(r² + h²) using Pythagoras.' }
            ]
        }
    }
];
