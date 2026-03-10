export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const getNonZeroInt = (min, max) => {
    let num = 0;
    while (num === 0) num = getRandomInt(min, max);
    return num;
};

// ─── MAIN TOPIC 1: Properties of Addition and Subtraction ───
// Subtopics:
// 0,1: Closure under Addition
// 2,3: Closure under Subtraction
// 4,5: Commutative Property of Addition
// 6,7: Associative Property of Addition
// 8,9: Additive Identity
export const generateTopic1Questions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        let a = getNonZeroInt(-15, 15);
        let b = getNonZeroInt(-15, 15);
        let c = getNonZeroInt(-10, 10);

        let q, options, explanation;
        if (i === 0 || i === 1) { // Closure under Addition
            let sum = a + b;
            q = `Evaluate the integer logically: $${a} + (${b})$`;
            options = [`${sum}`, `${sum > 0 ? -sum : Math.abs(sum)}`, `${a - b}`, `Not an integer`];
            explanation = `Closure under Addition states adding two integers always yields an integer. $${a} + (${b}) = ${sum}$.`;
        } else if (i === 2 || i === 3) { // Closure under Subtraction
            let diff = a - b;
            q = `Evaluate the following integer subtraction: $${a} - (${b})$`;
            options = [`${diff}`, `${a + b}`, `${diff > 0 ? -diff : Math.abs(diff)}`, `Not an integer`];
            explanation = `Closure under Subtraction implies subtracting an integer is the same as adding its opposite. $${a} - (${b}) = ${a} + (${-b}) = ${diff}$.`;
        } else if (i === 4 || i === 5) { // Commutative Property of Addition
            let sum = a + b;
            q = `By Commutative Property, $${a} + (${b}) = ?$`;
            options = [`$${b} + (${a})$`, `$${a} - (${b})$`, `$${b} - (${a})$`, `$${-a} + (${-b})$`];
            explanation = `Commutative Property of Addition says order does not matter: $a + b = b + a$. So $${a} + (${b}) = ${b} + (${a})$.`;
        } else if (i === 6 || i === 7) { // Associative Property of Addition
            q = `By Associative Property, $[${a} + (${b})] + (${c}) = ?$`;
            options = [`$${a} + [${b} + (${c})]$`, `$[${a} + (${c})] + (${b})$`, `$[${b} + (${a})] + (${c})$`, `$(${a} + ${b}) \\times ${c}$`];
            explanation = `Associative Property of Addition says grouping does not matter: $(a + b) + c = a + (b + c)$.`;
        } else { // Additive Identity
            q = `What is $${a} + 0$? (Additive Identity)`;
            options = [`${a}`, `0`, `${-a}`, `1`];
            explanation = `The Additive Identity is $0$, meaning adding $0$ to any integer leaves it unchanged. Answer: $${a}$.`;
        }

        let shuffled = [...options].sort(() => Math.random() - 0.5);
        qs.push({
            question: q, options: shuffled, correct: shuffled.indexOf(options[0]), explanation
        });
    }
    return qs;
};

// ─── MAIN TOPIC 2: Multiplication of Integers ───
// Subtopics:
// 0-4: Multiplication of Positive and Negative Integers
// 5-9: Multiplication of Two Negative Integers
export const generateTopic2Questions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        let q, options, explanation;
        if (i < 5) { // Positive and Negative
            let p = getRandomInt(2, 12);
            let n = getRandomInt(-12, -2);
            if (Math.random() > 0.5) { let temp = p; p = n; n = temp; } // mix order
            let prod = p * n;
            q = `Multiply: $${p} \\times (${n})$`;
            options = [`${prod}`, `${Math.abs(prod)}`, `${prod - 2}`, `${Math.abs(prod) + 2}`];
            explanation = `Multiplying integers with DIFFERENT signs always gives a NEGATIVE result. $${p} \\times (${n}) = ${prod}$.`;
        } else { // Two Negative Integers
            let n1 = getRandomInt(-12, -2);
            let n2 = getRandomInt(-12, -2);
            let prod = n1 * n2;
            q = `Multiply: $${n1} \\times (${n2})$`;
            options = [`${prod}`, `${-prod}`, `${prod + Math.abs(n1)}`, `${-prod - Math.abs(n2)}`];
            explanation = `Multiplying integers with the SAME sign always gives a POSITIVE result. $${n1} \\times (${n2}) = ${prod}$.`;
        }

        let shuffled = [...options].sort(() => Math.random() - 0.5);
        qs.push({
            question: q, options: shuffled, correct: shuffled.indexOf(options[0]), explanation
        });
    }
    return qs;
};

