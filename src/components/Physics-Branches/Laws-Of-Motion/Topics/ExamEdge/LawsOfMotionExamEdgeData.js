export const lawsOfMotionExamEdgeData = [
    {
        id: 'exam-neet',
        exam: 'NEET',
        weightage: '3 - 4',
        marks: '12 - 16',
        difficulty: 'Medium to Hard',
        focus: 'Calculation-intensive. Requires strong understanding of conceptual subtleties, especially with friction, pulley systems, and circular motion.',
        pyqs: [
            {
                year: '2022',
                question: 'Two bodies of mass 4kg and 6kg are tied to the ends of a massless string over a frictionless pulley. Find the acceleration of the system in terms of g.',
                answer: 'By formula a = ((m2-m1)/(m1+m2))g = ((6-4)/(6+4))g = 0.2g = g/5.'
            },
            {
                year: '2021',
                question: 'A ball of mass 0.15 kg is dropped from a height 10m, strikes the ground and rebounds to the same height. The magnitude of impulse imparted to the ball is (g = 10 m/s²).',
                answer: 'v = sqrt(2gh) = sqrt(2*10*10) = 14 m/s. Impulse = dp = m(v - (-v)) = 2mv = 2 * 0.15 * 14 = 4.2 kg m/s.'
            }
        ],
        color: '#10b981'
    },
    {
        id: 'exam-jee',
        exam: 'JEE Main',
        weightage: '1 - 2',
        marks: '4 - 8',
        difficulty: 'Hard',
        focus: 'Focuses heavily on integration of concepts: Laws of Motion combined with Work Power Energy or Rotational Dynamics. Complex multi-body systems.',
        pyqs: [
            {
                year: '2023',
                question: 'A block of mass m is placed on a surface with a vertical cross-section given by y = x³/6. If the coefficient of friction is 0.5, the maximum height above the ground at which the block can be placed without slipping is:',
                answer: 'dy/dx = tan(theta) = mu. dy/dx = x²/2 = 0.5 => x = 1. Plug into y: y = 1/6 m.'
            }
        ],
        color: '#3b82f6'
    },
    {
        id: 'exam-kcet',
        exam: 'Karnataka CET',
        weightage: '2 - 3',
        marks: '2 - 3',
        difficulty: 'Easy to Medium',
        focus: 'Formula-based questions and theoretical conceptual questions. High emphasis on defining Newton\'s Laws and simple numericals.',
        pyqs: [
            {
                year: '2020',
                question: 'The working of a rocket is based on the principle of:',
                answer: 'Conservation of linear momentum (or Newton\'s Third Law).'
            }
        ],
        color: '#f59e0b'
    },
    {
        id: 'exam-boards',
        exam: 'PUC / Boards',
        weightage: '7 - 10%',
        marks: '5 - 7',
        difficulty: 'Medium',
        focus: 'Derivations (e.g., banking of roads, law of conservation of momentum). Short definition questions on concepts like angle of friction and angle of repose.',
        pyqs: [
            {
                year: '2019',
                question: 'Derive an expression for the maximum safe speed of a car on a banked circular road with friction.',
                answer: 'v_max = sqrt(Rg * ((mu_s + tan theta) / (1 - mu_s*tan theta)))'
            }
        ],
        color: '#8b5cf6'
    }
];
