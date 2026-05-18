/* SVG diagram strings for all geometry terminology terms */
/* Rendered via dangerouslySetInnerHTML in each Terminology JSX */

const s = (color, content) =>
    `<svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg" style="max-width:240px;width:100%;height:auto;display:block;font-family:'Inter',sans-serif">${content}</svg>`;

// ─── Marker defs reused across SVGs ──────────────────────────────────────────
const arrowR = (id, c) => `<defs><marker id="${id}" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="${c}"/></marker></defs>`;
const arrowBoth = (id, c) => `<defs><marker id="${id}r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="${c}"/></marker><marker id="${id}l" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto-start-reverse"><polygon points="0 0,8 3,0 6" fill="${c}"/></marker></defs>`;

// ─── BASIC GEOMETRY (#0ea5e9) ─────────────────────────────────────────────────
export const GEO_DIAGRAMS = {

    Point: s('#0ea5e9',
        `<circle cx="120" cy="82" r="7" fill="#0ea5e9"/>
        <text x="132" y="77" font-size="17" font-style="italic" font-family="Georgia,serif" fill="#0f172a">A</text>
        <text x="80" y="130" font-size="12" fill="#64748b">A point — no size, only location</text>`),

    Line: s('#0ea5e9',
        `${arrowBoth('ln', '#0ea5e9')}
        <line x1="18" y1="90" x2="222" y2="90" stroke="#0ea5e9" stroke-width="2.5" marker-end="url(#lnr)" marker-start="url(#lnl)"/>
        <circle cx="80" cy="90" r="5" fill="#0f172a"/>
        <circle cx="160" cy="90" r="5" fill="#0f172a"/>
        <text x="75" y="75" font-size="15" font-style="italic" font-family="Georgia,serif" fill="#0f172a">A</text>
        <text x="155" y="75" font-size="15" font-style="italic" font-family="Georgia,serif" fill="#0f172a">B</text>
        <text x="55" y="130" font-size="11" fill="#64748b">Extends infinitely in both directions</text>`),

    Ray: s('#0ea5e9',
        `${arrowR('ry', '#0ea5e9')}
        <line x1="40" y1="90" x2="218" y2="90" stroke="#0ea5e9" stroke-width="2.5" marker-end="url(#ry)"/>
        <circle cx="40" cy="90" r="5" fill="#0f172a"/>
        <circle cx="130" cy="90" r="5" fill="#64748b"/>
        <text x="34" y="75" font-size="15" font-style="italic" font-family="Georgia,serif" fill="#0f172a">A</text>
        <text x="124" y="75" font-size="15" font-style="italic" font-family="Georgia,serif" fill="#64748b">B</text>
        <text x="35" y="132" font-size="11" fill="#64748b">Starts at A, through B, extends forever →</text>`),

    Angle: s('#0ea5e9',
        `<line x1="90" y1="125" x2="195" y2="125" stroke="#0ea5e9" stroke-width="2.5"/>
        <line x1="90" y1="125" x2="148" y2="45" stroke="#0ea5e9" stroke-width="2.5"/>
        <path d="M 128,125 A 38,38 0 0,0 114,97" fill="none" stroke="#f59e0b" stroke-width="2"/>
        <text x="127" y="116" font-size="13" fill="#f59e0b">θ</text>
        <circle cx="90" cy="125" r="5" fill="#0f172a"/>
        <text x="70" y="148" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">B</text>
        <text x="188" y="122" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">C</text>
        <text x="142" y="42" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">A</text>
        <text x="48" y="168" font-size="11" fill="#64748b">∠ABC — angle at vertex B</text>`),

    Triangle: s('#0ea5e9',
        `<polygon points="120,22 38,152 202,152" fill="#0ea5e915" stroke="#0ea5e9" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M 52,152 Q 56,142 46,140" fill="none" stroke="#f59e0b" stroke-width="1.8"/>
        <path d="M 188,152 Q 185,142 195,140" fill="none" stroke="#f59e0b" stroke-width="1.8"/>
        <path d="M 110,38 Q 120,50 130,38" fill="none" stroke="#f59e0b" stroke-width="1.8"/>
        <text x="113" y="17" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">A</text>
        <text x="22" y="164" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">B</text>
        <text x="204" y="164" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">C</text>
        <text x="55" y="172" font-size="11" fill="#64748b">∠A + ∠B + ∠C = 180°</text>`),

    Polygon: s('#0ea5e9',
        `<polygon points="120,18 182,55 182,122 120,155 58,122 58,55" fill="#0ea5e915" stroke="#0ea5e9" stroke-width="2.5" stroke-linejoin="round"/>
        <text x="95" y="97" font-size="13" fill="#0f172a">Hexagon</text>
        <text x="77" y="113" font-size="11" fill="#64748b">6 sides, 6 angles</text>
        <text x="40" y="170" font-size="11" fill="#64748b">Angle sum = (6−2)×180° = 720°</text>`),

    Perpendicular: s('#0ea5e9',
        `<line x1="30" y1="90" x2="210" y2="90" stroke="#0ea5e9" stroke-width="2.5"/>
        <line x1="120" y1="20" x2="120" y2="160" stroke="#0ea5e9" stroke-width="2.5"/>
        <rect x="120" y="78" width="14" height="14" fill="none" stroke="#f43f5e" stroke-width="2"/>
        <text x="135" y="76" font-size="12" fill="#f43f5e" font-weight="bold">90°</text>
        <text x="40" y="170" font-size="11" fill="#64748b">Lines meeting at exactly 90°</text>`),

    Parallel: s('#0ea5e9',
        `${arrowR('pa', '#0ea5e9')}
        <line x1="20" y1="65" x2="215" y2="65" stroke="#0ea5e9" stroke-width="2.5" marker-end="url(#pa)"/>
        <line x1="20" y1="115" x2="215" y2="115" stroke="#0ea5e9" stroke-width="2.5" marker-end="url(#pa)"/>
        <line x1="115" y1="57" x2="122" y2="73" stroke="#f59e0b" stroke-width="2.5"/>
        <line x1="115" y1="107" x2="122" y2="123" stroke="#f59e0b" stroke-width="2.5"/>
        <text x="6" y="61" font-size="12" font-style="italic" fill="#0ea5e9">m</text>
        <text x="6" y="111" font-size="12" font-style="italic" fill="#0ea5e9">n</text>
        <text x="40" y="155" font-size="11" fill="#64748b">Same direction — never intersect</text>`),
};

