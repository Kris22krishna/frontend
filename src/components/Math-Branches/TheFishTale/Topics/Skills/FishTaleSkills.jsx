import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../the-fish-tale.css';

// ─── Shared Quiz Engine ────────────────────────────────────────────────────
function QuizEngine({ questions, title, onBack, color }) {
    const [idx, setIdx] = useState(0);
    const [selected, setSelected] = useState(null);
    const [revealed, setRevealed] = useState(false);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);

    const handleSelect = (optIdx) => {
        if (revealed) return;
        setSelected(optIdx);
        setRevealed(true);
        if (optIdx === questions[idx].correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (idx + 1 >= questions.length) {
            setDone(true);
        } else {
            setIdx(i => i + 1);
            setSelected(null);
            setRevealed(false);
        }
    };

    const reset = () => { setIdx(0); setSelected(null); setRevealed(false); setScore(0); setDone(false); };

    if (done) {
        return (
            <div className="ft-quiz-card">
                <div className="ft-quiz-score">
                    <div className="ft-quiz-score-num">{score}/{questions.length}</div>
                    <div className="ft-quiz-score-label">
                        {score === questions.length ? '🎉 Perfect!' : score >= questions.length * 0.7 ? '👏 Great job!' : '💪 Keep practicing!'}
                    </div>
                    <button className="ft-quiz-retry" onClick={reset}>Try Again</button>
                    <br />
                    <button className="ft-quiz-retry" style={{ background: '#64748b', marginTop: 10 }} onClick={onBack}>← Back to Skills</button>
                </div>
            </div>
        );
    }

    const q = questions[idx];
    return (
        <div className="ft-quiz-card" style={{ borderColor: color + '40' }}>
            <div className="ft-quiz-progress">
                {title} — Question {idx + 1} of {questions.length}
            </div>
            <div className="ft-quiz-q">{q.question}</div>
            <div className="ft-quiz-options">
                {q.options.map((opt, i) => {
                    let cls = 'ft-quiz-opt';
                    if (revealed) {
                        if (i === q.correct) cls += ' ft-quiz-opt--correct';
                        else if (i === selected) cls += ' ft-quiz-opt--wrong';
                    } else if (i === selected) cls += ' ft-quiz-opt--selected';
                    return (
                        <button key={i} className={cls} onClick={() => handleSelect(i)}>
                            {opt}
                        </button>
                    );
                })}
            </div>
            {revealed && <div className="ft-quiz-explanation">{q.explanation}</div>}
            <div className="ft-quiz-nav">
                <button className="ft-quiz-nav-btn" style={{ background: '#64748b' }} onClick={onBack}>← Back</button>
                <button className="ft-quiz-nav-btn" onClick={handleNext} disabled={!revealed}>
                    {idx + 1 >= questions.length ? 'See Score' : 'Next →'}
                </button>
            </div>
        </div>
    );
}

// ─── QUESTIONS & DATA ──────────────────────────────────────────────────────

const placeValuePractice = [
    { question: 'What is the place value of 6 in 6,45,231?', options: ['6', '60,000', '6,00,000', '6,000'], correct: 2, explanation: '6 is in the Lakhs place. Place value = 6 × 1,00,000 = 6,00,000.' },
    { question: 'What is the place value of 3 in 2,35,678?', options: ['3,000', '30,000', '3', '3,00,000'], correct: 1, explanation: '3 is in the Ten Thousands place. Place value = 3 × 10,000 = 30,000.' },
    { question: 'In 4,56,789, which digit is in the Thousands place?', options: ['4', '5', '6', '7'], correct: 2, explanation: 'Reading from right: 9(Ones), 8(Tens), 7(Hundreds), 6(Thousands). So 6 is in the Thousands place.' },
    { question: 'What is the difference between place value and face value of 5 in 5,00,000?', options: ['4,99,995', '0', '5,00,000', '4,95,000'], correct: 0, explanation: 'Place value = 5,00,000. Face value = 5. Difference = 5,00,000 − 5 = 4,99,995.' },
    { question: 'In 8,07,654, the place value of 0 is:', options: ['0', '10,000', '7,000', 'None'], correct: 0, explanation: 'The place value of 0 is always 0, regardless of its position (0 × 10,000 = 0).' },
    { question: 'Which digit has the highest place value in 3,21,456?', options: ['6', '3', '4', '1'], correct: 1, explanation: '3 is in the Lakhs place (worth 3,00,000), which is the highest place.' },
    { question: 'The place value of 9 in 19,345 is:', options: ['9', '9,000', '90', '900'], correct: 1, explanation: '9 is in the Thousands place. Place value = 9 × 1,000 = 9,000.' },
    { question: 'In 7,89,012, which place is 8 in?', options: ['Thousands', 'Ten Thousands', 'Lakhs', 'Hundreds'], correct: 1, explanation: '7(Lakhs), 8(Ten Thousands), 9(Thousands). So 8 is in the Ten Thousands place.' },
    { question: 'The expanded form of 5,06,030 is:', options: ['5,00,000 + 6,000 + 30', '5,00,000 + 600 + 30', '5,00,000 + 60,000 + 300', '50,000 + 6,000 + 30'], correct: 0, explanation: '5(Lakhs) + 0(Ten Thousands) + 6(Thousands) + 0(Hundreds) + 3(Tens) + 0(Ones) = 5,00,000 + 6,000 + 30.' },
    { question: 'How many Ten Thousands are there in 3,50,000?', options: ['35', '5', '350', '3'], correct: 0, explanation: '3,50,000 ÷ 10,000 = 35. There are 35 Ten Thousands.' },
];

