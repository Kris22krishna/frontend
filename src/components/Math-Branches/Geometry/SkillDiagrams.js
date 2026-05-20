const d = (color, content) => `<svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-height:200px;font-family:'Outfit',sans-serif">${content}</svg>`;

// ─── BASIC GEOMETRY ─────────────────────────────────────────────────────────
export const GEO_SKILL_DIAGRAMS = {
  'angle-relationships': [
    // 0: Complementary Angles
    // O=(140,150); diagonal at 55° from horizontal: unit=(cos55°,−sin55°)=(0.574,−0.819)
    // 55° arc R=50: start (190,150) on horiz, end (169,109) on diagonal
    // 35° arc R=40: start (163,117) on diagonal, end (140,110) on vertical
    d('#0ea5e9',
      `<line x1="140" y1="150" x2="228" y2="150" stroke="#94a3b8" stroke-width="2"/>
       <line x1="140" y1="150" x2="140" y2="50" stroke="#94a3b8" stroke-width="2"/>
       <line x1="140" y1="150" x2="195" y2="72" stroke="#0ea5e9" stroke-width="2.5"/>
       <rect x="140" y="135" width="15" height="15" fill="none" stroke="#f43f5e" stroke-width="1.5"/>
       <path d="M 190,150 A 50,50 0 0,0 169,109" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="5,3"/>
       <path d="M 163,117 A 40,40 0 0,0 140,110" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,3"/>
       <text x="182" y="128" font-size="13" fill="#8b5cf6" font-weight="700">55°</text>
       <text x="150" y="104" font-size="13" fill="#0ea5e9" font-weight="700">35°</text>
       <text x="140" y="186" text-anchor="middle" font-size="13" fill="#64748b">55° + 35° = 90°</text>`),
    // 1: Supplementary Angles
    // Ray up-RIGHT at 60° from horizontal → left arc = 120°, right arc = 60°
    // O=(140,130); ray endpoint 90px at 60°: (185,52)
    // Both arcs R=60: right-horiz=(200,130), on-ray=(170,78), left-horiz=(80,130)
    // 120° arc: sweep CCW from (170,78) to (80,130) [60°→180°]
    // 60° arc:  sweep CCW from (200,130) to (170,78) [0°→60°]
    d('#0ea5e9',
      `<line x1="30" y1="130" x2="250" y2="130" stroke="#94a3b8" stroke-width="2"/>
       <line x1="140" y1="130" x2="185" y2="52" stroke="#0ea5e9" stroke-width="2.5"/>
       <path d="M 170,78 A 60,60 0 0,0 80,130" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,3"/>
       <path d="M 200,130 A 60,60 0 0,0 170,78" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="5,3"/>
       <text x="82" y="97" font-size="14" fill="#0ea5e9" font-weight="700">120°</text>
       <text x="193" y="91" font-size="14" fill="#8b5cf6" font-weight="700">60°</text>
       <text x="140" y="168" text-anchor="middle" font-size="13" fill="#64748b">120° + 60° = 180°</text>`),
    // 2: Vertically Opposite Angles
    // Intersection at (140,105); line1: (55,50)→(225,160) slope≈33°; line2: (55,160)→(225,50) slope≈-33°
    // Arc radius=16. Ray endpoints at R=16 from center:
    //   top-left  (213°): (127,96)   top-right (327°): (153,96)
    //   bot-right  (33°): (153,114)  bot-left  (147°): (127,114)
    // 70° arcs (blue, #0ea5e9): top gap and bottom gap
    // 110° arcs (red, #f43f5e): right gap and left gap
    d('#0ea5e9',
      `<line x1="55" y1="50" x2="225" y2="160" stroke="#94a3b8" stroke-width="2"/>
       <line x1="55" y1="160" x2="225" y2="50" stroke="#94a3b8" stroke-width="2"/>
       <path d="M 127,96 A 16,16 0 0,1 153,96" fill="none" stroke="#0ea5e9" stroke-width="2"/>
       <path d="M 153,114 A 16,16 0 0,1 127,114" fill="none" stroke="#0ea5e9" stroke-width="2"/>
       <path d="M 153,96 A 16,16 0 0,1 153,114" fill="none" stroke="#f43f5e" stroke-width="2"/>
       <path d="M 127,114 A 16,16 0 0,1 127,96" fill="none" stroke="#f43f5e" stroke-width="2"/>
       <text x="62" y="72" font-size="14" fill="#0ea5e9" font-weight="700">70°</text>
       <text x="188" y="152" font-size="14" fill="#0ea5e9" font-weight="700">70°</text>
       <text x="188" y="70" font-size="14" fill="#f43f5e" font-weight="700">110°</text>
       <text x="58" y="154" font-size="14" fill="#f43f5e" font-weight="700">110°</text>
       <text x="140" y="192" text-anchor="middle" font-size="12" fill="#64748b">Vertically opposite angles are equal</text>`),
    // 3: Angles at a Point
    d('#0ea5e9',
      `<circle cx="140" cy="105" r="4" fill="#0ea5e9"/>
       <line x1="140" y1="105" x2="140" y2="28" stroke="#94a3b8" stroke-width="2"/>
       <line x1="140" y1="105" x2="238" y2="152" stroke="#94a3b8" stroke-width="2"/>
       <line x1="140" y1="105" x2="42" y2="152" stroke="#94a3b8" stroke-width="2"/>
       <path d="M 140,77 A 28,28 0 0,1 165,117" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="4,3"/>
       <path d="M 165,117 A 28,28 0 0,1 115,117" fill="none" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="4,3"/>
       <path d="M 115,117 A 28,28 0 0,1 140,77" fill="none" stroke="#8b5cf6" stroke-width="1.8" stroke-dasharray="4,3"/>
       <text x="178" y="88" font-size="13" fill="#0ea5e9" font-weight="700">120°</text>
       <text x="120" y="160" font-size="13" fill="#f43f5e" font-weight="700">90°</text>
       <text x="68" y="88" font-size="13" fill="#8b5cf6" font-weight="700">150°</text>
       <text x="140" y="192" text-anchor="middle" font-size="12" fill="#64748b">Angles at a point = 360°</text>`),
  ],
  'triangle-properties': [
    // 0: Angle Sum Property
    d('#8b5cf6',
      `<polygon points="140,28 45,162 235,162" fill="#8b5cf610" stroke="#8b5cf6" stroke-width="2.5"/>
       <path d="M 131,43 A 18,18 0 0,1 149,43" fill="none" stroke="#8b5cf6" stroke-width="1.8" stroke-dasharray="4,3"/>
       <path d="M 63,162 A 18,18 0 0,0 55,147" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="4,3"/>
       <path d="M 217,162 A 18,18 0 0,1 225,147" fill="none" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="4,3"/>
       <text x="132" y="23" font-size="14" fill="#8b5cf6" font-weight="700">60°</text>
       <text x="28" y="178" font-size="14" fill="#0ea5e9" font-weight="700">50°</text>
       <text x="218" y="178" font-size="14" fill="#f43f5e" font-weight="700">70°</text>
       <text x="140" y="196" text-anchor="middle" font-size="13" fill="#64748b">50° + 70° + 60° = 180°</text>`),
    // 1: Exterior Angle Theorem
    // Triangle: A(80,162) 40°, B(140,58) 65°, C(200,162) interior 75°, exterior 105°
    // Ray directions at R=20: A→right(100,162), A→B(90,145); B→A(130,75), B→C(150,75); C→ext(220,162), C→B(190,145)
    d('#8b5cf6',
      `<polygon points="80,162 200,162 140,58" fill="#8b5cf610" stroke="#8b5cf6" stroke-width="2"/>
       <line x1="200" y1="162" x2="258" y2="162" stroke="#f43f5e" stroke-width="2.5"/>
       <path d="M 100,162 A 20,20 0 0,0 90,145" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="4,3"/>
       <path d="M 130,75 A 20,20 0 0,1 150,75" fill="none" stroke="#8b5cf6" stroke-width="1.8" stroke-dasharray="4,3"/>
       <path d="M 220,162 A 20,20 0 0,0 190,145" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4,3"/>
       <text x="88" y="156" font-size="12" fill="#0ea5e9" font-weight="700">40°</text>
       <text x="132" y="53" font-size="12" fill="#8b5cf6" font-weight="700">65°</text>
       <text x="218" y="156" font-size="12" fill="#f43f5e" font-weight="700">105°</text>
       <text x="140" y="194" text-anchor="middle" font-size="12" fill="#64748b">Exterior = 40° + 65° = 105°</text>`),
    // 2: Isosceles Triangle
    d('#8b5cf6',
      `<polygon points="140,28 52,162 228,162" fill="#8b5cf610" stroke="#8b5cf6" stroke-width="2.5"/>
       <line x1="88" y1="94" x2="100" y2="101" stroke="#8b5cf6" stroke-width="2"/>
       <line x1="92" y1="88" x2="104" y2="95" stroke="#8b5cf6" stroke-width="2"/>
       <line x1="180" y1="101" x2="192" y2="94" stroke="#8b5cf6" stroke-width="2"/>
       <line x1="176" y1="95" x2="188" y2="88" stroke="#8b5cf6" stroke-width="2"/>
       <text x="130" y="22" font-size="13" fill="#f43f5e" font-weight="700">80°</text>
       <text x="32" y="178" font-size="13" fill="#8b5cf6" font-weight="700">50°</text>
       <text x="215" y="178" font-size="13" fill="#8b5cf6" font-weight="700">50°</text>
       <text x="140" y="196" text-anchor="middle" font-size="12" fill="#64748b">Base angles = (180°−80°)/2 = 50°</text>`),
    // 3: Equilateral Triangle
    d('#8b5cf6',
      `<polygon points="140,22 40,186 240,186" fill="#8b5cf610" stroke="#8b5cf6" stroke-width="2.5"/>
       <line x1="85" y1="101" x2="95" y2="107" stroke="#8b5cf6" stroke-width="2.5"/>
       <line x1="185" y1="107" x2="195" y2="101" stroke="#8b5cf6" stroke-width="2.5"/>
       <line x1="140" y1="179" x2="140" y2="193" stroke="#8b5cf6" stroke-width="2.5"/>
       <text x="130" y="16" font-size="14" fill="#8b5cf6" font-weight="700">60°</text>
       <text x="22" y="198" font-size="14" fill="#8b5cf6" font-weight="700">60°</text>
       <text x="225" y="198" font-size="14" fill="#8b5cf6" font-weight="700">60°</text>`),
  ],
  'polygon-properties': [
    // 0: Interior Angle Sum (Hexagon)
    d('#f43f5e',
      `<polygon points="140,18 211,58 211,138 140,178 69,138 69,58" fill="#f43f5e08" stroke="#f43f5e" stroke-width="2.5"/>
       <line x1="140" y1="18" x2="211" y2="138" stroke="#0ea5e9" stroke-width="1.2" stroke-dasharray="4,3"/>
       <line x1="140" y1="18" x2="140" y2="178" stroke="#0ea5e9" stroke-width="1.2" stroke-dasharray="4,3"/>
       <line x1="140" y1="18" x2="69" y2="138" stroke="#0ea5e9" stroke-width="1.2" stroke-dasharray="4,3"/>
       <text x="140" y="98" text-anchor="middle" font-size="13" fill="#0ea5e9" font-weight="700">4 triangles</text>
       <text x="140" y="196" text-anchor="middle" font-size="12" fill="#64748b">S = (6−2)×180° = 720°</text>`),
    // 1: Each Interior Angle (Regular Octagon)
    d('#f43f5e',
      `<polygon points="140,18 197,42 222,98 197,154 140,178 83,154 58,98 83,42" fill="#f43f5e08" stroke="#f43f5e" stroke-width="2.5"/>
       <path d="M 118,30 A 26,26 0 0,0 164,30" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="4,3"/>
       <text x="123" y="24" font-size="13" fill="#0ea5e9" font-weight="700">135°</text>
       <text x="140" y="108" text-anchor="middle" font-size="13" fill="#f43f5e" font-weight="700">Regular Octagon</text>
       <text x="140" y="196" text-anchor="middle" font-size="12" fill="#64748b">(8−2)×180°÷8 = 135°</text>`),
    // 2: Exterior Angle (Regular Pentagon)
    d('#f43f5e',
      `<polygon points="140,18 218,74 188,162 92,162 62,74" fill="#f43f5e08" stroke="#f43f5e" stroke-width="2.5"/>
       <line x1="218" y1="74" x2="234" y2="27" stroke="#0ea5e9" stroke-width="2"/>
       <path d="M 225,53 A 22,22 0 0,0 200,61" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="4,3"/>
       <text x="228" y="50" font-size="13" fill="#0ea5e9" font-weight="700">72°</text>
       <text x="140" y="108" text-anchor="middle" font-size="13" fill="#f43f5e" font-weight="700">Pentagon</text>
       <text x="140" y="194" text-anchor="middle" font-size="12" fill="#64748b">Each exterior = 360°÷5 = 72°</text>`),
    // 3: Number of Diagonals (Hexagon, 9 diagonals)
    d('#f43f5e',
      `<polygon points="140,18 211,58 211,138 140,178 69,138 69,58" fill="#f43f5e08" stroke="#f43f5e" stroke-width="2.5"/>
       <line x1="140" y1="18" x2="211" y2="138" stroke="#0ea5e9" stroke-width="1.2" opacity="0.7"/>
       <line x1="140" y1="18" x2="140" y2="178" stroke="#0ea5e9" stroke-width="1.2" opacity="0.7"/>
       <line x1="140" y1="18" x2="69" y2="138" stroke="#0ea5e9" stroke-width="1.2" opacity="0.7"/>
       <line x1="211" y1="58" x2="140" y2="178" stroke="#0ea5e9" stroke-width="1.2" opacity="0.7"/>
       <line x1="211" y1="58" x2="69" y2="138" stroke="#0ea5e9" stroke-width="1.2" opacity="0.7"/>
       <line x1="211" y1="58" x2="69" y2="58" stroke="#0ea5e9" stroke-width="1.2" opacity="0.7"/>
       <line x1="211" y1="138" x2="69" y2="58" stroke="#0ea5e9" stroke-width="1.2" opacity="0.7"/>
       <line x1="211" y1="138" x2="69" y2="138" stroke="#0ea5e9" stroke-width="1.2" opacity="0.7"/>
       <line x1="140" y1="178" x2="69" y2="58" stroke="#0ea5e9" stroke-width="1.2" opacity="0.7"/>
       <text x="140" y="196" text-anchor="middle" font-size="12" fill="#64748b">D = 6(6−3)/2 = 9 diagonals</text>`),
  ],
};

