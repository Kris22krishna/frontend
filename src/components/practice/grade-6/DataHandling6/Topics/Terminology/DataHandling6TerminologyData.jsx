// ─── SVG Helpers for Terminology Illustrations ─────────────────────

function drawDataList(color) {
    return `<svg width="150" height="80" viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="10" width="100" height="60" rx="4" fill="none" stroke="${color}" stroke-width="2"/>
        <line x1="35" y1="25" x2="115" y2="25" stroke="${color}" stroke-width="2"/>
        <line x1="35" y1="40" x2="115" y2="40" stroke="${color}" stroke-width="2"/>
        <line x1="35" y1="55" x2="95" y2="55" stroke="${color}" stroke-width="2"/>
    </svg>`;
}

function drawObservation(color) {
    return `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="none" stroke="${color}" stroke-width="3"/>
        <circle cx="50" cy="50" r="10" fill="${color}"/>
        <line x1="72" y1="72" x2="90" y2="90" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
    </svg>`;
}

function drawTallyMarks(color) {
    return `<svg width="100" height="60" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="10" x2="20" y2="50" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <line x1="35" y1="10" x2="35" y2="50" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="10" x2="50" y2="50" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <line x1="65" y1="10" x2="65" y2="50" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <line x1="10" y1="40" x2="75" y2="20" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        <text x="85" y="45" font-family="sans-serif" font-weight="bold" font-size="20" fill="${color}">5</text>
    </svg>`;
}

function drawPictograph(color) {
    return `<svg width="150" height="60" viewBox="0 0 150 60" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="35" font-size="24">🍎</text>
        <text x="40" y="35" font-size="24">🍎</text>
        <text x="70" y="35" font-size="24">🍎</text>
        <text x="105" y="30" font-family="sans-serif" font-weight="bold" font-size="14" fill="${color}">= 30</text>
    </svg>`;
}

function drawBarGraph(color) {
    return `<svg width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="10" x2="20" y2="80" stroke="${color}" stroke-width="2"/>
        <line x1="20" y1="80" x2="110" y2="80" stroke="${color}" stroke-width="2"/>
        <rect x="30" y="50" width="15" height="30" fill="${color}" rx="2"/>
        <rect x="55" y="20" width="15" height="60" fill="${color}" rx="2"/>
        <rect x="80" y="60" width="15" height="20" fill="${color}" rx="2"/>
    </svg>`;
}

function drawFrequency(color) {
    return `<svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="100" height="40" rx="4" fill="none" stroke="${color}" stroke-width="2"/>
        <line x1="60" y1="10" x2="60" y2="50" stroke="${color}" stroke-width="2"/>
        <text x="35" y="35" text-anchor="middle" font-family="sans-serif" font-size="16" fill="${color}">Red</text>
        <text x="85" y="35" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="16" fill="${color}">12</text>
    </svg>`;
}

// ─── DATA SECTIONS ─────────────────────────────────────────────────────────

