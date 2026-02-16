
export const CORRECT_MESSAGES = [
    "✨ Amazing job! You got it! ✨",
    "🌟 Brilliant! Keep it up! 🌟",
    "🎉 Correct! You're a math-star! 🎉",
    "✨ Fantastic work! ✨",
    "🚀 Super! You're on fire! 🚀",
    "🌈 Perfect! Well done! 🌈",
    "🎊 Great job! Moving on... 🎊",
    "💎 Spot on! Excellent! 💎"
];

export const RAKSHA_ITEMS = [
    { plural: "Rakhis", singular: "Rakhi", unit: "threads" },
    { plural: "Boxes", singular: "Box", unit: "sweets" },
    { plural: "Gift packs", singular: "Gift pack", unit: "chocolates" },
    { plural: "Sisters", singular: "Sister", unit: "envelopes" },
    { plural: "Plates", singular: "Plate", unit: "laddoos" },
    { plural: "Rakhi cards", singular: "Rakhi card", unit: "stickers" },
    { plural: "Thalis", singular: "Thali", unit: "diyas" },
    { plural: "Bundles", singular: "Bundle", unit: "rakhi threads" },
    { plural: "Gift bags", singular: "Gift bag", unit: "ribbons" },
    { plural: "Trays", singular: "Tray", unit: "cups of water" }
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getFillInTheBlanksQuestions = () => [
    {
        topic: "multiplication",
        text: `<div class='question-container'>
                  <p>Multiplication means adding the same number again and again. What is Multiplication also called?</p>
                </div>`,
        correctAnswer: "Repeated addition",
        solution: "Multiplication is adding the same number repeatedly. For example, $2 \\times 3$ means adding 2, three times ($2+2+2$). This is why it is called <strong>repeated addition</strong>.",
        options: ["Repeated addition", "Repeated subtraction", "Repeated division", "Fast counting"]
    },
    {
        topic: "division",
        text: `<div class='question-container'>
                  <p>Division means subtracting the same number again and again.</p>
                  <p>Division is also called _______________ .</p>
                </div>`,
        correctAnswer: "Repeated subtraction",
        solution: "Division is subtracting the same number repeatedly. For example, $6 \\div 2$ means subtracting 2 from 6 until you reach 0. This is why it is called <strong>repeated subtraction</strong>.",
        options: ["Repeated addition", "Repeated subtraction", "Repeated multiplication", "Group counting"]
    }
];

export const generateMultiplicationQuestionData = (index, items, templateIndices) => {
    let groups, perGroup;

    switch (index) {
        case 0: groups = randomInt(2, 3); perGroup = 2; break;
        case 1: groups = randomInt(4, 5); perGroup = 2; break;
        case 2: groups = randomInt(2, 4); perGroup = 5; break;
        case 3: groups = randomInt(6, 8); perGroup = 2; break;
        case 4: groups = randomInt(3, 4); perGroup = randomInt(3, 4); break;
        case 5: groups = randomInt(2, 3); perGroup = randomInt(6, 7); break;
        case 6: groups = 5; perGroup = randomInt(3, 5); break;
        case 7: groups = randomInt(4, 6); perGroup = randomInt(4, 5); break;
        case 8: groups = randomInt(7, 10); perGroup = 3; break;
        case 9: groups = randomInt(8, 10); perGroup = 5; break;
        default: groups = randomInt(2, 10); perGroup = randomInt(2, 5);
    }

    const item = items[index % items.length];
    const total = groups * perGroup;
    const repeatedAddition = Array(groups).fill(perGroup).join(' + ');
    const templateIdx = templateIndices[index % templateIndices.length];

    const templates = [
        `<div class='question-container'>
            <p>We found ${groups} ${item.plural} for the celebration.</p>
            <p>Each ${item.singular} has ${perGroup} ${item.unit}.</p>
            <p>How many ${item.unit} do we have in total?</p>
         </div>`,
        `<div class='question-container'>
            <p>During Raksha Bandhan, we used ${groups} ${item.plural}.</p>
            <p>If every ${item.singular} contains ${perGroup} ${item.unit}, what is the total number of ${item.unit}?</p>
         </div>`,
        `<div class='question-container'>
            <p>There are ${groups} ${item.plural} placed on a tray.</p>
            <p>Since each ${item.singular} holds ${perGroup} ${item.unit}, calculate the total count of ${item.unit}.</p>
         </div>`
    ];

    const qData = {
        text: templates[templateIdx],
        correctAnswer: total.toString(),
        solution: `We can find the total by adding ${perGroup} repeatedly ${groups} times:<br/>
                   <strong>${repeatedAddition} = ${total}</strong>.<br/><br/>
                   In multiplication, this is <strong>${groups} × ${perGroup} = ${total}</strong>.`,
        options: [
            total.toString(),
            (total + perGroup).toString(),
            (total - 1 > 0 ? total - 1 : total + 1).toString(),
            (groups + perGroup).toString()
        ]
    };

    // Ensure options are unique
    qData.options = [...new Set(qData.options)];
    while (qData.options.length < 4) {
        let rand = (total + randomInt(1, 10)).toString();
        if (!qData.options.includes(rand)) qData.options.push(rand);
    }

    return qData;
};

export const generateDivisionQuestionData = (index) => {
    const storyTypes = ["spiders", "kaju", "idlis"];
    const storyType = storyTypes[Math.floor(Math.random() * storyTypes.length)];

    const groupSize = randomInt(3, 6);
    const groups = randomInt(4, 8);
    const total = groupSize * groups;
    const correctAnswer = groups;

    let questionText = "";
    let explanation = "";

    if (storyType === "spiders") {
        questionText = `
            <div class='question-container'>
                <p>There are ${total} spider legs in the garden.</p>
                <p>Each spider has ${groupSize} legs.</p>
                <p><strong>How many spiders are there?</strong></p>
            </div>
        `;
        explanation = `Total legs = ${total}.<br/>Legs per spider = ${groupSize}.<br/>Number of spiders = ${total} ÷ ${groupSize} = <strong>${correctAnswer}</strong>.`;
    } else if (storyType === "kaju") {
        questionText = `
            <div class='question-container'>
                <p>There are ${total} kaju katlis in a tray.</p>
                <p>${groupSize} sweets are packed in one box.</p>
                <p><strong>How many boxes can be made?</strong></p>
            </div>
        `;
        explanation = `Total kaju katlis = ${total}.<br/>Sweets per box = ${groupSize}.<br/>Number of boxes = ${total} ÷ ${groupSize} = <strong>${correctAnswer}</strong>.`;
    } else {
        questionText = `
            <div class='question-container'>
                <p>There are ${total} idlis.</p>
                <p>${groupSize} idlis are served on one plate.</p>
                <p><strong>How many plates are needed?</strong></p>
            </div>
        `;
        explanation = `Total idlis = ${total}.<br/>Idlis per plate = ${groupSize}.<br/>Number of plates = ${total} ÷ ${groupSize} = <strong>${correctAnswer}</strong>.`;
    }

    const options = [
        correctAnswer.toString(),
        (correctAnswer + 1).toString(),
        (correctAnswer - 1).toString(),
        (correctAnswer + 3).toString()
    ];

    const uniqueOptions = [...new Set(options)];
    while (uniqueOptions.length < 4) {
        let rand = (correctAnswer + randomInt(4, 10)).toString();
        if (!uniqueOptions.includes(rand)) uniqueOptions.push(rand);
    }

    return {
        text: questionText,
        correctAnswer: correctAnswer.toString(),
        solution: explanation,
        options: uniqueOptions
    };
};