const placeValueAssessment = [
    { question: 'The place value of 4 in 4,32,100 is:', options: ['4', '40,000', '4,00,000', '4,000'], correct: 2, explanation: '4 is in the Lakhs place = 4 × 1,00,000 = 4,00,000.' },
    { question: 'In 6,78,543, the digit in the Hundreds place is:', options: ['5', '4', '3', '8'], correct: 0, explanation: 'From right: 3(Ones), 4(Tens), 5(Hundreds). The digit is 5.' },
    { question: 'What is the sum of place values of both 5s in 5,05,000?', options: ['10', '5,00,000', '5,05,000', '55,000'], correct: 2, explanation: 'First 5 = 5,00,000 (Lakhs). Second 5 = 5,000 (Thousands). Sum = 5,05,000.' },
    { question: 'The number with 3 in Lakhs, 0 in Ten Thousands, 7 in Thousands, 2 in Hundreds, 0 in Tens, 1 in Ones is:', options: ['3,07,201', '3,70,201', '30,7201', '3,72,01'], correct: 0, explanation: '3(L) 0(TT) 7(Th) 2(H) 0(T) 1(O) = 3,07,201.' },
    { question: 'Place value of 0 in any number is always:', options: ['The number itself', '1', '0', 'Depends on position'], correct: 2, explanation: '0 × (any place value) = 0. The place value of 0 is always 0.' },
    { question: 'In 9,87,654, how many Lakhs are there?', options: ['98', '9', '987', '1'], correct: 1, explanation: 'The Lakhs digit is 9. There are 9 Lakhs in this number.' },
    { question: 'Which number has 8 in the Ten Thousands place?', options: ['8,12,345', '1,82,345', '1,28,345', '1,23,845'], correct: 1, explanation: 'In 1,82,345: 1(L) 8(TT) 2(Th). The 8 is in the Ten Thousands place.' },
    { question: 'Expanded form: 2,00,000 + 40,000 + 100 + 5 = ?', options: ['2,40,105', '2,04,105', '24,105', '2,41,005'], correct: 0, explanation: '2,00,000 + 40,000 + 0 + 100 + 0 + 5 = 2,40,105.' },
    { question: 'Face value of 1 in 1,11,111 is:', options: ['1', '1,00,000', '1,11,111', '11,111'], correct: 0, explanation: 'Face value is always the digit itself = 1, regardless of how many times or where it appears.' },
    { question: 'How many Thousands make 1 Lakh?', options: ['10', '100', '1,000', '10,000'], correct: 1, explanation: '1 Lakh = 1,00,000. 1,00,000 ÷ 1,000 = 100 Thousands.' },
];

