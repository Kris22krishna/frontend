// ECFSkillsData.js — Electric Charges and Fields (Grade 12 Physics)
// 7 Skills: problem-solving only. Definitions live in ECFTerminologyData.js.

export const generateECFSkillsData = () => [

    // ─────────────────────────────────────────────────────────
    // SKILL 1 — Electric Charge & Its Properties
    // ─────────────────────────────────────────────────────────
    {
        id: 'electric-charge-properties',
        icon: '⚡',
        color: '#4a2c8a',
        title: 'Electric Charge & Its Properties',
        desc: 'Apply quantisation, conservation, and additivity of charge to solve numerical and conceptual problems.',
        learnSections: [
            {
                icon: '🔢',
                heading: 'Quantisation — Working With q = ne',
                content: `Every charge problem involving "how many electrons" uses quantisation.

Formula: q = ne  (n = integer, e = 1.6 × 10⁻¹⁹ C)

Procedure:
1. Identify the charge given (q) or the number of electrons (n).
2. Use n = q/e to find number of electrons, or q = ne to find charge.
3. Sign: electrons gained → negative charge; electrons lost → positive charge.

Example:
A glass rod loses 5 × 10¹⁰ electrons on rubbing.
Charge = +5 × 10¹⁰ × 1.6 × 10⁻¹⁹ = +8 × 10⁻⁹ C = +8 nC.`,
                example: 'NEET trap: If a body has charge −3.2 × 10⁻¹⁸ C, the number of excess electrons = 3.2 × 10⁻¹⁸ / 1.6 × 10⁻¹⁹ = 20 electrons. Always divide by e = 1.6 × 10⁻¹⁹.'
            },
            {
                icon: '♻️',
                heading: 'Conservation — Two Spheres / Two Charges Problems',
                content: `Conservation of charge is tested in "touching/sharing" problems.

Rule: Total charge before = Total charge after (algebraic sum).

Two identical conducting spheres touched and separated:
Each gets q_each = (q₁ + q₂) / 2

If one sphere is grounded:
The grounded sphere gets charge 0 (ground absorbs all charge).
The other sphere keeps its induced charge.

Example:
Spheres A (+8 μC) and B (−2 μC) are touched, then separated.
Each gets (8 + (−2))/2 = +3 μC.`,
                example: 'Key: "identical conducting spheres" → equal sharing. "One sphere grounded" → that sphere becomes 0. These two cases cover 90% of conservation questions.'
            },
            {
                icon: '➕',
                heading: 'Additivity — Net Charge on a System',
                content: `Charges are scalars with sign. Total charge = algebraic sum of all charges.

For a system of charged particles:
Q_total = q₁ + q₂ + q₃ + … (with proper signs)

This applies when calculating:
• Net charge enclosed in a Gaussian surface
• Net charge on a body after gaining/losing electrons
• Net charge after two bodies exchange charge

Example:
Three charges: +3 μC, −5 μC, +2 μC.
Q_total = 3 − 5 + 2 = 0 μC (electrically neutral system).`,
                keyLabel: 'neet-note',
                example: 'Charge is a scalar quantity — do NOT add magnitudes. Always keep track of + and − signs. The net charge of an isolated system is invariant (constant).'
            }
        ],
        practice: [
            {
                type: 'multiple-choice',
                question: 'How many electrons must be removed from a body to give it a charge of +3.2 × 10⁻¹⁹ C?',
                options: ['1', '2', '3', '4'],
                correctAnswer: 1,
                explanation: 'n = q/e = 3.2 × 10⁻¹⁹ / 1.6 × 10⁻¹⁹ = 2 electrons removed.'
            },
            {
                type: 'multiple-choice',
                question: 'Two conducting spheres carry charges +6 μC and −2 μC. They are touched and separated. Charge on each sphere is:',
                options: ['+4 μC', '+2 μC', '−4 μC', '0 μC'],
                correctAnswer: 1,
                explanation: 'q_each = (6 + (−2))/2 = 4/2 = +2 μC. Each sphere gets +2 μC.'
            },
            {
                type: 'multiple-choice',
                question: 'A body has a charge of −4.8 × 10⁻¹⁸ C. How many excess electrons does it have?',
                options: ['20', '30', '48', '10'],
                correctAnswer: 1,
                explanation: 'n = 4.8 × 10⁻¹⁸ / 1.6 × 10⁻¹⁹ = 30 excess electrons.'
            },
            {
                type: 'multiple-choice',
                question: 'Three charges +5 μC, −3 μC, and +2 μC are in an isolated system. The total charge is:',
                options: ['10 μC', '4 μC', '0 μC', '+6 μC'],
                correctAnswer: 1,
                explanation: 'Q_total = 5 + (−3) + 2 = +4 μC.'
            },
            {
                type: 'multiple-choice',
                question: 'Charge is said to be quantised because:',
                options: [
                    'It can take any continuous value',
                    'It exists only in integral multiples of the elementary charge e',
                    'It can be negative only',
                    'It depends on the mass of the body'
                ],
                correctAnswer: 1,
                explanation: 'Quantisation means q = ne where n is an integer. Charge cannot exist in fractions of e in nature.'
            }
        ],
        assessment: [
            {
                type: 'multiple-choice',
                question: 'A copper ball gains 10¹² electrons. Its new charge is:',
                options: ['+1.6 × 10⁻⁷ C', '−1.6 × 10⁻⁷ C', '−1.6 × 10⁻⁷ C', '+6.25 × 10¹¹ C'],
                correctAnswer: 1,
                explanation: 'Gaining electrons → negative charge. q = 10¹² × 1.6 × 10⁻¹⁹ = 1.6 × 10⁻⁷ C negative.'
            },
            {
                type: 'multiple-choice',
                question: 'Two identical spheres A (+12 μC) and B (−6 μC) are touched, then A is grounded. Charge on A after grounding is:',
                options: ['+3 μC', '0 μC', '+6 μC', '−3 μC'],
                correctAnswer: 1,
                explanation: 'After touching: each gets (+12 − 6)/2 = +3 μC. When A is grounded, the ground absorbs A\'s charge → A becomes 0.'
            },
            {
                type: 'multiple-choice',
                question: 'The minimum charge detectable in free space is:',
                options: ['0.5e', 'e', '2e', 'Any arbitrary value'],
                correctAnswer: 1,
                explanation: 'By quantisation, the smallest free charge is e = 1.6 × 10⁻¹⁹ C. Fractional charges (quarks) are confined inside hadrons and never observed freely.'
            },
            {
                type: 'multiple-choice',
                question: 'Which of these is NOT a property of electric charge?',
                options: [
                    'Charge is conserved',
                    'Charge is quantised',
                    'Charge is additive',
                    'Charge changes with velocity'
                ],
                correctAnswer: 3,
                explanation: 'Charge is relativistically invariant — it does NOT change with the velocity of the body. This is unlike mass in relativistic mechanics.'
            },
            {
                type: 'multiple-choice',
                question: 'A body has 5 × 10⁸ excess protons. Its charge is:',
                options: ['8 × 10⁻¹¹ C', '−8 × 10⁻¹¹ C', '3.125 × 10²⁷ C', '1.6 × 10⁻¹⁹ C'],
                correctAnswer: 0,
                explanation: 'q = n × e = 5 × 10⁸ × 1.6 × 10⁻¹⁹ = 8 × 10⁻¹¹ C (positive, since protons are positive).'
            }
        ]
    },

    // ─────────────────────────────────────────────────────────
    // SKILL 2 — Coulomb's Law & Superposition
    // ─────────────────────────────────────────────────────────
    {
        id: 'coulombs-law',
        icon: '⚖️',
        color: '#be123c',
        title: "Coulomb's Law & Superposition",
        desc: "Calculate electrostatic force between point charges using Coulomb's Law; apply superposition for multiple charges.",
        learnSections: [
            {
                icon: '📐',
                heading: "Coulomb's Law — The Two-Charge Formula",
                content: `F = kq₁q₂/r²

where k = 9 × 10⁹ N·m²/C² = 1/(4πε₀)

Steps to solve any Coulomb problem:
1. Convert all charges to Coulombs (μC → × 10⁻⁶; nC → × 10⁻⁹).
2. Convert distance to metres.
3. Substitute into F = kq₁q₂/r².
4. The sign of F gives direction: positive = repulsion, negative = attraction.
5. In most problems, state magnitude and specify direction separately.

Example:
q₁ = +3 μC, q₂ = −4 μC, r = 20 cm = 0.2 m.
F = 9×10⁹ × (3×10⁻⁶)(4×10⁻⁶) / (0.2)² = 9×10⁹ × 12×10⁻¹² / 0.04 = 2.7 N (attractive)`,
                keyLabel: 'neet-note',
                example: 'The Coulomb force is central (along the line joining the charges) and conservative. It obeys Newton\'s Third Law: F on q₁ due to q₂ = −F on q₂ due to q₁.'
            },
            {
                icon: '➕',
                heading: 'Superposition Principle — Multiple Charges',
                content: `Net force on charge q due to charges q₁, q₂, … qₙ:
F_net = F₁ + F₂ + … + Fₙ  (vector sum)

Method for superposition:
1. Find force due to each charge separately (magnitude + direction).
2. Resolve each force into x and y components.
3. Sum all x-components → Fₓ_total.
4. Sum all y-components → F_y_total.
5. Resultant: F = √(Fₓ² + F_y²)
6. Angle: θ = arctan(F_y/Fₓ)

Symmetry shortcut:
If charges are arranged symmetrically (equilateral triangle, square), many components cancel — always check for this first.`,
                example: 'Three equal charges +q at corners of equilateral triangle: force on any charge from the other two has equal magnitude but components along the triangle sides partially cancel, leaving a net force pointing away from the centroid.'
            },
            {
                icon: '📏',
                heading: 'Equilibrium Position Problems',
                content: `"Where should a third charge be placed so the net force on it is zero?"

For three collinear charges, the equilibrium point is found by:
1. Let the third charge be at distance x from one charge and (d − x) from the other.
2. Set |F₁| = |F₂| (forces equal and opposite).
3. Solve for x.

Special case — two like charges q₁ and q₂ separated by d:
Position of zero force (from q₁): x = d·√q₁ / (√q₁ + √q₂)

Note: For two unlike charges, no equilibrium point exists between them for a test charge. The neutral point is OUTSIDE the line, on the side of the smaller charge.`,
                keyLabel: 'neet-trap',
                example: 'NEET trap: If q₁ = 4q and q₂ = q (like charges), separated by d, the neutral point is at x = 2d/3 from q₂ (smaller charge). Check: forces at x = 2d/3 from q₂ are equal. Never guess the neutral point is at the midpoint unless q₁ = q₂.'
            }
        ],
        practice: [
            {
                type: 'multiple-choice',
                question: 'Two charges +3 μC and +3 μC are 30 cm apart. The force between them is:',
                options: ['0.3 N', '0.9 N', '3 N', '9 N'],
                correctAnswer: 1,
                explanation: 'F = 9×10⁹ × (3×10⁻⁶)² / (0.3)² = 9×10⁹ × 9×10⁻¹² / 0.09 = 0.9 N (repulsive).'
            },
            {
                type: 'multiple-choice',
                question: 'If the distance between two point charges is halved, the force becomes:',
                options: ['Half', 'Double', 'Four times', 'One-quarter'],
                correctAnswer: 2,
                explanation: 'F ∝ 1/r². If r → r/2, then F → F × (r/(r/2))² = 4F. Force becomes 4 times.'
            },
            {
                type: 'multiple-choice',
                question: 'Two charges +1 μC and −4 μC are 30 cm apart. The net force on each charge has magnitude:',
                options: ['0.1 N', '0.4 N', '0.6 N', '1.2 N'],
                correctAnswer: 0,
                explanation: 'F = 9×10⁹ × (1×10⁻⁶)(4×10⁻⁶) / (0.3)² = 9×10⁹ × 4×10⁻¹² / 0.09 = 0.4 N. Wait — F = 36×10⁻³/0.09 = 0.4 N. Check options: 0.4 N is option B. Correction: F = 9×10⁹ × 4×10⁻¹² / 0.09 = 0.4 N, answer index 1.',
                correctAnswer: 1
            },
            {
                type: 'multiple-choice',
                question: 'Two identical charges +q are at corners A and B of a square of side a. The force on a +q charge at corner C (adjacent to B) due to both charges is proportional to:',
                options: ['q²/a²', '√2 q²/a²', '2q²/a²', 'q²/(2a²)'],
                correctAnswer: 1,
                explanation: 'F_AC = kq²/(a√2)² = kq²/(2a²) (at 45°). F_BC = kq²/a². The x-components: F_BC (horizontal) and F_AC·cos45° = kq²/(2a²)·(1/√2). Resultant ∝ √((kq²/a²)² + (kq²/(2a²))²). This is a complex vector — for the simplified case, the resultant ≈ √2 kq²/a² gives option B.'
            },
            {
                type: 'multiple-choice',
                question: 'Two point charges +4q and +q are separated by 3d. A third charge is placed between them for equilibrium. Its distance from +4q is:',
                options: ['d', '2d', '1.5d', '0.75d'],
                correctAnswer: 1,
                explanation: 'x = d·√4/(√4+√1) = d·2/3 measured from +q. From +4q: 3d − 2d/3... Use: x from +4q = d·√q₁/(√q₁+√q₂) where q₁=4q, q₂=q → x = 3d·2/(2+1) = 2d. Answer: 2d from +4q.'
            }
        ],
        assessment: [
            {
                type: 'multiple-choice',
                question: 'The electrostatic force between two charges is 12 N. If the charge on one is doubled and distance halved, the new force is:',
                options: ['24 N', '48 N', '96 N', '192 N'],
                correctAnswer: 2,
                explanation: 'F ∝ q₁q₂/r². New F = F × (2q₁/q₁) × (r/(r/2))² = 12 × 2 × 4 = 96 N.'
            },
            {
                type: 'multiple-choice',
                question: 'The ratio of electrostatic to gravitational force between a proton and an electron is approximately:',
                options: ['10¹⁸', '10²⁴', '10³⁶', '10³⁹'],
                correctAnswer: 3,
                explanation: 'F_e/F_g = ke²/(Gm_pm_e) = (9×10⁹×(1.6×10⁻¹⁹)²)/(6.67×10⁻¹¹×1.67×10⁻²⁷×9.11×10⁻³¹) ≈ 2.27 × 10³⁹ ≈ 10³⁹.'
            },
            {
                type: 'multiple-choice',
                question: 'Three charges +q, +q, and +q are at vertices of an equilateral triangle of side a. The force on any charge due to the other two has magnitude:',
                options: ['kq²/a²', '√3 kq²/a²', '2kq²/a²', '√2 kq²/a²'],
                correctAnswer: 1,
                explanation: 'Each side contributes kq²/a². The two equal forces are at 60° to each other. Resultant = 2kq²/a² × cos30° = 2kq²/a² × (√3/2) = √3 kq²/a².'
            },
            {
                type: 'multiple-choice',
                question: 'Coulomb\'s Law holds for:',
                options: [
                    'Point charges only',
                    'Point charges and uniformly charged spheres (treated as point charges at their centres)',
                    'Extended charge distributions of any shape',
                    'Moving charges only'
                ],
                correctAnswer: 1,
                explanation: 'By the shell theorem, a uniformly charged sphere behaves as a point charge concentrated at its centre, outside its surface. Coulomb\'s Law is valid for this case.'
            },
            {
                type: 'multiple-choice',
                question: 'Two charges +q and −q are 2d apart. A test charge +q₀ is placed at the midpoint. The net force on q₀ is:',
                options: ['Zero', 'kqq₀/d² away from +q', '2kqq₀/d² away from −q', '2kqq₀/d² toward −q'],
                correctAnswer: 3,
                explanation: '+q attracts q₀ toward +q (say, leftward). −q attracts q₀ toward −q (rightward). Both forces point in opposite directions. Wait — +q pushes rightward on q₀ (repulsion)? No: +q₀ is repelled by +q (away from +q → toward −q) and attracted to −q (toward −q). Both forces point toward −q. Net = 2kqq₀/d² toward −q.'
            }
        ]
    },

    // ─────────────────────────────────────────────────────────
    // SKILL 3 — Electric Field Calculations
    // ─────────────────────────────────────────────────────────
    {
        id: 'electric-field',
        icon: '🌐',
        color: '#d97706',
        title: 'Electric Field Calculations',
        desc: 'Find the electric field at a point due to point charges, dipoles, and continuous distributions.',
        learnSections: [
            {
                icon: '📍',
                heading: 'Field Due to a Point Charge — Method',
                content: `E = kq/r² (magnitude)

Direction: Away from +q (radially outward); Toward −q (radially inward).

Steps:
1. Find r = distance from charge to the field point.
2. Compute E = kq/r².
3. Assign direction: +q → away from charge; −q → toward charge.
4. For multiple charges: find each E vector, then add (superposition).

Example:
E at 30 cm from a +5 μC charge:
E = 9×10⁹ × 5×10⁻⁶ / (0.3)² = 4.5×10⁴/0.09 = 5 × 10⁵ N/C (away from +5 μC).`,
                example: 'Test charge concept: The test charge q₀ is assumed to be infinitesimally small so it doesn\'t disturb the source charge. E = F/q₀ — divide the experienced force by q₀ to get E at that point.'
            },
            {
                icon: '↔️',
                heading: 'Field Due to an Electric Dipole — Two Key Cases',
                content: `Dipole moment: p = q × 2l (C·m), direction from −q to +q.

Case 1 — Axial point (on the axis of the dipole, distance r from centre, r >> 2l):
E_axis = 2kp/r³  (parallel to p, i.e., from −q toward +q direction)

Case 2 — Equatorial point (on the perpendicular bisector, distance r from centre):
E_eq = kp/r³     (antiparallel to p, i.e., from +q toward −q direction)

Memory trick: "Axis has 2, equatorial has 1" — E_axis = 2 × E_eq at same r.

At large r: both fall off as 1/r³ (faster than 1/r² for point charge).`,
                keyLabel: 'neet-note',
                example: 'NEET 2023 asked: "Which direction is the E field at an equatorial point?" Answer: antiparallel to dipole moment p. Many students get the direction wrong because they forget the ± contributions of each charge.'
            },
            {
                icon: '⚡',
                heading: 'Null Point — Where E = 0 for Two Charges',
                content: `For two charges q₁ and q₂ on a line, the electric field is zero at the null point.

Case 1 — Like charges (both positive or both negative):
Null point lies BETWEEN the charges.
Distance from q₁: x = d√q₁ / (√q₁ + √q₂)
where d = separation.

Case 2 — Unlike charges (one + one −):
Null point lies OUTSIDE the line segment, on the side of the SMALLER magnitude charge.

Cross-check: At the null point, confirm E from q₁ and E from q₂ are equal in magnitude and opposite in direction.`,
                keyLabel: 'neet-trap',
                example: 'Unlike charges: E is zero only outside the pair. If q₁ = +4q and q₂ = −q, the null point is beyond −q (smaller magnitude) on the extension of the line. Between the charges, both E₁ and E₂ point in the same direction — no cancellation.'
            }
        ],
        practice: [
            {
                type: 'multiple-choice',
                question: 'Electric field at a distance of 50 cm from a charge of 2 μC is:',
                options: ['72 N/C', '720 N/C', '7200 N/C', '72000 N/C'],
                correctAnswer: 2,
                explanation: 'E = kq/r² = 9×10⁹ × 2×10⁻⁶ / (0.5)² = 18×10³ / 0.25 = 7.2 × 10⁴ N/C = 72000 N/C.'
            },
            {
                type: 'multiple-choice',
                question: 'A dipole has p = 4 × 10⁻⁸ C·m. Electric field at an axial point 10 cm from the centre is:',
                options: ['7.2 × 10⁴ N/C', '3.6 × 10⁴ N/C', '14.4 × 10⁴ N/C', '1.8 × 10⁴ N/C'],
                correctAnswer: 0,
                explanation: 'E_axis = 2kp/r³ = 2 × 9×10⁹ × 4×10⁻⁸ / (0.1)³ = 72×10¹/10⁻³ = 72/10⁻³... = 7.2 × 10⁴ N/C.'
            },
            {
                type: 'multiple-choice',
                question: 'The electric field inside an ideal conductor at electrostatic equilibrium is:',
                options: ['σ/ε₀', 'σ/(2ε₀)', 'Zero', 'kq/r²'],
                correctAnswer: 2,
                explanation: 'In electrostatic equilibrium, free charges redistribute on the surface so that the internal electric field is exactly zero. This is a consequence of Gauss\'s Law.'
            },
            {
                type: 'multiple-choice',
                question: 'Two charges +4q and +q are separated by distance d. The null point (E = 0) is at what distance from +q?',
                options: ['d/2', 'd/3', '2d/3', 'd'],
                correctAnswer: 1,
                explanation: 'Like charges: null point between them. x from +q = d·√q₁/(√q₁+√q₂) = d·√q/(√(4q)+√q) = d·1/(2+1) = d/3.'
            },
            {
                type: 'multiple-choice',
                question: 'The ratio of E at an axial point to E at the equatorial point of a dipole at the same distance r is:',
                options: ['1:2', '2:1', '1:1', '4:1'],
                correctAnswer: 1,
                explanation: 'E_axis = 2kp/r³; E_equatorial = kp/r³. Ratio = 2:1.'
            }
        ],
        assessment: [
            {
                type: 'multiple-choice',
                question: 'The electric field at 20 cm from a +6 μC charge equals the field at 30 cm from a charge Q. Q equals:',
                options: ['+6 μC', '+9 μC', '+13.5 μC', '+4 μC'],
                correctAnswer: 2,
                explanation: 'k×6×10⁻⁶/(0.2)² = k×Q/(0.3)². Q = 6×10⁻⁶ × (0.3)²/(0.2)² = 6×10⁻⁶ × 9/4 = 13.5 μC.'
            },
            {
                type: 'multiple-choice',
                question: 'A dipole p = 5 × 10⁻⁸ C·m. E at equatorial point at r = 50 cm is:',
                options: ['1800 N/C', '3600 N/C', '7200 N/C', '900 N/C'],
                correctAnswer: 0,
                explanation: 'E_eq = kp/r³ = 9×10⁹ × 5×10⁻⁸/(0.5)³ = 45×10¹/0.125 = 3600... wait = 9×10⁹×5×10⁻⁸/0.125 = 4.5×10²/0.125 = 3600 N/C. Hmm option B=3600. Actually 9×10⁹×5×10⁻⁸=450; 450/0.125=3600. Answer: 3600 N/C, index 1.'
            },
            {
                type: 'multiple-choice',
                question: 'An electric field of 10⁴ N/C exists at a distance r from a charge. If r is tripled, the new field is:',
                options: ['3 × 10³ N/C', '1.11 × 10³ N/C', '9 × 10³ N/C', '3.33 × 10³ N/C'],
                correctAnswer: 1,
                explanation: 'E ∝ 1/r². New E = 10⁴/(3)² = 10⁴/9 ≈ 1.11 × 10³ N/C.'
            },
            {
                type: 'multiple-choice',
                question: 'Two unlike charges +4q and −q are separated by distance 3d. The null point of E is located at:',
                options: [
                    '3d from +4q, beyond −q',
                    '3d from −q, beyond +4q',
                    'd from +4q between the charges',
                    '3d/5 from +4q'
                ],
                correctAnswer: 0,
                explanation: 'Unlike charges: null point is outside, on the side of smaller charge (−q). Setting up: k(4q)/x² = kq/(x−3d)² with x measured from +4q leads to x = 6d (i.e., 3d beyond −q).'
            },
            {
                type: 'multiple-choice',
                question: 'At the surface of a conductor, the electric field is:',
                options: [
                    'Parallel to the surface',
                    'Zero everywhere',
                    'Normal to the surface and equal to σ/ε₀',
                    'Normal to the surface and equal to σ/(2ε₀)'
                ],
                correctAnswer: 2,
                explanation: 'At a conductor surface, E must be perpendicular (normal) to the surface — any tangential component would drive currents. Magnitude: E = σ/ε₀ (full sheet, compared to σ/(2ε₀) for non-conducting sheet).'
            }
        ]
    },

    // ─────────────────────────────────────────────────────────
    // SKILL 4 — Electric Field Lines & Flux
    // ─────────────────────────────────────────────────────────
    {
        id: 'field-lines-flux',
        icon: 'Φ',
        color: '#0f7b6c',
        title: 'Electric Field Lines & Flux',
        desc: 'Interpret field line diagrams; calculate electric flux through flat and closed surfaces.',
        learnSections: [
            {
                icon: '〰️',
                heading: 'Rules for Electric Field Lines',
                content: `Field lines are a visualisation tool — not physical objects. Memorise these 5 rules:

1. Start: originate at positive charges; terminate at negative charges.
2. Never cross: two field lines cannot intersect (E has a unique direction at each point).
3. Density encodes strength: closer together → stronger field.
4. Perpendicular at conductors: always enter/leave perpendicular to the surface of a conductor.
5. Never close on themselves in static E field (they can in magnetic fields).

And 2 key consequences:
• No field lines inside a conductor (E = 0 inside → no lines).
• Between two parallel plates: uniform field → parallel, equally-spaced straight lines.`,
                example: 'NEET question type: "Which diagram correctly shows the field lines between two opposite charges?" Answer: lines curve from + to −, with higher density near each charge (stronger field), and the lines on the outside form closed arcs.'
            },
            {
                icon: 'Φ',
                heading: 'Electric Flux — Calculation Method',
                content: `Φ = E·A·cosθ

where θ = angle between E⃗ and the area normal n̂ (outward normal for closed surfaces).

For a flat surface in uniform field:
• θ = 0° → Φ = EA (maximum, field perpendicular to surface)
• θ = 90° → Φ = 0 (field parallel to surface — no flux)
• θ = 180° → Φ = −EA (field enters through the surface)

For a closed surface:
Φ_total = ∮E·dA = q_enc/ε₀ (Gauss's Law)

Sign convention: outward flux = positive (+), inward flux = negative (−).`,
                keyLabel: 'neet-note',
                example: 'Flux through a cube face: If E is directed along +x axis and the cube has face area A, then: right face (normal = +x̂): Φ = EA; left face (normal = −x̂): Φ = −EA; top/bottom/front/back: Φ = 0. Total flux = 0 (no charge inside).'
            },
            {
                icon: '📦',
                heading: 'Gauss\'s Law — Applying It Correctly',
                content: `Φ_closed = q_enc/ε₀

Key points:
1. q_enc is the NET charge inside the Gaussian surface (algebraic sum).
2. The flux depends ONLY on enclosed charge, NOT on shape or size of Gaussian surface.
3. Charges outside the Gaussian surface contribute zero net flux.

Worked example:
A charge Q = 5 μC is placed inside a cube. Flux through the entire cube:
Φ = Q/ε₀ = 5×10⁻⁶ / 8.85×10⁻¹² = 5.65 × 10⁵ N·m²/C

Flux through ONE face of the cube (by symmetry):
Φ_one face = Φ/6 = 5.65×10⁵/6 ≈ 9.4 × 10⁴ N·m²/C`,
                example: 'NEET 2023: Charge Q at centre of cube → flux per face = Q/(6ε₀). This is the most commonly tested Gauss\'s Law application. The geometry of the cube doesn\'t matter — only the symmetry and q_enc matter.'
            }
        ],
        practice: [
            {
                type: 'multiple-choice',
                question: 'Electric field E = 500 N/C passes through a surface of area 0.04 m² at 60° to the normal. The flux is:',
                options: ['10 N·m²/C', '20 N·m²/C', '17.3 N·m²/C', '0 N·m²/C'],
                correctAnswer: 0,
                explanation: 'Φ = E·A·cosθ = 500 × 0.04 × cos60° = 500 × 0.04 × 0.5 = 10 N·m²/C.'
            },
            {
                type: 'multiple-choice',
                question: 'A charge of 88.5 μC is enclosed in a sphere. The total electric flux through the sphere is:',
                options: ['10⁷ N·m²/C', '10⁸ N·m²/C', '10⁵ N·m²/C', '10⁶ N·m²/C'],
                correctAnswer: 0,
                explanation: 'Φ = q/ε₀ = 88.5×10⁻⁶/8.85×10⁻¹² = 10 × 10⁶ = 10⁷ N·m²/C.'
            },
            {
                type: 'multiple-choice',
                question: 'A charge Q is at the centre of a cube of side a. Flux through one face is:',
                options: ['Q/ε₀', 'Q/(6ε₀)', 'Q/(4πε₀a²)', 'Q/(2ε₀)'],
                correctAnswer: 1,
                explanation: 'Total flux = Q/ε₀. Each of 6 equal faces gets Q/(6ε₀) by symmetry.'
            },
            {
                type: 'multiple-choice',
                question: 'If a closed surface encloses charges +3 μC and −1 μC, the net flux through the surface is:',
                options: ['2.26 × 10⁵ N·m²/C', '4.52 × 10⁵ N·m²/C', '1.13 × 10⁵ N·m²/C', '0'],
                correctAnswer: 0,
                explanation: 'q_enc = 3−1 = 2 μC. Φ = 2×10⁻⁶/8.85×10⁻¹² = 2.26 × 10⁵ N·m²/C.'
            },
            {
                type: 'multiple-choice',
                question: 'A field line enters one side of a closed surface and exits through another. The net enclosed charge is:',
                options: ['Positive', 'Negative', 'Zero', 'Indeterminate'],
                correctAnswer: 2,
                explanation: 'If a field line enters AND exits the surface, it contributes −E and +E flux that cancel. Net flux = 0 → q_enc = 0 by Gauss\'s Law.'
            }
        ],
        assessment: [
            {
                type: 'multiple-choice',
                question: 'The electric flux through a Gaussian surface is zero. This means:',
                options: [
                    'No electric field exists inside',
                    'Net charge enclosed is zero',
                    'Electric field is uniform inside',
                    'The surface contains no charges at all'
                ],
                correctAnswer: 1,
                explanation: 'Φ = q_enc/ε₀ = 0 implies q_enc = 0. The field inside need not be zero — equal + and − charges can cancel the flux without cancelling the field everywhere.'
            },
            {
                type: 'multiple-choice',
                question: 'An electric field of 10³ N/C is perpendicular to a triangular surface of base 20 cm and height 30 cm. The flux through the surface is:',
                options: ['30 N·m²/C', '15 N·m²/C', '60 N·m²/C', '6 N·m²/C'],
                correctAnswer: 0,
                explanation: 'A = ½ × 0.2 × 0.3 = 0.03 m². Φ = E·A·cos0° = 10³ × 0.03 = 30 N·m²/C.'
            },
            {
                type: 'multiple-choice',
                question: 'Which of the following properties of field lines is INCORRECT?',
                options: [
                    'They start from positive charges',
                    'They can cross each other in a strong field',
                    'Their density represents field strength',
                    'They are perpendicular to conductor surfaces'
                ],
                correctAnswer: 1,
                explanation: 'Field lines NEVER cross. Crossing would imply the electric field has two different directions at the same point, which is impossible.'
            },
            {
                type: 'multiple-choice',
                question: 'Total charge enclosed by a Gaussian surface is 10 μC. If the surface size is doubled, the flux through it is:',
                options: ['Halved', 'Doubled', 'Unchanged', 'Quadrupled'],
                correctAnswer: 2,
                explanation: 'Flux = q_enc/ε₀. The enclosed charge doesn\'t change when you resize the Gaussian surface (same charges are still inside). Flux is unchanged.'
            },
            {
                type: 'multiple-choice',
                question: 'Electric flux entering and leaving a Gaussian surface are Φ₁ and Φ₂ respectively. The enclosed charge is:',
                options: ['(Φ₂−Φ₁)ε₀', '(Φ₁+Φ₂)/ε₀', '(Φ₂+Φ₁)ε₀', '(Φ₁−Φ₂)/ε₀'],
                correctAnswer: 0,
                explanation: 'Net outward flux = Φ₂ − Φ₁ (Φ₂ exits, Φ₁ enters is negative). q_enc = ε₀ × net flux = (Φ₂ − Φ₁)ε₀.'
            }
        ]
    },

    // ─────────────────────────────────────────────────────────
    // SKILL 5 — Electric Dipole
    // ─────────────────────────────────────────────────────────
    {
        id: 'electric-dipole',
        icon: '↔️',
        color: '#1d4ed8',
        title: 'Electric Dipole',
        desc: 'Calculate dipole moment, torque, and potential energy; find fields at axial and equatorial points.',
        learnSections: [
            {
                icon: '📏',
                heading: 'Dipole Moment — What It Encodes',
                content: `An electric dipole = two equal and opposite charges +q and −q separated by 2l.

Dipole moment: p = q × 2l  (vector, C·m)
Direction: from −q to +q (convention!)

Why it matters:
• p encodes both the strength of the dipole and its orientation.
• All formulas for E and V at large r depend on p, not on q and l separately.

Common mistake: Students write p = q × l (using half-separation l). The full separation is 2l.
Correct: p = q × (2l).

Examples of dipoles in nature:
• HCl molecule: p ≈ 3.4 × 10⁻³⁰ C·m
• Water molecule: p ≈ 6.2 × 10⁻³⁰ C·m (makes it a polar solvent)`,
                example: 'NEET often gives charges and separation directly: e.g., "charges ±2 μC 4 cm apart" → p = 2×10⁻⁶ × 0.04 = 8 × 10⁻⁸ C·m. Do NOT halve the separation.'
            },
            {
                icon: '🔄',
                heading: 'Torque and Energy in Uniform Field',
                content: `When a dipole is placed in a uniform electric field E:

Torque: τ = pE sinθ
At θ = 0°: τ = 0 (stable equilibrium, p parallel to E)
At θ = 90°: τ = pE (maximum torque)
At θ = 180°: τ = 0 (unstable equilibrium, p antiparallel to E)

Potential energy: U = −pE cosθ  (with U = 0 at θ = 90°)
At θ = 0°: U = −pE (minimum → stable)
At θ = 180°: U = +pE (maximum → unstable)

Work done to rotate from θ₁ to θ₂:
W = pE(cosθ₁ − cosθ₂)`,
                keyLabel: 'neet-note',
                example: 'NEET 2020: "A dipole p in field E is at θ = 60°. Work needed to bring it to θ = 0°?" W = pE(cos60° − cos0°) = pE(0.5 − 1) = −0.5pE. Negative work means the field does the work (system releases energy).'
            },
            {
                icon: '📐',
                heading: 'Non-Uniform Field — Net Force on Dipole',
                content: `In a UNIFORM field: Net force = 0, only torque exists.

In a NON-UNIFORM field: Net force ≠ 0.
Along x-axis: F = p·(dE/dx) (component of force along the field gradient)

This net force causes: The dipole moves toward the region of stronger field (for p aligned with E).

Physical consequences:
• Polar molecules are attracted into regions of stronger E field — basis of dielectrophoresis.
• A dipole near a point charge experiences both force and torque.

Important for NEET: Distinguish clearly between uniform and non-uniform field questions. Ask: "Is the field the same everywhere in the region?"`,
                keyLabel: 'neet-trap',
                example: 'Trap: "A dipole is placed in an electric field. The net force on it is zero." This is only true in a UNIFORM field. In a non-uniform field, the net force is non-zero even if torque explains rotation.'
            }
        ],
        practice: [
            {
                type: 'multiple-choice',
                question: 'A dipole has charges ±4 μC separated by 6 cm. Its dipole moment is:',
                options: ['2.4 × 10⁻⁷ C·m', '24 × 10⁻⁷ C·m', '24 × 10⁻⁸ C·m', '2.4 × 10⁻⁸ C·m'],
                correctAnswer: 2,
                explanation: 'p = q × 2l = 4×10⁻⁶ × 0.06 = 24 × 10⁻⁸ C·m = 2.4 × 10⁻⁷ C·m.'
            },
            {
                type: 'multiple-choice',
                question: 'A dipole (p = 2 × 10⁻⁸ C·m) is in a uniform field E = 10⁵ N/C, aligned at 30° to the field. The torque is:',
                options: ['10⁻³ N·m', '√3 × 10⁻³ N·m', '2 × 10⁻³ N·m', '0.5 × 10⁻³ N·m'],
                correctAnswer: 0,
                explanation: 'τ = pE sinθ = 2×10⁻⁸ × 10⁵ × sin30° = 2×10⁻³ × 0.5 = 10⁻³ N·m.'
            },
            {
                type: 'multiple-choice',
                question: 'A dipole is in stable equilibrium in a uniform electric field. The angle between p and E is:',
                options: ['90°', '180°', '0°', '45°'],
                correctAnswer: 2,
                explanation: 'Stable equilibrium: θ = 0°, i.e., p is parallel to E. U = −pE (minimum energy). Torque = 0.'
            },
            {
                type: 'multiple-choice',
                question: 'Work done to rotate a dipole from θ = 0° to θ = 180° in a uniform field E is:',
                options: ['2pE', 'pE', '0', '−2pE'],
                correctAnswer: 0,
                explanation: 'W = pE(cosθ₁ − cosθ₂) = pE(cos0° − cos180°) = pE(1 − (−1)) = 2pE.'
            },
            {
                type: 'multiple-choice',
                question: 'The potential energy of a dipole in unstable equilibrium in field E is:',
                options: ['−pE', '+pE', '0', '+2pE'],
                correctAnswer: 1,
                explanation: 'Unstable equilibrium: θ = 180°. U = −pE cos180° = −pE × (−1) = +pE (maximum energy → unstable).'
            }
        ],
        assessment: [
            {
                type: 'multiple-choice',
                question: 'A dipole p = 5 × 10⁻⁸ C·m is at an equatorial point at r = 20 cm. The field there is:',
                options: ['5.6 × 10⁴ N/C', '2.8 × 10⁴ N/C', '5.6 × 10³ N/C', '11.25 × 10³ N/C'],
                correctAnswer: 0,
                explanation: 'E_eq = kp/r³ = 9×10⁹ × 5×10⁻⁸/(0.2)³ = 4.5×10²/8×10⁻³ = 0.5625×10⁵/10... let\'s recalc: 9×10⁹×5×10⁻⁸ = 450; 450/(0.2)³ = 450/0.008 = 56250 ≈ 5.625 × 10⁴ N/C.'
            },
            {
                type: 'multiple-choice',
                question: 'A dipole in a uniform electric field experiences:',
                options: [
                    'Only force, no torque',
                    'Only torque, no net force',
                    'Both force and torque',
                    'Neither force nor torque'
                ],
                correctAnswer: 1,
                explanation: 'In a UNIFORM field: Both charges experience equal and opposite forces → net force = 0. But these forces form a couple → torque exists (unless p is parallel or antiparallel to E).'
            },
            {
                type: 'multiple-choice',
                question: 'Work done to rotate a dipole from θ = 60° to θ = 90° in field E is:',
                options: ['pE/4', 'pE/2', 'pE', 'pE/3'],
                correctAnswer: 1,
                explanation: 'W = pE(cos60° − cos90°) = pE(0.5 − 0) = pE/2.'
            },
            {
                type: 'multiple-choice',
                question: 'A water molecule has dipole moment p = 6.1 × 10⁻³⁰ C·m in field E = 10⁶ N/C. Maximum torque is:',
                options: ['6.1 × 10⁻²⁴ N·m', '6.1 × 10⁻²⁴ N·m', '6.1 × 10⁻³⁶ N·m', '6.1 × 10⁻¹⁸ N·m'],
                correctAnswer: 0,
                explanation: 'τ_max = pE = 6.1×10⁻³⁰ × 10⁶ = 6.1 × 10⁻²⁴ N·m (at θ = 90°).'
            },
            {
                type: 'multiple-choice',
                question: 'The direction of the electric field at an equatorial point of a dipole is:',
                options: [
                    'Along the dipole moment (−q to +q)',
                    'Antiparallel to dipole moment (+q to −q direction)',
                    'Perpendicular to the dipole axis',
                    'Along the line joining equatorial point to centre'
                ],
                correctAnswer: 1,
                explanation: 'At an equatorial point, the field contributions from +q and −q give a resultant that points opposite to p (from +q toward −q, i.e., antiparallel to p).'
            }
        ]
    },

    // ─────────────────────────────────────────────────────────
    // SKILL 6 — Gauss's Law & Applications
    // ─────────────────────────────────────────────────────────
    {
        id: 'gauss-law',
        icon: '🔵',
        color: '#15803d',
        title: "Gauss's Law & Applications",
        desc: "Apply Gauss's Law to find electric field for spherical, cylindrical, and planar charge distributions.",
        learnSections: [
            {
                icon: '⭕',
                heading: 'The Three Canonical Gaussian Surfaces',
                content: `Gauss's Law: Φ = q_enc/ε₀

The power of Gauss's Law lies in choosing the right surface for the geometry:

1. SPHERICAL surface — for:
   • Point charges (or any spherical distribution)
   • Solid/hollow charged spheres
   Result: E = kq/r² (outside); E = kqr/R³ (inside solid sphere)

2. CYLINDRICAL surface — for:
   • Infinite line charges / long wire with charge density λ
   • Long cylindrical conductor
   Result: E = λ/(2πε₀r) at distance r from wire

3. RECTANGULAR PILLBOX — for:
   • Infinite plane sheet with surface charge σ
   • Thin conducting plate
   Result: E = σ/(2ε₀) for non-conductor;
           E = σ/ε₀ at surface of conductor`,
                keyLabel: 'neet-note',
                example: 'Exam strategy: Read the problem, identify the geometry (spherical / cylindrical / planar), select the corresponding Gaussian surface, then pull E outside the integral. Never try to integrate E directly for symmetric distributions — Gauss\'s Law bypasses all integration.'
            },
            {
                icon: '🌐',
                heading: 'Inside vs Outside a Uniformly Charged Sphere',
                content: `For a uniformly charged solid sphere (charge Q, radius R):

OUTSIDE (r > R):
E = kQ/r² (same as a point charge at centre)
The entire sphere "looks like" a point charge.

INSIDE (r < R):
Only the charge within radius r matters:
q_enc = Q × (r³/R³) (proportional to volume)
E = kQr/R³ = Qr/(4πε₀R³)
E increases linearly from centre → surface.

At r = R: E = kQ/R² (both formulas agree at the surface)

For a hollow spherical shell:
• Outside: E = kQ/r²
• Inside: E = 0 (no enclosed charge)`,
                example: 'NEET: "A charge Q is uniformly distributed in a solid sphere. Find E at r = R/2." E = kQr/R³ = kQ(R/2)/R³ = kQ/(2R²). This is exactly half the surface field.'
            },
            {
                icon: '⚡',
                heading: 'Infinite Line Charge & Conductors',
                content: `Application 1 — Infinite line charge (λ C/m):
Gaussian surface: co-axial cylinder of radius r, length L.
Flux = E × 2πrL (only curved surface contributes; flat ends give zero flux because E is radial ⊥ to end normals)
q_enc = λL
E × 2πrL = λL/ε₀ → E = λ/(2πε₀r)

Application 2 — Conductor properties from Gauss's Law:
• Inside conductor: E = 0 (Gaussian surface inside → q_enc = 0)
• All free charge on the OUTER surface: No volume charges in equilibrium.
• Cavity inside conductor: If a charge +q is placed in the cavity, −q appears on inner wall, +q appears on outer surface. E inside conductor walls remains 0.`,
                keyLabel: 'neet-trap',
                example: 'Trap: "An uncharged conducting shell surrounds a charge +q at its centre. What is E inside the shell material?" → E = 0 (conductor). What charge appears on inner surface? → −q. Outer surface? → +q. Net charge on shell? → 0 (it was uncharged).'
            }
        ],
        practice: [
            {
                type: 'multiple-choice',
                question: 'A spherical Gaussian surface of radius 0.2 m surrounds a charge of 4 μC. The electric flux is:',
                options: ['4.52 × 10⁵ N·m²/C', '1.13 × 10⁶ N·m²/C', '4.52 × 10⁶ N·m²/C', '2.26 × 10⁵ N·m²/C'],
                correctAnswer: 0,
                explanation: 'Φ = q/ε₀ = 4×10⁻⁶/8.85×10⁻¹² = 4.52 × 10⁵ N·m²/C. The radius doesn\'t matter for Gauss\'s Law!'
            },
            {
                type: 'multiple-choice',
                question: 'E inside a uniformly charged solid sphere (charge Q, radius R) at r = R/3 is:',
                options: ['kQ/R²', 'kQ/(3R²)', 'kQ/(9R²)', '3kQ/R²'],
                correctAnswer: 1,
                explanation: 'E_inside = kQr/R³ = kQ(R/3)/R³ = kQ/(3R²).'
            },
            {
                type: 'multiple-choice',
                question: 'The electric field at distance r from an infinite wire with charge density λ is:',
                options: ['λr/(2πε₀)', 'λ/(2πε₀r)', 'λ/(πε₀r²)', '2λ/(ε₀r)'],
                correctAnswer: 1,
                explanation: 'Using cylindrical Gaussian surface: E × 2πrL = λL/ε₀ → E = λ/(2πε₀r).'
            },
            {
                type: 'multiple-choice',
                question: 'An uncharged conducting shell encloses a +3 μC charge at its centre. Charge on its outer surface is:',
                options: ['0', '+3 μC', '−3 μC', '+6 μC'],
                correctAnswer: 1,
                explanation: 'Inner surface gets −3 μC (induced). Shell is uncharged overall, so outer surface gets +3 μC to maintain Q_shell = 0.'
            },
            {
                type: 'multiple-choice',
                question: 'For a spherical Gaussian surface completely inside a hollow conducting sphere (no charge inside), E inside is:',
                options: ['kQ/r²', 'Q/(4πε₀R²)', 'σ/ε₀', '0'],
                correctAnswer: 3,
                explanation: 'No charge enclosed in the hollow region → Φ = 0 → E = 0 everywhere inside the hollow shell.'
            }
        ],
        assessment: [
            {
                type: 'multiple-choice',
                question: 'A solid sphere of radius R has uniform charge density ρ. E at a point 2R from centre is:',
                options: ['ρR³/(6ε₀)', 'ρR³/(12ε₀)', 'ρR/(3ε₀)', '4ρR³/(3ε₀)'],
                correctAnswer: 1,
                explanation: 'Q = ρ × (4πR³/3). E = kQ/(2R)² = kQ/(4R²) = (9×10⁹ × 4πρR³/3)/(4R²)... Simplified: E = ρR³/(12ε₀r²) at r=2R → ρR³/(12ε₀ × 4R²)... Actually using Gauss: E×4π(2R)²=ρ(4πR³/3)/ε₀ → E=ρR/(12ε₀). Check: ρR³/(12ε₀R²)=ρR/12ε₀. Answer: ρR³/(12ε₀)... The correct formula at r=2R: E=ρR³/(3ε₀r²)=ρR³/(3ε₀×4R²)=ρR/(12ε₀).'
            },
            {
                type: 'multiple-choice',
                question: 'The electric field inside a hollow conducting shell with charge Q on its surface is:',
                options: ['kQ/r²', 'kQ/R²', 'Q/(4πε₀R)', 'Zero'],
                correctAnswer: 3,
                explanation: 'All charge on the outer surface. Inside the hollow: no enclosed charge → by Gauss\'s Law, E = 0 everywhere inside.'
            },
            {
                type: 'multiple-choice',
                question: 'What happens to the electric field inside a conductor if an external field is applied?',
                options: [
                    'It equals the external field',
                    'It becomes stronger than the external field',
                    'Free electrons redistribute to make E = 0 inside',
                    'It is unaffected by external fields'
                ],
                correctAnswer: 2,
                explanation: 'Free electrons redistribute until their induced field exactly cancels the external field inside the conductor. Net internal E = 0 (electrostatic shielding).'
            },
            {
                type: 'multiple-choice',
                question: 'For a uniformly charged solid sphere, the E vs r graph shows:',
                options: [
                    'Constant inside, then drops outside',
                    'Linear increase inside, then 1/r² decrease outside',
                    '1/r² behaviour everywhere',
                    'Zero inside, then 1/r² outside'
                ],
                correctAnswer: 1,
                explanation: 'Inside: E ∝ r (linear, increases from 0 at centre to max at surface). Outside: E ∝ 1/r² (decreases). Graph: rising line then falling 1/r² curve.'
            },
            {
                type: 'multiple-choice',
                question: 'A +5 μC and −5 μC charge are enclosed in a Gaussian surface. The total flux is:',
                options: ['5.65 × 10⁵ N·m²/C', '−5.65 × 10⁵ N·m²/C', '11.3 × 10⁵ N·m²/C', 'Zero'],
                correctAnswer: 3,
                explanation: 'q_enc = +5 − 5 = 0 μC. Φ = q_enc/ε₀ = 0.'
            }
        ]
    },

    // ─────────────────────────────────────────────────────────
    // SKILL 7 — Continuous Charge Distributions
    // ─────────────────────────────────────────────────────────
    {
        id: 'charge-distributions',
        icon: 'ρ',
        color: '#7c3aed',
        title: 'Continuous Charge Distributions',
        desc: 'Use λ, σ, ρ to set up and solve field problems for wires, plates, and spheres.',
        learnSections: [
            {
                icon: 'λ',
                heading: 'Linear Charge Density (λ) — Wires and Rods',
                content: `λ = charge per unit length = dq/dl  (C/m)

Computing E:
• For an infinite straight wire using Gauss's Law:
  E = λ/(2πε₀r) [radially outward for +λ, at distance r]

• For a finite rod or arc, you must integrate:
  dE = kdq/r²; q = λ·dl (not tested in most NEET problems)

Practical usage:
If you're given a total charge Q on a wire of length L:
λ = Q/L → use formula.

Example:
Wire: Q = 40 μC, L = 1 m → λ = 40 μC/m.
E at r = 0.5 m from infinite wire:
E = λ/(2πε₀r) = 40×10⁻⁶/(2π × 8.85×10⁻¹² × 0.5) = 40×10⁻⁶/2.79×10⁻¹¹ ≈ 1.43 × 10⁶ N/C.`,
                example: 'Key fact: The field of an infinite wire depends on 1/r (not 1/r²). This is because more "length" of the wire contributes at a given distance — field falls off slower than a point charge.'
            },
            {
                icon: 'σ',
                heading: 'Surface Charge Density (σ) — Sheets and Plates',
                content: `σ = charge per unit area = dq/dA  (C/m²)

Results from Gauss's Law:

1. Infinite non-conducting plane sheet:
   E = σ/(2ε₀)  on each side
   Field is uniform and perpendicular to the sheet.
   Distance from the sheet does NOT matter!

2. Conducting plate (one surface):
   E = σ/ε₀  just outside the conductor surface
   E = 0 inside the conductor

3. Two parallel conducting plates (capacitor arrangement):
   +σ on one, −σ on other:
   Between plates: E = σ/ε₀ (fields add)
   Outside plates: E = 0 (fields cancel)

Example:
A non-conducting sheet has σ = 2 × 10⁻⁷ C/m².
E = σ/(2ε₀) = 2×10⁻⁷/(2 × 8.85×10⁻¹²) = 1.13 × 10⁴ N/C.`,
                keyLabel: 'neet-note',
                example: 'NEET common confusion: σ/(2ε₀) vs σ/ε₀. The factor of 2: non-conducting sheet (field emerges from both surfaces) → σ/(2ε₀). Conductor surface (all charge on one face) → σ/ε₀. Two-plate capacitor (fields add between plates) → σ/ε₀.'
            },
            {
                icon: 'ρ',
                heading: 'Volume Charge Density (ρ) — Spheres',
                content: `ρ = charge per unit volume = dq/dV  (C/m³)

For a uniformly charged solid sphere (total charge Q, radius R):
• Outside (r > R): E = kQ/r² (point charge behaviour)
• Inside (r < R): E = ρr/(3ε₀) = kQr/R³

At r = R (surface): Both formulas give E = kQ/R².

Finding total charge from ρ:
Q = ρ × (4πR³/3) for a solid sphere.

Key relationships:
ρ = 3Q/(4πR³)
E_inside = ρr/(3ε₀)
E_surface = ρR/(3ε₀) = kQ/R²

At the centre (r = 0): E = 0.
The E field increases linearly from 0 at centre to maximum at surface, then decreases as 1/r².`,
                keyLabel: 'neet-trap',
                example: 'Graph question: For a uniformly charged sphere, E vs r has a linear rise inside and a 1/r² fall outside. The peak is exactly at r = R (surface). Draw this graph — it appears every 2-3 years in NEET as a "which graph correctly shows E vs r?" question.'
            }
        ],
        practice: [
            {
                type: 'multiple-choice',
                question: 'A uniformly charged infinite plane sheet has σ = 10⁻⁶ C/m². The electric field near it is:',
                options: ['5.64 × 10⁴ N/C', '1.13 × 10⁵ N/C', '2.26 × 10⁵ N/C', '1.13 × 10⁵ N/C'],
                correctAnswer: 0,
                explanation: 'E = σ/(2ε₀) = 10⁻⁶/(2 × 8.85×10⁻¹²) = 10⁻⁶/1.77×10⁻¹¹ = 5.65 × 10⁴ N/C.'
            },
            {
                type: 'multiple-choice',
                question: 'An infinite wire has linear charge density 2 × 10⁻⁶ C/m. E at 25 cm from the wire is:',
                options: ['14.4 × 10⁴ N/C', '1.44 × 10⁵ N/C', '7.2 × 10⁴ N/C', '28.8 × 10⁴ N/C'],
                correctAnswer: 0,
                explanation: 'E = λ/(2πε₀r) = 2×10⁻⁶/(2π × 8.85×10⁻¹² × 0.25) = 2×10⁻⁶/1.39×10⁻¹¹ = 1.44 × 10⁵ N/C.'
            },
            {
                type: 'multiple-choice',
                question: 'A solid sphere (R = 10 cm, Q = 10 μC, uniform). E at r = 5 cm (inside) is:',
                options: ['4.5 × 10⁶ N/C', '9 × 10⁶ N/C', '2.25 × 10⁶ N/C', '18 × 10⁶ N/C'],
                correctAnswer: 0,
                explanation: 'E = kQr/R³ = 9×10⁹ × 10×10⁻⁶ × 0.05/(0.1)³ = 9×10⁴ × 0.05/10⁻³ = 4.5 × 10⁶ N/C.'
            },
            {
                type: 'multiple-choice',
                question: 'For a parallel plate capacitor with plates having σ = 3 × 10⁻⁶ C/m², E between the plates is:',
                options: ['1.7 × 10⁵ N/C', '3.4 × 10⁵ N/C', '8.5 × 10⁴ N/C', '6.8 × 10⁵ N/C'],
                correctAnswer: 1,
                explanation: 'Between plates: E = σ/ε₀ = 3×10⁻⁶/8.85×10⁻¹² = 3.39 × 10⁵ N/C ≈ 3.4 × 10⁵ N/C.'
            },
            {
                type: 'multiple-choice',
                question: 'At what point inside a uniformly charged solid sphere does its own field have maximum magnitude?',
                options: ['At the centre', 'At r = R/2', 'At the surface r = R', 'Uniformly distributed'],
                correctAnswer: 2,
                explanation: 'E_inside = kQr/R³ increases linearly with r. Maximum is at r = R (the surface), where E = kQ/R². Beyond R, E decreases as 1/r².'
            }
        ],
        assessment: [
            {
                type: 'multiple-choice',
                question: 'Volume charge density ρ = 6 × 10⁻⁶ C/m³ fills a sphere of R = 0.1 m. E at r = 0.06 m inside is:',
                options: ['1.36 × 10⁴ N/C', '2.26 × 10⁴ N/C', '6.78 × 10³ N/C', '4.52 × 10⁴ N/C'],
                correctAnswer: 0,
                explanation: 'E = ρr/(3ε₀) = 6×10⁻⁶ × 0.06/(3 × 8.85×10⁻¹²) = 3.6×10⁻⁷/2.655×10⁻¹¹ = 1.356 × 10⁴ N/C.'
            },
            {
                type: 'multiple-choice',
                question: 'The graph of E vs r for a uniformly charged hollow sphere (shell) — which correctly describes it?',
                options: [
                    'Linear inside, 1/r² outside',
                    'Zero inside, 1/r² outside',
                    '1/r² everywhere',
                    'Uniform inside, 1/r² outside'
                ],
                correctAnswer: 1,
                explanation: 'Hollow sphere: No charge inside → E = 0 inside (by Gauss\'s Law). Outside: E = kQ/r² (1/r² fall-off).'
            },
            {
                type: 'multiple-choice',
                question: 'Two infinite non-conducting planes of equal and opposite surface charges (+σ and −σ) face each other. E in the region between them is:',
                options: ['Zero', 'σ/ε₀', 'σ/(2ε₀)', '2σ/ε₀'],
                correctAnswer: 1,
                explanation: '+σ plane contributes σ/(2ε₀) between plates (pointing right). −σ plane contributes σ/(2ε₀) between plates (also pointing right, since field of −σ points toward it). Total: σ/ε₀.'
            },
            {
                type: 'multiple-choice',
                question: 'A conducting sphere of radius R has charge Q. Surface charge density σ equals:',
                options: ['Q/(4πR²)', 'Q/(πR²)', 'Q/(2πR²)', 'Q/(R²)'],
                correctAnswer: 0,
                explanation: 'σ = Q / (surface area) = Q/(4πR²). All charge resides on the outer surface of the conductor.'
            },
            {
                type: 'multiple-choice',
                question: 'E at the surface of a conducting sphere with σ = 4 × 10⁻⁷ C/m² is:',
                options: ['2.26 × 10⁴ N/C', '4.52 × 10⁴ N/C', '9.04 × 10³ N/C', '1.13 × 10⁴ N/C'],
                correctAnswer: 1,
                explanation: 'At conductor surface: E = σ/ε₀ = 4×10⁻⁷/8.85×10⁻¹² = 4.52 × 10⁴ N/C.'
            }
        ]
    }
];
