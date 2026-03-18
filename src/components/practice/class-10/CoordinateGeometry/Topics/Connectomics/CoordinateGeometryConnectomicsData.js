export const coordinateGeometryConnectomicsData = {
    connections: [
        {
            from: 'Coordinate Geometry (Ch.7)',
            to: 'Linear Equations (Ch.3)',
            type: 'Direct',
            icon: '📈',
            color: '#2563eb',
            note: 'The coordinates of points that satisfy a linear equation form a straight line on the Cartesian plane.'
        },
        {
            from: 'Coordinate Geometry (Ch.7)',
            to: 'Triangles (Ch.6)',
            type: 'Fundamental',
            icon: '📐',
            color: '#0d9488',
            note: 'The distance formula is derived directly from the Pythagorean theorem applied to a right triangle formed by the coordinates.'
        },
        {
            from: 'Coordinate Geometry (Ch.7)',
            to: 'Trigonometry (Ch.8)',
            type: 'Proof Link',
            icon: '🧭',
            color: '#7c3aed',
            note: 'Trigonometric ratios can be defined for any angle using coordinates $(x, y)$ on a circle of radius $r$.'
        },
        {
            from: 'Coordinate Geometry (Ch.7)',
            to: 'Circles (Ch.10)',
            type: 'Scale',
            icon: '⭕',
            color: '#f59e0b',
            note: 'The equation of a circle is simply the distance formula applied to a fixed center point and a variable point $(x, y)$.'
        },
        {
            from: 'Coordinate Geometry (Ch.7)',
            to: 'GPS & Navigation',
            type: 'Real World',
            icon: '🗺️',
            color: '#ec4899',
            note: 'Global Positioning Systems use 3D coordinate geometry to pinpoint locations using satellite distances.'
        }
    ],
    realWorld: [
        {
            title: 'Computer Graphics & Animation',
            desc: 'Every pixel on a screen is plotted using $(x, y)$ coordinates. Moving a character involves adding changing their coordinates.',
            impact: 'Technology'
        },
        {
            title: 'Geography and Mapping',
            desc: 'Latitude and longitude form a coordinate system on a sphere, essential for maps and planetary navigation.',
            impact: 'Practical'
        },
        {
            title: 'Architecture and CAD',
            desc: 'Computer-Aided Design (CAD) software relies entirely on coordinate geometry to model buildings and mechanical parts.',
            impact: 'Design'
        }
    ]
};
