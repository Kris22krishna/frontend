import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../SurfaceAreasAndVolumes/surface-volumes.css';
import '../../../SurfaceAreasAndVolumes/hide-footer.css';
import MathRenderer from '../../../../../MathRenderer';
import { useSessionLogger } from '@/hooks/useSessionLogger';

const TERMINOLOGY_QUIZ_NODE_ID = 'local-stats-terminology-quiz';

/* ── Inline SVG Diagram Components ─────────────────────────────────── */
function ClassIntervalDiagram() {
    return (
        <svg viewBox="0 0 320 100" style={{ width: '100%', maxHeight: 90 }}>
            <rect x="20" y="20" width="80" height="50" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="6" />
            <text x="60" y="50" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1e40af">10–20</text>
            <rect x="120" y="20" width="80" height="50" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="6" />
            <text x="160" y="50" textAnchor="middle" fontSize="12" fontWeight="800" fill="#166534">20–30</text>
            <rect x="220" y="20" width="80" height="50" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="6" />
            <text x="260" y="50" textAnchor="middle" fontSize="12" fontWeight="800" fill="#92400e">30–40</text>
            <text x="160" y="88" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="700">← h = 10 each →</text>
        </svg>
    );
}

function FrequencyDiagram() {
    return (
        <svg viewBox="0 0 320 110" style={{ width: '100%', maxHeight: 100 }}>
            <rect x="30" y="65" width="50" height="30" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" rx="3" />
            <text x="55" y="84" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e40af">f₁=3</text>
            <rect x="100" y="35" width="50" height="60" fill="#bbf7d0" stroke="#22c55e" strokeWidth="1.5" rx="3" />
            <text x="125" y="70" textAnchor="middle" fontSize="11" fontWeight="800" fill="#166534">f₂=7</text>
            <rect x="170" y="50" width="50" height="45" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.5" rx="3" />
            <text x="195" y="77" textAnchor="middle" fontSize="11" fontWeight="800" fill="#92400e">f₃=5</text>
            <rect x="240" y="75" width="50" height="20" fill="#fecaca" stroke="#ef4444" strokeWidth="1.5" rx="3" />
            <text x="265" y="89" textAnchor="middle" fontSize="11" fontWeight="800" fill="#991b1b">f₄=2</text>
            <line x1="20" y1="95" x2="300" y2="95" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="160" y="108" textAnchor="middle" fontSize="9" fill="#64748b">Σfi = 3+7+5+2 = 17</text>
        </svg>
    );
}

function ClassMarkDiagram() {
    return (
        <svg viewBox="0 0 320 80" style={{ width: '100%', maxHeight: 70 }}>
            <line x1="30" y1="40" x2="290" y2="40" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="30" cy="40" r="6" fill="#3b82f6" />
            <text x="30" y="60" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3b82f6">20</text>
            <circle cx="290" cy="40" r="6" fill="#3b82f6" />
            <text x="290" y="60" textAnchor="middle" fontSize="10" fontWeight="700" fill="#3b82f6">30</text>
            <circle cx="160" cy="40" r="8" fill="#ef4444" stroke="#ef4444" strokeWidth="2" />
            <text x="160" y="25" textAnchor="middle" fontSize="12" fontWeight="900" fill="#ef4444">xi = 25</text>
            <text x="160" y="72" textAnchor="middle" fontSize="9" fill="#64748b">midpoint</text>
        </svg>
    );
}

function CumulativeFrequencyDiagram() {
    return (
        <svg viewBox="0 0 320 110" style={{ width: '100%', maxHeight: 100 }}>
            <rect x="20" y="10" width="60" height="20" fill="#1e40af" rx="3" />
            <text x="50" y="24" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff">fi</text>
            <rect x="90" y="10" width="60" height="20" fill="#7c3aed" rx="3" />
            <text x="120" y="24" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff">cf</text>

            {[[5,5],[3,8],[4,12],[3,15]].map(([f, c], i) => (
                <React.Fragment key={i}>
                    <rect x="20" y={35 + i * 18} width="60" height="16" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="1" rx="2" />
                    <text x="50" y={47 + i * 18} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">{f}</text>
                    <rect x="90" y={35 + i * 18} width="60" height="16" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1" rx="2" />
                    <text x="120" y={47 + i * 18} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7c3aed">{c}</text>
                    {i > 0 && <text x="170" y={47 + i * 18} fontSize="9" fill="#64748b">← {c - f} + {f}</text>}
                </React.Fragment>
            ))}
        </svg>
    );
}