// ─── TRIANGLES ───────────────────────────────────────────────────────────────
export const TRI_SKILL_DIAGRAMS = {
  'pythagorean-theorem': [
    // 0: Finding the Hypotenuse (3-4-5)
    d('#0ea5e9',
      `<polygon points="70,165 70,65 190,165" fill="#0ea5e910" stroke="#0ea5e9" stroke-width="2.5"/>
       <rect x="70" y="150" width="15" height="15" fill="none" stroke="#64748b" stroke-width="1.5"/>
       <text x="45" y="118" font-size="14" fill="#0ea5e9" font-weight="700">a=3</text>
       <text x="112" y="186" font-size="14" fill="#0ea5e9" font-weight="700">b=4</text>
       <text x="150" y="108" font-size="13" fill="#f43f5e" font-weight="700" transform="rotate(-40,150,108)">c=5</text>
       <text x="140" y="198" text-anchor="middle" font-size="12" fill="#64748b">c = √(3²+4²) = √25 = 5</text>`),
    // 1: Finding a Missing Leg (5-12-13)
    d('#0ea5e9',
      `<polygon points="65,168 65,48 195,168" fill="#0ea5e910" stroke="#0ea5e9" stroke-width="2.5"/>
       <rect x="65" y="153" width="15" height="15" fill="none" stroke="#64748b" stroke-width="1.5"/>
       <text x="30" y="112" font-size="14" fill="#f43f5e" font-weight="700">a=?</text>
       <text x="110" y="188" font-size="14" fill="#0ea5e9" font-weight="700">b=12</text>
       <text x="148" y="100" font-size="13" fill="#0ea5e9" font-weight="700" transform="rotate(-43,148,100)">c=13</text>
       <text x="140" y="198" text-anchor="middle" font-size="12" fill="#64748b">a = √(13²−12²) = 5</text>`),
    // 2: Checking for a Right Triangle (6-8-10)
    d('#0ea5e9',
      `<polygon points="70,165 70,85 190,165" fill="#0ea5e910" stroke="#0ea5e9" stroke-width="2.5"/>
       <rect x="70" y="150" width="15" height="15" fill="none" stroke="#64748b" stroke-width="1.5"/>
       <text x="42" y="128" font-size="14" fill="#0ea5e9" font-weight="700">6</text>
       <text x="112" y="184" font-size="14" fill="#0ea5e9" font-weight="700">8</text>
       <text x="148" y="117" font-size="14" fill="#f43f5e" font-weight="700" transform="rotate(-34,148,117)">10</text>
       <text x="140" y="198" text-anchor="middle" font-size="12" fill="#10b981" font-weight="700">36+64=100 ✓ Right triangle!</text>`),
  ],
  'triangle-area': [
    // 0: Base × Height Formula
    d('#10b981',
      `<polygon points="90,165 240,165 170,60" fill="#10b98115" stroke="#10b981" stroke-width="2.5"/>
       <line x1="170" y1="60" x2="170" y2="165" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5,4"/>
       <rect x="170" y="150" width="12" height="12" fill="none" stroke="#f43f5e" stroke-width="1.5"/>
       <text x="174" y="115" font-size="13" fill="#f43f5e" font-weight="700">h=6</text>
       <text x="148" y="184" font-size="13" fill="#10b981" font-weight="700">b=10</text>
       <text x="140" y="198" text-anchor="middle" font-size="12" fill="#64748b">A = ½ × 10 × 6 = 30</text>`),
    // 1: Finding Height from Area
    d('#10b981',
      `<polygon points="65,165 235,165 128,68" fill="#10b98115" stroke="#10b981" stroke-width="2.5"/>
       <line x1="128" y1="68" x2="128" y2="165" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5,4"/>
       <rect x="128" y="150" width="12" height="12" fill="none" stroke="#f43f5e" stroke-width="1.5"/>
       <text x="132" y="120" font-size="13" fill="#f43f5e" font-weight="700">h=?</text>
       <text x="130" y="184" text-anchor="middle" font-size="13" fill="#10b981" font-weight="700">b=8</text>
       <text x="50" y="118" font-size="13" fill="#0ea5e9" font-weight="700">A=24</text>
       <text x="140" y="198" text-anchor="middle" font-size="12" fill="#64748b">h = 2×24÷8 = 6</text>`),
  ],
  'angle-sum': [
    // 0: Angle Sum Property
    d('#f59e0b',
      `<polygon points="140,28 48,165 232,165" fill="#f59e0b10" stroke="#f59e0b" stroke-width="2.5"/>
       <path d="M 130,43 A 18,18 0 0,1 150,43" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="4,3"/>
       <path d="M 66,165 A 18,18 0 0,0 58,150" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="4,3"/>
       <path d="M 214,165 A 18,18 0 0,1 222,150" fill="none" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="4,3"/>
       <text x="130" y="22" font-size="14" fill="#f59e0b" font-weight="700">60°</text>
       <text x="28" y="180" font-size="14" fill="#0ea5e9" font-weight="700">50°</text>
       <text x="216" y="180" font-size="14" fill="#f43f5e" font-weight="700">70°</text>
       <text x="140" y="197" text-anchor="middle" font-size="12" fill="#64748b">50° + 70° + 60° = 180°</text>`),
    // 1: Isosceles Angles
    d('#f59e0b',
      `<polygon points="140,28 52,165 228,165" fill="#f59e0b10" stroke="#f59e0b" stroke-width="2.5"/>
       <line x1="88" y1="96" x2="100" y2="103" stroke="#f59e0b" stroke-width="2"/>
       <line x1="92" y1="90" x2="104" y2="97" stroke="#f59e0b" stroke-width="2"/>
       <line x1="180" y1="103" x2="192" y2="96" stroke="#f59e0b" stroke-width="2"/>
       <line x1="176" y1="97" x2="188" y2="90" stroke="#f59e0b" stroke-width="2"/>
       <text x="130" y="22" font-size="13" fill="#f43f5e" font-weight="700">80°</text>
       <text x="32" y="180" font-size="13" fill="#f59e0b" font-weight="700">50°</text>
       <text x="212" y="180" font-size="13" fill="#f59e0b" font-weight="700">50°</text>
       <text x="140" y="197" text-anchor="middle" font-size="12" fill="#64748b">Base = (180°−80°)/2 = 50°</text>`),
    // 2: Exterior Angle Theorem — Triangle A(72,162) B(142,60) C(202,162) ext-D(256,162)
    d('#f59e0b',
      `<polygon points="72,162 202,162 142,60" fill="#f59e0b10" stroke="#f59e0b" stroke-width="2"/>
       <line x1="202" y1="162" x2="256" y2="162" stroke="#f43f5e" stroke-width="2.5"/>
       <path d="M 92,162 A 20,20 0 0,0 83,146" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="4,3"/>
       <path d="M 131,76 A 20,20 0 0,1 153,77" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="4,3"/>
       <path d="M 222,162 A 20,20 0 0,0 192,145" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4,3"/>
       <text x="80" y="156" font-size="12" fill="#0ea5e9" font-weight="700">40°</text>
       <text x="132" y="54" font-size="12" fill="#f59e0b" font-weight="700">65°</text>
       <text x="222" y="155" font-size="12" fill="#f43f5e" font-weight="700">105°</text>
       <text x="140" y="194" text-anchor="middle" font-size="12" fill="#64748b">ext.∠ = 40° + 65° = 105°</text>`),
  ],
  'congruence-similarity': [
    // 0: Congruence Rules (SAS example)
    d('#8b5cf6',
      `<polygon points="38,162 38,62 128,162" fill="#8b5cf610" stroke="#8b5cf6" stroke-width="2"/>
       <polygon points="168,62 258,62 258,162" fill="#8b5cf620" stroke="#8b5cf6" stroke-width="2"/>
       <rect x="38" y="147" width="12" height="12" fill="none" stroke="#64748b" stroke-width="1.5"/>
       <rect x="246" y="62" width="12" height="12" fill="none" stroke="#64748b" stroke-width="1.5"/>
       <line x1="76" y1="112" x2="85" y2="104" stroke="#f43f5e" stroke-width="2.5"/>
       <line x1="82" y1="120" x2="91" y2="112" stroke="#f43f5e" stroke-width="2.5"/>
       <line x1="206" y1="112" x2="215" y2="104" stroke="#f43f5e" stroke-width="2.5"/>
       <line x1="212" y1="120" x2="221" y2="112" stroke="#f43f5e" stroke-width="2.5"/>
       <text x="68" y="192" text-anchor="middle" font-size="12" fill="#8b5cf6" font-weight="700">△ABC</text>
       <text x="213" y="192" text-anchor="middle" font-size="12" fill="#8b5cf6" font-weight="700">△DEF</text>
       <text x="140" y="192" text-anchor="middle" font-size="14" fill="#f43f5e" font-weight="700">≅</text>`),
    // 1: Similarity & Ratios (k=2)
    d('#8b5cf6',
      `<polygon points="42,168 42,108 82,168" fill="#8b5cf610" stroke="#94a3b8" stroke-width="1.5"/>
       <polygon points="118,168 118,48 198,168" fill="#8b5cf625" stroke="#8b5cf6" stroke-width="2.5"/>
       <text x="55" y="150" font-size="10" fill="#64748b">small</text>
       <text x="148" y="122" font-size="11" fill="#8b5cf6">large</text>
       <line x1="40" y1="108" x2="116" y2="48" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="5,4" opacity="0.7"/>
       <line x1="80" y1="168" x2="196" y2="168" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="5,4" opacity="0.7"/>
       <text x="140" y="194" text-anchor="middle" font-size="12" fill="#64748b">All sides in ratio k = 1 : 2</text>`),
  ],
};

