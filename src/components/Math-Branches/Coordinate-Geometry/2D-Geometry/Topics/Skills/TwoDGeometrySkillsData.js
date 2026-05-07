export const generateQuestions = (topicId) => {
    return [
        {
            id: '2d-1',
            type: 'multiple-choice',
            question: 'What is the distance between points A(3,4) and the origin?',
            options: ['5', '7', '25', '12'],
            correctAnswer: '5',
            explanation: 'Using the distance formula from the origin: d = √(x² + y²) = √(3² + 4²) = √(9 + 16) = √25 = 5.'
        },
        {
            id: '2d-2',
            type: 'multiple-choice',
            question: 'Which quadrant does the point (-5, 7) lie in?',
            options: ['Quadrant II', 'Quadrant I', 'Quadrant III', 'Quadrant IV'],
            correctAnswer: 'Quadrant II',
            explanation: 'In Quadrant II, the x-coordinate is negative and the y-coordinate is positive.'
        },
        {
            id: '2d-3',
            type: 'multiple-choice',
            question: 'Find the midpoint of the line segment joining (2, 4) and (6, 8).',
            options: ['(4, 6)', '(8, 12)', '(2, 2)', '(3, 5)'],
            correctAnswer: '(4, 6)',
            explanation: 'Midpoint formula: ((x1+x2)/2, (y1+y2)/2) = ((2+6)/2, (4+8)/2) = (8/2, 12/2) = (4, 6).'
        }
    ];
};