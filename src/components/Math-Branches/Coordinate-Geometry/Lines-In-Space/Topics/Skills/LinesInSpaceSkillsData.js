export const generateQuestions = (topicId) => {
    return [
        {
            id: 'lines-1',
            type: 'multiple-choice',
            question: 'If a line makes equal angles with the coordinate axes, what is its direction cosine?',
            options: ['±1/√3', '1/2', '1/√2', '0'],
            correctAnswer: '±1/√3',
            explanation: 'If angles are equal, cos²α + cos²α + cos²α = 1 ⇒ 3cos²α = 1 ⇒ cosα = ±1/√3.'
        },
        {
            id: 'lines-2',
            type: 'multiple-choice',
            question: 'What is the condition for two lines with direction ratios (a1, b1, c1) and (a2, b2, c2) to be perpendicular?',
            options: ['a1a2 + b1b2 + c1c2 = 0', 'a1/a2 = b1/b2 = c1/c2', 'a1a2 + b1b2 = c1c2', 'a1b1 + a2b2 = 0'],
            correctAnswer: 'a1a2 + b1b2 + c1c2 = 0',
            explanation: 'Two lines are perpendicular if the dot product of their direction vectors is zero: a1a2 + b1b2 + c1c2 = 0.'
        }
    ];
};