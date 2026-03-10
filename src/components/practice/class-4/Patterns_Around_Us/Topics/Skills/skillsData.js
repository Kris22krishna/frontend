export const skillsData = [
    {
        id: 'counting-grouping',
        title: 'Counting by Grouping',
        desc: 'Pack objects into groups interactively.',
        color: '#d97706',
        icon: '🍎',
        learnSections: [
            { heading: 'What is Grouping?', content: 'Instead of counting objects one by one, we can group them and count faster!', example: 'If you have 4 groups of 5 apples, you just count by 5s: 5, 10, 15, 20.' }
        ],
        practice: [
    {
        "type": "interactive-grouping",
        "question": "We have 15 students. Form teams of 5. How many teams?",
        "options": [
            "3",
            "4",
            "2",
            "8"
        ],
        "correctAnswer": 0,
        "explanation": "When you divide 15 by 5, you get 3 groups!",
        "groupSize": 5,
        "totalItems": 15,
        "emoji": "\ud83d\udc69\u200d\ud83c\udf93",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We have 25 students. Form teams of 5. How many teams?",
        "options": [
            "5",
            "7",
            "15",
            "3"
        ],
        "correctAnswer": 0,
        "explanation": "When you divide 25 by 5, you get 5 groups!",
        "groupSize": 5,
        "totalItems": 25,
        "emoji": "\ud83d\udc69\u200d\ud83c\udf93",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "You have 30 eggs. Pack them into cartons of 5. How many full cartons do you get?",
        "options": [
            "5",
            "7",
            "11",
            "6"
        ],
        "correctAnswer": 3,
        "explanation": "When you divide 30 by 5, you get 6 groups!",
        "groupSize": 5,
        "totalItems": 30,
        "emoji": "\ud83e\udd5a",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "There are 18 bananas. Put them into baskets of 6. How many baskets?",
        "options": [
            "3",
            "13",
            "8",
            "5"
        ],
        "correctAnswer": 0,
        "explanation": "When you divide 18 by 6, you get 3 groups!",
        "groupSize": 6,
        "totalItems": 18,
        "emoji": "\ud83c\udf4c",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "There are 20 bananas. Put them into baskets of 5. How many baskets?",
        "options": [
            "6",
            "9",
            "3",
            "4"
        ],
        "correctAnswer": 3,
        "explanation": "When you divide 20 by 5, you get 4 groups!",
        "groupSize": 5,
        "totalItems": 20,
        "emoji": "\ud83c\udf4c",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We built 6 toys. Box them up in groups of 2. How many boxes?",
        "options": [
            "1",
            "4",
            "5",
            "3"
        ],
        "correctAnswer": 3,
        "explanation": "When you divide 6 by 2, you get 3 groups!",
        "groupSize": 2,
        "totalItems": 6,
        "emoji": "\ud83e\uddf8",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We have 20 students. Form teams of 5. How many teams?",
        "options": [
            "4",
            "6",
            "9",
            "5"
        ],
        "correctAnswer": 0,
        "explanation": "When you divide 20 by 5, you get 4 groups!",
        "groupSize": 5,
        "totalItems": 20,
        "emoji": "\ud83d\udc69\u200d\ud83c\udf93",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "You have 16 eggs. Pack them into cartons of 4. How many full cartons do you get?",
        "options": [
            "9",
            "4",
            "2",
            "3"
        ],
        "correctAnswer": 1,
        "explanation": "When you divide 16 by 4, you get 4 groups!",
        "groupSize": 4,
        "totalItems": 16,
        "emoji": "\ud83e\udd5a",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We built 25 toys. Box them up in groups of 5. How many boxes?",
        "options": [
            "4",
            "7",
            "5",
            "10"
        ],
        "correctAnswer": 2,
        "explanation": "When you divide 25 by 5, you get 5 groups!",
        "groupSize": 5,
        "totalItems": 25,
        "emoji": "\ud83e\uddf8",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We built 24 toys. Box them up in groups of 6. How many boxes?",
        "options": [
            "5",
            "4",
            "6",
            "3"
        ],
        "correctAnswer": 1,
        "explanation": "When you divide 24 by 6, you get 4 groups!",
        "groupSize": 6,
        "totalItems": 24,
        "emoji": "\ud83e\uddf8",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We have 20 students. Form teams of 4. How many teams?",
        "options": [
            "10",
            "6",
            "15",
            "5"
        ],
        "correctAnswer": 3,
        "explanation": "When you divide 20 by 4, you get 5 groups!",
        "groupSize": 4,
        "totalItems": 20,
        "emoji": "\ud83d\udc69\u200d\ud83c\udf93",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "There are 12 bananas. Put them into baskets of 4. How many baskets?",
        "options": [
            "8",
            "3",
            "5",
            "13"
        ],
        "correctAnswer": 1,
        "explanation": "When you divide 12 by 4, you get 3 groups!",
        "groupSize": 4,
        "totalItems": 12,
        "emoji": "\ud83c\udf4c",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "You have 12 eggs. Pack them into cartons of 4. How many full cartons do you get?",
        "options": [
            "13",
            "2",
            "3",
            "4"
        ],
        "correctAnswer": 2,
        "explanation": "When you divide 12 by 4, you get 3 groups!",
        "groupSize": 4,
        "totalItems": 12,
        "emoji": "\ud83e\udd5a",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We built 24 toys. Box them up in groups of 4. How many boxes?",
        "options": [
            "7",
            "16",
            "6",
            "1"
        ],
        "correctAnswer": 2,
        "explanation": "When you divide 24 by 4, you get 6 groups!",
        "groupSize": 4,
        "totalItems": 24,
        "emoji": "\ud83e\uddf8",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "You have 30 eggs. Pack them into cartons of 6. How many full cartons do you get?",
        "options": [
            "10",
            "7",
            "15",
            "5"
        ],
        "correctAnswer": 3,
        "explanation": "When you divide 30 by 6, you get 5 groups!",
        "groupSize": 6,
        "totalItems": 30,
        "emoji": "\ud83e\udd5a",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We built 10 toys. Box them up in groups of 2. How many boxes?",
        "options": [
            "5",
            "10",
            "7",
            "6"
        ],
        "correctAnswer": 0,
        "explanation": "When you divide 10 by 2, you get 5 groups!",
        "groupSize": 2,
        "totalItems": 10,
        "emoji": "\ud83e\uddf8",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "There are 10 bananas. Put them into baskets of 5. How many baskets?",
        "options": [
            "7",
            "3",
            "2",
            "4"
        ],
        "correctAnswer": 2,
        "explanation": "When you divide 10 by 5, you get 2 groups!",
        "groupSize": 5,
        "totalItems": 10,
        "emoji": "\ud83c\udf4c",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "There are 4 bananas. Put them into baskets of 2. How many baskets?",
        "options": [
            "2",
            "3",
            "1",
            "12"
        ],
        "correctAnswer": 0,
        "explanation": "When you divide 4 by 2, you get 2 groups!",
        "groupSize": 2,
        "totalItems": 4,
        "emoji": "\ud83c\udf4c",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "You have 18 eggs. Pack them into cartons of 6. How many full cartons do you get?",
        "options": [
            "8",
            "1",
            "13",
            "3"
        ],
        "correctAnswer": 3,
        "explanation": "When you divide 18 by 6, you get 3 groups!",
        "groupSize": 6,
        "totalItems": 18,
        "emoji": "\ud83e\udd5a",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "You have 24 eggs. Pack them into cartons of 6. How many full cartons do you get?",
        "options": [
            "14",
            "3",
            "6",
            "4"
        ],
        "correctAnswer": 3,
        "explanation": "When you divide 24 by 6, you get 4 groups!",
        "groupSize": 6,
        "totalItems": 24,
        "emoji": "\ud83e\udd5a",
        "image": null
    }
],
        assessment: [
    {
        "type": "interactive-grouping",
        "question": "We have 8 students. Form teams of 2. How many teams?",
        "options": [
            "4",
            "5",
            "2",
            "3"
        ],
        "correctAnswer": 0,
        "explanation": "When you divide 8 by 2, you get 4 groups!",
        "groupSize": 2,
        "totalItems": 8,
        "emoji": "\ud83d\udc69\u200d\ud83c\udf93",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We have 30 students. Form teams of 5. How many teams?",
        "options": [
            "6",
            "11",
            "5",
            "4"
        ],
        "correctAnswer": 0,
        "explanation": "When you divide 30 by 5, you get 6 groups!",
        "groupSize": 5,
        "totalItems": 30,
        "emoji": "\ud83d\udc69\u200d\ud83c\udf93",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "You have 20 eggs. Pack them into cartons of 4. How many full cartons do you get?",
        "options": [
            "3",
            "6",
            "5",
            "15"
        ],
        "correctAnswer": 2,
        "explanation": "When you divide 20 by 4, you get 5 groups!",
        "groupSize": 4,
        "totalItems": 20,
        "emoji": "\ud83e\udd5a",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "You have 4 eggs. Pack them into cartons of 2. How many full cartons do you get?",
        "options": [
            "4",
            "1",
            "12",
            "2"
        ],
        "correctAnswer": 3,
        "explanation": "When you divide 4 by 2, you get 2 groups!",
        "groupSize": 2,
        "totalItems": 4,
        "emoji": "\ud83e\udd5a",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We built 24 toys. Box them up in groups of 6. How many boxes?",
        "options": [
            "6",
            "5",
            "9",
            "4"
        ],
        "correctAnswer": 3,
        "explanation": "When you divide 24 by 6, you get 4 groups!",
        "groupSize": 6,
        "totalItems": 24,
        "emoji": "\ud83e\uddf8",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "You have 8 eggs. Pack them into cartons of 4. How many full cartons do you get?",
        "options": [
            "2",
            "3",
            "7",
            "12"
        ],
        "correctAnswer": 0,
        "explanation": "When you divide 8 by 4, you get 2 groups!",
        "groupSize": 4,
        "totalItems": 8,
        "emoji": "\ud83e\udd5a",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We have 12 students. Form teams of 3. How many teams?",
        "options": [
            "6",
            "3",
            "4",
            "14"
        ],
        "correctAnswer": 2,
        "explanation": "When you divide 12 by 3, you get 4 groups!",
        "groupSize": 3,
        "totalItems": 12,
        "emoji": "\ud83d\udc69\u200d\ud83c\udf93",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We have 24 students. Form teams of 6. How many teams?",
        "options": [
            "2",
            "5",
            "4",
            "9"
        ],
        "correctAnswer": 2,
        "explanation": "When you divide 24 by 6, you get 4 groups!",
        "groupSize": 6,
        "totalItems": 24,
        "emoji": "\ud83d\udc69\u200d\ud83c\udf93",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "You have 18 eggs. Pack them into cartons of 6. How many full cartons do you get?",
        "options": [
            "4",
            "3",
            "1",
            "13"
        ],
        "correctAnswer": 1,
        "explanation": "When you divide 18 by 6, you get 3 groups!",
        "groupSize": 6,
        "totalItems": 18,
        "emoji": "\ud83e\udd5a",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "You have 10 eggs. Pack them into cartons of 5. How many full cartons do you get?",
        "options": [
            "4",
            "3",
            "7",
            "2"
        ],
        "correctAnswer": 3,
        "explanation": "When you divide 10 by 5, you get 2 groups!",
        "groupSize": 5,
        "totalItems": 10,
        "emoji": "\ud83e\udd5a",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We have 18 students. Form teams of 3. How many teams?",
        "options": [
            "16",
            "5",
            "6",
            "11"
        ],
        "correctAnswer": 2,
        "explanation": "When you divide 18 by 3, you get 6 groups!",
        "groupSize": 3,
        "totalItems": 18,
        "emoji": "\ud83d\udc69\u200d\ud83c\udf93",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We have 36 students. Form teams of 6. How many teams?",
        "options": [
            "11",
            "6",
            "16",
            "4"
        ],
        "correctAnswer": 1,
        "explanation": "When you divide 36 by 6, you get 6 groups!",
        "groupSize": 6,
        "totalItems": 36,
        "emoji": "\ud83d\udc69\u200d\ud83c\udf93",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "There are 6 bananas. Put them into baskets of 3. How many baskets?",
        "options": [
            "1",
            "2",
            "12",
            "7"
        ],
        "correctAnswer": 1,
        "explanation": "When you divide 6 by 3, you get 2 groups!",
        "groupSize": 3,
        "totalItems": 6,
        "emoji": "\ud83c\udf4c",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "There are 12 bananas. Put them into baskets of 2. How many baskets?",
        "options": [
            "6",
            "11",
            "7",
            "8"
        ],
        "correctAnswer": 0,
        "explanation": "When you divide 12 by 2, you get 6 groups!",
        "groupSize": 2,
        "totalItems": 12,
        "emoji": "\ud83c\udf4c",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "There are 18 bananas. Put them into baskets of 3. How many baskets?",
        "options": [
            "11",
            "8",
            "7",
            "6"
        ],
        "correctAnswer": 3,
        "explanation": "When you divide 18 by 3, you get 6 groups!",
        "groupSize": 3,
        "totalItems": 18,
        "emoji": "\ud83c\udf4c",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We built 15 toys. Box them up in groups of 3. How many boxes?",
        "options": [
            "6",
            "15",
            "7",
            "5"
        ],
        "correctAnswer": 3,
        "explanation": "When you divide 15 by 3, you get 5 groups!",
        "groupSize": 3,
        "totalItems": 15,
        "emoji": "\ud83e\uddf8",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "There are 12 bananas. Put them into baskets of 4. How many baskets?",
        "options": [
            "13",
            "3",
            "8",
            "1"
        ],
        "correctAnswer": 1,
        "explanation": "When you divide 12 by 4, you get 3 groups!",
        "groupSize": 4,
        "totalItems": 12,
        "emoji": "\ud83c\udf4c",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "We built 20 toys. Box them up in groups of 4. How many boxes?",
        "options": [
            "3",
            "6",
            "4",
            "5"
        ],
        "correctAnswer": 3,
        "explanation": "When you divide 20 by 4, you get 5 groups!",
        "groupSize": 4,
        "totalItems": 20,
        "emoji": "\ud83e\uddf8",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "You have 24 eggs. Pack them into cartons of 4. How many full cartons do you get?",
        "options": [
            "1",
            "8",
            "4",
            "6"
        ],
        "correctAnswer": 3,
        "explanation": "When you divide 24 by 4, you get 6 groups!",
        "groupSize": 4,
        "totalItems": 24,
        "emoji": "\ud83e\udd5a",
        "image": null
    },
    {
        "type": "interactive-grouping",
        "question": "There are 24 bananas. Put them into baskets of 6. How many baskets?",
        "options": [
            "14",
            "3",
            "4",
            "5"
        ],
        "correctAnswer": 2,
        "explanation": "When you divide 24 by 6, you get 4 groups!",
        "groupSize": 6,
        "totalItems": 24,
        "emoji": "\ud83c\udf4c",
        "image": null
    }
]
    },
    {
        id: 'money-patterns',
        title: 'Money Patterns',
        desc: 'Solve sequences and fill the blank.',
        color: '#059669',
        icon: '💰',
        learnSections: [
            { heading: 'Number Sequences', content: 'A number sequence is a list of numbers linked by a rule.', example: 'If the sequence goes 5 → 10 → 15, the rule is adding 5 each time. The next would be 20!' }
        ],
        practice: [
    {
        "type": "fill-blank",
        "question": "Find the missing coin: \u20b92 + \u20b92 = ___",
        "options": [
            "4",
            "9",
            "2",
            "14"
        ],
        "correctAnswer": 0,
        "explanation": "The number sequence jumps by 20 each time. So the missing number is 4.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "What coin comes next in the pattern? \n\u20b920 \u2192 \u20b930 \u2192 \u20b940 \u2192 \u20b950 \u2192 ___",
        "options": [
            "55",
            "65",
            "61",
            "60"
        ],
        "correctAnswer": 3,
        "explanation": "The number sequence jumps by 10 each time. So the missing number is 60.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Your piggy bank is filling daily: \u20b910 \u2192 \u20b920 \u2192 \u20b930 \u2192 ___. What's the amount on the last day?",
        "options": [
            "35",
            "45",
            "39",
            "40"
        ],
        "correctAnswer": 3,
        "explanation": "The number sequence jumps by 10 each time. So the missing number is 40.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "What coin comes next in the pattern? \n\u20b910 \u2192 \u20b920 \u2192 \u20b930 \u2192 ___",
        "options": [
            "35",
            "40",
            "45",
            "30"
        ],
        "correctAnswer": 1,
        "explanation": "The number sequence jumps by 10 each time. So the missing number is 40.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "The shopkeeper counts money: \u20b960 \u2192 \u20b980 \u2192 \u20b9100 \u2192 \u20b9120 \u2192 ___. What comes next?",
        "options": [
            "141",
            "142",
            "135",
            "140"
        ],
        "correctAnswer": 3,
        "explanation": "The number sequence jumps by 20 each time. So the missing number is 140.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "The shopkeeper counts money: \u20b940 \u2192 \u20b960 \u2192 \u20b980 \u2192 \u20b9100 \u2192 ___. What comes next?",
        "options": [
            "125",
            "115",
            "120",
            "110"
        ],
        "correctAnswer": 2,
        "explanation": "The number sequence jumps by 20 each time. So the missing number is 120.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "The shopkeeper counts money: \u20b920 \u2192 \u20b940 \u2192 \u20b960 \u2192 \u20b980 \u2192 ___. What comes next?",
        "options": [
            "100",
            "99",
            "101",
            "98"
        ],
        "correctAnswer": 0,
        "explanation": "The number sequence jumps by 20 each time. So the missing number is 100.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Your piggy bank is filling daily: \u20b910 \u2192 \u20b915 \u2192 \u20b920 \u2192 ___. What's the amount on the last day?",
        "options": [
            "27",
            "15",
            "35",
            "25"
        ],
        "correctAnswer": 3,
        "explanation": "The number sequence jumps by 5 each time. So the missing number is 25.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Your piggy bank is filling daily: \u20b95 \u2192 \u20b910 \u2192 \u20b915 \u2192 \u20b920 \u2192 ___. What's the amount on the last day?",
        "options": [
            "25",
            "26",
            "30",
            "27"
        ],
        "correctAnswer": 0,
        "explanation": "The number sequence jumps by 5 each time. So the missing number is 25.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Find the missing coin: \u20b95 + \u20b910 = ___",
        "options": [
            "15",
            "17",
            "16",
            "14"
        ],
        "correctAnswer": 0,
        "explanation": "The number sequence jumps by 50 each time. So the missing number is 15.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "What coin comes next in the pattern? \n\u20b9100 \u2192 \u20b9150 \u2192 \u20b9200 \u2192 \u20b9250 \u2192 ___",
        "options": [
            "299",
            "302",
            "300",
            "298"
        ],
        "correctAnswer": 2,
        "explanation": "The number sequence jumps by 50 each time. So the missing number is 300.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Your piggy bank is filling daily: \u20b915 \u2192 \u20b920 \u2192 \u20b925 \u2192 ___. What's the amount on the last day?",
        "options": [
            "32",
            "28",
            "35",
            "30"
        ],
        "correctAnswer": 3,
        "explanation": "The number sequence jumps by 5 each time. So the missing number is 30.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "The shopkeeper counts money: \u20b94 \u2192 \u20b96 \u2192 \u20b98 \u2192 \u20b910 \u2192 ___. What comes next?",
        "options": [
            "17",
            "12",
            "2",
            "7"
        ],
        "correctAnswer": 1,
        "explanation": "The number sequence jumps by 2 each time. So the missing number is 12.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Find the missing coin: \u20b910 + \u20b950 = ___",
        "options": [
            "61",
            "55",
            "60",
            "62"
        ],
        "correctAnswer": 2,
        "explanation": "The number sequence jumps by 10 each time. So the missing number is 60.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Find the missing coin: \u20b950 + \u20b910 = ___",
        "options": [
            "65",
            "70",
            "60",
            "61"
        ],
        "correctAnswer": 2,
        "explanation": "The number sequence jumps by 10 each time. So the missing number is 60.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Find the missing coin: \u20b950 + \u20b920 = ___",
        "options": [
            "68",
            "70",
            "80",
            "71"
        ],
        "correctAnswer": 1,
        "explanation": "The number sequence jumps by 50 each time. So the missing number is 70.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "What coin comes next in the pattern? \n\u20b94 \u2192 \u20b96 \u2192 \u20b98 \u2192 ___",
        "options": [
            "10",
            "8",
            "15",
            "5"
        ],
        "correctAnswer": 0,
        "explanation": "The number sequence jumps by 2 each time. So the missing number is 10.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "What coin comes next in the pattern? \n\u20b960 \u2192 \u20b980 \u2192 \u20b9100 \u2192 \u20b9120 \u2192 ___",
        "options": [
            "140",
            "141",
            "139",
            "145"
        ],
        "correctAnswer": 0,
        "explanation": "The number sequence jumps by 20 each time. So the missing number is 140.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "The shopkeeper counts money: \u20b950 \u2192 \u20b9100 \u2192 \u20b9150 \u2192 ___. What comes next?",
        "options": [
            "198",
            "195",
            "200",
            "205"
        ],
        "correctAnswer": 2,
        "explanation": "The number sequence jumps by 50 each time. So the missing number is 200.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "What coin comes next in the pattern? \n\u20b920 \u2192 \u20b940 \u2192 \u20b960 \u2192 \u20b980 \u2192 ___",
        "options": [
            "105",
            "102",
            "110",
            "100"
        ],
        "correctAnswer": 3,
        "explanation": "The number sequence jumps by 20 each time. So the missing number is 100.",
        "image": null
    }
],
        assessment: [
    {
        "type": "fill-blank",
        "question": "Find the missing coin: \u20b92 + \u20b950 = ___",
        "options": [
            "42",
            "54",
            "52",
            "47"
        ],
        "correctAnswer": 2,
        "explanation": "The number sequence jumps by 10 each time. So the missing number is 52.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "What coin comes next in the pattern? \n\u20b96 \u2192 \u20b98 \u2192 \u20b910 \u2192 ___",
        "options": [
            "14",
            "10",
            "12",
            "17"
        ],
        "correctAnswer": 2,
        "explanation": "The number sequence jumps by 2 each time. So the missing number is 12.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Find the missing coin: \u20b910 + \u20b910 = ___",
        "options": [
            "30",
            "20",
            "21",
            "10"
        ],
        "correctAnswer": 1,
        "explanation": "The number sequence jumps by 5 each time. So the missing number is 20.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Find the missing coin: \u20b92 + \u20b92 = ___",
        "options": [
            "9",
            "4",
            "2",
            "6"
        ],
        "correctAnswer": 1,
        "explanation": "The number sequence jumps by 2 each time. So the missing number is 4.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "The shopkeeper counts money: \u20b910 \u2192 \u20b920 \u2192 \u20b930 \u2192 \u20b940 \u2192 ___. What comes next?",
        "options": [
            "49",
            "40",
            "48",
            "50"
        ],
        "correctAnswer": 3,
        "explanation": "The number sequence jumps by 10 each time. So the missing number is 50.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Find the missing coin: \u20b910 + \u20b920 = ___",
        "options": [
            "31",
            "28",
            "40",
            "30"
        ],
        "correctAnswer": 3,
        "explanation": "The number sequence jumps by 50 each time. So the missing number is 30.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "The shopkeeper counts money: \u20b930 \u2192 \u20b940 \u2192 \u20b950 \u2192 \u20b960 \u2192 ___. What comes next?",
        "options": [
            "80",
            "65",
            "60",
            "70"
        ],
        "correctAnswer": 3,
        "explanation": "The number sequence jumps by 10 each time. So the missing number is 70.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "What coin comes next in the pattern? \n\u20b9100 \u2192 \u20b9150 \u2192 \u20b9200 \u2192 ___",
        "options": [
            "240",
            "250",
            "255",
            "251"
        ],
        "correctAnswer": 1,
        "explanation": "The number sequence jumps by 50 each time. So the missing number is 250.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "What coin comes next in the pattern? \n\u20b950 \u2192 \u20b9100 \u2192 \u20b9150 \u2192 ___",
        "options": [
            "205",
            "201",
            "200",
            "199"
        ],
        "correctAnswer": 2,
        "explanation": "The number sequence jumps by 50 each time. So the missing number is 200.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Your piggy bank is filling daily: \u20b9100 \u2192 \u20b9150 \u2192 \u20b9200 \u2192 \u20b9250 \u2192 ___. What's the amount on the last day?",
        "options": [
            "298",
            "301",
            "300",
            "299"
        ],
        "correctAnswer": 2,
        "explanation": "The number sequence jumps by 50 each time. So the missing number is 300.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Find the missing coin: \u20b95 + \u20b950 = ___",
        "options": [
            "55",
            "53",
            "60",
            "45"
        ],
        "correctAnswer": 0,
        "explanation": "The number sequence jumps by 50 each time. So the missing number is 55.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "What coin comes next in the pattern? \n\u20b910 \u2192 \u20b915 \u2192 \u20b920 \u2192 ___",
        "options": [
            "27",
            "25",
            "30",
            "23"
        ],
        "correctAnswer": 1,
        "explanation": "The number sequence jumps by 5 each time. So the missing number is 25.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "The shopkeeper counts money: \u20b96 \u2192 \u20b98 \u2192 \u20b910 \u2192 \u20b912 \u2192 ___. What comes next?",
        "options": [
            "14",
            "24",
            "4",
            "13"
        ],
        "correctAnswer": 0,
        "explanation": "The number sequence jumps by 2 each time. So the missing number is 14.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Your piggy bank is filling daily: \u20b930 \u2192 \u20b940 \u2192 \u20b950 \u2192 \u20b960 \u2192 ___. What's the amount on the last day?",
        "options": [
            "65",
            "60",
            "70",
            "80"
        ],
        "correctAnswer": 2,
        "explanation": "The number sequence jumps by 10 each time. So the missing number is 70.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "The shopkeeper counts money: \u20b95 \u2192 \u20b910 \u2192 \u20b915 \u2192 ___. What comes next?",
        "options": [
            "20",
            "30",
            "19",
            "25"
        ],
        "correctAnswer": 0,
        "explanation": "The number sequence jumps by 5 each time. So the missing number is 20.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "The shopkeeper counts money: \u20b94 \u2192 \u20b96 \u2192 \u20b98 \u2192 \u20b910 \u2192 ___. What comes next?",
        "options": [
            "12",
            "14",
            "2",
            "13"
        ],
        "correctAnswer": 0,
        "explanation": "The number sequence jumps by 2 each time. So the missing number is 12.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "The shopkeeper counts money: \u20b92 \u2192 \u20b94 \u2192 \u20b96 \u2192 \u20b98 \u2192 ___. What comes next?",
        "options": [
            "20",
            "11",
            "10",
            "8"
        ],
        "correctAnswer": 2,
        "explanation": "The number sequence jumps by 2 each time. So the missing number is 10.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Your piggy bank is filling daily: \u20b95 \u2192 \u20b910 \u2192 \u20b915 \u2192 ___. What's the amount on the last day?",
        "options": [
            "30",
            "20",
            "19",
            "25"
        ],
        "correctAnswer": 1,
        "explanation": "The number sequence jumps by 5 each time. So the missing number is 20.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "Find the missing coin: \u20b92 + \u20b920 = ___",
        "options": [
            "12",
            "17",
            "21",
            "22"
        ],
        "correctAnswer": 3,
        "explanation": "The number sequence jumps by 20 each time. So the missing number is 22.",
        "image": null
    },
    {
        "type": "fill-blank",
        "question": "What coin comes next in the pattern? \n\u20b910 \u2192 \u20b920 \u2192 \u20b930 \u2192 ___",
        "options": [
            "40",
            "39",
            "41",
            "45"
        ],
        "correctAnswer": 0,
        "explanation": "The number sequence jumps by 10 each time. So the missing number is 40.",
        "image": null
    }
]
    },
    {
        id: 'odd-and-even',
        title: 'Odd and Even',
        desc: 'Pair objects and find who is left out.',
        color: '#dc2626',
        icon: '👯',
        learnSections: [
            { heading: 'Perfect Pairs', content: 'Even numbers can be paired perfectly with nobody left out (like 2, 4, 6). Odd numbers always leave one piece without a partner (like 3, 5, 7).', example: '8 shoes make 4 perfect pairs. 8 is EVEN!' }
        ],
        practice: [
    {
        "type": "visual-pairing",
        "question": "There are 10 shoes scattered around. Pair them up! Is the number even or odd?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "10 is an Even number. There are zero left over!",
        "totalItems": 10,
        "emoji": "\ud83d\udc5f",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 15 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 15 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "15 is an Odd number. One item is left alone!",
        "totalItems": 15,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 23 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 23 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "23 is an Odd number. One item is left alone!",
        "totalItems": 23,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 12 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 12 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "12 is an Even number. There are zero left over!",
        "totalItems": 12,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "23 children are boarding a bus with 2 seats per row. Will all seats be filled perfectly? (Yes=Even, No=Odd)",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "23 is an Odd number. One item is left alone!",
        "totalItems": 23,
        "emoji": "\ud83e\uddd1",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "13 children are boarding a bus with 2 seats per row. Will all seats be filled perfectly? (Yes=Even, No=Odd)",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "13 is an Odd number. One item is left alone!",
        "totalItems": 13,
        "emoji": "\ud83e\uddd1",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "There are 20 shoes scattered around. Pair them up! Is the number even or odd?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "20 is an Even number. There are zero left over!",
        "totalItems": 20,
        "emoji": "\ud83d\udc5f",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "10 children are boarding a bus with 2 seats per row. Will all seats be filled perfectly? (Yes=Even, No=Odd)",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "10 is an Even number. There are zero left over!",
        "totalItems": 10,
        "emoji": "\ud83e\uddd1",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 9 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 9 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "9 is an Odd number. One item is left alone!",
        "totalItems": 9,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 17 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 17 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "17 is an Odd number. One item is left alone!",
        "totalItems": 17,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 24 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 24 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "24 is an Even number. There are zero left over!",
        "totalItems": 24,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "20 children are boarding a bus with 2 seats per row. Will all seats be filled perfectly? (Yes=Even, No=Odd)",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "20 is an Even number. There are zero left over!",
        "totalItems": 20,
        "emoji": "\ud83e\uddd1",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "12 children are boarding a bus with 2 seats per row. Will all seats be filled perfectly? (Yes=Even, No=Odd)",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "12 is an Even number. There are zero left over!",
        "totalItems": 12,
        "emoji": "\ud83e\uddd1",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "There are 24 shoes scattered around. Pair them up! Is the number even or odd?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "24 is an Even number. There are zero left over!",
        "totalItems": 24,
        "emoji": "\ud83d\udc5f",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 7 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 7 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "7 is an Odd number. One item is left alone!",
        "totalItems": 7,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "14 children are boarding a bus with 2 seats per row. Will all seats be filled perfectly? (Yes=Even, No=Odd)",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "14 is an Even number. There are zero left over!",
        "totalItems": 14,
        "emoji": "\ud83e\uddd1",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 4 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 4 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "4 is an Even number. There are zero left over!",
        "totalItems": 4,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 16 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 16 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "16 is an Even number. There are zero left over!",
        "totalItems": 16,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 5 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 5 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "5 is an Odd number. One item is left alone!",
        "totalItems": 5,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "There are 15 shoes scattered around. Pair them up! Is the number even or odd?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "15 is an Odd number. One item is left alone!",
        "totalItems": 15,
        "emoji": "\ud83d\udc5f",
        "image": null
    }
],
        assessment: [
    {
        "type": "visual-pairing",
        "question": "17 children are boarding a bus with 2 seats per row. Will all seats be filled perfectly? (Yes=Even, No=Odd)",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "17 is an Odd number. One item is left alone!",
        "totalItems": 17,
        "emoji": "\ud83e\uddd1",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "There are 20 shoes scattered around. Pair them up! Is the number even or odd?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "20 is an Even number. There are zero left over!",
        "totalItems": 20,
        "emoji": "\ud83d\udc5f",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "18 children are boarding a bus with 2 seats per row. Will all seats be filled perfectly? (Yes=Even, No=Odd)",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "18 is an Even number. There are zero left over!",
        "totalItems": 18,
        "emoji": "\ud83e\uddd1",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 15 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 15 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "15 is an Odd number. One item is left alone!",
        "totalItems": 15,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "There are 15 shoes scattered around. Pair them up! Is the number even or odd?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "15 is an Odd number. One item is left alone!",
        "totalItems": 15,
        "emoji": "\ud83d\udc5f",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "20 children are boarding a bus with 2 seats per row. Will all seats be filled perfectly? (Yes=Even, No=Odd)",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "20 is an Even number. There are zero left over!",
        "totalItems": 20,
        "emoji": "\ud83e\uddd1",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "There are 22 shoes scattered around. Pair them up! Is the number even or odd?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "22 is an Even number. There are zero left over!",
        "totalItems": 22,
        "emoji": "\ud83d\udc5f",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "24 children are boarding a bus with 2 seats per row. Will all seats be filled perfectly? (Yes=Even, No=Odd)",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "24 is an Even number. There are zero left over!",
        "totalItems": 24,
        "emoji": "\ud83e\uddd1",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 12 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 12 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "12 is an Even number. There are zero left over!",
        "totalItems": 12,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "21 children are boarding a bus with 2 seats per row. Will all seats be filled perfectly? (Yes=Even, No=Odd)",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "21 is an Odd number. One item is left alone!",
        "totalItems": 21,
        "emoji": "\ud83e\uddd1",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "There are 3 shoes scattered around. Pair them up! Is the number even or odd?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "3 is an Odd number. One item is left alone!",
        "totalItems": 3,
        "emoji": "\ud83d\udc5f",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "There are 13 shoes scattered around. Pair them up! Is the number even or odd?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "13 is an Odd number. One item is left alone!",
        "totalItems": 13,
        "emoji": "\ud83d\udc5f",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "There are 10 shoes scattered around. Pair them up! Is the number even or odd?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "10 is an Even number. There are zero left over!",
        "totalItems": 10,
        "emoji": "\ud83d\udc5f",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "There are 21 shoes scattered around. Pair them up! Is the number even or odd?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "21 is an Odd number. One item is left alone!",
        "totalItems": 21,
        "emoji": "\ud83d\udc5f",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 10 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 10 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "10 is an Even number. There are zero left over!",
        "totalItems": 10,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 9 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 9 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "9 is an Odd number. One item is left alone!",
        "totalItems": 9,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "4 children are boarding a bus with 2 seats per row. Will all seats be filled perfectly? (Yes=Even, No=Odd)",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "4 is an Even number. There are zero left over!",
        "totalItems": 4,
        "emoji": "\ud83e\uddd1",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "We have 21 apple slices. If we put 2 together to make a whole apple, will 1 slice be left? Is 21 Odd or Even?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 0,
        "explanation": "21 is an Odd number. One item is left alone!",
        "totalItems": 21,
        "emoji": "\ud83c\udf4e",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "6 children are boarding a bus with 2 seats per row. Will all seats be filled perfectly? (Yes=Even, No=Odd)",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "6 is an Even number. There are zero left over!",
        "totalItems": 6,
        "emoji": "\ud83e\uddd1",
        "image": null
    },
    {
        "type": "visual-pairing",
        "question": "There are 14 shoes scattered around. Pair them up! Is the number even or odd?",
        "options": [
            "Odd",
            "Even"
        ],
        "correctAnswer": 1,
        "explanation": "14 is an Even number. There are zero left over!",
        "totalItems": 14,
        "emoji": "\ud83d\udc5f",
        "image": null
    }
]
    },
    {
        id: 'identify-odd-even',
        title: 'Identify Odd & Even',
        desc: 'Click the correct numbers in a grid game.',
        color: '#7c3aed',
        icon: '🔢',
        learnSections: [
            { heading: 'The Last Digit Rule', content: 'To know if a HUGE number is odd or even, just look at the last digit!', example: 'For 458, the last digit is 8. Since 8 is even, 458 is EVEN!' }
        ],
        practice: [
    {
        "type": "multi-select",
        "question": "The vault password is made of only ODD numbers. Click them!",
        "gridNumbers": [
            94,
            28,
            63,
            32,
            47,
            70
        ],
        "correctIndices": [
            2,
            4
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The vault password is made of only ODD numbers. Click them!",
        "gridNumbers": [
            15,
            34,
            16,
            82,
            52,
            74
        ],
        "correctIndices": [
            0
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            45,
            11,
            88,
            20,
            64,
            71
        ],
        "correctIndices": [
            2,
            3,
            4
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "Find and click all the ODD numbers to uncover the clue!",
        "gridNumbers": [
            16,
            62,
            26,
            31,
            21,
            51
        ],
        "correctIndices": [
            3,
            4,
            5
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The vault password is made of only ODD numbers. Click them!",
        "gridNumbers": [
            88,
            25,
            36,
            92,
            95,
            91
        ],
        "correctIndices": [
            1,
            4,
            5
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            30,
            61,
            92,
            82,
            60,
            11
        ],
        "correctIndices": [
            0,
            2,
            3,
            4
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            59,
            66,
            65,
            21,
            82,
            51
        ],
        "correctIndices": [
            1,
            4
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The vault password is made of only ODD numbers. Click them!",
        "gridNumbers": [
            38,
            42,
            19,
            56,
            45,
            26
        ],
        "correctIndices": [
            2,
            4
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            26,
            63,
            48,
            53,
            27,
            58
        ],
        "correctIndices": [
            0,
            2,
            5
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            91,
            21,
            53,
            35,
            34,
            42
        ],
        "correctIndices": [
            4,
            5
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "Find and click all the EVEN numbers to unlock the grid!",
        "gridNumbers": [
            85,
            31,
            79,
            27,
            84,
            91
        ],
        "correctIndices": [
            4
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            21,
            78,
            62,
            86,
            10,
            67
        ],
        "correctIndices": [
            1,
            2,
            3,
            4
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "Find and click all the EVEN numbers to unlock the grid!",
        "gridNumbers": [
            50,
            92,
            41,
            61,
            43,
            93
        ],
        "correctIndices": [
            0,
            1
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "Find and click all the EVEN numbers to unlock the grid!",
        "gridNumbers": [
            41,
            47,
            51,
            37,
            15,
            68
        ],
        "correctIndices": [
            5
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            26,
            96,
            37,
            67,
            42,
            73
        ],
        "correctIndices": [
            0,
            1,
            4
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The vault password is made of only ODD numbers. Click them!",
        "gridNumbers": [
            58,
            46,
            88,
            17,
            29,
            98
        ],
        "correctIndices": [
            3,
            4
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "Find and click all the EVEN numbers to unlock the grid!",
        "gridNumbers": [
            90,
            65,
            51,
            49,
            70,
            38
        ],
        "correctIndices": [
            0,
            4,
            5
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "Find and click all the ODD numbers to uncover the clue!",
        "gridNumbers": [
            24,
            33,
            47,
            15,
            64,
            35
        ],
        "correctIndices": [
            1,
            2,
            3,
            5
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "Find and click all the ODD numbers to uncover the clue!",
        "gridNumbers": [
            68,
            35,
            63,
            56,
            64,
            96
        ],
        "correctIndices": [
            1,
            2
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The vault password is made of only ODD numbers. Click them!",
        "gridNumbers": [
            45,
            34,
            96,
            10,
            55,
            91
        ],
        "correctIndices": [
            0,
            4,
            5
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    }
],
        assessment: [
    {
        "type": "multi-select",
        "question": "Find and click all the EVEN numbers to unlock the grid!",
        "gridNumbers": [
            32,
            60,
            22,
            62,
            47,
            36
        ],
        "correctIndices": [
            0,
            1,
            2,
            3,
            5
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "Find and click all the ODD numbers to uncover the clue!",
        "gridNumbers": [
            28,
            75,
            60,
            67,
            42,
            26
        ],
        "correctIndices": [
            1,
            3
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            88,
            91,
            39,
            73,
            68,
            22
        ],
        "correctIndices": [
            0,
            4,
            5
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            85,
            74,
            57,
            54,
            64,
            66
        ],
        "correctIndices": [
            1,
            3,
            4,
            5
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            77,
            13,
            11,
            97,
            87,
            56
        ],
        "correctIndices": [
            5
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "Find and click all the EVEN numbers to unlock the grid!",
        "gridNumbers": [
            55,
            16,
            96,
            18,
            78,
            88
        ],
        "correctIndices": [
            1,
            2,
            3,
            4,
            5
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The vault password is made of only ODD numbers. Click them!",
        "gridNumbers": [
            67,
            75,
            91,
            13,
            94,
            18
        ],
        "correctIndices": [
            0,
            1,
            2,
            3
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            26,
            63,
            67,
            61,
            50,
            96
        ],
        "correctIndices": [
            0,
            4,
            5
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            95,
            49,
            76,
            33,
            23,
            19
        ],
        "correctIndices": [
            2
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            51,
            63,
            16,
            89,
            70,
            55
        ],
        "correctIndices": [
            2,
            4
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            85,
            40,
            76,
            89,
            55,
            14
        ],
        "correctIndices": [
            1,
            2,
            5
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "Find and click all the ODD numbers to uncover the clue!",
        "gridNumbers": [
            92,
            16,
            39,
            28,
            98,
            51
        ],
        "correctIndices": [
            2,
            5
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The chest only opens for EVEN numbers. Click them all!",
        "gridNumbers": [
            78,
            14,
            38,
            46,
            60,
            70
        ],
        "correctIndices": [
            0,
            1,
            2,
            3,
            4,
            5
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "Find and click all the EVEN numbers to unlock the grid!",
        "gridNumbers": [
            16,
            76,
            72,
            53,
            80,
            97
        ],
        "correctIndices": [
            0,
            1,
            2,
            4
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "Find and click all the EVEN numbers to unlock the grid!",
        "gridNumbers": [
            17,
            50,
            47,
            49,
            34,
            38
        ],
        "correctIndices": [
            1,
            4,
            5
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "Find and click all the EVEN numbers to unlock the grid!",
        "gridNumbers": [
            37,
            40,
            53,
            92,
            55,
            79
        ],
        "correctIndices": [
            1,
            3
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The vault password is made of only ODD numbers. Click them!",
        "gridNumbers": [
            90,
            63,
            71,
            83,
            38,
            45
        ],
        "correctIndices": [
            1,
            2,
            3,
            5
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The vault password is made of only ODD numbers. Click them!",
        "gridNumbers": [
            64,
            44,
            95,
            22,
            73,
            24
        ],
        "correctIndices": [
            2,
            4
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "Find and click all the EVEN numbers to unlock the grid!",
        "gridNumbers": [
            17,
            57,
            80,
            98,
            63,
            40
        ],
        "correctIndices": [
            2,
            3,
            5
        ],
        "targetType": "even",
        "explanation": "You needed to choose the even numbers. Even numbers end in 0, 2, 4, 6, 8.",
        "image": null
    },
    {
        "type": "multi-select",
        "question": "The vault password is made of only ODD numbers. Click them!",
        "gridNumbers": [
            92,
            45,
            19,
            77,
            98,
            21
        ],
        "correctIndices": [
            1,
            2,
            3,
            5
        ],
        "targetType": "odd",
        "explanation": "You needed to choose the odd numbers. Odd numbers end in 1, 3, 5, 7, 9.",
        "image": null
    }
]
    }
];