// ─── CIRCLES ─────────────────────────────────────────────────────────────────
export const CIR_SKILL_DIAGRAMS = {
  'circumference': [
    // 0: Using Radius
    d('#0ea5e9',
      `<circle cx="140" cy="98" r="70" fill="#0ea5e908" stroke="#0ea5e9" stroke-width="2.5"/>
       <line x1="140" y1="98" x2="210" y2="98" stroke="#f43f5e" stroke-width="2"/>
       <circle cx="140" cy="98" r="4" fill="#f43f5e"/>
       <text x="165" y="90" font-size="13" fill="#f43f5e" font-weight="700">r = 7</text>
       <text x="140" y="188" text-anchor="middle" font-size="12" fill="#64748b">C = 2 × π × 7 ≈ 43.96 cm</text>`),
    // 1: Using Diameter
    d('#0ea5e9',
      `<circle cx="140" cy="98" r="70" fill="#0ea5e908" stroke="#0ea5e9" stroke-width="2.5"/>
       <line x1="70" y1="98" x2="210" y2="98" stroke="#f43f5e" stroke-width="2.5"/>
       <circle cx="70" cy="98" r="4" fill="#f43f5e"/>
       <circle cx="210" cy="98" r="4" fill="#f43f5e"/>
       <text x="118" y="88" font-size="13" fill="#f43f5e" font-weight="700">d = 10</text>
       <text x="140" y="188" text-anchor="middle" font-size="12" fill="#64748b">C = π × 10 ≈ 31.4 cm</text>`),
  ],
  'area': [
    // 0: Area Formula
    d('#f43f5e',
      `<circle cx="140" cy="98" r="70" fill="#f43f5e22" stroke="#f43f5e" stroke-width="2.5"/>
       <line x1="140" y1="98" x2="194" y2="60" stroke="#0ea5e9" stroke-width="2"/>
       <circle cx="140" cy="98" r="4" fill="#0ea5e9"/>
       <text x="159" y="70" font-size="13" fill="#0ea5e9" font-weight="700">r = 5</text>
       <text x="108" y="104" font-size="14" fill="#f43f5e" font-weight="700">A = 78.5</text>
       <text x="140" y="188" text-anchor="middle" font-size="12" fill="#64748b">A = π × 5² = 78.5 cm²</text>`),
    // 1: Finding Radius from Area
    d('#f43f5e',
      `<circle cx="140" cy="98" r="70" fill="#f43f5e12" stroke="#f43f5e" stroke-width="2.5"/>
       <line x1="140" y1="98" x2="194" y2="60" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,4"/>
       <circle cx="140" cy="98" r="4" fill="#0ea5e9"/>
       <text x="159" y="70" font-size="13" fill="#0ea5e9" font-weight="700">r = ?</text>
       <text x="106" y="104" font-size="13" fill="#f43f5e" font-weight="700">A = 78.5</text>
       <text x="140" y="188" text-anchor="middle" font-size="12" fill="#64748b">r = √(78.5÷π) = 5 cm</text>`),
  ],
  'arc-sector': [
    // 0: Arc Length
    d('#8b5cf6',
      `<circle cx="140" cy="108" r="72" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
       <path d="M 140,108 L 212,108 A 72,72 0 0,0 140,36 Z" fill="#8b5cf612" stroke="#8b5cf6" stroke-width="2"/>
       <path d="M 212,108 A 72,72 0 0,0 140,36" fill="none" stroke="#f43f5e" stroke-width="4"/>
       <path d="M 152,108 A 12,12 0 0,0 140,96" fill="none" stroke="#64748b" stroke-width="1.5"/>
       <text x="155" y="100" font-size="12" fill="#64748b" font-weight="700">90°</text>
       <text x="195" y="65" font-size="12" fill="#f43f5e" font-weight="700">arc</text>
       <text x="140" y="196" text-anchor="middle" font-size="12" fill="#64748b">l = (90/360) × 2πr</text>`),
    // 1: Sector Area
    d('#8b5cf6',
      `<circle cx="140" cy="108" r="72" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
       <path d="M 140,108 L 212,108 A 72,72 0 0,0 140,36 Z" fill="#8b5cf632" stroke="#8b5cf6" stroke-width="2.5"/>
       <path d="M 152,108 A 12,12 0 0,0 140,96" fill="none" stroke="#64748b" stroke-width="1.5"/>
       <text x="155" y="100" font-size="12" fill="#64748b" font-weight="700">90°</text>
       <text x="178" y="80" font-size="12" fill="#8b5cf6" font-weight="700">sector</text>
       <text x="140" y="196" text-anchor="middle" font-size="12" fill="#64748b">A = (90/360) × πr²</text>`),
  ],
};