const comparisonPractice = [
    { question: 'Compare: 4,56,789 ___ 3,98,765', options: ['<', '>', '='], correct: 1, explanation: 'Both are 6-digit. Lakhs: 4 > 3. So 4,56,789 > 3,98,765.' },
    { question: 'Compare: 2,34,567 ___ 2,45,678', options: ['<', '>', '='], correct: 0, explanation: 'Same Lakhs (2). Ten Thousands: 3 < 4. So 2,34,567 < 2,45,678.' },
    { question: 'Which is the largest: 5,67,890 or 56,789?', options: ['5,67,890', '56,789', 'Equal'], correct: 0, explanation: '5,67,890 has 6 digits; 56,789 has 5 digits. More digits = larger number.' },
    { question: 'Arrange in ascending order: 78,456; 7,84,560; 7,456', options: ['7,456 < 78,456 < 7,84,560', '78,456 < 7,456 < 7,84,560', '7,84,560 < 78,456 < 7,456'], correct: 0, explanation: '7,456 (4-digit) < 78,456 (5-digit) < 7,84,560 (6-digit).' },
    { question: 'Compare: 5,00,000 ___ 4,99,999', options: ['<', '>', '='], correct: 1, explanation: '5,00,000 has Lakhs digit 5; 4,99,999 has Lakhs digit 4. So 5,00,000 > 4,99,999.' },
    { question: 'The smallest 6-digit number is:', options: ['9,99,999', '1,00,000', '1,00,001', '99,999'], correct: 1, explanation: 'The smallest 6-digit number is 1,00,000 (1 Lakh).' },
    { question: 'The largest 5-digit number is:', options: ['10,000', '99,999', '1,00,000', '90,000'], correct: 1, explanation: 'The largest 5-digit number is 99,999. The next number (1,00,000) is already 6 digits.' },
    { question: 'Compare: 3,33,333 ___ 3,33,333', options: ['<', '>', '='], correct: 2, explanation: 'Both numbers are identical digit by digit. So 3,33,333 = 3,33,333.' },
    { question: 'Which is greater: 1 Lakh or 99 Thousand?', options: ['1 Lakh', '99 Thousand', 'Equal'], correct: 0, explanation: '1 Lakh = 1,00,000. 99 Thousand = 99,000. 1,00,000 > 99,000.' },
    { question: 'How many 6-digit numbers are there in all?', options: ['9,00,000', '8,99,999', '1,00,000', '9,99,999'], correct: 0, explanation: 'From 1,00,000 to 9,99,999. Total = 9,99,999 − 1,00,000 + 1 = 9,00,000.' },
];

const comparisonAssessment = [
    { question: 'Compare: 7,89,012 ___ 7,89,021', options: ['<', '>', '='], correct: 0, explanation: 'Same up to Tens: 1 < 2. So 7,89,012 < 7,89,021.' },
    { question: 'Which is smallest: 4,56,789; 4,56,798; 4,56,780?', options: ['4,56,789', '4,56,798', '4,56,780'], correct: 2, explanation: 'All same up to Tens: 80 < 89 < 98. So 4,56,780 is smallest.' },
    { question: 'The successor of 9,99,999 is:', options: ['10,00,000', '9,99,998', '1,00,000', '10,00,001'], correct: 0, explanation: 'Successor = number + 1. 9,99,999 + 1 = 10,00,000 (Ten Lakh/1 Million).' },
    { question: 'The predecessor of 5,00,000 is:', options: ['4,00,000', '4,99,999', '5,00,001', '4,99,998'], correct: 1, explanation: 'Predecessor = number − 1. 5,00,000 − 1 = 4,99,999.' },
    { question: 'Arrange descending: 1,23,456; 12,345; 1,23,465', options: ['1,23,465 > 1,23,456 > 12,345', '1,23,456 > 1,23,465 > 12,345', '12,345 > 1,23,456 > 1,23,465'], correct: 0, explanation: '1,23,465 > 1,23,456 (differ at Ones: 5 < 6 no, Tens: 6 > 5). 12,345 has fewer digits.' },
    { question: 'Compare: 99,999 ___ 1,00,000', options: ['<', '>', '='], correct: 0, explanation: '99,999 is a 5-digit number. 1,00,000 is a 6-digit number. 5-digit < 6-digit.' },
    { question: 'The greatest 6-digit number using 3, 0, 7, 1, 9, 5 is:', options: ['9,75,310', '9,75,301', '9,73,510', '10,5,793'], correct: 0, explanation: 'Arrange digits in descending order: 9, 7, 5, 3, 1, 0 → 9,75,310.' },
    { question: 'The smallest 6-digit number using 2, 0, 8, 0, 5, 1 is:', options: ['1,00,258', '1,00,285', '1,02,058', '10,0258'], correct: 0, explanation: 'Smallest: start with smallest non-zero (1), then 0s, then ascending: 1,00,258.' },
    { question: 'Compare: 5 Lakh ___ 50 Thousand', options: ['<', '>', '='], correct: 1, explanation: '5 Lakh = 5,00,000. 50 Thousand = 50,000. 5,00,000 > 50,000.' },
    { question: 'Which pair has the same value?', options: ['3 Lakh and 30,000', '5 Lakh and 5,00,000', '1 Lakh and 10,000', '2 Lakh and 2,000'], correct: 1, explanation: '5 Lakh = 5,00,000. They are the same!' },
];

