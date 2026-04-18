// Dynamic generation logic for Fractions 6 Practice & Assessment
// Replaces the old static array with procedurally generated questions.

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleOptions = (optionsArr) => {
    const withIndices = optionsArr.map((v, i) => ({ v: String(v), isCorrect: i === 0 }));
    // Simple Fisher-Yates shuffle
    for (let i = withIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [withIndices[i], withIndices[j]] = [withIndices[j], withIndices[i]];
    }
    const rightIndex = withIndices.findIndex(x => x.isCorrect);
    return { options: withIndices.map(x => x.v), correctIndex: rightIndex };
};

export const generateFractionQuestions = (skillId, count = 20) => {
    const questions = [];
    
    for (let i = 0; i < count; i++) {
        let q = { id: `skill-${skillId}-${Date.now()}-${i}`, skill: skillId };
        
        if (skillId === 'parts-of-a-whole') {
            const isWordProblem = Math.random() > 0.5;
            
            if (isWordProblem) {
                const items = ["guavas", "apples", "chocolates", "sandwiches", "pizzas"];
                const item = items[randInt(0, items.length - 1)];
                const nFriends = randInt(3, 9);
                const nItems = randInt(1, nFriends - 1);
                
                q.question = `${nFriends} friends shared ${nItems} ${item} equally among themselves. What fraction of the ${item} did each friend get?`;
                q.svg = '';
                
                const { options, correctIndex } = shuffleOptions([
                    `${nItems}/${nFriends}`,
                    `${nFriends}/${nItems}`,
                    `${nItems}/${nFriends+1}`,
                    `${nItems+1}/${nFriends}`
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `Since ${nItems} items are shared equally among ${nFriends} friends, each friend gets a share of $$ \\frac{${nItems}}{${nFriends}} $$ of the total.`;
            } else {
                const totalParts = randInt(3, 10);
                const filledParts = randInt(1, totalParts - 1);
                
                q.question = 'What fraction of the block is filled?';
                
                const w = totalParts * 40;
                let lines = '';
                for(let k=1; k<totalParts; k++){
                    lines += `<line x1="${k*40}" y1="0" x2="${k*40}" y2="40" stroke="#b45309" stroke-width="2"/>`;
                }
                
                q.svg = `<svg viewBox="0 0 ${w} 40" width="100%" height="40" style="max-width: ${w}px; display: block; margin: 0 auto;">
                    <rect width="${w}" height="40" fill="#fff9c4" stroke="#b45309" stroke-width="2"/>
                    <rect width="${filledParts * 40}" height="40" fill="#f59e0b"/>
                    ${lines}
                </svg>`;
                
                const { options, correctIndex } = shuffleOptions([
                    `${filledParts}/${totalParts}`,
                    `${totalParts}/${filledParts}`,
                    `${filledParts+1}/${totalParts}`,
                    `${filledParts}/${totalParts+1}`
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `There are ${filledParts} filled parts out of ${totalParts} total parts, so the fraction is $$ \\frac{${filledParts}}{${totalParts}} $$.`;
            }
        } 
        else if (skillId === 'number-line') {
            const divs = randInt(2, 9);
            const jumps = randInt(1, divs + 4); 
            const maxUnits = Math.max(1, Math.ceil(jumps / divs)); 
            const scaleUnits = Math.max(2, maxUnits + 1); // Draw an extra unit for spacing
            
            q.question = 'Identify the fraction indicated by the marker on the number line.';
            
            const w = Math.min(300, 150 * scaleUnits);
            const padX = 10;
            const usableW = w - 2*padX;
            const unitDist = usableW / scaleUnits;
            
            let elements = `<line x1="${padX}" y1="30" x2="${w-padX}" y2="30" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>`;
            
            for(let u=0; u<=scaleUnits; u++) {
                let x = padX + u * unitDist;
                elements += `<line x1="${x}" y1="20" x2="${x}" y2="40" stroke="#334155" stroke-width="2"/>
                             <text x="${x}" y="55" fill="#334155" font-family="Outfit" font-size="14" text-anchor="middle">${u}</text>`;
            }
            
            for(let u=0; u<scaleUnits; u++) {
                for(let d=1; d<divs; d++) {
                    let x = padX + u * unitDist + (d/divs)*unitDist;
                    elements += `<line x1="${x}" y1="25" x2="${x}" y2="35" stroke="#cbd5e1" stroke-width="1"/>`;
                }
            }
            
            const targetX = padX + (jumps/divs)*unitDist;
            elements += `<circle cx="${targetX}" cy="30" r="6" fill="#ef4444" stroke="#fff" stroke-width="2"/>`;
            
            q.svg = `<svg viewBox="0 0 ${w} 60" width="100%" height="60" style="max-width: ${w}px; display: block; margin: 0 auto;">${elements}</svg>`;
            
            const { options, correctIndex } = shuffleOptions([
                `${jumps}/${divs}`,
                `${divs}/${jumps}`,
                `${jumps+1}/${divs}`,
                `${jumps}/${divs+1}`
            ]);
            q.options = options;
            q.correct = correctIndex;
            q.explanation = `The space between 0 and 1 is divided into ${divs} equal parts. The marker is at jump ${jumps}, so the fraction is $$ \\frac{${jumps}}{${divs}} $$.`;
        } 
        else if (skillId === 'equivalent-mixed') {
            const subType = randInt(0, 2);
            
            if (subType === 0) {
                const b = randInt(2, 7);
                const a = randInt(1, b*2);
                const k = randInt(2, 6);
                const c = b * k;
                const correctNum = a * k;
                
                q.question = `Find the equivalent fraction for $$ \\frac{${a}}{${b}} $$ that has a denominator of ${c}.`;
                q.svg = '';
                
                const { options, correctIndex } = shuffleOptions([
                    `${correctNum}/${c}`,
                    `${correctNum+1}/${c}`,
                    `${correctNum-1}/${c}`,
                    `${a+k}/${c}`
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `Multiply both the numerator and the denominator by ${k}: $$ \\frac{${a} \\times ${k}}{${b} \\times ${k}} = \\frac{${correctNum}}{${c}} $$.`;
                
            } else if (subType === 1) {
                const den = randInt(3, 9);
                const whole = randInt(1, 5);
                const rem = randInt(1, den - 1);
                const num = whole * den + rem;
                
                q.question = `Convert the improper fraction $$ \\frac{${num}}{${den}} $$ to a mixed number.`;
                q.svg = '';
                
                const { options, correctIndex } = shuffleOptions([
                    `${whole} ${rem}/${den}`,
                    `${whole+1} ${rem}/${den}`,
                    `${whole} ${rem+1}/${den}`,
                    `${whole} ${den}/${rem}`
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `Divide ${num} by ${den}. The quotient is ${whole} and the remainder is ${rem}, so it converts to $$ ${whole} \\frac{${rem}}{${den}} $$.`;
                
            } else {
                const den = randInt(3, 8);
                const whole = randInt(1, 6);
                const rem = randInt(1, den - 1);
                const num = whole * den + rem;
                
                q.question = `Convert the mixed number $$ ${whole} \\frac{${rem}}{${den}} $$ to an improper fraction.`;
                q.svg = '';
                
                const { options, correctIndex } = shuffleOptions([
                    `${num}/${den}`,
                    `${num+whole}/${den}`,
                    `${num-1}/${den}`,
                    `${num}/${rem}`
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `Multiply the whole number ${whole} by the denominator ${den} and add the numerator ${rem}: $(${whole} \\times ${den}) + ${rem} = ${num}$. Place this over the denominator to get $$ \\frac{${num}}{${den}} $$.`;
            }
        } 
        else if (skillId === 'comparing-operations') {
            const subType = randInt(0, 1);
            if (subType === 0) {
                const den = randInt(4, 15);
                const a = randInt(1, den-1);
                const b = randInt(1, den-1);
                
                q.question = `Add the fractions: $$ \\frac{${a}}{${den}} + \\frac{${b}}{${den}} $$`;
                q.svg = '';
                
                const { options, correctIndex } = shuffleOptions([
                    `${a+b}/${den}`,
                    `${a+b}/${den*2}`,
                    `${a+b+1}/${den}`,
                    `${Math.max(1, a+b-1)}/${den}`
                ]);
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `Since the denominators are the same, just add the numerators and keep the denominator: $$ \\frac{${a} + ${b}}{${den}} = \\frac{${a+b}}{${den}} $$.`;
            } else {
                const den1 = randInt(3, 8);
                const den2 = randInt(3, 8);
                let num1 = randInt(1, den1-1);
                let num2 = randInt(1, den2-1);
                if (num1/den1 === num2/den2) num1++; // avoid generating equal fractions
                
                q.question = `Which fraction is greater, $$ \\frac{${num1}}{${den1}} $$ or $$ \\frac{${num2}}{${den2}} $$?`;
                q.svg = '';
                
                const isFirstGreater = (num1/den1) > (num2/den2);
                const correct = isFirstGreater ? `${num1}/${den1}` : `${num2}/${den2}`;
                const incorrect = isFirstGreater ? `${num2}/${den2}` : `${num1}/${den1}`;
                
                const dist1 = `${num1+num2}/${den1+den2}`; 
                const dist2 = `${den1}/${num1}`;
                
                const { options, correctIndex } = shuffleOptions([
                    correct,
                    incorrect,
                    dist1,
                    dist2
                ]);
                
                const commonDen = den1 * den2;
                const eqNum1 = num1 * den2;
                const eqNum2 = num2 * den1;
                
                q.options = options;
                q.correct = correctIndex;
                q.explanation = `To compare, find a common denominator (${commonDen}). $$ \\frac{${num1}}{${den1}} = \\frac{${eqNum1}}{${commonDen}} $$ and $$ \\frac{${num2}}{${den2}} = \\frac{${eqNum2}}{${commonDen}} $$. Since ${Math.max(eqNum1, eqNum2)} is greater than ${Math.min(eqNum1, eqNum2)}, $$ ${correct} $$ is greater.`;
            }
        }
        
        questions.push(q);
    }
    
    return questions;
};
