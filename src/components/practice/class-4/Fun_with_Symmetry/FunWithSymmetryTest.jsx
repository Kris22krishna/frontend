import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, SkipForward, ArrowLeft, RefreshCw, BarChart3, Clock, HelpCircle, CheckCircle2, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../services/api';
import LatexContent from '../../../LatexContent';
import './FunWithSymmetry.css';
import mascotImg from '../../../../assets/mascot.png';

import { useSessionLogger } from '../../../../hooks/useSessionLogger';

const NODE_ID = 'a4041006-0012-0000-0000-000000000000';
const BLUE_THEME_CSS = `
    .option-btn-modern.selected {
        border-color: #3B82F6 !important;
        background-color: #EFF6FF !important;
        color: #1E40AF !important;
        box-shadow: 0 4px 0 #2563EB !important;
    }
    .option-btn-modern {
        min-height: 65px;
        min-width: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem !important;
        text-align: center;
        font-size: 0.95rem;
    }
    .grey-selection-theme {
        --selected-border: #3B82F6;
        --selected-bg: #EFF6FF;
    }
    .exam-report-container {
        max-width: 900px;
        margin: 2rem auto;
        padding: 2rem;
        background: white;
        border-radius: 24px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }
    .report-stat-card {
        padding: 1.5rem;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        transition: transform 0.2s;
    }
    .report-stat-card:hover {
        transform: translateY(-5px);
    }
    .solution-accordion {
        border: 2px solid #FEF08A;
        border-radius: 16px;
        margin-bottom: 1.5rem;
        overflow: hidden;
        background: white;
    }
    .solution-header {
        padding: 1rem;
        background: #F8FAFC;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
    .solution-content {
        padding: 1.5rem;
        background: white;
        border-top: 1px solid #E2E8F0;
    }
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 600;
    }
    .status-correct { background: #DCFCE7; color: #166534; }
    .status-wrong { background: #FEE2E2; color: #991B1B; }
    .status-skipped { background: #F1F5F9; color: #475569; }

    .nav-pastel-btn {
        background: linear-gradient(135deg, #3B82F6, #2563EB) !important;
        color: white !important;
        border: none !important;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4) !important;
        transition: all 0.3s ease !important;
        font-weight: 800 !important;
        letter-spacing: 0.5px !important;
    }
    .nav-pastel-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6) !important;
        background: linear-gradient(135deg, #2563EB, #1D4ED8) !important;
    }
    .nav-pastel-btn:disabled {
        background: #E2E8F0 !important;
        color: #94A3B8 !important;
        box-shadow: none !important;
        transform: none !important;
        cursor: not-allowed !important;
    }

    /* Mobile Responsiveness for Practice Session Layout */
    @media (max-width: 1024px) {
        .practice-board-container {
            grid-template-columns: 1fr !important;
            justify-items: center !important;
            margin-bottom: 2rem !important;
        }
        .practice-left-col {
            width: 100% !important;
            max-width: 600px !important;
            margin: 0 auto !important;
        }
        .question-palette-container {
            width: 100% !important;
            max-width: 500px !important;
            margin: 2rem auto 0 auto !important;
            max-height: none !important;
            height: auto !important;
        }
        .options-grid-modern {
            grid-template-columns: 1fr !important;
            justify-items: center !important;
        }
        .practice-content-wrapper {
            padding-bottom: 80px !important;
        }
        .option-btn-modern {
            min-height: 55px;
            font-size: 0.9rem;
            min-width: unset !important;
            width: 100% !important;
            max-width: 350px !important;
            margin: 0 auto !important;
        }
    }
    @media (max-width: 640px) {
        .junior-practice-header {
            padding: 0 1rem !important;
        }
        .practice-content-wrapper {
            padding: 1rem 1rem 80px 1rem !important;
        }
        .question-card-modern {
            padding: 1.5rem !important;
        }
        .question-text-modern {
            font-size: 1.1rem !important;
        }
    }
`;

const SKILL_ID = 1198; // Generic Chapter identifier
const SKILL_NAME = "Fun with Symmetry - Chapter Test";