// ─── MENSURATION ─────────────────────────────────────────────────────────────
export const MEN_SKILL_DIAGRAMS = {
  'rectangles': [
    // 0: Perimeter
    d('#0ea5e9',
      `<rect x="48" y="58" width="184" height="82" fill="#0ea5e908" stroke="#0ea5e9" stroke-width="2.5"/>
       <text x="140" y="50" text-anchor="middle" font-size="13" fill="#0ea5e9" font-weight="700">l = 10</text>
       <text x="246" y="103" font-size="13" fill="#0ea5e9" font-weight="700">w=4</text>
       <text x="140" y="108" text-anchor="middle" font-size="15" fill="#f43f5e" font-weight="700">P = 28</text>
       <text x="140" y="168" text-anchor="middle" font-size="12" fill="#64748b">P = 2(10+4) = 28 cm</text>`),
    // 1: Area
    d('#0ea5e9',
      `<rect x="48" y="58" width="184" height="82" fill="#0ea5e922" stroke="#0ea5e9" stroke-width="2.5"/>
       <text x="140" y="50" text-anchor="middle" font-size="13" fill="#0ea5e9" font-weight="700">l = 10</text>
       <text x="246" y="103" font-size="13" fill="#0ea5e9" font-weight="700">w=4</text>
       <text x="140" y="108" text-anchor="middle" font-size="15" fill="#f43f5e" font-weight="700">A = 40</text>
       <text x="140" y="168" text-anchor="middle" font-size="12" fill="#64748b">A = 10 × 4 = 40 cm²</text>`),
  ],
  'triangle-area': [
    // 0: Area Formula
    d('#f59e0b',
      `<polygon points="72,165 242,165 132,58" fill="#f59e0b15" stroke="#f59e0b" stroke-width="2.5"/>
       <line x1="132" y1="58" x2="132" y2="165" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5,4"/>
       <rect x="132" y="150" width="13" height="13" fill="none" stroke="#f43f5e" stroke-width="1.5"/>
       <text x="136" y="112" font-size="13" fill="#f43f5e" font-weight="700">h=8</text>
       <text x="140" y="184" text-anchor="middle" font-size="13" fill="#f59e0b" font-weight="700">b = 12</text>
       <text x="140" y="198" text-anchor="middle" font-size="12" fill="#64748b">A = ½ × 12 × 8 = 48 cm²</text>`),
  ],
  'circles': [
    // 0: Area & Circumference
    d('#f43f5e',
      `<circle cx="140" cy="95" r="68" fill="#f43f5e12" stroke="#f43f5e" stroke-width="2.5"/>
       <line x1="140" y1="95" x2="196" y2="68" stroke="#0ea5e9" stroke-width="2"/>
       <circle cx="140" cy="95" r="4" fill="#0ea5e9"/>
       <text x="158" y="70" font-size="13" fill="#0ea5e9" font-weight="700">r=7</text>
       <text x="140" y="186" text-anchor="middle" font-size="11" fill="#64748b">A = 153.86 cm²  ·  C = 43.96 cm</text>`),
  ],
  'cuboids': [
    // 0: Volume
    d('#8b5cf6',
      `<polygon points="55,145 175,145 175,65 55,65" fill="#8b5cf610" stroke="#8b5cf6" stroke-width="2"/>
       <polygon points="55,65 90,32 210,32 175,65" fill="#8b5cf608" stroke="#8b5cf6" stroke-width="1.5"/>
       <polygon points="175,65 210,32 210,112 175,145" fill="#8b5cf608" stroke="#8b5cf6" stroke-width="1.5"/>
       <text x="114" y="110" text-anchor="middle" font-size="14" fill="#8b5cf6" font-weight="700">V = 60</text>
       <text x="55" y="170" font-size="11" fill="#64748b">l=5, w=4, h=3</text>
       <text x="140" y="192" text-anchor="middle" font-size="12" fill="#64748b">V = 5×4×3 = 60 cm³</text>`),
    // 1: Surface Area
    d('#8b5cf6',
      `<polygon points="55,145 175,145 175,65 55,65" fill="#8b5cf618" stroke="#8b5cf6" stroke-width="2"/>
       <polygon points="55,65 90,32 210,32 175,65" fill="#8b5cf622" stroke="#8b5cf6" stroke-width="1.5"/>
       <polygon points="175,65 210,32 210,112 175,145" fill="#8b5cf628" stroke="#8b5cf6" stroke-width="1.5"/>
       <text x="114" y="112" text-anchor="middle" font-size="13" fill="#8b5cf6" font-weight="700">SA = 94</text>
       <text x="140" y="168" text-anchor="middle" font-size="11" fill="#64748b">2(lw + lh + wh)</text>
       <text x="140" y="192" text-anchor="middle" font-size="12" fill="#64748b">SA = 2(20+15+12) = 94 cm²</text>`),
  ],
};