// ─── POLYGONS (#10b981) ───────────────────────────────────────────────────────
export const POLY_DIAGRAMS = {

    Quadrilateral: s('#10b981',
        `<polygon points="55,150 42,52 158,28 192,132" fill="#10b98115" stroke="#10b981" stroke-width="2.5" stroke-linejoin="round"/>
        <text x="34" y="49" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">A</text>
        <text x="157" y="25" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">B</text>
        <text x="193" y="131" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">C</text>
        <text x="42" y="165" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">D</text>
        <text x="28" y="172" font-size="11" fill="#64748b">∠A + ∠B + ∠C + ∠D = 360°</text>`),

    Parallelogram: s('#10b981',
        `<polygon points="50,135 80,45 195,45 165,135" fill="#10b98115" stroke="#10b981" stroke-width="2.5" stroke-linejoin="round"/>
        <line x1="137" y1="39" x2="137" y2="51" stroke="#f59e0b" stroke-width="2.5"/>
        <line x1="107" y1="129" x2="107" y2="141" stroke="#f59e0b" stroke-width="2.5"/>
        <line x1="58" y1="91" x2="70" y2="95" stroke="#0ea5e9" stroke-width="2.5"/>
        <line x1="60" y1="85" x2="72" y2="89" stroke="#0ea5e9" stroke-width="2.5"/>
        <line x1="173" y1="91" x2="185" y2="95" stroke="#0ea5e9" stroke-width="2.5"/>
        <line x1="175" y1="85" x2="187" y2="89" stroke="#0ea5e9" stroke-width="2.5"/>
        <text x="30" y="165" font-size="11" fill="#64748b">Opposite sides parallel ∥ and equal</text>`),

    Rhombus: s('#10b981',
        `<polygon points="120,25 195,90 120,155 45,90" fill="#10b98115" stroke="#10b981" stroke-width="2.5" stroke-linejoin="round"/>
        <line x1="120" y1="25" x2="120" y2="155" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,4"/>
        <line x1="45" y1="90" x2="195" y2="90" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,4"/>
        <rect x="120" y="80" width="10" height="10" fill="none" stroke="#f43f5e" stroke-width="1.8"/>
        <text x="68" y="50" font-size="13" font-style="italic" fill="#10b981">s</text>
        <text x="164" y="50" font-size="13" font-style="italic" fill="#10b981">s</text>
        <text x="68" y="138" font-size="13" font-style="italic" fill="#10b981">s</text>
        <text x="164" y="138" font-size="13" font-style="italic" fill="#10b981">s</text>
        <text x="20" y="172" font-size="11" fill="#64748b">All sides equal; diagonals bisect at 90°</text>`),

    Rectangle: s('#10b981',
        `<rect x="35" y="40" width="170" height="100" fill="#10b98110" stroke="#10b981" stroke-width="2.5"/>
        <rect x="35" y="40" width="14" height="14" fill="none" stroke="#f43f5e" stroke-width="1.8"/>
        <rect x="191" y="40" width="14" height="14" fill="none" stroke="#f43f5e" stroke-width="1.8"/>
        <rect x="35" y="126" width="14" height="14" fill="none" stroke="#f43f5e" stroke-width="1.8"/>
        <rect x="191" y="126" width="14" height="14" fill="none" stroke="#f43f5e" stroke-width="1.8"/>
        <text x="118" y="30" font-size="13" text-anchor="middle" font-style="italic" fill="#0f172a">l</text>
        <text x="20" y="95" font-size="13" text-anchor="middle" font-style="italic" fill="#0f172a">w</text>
        <text x="25" y="158" font-size="11" fill="#64748b">All angles 90°; opposite sides equal</text>`),

    Kite: s('#10b981',
        `<polygon points="120,30 176,94 120,160 64,94" fill="#10b98112" stroke="#10b981" stroke-width="2.5" stroke-linejoin="round"/>
        <line x1="120" y1="30" x2="120" y2="160" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5,4"/>
        <text x="120" y="22" text-anchor="middle" font-size="9.5" fill="#f43f5e">axis of symmetry</text>
        <text x="67" y="70" font-size="13" font-style="italic" fill="#f59e0b">a</text>
        <text x="154" y="70" font-size="13" font-style="italic" fill="#f59e0b">a</text>
        <text x="62" y="128" font-size="13" font-style="italic" fill="#0ea5e9">b</text>
        <text x="154" y="128" font-size="13" font-style="italic" fill="#0ea5e9">b</text>
        <text x="20" y="173" font-size="10.5" fill="#64748b">Two pairs of consecutive equal sides</text>`),

    Trapezium: s('#10b981',
        `<polygon points="60,130 180,130 200,50 40,50" fill="#10b98112" stroke="#10b981" stroke-width="2.5" stroke-linejoin="round"/>
        <polyline points="103,44 110,50 103,56" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="103,124 110,130 103,136" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="120" y1="50" x2="120" y2="130" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="4,3"/>
        <rect x="120" y="118" width="8" height="8" fill="none" stroke="#f43f5e" stroke-width="1.5"/>
        <text x="120" y="35" text-anchor="middle" font-size="12" font-style="italic" fill="#0f172a">a</text>
        <text x="120" y="148" text-anchor="middle" font-size="12" font-style="italic" fill="#0f172a">b</text>
        <text x="126" y="95" font-size="12" font-style="italic" fill="#f43f5e">h</text>
        <text x="22" y="170" font-size="11" fill="#64748b">One pair of parallel sides (a ∥ b)</text>`),
};

