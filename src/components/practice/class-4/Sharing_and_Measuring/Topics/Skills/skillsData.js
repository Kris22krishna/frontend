// Sharing and Measuring Skills Data Generator

// Helper to shuffle arrays
const shuffle = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

// Helper for random integer (inclusive)
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// --- DYNAMIC QUESTION GENERATORS ---

// Skill 1: Identifying Halves & Quarters
function generateVisualFractionQuestion(usedValues) {
    const fractions = [
        {
            val: '1/2',
            name: 'Half',
            imagePrompts: [
                {
                    image: '🌗',
                    question: 'Half of the moon is bright in the picture. Which fraction is shown?',
                    explanation: 'Half means 1 out of 2 equal parts, so the picture shows 1/2.'
                },
                {
                    image: '🌓',
                    question: 'Half of the moon is bright in the picture. Which fraction is shown?',
                    explanation: 'Half means 1 out of 2 equal parts, so the picture shows 1/2.'
                }
            ],
            wrongVals: ['1/4', '3/4', '1/3', '1/1']
        },
        {
            val: '1/4',
            name: 'Quarter',
            imagePrompts: [
                {
                    image: '🌘',
                    question: 'Only one quarter of the moon is bright in the picture. Which fraction is shown?',
                    explanation: 'One quarter means 1 out of 4 equal parts, so the picture shows 1/4.'
                },
                {
                    image: '🌒',
                    question: 'Only one quarter of the moon is bright in the picture. Which fraction is shown?',
                    explanation: 'One quarter means 1 out of 4 equal parts, so the picture shows 1/4.'
                }
            ],
            wrongVals: ['1/2', '3/4', '1/3', '1/8']
        },
        {
            val: '3/4',
            name: 'Three-Quarters',
            imagePrompts: [
                {
                    image: '🌖',
                    question: 'Three quarters of the moon are bright in the picture. Which fraction is shown?',
                    explanation: 'Three quarters means 3 out of 4 equal parts, so the picture shows 3/4.'
                },
                {
                    image: '🌔',
                    question: 'Three quarters of the moon are bright in the picture. Which fraction is shown?',
                    explanation: 'Three quarters means 3 out of 4 equal parts, so the picture shows 3/4.'
                }
            ],
            wrongVals: ['1/4', '1/2', '4/4', '1/3']
        },
        {
            val: '1/3',
            name: 'One-Third',
            imagePrompts: [],
            wrongVals: ['1/2', '1/4', '2/3', '3/4']
        }
    ];

    const objects = ['pizza', 'cake', 'chocolate bar', 'sandwich', 'apple', 'watermelon', 'paper', 'ribbon'];
    const objectImages = {
        pizza: '🍕',
        cake: '🍰',
        'chocolate bar': '🍫',
        sandwich: '🥪',
        apple: '🍎',
        watermelon: '🍉',
        paper: '📄',
        ribbon: '🎀'
    };
    
    let isInteractive, fracObj, objectName, shapeType, key, question, options, answer, image, type, explanation, totalParts, requiredParts;

    // Loop until we generate a completely unique question
    do {
        isInteractive = Math.random() > 0.4; // 60% chance
        fracObj = fractions[getRandomInt(0, fractions.length - 1)];
        objectName = objects[getRandomInt(0, objects.length - 1)];
        
        if (isInteractive) {
            totalParts = [2, 4][getRandomInt(0, 1)];
            requiredParts = getRandomInt(1, totalParts - 1);
            shapeType = Math.random() > 0.5 ? 'circle' : 'rect';
            key = `int-${totalParts}-${requiredParts}-${shapeType}`;
            
            type = 'color-fraction';
            const fracStr = `${requiredParts}/${totalParts}`;
            const fracName = totalParts === 2 ? 'Half' : requiredParts === 1 ? 'Quarter' : 'Three-Quarters';
            question = `Color ${fracName} (${fracStr}) of this shape by clicking on the parts.`;
            image = '🖍️';
            answer = requiredParts;
            explanation = `When you color ${requiredParts} out of ${totalParts} equal parts, you've shown ${fracStr}.`;
        } else {
            const isImageQ = Math.random() > 0.5;
            type = 'multiple-choice';
            
            if (isImageQ && fracObj.imagePrompts.length > 0) {
                const visualPrompt = fracObj.imagePrompts[getRandomInt(0, fracObj.imagePrompts.length - 1)];
                key = `mcq-img-${fracObj.val}-${visualPrompt.image}`;
                question = visualPrompt.question;
                image = visualPrompt.image;
                answer = fracObj.val;
                options = shuffle([answer, ...shuffle(fracObj.wrongVals).slice(0, 3)]);
                explanation = visualPrompt.explanation;
            } else {
                key = `mcq-txt-${fracObj.name}-${objectName}`;
                const partsStr = fracObj.name.includes('Quarter') ? '4' : fracObj.name.includes('Third') ? '3' : '2';
                question = `If you cut a ${objectName} into exactly ${partsStr} equal pieces, what do we call one piece?`;
                image = objectImages[objectName] || '🍽️';
                answer = fracObj.name;
                const otherNames = fractions.filter(f => f.name !== fracObj.name).map(f => f.name);
                options = shuffle([answer, ...shuffle(otherNames).slice(0, 3)]);
                explanation = `1 piece out of ${partsStr} makes a ${fracObj.name}.`;
            }
        }
    } while (usedValues.has(key) && usedValues.size < 50); // High safety limit

    usedValues.add(key);

    return {
        type, question, image, options,
        correctAnswer: type === 'multiple-choice' ? options.indexOf(answer) : answer,
        explanation,
        ...(type === 'color-fraction' && { totalParts, requiredParts, shapeType })
    };
}