// ─── SOLID GEOMETRY ──────────────────────────────────────────────────────────
export const SOLID_SKILL_DIAGRAMS = {
  'cylinder': [
    // 0: Volume
    d('#0ea5e9',
      `<ellipse cx="140" cy="52" rx="64" ry="17" fill="#0ea5e908" stroke="#0ea5e9" stroke-width="2"/>
       <ellipse cx="140" cy="148" rx="64" ry="17" fill="#0ea5e908" stroke="#0ea5e9" stroke-width="2"/>
       <line x1="76" y1="52" x2="76" y2="148" stroke="#0ea5e9" stroke-width="2"/>
       <line x1="204" y1="52" x2="204" y2="148" stroke="#0ea5e9" stroke-width="2"/>
       <line x1="140" y1="52" x2="204" y2="52" stroke="#f43f5e" stroke-width="2"/>
       <line x1="140" y1="52" x2="140" y2="148" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3"/>
       <circle cx="140" cy="52" r="3" fill="#f43f5e"/>
       <text x="169" y="44" font-size="12" fill="#f43f5e" font-weight="700">r=5</text>
       <text x="143" y="104" font-size="12" fill="#10b981" font-weight="700">h=10</text>
       <text x="140" y="184" text-anchor="middle" font-size="12" fill="#64748b">V = π × 5² × 10 = 785 cm³</text>`),
    // 1: Total Surface Area
    d('#0ea5e9',
      `<ellipse cx="140" cy="52" rx="64" ry="17" fill="#0ea5e922" stroke="#0ea5e9" stroke-width="2"/>
       <ellipse cx="140" cy="148" rx="64" ry="17" fill="#0ea5e922" stroke="#0ea5e9" stroke-width="2"/>
       <rect x="76" y="52" width="128" height="96" fill="#0ea5e910"/>
       <line x1="76" y1="52" x2="76" y2="148" stroke="#0ea5e9" stroke-width="2"/>
       <line x1="204" y1="52" x2="204" y2="148" stroke="#0ea5e9" stroke-width="2"/>
       <text x="105" y="106" font-size="12" fill="#0ea5e9" font-weight="700">2πrh</text>
       <text x="114" y="52" font-size="10" fill="#f43f5e" font-weight="700">πr²</text>
       <text x="114" y="158" font-size="10" fill="#f43f5e" font-weight="700">πr²</text>
       <text x="140" y="184" text-anchor="middle" font-size="12" fill="#64748b">SA = 2πr(r+h) = 471 cm²</text>`),
  ],
  'sphere': [
    // 0: Volume
    d('#ec4899',
      `<circle cx="140" cy="96" r="72" fill="#ec489912" stroke="#ec4899" stroke-width="2.5"/>
       <ellipse cx="140" cy="96" rx="72" ry="20" fill="none" stroke="#ec4899" stroke-width="1.5" stroke-dasharray="5,4"/>
       <line x1="140" y1="96" x2="196" y2="63" stroke="#0ea5e9" stroke-width="2"/>
       <circle cx="140" cy="96" r="4" fill="#0ea5e9"/>
       <text x="160" y="68" font-size="13" fill="#0ea5e9" font-weight="700">r=3</text>
       <text x="140" y="188" text-anchor="middle" font-size="12" fill="#64748b">V = ⁴⁄₃ × π × 3³ ≈ 113 cm³</text>`),
    // 1: Surface Area
    d('#ec4899',
      `<circle cx="140" cy="96" r="72" fill="#ec489930" stroke="#ec4899" stroke-width="2.5"/>
       <ellipse cx="140" cy="96" rx="72" ry="20" fill="none" stroke="#ec4899" stroke-width="1.5" stroke-dasharray="5,4"/>
       <line x1="140" y1="96" x2="196" y2="63" stroke="#0ea5e9" stroke-width="2"/>
       <circle cx="140" cy="96" r="4" fill="#0ea5e9"/>
       <text x="160" y="68" font-size="13" fill="#0ea5e9" font-weight="700">r=3</text>
       <text x="140" y="188" text-anchor="middle" font-size="12" fill="#64748b">SA = 4 × π × 3² ≈ 113 cm²</text>`),
  ],
  'cone': [
    // 0: Volume
    d('#f59e0b',
      `<polygon points="140,28 68,162 212,162" fill="#f59e0b12" stroke="#f59e0b" stroke-width="2"/>
       <ellipse cx="140" cy="162" rx="72" ry="18" fill="#f59e0b08" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,4"/>
       <line x1="140" y1="28" x2="140" y2="162" stroke="#10b981" stroke-width="2" stroke-dasharray="5,3"/>
       <line x1="140" y1="162" x2="212" y2="162" stroke="#f43f5e" stroke-width="2"/>
       <rect x="140" y="150" width="12" height="12" fill="none" stroke="#10b981" stroke-width="1.5"/>
       <text x="143" y="98" font-size="12" fill="#10b981" font-weight="700">h=8</text>
       <text x="162" y="175" font-size="12" fill="#f43f5e" font-weight="700">r=6</text>
       <text x="140" y="196" text-anchor="middle" font-size="12" fill="#64748b">V = ⅓ × π × 6² × 8 ≈ 301 cm³</text>`),
    // 1: Total Surface Area
    d('#f59e0b',
      `<polygon points="140,28 68,162 212,162" fill="#f59e0b12" stroke="#f59e0b" stroke-width="2"/>
       <ellipse cx="140" cy="162" rx="72" ry="18" fill="#f59e0b25" stroke="#f59e0b" stroke-width="2"/>
       <line x1="140" y1="28" x2="212" y2="162" stroke="#0ea5e9" stroke-width="2.5"/>
       <line x1="140" y1="162" x2="212" y2="162" stroke="#f43f5e" stroke-width="2"/>
       <text x="190" y="92" font-size="12" fill="#0ea5e9" font-weight="700" transform="rotate(64,190,92)">l=5</text>
       <text x="162" y="175" font-size="12" fill="#f43f5e" font-weight="700">r=3</text>
       <text x="140" y="196" text-anchor="middle" font-size="12" fill="#64748b">SA = πr(r+l) = π×3×8 ≈ 75 cm²</text>`),
  ],
};

