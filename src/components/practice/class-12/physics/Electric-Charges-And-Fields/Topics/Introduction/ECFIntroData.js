// ECFIntroData.js — 5W1H Framework content for Electric Charges and Fields

export const ECFIntroData = [
    {
        id: 'what',
        q: 'WHAT',
        label: 'What is Electric Charge?',
        icon: '⚡',
        gradient: 'linear-gradient(135deg, #4a2c8a, #7c3aed)',
        content: `Electric charge is a fundamental intrinsic property of matter that causes it to experience a force when placed in an electromagnetic field. There are exactly two types of charge — positive (protons) and negative (electrons). Like charges repel each other; unlike charges attract. Charge is measured in Coulombs (C). The smallest free charge in nature is the electron: e = 1.6 × 10⁻¹⁹ C. Objects acquire charge through friction (triboelectric effect), conduction (direct contact), or induction (without contact). Glass rubbed with silk becomes positive; amber rubbed with wool becomes negative — the oldest recorded experiment in electrostatics (Thales, ~600 BCE).`,
        fact: '⚡ Fun fact: A bolt of lightning transfers about 5 Coulombs of charge — yet an individual electron\'s charge is just 1.6 × 10⁻¹⁹ C. That\'s about 3 × 10¹⁹ electrons per bolt!'
    },
    {
        id: 'why',
        q: 'WHY',
        label: 'Why Does Electrostatics Matter?',
        icon: '🎯',
        gradient: 'linear-gradient(135deg, #be123c, #f43f5e)',
        content: `Electrostatics is the foundation of all electromagnetic theory and modern technology. Understanding electric charge and fields explains: (1) How atoms and molecules bond — the stability of all matter. (2) How every electronic component works — capacitors, transistors, semiconductors. (3) Medical technology: ECG, EEG, defibrillators. (4) Industrial applications: photocopiers, inkjet printers, electrostatic precipitators (pollution control). (5) Lightning rods, van de Graaff generators, and particle accelerators. In NEET/JEE, this chapter typically contributes 2–4 questions per year — one of the highest-scoring topics.`,
        fact: '📱 Every touch on your smartphone screen uses electrostatics — your finger changes the electric field in the capacitive layer, registering your touch location.'
    },
    {
        id: 'when',
        q: 'WHEN',
        label: 'Historical Timeline',
        icon: '📜',
        gradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
        content: `600 BCE: Thales of Miletus notices amber attracts feathers after rubbing.
1600 CE: William Gilbert coins the term "electricus" and distinguishes magnetic from electric forces.
1767 CE: Joseph Priestley proposes the inverse-square law for electricity.
1785 CE: Charles-Augustin de Coulomb quantifies the force law with his torsion balance — what we now call Coulomb's Law.
1837 CE: Michael Faraday introduces the concept of electric field lines.
1913 CE: Robert Millikan measures the elementary charge (e) to high precision using his oil-drop experiment.
1865 CE: James Clerk Maxwell unifies electricity and magnetism into four equations (Maxwell's Equations).`,
        fact: '🔬 Millikan\'s oil-drop experiment (1913) proved charge quantisation — that charge always comes in integer multiples of e. He won the Nobel Prize for this in 1923.'
    },
    {
        id: 'where',
        q: 'WHERE',
        label: 'Where Do We See This?',
        icon: '🌍',
        gradient: 'linear-gradient(135deg, #10b981, #34d399)',
        content: `Electric charges and fields are everywhere:
• Nature: Lightning (discharge between cloud and ground), St. Elmo's fire, static cling of clothes from a dryer.
• Human body: Electrical impulses in neurons and heart muscles (ECG measures the electric field of the heart).
• Technology: Photocopiers (charged drum attracts toner), laser printers, air purifiers (electrostatic precipitators), van de Graaff generators in physics labs.
• Industry: Electrostatic painting (charged particles adhere uniformly to car bodies), crop dusting.
• Space: Charged dust grains on the Moon levitate due to electric fields from solar UV radiation.`,
        fact: '☁️ A thundercloud can have a potential difference of up to 100 million Volts between its base and the Earth — generating electric fields strong enough to ionise air and trigger lightning.'
    },
    {
        id: 'who',
        q: 'WHO',
        label: 'Key Contributors',
        icon: '🧑‍🔬',
        gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
        content: `Charles-Augustin de Coulomb (1736–1806): French physicist who derived the inverse-square law for electrostatic force using a torsion balance. Coulomb's Law bears his name.
Michael Faraday (1791–1867): Introduced the concept of electric field lines and electric flux — a way to visualise invisible fields. The Farad (unit of capacitance) is named after him.
Carl Friedrich Gauss (1777–1855): Mathematically formalised the relationship between electric flux and enclosed charge (Gauss's Law), making field calculations for symmetric objects trivial.
Robert Millikan (1868–1953): Measured the fundamental charge e = 1.6 × 10⁻¹⁹ C with his famous oil-drop experiment, confirming charge quantisation.
James Clerk Maxwell (1831–1879): Unified all of electromagnetism into four elegant equations, predicting electromagnetic waves.`,
        fact: '⚖️ Coulomb\'s torsion balance (1785) was so sensitive it could detect forces of just a few micronewtons — a remarkable engineering feat for the 18th century!'
    },
    {
        id: 'how',
        q: 'HOW',
        label: 'How to Approach This Chapter',
        icon: '🗺️',
        gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
        content: `This chapter has a clear internal logic. Master it in this exact order:

Step 1 — Properties of Charge: Quantisation (q = ne), conservation, additivity. These are the axioms.
Step 2 — Coulomb's Law: The force between two point charges. Learn the vector form.
Step 3 — Superposition: Multiple charges → apply Coulomb's Law pairwise, add vectors.
Step 4 — Electric Field: F/q₀ concept. Learn field due to point charge, along dipole axis and equatorial plane.
Step 5 — Electric Field Lines: Rules, properties, and how they encode field strength/direction.
Step 6 — Electric Flux: Φ = E·A·cosθ. Sign convention for open vs. closed surfaces.
Step 7 — Gauss's Law: Φ = q_enc/ε₀. Apply to sphere, cylinder, infinite plane — the three canonical geometries.
Step 8 — Electric Dipole: p = qd. Torque τ = p×E. Potential energy U = −p·E.`,
        fact: '📌 NEET Strategy: Gauss\'s Law problems and Coulomb\'s Law numericals are the most frequently asked question types. If you can solve both fluently, you secure an easy 3–4 marks every year.'
    },
];