// ─── TRIANGLES (#f59e0b) ──────────────────────────────────────────────────────
export const TRI_DIAGRAMS = {

    Hypotenuse: s('#f59e0b',
        `<polygon points="40,148 40,35 183,148" fill="#f59e0b10" stroke="#94a3b8" stroke-width="2" stroke-linejoin="round"/>
        <line x1="40" y1="35" x2="183" y2="148" stroke="#f59e0b" stroke-width="4"/>
        <rect x="40" y="136" width="12" height="12" fill="none" stroke="#0ea5e9" stroke-width="2"/>
        <text x="26" y="32" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">A</text>
        <text x="186" y="161" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">B</text>
        <text x="22" y="161" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">C</text>
        <text x="134" y="75" font-size="16" font-style="italic" font-family="Georgia,serif" fill="#f59e0b">c</text>
        <text x="15" y="173" font-size="11" fill="#64748b">c² = a² + b² (Pythagoras)</text>`),

    Congruent: s('#f59e0b',
        `<polygon points="22,148 65,38 108,148" fill="#f59e0b15" stroke="#f59e0b" stroke-width="2.5" stroke-linejoin="round"/>
        <polygon points="132,148 175,38 218,148" fill="#f59e0b15" stroke="#f59e0b" stroke-width="2.5" stroke-linejoin="round"/>
        <line x1="43" y1="91" x2="49" y2="97" stroke="#0ea5e9" stroke-width="2"/>
        <line x1="87" y1="91" x2="93" y2="97" stroke="#0ea5e9" stroke-width="2"/>
        <line x1="153" y1="91" x2="159" y2="97" stroke="#0ea5e9" stroke-width="2"/>
        <line x1="197" y1="91" x2="203" y2="97" stroke="#0ea5e9" stroke-width="2"/>
        <text x="120" y="100" font-size="24" fill="#0f172a" text-anchor="middle">≅</text>
        <text x="40" y="170" font-size="11" fill="#64748b">Same shape AND same size</text>`),

    Similar: s('#f59e0b',
        `<polygon points="20,148 52,68 84,148" fill="#f59e0b15" stroke="#f59e0b" stroke-width="2" stroke-linejoin="round"/>
        <polygon points="105,148 155,28 205,148" fill="#f59e0b12" stroke="#f43f5e" stroke-width="2.5" stroke-linejoin="round"/>
        <text x="90" y="110" font-size="22" fill="#0f172a" text-anchor="middle">∼</text>
        <text x="36" y="163" font-size="10" fill="#f59e0b">scale 1</text>
        <text x="143" y="163" font-size="10" fill="#f43f5e">scale 2</text>
        <text x="12" y="173" font-size="11" fill="#64748b">Same angles; sides proportional</text>`),

    Altitude: s('#f59e0b',
        `<polygon points="95,22 30,150 195,150" fill="#f59e0b12" stroke="#f59e0b" stroke-width="2.5" stroke-linejoin="round"/>
        <line x1="95" y1="22" x2="95" y2="150" stroke="#f43f5e" stroke-width="2.5" stroke-dasharray="5,4"/>
        <rect x="95" y="138" width="12" height="12" fill="none" stroke="#f43f5e" stroke-width="2"/>
        <text x="84" y="18" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">A</text>
        <text x="16" y="164" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">B</text>
        <text x="197" y="164" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">C</text>
        <text x="100" y="92" font-size="13" font-style="italic" fill="#f43f5e">h</text>
        <text x="12" y="174" font-size="10.5" fill="#64748b">Perpendicular from vertex to base</text>`),

    Median: s('#f59e0b',
        `<polygon points="95,20 28,150 202,150" fill="#f59e0b12" stroke="#f59e0b" stroke-width="2.5" stroke-linejoin="round"/>
        <circle cx="115" cy="150" r="5" fill="#f43f5e"/>
        <line x1="95" y1="20" x2="115" y2="150" stroke="#f43f5e" stroke-width="2.5"/>
        <line x1="62" y1="148" x2="68" y2="154" stroke="#0ea5e9" stroke-width="2.5"/>
        <line x1="150" y1="148" x2="156" y2="154" stroke="#0ea5e9" stroke-width="2.5"/>
        <text x="84" y="15" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">A</text>
        <text x="14" y="164" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">B</text>
        <text x="204" y="164" font-size="14" font-style="italic" font-family="Georgia,serif" fill="#0f172a">C</text>
        <text x="118" y="146" font-size="12" font-style="italic" fill="#f43f5e">M</text>
        <text x="12" y="173" font-size="10.5" fill="#64748b">A to midpoint M of opposite side</text>`),

    Centroid: s('#f59e0b',
        `<polygon points="120,20 30,162 210,162" fill="#f59e0b12" stroke="#f59e0b" stroke-width="2.5" stroke-linejoin="round"/>
        <circle cx="72" cy="90" r="3.5" fill="#0ea5e9"/>
        <circle cx="168" cy="90" r="3.5" fill="#0ea5e9"/>
        <circle cx="120" cy="162" r="3.5" fill="#0ea5e9"/>
        <line x1="120" y1="20" x2="120" y2="162" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="4,3"/>
        <line x1="30" y1="162" x2="168" y2="90" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="4,3"/>
        <line x1="210" y1="162" x2="72" y2="90" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,3"/>
        <circle cx="120" cy="116" r="7" fill="#8b5cf6"/>
        <text x="127" y="113" font-size="13" font-style="italic" font-family="Georgia,serif" fill="#8b5cf6">G</text>
        <text x="22" y="175" font-size="11" fill="#64748b">G = centroid; all 3 medians meet here</text>`),
};