// ─── POLYGONS ─────────────────────────────────────────────────────────────────
export const POLY_SKILL_DIAGRAMS = {
  'rect-square': [
    // 0: Rectangle Formulas (l=8, w=5, diagonal)
    d('#10b981',
      `<rect x="48" y="58" width="160" height="100" fill="#10b98110" stroke="#10b981" stroke-width="2.5"/>
       <line x1="48" y1="58" x2="208" y2="158" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5,4"/>
       <text x="128" y="50" text-anchor="middle" font-size="13" fill="#10b981" font-weight="700">l = 8</text>
       <text x="224" y="112" font-size="13" fill="#10b981" font-weight="700">w=5</text>
       <text x="145" y="122" font-size="12" fill="#f43f5e" font-weight="700">d≈9.4</text>
       <text x="128" y="178" text-anchor="middle" font-size="12" fill="#64748b">d = √(8²+5²) = √89 ≈ 9.4</text>`),
    // 1: Square Formulas (s=6, diagonal=6√2)
    d('#10b981',
      `<rect x="68" y="38" width="144" height="144" fill="#10b98110" stroke="#10b981" stroke-width="2.5"/>
       <line x1="68" y1="38" x2="212" y2="182" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5,4"/>
       <text x="140" y="28" text-anchor="middle" font-size="13" fill="#10b981" font-weight="700">s = 6</text>
       <text x="138" y="88" font-size="12" fill="#f43f5e" font-weight="700" transform="rotate(45,138,88)">6√2</text>
       <text x="140" y="196" text-anchor="middle" font-size="11" fill="#64748b">d = s√2 = 6√2 ≈ 8.49 cm</text>`),
  ],
  'parallelogram': [
    // 0: Area (b=10, h=6)
    d('#8b5cf6',
      `<polygon points="75,162 205,162 238,78 108,78" fill="#8b5cf615" stroke="#8b5cf6" stroke-width="2.5"/>
       <line x1="205" y1="78" x2="205" y2="162" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5,4"/>
       <rect x="193" y="150" width="12" height="12" fill="none" stroke="#f43f5e" stroke-width="1.5"/>
       <text x="140" y="178" text-anchor="middle" font-size="13" fill="#8b5cf6" font-weight="700">b = 10</text>
       <text x="213" y="124" font-size="12" fill="#f43f5e" font-weight="700">h=6</text>
       <text x="140" y="198" text-anchor="middle" font-size="12" fill="#64748b">A = 10 × 6 = 60 cm²</text>`),
    // 1: Perimeter & Angles
    d('#8b5cf6',
      `<polygon points="75,162 205,162 240,78 110,78" fill="#8b5cf610" stroke="#8b5cf6" stroke-width="2.5"/>
       <path d="M 97,162 A 22,22 0 0,0 83,142" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="4,3"/>
       <path d="M 183,162 A 22,22 0 0,1 213,142" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4,3"/>
       <text x="57" y="150" font-size="12" fill="#0ea5e9" font-weight="700">70°</text>
       <text x="214" y="148" font-size="12" fill="#f43f5e" font-weight="700">110°</text>
       <text x="158" y="68" font-size="12" fill="#8b5cf6" font-weight="700" text-anchor="middle">a=8</text>
       <text x="44" y="125" font-size="12" fill="#8b5cf6" font-weight="700">b=5</text>
       <text x="140" y="198" text-anchor="middle" font-size="12" fill="#64748b">P = 2(8+5) = 26 cm</text>`),
  ],
  'rhombus-kite': [
    // 0: Area via Diagonals
    d('#f59e0b',
      `<polygon points="140,22 222,100 140,178 58,100" fill="#f59e0b15" stroke="#f59e0b" stroke-width="2.5"/>
       <line x1="58" y1="100" x2="222" y2="100" stroke="#f43f5e" stroke-width="2"/>
       <line x1="140" y1="22" x2="140" y2="178" stroke="#0ea5e9" stroke-width="2"/>
       <rect x="140" y="100" width="10" height="10" fill="none" stroke="#64748b" stroke-width="1.5"/>
       <text x="122" y="95" font-size="12" fill="#f43f5e" font-weight="700">d₁=10</text>
       <text x="143" y="58" font-size="12" fill="#0ea5e9" font-weight="700">d₂=6</text>
       <text x="140" y="197" text-anchor="middle" font-size="12" fill="#64748b">A = (10×6)/2 = 30 cm²</text>`),
    // 1: Rhombus Perimeter & Properties
    d('#f59e0b',
      `<polygon points="140,22 222,100 140,178 58,100" fill="#f59e0b10" stroke="#f59e0b" stroke-width="2.5"/>
       <line x1="58" y1="100" x2="222" y2="100" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/>
       <line x1="140" y1="22" x2="140" y2="178" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4,3" opacity="0.5"/>
       <rect x="140" y="100" width="10" height="10" fill="none" stroke="#64748b" stroke-width="1.5"/>
       <text x="83" y="60" font-size="12" fill="#f59e0b" font-weight="700">s=7</text>
       <text x="180" y="60" font-size="12" fill="#f59e0b" font-weight="700">s=7</text>
       <text x="83" y="152" font-size="12" fill="#f59e0b" font-weight="700">s=7</text>
       <text x="180" y="152" font-size="12" fill="#f59e0b" font-weight="700">s=7</text>
       <text x="140" y="197" text-anchor="middle" font-size="12" fill="#64748b">P = 4×7 = 28 cm; diags ⊥</text>`),
  ],
  'trapezium': [
    // 0: Trapezium Area
    d('#f43f5e',
      `<polygon points="82,158 198,158 232,72 48,72" fill="#f43f5e12" stroke="#f43f5e" stroke-width="2.5"/>
       <line x1="82" y1="72" x2="82" y2="158" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5,4"/>
       <rect x="82" y="146" width="12" height="12" fill="none" stroke="#0ea5e9" stroke-width="1.5"/>
       <text x="140" y="63" text-anchor="middle" font-size="12" fill="#f43f5e" font-weight="700">a = 6</text>
       <text x="140" y="177" text-anchor="middle" font-size="12" fill="#f43f5e" font-weight="700">b = 12</text>
       <text x="55" y="120" font-size="12" fill="#0ea5e9" font-weight="700">h=5</text>
       <text x="140" y="197" text-anchor="middle" font-size="12" fill="#64748b">A = (6+12)/2 × 5 = 45 cm²</text>`),
    // 1: Quadrilateral Angle Sum — A(68,158) B(210,168) C(242,68) D(78,44)
    d('#f43f5e',
      `<polygon points="68,158 210,168 242,68 78,44" fill="#f43f5e10" stroke="#f43f5e" stroke-width="2.5"/>
       <path d="M 88,159 A 20,20 0 0,0 70,138" fill="none" stroke="#0ea5e9" stroke-width="1.8" stroke-dasharray="4,3"/>
       <path d="M 190,167 A 20,20 0 0,1 216,149" fill="none" stroke="#8b5cf6" stroke-width="1.8" stroke-dasharray="4,3"/>
       <path d="M 236,87 A 20,20 0 0,1 222,65" fill="none" stroke="#f43f5e" stroke-width="1.8" stroke-dasharray="4,3"/>
       <path d="M 76,64 A 20,20 0 0,0 98,47" fill="none" stroke="#10b981" stroke-width="1.8" stroke-dasharray="4,3"/>
       <text x="48" y="155" font-size="13" fill="#0ea5e9" font-weight="700">95°</text>
       <text x="215" y="162" font-size="13" fill="#8b5cf6" font-weight="700">85°</text>
       <text x="245" y="62" font-size="13" fill="#f43f5e" font-weight="700">110°</text>
       <text x="52" y="40" font-size="13" fill="#10b981" font-weight="700">70°</text>
       <text x="140" y="197" text-anchor="middle" font-size="12" fill="#64748b">95+85+110+70 = 360°</text>`),
  ],
};

