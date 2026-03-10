export const SKILLS = [
    {
        id: 's1',
        title: 'Random Experiments',
        subtitle: 'Understanding Outcomes',
        desc: 'Learn to define experiments, outcomes, and list the complete sample space.',
        color: '#6366f1',
        icon: '🌌',
        learn: {
            concept: 'A random experiment is an action where the result is uncertain. The set of all possible results is called the Sample Space (S).',
            rules: [
                {
                    title: 'Sample Space',
                    f: 'S = \\{O_1, O_2, \\dots, O_n\\}',
                    d: 'List all possible outcomes exactly once in a set.',
                    tip: 'Count the outcomes to make sure you did not miss any!',
                    ex: '\\text{Coin Toss: } S = \\{H, T\\}'
                },
                {
                    title: 'Equally Likely Outcomes',
                    f: 'P(O_1) = P(O_2) = \\dots = P(O_n)',
                    d: 'Outcomes are equally likely if each has the exact same chance of occurring.',
                    tip: 'Assume coins and dice are fair unless stated otherwise.',
                    ex: '\\text{Fair Die } \\rightarrow \\text{ Each number has } \\frac{1}{6} \\text{ chance.}'
                }
            ]
        },
        practice: [
            { question: 'What is the sample space for tossing a single fair coin?', options: ['$\{H\}$', '$\{T\}$', '$\{H, T\}$', '$\{H, T, HT\}$'], correct: 2, explanation: 'A coin has exactly two sides: Head ($H$) and Tail ($T$).' },
            { question: 'What is the total number of outcomes when rolling a standard six-sided die?', options: ['$6$', '$36$', '$1$', '$12$'], correct: 0, explanation: 'A standard die has the numbers $1$ to $6$ on its faces, making $6$ possible outcomes.' },
            { question: 'Which of the following describes an outcome?', options: ['The entire sample space', 'A single possible result of an experiment', 'An impossible event', 'A mathematical formula'], correct: 1, explanation: 'An outcome is defined as a single possible result of a random experiment.' },
            { question: 'If you draw one card from a standard deck, how many total possible outcomes are there?', options: ['$13$', '$26$', '$52$', '$4$'], correct: 2, explanation: 'A standard playing card deck contains exactly $52$ unique cards.' },
            { question: 'Which of the following is NOT a random experiment?', options: ['Tossing a coin', 'Rolling a die', 'Boiling pure water at $100^{\circ}C$', 'Drawing a card blindly'], correct: 2, explanation: 'Boiling water at $100^{\circ}C$ under standard pressure always produces steam. The result is certain, not random.' },
            { question: 'What is the sample space of choosing a vowel from the English alphabet?', options: ['$\{A, E, I, O, U\}$', '$\{A, B, C\}$', '$\{X, Y, Z\}$', 'None of these'], correct: 0, explanation: 'The vowels are exactly $A, E, I, O, U$.' },
            { question: 'If a spinner has $4$ equal sections colored Red, Blue, Green, and Yellow, what is the sample space?', options: ['$\{Red, Blue\}$', '$\{\\text{All Colors}\}$', '$\{Red, Blue, Green, Yellow\}$', '$\{Red\}$'], correct: 2, explanation: 'The sample space lists all distinct individual sections.' },
            { question: 'A bag contains $3$ red balls and $2$ blue balls. If one ball is drawn, how many physical outcomes are there?', options: ['$2$', '$3$', '$5$', '$1$'], correct: 2, explanation: 'Each of the $5$ individual balls represents a distinct physical outcome, even if some have the same color.' },
            { question: 'What does it mean for outcomes to be "equally likely"?', options: ['They cannot happen', 'One is more likely than the other', 'They have the exact same chance of occurring', 'They add up to $2$'], correct: 2, explanation: 'Equally likely means the probability is evenly distributed.' },
            { question: 'Are the outcomes of rolling a weighted dice "equally likely"?', options: ['Yes', 'No', 'Sometimes', 'Cannot determine'], correct: 1, explanation: 'A weighted (loaded) die favors certain sides, so the probabilities are NOT equal.' },
            { question: 'If you flip a coin that has Heads on both sides, is getting Heads or Tails equally likely?', options: ['Yes', 'No', 'Depends on the toss', 'Yes, it is a coin'], correct: 1, explanation: 'Since there is no Tail, Tails is impossible and Heads is certain. They are not equal.' },
            { question: 'When throwing a standard die, are the outcomes (Even) and (Odd) equally likely?', options: ['Yes', 'No', 'Only on a rigged die', 'They sum to $0$'], correct: 0, explanation: 'There are $3$ Evens ($2, 4, 6$) and $3$ Odds ($1, 3, 5$). Since both have $3$ outcomes, they are equally likely.' },
            { question: 'What is the sample space for the sum of two $6$-sided dice?', options: ['$\{1, 2, 3 \dots 12\}$', '$\{2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12\}$', '$\{1, 6\}$', '$\{36\}$'], correct: 1, explanation: 'The minimum sum is $1+1=2$ and maximum is $6+6=12$.' },
            { question: 'Which sample space describes tossing two coins?', options: ['$\{H, T\}$', '$\{HH, TT\}$', '$\{HH, HT, TH, TT\}$', '$\{H, T, HT\}$'], correct: 2, explanation: 'Each coin has $2$ states. By the counting principle, $2 \times 2 = 4$ outcomes.' },
            { question: 'Are the events "Sum is $2$" and "Sum is $7$" equally likely when rolling two dice?', options: ['Yes', 'No', 'Only mathematically', 'Sometimes'], correct: 1, explanation: 'Sum $2$ has only $1$ outcome $(1,1)$. Sum $7$ has $6$ outcomes $(1,6, 2,5, \dots)$. They are not equally likely.' },
            { question: 'If you pick a random integer from $1$ to $10$ inclusive, are the outcomes equally likely?', options: ['Yes', 'No', 'Only primes are', 'Only evens are'], correct: 0, explanation: 'Each integer has exactly a $1$ in $10$ chance of being selected.' },
            { question: 'A jar has $10$ red marbles and $1$ blue marble. Are picking Red and picking Blue equally likely outcomes?', options: ['Yes', 'No', 'Sometimes', 'Always'], correct: 1, explanation: 'Picking a red marble is $10$ times more likely since there are $10$ of them compared to $1$ blue.' },
            { question: 'What is the sample space of flipping a coin repeatedly until a Head appears, or flipping it $3$ times max?', options: ['$\{H, TH, TTH, TTT\}$', '$\{H, T\}$', '$\{HHH, TTT\}$', '$\{HT, TH\}$'], correct: 0, explanation: 'You either get $H$ first, or $T$ then $H$, or $TT$ then $H$, or $TTT$.' },
            { question: 'Two numbers are drawn from $\{1, 2, 3\}$ without replacement. Is the sample space size $9$?', options: ['Yes', 'No, it is $6$', 'No, it is $3$', 'No, it is $8$'], correct: 1, explanation: 'Without replacement means you cannot draw $(1,1), (2,2), (3,3)$. Outcomes are $(1,2), (1,3), (2,1), (2,3), (3,1), (3,2)$. So size is $6$.' },
            { question: 'If three coins are tossed, the sample space size is:', options: ['$3$', '$6$', '$8$', '$9$'], correct: 2, explanation: 'Each coin has $2$ outcomes. Total = $2 \times 2 \times 2 = 8$ outcomes.' }
        ],
        assessment: [
            { question: 'If you toss two coins simultaneously, how many outcomes are in the sample space?', options: ['$2$', '$3$', '$4$', '$8$'], correct: 2, explanation: 'The outcomes are $HH, HT, TH$, and $TT$. Total = $4$ outcomes.' },
            { question: 'Which of the following describes equally likely outcomes?', options: ['Picking a card from a deck', 'A rigged game', 'A loaded die', 'Flipping a bent coin'], correct: 0, explanation: 'In a standard deck, each card has an equal chance of being selected, unlike rigged or bent objects.' },
            { question: 'What is the sample space for guessing a $1$-digit PIN ($0$-$9$)?', options: ['$\{1, 2, 3 \dots 9\}$', '$\{0, 1 \dots 9\}$', '$10$', '$100$'], correct: 1, explanation: 'The digits range from $0$ to $9$, forming a set of $10$ discrete outcomes.' },
            { question: 'A spinner has $1$ Green section and $3$ Red sections of equal size. Are Green and Red equally likely?', options: ['Yes', 'No', 'Cannot determine', 'Yes if spun fast'], correct: 1, explanation: 'Since the areas are unequal ($3$ Red vs $1$ Green), landing on Red is $3$ times more likely.' },
            { question: 'In a family of $2$ children, what is the sample space of their genders (Boy/Girl)?', options: ['$\{B, G\}$', '$\{BB, GG\}$', '$\{BB, BG, GB, GG\}$', 'None of these'], correct: 2, explanation: 'Similar to $2$ coins, the permutations of genders are $BB, BG, GB, GG$.' },
            { question: 'If you roll an $8$-sided die, how many possible outcomes are there?', options: ['$6$', '$8$', '$16$', '$64$'], correct: 1, explanation: 'The sample space literally corresponds to the faces, of which there are $8$.' },
            { question: 'Which set represents drawing a letter from the word "CAT"?', options: ['$\{C, A\}$', '$\{A, T\}$', '$\{C, A, T\}$', '$\{CAT\}$'], correct: 2, explanation: 'The elementary outcomes are the distinct letters $C, A$, and $T$.' },
            { question: 'Are the outcomes of choosing a date in a leap year equally likely?', options: ['Yes', 'No', 'Only in February', 'Never'], correct: 0, explanation: 'Every day from Jan $1$ to Dec $31$ has a $1/366$ chance of being selected.' },
            { question: 'Consider drawing two cards from a standard deck WITH replacement. How many outcomes exist?', options: ['$52$', '$104$', '$2652$', '$2704$'], correct: 3, explanation: 'With replacement: $52 \times 52 = 2704$ combinations.' },
            { question: 'True or False: A sample space must contain finite outcomes.', options: ['True', 'False', 'Sometimes', 'Always'], correct: 1, explanation: 'False. An experiment like "picking a random real number between $0$ and $1$" has an infinite sample space.' }
        ]
    },
    {
        id: 's2',
        title: 'Theoretical Probability',
        subtitle: 'The Core Formula',
        desc: 'Master the fundamental formula of theoretical probability.',
        color: '#f59e0b',
        icon: '➗',
        learn: {
            concept: 'The theoretical probability of an event $E$ is the ratio of favourable outcomes to total possible outcomes.',
            rules: [
                {
                    title: 'Probability Formula',
                    f: 'P(E) = \\frac{\\text{Number of outcomes favourable to E}}{\\text{Total number of possible outcomes}}',
                    d: 'Identify what you want (favourable) and divide by everything possible (total).',
                    tip: 'Always simplify the fraction to its lowest terms!',
                    ex: 'P(\\text{Even on die}) = \\frac{3}{6} = \\frac{1}{2}'
                }
            ]
        },
        practice: [
            { question: 'A die is thrown once. What is the probability of getting a $4$?', options: ['$\\frac{1}{2}$', '$\\frac{1}{4}$', '$\\frac{1}{6}$', '$\\frac{4}{6}$'], correct: 2, explanation: 'Favourable outcome = $\{4\}$ ($1$ outcome). Total = $6$.' },
            { question: 'Probability of getting an even number on a die?', options: ['$\\frac{1}{3}$', '$\\frac{1}{2}$', '$\\frac{2}{3}$', '$1$'], correct: 1, explanation: '$3$ evens ($2, 4, 6$) out of $6$. $\\frac{3}{6} = \\frac{1}{2}$.' },
            { question: 'Bag with $5$ red and $3$ green apples in a basket. $P(\\text{red})$?', options: ['$\\frac{5}{3}$', '$\\frac{3}{8}$', '$\\frac{5}{8}$', '$\\frac{8}{5}$'], correct: 2, explanation: '$5$ favourable out of $8$ total.' },
            { question: '$P(\\text{Head})$ in tossing a fair coin?', options: ['$0$', '$\\frac{1}{4}$', '$\\frac{1}{2}$', '$1$'], correct: 2, explanation: '$1$ Head out of $2$ outcomes.' },
            { question: 'A spinner with numbers $1$ to $5$. $P(3)$?', options: ['$\\frac{1}{5}$', '$\\frac{3}{5}$', '$\\frac{1}{3}$', '$\\frac{1}{2}$'], correct: 0, explanation: 'One "$3$" out of $5$ sections.' },
            { question: '$P(\\text{number} > 4)$ on a die?', options: ['$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{1}{6}$', '$\\frac{2}{3}$'], correct: 1, explanation: 'Numbers are $5$ and $6$ ($2$ outcomes). $\\frac{2}{6} = \\frac{1}{3}$.' },
            { question: 'Bag with $4$ blue, $6$ yellow balls. $P(\\text{yellow})$?', options: ['$\\frac{2}{5}$', '$\\frac{3}{5}$', '$\\frac{4}{10}$', '$\\frac{1}{2}$'], correct: 1, explanation: '$6$ yellow out of $10$. $\\frac{6}{10} = \\frac{3}{5}$.' },
            { question: 'Denominator in theoretical probability formula?', options: ['Favourable', 'Total', 'Impossible', 'Sample Mean'], correct: 1, explanation: 'Formula: Favourable / Total.' },
            { question: '$P(\\text{picking "P" from "APPLE"})$?', options: ['$\\frac{1}{5}$', '$\\frac{2}{5}$', '$\\frac{1}{4}$', '$\\frac{1}{3}$'], correct: 1, explanation: 'Two "P"s out of $5$ letters.' },
            { question: 'Month starting with "J" probability?', options: ['$\\frac{1}{12}$', '$\\frac{1}{6}$', '$\\frac{1}{4}$', '$\\frac{3}{12}$'], correct: 2, explanation: 'Jan, Jun, Jul ($3$ months). $\\frac{3}{12} = \\frac{1}{4}$.' },
            { question: '$P(\\text{prime number})$ on a die?', options: ['$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{2}{3}$', '$\\frac{1}{6}$'], correct: 0, explanation: '$2, 3, 5$ are primes ($3$ outcomes). $\\frac{3}{6} = \\frac{1}{2}$.' },
            { question: '$P(\\text{King})$ from a $52$-card deck?', options: ['$\\frac{1}{52}$', '$\\frac{4}{52}$', '$\\frac{1}{13}$', 'Both B and C'], correct: 3, explanation: '$4$ Kings. $\\frac{4}{52} = \\frac{1}{13}$.' },
            { question: 'Numbers $1$ to $20$. $P(\\text{multiple of } 4)$?', options: ['$\\frac{1}{4}$', '$\\frac{5}{20}$', 'Both', '$\\frac{4}{20}$'], correct: 2, explanation: '$4, 8, 12, 16, 20$ ($5$ outcomes). $\\frac{5}{20} = \\frac{1}{4}$.' },
            { question: '$P(\\text{weekend})$ in a week?', options: ['$\\frac{1}{7}$', '$\\frac{2}{7}$', '$\\frac{5}{7}$', '$\\frac{1}{2}$'], correct: 1, explanation: 'Sat and Sun ($2$ days).' },
            { question: '$P(\\text{odd prime})$ on a die?', options: ['$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{2}{6}$', 'Both B and C'], correct: 3, explanation: '$3$ and $5$ are odd primes. $\\frac{2}{6} = \\frac{1}{3}$.' },
            { question: 'Scaling: If outcomes and favourable both double, P:', options: ['Doubles', 'Halves', 'Stays same', 'Squares'], correct: 2, explanation: 'Ratio remains identical.' },
            { question: 'Group of $3$ boys, $2$ girls. $P(\\text{girl})$?', options: ['$\\frac{2}{3}$', '$\\frac{3}{5}$', '$\\frac{2}{5}$', '$1$'], correct: 2, explanation: '$2$ girls out of $5$ total.' },
            { question: 'Spinner with $8$ sections. $P(< 6)$?', options: ['$\\frac{5}{8}$', '$\\frac{6}{8}$', '$\\frac{1}{2}$', '$\\frac{3}{4}$'], correct: 0, explanation: '$1, 2, 3, 4, 5$ ($5$ outcomes).' },
            { question: 'Numerator in $P(E)$?', options: ['Total', 'Favourable', 'Both', 'Neither'], correct: 1, explanation: 'Upper part is favourable count.' },
            { question: '$P(\\text{"Z" from "ZEBRA"})$?', options: ['$\\frac{1}{5}$', '$0$', '$1$', '$\\frac{2}{5}$'], correct: 0, explanation: 'One "Z" out of $5$.' }
        ],
        assessment: [
            { question: 'Spinner with $4$ colors. $P(\\text{Blue})$?', options: ['$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{1}{4}$', '$1$'], correct: 2, explanation: '$1$ color out of $4$.' },
            { question: '$P(\\text{vowel from "MATHEMATICS"})$?', options: ['$\\frac{4}{11}$', '$\\frac{3}{11}$', '$\\frac{5}{11}$', '$\\frac{2}{11}$'], correct: 0, explanation: '$A, E, A, I$ ($4$ vowels) out of $11$.' },
            { question: 'Die roll. $P(\\text{number between } 2 \\text{ and } 6 \\text{ exclusive})$?', options: ['$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{2}{3}$', '$\\frac{1}{6}$'], correct: 0, explanation: '$3, 4, 5$ ($3$ outcomes). $\\frac{3}{6} = \\frac{1}{2}$.' },
            { question: 'Ball $1$-$50$. $P(\\text{perfect square})$?', options: ['$\\frac{7}{50}$', '$\\frac{8}{50}$', '$\\frac{6}{50}$', '$\\frac{1}{10}$'], correct: 0, explanation: '$1, 4, 9, 16, 25, 36, 49$ ($7$ outcomes).' },
            { question: 'If $P(E) = \frac{3}{8}$, ratio of favourable:unfavourable?', options: ['$3:8$', '$8:3$', '$3:5$', '$5:3$'], correct: 2, explanation: '$3$ favours, $5$ against ($8-3$).' },
            { question: '$12$ green, $8$ pink, $5$ white pebbles. $P(\\text{pink})$?', options: ['$\\frac{8}{25}$', '$\\frac{8}{20}$', '$\\frac{12}{25}$', '$\\frac{1}{2}$'], correct: 0, explanation: '$8$ out of $25$.' },
            { question: '$P(\\text{leap year})$ in a $4$-year cycle?', options: ['$\\frac{1}{4}$', '$\\frac{1}{2}$', '$1$', '$0$'], correct: 0, explanation: '$1$ year out of $4$.' },
            { question: '$12$-sided die. $P(\\text{factor of } 12)$?', options: ['$\\frac{1}{2}$', '$\\frac{5}{12}$', '$\\frac{7}{12}$', '$\\frac{1}{12}$'], correct: 0, explanation: '$1, 2, 3, 4, 6, 12$ ($6$ factors). $\\frac{6}{12} = \\frac{1}{2}$.' },
            { question: '$4$ red, $6$ black cards. $P(\\text{red})$?', options: ['$\\frac{4}{6}$', '$\\frac{2}{3}$', '$\\frac{2}{5}$', '$\\frac{3}{5}$'], correct: 2, explanation: '$4$ out of $10$. $\\frac{4}{10} = \\frac{2}{5}$.' },
            { question: 'Balls $1$-$15$. $P(\\text{multiple of } 3 \\text{ or } 5)$?', options: ['$\\frac{7}{15}$', '$\\frac{8}{15}$', '$\\frac{1}{3}$', '$\\frac{1}{2}$'], correct: 0, explanation: '$3, 6, 9, 12, 15, 5, 10$ ($7$ unique outcomes).' }
        ]
    },
    {
        id: 's3',
        title: 'Elementary Events',
        subtitle: 'Single Outcomes',
        desc: 'Explore events that consist of exactly one outcome and their sum.',
        color: '#ec4899',
        icon: '1️⃣',
        learn: {
            concept: 'An elementary event has only one outcome from the sample space. The sum of all elementary events is always $1$.',
            rules: [
                {
                    title: 'Sum of Elementary Events',
                    f: '\\sum P(E_i) = 1',
                    d: 'If you add up the probability of every single distinct outcome, it equals $1$ ($100\%$).',
                    tip: 'This helps verify if your calculated probabilities cover the whole sample space correctly.',
                    ex: 'P(H) + P(T) = \\frac{1}{2} + \\frac{1}{2} = 1'
                }
            ]
        },
        practice: [
            { question: 'An event having only one outcome of the experiment is called an:', options: ['Impossible Event', 'Sure Event', 'Elementary Event', 'Complementary Event'], correct: 2, explanation: 'By definition, an event with exactly one outcome is an elementary event.' },
            { question: 'What is the sum of the probabilities of all elementary events of an experiment?', options: ['$0$', '$0.5$', '$1$', '$2$'], correct: 2, explanation: 'The sum of probabilities of all possible elementary events is always $1$.' },
            { question: 'Is getting a prime number on a die roll an elementary event?', options: ['Yes', 'No', 'Sometimes', 'Cannot determine'], correct: 1, explanation: 'No. Primes on a die are $2, 3, 5$ ($3$ outcomes). It is a compound event.' },
            { question: 'Which of the following is an elementary event when tossing two coins?', options: ['Getting at least one Head', 'Getting exactly one Tail', 'Getting Head on first, Tail on second (HT)', 'Getting the same on both'], correct: 2, explanation: 'Only "$HT$" is a single distinct outcome from the sample space $\{HH, HT, TH, TT\}$.' },
            { question: 'An experiment has $3$ elementary events $E_1, E_2, E_3$. If $P(E_1)=0.3$, $P(E_2)=0.5$, what is $P(E_3)$?', options: ['$0.8$', '$0.2$', '$0.1$', '$1.0$'], correct: 1, explanation: 'The sum must be $1$. $1 - (0.3 + 0.5) = 0.2$.' },
            { question: 'If we toss a coin, is "getting a Head" an elementary event?', options: ['Yes', 'No', 'Only if the coin is fair', 'Cannot be determined'], correct: 0, explanation: '"Head" is a single outcome from $\{H, T\}$, so yes.' },
            { question: 'A bag has $1$ red, $1$ green, $1$ blue marble. Is drawing a red marble an elementary event?', options: ['Yes', 'No', 'Only if replaced', 'Sometimes'], correct: 0, explanation: 'Since there is exactly $1$ red marble, it constitutes a single distinct outcome.' },
            { question: 'A bag has $3$ red marbles and $1$ blue. Is drawing a red marble an elementary event?', options: ['Yes', 'No', 'Only if replaced', 'Sometimes'], correct: 1, explanation: 'No. "Red" covers $3$ different physical marbles, making it a compound event consisting of $3$ outcomes.' },
            { question: 'What do we call an event that has more than one outcome?', options: ['Elementary Event', 'Compound/Composite Event', 'Sure Event', 'Impossible Event'], correct: 1, explanation: 'An event combining multiple elementary outcomes is a compound event.' },
            { question: 'If an experiment has $N$ distinct total outcomes, how many elementary events does it have?', options: ['$1$', '$N/2$', '$N$', '$N^2$'], correct: 2, explanation: 'Each single outcome is its own distinct elementary event, so there are $N$ of them.' },
            { question: 'For a die, $E = \\text{"getting a } 6\\text{"}$. Is $E$ elementary?', options: ['Yes', 'No', 'Only if $6$ is the highest', 'Depends on the die'], correct: 0, explanation: '"$6$" is a single face on the die.' },
            { question: 'Is "Drawing a King" from a deck an elementary event?', options: ['Yes', 'No', 'Only the King of Spades', 'Depends on the deck'], correct: 1, explanation: 'No, because there are $4$ Kings. Drawing a specific "King of Spades" would be elementary.' },
            { question: 'If probabilities of elementary events are $0.1, 0.4, 0.2$, and $x$. What is $x$?', options: ['$0.1$', '$0.2$', '$0.3$', '$0.4$'], correct: 2, explanation: '$1 - (0.1 + 0.4 + 0.2) = 1 - 0.7 = 0.3$.' },
            { question: 'Can an elementary event have a probability of $0$?', options: ['Yes', 'No', 'Only theoretically', 'If the item is broken'], correct: 1, explanation: 'If an outcome has $0$ probability, it is an impossible event, which means it is not actually a part of the sample space of possible outcomes.' },
            { question: 'Is getting a sum of $2$ when rolling two dice an elementary event?', options: ['Yes', 'No', 'Only if the dice are identical', 'Sometimes'], correct: 0, explanation: 'Sum of $2$ can only happen one way: $(1, 1)$. So it is a single outcome out of $36$, making it elementary.' },
            { question: 'Is getting a sum of $3$ when rolling two dice an elementary event?', options: ['Yes', 'No', 'Only mathematically', 'Sometimes'], correct: 1, explanation: 'Sum of $3$ can happen via $(1,2)$ or $(2,1)$. Since it contains multiple outcomes, it is not elementary.' },
            { question: 'If $P(E_1) = P(E_2) = P(E_3) = P(E_4)$, and they are the only elementary events, what is $P(E_1)$?', options: ['$1$', '$0.25$', '$0.5$', '$0$'], correct: 1, explanation: 'Since sum is $1$, and there are $4$ equal parts: $1 / 4 = 0.25$.' },
            { question: 'A spinner has sectors $A, B, C$ with probabilities $1/2, 1/3$, and $1/6$. Which is an elementary event?', options: ['Landing on $A$', 'Landing on $B$', 'Landing on $C$', 'All of them'], correct: 3, explanation: 'Each sector is a distinct single outcome of the spin, so each is an elementary event.' },
            { question: 'In drawing a card, "Drawing the Queen of Hearts" is an elementary event. True or False?', options: ['True', 'False', 'Depends on shuffling', 'Only in Poker'], correct: 0, explanation: 'There is exactly one Queen of Hearts in the deck.' },
            { question: 'Can the sum of probabilities of all elementary events be greater than $1$?', options: ['Yes', 'No', 'If outcomes overlap', 'In loaded dice'], correct: 1, explanation: 'No. The sum covering the entire sample space is strictly always $1$ mathematically.' }
        ],
        assessment: [
            { question: 'Which of these is an elementary event when throwing a die?', options: ['Getting an even number', 'Getting a number $< 3$', 'Getting exactly a $5$', 'Getting a multiple of $2$'], correct: 2, explanation: '"Getting exactly a $5$" has only one outcome: $\{5\}$.' },
            { question: 'If a bag has $1$ red, $1$ green, and $1$ blue ball, the probability of picking the red ball is $\\frac{1}{3}$. This is an example of:', options: ['Complementary Event', 'Elementary Event', 'Impossible Event', 'Sure Event'], correct: 1, explanation: 'Since there is only $1$ red ball, picking it is a single outcome, making it an elementary event.' },
            { question: 'Let $E_1, E_2, E_3$ be elementary events forming a sample space. $P(E_1)=0.1, P(E_2)=x, P(E_3)=2x$. Find $x$.', options: ['$0.3$', '$0.9$', '$0.45$', '$0.1$'], correct: 0, explanation: '$0.1 + x + 2x = 1 \implies 3x = 0.9 \implies x = 0.3$.' },
            { question: 'When tossing a coin $3$ times, how many elementary events exist?', options: ['$3$', '$6$', '$8$', '$9$'], correct: 2, explanation: 'The sample space has $2^3 = 8$ distinct sequences, each being an elementary event.' },
            { question: 'Is "Drawing a Face Card" an elementary event?', options: ['Yes', 'No', 'Only if it is a King', 'Always'], correct: 1, explanation: 'No, there are $12$ face cards in a deck.' },
            { question: 'Rolling a $7$ on a $12$-sided die: Elementary or Compound?', options: ['Elementary', 'Compound', 'Neither', 'Sure Event'], correct: 0, explanation: 'A $12$-sided die has exactly one face showing $7$.' },
            { question: 'A game has $10$ winning tickets and $90$ losing tickets. Is drawing a winning ticket an elementary event?', options: ['Yes', 'No', 'Only the first prize is', 'Sometimes'], correct: 1, explanation: 'There are $10$ distinct winning tickets, so it is a compound event.' },
            { question: 'What property defines an elementary event?', options: ['It has $0$ probability', 'It has multiple outcomes', 'It consists of exactly one outcome', 'It is sure to happen'], correct: 2, explanation: 'An elementary (or simple) event contains exactly one element from the sample space.' },
            { question: 'If $P(E_i)$ represents the probability of the $i$-th elementary event, what is $\\sum P(E_i)$?', options: ['$0.5$', '$1$', '$100$', 'Infinity'], correct: 1, explanation: 'The summation of all elementary probabilities equals $1$.' },
            { question: 'Which is an elementary event in the experiment of choosing a day of the week?', options: ['Choosing a weekend', 'Choosing a weekday', 'Choosing Tuesday', 'Choosing a day ending in $Y$'], correct: 2, explanation: 'Tuesday is a single, distinct day.' }
        ]
    },
    {
        id: 's4',
        title: 'Complementary Events',
        subtitle: 'The "Not" Rule',
        desc: 'Understand how to calculate the probability of an event NOT happening.',
        color: '#8b5cf6',
        icon: '🔄',
        learn: {
            concept: 'The complement of an event $E$ (denoted as $\\bar{E}$ or "not $E$") contains all outcomes in the sample space that are NOT in $E$.',
            rules: [
                {
                    title: 'Complement Event Formula',
                    f: 'P(\\bar{E}) = 1 - P(E)',
                    d: 'The probability of an event not happening is $1$ minus the probability of it happening.',
                    tip: 'Use this when calculating "not $E$" is easier than finding favourable outcomes for it.',
                    ex: '\\text{If } P(E) = 0.2 \\text{, then } P(\\bar{E}) = 0.8'
                }
            ]
        },
        practice: [
            { question: 'If the probability of winning a game is $0.3$, what is the probability of losing it?', options: ['$0.3$', '$0.7$', '$1$', '$0$'], correct: 1, explanation: 'Winning and losing are complementary events. $P(\\text{Losing}) = 1 - P(\\text{Winning}) = 1 - 0.3 = 0.7$.' },
            { question: 'If $P(E) = \\frac{2}{7}$, what is $P(\\text{not } E)$?', options: ['$\\frac{2}{7}$', '$\\frac{5}{7}$', '$1$', '$0$'], correct: 1, explanation: '$P(\\text{not } E) = 1 - P(E) = 1 - \\frac{2}{7} = \\frac{5}{7}$.' },
            { question: 'The probability that it will rain tomorrow is $85\\%$. What is the probability that it will NOT rain?', options: ['$15\\%$', '$85\\%$', '$100\\%$', '$0\\%$'], correct: 0, explanation: '$100\\% - 85\\% = 15\\%$.' },
            { question: 'If $P(A) = 0.05$, find $P(\\bar{A})$.', options: ['$0.95$', '$0.5$', '$0.05$', '$1$'], correct: 0, explanation: '$1 - 0.05 = 0.95$.' },
            { question: 'Event $E$ happens with probability $2/9$. $P(\\text{not } E)$?', options: ['$\\frac{7}{9}$', '$\\frac{2}{9}$', '$1$', '$0$'], correct: 0, explanation: '$1 - 2/9 = 7/9$.' },
            { question: '$P(\\text{Event}) + P(\\text{Not Event})$ always equals:', options: ['$0$', '$0.5$', '$1$', 'Depends on event'], correct: 2, explanation: 'Complementary probabilities sum to $1$.' },
            { question: 'A student has a $4/5$ chance of passing. Probability of failing?', options: ['$\\frac{1}{5}$', '$\\frac{4}{5}$', '$1$', '$0$'], correct: 0, explanation: '$1 - 4/5 = 1/5$.' },
            { question: 'If it is $P(E) = 0.999$, what is $P(\\bar{E})$?', options: ['$0.001$', '$0.01$', '$0.1$', '$0$'], correct: 0, explanation: '$1 - 0.999 = 0.001$.' },
            { question: 'The probability of a goal being scored is $0.62$. $P(\\text{no goal})$?', options: ['$0.38$', '$0.62$', '$1$', '$0.48$'], correct: 0, explanation: '$1 - 0.62 = 0.38$.' },
            { question: 'If $P(\\bar{E}) = 0.45$, find $P(E)$.', options: ['$0.55$', '$0.45$', '$1$', '$0.65$'], correct: 0, explanation: '$P(E) = 1 - P(\\bar{E}) = 1 - 0.45 = 0.55$.' },
            { question: '$P(A)$ is $3/10$. What percentage is $P(\\text{not } A)$?', options: ['$30\%$', '$70\%$', '$10\%$', '$100\%$'], correct: 1, explanation: '$P(\\text{not } A) = 7/10 = 70\%$.' },
            { question: 'If the chance of a tie is $1/8$, what is the chance of NOT a tie?', options: ['$\\frac{1}{8}$', '$\\frac{7}{8}$', '$1$', '$0$'], correct: 1, explanation: '$1 - 1/8 = 7/8$.' },
            { question: 'If $P(E) = x$, then $P(\\bar{E})$ is:', options: ['$x$', '$1-x$', '$x-1$', '$1/x$'], correct: 1, explanation: 'By definition of complement.' },
            { question: 'A bag has red and blue balls. $P(\\text{Red}) = 0.4$. Find $P(\\text{Blue})$.', options: ['$0.4$', '$0.6$', '$1$', '$0.2$'], correct: 1, explanation: 'Assuming only red and blue, they are complements.' },
            { question: 'Probability of a machine working is $0.92$. $P(\\text{broken})$?', options: ['$0.08$', '$0.92$', '$0.8$', '$0.12$'], correct: 0, explanation: '$1 - 0.92 = 0.08$.' },
            { question: 'If $P(E) = 0.123$, $P(\\bar{E})$ is:', options: ['$0.877$', '$0.123$', '$0.887$', '$0.876$'], correct: 0, explanation: '$1 - 0.123 = 0.877$.' },
            { question: 'An event has probability $1$. Its complement has probability:', options: ['$1$', '$0$', '$0.5$', 'Infinity'], correct: 1, explanation: '$1 - 1 = 0$.' },
            { question: 'Find $P(\\bar{E})$ if $P(E) = 1/2$.', options: ['$\\frac{1}{2}$', '$\\frac{1}{4}$', '$0$', '$1$'], correct: 0, explanation: '$1 - 1/2 = 1/2$.' },
            { question: 'If $P(E) = 0$, what is $P(\\bar{E})$?', options: ['$0$', '$1$', '$0.5$', 'None'], correct: 1, explanation: '$1 - 0 = 1$.' },
            { question: 'Sum of Complementary events in percentage?', options: ['$50\%$', '$100\%$', '$0\%$', '$200\%$'], correct: 1, explanation: 'Equivalent to $1$.' }
        ],
        assessment: [
            { question: 'If $P(E) = 0.04$, what is $P(\\text{not } E)$?', options: ['$0.96$', '$0.4$', '$0.06$', '$0.04$'], correct: 0, explanation: '$1 - 0.04 = 0.96$.' },
            { question: 'Which equation is true for any event $E$?', options: ['$P(E) - P(\\bar{E}) = 1$', '$P(E) \\times P(\\bar{E}) = 1$', '$P(E) + P(\\bar{E}) = 1$', '$P(E) / P(\\bar{E}) = 1$'], correct: 2, explanation: 'Sum is always $1$.' },
            { question: 'If $P(E) = 2/3$, then $P(\\bar{E}) = $', options: ['$\\frac{1}{3}$', '$\\frac{2}{3}$', '$1$', '$0$'], correct: 0, explanation: '$1 - 2/3 = 1/3$.' },
            { question: 'Probability of it NOT snowing is $0.72$. $P(\\text{snow})$?', options: ['$0.28$', '$0.72$', '$0.38$', '$1$'], correct: 0, explanation: '$1 - 0.72 = 0.28$.' },
            { question: 'Find $P(E)$ if $P(\\bar{E}) = 5/12$.', options: ['$\\frac{7}{12}$', '$\\frac{5}{12}$', '$1$', '$0$'], correct: 0, explanation: '$1 - 5/12 = 7/12$.' },
            { question: 'If $P(E) : P(\\bar{E}) = 3 : 2$, then $P(E) = $', options: ['$\\frac{3}{5}$', '$\\frac{2}{5}$', '$3/2$', '$2/3$'], correct: 0, explanation: 'Part / Total = $3 / (3+2) = 3/5$.' },
            { question: 'If $P(E) = 0.85$, find $P(\\bar{E})$ in fraction.', options: ['$\\frac{17}{20}$', '$\\frac{3}{20}$', '$\\frac{5}{20}$', '$\\frac{1}{20}$'], correct: 1, explanation: '$0.15 = 15/100 = 3/20$.' },
            { question: 'Probability of an event cannot exceed:', options: ['$0$', '$0.5$', '$1$', 'Infinity'], correct: 2, explanation: 'Max is $1$.' },
            { question: 'If an event is certain, its complement is:', options: ['Sure', 'Impossible', 'Likely', 'Unlikely'], correct: 1, explanation: 'Complement of $1$ is $0$.' },
            { question: 'A bag has $10$ balls. $P(\\text{picking white})$ is $0.3$. How many are NOT white?', options: ['$3$', '$7$', '$10$', '$0$'], correct: 1, explanation: '$P(\\text{not white}) = 0.7$. $0.7 \\times 10 = 7$.' }
        ]
    },
    {
        id: 's5',
        title: 'Impossible and Sure Events',
        subtitle: 'Probability Bounds',
        desc: 'Learn the limits of probability and how to handle extreme certainties.',
        color: '#f43f5e',
        icon: '🚫',
        learn: {
            concept: 'Probability is always bounded between $0$ and $1$. An event that cannot happen has a probability of $0$, and an event that is certain has a probability of $1$.',
            rules: [
                {
                    title: 'Probability Limits',
                    f: '0 \\le P(E) \\le 1',
                    d: 'Probability can never be negative, and it can never be greater than $1$ (or $100\%$).',
                    tip: 'If your answer is $1.2$ or $-0.5$, you have definitely made a mistake.',
                    ex: 'P(\\text{Rolling a 7 on a die}) = 0'
                }
            ]
        },
        practice: [
            { question: 'What is the probability of an impossible event?', options: ['$1$', '$0$', '$-1$', '$0.5$'], correct: 1, explanation: 'Zero favourable outcomes.' },
            { question: 'What is the probability of a sure (certain) event?', options: ['$0$', '$0.5$', '$1$', '$100$'], correct: 2, explanation: 'Always happens.' },
            { question: 'Which CANNOT be the probability of an event?', options: ['$\\frac{1}{3}$', '$0.1$', '$15\%$', '$-1.5$'], correct: 3, explanation: 'Cannot be negative.' },
            { question: 'Which CANNOT be the probability of an event?', options: ['$\\frac{2}{3}$', '$1.01$', '$0.001$', '$1$'], correct: 1, explanation: 'Cannot exceed $1$.' },
            { question: 'Probability of rolling an $8$ on a standard die?', options: ['$\\frac{1}{8}$', '$0$', '$\\frac{1}{6}$', '$1$'], correct: 1, explanation: 'Impossible.' },
            { question: '$P(S)$ where $S$ is the sure sample space?', options: ['$0$', '$1$', '$0.5$', 'Depends on $S$'], correct: 1, explanation: 'Always $1$.' },
            { question: 'If $E$ is an impossible event, then $P(E)$ is:', options: ['$0$', '$1$', '$0.5$', 'Undefined'], correct: 0, explanation: 'Exactly $0$.' },
            { question: 'A bag has $5$ red balls. $P(\\text{picking a black ball})$?', options: ['$0$', '$1$', '$\\frac{5}{10}$', 'None'], correct: 0, explanation: 'Impossible.' },
            { question: 'If today is Monday, $P(\\text{tomorrow is Tuesday})$?', options: ['$0$', '$1$', '$\\frac{1}{7}$', '$0.5$'], correct: 1, explanation: 'Sure event.' },
            { question: 'Range of probability $P(E)$?', options: ['$P < 0$', '$0 \le P \le 1$', '$P > 1$', '$-1 \le P \le 1$'], correct: 1, explanation: 'Standard bound.' },
            { question: 'Event with $P(E) = 0$ is called:', options: ['Elementary', 'Impossible', 'Sure', 'Compound'], correct: 1, explanation: 'Cannot occur.' },
            { question: 'Event with $P(E) = 1$ is called:', options: ['Elementary', 'Impossible', 'Sure', 'Compound'], correct: 2, explanation: 'Must occur.' },
            { question: 'Probability of getting a sum $< 13$ on two dice?', options: ['$0$', '$1$', '$\\frac{35}{36}$', '$0.5$'], correct: 1, explanation: 'Max sum is $12$, so $< 13$ is sure.' },
            { question: 'Probability of a month having $32$ days?', options: ['$0$', '$\\frac{1}{12}$', '$\\frac{31}{365}$', '$1$'], correct: 0, explanation: 'Impossible.' },
            { question: 'Which is a valid probability?', options: ['$-0.1$', '$1.5$', '$0.7$', '$3/2$'], correct: 2, explanation: 'Only $0.7$ is in $[0,1]$.' },
            { question: '$P(\\text{Square is a Rectangle})$?', options: ['$0$', '$1$', '$0.5$', 'None'], correct: 1, explanation: 'All squares are rectangles. Sure.' },
            { question: 'Probability of an event is $1.5$. This is:', options: ['Possible', 'Impossible', 'A sure event', 'None'], correct: 1, explanation: 'Invalid probability.' },
            { question: 'If $P(E) = 1$, then $E$ is:', options: ['Random', 'Sure', 'Impossible', 'Possible'], correct: 1, explanation: 'By definition.' },
            { question: 'Value of $P(\\text{Impossible}) + P(\\text{Sure})$?', options: ['$0$', '$1$', '$2$', '$0.5$'], correct: 1, explanation: '$0 + 1 = 1$.' },
            { question: 'Chance of a coin landing on neither Head nor Tail?', options: ['$0$', '$1$', '$0.5$', '$0.2$'], correct: 0, explanation: 'Impossible in ideal math.' }
        ],
        assessment: [
            { question: 'A die is thrown. $P(\\text{number} < 7)$?', options: ['$0$', '$1/2$', '$1$', '$\\frac{6}{7}$'], correct: 2, explanation: 'Sure event.' },
            { question: 'Bag with red marbles only. $P(\\text{blue})$?', options: ['$0$', '$1$', '$1/2$', 'None'], correct: 0, explanation: 'Impossible.' },
            { question: 'Which is NOT a valid probability?', options: ['$\\frac{3}{5}$', '$\\frac{5}{3}$', '$0\%$', '$0.1$'], correct: 1, explanation: '$\\frac{5}{3} > 1$.' },
            { question: '$P(\\text{vowel from "CD"})$?', options: ['$0$', '$1$', '$1/2$', '$2$'], correct: 0, explanation: 'No vowels here.' },
            { question: 'Sum of probabilities of an event and its complement?', options: ['$0$', '$1$', '$P(E)$', '$2$'], correct: 1, explanation: 'Always $1$.' },
            { question: '$P(\\text{Even} + \\text{Odd} = \\text{Odd})$ for integers?', options: ['$1$', '$0$', '$0.5$', 'None'], correct: 0, explanation: 'Sure event (Even+Odd is always Odd).' },
            { question: '$P(\\text{Rolling } 0 \\text{ on a standard die})$?', options: ['$0$', '$\\frac{1}{6}$', '$1$', 'None'], correct: 0, explanation: 'Impossible.' },
            { question: 'If $0 \le P(E) \le 1$ is false, then:', options: ['E is sure', 'Calculation is wrong', 'E is impossible', 'None'], correct: 1, explanation: 'Violates axioms.' },
            { question: 'Probability of getting $13$ in a single dice roll?', options: ['$0$', '$1$', '$1/13$', '$1/2$'], correct: 0, explanation: 'Impossible.' },
            { question: 'Sure event in percentage?', options: ['$50\%$', '$100\%$', '$0\%$', '$10\%$'], correct: 1, explanation: '$1.0 = 100\%$.' }
        ]
    },
    {
        id: 's6',
        title: 'Coins and Dice',
        subtitle: 'Classic Experiments',
        desc: 'Solve problems involving multiple coins and two dice.',
        color: '#10b981',
        icon: '🎲',
        learn: {
            concept: 'When throwing multiple items, the total outcomes multiply. Two coins have $4$ outcomes, two dice have $36$ outcomes.',
            rules: [
                {
                    title: 'Two Coins Sample Space',
                    f: 'S = \\{HH, HT, TH, TT\\}',
                    d: 'When two coins are tossed simultaneously, there are exactly $4$ outcomes.',
                    tip: 'Getting "at least one head" includes $HH, HT$, and $TH$.',
                    ex: 'P(\\text{Exactly 1 Head}) = \\frac{2}{4} = \\frac{1}{2}'
                },
                {
                    title: 'Two Dice Total Outcomes',
                    f: 'N = 6 \\times 6 = 36',
                    d: 'When two dice are thrown, the outcomes can be visualized as an ordered pair $(1,1)$ up to $(6,6)$.',
                    tip: 'A common question is finding the sum of the numbers on the two dice.',
                    ex: 'P(\\text{Doublets}) = \\frac{6}{36} = \\frac{1}{6}'
                }
            ]
        },
        practice: [
            { question: 'Sample space size for two coins?', options: ['$2$', '$4$', '$8$', '$16$'], correct: 1, explanation: '$2^2 = 4$.' },
            { question: 'Sample space size for two dice?', options: ['$6$', '$12$', '$36$', '$64$'], correct: 2, explanation: '$6 \times 6 = 36$.' },
            { question: 'Two coins: $P(\\text{exactly } 2 \\text{ heads})$?', options: ['$\\frac{1}{2}$', '$\\frac{1}{4}$', '$\\frac{3}{4}$', '$0$'], correct: 1, explanation: '$HH$ ($1$ outcome) / $4$.' },
            { question: 'Two coins: $P(\\text{at least } 1 \\text{ head})$?', options: ['$\\frac{1}{2}$', '$\\frac{1}{4}$', '$\\frac{3}{4}$', '$1$'], correct: 2, explanation: '$HH, HT, TH$ ($3$ outcomes) / $4$.' },
            { question: 'Two coins: $P(\\text{no heads})$?', options: ['$\\frac{1}{2}$', '$\\frac{1}{4}$', '$\\frac{3}{4}$', '$0$'], correct: 1, explanation: '$TT$ ($1$ outcome) / $4$.' },
            { question: 'Two dice: $P(\\text{sum is } 2)$?', options: ['$\\frac{1}{36}$', '$\\frac{1}{12}$', '$\\frac{1}{6}$', '$\\frac{2}{36}$'], correct: 0, explanation: '$(1,1)$ only.' },
            { question: 'Two dice: $P(\\text{sum is } 12)$?', options: ['$\\frac{1}{36}$', '$\\frac{1}{12}$', '$\\frac{1}{6}$', '$\\frac{2}{36}$'], correct: 0, explanation: '$(6,6)$ only.' },
            { question: 'Two dice: $P(\\text{sum is } 7)$?', options: ['$\\frac{1}{6}$', '$\\frac{1}{36}$', '$\\frac{5}{36}$', '$\\frac{7}{36}$'], correct: 0, explanation: '$(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)$. $\\frac{6}{36} = \\frac{1}{6}$.' },
            { question: 'Two dice: $P(\\text{doublets})$?', options: ['$\\frac{1}{6}$', '$\\frac{1}{36}$', '$\\frac{6}{36}$', 'Both A and C'], correct: 3, explanation: '$(1,1) \dots (6,6)$. $6$ outcomes.' },
            { question: 'Two dice: $P(\\text{sum} > 10)$?', options: ['$\\frac{3}{36}$', '$\\frac{1}{12}$', 'Both', '$\\frac{1}{18}$'], correct: 2, explanation: '$(5,6),(6,5),(6,6)$. $\\frac{3}{36} = \\frac{1}{12}$.' },
            { question: 'Three coins: Total outcomes?', options: ['$3$', '$6$', '$8$', '$9$'], correct: 2, explanation: '$2^3 = 8$.' },
            { question: 'Two coins tossed. $P(\\text{exactly } 1 \\text{ head})$?', options: ['$\\frac{1}{2}$', '$\\frac{1}{4}$', '$1$', '$0$'], correct: 0, explanation: '$HT, TH$. $\\frac{2}{4} = \\frac{1}{2}$.' },
            { question: 'Two dice. $P(\\text{sum is } 1)$?', options: ['$0$', '$\\frac{1}{36}$', '$\\frac{1}{12}$', '$1$'], correct: 0, explanation: 'Impossible. Min sum is $2$.' },
            { question: 'Two dice. $P(\\text{product is } 1)$?', options: ['$\\frac{1}{36}$', '$\\frac{1}{6}$', '$0$', '$1$'], correct: 0, explanation: '$(1,1)$ only.' },
            { question: 'Two dice. $P(\\text{product is prime})$?', options: ['$\\frac{6}{36}$', '$\\frac{1}{6}$', 'Both', '$\\frac{4}{36}$'], correct: 2, explanation: '$(1,2),(2,1),(1,3),(3,1),(1,5),(5,1)$. $6$ outcomes.' },
            { question: 'Two dice reached sum $11$. Prob?', options: ['$\\frac{2}{36}$', '$\\frac{1}{18}$', 'Both', '$\\frac{1}{12}$'], correct: 2, explanation: '$(5,6),(6,5)$.' },
            { question: 'Total outcomes for $3$ balanced dice?', options: ['$18$', '$216$', '$36$', '$100$'], correct: 1, explanation: '$6 \times 6 \times 6 = 216$.' },
            { question: 'Two coins. $P(\\text{at most } 1 \\text{ head})$?', options: ['$\\frac{3}{4}$', '$\\frac{1}{4}$', '$\\frac{1}{2}$', '$1$'], correct: 0, explanation: '$TT, HT, TH$ ($3$ outcomes).' },
            { question: 'Two dice. Difference is $0$ probability?', options: ['$\\frac{1}{6}$', '$\\frac{1}{36}$', '$\\frac{1}{2}$', 'None'], correct: 0, explanation: 'Same as doublets. $\\frac{6}{36} = \\frac{1}{6}$.' },
            { question: 'Two coins. $P(\\text{heads on both})$?', options: ['$\\frac{1}{4}$', '$\\frac{1}{2}$', '$\\frac{3}{4}$', '$1$'], correct: 0, explanation: '$HH$ only.' }
        ],
        assessment: [
            { question: 'Two coins: $P(\\text{exactly } 2 \\text{ tails})$?', options: ['$\\frac{1}{4}$', '$\\frac{1}{2}$', '$\\frac{3}{4}$', '$0$'], correct: 0, explanation: '$TT$ only.' },
            { question: 'Two dice: $P(\\text{sum is } 5)$?', options: ['$\\frac{4}{36}$', '$\\frac{1}{9}$', 'Both', '$\\frac{1}{6}$'], correct: 2, explanation: '$(1,4),(2,3),(3,2),(4,1)$.' },
            { question: 'Three coins: $P(\\text{all heads})$?', options: ['$\\frac{1}{8}$', '$\\frac{3}{8}$', '$\\frac{7}{8}$', '$\\frac{1}{4}$'], correct: 0, explanation: '$HHH$ only.' },
            { question: 'Two dice: $P(\\text{sum is an even number})$?', options: ['$\\frac{1}{2}$', '$\\frac{18}{36}$', 'Both', '$\\frac{1}{3}$'], correct: 2, explanation: 'Half the sums are even.' },
            { question: 'Two dice: $P(\\text{sum is prime})$?', options: ['$\\frac{15}{36}$', '$\\frac{5}{12}$', 'Both', '$\\frac{1}{2}$'], correct: 2, explanation: 'Sums $2,3,5,7,11$: $1+2+4+6+2 = 15$ outcomes.' },
            { question: 'Two dice: $P(\\text{sum} < 4)$?', options: ['$\\frac{3}{36}$', '$\\frac{1}{12}$', 'Both', '$\\frac{1}{6}$'], correct: 2, explanation: 'Sums $2,3$: $(1,1),(1,2),(2,1)$. $3$ outcomes.' },
            { question: 'Two coins: $P(\\text{Head on first coin})$?', options: ['$\\frac{1}{2}$', '$\\frac{2}{4}$', 'Both', '$\\frac{1}{4}$'], correct: 2, explanation: '$HH, HT$. $\\frac{2}{4} = \\frac{1}{2}$.' },
            { question: 'Three coins: $P(\\text{at least } 2 \\text{ heads})$?', options: ['$\\frac{1}{2}$', '$\\frac{4}{8}$', 'Both', '$\\frac{3}{8}$'], correct: 2, explanation: '$HHH, HHT, HTH, THH$. $4$ outcomes.' },
            { question: 'Two dice: $P(\\text{sum is } 13)$?', options: ['$0$', '$\\frac{1}{36}$', '$1$', 'None'], correct: 0, explanation: 'Impossible.' },
            { question: 'Two dice: $P(\\text{product is } 36)$?', options: ['$\\frac{1}{36}$', '$\\frac{6}{36}$', '$\\frac{1}{6}$', 'None'], correct: 0, explanation: '$(6,6)$ only.' }
        ]
    },
    {
        id: 's7',
        title: 'Playing Cards',
        subtitle: 'Deck of 52',
        desc: 'Understand the structure of a standard deck of cards to solve probabilities.',
        color: '#dc2626',
        icon: '🃏',
        learn: {
            concept: 'A standard deck has $52$ cards, divided into $4$ suits of $13$ cards each: Hearts, Diamonds (Red), Spades, Clubs (Black).',
            rules: [
                {
                    title: 'Deck Structure',
                    f: '\\text{52 Cards = 26 Red + 26 Black}',
                    d: 'Each suit has $1$ Ace, numbers $2$-$10$, and $3$ Face cards (Jack, Queen, King).',
                    tip: 'An Ace is NOT considered a face card in standard probability contexts.',
                    ex: '\\text{Total Face Cards } = 4 \\times 3 = 12'
                }
            ]
        },
        practice: [
            { question: 'Total cards in a standard deck?', options: ['$48$', '$50$', '$52$', '$54$'], correct: 2, explanation: 'Standard deck has $52$ cards.' },
            { question: 'How many suits in a deck?', options: ['$2$', '$4$', '$13$', '$52$'], correct: 1, explanation: 'Hearts, Diamonds, Spades, Clubs.' },
            { question: '$P(\\text{Ace})$ from a deck?', options: ['$\\frac{1}{52}$', '$\\frac{1}{13}$', '$\\frac{4}{52}$', 'Both B and C'], correct: 3, explanation: '$4$ Aces out of $52$.' },
            { question: 'How many red cards in a deck?', options: ['$13$', '$26$', '$39$', '$52$'], correct: 1, explanation: 'Hearts and Diamonds ($13$ each).' },
            { question: '$P(\\text{Red card})$ from a deck?', options: ['$\\frac{1}{2}$', '$\\frac{1}{4}$', '$\\frac{26}{52}$', 'Both A and C'], correct: 3, explanation: '$\\frac{26}{52} = \\frac{1}{2}$.' },
            { question: 'How many face cards in a deck?', options: ['$3$', '$4$', '$12$', '$16$'], correct: 2, explanation: 'J, Q, K in $4$ suits.' },
            { question: '$P(\\text{Face card})$ from a deck?', options: ['$\\frac{12}{52}$', '$\\frac{3}{13}$', 'Both', '$\\frac{4}{13}$'], correct: 2, explanation: '$\\frac{12}{52} = \\frac{3}{13}$.' },
            { question: '$P(\\text{Red King})$?', options: ['$\\frac{1}{52}$', '$\\frac{2}{52}$', '$\\frac{1}{26}$', 'Both B and C'], correct: 3, explanation: 'K of Hearts and K of Diamonds.' },
            { question: '$P(\\text{Spade Ace})$?', options: ['$\\frac{1}{52}$', '$\\frac{1}{13}$', '$\\frac{4}{52}$', '$\\frac{1}{4}$'], correct: 0, explanation: 'Exactly one card.' },
            { question: 'How many Spades in a deck?', options: ['$1$', '$4$', '$13$', '$26$'], correct: 2, explanation: '$13$ cards per suit.' },
            { question: '$P(\\text{Club card})$?', options: ['$\\frac{1}{4}$', '$\\frac{13}{52}$', 'Both', '$\\frac{1}{13}$'], correct: 2, explanation: '$\\frac{13}{52} = \\frac{1}{4}$.' },
            { question: '$P(\\text{not an Ace})$?', options: ['$\\frac{48}{52}$', '$\\frac{12}{13}$', 'Both', '$\\frac{1}{13}$'], correct: 2, explanation: '$1 - \\frac{1}{13} = \\frac{12}{13}$.' },
            { question: '$P(\\text{Red Face card})$?', options: ['$\\frac{6}{52}$', '$\\frac{3}{26}$', 'Both', '$\\frac{12}{52}$'], correct: 2, explanation: '$3$ red face cards per red suit.' },
            { question: '$P(\\text{numbered card})$?', options: ['$\\frac{36}{52}$', '$\\frac{40}{52}$', '$\\frac{9}{13}$', 'Both A and C'], correct: 3, explanation: 'Numbered $2$-$10$ ($9$ cards) per suit.' },
            { question: '$P(\\text{King or Queen})$?', options: ['$\\frac{8}{52}$', '$\\frac{2}{13}$', 'Both', '$\\frac{1}{13}$'], correct: 2, explanation: '$4$ Kings + $4$ Queens.' },
            { question: '$P(\\text{Black Jack})$?', options: ['$\\frac{2}{52}$', '$\\frac{1}{26}$', 'Both', '$\\frac{4}{52}$'], correct: 2, explanation: 'Jack of Spades and Clubs.' },
            { question: '$P(\\text{Heart or Diamond})$?', options: ['$\\frac{1}{2}$', '$\\frac{26}{52}$', 'Both', '$\\frac{1}{4}$'], correct: 2, explanation: 'All red cards.' },
            { question: '$P(\\text{neither Heart nor Spade})$?', options: ['$\\frac{1}{2}$', '$\\frac{1}{4}$', '$\\frac{26}{52}$', 'Both A and C'], correct: 3, explanation: 'Remaining are Diamonds and Clubs.' },
            { question: '$P(\\text{Card numbered } 10)$?', options: ['$\\frac{4}{52}$', '$\\frac{1}{13}$', 'Both', '$\\frac{1}{52}$'], correct: 2, explanation: 'One $10$ in each of $4$ suits.' },
            { question: '$P(\\text{King of Spades})$?', options: ['$\\frac{1}{52}$', '$\\frac{1}{13}$', '$\\frac{4}{52}$', '$0$'], correct: 0, explanation: 'One specific card.' }
        ],
        assessment: [
            { question: '$P(\\text{Red card})$ from a standard deck?', options: ['$\\frac{1}{2}$', '$\\frac{1}{4}$', '$\\frac{13}{52}$', '$0$'], correct: 0, explanation: '$\\frac{26}{52} = \\frac{1}{2}$.' },
            { question: '$P(\\text{Jack of Hearts})$?', options: ['$\\frac{1}{52}$', '$\\frac{4}{52}$', '$\\frac{1}{13}$', '$\\frac{1}{4}$'], correct: 0, explanation: 'Only one such card.' },
            { question: '$P(\\text{Face card})$?', options: ['$\\frac{3}{13}$', '$\\frac{12}{52}$', 'Both', '$\\frac{4}{13}$'], correct: 2, explanation: '$12$ out of $52$.' },
            { question: '$P(\\text{number } 7)$?', options: ['$\\frac{4}{52}$', '$\\frac{1}{13}$', 'Both', '$\\frac{1}{52}$'], correct: 2, explanation: '$4$ such cards.' },
            { question: '$P(\\text{Black card})$?', options: ['$\\frac{1}{2}$', '$\\frac{26}{52}$', 'Both', '$\\frac{1}{4}$'], correct: 2, explanation: '$2$ suits of each color.' },
            { question: '$P(\\text{Queen of Spades or King of Diamonds})$?', options: ['$\\frac{2}{52}$', '$\\frac{1}{26}$', 'Both', '$\\frac{4}{52}$'], correct: 2, explanation: '$2$ specific cards.' },
            { question: '$P(\\text{Heart})$?', options: ['$\\frac{13}{52}$', '$\\frac{1}{4}$', 'Both', '$\\frac{1}{2}$'], correct: 2, explanation: '$13$ out of $52$.' },
            { question: '$P(\\text{Black Ace})$?', options: ['$\\frac{2}{52}$', '$\\frac{1}{26}$', 'Both', '$\\frac{4}{52}$'], correct: 2, explanation: 'Spade Ace, Club Ace.' },
            { question: '$P(\\text{Red Face card})$?', options: ['$\\frac{6}{52}$', '$\\frac{3}{26}$', 'Both', '$\\frac{1}{2}$'], correct: 2, explanation: '$3$ in Hearts, $3$ in Diamonds.' },
            { question: '$P(\\text{Ace, King, or Queen})$?', options: ['$\\frac{12}{52}$', '$\\frac{3}{13}$', 'Both', '$\\frac{1}{4}$'], correct: 2, explanation: '$3$ ranks $\times 4$ cards.' }
        ]
    },
    {
        id: 's8',
        title: 'Real-Life Selections',
        subtitle: 'Marbles and Jars',
        desc: 'Calculate probabilities involving drawing items out of a container.',
        color: '#06b6d4',
        icon: '🔮',
        learn: {
            concept: 'Selection problems involve finding the probability of picking specific objects (like balls or marbles) from a randomly mixed container.',
            rules: [
                {
                    title: 'Total Object Count',
                    f: 'N = \\text{Item}_1 + \\text{Item}_2 + \\dots + \\text{Item}_k',
                    d: 'Your first step is always to sum the total number of items in the container to find the denominator.',
                    tip: 'Watch out for "without replacement" wording in advanced problems, but standard $10$th grade focuses on a single draw.',
                    ex: '\\text{3 Red, 2 Blue } \\rightarrow \\text{ Total = 5}'
                }
            ]
        },
        practice: [
            { question: 'Bag with $3$ red, $5$ black balls. $P(\\text{red})$?', options: ['$\\frac{3}{8}$', '$\\frac{5}{8}$', '$\\frac{3}{5}$', '$1$'], correct: 0, explanation: '$3$ out of $8$.' },
            { question: 'Box with $10$ defective, $90$ good bulbs. $P(\\text{defective})$?', options: ['$\\frac{10}{90}$', '$\\frac{1}{10}$', '$\\frac{10}{100}$', 'Both B and C'], correct: 3, explanation: '$10$ out of $100$.' },
            { question: 'Lottery with $5$ prizes, $20$ blanks. $P(\\text{prize})$?', options: ['$\\frac{5}{20}$', '$\\frac{1}{5}$', '$\\frac{5}{25}$', 'Both B and C'], correct: 3, explanation: '$\\frac{5}{25} = \\frac{1}{5}$.' },
            { question: '$P(\\text{not prize})$?', options: ['$\\frac{20}{25}$', '$\\frac{4}{5}$', 'Both', '$\\frac{1}{5}$'], correct: 2, explanation: '$20$ out of $25$.' },
            { question: 'Bag with marbles $1$-$10$. $P(\\text{prime})$?', options: ['$\\frac{4}{10}$', '$\\frac{2}{5}$', 'Both', '$\\frac{3}{10}$'], correct: 2, explanation: '$2, 3, 5, 7$.' },
            { question: '$P(\\text{even})$ from $1$-$10$?', options: ['$\\frac{1}{2}$', '$\\frac{5}{10}$', 'Both', '$\\frac{1}{5}$'], correct: 2, explanation: '$2, 4, 6, 8, 10$.' },
            { question: '$P(\\text{multiple of } 3)$ from $1$-$10$?', options: ['$\\frac{3}{10}$', '$\\frac{1}{3}$', '$\\frac{2}{10}$', '$0$'], correct: 0, explanation: '$3, 6, 9$.' },
            { question: 'Box with $15$ eggs, $3$ bad. $P(\\text{good})$?', options: ['$\\frac{12}{15}$', '$\\frac{4}{5}$', 'Both', '$\\frac{3}{15}$'], correct: 2, explanation: '$12$ good out of $15$.' },
            { question: '$P(\\text{bad})$ from $15$ eggs?', options: ['$\\frac{3}{15}$', '$\\frac{1}{5}$', 'Both', '$\\frac{12}{15}$'], correct: 2, explanation: '$3$ bad out of $15$.' },
            { question: 'Meeting: $5$ men, $10$ women. $P(\\text{woman})$?', options: ['$\\frac{10}{15}$', '$\\frac{2}{3}$', 'Both', '$\\frac{1}{3}$'], correct: 2, explanation: '$10$ out of $15$.' },
            { question: 'Class of $40$. $25$ like math. $P(\\text{dislike})$?', options: ['$\\frac{15}{40}$', '$\\frac{3}{8}$', 'Both', '$\\frac{25}{40}$'], correct: 2, explanation: '$15$ out of $40$.' },
            { question: '$P(\\text{like math})$?', options: ['$\\frac{25}{40}$', '$\\frac{5}{8}$', 'Both', '$\\frac{3}{8}$'], correct: 2, explanation: '$25$ out of $40$.' },
            { question: 'Jar with $20$ sweets, $4$ sour. $P(\\text{sweet})$?', options: ['$\\frac{16}{20}$', '$\\frac{4}{5}$', 'Both', 'None'], correct: 2, explanation: '$16$ non-sour sweets.' },
            { question: 'Letters in "PROBABILITY". $P(B)$?', options: ['$\\frac{2}{11}$', '$\\frac{1}{11}$', '$\\frac{2}{10}$', 'None'], correct: 0, explanation: 'Two $B$s in $11$ letters.' },
            { question: '$P(\\text{vowel from "HELLO"})$?', options: ['$\\frac{2}{5}$', '$0.4$', 'Both', 'None'], correct: 2, explanation: '$E, O$.' },
            { question: 'Set of $50$ cards numbered $1$-$50$. $P(\\text{multiple of } 10)$?', options: ['$\\frac{5}{50}$', '$\\frac{1}{10}$', 'Both', 'None'], correct: 2, explanation: '$10, 20, 30, 40, 50$.' },
            { question: '$P(\\text{square number})$ from $1$-$50$?', options: ['$\\frac{7}{50}$', '$0.14$', 'Both', 'None'], correct: 2, explanation: '$1, 4, 9, 16, 25, 36, 49$.' },
            { question: '$P(\\text{factor of } 6)$?', options: ['$\\frac{4}{10}$', '$\\frac{2}{5}$', 'Both', 'None'], correct: 2, explanation: '$1, 2, 3, 6$.' },
            { question: 'Drawing $1$ ball from $100$. $P(\\text{not } 100)$?', options: ['$\\frac{99}{100}$', '$0.99$', 'Both', 'None'], correct: 2, explanation: '$99$ outcomes.' },
            { question: '$P(\\text{last digit is } 0)$ in $1$-$100$?', options: ['$\\frac{10}{100}$', '$\\frac{1}{10}$', 'Both', 'None'], correct: 2, explanation: '$10, 20 \dots 100$.' }
        ],
        assessment: [
            { question: 'Defective bulbs: $12$ in $144$. $P(\\text{good})$?', options: ['$\\frac{132}{144}$', '$\\frac{11}{12}$', 'Both', '$\\frac{1}{12}$'], correct: 2, explanation: '$132$ good.' },
            { question: '$P(\\text{winning}) = 0.007$. $P(\\text{losing})$?', options: ['$0.993$', '$0.007$', '$1$', '$0$'], correct: 0, explanation: '$1 - 0.007$.' },
            { question: 'Bag with $5$ red, $8$ white, $4$ green balls. $P(\\text{not white})$?', options: ['$\\frac{9}{17}$', '$\\frac{8}{17}$', '$1$', '$0$'], correct: 0, explanation: '$5+4 = 9$.' },
            { question: '$P(\\text{red or green})$?', options: ['$\\frac{9}{17}$', '$1/2$', '$\\frac{8}{17}$', 'None'], correct: 0, explanation: 'Same as not white.' },
            { question: 'Numbers $1$-$25$. $P(\\text{prime})$?', options: ['$\\frac{9}{25}$', '$0.36$', 'Both', '$\\frac{8}{25}$'], correct: 2, explanation: '$2, 3, 5, 7, 11, 13, 17, 19, 23$.' },
            { question: '$P(\\text{multiple of } 5)$ from $1$-$25$?', options: ['$\\frac{5}{25}$', '$\\frac{1}{5}$', 'Both', 'None'], correct: 2, explanation: '$5, 10, 15, 20, 25$.' },
            { question: '$P(\\text{sum of digits is } 9)$ from $1$-$100$?', options: ['$\\frac{10}{100}$', '$\\frac{9}{100}$', '$\\frac{1}{10}$', 'None'], correct: 1, explanation: '$9, 18, 27, 36, 45, 54, 63, 72, 81, 90$. $10$ outcomes.' },
            { question: '$P(\\text{vowel from word "SUCCESS"})$?', options: ['$\\frac{2}{7}$', '$\\frac{3}{7}$', '$\\frac{1}{7}$', 'None'], correct: 0, explanation: '$U, E$.' },
            { question: '$P(\\text{perfect cube})$ from $1$-$100$?', options: ['$\\frac{4}{100}$', '$\\frac{1}{25}$', 'Both', 'None'], correct: 2, explanation: '$1, 8, 27, 64$.' },
            { question: '$P(\\text{composite number})$ from $1$-$10$?', options: ['$\\frac{5}{10}$', '$\\frac{1}{2}$', 'Both', '$\\frac{4}{10}$'], correct: 2, explanation: '$4, 6, 8, 9, 10$.' }
        ]
    }
];