// ─── CIRCLES (#f43f5e) ────────────────────────────────────────────────────────
export const CIR_DIAGRAMS = {

    Radius: s('#f43f5e',
        `<circle cx="120" cy="90" r="72" fill="#f43f5e10" stroke="#f43f5e" stroke-width="2.5"/>
        <circle cx="120" cy="90" r="5" fill="#0f172a"/>
        <line x1="120" y1="90" x2="184" y2="58" stroke="#f43f5e" stroke-width="2.5"/>
        <circle cx="184" cy="58" r="4" fill="#f43f5e"/>
        <text x="145" y="68" font-size="14" font-style="italic" fill="#f43f5e">r</text>
        <text x="112" y="108" font-size="12" font-style="italic" fill="#0f172a">O</text>
        <text x="18" y="170" font-size="11" fill="#64748b">r = distance from centre O to circumference</text>`),

    Chord: s('#f43f5e',
        `<circle cx="120" cy="90" r="72" fill="#f43f5e10" stroke="#f43f5e" stroke-width="2"/>
        <circle cx="120" cy="90" r="4" fill="#0f172a"/>
        <line x1="74" y1="35" x2="188" y2="65" stroke="#f43f5e" stroke-width="3.5"/>
        <circle cx="74" cy="35" r="4.5" fill="#f43f5e"/>
        <circle cx="188" cy="65" r="4.5" fill="#f43f5e"/>
        <text x="62" y="28" font-size="13" font-style="italic" font-family="Georgia,serif" fill="#0f172a">P</text>
        <text x="192" y="62" font-size="13" font-style="italic" font-family="Georgia,serif" fill="#0f172a">Q</text>
        <text x="108" y="44" font-size="11" fill="#f43f5e" transform="rotate(15,108,44)">chord PQ</text>
        <text x="15" y="170" font-size="11" fill="#64748b">Chord — joins two points on the circle</text>`),

    Tangent: s('#f43f5e',
        `<circle cx="105" cy="88" r="68" fill="#f43f5e10" stroke="#f43f5e" stroke-width="2"/>
        <circle cx="105" cy="88" r="4" fill="#0f172a"/>
        <line x1="173" y1="15" x2="173" y2="168" stroke="#0ea5e9" stroke-width="2.5"/>
        <line x1="105" y1="88" x2="173" y2="88" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="5,3"/>
        <rect x="159" y="74" width="14" height="14" fill="none" stroke="#f43f5e" stroke-width="2"/>
        <circle cx="173" cy="88" r="5" fill="#0ea5e9"/>
        <text x="177" y="85" font-size="12" font-style="italic" fill="#0f172a">P</text>
        <text x="97" y="105" font-size="12" font-style="italic" fill="#0f172a">O</text>
        <text x="12" y="172" font-size="11" fill="#64748b">Tangent ⊥ radius at point of contact P</text>`),

    Arc: s('#f43f5e',
        `<circle cx="120" cy="90" r="72" fill="none" stroke="#e2e8f0" stroke-width="2"/>
        <circle cx="120" cy="90" r="4" fill="#0f172a"/>
        <path d="M 192,90 A 72,72 0 0,0 120,18" fill="none" stroke="#f43f5e" stroke-width="5" stroke-linecap="round"/>
        <line x1="120" y1="90" x2="192" y2="90" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
        <line x1="120" y1="90" x2="120" y2="18" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
        <path d="M 155,90 A 35,35 0 0,0 120,55" fill="none" stroke="#f59e0b" stroke-width="2"/>
        <text x="148" y="75" font-size="13" fill="#f59e0b">θ</text>
        <text x="14" y="172" font-size="11" fill="#64748b">Arc length = (θ/360°) × 2πr</text>`),

    Sector: s('#f43f5e',
        `<circle cx="120" cy="90" r="72" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
        <path d="M 120,90 L 192,90 A 72,72 0 0,0 120,18 Z" fill="#f43f5e28" stroke="#f43f5e" stroke-width="2.5"/>
        <circle cx="120" cy="90" r="4" fill="#0f172a"/>
        <path d="M 155,90 A 35,35 0 0,0 120,55" fill="none" stroke="#f59e0b" stroke-width="2"/>
        <text x="148" y="75" font-size="13" fill="#f59e0b">θ</text>
        <text x="111" y="108" font-size="12" font-style="italic" fill="#0f172a">O</text>
        <text x="15" y="172" font-size="11" fill="#64748b">Sector area = (θ/360°) × πr²</text>`),

    Segment: s('#f43f5e',
        `<circle cx="120" cy="90" r="72" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
        <path d="M 59,128 A 72,72 0 0,0 181,128 Z" fill="#f43f5e28" stroke="#f43f5e" stroke-width="2.5"/>
        <line x1="59" y1="128" x2="181" y2="128" stroke="#f43f5e" stroke-width="2.5"/>
        <circle cx="59" cy="128" r="4.5" fill="#f43f5e"/>
        <circle cx="181" cy="128" r="4.5" fill="#f43f5e"/>
        <text x="47" y="122" font-size="13" font-style="italic" font-family="Georgia,serif" fill="#0f172a">A</text>
        <text x="184" y="122" font-size="13" font-style="italic" font-family="Georgia,serif" fill="#0f172a">B</text>
        <text x="108" y="155" font-size="12" fill="#f43f5e">segment</text>
        <text x="12" y="173" font-size="11" fill="#64748b">Region between chord AB and arc</text>`),
};