// ─── MAIN TOPIC 3: Properties of Multiplication of Integers ───
// Subtopics (6):
// 0-1: Closure under Multiplication
// 2-3: Commutativity of Multiplication
// 4-5: Multiplication by Zero
// 6-7: Multiplicative Identity
// 8: Associativity of Multiplication
// 9: Distributive Property
export const generateTopic3Questions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        let a = getNonZeroInt(-9, 9);
        let b = getNonZeroInt(-9, 9);
        let c = getNonZeroInt(-5, 5);
        let q, options, explanation;

        if (i === 0 || i === 1) { // Closure
            let prod = a * b;
            q = `Calculate $${a} \\times (${b})$`;
            options = [`${prod}`, `${-prod}`, `${a + b}`, `Not an integer`];
            explanation = `Closure implies the product of two integers is always an integer. $${a} \\times (${b}) = ${prod}$.`;
        } else if (i === 2 || i === 3) { // Commutative
            q = `By Commutativity of Multiplication, $${a} \\times (${b}) = ?$`;
            options = [`$${b} \\times (${a})$`, `$${a} + (${b})$`, `$-${a} \\times (${b})$`, `$${b} \\div (${a})$`];
            explanation = `Order does not matter in multiplication. $a \\times b = b \\times a$.`;
        } else if (i === 4 || i === 5) { // By Zero
            q = `What is $${a} \\times 0$?`;
            options = [`$0$`, `$${a}$`, `$1$`, `Undefined`];
            explanation = `Multiplying any integer by $0$ yields $0$.`;
        } else if (i === 6 || i === 7) { // Multiplicative Identity
            q = `What is $${a} \\times 1$?`;
            options = [`$${a}$`, `$1$`, `$0$`, `$${-a}$`];
            explanation = `The Multiplicative Identity is $1$. Any number times $1$ is itself.`;
        } else if (i === 8) { // Associativity
            q = `By Associative Property, $[${a} \\times (${b})] \\times (${c}) = ?$`;
            options = [`$${a} \\times [${b} \\times (${c})]$`, `$[${a} \\times ({c})] \\times (${b})$`, `$(${a} \\times ${b}) + ${c}$`, `$0$`];
            explanation = `Associative Property says grouping does not matter: $(a \\times b) \\times c = a \\times (b \\times c)$.`;
        } else { // Distributive
            q = `By Distributive Property, $${a} \\times (${b} + ${c}) = ?$`;
            options = [`$(${a} \\times ${b}) + (${a} \\times ${c})$`, `$(${a} \\times ${b}) \\times (${a} \\times ${c})$`, `$${a + b} + ${a + c}$`, `$${a * b} + ${c} $`];
            explanation = `The Distributive Property allows multiplying a number across terms inside parentheses: $a \\times(b + c) = (a \\times b) + (a \\times c) $.`;
        }

        let shuffled = [...options].sort(() => Math.random() - 0.5);
        qs.push({ question: q, options: shuffled, correct: shuffled.indexOf(options[0]), explanation });
    }
    return qs;
};

