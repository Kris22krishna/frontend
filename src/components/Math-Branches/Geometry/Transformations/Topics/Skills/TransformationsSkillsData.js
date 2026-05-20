import { genTranslationP, genTranslationA, genReflectionP, genReflectionA, genRotationP, genRotationA, genDilationP, genDilationA } from './TransformationsSkillsData_Questions';

export const SKILLS = [
    {
        id: 'translation', title: 'Translation', subtitle: 'Isometric Transformation', icon: '➡️', color: '#06b6d4',
        desc: 'Translate points and shapes using column vectors.',
        practice: genTranslationP, assessment: genTranslationA,
        learn: {
            concept: 'A translation slides every point of a shape by the same vector (a, b). The shape does not rotate or flip — it simply shifts position. The image is congruent (identical in size and shape) to the pre-image.',
            rules: [
                { title: 'Translation Rule', f: '(x, y) \\to (x + a,\\; y + b)', d: 'Add the vector components to each coordinate. The vector (a, b) tells you: a = horizontal shift (right if positive), b = vertical shift (up if positive).', ex: '$\\text{Point } (3, 1),\\text{ vector } (2, -4) \\Rightarrow (5, -3)$', tip: 'To reverse (undo) a translation by (a, b), translate by (−a, −b).' },
                { title: 'Vector Notation', f: '\\vec{v} = \\begin{pmatrix} a \\\\ b \\end{pmatrix}', d: 'Translations are described by a column vector. The top number is the horizontal component, the bottom is the vertical.', ex: '$\\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix}$ means right 3, down 2', tip: 'Translations preserve length, angle, and orientation — the shape looks exactly the same, just in a new position.' }
            ]
        }
    },
    {
        id: 'reflection', title: 'Reflection', subtitle: 'Isometric Transformation', icon: '🪞', color: '#8b5cf6',
        desc: 'Reflect points and shapes in standard mirror lines.',
        practice: genReflectionP, assessment: genReflectionA,
        learn: {
            concept: 'A reflection flips every point of a shape across a mirror line. Each point maps to a new position the same perpendicular distance on the opposite side of the line. Reflections preserve size and shape but reverse orientation.',
            rules: [
                { title: 'Reflect in Axes', f: 'x\\text{-axis}: (x,y)\\to(x,-y),\\quad y\\text{-axis}: (x,y)\\to(-x,y)', d: 'Reflecting in the x-axis negates the y-coordinate. Reflecting in the y-axis negates the x-coordinate.', ex: '$(4, 3) \\xrightarrow{x\\text{-axis}} (4, -3), \\quad (4, 3) \\xrightarrow{y\\text{-axis}} (-4, 3)$', tip: 'Think of the mirror line as a fold: fold the page along the x-axis and the point lands on its reflection.' },
                { title: 'Reflect in y = x and y = −x', f: 'y=x: (x,y)\\to(y,x),\\quad y=-x: (x,y)\\to(-y,-x)', d: 'Reflecting in y = x swaps the two coordinates. Reflecting in y = −x swaps and negates both.', ex: '$(2, 5) \\xrightarrow{y=x} (5, 2), \\quad (2, 5) \\xrightarrow{y=-x} (-5, -2)$', tip: 'For y = x, just swap x and y. It\'s the simplest diagonal reflection.' }
            ]
        }
    },
    {
        id: 'rotation', title: 'Rotation', subtitle: 'Isometric Transformation', icon: '🔄', color: '#f59e0b',
        desc: 'Rotate points 90°, 180°, and 270° about the origin.',
        practice: genRotationP, assessment: genRotationA,
        learn: {
            concept: 'A rotation turns every point of a shape by a given angle about a fixed centre. Positive angles are measured anticlockwise. The shape size and angles are preserved. Three key rotations about the origin have simple coordinate rules.',
            rules: [
                { title: '90° and 180° Rotations', f: '90°\\text{ ACW}: (x,y)\\to(-y,x),\\quad 180°: (x,y)\\to(-x,-y)', d: 'For 90° anticlockwise: the new x is −(old y) and new y is old x. For 180°: negate both coordinates.', ex: '$(3, 2) \\xrightarrow{90° ACW} (-2, 3), \\quad (3, 2) \\xrightarrow{180°} (-3, -2)$', tip: 'Clockwise 90° = anticlockwise 270°. Rule: (x, y) → (y, −x).' },
                { title: '270° (= 90° CW) Rotation', f: '270°\\text{ ACW} = 90°\\text{ CW}: (x,y)\\to(y,-x)', d: 'A 270° anticlockwise rotation is the same as 90° clockwise. Swap coordinates and negate the new y.', ex: '$(3, 2) \\xrightarrow{270° ACW} (2, -3)$', tip: 'A full 360° rotation maps every point back to itself — it is the identity transformation.' }
            ]
        }
    },
    {
        id: 'dilation', title: 'Dilation', subtitle: 'Non-Isometric Transformation', icon: '🔍', color: '#f43f5e',
        desc: 'Enlarge and shrink shapes using a scale factor from the origin.',
        practice: genDilationP, assessment: genDilationA,
        learn: {
            concept: 'A dilation (enlargement) multiplies all distances from the centre of dilation by a scale factor k. If k > 1 the shape gets bigger; 0 < k < 1 makes it smaller. Unlike the three isometric transformations, dilation changes size — but the shape remains similar (same angles, proportional sides).',
            rules: [
                { title: 'Dilation from Origin', f: '(x, y) \\to (kx,\\; ky)', d: 'To dilate from the origin by scale factor k, multiply every coordinate by k. All distances from the origin scale by k.', ex: '$k=3,\\text{ point }(2, 4) \\Rightarrow (6, 12). \\quad k=0.5,\\text{ point }(6, 4) \\Rightarrow (3, 2)$', tip: 'Scale factor k > 1 → enlargement. 0 < k < 1 → reduction. k = 1 → no change.' },
                { title: 'Scale Factor and Lengths', f: '\\text{Image length} = k \\times \\text{Original length}', d: 'Every length in the image is k times the corresponding length in the pre-image. Areas scale by k², volumes by k³.', ex: '$\\text{Triangle perimeter} = 12\\text{ cm},\\; k=2 \\Rightarrow \\text{Image perimeter} = 24\\text{ cm}$', tip: 'Area of image = k² × area of pre-image. This is useful in exam problems about enlarged shapes.' }
            ]
        }
    }
];
