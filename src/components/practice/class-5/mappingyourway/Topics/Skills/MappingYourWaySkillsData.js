// ─── QUESTIONS & DATA FOR MAPPING YOUR WAY ──────────────────────────────────

const getNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ─── GENERATORS ─────────────────────────────────────────────────────────────

const generateMapDirectionQuestions = () => {
    const questions = [];
    const directions = ['North', 'East', 'South', 'West'];

    for (let i = 0; i < 10; i++) {
        const type = i % 5;
        let q, options, explanation;

        if (type === 0) {
            const startIdx = getNum(0, 3);
            const isRightTurn = Math.random() > 0.5;
            const startDir = directions[startIdx];
            const endDir = directions[(startIdx + (isRightTurn ? 1 : 3)) % 4];

            q = `You are facing **${startDir}**. If you turn $90^{\\circ}$ to your **${isRightTurn ? 'right' : 'left'}**, which direction will you face?`;
            options = [endDir];
            directions.filter(d => d !== endDir).forEach(d => options.push(d));
            explanation = `Turning $90^{\\circ}$ to the ${isRightTurn ? 'right (clockwise)' : 'left (counter-clockwise)'} from ${startDir} brings you to ${endDir}.`;
        } else if (type === 1) {
            const startIdx = getNum(0, 3);
            const startDir = directions[startIdx];
            const oppDir = directions[(startIdx + 2) % 4];

            q = `If the entrance of a building faces **${startDir}**, which direction does the back wall face?`;
            options = [oppDir];
            directions.filter(d => d !== oppDir).forEach(d => options.push(d));
            explanation = `The opposite direction of ${startDir} is ${oppDir}. Front and back always face opposite directions.`;
        } else if (type === 2) {
            const startIdx = getNum(0, 3);
            const startDir = directions[startIdx];
            const endDir = directions[(startIdx + 2) % 4];

            q = `You are facing **${startDir}**. You turn right, and then turn right again. Which direction are you facing now?`;
            options = [endDir];
            directions.filter(d => d !== endDir).forEach(d => options.push(d));
            explanation = `Two right turns ($90^{\\circ} + 90^{\\circ} = 180^{\\circ}$) make you face the opposite direction: ${endDir}.`;
        } else if (type === 3) {
            const startIdx = getNum(0, 3);
            const startDir = directions[startIdx];
            const endDir = directions[(startIdx + 3) % 4];

            q = `You are facing **${startDir}**. You turn $270^{\\circ}$ clockwise. Which direction are you facing?`;
            options = [endDir];
            directions.filter(d => d !== endDir).forEach(d => options.push(d));
            explanation = `A $270^{\\circ}$ clockwise turn is the same as a $90^{\\circ}$ counter-clockwise turn. From ${startDir}, that's ${endDir}.`;
        } else {
            const places = ['school', 'hospital', 'park', 'library', 'market'];
            const p1 = places[getNum(0, 4)];
            let p2;
            do { p2 = places[getNum(0, 4)]; } while (p2 === p1);
            const dir = directions[getNum(0, 3)];
            const oppDir = directions[(directions.indexOf(dir) + 2) % 4];

            q = `The ${p1} is to the **${dir}** of the ${p2}. In which direction is the ${p2} from the ${p1}?`;
            options = [oppDir];
            directions.filter(d => d !== oppDir).forEach(d => options.push(d));
            explanation = `If ${p1} is ${dir} of ${p2}, then ${p2} is ${oppDir} of ${p1}. Directions are always reversed for the other point.`;
        }

        let shuffled = [...new Set(options)].sort(() => Math.random() - 0.5);
        while (shuffled.length < 4) {
            const extra = directions[getNum(0, 3)];
            if (!shuffled.includes(extra)) shuffled.push(extra);
        }

        questions.push({
            question: q,
            options: shuffled.slice(0, 4),
            correct: shuffled.slice(0, 4).indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateReadingSimpleMapsQuestions = () => {
    const questions = [];
    const places = ['School', 'Hospital', 'Park', 'Library', 'Market', 'Temple', 'Bus Stop', 'Post Office'];

    for (let i = 0; i < 10; i++) {
        const type = i % 4;
        let q, options, explanation;

        if (type === 0) {
            const d1 = getNum(2, 8);
            const d2 = getNum(2, 8);
            const p1 = places[getNum(0, 7)];
            let p2, p3;
            do { p2 = places[getNum(0, 7)]; } while (p2 === p1);
            do { p3 = places[getNum(0, 7)]; } while (p3 === p1 || p3 === p2);

            q = `On a map, ${p1} is $${d1}$ cm from ${p2}, and ${p2} is $${d2}$ cm from ${p3} in the same direction. How far is ${p1} from ${p3} on the map?`;
            const ans = d1 + d2;
            options = [`$${ans}$ cm`, `$${ans + 2}$ cm`, `$${Math.abs(d1 - d2)}$ cm`, `$${ans + 1}$ cm`];
            explanation = `Since they are in the same straight line direction, add the distances: $${d1} + ${d2} = ${ans}$ cm.`;
        } else if (type === 1) {
            const total = getNum(8, 20);
            const d1 = getNum(2, total - 2);
            const d2 = total - d1;
            const p1 = places[getNum(0, 7)];
            let p2, p3;
            do { p2 = places[getNum(0, 7)]; } while (p2 === p1);
            do { p3 = places[getNum(0, 7)]; } while (p3 === p1 || p3 === p2);

            q = `${p1} to ${p3} is $${total}$ cm on a map. ${p2} is between them at $${d1}$ cm from ${p1}. How far is ${p2} from ${p3}?`;
            options = [`$${d2}$ cm`, `$${d2 + 1}$ cm`, `$${d1}$ cm`, `$${total}$ cm`];
            explanation = `Subtract: $${total} - ${d1} = ${d2}$ cm.`;
        } else if (type === 2) {
            const numSteps = getNum(3, 6);
            const stepSize = getNum(1, 3);
            const total = numSteps * stepSize;

            q = `Ravi walks $${numSteps}$ equal blocks on a map grid. Each block is $${stepSize}$ cm long. What total distance did he cover on the map?`;
            options = [`$${total}$ cm`, `$${total + stepSize}$ cm`, `$${numSteps + stepSize}$ cm`, `$${total - 1}$ cm`];
            explanation = `Total distance = Number of blocks × Size of each block = $${numSteps} \\times ${stepSize} = ${total}$ cm.`;
        } else {
            const p1 = places[getNum(0, 7)];
            let p2;
            do { p2 = places[getNum(0, 7)]; } while (p2 === p1);
            const d1 = getNum(3, 8);
            const d2 = getNum(3, 8);
            const closer = d1 < d2 ? p1 : p2;

            q = `On a map, ${p1} is $${d1}$ cm from the City Centre and ${p2} is $${d2}$ cm from the City Centre. Which place is closer to the City Centre?`;
            options = [closer, closer === p1 ? p2 : p1, 'Both are equally far', 'Cannot be determined'];
            explanation = `$${Math.min(d1, d2)}$ cm < $${Math.max(d1, d2)}$ cm, so ${closer} is closer to the City Centre.`;
        }

        let shuffled = [...new Set(options)].sort(() => Math.random() - 0.5);
        while (shuffled.length < 4) shuffled.push('None of these');

        questions.push({
            question: q,
            options: shuffled.slice(0, 4),
            correct: shuffled.slice(0, 4).indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateGridReferenceQuestions = () => {
    const questions = [];
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const landmarks = ['hospital', 'school', 'park', 'library', 'market', 'museum', 'station'];

    for (let i = 0; i < 10; i++) {
        const type = i % 4;
        let q, options, explanation;

        if (type === 0) {
            const letter = letters[getNum(0, 4)];
            const num1 = getNum(1, 4);
            const num2 = num1 + getNum(1, 2);

            q = `A road goes from grid square **${letter}${num1}** to **${letter}${num2}**. Did the road go horizontally or vertically?`;
            options = ['Vertically', 'Horizontally', 'Diagonally', 'It did not move'];
            explanation = `The letter stays the same (${letter}), but the number changes from ${num1} to ${num2}. Same column, different rows means vertical movement.`;
        } else if (type === 1) {
            const lIdx = getNum(0, 3);
            const l1 = letters[lIdx];
            const l2 = letters[lIdx + 1];
            const n = getNum(1, 5);

            q = `A boat moves from grid **${l1}${n}** to **${l2}${n}**. Did the boat move horizontally or vertically?`;
            options = ['Horizontally', 'Vertically', 'Diagonally', 'In a circle'];
            explanation = `The number stays the same (${n}), but the letter changes from ${l1} to ${l2}. Different columns, same row means horizontal movement.`;
        } else if (type === 2) {
            const landmark = landmarks[getNum(0, 6)];
            const letter = letters[getNum(0, 4)];
            const num = getNum(1, 5);

            q = `On a grid map, the ${landmark} is located at **${letter}${num}**. What is the column of the ${landmark}?`;
            options = [letter, `${num}`, letters[(letters.indexOf(letter) + 1) % 5], `${num + 1}`];
            explanation = `In grid reference ${letter}${num}, the letter ${letter} represents the column and ${num} represents the row.`;
        } else {
            const l1 = letters[getNum(0, 2)];
            const n1 = getNum(1, 3);
            const l2 = letters[letters.indexOf(l1) + getNum(1, 2)];
            const n2 = n1 + getNum(1, 2);

            q = `Meena walks from grid **${l1}${n1}** to **${l2}${n2}**. Does she move only horizontally, only vertically, or both?`;
            options = ['Both horizontally and vertically', 'Only horizontally', 'Only vertically', 'She does not move'];
            explanation = `Both the letter (${l1}→${l2}) and the number (${n1}→${n2}) changed, so she moved in both directions.`;
        }

        questions.push({
            question: q,
            options,
            correct: 0,
            explanation
        });
    }
    return questions;
};

const generateScaleUnderstandingQuestions = () => {
    const questions = [];

    for (let i = 0; i < 10; i++) {
        const realUnit = getNum(5, 20);
        const type = i % 4;
        let q, options, explanation;

        if (type === 0) {
            const mapDist = getNum(2, 8);
            const realDist = mapDist * realUnit;

            q = `A map has a scale of **$1$ cm = $${realUnit}$ km**. If two cities are **$${mapDist}$ cm** apart on the map, what is the actual distance?`;
            options = [`$${realDist}$ km`, `$${realDist + realUnit}$ km`, `$${realDist - realUnit}$ km`, `$${mapDist + realUnit}$ km`];
            explanation = `Multiply: $${mapDist} \\times ${realUnit} = ${realDist}$ km.`;
        } else if (type === 1) {
            const mapDist = getNum(3, 9);
            const realDist = mapDist * realUnit;

            q = `A map has a scale of **$1$ cm = $${realUnit}$ km**. The real distance between a park and a school is **$${realDist}$ km**. How far apart are they on the map?`;
            options = [`$${mapDist}$ cm`, `$${mapDist + 1}$ cm`, `$${mapDist - 1}$ cm`, `$${mapDist * 2}$ cm`];
            explanation = `Divide: $${realDist} \\div ${realUnit} = ${mapDist}$ cm.`;
        } else if (type === 2) {
            const d1 = getNum(2, 6);
            const d2 = getNum(2, 6);
            const r1 = d1 * realUnit;
            const r2 = d2 * realUnit;
            const farther = r1 > r2 ? 'City A' : 'City B';

            q = `Scale: $1$ cm = $${realUnit}$ km. City A is $${d1}$ cm from Capital. City B is $${d2}$ cm from Capital. Which city is farther from the Capital in real life?`;
            options = [farther, farther === 'City A' ? 'City B' : 'City A', 'Both are equally far', 'Cannot determine'];
            explanation = `City A = $${d1} \\times ${realUnit} = ${r1}$ km. City B = $${d2} \\times ${realUnit} = ${r2}$ km. ${farther} ($${Math.max(r1, r2)}$ km) is farther.`;
        } else {
            const mapDist = getNum(3, 7);
            const scale1 = getNum(5, 10);
            const scale2 = scale1 * 2;
            const real1 = mapDist * scale1;
            const real2 = mapDist * scale2;

            q = `Map A has scale $1$ cm = $${scale1}$ km. Map B has scale $1$ cm = $${scale2}$ km. On both maps, a road is drawn as $${mapDist}$ cm. Which map shows a longer real road?`;
            options = ['Map B', 'Map A', 'Both show the same distance', 'Cannot be determined'];
            explanation = `Map A: $${mapDist} \\times ${scale1} = ${real1}$ km. Map B: $${mapDist} \\times ${scale2} = ${real2}$ km. Map B represents a longer real road.`;
        }

        let shuffled = [...new Set(options)].sort(() => Math.random() - 0.5);
        while (shuffled.length < 4) shuffled.push('None of these');
        questions.push({
            question: q,
            options: shuffled.slice(0, 4),
            correct: shuffled.slice(0, 4).indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateSpatialOrientationQuestions = () => {
    const questions = [];
    const directions = ['North', 'East', 'South', 'West'];

    for (let i = 0; i < 10; i++) {
        const type = i % 3;
        let q, options, explanation;

        if (type === 0) {
            const facing = directions[getNum(0, 3)];
            const rightOf = directions[(directions.indexOf(facing) + 1) % 4];

            q = `Priya is facing **${facing}**. Her friend Aman is standing to her right. In which direction is Aman standing?`;
            options = [rightOf];
            directions.filter(d => d !== rightOf).forEach(d => options.push(d));
            explanation = `When facing ${facing}, your right hand points towards ${rightOf}.`;
        } else if (type === 1) {
            const sunDir = 'East';
            const facing = 'East';
            const shadow = 'West';

            q = `In the morning, the sun rises in the **East**. If you are facing the sun, your shadow falls in which direction?`;
            options = [shadow, 'East', 'North', 'South'];
            explanation = `Your shadow always falls on the opposite side of the light source. Sun in East = shadow in West.`;
        } else {
            const facing = directions[getNum(0, 3)];
            const behind = directions[(directions.indexOf(facing) + 2) % 4];

            q = `A boy is walking towards **${facing}**. What direction is behind him?`;
            options = [behind];
            directions.filter(d => d !== behind).forEach(d => options.push(d));
            explanation = `The opposite of ${facing} is ${behind}. What's behind you is always the opposite of where you face.`;
        }

        let shuffled = [...new Set(options)].sort(() => Math.random() - 0.5);
        while (shuffled.length < 4) shuffled.push(directions[getNum(0, 3)]);
        questions.push({
            question: q,
            options: shuffled.slice(0, 4),
            correct: shuffled.slice(0, 4).indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateLandmarkNavigationQuestions = () => {
    const questions = [];
    const places = ['School', 'Hospital', 'Park', 'Library', 'Temple', 'Market', 'Bus Stop', 'Post Office'];
    const directions = ['North', 'East', 'South', 'West'];

    for (let i = 0; i < 10; i++) {
        const type = i % 3;
        let q, options, explanation;

        if (type === 0) {
            const p1 = places[getNum(0, 7)];
            let p2;
            do { p2 = places[getNum(0, 7)]; } while (p2 === p1);
            const dir = directions[getNum(0, 3)];

            q = `The ${p2} is to the **${dir}** of the ${p1}. To go from ${p1} to ${p2}, in which direction should you walk?`;
            options = [dir];
            directions.filter(d => d !== dir).forEach(d => options.push(d));
            explanation = `If ${p2} is ${dir} of ${p1}, you walk ${dir} to reach it.`;
        } else if (type === 1) {
            const p1 = places[getNum(0, 7)];
            let p2, p3;
            do { p2 = places[getNum(0, 7)]; } while (p2 === p1);
            do { p3 = places[getNum(0, 7)]; } while (p3 === p1 || p3 === p2);
            const d1 = directions[getNum(0, 3)];
            const d2 = directions[getNum(0, 3)];

            q = `From ${p1}, the ${p2} is to the ${d1} and ${p3} is to the ${d2}. If you are at ${p1} and face the ${p2}, the ${p3} is to your...?`;
            const relDir = (directions.indexOf(d2) - directions.indexOf(d1) + 4) % 4;
            const answer = relDir === 0 ? 'front' : relDir === 1 ? 'right' : relDir === 2 ? 'back' : 'left';
            options = [answer, 'front', 'right', 'left', 'back'].filter((v, idx, arr) => arr.indexOf(v) === idx);
            explanation = `Facing ${d1} (towards ${p2}), ${d2} is to your ${answer}. Think of the compass as a clock!`;
        } else {
            const steps = getNum(3, 8);
            const d1 = directions[getNum(0, 3)];
            const d2 = directions[(directions.indexOf(d1) + 1) % 4];
            const steps2 = getNum(2, 6);
            const totalSteps = steps + steps2;

            q = `Anu walks $${steps}$ steps ${d1}, then turns right and walks $${steps2}$ steps. How many total steps did she take?`;
            options = [`$${totalSteps}$`, `$${totalSteps + 1}$`, `$${steps * steps2}$`, `$${Math.abs(steps - steps2)}$`];
            explanation = `Total steps = $${steps} + ${steps2} = ${totalSteps}$.`;
        }

        let shuffled = [...new Set(options)].sort(() => Math.random() - 0.5);
        while (shuffled.length < 4) shuffled.push('Cannot determine');
        questions.push({
            question: q,
            options: shuffled.slice(0, 4),
            correct: shuffled.slice(0, 4).indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateMapSymbolQuestions = () => {
    const questions = [];
    const symbols = [
        { sym: '✚', meaning: 'Hospital', wrong: ['School', 'Temple', 'Railway Station'] },
        { sym: '✈', meaning: 'Airport', wrong: ['Bus Stand', 'Harbour', 'Market'] },
        { sym: '📫', meaning: 'Post Office', wrong: ['Bank', 'Library', 'Police Station'] },
        { sym: '⛪', meaning: 'Church / Place of Worship', wrong: ['Museum', 'School', 'Hospital'] },
        { sym: '🏭', meaning: 'Factory / Industry', wrong: ['Hospital', 'School', 'Park'] }
    ];

    for (let i = 0; i < 10; i++) {
        const type = i % 2;
        let q, options, explanation;

        if (type === 0) {
            const item = symbols[getNum(0, symbols.length - 1)];
            q = `On a map legend, the symbol **${item.sym}** most commonly represents a:`;
            options = [item.meaning, ...item.wrong];
            explanation = `The symbol ${item.sym} is a standard map symbol for "${item.meaning}".`;
        } else {
            const colorMeanings = [
                { color: 'Blue', meaning: 'Water (rivers, lakes, oceans)', wrong: ['Forests', 'Deserts', 'Roads'] },
                { color: 'Green', meaning: 'Vegetation / Forests', wrong: ['Water bodies', 'Mountains', 'Cities'] },
                { color: 'Brown', meaning: 'Mountains / Elevated land', wrong: ['Water', 'Forests', 'Roads'] },
                { color: 'Yellow', meaning: 'Deserts / Dry land', wrong: ['Water', 'Forests', 'Mountains'] }
            ];
            const item = colorMeanings[getNum(0, colorMeanings.length - 1)];
            q = `On a physical map, the color **${item.color}** usually represents:`;
            options = [item.meaning, ...item.wrong];
            explanation = `${item.color} on a physical map typically indicates "${item.meaning}".`;
        }

        let shuffled = [...options].sort(() => Math.random() - 0.5);
        questions.push({
            question: q,
            options: shuffled,
            correct: shuffled.indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

const generateRouteTrackingQuestions = () => {
    const questions = [];
    const directions = ['North', 'East', 'South', 'West'];

    for (let i = 0; i < 10; i++) {
        const type = i % 3;
        let q, options, explanation;

        if (type === 0) {
            const d1 = getNum(2, 5);
            const d2 = getNum(2, 5);
            const d3 = getNum(2, 5);
            const total = d1 + d2 + d3;

            q = `A delivery person drives $${d1}$ km North, then $${d2}$ km East, then $${d3}$ km South. What is the total distance driven?`;
            options = [`$${total}$ km`, `$${d1 + d2}$ km`, `$${total + 1}$ km`, `$${Math.abs(d1 - d3) + d2}$ km`];
            explanation = `Total distance driven = sum of all segments: $${d1} + ${d2} + ${d3} = ${total}$ km.`;
        } else if (type === 1) {
            const d1 = getNum(3, 8);
            const d2 = getNum(3, 8);

            q = `Raj walks $${d1}$ km North, then $${d1}$ km South. How far is he from where he started?`;
            options = ['$0$ km', `$${d1}$ km`, `$${d1 * 2}$ km`, `$${d1 + 1}$ km`];
            explanation = `Walking $${d1}$ km North then $${d1}$ km South brings you back to the starting point. Distance from start = $0$ km.`;
        } else {
            const d1 = getNum(3, 7);
            const d2 = getNum(3, 7);
            const longer = Math.max(d1, d2);
            const shorter = Math.min(d1, d2);

            q = `A bus goes $${d1}$ km East and then $${d2}$ km East. How far is the bus from the starting point?`;
            const ans = d1 + d2;
            options = [`$${ans}$ km`, `$${Math.abs(d1 - d2)}$ km`, `$${d1}$ km`, `$${d2}$ km`];
            explanation = `Both legs go in the same direction (East), so total displacement = $${d1} + ${d2} = ${ans}$ km East.`;
        }

        let shuffled = [...new Set(options)].sort(() => Math.random() - 0.5);
        while (shuffled.length < 4) shuffled.push(`$${getNum(1, 20)}$ km`);
        questions.push({
            question: q,
            options: shuffled.slice(0, 4),
            correct: shuffled.slice(0, 4).indexOf(options[0]),
            explanation
        });
    }
    return questions;
};

// ─── SKILLS CONFIG ──────────────────────────────────────────────────────────

export const SKILLS = [
    {
        id: 'myw-01',
        nodeId: 'a4051008-0001-0000-0000-000000000000',
        title: 'Maps & Directions',
        subtitle: 'Compass Basics',
        icon: '🧭',
        color: '#0ea5e9',
        desc: 'Understand North, South, East, West and turn orientations.',
        learn: {
            concept: 'Understanding Directions',
            rules: [
                {
                    title: 'The Compass Rose',
                    f: '$$\\text{N → E → S → W (Clockwise)}$$',
                    d: 'The four cardinal directions go clockwise: North, East, South, West. A handy mnemonic is "Never Eat Silly Worms".',
                    ex: 'If you face North, East is to your right, West is to your left, and South is behind you.',
                    tip: 'Draw a cross to visualize the four cardinal directions.'
                },
                {
                    title: 'Right Turn = Clockwise',
                    f: '$$90^{\\circ} \\text{ Right Turn}$$',
                    d: 'A right turn means rotating $90^{\\circ}$ clockwise. From North, right = East. From East, right = South.',
                    ex: 'Facing North → turn right → now facing East.',
                    tip: 'Left turn is counter-clockwise — the opposite of right!'
                }
            ]
        },
        practice: generateMapDirectionQuestions,
        assessment: generateMapDirectionQuestions
    },
    {
        id: 'myw-02',
        nodeId: 'a4051008-0002-0000-0000-000000000000',
        title: 'Reading Simple Maps',
        subtitle: 'Visual Tracking',
        icon: '🗺️',
        color: '#0284c7',
        desc: 'Follow routes and understand relative positioning on a flat map.',
        learn: {
            concept: 'Following Routes',
            rules: [
                {
                    title: 'Adding Distances',
                    f: '$$D_{total} = d_1 + d_2 + d_3 + \\ldots$$',
                    d: 'To find the total distance of a route on a map, add the lengths of each straight segment.',
                    ex: 'If a path goes $2$ cm straight, turns, and goes $3$ cm, the total map path is $5$ cm long.',
                    tip: 'Ensure you are adding same units (cm to cm)!'
                },
                {
                    title: 'Comparing Distances',
                    f: '$$\\text{Closer} = \\text{Shorter map distance}$$',
                    d: 'The place with the smaller distance on the map is closer in real life (assuming the same scale).',
                    ex: 'Park is $3$ cm away, Hospital is $5$ cm away → Park is closer.',
                    tip: 'Always check if scale is the same before comparing!'
                }
            ]
        },
        practice: generateReadingSimpleMapsQuestions,
        assessment: generateReadingSimpleMapsQuestions
    },
    {
        id: 'myw-03',
        nodeId: 'a4051008-0003-0000-0000-000000000000',
        title: 'Grid References',
        subtitle: 'Coordinates',
        icon: '🔲',
        color: '#0ea5e9',
        desc: 'Locate points using alpha-numeric grid systems like A4 or B2.',
        learn: {
            concept: 'Using a Grid',
            rules: [
                {
                    title: 'Column + Row',
                    f: '$$\\text{Grid Ref} = \\text{Column(Letter)} + \\text{Row(Number)}$$',
                    d: 'Maps use letters across the top (columns) and numbers down the side (rows) to create squares. You read across first, then down.',
                    ex: 'Grid B3 means column B, row 3.',
                    tip: 'Always read across the letters first, then down the numbers!'
                },
                {
                    title: 'Movement on Grids',
                    f: '$$\\text{Same letter} = \\text{Vertical move}$$',
                    d: 'If only the number changes, the movement is vertical. If only the letter changes, the movement is horizontal. If both change, the movement is diagonal.',
                    ex: 'A2 to A5 = vertical. A2 to C2 = horizontal. A2 to C5 = both.',
                    tip: 'Think of it like a chess board — rows and columns!'
                }
            ]
        },
        practice: generateGridReferenceQuestions,
        assessment: generateGridReferenceQuestions
    },
    {
        id: 'myw-04',
        title: 'Scale Understanding',
        subtitle: 'Map to Reality',
        icon: '📏',
        color: '#0284c7',
        desc: 'Convert map measurements to real-world distances and vice versa.',
        learn: {
            concept: 'Using Map Scales',
            rules: [
                {
                    title: 'Map to Real',
                    f: '$$\\text{Real Distance} = \\text{Map Distance} \\times \\text{Scale}$$',
                    d: 'A scale tells you how much the real world was shrunk to fit on paper. Multiply map distance by the scale to get real distance.',
                    ex: 'If $1$ cm = $10$ km, then $4$ cm on the map means $4 \\times 10 = 40$ km.',
                    tip: 'Larger scale value = more shrinkage = covers bigger real area!'
                },
                {
                    title: 'Real to Map',
                    f: '$$\\text{Map Distance} = \\text{Real Distance} \\div \\text{Scale}$$',
                    d: 'To find how far apart two places should be drawn on the map, divide the real distance by the scale value.',
                    ex: 'Real distance = $60$ km, Scale = $1$ cm = $10$ km → Map distance = $60 \\div 10 = 6$ cm.',
                    tip: 'Division is the reverse of multiplication!'
                }
            ]
        },
        practice: generateScaleUnderstandingQuestions,
        assessment: generateScaleUnderstandingQuestions
    },
    {
        id: 'myw-05',
        title: 'Spatial Orientation',
        subtitle: 'Left, Right & Relative',
        icon: '🔄',
        color: '#0369a1',
        desc: 'Understand relative positions — left, right, behind, in front.',
        learn: {
            concept: 'Relative Positioning',
            rules: [
                {
                    title: 'Your Right Side',
                    f: '$$\\text{Facing N} \\rightarrow \\text{Right = E}$$',
                    d: 'When facing North, your right is East and your left is West. This changes depending on which direction you face!',
                    ex: 'Facing South: your right is West, your left is East.',
                    tip: 'Stretch your arms! Right hand = right direction on the compass.'
                }
            ]
        },
        practice: generateSpatialOrientationQuestions,
        assessment: generateSpatialOrientationQuestions
    },
    {
        id: 'myw-06',
        title: 'Landmark Navigation',
        subtitle: 'Points of Reference',
        icon: '🏛️',
        color: '#075985',
        desc: 'Navigate between landmarks using directional clues on a map.',
        learn: {
            concept: 'Using Landmarks',
            rules: [
                {
                    title: 'Landmark Directions',
                    f: '$$\\text{A is N of B} \\iff \\text{B is S of A}$$',
                    d: 'If place A is North of place B, then place B is South of place A. Directions between two points are always opposite.',
                    ex: 'The School is East of the Park → The Park is West of the School.',
                    tip: 'Think of it as a mirror — always reverse!'
                }
            ]
        },
        practice: generateLandmarkNavigationQuestions,
        assessment: generateLandmarkNavigationQuestions
    },
    {
        id: 'myw-07',
        title: 'Map Symbols',
        subtitle: 'Legends & Colors',
        icon: '🔑',
        color: '#0c4a6e',
        desc: 'Interpret map symbols, legends, and color-coded features.',
        learn: {
            concept: 'Reading a Legend',
            rules: [
                {
                    title: 'Standard Symbols',
                    f: '$$\\text{Symbol} \\rightarrow \\text{Meaning}$$',
                    d: 'Maps use standard symbols so everyone can understand them. A cross (✚) means hospital, a blue line means river, a dashed line means footpath.',
                    ex: 'Blue color = water bodies. Green = forests. Brown = mountains.',
                    tip: 'Always check the legend/key of a new map before reading it!'
                }
            ]
        },
        practice: generateMapSymbolQuestions,
        assessment: generateMapSymbolQuestions
    },
    {
        id: 'myw-08',
        title: 'Route Tracking',
        subtitle: 'Path & Distance',
        icon: '🚗',
        color: '#0ea5e9',
        desc: 'Track distances along multi-step routes and paths.',
        learn: {
            concept: 'Following Multi-Step Routes',
            rules: [
                {
                    title: 'Total Distance',
                    f: '$$D_{total} = \\sum \\text{all segments}$$',
                    d: 'The total distance traveled is the sum of all individual legs of the journey, regardless of direction changes.',
                    ex: '$3$ km North + $4$ km East + $2$ km South = $9$ km total distance.',
                    tip: 'Distance traveled ≠ distance from start! Going back reduces displacement but not total distance.'
                },
                {
                    title: 'Back to Start',
                    f: '$$\\text{Going N then same S} = 0 \\text{ displacement}$$',
                    d: 'If you go a distance in one direction and the same distance in the opposite direction, you end up where you started.',
                    ex: '$5$ km East then $5$ km West = back at the start.',
                    tip: 'Opposite directions cancel each other out for displacement!'
                }
            ]
        },
        practice: generateRouteTrackingQuestions,
        assessment: generateRouteTrackingQuestions
    }
];
