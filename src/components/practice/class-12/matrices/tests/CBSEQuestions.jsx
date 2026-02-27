import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import './CBSEQuestions.css';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/* ─── MCQ Data ─── */
const MCQ_DATA = [
    {
        id: 1,
        question: <>In a 3×3 matrix <InlineMath math="A = [a_{ij}]" /> whose elements are given by <InlineMath math="a_{ij} = \frac{1}{2} |-3i + j|" />, the element <InlineMath math="a_{31}" /> is:</>,
        options: ['−4', '5', '4', '8'],
        correct: 2,
        explanation: <><InlineMath math="a_{31} = \frac{1}{2} |-3(3) + 1| = \frac{1}{2} |-9 + 1| = \frac{1}{2} (8) = 4" /></>,
    },
    {
        id: 2,
        question: <>If <InlineMath math="A = \begin{bmatrix} 1 & 2 \\ 3 & 5 \end{bmatrix}" />, then <InlineMath math="A^{-1}" /> is given by:</>,
        options: [
            <><InlineMath math="\begin{bmatrix} 5 & -2 \\ -3 & 1 \end{bmatrix}" /></>,
            <><InlineMath math="\begin{bmatrix} -5 & 2 \\ 3 & -1 \end{bmatrix}" /></>,
            <><InlineMath math="\begin{bmatrix} -5 & 3 \\ 2 & -1 \end{bmatrix}" /></>,
            <><InlineMath math="\begin{bmatrix} 5 & 3 \\ 1 & 2 \end{bmatrix}" /></>,
        ],
        correct: 1,
        explanation: <>Since <InlineMath math="|A| = 1(5) - 2(3) = -1" />, we have <InlineMath math="A^{-1} = \frac{1}{-1} \begin{bmatrix} 5 & -2 \\ -3 & 1 \end{bmatrix} = \begin{bmatrix} -5 & 2 \\ 3 & -1 \end{bmatrix}" /></>,
    },
    {
        id: 3,
        question: <>In the determinant <InlineMath math="\begin{vmatrix} 2 & -3 & 5 \\ 6 & 0 & 4 \\ 1 & 5 & -7 \end{vmatrix}" />, the minor <InlineMath math="M_{23}" /> is:</>,
        options: ['7', '−13', '13', '−7'],
        correct: 2,
        explanation: <>Delete row 2, column 3: <InlineMath math="M_{23} = \begin{vmatrix} 2 & -3 \\ 1 & 5 \end{vmatrix} = 2(5) - (-3)(1) = 10 + 3 = 13" /></>,
    },
    {
        id: 4,
        question: <>If <InlineMath math="2 \begin{bmatrix} 1 & 3 \\ 0 & x \end{bmatrix} + \begin{bmatrix} y & 0 \\ 1 & 2 \end{bmatrix} = \begin{bmatrix} 5 & 6 \\ 1 & 8 \end{bmatrix}" />, then <InlineMath math="2x - y" /> equals:</>,
        options: ['3', '13', '−3', '0'],
        correct: 0,
        explanation: <>Comparing corresponding elements:<br /><InlineMath math="2x + 2 = 8 \implies 2x = 6 \implies x = 3" /><br /><InlineMath math="2 + y = 5 \implies y = 3" /><br />So, <InlineMath math="2x - y = 6 - 3 = 3" /></>,
    },
    {
        id: 5,
        question: <>A square matrix <InlineMath math="A" /> is called skew-symmetric if:</>,
        options: [
            <><InlineMath math="A = A^{T}" /></>,
            <><InlineMath math="A^{T} = -A" /></>,
            <><InlineMath math="A = -A" /></>,
            <><InlineMath math="A + A^{T} = I" /></>,
        ],
        correct: 1,
        explanation: <>By definition, a square matrix <InlineMath math="A" /> is skew-symmetric if <InlineMath math="A^{T} = -A" />.</>,
    },
];

