import {
    generateTopic1Questions,
    generateTopic2Questions,
    generateTopic3Questions,
    generateTopic4Questions,
    generateTopic5Questions,
} from './integersQuestions';

export const SKILLS = [
    {
        id: 'add-sub-properties',
        nodeId: 'a4071001-0001-0000-0000-000000000000',
        title: 'Properties of Addition & Subtraction',
        subtitle: 'Main Topic 1',
        icon: '➕',
        color: '#6366f1',
        desc: 'Understand Closure, Commutative, and Associative properties for addition and subtraction.',
        practice: generateTopic1Questions(),
        assessment: generateTopic1Questions(), // For simplicity, we can use same generator for assessment
        learn: {
            concept: 'Integers behave according to specific rules when added or subtracted.',
            rules: [
                { title: 'Closure (Add/Sub)', f: 'a+b = \\text{Integer}', d: 'Adding or subtracting two integers always gives another integer. The "Integer Family" is closed.', ex: '-3 + 7 = 4 \\text{ (Integer)}', tip: 'No fractions or decimals sneak in!' },
                { title: 'Commutative (Add)', f: 'a+b = b+a', d: 'You can swap the order of addition and get the same sum. (Does NOT work for subtraction!).', ex: '5 + (-2) = -2 + 5', tip: 'Commute means to move around freely.' },
                { title: 'Associative (Add)', f: '(a+b)+c = a+(b+c)', d: 'How you group integers being added doesn\'t change the result.', ex: '(1+2)+3 = 1+(2+3)', tip: 'Parentheses can shift without changing the sum.' },
                { title: 'Additive Identity', f: 'a+0 = a', d: 'Zero added to any number keeps its identity the same.', ex: '-8 + 0 = -8', tip: 'Zero changes nothing.' },
            ]
        }
    },
    {
        id: 'multiplication',
        nodeId: 'a4071001-0002-0000-0000-000000000000',
        title: 'Multiplication of Integers',
        subtitle: 'Main Topic 2',
        icon: '✖️',
        color: '#0891b2',
        desc: 'Master the rules of signs for multiplying integers.',
        practice: generateTopic2Questions(),
        assessment: generateTopic2Questions(),
        learn: {
            concept: 'Multiplication with negative numbers follows strict "Rules of Signs".',
            rules: [
                { title: 'Positive \\times Negative', f: '(+)\\times(-) = (-)', d: 'Multiplying numbers with DIFFERENT signs always gives a NEGATIVE result.', ex: '4 \\times (-3) = -12', tip: 'A good action (+) to a bad person (-) is bad (-).' },
                { title: 'Negative \\times Negative', f: '(-)\\times(-) = (+)', d: 'Multiplying numbers with the SAME signs always gives a POSITIVE result.', ex: '-5 \\times -2 = 10', tip: 'A bad action (-) to a bad person (-) is good (+).' },
            ]
        }
    },
    {
        id: 'multiplication-properties',
        nodeId: 'a4071001-0003-0000-0000-000000000000',
        title: 'Properties of Multiplication',
        subtitle: 'Main Topic 3',
        icon: '🔗',
        color: '#f59e0b',
        desc: 'Discover how zero, one, and distribution work with multiplication.',
        practice: generateTopic3Questions(),
        assessment: generateTopic3Questions(),
        learn: {
            concept: 'Like addition, multiplication has properties that make solving equations much easier.',
            rules: [
                { title: 'Closure & Commutative', f: 'ab = \\text{Int}, a\\times b=b\\times a', d: 'Multiplying integers yields integers. Order doesn\'t matter.', ex: '-4 \\times 5 = 5 \\times -4', tip: 'You can always flip multiplication around.' },
                { title: 'Zero & Identity', f: 'a\\times0=0, a\\times1=a', d: 'Zero makes everything zero. One changes nothing.', ex: '7 \\times 0 = 0, -9 \\times 1 = -9', tip: '1 is a mirror, 0 is a black hole!' },
                { title: 'Associative', f: '(ab)c = a(bc)', d: 'Group your multiplications however you want.', ex: '(2\\times3)\\times4 = 2\\times(3\\times4)', tip: 'Find the easiest pairs to multiply first.' },
                { title: 'Distributive', f: 'a(b+c) = ab+ac', d: 'Multiply the outside term by every term inside the parentheses.', ex: '2(3+4) = (2\\times3) + (2\\times4)', tip: 'Distribute the wealth equally!' },
            ]
        }
    },
    {
        id: 'division',
        nodeId: 'a4071001-0004-0000-0000-000000000000',
        title: 'Division of Integers',
        subtitle: 'Main Topic 4',
        icon: '➗',
        color: '#8b5cf6',
        desc: 'Learn division as the exact inverse of multiplication.',
        practice: generateTopic4Questions(),
        assessment: generateTopic4Questions(),
        learn: {
            concept: 'Division of integers uses the EXACT SAME rules of signs as multiplication!',
            rules: [
                { title: 'Same Signs', f: '(+) \\div (+) = (+)', d: 'Dividing two positive or two negative integers gives a POSITIVE result', ex: '-15 \\div -3 = 5', tip: 'Same signs -> Positive answer.' },
                { title: 'Different Signs', f: '(+) \\div (-) = (-)', d: 'Dividing mixed signs always gives a NEGATIVE result', ex: '20 \\div -4 = -5', tip: 'Mixed signs -> Negative answer.' },
                { title: 'Inverse Operation', f: 'ab=c \\rightarrow c/a=b', d: 'Division is just asking "what number multiplies to get this?".', ex: 'Since 3(-4)=-12, -12/3=-4', tip: 'Use multiplication to check your division!' },
            ]
        }
    },
    {
        id: 'division-properties',
        nodeId: 'a4071001-0005-0000-0000-000000000000',
        title: 'Properties of Division',
        subtitle: 'Main Topic 5',
        icon: '⚠️',
        color: '#ef4444',
        desc: 'Find out why division breaks all the nice properties.',
        practice: generateTopic5Questions(),
        assessment: generateTopic5Questions(),
        learn: {
            concept: 'Unlike Addition and Multiplication, Division is very strictly ordered and breaks the patterns!',
            rules: [
                { title: 'Not Closed', f: 'a/b = \\text{Maybe Fraction}', d: 'Dividing integers doesn\'t always give an integer.', ex: '5 \\div 2 = 2.5 \\text{ (not integer)}', tip: 'Integers are not closed under division.' },
                { title: 'Not Commutative', f: 'a/b \\neq b/a', d: 'You CANNOT swap the order in division.', ex: '10 \\div 5 \\neq 5 \\div 10', tip: 'Be very careful with ordering.' },
                { title: 'Division by Zero', f: 'a/0 = \\text{Undefined}', d: 'Dividing by zero is impossible. It breaks math!', ex: '7 / 0 = \\text{Meaningless}', tip: '0 on the bottom is a BIG RED FLAG.' },
            ]
        }
    }
];
