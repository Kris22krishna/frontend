export const generateQuestions = (topicId) => {
    return [
        {
            id: 'apps-1',
            type: 'multiple-choice',
            question: 'In robotics, which coordinate system is primarily used to track a drone in 3D space?',
            options: ['Cartesian and Spherical', 'Only 2D Cartesian', 'Logarithmic', 'Polar only'],
            correctAnswer: 'Cartesian and Spherical',
            explanation: 'Drones use 3D Cartesian (x,y,z) for position and Spherical/Euler angles (roll, pitch, yaw) for orientation.'
        },
        {
            id: 'apps-2',
            type: 'multiple-choice',
            question: 'What is the centroid of a triangle formed by points (0,0), (6,0), and (0,9)?',
            options: ['(2, 3)', '(3, 4.5)', '(3, 3)', '(2, 4.5)'],
            correctAnswer: '(2, 3)',
            explanation: 'Centroid = ((x1+x2+x3)/3, (y1+y2+y3)/3) = ((0+6+0)/3, (0+0+9)/3) = (2, 3).'
        }
    ];
};