function DirectMethodDiagram() {
    return (
        <svg viewBox="0 0 320 90" style={{ width: '100%', maxHeight: 80 }}>
            <rect x="10" y="15" width="70" height="28" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" rx="6" />
            <text x="45" y="33" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e40af">fi × xi</text>
            <text x="95" y="33" fontSize="16" fontWeight="900" fill="#64748b">→</text>
            <rect x="110" y="15" width="70" height="28" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" rx="6" />
            <text x="145" y="33" textAnchor="middle" fontSize="10" fontWeight="800" fill="#166534">Σ fi xi</text>
            <text x="195" y="33" fontSize="16" fontWeight="900" fill="#64748b">→</text>
            <rect x="210" y="15" width="90" height="28" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" rx="6" />
            <text x="255" y="33" textAnchor="middle" fontSize="10" fontWeight="800" fill="#92400e">÷ Σfi = x̄</text>
            <text x="160" y="65" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="700">Weighted average of class marks</text>
        </svg>
    );
}

function AssumedMeanDiagram() {
    return (
        <svg viewBox="0 0 320 90" style={{ width: '100%', maxHeight: 80 }}>
            <line x1="30" y1="35" x2="290" y2="35" stroke="#94a3b8" strokeWidth="2" />
            {[['17.5',30],['32.5',95],['47.5',160],['62.5',225],['77.5',290]].map(([label,x], i) => (
                <React.Fragment key={i}>
                    <circle cx={x} cy="35" r={i === 2 ? 7 : 5} fill={i === 2 ? '#ef4444' : '#3b82f6'} />
                    <text x={x} y="55" textAnchor="middle" fontSize="9" fontWeight="700" fill={i === 2 ? '#ef4444' : '#64748b'}>{label}</text>
                    {i === 2 && <text x={x} y="72" textAnchor="middle" fontSize="10" fontWeight="900" fill="#ef4444">a (assumed)</text>}
                </React.Fragment>
            ))}
            <text x="95" y="25" textAnchor="middle" fontSize="9" fontWeight="700" fill="#3b82f6">di = -15</text>
            <text x="225" y="25" textAnchor="middle" fontSize="9" fontWeight="700" fill="#3b82f6">di = +15</text>
        </svg>
    );
}

function StepDeviationDiagram() {
    return (
        <svg viewBox="0 0 320 85" style={{ width: '100%', maxHeight: 75 }}>
            <rect x="10" y="10" width="70" height="25" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" rx="6" />
            <text x="45" y="27" textAnchor="middle" fontSize="9" fontWeight="800" fill="#1e40af">xi (big)</text>
            <text x="90" y="27" fontSize="14" fontWeight="900" fill="#64748b">→</text>
            <rect x="100" y="10" width="70" height="25" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" rx="6" />
            <text x="135" y="27" textAnchor="middle" fontSize="9" fontWeight="800" fill="#7c3aed">di (medium)</text>
            <text x="180" y="27" fontSize="14" fontWeight="900" fill="#64748b">→</text>
            <rect x="190" y="10" width="70" height="25" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" rx="6" />
            <text x="225" y="27" textAnchor="middle" fontSize="9" fontWeight="800" fill="#166534">ui (tiny!)</text>
            <text x="55" y="52" fontSize="9" fill="#64748b">-a</text>
            <text x="150" y="52" fontSize="9" fill="#64748b">÷h</text>
            <text x="160" y="72" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="700">Easiest computation method</text>
        </svg>
    );
}

function ModalClassDiagram() {
    return (
        <svg viewBox="0 0 320 110" style={{ width: '100%', maxHeight: 100 }}>
            <rect x="50" y="50" width="60" height="50" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" rx="3" />
            <text x="80" y="80" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e40af">f₀=7</text>
            <rect x="120" y="20" width="60" height="80" fill="#fde68a" stroke="#f59e0b" strokeWidth="2.5" rx="3" />
            <text x="150" y="65" textAnchor="middle" fontSize="11" fontWeight="900" fill="#92400e">f₁=8</text>
            <text x="150" y="14" textAnchor="middle" fontSize="9" fontWeight="800" fill="#ef4444">← MODAL</text>
            <rect x="190" y="70" width="60" height="30" fill="#fecaca" stroke="#ef4444" strokeWidth="1.5" rx="3" />
            <text x="220" y="89" textAnchor="middle" fontSize="11" fontWeight="800" fill="#991b1b">f₂=2</text>
            <line x1="40" y1="100" x2="260" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
    );
}

