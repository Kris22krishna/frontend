export const TERMS = [
    {
        word: 'Line of Sight',
        def: 'The line drawn from the eye of an observer to the point in the object viewed by the observer.',
        icon: '👁️',
        example: 'If you look at the top of a tree, the imaginary straight line from your eye to the treetop is the line of sight.',
        realLifeExample: 'Snipers and surveyors rely heavily on an unobstructed line of sight.',
    },
    {
        word: 'Horizontal Line',
        def: 'The line passing through the observer\'s eye parallel to the surface of the earth (or floor).',
        icon: '➖',
        example: 'Looking straight ahead without tilting your head up or down.',
        realLifeExample: 'The horizon over the ocean is a natural horizontal line.',
    },
    {
        word: 'Angle of Elevation',
        def: 'The angle formed by the line of sight with the horizontal when the object is ABOVE the horizontal level.',
        icon: '⬆️',
        example: 'Looking up at an airplane. The angle between straight ahead and the plane is the angle of elevation.',
        realLifeExample: 'Determining the height of a flagpole by measuring the angle from the ground.',
    },
    {
        word: 'Angle of Depression',
        def: 'The angle formed by the line of sight with the horizontal when the object is BELOW the horizontal level.',
        icon: '⬇️',
        example: 'Looking down from a balcony to a car on the street.',
        realLifeExample: 'A sailor in a crow\'s nest looking down at an approaching ship.',
    },
    {
        word: 'Clinometer',
        def: 'An instrument used for measuring angles of slope, elevation, or depression of an object with respect to gravity\'s direction.',
        icon: '🔭',
        example: 'Using a protractor, string, and weight to measure the angle to the top of a building.',
        realLifeExample: 'Foresters use clinometers to quickly estimate the height of tall trees.',
    },
    {
        word: 'Theodolite',
        def: 'A precision optical instrument for measuring angles between designated visible points in the horizontal and vertical planes.',
        icon: '📐',
        example: 'The tripod-mounted camera-like device you often see surveyors using on roads.',
        realLifeExample: 'Essential for large scale construction, road building, and map making.',
    }
];

export const KEY_IDENTITIES = [
    {
        name: 'The Basic Principle',
        desc: 'In a right-angled triangle formed by the observer, object, and horizontal, use trig ratios to find the unknown side.',
        formula: '\\text{Trig Ratio}(\\theta) = \\frac{\\text{Known Side}}{\\text{Unknown Side}} \\text{ or } \\frac{\\text{Unknown Side}}{\\text{Known Side}}'
    },
    {
        name: 'Alternate Interior Angles',
        desc: 'Because horizontal lines are parallel, the angle of elevation from point A to B is equal to the angle of depression from B to A.',
        formula: '\\angle \\text{Elevation} = \\angle \\text{Depression}'
    },
    {
        name: 'Multiple Triangles Principle',
        desc: 'When an object is viewed from two different points, two right-angled triangles are formed sharing a common side (usually the height).',
        formula: 'h = x \\tan \\theta_1 = (x+d) \\tan \\theta_2'
    }
];

export const VOCAB_QUIZ = [
    {
        id: 1,
        q: 'If you look down from a cliff at a boat, the angle between your horizontal line of sight and the boat is called:',
        options: ['Angle of Elevation', 'Angle of Depression', 'Right Angle', 'Acute Angle'],
        correct: 1
    },
    {
        id: 2,
        q: 'Which geometric property explains why the angle of depression from a bird to a person equals the angle of elevation from the person to the bird?',
        options: ['Corresponding Angles', 'Vertical Angles', 'Alternate Interior Angles', 'Complementary Angles'],
        correct: 2
    },
    {
        id: 3,
        q: 'A simple instrument used to measure angles of elevation is a:',
        options: ['Barometer', 'Clinometer', 'Thermometer', 'Speedometer'],
        correct: 1
    },
    {
        id: 4,
        q: 'The imaginary line connecting the observer\'s eye to the object being viewed is the:',
        options: ['Line of Sight', 'Horizontal Line', 'Vertical Line', 'Hypotenuse Line'],
        correct: 0
    }
];
