import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import ExplanationModal from '../../../../ExplanationModal';
import '../FunWithSymmetry.css';

const CORRECT_MESSAGES = [
    "✨ You have a great imagination! ✨",
    "🌟 Perfect! You can see the symmetry! 🌟",
    "🎉 Awesome! That's exactly how it folds out! 🎉",
    "✨ Fantastic visualization! ✨",
    "🚀 Super! You're a folding expert! 🚀"
];

const PaperFoldSymmetry = () => {
    const navigate = useNavigate();
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [showResults, setShowResults] = useState(false);

    // Logging
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const SKILL_ID = 1201; // Adjust as needed
    const SKILL_NAME = "Fun with Symmetry - Paper Fold Symmetry";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    // ----------------------------------------------------------------------
    // SVGs for the Question (Folded/Punched) and the Options (Unfolded)
    // ----------------------------------------------------------------------
    const FoldedState = ({ bgClass, children }) => (
        <div className={`relative w-24 h-24 md:w-32 md:h-32 ${bgClass} rounded-br-2xl border-l-[4px] border-dashed border-gray-400 border-t-[4px] shadow-lg flex justify-center items-center overflow-hidden`}>
            {children}
            <div className="absolute top-1 left-1 md:top-2 md:left-2 text-[10px] md:text-xs font-bold text-gray-500 bg-white/50 px-1 py-0.5 md:px-2 md:py-1 rounded-full pointer-events-none">Folded in Half</div>
        </div>
    );

    const FoldedQuarterState = ({ bgClass, children }) => (
        <div className={`relative w-24 h-24 md:w-32 md:h-32 ${bgClass} rounded-br-2xl border-l-[4px] border-t-[4px] border-dashed border-gray-400 shadow-lg flex justify-center items-center overflow-hidden`}>
            {children}
            <div className="absolute top-1 left-1 text-[10px] md:text-xs font-bold text-gray-500 bg-white/50 px-1 py-0.5 md:px-2 md:py-1 rounded-full pointer-events-none text-center leading-tight">Folded<br />Twice</div>
        </div>
    );

    const UnfoldedSquare = ({ children }) => (
        <div className="relative w-20 h-20 md:w-28 md:h-28 bg-white rounded-xl md:rounded-2xl border-2 border-gray-300 shadow-sm flex items-center justify-center pointer-events-none overflow-hidden hover:bg-gray-50 transition-colors">
            {/* Outline of original folds for context */}
            <div className="absolute w-[2px] h-full bg-gray-200/50 left-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="absolute h-[2px] w-full bg-gray-200/50 top-1/2 -translate-y-1/2 pointer-events-none" />
            {children}
        </div>
    );

    const generateQuestions = () => {
        const questions = [];
        const colorPalette = [
            { bg: 'bg-red-500', text: 'text-red-500' },
            { bg: 'bg-blue-500', text: 'text-blue-500' },
            { bg: 'bg-green-500', text: 'text-green-500' },
            { bg: 'bg-purple-500', text: 'text-purple-500' },
            { bg: 'bg-orange-500', text: 'text-orange-500' },
            { bg: 'bg-pink-500', text: 'text-pink-500' },
            { bg: 'bg-yellow-500', text: 'text-yellow-500' },
            { bg: 'bg-indigo-500', text: 'text-indigo-500' },
            { bg: 'bg-cyan-500', text: 'text-cyan-500' },
            { bg: 'bg-rose-500', text: 'text-rose-500' }
        ];

        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const isHard = i >= 6; // Q0-Q5 are easy/half-fold, Q6-Q9 are hard/quarter-fold
            const color = colorPalette[i % colorPalette.length];
            const type = isHard ? 'quarter' : 'half';

            let visual = null;
            let options = [];
            let correctIndex = 0;
            let solution = "";

            if (!isHard) {
                // HALF FOLD: 6 unique patterns (i = 0 to 5)
                if (i === 0) {
                    // Hole in bottom-right corner
                    visual = <div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 right-2`} />;
                    options = [
                        <div key="O0"><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 right-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 left-2`} /></div>,
                        <div key="O1"><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-2 right-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-2 left-2`} /></div>,
                        <div key="O2"><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-2 right-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 left-2`} /></div>,
                        <div key="O3"><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-2 left-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-2 right-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 left-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 right-2`} /></div>
                    ];
                    correctIndex = 0;
                    solution = "When you fold a paper in half once and punch a hole near the bottom corner, opening it creates two matching holes at the bottom corners.";
                } else if (i === 1) {
                    // Half hole on the left folded edge
                    visual = <div className={`w-10 h-16 rounded-full ${color.bg} absolute top-1/2 -translate-y-1/2 -left-4`} />;
                    options = [
                        <div key="O0"><div className={`w-12 h-16 rounded-full ${color.bg} absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`} /></div>,
                        <div key="O1"><div className={`w-6 h-12 rounded-full ${color.bg} absolute top-1/2 -translate-y-1/2 -left-4`} /><div className={`w-6 h-12 rounded-full ${color.bg} absolute top-1/2 -translate-y-1/2 -right-4`} /></div>,
                        <div key="O2"><div className={`w-12 h-16 rounded-full ${color.bg} absolute top-2 left-1/2 -translate-x-1/2`} /></div>,
                        <div key="O3"><div className={`w-8 h-12 rounded-full ${color.bg} absolute top-2 left-1/2 -translate-x-1/2`} /><div className={`w-8 h-12 rounded-full ${color.bg} absolute bottom-2 left-1/2 -translate-x-1/2`} /></div>
                    ];
                    correctIndex = 0;
                    solution = "If you cut a half-circle on the folded edge, unfolding the paper makes one complete circle right in the center.";
                } else if (i === 2) {
                    // Half holes on top and bottom
                    visual = (
                        <>
                            <div className={`w-8 h-8 rounded-full ${color.bg} absolute -top-4 left-1/2 -translate-x-1/2`} />
                            <div className={`w-8 h-8 rounded-full ${color.bg} absolute -bottom-4 left-1/2 -translate-x-1/2`} />
                        </>
                    );
                    options = [
                        <div key="O0"><div className={`w-8 h-8 rounded-full ${color.bg} absolute -top-4 left-1/4 -translate-x-1/2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute -top-4 right-1/4 translate-x-1/2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute -bottom-4 left-1/4 -translate-x-1/2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute -bottom-4 right-1/4 translate-x-1/2`} /></div>,
                        <div key="O1"><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-4 left-4`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-4 right-4`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-4 left-4`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-4 right-4`} /></div>,
                        <div key="O2"><div className={`w-16 h-16 rounded-full ${color.bg} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} /></div>,
                        <div key="O3"><div className={`w-8 h-8 rounded-full ${color.bg} absolute -left-4 top-1/4 -translate-y-1/2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute -left-4 bottom-1/4 translate-y-1/2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute -right-4 top-1/4 -translate-y-1/2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute -right-4 bottom-1/4 translate-y-1/2`} /></div>
                    ];
                    correctIndex = 0;
                    solution = "Cutting half-holes on the top and bottom edge of a folded paper will unfold to show matching half-holes on both sides of the edges.";
                } else if (i === 3) {
                    // Hole in top-right corner
                    visual = <div className={`w-6 h-6 rounded-full ${color.bg} absolute top-2 right-2`} />;
                    options = [
                        <div key="O0"><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-2 right-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-2 left-2`} /></div>,
                        <div key="O1"><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-2 right-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 right-2`} /></div>,
                        <div key="O2"><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 left-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 right-2`} /></div>,
                        <div key="O3"><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-1/2 left-4 -translate-y-1/2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-1/2 right-4 -translate-y-1/2`} /></div>
                    ];
                    correctIndex = 0;
                    solution = "The hole on the top right will flip exactly over to the top left when opened.";
                } else if (i === 4) {
                    // Square cut in the center of the fold
                    visual = <div className={`w-8 h-12 ${color.bg} absolute top-1/2 -translate-y-1/2 -left-4 rounded-r-md`} />;
                    options = [
                        <div key="O0"><div className={`w-16 h-12 ${color.bg} absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md`} /></div>,
                        <div key="O1"><div className={`w-8 h-12 ${color.bg} absolute top-1/2 -translate-y-1/2 -right-4 rounded-l-md`} /><div className={`w-8 h-12 ${color.bg} absolute top-1/2 -translate-y-1/2 -left-4 rounded-r-md`} /></div>,
                        <div key="O2"><div className={`w-12 h-16 ${color.bg} absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-md`} /></div>,
                        <div key="O3"><div className={`w-10 h-10 ${color.bg} absolute top-4 left-1/2 -translate-x-1/2 rounded-md`} /><div className={`w-10 h-10 ${color.bg} absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md`} /></div>
                    ];
                    correctIndex = 0;
                    solution = "Cutting a rectangle on the folded edge makes a wider rectangle exactly in the center.";
                } else if (i === 5) {
                    // Two small holes on the right edge
                    visual = (
                        <>
                            <div className={`w-6 h-6 rounded-full ${color.bg} absolute top-4 right-2`} />
                            <div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-4 right-2`} />
                        </>
                    );
                    options = [
                        <div key="O0"><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-4 right-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-4 right-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-4 left-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-4 left-2`} /></div>,
                        <div key="O1"><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-4 right-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-4 right-2`} /></div>,
                        <div key="O2"><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-4 left-1/4 -translate-x-1/2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-4 right-1/4 translate-x-1/2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-4 left-1/4 -translate-x-1/2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-4 right-1/4 translate-x-1/2`} /></div>,
                        <div key="O3"><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-1/2 right-2 -translate-y-1/2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-1/2 left-2 -translate-y-1/2`} /></div>
                    ];
                    correctIndex = 0;
                    solution = "Two holes on the right side will mirror to two holes on the left side, giving us 4 holes total near the outer edges.";
                }
            } else {
                // QUARTER FOLD: 4 unique patterns (i = 6 to 9)
                if (i === 6) {
                    // Hole in center tip (top left)
                    visual = <div className={`w-12 h-12 rounded-full ${color.bg} absolute -top-6 -left-6`} />;
                    options = [
                        <div key="O0"><div className={`w-16 h-16 rounded-full ${color.bg} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} /></div>,
                        <div key="O1"><div className={`w-8 h-8 rounded-full ${color.bg} absolute top-2 left-2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute top-2 right-2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute bottom-2 left-2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute bottom-2 right-2`} /></div>,
                        <div key="O2"><div className={`w-12 h-12 rounded-full ${color.bg} absolute -top-6 -left-6`} /><div className={`w-12 h-12 rounded-full ${color.bg} absolute -top-6 -right-6`} /><div className={`w-12 h-12 rounded-full ${color.bg} absolute -bottom-6 -left-6`} /><div className={`w-12 h-12 rounded-full ${color.bg} absolute -bottom-6 -right-6`} /></div>,
                        <div key="O3"><div className={`w-10 h-10 rounded-full ${color.bg} absolute top-1/2 left-4 -translate-y-1/2`} /><div className={`w-10 h-10 rounded-full ${color.bg} absolute top-1/2 right-4 -translate-y-1/2`} /></div>
                    ];
                    correctIndex = 0;
                    solution = "Cutting the tip where all folds meet forms one huge circle exactly in the center of the unfolded paper.";
                } else if (i === 7) {
                    // Hole in the outer corner
                    visual = <div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 right-2`} />;
                    options = [
                        <div key="O0"><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 right-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 left-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-2 right-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-2 left-2`} /></div>,
                        <div key="O1"><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-1/4 left-3/4 -translate-x-1/2 -translate-y-1/2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-3/4 left-1/4 -translate-x-1/2 -translate-y-1/2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute top-3/4 left-3/4 -translate-x-1/2 -translate-y-1/2`} /></div>,
                        <div key="O2"><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 right-2`} /><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 left-2`} /></div>,
                        <div key="O3"><div className={`w-6 h-6 rounded-full ${color.bg} absolute bottom-2 right-2`} /></div>
                    ];
                    correctIndex = 0;
                    solution = "When you fold a paper twice, punching a hole in the free corner duplicates to all four outer corners.";
                } else if (i === 8) {
                    // Square cutout on the inner straight edge
                    visual = <div className={`w-8 h-8 ${color.bg} absolute top-1/2 -translate-y-1/2 -left-4 rotate-45`} />;
                    options = [
                        <div key="O0"><div className={`w-12 h-12 ${color.bg} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45`} /></div>,
                        <div key="O1"><div className={`w-8 h-8 ${color.bg} absolute top-1/2 -translate-y-1/2 -left-4 rotate-45`} /><div className={`w-8 h-8 ${color.bg} absolute top-1/2 -translate-y-1/2 -right-4 rotate-45`} /></div>,
                        <div key="O2"><div className={`w-8 h-8 ${color.bg} absolute top-4 left-4 rotate-45`} /><div className={`w-8 h-8 ${color.bg} absolute top-4 right-4 rotate-45`} /><div className={`w-8 h-8 ${color.bg} absolute bottom-4 left-4 rotate-45`} /><div className={`w-8 h-8 ${color.bg} absolute bottom-4 right-4 rotate-45`} /></div>,
                        <div key="O3"><div className={`w-8 h-8 ${color.bg} absolute top-1/2 left-4 -translate-y-1/2 rotate-45`} /><div className={`w-8 h-8 ${color.bg} absolute top-1/2 right-4 -translate-y-1/2 rotate-45`} /></div>
                    ];
                    correctIndex = 0;
                    solution = "If you cut a triangle on the inner edge of a quarter-fold, unfolding it forms a large diamond exactly in the center.";
                } else if (i === 9) {
                    // Hole in the middle of the quarter
                    visual = <div className={`w-8 h-8 rounded-full ${color.bg} absolute top-2 left-2`} />;
                    options = [
                        <div key="O0"><div className={`w-8 h-8 rounded-full ${color.bg} absolute top-2 left-2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute top-2 right-2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute bottom-2 left-2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute bottom-2 right-2`} /></div>,
                        <div key="O1"><div className={`w-8 h-8 rounded-full ${color.bg} absolute top-1/2 left-4 -translate-y-1/2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute top-1/2 right-4 -translate-y-1/2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute top-4 left-1/2 -translate-x-1/2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute bottom-4 left-1/2 -translate-x-1/2`} /></div>,
                        <div key="O2"><div className={`w-12 h-12 rounded-full ${color.bg} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} /></div>,
                        <div key="O3"><div className={`w-8 h-8 rounded-full ${color.bg} absolute top-2 left-2`} /><div className={`w-8 h-8 rounded-full ${color.bg} absolute bottom-2 right-2`} /></div>
                    ];
                    correctIndex = 0;
                    solution = "A single hole inside the quarter fold duplicates symmetrically to the exact matching spots of all 4 quarters.";
                }
            }

            // Shuffle options slightly to vary actual chosen option
            const shuffledOptionsInfo = options.map((opt, idx) => ({ opt, isCorrect: idx === correctIndex })).sort(() => 0.5 - Math.random());
            const finalOptions = shuffledOptionsInfo.map(i => i.opt);
            const finalCorrectIndex = shuffledOptionsInfo.findIndex(i => i.isCorrect);

            questions.push({
                type,
                questionVisual: visual,
                options: finalOptions,
                correctIndex: finalCorrectIndex,
                solution
            });
        }
        return questions;
    };


    useEffect(() => {
        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (userId && !sessionId) {
            api.createPracticeSession(userId, SKILL_ID).then(sess => {
                if (sess && sess.session_id) setSessionId(sess.session_id);
            }).catch(err => console.error("Failed to start session", err));
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                accumulatedTime.current += Date.now() - questionStartTime.current;
                isTabActive.current = false;
            } else {
                questionStartTime.current = Date.now();
                isTabActive.current = true;
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        setSessionQuestions(generateQuestions());

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (showResults) return;
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [showResults]);

    useEffect(() => {
        if (sessionQuestions.length > 0) {
            const qData = sessionQuestions[qIndex];
            setCurrentQuestion(qData);
            const previousAnswer = answers[qIndex];
            if (previousAnswer) {
                setSelectedOption(previousAnswer.selected);
                setIsSubmitted(true);
                setIsCorrect(previousAnswer.isCorrect);
            } else {
                setSelectedOption(null);
                setIsSubmitted(false);
                setIsCorrect(false);
            }
        }
    }, [qIndex, sessionQuestions]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (val) => {
        if (isSubmitted) return;
        setSelectedOption(val);
    };

    const handleSubmit = () => {
        if (selectedOption === null || !currentQuestion) return;

        const isRight = selectedOption === currentQuestion.correctIndex;
        setIsCorrect(isRight);
        setIsSubmitted(true);
        setAnswers(prev => ({ ...prev, [qIndex]: { isCorrect: isRight, selected: selectedOption } }));

        if (isRight) {
            setFeedbackMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
        } else {
            setShowExplanationModal(true);
        }

        const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
        if (!userId) return;
        let timeSpent = accumulatedTime.current;
        if (isTabActive.current) timeSpent += Date.now() - questionStartTime.current;
        api.recordAttempt({
            user_id: parseInt(userId, 10),
            session_id: sessionId,
            skill_id: SKILL_ID,
            difficulty_level: qIndex < 3 ? 'Easy' : (qIndex < 6 ? 'Medium' : 'Hard'),
            question_text: `Paper folded ${currentQuestion.type === 'half' ? 'once' : 'twice'} and punched. Choose the unfolded shape.`,
            correct_answer: "Option " + (currentQuestion.correctIndex + 1),
            student_answer: "Option " + (selectedOption + 1),
            is_correct: isRight,
            solution_text: currentQuestion.solution,
            time_spent_seconds: Math.round(timeSpent / 1000)
        }).catch(console.error);
    };

    const handleNext = async () => {
        if (qIndex < TOTAL_QUESTIONS - 1) {
            setQIndex(prev => prev + 1);
            setIsSubmitted(false);
            setIsCorrect(false);
            setSelectedOption(null);
            setShowExplanationModal(false);
            accumulatedTime.current = 0;
            questionStartTime.current = Date.now();
        } else {
            const userId = sessionStorage.getItem('userId');
            if (userId && sessionId) {
                const totalCorrect = Object.values(answers).filter(val => val.isCorrect).length;
                await api.createReport({
                    title: SKILL_NAME,
                    type: 'practice',
                    score: (totalCorrect / TOTAL_QUESTIONS) * 100,
                    parameters: { skill_id: SKILL_ID, total_questions: TOTAL_QUESTIONS, correct_answers: totalCorrect, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed },
                    user_id: parseInt(userId, 10)
                });
                await api.finishSession(sessionId);
            }
            setShowResults(true);
        }
    };

    const handlePrevious = () => { if (qIndex > 0) setQIndex(prev => prev - 1); };

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;
        const total = TOTAL_QUESTIONS;
        const percentage = Math.round((score / total) * 100);

        return (
            <div className="junior-practice-page results-view overflow-y-auto" style={{ fontFamily: '"Open Sans", sans-serif' }}>
                <header className="junior-practice-header results-header relative flex justify-center items-center">
                    <button onClick={() => navigate(-1)} className="absolute top-8 right-8 px-6 py-3 bg-white/20 hover:bg-white/30 text-[#31326F] rounded-2xl font-bold text-lg transition-all flex items-center gap-2 z-50 border-2 border-[#31326F]/30 shadow-md backdrop-blur-sm"><X size={24} /> Back</button>
                    <div className="title-area"><h1 className="text-3xl font-bold text-[#31326F] pt-8">Fold & Match Result</h1></div>
                </header>
                <main className="practice-content results-content max-w-5xl mx-auto w-full px-4 pt-4">
                    <div className="results-hero-section flex flex-col items-center mb-8">
                        <h2 className="text-4xl font-normal text-[#31326F] mb-2">Practice Complete! 🎉</h2>
                        <div className="stars-container flex gap-4 my-6">
                            {[1, 2, 3].map(i => (
                                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }} className={`star-wrapper ${percentage >= (i * 33) ? 'active' : ''}`}>
                                    <Star size={60} fill={percentage >= (i * 33) ? "#FFD700" : "#EDF2F7"} color={percentage >= (i * 33) ? "#F6AD55" : "#CBD5E0"} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="results-stats-grid grid grid-cols-2 gap-4 w-full max-w-lg mb-8">
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0F7FA] text-center">
                                <span className="block text-xs font-bold uppercase tracking-widest text-[#0097A7] mb-1">Score</span>
                                <span className="text-4xl font-black text-[#31326F]">{score}/{total}</span>
                            </div>
                            <div className="stat-card bg-white p-6 rounded-3xl shadow-sm border-2 border-[#E0F7FA] text-center">
                                <span className="block text-xs font-bold uppercase tracking-widest text-[#0097A7] mb-1">Time</span>
                                <span className="text-4xl font-black text-[#31326F]">{formatTime(timeElapsed)}</span>
                            </div>
                        </div>
                        <button className="px-12 py-4 rounded-2xl bg-[#0097A7] text-white font-bold text-xl shadow-lg hover:bg-[#00838F] transition-all flex border-b-4 border-[#006064] active:border-b-0 active:translate-y-1" onClick={() => navigate(-1)}>Back to Topics</button>
                    </div>
                </main>
            </div>
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="junior-practice-page symmetry-theme" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <header className="junior-practice-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' }}>
                <div className="header-left">
                    <h1 className="text-xl font-bold text-[#31326F]">Fun with Symmetry</h1>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-[#0097A7]/30 text-[#31326F] font-bold text-lg shadow-sm whitespace-nowrap">Question {qIndex + 1} of {TOTAL_QUESTIONS}</div>
                </div>
                <div className="header-right"><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#0097A7]/30 text-[#31326F] font-bold text-lg shadow-sm">{formatTime(timeElapsed)}</div></div>
            </header>

            <main className="practice-content-wrapper flex flex-col min-h-[calc(100vh-140px)] py-2 px-4 md:p-4 relative overflow-y-auto overflow-x-hidden">
                <div className="w-full max-w-5xl mx-auto my-4 md:my-8 bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-xl border-4 border-[#E0F7FA] p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-8 items-center justify-start h-auto min-h-[400px]">

                    <div className="w-full flex justify-center text-center pb-2">
                        <h2 className="text-xl md:text-2xl font-normal font-['Open_Sans'] text-[#31326F] px-4">
                            How does the paper look when it is <span className="text-[#0097A7]">unfolded</span>?
                        </h2>
                    </div>

                    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 h-full">

                        {/* Interactive Area - FOLDED */}
                        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-2">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest bg-gray-100 px-4 py-1 rounded-full shadow-sm">Folded</h3>
                            <div className="bg-slate-50 border-[6px] border-slate-200 rounded-3xl p-4 md:p-6 shadow-md shadow-gray-200 relative scale-90 md:scale-100">
                                {currentQuestion.type === 'half' ? (
                                    <FoldedState bgClass="bg-white">{currentQuestion.questionVisual}</FoldedState>
                                ) : (
                                    <FoldedQuarterState bgClass="bg-white">{currentQuestion.questionVisual}</FoldedQuarterState>
                                )}
                            </div>
                        </div>

                        {/* Unfolded Options */}
                        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-2">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest bg-gray-100 px-4 py-1 rounded-full shadow-sm">Choose Unfolded</h3>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4 overflow-x-auto p-2 w-full max-w-[18rem] md:max-w-[16rem] justify-center items-center">
                                {currentQuestion.options.map((opt, i) => {
                                    const isOptSelected = selectedOption === i;
                                    const isCorrectOpt = currentQuestion.correctIndex === i;

                                    let btnStyle = 'border-gray-200 hover:border-[#0097A7] hover:scale-105';
                                    if (!isSubmitted && isOptSelected) {
                                        btnStyle = 'border-[#0097A7] bg-[#E0F7FA] scale-105 shadow-md shadow-[#0097A7]/20';
                                    } else if (isSubmitted && isCorrectOpt) {
                                        btnStyle = 'border-green-500 bg-green-50 shadow-md shadow-green-500/20 scale-105';
                                    } else if (isSubmitted && isOptSelected && !isCorrect) {
                                        btnStyle = 'border-red-500 bg-red-50 shadow-md shadow-red-500/20';
                                    } else if (isSubmitted) {
                                        btnStyle = 'border-gray-100 opacity-50';
                                    }

                                    return (
                                        <button
                                            key={i}
                                            disabled={isSubmitted}
                                            onClick={() => handleAnswer(i)}
                                            className={`p-1 md:p-2 rounded-2xl md:rounded-[2rem] border-4 transition-all flex justify-center items-center shrink-0 ${btnStyle}`}
                                        >
                                            <UnfoldedSquare>{opt}</UnfoldedSquare>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                    {isSubmitted && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full mt-4">
                            <div className={`text-xl font-bold px-8 py-4 rounded-full inline-block ${isCorrect ? 'text-green-700 bg-green-100 border-2 border-green-200 shadow-sm' : 'text-red-700 bg-red-100 border-2 border-red-200 shadow-sm'}`}>
                                {isCorrect ? feedbackMessage : "Not quite! Check the explanation to see how it unfolds."}
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={"The correct unfolded shape"} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

            <footer className="junior-bottom-bar flex items-center justify-between px-8 py-4 bg-white border-t-2 border-gray-100 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] rounded-t-[2rem] relative z-20">
                <button className="bg-red-50 text-red-500 px-6 py-3 rounded-2xl border-2 border-red-100 font-bold hover:bg-red-100" onClick={() => navigate(-1)}>Exit</button>
                <div className="flex gap-4">
                    {qIndex > 0 && <button className="px-6 py-3 bg-gray-100 text-[#31326F] font-bold rounded-2xl hover:bg-gray-200" onClick={handlePrevious}>Previous</button>}
                    {isSubmitted ? (
                        <button className="px-8 py-3 bg-[#0097A7] text-white font-bold rounded-2xl flex border-b-4 border-[#006064] active:border-b-0 active:translate-y-1 hover:bg-[#00838F]" onClick={handleNext}>{qIndex < TOTAL_QUESTIONS - 1 ? "Next" : "Done"}</button>
                    ) : (
                        <button className="px-8 py-3 bg-[#00E676] text-white font-bold rounded-2xl flex border-b-4 border-[#00C853] active:border-b-0 active:translate-y-1 hover:bg-[#69F0AE] disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={selectedOption === null}>Submit</button>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default PaperFoldSymmetry;