function MedianClassDiagram() {
    return (
        <svg viewBox="0 0 320 100" style={{ width: '100%', maxHeight: 90 }}>
            {[[5,'#bfdbfe'],[8,'#bfdbfe'],[12,'#bfdbfe'],[26,'#bbf7d0'],[35,'#fde68a'],[53,'#fecaca']].map(([cf, clr], i) => (
                <React.Fragment key={i}>
                    <rect x={15 + i * 50} y="20" width="45" height="30" fill={clr} stroke="#94a3b8" strokeWidth="1" rx="3" />
                    <text x={37 + i * 50} y="40" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">{cf}</text>
                </React.Fragment>
            ))}
            <text x="160" y="14" textAnchor="middle" fontSize="10" fontWeight="700" fill="#64748b">Cumulative Frequencies</text>
            <line x1="15" y1="63" x2="310" y2="63" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" />
            <text x="310" y="73" textAnchor="end" fontSize="10" fontWeight="800" fill="#ef4444">n/2 = 26.5</text>
            <text x="190" y="85" textAnchor="middle" fontSize="10" fontWeight="800" fill="#22c55e">↑ median class (cf=26 just crosses)</text>
        </svg>
    );
}

function OgiveDiagram() {
    return (
        <svg viewBox="0 0 320 120" style={{ width: '100%', maxHeight: 110 }}>
            <line x1="30" y1="100" x2="300" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="30" y1="100" x2="30" y2="10" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="165" y="118" textAnchor="middle" fontSize="9" fill="#64748b">Class boundaries →</text>
            <text x="18" y="55" fontSize="9" fill="#64748b" transform="rotate(-90,18,55)">cf →</text>
            <path d="M 50,95 Q 100,90 130,75 T 200,40 T 280,15" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="285" y="12" fontSize="9" fontWeight="700" fill="#3b82f6">Less than</text>
            <path d="M 50,15 Q 100,20 130,35 T 200,70 T 280,95" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <text x="285" y="98" fontSize="9" fontWeight="700" fill="#ef4444">More than</text>
            <circle cx="165" cy="55" r="5" fill="#f59e0b" stroke="#92400e" strokeWidth="2" />
            <line x1="165" y1="55" x2="165" y2="100" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
            <text x="165" y="108" textAnchor="middle" fontSize="10" fontWeight="900" fill="#f59e0b">MEDIAN</text>
        </svg>
    );
}

const DIAGRAM_MAP = [
    ClassIntervalDiagram,
    FrequencyDiagram,
    ClassMarkDiagram,
    CumulativeFrequencyDiagram,
    DirectMethodDiagram,
    AssumedMeanDiagram,
    StepDeviationDiagram,
    ModalClassDiagram,
    MedianClassDiagram,
    OgiveDiagram
];

