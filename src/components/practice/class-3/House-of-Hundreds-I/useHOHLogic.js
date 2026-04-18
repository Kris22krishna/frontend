import { useState } from 'react';

export const useHOHLogic = (dynamicMatchAnswers = {}) => {
    const [isAnswered, setIsAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [lastIsCorrect, setLastIsCorrect] = useState(false);
    const [lastExplanation, setLastExplanation] = useState('');
    const [lastCorrectLabel, setLastCorrectLabel] = useState('');

    const [matchState, setMatchState] = useState({ leftVal: null, rightVal: null, matchedPairs: [], qid: null });
    const [multiPicState, setMultiPicState] = useState([]);
    const [multiMcq, setMultiMcq] = useState({});
    const [revealedCorrects, setRevealedCorrects] = useState({});
    const [postAnswerCorrectSvgId, setPostAnswerCorrectSvgId] = useState(null);
    const [fillBlanks, setFillBlanks] = useState({});

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
                if (val === revealedCorrect) return 'hoh-selected hoh-correct';
                if (val === sel && val !== revealedCorrect) return 'hoh-selected hoh-wrong';
            }
            return '';
        }
        if (sel === val) return 'hoh-selected';
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
                if (btnVal === revealedCorrect) return 'hoh-correct';
                if (btnVal === sel && btnVal !== revealedCorrect) return 'hoh-wrong';
            }
            return '';
        }
        if (sel === btnVal) return 'hoh-selected';
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
        if (matchState.matchedPairs.some(pair => pair.left === val || pair.right === val)) return 'hoh-matched';
        if (side === 'left' && matchState.leftVal === val) return 'hoh-active';
        if (side === 'right' && matchState.rightVal === val) return 'hoh-active';
        return '';
    };

    const handleSinglePic = (svgId) => {
        if (isAnswered) return;
        setSelectedOption(svgId);
    };

    const getSinglePicClass = (svgId) => {
        if (isAnswered) {
            if (svgId === postAnswerCorrectSvgId) return 'hoh-correct';
            if (svgId === selectedOption && svgId !== postAnswerCorrectSvgId) return 'hoh-wrong';
            return '';
        }
        if (svgId === selectedOption) return 'hoh-selected';
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
        if (multiPicState.includes(id)) return 'hoh-selected';
        return '';
    };

    const handleFillBlank = (key, val) => {
        if (isAnswered) return;
        const next = { ...fillBlanks, [key]: val };
        setFillBlanks(next);
        setSelectedOption(JSON.stringify(next));
    };

    const resetState = () => {
        setSelectedOption(null);
        setMatchState({ leftVal: null, rightVal: null, matchedPairs: [], qid: null });
        setMultiPicState([]);
        setMultiMcq({});
        setLastIsCorrect(false);
        setLastExplanation('');
        setLastCorrectLabel('');
        setRevealedCorrects({});
        setPostAnswerCorrectSvgId(null);
        setFillBlanks({});
    };

    const isReadyToSubmit = () => {
        if (Object.keys(fillBlanks).length > 0) {
            return Object.values(fillBlanks).every(v => String(v).trim() !== '');
        }
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

        if (meta.type === 'fill') {
            const correct = meta.correct;
            if (typeof correct === 'object' && !Array.isArray(correct)) {
                isCorrect = Object.entries(correct).every(
                    ([key, val]) => String(fillBlanks[key] || '').trim() === String(val).trim()
                );
            } else {
                isCorrect = String(fillBlanks['answer'] || '').trim() === String(correct).trim();
            }
        } else if (meta.type === 'match') {
            isCorrect = matchState.matchedPairs.length >= (meta.totalPairs || 4);
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

    return {
        isAnswered, setIsAnswered,
        selectedOption, setSelectedOption,
        lastIsCorrect, lastExplanation, lastCorrectLabel,
        checkCurrentAnswer,
        isReadyToSubmit, resetState,
        handleMcq, getMcqClass,
        handleTf, getTfClass,
        handleMatch, getMatchClass,
        handleSinglePic, getSinglePicClass,
        toggleMultiPic, getMultiPicClass,
        fillBlanks, handleFillBlank,
        postAnswerCorrectSvgId, revealedCorrects,
    };
};
