export const skill1 = {
    id: 'circle-regions',
    title: 'Understanding Parts of a Circle',
    subtitle: 'Sectors & Segments',
    desc: 'Identify sectors and segments formed by radii, arcs, and chords.',
    icon: '🔵',
    color: '#2563eb',
    learn: {
        title: 'Sectors and Segments',
        content: 'A circle can be divided into distinct regions.\nA **Sector** is the region enclosed by two radii and an arc. Think of it like a slice of pizza.\nA **Segment** is the region enclosed by a chord and an arc. Think of it as a slice cut straight across the crust.',
        rules: [
            'Minor Sector: Angle at center is less than $180^\\circ$.',
            'Major Sector: Angle at center is greater than $180^\\circ$.',
            'Minor Segment: Region enclosed by minor arc and chord.',
            'Major Segment: Region enclosed by major arc and chord.'
        ],
        examples: [
            {
                q: 'What region is formed by two radii of a circle?',
                a: 'A sector.'
            },
            {
                q: 'What region is bounded by a chord and an arc?',
                a: 'A segment.'
            }
        ]
    },
    practice: [
        {
            question: 'The region enclosed by two radii and the corresponding arc is a:',
            options: ['Sector', 'Segment', 'Chord', 'Diameter'],
            correct: 0,
            explanation: 'A sector is the region bounded by two radii and their intercepted arc.'
        },
        {
            question: 'The region enclosed by a chord and an arc is a:',
            options: ['Sector', 'Segment', 'Radius', 'Semicircle'],
            correct: 1,
            explanation: 'A segment is cut off from the rest of the circle by a chord.'
        },
        {
            question: 'If a sector has an angle of $100^\\circ$, it is called a:',
            options: ['Minor sector', 'Major sector', 'Semicircle', 'Quadrant'],
            correct: 0,
            explanation: 'Since $100^\\circ < 180^\\circ$, it is a minor sector.'
        },
        {
            question: 'If a sector has an angle of $210^\\circ$, what is it classified as?',
            options: ['Minor sector', 'Major sector', 'Semicircle', 'Segment'],
            correct: 1,
            explanation: 'Since $210^\\circ > 180^\\circ$, it is a major sector.'
        },
        {
            question: 'The longest chord of a circle divides the circle into two equal regions called:',
            options: ['Sectors', 'Segments', 'Semicircles', 'Quadrants'],
            correct: 2,
            explanation: 'The longest chord is the diameter, and it divides the circle into two semicircles.'
        },
        {
            question: 'A pie chart slices data into pieces that are geometrically:',
            options: ['Segments', 'Sectors', 'Chords', 'Arcs'],
            correct: 1,
            explanation: 'Pie chart slices start at the center and go to the edge, making them sectors.'
        },
        {
            question: 'A central angle is formed by two:',
            options: ['Chords', 'Secants', 'Radii', 'Tangents'],
            correct: 2,
            explanation: 'A central angle has its vertex at the center and its sides are radii.'
        },
        {
            question: 'A quadrant is a sector with an angle of:',
            options: ['$45^\\circ$', '$90^\\circ$', '$180^\\circ$', '$360^\\circ$'],
            correct: 1,
            explanation: 'A quadrant is one-fourth of a circle, sharing $\\frac{360}{4} = 90^\\circ$.'
        },
        {
            question: 'A major segment always contains:',
            options: ['The center of the circle', 'The entire circumference', 'No arc', 'Only two points'],
            correct: 0,
            explanation: 'A major segment takes up more than a semicircle, thus it must include the center.'
        },
        {
            question: 'The straight line that bounds a segment is a:',
            options: ['Radius', 'Diameter', 'Chord', 'Tangent'],
            correct: 2,
            explanation: 'A segment is bounded by a chord and an arc.'
        }
    ],
    assessment: [
        {
            question: 'If minor sector angle is $50^\\circ$, what is the angle of the major sector?',
            options: ['$130^\\circ$', '$210^\\circ$', '$310^\\circ$', '$360^\\circ$'],
            correct: 2,
            explanation: 'Major angle $= 360^\\circ - 50^\\circ = 310^\\circ$.'
        },
        {
            question: 'The sum of the central angles of all sectors in a circle is:',
            options: ['$180^\\circ$', '$270^\\circ$', '$360^\\circ$', '$400^\\circ$'],
            correct: 2,
            explanation: 'A full circle measures strictly $360^\\circ$.'
        },
        {
            question: 'If a circle is divided by a chord, the smaller region is the:',
            options: ['Major sector', 'Minor sector', 'Major segment', 'Minor segment'],
            correct: 3,
            explanation: 'It is a segment (due to the chord) and smaller implies minor.'
        },
        {
            question: 'True or False: A semicircle can be seen as both a sector and a segment.',
            options: ['True', 'False', 'Depends on radius', 'Depends on chord'],
            correct: 0,
            explanation: 'A semicircle is formed by a diameter (chord) and bounded by a $180^\\circ$ angle (radii), meeting properties of both.'
        },
        {
            question: 'The boundary of a sector consists of:',
            options: ['1 arc, 1 chord', '1 arc, 2 radii', '2 arcs, 1 radius', '1 chord, 2 arcs'],
            correct: 1,
            explanation: 'A sector is created by two radii stretching out to meet an intercepted arc.'
        },
        {
            question: 'An arc representing $\\frac{1}{6}$ of the circle has a central angle of:',
            options: ['$45^\\circ$', '$60^\\circ$', '$90^\\circ$', '$120^\\circ$'],
            correct: 1,
            explanation: '$\\frac{1}{6} \\times 360^\\circ = 60^\\circ$.'
        },
        {
            question: 'Which of the following is true for a major arc?',
            options: ['Length < semicircle', 'Length > semicircle', 'Angle < $90^\\circ$', 'Angle < $180^\\circ$'],
            correct: 1,
            explanation: 'A major arc is larger than a semicircle (length > $\\pi r$) and has angle > $180^\\circ$.'
        },
        {
            question: 'In a clock face, the region bounded by minutes 12, 1, and the center is a:',
            options: ['Sector', 'Segment', 'Quadrant', 'Semicircle'],
            correct: 0,
            explanation: 'The hands acts as radii making it a sector.'
        },
        {
            question: 'A minor arc pairs with a central angle of $\\theta$. The major arc has angle:',
            options: ['$180 - \\theta$', '$360 - \\theta$', '$\\pi - \\theta$', '$2\\pi - \\theta$ (in degrees)'],
            correct: 1,
            explanation: 'The remaining angle around the center is exactly $360^\\circ - \\theta$.'
        },
        {
            question: 'Every chord divides a circle into precisely:',
            options: ['Two sectors', 'Two segments', 'Four segments', 'A sector and a segment'],
            correct: 1,
            explanation: 'A single straight chord cuts any circle into a major and minor segment (or two equal segments if it is a diameter).'
        }
    ]
};
