import { genSkill1Q, genSkill1A, genSkill2Q, genSkill2A } from './LCMSkillsData_Part1';
import { genSkill3Q, genSkill3A } from './LCMSkillsData_Part2';

export const SKILLS = [
    {
        id: 'finding_lcm',
        title: 'Finding the LCM',
        subtitle: 'Core Calculation',
        icon: '🔢',
        color: '#0ea5e9',
        desc: 'Master the listing and prime factorization methods to find LCMs quickly.',
        practice: genSkill1Q,
        assessment: genSkill1A,
        learn: {
            concept: 'The LCM of two numbers is the smallest number they both divide into evenly. Finding it requires understanding multiples and prime factors.',
            rules: [
                { title: 'Listing Method', f: '\\text{List multiples until overlap}', d: 'Write out the multiples of each number and identify the first one they share.', ex: 'Multiples of $4$: 4, 8, $\\mathbf{12}$... Multiples of $6$: 6, $\\mathbf{12}$...', tip: 'Start with multiples of the larger number for speed!' },
                { title: 'Prime Factor Method', f: '\\text{LCM} = \\prod \\text{highest powers}', d: 'Factor both numbers into primes. Take the highest power of every prime in the mix.', ex: '$12 = 2^2 \\times 3$ and $18 = 2 \\times 3^2$, so LCM $= 2^2 \\times 3^2 = 36$.', tip: 'This method works perfectly for ANY set of numbers, not just pairs.' }
            ]
        }
    },
    {
        id: 'lcm_applications',
        title: 'LCM Applications',
        subtitle: 'Word Problems',
        icon: '🌍',
        color: '#22c55e',
        desc: 'Apply LCM to solve real-world scheduling and synchronization problems.',
        practice: genSkill2Q,
        assessment: genSkill2A,
        learn: {
            concept: 'LCM shows up whenever two repeating cycles need to sync up — like bus schedules, flashing lights, or gear rotations.',
            rules: [
                { title: 'Synchronization Problems', f: '\\text{LCM}(a, b) = \\text{first sync}', d: 'When two events happen at different intervals, they will coincide at the LCM of those intervals.', ex: 'Bus A every 8 mins, Bus B every 12 mins → Both depart together every $\\text{LCM}(8,12) = 24$ mins.', tip: 'These are the most common LCM word problems on all exams!' },
                { title: 'The HCF Shortcut', f: '\\text{LCM}(a,b) = \\frac{a \\times b}{\\text{HCF}(a,b)}', d: 'If you already know the HCF of two numbers, you can instantly compute the LCM using this formula.', ex: '$\\text{LCM}(12, 18) = \\frac{12 \\times 18}{6} = 36$.', tip: 'This is a huge time-saver on timed assessments!' }
            ]
        }
    },
    {
        id: 'fundamental_operations',
        title: 'Fundamental Operations',
        subtitle: 'Multi-set Calculations',
        icon: '🧮',
        color: '#f59e0b',
        desc: 'Master calculating LCM for sets of two or three numbers and solve using the HCF relation with 20 dynamic challenges.',
        practice: genSkill3Q,
        assessment: genSkill3A,
        learn: {
            concept: 'Going beyond simple pairs, LCM operations involve finding the common overlap for three or more sequences. The relationship between LCM and HCF is also a fundamental tool for mathematicians.',
            rules: [
                {
                    title: 'LCM of Three Numbers',
                    f: '\\text{LCM}(a, b, c) = \\text{LCM}(a, \\text{LCM}(b, c))',
                    d: 'To find the LCM of three numbers, first find the LCM of two, then find the LCM of that result and the third number.',
                    ex: '$\\text{LCM}(2, 3, 4) \\Rightarrow \\text{LCM}(2, 3) = 6 \\Rightarrow \\text{LCM}(6, 4) = 12$.',
                    tip: 'Alternatively, list multiples of the largest number until all three divide into it!'
                },
                {
                    title: 'The Great Product Rule',
                    f: 'a \\times b = \\text{LCM}(a,b) \\times \\text{HCF}(a,b)',
                    d: 'The product of two numbers is exactly equal to the product of their LCM and HCF.',
                    ex: 'If $a=4, b=6$, then $4 \times 6 = 24$. Their LCM is 12 and HCF is 2. $12 \times 2 = 24$.',
                    tip: 'This is great for finding HCF if you already know LCM (HCF = Product / LCM).'
                },
                {
                    title: 'Prime Power Rule (Advanced)',
                    f: '2^2 \\times 3^1 vs 2^1 \\times 3^2',
                    d: 'For LCM, always choose the HIGHEST power of every prime factor involved.',
                    ex: '$2^2 \\times 3$ and $2 \\times 3^2 \\Rightarrow$ LCM is $2^2 \\times 3^2 = 36$.',
                    tip: 'Think of LCM as the "Greediest" operator—it takes the most of everything.'
                },
                {
                    title: 'Real World Frequency',
                    f: '\\text{F}_1, \\text{F}_2 \\Rightarrow \\text{LCM}(\\text{F}_1, \\text{F}_2)',
                    d: 'LCM is used to predict when two cyclical events will align again.',
                    ex: 'Planets aligning, bus schedule synchronization, or common gear rotations.',
                    tip: 'Any problem asking "When will they next happen at the same time?" is an LCM problem.'
                }
            ]
        }
    }
];
