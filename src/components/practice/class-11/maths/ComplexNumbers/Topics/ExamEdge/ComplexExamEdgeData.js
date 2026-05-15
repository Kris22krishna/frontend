export const complexExamEdgeData = {
    exams: [
        {
            name: 'JEE Mains',
            color: '#f59e0b',
            emoji: '🥇',
            weightage: '4-8 marks',
            freq: '1-2 questions per year',
            topics: ['Express in a+ib form (rationalisation)', 'Powers of i (mod 4 trick)', 'Modulus & conjugate properties', 'Equality — equating real/imaginary parts'],
            strategy: 'Master the a+ib rationalisation technique — multiply numerator and denominator by the conjugate of the denominator. This appears almost every year. Use the i-cycle (divide exponent by 4, use remainder) to evaluate powers quickly.',
            pitfalls: ['√(−a)×√(−b) ≠ √(ab) when a,b > 0 — convert to i-form first', 'Im(z) = b, NOT bi — the imaginary part is always a real number', 'z⁻¹ = z̄/|z|² — not just the conjugate z̄'],
        },
        {
            name: 'JEE Advanced',
            color: '#ef4444',
            emoji: '🔬',
            weightage: '4-12 marks',
            freq: 'Used across Quadratics & Coordinate sections',
            topics: ['Loci in Argand plane', 'Modulus inequality proofs', 'Quadratic equations with complex roots', 'Properties of conjugate — algebraic identities'],
            strategy: 'Focus on WHY modulus properties work — |z₁z₂|=|z₁||z₂| and the triangle inequality are tested via short proofs. Link complex loci to standard circle/line equations. For quadratic roots: use Vieta\'s formulas with complex conjugate pairs.',
            pitfalls: ['Complex numbers have NO ordering — never use > or < to compare z₁ and z₂', 'Triangle inequality: |z₁+z₂| ≤ |z₁|+|z₂| — equality only when z₁, z₂ have the same argument'],
        },
        {
            name: 'KCET (Karnataka)',
            color: '#0d9488',
            emoji: '🌟',
            weightage: '3-6 marks',
            freq: '2-3 questions per year',
            topics: ['Standard form a+ib conversion', 'Powers of i', 'Conjugate and modulus', 'Equality of complex numbers (simultaneous equations)'],
            strategy: 'KCET tracks NCERT examples very closely. Practise every worked example in Chapter 4. The equality-based simultaneous equations type — equating real and imaginary parts to get two real equations — is a reliable KCET question every year.',
            pitfalls: ['(√(−1))² = −1, not 1 — i² is always −1', 'For z = a+ib the Argand plane point is (a, b) — NOT (b, a)', 'Multiplicative inverse: divide the conjugate by |z|² = a²+b²'],
        },
    ],
    proTips: [
        'Always convert $\\sqrt{-a}$ to $i\\sqrt{a}$ before doing any arithmetic — this avoids the most common sign errors.',
        'The i-cycle trick (divide exponent by 4, use remainder) is a guaranteed time-saver in MCQs.',
        'Rationalisation = multiply top and bottom by the conjugate of the denominator. This solves every division problem.',
    ],
};
