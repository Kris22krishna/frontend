export const generateQuestions = (topicId) => {
    return [
        {
            id: '3d-1',
            type: 'multiple-choice',
            question: 'What is the distance of the point (3, 4, 12) from the origin?',
            options: ['13', '5', '12', '19'],
            correctAnswer: '13',
            explanation: 'd = √(x² + y² + z²) = √(3² + 4² + 12²) = √(9 + 16 + 144) = √169 = 13.'
        },
        {
            id: '3d-2',
            type: 'multiple-choice',
            question: 'Which octant contains the point (-2, 3, -4)?',
            options: ['Octant VI', 'Octant V', 'Octant III', 'Octant VII'],
            correctAnswer: 'Octant VI',
            explanation: 'For (-x, +y, -z), the octant is VI.'
        },
        {
            id: '3d-3',
            type: 'multiple-choice',
            question: 'What are the coordinates of the midpoint of the line segment joining (1, -2, 3) and (3, 4, -1)?',
            options: ['(2, 1, 1)', '(4, 2, 2)', '(1, 3, 2)', '(2, 3, 1)'],
            correctAnswer: '(2, 1, 1)',
            explanation: 'Midpoint = ((1+3)/2, (-2+4)/2, (3-1)/2) = (4/2, 2/2, 2/2) = (2, 1, 1).'
        }
    ];
};