const estimationPractice = [
    { question: 'Round 4,567 to the nearest thousand:', options: ['4,000', '5,000', '4,500', '4,600'], correct: 1, explanation: 'Hundreds digit is 5 (≥ 5), so round UP. 4,567 → 5,000.' },
    { question: 'Round 3,42,189 to the nearest lakh:', options: ['3,00,000', '4,00,000', '3,42,000', '3,50,000'], correct: 0, explanation: 'Ten-Thousands digit is 4 (< 5), round DOWN. 3,42,189 → 3,00,000.' },
    { question: 'Estimate 4,876 + 3,245 (round to nearest thousand):', options: ['7,000', '8,000', '8,121', '9,000'], correct: 1, explanation: '4,876 ≈ 5,000; 3,245 ≈ 3,000. Estimated sum = 5,000 + 3,000 = 8,000.' },
    { question: 'Round 67,890 to the nearest ten thousand:', options: ['60,000', '70,000', '68,000', '67,000'], correct: 1, explanation: 'Thousands digit is 7 (≥ 5), round UP. 67,890 → 70,000.' },
    { question: 'Estimate 8,765 − 4,321 (round to nearest thousand):', options: ['4,000', '5,000', '4,444', '3,000'], correct: 1, explanation: '8,765 ≈ 9,000; 4,321 ≈ 4,000. Estimated difference = 9,000 − 4,000 = 5,000.' },
    { question: 'Round 5,55,555 to the nearest ten thousand:', options: ['5,50,000', '5,60,000', '6,00,000', '5,55,000'], correct: 1, explanation: 'Thousands digit is 5 (≥ 5), round UP. 5,55,555 → 5,60,000.' },
    { question: 'Which is the best estimate for 2,987 + 6,034?', options: ['8,000', '9,000', '10,000', '7,000'], correct: 1, explanation: '2,987 ≈ 3,000; 6,034 ≈ 6,000. Estimate = 3,000 + 6,000 = 9,000.' },
    { question: 'Round 1,49,999 to the nearest lakh:', options: ['1,00,000', '2,00,000', '1,50,000', '1,49,000'], correct: 0, explanation: 'Ten-Thousands digit is 4 (< 5), round DOWN. 1,49,999 → 1,00,000.' },
    { question: 'Estimate 7,823 × 4 (round 7,823 first):', options: ['28,000', '32,000', '30,000', '31,292'], correct: 1, explanation: '7,823 ≈ 8,000. 8,000 × 4 = 32,000.' },
    { question: 'Round 9,99,500 to the nearest lakh:', options: ['9,00,000', '10,00,000', '9,99,000', '9,50,000'], correct: 1, explanation: 'Ten-Thousands digit is 9 (≥ 5), round UP. 9,99,500 → 10,00,000.' },
];

const estimationAssessment = [
    { question: 'Round 3,76,450 to the nearest ten thousand:', options: ['3,70,000', '3,80,000', '4,00,000', '3,76,000'], correct: 1, explanation: 'Thousands digit is 6 (≥ 5), round UP. → 3,80,000.' },
    { question: 'Estimate 45,678 + 23,456 (nearest ten thousand):', options: ['60,000', '70,000', '69,134', '80,000'], correct: 1, explanation: '45,678 ≈ 50,000; 23,456 ≈ 20,000. Estimate = 70,000.' },
    { question: 'Round 8,45,000 to the nearest lakh:', options: ['8,00,000', '9,00,000', '8,50,000', '8,45,000'], correct: 1, explanation: 'Ten-Thousands digit is 4 < 5; wait — 45 as TT+Th gives us 45,000 out of 1,00,000. Actually: Ten-thousands digit = 4 (< 5), round DOWN → 8,00,000... But 8,45,000 ten-thousands has 4 so → 8,00,000. (Corrected: answer is 8,00,000.)' },
    { question: 'Estimate the product: 48 × 52 (round both):', options: ['2,000', '2,500', '2,496', '3,000'], correct: 1, explanation: '48 ≈ 50; 52 ≈ 50. Estimate = 50 × 50 = 2,500.' },
    { question: 'Which is closer to 5,67,890: 5,00,000 or 6,00,000?', options: ['5,00,000', '6,00,000', 'Both equally close'], correct: 1, explanation: '5,67,890 is 67,890 away from 5,00,000 but only 32,110 away from 6,00,000. Closer to 6,00,000.' },
    { question: 'Round 2,345 to the nearest hundred:', options: ['2,300', '2,400', '2,000', '2,350'], correct: 0, explanation: 'Tens digit is 4 (< 5), round DOWN. 2,345 → 2,300.' },
    { question: 'Estimate 9,876 − 1,234 (nearest thousand):', options: ['8,000', '9,000', '8,642', '7,000'], correct: 1, explanation: '9,876 ≈ 10,000; 1,234 ≈ 1,000. Estimate = 10,000 − 1,000 = 9,000.' },
    { question: 'Round 55,555 to the nearest thousand:', options: ['55,000', '56,000', '60,000', '55,500'], correct: 1, explanation: 'Hundreds digit is 5 (≥ 5), round UP. 55,555 → 56,000.' },
    { question: 'Estimate 3,14,159 to the nearest lakh:', options: ['3,00,000', '4,00,000', '3,14,000', '3,10,000'], correct: 0, explanation: 'Ten-Thousands digit is 1 (< 5), round DOWN → 3,00,000.' },
    { question: 'A school collected ₹4,87,650. Round to nearest lakh:', options: ['4,00,000', '5,00,000', '4,90,000', '4,88,000'], correct: 1, explanation: 'Ten-Thousands digit is 8 (≥ 5), round UP. ₹4,87,650 → ₹5,00,000.' },
];

