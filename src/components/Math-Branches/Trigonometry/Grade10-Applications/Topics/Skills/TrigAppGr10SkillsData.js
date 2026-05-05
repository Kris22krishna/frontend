function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ── SKILL 1: Heights and Distances ───────────────────────────────────────────
export function genSkill1Practice() {
    const questions = [
        {
            id: 0,
            question: 'A tower stands vertically on the ground. From a point on the ground, which is $15$ m away from the foot of the tower, the angle of elevation of the top of the tower is found to be $60°$. Find the height of the tower.',
            options: ['$15\\sqrt{3}$ m', '$15$ m', '$\\frac{15}{\\sqrt{3}}$ m', '$30$ m'],
            answer: 0,
            solution: 'Let height be $h$. In the right triangle, $\\tan 60° = \\frac{h}{15}$. So $h = 15\\tan 60° = 15\\sqrt{3}$ m.'
        },
        {
            id: 1,
            question: 'An electrician has to repair an electric fault on a pole of height $5$ m. She needs to reach a point $1.3$ m below the top of the pole to undertake the repair work. What should be the length of the ladder that she should use which, when inclined at an angle of $60°$ to the horizontal, would enable her to reach the required position?',
            options: ['$\\frac{7.4}{\\sqrt{3}}$ m', '$3.7\\sqrt{3}$ m', '$7.4$ m', '$\\frac{3.7}{\\sqrt{3}}$ m'],
            answer: 0,
            solution: 'Height to reach = $5 - 1.3 = 3.7$ m. $\\sin 60° = \\frac{3.7}{L}$. $L = \\frac{3.7}{\\sqrt{3}/2} = \\frac{7.4}{\\sqrt{3}}$ m.'
        },
        {
            id: 2,
            question: 'An observer $1.5$ m tall is $28.5$ m away from a chimney. The angle of elevation of the top of the chimney from her eyes is $45°$. What is the height of the chimney?',
            options: ['$30$ m', '$28.5$ m', '$27$ m', '$31.5$ m'],
            answer: 0,
            solution: 'Let height above observer be $h$. $\\tan 45° = \\frac{h}{28.5} \\implies h = 28.5$. Total height = $28.5 + 1.5 = 30$ m.'
        },
        {
            id: 3,
            question: 'The angle of depression of a car parked on the road from the top of a $150$ m high tower is $30°$. The distance of the car from the tower is:',
            options: ['$150\\sqrt{3}$ m', '$\\frac{150}{\\sqrt{3}}$ m', '$75\\sqrt{3}$ m', '$300$ m'],
            answer: 0,
            solution: 'Angle of elevation from car to tower top is $30°$. $\\tan 30° = \\frac{150}{d} \\implies d = \\frac{150}{\\tan 30°} = 150\\sqrt{3}$ m.'
        },
        {
            id: 4,
            question: 'A ladder rests against a vertical wall at an inclination $\\alpha$ to the horizontal. Its foot is pulled away from the wall through a distance $p$ so that its upper end slides a distance $q$ down the wall and then the ladder makes an angle $\\beta$ to the horizontal. Show that $\\frac{p}{q} = \\frac{\\cos \\beta - \\cos \\alpha}{\\sin \\alpha - \\sin \\beta}$. (Select the true statement regarding the horizontal distances)',
            options: [
                'Initial distance = $L \\cos \\alpha$, Final distance = $L \\cos \\beta$',
                'Initial distance = $L \\sin \\alpha$, Final distance = $L \\sin \\beta$',
                'Initial distance = $L \\tan \\alpha$, Final distance = $L \\tan \\beta$',
                'Initial distance = $L \\sec \\alpha$, Final distance = $L \\sec \\beta$'
            ],
            answer: 0,
            solution: 'The horizontal distance of the foot from the wall is $L \\cos \\theta$ where $L$ is the length of the ladder.'
        }
    ];
    return shuffle(questions).slice(0, 5);
}

export function genSkill1Assessment() {
    return genSkill1Practice();
}