const FunWithSymmetryTest = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isTestOver, setIsTestOver] = useState(false);
    const [responses, setResponses] = useState({});
    const [questions, setQuestions] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
  const v4AnswersPayload = useRef([]);
  const v4IsFinishedRef = useRef(false);
  const { startSession, finishSession, abandonSession } = useSessionLogger();


    // --- SVG rendering extracted from subcomponents ---

    // 1. Identify Line of Symmetry / 3. Lines in Polygons
    const renderShapeOutlineWithLine = (type, color) => {
        const strokeColor = "#31326F";
        const strokeWidth = 4;
        let shapeSVG = null;
        let lineSVG = null;

        switch (type) {
            case 'square_line':
                shapeSVG = <rect x="50" y="50" width="100" height="100" rx="8" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />;
                lineSVG = <line x1="100" y1="20" x2="100" y2="180" stroke="#EF4444" strokeWidth="4" strokeDasharray="10,6" />;
                break;
            case 'rectangle_line':
                shapeSVG = <rect x="30" y="60" width="140" height="80" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />;
                lineSVG = <line x1="10" y1="100" x2="190" y2="100" stroke="#EF4444" strokeWidth="4" strokeDasharray="10,6" />;
                break;
            case 'star_line':
                shapeSVG = <polygon points="100,20 120,75 180,80 135,115 150,175 100,145 50,175 65,115 20,80 80,75" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                lineSVG = <line x1="100" y1="10" x2="100" y2="190" stroke="#EF4444" strokeWidth="4" strokeDasharray="10,6" />;
                break;
            case 'polygon_hex':
                shapeSVG = <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'polygon_tri':
                shapeSVG = <polygon points="100,30 170,160 30,160" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            default:
                shapeSVG = <circle cx="100" cy="100" r="50" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />;
        }
        return (
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md relative overflow-visible max-h-[150px]">
                {shapeSVG}
                {lineSVG}
            </svg>
        );
    };

    // 2. Completing Half Design
    const renderHalfFace = (color) => {
        const strokeColor = "#31326F";
        const strokeWidth = 8;
        const paths = (
            <>
                <path d="M100,20 C160,20 180,60 180,100 C180,150 140,190 100,190 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                <circle cx="140" cy="80" r="15" fill="white" stroke={strokeColor} strokeWidth={strokeWidth / 2} />
                <path d="M100,140 C120,150 140,140 150,130" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            </>
        );
        return (
            <svg viewBox="0 0 200 200" className="w-full h-full max-h-[150px]">
                <g transform="scale(-1, 1) translate(-200, 0)">{paths}</g>
            </svg>
        );
    };

    // 4. Mirror Image Shapes
    const renderMirrorShape = (type, color) => {
        const strokeColor = "#31326F";
        const strokeWidth = 8;
        let shapeSVG = null;
        switch (type) {
            case 'P':
                shapeSVG = <path d="M60,20 L130,20 C160,20 160,100 130,100 L100,100 L100,180 L60,180 Z M100,60 L120,60 C130,60 130,80 120,80 L100,80 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'L':
                shapeSVG = <path d="M50,20 L50,180 L140,180 L140,140 L90,140 L90,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'L-mirror':
                shapeSVG = <path d="M150,20 L150,180 L60,180 L60,140 L110,140 L110,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'arrow-right':
                shapeSVG = <polygon points="40,70 110,70 110,30 180,100 110,170 110,130 40,130" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
        }
        return (
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md relative overflow-visible max-h-[150px]">
                {shapeSVG}
            </svg>
        );
    };

    // 5. Paper Fold Symmetry
    const renderPaperFold = (showPunches, isCorrect) => {
        return (
            <div className="flex justify-center items-center w-full max-h-[150px]">
                {showPunches && isCorrect ? (
                    <svg viewBox="0 0 100 100" className="w-[120px] h-[120px] shadow-sm bg-[#cffafe] border-2 border-slate-300">
                        <circle cx="25" cy="25" r="8" fill="#1e293b" />
                        <circle cx="75" cy="25" r="8" fill="#1e293b" />
                        <circle cx="25" cy="75" r="8" fill="#1e293b" />
                        <circle cx="75" cy="75" r="8" fill="#1e293b" />
                    </svg>
                ) : showPunches ? (
                    <svg viewBox="0 0 100 100" className="w-[120px] h-[120px] shadow-sm bg-[#cffafe] border-2 border-slate-300">
                        <circle cx="25" cy="25" r="8" fill="#1e293b" />
                        <circle cx="25" cy="75" r="8" fill="#1e293b" />
                    </svg>
                ) : (
                    <div className="relative w-[120px] h-[120px]">
                        <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full shadow-sm bg-[#cffafe] border-2 border-slate-300">
                            <line x1="50" y1="0" x2="50" y2="100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />
                            <line x1="0" y1="50" x2="100" y2="50" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />
                            <path d="M0 0 L50 0 L50 50 L0 50 Z" fill="rgba(0,0,0,0.1)" />
                            <circle cx="25" cy="25" r="8" fill="#1e293b" />
                        </svg>
                    </div>
                )}
            </div>
        );
    };

    // 6. Create Tiling
    const renderTilingGaps = () => {
        return (
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md relative overflow-visible max-h-[150px]">
                <rect x="0" y="0" width="100" height="100" fill="#3B82F6" stroke="#2563EB" strokeWidth="2" />
                <rect x="100" y="0" width="100" height="100" fill="#3B82F6" stroke="#2563EB" strokeWidth="2" />
                <rect x="0" y="100" width="100" height="100" fill="#3B82F6" stroke="#2563EB" strokeWidth="2" />
                {/* Gap at bottom right */}
                <rect x="100" y="100" width="100" height="100" fill="#F1F5F9" />
            </svg>
        );
    }

    // 7. Real Life Symmetry
    const renderRealLifeObject = (type) => {
        let content = null;
        switch (type) {
            case 'butterfly':
                content = (
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md max-h-[150px]">
                        <path d="M50 10 C45 30, 10 20, 15 45 C20 70, 45 60, 50 90 C55 60, 80 70, 85 45 C90 20, 55 30, 50 10 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
                        <ellipse cx="50" cy="50" rx="3" ry="45" fill="#1E293B" />
                        <circle cx="30" cy="35" r="5" fill="#FDE047" />
                        <circle cx="70" cy="35" r="5" fill="#FDE047" />
                    </svg>
                );
                break;
            case 'teapot':
                content = (
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md max-h-[150px]">
                        <circle cx="50" cy="60" r="30" fill="#38BDF8" />
                        <path d="M20 60 Q5 50 25 40" fill="none" stroke="#38BDF8" strokeWidth="8" strokeLinecap="round" />
                        <path d="M80 60 L95 40 L85 35 Z" fill="#38BDF8" />
                        <rect x="35" y="25" width="30" height="10" rx="5" fill="#0284C7" />
                    </svg>
                );
                break;
        }
        return content;
    }

    const POOL = [
        // 1. Identify Line of Symmetry
        { id: 1, topic: 'Identify Line of Symmetry', text: "Is the red dotted line a correct line of symmetry for this shape?", graphic: renderShapeOutlineWithLine('square_line', '#E0F7FA'), options: ["True", "False"], correctAnswer: "True", solution: "Yes! If you fold the square along that vertical line, the left and right halves match exactly." },
        { id: 2, topic: 'Identify Line of Symmetry', text: "Is the red dotted line a correct line of symmetry?", graphic: renderShapeOutlineWithLine('rectangle_line', '#FEF08A'), options: ["True", "False"], correctAnswer: "True", solution: "Yes! The horizontal line cuts the rectangle into perfectly matching top and bottom halves." },
        { id: 3, topic: 'Identify Line of Symmetry', text: "Does this star have the line of symmetry drawn correctly?", graphic: renderShapeOutlineWithLine('star_line', '#FBCFE8'), options: ["True", "False"], correctAnswer: "True", solution: "Yes! The vertical line splits the star perfectly in half." },
        { id: 4, topic: 'Identify Line of Symmetry', text: "If we drew a diagonal line crossing from the top-left to bottom-right of a rectangle, is it a line of symmetry?", graphic: null, options: ["True", "False"], correctAnswer: "False", solution: "False. In a rectangle (that isn't a square), diagonal lines do not create matching halves when folded." },

        // 2. Completing Symmetric Figures
        { id: 5, topic: 'Completing Symmetric Figures', text: "If this is the left half of a symmetric face, what should the right half look like?", graphic: renderHalfFace('#FDE047'), options: ["A matching eye and smile on the right.", "Two eyes on the right.", "A bigger eye on the right.", "A frowning mouth on the right."], correctAnswer: "A matching eye and smile on the right.", solution: "Symmetry means the right half is a mirror image of the left half. It will have exactly one matching eye and an identical upturned smile." },
        { id: 6, topic: 'Completing Symmetric Figures', text: "Which shape, when completed symmetrically, becomes a full circle?", options: ["A semi-circle", "A triangle", "A square", "A rectangle"], correctAnswer: "A semi-circle", solution: "A semi-circle is exactly half of a full circle. When mirrored, it forms the whole shape." },
        { id: 7, topic: 'Completing Symmetric Figures', text: "If you draw half of a butterfly, how do you finish it to make it symmetrical?", options: ["Draw the exact same shapes in reverse on the other side.", "Draw different patterns.", "Draw a bigger wing.", "Leave it blank."], correctAnswer: "Draw the exact same shapes in reverse on the other side.", solution: "A butterfly shows perfect reflectional symmetry across its body." },

        // 3. Lines of Symmetry in Polygons
        { id: 8, topic: 'Lines of Symmetry in Polygons', text: "How many lines of symmetry does a regular hexagon have?", graphic: renderShapeOutlineWithLine('polygon_hex', '#BBF7D0'), options: ["3", "4", "6", "8"], correctAnswer: "6", solution: "A regular hexagon has 6 lines of symmetry (3 connect opposite corners, 3 connect midpoints of opposite sides)." },
        { id: 9, topic: 'Lines of Symmetry in Polygons', text: "How many lines of symmetry does an equilateral triangle have?", graphic: renderShapeOutlineWithLine('polygon_tri', '#BFDBFE'), options: ["1", "2", "3", "0"], correctAnswer: "3", solution: "An equilateral triangle can be folded perfectly along 3 different lines, from each corner to the middle of the opposite side." },
        { id: 10, topic: 'Lines of Symmetry in Polygons', text: "Which set matches correctly?", options: ["Square = 4, Rectangle = 2", "Square = 2, Rectangle = 4", "Square = 4, Rectangle = 4", "Square = 2, Rectangle = 2"], correctAnswer: "Square = 4, Rectangle = 2", solution: "A square has 4 lines (vertical, horizontal, and 2 diagonals). A rectangle only has 2 (vertical and horizontal)." },

        // 4. Symmetry by Folding and Mirroring 
        { id: 11, topic: 'Symmetry by Folding and Mirroring', text: "Which shape is the mirror image of the letter P?", graphic: renderMirrorShape('P', '#10B981'), options: ["The letter b", "The letter q", "The letter d", "The letter P"], correctAnswer: "The letter q", solution: "When mirrored horizontally, the loop of the 'P' moves to the left side, looking like a backwards 'P' or 'q'." },
        { id: 12, topic: 'Symmetry by Folding and Mirroring', text: "Which shape is the mirror image of the letter L?", graphic: renderMirrorShape('L', '#F43F5E'), options: ["A backwards L", "An upside down L", "The letter T", "The letter J"], correctAnswer: "A backwards L", solution: "A mirror flips things left-to-right. So the base pointing right will point left." },
        { id: 13, topic: 'Symmetry by Folding and Mirroring', text: "If an arrow points Right, its mirror image points:", graphic: renderMirrorShape('arrow-right', '#3B82F6'), options: ["Right", "Left", "Up", "Down"], correctAnswer: "Left", solution: "Mirrors reverse the direction. An arrow pointing Right will point Left in the reflection." },

        // 5. Paper Fold Symmetry
        { id: 14, topic: 'Paper Fold Symmetry', text: "A paper is folded in quarters (4 parts), and a single hole is punched in one corner. When unfolded, how many holes will there be?", graphic: renderPaperFold(false, false), options: ["1", "2", "3", "4"], correctAnswer: "4", solution: "Unfolding a quarter-fold duplicates the pattern 4 times across the whole page." },
        { id: 15, topic: 'Paper Fold Symmetry', text: "A paper is folded in half once, and a hole is punched. How many holes are there when unfolded?", options: ["1", "2", "3", "4"], correctAnswer: "2", solution: "Folding in half creates 2 layers. Unfolding it reveals 2 identical punches mirrored across the crease." },
        { id: 16, topic: 'Paper Fold Symmetry', text: "Which pattern correctly shows a paper folded in quarters, punched once, and unfolded?", graphic: null, options: ["Four holes forming a square/rectangle", "Two holes side by side", "Three holes in a line", "One single hole"], correctAnswer: "Four holes forming a square/rectangle", solution: "Because it was folded twice (quarters), the hole reflects across both axes, creating four holes arranged symmetrically." },
        { id: 17, topic: 'Paper Fold Symmetry', text: "If a hole is punched right on the center fold line of a paper folded in half, what shape will the hole be when unfolded?", options: ["Two separate holes", "A single larger shape on the center line", "Three holes", "It will disappear"], correctAnswer: "A single larger shape on the center line", solution: "Punching on the fold means half the punch is on one side and half on the other. Unfolding creates a single symmetrical hole." },

        // 6. Symmetry in Patterns and Tiling
        { id: 18, topic: 'Symmetry in Patterns and Tiling', text: "What makes a pattern a 'tiling' (tessellation)?", options: ["It uses colors.", "The shapes fit together perfectly with no gaps or overlaps.", "The shapes are all circles.", "There are large gaps between shapes."], correctAnswer: "The shapes fit together perfectly with no gaps or overlaps.", solution: "A tiling or tessellation covers a surface completely with no gaps and no overlapping parts." },
        { id: 19, topic: 'Symmetry in Patterns and Tiling', text: "Which shape can NOT be used by itself to tile a flat floor without gaps?", options: ["Square", "Rectangle", "Regular Hexagon", "Circle"], correctAnswer: "Circle", solution: "Circles will always leave curved spaces (gaps) between them when packed together." },
        { id: 20, topic: 'Symmetry in Patterns and Tiling', text: "Does this grid show a valid tiling without gaps?", graphic: renderTilingGaps(), options: ["Yes", "No"], correctAnswer: "No", solution: "There is clearly an empty spot (gap) in the bottom right corner." },
        { id: 21, topic: 'Symmetry in Patterns and Tiling', text: "If you tile a floor with squares in alternating colors, what is this famous pattern called?", options: ["Striped pattern", "Checkerboard pattern", "Polka dot pattern", "Spiral pattern"], correctAnswer: "Checkerboard pattern", solution: "Alternating colored squares form a checkerboard pattern, which is highly symmetrical." },

        // 7. Real Life Symmetry
        { id: 22, topic: 'Real Life Symmetry', text: "Is this butterfly symmetrical?", graphic: renderRealLifeObject('butterfly'), options: ["Yes", "No"], correctAnswer: "Yes", solution: "Most butterflies exhibit reflectional symmetry. Their left wings mirror their right wings." },
        { id: 23, topic: 'Real Life Symmetry', text: "Is this teapot perfectly symmetrical?", graphic: renderRealLifeObject('teapot'), options: ["Yes", "No"], correctAnswer: "No", solution: "A teapot usually has a handle on one side and a spout on the other, making it asymmetrical." },
        { id: 24, topic: 'Real Life Symmetry', text: "Which of the following real-life objects is usually symmetrical?", options: ["A shoe", "A car (front view)", "A plain white t-shirt", "Both the car (front) and t-shirt"], correctAnswer: "Both the car (front) and t-shirt", solution: "From the front, cars are designed to be symmetrical. A plain t-shirt is also symmetrical left-to-right." },
        { id: 25, topic: 'Real Life Symmetry', text: "Can a human face have a line of symmetry?", options: ["Yes, vertically down the middle.", "Yes, horizontally across the eyes.", "No, humans are never symmetrical.", "Yes, diagonally."], correctAnswer: "Yes, vertically down the middle.", solution: "A vertical line down the middle of a face creates rough reflectional symmetry between the left and right sides." }
    ];

    const generateQuestions = () => {
        // Return exactly 25 combined questions
        return POOL;
    };

    useEffect(() => {
        setQuestions(generateQuestions());
        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            api.createPracticeSession(String(uid).includes("-") ? 1 : parseInt(uid, 10), SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            });
            startSession({ nodeId: NODE_ID, sessionType: 'assessment' });
            v4AnswersPayload.current = [];
            v4IsFinishedRef.current = false;
        }
    }, []);

    const handleRecordResponse = () => {
        const currentQ = questions[qIndex];
        const isCorrect = selectedOption ? selectedOption === currentQ.correctAnswer : null;
        const timeSpent = Math.round((Date.now() - questionStartTime.current) / 1000);
        const isSkipped = !selectedOption;

        const responseData = {
            selectedOption,
            isCorrect,
            timeTaken: (responses[qIndex]?.timeTaken || 0) + timeSpent,
            isSkipped
        };

        setResponses(prev => ({ ...prev, [qIndex]: responseData }));

        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const attemptData = {
                difficulty_level: 'Mixed', // Test is mixed
                user_id: String(uid).includes("-") ? 1 : parseInt(uid, 10),
                session_id: sessionId,
                skill_id: SKILL_ID,
                question_text: currentQ.text,
                correct_answer: currentQ.correctAnswer,
                student_answer: isSkipped ? "SKIPPED" : selectedOption,
                is_correct: isSkipped ? false : isCorrect,
                solution_text: currentQ.solution,
                time_spent_seconds: timeSpent
            };
            api.recordAttempt(attemptData).catch(console.error);
      v4AnswersPayload.current.push({
        node_id: NODE_ID,
        is_correct: isCorrect,
        time_spent_ms: Date.now() - questionStartTime.current,
      });
        }
    };

    const navigateToQuestion = (targetIndex) => {
        handleRecordResponse();
        setQIndex(targetIndex);
        setSelectedOption(responses[targetIndex]?.selectedOption || null);
        questionStartTime.current = Date.now();
    };

    const handleNext = () => {
        if (qIndex < questions.length - 1) {
            navigateToQuestion(qIndex + 1);
        } else {
            handleRecordResponse();
            finalizeTest();
        }
    };

    const handlePrev = () => {
        if (qIndex > 0) {
            navigateToQuestion(qIndex - 1);
        }
    };

    const finalizeTest = async () => {
        setIsTestOver(true);
        if (!v4IsFinishedRef.current) {
          v4IsFinishedRef.current = true;
          finishSession({ answers_payload: v4AnswersPayload.current });
        }
        if (sessionId) await api.finishSession(sessionId).catch(console.error);

        const rawUid = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        const uid = parseInt(rawUid, 10);
        if (!isNaN(uid)) {
            const correctCount = Object.values(responses).filter(r => r.isCorrect === true).length;
            const wrongCount = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
            const skippedCount = questions.length - correctCount - wrongCount;
            await api.createReport({
                title: SKILL_NAME,
                type: 'practice',
                score: (correctCount / questions.length) * 100,
                parameters: {
                    skill_id: SKILL_ID,
                    total_questions: questions.length,
                    correct_answers: correctCount,
                    skipped_questions: skippedCount,
                    time_taken_seconds: timeElapsed
                },
                user_id: uid
            }).catch(console.error);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (isTestOver) return;
        const timer = setInterval(() => setTimeElapsed(p => p + 1), 1000);
        return () => clearInterval(timer);
    }, [isTestOver]);
    if (questions.length === 0) return <div>Loading...</div>;

    if (isTestOver) {
        const correct = Object.values(responses).filter(r => r.isCorrect === true).length;
        const wrong = Object.values(responses).filter(r => r.isCorrect === false && !r.isSkipped).length;
        const skipped = questions.length - correct - wrong;

        return (
            <div className="junior-practice-page grey-selection-theme" style={{ background: '#F8FAFC', minHeight: '100vh', padding: '2rem', overflowY: 'auto' }}>
                <style>{BLUE_THEME_CSS}</style>
                <div className="exam-report-container">
                    <div className="results-hero-section flex flex-col items-center mb-8 mt-4">
                        <img src={mascotImg} alt="Happy Mascot" className="w-40 h-40 mb-2 drop-shadow-lg object-contain" />
                        <h1 className="text-5xl font-black text-[#31326F] mb-2 tracking-tight">Test Report</h1>
                        <p className="text-[#64748B] text-xl font-medium mb-8">How you performed in <span className="font-bold">{SKILL_NAME}</span></p>

                        <div className="results-stats-grid grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-5xl">
                            <div className="stat-card bg-[#EFF6FF] p-6 rounded-3xl shadow-sm border-2 border-[#DBEAFE] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Score</span>
                                <span className="text-4xl font-black text-[#1E3A8A]">{Math.round((correct / questions.length) * 100)}%</span>
                            </div>
                            <div className="stat-card bg-[#F0FDF4] p-6 rounded-3xl shadow-sm border-2 border-[#DCFCE7] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#22C55E] mb-1">Correct</span>
                                <span className="text-4xl font-black text-[#14532D]">{correct}</span>
                            </div>
                            <div className="stat-card bg-[#FEF2F2] p-6 rounded-3xl shadow-sm border-2 border-[#FEE2E2] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#EF4444] mb-1">Wrong</span>
                                <span className="text-4xl font-black text-[#7F1D1D]">{wrong}</span>
                            </div>
                            <div className="stat-card bg-[#F8FAFC] p-6 rounded-3xl shadow-sm border-2 border-[#E2E8F0] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#64748B] mb-1">Skipped</span>
                                <span className="text-4xl font-black text-[#334155]">{skipped}</span>
                            </div>
                            <div className="stat-card bg-[#EFF6FF] p-6 rounded-3xl shadow-sm border-2 border-[#DBEAFE] text-center flex flex-col items-center justify-center">
                                <span className="block text-xs font-black uppercase tracking-widest text-[#3B82F6] mb-1">Total Time</span>
                                <span className="text-4xl font-black text-[#1E3A8A]">{formatTime(timeElapsed)}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-white text-[#31326F] border-2 border-[#31326F] px-8 py-3 rounded-2xl font-black uppercase tracking-wider hover:bg-[#31326F] hover:text-white transition-colors"
                            style={{ fontSize: '1.1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        >
                            Back to Topics
                        </button>
                    </div>

                    <div style={{ marginBottom: '2rem', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1E293B', marginBottom: '1.5rem' }}>Detailed Review & Solutions</h2>
                        {questions.map((q, idx) => {
                            const res = responses[idx] || { isSkipped: true, timeTaken: 0 };
                            return (
                                <details key={idx} className="solution-accordion group">
                                    <summary className="solution-header cursor-pointer hover:bg-slate-50 transition-colors" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', width: '100%' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, overflow: 'hidden' }}>
                                            <span style={{ fontWeight: '800', minWidth: '32px', height: '32px', background: '#FBBF24', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '0.9rem', flexShrink: 0 }}>{idx + 1}</span>
                                            <div className="hidden md:block truncate text-sm text-slate-500" style={{ flex: 1, maxWidth: '350px' }}>
                                                <LatexContent html={q.text} />
                                            </div>
                                            {res.isSkipped ? <span className="status-badge status-skipped shrink-0">Skipped</span> :
                                                res.isCorrect ? <span className="status-badge status-correct shrink-0">Correct</span> :
                                                    <span className="status-badge status-wrong shrink-0">Incorrect</span>}
                                        </div>
                                        <div style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-600 font-semibold text-sm whitespace-nowrap">
                                                Check Solution ↓
                                            </span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Clock size={16} /> {res.timeTaken}s
                                            </div>
                                        </div>
                                    </summary>
                                    <div className="solution-content">
                                        <div style={{ marginBottom: '1rem', padding: '1rem', borderLeft: '4px solid #3B82F6', background: '#F8FAFC' }}>
                                            <LatexContent html={q.text} />
                                            {q.graphic && <div className="mt-4 flex justify-center">{q.graphic}</div>}
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                            {q.options.map((opt, oIdx) => (
                                                <div key={oIdx} style={{
                                                    padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0',
                                                    background: opt === q.correctAnswer ? '#DCFCE7' : (opt === res.selectedOption ? '#FEE2E2' : 'white'),
                                                    color: opt === q.correctAnswer ? '#166534' : (opt === res.selectedOption ? '#991B1B' : '#475569')
                                                }}>
                                                    <LatexContent html={opt} />
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Your Answer</h5>
                                                {res.isSkipped ? (
                                                    <span style={{ color: '#F59E0B', fontWeight: '700', fontSize: '1.1rem' }}>Skipped</span>
                                                ) : (
                                                    <span style={{ color: res.isCorrect ? '#166534' : '#DC2626', fontWeight: '700', fontSize: '1.1rem' }}>
                                                        {res.selectedOption ? <LatexContent html={res.selectedOption} /> : "Skipped"}
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{ background: '#DCFCE7', padding: '1rem', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                                                <h5 style={{ fontSize: '0.7rem', fontWeight: '800', color: '#166534', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>Correct Answer</h5>
                                                <span style={{ color: '#166534', fontWeight: '700', fontSize: '1.1rem' }}>
                                                    <LatexContent html={q.correctAnswer} />
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ background: '#F0F9FF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E0F2FE' }}>
                                            <h4 style={{ color: '#0284C7', fontWeight: '800', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Solution:</h4>
                                            {(() => {
                                                const steps = q.solution.split(/(?<=\.)\s+(?=[A-Z0-9\$])/);
                                                if (steps.length <= 1) {
                                                    return <LatexContent html={q.solution} />;
                                                }
                                                return (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                                        {steps.map((stepStr, sIdx) => (
                                                            <div key={sIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                                <span style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.9rem' }}>Step {sIdx + 1}:</span>
                                                                <span style={{ color: '#334155', lineHeight: '1.6' }}><LatexContent html={stepStr.trim()} /></span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </details>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="junior-practice-page grey-selection-theme" style={{ fontFamily: '"Open Sans", sans-serif', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <style>{BLUE_THEME_CSS}</style>
            <header className="junior-practice-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)', alignItems: 'center', padding: '0 2rem', gap: '1rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#31326F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {SKILL_NAME.length > 30 ? "Chapter Test" : SKILL_NAME}
                </div>
                <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border-2 border-[#3B82F6]/30 text-[#1E40AF] font-black text-xl shadow-lg">
                    {qIndex + 1} / {questions.length}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#3B82F6]/30 text-[#1E40AF] font-bold text-lg shadow-md flex items-center gap-2">
                        <Clock size={20} /> {formatTime(timeElapsed)}
                    </div>
                </div>
            </header>

            <main className="practice-content-wrapper" style={{ flex: 1, padding: '1rem 2rem 140px 2rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="practice-board-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '2rem', maxWidth: '1200px', margin: '0 auto', alignItems: 'stretch', width: '100%', flex: 1, minHeight: 0, marginBottom: '60px' }}>

                    {/* Left Column: Question Card */}
                    <div className="practice-left-col" style={{ width: "100%", minWidth: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                        <div className="question-card-modern" style={{ padding: "2rem", flex: "none", minHeight: "auto", height: "fit-content", display: "flex", flexDirection: "column", justifyContent: "flex-start", margin: "0" }}>
                            <div className="question-header-modern" style={{ flexShrink: 0, marginBottom: "0.5rem" }}>
                                <h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', maxHeight: 'none', fontWeight: '500', textAlign: 'left', color: '#2D3748', lineHeight: '1.5', marginBottom: '1rem' }}>
                                    <LatexContent html={questions[qIndex].text} />
                                </h2>
                                {questions[qIndex].graphic && (
                                    <div className="my-4 flex justify-center items-center">
                                        {questions[qIndex].graphic}
                                    </div>
                                )}
                            </div>
                            <div className="interaction-area-modern" style={{ marginTop: "1.5rem", flex: "none" }}>
                                <div className="options-grid-modern" style={{ display: 'grid', gap: '0.75rem', width: '100%', maxWidth: '800px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                    {questions[qIndex].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            className={`option-btn-modern ${selectedOption === option ? 'selected' : ''}`}
                                            onClick={() => setSelectedOption(option)}
                                        >
                                            <LatexContent html={option} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Question Palette */}
                    <div className="question-palette-container" style={{ width: '300px', background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', maxHeight: 'calc(100vh - 220px)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1E293B', marginBottom: '1rem', textAlign: 'center', flexShrink: 0 }}>Question Palette</h3>
                        <div className="palette-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem', flex: 1, alignContent: 'start' }}>
                            {questions.map((_, idx) => {
                                const isCurrent = qIndex === idx;
                                const hasResponded = responses[idx] && !responses[idx].isSkipped;
                                const isSkipped = responses[idx] && responses[idx].isSkipped;

                                let btnBg = '#F8FAFC';
                                let btnColor = '#64748B';
                                let btnBorder = '1px solid #E2E8F0';

                                if (isCurrent) {
                                    btnBorder = '2px solid #3B82F6';
                                    btnBg = '#EFF6FF';
                                    btnColor = '#1D4ED8';
                                } else if (hasResponded) {
                                    btnBg = '#DCFCE7';
                                    btnColor = '#166534';
                                    btnBorder = '1px solid #BBF7D0';
                                } else if (isSkipped) {
                                    btnBg = '#FFF7ED';
                                    btnColor = '#C2410C';
                                    btnBorder = '1px solid #FFEDD5';
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => navigateToQuestion(idx)}
                                        style={{
                                            height: '36px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            borderRadius: '6px', fontWeight: '700', fontSize: '0.85rem',
                                            cursor: 'pointer', transition: 'all 0.2s',
                                            background: btnBg, color: btnColor, border: btnBorder, padding: '0'
                                        }}
                                        className="hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        {idx + 1}
                                    </button>
                                );
                            })}
                        </div>
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '0.5rem', columnGap: '1rem', fontSize: '0.8rem', color: '#64748B' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#DCFCE7', border: '1px solid #BBF7D0' }}></div> Answered</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#FFF7ED', border: '1px solid #FFEDD5' }}></div> Skipped</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}></div> Unvisited</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#EFF6FF', border: '2px solid #3B82F6' }}></div> Current</div>
                        </div>
                    </div>

                </div>
            </main>

            <footer className="junior-bottom-bar">
                <div className="desktop-footer-controls">
                    <div className="bottom-left">
                        <button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit Test</button>
                    </div>
                    <div className="bottom-right">
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handlePrev} disabled={qIndex === 0}>
                                <ChevronLeft size={20} /> Previous
                            </button>
                            <button className="nav-pill-next-btn nav-pastel-btn" onClick={handleNext}>
                                {qIndex === questions.length - 1 ? "Finish Test" : "Next Question"} <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mobile-footer-controls" style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <div className="mobile-footer-left">
                        <button className="bg-red-50 text-red-500 px-3 py-2 rounded-xl border-2 border-red-100 font-bold" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center' }} onClick={() => navigate(-1)}>
                            Exit
                        </button>
                    </div>
                    <div className="mobile-footer-right" style={{ display: 'flex', gap: '5px' }}>
                        <button
                            className="nav-pill-next-btn bg-gray-200 text-gray-600"
                            onClick={handlePrev}
                            disabled={qIndex === 0}
                            style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }}
                        >
                            <ChevronLeft size={16} strokeWidth={3} /> Prev
                        </button>
                        <button
                            className="nav-pill-next-btn"
                            style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontWeight: 'bold', fontSize: '0.8rem' }}
                            onClick={handleNext}
                        >
                            {qIndex === questions.length - 1 ? "Finish" : "Next"} <ChevronRight size={16} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FunWithSymmetryTest;