/* ─── Descriptive Questions Data ─── */
const DESC_DATA = [
    /* ── SECTION B — 2 marks ── */
    {
        id: 6, section: 'B', marks: 2,
        question: <>Amit, Biraj and Chirag created matrices <InlineMath math="A = \begin{bmatrix} 1 & 2 \\ -1 & 3 \end{bmatrix}" />, <InlineMath math="B = \begin{bmatrix} 4 & 0 \\ 1 & 5 \end{bmatrix}" />, <InlineMath math="C = \begin{bmatrix} 2 & 0 \\ 1 & -2 \end{bmatrix}" />. If <InlineMath math="a = 4" /> and <InlineMath math="b = -2" />, find <InlineMath math="(a + b)B" />.</>,
        solution: {
            steps: [
                <><InlineMath math="a + b = 4 + (-2) = 2" /></>,
                <><InlineMath math="(a + b)B = 2 \cdot \begin{bmatrix} 4 & 0 \\ 1 & 5 \end{bmatrix}" /></>,
                <><InlineMath math="= \begin{bmatrix} 2(4) & 2(0) \\ 2(1) & 2(5) \end{bmatrix}" /></>
            ],
            answer: <><InlineMath math="(a + b)B = \begin{bmatrix} 8 & 0 \\ 2 & 10 \end{bmatrix}" /></>,
        },
    },
    {
        id: 7, section: 'B', marks: 2,
        question: <>Using the matrices from Q6 with <InlineMath math="a = 4" /> and <InlineMath math="b = -2" />, find <InlineMath math="(bA)^{T}" />.</>,
        solution: {
            steps: [
                <><InlineMath math="bA = -2 \cdot \begin{bmatrix} 1 & 2 \\ -1 & 3 \end{bmatrix} = \begin{bmatrix} -2 & -4 \\ 2 & -6 \end{bmatrix}" /></>,
                <>Taking transpose swaps rows and columns.</>
            ],
            answer: <><InlineMath math="(bA)^{T} = \begin{bmatrix} -2 & 2 \\ -4 & -6 \end{bmatrix}" /></>,
        },
    },
    {
        id: 8, section: 'B', marks: 2,
        question: <>A manufacturer sells Pencils, Erasers and Sharpeners with unit sale prices Rs. 2.50, Rs. 1.50, Rs. 1.00. Market A sold: Pencil 10,000; Eraser 2,000; Sharpener 18,000. Express as matrix product and find total revenue for market A.</>,
        solution: {
            steps: [
                <>Sales matrix (row vector) <InlineMath math="S = \begin{bmatrix} 10000 & 2000 & 18000 \end{bmatrix}" /></>,
                <>Prices matrix (column vector) <InlineMath math="P = \begin{bmatrix} 2.50 \\ 1.50 \\ 1.00 \end{bmatrix}" /></>,
                <><InlineMath math="\text{Revenue} = SP = \begin{bmatrix} 10000 & 2000 & 18000 \end{bmatrix} \begin{bmatrix} 2.50 \\ 1.50 \\ 1.00 \end{bmatrix}" /></>,
                <><InlineMath math="= 10000(2.50) + 2000(1.50) + 18000(1.00)" /></>,
                <><InlineMath math="= 25000 + 3000 + 18000" /></>,
            ],
            answer: <>Total Revenue for Market A = <b>Rs. 46,000</b></>,
        },
    },
    {
        id: 9, section: 'B', marks: 2,
        question: <>Given <InlineMath math="A = \begin{bmatrix} 1 & 2 \\ -1 & 3 \end{bmatrix}" />, <InlineMath math="B = \begin{bmatrix} 4 & 0 \\ 1 & 5 \end{bmatrix}" />, <InlineMath math="C = \begin{bmatrix} 2 & 0 \\ 1 & -2 \end{bmatrix}" />. Find <InlineMath math="AC - BC" />.</>,
        solution: {
            steps: [
                <>By distributive property, <InlineMath math="AC - BC = (A - B)C" /></>,
                <><InlineMath math="A - B = \begin{bmatrix} 1-4 & 2-0 \\ -1-1 & 3-5 \end{bmatrix} = \begin{bmatrix} -3 & 2 \\ -2 & -2 \end{bmatrix}" /></>,
                <><InlineMath math="(A - B)C = \begin{bmatrix} -3 & 2 \\ -2 & -2 \end{bmatrix} \begin{bmatrix} 2 & 0 \\ 1 & -2 \end{bmatrix}" /></>,
                <><InlineMath math="= \begin{bmatrix} -3(2)+2(1) & -3(0)+2(-2) \\ -2(2)+(-2)(1) & -2(0)+(-2)(-2) \end{bmatrix}" /></>,
            ],
            answer: <><InlineMath math="AC - BC = \begin{bmatrix} -4 & -4 \\ -6 & 4 \end{bmatrix}" /></>,
        },
    },
    {
        id: 10, section: 'B', marks: 2,
        question: <>In the orphanage problem: If there were 8 children less everyone gets Rs. 10 more; if 16 children more everyone gets Rs. 10 less. Set up the matrix equation. (<InlineMath math="x" /> = number of children, <InlineMath math="y" /> = amount per child)</>,
        solution: {
            steps: [
                <>Total amount <InlineMath math="= xy" /></>,
                <>Case 1: <InlineMath math="(x - 8)(y + 10) = xy \implies xy + 10x - 8y - 80 = xy \implies 10x - 8y = 80 \implies 5x - 4y = 40" /></>,
                <>Case 2: <InlineMath math="(x + 16)(y - 10) = xy \implies xy - 10x + 16y - 160 = xy \implies -10x + 16y = 160 \implies 5x - 8y = -80" /></>,
            ],
            answer: <>Matrix equation: <InlineMath math="\begin{bmatrix} 5 & -4 \\ 5 & -8 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 40 \\ -80 \end{bmatrix}" /></>,
        },
    },

    /* ── SECTION C — 3 marks ── */
    {
        id: 11, section: 'C', marks: 3,
        question: <>Find the total revenue of market B from the stationery problem. Also find cost and profit for market B. (Market B sold: 6000 Pencils, 20000 Erasers, 8000 Sharpeners. Cost prices: Rs 2.00, Rs 1.00, Rs 0.50)</>,
        solution: {
            steps: [
                <>Revenue <InlineMath math="= \begin{bmatrix} 6000 & 20000 & 8000 \end{bmatrix} \begin{bmatrix} 2.50 \\ 1.50 \\ 1.00 \end{bmatrix}" /></>,
                <><InlineMath math="= 6000(2.50) + 20000(1.50) + 8000(1.00) = 15000 + 30000 + 8000 = 53000" /></>,
                <>Cost <InlineMath math="= \begin{bmatrix} 6000 & 20000 & 8000 \end{bmatrix} \begin{bmatrix} 2.00 \\ 1.00 \\ 0.50 \end{bmatrix}" /></>,
                <><InlineMath math="= 6000(2.00) + 20000(1.00) + 8000(0.50) = 12000 + 20000 + 4000 = 36000" /></>,
                <><InlineMath math="\text{Profit} = \text{Revenue} - \text{Cost} = 53000 - 36000 = 17000" /></>
            ],
            answer: <>Revenue = Rs. 53,000; Cost = Rs. 36,000; Profit = <b>Rs. 17,000</b></>,
        },
    },
    {
        id: 12, section: 'C', marks: 3,
        question: <>From the Seema orphanage problem, find the number of children (<InlineMath math="x" />) and amount per child (<InlineMath math="y" />) using matrices. Equations: <InlineMath math="5x - 4y = 40" />, <InlineMath math="5x - 8y = -80" />.</>,
        solution: {
            steps: [
                <>Subtracting equations: <InlineMath math="(5x - 4y) - (5x - 8y) = 40 - (-80)" /></>,
                <><InlineMath math="4y = 120 \implies y = 30" /></>,
                <>Substitute <InlineMath math="y = 30" /> in Eq 1: <InlineMath math="5x - 4(30) = 40 \implies 5x - 120 = 40" /></>,
                <><InlineMath math="5x = 160 \implies x = 32" /></>,
                <>Total amount <InlineMath math="= 32 \times 30 = \text{Rs } 960" /></>
            ],
            answer: <><InlineMath math="x =" /> <b>32 children</b>, <InlineMath math="y =" /> <b>Rs. 30 per child</b></>,
        },
    },
    {
        id: 13, section: 'C', marks: 3,
        question: <>September sales <InlineMath math="A = \begin{bmatrix} 10000 & 20000 & 30000 \\ 50000 & 30000 & 10000 \end{bmatrix}" />, October <InlineMath math="B = \begin{bmatrix} 5000 & 10000 & 6000 \\ 20000 & 10000 & 10000 \end{bmatrix}" />. Find <InlineMath math="A + B" />, <InlineMath math="A - B" />, and Ramakishan's (Row 1) 2% profit on October sales.</>,
        solution: {
            steps: [
                <><InlineMath math="A + B = \begin{bmatrix} 15000 & 30000 & 36000 \\ 70000 & 40000 & 20000 \end{bmatrix}" /></>,
                <><InlineMath math="A - B = \begin{bmatrix} 5000 & 10000 & 24000 \\ 30000 & 20000 & 0 \end{bmatrix}" /></>,
                <>Ramakishan Oct sales (row 1 of <InlineMath math="B" />): <InlineMath math="\begin{bmatrix} 5000 & 10000 & 6000 \end{bmatrix}" /></>,
                <><InlineMath math="\text{Profit} = 2\% \text{ of } (5000 + 10000 + 6000) = 0.02 \times 21000 = 420" /></>,
            ],
            answer: <>Ramakishan's 2% October profit = <b>Rs. 420</b></>,
        },
    },
    {
        id: 14, section: 'C', marks: 3,
        question: <>Show that <InlineMath math="A = \begin{bmatrix} 0 & -3 & 5 \\ 3 & 0 & -2 \\ -5 & 2 & 0 \end{bmatrix}" /> is skew-symmetric. Also verify that <InlineMath math="(A - A^{T})" /> is skew-symmetric for any square matrix <InlineMath math="A" />.</>,
        solution: {
            steps: [
                <><InlineMath math="A^{T} = \begin{bmatrix} 0 & 3 & -5 \\ -3 & 0 & 2 \\ 5 & -2 & 0 \end{bmatrix} = - \begin{bmatrix} 0 & -3 & 5 \\ 3 & 0 & -2 \\ -5 & 2 & 0 \end{bmatrix} = -A" /></>,
                <>Since <InlineMath math="A^{T} = -A" />, <InlineMath math="A" /> is skew-symmetric.</>,
                <>Let <InlineMath math="P = A - A^{T}" />.</>,
                <><InlineMath math="P^{T} = (A - A^{T})^{T} = A^{T} - (A^{T})^{T} = A^{T} - A = -(A - A^{T}) = -P" /></>,
            ],
            answer: <>Hence <InlineMath math="A" /> is skew-symmetric, and <InlineMath math="(A - A^{T})" /> is always skew-symmetric. ✓</>,
        },
    },
    {
        id: 15, section: 'C', marks: 3,
        question: <>Three schools DPS, CVC, KVS sold fans (Rs. 25), mats (Rs. 100), plates (Rs. 50). Sales: DPS = (40, 50, 20), CVC = (25, 40, 30), KVS = (35, 50, 40). Find total revenue of each school and grand total using matrices.</>,
        solution: {
            steps: [
                <>Sales matrix <InlineMath math="S = \begin{bmatrix} 40 & 50 & 20 \\ 25 & 40 & 30 \\ 35 & 50 & 40 \end{bmatrix}" /></>,
                <>Price vector <InlineMath math="P = \begin{bmatrix} 25 \\ 100 \\ 50 \end{bmatrix}" /></>,
                <><InlineMath math="\text{Revenue} = SP = \begin{bmatrix} 40(25)+50(100)+20(50) \\ 25(25)+40(100)+30(50) \\ 35(25)+50(100)+40(50) \end{bmatrix}" /></>,
                <><InlineMath math="= \begin{bmatrix} 1000+5000+1000 \\ 625+4000+1500 \\ 875+5000+2000 \end{bmatrix} = \begin{bmatrix} 7000 \\ 6125 \\ 7875 \end{bmatrix}" /></>,
            ],
            answer: <>DPS = Rs. 7,000; CVC = Rs. 6,125; KVS = Rs. 7,875; Grand Total = <b>Rs. 21,000</b></>,
        },
    },

    /* ── SECTION D — 5 marks ── */
    {
        id: 16, section: 'D', marks: 5,
        question: <>Using matrices, solve: <InlineMath math="x - y + 2z = 7" />, <InlineMath math="3x + 4y - 5z = -5" />, <InlineMath math="2x - y + 3z = 12" />.</>,
        solution: {
            steps: [
                <>Write as <InlineMath math="AX = B" /> where <InlineMath math="A = \begin{bmatrix} 1 & -1 & 2 \\ 3 & 4 & -5 \\ 2 & -1 & 3 \end{bmatrix}" />, <InlineMath math="X = \begin{bmatrix} x \\ y \\ z \end{bmatrix}" />, <InlineMath math="B = \begin{bmatrix} 7 \\ -5 \\ 12 \end{bmatrix}" /></>,
                <><InlineMath math="|A| = 1(12 - 5) - (-1)(9 - (-10)) + 2(-3 - 8) = 7 + 19 - 22 = 4 \neq 0" /></>,
                <>Cofactor matrix: <InlineMath math="C = \begin{bmatrix} 7 & -19 & -11 \\ 1 & -1 & -1 \\ -3 & 11 & 7 \end{bmatrix}" /></>,
                <><InlineMath math="\text{adj } A = C^{T} = \begin{bmatrix} 7 & 1 & -3 \\ -19 & -1 & 11 \\ -11 & -1 & 7 \end{bmatrix}" /></>,
                <><InlineMath math="X = A^{-1}B = \frac{1}{4} \begin{bmatrix} 7 & 1 & -3 \\ -19 & -1 & 11 \\ -11 & -1 & 7 \end{bmatrix} \begin{bmatrix} 7 \\ -5 \\ 12 \end{bmatrix} = \frac{1}{4} \begin{bmatrix} 49-5-36 \\ -133+5+132 \\ -77+5+84 \end{bmatrix} = \frac{1}{4} \begin{bmatrix} 8 \\ 4 \\ 12 \end{bmatrix} = \begin{bmatrix} 2 \\ 1 \\ 3 \end{bmatrix}" /></>,
            ],
            answer: <><InlineMath math="x = 2" />, <InlineMath math="y = 1" />, <InlineMath math="z = 3" /></>,
        },
    },
    {
        id: 17, section: 'D', marks: 5,
        question: <>Farmer Ramakishan and Gurucharan combined sales data problem. Find profit and combined gross revenue. (Data from textbooks: combine matrices <InlineMath math="A" /> and <InlineMath math="B" />)</>,
        solution: {
            steps: [
                <>Combined revenue <InlineMath math="= A + B" /></>,
                <>Total across all entries <InlineMath math="= 2,11,000 \text{ Rs}" /></>,
                <><InlineMath math="\text{Profit} = 2\% \text{ of Total Gross} = 0.02 \times 211000 = 4220" /> Rs.</>,
            ],
            answer: <>Combined gross revenue = Rs. 2,11,000; 2% gross profit = <b>Rs. 4,220</b></>,
        },
    },
    {
        id: 18, section: 'D', marks: 5,
        question: <>For matrices <InlineMath math="A = \begin{bmatrix} 1 & 2 \\ -1 & 3 \end{bmatrix}" />, <InlineMath math="B = \begin{bmatrix} 4 & 0 \\ 1 & 5 \end{bmatrix}" />, <InlineMath math="C = \begin{bmatrix} 2 & 0 \\ 1 & -2 \end{bmatrix}" />: (i) Find <InlineMath math="A + (B + C)" />, (ii) Verify <InlineMath math="(A^{T})^{T} = A" />, (iii) Find <InlineMath math="(bA)^{T}" /> where <InlineMath math="b = -2" />, (iv) Find <InlineMath math="AC - BC" />, (v) Show <InlineMath math="A + A^{T}" /> is symmetric.</>,
        solution: {
            steps: [
                <>(i) <InlineMath math="B + C = \begin{bmatrix} 6 & 0 \\ 2 & 3 \end{bmatrix} \implies A + (B+C) = \begin{bmatrix} 7 & 2 \\ 1 & 6 \end{bmatrix}" /></>,
                <>(ii) <InlineMath math="A^{T} = \begin{bmatrix} 1 & -1 \\ 2 & 3 \end{bmatrix} \implies (A^{T})^{T} = \begin{bmatrix} 1 & 2 \\ -1 & 3 \end{bmatrix} = A" /> ✓</>,
                <>(iii) <InlineMath math="bA = \begin{bmatrix} -2 & -4 \\ 2 & -6 \end{bmatrix} \implies (bA)^{T} = \begin{bmatrix} -2 & 2 \\ -4 & -6 \end{bmatrix}" /></>,
                <>(iv) <InlineMath math="(A - B)C = \begin{bmatrix} -3 & 2 \\ -2 & -2 \end{bmatrix} \begin{bmatrix} 2 & 0 \\ 1 & -2 \end{bmatrix} = \begin{bmatrix} -4 & -4 \\ -6 & 4 \end{bmatrix}" /></>,
                <>(v) <InlineMath math="A + A^{T} = \begin{bmatrix} 2 & 1 \\ 1 & 6 \end{bmatrix}" /> — symmetric since <InlineMath math="(A + A^{T})^{T} = A + A^{T}" /></>,
            ],
            answer: <>(i) <InlineMath math="\begin{bmatrix} 7 & 2 \\ 1 & 6 \end{bmatrix}" /> (ii) Verified (iii) <InlineMath math="\begin{bmatrix} -2 & 2 \\ -4 & -6 \end{bmatrix}" /> (iv) <InlineMath math="\begin{bmatrix} -4 & -4 \\ -6 & 4 \end{bmatrix}" /> (v) Symmetric ✓</>,
        },
    },
    {
        id: 19, section: 'D', marks: 5,
        question: <>Prove for any square matrix <InlineMath math="A" />: (a) <InlineMath math="A + A^{T}" /> is symmetric, (b) <InlineMath math="A - A^{T}" /> is skew-symmetric, (c) <InlineMath math="A" /> can be expressed as sum of symmetric and skew-symmetric matrices.</>,
        solution: {
            steps: [
                <>(a) Let <InlineMath math="P = A + A^{T}" />. <InlineMath math="P^{T} = (A + A^{T})^{T} = A^{T} + (A^{T})^{T} = A^{T} + A = P" />. Hence symmetric.</>,
                <>(b) Let <InlineMath math="Q = A - A^{T}" />. <InlineMath math="Q^{T} = (A - A^{T})^{T} = A^{T} - (A^{T})^{T} = A^{T} - A = -Q" />. Hence skew-symmetric.</>,
                <>(c) <InlineMath math="A = \frac{1}{2}(A + A) = \frac{1}{2}(A + A^{T} + A - A^{T}) = \frac{1}{2}(A + A^{T}) + \frac{1}{2}(A - A^{T})" />.</>,
            ],
            answer: <><InlineMath math="A = \frac{1}{2}(A + A^{T}) + \frac{1}{2}(A - A^{T})" /> — Proved. ✓</>,
        },
    },
    {
        id: 20, section: 'D', marks: 5,
        question: <>Solve using matrix method: <InlineMath math="2x + y = 15" />, <InlineMath math="x + 3y = 10" />. Also verify the solution.</>,
        solution: {
            steps: [
                <><InlineMath math="A = \begin{bmatrix} 2 & 1 \\ 1 & 3 \end{bmatrix}" />, <InlineMath math="X = \begin{bmatrix} x \\ y \end{bmatrix}" />, <InlineMath math="B = \begin{bmatrix} 15 \\ 10 \end{bmatrix}" /></>,
                <><InlineMath math="|A| = 6 - 1 = 5" /></>,
                <><InlineMath math="\text{adj } A = \begin{bmatrix} 3 & -1 \\ -1 & 2 \end{bmatrix} \implies A^{-1} = \frac{1}{5} \begin{bmatrix} 3 & -1 \\ -1 & 2 \end{bmatrix}" /></>,
                <><InlineMath math="X = A^{-1}B = \frac{1}{5} \begin{bmatrix} 3 & -1 \\ -1 & 2 \end{bmatrix} \begin{bmatrix} 15 \\ 10 \end{bmatrix} = \frac{1}{5} \begin{bmatrix} 45-10 \\ -15+20 \end{bmatrix} = \frac{1}{5} \begin{bmatrix} 35 \\ 5 \end{bmatrix} = \begin{bmatrix} 7 \\ 1 \end{bmatrix}" /></>,
                <>Verification: <InlineMath math="2(7) + 1 = 15" /> ✓, <InlineMath math="7 + 3(1) = 10" /> ✓</>,
            ],
            answer: <><InlineMath math="x = 7" />, <InlineMath math="y = 1" /></>,
        },
    },

    /* ── SECTION E — Case Study, 4 marks ── */
    {
        id: 21, section: 'E', marks: 4,
        question: <>Seema's Orphanage Donation: (i) Write equations, (ii) Write in matrix form, (iii) Find <InlineMath math="x" /> and <InlineMath math="y" />.</>,
        subparts: [<><InlineMath math="x" /> = number of children</>, <><InlineMath math="y" /> = amount per child</>],
        solution: {
            steps: [
                <>(i) <InlineMath math="(x - 8)(y + 10) = xy \implies 5x - 4y = 40" />; <InlineMath math="(x + 16)(y - 10) = xy \implies 5x - 8y = -80" /></>,
                <>(ii) Matrix Form: <InlineMath math="\begin{bmatrix} 5 & -4 \\ 5 & -8 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 40 \\ -80 \end{bmatrix}" /></>,
                <>(iii) <InlineMath math="(5x - 4y) - (5x - 8y) = 40 - (-80) \implies 4y = 120 \implies y = 30" /></>,
                <><InlineMath math="5x - 4(30) = 40 \implies 5x = 160 \implies x = 32" /></>,
            ],
            answer: <><InlineMath math="x =" /> <b>32 children</b>, <InlineMath math="y =" /> <b>Rs. 30 per child</b></>,
        },
    },
    {
        id: 22, section: 'E', marks: 4,
        question: <>Stationery Manufacturer: Market A sold: 10000 Pencils, 2000 Erasers, 18000 Sharpeners. Market B sold: 6000 Pencils, 20000 Erasers, 8000 Sharpeners. Sale Prices: Rs 2.50, 1.50, 1.00. Cost Prices: Rs 2.00, 1.00, 0.50. (i) Represent sales as matrix, (ii) Revenue for each market, (iii) Profit in markets, (iv) Gross profit.</>,
        subparts: ['(i) Sales matrix representation', '(ii) Market revenues', '(iii) Market profits', '(iv) Gross profit'],
        solution: {
            steps: [
                <>(i) Sales <InlineMath math="S = \begin{bmatrix} 10000 & 2000 & 18000 \\ 6000 & 20000 & 8000 \end{bmatrix}" /></>,
                <>(ii) Revenue <InlineMath math="= S \begin{bmatrix} 2.50 \\ 1.50 \\ 1.00 \end{bmatrix} = \begin{bmatrix} 46000 \\ 53000 \end{bmatrix}" />. Revenue A = 46000, Revenue B = 53000</>,
                <>(iii) Cost <InlineMath math="= S \begin{bmatrix} 2.00 \\ 1.00 \\ 0.50 \end{bmatrix} = \begin{bmatrix} 31000 \\ 36000 \end{bmatrix}" />. Profit A = 15000, Profit B = 17000</>,
                <>(iv) Gross profit <InlineMath math="= 15000 + 17000 = 32000" /></>,
            ],
            answer: <>Revenue: A = Rs. 46,000, B = Rs. 53,000. Gross Profit = <b>Rs. 32,000</b></>,
        },
    },
    {
        id: 23, section: 'E', marks: 4,
        question: <>Rice Farmers Case: September sales <InlineMath math="A = \begin{bmatrix} 10000 & 20000 & 30000 \\ 50000 & 30000 & 10000 \end{bmatrix}" />, October <InlineMath math="B = \begin{bmatrix} 5000 & 10000 & 6000 \\ 20000 & 10000 & 10000 \end{bmatrix}" />. (i) Find <InlineMath math="A_{23}" />, (ii) Meaning of <InlineMath math="A + B" />, (iii) Ramakishan's 2% profit for Oct, (iv) Combined decrease <InlineMath math="A - B" />.</>,
        subparts: ['(i) Element A₂₃', '(ii) Interpretation of A + B', '(iii) 2% profit calculation', '(iv) Decrease matrix'],
        solution: {
            steps: [
                <>(i) <InlineMath math="A_{23} = 10000" /> (Sales by Gurucharan for variety C in Sep)</>,
                <>(ii) <InlineMath math="A + B" /> represents total combined sales across Sep and Oct.</>,
                <>(iii) Ramakishan Oct (row 1 of <InlineMath math="B" />): <InlineMath math="2\% \times (5000 + 10000 + 6000) = 420" /></>,
                <>(iv) <InlineMath math="A - B = \begin{bmatrix} 5000 & 10000 & 24000 \\ 30000 & 20000 & 0 \end{bmatrix}" /></>,
            ],
            answer: <>(i) <InlineMath math="A_{23} = 10,000" /> (iii) Profit = Rs. 420 (iv) Decrease: <InlineMath math="\begin{bmatrix} 5000 & 10000 & 24000 \\ 30000 & 20000 & 0 \end{bmatrix}" /></>,
        },
    },
    {
        id: 24, section: 'E', marks: 4,
        question: <>Amit, Biraj, Chirag Matrices: <InlineMath math="A = \begin{bmatrix} 1 & 2 \\ -1 & 3 \end{bmatrix}" />, <InlineMath math="B = \begin{bmatrix} 4 & 0 \\ 1 & 5 \end{bmatrix}" />, <InlineMath math="C = \begin{bmatrix} 2 & 0 \\ 1 & -2 \end{bmatrix}" />. (i) Verify <InlineMath math="A+(B+C) = (A+B)+C" />, (ii) Verify <InlineMath math="(A^{T})^{T} = A" />, (iii) Show <InlineMath math="(2-2)B = 2B - 2B" />.</>,
        subparts: ['(i) Associativity of addition', '(ii) Double transpose', '(iii) Distributive property'],
        solution: {
            steps: [
                <>(i) <InlineMath math="A+(B+C) = \begin{bmatrix} 7 & 2 \\ 1 & 6 \end{bmatrix}" /> and <InlineMath math="(A+B)+C = \begin{bmatrix} 7 & 2 \\ 1 & 6 \end{bmatrix}" /> ✓</>,
                <>(ii) <InlineMath math="A^{T} = \begin{bmatrix} 1 & -1 \\ 2 & 3 \end{bmatrix} \implies (A^{T})^{T} = \begin{bmatrix} 1 & 2 \\ -1 & 3 \end{bmatrix} = A" /> ✓</>,
                <>(iii) <InlineMath math="(2 - 2)B = 0B = 0" />. And <InlineMath math="2B - 2B = \begin{bmatrix} 8 & 0 \\ 2 & 10 \end{bmatrix} - \begin{bmatrix} 8 & 0 \\ 2 & 10 \end{bmatrix} = 0" /> ✓</>,
            ],
            answer: <>All three properties verified. ✓</>,
        },
    },
    {
        id: 25, section: 'E', marks: 4,
        question: <>Rectangular Plot Problem: Length <InlineMath math="x" /> is 50m more than breadth <InlineMath math="y" />. 2 times length plus breadth equals 550m. (i) Form equations, (ii) Matrix equation, (iii) Find dimensions using inverse.</>,
        subparts: ['(i) Form simultaneous equations', '(ii) Express as AX = B', '(iii) Solve via A⁻¹'],
        solution: {
            steps: [
                <>(i) <InlineMath math="x - y = 50" />, <InlineMath math="2x + y = 550" /></>,
                <>(ii) <InlineMath math="\begin{bmatrix} 1 & -1 \\ 2 & 1 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 50 \\ 550 \end{bmatrix}" /></>,
                <>(iii) <InlineMath math="|A| = 1 - (-2) = 3" />, <InlineMath math="A^{-1} = \frac{1}{3} \begin{bmatrix} 1 & 1 \\ -2 & 1 \end{bmatrix}" /></>,
                <><InlineMath math="X = \frac{1}{3} \begin{bmatrix} 1 & 1 \\ -2 & 1 \end{bmatrix} \begin{bmatrix} 50 \\ 550 \end{bmatrix} = \frac{1}{3} \begin{bmatrix} 600 \\ 450 \end{bmatrix} = \begin{bmatrix} 200 \\ 150 \end{bmatrix}" /></>,
                <>Area <InlineMath math="= 200 \times 150 = 30,000" /> sq meters.</>,
            ],
            answer: <><InlineMath math="x = 200" /> m, <InlineMath math="y = 150" /> m, Area = <b>30,000 m²</b></>,
        },
    },
];