// ─── MENSURATION (#8b5cf6) ────────────────────────────────────────────────────
export const MEN_DIAGRAMS = {

    Perimeter: s('#8b5cf6',
        `<rect x="35" y="42" width="170" height="100" fill="none" stroke="#8b5cf6" stroke-width="5"/>
        <text x="120" y="32" text-anchor="middle" font-size="13" font-style="italic" fill="#0f172a">l</text>
        <text x="18" y="97" text-anchor="middle" font-size="13" font-style="italic" fill="#0f172a">w</text>
        <text x="120" y="162" text-anchor="middle" font-size="13" font-style="italic" fill="#0f172a">l</text>
        <text x="218" y="97" text-anchor="middle" font-size="13" font-style="italic" fill="#0f172a">w</text>
        <text x="20" y="172" font-size="11" fill="#64748b">P = 2(l + w) — total boundary length</text>`),

    Area: s('#8b5cf6',
        `<rect x="35" y="42" width="170" height="100" fill="#8b5cf622" stroke="#8b5cf6" stroke-width="2.5"/>
        <line x1="69" y1="42" x2="69" y2="142" stroke="#8b5cf6" stroke-width="0.8" opacity="0.5"/>
        <line x1="103" y1="42" x2="103" y2="142" stroke="#8b5cf6" stroke-width="0.8" opacity="0.5"/>
        <line x1="137" y1="42" x2="137" y2="142" stroke="#8b5cf6" stroke-width="0.8" opacity="0.5"/>
        <line x1="171" y1="42" x2="171" y2="142" stroke="#8b5cf6" stroke-width="0.8" opacity="0.5"/>
        <line x1="35" y1="75" x2="205" y2="75" stroke="#8b5cf6" stroke-width="0.8" opacity="0.5"/>
        <line x1="35" y1="108" x2="205" y2="108" stroke="#8b5cf6" stroke-width="0.8" opacity="0.5"/>
        <text x="120" y="98" text-anchor="middle" font-size="18" fill="#8b5cf6" font-weight="bold">A = l × w</text>
        <text x="120" y="34" text-anchor="middle" font-size="12" font-style="italic" fill="#0f172a">l</text>
        <text x="19" y="96" text-anchor="middle" font-size="12" font-style="italic" fill="#0f172a">w</text>
        <text x="18" y="170" font-size="11" fill="#64748b">Area = enclosed surface (sq units)</text>`),

    'Surface Area': s('#8b5cf6',
        `<polygon points="55,75 145,75 145,158 55,158" fill="#8b5cf622" stroke="#8b5cf6" stroke-width="2"/>
        <polygon points="55,75 92,42 182,42 145,75" fill="#8b5cf630" stroke="#8b5cf6" stroke-width="2"/>
        <polygon points="145,75 182,42 182,125 145,158" fill="#8b5cf615" stroke="#8b5cf6" stroke-width="2"/>
        <text x="100" y="120" font-size="11" fill="#8b5cf6" text-anchor="middle">Front face</text>
        <text x="118" y="62" font-size="11" fill="#8b5cf6" text-anchor="middle">Top face</text>
        <text x="165" y="105" font-size="10" fill="#8b5cf6" text-anchor="middle">Side</text>
        <text x="12" y="172" font-size="11" fill="#64748b">SA = sum of areas of ALL faces</text>`),

    Volume: s('#8b5cf6',
        `<polygon points="50,72 138,72 138,140 50,140" fill="#8b5cf618" stroke="#8b5cf6" stroke-width="2"/>
        <polygon points="50,72 83,46 171,46 138,72" fill="#8b5cf625" stroke="#8b5cf6" stroke-width="2"/>
        <polygon points="138,72 171,46 171,118 138,140" fill="#8b5cf610" stroke="#8b5cf6" stroke-width="2"/>
        <text x="30" y="110" font-size="13" font-style="italic" fill="#0f172a">h</text>
        <text x="88" y="155" font-size="13" font-style="italic" fill="#0f172a">l</text>
        <text x="153" y="95" font-size="13" font-style="italic" fill="#0f172a">w</text>
        <text x="65" y="112" font-size="15" fill="#8b5cf6" font-weight="bold">V = lwh</text>
        <text x="10" y="172" font-size="11" fill="#64748b">Volume = 3D space inside (cubic units)</text>`),

    'Composite Shape': s('#8b5cf6',
        `<polygon points="28,155 28,55 90,55 90,100 165,100 165,155" fill="#8b5cf620" stroke="#8b5cf6" stroke-width="2.5" stroke-linejoin="round"/>
        <line x1="28" y1="100" x2="90" y2="100" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5,4"/>
        <text x="55" y="80" text-anchor="middle" font-size="13" fill="#8b5cf6">Rect A</text>
        <text x="125" y="132" text-anchor="middle" font-size="13" fill="#f43f5e">Rect B</text>
        <text x="10" y="173" font-size="11" fill="#64748b">Total area = Area A + Area B</text>`),

    'Lateral Surface Area': s('#8b5cf6',
        `<ellipse cx="112" cy="50" rx="58" ry="19" fill="#8b5cf618" stroke="#8b5cf6" stroke-width="2"/>
        <ellipse cx="112" cy="140" rx="58" ry="19" fill="#8b5cf618" stroke="#8b5cf6" stroke-width="2"/>
        <rect x="54" y="50" width="116" height="90" fill="#8b5cf625" stroke="#8b5cf6" stroke-width="2"/>
        <text x="112" y="100" text-anchor="middle" font-size="13" fill="#8b5cf6" font-weight="bold">Lateral SA</text>
        <text x="112" y="116" text-anchor="middle" font-size="12" fill="#8b5cf6">= 2πrh</text>
        <line x1="175" y1="50" x2="192" y2="50" stroke="#64748b" stroke-width="1.5"/>
        <line x1="175" y1="140" x2="192" y2="140" stroke="#64748b" stroke-width="1.5"/>
        <line x1="183" y1="50" x2="183" y2="140" stroke="#64748b" stroke-width="1.5"/>
        <text x="188" y="100" font-size="13" font-style="italic" fill="#0f172a">h</text>
        <text x="10" y="172" font-size="11" fill="#64748b">Curved sides only (excluding ends)</text>`),
};

