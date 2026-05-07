const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'components', 'Math-Branches', 'Coordinate-Geometry');

const twoDData = `
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
`;
fs.writeFileSync(path.join(baseDir, '2D-Geometry', 'Topics', 'Skills', 'TwoDGeometrySkillsData.js'), twoDData.trim());

const threeDData = `
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
`;
fs.writeFileSync(path.join(baseDir, '3D-Geometry', 'Topics', 'Skills', 'ThreeDGeometrySkillsData.js'), threeDData.trim());

const linesData = `
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
`;
fs.writeFileSync(path.join(baseDir, 'Lines-In-Space', 'Topics', 'Skills', 'LinesInSpaceSkillsData.js'), linesData.trim());

const appsData = `
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
`;
fs.writeFileSync(path.join(baseDir, 'Applications', 'Topics', 'Skills', 'ApplicationsSkillsData.js'), appsData.trim());

console.log('Skill Data populated.');