const TERMS = [
    {
        name: 'Class Interval',
        color: '#3b82f6',
        icon: '📦',
        def: 'A range of values into which consecutive numerical data is grouped.',
        formula: '$\\text{Class Interval} = (\\text{Lower Limit},\\; \\text{Upper Limit})$',
        example: 'In the class 10–20, lower limit = 10, upper limit = 20, class width h = 10.',
        memory: 'Class = "Container" — each container holds a range of values!'
    },
    {
        name: 'Frequency (fi)',
        color: '#22c55e',
        icon: '📊',
        def: 'The number of observations that fall within a specific class interval.',
        formula: '$f_i = \\text{number of observations in class } i$',
        example: 'If 7 students scored between 40–50, the frequency of that class is 7.',
        memory: 'Frequency = "How many?" — count the tally marks in each container!'
    },
    {
        name: 'Class Mark (xi)',
        color: '#ef4444',
        icon: '🎯',
        def: 'The exact midpoint or center of a class interval.',
        formula: '$x_i = \\frac{\\text{Lower} + \\text{Upper}}{2}$',
        example: 'For class 20–30: $x_i = (20+30)/2 = 25$.',
        memory: 'Class Mark = "Heart of the Class" — the exact center point!'
    },
    {
        name: 'Cumulative Frequency',
        color: '#7c3aed',
        icon: '📈',
        def: 'The running total of frequencies obtained by adding the frequency of a class to the sum of the frequencies of all previous classes.',
        formula: '$cf_k = f_1 + f_2 + \\cdots + f_k$',
        example: 'If frequencies are 5, 3, 4, 3 then cf = 5, 8, 12, 15.',
        memory: 'CF = "Running Score" — keep adding as you go down the table!'
    },
    {
        name: 'Direct Method',
        color: '#0891b2',
        icon: '📏',
        def: 'The most basic method to find the mean of grouped data by taking the sum of products of frequencies and class marks.',
        formula: '$\\bar{x} = \\frac{\\Sigma f_i x_i}{\\Sigma f_i}$',
        example: 'If Σfixi = 1250 and Σfi = 50, then mean = 1250/50 = 25.',
        memory: 'Direct = "Straightforward" — multiply, add, divide. No shortcuts!'
    },
    {
        name: 'Assumed Mean Method',
        color: '#f59e0b',
        icon: '⚖️',
        def: 'A shortcut method used to simplify calculations by choosing an arbitrary center value (a) and finding deviations from it.',
        formula: '$\\bar{x} = a + \\frac{\\Sigma f_i d_i}{\\Sigma f_i}$ where $d_i = x_i - a$',
        example: 'Choose a = 47.5. Deviations become -30, -15, 0, 15, 30.',
        memory: 'Assumed Mean = "Shortcut Shift" — move values closer to zero, then shift back!'
    },
    {
        name: 'Step-Deviation',
        color: '#ec4899',
        icon: '📉',
        def: 'An extended shortcut method that further scales down deviations by dividing them by the class width (h).',
        formula: '$\\bar{x} = a + h \\cdot \\frac{\\Sigma f_i u_i}{\\Sigma f_i}$ where $u_i = \\frac{d_i}{h}$',
        example: 'If h = 15, deviations -30, -15, 0, 15 become ui = -2, -1, 0, 1.',
        memory: 'Step-Deviation = "Double Shortcut" — shift AND shrink for easiest calculation!'
    },
    {
        name: 'Modal Class',
        color: '#14b8a6',
        icon: '👑',
        def: 'The class interval with the highest frequency. Used as the foundation to calculate the grouped data mode.',
        formula: '$\\text{Mode} = l + \\frac{f_1 - f_0}{2f_1 - f_0 - f_2} \\times h$',
        example: 'Frequencies 7, 8, 2: modal class is the one with frequency 8.',
        memory: 'Modal = "Most Popular" — the class with the highest frequency bar!'
    },
    {
        name: 'Median Class',
        color: '#8b5cf6',
        icon: '⚖️',
        def: 'The class interval whose cumulative frequency is strictly greater than or equal to n/2.',
        formula: '$\\text{Median} = l + \\frac{n/2 - cf}{f} \\times h$',
        example: 'If n = 53, n/2 = 26.5. The class whose cf just exceeds 26.5 is the median class.',
        memory: 'Median Class = "The Tipping Point" — where the running total crosses n/2!'
    },
    {
        name: 'Ogive Curve',
        color: '#f43f5e',
        icon: '🪢',
        def: 'A smooth curve plotted using class limits and cumulative frequencies.',
        formula: '"Less than": plot upper limits vs cf.',
        example: 'Intersection of both ogives gives the MEDIAN on the x-axis.',
        memory: 'Ogive = "The S-Curve" — smooth, always increasing, and crosses at the median!'
    }
];