export const TERMS = [
    {
        name: 'Data',
        color: '#6366f1',
        icon: '📊',
        def: 'A collection of numbers or facts gathered to give some information.',
        examples: ['Test scores of 10 students', 'Daily temperature for a week'],
        inUse: 'Data helps us to organize and understand facts better.',
        memory: 'Data is just facts and figures collected together!',
        svg: drawDataList('#6366f1')
    },
    {
        name: 'Observation',
        color: '#10b981',
        icon: '👀',
        def: 'Each numerical figure or fact in a given collection of data.',
        examples: ['A score of 85 on a test', 'A temperature reading of 30°C'],
        inUse: 'If the data is {2, 5, 7, 2}, then 5 is an observation.',
        memory: 'Think of one single piece of a puzzle!',
        svg: drawObservation('#10b981')
    },
    {
        name: 'Raw Data',
        color: '#ef4444',
        icon: '📂',
        def: 'Data collected initially before it is organized or sorted.',
        examples: ['A random list of names: Ali, Bob, Cara, Bob, Ali', 'Weights recorded quickly on a notepad'],
        inUse: 'Raw data is often confusing and needs to be put into a table.',
        memory: 'Raw means "uncooked" or unorganized!',
        svg: drawDataList('#ef4444')
    },
    {
        name: 'Tally Marks',
        color: '#0891b2',
        icon: '📝',
        def: 'A quick way of keeping track of numbers in groups of five. The fifth mark crosses diagonally over the first four.',
        examples: ['|||| crossed = 5', '|| = 2'],
        inUse: 'Tally marks make it easy to count occurrences one by one without losing track.',
        memory: 'One, two, three, four, cross for five!',
        svg: drawTallyMarks('#0891b2')
    },
    {
        name: 'Frequency',
        color: '#f59e0b',
        icon: '🔢',
        def: 'The number of times a particular observation occurs in the given data.',
        examples: ['If 5 students get an A grade, the frequency of A is 5', 'If the number "7" appears 3 times in a list, its frequency is 3'],
        inUse: 'Frequency tables map objects to their counts.',
        memory: 'Frequency = "How frequent" or how often it happens.',
        svg: drawFrequency('#f59e0b')
    },
    {
        name: 'Pictograph',
        color: '#8b5cf6',
        icon: '🖼️',
        def: 'A way of representing data using images or symbols. Each image stands for a certain number of subjects.',
        examples: ['One apple icon = 10 actual apples'],
        inUse: 'A key is essential to know what one picture represents.',
        memory: 'Picture + Graph = Pictograph!',
        svg: drawPictograph('#8b5cf6')
    },
    {
        name: 'Bar Graph',
        color: '#ec4899',
        icon: '📈',
        def: 'A graphical display of data using bars of uniform width whose heights (or lengths) are proportional to the values they represent.',
        examples: ['A chart with tall rectangles showing monthly rainfall'],
        inUse: 'The gap between each bar is uniform.',
        memory: 'Bars like buildings—taller building means a bigger number!',
        svg: drawBarGraph('#ec4899')
    },
    {
        name: 'Scale',
        color: '#06b6d4',
        icon: '📏',
        def: 'The numbers chosen on the axis of a bar graph to represent large amounts of data. Using a scale makes graphs fit on paper.',
        examples: ['1 unit = 10 students', '1 cm = 100 kilometers'],
        inUse: 'If a bar goes up to 5 and the scale is 1 unit = 10, the value is 50.',
        memory: 'It scales down giant numbers to fit on your page!',
        svg: drawBarGraph('#06b6d4')
    }
];

export const CHART_TYPES = [
    {
        num: 1,
        title: 'Tally Chart',
        rule: 'Used to record data quickly as it happens.',
        emoji: '📝',
        color: '#10b981',
        detail: 'A table with three columns: the categories, the tally marks, and the final frequency count.',
        examples: ['Counting cars passing by', 'Voting for a class monitor'],
        tip: 'Always group tallies in fives! It makes the final counting super fast.',
        svg: drawTallyMarks('#10b981')
    },
    {
        num: 2,
        title: 'Pictograph',
        rule: 'Represents data through pictures of objects.',
        emoji: '🖼️',
        color: '#ef4444',
        detail: 'Best for visual appeal. It uses a "Key" to explain that one picture might equal multiple items, like 1 symbol = 10 books.',
        examples: ['Books read by students', 'Trees planted in different years'],
        tip: 'Always check the Key! A half picture usually means half the value of the Key.',
        svg: drawPictograph('#ef4444')
    },
    {
        num: 3,
        title: 'Vertical Bar Graph',
        rule: 'Data is represented by vertical bars (standing straight up).',
        emoji: '📊',
        color: '#3b82f6',
        detail: 'The values (like numbers) are shown on the vertical axis (Y-axis), and categories are on the horizontal axis (X-axis).',
        examples: ['Marks scored in different subjects', 'Maximum temperatures of cities'],
        tip: 'The width of all bars must be identical, and spacing between them must be uniform.',
        svg: drawBarGraph('#3b82f6')
    },
    {
        num: 4,
        title: 'Horizontal Bar Graph',
        rule: 'Data is represented by horizontal bars (lying flat).',
        emoji: '📏',
        color: '#f59e0b',
        detail: 'The values are shown on the horizontal axis (X-axis), and categories are on the vertical axis (Y-axis). It is just a rotated vertical bar graph.',
        examples: ['Lengths of different rivers', 'Time taken to complete a race'],
        tip: 'Works best when category names are very long and need horizontal space to be readable.',
        svg: `<svg width="120" height="100" viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="10" x2="20" y2="80" stroke="#f59e0b" stroke-width="2"/>
        <line x1="20" y1="80" x2="110" y2="80" stroke="#f59e0b" stroke-width="2"/>
        <rect x="20" y="20" width="30" height="15" fill="#f59e0b" rx="2"/>
        <rect x="20" y="45" width="60" height="15" fill="#f59e0b" rx="2"/>
        <rect x="20" y="70" width="20" height="15" fill="#f59e0b" rx="2"/>
    </svg>`
    }
];