// ── SKILL 2: Multi-step Angle Problems ──────────────────────────────────────
export function genSkill2Practice() {
    const questions = [
        {
            id: 0,
            question: 'From a point $P$ on the ground the angle of elevation of the top of a $10$ m tall building is $30°$. A flag is hoisted at the top of the building and the angle of elevation of the top of the flagstaff from $P$ is $45°$. Find the length of the flagstaff.',
            options: ['$10(\\sqrt{3}-1)$ m', '$10\\sqrt{3}$ m', '$10(\\sqrt{3}+1)$ m', '$10$ m'],
            answer: 0,
            solution: 'Distance from P to building $d = 10/\\tan 30° = 10\\sqrt{3}$. Height to top of flagstaff $H = d \\tan 45° = 10\\sqrt{3}$. Length of flagstaff = $H - 10 = 10\\sqrt{3} - 10 = 10(\\sqrt{3}-1)$ m.'
        },
        {
            id: 1,
            question: 'The angles of depression of the top and the bottom of an $8$ m tall building from the top of a multi-storeyed building are $30°$ and $45°$, respectively. Find the height of the multi-storeyed building.',
            options: ['$4(3+\\sqrt{3})$ m', '$8\\sqrt{3}$ m', '$4(3-\\sqrt{3})$ m', '$12$ m'],
            answer: 0,
            solution: 'Let height of multi-storeyed building be $H$ and distance be $x$. $x = H \\tan(90°-45°) = H$. Also $x = (H-8)\\tan(90°-30°) = (H-8)\\sqrt{3}$. So $H = H\\sqrt{3} - 8\\sqrt{3} \\implies H(\\sqrt{3}-1) = 8\\sqrt{3} \\implies H = \\frac{8\\sqrt{3}}{\\sqrt{3}-1} = 4\\sqrt{3}(\\sqrt{3}+1) = 4(3+\\sqrt{3})$ m.'
        },
        {
            id: 2,
            question: 'From a point on a bridge across a river, the angles of depression of the banks on opposite sides of the river are $30°$ and $45°$, respectively. If the bridge is at a height of $3$ m from the banks, find the width of the river.',
            options: ['$3(\\sqrt{3}+1)$ m', '$3\\sqrt{3}$ m', '$3(\\sqrt{3}-1)$ m', '$6$ m'],
            answer: 0,
            solution: 'Width = $d_1 + d_2 = \\frac{3}{\\tan 30°} + \\frac{3}{\\tan 45°} = 3\\sqrt{3} + 3 = 3(\\sqrt{3}+1)$ m.'
        },
        {
            id: 3,
            question: 'Two poles of equal heights are standing opposite each other on either side of the road, which is $80$ m wide. From a point between them on the road, the angles of elevation of the top of the poles are $60°$ and $30°$, respectively. Find the height of the poles.',
            options: ['$20\\sqrt{3}$ m', '$40\\sqrt{3}$ m', '$20$ m', '$40$ m'],
            answer: 0,
            solution: 'Let height be $h$, distances be $x$ and $80-x$. $x = \\frac{h}{\\tan 60°} = \\frac{h}{\\sqrt{3}}$ and $80-x = \\frac{h}{\\tan 30°} = h\\sqrt{3}$. Adding them: $80 = \\frac{h}{\\sqrt{3}} + h\\sqrt{3} = h(\\frac{1+3}{\\sqrt{3}}) = \\frac{4h}{\\sqrt{3}} \\implies h = 20\\sqrt{3}$ m.'
        },
        {
            id: 4,
            question: 'A TV tower stands vertically on a bank of a canal. From a point on the other bank directly opposite the tower, the angle of elevation of the top of the tower is $60°$. From another point $20$ m away from this point on the line joining this point to the foot of the tower, the angle of elevation of the top of the tower is $30°$. Find the height of the tower.',
            options: ['$10\\sqrt{3}$ m', '$20\\sqrt{3}$ m', '$10$ m', '$30$ m'],
            answer: 0,
            solution: 'Let height be $h$, canal width be $x$. $\\tan 60° = \\frac{h}{x} \\implies h = x\\sqrt{3}$. Also $\\tan 30° = \\frac{h}{x+20} \\implies h = \\frac{x+20}{\\sqrt{3}}$. Equating $h$: $x\\sqrt{3} = \\frac{x+20}{\\sqrt{3}} \\implies 3x = x+20 \\implies 2x=20 \\implies x=10$. Height $h = 10\\sqrt{3}$ m.'
        }
    ];
    return shuffle(questions).slice(0, 5);
}

export function genSkill2Assessment() {
    return genSkill2Practice();
}