// ─── TRANSFORMATIONS ──────────────────────────────────────────────────────────
export const TRANS_SKILL_DIAGRAMS = {
  'translation': [
    // 0: Translation Rule — triangle shifted by vector (3,−2)
    d('#06b6d4', `<defs><marker id="ta" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#f59e0b"/></marker></defs>
       <line x1="45" y1="115" x2="235" y2="115" stroke="#94a3b8" stroke-width="1.5"/>
       <line x1="70" y1="18" x2="70" y2="175" stroke="#94a3b8" stroke-width="1.5"/>
       <text x="232" y="112" font-size="10" fill="#94a3b8">x</text><text x="73" y="16" font-size="10" fill="#94a3b8">y</text>
       <line x1="95" y1="18" x2="95" y2="175" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="120" y1="18" x2="120" y2="175" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="145" y1="18" x2="145" y2="175" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="170" y1="18" x2="170" y2="175" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="195" y1="18" x2="195" y2="175" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="220" y1="18" x2="220" y2="175" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="45" y1="40" x2="235" y2="40" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="45" y1="65" x2="235" y2="65" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="45" y1="90" x2="235" y2="90" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="45" y1="140" x2="235" y2="140" stroke="#e2e8f0" stroke-width="1"/>
       <polygon points="95,40 95,90 120,90" fill="#06b6d415" stroke="#06b6d4" stroke-width="2.5"/>
       <polygon points="170,90 170,140 195,140" fill="#f43f5e10" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5,3"/>
       <line x1="107" y1="63" x2="175" y2="113" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,3" marker-end="url(#ta)"/>
       <text x="73" y="37" font-size="11" fill="#06b6d4" font-weight="700">A(1,3)</text>
       <text x="174" y="87" font-size="11" fill="#f43f5e" font-weight="700">A'(4,1)</text>
       <text x="122" y="82" font-size="11" fill="#f59e0b" font-weight="700">(+3,−2)</text>
       <text x="140" y="193" text-anchor="middle" font-size="11" fill="#64748b">(x,y) → (x+3, y−2)</text>`),
    // 1: Vector Notation — column vector box + component arrows
    d('#06b6d4', `<defs><marker id="tb" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#06b6d4"/></marker></defs>
       <line x1="55" y1="130" x2="250" y2="130" stroke="#94a3b8" stroke-width="1.5"/>
       <line x1="95" y1="15" x2="95" y2="175" stroke="#94a3b8" stroke-width="1.5"/>
       <line x1="145" y1="15" x2="145" y2="175" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="195" y1="15" x2="195" y2="175" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="245" y1="15" x2="245" y2="175" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="55" y1="80" x2="250" y2="80" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="55" y1="180" x2="250" y2="180" stroke="#e2e8f0" stroke-width="1"/>
       <circle cx="145" cy="80" r="4" fill="#06b6d4"/>
       <text x="118" y="76" font-size="11" fill="#06b6d4" font-weight="700">P(1,1)</text>
       <circle cx="245" cy="130" r="4" fill="#f43f5e"/>
       <text x="248" y="128" font-size="11" fill="#f43f5e" font-weight="700">P'(4,0)</text>
       <line x1="145" y1="80" x2="243" y2="129" stroke="#06b6d4" stroke-width="2.5" marker-end="url(#tb)"/>
       <line x1="145" y1="80" x2="245" y2="80" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="4,3"/>
       <line x1="245" y1="80" x2="245" y2="130" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="4,3"/>
       <text x="188" y="74" font-size="12" fill="#8b5cf6" font-weight="700">a=3 →</text>
       <text x="248" y="108" font-size="12" fill="#f43f5e" font-weight="700">b=−1</text>
       <rect x="12" y="68" width="52" height="54" rx="5" fill="#06b6d408" stroke="#06b6d4" stroke-width="1.5"/>
       <text x="38" y="90" text-anchor="middle" font-size="15" fill="#06b6d4" font-weight="700">3</text>
       <line x1="16" y1="98" x2="60" y2="98" stroke="#06b6d4" stroke-width="1"/>
       <text x="38" y="116" text-anchor="middle" font-size="15" fill="#06b6d4" font-weight="700">−1</text>
       <text x="140" y="196" text-anchor="middle" font-size="11" fill="#64748b">Top = horizontal (a), bottom = vertical (b)</text>`),
  ],
  'reflection': [
    // 0: Reflect in axes — P(3,2) → (3,−2) in x-axis, (−3,2) in y-axis
    d('#8b5cf6', `<line x1="20" y1="100" x2="264" y2="100" stroke="#94a3b8" stroke-width="1.5"/>
       <line x1="140" y1="12" x2="140" y2="185" stroke="#94a3b8" stroke-width="1.5"/>
       <text x="260" y="97" font-size="10" fill="#94a3b8">x</text><text x="143" y="12" font-size="10" fill="#94a3b8">y</text>
       <line x1="80" y1="12" x2="80" y2="185" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="200" y1="12" x2="200" y2="185" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="20" y1="40" x2="264" y2="40" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="20" y1="160" x2="264" y2="160" stroke="#e2e8f0" stroke-width="1"/>
       <circle cx="200" cy="40" r="5" fill="#8b5cf6"/>
       <text x="204" y="38" font-size="11" fill="#8b5cf6" font-weight="700">P(3,2)</text>
       <circle cx="200" cy="160" r="5" fill="#0ea5e9"/>
       <text x="204" y="158" font-size="11" fill="#0ea5e9" font-weight="700">P'(3,−2)</text>
       <circle cx="80" cy="40" r="5" fill="#f43f5e"/>
       <text x="16" y="38" font-size="11" fill="#f43f5e" font-weight="700">P''(−3,2)</text>
       <line x1="200" y1="40" x2="200" y2="160" stroke="#0ea5e9" stroke-width="1.5" stroke-dasharray="4,3"/>
       <line x1="200" y1="40" x2="80" y2="40" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="4,3"/>
       <text x="108" y="96" font-size="10" fill="#0ea5e9">x-axis</text>
       <text x="140" y="155" font-size="10" fill="#f43f5e">y-axis</text>
       <text x="140" y="196" text-anchor="middle" font-size="11" fill="#64748b">x-axis: y→−y  ·  y-axis: x→−x</text>`),
    // 1: Reflect in y=x — P(2,4) → P'(4,2); show mirror line y=x
    d('#8b5cf6', `<line x1="20" y1="130" x2="264" y2="130" stroke="#94a3b8" stroke-width="1.5"/>
       <line x1="130" y1="10" x2="130" y2="185" stroke="#94a3b8" stroke-width="1.5"/>
       <text x="260" y="127" font-size="10" fill="#94a3b8">x</text><text x="133" y="10" font-size="10" fill="#94a3b8">y</text>
       <line x1="20" y1="90" x2="264" y2="90" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="20" y1="50" x2="264" y2="50" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="170" y1="10" x2="170" y2="185" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="210" y1="10" x2="210" y2="185" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="90" y1="10" x2="90" y2="185" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="20" y1="170" x2="264" y2="170" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="20" y1="190" x2="264" y2="10" stroke="#8b5cf6" stroke-width="1.8" stroke-dasharray="6,3"/>
       <text x="244" y="18" font-size="12" fill="#8b5cf6" font-weight="700">y=x</text>
       <circle cx="170" cy="50" r="5" fill="#8b5cf6"/>
       <text x="174" y="48" font-size="11" fill="#8b5cf6" font-weight="700">P(2,4)</text>
       <circle cx="210" cy="90" r="5" fill="#f43f5e"/>
       <text x="214" y="88" font-size="11" fill="#f43f5e" font-weight="700">P'(4,2)</text>
       <line x1="170" y1="50" x2="210" y2="90" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="4,3"/>
       <text x="140" y="196" text-anchor="middle" font-size="11" fill="#64748b">y=x: swap coordinates (x,y)→(y,x)</text>`),
  ],
  'rotation': [
    // 0: 90° ACW and 180° — P(3,2)→P'(−2,3) and P''(−3,−2). Origin (140,130), step 18px, r≈65
    d('#f59e0b', `<line x1="20" y1="130" x2="264" y2="130" stroke="#94a3b8" stroke-width="1.5"/>
       <line x1="140" y1="18" x2="140" y2="180" stroke="#94a3b8" stroke-width="1.5"/>
       <text x="260" y="127" font-size="10" fill="#94a3b8">x</text><text x="143" y="26" font-size="10" fill="#94a3b8">y</text>
       <text x="140" y="11" text-anchor="middle" font-size="11" fill="#64748b">90° ACW: (x,y)→(−y,x)  ·  180°: (x,y)→(−x,−y)</text>
       <line x1="104" y1="15" x2="104" y2="180" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="194" y1="15" x2="194" y2="180" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="86" y1="15" x2="86" y2="180" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="20" y1="94" x2="264" y2="94" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="20" y1="76" x2="264" y2="76" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="20" y1="166" x2="264" y2="166" stroke="#e2e8f0" stroke-width="1"/>
       <circle cx="140" cy="130" r="3" fill="#64748b"/>
       <circle cx="194" cy="94" r="5" fill="#f59e0b"/>
       <text x="198" y="92" font-size="11" fill="#f59e0b" font-weight="700">P(3,2)</text>
       <circle cx="104" cy="76" r="5" fill="#06b6d4"/>
       <text x="20" y="74" font-size="11" fill="#06b6d4" font-weight="700">P'(−2,3)</text>
       <circle cx="86" cy="166" r="5" fill="#f43f5e"/>
       <text x="20" y="165" font-size="11" fill="#f43f5e" font-weight="700">P''(−3,−2)</text>
       <path d="M 194,94 A 65,65 0 0,0 104,76" fill="none" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="5,3"/>
       <path d="M 194,94 A 65,65 0 0,1 86,166" fill="none" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="5,3"/>
       <text x="152" y="52" font-size="10" fill="#06b6d4">90° ACW</text>
       <text x="22" y="124" font-size="10" fill="#f43f5e">180°</text>`),
    // 1: 270° ACW — P(3,2)→(2,−3)
    d('#f59e0b', `<line x1="20" y1="100" x2="264" y2="100" stroke="#94a3b8" stroke-width="1.5"/>
       <line x1="140" y1="12" x2="140" y2="185" stroke="#94a3b8" stroke-width="1.5"/>
       <text x="260" y="97" font-size="10" fill="#94a3b8">x</text><text x="143" y="12" font-size="10" fill="#94a3b8">y</text>
       <line x1="200" y1="12" x2="200" y2="185" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="20" y1="40" x2="264" y2="40" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="20" y1="160" x2="264" y2="160" stroke="#e2e8f0" stroke-width="1"/>
       <circle cx="140" cy="100" r="3" fill="#64748b"/>
       <circle cx="200" cy="40" r="5" fill="#f59e0b"/>
       <text x="204" y="38" font-size="11" fill="#f59e0b" font-weight="700">P(3,2)</text>
       <circle cx="200" cy="160" r="5" fill="#f43f5e"/>
       <text x="204" y="158" font-size="11" fill="#f43f5e" font-weight="700">P'(2,−3)</text>
       <path d="M 200,40 A 72,72 0 1,1 200,160" fill="none" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="5,3"/>
       <text x="60" y="96" font-size="10" fill="#f43f5e">270° ACW</text>
       <text x="140" y="196" text-anchor="middle" font-size="11" fill="#64748b">270° ACW = 90° CW: (x,y)→(y,−x)</text>`),
  ],
  'dilation': [
    // 0: Dilation k=2 — triangle (1,1)(3,1)(1,3) → doubled
    d('#f43f5e', `<line x1="30" y1="160" x2="264" y2="160" stroke="#94a3b8" stroke-width="1.5"/>
       <line x1="60" y1="12" x2="60" y2="175" stroke="#94a3b8" stroke-width="1.5"/>
       <text x="260" y="157" font-size="10" fill="#94a3b8">x</text><text x="63" y="12" font-size="10" fill="#94a3b8">y</text>
       <line x1="100" y1="12" x2="100" y2="175" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="140" y1="12" x2="140" y2="175" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="180" y1="12" x2="180" y2="175" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="220" y1="12" x2="220" y2="175" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="30" y1="120" x2="264" y2="120" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="30" y1="80" x2="264" y2="80" stroke="#e2e8f0" stroke-width="1"/>
       <line x1="30" y1="40" x2="264" y2="40" stroke="#e2e8f0" stroke-width="1"/>
       <polygon points="100,120 140,120 100,80" fill="#f43f5e18" stroke="#f43f5e" stroke-width="2.5"/>
       <polygon points="140,80 220,80 140,160" fill="#f43f5e08" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5,3"/>
       <circle cx="60" cy="160" r="3" fill="#64748b"/>
       <text x="62" y="158" font-size="10" fill="#64748b">O</text>
       <text x="102" y="116" font-size="11" fill="#f43f5e" font-weight="700">k=1</text>
       <text x="178" y="76" font-size="11" fill="#f43f5e" font-weight="700">k=2</text>
       <line x1="60" y1="160" x2="220" y2="80" stroke="#64748b" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>
       <line x1="60" y1="160" x2="140" y2="80" stroke="#64748b" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>
       <text x="140" y="194" text-anchor="middle" font-size="11" fill="#64748b">(x,y) → (2x, 2y) from origin O</text>`),
    // 1: Scale factor and lengths. Original(w=90,h=66), Image ×1.25(w=112,h=82)
    d('#f43f5e', `<rect x="14" y="44" width="90" height="66" fill="#f43f5e18" stroke="#f43f5e" stroke-width="2.5"/>
       <rect x="148" y="30" width="112" height="82" fill="#f43f5e08" stroke="#f43f5e" stroke-width="2" stroke-dasharray="5,3"/>
       <text x="59" y="38" text-anchor="middle" font-size="11" fill="#f43f5e" font-weight="700">Original</text>
       <text x="204" y="24" text-anchor="middle" font-size="11" fill="#f43f5e" font-weight="700">Image  (k = 1.25)</text>
       <text x="59" y="74" text-anchor="middle" font-size="13" fill="#f43f5e" font-weight="700">l = 4</text>
       <text x="59" y="92" text-anchor="middle" font-size="12" fill="#0ea5e9" font-weight="700">w = 3</text>
       <text x="204" y="66" text-anchor="middle" font-size="13" fill="#f43f5e" font-weight="700">l' = 5</text>
       <text x="204" y="84" text-anchor="middle" font-size="12" fill="#0ea5e9" font-weight="700">w' = 3.75</text>
       <text x="59" y="126" text-anchor="middle" font-size="11" fill="#64748b">P = 14 cm</text>
       <text x="204" y="126" text-anchor="middle" font-size="11" fill="#64748b">P' = 17.5 cm</text>
       <line x1="14" y1="144" x2="260" y2="144" stroke="#f59e0b" stroke-width="2"/>
       <text x="137" y="158" text-anchor="middle" font-size="12" fill="#f59e0b" font-weight="700">× k = 1.25  →  lengths scale by k</text>
       <text x="137" y="176" text-anchor="middle" font-size="12" fill="#0ea5e9" font-weight="700">Area scales by k² = 1.5625</text>
       <text x="137" y="193" text-anchor="middle" font-size="11" fill="#64748b">Length × k  ·  Area × k²</text>`),
  ],
};