// ─── MAIN TOPIC 4: Division of Integers ───
// Subtopics:
// 0-3: Division Rules of Signs
// 4-6: Division as Inverse of Multiplication
// 7-9: Division with Positive and Negative Numbers
export const generateTopic4Questions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        let q, options, explanation;

        if (i < 4) { // Rules of Signs
            let signs = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]][i % 4];
            let ans = getRandomInt(2, 9) * signs[2];
            let den = getRandomInt(2, 9) * signs[1];
            let num = ans * den;
            q = `Evaluate: $${num} \\div(${den})$`;
            options = [`${ans} `, `${-ans} `, `${ans + signErrorVal(ans)} `, `Undefined`];
            let rule = (num > 0 && den > 0) || (num < 0 && den < 0) ? "SAME signs yield a POSITIVE quotient." : "DIFFERENT signs yield a NEGATIVE quotient.";
            explanation = `Rule of signs: ${rule} $${num} \\div(${den}) = ${ans} $.`;
        } else if (i < 7) { // Inverse of Multiplication
            let a = getRandomInt(-9, 9) || 1;
            let b = getRandomInt(-9, 9) || 2;
            let prod = a * b;
            q = `If $${a} \\times(${b}) = ${prod} $, what is $${prod} \\div(${a})$ ? `;
            options = [`${b} `, `${-b} `, `${a} `, `${prod} `];
            explanation = `Division is the inverse of multiplication.Since $${a} \\times(${b}) = ${prod} $, reversing it gives $${prod} \\div(${a}) = ${b} $.`;
        } else { // Mixed practice
            let num = getRandomInt(-50, 50);
            let den = getNonZeroInt(-10, 10);
            while (num % den !== 0 || num === 0) { num = getRandomInt(-50, 50); den = getNonZeroInt(-10, 10); }
            let ans = num / den;
            q = `Divide: $${num} \\div(${den})$`;
            options = [`${ans} `, `${-ans} `, `${ans + 1} `, `${Math.abs(ans)} `];
            // Ensure unique options
            options = Array.from(new Set(options));
            while (options.length < 4) Object.assign(options, [...options, (ans + 2).toString(), (ans - 2).toString()]).splice(4);
            explanation = `Calculate the absolute division first: $ | ${num}| \\div | ${den}| = ${Math.abs(ans)} $.Because the signs are ${Math.sign(num) === Math.sign(den) ? 'the same, the answer is positive' : 'different, the answer is negative'}.Output: ${ans}.`;
        }

        let shuffled = [...options].sort(() => Math.random() - 0.5);
        qs.push({ question: q, options: shuffled, correct: shuffled.indexOf(options[0]), explanation });
    }
    return qs;
};

const signErrorVal = (val) => val === 0 ? 1 : Math.sign(val);

// ─── MAIN TOPIC 5: Properties of Division ───
// Subtopics:
// 0-2: Division is not closed
// 3-5: Division is not commutative
// 6-7: Division is not associative
// 8-9: Division by zero
export const generateTopic5Questions = () => {
    const qs = [];
    for (let i = 0; i < 10; i++) {
        let q, options, explanation;
        if (i < 3) { // Not closed
            let a = getRandomInt(2, 5);
            let b = a + getRandomInt(1, 4);
            q = `Does $${a} \\div ${b}$ result in an integer ? `;
            options = [`No`, `Yes`, `It is ${a} `, `It is ${b} `];
            explanation = `Division of integers is NOT CLOSED.$${a} \\div ${b}$ gives a fraction, not an integer.`;
        } else if (i < 6) { // Not commutative
            let a = getRandomInt(4, 10);
            let b = 2; // a > b
            q = `Compare: $${a} \\div ${b}$ and $${b} \\div ${a} $.Are they equal ? `;
            options = [`No`, `Yes`, `Always`, `Cannot be determined`];
            explanation = `Division is NOT Commutative.$${a} \\div ${b}$ is an integer, but $${b} \\div ${a}$ is a fraction!`;
        } else if (i < 8) { // Not associative
            let a = 12, b = 4, c = 2; // Ex: (12/4)/2 = 3/2, 12/(4/2) = 12/2 = 6
            q = `To show division is NOT Associative, compare $(12 \\div 4) \\div 2$ and $12 \\div(4 \\div 2)$.What are their values ? `;
            options = [`$1.5$ and $6$`, `$3$ and $3$`, `$6$ and $1.5$`, `$12$ and $4$`];
            explanation = `LHS: $(12\\div4) \\div2 = 3\\div2 = 1.5$.RHS: $12\\div(4\\div2) = 12\\div2 = 6$.So they are different!`;
        } else { // By zero
            let a = getNonZeroInt(-10, 10);
            q = `What is $${a} \\div 0$ ? `;
            options = [`Undefined / Meaningless`, `$0$`, `$${a} $`, `$ - ${a} $`];
            explanation = `Division by zero is mathematically NOT defined.You cannot split something into 0 parts.`;
        }

        let shuffled = [...options].sort(() => Math.random() - 0.5);
        qs.push({ question: q, options: shuffled, correct: shuffled.indexOf(options[0]), explanation });
    }
    return qs;
};