const RULES = [
    {
        num: 1,
        title: 'Identify Class Width (h)',
        rule: "Before anything else, check if all class intervals have the SAME width h. This is required for Assumed Mean and Step-Deviation methods.",
        emoji: '📏',
        color: '#3b82f6',
        detail: "Class width h = Upper limit - Lower limit. If classes are 0-10, 10-20, 20-30, then h = 10. Unequal class widths need special treatment.",
        examples: ['Class 10-20 → h = 10', 'Class 0.5-5.5 → h = 5'],
        tip: "If continuous class widths are unequal, you MUST step back to the Direct or Assumed Mean Method. Step-Deviation won\'t work!"
    },
    {
        num: 2,
        title: 'Assumed Mean: Pick Smart',
        rule: "Choose the assumed mean 'a' as the class mark (xi) of the middle class or the one with highest frequency. This minimizes deviations.",
        emoji: '🎯',
        color: '#10b981',
        detail: "A good choice of 'a' makes most deviations small. Bad choice? You still get the right answer, just bigger numbers to compute.",
        examples: ['Pick central xi in the table', 'Pick xi aligned with the highest fi'],
        tip: 'If there are two middle classes, pick the one with the larger frequency!'
    },
    {
        num: 3,
        title: 'Mode Needs Neighbors',
        rule: "Mode formula needs THREE frequencies: f₀ (class before modal), f₁ (modal class), f₂ (class after modal). Missing any one breaks the formula.",
        emoji: '🏘️',
        color: '#f59e0b',
        detail: "If the modal class is the FIRST or LAST class, f₀ or f₂ might be 0. That is fine — just substitute 0 into the formula.",
        examples: ['Modal class is first: f₀ = 0', 'Modal class is last: f₂ = 0'],
        tip: 'Always label f₀, f₁, f₂ directly in your exam table before plugging into the formula.'
    },
    {
        num: 4,
        title: 'Median: n/2, Not (n+1)/2',
        rule: "For GROUPED data, use n/2 to find median class. For ungrouped data, use (n+1)/2. This is a common exam mistake!",
        emoji: '⚠️',
        color: '#ef4444',
        detail: "In the median formula, cf is the cumulative frequency of the class BEFORE the median class, and f is the frequency OF the median class.",
        examples: ['n = 50 → finding median class using cf >= 25', 'n = 31 → finding median class using cf >= 15.5'],
        tip: 'cf in the formula is always the value strictly ABOVE the median row.'
    },
    {
        num: 5,
        title: 'Ogive Intersection = Median',
        rule: "Draw both less-than and more-than ogives on the same graph. Their intersection point, when dropped to the x-axis, gives the MEDIAN.",
        emoji: '📊',
        color: '#7c3aed',
        detail: "You can also find the median from just ONE ogive by drawing a horizontal line at n/2 on the y-axis and reading the x-value where it meets the curve.",
        examples: ['Drop perpendicular from intersection to X-axis = Median', 'Draw horizontal from n/2 on Y-axis to curve'],
        tip: 'Always plot "less than" on upper limits, and "more than" on lower limits!'
    }
];

const QUIZ = [
    { q: "The class mark of the interval 20-30 is:", opts: ["20", "25", "30", "10"], corr: 1, exp: "$x_i = (20+30)/2 = 25$." },
    { q: "In the formula $\\bar{x} = a + \\frac{\\Sigma f_i d_i}{\\Sigma f_i}$, what is $d_i$?", opts: ["$x_i \\times f_i$", "$x_i - a$", "$x_i / h$", "$f_i - a$"], corr: 1, exp: "$d_i = x_i - a$, i.e., deviation of class mark from assumed mean." },
    { q: "Mode lies in the class with the:", opts: ["Smallest frequency", "Largest frequency", "Largest class width", "Median value"], corr: 1, exp: "Modal class = class with highest frequency." },
    { q: "For grouped data, to find the median class we compute:", opts: ["$(n+1)/2$", "$n/2$", "$n/3$", "$n$"], corr: 1, exp: "For grouped data, use n/2 (not (n+1)/2 which is for ungrouped data)." },
    { q: "The intersection of 'less than' and 'more than' ogives gives:", opts: ["Mean", "Mode", "Median", "Range"], corr: 2, exp: "Ogive intersection on x-axis = Median." }
];