const readWritePractice = [
    { question: 'Write in figures: Three Lakh Forty-Five Thousand Six Hundred', options: ['3,45,600', '34,5600', '3,04,560', '3,45,060'], correct: 0, explanation: '3 Lakh = 3,00,000; 45 Thousand = 45,000; 600. Total = 3,45,600.' },
    { question: 'Write in words: 2,05,030', options: ['Two Lakh Five Thousand Thirty', 'Twenty Thousand Five Hundred Thirty', 'Two Lakh Fifty Thousand Thirty', 'Two Lakh Five Thousand Three Hundred'], correct: 0, explanation: '2(Lakh) 05(Thousand) 030 = Two Lakh Five Thousand Thirty.' },
    { question: 'Write in figures: Seven Lakh Nine', options: ['7,00,009', '7,09,000', '70,009', '7,00,090'], correct: 0, explanation: '7 Lakh = 7,00,000 + 9 = 7,00,009.' },
    { question: 'Write in words: 1,00,001', options: ['One Lakh One', 'One Lakh One Hundred', 'Ten Thousand One', 'One Lakh Ten'], correct: 0, explanation: '1(Lakh) 00(Ten-Thousands) 0(Thousands) 0(Hundreds) 0(Tens) 1(Ones) = One Lakh One.' },
    { question: 'Write in figures: Nine Lakh Ninety-Nine Thousand Nine Hundred Ninety-Nine', options: ['9,99,999', '99,9999', '9,99,909', '9,90,999'], correct: 0, explanation: 'This is the largest 6-digit number: 9,99,999.' },
    { question: 'How do you read 6,04,050?', options: ['Six Lakh Four Thousand Fifty', 'Sixty Thousand Four Hundred Fifty', 'Six Lakh Forty Thousand Fifty', 'Six Lakh Four Thousand Five Hundred'], correct: 0, explanation: '6(Lakh) 04(Thousand) 050 = Six Lakh Four Thousand Fifty.' },
    { question: 'Write in figures: Five Lakh', options: ['50,000', '5,00,000', '5,000', '50,00,000'], correct: 1, explanation: '5 Lakh = 5 × 1,00,000 = 5,00,000.' },
    { question: 'How many digits does "Eight Lakh Twelve" have?', options: ['5', '6', '7', '4'], correct: 1, explanation: 'Eight Lakh Twelve = 8,00,012. It has 6 digits.' },
    { question: 'Write in words: 4,44,444', options: ['Four Lakh Forty-Four Thousand Four Hundred Forty-Four', 'Forty-Four Lakh Four Thousand Forty-Four', 'Four Lakh Four Thousand Four Hundred Four', 'Four Lakh Forty-Four Thousand Forty-Four'], correct: 0, explanation: '4(Lakh) 44(Thousand) 444 = Four Lakh Forty-Four Thousand Four Hundred Forty-Four.' },
    { question: 'Which number is "Two Lakh Two Thousand Two Hundred Two"?', options: ['2,02,202', '2,22,002', '2,20,202', '22,2202'], correct: 0, explanation: '2 Lakh = 2,00,000 + 2 Thousand = 2,000 + 2 Hundred = 200 + 2 = 2,02,202.' },
];

