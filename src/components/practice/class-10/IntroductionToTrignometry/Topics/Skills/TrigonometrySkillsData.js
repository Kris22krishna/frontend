// TrigonometrySkillsData.js
// Professional NCERT-aligned content for Class 10 Trigonometry

export const SKILLS = [
    {
        id: 'real_life', title: 'Trigonometry in Real-Life Situations', subtitle: 'Meaning and Applications', icon: '🌍', color: '#3b82f6',
        desc: 'Understand the meaning of trigonometry and its applications in measuring height and distance.',
        learn: {
            concept: 'Trigonometry is not just about triangles on paper! It is the science of "triangulation" used to measure things we cannot reach physically.',
            rules: [
                { title: 'The Triad', f: '\\text{Triangle} + \\text{Measure}', d: 'Trigonometry comes from Greek: "Trigonon" (triangle) and "Metron" (measure).', ex: 'Finding the height of a flagpole using its shadow.', tip: 'Always start by visualizing the right-angled triangle in the scene.' },
                { title: 'Angle of Elevation', f: '\\alpha > 0^\\circ', d: 'The angle formed by the line of sight with the horizontal when we look UP at an object.', ex: 'Looking up at the top of a lighthouse.', tip: 'The horizontal line is your starting point (0 degrees).' },
                { title: 'Angle of Depression', f: '\\beta > 0^\\circ', d: 'The angle formed by the line of sight with the horizontal when we look DOWN at an object.', ex: 'Standing on a balcony and looking at a car on the road.', tip: 'Angle of Depression = Angle of Elevation from the object back to you!' },
                { title: 'Right Triangle Model', f: '90^\\circ \\text{ is key}', d: 'Most real-world trig problems assume the ground and a wall/tower form a perfect 90-degree angle.', ex: 'A ladder leaning against a vertical wall.', tip: 'Identify the "vertical" and "horizontal" to find your right angle.' },
                { title: 'Indirect Measurement', f: '\\text{Tan } \\theta = \\frac{H}{D}', d: 'If you know the distance ($D$) and angle ($\\theta$), you can find the height ($H$) without climbing.', ex: 'Measuring Mt. Everest height.', tip: 'Tangent is the most common ratio for height/distance problems.' }
            ]
        },
        practice: [
            { question: "A student observes the top of a tower forming a right triangle with the ground. How can trigonometry find the tower's height?", options: ["By using only the shadow's length", "By using the angle of elevation and shadow length", "By knowing only the time of day", "By guessing"], correct: 1, explanation: "Trigonometric ratios connect the known angle of elevation and the known side (shadow) to the unknown height." },
            { question: "A girl sitting on a balcony looks at a flower pot across a river. Explain how trigonometry could help determine the river's width.", options: ["Using building height and angle of depression", "Using water speed", "Using only the river length", "None of these"], correct: 0, explanation: "The height and angle of depression form a right triangle to find the adjacent width." },
            { question: "A kite is flying at a height of $60$ m forming a $60^\\circ$ angle with the ground. Which ratio helps find string length?", options: ["sine", "cosine", "tangent", "cotangent"], correct: 0, explanation: "sine = opposite/hypotenuse (height/string)." },
            { question: "If a pole $6$ m high casts a shadow $2\\sqrt{3}$ m long on the ground, find the sun's elevation.", options: ["$60^\\circ$", "$30^\\circ$", "$45^\\circ$", "$90^\\circ$"], correct: 0, explanation: "$\\tan \\theta = 6 / (2\\sqrt{3}) = 3/\\sqrt{3} = \\sqrt{3}$. $\\theta = 60^\\circ$." },
            { question: "A ladder $15$ m long reaches a window $9$ m high. How far is the foot of the ladder from the wall?", options: ["$12$ m", "$10$ m", "$8$ m", "$6$ m"], correct: 0, explanation: "Using Pythagoras: $dist^2 = 15^2 - 9^2 = 225 - 81 = 144$. $dist = 12$." },
            { question: "An observer $1.5$ m tall is $28.5$ m away from a tower. The angle of elevation of the top is $45^\\circ$. Tower height?", options: ["$30$ m", "$28.5$ m", "$27$ m", "$31.5$ m"], correct: 0, explanation: "$\\tan 45 = h/28.5 \\rightarrow h = 28.5$. Total height = $28.5 + 1.5 = 30$ m." },
            { question: "The ratio of the length of a rod and its shadow is $1 : \\sqrt{3}$. The angle of elevation of the sun is:", options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"], correct: 0, explanation: "$\\tan \\theta = 1/\\sqrt{3} \\rightarrow \\theta = 30^\\circ$." },
            { question: "If the angle of elevation of a tower from a distance of $100$ m is $30^\\circ$, then the height of the tower is:", options: ["$100/\\sqrt{3}$ m", "$50\\sqrt{3}$ m", "$100\\sqrt{3}$ m", "$50$ m"], correct: 0, explanation: "$\\tan 30 = h/100 \\rightarrow h = 100/\\sqrt{3}$." },
            { question: "A circus artist is climbing a $20$ m long rope tightly stretched from the top of a vertical pole to the ground. If angle is $30^\\circ$, find pole height.", options: ["$10$ m", "$20$ m", "$15$ m", "$5$ m"], correct: 0, explanation: "$\\sin 30 = h/20 \\rightarrow 1/2 = h/20 \\rightarrow h = 10$." },
            { question: "The angle of depression of a car on the ground from the top of a $75$ m tower is $30^\\circ$. Distance of car from tower base?", options: ["$75\\sqrt{3}$ m", "$25\\sqrt{3}$ m", "$75/\\sqrt{3}$ m", "$150$ m"], correct: 0, explanation: "$\\tan 30 = 75/d \\rightarrow 1/\\sqrt{3} = 75/d \\rightarrow d = 75\\sqrt{3}$." },
            { question: "Two poles of equal heights are standing opposite each other on either side of a $80$ m road. Angles are $60^\\circ$ and $30^\\circ$. Height?", options: ["$20\\sqrt{3}$ m", "$40\\sqrt{3}$ m", "$20$ m", "$30$ m"], correct: 0, explanation: "Calculated via $\\tan 60 = h/x$ and $\\tan 30 = h/(80-x)$." },
            { question: "A vertical pole of length $6$ m casts a shadow $4$ m long. At the same time, a tower casts a shadow $28$ m long. Tower height?", options: ["$42$ m", "$40$ m", "$48$ m", "$38$ m"], correct: 0, explanation: "Ratio $6/4 = h/28 \\rightarrow 1.5 = h/28 \\rightarrow h = 42$." },
            { question: "From a point $P$ on the ground the angle of elevation of the top of a $10$ m tall building is $30^\\circ$. A flag is hoisted at top. Flag length?", options: ["$10(\\sqrt{3}-1)$ m", "$10$ m", "$7.32$ m", "$17.32$ m"], correct: 0, explanation: "Using diff of tan heights." },
            { question: "A tree breaks due to storm and the broken part touches ground at $30^\\circ$, $8$ m from foot. Find height.", options: ["$8\\sqrt{3}$ m", "$8$ m", "$16$ m", "$12$ m"], correct: 0, explanation: "Total height = $AB + AC$ (vertical + hypotenuse)." },
            { question: "A bridge across a river makes an angle of $45^\\circ$ with the bank. If length of bridge is $150$ m, width of river?", options: ["$75\\sqrt{2}$ m", "$150\\sqrt{2}$ m", "$75$ m", "$100$ m"], correct: 0, explanation: "$\\sin 45 = w/150 \\rightarrow w = 150/\\sqrt{2} = 75\\sqrt{2}$." },
            { question: "If the altitude of the sun is $60^\\circ$, the height of the tower which casts a shadow of length $30$ m is:", options: ["$30\\sqrt{3}$ m", "$15\\sqrt{3}$ m", "$30/\\sqrt{3}$ m", "$15$ m"], correct: 0, explanation: "$\\tan 60 = h/30 \\rightarrow h = 30\\sqrt{3}$." },
            { question: "The upper part of a tree is broken by the wind and makes an angle of $30^\\circ$ with the ground. The distance from the foot of the tree to the point where the top touches the ground is $5$ m. The height of the tree is", options: ["$5\\sqrt{3}$ m", "$10\\sqrt{3}/3$ m", "$5\\sqrt{3}/3$ m", "$15$ m"], correct: 0, explanation: "$\\\\frac{5}{\\\\sqrt{3}} + \\\\frac{10}{\\\\sqrt{3}} = \\\\frac{15}{\\\\sqrt{3}} = 5\\sqrt{3}$." },
            { question: "A tower stands vertically on the ground. From a point on the ground, which is $15$ m away from the foot of the tower, the angle of elevation of the top of the tower is found to be $60^\\circ$. Find the height of the tower.", options: ["$15\\sqrt{3}$ m", "$15$ m", "$20\\sqrt{3}$ m", "$30$ m"], correct: 0, explanation: "$\\tan 60 = h/15 \\rightarrow h = 15\\sqrt{3}$." },
            { question: "True or False: Trigonometry can only be applied to right-angled triangles directly.", options: ["True", "False"], correct: 0, explanation: "Basic trigonometric ratios are defined on right triangles." },
            { question: "Can trigonometry be used to find the width of a river if building height and angle of depression are known?", options: ["Yes", "No", "Only if river is straight", "Cannot be determined"], correct: 0, explanation: "Yes, using tangent or cotangent ratios with the height and angle." }
        ],
        assessment: [
            { question: "A $1.2$ m tall girl spots a balloon moving with the wind at height $88.2$ m. Angle changes from $60^\\circ$ to $30^\\circ$. Distance?", options: ["$58\\sqrt{3}$ m", "$60\\sqrt{3}$ m", "$87\\sqrt{3}$ m", "$174$ m"], correct: 0, explanation: "Difference in distances $d_1 - d_2$ using $(88.2 - 1.2)$ as altitude." },
            { question: "A straight highway leads to the foot of a tower. A man notices a car at $30^\\circ$ depression. After $6$s, it is $60^\\circ$. When reaches tower?", options: ["$3$ seconds", "$6$ seconds", "$9$ seconds", "$4$ seconds"], correct: 0, explanation: "Ratio of speeds/distances in $30/60$ triangles." },
            { question: "Angles of elevation of top of tower from two points at dist $4$ m and $9$ m are complementary. Height?", options: ["$6$ m", "$5$ m", "$7.2$ m", "$13$ m"], correct: 0, explanation: "Complementary angles $\\rightarrow \\tan A \\cdot \\tan B = \\tan A \\cdot \\cot A = 1 \\rightarrow (h/4)(h/9) = 1 \\rightarrow h^2 = 36$." },
            { question: "From the top of a $7$ m high building, the angle of elevation of a cable tower is $60^\\circ$ and depression of foot is $45^\\circ$. Height?", options: ["$7(\\sqrt{3}+1)$ m", "$7\\sqrt{3}$ m", "$14$ m", "$10$ m"], correct: 0, explanation: "Base dist = building height ($45^\\circ$). Tower top = $7 + 7\\tan 60$." },
            { question: "As observed from the top of a $75$ m high lighthouse, angles of depression of two ships are $30^\\circ$ and $45^\\circ$. Distance between ships?", options: ["$75(\\sqrt{3}-1)$ m", "$75\\sqrt{3}$ m", "$150$ m", "$75(\\sqrt{3}+1)$ m"], correct: 0, explanation: "Dist 1 = $75$ m. Dist 2 = $75\\sqrt{3}$ m. Diff = $75(\\sqrt{3}-1)$." },
            { question: "If a flagstaff $5$ m high on a tower casts a shadow $5\\sqrt{3}$ m, find angle.", options: ["$30^\\circ$", "$60^\\circ$", "$45^\\circ$", "$0^\\circ$"], correct: 0, explanation: "$\\tan = 5/5\\sqrt{3} = 1/\\sqrt{3} \\rightarrow 30^\\circ$." },
            { question: "A kite is flying at a height of $75$ m. If angle is $60^\\circ$, find string length.", options: ["$50\\sqrt{3}$ m", "$75\\sqrt{3}$ m", "$25\\sqrt{3}$ m", "$100$ m"], correct: 0, explanation: "$\\sin 60 = 75/L \\rightarrow L = 150/\\sqrt{3} = 50\\sqrt{3}$." },
            { question: "If shadow length = height, angle is:", options: ["$45^\\circ$", "$30^\\circ$", "$60^\\circ$", "$90^\\circ$"], correct: 0, explanation: "$\\tan \\theta = 1 \\rightarrow 45^\\circ$." },
            { question: "The line of sight is above the horizontal line when angle is:", options: ["Elevation", "Depression", "Right", "Reflex"], correct: 0, explanation: "Definition of elevation." },
            { question: "True or False: In a right triangle, the hypotenuse is the side opposite to the angle of elevation.", options: ["False", "True"], correct: 0, explanation: "Hypotenuse is always opposite the 90-degree angle." }
        ]
    },
    {
        id: 'trig_ratios', title: 'Understanding Trigonometric Ratios', subtitle: 'The 6 Core Ratios', icon: '📐', color: '#10b981',
        desc: 'Master the fundamental ratios: Sine, Cosine, Tangent, and their reciprocals.',
        learn: {
            concept: 'Trigonometric ratios are just simple fractions. They compare two sides of a right-angled triangle relative to one of its acute angles.',
            rules: [
                { title: 'SOH', f: '\\sin \\theta = \\frac{Opp}{Hyp}', d: 'Sine is Opposite over Hypotenuse.', ex: 'Side opposite to $\\theta$ is 3, Hyp is 5, so $\\sin \\theta = 3/5$.', tip: 'Reciprocal is Cosecant.' },
                { title: 'CAH', f: '\\cos \\theta = \\frac{Adj}{Hyp}', d: 'Cosine is Adjacent over Hypotenuse.', ex: 'Side adjacent to $\\theta$ is 4, Hyp is 5, so $\\cos \\theta = 4/5$.', tip: 'Reciprocal is Secant.' },
                { title: 'TOA', f: '\\tan \\theta = \\frac{Opp}{Adj}', d: 'Tangent is Opposite over Adjacent.', ex: '$\\tan \\theta = 3/4$ if Opp=3, Adj=4.', tip: 'Reciprocal is Cotangent.' },
                { title: 'Tangent Relation', f: '\\tan \\theta = \\frac{\\sin \\theta}{\\cos \\theta}', d: 'The Tangent ratio is also the ratio of Sine to Cosine.', ex: 'If $\\sin=3/5$ and $\\cos=4/5$, then $\\tan=(3/5)/(4/5)=3/4$.', tip: 'Use this when Hypotenuse is unknown.' },
                { title: 'Square Relation 1', f: '\\sin^2 A + \\cos^2 A = 1', d: 'The square of Sine plus the square of Cosine always equals 1.', ex: '$(3/5)^2 + (4/5)^2 = 9/25 + 16/25 = 25/25 = 1$.', tip: 'The most important formula in Trigonometry!' }
            ]
        },
        practice: [
            { question: "In a right $\\triangle ABC$, $\\sin A = 3/5$. Find $\\cos A$ if Hypotenuse is the same.", options: ["$4/5$", "$3/4$", "$1$", "None"], correct: 0, explanation: "Using \\sqrt{1 - (3/5)^2} or 3-4-5 triplet." },
            { question: "Which ratio is the reciprocal of $\\sin \\theta$?", options: ["$\\csc \\theta$", "$\\sec \\theta$", "$\\tan \\theta$", "$\\cot \\theta$"], correct: 0, explanation: "Cosecant is $1 / sin$." },
            { question: "In right triangle ABC, if $\\tan A = 1$, then $\\sin A$ and $\\cos A$ are:", options: ["Equal", "Infinite", "$0$", "None"], correct: 0, explanation: "tan = sin/cos. If tan=1, then sin=cos." },
            { question: "A right triangle has sides $8, 15, 17$. Find $\\sin$ of angle opposite to $15$.", options: ["$15/17$", "$8/17$", "$8/15$", "None"], correct: 0, explanation: "Opp/Hyp = 15/17." },
            { question: "Value of $\\cos \\theta \\cdot \\sec \\theta$ is?", options: ["$1$", "$0$", "$\\tan^2 \\theta$", "None"], correct: 0, explanation: "Reciprocals multiply to 1." },
            { question: "If $\\sin A = 3/4$, then $\\csc A$ is?", options: ["$4/3$", "$3/4$", "$1/2$", "None"], correct: 0, explanation: "Swap numerator and denominator." },
            { question: "In $\\triangle ABC$, $\\angle B = 90$. $\\tan A = 1/\\sqrt{3}$. Find $\\cos A$.", options: ["$\\sqrt{3}/2$", "$1/2$", "$1$", "None"], correct: 0, explanation: "Adj/Hyp = \\sqrt{3}/2." },
            { question: "What is $\\sin A$ if $\\cos A = 0$?", options: ["$1$", "$0$", "$-1$", "None"], correct: 0, explanation: "Sine is max when Cosine is 0." },
            { question: "Ratio of $\\sin A$ to $\\cos A$ is?", options: ["$\\tan A$", "$\\cot A$", "$\\sec A$", "None"], correct: 0, explanation: "Definition of tangent." },
            { question: "If $\\tan A = 3/4$, find $\\sin A$.", options: ["$3/5$", "$4/5$", "$5/3$", "None"], correct: 0, explanation: "Opp=3, Adj=4 \\rightarrow Hyp=5. Sin = 3/5." },
            { question: "$\\cos^2 A$ is equal to?", options: ["$1 - \\sin^2 A$", "$1 + \\sin^2 A$", "$\\tan A$", "None"], correct: 0, explanation: "Identity 1." },
            { question: "Reciprocal of $\\cot A$ is?", options: ["$\\tan A$", "$\\sin A$", "$\\cos A$", "None"], correct: 0, explanation: "Standard definition." },
            { question: "Which is the ratio for Cosine?", options: ["Adj/Hyp", "Opp/Hyp", "Opp/Adj", "None"], correct: 0, explanation: "CAH." },
            { question: "Which is the ratio for Sine?", options: ["Opp/Hyp", "Adj/Hyp", "Opp/Adj", "None"], correct: 0, explanation: "SOH." },
            { question: "In right triangle, the longest side is:", options: ["Hypotenuse", "Base", "Perpendicular", "None"], correct: 0, explanation: "Opposite to 90 degrees." },
            { question: "If $\\sin A = 1$, find $A$.", options: ["$90^\\circ$", "$0^\\circ$", "$45^\\circ$", "None"], correct: 0, explanation: "Maximum value at 90." },
            { question: "Value of $\\tan 45^\\circ$?", options: ["$1$", "$0$", "$\\sqrt{3}$", "None"], correct: 0, explanation: "Opp=Adj at 45." },
            { question: "If $\\cos A = 1/2$, find $\\sec A$.", options: ["$2$", "$1/2$", "$1$", "None"], correct: 0, explanation: "Reciprocal." },
            { question: "Ratio of Adj to Opp is:", options: ["$\\cot A$", "$\\tan A$", "$\\csc A$", "None"], correct: 0, explanation: "Definition of cotangent." },
            { question: "If $\\angle A = 0^\\circ$, find $\\sin A$.", options: ["$0$", "$1$", "Undefined", "None"], correct: 0, explanation: "Starts at 0." }
        ],
        assessment: [
            { question: "Given $15 \\cot A = 8$, find $\\sin A$.", options: ["$15/17$", "$8/17$", "$17/5$", "$1$"], correct: 0, explanation: "Standard NCERT value: 8-15-17 triplet." },
            { question: "If $5 \\sin A = 12$, find $\\cos A$. Is this possible?", options: ["No, $\\sin$ cannot be $> 1$", "Yes, $4/13$", "Yes, $13/5$", "None"], correct: 0, explanation: "Sine must be \\le 1." },
            { question: "Product of $\\tan A$ and $\\cot A$ is always:", options: ["$1$", "Variable", "$0$", "Undefined"], correct: 0, explanation: "They are reciprocals." },
            { question: "In right $\\triangle ABC$, right angled at B, $\\sin A = \\cos C$?", options: ["Always", "Never", "Only if $A=45$", "Only if $A=C$"], correct: 0, explanation: "Angles sum to 90." },
            { question: "If $\\sin A = a/b$, find $\\cos A$.", options: ["\\sqrt{b^2-a^2}/b", "$a/\\sqrt{b^2-a^2}$", "\\sqrt{b^2+a^2}/b", "None"], correct: 0, explanation: "Pyth: Adj^2 = b^2 - a^2." },
            { question: "Value of $\\cos 45^\\circ$?", options: ["$1/\\sqrt{2}$", "$\\sqrt{3}/2$", "$1/2$", "None"], correct: 0, explanation: "From 1-1-root2 triangle." },
            { question: "If $\\tan A = 4/3$, find $(\\sin A + \\cos A) / (\\sin A - \\cos A)$.", options: ["$7$", "$1$", "$1/7$", "None"], correct: 0, explanation: "$(4+3)/(4-3) = 7$." },
            { question: "Reciprocal ratio for $\\sec A$ is:", options: ["$\\cos A$", "$\\sin A$", "$\\csc A$", "None"], correct: 0, explanation: "CAH reciprocal." },
            { question: "Can $\\tan A$ be infinite?", options: ["Yes, at $90^\\circ$", "No", "Only if sides are 0", "None"], correct: 0, explanation: "Denominator (cos) becomes 0." },
            { question: "If $\\sin^2 A = 0$, then $\\cos A$ must be:", options: ["$1$ or $-1$", "$0$", "$0.5$", "None"], correct: 0, explanation: "From Identity 1." }
        ]
    },
    {
        id: 'triangle_sides', title: 'Finding Ratios from Triangle Sides', subtitle: 'Pythagoras 2.0', icon: '📐', color: '#8b5cf6',
        desc: 'Learn how to find all six trigonometric ratios when you only know two sides of a triangle.',
        learn: {
            concept: 'If you know any TWO sides of a right-angled triangle, you can find the THIRD side using Pythagoras, and then find all SIX trigonometric ratios.',
            rules: [
                { title: 'The Pythagoras Bridge', f: 'a^2 + b^2 = c^2', d: 'Use the theorem to find the missing side (Hypotenuse, Perpendicular, or Base).', ex: 'If Prep=3, Base=4, then Hyp=5.', tip: 'Triplets like (3,4,5) and (8,15,17) save a lot of time!' },
                { title: 'Choosing the Side', f: '\\text{Identity of } \\theta', d: 'The "Opposite" side is always the one across from the angle you are looking at.', ex: 'In triangle ABC right at B, side BC is opposite to angle A.', tip: 'Always label your sides (Opp, Adj, Hyp) before calculating.' },
                { title: 'Ratio Construction', f: '\\text{SOH-CAH-TOA}', d: 'After finding all sides, simply place them in the correct fraction format.', ex: 'Sine = Opp/Hyp, Cosine = Adj/Hyp.', tip: 'Simplify your fractions to the lowest terms.' }
            ]
        },
        practice: [
            { question: "In \\triangle ABC, right-angled at B, AB = $24$ cm, BC = $7$ cm. Find \\sin A.", options: ["$7/25$", "$24/25$", "$7/24$", "None"], correct: 0, explanation: "Hypotenuse = \\sqrt{24^2 + 7^2} = 25. \\sin A = BC/AC = 7/25." },
            { question: "In \\triangle ABC, right-angled at B, AB = $24$ cm, BC = $7$ cm. Find \\cos A.", options: ["$24/25$", "$7/25$", "$24/7$", "None"], correct: 0, explanation: "\\cos A = AB/AC = 24/25." },
            { question: "In \\triangle PQR, right-angled at Q, PQ = $3$ cm, QR = $4$ cm. Find \\tan P.", options: ["$4/3$", "$3/4$", "$3/5$", "None"], correct: 0, explanation: "\\tan P = QR/PQ = 4/3." },
            { question: "If \\sin A = 3/4, find \\cos A.", options: ["\\sqrt{7}/4", "$3/\\sqrt{7}$", "$1/4$", "None"], correct: 0, explanation: "Opp=3, Hyp=4 \\rightarrow Base = \\sqrt{4^2 - 3^2} = \\sqrt{7}." },
            { question: "Given $15 \\cot A = 8$, find \\sec A.", options: ["$17/8$", "$8/17$", "$15/17$", "None"], correct: 0, explanation: "cot A = 8/15 \\rightarrow Base=8, Opp=15. Hyp=17. \\sec A = 17/8." },
            { question: "In right \\triangle ABC, if \\tan A = 4/3, find AC if AB = 6 cm.", options: ["$10$ cm", "$8$ m", "$5$ cm", "None"], correct: 0, explanation: "Ratio 4:3. If Adj=6 (3x2), then Opp=8 (4x2). Hyp = \\sqrt{8^2+6^2} = 10." },
            { question: "If \\cos A = 12/13, find \\tan A.", options: ["$5/12$", "$12/5$", "$5/13$", "None"], correct: 0, explanation: "Opp = \\sqrt{13^2 - 12^2} = 5." },
            { question: "In \\triangle OPQ, right-angled at P, OP = $7$ cm and OQ - PQ = $1$ cm. Find \\sin Q.", options: ["$7/25$", "$24/25$", "$1$", "None"], correct: 0, explanation: "Using 7^2 + PQ^2 = (1+PQ)^2 \\rightarrow 49 = 1 + 2PQ \\rightarrow PQ=24, OQ=25." },
            { question: "If \\sin A = 1/2, find \\cot A.", options: ["\\sqrt{3}", "$1/\\sqrt{3}$", "$1$", "None"], correct: 0, explanation: "Base = \\sqrt{2^2 - 1^2} = \\sqrt{3}." },
            { question: "Find all ratios for \\angle A if Opp=5, Adj=12.", options: ["sin A = 5/13, cos A = 12/13, tan A = 5/12", "sin A = 12/13, cos A = 5/13", "None"], correct: 0, explanation: "Hyp=13." },
            { question: "In \\triangle ABC, \\angle A=90, BC=5, AC=4. Find \\sin B.", options: ["$4/5$", "$3/5$", "$3/4$", "None"], correct: 0, explanation: "Side AC is opposite to angle B." },
            { question: "In right \\triangle ABC, if \\cot A = 1, find 2\\sin A \\cos A.", options: ["$1$", "$0$", "$0.5$", "None"], correct: 0, explanation: "2(1/\\sqrt{2})(1/\\sqrt{2}) = 1." },
            { question: "If \\sin A = 1/\\sqrt{2}, find \\tan A.", options: ["$1$", "\\sqrt{2}", "$0.5$", "None"], correct: 0, explanation: "Opp=1, Hyp=root2 \\rightarrow Base=1." },
            { question: "If \\cos A = 0.6, find \\tan A.", options: ["$0.75$", "$0.8$", "$1.33$", "None"], correct: 0, explanation: "6/10 = 3/5 \\rightarrow Opp=4. 0.8 / 0.6 = 4/3." },
            { question: "In a triangle, if a=3, b=4, c=5, which angle is 90^\\circ?", options: ["Angle opposite to 5", "Angle opposite to 3", "Angle opposite to 4", "None"], correct: 0, explanation: "Hypotenuse is the longest side." },
            { question: "Find \\csc A if \\sin A = 0.2.", options: ["$5$", "$2$", "$0.5$", "None"], correct: 0, explanation: "1 / 0.2 = 5." },
            { question: "If \\sec A = 25/7, find \\tan A.", options: ["$24/7$", "$7/24$", "$24/25$", "None"], correct: 0, explanation: "Opp = 24 using triplet 7-24-25." },
            { question: "If \\tan A = 8/15, find \\cos A.", options: ["$15/17$", "$8/17$", "$17/15$", "None"], correct: 0, explanation: "Adj/Hyp = 15/17." },
            { question: "In right \\triangle, if Base=Opp, what is \\sin \\theta?", options: ["$1/\\sqrt{2}$", "$1$", "$1/2$", "None"], correct: 0, explanation: "Isosceles right triangle." },
            { question: "What is \\sin A if BC = 5, AC = 13 in \\triangle ABC right at B?", options: ["$5/13$", "$12/13$", "$5/12$", "None"], correct: 0, explanation: "BC is opposite to A." }
        ],
        assessment: [
            { question: "In right \\triangle ABC, right angled at C, if \\tan A = 1/\\sqrt{3}, find \\sin A \\cos B + \\cos A \\sin B.", options: ["$1$", "$0$", "$1/2$", "None"], correct: 0, explanation: "Calculated as \\sin(A+B) = \\sin 90 = 1." },
            { question: "If \\sin \\theta = (a^2 - b^2) / (a^2 + b^2), find \\cos \\theta.", options: ["$2ab / (a^2 + b^2)$", "$2ab / (a^2 - b^2)$", "$ab / (a^2 + b^2)$", "None"], correct: 0, explanation: "Using Pythagoras theorem: Adj = \\sqrt{(a^2+b^2)^2 - (a^2-b^2)^2} = 2ab." },
            { question: "If \\cos A = 4/5, verify if (1-\\tan^2 A)/(1+\\tan^2 A) = \\cos^2 A - \\sin^2 A.", options: ["True", "False"], correct: 0, explanation: "Both sides equal 7/25." },
            { question: "In \\triangle PQR, right-angled at Q, PR + QR = 25 cm and PQ = 5 cm. Find \\sin P.", options: ["$12/13$", "$5/13$", "$12/5$", "None"], correct: 0, explanation: "Using 5^2 + QR^2 = (25-QR)^2 \\rightarrow QR=12, PR=13." },
            { question: "If \\cot \\theta = 7/8, find (1+\\sin \\theta)(1-\\sin \\theta) / (1+\\cos \\theta)(1-\\cos \\theta).", options: ["$49/64$", "$64/49$", "$1$", "None"], correct: 0, explanation: "Simplifies to \\cot^2 \\theta = (7/8)^2." },
            { question: "If 3 \\cot A = 4, check if (1-\\tan^2 A)/(1+\\tan^2 A) = 7/25.", options: ["Yes", "No"], correct: 0, explanation: "Substitution of \\tan A = 3/4 gives 7/25." },
            { question: "In triangle right angled at B, if AB=1, BC=1, find \\sec A.", options: ["\\sqrt{2}", "$1$", "$2$", "None"], correct: 0, explanation: "Hypotenuse = root 2." },
            { question: "If \\sin A = 1/2, find 3\\cos A - 4\\cos^3 A.", options: ["$0$", "$1$", "$1/2$", "None"], correct: 0, explanation: "A = 30, result is \\cos 90 = 0." },
            { question: "If \\sec \\theta = 13/12, calculate all other ratios. What is \\sin \\theta?", options: ["$5/13$", "$12/13$", "$5/12$", "None"], correct: 0, explanation: "Opp = 5 using Pythagoras." },
            { question: "In \\triangle ABC, \\angle B=90, \\tan A = 1. Find value of 2\\sin A \\cos A.", options: ["$1$", "$0$", "$0.5$", "None"], correct: 0, explanation: "Result is 1." }
        ]
    },
    {
        id: 'standard_angles', title: 'Trigonometric Ratios of Standard Angles', subtitle: 'The Famous Table', icon: '🔢', color: '#0ea5e9',
        desc: 'Memorize and understand the values of ratios for $0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ,$ and $90^\\circ$.',
        learn: {
            concept: 'Standard angles are the "magic numbers" of trigonometry. Instead of using a calculator, we use exact square root values for these five specific angles.',
            rules: [
                { title: 'The 45-Degree Shortcut', f: '1, 1, \\sqrt{2}', d: 'In a 45-45-90 triangle, the legs are equal. Thus sin and cos are both $1/\\sqrt{2}$ and tan is 1.', ex: '$\\sin 45^\\circ = \\cos 45^\\circ = 1/\\sqrt{2}$', tip: 'The denominator is always $\\sqrt{2}$ for 45 degrees.' },
                { title: 'The 30/60 Triangle', f: '1, \\sqrt{3}, 2', d: 'In a 30-60-90 triangle, the hypotenuse is twice the shortest side.', ex: '$\\sin 30^\\circ$ is exactly 0.5.', tip: '$\\sin 30^\\circ = \\cos 60^\\circ = 1/2$.' },
                { title: 'The Sine Climb', f: '0 \\rightarrow 1', d: 'As the angle grows from 0 to 90, the Sine value "climbs" from 0 up to 1.', ex: '0, 1/2, 1/\\sqrt{2}, \\sqrt{3}/2, 1', tip: 'Sequence: $\\sqrt{0}/2, \\sqrt{1}/2, \\sqrt{2}/2, \\sqrt{3}/2, \\sqrt{4}/2$.' }
            ]
        },
        practice: [
            { question: "Value of $\\sin 45^\\circ$ is?", options: ["$1/\\sqrt{2}$", "$\\sqrt{3}/2$", "$1/2$", "$1$"], correct: 0, explanation: "Standard value." },
            { question: "Value of $\\cos 60^\\circ$ is?", options: ["$1/2$", "$\\sqrt{3}/2$", "$1$", "$0$"], correct: 0, explanation: "Standard value." },
            { question: "Value of $\\tan 30^\\circ$ is?", options: ["$1/\\sqrt{3}$", "$\\sqrt{3}$", "$1$", "$0$"], correct: 0, explanation: "Standard value." },
            { question: "What is $\\sin 90^\\circ + \\cos 90^\\circ$?", options: ["$1$", "$0$", "$2$", "$-1$"], correct: 0, explanation: "$1 + 0 = 1$." },
            { question: "If $\\tan A = 1$, then $A$ is?", options: ["$45^\\circ$", "$30^\\circ$", "$60^\\circ$", "$90^\\circ$"], correct: 0, explanation: "$\\tan 45^\\circ = 1$." },
            { question: "Value of $\\cos 0^\\circ$ is?", options: ["$1$", "$0$", "$1/2$", "Undefined"], correct: 0, explanation: "Max value of cosine at start." },
            { question: "Which is undefined?", options: ["$\\tan 90^\\circ$", "$\\cos 90^\\circ$", "$\\sin 0^\\circ$", "$\\cot 90^\\circ$"], correct: 0, explanation: "$\\tan 90^\\circ = 1/0$." },
            { question: "Value of $\\sin 30^\\circ \\cdot \\cos 60^\\circ$?", options: ["$1/4$", "$1/2$", "$1/\\sqrt{2}$", "$1$"], correct: 0, explanation: "$(1/2) \\cdot (1/2) = 1/4$." },
            { question: "As angle increases from $0$ to $90$, $\\cos \\theta$?", options: ["Decreases", "Increases", "Stays same", "Undefined"], correct: 0, explanation: "Slides from 1 to 0." },
            { question: "Value of $\\csc 30^\\circ$?", options: ["$2$", "$\\sqrt{2}$", "$2/\\sqrt{3}$", "$1$"], correct: 0, explanation: "1/\\sin 30^\\circ = 2." },
            { question: "Value of $\\sec 45^\\circ$?", options: ["$\\sqrt{2}$", "$2$", "$1$", "$0$"], correct: 0, explanation: "1/\\cos 45^\\circ = \\sqrt{2}$." },
            { question: "Value of $\\sin 60^\\circ + \\cos 30^\\circ$?", options: ["$\\sqrt{3}$", "$1$", "$2$", "$1/2$"], correct: 0, explanation: "$\\sqrt{3}/2 + \\sqrt{3}/2 = \\sqrt{3}$." },
            { question: "Value of $\\tan 45^\\circ \\cdot \\cot 45^\\circ$?", options: ["$1$", "$0$", "$\\sqrt{2}$", "$2$"], correct: 0, explanation: "$1 \\cdot 1 = 1$." },
            { question: "Is $\\sin 60^\\circ = \\cos 30^\\circ$?", options: ["Yes", "No", "Only if A=B", "Depends on triangle"], correct: 0, explanation: "Both equal $\\sqrt{3}/2$." },
            { question: "Value of $\\cos 45^\\circ$ is?", options: ["$1/\\sqrt{2}$", "$0.707$", "Both A and B", "None"], correct: 2, explanation: "Approx value." },
            { question: "If $\\sin A = \\cos A$, what is $A$?", options: ["$45^\\circ$", "$30^\\circ$", "$60^\\circ$", "$90^\\circ$"], correct: 0, explanation: "Only point where they cross." },
            { question: "Value of $\\tan 0^\\circ$?", options: ["$0$", "$1$", "Undefined", "$\\infty$"], correct: 0, explanation: "0/1 = 0." },
            { question: "Value of $\\csc 90^\\circ$?", options: ["$1$", "$0$", "Undefined", "$-1$"], correct: 0, explanation: "1/\\sin 90^\\circ = 1/1 = 1." },
            { question: "Value of $\\sec 0^\\circ$?", options: ["$1$", "$0$", "Undefined", "$2$"], correct: 0, explanation: "1/\\cos 0^\\circ = 1/1 = 1." },
            { question: "Value of $\\cot 45^\\circ$ is?", options: ["$1$", "$0$", "Undefined", "None"], correct: 0, explanation: "Reciprocal of \\tan 45^\\circ." }
        ],
        assessment: [
            { question: "Evaluate: $\\sin^2 45^\\circ + \\cos^2 45^\\circ$ is?", options: ["$1$", "$0.5$", "$2$", "$0$"], correct: 0, explanation: "Identity 1." },
            { question: "Value of $(1-\\tan^2 45^\\circ)/(1+\\tan^2 45^\\circ)$?", options: ["$0$", "$1$", "$\\sin 45^\\circ$", "$\\cos 90^\\circ$"], correct: 3, explanation: "$(1-1)/(1+1) = 0$. $\\cos 90^\\circ = 0$." },
            { question: "Which is greater: $\\sin 30^\\circ$ or $\\cos 30^\\circ$?", options: ["$\\cos 30^\\circ$", "$\\sin 30^\\circ$", "They are equal", "Cannot compare"], correct: 0, explanation: "$\\sqrt{3}/2 > 1/2$." },
            { question: "Find $A$ if $2\\sin A = 1$.", options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$0^\\circ$"], correct: 0, explanation: "$\\sin A = 1/2$." },
            { question: "Find $A$ if $\\sqrt{3}\\tan A = 1$.", options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"], correct: 0, explanation: "$\\tan A = 1/\\sqrt{3}$." },
            { question: "Value of $\\sec^2 45^\\circ - 1$?", options: ["$1$", "$0$", "$2$", "$4$"], correct: 0, explanation: "$\\sec^2 45^\\circ = 2$." },
            { question: "Value of $\\sin 60^\\circ \\cos 30^\\circ + \\cos 60^\\circ \\sin 30^\\circ$?", options: ["$1$", "$0.5$", "$0$", "None"], correct: 0, explanation: "Formula for \\sin(60+30) = \\sin 90^\\circ = 1$." },
            { question: "Is $\\tan 45^\\circ = \\cot 45^\\circ$?", options: ["Yes", "No", "Only for 45", "None"], correct: 0, explanation: "Both are 1." },
            { question: "Value of $\\csc 30^\\circ$?", options: ["$2$", "$0.5$", "$\\sqrt{2}$", "None"], correct: 0, explanation: "1/\\sin 30^\\circ." },
            { question: "Value of $\\sec 60^\\circ$?", options: ["$2$", "$0.5$", "$\\sqrt{3}$", "None"], correct: 0, explanation: "1/\\cos 60^\\circ." }
        ]
    },
    {
        id: 'evaluating_values', title: 'Evaluating Expressions Using Standard Values', subtitle: 'Plug and Play', icon: '🧮', color: '#f59e0b',
        desc: 'Apply your knowledge of standard angles to solve multi-step trigonometric expressions.',
        learn: {
            concept: 'Standard values are often used in combinations. Evaluating an expression is just like solving an algebraic equation, but you replace trig terms with their numerical values.',
            rules: [
                { title: 'The Substitution Step', f: '\\sin 30^\\circ \\rightarrow 1/2', d: 'Replace every trigonometric term with its corresponding value from the standard table.', ex: 'If you see $\\tan 45^\\circ$, write 1.', tip: 'Use parentheses to avoid sign errors.' },
                { title: 'BODMAS in Trig', f: '\\text{Order of Operations}', d: 'Follow the standard order: Brackets, Orders (Squares), Division, Multiplication, Addition, Subtraction.', ex: 'Square $\\cos 30^\\circ$ before multiplying it by a constant.', tip: 'Squares like $\\sin^2 30^\\circ$ mean $(\\sin 30^\\circ)^2 = (1/2)^2 = 1/4$.' },
                { title: 'Rationalization', f: '1/\\sqrt{A} \\cdot \\sqrt{A}/\\sqrt{A}', d: 'Final answers in trigonometry should not have square roots in the denominator.', ex: '$1/\\sqrt{3}$ becomes $\\sqrt{3}/3$.', tip: 'Multiply top and bottom by the same square root.' }
            ]
        },
        practice: [
            { question: "Evaluate: $2 \\tan^2 45^\\circ + \\cos^2 30^\\circ - \\sin^2 60^\\circ$.", options: ["$2$", "$1$", "$0$", "$2.5$"], correct: 0, explanation: "$2(1)^2 + (\\sqrt{3}/2)^2 - (\\sqrt{3}/2)^2 = 2 + 3/4 - 3/4 = 2$." },
            { question: "Calculate: $\\cos 45^\\circ / (\\sec 30^\\circ + \\csc 30^\\circ)$.", options: ["$(\\sqrt{3}-1)/2\\sqrt{2}$", "$1$", "$\\sqrt{3}/2$", "None"], correct: 0, explanation: "$(1/\\sqrt{2}) / (2/\\sqrt{3} + 2)$. Requires rationalization." },
            { question: "Value of $\\sin 30^\\circ + \\tan 45^\\circ - \\csc 60^\\circ / (\\sec 30^\\circ + \\cos 60^\\circ + \\cot 45^\\circ)$.", options: ["$43-24\\sqrt{3}/11$", "$1$", "$0$", "None"], correct: 0, explanation: "Standard multi-step calculation." },
            { question: "Evaluate: $5 \\cos^2 60^\\circ + 4 \\sec^2 30^\\circ - \\tan^2 45^\\circ / (\\sin^2 30^\\circ + \\cos^2 30^\\circ)$.", options: ["$67/12$", "$5/4$", "$1$", "None"], correct: 0, explanation: "Result is 67/12." },
            { question: "If $\\sin(A-B) = 1/2$ and $\\cos(A+B) = 1/2$, find $A$.", options: ["$45^\\circ$", "$30^\\circ$", "$60^\\circ$", "None"], correct: 0, explanation: "$A-B=30^\\circ, A+B=60^\\circ \\rightarrow 2A=90^\\circ \\rightarrow A=45^\\circ$." },
            { question: "Value of $2 \\tan 30^\\circ / (1 - \\tan^2 30^\\circ)$.", options: ["$\\sqrt{3}$", "$1/\\sqrt{3}$", "$1$", "None"], correct: 0, explanation: "$2(1/\\sqrt{3}) / (1 - 1/3) = (2/\\sqrt{3}) / (2/3) = \\sqrt{3}$." },
            { question: "Calculate: $\\sin 60^\\circ \\cos 30^\\circ + \\sin 30^\\circ \\cos 60^\\circ$.", options: ["$1$", "$0.5$", "$0$", "None"], correct: 0, explanation: "$\\sqrt{3}/2 \\cdot \\sqrt{3}/2 + 1/2 \\cdot 1/2 = 3/4 + 1/4 = 1$." },
            { question: "Evaluate: $\\cos 45^\\circ \\cos 30^\\circ - \\sin 45^\\circ \\sin 30^\\circ$.", options: ["$(\\sqrt{3}-1)/2\\sqrt{2}$", "$1$", "$\\sqrt{2}$", "None"], correct: 0, explanation: "$(1/\\sqrt{2})(\\sqrt{3}/2) - (1/\\sqrt{2})(\\1/2)$." },
            { question: "Value of $\\tan 30^\\circ \\cdot \\tan 60^\\circ$.", options: ["$1$", "$0$", "$\\sqrt{3}$", "None"], correct: 0, explanation: "$1/\\sqrt{3} \\cdot \\sqrt{3} = 1$." },
            { question: "If $2 \\tan A / (1 + \\tan^2 A) = \\sin 2A$, find $\\sin 60^\\circ$.", options: ["$\\sqrt{3}/2$", "$1/2$", "$1$", "None"], correct: 0, explanation: "Formula check." },
            { question: "Evaluate: $\\sin^2 30^\\circ + \\cos^2 30^\\circ$.", options: ["$1$", "$0$", "$2$", "None"], correct: 0, explanation: "Identity check with 30." },
            { question: "Evaluate: $\\tan 45^\\circ / \\cot 45^\\circ$.", options: ["$1$", "$0$", "Undefined", "None"], correct: 0, explanation: "$1/1 = 1$." },
            { question: "Value of $\\cos^2 30^\\circ - \\sin^2 30^\\circ$ is?", options: ["$1/2$", "$\\sqrt{3}/2$", "$1$", "$0$"], correct: 0, explanation: "$3/4 - 1/4 = 2/4 = 1/2$." },
            { question: "Evaluate: $4 \\sin^2 60^\\circ + 3 \\tan^2 30^\\circ - 8 \\sin 45^\\circ \\cos 45^\\circ$.", options: ["$0$", "$1$", "$2$", "None"], correct: 0, explanation: "$3 + 1 - 4 = 0$." },
            { question: "Find $A$ if $\\tan 2A = \\tan 60^\\circ$.", options: ["$30^\\circ$", "$60^\\circ$", "$15^\\circ$", "None"], correct: 0, explanation: "$2A=60^\\circ$." },
            { question: "Value of $\\sec 60^\\circ / \\csc 30^\\circ$.", options: ["$1$", "$2$", "$0.5$", "None"], correct: 0, explanation: "$2/2 = 1$." },
            { question: "Evaluate: $\\sin 30^\\circ \\cdot \\cos 45^\\circ \\cdot \\tan 60^\\circ$.", options: ["$\\sqrt{6}/4$", "$\\\\sqrt{3}/2\\\\sqrt{2}$", "$1$", "None"], correct: 0, explanation: "$1/2 \\cdot 1/\\sqrt{2} \\cdot \\sqrt{3} = \\sqrt{3}/2\\sqrt{2}$." },
            { question: "Is $\\sin^2 45^\\circ = 2 \\sin^2 30^\\circ$?", options: ["Yes", "No"], correct: 0, explanation: "$1/2 = 2(1/4) = 1/2$. Yes." },
            { question: "Value of $1 - 2\\sin^2 30^\\circ$.", options: ["$1/2$", "$0$", "$1$", "None"], correct: 0, explanation: "$1 - 2(1/4) = 0.5$." },
            { question: "Evaluate: $(\\tan 60^\\circ - \\tan 30^\\circ) / (1 + \\tan 60^\\circ \\tan 30^\\circ)$.", options: ["$1/\\sqrt{3}$", "$\\sqrt{3}$", "$1$", "None"], correct: 0, explanation: "$(\\sqrt{3}-1/\\sqrt{3}) / (1+1) = (2/\\sqrt{3})/2 = 1/\\sqrt{3}$." }
        ],
        assessment: [
            { question: "Evaluate: $(5 \\cos^2 60^\\circ + 4 \\sec^2 30^\\circ - \\tan^2 45^\\circ) / (\\sin^2 30^\\circ + \\cos^2 30^\\circ)$", options: ["$67/12$", "$5/4$", "$1$", "$0$"], correct: 0, explanation: "Numerator is 67/12. Denominator is 1." },
            { question: "Find $x$: $\\tan 3x = \\sin 45^\\circ \\cos 45^\\circ + \\sin 30^\\circ$.", options: ["$15^\\circ$", "$30^\\circ$", "$45^\\circ$", "None"], correct: 0, explanation: "$\\tan 3x = 1/2 + 1/2 = 1 \\rightarrow 3x=45^\\circ \\rightarrow x=15^\\circ$." },
            { question: "Find $A$: $\\sin 2A = 2 \\sin A \\cos A$. Is this true for $A=30^\\circ$?", options: ["Yes", "No"], correct: 0, explanation: "Identity true for all A." },
            { question: "Value of $x$: $x \\sin 30^\\circ \\cos^2 45^\\circ = \\tan^2 30^\\circ \\sin 90^\\circ$.", options: ["$4/3$", "$3/4$", "$1$", "None"], correct: 0, explanation: "$x(1/2)(1/2) = (1/3)(1) \\rightarrow x/4 = 1/3 \\rightarrow x=4/3$." },
            { question: "If $\\tan(A+B) = \\sqrt{3}$ and $\\tan(A-B) = 1/\\sqrt{3}$, find $B$.", options: ["$15^\\circ$", "$45^\\circ$", "$30^\\circ$", "None"], correct: 0, explanation: "$A+B=60, A-B=30 \\rightarrow 2B=30 \\rightarrow B=15^\\circ$." },
            { question: "Evaluate: $\\sin 60^\\circ / \\cos^2 45^\\circ - \\cot 30^\\circ$.", options: ["$0$", "$\\sqrt{3}$", "$1$", "None"], correct: 0, explanation: "$(\\sqrt{3}/2)/(1/2) - \\sqrt{3} = 0$." },
            { question: "Value of $\\csc 30^\\circ + \\sec 60^\\circ - \\tan^2 45^\\circ$.", options: ["$3$", "$1$", "$0$", "None"], correct: 0, explanation: "$2 + 2 - 1 = 3$." },
            { question: "Evaluate: $4 \\cos^3 30^\\circ - 3 \\cos 30^\\circ$.", options: ["$0$", "$1$", "$\\sqrt{3}/2$", "None"], correct: 0, explanation: "\\cos 90^\\circ = 0." },
            { question: "Is $2 \\tan 30^\\circ / (1 + \\tan^2 30^\\circ) = \\sin 60^\\circ$?", options: ["Yes", "No"], correct: 0, explanation: "$(2/\\sqrt{3}) / (4/3) = \\sqrt{3}/2$." },
            { question: "Evaluate: $\\sqrt{3} \\tan 2\\theta = 3$, find $\\theta$.", options: ["$30^\\circ$", "$60^\\circ$", "$15^\\circ$", "None"], correct: 0, explanation: "$\\tan 2\\theta = \\sqrt{3} \\rightarrow 2\\theta = 60^\\circ \\rightarrow \\theta = 30^\\circ$." }
        ]
    },
    {
        id: 'identities', title: 'Trigonometric Identities', subtitle: 'The Core Equations', icon: '🔗', color: '#c026d3',
        desc: 'Learn and derive the three fundamental identities that link the squared ratios.',
        learn: {
            concept: 'Identities are equations that are TRUE for every single angle. They allow us to transform one trigonometric expression into another.',
            rules: [
                { title: 'Identity #1', f: '\\sin^2 A + \\cos^2 A = 1', d: 'The most fundamental identity derived from Pythagoras.', ex: 'If \\sin A = 0.6, then \\cos^2 A = 1 - 0.36 = 0.64.', tip: 'Always look for squares of sin and cos added together.' },
                { title: 'Identity #2', f: '1 + \\tan^2 A = \\sec^2 A', d: 'Connects the Tangent and Secant functions.', ex: 'Solve for \\tan A if \\sec A=2.', tip: 'Rearrange to \\sec^2 A - \\tan^2 A = 1.' },
                { title: 'Identity #3', f: '1 + \\cot^2 A = \\csc^2 A', d: 'Connects Cotangent and Cosecant functions.', ex: '\\csc^2 A - \\cot^2 A = 1.', tip: 'If you see cot and cosec, use this one.' }
            ]
        },
        practice: [
            { question: "Which is a correct identity?", options: ["$\\sin^2 A + \\cos^2 A = 1$", "$\\sin A + \\cos A = 1$", "$\\sin^2 A - \\cos^2 A = 1$", "$\\sin^2 A + \\cos A = 1$"], correct: 0, explanation: "Pythagorean fundamental identity." },
            { question: "What does $1 + \\tan^2 A$ equal?", options: ["$\\sec^2 A$", "$\\cos^2 A$", "$\\sin^2 A$", "$\\cot^2 A$"], correct: 0, explanation: "Standard identity." },
            { question: "What does $1 + \\cot^2 A$ equal?", options: ["$\\csc^2 A$", "$\\sec^2 A$", "$\\tan^2 A$", "$1$"], correct: 0, explanation: "Standard identity." },
            { question: "Value of $\\sec^2 A - \\tan^2 A$ is:", options: ["$1$", "$0$", "$-1$", "None"], correct: 0, explanation: "From $1 + \\tan^2 A = \\sec^2 A$." },
            { question: "Value of $\\csc^2 A - \\cot^2 A$ is:", options: ["$1$", "$0$", "$\\sin A$", "None"], correct: 0, explanation: "From $1 + \\cot^2 A = \\csc^2 A$." },
            { question: "$\\sin^2 30^\\circ + \\cos^2 30^\\circ = $?", options: ["$1$", "$0$", "$1/2$", "$\\sqrt{3}/2$"], correct: 0, explanation: "Identity 1 works for any angle." },
            { question: "If $\\cos A = 4/5$, find $\\sin^2 A$.", options: ["$9/25$", "$16/25$", "$3/5$", "$1$"], correct: 0, explanation: "$\\sin^2 A = 1 - 16/25 = 9/25$." },
            { question: "Is $1 + \\sin^2 A = \\cos^2 A$ a valid identity?", options: ["No", "Yes", "Only for 45", "Only for 0"], correct: 0, explanation: "Correct is \\sin^2 A + \\cos^2 A = 1." },
            { question: "Express $\\cos A$ in terms of $\\sin A$.", options: ["$\\sqrt{1 - \\sin^2 A}$", "$1 - \\sin A$", "$\\sin A / \\tan A$", "None"], correct: 0, explanation: "From \\sin^2 A + \\cos^2 A = 1." },
            { question: "Value of $(\\sec^2 \\theta - 1) \\cot^2 \\theta$?", options: ["$1$", "$0$", "$\\tan^2 \\theta$", "$\\sec^2 \\theta$"], correct: 0, explanation: "$\\tan^2 \\theta \\cdot \\cot^2 \\theta = 1$." },
            { question: "Value of $\\cos^2 A (1 + \\tan^2 A)$?", options: ["$1$", "$0$", "$\\cos^2 A$", "$\\sin^2 A$"], correct: 0, explanation: "$\\cos^2 A \\cdot \\sec^2 A = 1$." },
            { question: "Value of $(1 - \\sin^2 A) \\sec^2 A$?", options: ["$1$", "$0$", "$\\cos^2 A$", "$\\sin^2 A$"], correct: 0, explanation: "$\\cos^2 A \\cdot \\sec^2 A = 1$." },
            { question: "Value of $\\sin^2 \\theta + 1/(1 + \\tan^2 \\theta)$?", options: ["$1$", "$0$", "$\\sin^2 \\theta$", "None"], correct: 0, explanation: "$\\sin^2 \\theta + \\cos^2 \\theta = 1$." },
            { question: "Evaluate: $9 \\sec^2 A - 9 \\tan^2 A$", options: ["$9$", "$1$", "$0$", "$18$"], correct: 0, explanation: "$9(1) = 9$." },
            { question: "Value of $(1+\\tan^2 A)/(1+\\cot^2 A)$ is:", options: ["$\\tan^2 A$", "$\\cot^2 A$", "$\\sec^2 A$", "$1$"], correct: 0, explanation: "$\\sec^2 A / \\csc^2 A = \\tan^2 A$." },
            { question: "Evaluate: $(\\csc^2 A - 1) \\sin^2 A$", options: ["$\\cos^2 A$", "$\\sin^2 A$", "$1$", "$0$"], correct: 0, explanation: "$\\cot^2 A \\cdot \\sin^2 A = \\cos^2 A$." },
            { question: "If $\\tan A = \\cot B$, then $A+B = $?", options: ["$90^\\circ$", "$180^\\circ$", "$45^\\circ$", "$0^\\circ$"], correct: 0, explanation: "Complementary angles." },
            { question: "Value of $\\sec A (1 - \\sin A) (\\sec A + \\tan A)$ is:", options: ["$1$", "$0$", "$2$", "None"], correct: 0, explanation: "Standard result." },
            { question: "Is it true that $\\sin^4 A - \\cos^4 A = \\sin^2 A - \\cos^2 A$?", options: ["True", "False"], correct: 0, explanation: "$(sin^2-cos^2)(sin^2+cos^2) = sin^2-cos^2$." },
            { question: "What is $(\\sec^2 A - 1) / (\\csc^2 A - 1)$?", options: ["$\\tan^2 A$", "$\\cot^2 A$", "$\\tan^4 A$", "None"], correct: 2, explanation: "$\\tan^2 A / \\cot^2 A = \\tan^4 A$." }
        ],
        assessment: [
            { question: "Prove: $(\\sin A + \\csc A)^2 + (\\cos A + \\sec A)^2 = 7 + \\tan^2 A + \\cot^2 A$ holds.", options: ["True", "False", "Only for 45", "None"], correct: 0, explanation: "Using Identities." },
            { question: "Value of $\\sin A / (1+\\cos A) + (1+\\cos A) / \\sin A$?", options: ["$2\\csc A$", "$2\\sin A$", "$1$", "$0$"], correct: 0, explanation: "Simplifies to $2/\\sin A$." },
            { question: "If $x = a\\cos \\theta, y = b\\sin \\theta$, then $x^2/a^2 + y^2/b^2$ is:", options: ["$1$", "$0$", "$a^2+b^2$", "None"], correct: 0, explanation: "$\\cos^2 \\theta + \\sin^2 \\theta = 1$." },
            { question: "Evaluate: $(\\sec A + \\tan A)(1 - \\sin A)$", options: ["$\\cos A$", "$\\sin A$", "$\\sec A$", "$1$"], correct: 0, explanation: "LHS = \\cos A." },
            { question: "If $A=30^\\circ$, check $\\sin^2 A + \\cos^2 A$.", options: ["$1$", "$0.5$", "$0.75$", "$2$"], correct: 0, explanation: "Always 1." },
            { question: "Value of $(1-\\cos^2 A)\\csc^2 A$:", options: ["$1$", "$0$", "$\\sin A$", "None"], correct: 0, explanation: "\\sin^2 A \\cdot \\csc^2 A = 1." },
            { question: "If $\\sin \\theta + \\sin^2 \\theta = 1$, then $\\cos^2 \\theta + \\cos^4 \\theta = $?", options: ["$1$", "$0$", "$2$", "None"], correct: 0, explanation: "Results in 1." },
            { question: "Value of $\\tan^2 A - \\sec^2 A$?", options: ["$-1$", "$1$", "$0$", "None"], correct: 0, explanation: "From $1+\\tan^2=\\sec^2$." },
            { question: "If $\\sec A + \\tan A = p$, then $\\sec A - \\tan A = $?", options: ["$1/p$", "$p$", "$-p$", "None"], correct: 0, explanation: "Product is 1." },
            { question: "Expression $1 - (\\sin^2 A / (1+\\cos A))$ simplifies to:", options: ["$\\cos A$", "$\\sin A$", "$1$", "$0$"], correct: 0, explanation: "Simplifies to \\cos A." }
        ]
    },
    {
        id: 'simplify_prove', title: 'Using Identities to Simplify or Prove', subtitle: 'Algebra meets Trig', icon: '📝', color: '#f43f5e',
        desc: 'Master the techniques to simplify complex trigonometric terms into their simplest forms.',
        learn: {
            concept: 'Proving is about showing that two different-looking expressions are exactly the same. Simplifying is about making a messy list of terms look "clean".',
            rules: [
                { title: 'The S-C Strategy', f: '\\text{Convert all to } \\sin/\\cos', d: '90% of identity problems become easier if you replace everything with sine and cosine.', ex: 'Change tan to sin/cos and sec to 1/cos.', tip: 'Use this as your first step if stuck.' },
                { title: 'Algebraic Templates', f: '(a+b)^2, (a-b)(a+b)', d: 'Trig functions follow algebra rules. $1-\\sin^2 A$ is a difference of squares.', ex: '1-\\sin^2 A = (1-\\sin A)(1+\\sin A)$.', tip: 'Look for $(x+y)^2$ patterns with sin and cos.' },
                { title: 'Common Denominators', f: '\\frac{A}{B} + \\frac{C}{D} = \\frac{AD+BC}{BD}', d: 'When adding trig fractions, cross-multiply to combine them into one term.', ex: '1/\\sin A + 1/\\cos A = (\\cos A+\\sin A)/(\\sin A\\cos A).', tip: 'Combining fractions often reveals a hidden identity in the numerator.' }
            ]
        },
        practice: [
            { question: "Simplify: $\\sin A \\cdot \\cot A$.", options: ["$\\cos A$", "$\\sec A$", "$\\sin A$", "None"], correct: 0, explanation: "$\\sin A \\cdot (\\cos A/\\sin A) = \\cos A$." },
            { question: "Simplify: $(1 - \\cos^2 A) \\csc^2 A$.", options: ["$1$", "$0$", "$\\sin^2 A$", "None"], correct: 0, explanation: "$\\sin^2 A \\cdot (1/\\sin^2 A) = 1$." },
            { question: "Simplify: $\\tan^2 A \\cos^2 A$.", options: ["$\\sin^2 A$", "$\\cos^2 A$", "$1$", "None"], correct: 0, explanation: "$(\\sin^2 A/\\cos^2 A) \\cdot \\cos^2 A = \\sin^2 A$." },
            { question: "Simplify: $(1 + \\tan^2 A) \\cos^2 A$.", options: ["$1$", "$\\sin^2 A$", "$\\tan^2 A$", "None"], correct: 0, explanation: "$\\sec^2 A \\cdot \\cos^2 A = 1$." },
            { question: "Simplify: $1/(1+\\sin A) + 1/(1-\\sin A)$.", options: ["$2\\sec^2 A$", "$2\\cos^2 A$", "$1$", "$2$"], correct: 0, explanation: "Combine: $2/(1-\\sin^2 A) = 2/\\cos^2 A = 2\\sec^2 A$." },
            { question: "Simplify: $(\\sec A + \\tan A)(1 - \\sin A)$.", options: ["$\\cos A$", "$\\sin A$", "$1$", "None"], correct: 0, explanation: "Result is $\\cos A$." },
            { question: "Simplify: $\\tan A / \\sec A$.", options: ["$\\sin A$", "$\\cos A$", "$\\csc A$", "$1$"], correct: 0, explanation: "$(\\sin A/\\cos A) / (1/\\cos A) = \\sin A$." },
            { question: "Simplify: $(1 + \\cot^2 A) \\sin^2 A$.", options: ["$1$", "$0$", "$\\cos^2 A$", "None"], correct: 0, explanation: "$\\csc^2 A \\cdot \\sin^2 A = 1$." },
            { question: "Simplify: $\\sec^4 A - \\sec^2 A$ is equal to?", options: ["$\\tan^2 A + \\tan^4 A$", "$\\tan^4 A$", "$\\tan^2 A$", "None"], correct: 0, explanation: "$\\sec^2 A(\\sec^2 A-1) = (1+\\tan^2 A)(\\tan^2 A) = \\tan^2 A + \\tan^4 A$." },
            { question: "Simplify: $\\cos A/(1-\\sin A) - \\cos A/(1+\\sin A)$.", options: ["$2\\tan A$", "$2\\sin A$", "$0$", "None"], correct: 0, explanation: "Combine: $2\\sin A\\cos A/\\cos^2 A = 2\\tan A$." },
            { question: "If $x/a \\cos \\theta + y/b \\sin \\theta = 1$ and $x/a \\sin \\theta - y/b \\cos \\theta = 1$, then $x^2/a^2 + y^2/b^2 = $?", options: ["$2$", "$1$", "$0$", "None"], correct: 0, explanation: "Squaring and adding eliminates cross-terms." },
            { question: "Simplify: $\\cot A - \\tan A$.", options: ["$(\\cos^2 A - \\sin^2 A)/(\\sin A \\cos A)$", "$1$", "$0$", "None"], correct: 0, explanation: "Standard fractional simplification." },
            { question: "Simplify: $(\\sin^3 A + \\cos^3 A)/(\\sin A + \\cos A)$.", options: ["$1 - \\sin A \\cos A$", "$1$", "$0.5$", "None"], correct: 0, explanation: "Use $a^3+b^3$ factor formula." },
            { question: "Simplify: $(1 - \\sin A)(\\sec A + \\tan A)$.", options: ["$\\cos A$", "$\\sin A$", "$1$", "None"], correct: 0, explanation: "Simplification result." },
            { question: "Simplify: $\\sin A/(1+\\cos A)$.", options: ["$(1-\\cos A)/\\sin A$", "$\\tan A$", "$\\cot A$", "None"], correct: 0, explanation: "Multiply by conjugate." },
            { question: "Simplify: $\\sqrt{\\sec^2 A + \\csc^2 A}$.", options: ["$\\tan A + \\cot A$", "$\\sec A + \\csc A$", "$1$", "None"], correct: 0, explanation: "$\\\\sqrt{1/\\cos^2 A + 1/\\sin^2 A} = \\\\sqrt{(\\sin^2 A+\\cos^2 A)/(\\sin^2 A\\cos^2 A)} = 1/(\\sin A \\cos A) = \\tan A + \\cot A$." },
            { question: "Simplify: $\\tan A + \\cot A$.", options: ["$\\sec A \\csc A$", "$1$", "$0$", "None"], correct: 0, explanation: "Combined fractions." },
            { question: "Simplify: $(\\sec A - \\tan A)/(\\sec A + \\tan A)$.", options: ["$(\\sec A - \\tan A)^2$", "$1$", "$-1$", "None"], correct: 0, explanation: "Multiply by $(\\sec A-\\tan A)$." },
            { question: "Simplify: $(\\sin A + \\cos A)^2 - 2\\sin A \\cos A$.", options: ["$1$", "$0$", "$\\tan A$", "None"], correct: 0, explanation: "Identity expansion." },
            { question: "Simplify: $\\sin^4 A + \\cos^4 A$.", options: ["$1 - 2\\sin^2 A \\cos^2 A$", "$1$", "$0$", "None"], correct: 0, explanation: "Algebraic identity application." }
        ],
        assessment: [
            { question: "Simplify: $(\\sin A - 2\\sin^3 A) / (2\\cos^3 A - \\cos A)$", options: ["$\\tan A$", "$\\cot A$", "$1$", "$0$"], correct: 0, explanation: "Numerator: $\\sin A(1-2\\sin^2 A)$. Denominator: $\\cos A(2\\cos^2 A-1)$. Both parentheses equal $\\cos 2A$." },
            { question: "If $\\tan A + \\sin A = m$ and $\\tan A - \\sin A = n$, then $m^2-n^2$ is:", options: ["$4\\sqrt{mn}$", "$mn$", "$4mn$", "None"], correct: 0, explanation: "Expansion and substitution." },
            { question: "Simplify: $\\cos A/(1+\\sin A) + \\tan A$.", options: ["$\\sec A$", "$\\cos A$", "$1$", "$0$"], correct: 0, explanation: "Combine fractions." },
            { question: "Simplify: $(1+\\tan^2 A) / (1+\\cot^2 A)$.", options: ["$\\tan^2 A$", "$\\cot^2 A$", "$1$", "None"], correct: 0, explanation: "$\\sec^2 A / \\csc^2 A = \\tan^2 A$." },
            { question: "Simplify: $(1+\\sec A) / \\sec A$ is equal to:", options: ["$\\sin^2 A / (1-\\cos A)$", "$\\cos A$", "$\\sin^2 A$", "None"], correct: 0, explanation: "RHS simplifies to same." },
            { question: "Simplify: $\\cos A \\cdot \\tan A$.", options: ["$\\sin A$", "$\\cos A$", "$1$", "None"], correct: 0, explanation: "Basic substitution." },
            { question: "Simplify: $(1 + \\cot^2 A)(1 - \\cos^2 A)$.", options: ["$1$", "$0$", "$\\tan^2 A$", "None"], correct: 0, explanation: "$\\csc^2 A \\cdot \\sin^2 A = 1$." },
            { question: "Simplify: $(\\sec^2 A - 1) / \\sec^2 A$.", options: ["$\\sin^2 A$", "$\\cos^2 A$", "$\\tan^2 A$", "$1$"], correct: 0, explanation: "$\\tan^2 A / \\sec^2 A = \\sin^2 A$." },
            { question: "If $\\csc \\theta - \\cot \\theta = 1/4$, then $\\csc \\theta + \\cot \\theta = $?", options: ["$4$", "$1/4$", "$1$", "None"], correct: 0, explanation: "Difference of squares is 1." },
            { question: "Simplify: $(\\tan A + \\sec A - 1) / (\\tan A - \\sec A + 1)$.", options: ["$\\tan A + \\sec A$", "$1$", "$\\sin A$", "None"], correct: 0, explanation: "Standard NCERT identity proof." }
        ]
    },
    {
        id: 'angle_problems', title: 'Angle-Based Problems', subtitle: 'Inverse Reasoning', icon: '🔍', color: '#f43f5e',
        desc: 'Determine unknown side measurements and angles based on known ratios.',
        learn: {
            concept: 'Sometimes we know the ratio (like 0.5) and need to find the angle (like 30°). This is called inverse reasoning.',
            rules: [
                { title: 'Inverse Concept', d: 'Match the ratio to the standard angle table to find the angle.', tip: 'sin(x)=1/2 implies x=30°.', f: '\\sin(A-B)=1/2', ex: 'A-B=30^\\circ' },
                { title: 'Choosing the Side', d: 'In a right triangle, if you know any two sides, you can find any angle.', tip: 'Use the ratio that connects the two known sides.', f: '\\tan \\theta = \\frac{Opp}{Adj}', ex: 'If Opp=Adj, then \\theta = 45^\\circ' }
            ]
        },
        practice: [
            { question: "If $\\sin(A-B) = 1/2$ and $\\cos(A+B) = 1/2$, what is A?", options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"], correct: 1, explanation: "A-B = 30 and A+B = 60. Adding gives 2A = 90 => A = 45°." },
            { question: "For same conditions, what is B?", options: ["$15^\\circ$", "$30^\\circ$", "$45^\\circ$", "$60^\\circ$"], correct: 0, explanation: "A=45, so 45-B=30 => B=15°." },
            { question: "In triangle PQR right angled at Q, PQ=3cm and PR=6cm. Find angle R.", options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"], correct: 0, explanation: "sin R = PQ/PR = 3/6 = 1/2. So R is 30°." },
            { question: "Find angle P in the same triangle.", options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"], correct: 2, explanation: "R=30, angles sum to 180, so P = 180-90-30 = 60°." },
            { question: "If $\\tan A = 1$, then A is:", options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"], correct: 1, explanation: "tan 45 = 1." },
            { question: "If $\\cos A = \\sqrt{3}/2$, find A.", options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$0^\\circ$"], correct: 0, explanation: "Standard table value." },
            { question: "In right triangle, if Opp=Adj, find the acute angle.", options: ["$45^\\circ$", "$30^\\circ$", "$60^\\circ$", "$90^\\circ$"], correct: 0, explanation: "tan A = 1." },
            { question: "If $\\sin A = \\sin 60^\\circ \\cos 30^\\circ - \\cos 60^\\circ \\sin 30^\\circ$, find A.", options: ["$30^\\circ$", "$0^\\circ$", "$45^\\circ$", "$60^\\circ$"], correct: 0, explanation: "LHS = $\\sin(60-30) = \\sin 30^\\circ$." },
            { question: "Find A if $2\\sin 2A = \\sqrt{3}$.", options: ["$30^\\circ$", "$15^\\circ$", "$45^\\circ$", "$60^\\circ$"], correct: 0, explanation: "$\\sin 2A = \\sqrt{3}/2 \\rightarrow 2A = 60^\\circ \\rightarrow A = 30^\\circ$." },
            { question: "In $\\triangle ABC$ right at B, if $AC=10$ and $AB=5$, find $\\angle ACB$.", options: ["$30^\\circ$", "$60^\\circ$", "$45^\\circ$", "$90^\\circ$"], correct: 0, explanation: "$\\sin C = 5/10 = 1/2$." },
            { question: "If $\\tan(A+B) = \\sqrt{3}$ and $A=45^\\circ$, find B.", options: ["$15^\\circ$", "$30^\\circ$", "$45^\\circ$", "$60^\\circ$"], correct: 0, explanation: "$45+B=60 \\rightarrow B=15^\\circ$." },
            { question: "If $\\cos(A-B) = \\sqrt{3}/2$ and $\\sin(A+B) = 1$, find A.", options: ["$60^\\circ$", "$30^\\circ$", "$45^\\circ$", "$15^\\circ$"], correct: 0, explanation: "$A-B=30, A+B=90 \\rightarrow 2A=120 \\rightarrow A=60^\\circ$." },
            { question: "Find B for the previous problem.", options: ["$30^\\circ$", "$45^\\circ$", "$15^\\circ$", "$60^\\circ$"], correct: 0, explanation: "$60+B=90 \\rightarrow B=30^\\circ$." },
            { question: "If $\\tan A = 1/\\sqrt{3}$, find $\\sin A$.", options: ["$1/2$", "$\\sqrt{3}/2$", "$1$", "$0$"], correct: 0, explanation: "A=30, so sin 30 = 1/2." },
            { question: "If $\\sin\\theta = \\cos\\theta$, find $\\tan\\theta$.", options: ["$1$", "$0$", "$\\sqrt{3}$", "None"], correct: 0, explanation: "Angle must be 45." },
            { question: "In right triangle, if Hyp=2*Opp, find the angle.", options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"], correct: 0, explanation: "sin = 1/2." },
            { question: "Find A if $\\tan A = 0$.", options: ["$0^\\circ$", "$90^\\circ$", "$45^\\circ$", "$30^\\circ$"], correct: 0, explanation: "From table." },
            { question: "If $\\cos A = 1$, find A.", options: ["$0^\\circ$", "$90^\\circ$", "$30^\\circ$", "$60^\\circ$"], correct: 0, explanation: "From table." },
            { question: "If $\\sin 2A = 1$, find A.", options: ["$45^\\circ$", "$90^\\circ$", "$30^\\circ$", "None"], correct: 0, explanation: "2A=90." },
            { question: "In right triangle, if Adj = Hyp * $\\sqrt{3}/2$, find the angle.", options: ["$30^\\circ$", "$60^\\circ$", "$45^\\circ$", "None"], correct: 0, explanation: "cos = root3/2." }
        ],
        assessment: [
            { question: "In triangle PQR right angled at Q, PQ=3cm and PR=6cm. Find angle R.", options: ["30°", "45°", "60°", "90°"], correct: 0, explanation: "sin R = PQ/PR = 3/6 = 1/2. So R is 30°." },
            { question: "Find angle P in the same triangle.", options: ["30°", "45°", "60°", "90°"], correct: 2, explanation: "R=30, angles sum to 180, so P = 180-90-30 = 60°." },
            { question: "If tan A = 1, then A is:", options: ["30°", "45°", "60°", "90°"], correct: 1, explanation: "tan 45 = 1." },
            { question: "If $\\sin(A-B)=1/2$ and $\\cos(A+B)=1/2$, find B.", options: ["$15^\\circ$", "$45^\\circ$", "$30^\\circ$", "$60^\\circ$"], correct: 0, explanation: "$A-B=30, A+B=60 \\rightarrow 2B=30 \\rightarrow B=15$." },
            { question: "Find value of $\\theta$ if $2\\cos 3\\theta = 1$.", options: ["$20^\\circ$", "$30^\\circ$", "$10^\\circ$", "$60^\\circ$"], correct: 0, explanation: "$\\cos 3\\theta = 1/2 \\rightarrow 3\\theta=60 \\rightarrow \\theta=20$." },
            { question: "If $\\tan(A+B)=\\sqrt{3}$ and $\\tan(A-B)=0$, find A and B.", options: ["$30, 30$", "$45, 15$", "$60, 0$", "None"], correct: 0, explanation: "$A+B=60, A-B=0 \\rightarrow A=30, B=30$." },
            { question: "In right triangle, if Hypotenuse is twice the side QR, find $\\angle QPR$.", options: ["$30^\\circ$", "$60^\\circ$", "$45^\\circ$", "None"], correct: 0, explanation: "sin = 1/2." },
            { question: "If $\\sin A = \\cos A$, what is $\\tan A$?", options: ["$1$", "$0$", "$\\sqrt{3}$", "None"], correct: 0, explanation: "sin/cos = 1." },
            { question: "Find max value of $A$ for $\\sin A < 1/2$ for acute angles.", options: ["$29^\\circ$", "$31^\\circ$", "$60^\\circ$", "$90^\\circ$"], correct: 0, explanation: "sin 30 = 0.5." },
            { question: "If $\\cos 2A = 0$, find A.", options: ["$45^\\circ$", "$90^\\circ$", "$22.5^\\circ$", "None"], correct: 0, explanation: "2A=90." }
        ]
    }
];
