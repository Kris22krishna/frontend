import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentEngine from '../../../Math-Branches/Algebra/Topics/Skills/Engines/AssessmentEngine';

const TheFishTaleTest = () => {
    const navigate = useNavigate();

    const generateQuestions = () => {
        const generated = [];
        const TOTAL_QUESTIONS = 25;

        // Helper for Indian Number System Formatting
        const inFormat = (n) => n.toLocaleString('en-IN');

        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const skillType = i % 8; // Cycle through all 8 skills
            let qText, correctAns, opts, sol;

            if (skillType === 0) {
                // 1. Place Value
                const num = Math.floor(Math.random() * 900000) + 100000;
                const digits = num.toString().split('');
                const pos = Math.floor(Math.random() * 6);
                const digit = digits[pos];
                const places = ['Lakhs', 'Ten Thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'];
                const value = parseInt(digit) * Math.pow(10, 5 - pos);

                qText = `What is the place value of the digit $${digit}$ in $${inFormat(num)}$?`;
                correctAns = `$${inFormat(value)}$`;
                sol = `In $${inFormat(num)}$, the digit $${digit}$ is in the ${places[pos]} place. 

Value = $${digit} \\times ${inFormat(Math.pow(10, 5 - pos))} = ${inFormat(value)}$.`;
                opts = [correctAns, `$${inFormat(value * 10)}$`, `$${inFormat(value / 10)}$`, `$${digit}$`].filter(o => o);
            } else if (skillType === 1) {
                // 2. Estimation (Rounding)
                const num = Math.floor(Math.random() * 9000) + 1000;
                const roundTo = 1000;
                const rounded = Math.round(num / roundTo) * roundTo;

                qText = `Round $${inFormat(num)}$ to the nearest Thousand.`;
                correctAns = `$${inFormat(rounded)}$`;
                sol = `To round to the nearest thousand, look at the hundreds digit. 

If it's 5 or more, round up. Since $${num}$ has $${Math.floor((num % 1000) / 100)}$ in the hundreds place, we round to $${inFormat(rounded)}$.`;
                opts = [correctAns, `$${inFormat(rounded + 1000)}$`, `$${inFormat(rounded - 1000)}$`, `$${inFormat(num - (num % 100))}$`].filter(o => o);
            } else if (skillType === 2) {
                // 3. Reading & Writing
                const num = (Math.floor(Math.random() * 9) + 1) * 100000;
                qText = `How do you write $${inFormat(num)}$ in words according to the Indian system?`;
                const lakh = num / 100000;
                correctAns = `${lakh} Lakh`;
                sol = `In the Indian system, $1,00,000$ is called 1 Lakh. 

So $${inFormat(num)}$ is $${lakh}$ Lakh.`;
                opts = [correctAns, `${lakh} Ten Thousand`, `${lakh} Million`, `${lakh * 10} Thousand`].filter(o => o);
            } else if (skillType === 3) {
                // 4. Comparison
                const n1 = Math.floor(Math.random() * 900000) + 100000;
                const n2 = Math.floor(Math.random() * 900000) + 100000;
                qText = `Compare the numbers: $${inFormat(n1)}$ ____ $${inFormat(n2)}$`;
                correctAns = n1 > n2 ? '$>$' : (n1 < n2 ? '$<$' : '$=$');
                sol = `Comparing the digits from left to right: $${inFormat(n1)}$ is ${n1 > n2 ? 'greater than' : (n1 < n2 ? 'less than' : 'equal to')} $${inFormat(n2)}$.`;
                opts = ['$>$', '$<$', '$=$'];
            } else if (skillType === 4) {
                // 5. Number Sense (Mental Math)
                const base = Math.floor(Math.random() * 80) + 20;
                const multiplier = Math.pow(10, Math.floor(Math.random() * 2) + 2);
                qText = `What is $${base} \\times ${inFormat(multiplier)}$?`;
                const ans = base * multiplier;
                correctAns = `$${inFormat(ans)}$`;
                sol = `When multiplying by $${inFormat(multiplier)}$, simply add $${Math.log10(multiplier)}$ zeros to $${base}$. 

$${base} \\times ${inFormat(multiplier)} = ${inFormat(ans)}$.`;
                opts = [correctAns, `$${inFormat(ans * 10)}$`, `$${inFormat(ans / 10)}$`, `$${inFormat(ans + 100)}$`].filter(o => o);
            } else if (skillType === 5) {
                // 6. Logistics (Speed/Distance)
                const speed = (Math.floor(Math.random() * 6) + 4) * 5; // 20, 25, 30...
                const time = Math.floor(Math.random() * 3) + 2;
                const distance = speed * time;
                qText = `A boat travels at a speed of $${speed}$ km/h. How far will it travel in $${time}$ hours?`;
                correctAns = `$${distance}$ km`;
                sol = `Distance = Speed $\\times$ Time. 

Distance = $${speed} \\times ${time} = ${distance}$ km.`;
                opts = [correctAns, `$${distance + speed}$ km`, `$${distance - speed}$ km`, `$${speed + time}$ km`].filter(o => o);
            } else if (skillType === 6) {
                // 7. Real Life Data (Profit)
                const cp = Math.floor(Math.random() * 100) + 100;
                const sp = cp + Math.floor(Math.random() * 50) + 20;
                const kg = Math.floor(Math.random() * 5) + 5;
                const profit = (sp - cp) * kg;
                qText = `Gracy buys fish for Rs $${cp}$ per kg and sells them for Rs $${sp}$ per kg. How much profit does she earn by selling $${kg}$ kg of fish?`;
                correctAns = `Rs $${inFormat(profit)}$`;
                sol = `Profit per kg = $${sp} - ${cp} = ${sp - cp}$. 

Total Profit = Profit per kg $\\times$ Quantity = $${sp - cp} \\times ${kg} = ${profit}$.`;
                opts = [correctAns, `Rs $${inFormat(profit + 100)}$`, `Rs $${inFormat(profit - 50)}$`, `Rs $${inFormat(sp * kg)}$`].filter(o => o);
            } else {
                // 8. Large Numbers
                qText = `How many zeros are there in $1$ Crore?`;
                correctAns = `$7$`;
                sol = `$1$ Crore is written as $1,00,00,000$. It has $7$ zeros.`;
                opts = [`$7$`, `$6$`, `$8$`, `$5$`];
            }

            opts = [...new Set(opts)];
            opts.sort(() => Math.random() - 0.5);

            generated.push({
                question: qText,
                options: opts,
                correct: opts.indexOf(correctAns),
                explanation: sol
            });
        }
        return generated;
    };

    // UseMemo to ensure questions don't regenerate on every render, only on full reload/restart
    const questions = useMemo(() => generateQuestions, []);

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#f8fafc' }}>
            <AssessmentEngine
                questions={questions}
                title="The Fish Tale: Chapter Test"
                onBack={() => navigate('/the-fish-tale/skills')}
                onSecondaryBack={() => navigate('/the-fish-tale')}
                color="#0369a1"
                prefix="ft"
            />
        </div>
    );
};

export default TheFishTaleTest;