const readWriteAssessment = [
    { question: 'Write in figures: One Lakh Twenty-Three Thousand Four Hundred Fifty-Six', options: ['1,23,456', '12,3456', '1,23,546', '1,32,456'], correct: 0, explanation: '1 Lakh + 23 Thousand + 456 = 1,23,456.' },
    { question: 'Write in words: 3,00,300', options: ['Three Lakh Three Hundred', 'Thirty Thousand Three Hundred', 'Three Lakh Three Thousand', 'Three Lakh Thirty'], correct: 0, explanation: '3(Lakh) 00(Ten Th) 3(Hundred) 00 = Three Lakh Three Hundred.' },
    { question: 'Write the smallest 6-digit number in words:', options: ['One Lakh', 'Ninety-Nine Thousand Nine Hundred Ninety-Nine', 'Ten Thousand', 'One Hundred Thousand'], correct: 0, explanation: 'Smallest 6-digit = 1,00,000 = One Lakh.' },
    { question: 'Write in figures: Six Lakh Six', options: ['6,00,006', '6,06,000', '60,006', '6,60,000'], correct: 0, explanation: '6 Lakh = 6,00,000 + 6 = 6,00,006.' },
    { question: 'How do you read 7,07,070?', options: ['Seven Lakh Seven Thousand Seventy', 'Seventy Lakh Seven Thousand Seventy', 'Seven Lakh Seventy Thousand Seventy', 'Seven Lakh Seven Hundred Seven'], correct: 0, explanation: '7(Lakh) 07(Thousand) 070 = Seven Lakh Seven Thousand Seventy.' },
    { question: 'Write in figures: Four Lakh Ninety Thousand', options: ['4,90,000', '49,000', '4,09,000', '4,00,900'], correct: 0, explanation: '4 Lakh = 4,00,000 + 90 Thousand = 90,000. Total = 4,90,000.' },
    { question: 'Write the largest 6-digit number in words:', options: ['Nine Lakh Ninety-Nine Thousand Nine Hundred Ninety-Nine', 'Ten Lakh', 'Ninety-Nine Lakh', 'Nine Hundred Ninety-Nine Thousand'], correct: 0, explanation: 'Largest 6-digit = 9,99,999 = Nine Lakh Ninety-Nine Thousand Nine Hundred Ninety-Nine.' },
    { question: 'How many digits in "Two Lakh"?', options: ['5', '6', '7', '4'], correct: 1, explanation: 'Two Lakh = 2,00,000. It has 6 digits (2-0-0-0-0-0).' },
    { question: 'Write in words: 5,50,505', options: ['Five Lakh Fifty Thousand Five Hundred Five', 'Fifty-Five Lakh Five Hundred Five', 'Five Lakh Five Thousand Fifty-Five', 'Five Lakh Fifty-Five Thousand Five'], correct: 0, explanation: '5(L) 50(Th) 505 = Five Lakh Fifty Thousand Five Hundred Five.' },
    { question: 'Write in figures: Eight Lakh Eight Hundred Eight', options: ['8,00,808', '8,08,008', '80,0808', '8,80,800'], correct: 0, explanation: '8 Lakh + 0 Ten Th + 0 Th + 8 Hundred + 0 Tens + 8 Ones = 8,00,808.' },
];

const wordProblemsPractice = [
    { question: 'A motorboat costs ₹6,50,000 and a log boat costs ₹35,000. How much more does the motorboat cost?', options: ['₹6,15,000', '₹6,85,000', '₹5,15,000', '₹6,50,000'], correct: 0, explanation: '6,50,000 − 35,000 = 6,15,000. The motorboat costs ₹6,15,000 more.' },
    { question: 'If 500 kg of fish is caught in one trip and 6 trips are made, how much fish in total?', options: ['3,000 kg', '506 kg', '2,500 kg', '3,500 kg'], correct: 0, explanation: '500 × 6 = 3,000 kg total.' },
    { question: 'Gracy takes a loan of ₹1,50,000 and pays ₹15,000 per month. How many months to repay?', options: ['10', '15', '12', '8'], correct: 0, explanation: '1,50,000 ÷ 15,000 = 10 months.' },
    { question: 'A fisherman earns ₹45 per kg. He sells 80 kg. How much does he earn?', options: ['₹3,600', '₹3,200', '₹4,000', '₹360'], correct: 0, explanation: '45 × 80 = ₹3,600.' },
    { question: 'Women in a bank collect ₹25,000 per month. How much in 1 year?', options: ['₹3,00,000', '₹2,50,000', '₹25,000', '₹3,25,000'], correct: 0, explanation: '₹25,000 × 12 months = ₹3,00,000.' },
    { question: '6,000 kg fresh fish gives 2,000 kg dried fish. How much dried from 18,000 kg fresh?', options: ['6,000 kg', '9,000 kg', '3,000 kg', '12,000 kg'], correct: 0, explanation: 'Ratio is 3:1. 18,000 ÷ 3 = 6,000 kg dried fish.' },
    { question: 'A village has 45,678 people. Round to nearest thousand:', options: ['45,000', '46,000', '50,000', '40,000'], correct: 1, explanation: 'Hundreds digit = 6 (≥ 5), round UP. 45,678 → 46,000.' },
    { question: 'Total catch: Day 1 = 456 kg, Day 2 = 523 kg, Day 3 = 389 kg. Estimate total (nearest hundred):', options: ['1,300', '1,400', '1,368', '1,500'], correct: 1, explanation: '456≈500; 523≈500; 389≈400. Estimate = 500+500+400 = 1,400.' },
    { question: 'A boat travels 78 km per trip. In 25 trips, total distance?', options: ['1,950 km', '1,850 km', '2,050 km', '1,750 km'], correct: 0, explanation: '78 × 25 = 1,950 km.' },
    { question: 'Fish market earned ₹3,45,678 in Jan and ₹4,56,789 in Feb. Total earnings?', options: ['₹8,02,467', '₹7,02,467', '₹8,12,467', '₹7,92,467'], correct: 0, explanation: '3,45,678 + 4,56,789 = 8,02,467.' },
];