export default function Terminology() {
    const navigate = useNavigate();
    const [view, setView] = useState('terms'); // 'terms' | 'rules' | 'quiz'
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [ansSelected, setAnsSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const { startSession, logAnswer, finishSession } = useSessionLogger();
    const quizAnswers = useRef([]);

    useEffect(() => {
        if (view === 'quiz') {
            startSession({ nodeId: TERMINOLOGY_QUIZ_NODE_ID, sessionType: 'quiz' });
            quizAnswers.current = [];
        }
    }, [view]);

    React.useEffect(() => {
        document.body.classList.add('hide-main-footer');
        return () => document.body.classList.remove('hide-main-footer');
    }, []);

    const term = TERMS[selectedIdx];
    const activeRule = RULES[selectedRuleIdx];
    const DiagramComponent = DIAGRAM_MAP[selectedIdx] || ClassIntervalDiagram;

    const handleAns = async (idx) => {
        if (answered) return;
        setAnsSelected(idx);
        setAnswered(true);
        const isCorrect = idx === QUIZ[quizIdx].corr;
        if (isCorrect) setScore(s => s + 1);
        const answerData = { question_index: quizIdx + 1, answer_json: { selected: idx }, is_correct: isCorrect ? 1.0 : 0.0, marks_awarded: isCorrect ? 1 : 0, marks_possible: 1, time_taken_ms: 0 };
        quizAnswers.current[quizIdx] = answerData;
        await logAnswer({ questionIndex: answerData.question_index, answerJson: answerData.answer_json, isCorrect: answerData.is_correct });
    };

    const nextQ = async () => {
        if (quizIdx + 1 < QUIZ.length) {
            setQuizIdx(i => i + 1);
            setAnsSelected(null);
            setAnswered(false);
        } else {
            setFinished(true);
            const payload = quizAnswers.current.filter(Boolean);
            await finishSession({ totalQuestions: QUIZ.length, questionsAnswered: payload.length, answersPayload: payload });
        }
    };

    return (
        <div className="terminology-page">
            <nav className="intro-nav">
                <button className="intro-nav-back" onClick={() => navigate('/statistics')}>← Hub</button>
                <div className="intro-nav-links">
                    <button className="intro-nav-link" onClick={() => navigate('/statistics/introduction')}>🌟 Intro</button>
                    <button className="intro-nav-link intro-nav-link--active">📖 Terminology</button>
                    <button className="intro-nav-link" onClick={() => navigate('/statistics/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div className="res-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 4 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: '0' }}>
                        Statistics <span style={{ background: 'linear-gradient(135deg, var(--sv-primary), var(--sv-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vocabulary</span>
                    </h1>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                    <button className={`alg-tab ${view === 'terms' ? 'active' : ''}`} style={{ padding: '4px 12px', fontSize: 12 }} onClick={() => setView('terms')}>📚 Terminology</button>
                    <button className={`alg-tab ${view === 'rules' ? 'active' : ''}`} style={{ padding: '4px 12px', fontSize: 12 }} onClick={() => setView('rules')}>📏 5 Golden Rules</button>
                    <button className={`alg-tab ${view === 'quiz' ? 'active' : ''}`} style={{ padding: '4px 12px', fontSize: 12 }} onClick={() => setView('quiz')}>🧠 Test Prep</button>
                </div>

                {view === 'terms' && (
                    <div className="res-fade-in alg-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: 12, alignItems: 'start' }}>
                        <aside className="selector-container" style={{
                            background: 'rgba(255,255,255,0.7)', padding: '10px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, backdropFilter: 'blur(10px)',
                            alignContent: 'start'
                        }}>
                            {TERMS.map((t, i) => {
                                const isActive = selectedIdx === i;
                                return (
                                    <button
                                        key={i}
                                        className={`term-btn-mini ${isActive ? 'active' : ''}`}
                                        onClick={() => setSelectedIdx(i)}
                                        style={{
                                            background: `linear-gradient(135deg, ${t.color}15, ${t.color}05)`,
                                            borderColor: isActive ? t.color : `${t.color}20`,
                                            gridColumn: i === TERMS.length - 1 && TERMS.length % 2 !== 0 ? 'span 2' : 'span 1',
                                            justifyContent: i === TERMS.length - 1 && TERMS.length % 2 !== 0 ? 'center' : 'flex-start',
                                            padding: '6px 10px', position: 'relative', overflow: 'hidden', border: '1.5px solid', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 4, flexDirection: 'column'
                                        }}
                                    >
                                        <div style={{ fontSize: 20, padding: '2px', position: 'relative', zIndex: 1, filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none' }}>{t.icon}</div>
                                        <div style={{ fontWeight: 800, fontSize: 10, color: isActive ? '#fff' : '#1e293b', textAlign: 'center', lineHeight: 1.1, position: 'relative', zIndex: 1 }}>{t.name.split(' (')[0]}</div>
                                        {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${t.color}, ${t.color}dd)`, zIndex: 0 }} />}
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="details-window-anim" key={selectedIdx} style={{
                            background: '#ffffff', borderRadius: 20, padding: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                            border: `2px solid ${term.color}40`, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%'
                        }}>
                            <div className="term-featured-card" style={{ border: 'none', background: 'transparent', boxShadow: 'none', borderRadius: 0, margin: 0, height: '100%', alignItems: 'stretch' }}>
                                <div className="term-visual-zone" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', background: `${term.color}08` }}>
                                    <DiagramComponent />
                                    <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 800, color: term.color, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>DIAGRAM</div>
                                </div>

                                <div className="term-content-zone" style={{ padding: '0 0 0 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <span className="term-badge" style={{ background: term.color + '15', color: term.color, marginBottom: 6, padding: '2px 8px', fontSize: 10 }}>Definition</span>
                                    <h2 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: '0 0 4px', lineHeight: 1.1 }}>{term.name}</h2>
                                    <p style={{ fontSize: 13, lineHeight: 1.4, color: '#475569', marginBottom: 12 }}>{term.def}</p>

                                    <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                                        <div style={{ flex: '1 1 120px', background: '#f8fafc', padding: 8, borderRadius: 10, border: '1px solid rgba(0,0,0,0.03)' }}>
                                            <div style={{ fontSize: 9, fontWeight: 800, color: term.color, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Formula / Key</div>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}><MathRenderer text={term.formula} /></div>
                                        </div>
                                        <div style={{ flex: '2 1 140px', background: '#f8fafc', padding: 8, borderRadius: 10, border: '1px solid rgba(0,0,0,0.03)' }}>
                                            <div style={{ fontSize: 9, fontWeight: 800, color: term.color, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>In Practice</div>
                                            <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.3 }}>{term.example}</div>
                                        </div>
                                    </div>

                                    <div style={{ background: term.color + '05', padding: '10px 12px', borderRadius: 10, borderLeft: `4px solid ${term.color}` }}>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', lineHeight: 1.4 }}>
                                            <span style={{ marginRight: 6 }}>💡</span> <MathRenderer text={term.memory} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                )}

                {view === 'rules' && (
                    <div className="alg-lexicon-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: 12, alignItems: 'start' }}>
                        <aside className="selector-container" style={{
                            background: 'rgba(255,255,255,0.7)', padding: '8px 10px', borderRadius: 16, border: '1px solid rgba(0,0,0,0.05)',
                            display: 'grid', gridTemplateColumns: '1fr', gap: 6, backdropFilter: 'blur(10px)',
                            alignContent: 'start'
                        }}>
                            {RULES.map((rule, i) => {
                                const isActive = selectedRuleIdx === i;
                                return (
                                    <button key={i} className={`term-btn-mini ${isActive ? 'active' : ''}`} onClick={() => setSelectedRuleIdx(i)}
                                        style={{ background: `linear-gradient(135deg, ${rule.color}15, ${rule.color}05)`, borderColor: isActive ? rule.color : `${rule.color}20`, padding: '8px 12px', position: 'relative', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.06)', borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}
                                    >
                                        <div style={{ width: 26, height: 26, borderRadius: 6, background: isActive ? rule.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: isActive ? '#fff' : rule.color, fontWeight: 900, position: 'relative', zIndex: 1 }}>{rule.num}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                                            <span style={{ fontWeight: 800, fontSize: 13, color: isActive ? '#fff' : '#1e293b', lineHeight: 1 }}>Rule {rule.num}</span>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? 'rgba(255,255,255,0.8)' : '#64748b', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 }}>
                                                <MathRenderer text={rule.title} />
                                            </span>
                                        </div>
                                        {isActive && <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${rule.color}, ${rule.color}dd)`, zIndex: 0 }} />}
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="details-window-anim" key={selectedRuleIdx} style={{
                            background: '#ffffff', borderRadius: 16, padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                            border: `2px solid ${activeRule.color}15`, height: '100%', display: 'flex', flexDirection: 'column', gap: '6px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                <div style={{ width: 26, height: 26, borderRadius: 6, background: `${activeRule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: activeRule.color, fontWeight: 900 }}>{activeRule.emoji}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: <MathRenderer text={activeRule.title} /></h2>
                            </div>
                            <div style={{ background: `${activeRule.color}08`, padding: '8px 10px', borderRadius: 8, borderLeft: `3px solid ${activeRule.color}`, marginBottom: 8 }}>
                                <p style={{ fontSize: 13, fontWeight: 700, color: activeRule.color, margin: 0 }}>
                                    <MathRenderer text={activeRule.rule} />
                                </p>
                            </div>
                            <p style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.3, margin: '0 0 10px' }}>
                                <MathRenderer text={activeRule.detail} />
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 9, letterSpacing: 1, color: activeRule.color, marginBottom: 6 }}>Practical Examples</h4>
                                    <div style={{ background: '#f8fafc', padding: 10, borderRadius: 10, border: '1px solid rgba(0,0,0,0.04)' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            {activeRule.examples.map((ex, j) => (
                                                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: activeRule.color }} />
                                                    <span style={{ fontSize: 12, background: '#fff', padding: '2px 6px', borderRadius: 6, color: '#1e293b', fontWeight: 600 }}>
                                                        <MathRenderer text={ex} />
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ textTransform: 'uppercase', fontSize: 9, letterSpacing: 1, color: '#14b9a6', marginBottom: 6 }}>Survival Tip</h4>
                                    <div style={{ background: 'rgba(20,184,166,0.05)', padding: 10, borderRadius: 10, border: '1px solid rgba(20,184,166,0.1)' }}>
                                        <p style={{ margin: 0, fontSize: 12, color: '#445163', lineHeight: 1.4 }}><span style={{ fontWeight: 800, color: '#14b9a6' }}>🛡️ Pro Tip: </span><MathRenderer text={activeRule.tip} /></p>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                )}

                {view === 'quiz' && (
                    <div className="details-window-anim" style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 24, padding: '20px 24px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                        {!finished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <div>
                                        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--sv-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of {QUIZ.length}</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 800, color: '#1e293b', margin: 0 }}>Vocabulary Check</h3>
                                    </div>
                                    <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: 'var(--sv-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: 'var(--sv-secondary)' }}>{quizIdx + 1}/{QUIZ.length}</div>
                                </div>
                                <div style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', lineHeight: 1.4, marginBottom: 16 }}>
                                    <MathRenderer text={QUIZ[quizIdx].q} />
                                </div>
                                <div className="quiz-options-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                                    {QUIZ[quizIdx].opts.map((opt, i) => {
                                        const isSelected = ansSelected === i;
                                        const isCorrect = i === QUIZ[quizIdx].corr;

                                        let borderColor = 'rgba(0,0,0,0.05)';
                                        let bgColor = '#fff';
                                        let textColor = '#1e293b';

                                        if (answered) {
                                            if (isCorrect) {
                                                borderColor = '#10b981';
                                                bgColor = 'rgba(16, 185, 129, 0.05)';
                                                textColor = '#10b981';
                                            } else if (isSelected) {
                                                borderColor = '#ef4444';
                                                bgColor = 'rgba(239, 68, 68, 0.05)';
                                                textColor = '#ef4444';
                                            }
                                        } else if (isSelected) {
                                            borderColor = 'var(--sv-secondary)';
                                            bgColor = 'rgba(99, 102, 241, 0.05)';
                                        }

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleAns(i)}
                                                disabled={answered}
                                                style={{
                                                    padding: '12px 16px', borderRadius: '14px', border: `2px solid ${borderColor}`,
                                                    background: bgColor, color: textColor,
                                                    textAlign: 'left', fontWeight: isSelected ? 800 : 600, transition: 'all 0.2s',
                                                    fontSize: '15px', cursor: answered ? 'default' : 'pointer'
                                                }}
                                            >
                                                <MathRenderer text={opt} />
                                            </button>
                                        );
                                    })}
                                </div>
                                {answered && (
                                    <div style={{
                                        background: 'rgba(99, 102, 241, 0.05)', padding: '10px 14px', borderRadius: '12px', marginBottom: '16px',
                                        border: '1px solid rgba(99, 102, 241, 0.2)'
                                    }}>
                                        <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.4 }}>
                                            <strong style={{ color: 'var(--sv-secondary)' }}>Solution: </strong>
                                            <MathRenderer text={QUIZ[quizIdx].exp} />
                                        </div>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        className="alg-btn-primary"
                                        onClick={nextQ}
                                        disabled={!answered}
                                        style={{
                                            padding: '10px 24px', background: answered ? 'var(--sv-secondary)' : '#f8fafc',
                                            color: answered ? '#fff' : '#94a3b8', border: 'none', borderRadius: '100px',
                                            fontWeight: 800, fontSize: '13px', cursor: answered ? 'pointer' : 'not-allowed',
                                            transition: 'all 0.2s', boxShadow: answered ? '0 4px 15px rgba(99, 102, 241, 0.3)' : 'none'
                                        }}
                                    >
                                        {quizIdx + 1 === QUIZ.length ? 'Finish Quiz' : 'Next Question →'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 60, marginBottom: 16 }}>{score >= 4 ? '🏆' : score >= 3 ? '🌟' : '💪'}</div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, marginBottom: 8, color: 'var(--sv-text)' }}>Test Complete!</h2>
                                <p style={{ color: '#64748b', fontSize: 18, marginBottom: 32 }}>Your Vocabulary Score: <span style={{ color: 'var(--sv-secondary)', fontWeight: 900 }}>{score} / {QUIZ.length}</span></p>
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button className="alg-btn-primary" onClick={() => { setFinished(false); setQuizIdx(0); setScore(0); setAnswered(false); setAnsSelected(null); }}>Try Again</button>
                                    <button className="alg-btn-secondary" onClick={() => navigate('/statistics/skills')}>Go to Skills 🎯</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div style={{ marginTop: 4, textAlign: 'center' }}>
                    <button className="alg-btn-primary" onClick={() => navigate('/statistics/skills')} style={{ padding: '6px 20px', fontSize: 13, borderRadius: 100 }}>Ready to Solve! 🎯</button>
                </div>
            </div>
        </div >
    );
}
