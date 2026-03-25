export const areasRelatedToCirclesIntroData = {
    prerequisites: [
        {
            icon: '📏',
            title: 'Perimeter and Area Basics',
            desc: 'Familiarity with the concepts of boundaries (perimeter) and the space enclosed (area) in 2D shapes.'
        },
        {
            icon: '🔵',
            title: 'Circles Basics',
            desc: 'Understanding of center, radius, diameter, chord, and basic circumference and area formulas for a circle.'
        },
        {
            icon: '📐',
            title: 'Angle Measurement',
            desc: 'Knowing how to measure angles in degrees and understanding a full circle is $360^\\circ$.'
        }
    ],
    cards5W1H: [
        {
            q: 'What is a sector vs. a segment?',
            label: 'The Terminology',
            icon: '❓',
            content: 'A **sector** is the region enclosed by two radii and the corresponding arc (like a slice of pizza). A **segment** is the region enclosed by a chord and its corresponding arc.',
            fact: 'Sectors depend on the central angle, while segments depend on both the angle and the chord.',
            gradFrom: '#2563eb',
            gradTo: '#3b82f6',
            shadow: 'rgba(37,99,235,0.4)'
        },
        {
            q: 'Why do we need the $360^\\circ$ system?',
            label: 'The Fraction Approach',
            icon: '💡',
            content: 'Since a full circle is $360^\\circ$, any sector with an angle $\\theta$ is simply the fraction $\\frac{\\theta}{360}$ of the whole circle. This fraction is the key to finding both arc length and sector area.',
            fact: 'Every sector calculation is basically $fraction \\times total$.',
            gradFrom: '#059669',
            gradTo: '#10b981',
            shadow: 'rgba(16,185,129,0.4)'
        },
        {
            q: 'How do you find the area of a segment?',
            label: 'The Subtraction Method',
            icon: '⚙️',
            content: 'To find the area of a segment, first calculate the area of the corresponding sector. Then, subtract the area of the triangle formed by the two radii and the chord.',
            fact: '$Area\\,of\\,Segment = Area\\,of\\,Sector - Area\\,of\\,Triangle$',
            gradFrom: '#7c3aed',
            gradTo: '#8b5cf6',
            shadow: 'rgba(124,58,237,0.4)'
        },
        {
            q: 'Where is this used in real life?',
            label: 'The Practical Uses',
            icon: '🗺️',
            content: 'Areas related to circles are used to measure grazing areas of tied animals, the sweep of a car wiper blade, the light sweep from a lighthouse, and calculating material for circular designs.',
            fact: 'Clock hands sweeping across a dial form perfect sectors over time.',
            gradFrom: '#ea580c',
            gradTo: '#f97316',
            shadow: 'rgba(249,115,22,0.4)'
        },
        {
            q: 'When do we use major vs minor?',
            label: 'The Remaining Area',
            icon: '⏱️',
            content: 'The "minor" region is the smaller one (angle < $180^\\circ$), while the "major" region is the larger one. You find the major area by subtracting the minor area from the full circle.',
            fact: 'Major and minor areas always sum perfectly to the whole circle.',
            gradFrom: '#d946ef',
            gradTo: '#e879f9',
            shadow: 'rgba(217,70,239,0.4)'
        },
        {
            q: 'Who discovered $\\pi$?',
            label: 'The Mathematical Constant',
            icon: '👤',
            content: 'Archimedes closely approximated $\\pi$ using polygons inscribed in and circumscribed about circles. Aryabhata, an Indian mathematician, later gave a highly accurate value of $3.1416$.',
            fact: '$\\pi$ represents the unchangeable ratio of any circle’s circumference to its diameter.',
            gradFrom: '#0891b2',
            gradTo: '#06b6d4',
            shadow: 'rgba(8,145,178,0.4)'
        }
    ]
};