// ─── SOLID GEOMETRY (#ec4899) ─────────────────────────────────────────────────
export const SOLID_DIAGRAMS = {

    Face: s('#ec4899',
        `<polygon points="50,63 145,63 145,150 50,150" fill="#ec489935" stroke="#ec4899" stroke-width="3.5"/>
        <polygon points="50,63 90,30 185,30 145,63" fill="#ec489910" stroke="#94a3b8" stroke-width="1.5"/>
        <polygon points="145,63 185,30 185,117 145,150" fill="#ec489910" stroke="#94a3b8" stroke-width="1.5"/>
        <text x="97" y="112" text-anchor="middle" font-size="13" fill="#ec4899" font-weight="bold">Face</text>
        <text x="10" y="168" font-size="11" fill="#64748b">A flat or curved surface of a solid</text>`),

    Edge: s('#ec4899',
        `<polygon points="50,63 145,63 145,150 50,150" fill="#ec489910" stroke="#94a3b8" stroke-width="1.5"/>
        <polygon points="50,63 90,30 185,30 145,63" fill="#ec489910" stroke="#94a3b8" stroke-width="1.5"/>
        <polygon points="145,63 185,30 185,117 145,150" fill="#ec489910" stroke="#94a3b8" stroke-width="1.5"/>
        <line x1="50" y1="63" x2="145" y2="63" stroke="#ec4899" stroke-width="5.5" stroke-linecap="round"/>
        <text x="97" y="53" text-anchor="middle" font-size="12" fill="#ec4899" font-weight="bold">Edge</text>
        <text x="10" y="168" font-size="11" fill="#64748b">Line where two faces of a solid meet</text>`),

    Vertex: s('#ec4899',
        `<polygon points="50,63 145,63 145,150 50,150" fill="#ec489910" stroke="#94a3b8" stroke-width="1.5"/>
        <polygon points="50,63 90,30 185,30 145,63" fill="#ec489910" stroke="#94a3b8" stroke-width="1.5"/>
        <polygon points="145,63 185,30 185,117 145,150" fill="#ec489910" stroke="#94a3b8" stroke-width="1.5"/>
        <circle cx="50" cy="63" r="10" fill="#ec4899"/>
        <text x="22" y="53" font-size="12" fill="#ec4899" font-weight="bold">Vertex</text>
        <text x="10" y="168" font-size="11" fill="#64748b">Corner where 3+ edges of a solid meet</text>`),

    Prism: s('#ec4899',
        `<polygon points="48,135 108,35 168,135" fill="#ec489918" stroke="#ec4899" stroke-width="2.5"/>
        <polygon points="82,143 142,43 202,143" fill="#ec489908" stroke="#ec4899" stroke-width="1.5" stroke-dasharray="5,4"/>
        <line x1="48" y1="135" x2="82" y2="143" stroke="#ec4899" stroke-width="2"/>
        <line x1="108" y1="35" x2="142" y2="43" stroke="#ec4899" stroke-width="2"/>
        <line x1="168" y1="135" x2="202" y2="143" stroke="#ec4899" stroke-width="2"/>
        <text x="10" y="162" font-size="11" fill="#64748b">Two identical bases + rectangular sides</text>`),

    Cylinder: s('#ec4899',
        `<ellipse cx="120" cy="42" rx="62" ry="15" fill="#ec489918" stroke="#ec4899" stroke-width="2.5"/>
        <ellipse cx="120" cy="130" rx="62" ry="15" fill="#ec489918" stroke="#ec4899" stroke-width="2.5"/>
        <rect x="58" y="42" width="124" height="88" fill="#ec489912" stroke="#ec4899" stroke-width="2"/>
        <line x1="120" y1="42" x2="182" y2="42" stroke="#0f172a" stroke-width="1.5" stroke-dasharray="4,3"/>
        <text x="148" y="36" font-size="13" font-style="italic" fill="#0f172a">r</text>
        <line x1="188" y1="42" x2="188" y2="130" stroke="#64748b" stroke-width="1.5"/>
        <text x="192" y="89" font-size="13" font-style="italic" fill="#0f172a">h</text>
        <text x="10" y="164" font-size="11" fill="#64748b">V = πr²h; Total SA = 2πr(r + h)</text>`),

    Sphere: s('#ec4899',
        `<circle cx="120" cy="84" r="65" fill="#ec489912" stroke="#ec4899" stroke-width="2.5"/>
        <ellipse cx="120" cy="84" rx="65" ry="22" fill="none" stroke="#ec4899" stroke-width="1.5" stroke-dasharray="6,5"/>
        <circle cx="120" cy="84" r="5" fill="#0f172a"/>
        <line x1="120" y1="84" x2="176" y2="50" stroke="#0f172a" stroke-width="1.5" stroke-dasharray="4,3"/>
        <text x="148" y="61" font-size="14" font-style="italic" fill="#0f172a">r</text>
        <text x="111" y="102" font-size="12" font-style="italic" fill="#0f172a">O</text>
        <text x="10" y="167" font-size="11" fill="#64748b">V = ⁴⁄₃πr³; SA = 4πr²</text>`),
};