// Skill 2: Sharing Collections
function generateCollectionQuestion(usedCollections) {
    const things = [
        { name: 'cookies', emoji: '🍪' },
        { name: 'barfis', emoji: '🟨' },
        { name: 'apples', emoji: '🍎' },
        { name: 'marbles', emoji: '🔮' },
        { name: 'candies', emoji: '🍬' },
        { name: 'strawberries', emoji: '🍓' },
        { name: 'coins', emoji: '🪙' },
        { name: 'donuts', emoji: '🍩' }
    ];
    
    let parts, total, item, isInteractive, key, type, question, options, answer, image, answerVal, explanation;
    
    do {
        parts = [2, 3, 4][getRandomInt(0, 2)];
        const multiplier = getRandomInt(2, 6); // 2*2=4 to 4*6=24 total items
        total = parts * multiplier;
        item = things[getRandomInt(0, things.length - 1)];
        isInteractive = Math.random() > 0.4 && total <= 16;
        
        key = `${isInteractive ? 'int' : 'mcq'}-${total}-${parts}-${item.name}`;
    } while (usedCollections.has(key) && usedCollections.size < 60);
    
    usedCollections.add(key);
    
    const fractionNames = { 2: 'half', 3: 'one-third', 4: 'one-quarter' };
    const fractionName = fractionNames[parts];
    answerVal = total / parts;

    if (isInteractive) {
        type = 'split-collection';
        question = `Click the items to share ${total} ${item.name} equally into ${parts} boxes. What is ${fractionName} (1/${parts}) of ${total}?`;
        image = '📦';
        answer = Array(parts).fill(answerVal);
        explanation = `When we divide ${total} ${item.name} evenly into ${parts} boxes, each box gets exactly ${answerVal} ${item.name}.`;
    } else {
        type = 'multiple-choice';
        question = `If there are ${total} ${item.name} in a box, and you need to find ${fractionName} of them, how many ${item.name} is that?`;
        image = item.emoji.repeat(Math.min(total, 6)) + (total > 6 ? '...' : '');
        
        const ansStr = String(answerVal);
        const wr1 = String(answerVal + getRandomInt(1, 3));
        const wr2 = String(Math.max(1, answerVal - getRandomInt(1, 3)));
        let wr3 = String(total - answerVal);
        if (wr3 === ansStr || wr3 === wr1 || wr3 === wr2) wr3 = String(answerVal + 4);
        
        options = shuffle([ansStr, ...shuffle(Array.from(new Set([wr1, wr2, wr3]))).slice(0, 3)]);
        answer = options.indexOf(ansStr);
        explanation = `To find ${fractionName} (${1}/${parts}) of ${total}, we divide ${total} into ${parts} equal groups. ${total} ÷ ${parts} = ${answerVal}.`;
    }

    return {
        type, question, image, options,
        correctAnswer: answer,
        explanation,
        ...(type === 'split-collection' && { totalItems: total, groups: parts, emoji: item.emoji })
    };
}

