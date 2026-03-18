export const trianglesConnectomicsData = {
    connections: [
        {
            from: 'Triangles (Ch.6)',
            to: 'Coordinate Geometry (Ch.7)',
            type: 'Direct',
            icon: '📍',
            color: '#2563eb',
            note: 'Distance, midpoint, and section ideas often create triangles whose proportional relationships can be analyzed through similarity.'
        },
        {
            from: 'Triangles (Ch.6)',
            to: 'Trigonometry (Ch.8)',
            type: 'Fundamental',
            icon: '📐',
            color: '#0d9488',
            note: 'Trigonometric ratios are built from the idea that right triangles with the same acute angle are similar.'
        },
        {
            from: 'Triangles (Ch.6)',
            to: 'Circles (Ch.10)',
            type: 'Proof Link',
            icon: '⭕',
            color: '#7c3aed',
            note: 'Many circle proofs become easier when angle patterns create similar triangles inside the figure.'
        },
        {
            from: 'Triangles (Ch.6)',
            to: 'Surface Areas & Volumes (Ch.13)',
            type: 'Scale',
            icon: '📦',
            color: '#f59e0b',
            note: 'Scale models of solids rely on similar cross-sections and proportional lengths.'
        },
        {
            from: 'Triangles (Ch.6)',
            to: 'Surveying & Maps',
            type: 'Real World',
            icon: '🗺️',
            color: '#ec4899',
            note: 'Heights of trees, towers, and buildings can be found indirectly using shadows and similar triangles.'
        }
    ],
    realWorld: [
        {
            title: 'Architecture and Blueprints',
            desc: 'Scaled drawings preserve shape through similarity, allowing real structures to be designed accurately.',
            impact: 'Design'
        },
        {
            title: 'Surveying and Height Measurement',
            desc: 'Surveyors use similar triangles to estimate inaccessible heights and distances quickly.',
            impact: 'Practical'
        },
        {
            title: 'Photography and Optics',
            desc: 'Projection, enlargement, and perspective all rely on the geometry of similar triangles.',
            impact: 'Visual'
        }
    ]
};
