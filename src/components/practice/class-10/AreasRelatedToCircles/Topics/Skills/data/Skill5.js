export const skill5 = {
    id: 'real-life-applications',
    title: 'Applications in Clocks & Wheels',
    subtitle: 'Bringing Geometry to Life',
    desc: 'Apply circle formulas to solve problems involving clock hands, rotating wheels, and grazing animals.',
    icon: '⌚',
    color: '#d946ef',
    learn: {
        title: 'Real-Life Scenarios',
        content: 'Circles are everywhere!\n**Clocks:** The minute hand spans $360^\\circ$ in $60$ minutes. So in $1$ minute, it covers $6^\\circ$.\n**Wheels:** One full revolution covers a distance equal to the circumference ($2\\pi r$).\n**Grazing Animals:** A tied animal grazes a circular sector. The rope length is the radius.',
        rules: [
            'Minute Hand Angle: $\\theta = 6^\\circ \\times \\text{minutes}$',
            'Hour Hand Angle: $\\theta = 0.5^\\circ \\times \\text{minutes}$',
            'Distance per revolution = $2\\pi r$',
            'Number of revolutions = Total Distance / Circumference'
        ],
        examples: [
            {
                q: 'What is the angle swept by the minute hand in $15$ minutes?',
                a: '$15 \\times 6^\\circ = 90^\\circ$.'
            },
            {
                q: 'How far does a wheel of radius $7$ cm travel in $10$ revolutions?',
                a: 'Distance $= 10 \\times 2 \\times \\frac{22}{7} \\times 7 = 10 \\times 44 = 440$ cm.'
            }
        ]
    },
    practice: [
        {
            question: 'The angle swept by the minute hand of a clock in $5$ minutes is:',
            options: ['$10^\\circ$', '$15^\\circ$', '$30^\\circ$', '$60^\\circ$'],
            correct: 2,
            explanation: '$5 \\times 6^\\circ = 30^\\circ$.'
        },
        {
            question: 'To find the distance a car travels given wheel rotations, you multiply the number of rotations by the:',
            options: ['Radius', 'Diameter', 'Area', 'Circumference'],
            correct: 3,
            explanation: 'Each full rotation covers the perimeter, which is the circumference.'
        },
        {
            question: 'A cow is tied to a peg with a $14$m rope. The area it can graze is calculated using:',
            options: ['Area of rectangle', 'Area of circle', 'Circumference formula', 'Volume of cylinder'],
            correct: 1,
            explanation: 'The cow sweeps out a full circular area with radius equal to the rope length.'
        },
        {
            question: 'The minute hand length is $14$ cm. The area swept in $10$ minutes is:',
            options: ['$51.33$ cm$^2$', '$102.66$ cm$^2$', '$154$ cm$^2$', '$308$ cm$^2$'],
            correct: 1,
            explanation: '$10$ minutes $= 60^\\circ$. Sector area $= \\frac{60}{360} \\times \\frac{22}{7} \\times 196 = \\frac{1}{6} \\times 616 \\approx 102.66$ cm$^2$.'
        },
        {
            question: 'A wheel makes $1000$ revolutions to cover $88$ km. The circumference of the wheel is:',
            options: ['$8.8$ m', '$88$ m', '$880$ m', '$11$ m'],
            correct: 1,
            explanation: 'Distance $= 88000$ m. Circumference $= \\frac{88000}{1000} = 88$ m.'
        },
        {
            question: 'The angle swept by the hour hand in $1$ hour is:',
            options: ['$15^\\circ$', '$30^\\circ$', '$45^\\circ$', '$60^\\circ$'],
            correct: 1,
            explanation: 'The hour hand takes 12 hours to cover $360^\\circ$. $\\frac{360}{12} = 30^\\circ$.'
        },
        {
            question: 'In $30$ minutes, the area swept by a minute hand of length $r$ is:',
            options: ['$\\pi r^2$', '$\\frac{1}{2} \\pi r^2$', '$\\frac{1}{4} \\pi r^2$', '$\\frac{1}{6} \\pi r^2$'],
            correct: 1,
            explanation: '$30$ minutes $= 180^\\circ$, which is exactly a semicircle.'
        },
        {
            question: 'A car wiper sweeps an angle of $120^\\circ$. The blades are length $r$. It sweeps out a:',
            options: ['Segment', 'Major Sector', 'Minor Sector', 'Semicircle'],
            correct: 2,
            explanation: 'A sweep originates from a pivot (center), creating a sector. $120^\\circ < 180^\\circ$, so it is a minor sector.'
        },
        {
            question: 'A horse is tied to a corner of a square field ($90^\\circ$ angle). What fraction of a circle can it graze?',
            options: ['$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{1}{4}$', '$\\frac{1}{6}$'],
            correct: 2,
            explanation: 'Since the corner of a square is $90^\\circ$, it sweeps a quadrant ($\\frac{1}{4}$ of a circle).'
        },
        {
            question: 'A wheel of radius $70$ cm covers how much distance in $1$ revolution?',
            options: ['$220$ cm', '$440$ cm', '$660$ cm', '$880$ cm'],
            correct: 1,
            explanation: '$C = 2 \\times \\frac{22}{7} \\times 70 = 440$ cm.'
        }
    ],
    assessment: [
        {
            question: 'A pendulum swings through an angle of $30^\\circ$ and describes an arc $8.8$ cm in length. Find the length of the pendulum.',
            options: ['$16.8$ cm', '$14$ cm', '$8.4$ cm', '$21$ cm'],
            correct: 0,
            explanation: '$8.8 = \\frac{30}{360} \\times 2 \\times \\frac{22}{7} \\times r \\Rightarrow 8.8 = \\frac{1}{12} \\times \\frac{44}{7} \\times r \\Rightarrow 8.8 = \\frac{44}{84} \\times r \\Rightarrow r = 8.8 \\times \\frac{84}{44} = 16.8$ cm.'
        },
        {
            question: 'A car has two wipers which do not overlap. Each wiper has a blade of $25$ cm sweeping an angle of $115^\\circ$. Total area cleaned at each sweep of the blades is:',
            options: ['$1000$ cm$^2$', '$1254.96$ cm$^2$', '$1500$ cm$^2$', '$2500$ cm$^2$'],
            correct: 1,
            explanation: 'Area for two wipers $= 2 \\times \\frac{115}{360} \\times \\frac{22}{7} \\times 625 \\approx 1254.96$ cm$^2$.'
        },
        {
            question: 'To warn ships, a lighthouse spreads a red colored light over a sector of $80^\\circ$ to a distance of $16.5$ km. Area of sea warned? (Use $\\pi=3.14$)',
            options: ['$189.97$ km$^2$', '$200.5$ km$^2$', '$250.3$ km$^2$', '$300.7$ km$^2$'],
            correct: 0,
            explanation: '$A = \\frac{80}{360} \\times 3.14 \\times (16.5)^2 = \\frac{2}{9} \\times 3.14 \\times 272.25 = 189.97$ km$^2$.'
        },
        {
            question: 'The minute hand of a clock is $10$ cm long. Find the area of the face of the clock described by the minute hand between 8:00 AM and 8:25 AM.',
            options: ['$130.8$ cm$^2$', '$150.5$ cm$^2$', '$160.2$ cm$^2$', '$180.4$ cm$^2$'],
            correct: 0,
            explanation: '$25$ minutes $= 25 \\times 6^\\circ = 150^\\circ$. $A = \\frac{150}{360} \\times 3.14 \\times 100 = \\frac{5}{12} \\times 314 = 130.83$ cm$^2$.'
        },
        {
            question: 'A horse is tied to a peg at one corner of a $15$m by $15$m square grass field by a $5$m long rope. Find the increase in grazing area if the rope were $10$m instead.',
            options: ['$58.875$ m$^2$', '$78.5$ m$^2$', '$19.625$ m$^2$', '$40.1$ m$^2$'],
            correct: 0,
            explanation: 'Area with $5$m rope $= \\frac{1}{4}\\times 3.14\\times 25 = 19.625$. Area with $10$m rope $= \\frac{1}{4}\\times 3.14\\times 100 = 78.5$. Increase $= 78.5 - 19.625 = 58.875$ m$^2$.'
        },
        {
            question: 'At what time does the hour hand and minute hand of a clock form a $90^\\circ$ sector? (Assume sharp positions on numbers)',
            options: ['3:00', '6:00', '12:00', '4:00'],
            correct: 0,
            explanation: 'At 3:00, the minute hand is at 12 and the hour hand is at 3, creating exactly a $90^\\circ$ angle.'
        },
        {
            question: 'An umbrella has $8$ ribs which are equally spaced. Assuming umbrella to be a flat circle of $r=45$ cm, find area between two consecutive ribs.',
            options: ['$795.5$ cm$^2$', '$600.3$ cm$^2$', '$800$ cm$^2$', '$700.5$ cm$^2$'],
            correct: 0,
            explanation: '$8$ sectors means angle $= \\frac{360}{8} = 45^\\circ$. Area $= \\frac{1}{8} \\times \\frac{22}{7} \\times (45)^2 = \\frac{22275}{28} = 795.53$ cm$^2$.'
        },
        {
            question: 'The wheels of a car are of diameter $80$ cm. How many complete revolutions does each wheel make in $10$ minutes when the car is traveling at $66$ km/hr?',
            options: ['$4375$', '$4000$', '$4500$', '$4250$'],
            correct: 0,
            explanation: 'Distance in $10$ mins $= 66 \\times \\frac{10}{60} = 11$ km $= 1100000$ cm. Circumference $= \\frac{22}{7} \\times 80 = \\frac{1760}{7}$ cm. Revolutions $= 1100000 \\times \\frac{7}{1760} = 4375$.'
        },
        {
            question: 'A tractor has huge rear wheels of diameter $2$m. How much area of the ground does the wheel "squish" if it travels $10$m? (Assume it touches as a point line)',
            options: ['Distance \\times Width of tire', '$\\pi r^2$', 'Distance \\times Circumference', '$2\\pi r$'],
            correct: 0,
            explanation: 'The area an object sweeps on the ground is rectangular: distance travelled $\\times$ width of the contact patch.'
        },
        {
            question: 'If a clock hand length increases, the *angle* it sweeps per minute:',
            options: ['Increases', 'Decreases', 'Stays the same', 'Varies'],
            correct: 2,
            explanation: 'The angle solely depends on time ($360^\\circ / 60$ minutes), independent of the radius.'
        }
    ]
};
