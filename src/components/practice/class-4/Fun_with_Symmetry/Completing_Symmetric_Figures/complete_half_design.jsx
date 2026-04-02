import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Eye, ChevronRight, ChevronLeft, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../../../../services/api';
import ExplanationModal from '../../../../ExplanationModal';
import FunWithSymmetryReportModal from '../FunWithSymmetryReportModal';
import '../FunWithSymmetry.css';

const CORRECT_MESSAGES = [
    "✨ You completed the picture perfectly! ✨",
    "🌟 Perfect! The halves match! 🌟",
    "🎉 Awesome symmetry finding! 🎉",
    "✨ A complete masterpiece! ✨",
    "🚀 Super! You're a design expert! 🚀"
];

const CompleteHalfDesign = () => {
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
    const SKILL_ID = 1203; // Adjust as needed
    const SKILL_NAME = "Fun with Symmetry - Complete Half Design";
    const TOTAL_QUESTIONS = 10;
    const [sessionQuestions, setSessionQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    // ----------------------------------------------------------------------
    // SVGs for the Half Designs and Options
    // ----------------------------------------------------------------------
    const renderHalf = (id, color, isFull = false) => {
        const strokeColor = "#31326F";
        const strokeWidth = 8;

        let paths = null;
        switch (id) {
            case 'butterfly':
                paths = (
                    <path d="M100,20 C180,20 200,80 140,100 C200,120 180,180 100,180 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'butterfly-wrong1': // Too small bottom wing
                paths = (
                    <path d="M100,20 C180,20 200,80 140,100 C180,110 160,150 100,150 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'butterfly-wrong2': // Pointy wing
                paths = (
                    <path d="M100,20 L180,40 L120,100 L180,160 L100,180 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'shield':
                paths = (
                    <path d="M100,20 L180,20 L180,100 C180,150 130,190 100,200 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'shield-wrong1': // No curve
                paths = (
                    <path d="M100,20 L180,20 L180,100 L100,200 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'shield-wrong2': // Spike top
                paths = (
                    <path d="M100,0 L180,40 L180,100 C180,150 130,190 100,200 L100,0 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'tree':
                paths = (
                    <path d="M100,20 L160,80 L130,80 L180,140 L120,140 L120,190 L100,190 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'tree-wrong1': // Three tiers
                paths = (
                    <path d="M100,20 L140,60 L120,60 L160,100 L140,100 L180,140 L120,140 L120,190 L100,190 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'tree-wrong2': // Curved branches
                paths = (
                    <path d="M100,20 C140,40 160,80 130,80 C160,100 180,140 120,140 L120,190 L100,190 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'face':
                paths = (
                    <>
                        <path d="M100,20 C160,20 180,60 180,100 C180,150 140,190 100,190 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                        <circle cx="140" cy="80" r="15" fill="white" stroke={strokeColor} strokeWidth={strokeWidth / 2} />
                        <path d="M100,140 C120,150 140,140 150,130" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
                    </>
                );
                break;
            case 'face-wrong1': // Frowning
                paths = (
                    <>
                        <path d="M100,20 C160,20 180,60 180,100 C180,150 140,190 100,190 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                        <circle cx="140" cy="80" r="15" fill="white" stroke={strokeColor} strokeWidth={strokeWidth / 2} />
                        <path d="M100,150 C120,140 140,140 150,150" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
                    </>
                );
                break;
            case 'face-wrong2': // Extra eye
                paths = (
                    <>
                        <path d="M100,20 C160,20 180,60 180,100 C180,150 140,190 100,190 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                        <circle cx="140" cy="70" r="10" fill="white" stroke={strokeColor} strokeWidth={strokeWidth / 2} />
                        <circle cx="140" cy="100" r="10" fill="white" stroke={strokeColor} strokeWidth={strokeWidth / 2} />
                        <path d="M100,140 C120,150 140,140 150,130" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
                    </>
                );
                break;
            case 'robot':
                paths = (
                    <path d="M100,20 L160,20 L160,80 L120,80 L120,180 L100,180 Z M180,40 L160,40 M160,60 L180,60" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'robot-wrong1': // Antenna pointing up
                paths = (
                    <path d="M100,20 L160,20 L160,80 L120,80 L120,180 L100,180 Z M140,20 L140,0" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'robot-wrong2': // Wide body
                paths = (
                    <path d="M100,20 L160,20 L160,80 L140,80 L140,180 L100,180 Z M180,40 L160,40 M160,60 L180,60" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            // Additional basic/geometric shapes to pad out 10 questions
            case 'star-half':
                paths = (
                    <path d="M100,10 L120,70 L180,75 L130,115 L145,180 L100,145 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'star-wrong1':
                paths = (
                    <path d="M100,10 L130,70 L160,75 L110,115 L165,180 L100,145 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'star-wrong2':
                paths = (
                    <path d="M100,10 L120,70 L190,45 L130,115 L145,180 L100,145 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'house':
                paths = (
                    <path d="M100,30 L170,80 L160,80 L160,170 L100,170 M100,110 L130,110 L130,170 L100,170 Z M140,40 L140,20 L155,20 L155,60" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'house-wrong1': // No chimney
                paths = (
                    <path d="M100,30 L170,80 L160,80 L160,170 L100,170 M100,110 L130,110 L130,170 L100,170 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'house-wrong2': // Big window instead of door
                paths = (
                    <path d="M100,30 L170,80 L160,80 L160,170 L100,170 M110,100 L140,100 L140,130 L110,130 Z M140,40 L140,20 L155,20 L155,60" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'heart-half':
                paths = (
                    <path d="M100,40 C140,-20 220,50 100,170 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'heart-wrong1': // flat top
                paths = (
                    <path d="M100,40 L180,40 L180,80 L100,170 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'heart-wrong2': // jagged edge
                paths = (
                    <path d="M100,40 C140,-20 220,50 180,100 L200,120 L100,170 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'spade-half':
                paths = (
                    <path d="M100,20 C180,100 160,150 100,150 M100,150 L120,180 L100,180 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'spade-wrong1':
                paths = (
                    <path d="M100,20 L160,100 C160,150 100,150 100,150 M100,150 L120,180 L100,180 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'spade-wrong2': // huge stem
                paths = (
                    <path d="M100,20 C180,100 160,150 100,150 M100,150 L150,180 L100,180 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'puzzle-half':
                paths = (
                    <path d="M100,40 L140,40 C140,20 180,20 180,40 L180,60 C200,60 200,100 180,100 L180,160 L140,160 C140,140 100,140 100,160 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'puzzle-wrong1': // flat right edge
                paths = (
                    <path d="M100,40 L140,40 C140,20 180,20 180,40 L180,160 L140,160 C140,140 100,140 100,160 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            case 'puzzle-wrong2': // outward bottom notch
                paths = (
                    <path d="M100,40 L140,40 C140,20 180,20 180,40 L180,60 C200,60 200,100 180,100 L180,160 L140,160 C140,180 100,180 100,160 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                );
                break;
            default:
                paths = <circle cx="100" cy="100" r="50" fill={color} />;
        }

        // We clip it or reflect it
        // The definitions are all drawing the RIGHT half for the target option
        // We need to render the LEFT half for the question. We'll reflect it.
        if (isFull) {
            return (
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    <g transform="scale(-1, 1) translate(-200, 0)">{paths}</g>
                    <g>{paths}</g>
                </svg>
            )
        } else {
            // To draw the left half (question), we take the paths and horizontally flip them
            return (
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    <g transform="scale(-1, 1) translate(-200, 0)">{paths}</g>
                </svg>
            )
        }
    };

    const renderRightHalfOnly = (id, color) => {
        const strokeColor = "#31326F";
        const strokeWidth = 8;

        let paths = null;
        switch (id) {
            case 'butterfly':
                paths = <path d="M100,20 C180,20 200,80 140,100 C200,120 180,180 100,180 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'butterfly-wrong1':
                paths = <path d="M100,20 C180,20 200,80 140,100 C180,110 160,150 100,150 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'butterfly-wrong2':
                paths = <path d="M100,20 L180,40 L120,100 L180,160 L100,180 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'shield':
                paths = <path d="M100,20 L180,20 L180,100 C180,150 130,190 100,200 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'shield-wrong1':
                paths = <path d="M100,20 L180,20 L180,100 L100,200 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'shield-wrong2':
                paths = <path d="M100,0 L180,40 L180,100 C180,150 130,190 100,200 L100,0 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'tree':
                paths = <path d="M100,20 L160,80 L130,80 L180,140 L120,140 L120,190 L100,190 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'tree-wrong1':
                paths = <path d="M100,20 L140,60 L120,60 L160,100 L140,100 L180,140 L120,140 L120,190 L100,190 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'tree-wrong2':
                paths = <path d="M100,20 C140,40 160,80 130,80 C160,100 180,140 120,140 L120,190 L100,190 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />;
                break;
            case 'face':
                paths = (
                    <>
                        <path d="M100,20 C160,20 180,60 180,100 C180,150 140,190 100,190 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                        <circle cx="140" cy="80" r="15" fill="white" stroke={strokeColor} strokeWidth={strokeWidth / 2} />
                        <path d="M100,140 C120,150 140,140 150,130" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
                    </>
                );
                break;
            case 'face-wrong1':
                paths = (
                    <>
                        <path d="M100,20 C160,20 180,60 180,100 C180,150 140,190 100,190 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                        <circle cx="140" cy="80" r="15" fill="white" stroke={strokeColor} strokeWidth={strokeWidth / 2} />
                        <path d="M100,150 C120,140 140,140 150,150" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
                    </>
                );
                break;
            case 'face-wrong2':
                paths = (
                    <>
                        <path d="M100,20 C160,20 180,60 180,100 C180,150 140,190 100,190 L100,20 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
                        <circle cx="140" cy="70" r="10" fill="white" stroke={strokeColor} strokeWidth={strokeWidth / 2} />
                        <circle cx="140" cy="100" r="10" fill="white" stroke={strokeColor} strokeWidth={strokeWidth / 2} />
                        <path d="M100,140 C120,150 140,140 150,130" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
                    </>
                );
                break;
            case 'robot':
                paths = <path d="M100,20 L160,20 L160,80 L120,80 L120,180 L100,180 Z M180,40 L160,40 M160,60 L180,60" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'robot-wrong1':
                paths = <path d="M100,20 L160,20 L160,80 L120,80 L120,180 L100,180 Z M140,20 L140,0" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'robot-wrong2':
                paths = <path d="M100,20 L160,20 L160,80 L140,80 L140,180 L100,180 Z M180,40 L160,40 M160,60 L180,60" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'star-half':
                paths = <path d="M100,10 L120,70 L180,75 L130,115 L145,180 L100,145 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'star-wrong1':
                paths = <path d="M100,10 L130,70 L160,75 L110,115 L165,180 L100,145 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'star-wrong2':
                paths = <path d="M100,10 L120,70 L190,45 L130,115 L145,180 L100,145 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'house':
                paths = <path d="M100,30 L170,80 L160,80 L160,170 L100,170 M100,110 L130,110 L130,170 L100,170 Z M140,40 L140,20 L155,20 L155,60" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'house-wrong1':
                paths = <path d="M100,30 L170,80 L160,80 L160,170 L100,170 M100,110 L130,110 L130,170 L100,170 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'house-wrong2':
                paths = <path d="M100,30 L170,80 L160,80 L160,170 L100,170 M110,100 L140,100 L140,130 L110,130 Z M140,40 L140,20 L155,20 L155,60" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'heart-half':
                paths = <path d="M100,40 C140,-20 220,50 100,170 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'heart-wrong1':
                paths = <path d="M100,40 L180,40 L180,80 L100,170 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'heart-wrong2':
                paths = <path d="M100,40 C140,-20 220,50 180,100 L200,120 L100,170 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'spade-half':
                paths = <path d="M100,20 C180,100 160,150 100,150 M100,150 L120,180 L100,180 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'spade-wrong1':
                paths = <path d="M100,20 L160,100 C160,150 100,150 100,150 M100,150 L120,180 L100,180 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'spade-wrong2':
                paths = <path d="M100,20 C180,100 160,150 100,150 M100,150 L150,180 L100,180 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'puzzle-half':
                paths = <path d="M100,40 L140,40 C140,20 180,20 180,40 L180,60 C200,60 200,100 180,100 L180,160 L140,160 C140,140 100,140 100,160 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'puzzle-wrong1':
                paths = <path d="M100,40 L140,40 C140,20 180,20 180,40 L180,160 L140,160 C140,140 100,140 100,160 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            case 'puzzle-wrong2':
                paths = <path d="M100,40 L140,40 C140,20 180,20 180,40 L180,60 C200,60 200,100 180,100 L180,160 L140,160 C140,180 100,180 100,160 Z" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />; break;
            default:
                paths = <circle cx="100" cy="100" r="50" fill={color} />;
        }

        return (
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md pb-6 pl-4">
                {paths}
            </svg>
        );
    }

    const QUESTIONS = [
        // 3 Easy
        {
            original: 'butterfly',
            color: '#EC4899',
            options: ['butterfly', 'butterfly-wrong1', 'butterfly-wrong2', 'butterfly-wrong1'],
            correctIndex: 0,
            solution: "The right wing must have the same wide, smooth shape at the bottom as the left wing."
        },
        {
            original: 'shield',
            color: '#3B82F6',
            options: ['shield-wrong1', 'shield', 'shield-wrong2', 'shield-wrong1'],
            correctIndex: 1,
            solution: "The right half must mirror the rounded bottom corner exactly."
        },
        {
            original: 'tree',
            color: '#10B981',
            options: ['tree-wrong1', 'tree-wrong2', 'tree', 'tree-wrong2'],
            correctIndex: 2,
            solution: "The right half of the tree needs exactly two straight, angled tiers, just like the left."
        },

        // 4 Medium =
        {
            original: 'heart-half',
            color: '#EF4444',
            options: ['heart-wrong1', 'heart-wrong2', 'heart-half', 'heart-wrong1'],
            correctIndex: 2,
            solution: "A heart has two smooth round bumps on top. The right side needs a perfectly smooth rounded bump."
        },
        {
            original: 'star-half',
            color: '#F59E0B',
            options: ['star-wrong1', 'star-wrong2', 'star-half', 'star-wrong1'],
            correctIndex: 2,
            solution: "The star has points that stick out exactly the same distance. The right point must mirror the left point precisely."
        },
        {
            original: 'face',
            color: '#06B6D4',
            options: ['face-wrong1', 'face', 'face-wrong2', 'face-wrong1'],
            correctIndex: 1,
            solution: "The face is smiling, and has one eye on the left. So it needs one eye and the rest of the smile on the right."
        },

        // 4 Hard
        {
            original: 'house',
            color: '#14B8A6',
            options: ['house-wrong1', 'house-wrong2', 'house', 'house-wrong1'],
            correctIndex: 2,
            solution: "The house has half a door and a chimney on the right side only. When completing it, you MUST include the chimney!"
        },
        {
            original: 'robot',
            color: '#6366F1',
            options: ['robot-wrong2', 'robot', 'robot-wrong1', 'robot-wrong2'],
            correctIndex: 1,
            solution: "The robot has thin arms sticking out sideways. The mirror image must have the same thin arm sticking to the right."
        },
        {
            original: 'puzzle-half',
            color: '#EAB308',
            options: ['puzzle-wrong1', 'puzzle-wrong2', 'puzzle-half', 'puzzle-wrong1'],
            correctIndex: 2,
            solution: "The left side has a notch pointing *inwards* at the bottom. To be perfectly symmetrical, the right side needs a notch pointing *inwards* at the bottom too."
        },
        {
            original: 'spade-half',
            color: '#4F46E5',
            options: ['spade-half', 'spade-wrong1', 'spade-wrong2', 'spade-wrong1'],
            correctIndex: 0,
            solution: "The stem of the spade has a specific width, and the side curves smoothly down. The reflection matches that curve and stem width perfectly."
        }
    ];

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
        setSessionQuestions(QUESTIONS);

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
            question_text: `Choose the correct right half to complete the design.`,
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
            try {
                const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId');
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
            } catch (error) {
                console.error("Error finalizing practice session:", error);
            }
            setShowResults(true);
        }
    };

    const handlePrevious = () => { if (qIndex > 0) setQIndex(prev => prev - 1); };

    if (showResults) {
        const score = Object.values(answers).filter(a => a.isCorrect).length;

        return (
            <div className="junior-practice-page symmetry-theme" style={{ fontFamily: '"Open Sans", sans-serif', minHeight: '100vh' }}>
                <FunWithSymmetryReportModal
                    isOpen={showResults}
                    stats={{
                        timeTaken: formatTime(timeElapsed),
                        correctAnswers: score,
                        totalQuestions: TOTAL_QUESTIONS
                    }}
                    onContinue={() => navigate(-1)}
                />
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
                            What completes the <span className="text-[#0097A7]">right half</span> of this design?
                        </h2>
                    </div>

                    <div className="w-full flex flex-col md:flex-row items-center w-full gap-8 h-full">

                        {/* Interactive Area - LEFT HALF + PREVIEW */}
                        <div className="flex flex-row flex-1 h-full items-center justify-center relative w-full pr-4">
                            <div className="w-40 h-40 md:w-56 md:h-56 relative flex gap-[2px]">
                                {/* Fixed Left Half */}
                                <div className="w-1/2 h-full border-4 border-slate-300 border-r-0 rounded-l-3xl bg-slate-50 overflow-hidden relative shadow-lg">
                                    <div className="absolute w-[calc(200%+8px)] h-[calc(100%+8px)] -top-[4px] -left-[4px]">
                                        {renderHalf(currentQuestion.original, currentQuestion.color, false)}
                                    </div>
                                </div>
                                {/* Dashed Mirror Line */}
                                <div className="w-[4px] h-full bg-[#EF4444]/60 bg-[length:4px_12px] bg-[linear-gradient(to_bottom,transparent_50%,#EF4444_50%))] z-10 shrink-0 mx-[-2px] mix-blend-multiply" />
                                {/* Preview Right Half */}
                                <div className={`w-1/2 h-full border-4 border-l-0 ${selectedOption !== null ? 'border-[#0097A7] bg-[#E0F7FA] shadow-[0_0_15px_rgba(0,151,167,0.3)]' : 'border-dashed border-gray-300 bg-gray-50'} rounded-r-3xl overflow-hidden relative transition-colors`}>
                                    {selectedOption !== null ? (
                                        <div className="absolute w-[calc(200%+8px)] h-[calc(100%+8px)] -top-[4px] -right-[4px]">
                                            {renderRightHalfOnly(currentQuestion.options[selectedOption], currentQuestion.color)}
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex justify-center items-center text-5xl font-bold text-gray-300">?</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="flex flex-col w-full gap-4 items-center justify-center w-full max-w-sm ml-4">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest hidden md:block w-full text-center">Options</h3>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 w-full">
                                {currentQuestion.options.map((opt, i) => {
                                    const isOptSelected = selectedOption === i;
                                    const isCorrectOpt = currentQuestion.correctIndex === i;

                                    let btnStyle = 'border-gray-200 hover:border-[#0097A7] hover:bg-[#E0F7FA] hover:scale-105';
                                    if (!isSubmitted && isOptSelected) {
                                        btnStyle = 'border-[#0097A7] bg-[#E0F7FA] scale-105 shadow-md shadow-[#0097A7]/20 border-4';
                                    } else if (isSubmitted && isCorrectOpt) {
                                        btnStyle = 'border-green-500 bg-green-50 shadow-md shadow-green-500/20 scale-105 border-4';
                                    } else if (isSubmitted && isOptSelected && !isCorrect) {
                                        btnStyle = 'border-red-500 bg-red-50 shadow-md shadow-red-500/20 border-4';
                                    } else if (isSubmitted) {
                                        btnStyle = 'border-gray-100 opacity-50';
                                    } else {
                                        btnStyle += " border-[3px]";
                                    }

                                    return (
                                        <button
                                            key={i}
                                            disabled={isSubmitted}
                                            onClick={() => handleAnswer(i)}
                                            className={`rounded-[2rem] bg-white transition-all flex flex-col justify-center items-center overflow-hidden h-32 aspect-square self-center ${btnStyle}`}
                                        >
                                            <div className="w-[100%] h-[100%] relative">
                                                {/* Translate to perfectly align inside the button */}
                                                <div className="absolute w-[200%] h-[100%] right-0 top-0">
                                                    {renderRightHalfOnly(opt, currentQuestion.color)}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                    {isSubmitted && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full mt-4">
                            <div className={`text-xl font-bold px-8 py-4 rounded-full inline-block ${isCorrect ? 'text-green-700 bg-green-100 border-2 border-green-200 shadow-sm' : 'text-red-700 bg-red-100 border-2 border-red-200 shadow-sm'}`}>
                                {isCorrect ? feedbackMessage : "Not quite! Remember a mirror image matches the original perfectly."}
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            <ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={"The fully matching opposite half"} explanation={currentQuestion.solution} onClose={() => setShowExplanationModal(false)} onNext={() => setShowExplanationModal(false)} />

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

export default CompleteHalfDesign;
