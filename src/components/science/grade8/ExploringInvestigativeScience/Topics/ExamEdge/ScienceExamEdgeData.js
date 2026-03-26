export const SCIENCE_EXAM_EDGE = {
    stats: [
        { label: 'Exam Weightage', value: '10-15%', color: '#0e7490' },
        { label: 'Time Needed', value: '1.5 Hours', color: '#0d9488' },
        { label: 'Difficulty', value: 'Medium', color: '#7c3aed' },
        { label: 'Key Skill', value: 'Analysis', color: '#f59e0b' },
    ],
    yieldPoints: [
        {
            title: 'Identifying Variables (V. Important)',
            desc: 'You will almost certainly be given an experiment scenario and asked to identify the Independent, Dependent, and Controlled variables.',
            frequency: 'Every Exam'
        },
        {
            title: 'Observation vs Inference',
            desc: 'Expect a 2-mark question asking you to separate what a scientist actually saw (observation) from what they concluded (inference).',
            frequency: 'Frequent'
        },
        {
            title: 'Designing a Fair Test',
            desc: 'You may be asked to design an experiment (e.g., "How would you test if salt dissolves faster in hot water?"). You must explicitly list controlled variables.',
            frequency: 'Common'
        }
    ],
    pitfalls: [
        {
            bad: 'Confusing independent and dependent variables.',
            good: 'Remember: Independent starts with "I" - "I change it". Dependent depends on what I changed.'
        },
        {
            bad: 'Writing an observation when asked for an inference.',
            good: 'Observation = "The gas bubbles popped." Inference = "Carbon dioxide was released."'
        },
        {
            bad: 'Forgetting to control variables in experiment design questions.',
            good: 'Always write: "Keep the amount of water, size of beaker, and time allowed EXACTLY the same."'
        }
    ],
    strategies: [
        {
            title: 'Read the Scenario Twice',
            content: 'Science questions often hide the independent variable in the first sentence ("A student wanted to see if light color affects plant growth..."). Light color is independent!'
        },
        {
            title: 'Use the "Fair Test" Formula',
            content: 'If asked why an experiment failed, look for MULTIPLE changed variables. If they changed soil AND water, the test is unfair.'
        },
        {
            title: 'Draw the Setup',
            content: 'If an experiment description is complex, quickly sketch the beakers or plants mentally to see what is changing and what is constant.'
        }
    ],
    diagrams: [
        {
            id: 'variables-map',
            title: 'The Variable Map',
            svg: `
            <svg viewBox="0 0 600 300" style="width:100%; height:auto;">
                <!-- Background -->
                <rect width="600" height="300" fill="#f8fafc" rx="16" />
                
                <!-- Independent Variable -->
                <rect x="50" y="80" width="140" height="80" rx="12" fill="#0d9488" />
                <text x="120" y="115" fill="#fff" font-family="Outfit" font-size="16" font-weight="800" text-anchor="middle">INDEPENDENT</text>
                <text x="120" y="135" fill="#ccfbf1" font-family="Inter" font-size="12" font-weight="600" text-anchor="middle">"What I Change"</text>
                
                <!-- Arrow -->
                <path d="M 190 120 L 260 120" stroke="#0f172a" stroke-width="3" stroke-dasharray="4" marker-end="url(#arrow)" />
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#0f172a" />
                    </marker>
                </defs>
                
                <!-- Experiment Box -->
                <rect x="250" y="100" width="100" height="40" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
                <text x="300" y="125" fill="#0f172a" font-family="Inter" font-size="14" font-weight="700" text-anchor="middle">EXPERIMENT</text>

                <!-- Arrow -->
                <path d="M 350 120 L 410 120" stroke="#0f172a" stroke-width="3" marker-end="url(#arrow)" />

                <!-- Dependent Variable -->
                <rect x="410" y="80" width="140" height="80" rx="12" fill="#059669" />
                <text x="480" y="115" fill="#fff" font-family="Outfit" font-size="16" font-weight="800" text-anchor="middle">DEPENDENT</text>
                <text x="480" y="135" fill="#d1fae5" font-family="Inter" font-size="12" font-weight="600" text-anchor="middle">"What I Measure"</text>

                <!-- Controlled Variables Line -->
                <path d="M 300 180 L 300 140" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow-up)" />
                <defs>
                    <marker id="arrow-up" viewBox="0 0 10 10" refX="5" refY="1" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 0 10 L 5 0 L 10 10 z" fill="#f59e0b" />
                    </marker>
                </defs>

                <!-- Controlled Variables Box -->
                <rect x="230" y="180" width="140" height="60" rx="12" fill="#f59e0b" />
                <text x="300" y="205" fill="#fff" font-family="Outfit" font-size="16" font-weight="800" text-anchor="middle">CONTROLLED</text>
                <text x="300" y="225" fill="#fef3c7" font-family="Inter" font-size="12" font-weight="600" text-anchor="middle">"What Stays Same"</text>

            </svg>`,
            desc: 'The fundamental flow of any experiment. A change in the Independent variable CAUSES a change in the Dependent variable, provided everything else is Controlled.'
        }
    ]
};