// ─── TRANSFORMATIONS (#06b6d4) ────────────────────────────────────────────────
export const TRANS_DIAGRAMS = {

    Translation: s('#06b6d4',
        `${arrowR('tra', '#06b6d4')}
        <polygon points="25,130 25,55 80,130" fill="#06b6d415" stroke="#94a3b8" stroke-width="2"/>
        <text x="22" y="148" font-size="10" fill="#94a3b8">Pre-image</text>
        <polygon points="148,130 148,55 203,130" fill="#06b6d428" stroke="#06b6d4" stroke-width="2.5"/>
        <text x="145" y="148" font-size="10" fill="#06b6d4">Image</text>
        <line x1="80" y1="90" x2="143" y2="90" stroke="#06b6d4" stroke-width="2" marker-end="url(#tra)"/>
        <text x="96" y="80" font-size="12" fill="#06b6d4">(a, b)</text>
        <text x="10" y="165" font-size="11" fill="#64748b">Slides every point by vector (a, b)</text>`),

    Rotation: s('#06b6d4',
        `<polygon points="150,85 175,120 150,120" fill="#06b6d415" stroke="#94a3b8" stroke-width="2"/>
        <text x="162" y="136" text-anchor="middle" font-size="10" fill="#94a3b8">pre-image</text>
        <polygon points="70,75 105,50 105,75" fill="#06b6d428" stroke="#06b6d4" stroke-width="2.5"/>
        <text x="88" y="43" text-anchor="middle" font-size="10" fill="#06b6d4">image</text>
        <circle cx="105" cy="120" r="6" fill="#f43f5e"/>
        <text x="110" y="117" font-size="11" fill="#f43f5e" font-weight="bold">O</text>
        <path d="M 150,120 A 45,45 0 0,0 105,75" fill="none" stroke="#06b6d4" stroke-width="2" stroke-dasharray="5,4"/>
        <text x="140" y="88" font-size="12" fill="#06b6d4">90°</text>
        <text x="10" y="170" font-size="11" fill="#64748b">Turns about fixed centre O</text>`),

    Reflection: s('#06b6d4',
        `<line x1="120" y1="12" x2="120" y2="150" stroke="#f43f5e" stroke-width="2.5" stroke-dasharray="6,4"/>
        <text x="124" y="24" font-size="10" fill="#f43f5e">mirror</text>
        <polygon points="22,122 22,40 92,80" fill="#06b6d415" stroke="#94a3b8" stroke-width="2"/>
        <text x="30" y="137" font-size="10" fill="#94a3b8">Pre-image</text>
        <polygon points="218,122 218,40 148,80" fill="#06b6d428" stroke="#06b6d4" stroke-width="2.5"/>
        <text x="138" y="137" font-size="10" fill="#06b6d4">Image</text>
        <text x="10" y="170" font-size="11" fill="#64748b">Flipped across the mirror line</text>`),

    Dilation: s('#06b6d4',
        `<circle cx="30" cy="130" r="5" fill="#f43f5e"/>
        <text x="12" y="126" font-size="11" fill="#f43f5e">O</text>
        <polygon points="80,90 80,130 105,130" fill="#06b6d415" stroke="#94a3b8" stroke-width="2"/>
        <text x="72" y="145" font-size="9" fill="#94a3b8">pre-image</text>
        <polygon points="130,50 130,130 180,130" fill="#06b6d428" stroke="#06b6d4" stroke-width="2.5"/>
        <text x="128" y="145" font-size="9" fill="#06b6d4">image (k=2)</text>
        <line x1="30" y1="130" x2="130" y2="50" stroke="#06b6d4" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/>
        <line x1="30" y1="130" x2="180" y2="130" stroke="#06b6d4" stroke-width="1" stroke-dasharray="4,3" opacity="0.6"/>
        <text x="10" y="170" font-size="11" fill="#64748b">Scales distances from O by factor k</text>`),

    'Pre-image': s('#06b6d4',
        `${arrowR('pai', '#06b6d4')}
        <polygon points="20,130 20,45 90,130" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2.5"/>
        <text x="16" y="145" font-size="10" fill="#94a3b8" font-weight="600">Pre-image</text>
        <line x1="94" y1="88" x2="136" y2="88" stroke="#06b6d4" stroke-width="2.5" marker-end="url(#pai)"/>
        <text x="114" y="80" text-anchor="middle" font-size="10" fill="#06b6d4">Transform</text>
        <polygon points="143,130 143,45 213,130" fill="#06b6d428" stroke="#06b6d4" stroke-width="2.5"/>
        <text x="141" y="145" font-size="10" fill="#06b6d4" font-weight="600">Image</text>
        <text x="10" y="170" font-size="11" fill="#64748b">Transform maps pre-image → image</text>`),

    Symmetry: s('#06b6d4',
        `<path d="M 120,95 Q 52,45 58,100 Q 62,148 120,95" fill="#06b6d422" stroke="#06b6d4" stroke-width="2"/>
        <path d="M 120,95 Q 188,45 182,100 Q 178,148 120,95" fill="#06b6d422" stroke="#06b6d4" stroke-width="2"/>
        <line x1="120" y1="18" x2="120" y2="168" stroke="#f43f5e" stroke-width="2.5" stroke-dasharray="6,5"/>
        <text x="123" y="25" font-size="10" fill="#f43f5e">line of symmetry</text>
        <line x1="73" y1="90" x2="79" y2="103" stroke="#0f172a" stroke-width="2"/>
        <line x1="80" y1="90" x2="86" y2="103" stroke="#0f172a" stroke-width="2"/>
        <line x1="167" y1="90" x2="161" y2="103" stroke="#0f172a" stroke-width="2"/>
        <line x1="160" y1="90" x2="154" y2="103" stroke="#0f172a" stroke-width="2"/>
        <text x="10" y="172" font-size="11" fill="#64748b">Each half mirrors the other</text>`),
};
