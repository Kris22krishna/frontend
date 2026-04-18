import React from 'react';
import TerminologyFractionInteractive from './Interactives/TerminologyFractionInteractive';
import TerminologyNumeratorInteractive from './Interactives/TerminologyNumeratorInteractive';
import TerminologyDenominatorInteractive from './Interactives/TerminologyDenominatorInteractive';
import TerminologyEquivalentInteractive from './Interactives/TerminologyEquivalentInteractive';
import TerminologySimplestFormInteractive from './Interactives/TerminologySimplestFormInteractive';

export const terminologyDocs = [
    {
        id: 'fraction',
        name: 'Fraction',
        def: 'A number representing a part of a whole or a collection. It indicates how many equal parts of a certain size there are.',
        ex: '\\frac{3}{4} \\text{ (Three quarters)}',
        color: '#f59e0b',
        interactiveWidget: <TerminologyFractionInteractive />
    },
    {
        id: 'numerator',
        name: 'Numerator',
        def: 'The top number in a fraction. It shows how many equal parts of the whole are being considered or used.',
        ex: '\\text{In } \\frac{5}{8}, \\text{ 5 is the numerator.}',
        color: '#10b981',
        interactiveWidget: <TerminologyNumeratorInteractive />
    },
    {
        id: 'denominator',
        name: 'Denominator',
        def: 'The bottom number in a fraction. It shows the total number of equal parts the whole has been divided into.',
        ex: '\\text{In } \\frac{5}{8}, \\text{ 8 is the denominator.}',
        color: '#3b82f6',
        interactiveWidget: <TerminologyDenominatorInteractive />
    },
    {
        id: 'equivalent',
        name: 'Equivalent Fractions',
        def: 'Fractions that look different but represent the exactly same value or proportion of the whole.',
        ex: '\\frac{1}{2} = \\frac{2}{4} = \\frac{4}{8}',
        color: '#8b5cf6',
        interactiveWidget: <TerminologyEquivalentInteractive />
    },
    {
        id: 'simplest',
        name: 'Simplest Form',
        def: 'A fraction where the numerator and denominator have no common factors other than 1.',
        ex: '\\frac{4}{8} \\rightarrow \\text{ simplifies to } \\frac{1}{2}',
        color: '#ec4899',
        interactiveWidget: <TerminologySimplestFormInteractive />
    }
];

export const terminologyQuiz = [
    {
        question: "What is the top number of a fraction called?",
        options: ["Denominator", "Equivalent", "Numerator"],
        correct: 2,
        explanation: "The **Numerator** is the number on top."
    },
    {
        question: "In the fraction $$\\frac{3}{7}$$, what does the number 7 represent?",
        options: ["The number of parts we have", "The total number of equal parts in the whole", "An equivalent fraction"],
        correct: 1,
        explanation: "The bottom number is the **denominator**, which tells us how many equal parts the whole is divided into."
    },
    {
        question: "Which of the following describes two fractions pointing to the exact same amount?",
        options: ["Equivalent Fractions", "Common Fractions", "Simplest Form"],
        correct: 0,
        explanation: "**Equivalent fractions** have the same value, even if they use different numbers."
    },
    {
        question: "Is $$\\frac{5}{10}$$ in its simplest form?",
        options: ["Yes", "No"],
        correct: 1,
        explanation: "No. Both 5 and 10 can be divided by 5, so its simplest form is $$\\frac{1}{2}$$."
    },
    {
        question: "If a pizza is cut into 8 equal slices and you eat 3, what is the numerator of the fraction you ate?",
        options: ["8", "3", "5"],
        correct: 1,
        explanation: "You ate 3 parts, so the top number (numerator) is 3."
    },
    {
        question: "The fraction $$\\frac{6}{8}$$ can be simplified to:",
        options: ["$$\\frac{3}{4}$$", "$$\\frac{4}{6}$$", "$$\\frac{1}{2}$$"],
        correct: 0,
        explanation: "Divide both 6 and 8 by their common factor 2 to get $$\\frac{3}{4}$$."
    },
    {
        question: "What does the Latin word 'fractio' mean?",
        options: ["To multiply", "To add", "To break"],
        correct: 2,
        explanation: "'Fractio' means 'to break' or create parts of a whole."
    },
    {
        question: "True or False: $$\\frac{2}{3}$$ and $$\\frac{4}{6}$$ are Equivalent Fractions.",
        options: ["True", "False"],
        correct: 0,
        explanation: "True! If you multiply the numerator and denominator of $$\\frac{2}{3}$$ by 2, you get $$\\frac{4}{6}$$."
    },
    {
        question: "If you have the fraction $$\\frac{7}{4}$$, what type of fraction is it?",
        options: ["Proper Fraction", "Mixed Fraction", "Improper Fraction"],
        correct: 2,
        explanation: "Because the numerator (7) is larger than the denominator (4), it is greater than 1, making it an **Improper Fraction**."
    },
    {
        question: "Which part of a fraction tells us the size of the fractional unit?",
        options: ["Numerator", "Denominator"],
        correct: 1,
        explanation: "The **Denominator** tells you how many slices make a whole, so it determines the size of the slice!"
    }
];