// Skill 3: Comparing Parts
function generateComparingQuestion(usedCompares) {
    const pairs = [
        { a: { val: '1/2', size: 0.5 }, b: { val: '1/4', size: 0.25 } },
        { a: { val: '1/4', size: 0.25 }, b: { val: '1/8', size: 0.125 } },
        { a: { val: '1/3', size: 0.33 }, b: { val: '1/5', size: 0.2 } },
        { a: { val: '3/4', size: 0.75 }, b: { val: '1/2', size: 0.5 } },
        { a: { val: '1/2', size: 0.5 }, b: { val: '2/4', size: 0.5, text: 'They are exactly the same size! (Equivalent)' } },
        { a: { val: '2/3', size: 0.66 }, b: { val: '1/3', size: 0.33 } },
        { a: { val: '2/4', size: 0.5 }, b: { val: '1/4', size: 0.25 } }
    ];
    
    const scenarios = [
        { obj: 'pizza', action: 'share', AskOpts: ['bigger', 'smaller'] },
        { obj: 'chocolate bar', action: 'divide', AskOpts: ['larger', 'tinier'] },
        { obj: 'birthday cake', action: 'cut', AskOpts: ['more', 'less'] }
    ];

    let pair, askFor, askWord, scenario, key;
    do {
        pair = pairs[getRandomInt(0, pairs.length - 1)];
        scenario = scenarios[getRandomInt(0, scenarios.length - 1)];
        askFor = Math.random() > 0.5 ? 'more' : 'less';
        askWord = askFor === 'more' ? scenario.AskOpts[0] : scenario.AskOpts[1];
        key = `${pair.a.val}-${pair.b.val}-${scenario.obj}-${askFor}`;
    } while (usedCompares.has(key) && usedCompares.size < 50);
    
    usedCompares.add(key);
    
    const isEquivalent = pair.a.size === pair.b.size;
    const isInteractive = Math.random() > 0.4; // 60% chance for interactive
    
    let type, question, answer, otherOpts, image, fracA, fracB, explanation, options;

    if (isInteractive) {
        fracA = pair.a.val;
        fracB = pair.b.val;
        let correctSign;
        if (isEquivalent) correctSign = '=';
        else correctSign = pair.a.size > pair.b.size ? '>' : '<';
        
        type = 'compare-signs';
        question = `Compare the fractions. Click the correct sign (<, =, >) to make the statement true.`;
        image = '⚖️';
        answer = correctSign;
        let explanationText = isEquivalent ? `They are exactly the same size so they are equal!` : 
             (correctSign === '>' ? `${pair.a.val} is greater than ${pair.b.val}.` : `${pair.a.val} is less than ${pair.b.val}.`);
        explanation = `When checking ${pair.a.val} and ${pair.b.val}: ${explanationText}`;
        options = [];
    } else {
        type = 'multiple-choice';
        image = '⚖️';
        if (isEquivalent) {
            question = `Which piece of ${scenario.obj} is ${askWord}: ${pair.a.val} or ${pair.b.val}?`;
            answer = 'They are exactly the same size!';
            otherOpts = [`${pair.a.val} is much ${scenario.AskOpts[0]}`, `${pair.b.val} is slightly ${scenario.AskOpts[0]}`, `Neither, we cannot compare them`];
        } else {
            question = `If you ${scenario.action} a ${scenario.obj}, which slice gives you a ${askWord} piece? ${pair.a.val} or ${pair.b.val}?`;
            
            let correctObj = askFor === 'more' ? 
                (pair.a.size > pair.b.size ? pair.a : pair.b) : 
                (pair.a.size < pair.b.size ? pair.a : pair.b);
                
            answer = `${correctObj.val} slice`;
            const wrongVal = correctObj.val === pair.a.val ? pair.b.val : pair.a.val;
            otherOpts = [`${wrongVal} slice`, `They are the same size`, `We cannot compare them without seeing the ${scenario.obj}`];
        }
        
        // De-duplicate otherOpts
        otherOpts = Array.from(new Set(otherOpts));
        options = shuffle([answer, ...otherOpts]).slice(0, 4);
        
        explanation = isEquivalent ? 
            `${pair.a.val} and ${pair.b.val} represent the exact same amount. They are equivalent fractions.` :
            `When comparing fractions, look at the sizes. If numerators are the same, more parts (bigger denominator) means SMALLER slices.`;
    }
    
    return {
        type, question, image, options,
        correctAnswer: type === 'multiple-choice' ? options.indexOf(answer) : answer,
        explanation,
        ...(type === 'compare-signs' && { fracA, fracB })
    };
}