export const VOCAB_QUIZ = [
    {
        question: "A collection of facts, such as numbers, words, measurements, or observations is called:",
        options: ["Graph", "Data", "Tally", "Scale"],
        correct: 1,
        explanation: "Data is the general term for a collection of recorded facts and numbers.",
        svg: drawDataList('#6366f1')
    },
    {
        question: "What do we call data that has been collected but NOT yet organized or sorted?",
        options: ["Raw Data", "Processed Data", "Graph Data", "Tally Data"],
        correct: 0,
        explanation: "Before it is put into tables or graphs, data is \"raw\" and unorganized."
    },
    {
        question: "When grouping tally marks, we usually place a diagonal line across the first four vertical lines. This represents a group of:",
        options: ["Four", "Five", "Ten", "Six"],
        correct: 1,
        explanation: "A standard tally bundle represents exactly five (four vertical, one diagonal across)."
    },
    {
        question: "The number of times a particular observation occurs is called its:",
        options: ["Tally", "Frequency", "Scale", "Value"],
        correct: 1,
        explanation: "Frequency literally means \"how often something happens.\""
    },
    {
        question: "A graph that uses pictures or symbols to show data is specifically called a:",
        options: ["Bar Graph", "Line Graph", "Pictograph", "Pie Chart"],
        correct: 2,
        explanation: "A pictograph uses pictures where one picture can stand for one or many items.",
        svg: drawPictograph('#8b5cf6')
    },
    {
        question: "In a pictograph, the _______ explains what number each picture represents.",
        options: ["Category", "Scale", "Frequency", "Key (or Legend)"],
        correct: 3,
        explanation: "The Key (or Legend) is crucial in a pictograph to know if an apple picture means 1 apple or 10 apples."
    },
    {
        question: "A graphical representation of data using solid columns of uniform width is called a:",
        options: ["Pictograph", "Tally Table", "Bar Graph", "Frequency Table"],
        correct: 2,
        explanation: "Bar graphs use vertical or horizontal bars to show values."
    },
    {
        question: "What must remain the same throughout a properly drawn Bar Graph?",
        options: ["Only the bar height", "Only the bar color", "The width of the bars and the gap between them", "The overall size of the chart"],
        correct: 2,
        explanation: "To not be misleading, all bars must have the same width, and the spaces between them must be uniform."
    },
    {
        question: "If the scale on the Y-axis of a bar graph is '1 unit = 5 students', what does a bar of height 4 units represent?",
        options: ["4 students", "5 students", "9 students", "20 students"],
        correct: 3,
        explanation: "Multiply the height by the scale: 4 units * 5 students = 20 students."
    },
    {
        question: "If a pictograph uses a full circle 🟡 to represent 10 balls, what would a half circle 🌗 represent?",
        options: ["10 balls", "20 balls", "5 balls", "2 balls"],
        correct: 2,
        explanation: "A half picture typically represents exactly half the value given in the key. 10 / 2 = 5 balls."
    }
];