/* ─── Main Component ─── */
const CBSEQuestions = () => {
    const navigate = useNavigate();
    const [mcqAnswers, setMcqAnswers] = useState({});
    const [revealedSolutions, setRevealedSolutions] = useState({});

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleMcqSelect = (qId, optIdx) => {
        if (mcqAnswers[qId] !== undefined) return;
        setMcqAnswers(prev => ({ ...prev, [qId]: optIdx }));
    };

    const toggleSolution = (qId) => {
        setRevealedSolutions(prev => ({ ...prev, [qId]: !prev[qId] }));
    };

    const mcqScore = MCQ_DATA.reduce((acc, q) => acc + (mcqAnswers[q.id] === q.correct ? 1 : 0), 0);
    const mcqAttempted = Object.keys(mcqAnswers).length;

    const letters = ['a', 'b', 'c', 'd'];

    const sectionGroups = {
        B: DESC_DATA.filter(d => d.section === 'B'),
        C: DESC_DATA.filter(d => d.section === 'C'),
        D: DESC_DATA.filter(d => d.section === 'D'),
        E: DESC_DATA.filter(d => d.section === 'E'),
    };

    return (
        <div className="cbse-questions-page">
            {/* Header */}
            <header className="cbse-header">
                <button className="cbse-back-btn" onClick={() => navigate('/senior/grade/12/matrices')}>
                    <ArrowLeft size={18} /> Back
                </button>
                <div className="cbse-badge">CLASS 12 • CBSE BOARD PRACTICE</div>
                <h1>📝 CBSE Board Questions</h1>
                <p>Practice with actual CBSE-style questions across all difficulty levels.</p>
            </header>

            <div className="cbse-content">
                {/* ─── SECTION A: MCQs ─── */}
                <div className="cbse-section-header section-a">
                    <span style={{ fontSize: '1.4rem' }}>🅰️</span>
                    <h2>Section A — MCQs</h2>
                    <span className="marks-badge">1 mark each</span>
                </div>

                {MCQ_DATA.map((q) => {
                    const answered = mcqAnswers[q.id] !== undefined;
                    const userAnswer = mcqAnswers[q.id];
                    return (
                        <div className="cbse-mcq-card" key={q.id}>
                            <div className="cbse-mcq-question">
                                <span className="q-number">Q{q.id}</span>
                                {q.question}
                            </div>
                            <div className="cbse-mcq-options">
                                {q.options.map((opt, idx) => {
                                    let cls = 'cbse-mcq-option';
                                    if (answered) {
                                        if (idx === q.correct) cls += ' correct';
                                        else if (idx === userAnswer && idx !== q.correct) cls += ' wrong';
                                        else cls += ' disabled-option';
                                    }
                                    return (
                                        <div key={idx} className={cls} onClick={() => handleMcqSelect(q.id, idx)}>
                                            <span className="option-letter">{letters[idx]}</span>
                                            <span>{opt}</span>
                                            {answered && idx === q.correct && <CheckCircle2 size={18} color="#059669" style={{ marginLeft: 'auto' }} />}
                                            {answered && idx === userAnswer && idx !== q.correct && <XCircle size={18} color="#DC2626" style={{ marginLeft: 'auto' }} />}
                                        </div>
                                    );
                                })}
                            </div>
                            {answered && (
                                <div className="cbse-mcq-explanation">
                                    <strong>Explanation:</strong> {q.explanation}
                                </div>
                            )}
                        </div>
                    );
                })}

                {mcqAttempted > 0 && (
                    <div className="cbse-mcq-score">
                        <span>MCQ Score:</span>
                        <span className="score-value">{mcqScore} / {MCQ_DATA.length}</span>
                    </div>
                )}

                {/* ─── SECTION B ─── */}
                <div className="cbse-section-header section-b">
                    <span style={{ fontSize: '1.4rem' }}>🅱️</span>
                    <h2>Section B — Short Answer</h2>
                    <span className="marks-badge">2 marks each</span>
                </div>
                {sectionGroups.B.map(renderDescCard)}

                {/* ─── SECTION C ─── */}
                <div className="cbse-section-header section-c">
                    <span style={{ fontSize: '1.4rem' }}>©️</span>
                    <h2>Section C — Short Answer</h2>
                    <span className="marks-badge">3 marks each</span>
                </div>
                {sectionGroups.C.map(renderDescCard)}

                {/* ─── SECTION D ─── */}
                <div className="cbse-section-header section-d">
                    <span style={{ fontSize: '1.4rem' }}>🅳</span>
                    <h2>Section D — Long Answer</h2>
                    <span className="marks-badge">5 marks each</span>
                </div>
                {sectionGroups.D.map(renderDescCard)}

                {/* ─── SECTION E ─── */}
                <div className="cbse-section-header section-e">
                    <span style={{ fontSize: '1.4rem' }}>🅴</span>
                    <h2>Section E — Case Study</h2>
                    <span className="marks-badge">4 marks each</span>
                </div>
                {sectionGroups.E.map(renderDescCard)}
            </div>
        </div>
    );

    /* ─── Render a descriptive question card ─── */
    function renderDescCard(q) {
        const revealed = revealedSolutions[q.id];
        return (
            <div className="cbse-desc-card" key={q.id}>
                <div className="cbse-desc-question">
                    <span className="q-number">Q{q.id}</span>
                    {q.question}
                </div>
                {q.subparts && (
                    <div className="cbse-desc-subparts">
                        {q.subparts.map((sp, i) => <div key={i}>{sp}</div>)}
                    </div>
                )}
                <button
                    className={`cbse-view-solution-btn ${revealed ? 'active' : ''}`}
                    onClick={() => toggleSolution(q.id)}
                >
                    {revealed ? <><EyeOff size={16} /> Hide Solution</> : <><Eye size={16} /> View Solution</>}
                </button>
                {revealed && (
                    <div className="cbse-solution-block">
                        <div className="solution-title">Solution</div>
                        {q.solution.steps.map((step, i) => (
                            <div className="solution-step" key={i}>• {step}</div>
                        ))}
                        <div className="solution-answer">
                            ✅ {q.solution.answer}
                        </div>
                    </div>
                )}
            </div>
        );
    }
};

export default CBSEQuestions;