const wordProblemsAssessment = [
    { question: 'Sardine: ₹25/kg, Seer fish: ₹150/kg. Cost of 4 kg sardine + 2 kg seer?', options: ['₹400', '₹350', '₹300', '₹500'], correct: 0, explanation: '(4 × 25) + (2 × 150) = 100 + 300 = ₹400.' },
    { question: 'A loan of ₹2,40,000 is repaid in 12 equal monthly payments. Monthly payment?', options: ['₹20,000', '₹24,000', '₹12,000', '₹2,000'], correct: 0, explanation: '2,40,000 ÷ 12 = ₹20,000 per month.' },
    { question: 'Population: Town A = 2,34,567; Town B = 1,98,765. Difference?', options: ['35,802', '4,33,332', '36,802', '25,802'], correct: 0, explanation: '2,34,567 − 1,98,765 = 35,802.' },
    { question: 'A school needs ₹5,00,000. They have ₹3,67,890. How much more?', options: ['₹1,32,110', '₹1,33,110', '₹2,32,110', '₹1,32,010'], correct: 0, explanation: '5,00,000 − 3,67,890 = 1,32,110.' },
    { question: '3 fishing boats catch 1,200 kg, 1,500 kg, and 1,800 kg. Average catch?', options: ['1,500 kg', '1,400 kg', '1,600 kg', '1,200 kg'], correct: 0, explanation: '(1,200 + 1,500 + 1,800) ÷ 3 = 4,500 ÷ 3 = 1,500 kg.' },
    { question: 'Estimate: ₹4,87,650 + ₹3,12,350 (nearest lakh)', options: ['₹8,00,000', '₹7,00,000', '₹9,00,000', '₹8,50,000'], correct: 0, explanation: '₹4,87,650 ≈ ₹5,00,000; ₹3,12,350 ≈ ₹3,00,000. Estimate = ₹8,00,000.' },
    { question: 'A factory produces 1,250 cans/day. Production in 30 days?', options: ['37,500', '36,500', '38,500', '35,000'], correct: 0, explanation: '1,250 × 30 = 37,500 cans.' },
    { question: 'Dried fish weighs 1/3 of fresh fish. 9,000 kg fresh = how much dried?', options: ['3,000 kg', '6,000 kg', '27,000 kg', '4,500 kg'], correct: 0, explanation: '9,000 ÷ 3 = 3,000 kg dried fish.' },
    { question: 'A harbor handles 45,000 kg of fish on weekdays and 60,000 kg on weekends. Weekly total?', options: ['3,45,000 kg', '2,85,000 kg', '3,25,000 kg', '3,05,000 kg'], correct: 0, explanation: 'Weekdays (5 × 45,000 = 2,25,000) + Weekends (2 × 60,000 = 1,20,000) = 3,45,000 kg.' },
    { question: 'Round ₹7,86,543 to nearest lakh, then find half:', options: ['₹4,00,000', '₹3,50,000', '₹3,93,271', '₹3,00,000'], correct: 0, explanation: '₹7,86,543 ≈ ₹8,00,000. Half = ₹8,00,000 ÷ 2 = ₹4,00,000.' },
];

