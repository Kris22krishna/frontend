export const workEnergyPowerDerivationsData = {
    formulas: [
        { name: "Work Done (Constant Force)", eq: "$W = \\vec{F} \\cdot \\vec{d} = Fd\\cos\\theta$" },
        { name: "Work Done (Variable Force)", eq: "$W = \\int_{x_i}^{x_f} F(x) dx$" },
        { name: "Kinetic Energy", eq: "$KE = \\frac{1}{2}mv^2 = \\frac{p^2}{2m}$" },
        { name: "Work-Energy Theorem", eq: "$W_{net} = \\Delta KE = KE_f - KE_i$" },
        { name: "Gravitational Potential Energy", eq: "$U = mgh$" },
        { name: "Elastic Potential Energy", eq: "$U = \\frac{1}{2}kx^2$" },
        { name: "Mechanical Energy Conservation", eq: "$KE_i + PE_i = KE_f + PE_f$" },
        { name: "Average Power", eq: "$P_{avg} = \\frac{W}{t}$" },
        { name: "Instantaneous Power", eq: "$P = \\vec{F} \\cdot \\vec{v} = Fv\\cos\\theta$" },
        { name: "Coefficient of Restitution", eq: "$e = \\frac{v_2 - v_1}{u_1 - u_2}$" }
    ],
    derivations: [
        {
            title: "Work-Energy Theorem for a Constant Force",
            steps: [
                "1. Using the 3rd equation of motion: $v^2 - u^2 = 2as$",
                "2. Multiply both sides by $\\frac{1}{2}m$:",
                "   $\\frac{1}{2}mv^2 - \\frac{1}{2}mu^2 = mas$",
                "3. By Newton's Second Law, $F = ma$. Substituting $ma$ with $F$:",
                "   $\\frac{1}{2}mv^2 - \\frac{1}{2}mu^2 = Fs$",
                "4. Recognize that $\\frac{1}{2}mv^2$ is final $KE$, $\\frac{1}{2}mu^2$ is initial $KE$, and $Fs$ is Work $W$:",
                "   $KE_f - KE_i = W$",
                "   $\\Delta KE = W_{net}$"
            ]
        },
        {
            title: "Potential Energy of a Spring",
            steps: [
                "1. Hooke's Law states the restoring force is $F_s = -kx$.",
                "2. To compress/stretch the spring, external force $F_{ext} = +kx$ must be applied.",
                "3. Work done $W$ by the external variable force from $0$ to $x$ is:",
                "   $W = \\int_0^x F_{ext} dx = \\int_0^x kx \\,dx$",
                "4. Integrating $kx$ with respect to $x$:",
                "   $W = k \\left[ \\frac{x^2}{2} \\right]_0^x = \\frac{1}{2}kx^2$",
                "5. This work is stored as Elastic Potential Energy $U$:",
                "   $U = \\frac{1}{2}kx^2$"
            ]
        },
        {
            title: "Conservation of Mechanical Energy (Freely Falling Body)",
            steps: [
                "Imagine a body of mass $m$ falling from rest at height $H$.",
                "**At Point A (Top, h=H):**",
                "   Velocity $v=0 \\implies KE = 0$. $PE = mgH$.",
                "   Total Energy $E_A = 0 + mgH = mgH$.",
                "**At Point B (Fallen distance x, h=H-x):**",
                "   Velocity $v^2 = u^2 + 2gx = 0 + 2gx \\implies v^2 = 2gx$.",
                "   $KE = \\frac{1}{2}mv^2 = \\frac{1}{2}m(2gx) = mgx$.",
                "   $PE = mg(H-x) = mgH - mgx$.",
                "   Total Energy $E_B = KE + PE = mgx + mgH - mgx = mgH$.",
                "**At Point C (Bottom, h=0):**",
                "   Fallen distance is $H$. $v^2 = 2gH$.",
                "   $KE = \\frac{1}{2}m(2gH) = mgH$. $PE = 0$.",
                "   Total Energy $E_C = mgH + 0 = mgH$.",
                "**Conclusion:** $E_A = E_B = E_C$. Total mechanical energy is conserved."
            ]
        }
    ],
    numericals: [
        {
            title: "Variable Force Integration",
            q: "A force $F(x) = (3x^2 + 2x)$ N acts on a particle. Find the work done moving it from $x=1$ m to $x=3$ m.",
            a: [
                "$W = \\int_1^3 (3x^2 + 2x) dx$",
                "$W = \\left[ x^3 + x^2 \\right]_1^3$",
                "$W = (3^3 + 3^2) - (1^3 + 1^2)$",
                "$W = (27 + 9) - (1 + 1)$",
                "$W = 36 - 2 = 34\\text{ J}$"
            ]
        },
        {
            title: "Power of a Water Pump",
            q: "A pump is required to lift $600$ kg of water per minute from a well $25$ m deep and eject it with a speed of $50$ m/s. Calculate the power of the pump. ($g=10$ m/s²)",
            a: [
                "Mass $m = 600$ kg, Time $t = 60$ s.",
                "Work done by pump = Change in PE + Change in KE",
                "$W = mgh + \\frac{1}{2}mv^2$",
                "$W = (600 \\times 10 \\times 25) + \\frac{1}{2}(600)(50)^2$",
                "$W = 150000 + 300(2500)$",
                "$W = 150000 + 750000 = 900000\\text{ J}$",
                "Power $P = W/t = 900000 / 60 = 15000\\text{ W} = 15\\text{ kW}$"
            ]
        },
        {
            title: "Bullet Penetrating Wooden Block",
            q: "A bullet of mass $20$ g moving with $500$ m/s strikes a wooden block and penetrates $50$ cm into it before stopping. Find the average resisting force exerted by the block.",
            a: [
                "Initial velocity $u = 500$ m/s. Final velocity $v = 0$.",
                "Mass $m = 0.02$ kg. Displacement $s = 0.5$ m.",
                "By Work-Energy Theorem: $W_{net} = \\Delta KE$",
                "$-F \\times s = \\frac{1}{2}mv^2 - \\frac{1}{2}mu^2$",
                "$-F \\times 0.5 = 0 - \\frac{1}{2}(0.02)(500)^2$",
                "$-0.5 F = -0.01 \\times 250000$",
                "$-0.5 F = -2500 \\implies F = 5000\\text{ N}$"
            ]
        }
    ]
};
