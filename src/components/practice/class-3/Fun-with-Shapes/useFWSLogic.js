import { useState } from 'react';

const normDrawLine = (l) => {
    const p1 = l.r1 * 10000 + l.c1;
    const p2 = l.r2 * 10000 + l.c2;
    if (p1 > p2) return `${l.c2},${l.r2}-${l.c1},${l.r1}`;
    return `${l.c1},${l.r1}-${l.c2},${l.r2}`;
};

const expandDrawSegments = (lines) => {
    const segs = new Set();
    (lines || []).forEach(({ c1, r1, c2, r2 }) => {
        const isH = r1 === r2;
        const isV = c1 === c2;
        if (isH) {
            const minC = Math.min(c1, c2), maxC = Math.max(c1, c2);
            for (let c = minC; c < maxC; c++) segs.add(normDrawLine({ c1: c, r1, c2: c + 1, r2 }));
        } else if (isV) {
            const minR = Math.min(r1, r2), maxR = Math.max(r1, r2);
            for (let r = minR; r < maxR; r++) segs.add(normDrawLine({ c1, r1: r, c2, r2: r + 1 }));
        }
    });
    return segs;
};

export const useFWSLogic = (dynamicMatchAnswers = {}) => {
    const [isAnswered, setIsAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [lastIsCorrect, setLastIsCorrect] = useState(false);
    const [lastExplanation, setLastExplanation] = useState('');
    const [lastCorrectLabel, setLastCorrectLabel] = useState('');

    const [matchState, setMatchState] = useState({ leftVal: null, rightVal: null, matchedPairs: [], qid: null });
    const [multiPicState, setMultiPicState] = useState([]);
    const [rocket, setRocket] = useState({ cone: '', cyl: '', cub: '' });
    const [multiMcq, setMultiMcq] = useState({});
    const [revealedCorrects, setRevealedCorrects] = useState({});
    const [postAnswerCorrectSvgId, setPostAnswerCorrectSvgId] = useState(null);

    const handleMcq = (qid, val) => {
        if (isAnswered) return;
        setMultiMcq(p => ({ ...p, [qid]: val }));
        setSelectedOption(val);
    };

    const getMcqClass = (qid, val) => {
        const sel = multiMcq[qid];
        if (isAnswered) {
            const revealedCorrect = revealedCorrects[qid];
            if (revealedCorrect !== undefined) {
                if (val === revealedCorrect) return 'toy-joy-selected toy-joy-correct';
                if (val === sel && val !== revealedCorrect) return 'toy-joy-selected toy-joy-wrong';
            }
            return '';
        }
        if (sel === val) return 'toy-joy-selected';
        return '';
    };

    const handleTf = (qid, val) => {
        if (isAnswered) return;
        setSelectedOption(val);
        setMultiMcq(p => ({ ...p, [qid]: val }));
    };

    const getTfClass = (qid, btnVal) => {
        const sel = multiMcq[qid];
        if (isAnswered) {
            const revealedCorrect = revealedCorrects[qid];
            if (revealedCorrect !== undefined) {
                if (btnVal === revealedCorrect) return 'toy-joy-correct';
                if (btnVal === sel && btnVal !== revealedCorrect) return 'toy-joy-wrong';
            }
            return '';
        }
        if (sel === btnVal) return 'toy-joy-selected';
        return '';
    };

    const handleMatch = (qid, side, val) => {
        if (isAnswered) return;
        setMatchState(p => {
            if (p.matchedPairs.some(pair => pair.left === val || pair.right === val)) return p;
            const newG = { ...p, qid };
            if (side === 'left') newG.leftVal = val;
            else newG.rightVal = val;

            if (newG.leftVal && newG.rightVal) {
                const correctRight = dynamicMatchAnswers[qid]?.[newG.leftVal];
                const isMatch = correctRight === newG.rightVal;
                if (isMatch) {
                    newG.matchedPairs = [...newG.matchedPairs, { left: newG.leftVal, right: newG.rightVal }];
                }
                newG.leftVal = null;
                newG.rightVal = null;
            }
            return newG;
        });
        setSelectedOption(Date.now());
    };

    const getMatchClass = (qid, side, val) => {
        if (matchState.matchedPairs.some(pair => pair.left === val || pair.right === val)) return 'toy-joy-matched';
        if (side === 'left' && matchState.leftVal === val) return 'toy-joy-active';
        if (side === 'right' && matchState.rightVal === val) return 'toy-joy-active';
        return '';
    };

    const handleSinglePic = (svgId) => {
        if (isAnswered) return;
        setSelectedOption(svgId);
    };

    const getSinglePicClass = (svgId) => {
        if (isAnswered) {
            if (svgId === postAnswerCorrectSvgId) return 'toy-joy-correct';
            if (svgId === selectedOption && svgId !== postAnswerCorrectSvgId) return 'toy-joy-wrong';
            return '';
        }
        if (svgId === selectedOption) return 'toy-joy-selected';
        return '';
    };

    const toggleMultiPic = (id) => {
        if (isAnswered) return;
        setMultiPicState(p => {
            const next = p.includes(id) ? p.filter(x => x !== id) : [...p, id];
            setSelectedOption(next);
            return next;
        });
    };

    const getMultiPicClass = (id) => {
        if (multiPicState.includes(id)) {
            if (isAnswered) return 'toy-joy-selected';
            return 'toy-joy-selected';
        }
        return '';
    };

    const checkMultiPick = () => {};
    const handleCheckRocket = () => {};

    const resetState = () => {
        setSelectedOption(null);
        setMatchState({ leftVal: null, rightVal: null, matchedPairs: [], qid: null });
        setMultiPicState([]);
        setRocket({ cone: '', cyl: '', cub: '' });
        setMultiMcq({});
        setLastIsCorrect(false);
        setLastExplanation('');
        setLastCorrectLabel('');
        setRevealedCorrects({});
        setPostAnswerCorrectSvgId(null);
    };

    const isReadyToSubmit = () => {
        if (rocket.cone !== '' && rocket.cyl !== '' && rocket.cub !== '') return true;
        if (Array.isArray(selectedOption)) return selectedOption.length > 0;
        if (matchState.matchedPairs.length > 0 || matchState.leftVal || matchState.rightVal) return true;
        return selectedOption !== null;
    };

    const checkCurrentAnswer = (qIndex, meta) => {
        if (!meta) {
            console.error("Missing meta for question", qIndex);
            setLastIsCorrect(false);
            return false;
        }

        let isCorrect = false;

        if (meta.type === 'rocket') {
            const r = meta.correct;
            isCorrect = String(rocket.cone).trim() === String(r.cone).trim() &&
                        String(rocket.cyl).trim() === String(r.cyl).trim() &&
                        String(rocket.cub).trim() === String(r.cub).trim();
        } else if (meta.type === 'match') {
            isCorrect = matchState.matchedPairs.length >= (meta.totalPairs || 4);
        } else if (meta.type === 'draw') {
            const lines = Array.isArray(selectedOption) ? selectedOption : [];
            const userSegs = expandDrawSegments(lines);
            const expSegs = expandDrawSegments(meta.expectedLines || []);
            const missing = [...expSegs].filter(x => !userSegs.has(x));
            const extra = [...userSegs].filter(x => !expSegs.has(x));
            isCorrect = missing.length === 0 && extra.length === 0;
        } else if (meta.type === 'multipick') {
            const selected = Array.isArray(selectedOption) ? [...selectedOption].sort() : [];
            const correct = [...(meta.correct || [])].sort();
            isCorrect = selected.length === correct.length && selected.every((v, i) => v === correct[i]);
        } else if (meta.type === 'singlePic') {
            isCorrect = String(selectedOption) === String(meta.correct);
            setPostAnswerCorrectSvgId(String(meta.correct));
        } else {
            isCorrect = String(selectedOption) === String(meta.correct);
            if (meta.qid) {
                setRevealedCorrects(prev => ({ ...prev, [meta.qid]: meta.correct }));
            }
        }

        setLastIsCorrect(isCorrect);
        setLastExplanation(meta.explanation || '');
        setLastCorrectLabel(meta.correctLabel || String(meta.correct));
        return isCorrect;
    };

    const getCurrentExplanation = () => lastExplanation;

    const fb = {};

    return {
        isAnswered, setIsAnswered,
        selectedOption, setSelectedOption,
        lastIsCorrect, lastExplanation, lastCorrectLabel,
        checkCurrentAnswer, getCurrentExplanation,
        isReadyToSubmit, resetState,
        handleMcq, getMcqClass,
        handleTf, getTfClass,
        handleMatch, getMatchClass,
        handleSinglePic, getSinglePicClass,
        toggleMultiPic, getMultiPicClass, checkMultiPick,
        rocket, setRocket, handleCheckRocket,
        postAnswerCorrectSvgId, revealedCorrects,
        fb
    };
};