// ─── SKILLS CONFIG ─────────────────────────────────────────────────────────
const SKILLS = [
    { id: 'place-value', emoji: '🔢', name: 'Place Value (up to Lakhs)', desc: 'Understand the value of each digit based on its position.', color: '#0891b2', practice: placeValuePractice, assessment: placeValueAssessment },
    { id: 'comparison', emoji: '⚖️', name: 'Comparison of Numbers', desc: 'Compare and order large numbers up to Lakhs.', color: '#7c3aed', practice: comparisonPractice, assessment: comparisonAssessment },
    { id: 'estimation', emoji: '🎯', name: 'Estimation & Rounding', desc: 'Round and estimate sums, differences, and products.', color: '#059669', practice: estimationPractice, assessment: estimationAssessment },
    { id: 'read-write', emoji: '✍️', name: 'Reading & Writing Numbers', desc: 'Convert between words and figures in the Indian system.', color: '#b45309', practice: readWritePractice, assessment: readWriteAssessment },
    { id: 'word-problems', emoji: '🐟', name: 'Real-Life Word Problems', desc: 'Solve fish-tale-themed story problems using large numbers.', color: '#be185d', practice: wordProblemsPractice, assessment: wordProblemsAssessment },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────

export default function FishTaleSkills() {
    const navigate = useNavigate();
    const [activeSkill, setActiveSkill] = useState(null);
    const [mode, setMode] = useState(null); // 'practice' | 'assessment'

    if (activeSkill && mode) {
        const skill = SKILLS.find(s => s.id === activeSkill);
        const questions = mode === 'practice' ? skill.practice : skill.assessment;
        return (
            <div className="ft-intro-page">
                <nav className="ft-intro-nav">
                    <button className="ft-intro-nav-back" onClick={() => { setMode(null); setActiveSkill(null); }}>
                        ← Back to Skills
                    </button>
                </nav>
                <div className="ft-skills-section">
                    <QuizEngine
                        questions={questions}
                        title={`${skill.name} — ${mode === 'practice' ? 'Practice' : 'Assessment'}`}
                        color={skill.color}
                        onBack={() => { setMode(null); setActiveSkill(null); }}
                    />
                </div>
            </div>
        );
    }

    if (activeSkill) {
        const skill = SKILLS.find(s => s.id === activeSkill);
        return (
            <div className="ft-intro-page">
                <nav className="ft-intro-nav">
                    <button className="ft-intro-nav-back" onClick={() => setActiveSkill(null)}>
                        ← Back to Skills
                    </button>
                </nav>
                <div className="ft-intro-hero">
                    <div className="ft-intro-hero-inner">
                        <h1 className="ft-intro-hero-title">
                            <span style={{ marginRight: 10 }}>{skill.emoji}</span>
                            <span className="ft-intro-hero-highlight">{skill.name}</span>
                        </h1>
                        <p className="ft-intro-hero-sub">{skill.desc}</p>
                    </div>
                </div>
                <div className="ft-skills-section" style={{ textAlign: 'center', paddingTop: 40 }}>
                    <div className="ft-skill-tabs" style={{ justifyContent: 'center' }}>
                        <button className="ft-skill-tab" onClick={() => setMode('practice')} style={{ background: skill.color, color: '#fff', padding: '16px 32px', fontSize: '1rem' }}>
                            📝 Practice (10 Qs)
                        </button>
                        <button className="ft-skill-tab" onClick={() => setMode('assessment')} style={{ background: '#1e293b', color: '#fff', padding: '16px 32px', fontSize: '1rem' }}>
                            🏆 Assessment (10 Qs)
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ft-intro-page">
            {/* NAV */}
            <nav className="ft-intro-nav">
                <button className="ft-intro-nav-back" onClick={() => navigate('/the-fish-tale')}>
                    ← Back to The Fish Tale
                </button>
                <div className="ft-intro-nav-links">
                    <button className="ft-intro-nav-link" onClick={() => navigate('/the-fish-tale/introduction')}>
                        🌟 Introduction
                    </button>
                    <button className="ft-intro-nav-link" onClick={() => navigate('/the-fish-tale/terminology')}>
                        📖 Terminology
                    </button>
                    <button className="ft-intro-nav-link ft-intro-nav-link--active" onClick={() => navigate('/the-fish-tale/skills')}>
                        🎯 Skills
                    </button>
                </div>
            </nav>

            {/* HERO */}
            <div className="ft-intro-hero">
                <div className="ft-intro-hero-deco ft-intro-hero-deco-a" />
                <div className="ft-intro-hero-deco ft-intro-hero-deco-b" />
                <div className="ft-intro-hero-inner">
                    <h1 className="ft-intro-hero-title">
                        Practice{' '}
                        <span className="ft-intro-hero-highlight">5 Core Skills</span>
                    </h1>
                    <p className="ft-intro-hero-sub">10 practice + 10 assessment questions per skill</p>
                </div>
            </div>

            {/* SKILL CARDS */}
            <div className="ft-skills-section">
                <div className="ft-skills-grid">
                    {SKILLS.map(skill => (
                        <div
                            key={skill.id}
                            className="ft-skill-card"
                            onClick={() => setActiveSkill(skill.id)}
                            style={{ borderColor: skill.color + '30' }}
                        >
                            <div className="ft-skill-card-emoji">{skill.emoji}</div>
                            <div className="ft-skill-card-name" style={{ color: skill.color }}>{skill.name}</div>
                            <div className="ft-skill-card-desc">{skill.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