const generateQuestionsForSkill = (skillGenerator, count = 20) => {
    const questions = [];
    const usedSet = new Set();
    for (let i = 0; i < count; i++) {
        questions.push(skillGenerator(usedSet));
    }
    return questions;
};

export const generateSharingSkillsData = () => {
    return [
        {
            id: 'skill-1',
            title: 'Identifying Halves & Quarters',
            emoji: '🌗',
            learnSections: [
                {
                    heading: 'Making Halves (1/2)',
                    visual: '🍕 ✂️ 🌗 + 🌗',
                    content: '1 Whole cut into 2 EXACTLY equal pieces = 2 Halves',
                    example: '1/2 + 1/2 = 1 Whole'
                },
                {
                    heading: 'Making Quarters (1/4)',
                    visual: '🟧 ✂️ 🟨 🟨 🟨 🟨',
                    content: '1 Whole divided into 4 EXACTLY equal pieces = 4 Quarters',
                    example: '1/4 + 1/4 + 1/4 + 1/4 = 1 Whole'
                }
            ],
            practice: generateQuestionsForSkill(generateVisualFractionQuestion, 20),
            assessment: generateQuestionsForSkill(generateVisualFractionQuestion, 20)
        },
        {
            id: 'skill-2',
            title: 'Sharing Collections',
            emoji: '🍪',
            learnSections: [
                {
                    heading: 'Sharing 10 Cookies in Half',
                    visual: '🍪x10 ➡️ 👦(5) + 👧(5)',
                    content: 'Divide the group of 10 into 2 equal parts.',
                    example: 'Half (1/2) of 10 = 5 Cookies'
                },
                {
                    heading: 'Sharing 12 Pencils in Quarters',
                    visual: '✏️x12 ➡️ 📦(3) 📦(3) 📦(3) 📦(3)',
                    content: 'Divide the group of 12 into 4 equal boxes.',
                    example: 'Quarter (1/4) of 12 = 3 Pencils'
                }
            ],
            practice: generateQuestionsForSkill(generateCollectionQuestion, 20),
            assessment: generateQuestionsForSkill(generateCollectionQuestion, 20)
        },
        {
            id: 'skill-3',
            title: 'Comparing Parts',
            emoji: '⚖️',
            learnSections: [
                {
                    heading: 'Which slice is bigger?',
                    visual: '🌗 (1/2)  🆚  🌘 (1/4)',
                    content: 'More pieces means SMALLER slices! Sharing with 2 people gives a bigger slice than sharing with 4 people.',
                    example: '1/2 is BIGGER than 1/4 ⭐'
                },
                {
                    heading: 'Equivalent (Same Amount)',
                    visual: '🌗 (1/2)  🟰  🌘🌘 (2/4)',
                    content: 'Sometimes fractions look different but are the EXACT same size!',
                    example: 'One Half is equal to Two Quarters'
                }
            ],
            practice: generateQuestionsForSkill(generateComparingQuestion, 20),
            assessment: generateQuestionsForSkill(generateComparingQuestion, 20)
        }
    ];
};
