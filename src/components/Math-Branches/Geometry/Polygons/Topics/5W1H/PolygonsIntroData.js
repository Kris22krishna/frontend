export const polygonsCards5W1H = [
    {
        q: 'What?', label: 'What are Polygons?',
        icon: '🔷', gradFrom: '#10b981', gradTo: '#34d399', shadow: 'rgba(16,185,129,0.3)',
        content: `A **polygon** is a closed 2D shape made entirely of straight line segments. The word comes from Greek: *poly* (many) + *gon* (angle).\n\nKey polygon families:\n- **Quadrilaterals** — 4 sides (square, rectangle, parallelogram, rhombus, kite, trapezium)\n- **Pentagons** — 5 sides\n- **Hexagons** — 6 sides\n- **Regular polygons** — all sides equal, all angles equal\n\nA **quadrilateral's** interior angles always sum to **360°**.`,
        fact: `💡 A polygon with n sides has interior angle sum = **(n − 2) × 180°**. For a quadrilateral: (4 − 2) × 180° = 360°.`
    },
    {
        q: 'Why?', label: 'Why Study Polygons?',
        icon: '🎯', gradFrom: '#8b5cf6', gradTo: '#a78bfa', shadow: 'rgba(139,92,246,0.3)',
        content: `Polygons are the building blocks of the built world:\n- **Architecture** — floors, walls, windows, and roof tiles are all polygonal\n- **Engineering** — structural trusses use triangles and quadrilaterals for strength\n- **Computing** — every 3D mesh in gaming and animation is made of polygon faces (usually triangles or quads)\n- **Art & Design** — tessellations and geometric patterns use regular polygons`,
        fact: `🏗️ A regular hexagon tessellates perfectly (tiles without gaps), which is why honeycombs, bathroom tiles, and some structural panels are hexagonal — maximum area, minimum perimeter!`
    },
    {
        q: 'Who?', label: 'Who Uses Polygons?',
        icon: '👷', gradFrom: '#f59e0b', gradTo: '#fcd34d', shadow: 'rgba(245,158,11,0.3)',
        content: `- **Architects** design floor plans using rectangles, L-shapes, and trapeziums\n- **Land surveyors** calculate land areas using irregular polygons\n- **Game developers** model every object as a polygon mesh (millions of triangles)\n- **Textile designers** use rhombus and kite patterns in fabric\n- **Civil engineers** use parallelogram and trapezoidal cross-sections for beams and dams`,
        fact: `🎮 A modern video game character model may have 100,000+ polygons — each a tiny triangle or quad. Rendering speed is measured in polygons per second!`
    },
    {
        q: 'When?', label: 'When Did This Develop?',
        icon: '📅', gradFrom: '#f43f5e', gradTo: '#fb7185', shadow: 'rgba(244,63,94,0.3)',
        content: `- **~3000 BCE:** Egyptian surveyors used rectangular plots; the Great Pyramid base is a perfect square\n- **~300 BCE:** Euclid's *Elements* systematically proved properties of squares, rectangles, and parallelograms\n- **~250 BCE:** Archimedes approximated π by inscribing and circumscribing regular polygons inside a circle\n- **1800s:** Gauss proved which regular polygons can be constructed with compass and straightedge`,
        fact: `📐 Archimedes used a 96-sided polygon to prove **3.1408 < π < 3.1429** — accurate to 2 decimal places, over 2000 years ago!`
    },
    {
        q: 'Where?', label: 'Where Do We See Polygons?',
        icon: '🌍', gradFrom: '#06b6d4', gradTo: '#22d3ee', shadow: 'rgba(6,182,212,0.3)',
        content: `Polygons appear everywhere in nature and human-made structures:\n- **Nature:** Honeycomb cells (hexagons), snowflake cross-sections (hexagons), crystal faces\n- **Sport:** Football pitch (rectangle), baseball diamond (rhombus/square), running track (trapezium ends)\n- **Architecture:** The Pentagon building (USA) is a regular pentagon; the Louvre pyramid is a square pyramid\n- **Flags:** Many national flags use rectangles, triangles, and trapeziums`,
        fact: `⬡ Bees instinctively build hexagonal cells because the hexagon uses the least wax (perimeter) to enclose the most honey (area) — an optimal polygon!`
    },
    {
        q: 'How?', label: 'How Do We Work with Polygons?',
        icon: '⚙️', gradFrom: '#ec4899', gradTo: '#f472b6', shadow: 'rgba(236,72,153,0.3)',
        content: `**Key formulas for quadrilaterals:**\n\n- **Square:** Area = $s^2$, Perimeter = $4s$\n- **Rectangle:** Area = $lw$, Perimeter = $2(l+w)$\n- **Parallelogram:** Area = $bh$, Perimeter = $2(a+b)$\n- **Rhombus:** Area = $\\frac{d_1 d_2}{2}$, Perimeter = $4s$\n- **Kite:** Area = $\\frac{d_1 d_2}{2}$\n- **Trapezium:** Area = $\\frac{(a+b)}{2} \\times h$\n\nAngles in any quadrilateral sum to **360°**.`,
        fact: `🔑 The **parallelogram area formula** Area = bh (base × perpendicular height) underpins the area of every quadrilateral — even triangles are half a parallelogram!`
    }
];
