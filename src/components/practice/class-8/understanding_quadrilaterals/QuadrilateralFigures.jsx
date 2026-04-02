import React from 'react';

/* ─── Wrapper ─────────────────────────────────────────────── */
function SvgWrap({ title, caption, children, accent = '#0f766e', compact = false }) {
    return (
        <div style={{
            background: `linear-gradient(145deg,#ffffff 60%,${accent}0a 100%)`,
            borderRadius: 20, border: `2px solid ${accent}28`,
            boxShadow: `0 6px 28px ${accent}14,0 2px 8px rgba(15,23,42,.05)`,
            padding: compact ? '12px 14px' : '18px 20px',
            position: 'relative', overflow: 'hidden',
        }}>
            <div style={{ position:'absolute',top:-20,right:-20,width:80,height:80,borderRadius:'50%',background:`${accent}08`,pointerEvents:'none' }} />
            {title && <div style={{ fontSize:10,fontWeight:800,color:accent,textTransform:'uppercase',letterSpacing:1.4,marginBottom:8 }}>{title}</div>}
            <div style={{ background:`linear-gradient(160deg,${accent}0c 0%,transparent 100%)`,borderRadius:12,padding:compact?'6px 8px':'10px 12px' }}>
                {children}
            </div>
            {caption && <div style={{ marginTop:10,fontSize:11.5,lineHeight:1.55,color:'#475569',fontWeight:600,borderTop:`1px dashed ${accent}22`,paddingTop:8 }}>{caption}</div>}
        </div>
    );
}

/* ─── SVG Primitives ──────────────────────────────────────── */
function L({ x, y, t, c='#1e293b', s=12, a='start' }) {
    return <text x={x} y={y} fill={c} fontSize={s} fontWeight="700" textAnchor={a} fontFamily="Inter,system-ui,sans-serif">{t}</text>;
}
function Dot({ x, y, fill='#1e293b', r=4.5 }) { return <circle cx={x} cy={y} r={r} fill={fill} />; }

/* Equal-side tick at midpoint */
function Tick({ x1,y1,x2,y2,n=1,c='#374151' }) {
    const mx=(x1+x2)/2,my=(y1+y2)/2,dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy)||1;
    const nx=-dy/len*7,ny=dx/len*7,ux=dx/len,uy=dy/len;
    return <g>{Array.from({length:n},(_,i)=>{const o=(i-(n-1)/2)*6;return<line key={i} x1={mx+nx+ux*o} y1={my+ny+uy*o} x2={mx-nx+ux*o} y2={my-ny+uy*o} stroke={c} strokeWidth="2.5" strokeLinecap="round"/>})}</g>;
}

/* Parallel chevron at midpoint */
function Para({ x1,y1,x2,y2,n=1,c='#7c3aed' }) {
    const mx=(x1+x2)/2,my=(y1+y2)/2,dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy)||1;
    const ux=dx/len,uy=dy/len,px=-uy*5,py=ux*5;
    return <g>{Array.from({length:n},(_,i)=>{const o=(i-(n-1)/2)*7,cx=mx+ux*o,cy=my+uy*o;return<polyline key={i} points={`${cx-ux*5+px},${cy-uy*5+py} ${cx+ux*5},${cy+uy*5} ${cx-ux*5-px},${cy-uy*5-py}`} fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>})}</g>;
}

/* Right-angle box — corner at (x,y), arms go in +dx and +dy */
function RBox({ x,y,dx=10,dy=10,c='#475569' }) {
    return <path d={`M${x+dx},${y} L${x+dx},${y+dy} L${x},${y+dy}`} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"/>;
}

/* Arc for angle */
function Arc({ cx,cy,r=22,start,end,c='#f59e0b',sw=3 }) {
    const s=start*Math.PI/180,e=end*Math.PI/180;
    const x1=cx+r*Math.cos(s),y1=cy+r*Math.sin(s);
    const x2=cx+r*Math.cos(e),y2=cy+r*Math.sin(e);
    const laf=Math.abs(end-start)>180?1:0;
    return <path d={`M${x1},${y1} A${r},${r} 0 ${laf} 1 ${x2},${y2}`} fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round"/>;
}

/* ─── Chapter Hero ────────────────────────────────────────── */
export function ChapterHeroFigure() {
    return (
        <SvgWrap title="Chapter Road Map" accent="#0f766e" caption="The chapter flows: plane curves → polygons → angle sums → quadrilateral families.">
            <svg viewBox="0 0 320 218" width="100%" height="218">
                {/* Plane Curves */}
                <rect x="100" y="8" width="120" height="34" rx="17" fill="#ecfdf5" stroke="#0f766e" strokeWidth="2.5"/>
                <text x="160" y="30" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="800" fontFamily="Inter,sans-serif">Plane Curves</text>
                <line x1="160" y1="42" x2="160" y2="62" stroke="#94a3b8" strokeWidth="2"/>
                <polygon points="155,59 160,68 165,59" fill="#94a3b8"/>

                {/* Polygons */}
                <rect x="100" y="68" width="120" height="34" rx="17" fill="#eff6ff" stroke="#1e40af" strokeWidth="2.5"/>
                <text x="160" y="90" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="800" fontFamily="Inter,sans-serif">Polygons</text>

                {/* Angle sums side branch */}
                <line x1="220" y1="85" x2="248" y2="85" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="4 3"/>
                <rect x="249" y="74" width="64" height="24" rx="12" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2"/>
                <text x="281" y="90" textAnchor="middle" fill="#6d28d9" fontSize="10" fontWeight="700" fontFamily="Inter,sans-serif">Angle Sums</text>

                <line x1="160" y1="102" x2="160" y2="124" stroke="#94a3b8" strokeWidth="2"/>
                <polygon points="155,121 160,130 165,121" fill="#94a3b8"/>

                {/* Quadrilaterals */}
                <rect x="90" y="130" width="140" height="34" rx="17" fill="#fefce8" stroke="#ca8a04" strokeWidth="2.5"/>
                <text x="160" y="152" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="800" fontFamily="Inter,sans-serif">Quadrilaterals</text>

                {/* Fan to 3 families */}
                <line x1="116" y1="164" x2="60" y2="184" stroke="#cbd5e1" strokeWidth="2"/>
                <line x1="160" y1="164" x2="160" y2="184" stroke="#cbd5e1" strokeWidth="2"/>
                <line x1="204" y1="164" x2="260" y2="184" stroke="#cbd5e1" strokeWidth="2"/>

                <rect x="14" y="184" width="92" height="24" rx="12" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.8"/>
                <text x="60" y="200" textAnchor="middle" fill="#b91c1c" fontSize="9.5" fontWeight="700" fontFamily="Inter,sans-serif">Trapezium · Kite</text>

                <rect x="112" y="184" width="96" height="24" rx="12" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.8"/>
                <text x="160" y="200" textAnchor="middle" fill="#1e40af" fontSize="9.5" fontWeight="700" fontFamily="Inter,sans-serif">Parallelogram</text>

                <rect x="214" y="184" width="92" height="24" rx="12" fill="#fdf4ff" stroke="#a855f7" strokeWidth="1.8"/>
                <text x="260" y="200" textAnchor="middle" fill="#7c3aed" fontSize="9.5" fontWeight="700" fontFamily="Inter,sans-serif">Rhombus·Rect·Sq</text>
            </svg>
        </SvgWrap>
    );
}

/* ─── Intro Figure (5W1H) ─────────────────────────────────── */
export function IntroFigure({ type, color }) {
    const common = { title: 'Quick Figure', accent: color, compact: true };

    if (type === 'what') return (
        <SvgWrap {...common} caption="Quadrilateral ABCD has 4 sides, 4 vertices, and 2 diagonals AC and BD.">
            <svg viewBox="0 0 260 170" width="100%" height="160">
                <polygon points="50,132 92,38 202,54 216,128" fill={`${color}18`} stroke={color} strokeWidth="3" strokeLinejoin="round"/>
                <line x1="50" y1="132" x2="202" y2="54" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="7 4"/>
                <line x1="92" y1="38" x2="216" y2="128" stroke="#be185d" strokeWidth="2.5" strokeDasharray="7 4"/>
                <Dot x={50} y={132} fill={color}/><Dot x={92} y={38} fill={color}/><Dot x={202} y={54} fill={color}/><Dot x={216} y={128} fill={color}/>
                <L x={36} y={148} t="A" c={color}/><L x={85} y={32} t="B" c={color}/><L x={206} y={48} t="C" c={color}/><L x={220} y={145} t="D" c={color}/>
                <L x={100} y={100} t="AC" c="#7c3aed" s={11}/><L x={154} y={114} t="BD" c="#be185d" s={11}/>
            </svg>
        </SvgWrap>
    );

    if (type === 'when') return (
        <SvgWrap {...common} caption="Each interior angle at A, B, C, D adds up to 360°.">
            <svg viewBox="0 0 260 170" width="100%" height="160">
                <polygon points="56,126 94,48 192,44 216,124" fill={`${color}15`} stroke={color} strokeWidth="3"/>
                <Arc cx={56} cy={126} r={28} start={-62} end={2} c="#f59e0b"/>
                <Arc cx={94} cy={48} r={26} start={12} end={86} c="#ef4444"/>
                <Arc cx={192} cy={44} r={26} start={94} end={168} c="#10b981"/>
                <Arc cx={216} cy={124} r={28} start={172} end={248} c="#3b82f6"/>
                <L x={95} y={116} t="a" c="#f59e0b" s={13} a="middle"/><L x={120} y={82} t="b" c="#ef4444" s={13} a="middle"/>
                <L x={170} y={82} t="c" c="#10b981" s={13} a="middle"/><L x={190} y={116} t="d" c="#3b82f6" s={13} a="middle"/>
                <L x={130} y={155} t="a + b + c + d = 360°" c="#1e293b" s={14} a="middle"/>
            </svg>
        </SvgWrap>
    );

    if (type === 'how') return (
        <SvgWrap {...common} caption="Diagonal AC splits the quadrilateral into 2 triangles — each with angle sum 180°.">
            <svg viewBox="0 0 260 170" width="100%" height="160">
                <polygon points="52,126 94,42 200,58 218,128" fill="none" stroke={color} strokeWidth="3"/>
                <line x1="52" y1="126" x2="200" y2="58" stroke="#1e293b" strokeWidth="2.5"/>
                <polygon points="52,126 94,42 200,58" fill="#bae6fd" opacity="0.7"/>
                <polygon points="52,126 200,58 218,128" fill="#fde68a" opacity="0.7"/>
                <L x={92} y={86} t="△₁" c="#0369a1" s={13}/><L x={152} y={112} t="△₂" c="#b45309" s={13}/>
                <L x={92} y={100} t="180°" c="#0369a1" s={10}/><L x={152} y={126} t="180°" c="#b45309" s={10}/>
            </svg>
        </SvgWrap>
    );

    if (type === 'where') return (
        <SvgWrap {...common} caption="Quadrilaterals appear as books, floor tiles, road signs, and kite shapes.">
            <svg viewBox="0 0 260 192" width="100%" height="182">
                <rect x="22" y="22" width="58" height="82" rx="5" fill="#dbeafe" stroke={color} strokeWidth="2.5"/>
                <rect x="96" y="28" width="56" height="56" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5"/>
                <polygon points="186,26 232,26 220,100 172,100" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5"/>
                <polygon points="148,112 176,138 148,154 120,138" fill="#fce7f3" stroke="#be185d" strokeWidth="2.5"/>
                <L x={30} y={116} t="Book" c="#1e40af" s={11}/>
                <L x={100} y={96} t="Tile" c="#166534" s={11}/>
                <L x={178} y={114} t="Sign" c="#92400e" s={11}/>
                <L x={148} y={172} t="Kite" c="#9d174d" s={11} a="middle"/>
            </svg>
        </SvgWrap>
    );

    // 'why' — concept Venn
    return (
        <SvgWrap {...common} caption="Understanding quadrilaterals links shape recognition, angle reasoning, and classification.">
            <svg viewBox="0 0 260 170" width="100%" height="160">
                <circle cx="62" cy="84" r="44" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2.5" opacity="0.9"/>
                <circle cx="130" cy="84" r="44" fill="#dbeafe" stroke="#2563eb" strokeWidth="2.5" opacity="0.9"/>
                <circle cx="198" cy="84" r="44" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" opacity="0.9"/>
                <L x={62} y={80} t="Shapes" c="#9f1239" s={11} a="middle"/><L x={62} y={94} t="& Sides" c="#9f1239" s={10} a="middle"/>
                <L x={130} y={80} t="Angles" c="#1d4ed8" s={11} a="middle"/><L x={130} y={94} t="& Sums" c="#1d4ed8" s={10} a="middle"/>
                <L x={198} y={80} t="Class-" c="#166534" s={11} a="middle"/><L x={198} y={94} t="ifi­cation" c="#166534" s={10} a="middle"/>
            </svg>
        </SvgWrap>
    );
}

/* ─── Term Figure ─────────────────────────────────────────── */
export function TermFigure({ term, color }) {
    switch (term) {
        case 'Plane Curve': return (
            <SvgWrap title="Figure" accent={color} compact caption="A curve traced without lifting the pencil — it may be open or closed, simple or self-intersecting.">
                <svg viewBox="0 0 270 155" width="100%" height="145">
                    {/* Open S-curve — contained in left half (x 22–114) */}
                    <path d="M24,118 C50,40 88,36 112,80" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
                    <Dot x={24} y={118} fill={color} r={4}/><Dot x={112} y={80} fill={color} r={4}/>
                    <L x={18} y={140} t="Open curve" c={color} s={11}/>
                    {/* Divider */}
                    <line x1="132" y1="22" x2="132" y2="148" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 3"/>
                    {/* Closed ellipse — right half (x 148–232), no overlap */}
                    <ellipse cx="190" cy="88" rx="44" ry="30" fill={`${color}12`} stroke="#2563eb" strokeWidth="3"/>
                    <L x={152} y={138} t="Closed curve" c="#1d4ed8" s={11}/>
                </svg>
            </SvgWrap>
        );

        case 'Polygon': return (
            <SvgWrap title="Figure" accent={color} compact caption="A polygon is a simple closed figure made entirely of line segments — its sides.">
                <svg viewBox="0 0 240 155" width="100%" height="145">
                    <polygon points="120,18 192,68 164,146 76,146 48,68" fill={`${color}18`} stroke={color} strokeWidth="3" strokeLinejoin="round"/>
                    <Dot x={120} y={18} fill={color}/><Dot x={192} y={68} fill={color}/>
                    <Dot x={164} y={146} fill={color}/><Dot x={76} y={146} fill={color}/><Dot x={48} y={68} fill={color}/>
                    <L x={120} y={12} t="A" c={color} a="middle"/><L x={196} y={68} t="B" c={color}/>
                    <L x={166} y={152} t="C" c={color}/><L x={62} y={152} t="D" c={color}/>
                    <L x={30} y={70} t="E" c={color}/>
                    <L x={120} y={96} t="Pentagon" c={color} s={13} a="middle"/>
                </svg>
            </SvgWrap>
        );

        case 'Diagonal': return (
            <SvgWrap title="Figure" accent={color} compact caption="A diagonal joins two non-consecutive vertices. Quadrilateral ABCD has diagonals AC and BD.">
                <svg viewBox="0 0 240 155" width="100%" height="145">
                    <polygon points="44,120 88,36 188,44 204,124" fill={`${color}12`} stroke={color} strokeWidth="3"/>
                    <line x1="44" y1="120" x2="188" y2="44" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="7 4"/>
                    <line x1="88" y1="36" x2="204" y2="124" stroke="#be185d" strokeWidth="2.5" strokeDasharray="7 4"/>
                    <Dot x={44} y={120} fill={color}/><Dot x={88} y={36} fill={color}/>
                    <Dot x={188} y={44} fill={color}/><Dot x={204} y={124} fill={color}/>
                    <L x={28} y={136} t="A" c={color}/><L x={80} y={30} t="B" c={color}/>
                    <L x={190} y={38} t="C" c={color}/><L x={208} y={140} t="D" c={color}/>
                    <L x={100} y={84} t="AC" c="#7c3aed" s={12}/><L x={142} y={104} t="BD" c="#be185d" s={12}/>
                </svg>
            </SvgWrap>
        );

        case 'Convex Polygon': return (
            <SvgWrap title="Figure" accent={color} compact caption="Every interior angle < 180° and every diagonal lies fully inside the polygon.">
                <svg viewBox="0 0 240 155" width="100%" height="145">
                    <polygon points="120,16 190,64 168,146 72,146 50,64" fill={`${color}15`} stroke={color} strokeWidth="3"/>
                    {/* all diagonals */}
                    {[[120,16,168,146],[120,16,72,146],[190,64,72,146],[190,64,50,64],[168,146,50,64]].map(([x1,y1,x2,y2],i)=>(
                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`${color}60`} strokeWidth="1.8" strokeDasharray="5 3"/>
                    ))}
                    <L x={120} y={96} t="All diagonals" c={color} s={11} a="middle"/>
                    <L x={120} y={110} t="inside ✓" c={color} s={11} a="middle"/>
                </svg>
            </SvgWrap>
        );

        case 'Exterior Angle': return (
            <SvgWrap title="Figure" accent={color} compact caption="The exterior angle is formed by one side and the extension of the adjacent side at a vertex.">
                <svg viewBox="0 0 240 155" width="100%" height="145">
                    <polygon points="56,122 112,44 184,116" fill={`${color}12`} stroke={color} strokeWidth="3"/>
                    {/* Extension of side at vertex B=112,44 beyond to C direction */}
                    <line x1="184" y1="116" x2="220" y2="148" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="7 4"/>
                    {/* Interior angle arc at C */}
                    <Arc cx={184} cy={116} r={28} start={-130} end={-30} c={color}/>
                    {/* Exterior angle arc */}
                    <Arc cx={184} cy={116} r={28} start={-30} end={35} c="#2563eb"/>
                    <L x={145} y={104} t="int." c={color} s={11}/>
                    <L x={200} y={108} t="ext." c="#2563eb" s={11}/>
                    <Dot x={56} y={122} fill={color}/><Dot x={112} y={44} fill={color}/><Dot x={184} y={116} fill={color}/>
                    <L x={40} y={138} t="A" c={color}/><L x={106} y={38} t="B" c={color}/><L x={188} y={132} t="C" c={color}/>
                </svg>
            </SvgWrap>
        );

        default: return (  // Parallelogram
            <SvgWrap title="Figure" accent={color} compact caption="AB ∥ DC (teal sides) and BC ∥ AD (blue sides) — both pairs of opposite sides are parallel.">
                <svg viewBox="0 0 245 155" width="100%" height="145">
                    {/* Base fill */}
                    <polygon points="36,128 86,38 208,38 158,128" fill={`${color}12`} stroke="none"/>
                    {/* Pair 1 (slanted): AB and DC — teal */}
                    <line x1={36} y1={128} x2={86} y2={38} stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
                    <line x1={158} y1={128} x2={208} y2={38} stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
                    {/* Pair 2 (horizontal): BC and AD — blue */}
                    <line x1={86} y1={38} x2={208} y2={38} stroke="#0369a1" strokeWidth="3.5" strokeLinecap="round"/>
                    <line x1={36} y1={128} x2={158} y2={128} stroke="#0369a1" strokeWidth="3.5" strokeLinecap="round"/>
                    {/* Single arrow on AB midpoint(61,83): dir(50,-90) rotate≈29° */}
                    <g transform="translate(61,83) rotate(29)"><polyline points="-6,6 0,-7 6,6" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g>
                    {/* Same arrow on DC midpoint(183,83) */}
                    <g transform="translate(183,83) rotate(29)"><polyline points="-6,6 0,-7 6,6" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g>
                    {/* Double arrow on BC midpoint: horizontal, rotate(90) */}
                    <g transform="translate(140,38) rotate(90)"><polyline points="-5,5 0,-6 5,5" fill="none" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g>
                    <g transform="translate(154,38) rotate(90)"><polyline points="-5,5 0,-6 5,5" fill="none" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g>
                    {/* Double arrow on AD midpoint: horizontal, rotate(90) */}
                    <g transform="translate(90,128) rotate(90)"><polyline points="-5,5 0,-6 5,5" fill="none" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g>
                    <g transform="translate(106,128) rotate(90)"><polyline points="-5,5 0,-6 5,5" fill="none" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g>
                    <Dot x={36} y={128} fill={color}/><Dot x={86} y={38} fill={color}/>
                    <Dot x={208} y={38} fill={color}/><Dot x={158} y={128} fill={color}/>
                    <L x={18} y={144} t="A" c={color}/><L x={80} y={32} t="B" c={color}/>
                    <L x={212} y={32} t="C" c={color}/><L x={162} y={144} t="D" c={color}/>
                </svg>
            </SvgWrap>
        );
    }
}

/* ─── Idea Figure (for Terminology Key Ideas) ─────────────── */
export function IdeaFigure({ idea, rule, color }) {

    if (idea === 'Polygon Foundations') {
        if (rule === 'Simple and Closed') return (
            <SvgWrap title="Figure" accent={color} compact caption="A polygon must be simple (non-self-intersecting) and closed. Open or crossing paths are not polygons.">
                <svg viewBox="0 0 240 155" width="100%" height="145">
                    {/* Open path — not a polygon */}
                    <path d="M24,60 L60,28 L96,54 L72,86" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <L x={30} y={104} t="Open ✗" c="#ef4444" s={11}/>
                    {/* Self-intersecting — not a polygon */}
                    <path d="M116,38 L160,90 L116,90 L160,38 Z" fill="none" stroke="#f97316" strokeWidth="2.5"/>
                    <L x={116} y={108} t="Self-cross ✗" c="#f97316" s={11}/>
                    {/* Proper polygon — yes */}
                    <polygon points="196,34 224,62 212,94 178,94 166,62" fill={`${color}18`} stroke={color} strokeWidth="2.5"/>
                    <L x={186} y={112} t="Polygon ✓" c={color} s={11}/>
                    <line x1="105" y1="20" x2="105" y2="120" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <line x1="150" y1="20" x2="150" y2="120" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 3"/>
                </svg>
            </SvgWrap>
        );

        if (rule === 'Convex vs Concave') return (
            <SvgWrap title="Figure" accent={color} compact caption="In a convex polygon every diagonal lies inside. In a concave polygon at least one diagonal goes outside.">
                <svg viewBox="0 0 240 155" width="100%" height="145">
                    {/* Convex */}
                    <polygon points="62,130 38,78 72,34 120,20 156,50 148,130" fill="#dcfce7" stroke={color} strokeWidth="2.5"/>
                    <line x1="62" y1="130" x2="156" y2="50" stroke={`${color}80`} strokeWidth="1.5" strokeDasharray="5 3"/>
                    <L x={82} y={148} t="Convex ✓" c={color} s={11} a="middle"/>
                    {/* Concave */}
                    <polygon points="168,130 160,78 188,50 210,78 202,50 232,78 224,130" fill="#fee2e2" stroke="#ef4444" strokeWidth="2.5"/>
                    <line x1="168" y1="130" x2="232" y2="78" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.7"/>
                    <L x={200} y={148} t="Concave ✗" c="#ef4444" s={11} a="middle"/>
                    <line x1="148" y1="18" x2="148" y2="140" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 3"/>
                </svg>
            </SvgWrap>
        );

        if (rule === 'Regular vs Irregular') return (
            <SvgWrap title="Figure" accent={color} compact caption="A regular polygon is equilateral and equiangular. An irregular polygon has unequal sides or angles.">
                <svg viewBox="0 0 240 155" width="100%" height="145">
                    {/* Regular hexagon */}
                    <polygon points="76,28 114,8 152,28 152,68 114,88 76,68" fill={`${color}18`} stroke={color} strokeWidth="2.5"/>
                    <Tick x1={76} y1={28} x2={114} y2={8} n={1} c={color}/>
                    <Tick x1={114} y1={8} x2={152} y2={28} n={1} c={color}/>
                    <Tick x1={152} y1={28} x2={152} y2={68} n={1} c={color}/>
                    <Tick x1={76} y1={68} x2={76} y2={28} n={1} c={color}/>
                    <L x={114} y={56} t="Regular" c={color} s={12} a="middle"/>
                    {/* Irregular */}
                    <polygon points="172,20 214,12 236,48 218,84 176,90 162,56" fill="#fef2f2" stroke="#ef4444" strokeWidth="2.5"/>
                    <L x={198} y={56} t="Irregular" c="#ef4444" s={12} a="middle"/>
                    <line x1="154" y1="8" x2="154" y2="100" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 3"/>
                </svg>
            </SvgWrap>
        );

        // Classifying by Sides
        return (
            <SvgWrap title="Figure" accent={color} compact caption="Polygons are named by the count of their sides: triangle (3), quadrilateral (4), pentagon (5), hexagon (6).">
                <svg viewBox="0 0 240 155" width="100%" height="145">
                    <polygon points="36,96 60,44 84,96" fill={`${color}20`} stroke={color} strokeWidth="2.5"/>
                    <L x={60} y={116} t="3" c={color} s={11} a="middle"/>
                    <rect x="98" y="52" width="44" height="44" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.5"/>
                    <L x={120} y={114} t="4" c="#2563eb" s={11} a="middle"/>
                    <polygon points="166,44 188,58 180,82 152,82 144,58" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5"/>
                    <L x={166} y={100} t="5" c="#b45309" s={11} a="middle"/>
                    <polygon points="218,54 232,68 228,86 210,92 196,80 198,62" fill="#fdf4ff" stroke="#7c3aed" strokeWidth="2.5"/>
                    <L x={214} y={108} t="6" c="#7c3aed" s={11} a="middle"/>
                </svg>
            </SvgWrap>
        );
    }

    if (idea === 'Angle and Quadrilateral Structure') {
        if (rule === 'Interior Angle Sum') return (
            <SvgWrap title="Figure" accent={color} compact caption="Diagonal AC splits quadrilateral ABCD into 2 triangles. 180° + 180° = 360° proves the angle sum.">
                <svg viewBox="0 0 240 155" width="100%" height="145">
                    <polygon points="34,122 78,36 186,44 206,120" fill="none" stroke={color} strokeWidth="2.5"/>
                    <line x1="34" y1="122" x2="186" y2="44" stroke="#1e293b" strokeWidth="2"/>
                    <polygon points="34,122 78,36 186,44" fill="#bae6fd" opacity="0.75"/>
                    <polygon points="34,122 186,44 206,120" fill="#fde68a" opacity="0.75"/>
                    <L x={78} y={90} t="180°" c="#0369a1" s={12} a="middle"/>
                    <L x={152} y={106} t="180°" c="#b45309" s={12} a="middle"/>
                    <L x={120} y={148} t="Total = 360°" c={color} s={13} a="middle"/>
                </svg>
            </SvgWrap>
        );

        if (rule === 'Exterior Angle Sum') return (
            <SvgWrap title="Figure" accent={color} compact caption="Turning at every vertex while walking the boundary gives one full rotation — exactly 360°.">
                <svg viewBox="0 0 240 155" width="100%" height="145">
                    <polygon points="60,126 46,76 88,34 158,34 196,80 164,130" fill={`${color}15`} stroke={color} strokeWidth="2.5"/>
                    {/* Extensions: Extending each side forward at the vertex */}
                    <line x1="60" y1="126" x2="22" y2="125" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <line x1="46" y1="76" x2="38" y2="48" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <line x1="88" y1="34" x2="118" y2="4" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <line x1="158" y1="34" x2="198" y2="34" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <line x1="196" y1="80" x2="228" y2="118" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3"/>
                    <line x1="164" y1="130" x2="148" y2="160" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3"/>
                    
                    {/* Exterior Arcs aligned to extensions */}
                    <Arc cx={60} cy={126} r={18} start={182} end={254} c="#f59e0b"/>
                    <Arc cx={46} cy={76} r={18} start={254} end={315} c="#ef4444"/>
                    <Arc cx={88} cy={34} r={18} start={315} end={360} c="#10b981"/>
                    <Arc cx={158} cy={34} r={18} start={0} end={50} c="#3b82f6"/>
                    <Arc cx={196} cy={80} r={18} start={50} end={123} c="#8b5cf6"/>
                    <Arc cx={164} cy={130} r={18} start={123} end={182} c="#ec4899"/>
                    
                    <L x={120} y={88} t="360°" c="#1e293b" s={16} a="middle"/>
                    <L x={120} y={106} t="Full turn" c="#64748b" s={11} a="middle"/>
                </svg>
            </SvgWrap>
        );

        if (rule === 'Hierarchy') return (
            <SvgWrap title="Figure" accent={color} compact caption="The square is the most specialised — it is simultaneously a rectangle, rhombus, and parallelogram.">
                <svg viewBox="0 0 240 155" width="100%" height="145">
                    <rect x="14" y="12" width="212" height="130" rx="18" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2.5"/>
                    <L x={120} y={30} t="Parallelogram" c="#0369a1" s={12} a="middle"/>
                    <rect x="30" y="36" width="180" height="94" rx="14" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2"/>
                    <L x={120} y={52} t="Rectangle / Rhombus" c="#92400e" s={11} a="middle"/>
                    <rect x="78" y="60" width="84" height="58" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
                    <L x={120} y={96} t="Square" c="#166534" s={14} a="middle"/>
                </svg>
            </SvgWrap>
        );

        // Classifying by Parallel Sides (replaces "Kinds of Quadrilaterals" which overlaps Skills)
        return (
            <SvgWrap title="Figure" accent={color} compact caption="Parallel-side count determines family: 0 pairs → general, 1 pair → trapezium, 2 pairs → parallelogram.">
                <svg viewBox="0 0 240 155" width="100%" height="145">
                    <polygon points="22,120 52,50 88,120" fill="#fef2f2" stroke="#ef4444" strokeWidth="2.5"/>
                    <L x={55} y={138} t="0 pairs" c="#ef4444" s={10} a="middle"/>
                    <polygon points="104,120 122,56 168,56 190,120" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5"/>
                    <Para x1={122} y1={56} x2={168} y2={56} n={1} c="#b45309"/>
                    <Para x1={104} y1={120} x2={190} y2={120} n={1} c="#b45309"/>
                    <L x={147} y={138} t="1 pair" c="#b45309" s={10} a="middle"/>

                    <polygon points="200,120 216,56 240,56 224,120" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5"/>
                    <Para x1={216} y1={56} x2={240} y2={56} n={2} c="#16a34a"/>
                    <Para x1={200} y1={120} x2={224} y2={120} n={2} c="#16a34a"/>
                    <L x={212} y={138} t="2 pairs" c="#16a34a" s={10} a="middle"/>
                </svg>
            </SvgWrap>
        );
    }

    // default
    return (
        <SvgWrap title="Figure" accent={color} compact caption="Special parallelograms share the base properties but differ in sides, angles, and diagonals.">
            <svg viewBox="0 0 240 155" width="100%" height="145">
                <polygon points="22,124 54,70 94,70 62,124" fill="#fce7f3" stroke="#be185d" strokeWidth="2.5"/>
                <L x={58} y={140} t="Trapezium" c="#be185d" s={10} a="middle"/>
                <polygon points="104,124 124,70 180,70 160,124" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.5"/>
                <Para x1={124} y1={70} x2={180} y2={70} n={1} c="#2563eb"/>
                <Para x1={104} y1={124} x2={160} y2={124} n={1} c="#2563eb"/>
                <L x={142} y={140} t="Parallelogram" c="#2563eb" s={10} a="middle"/>
                <polygon points="186,96 202,70 218,96 202,122" fill="#fdf4ff" stroke="#7c3aed" strokeWidth="2.5"/>
                <L x={202} y={140} t="Kite" c="#7c3aed" s={10} a="middle"/>
            </svg>
        </SvgWrap>
    );
}

/* ─── Skill-Figure Helpers ────────────────────────────────── */
function PolygonsSkillFigure({ topicIndex, color }) {
    if (topicIndex === 0) return <TermFigure term="Plane Curve" color={color}/>;
    if (topicIndex === 1) return <TermFigure term="Polygon" color={color}/>;
    if (topicIndex === 2) return <TermFigure term="Diagonal" color={color}/>;
    if (topicIndex === 3) return <TermFigure term="Convex Polygon" color={color}/>;
    return <IdeaFigure idea="Polygon Foundations" rule="Regular vs Irregular" color={color}/>;
}

function AngleSkillFigure({ topicIndex, color }) {
    if (topicIndex === 0) return <IntroFigure type="when" color={color}/>;
    if (topicIndex === 1) return <IdeaFigure idea="Angle and Quadrilateral Structure" rule="Interior Angle Sum" color={color}/>;
    if (topicIndex === 2) return <IdeaFigure idea="Angle and Quadrilateral Structure" rule="Exterior Angle Sum" color={color}/>;
    // Regular polygon exterior angles
    return (
        <SvgWrap title="Quick Figure" accent={color} compact caption="For a regular n-gon, each exterior angle = 360° ÷ n. A regular hexagon has exterior angles of 60°.">
            <svg viewBox="0 0 250 155" width="100%" height="145">
                <polygon points="126,18 192,56 192,130 126,168 60,130 60,56" fill={`${color}15`} stroke={color} strokeWidth="2.8"/>
                {/* Mark equal sides */}
                <Tick x1={126} y1={18} x2={192} y2={56} n={1} c="#374151"/>
                <Tick x1={192} y1={56} x2={192} y2={130} n={1} c="#374151"/>
                <Tick x1={192} y1={130} x2={126} y2={168} n={1} c="#374151"/>
                <Tick x1={126} y1={168} x2={60} y2={130} n={1} c="#374151"/>
                <Tick x1={60} y1={130} x2={60} y2={56} n={1} c="#374151"/>
                <Tick x1={60} y1={56} x2={126} y2={18} n={1} c="#374151"/>
                {/* Extension at top-right vertex (192,56) of side (126,18)-(192,56) */}
                <line x1={192} y1={56} x2={228} y2={77} stroke="#64748b" strokeWidth="2" strokeDasharray="5 3"/>
                <Arc cx={192} cy={56} r={28} start={30} end={90} c="#ef4444"/>
                <L x={230} y={78} t="60°" c="#ef4444" s={13}/>
                <L x={126} y={100} t="Hexagon" c={color} s={13} a="middle"/>
                <L x={126} y={116} t="360÷6=60°" c="#64748b" s={11} a="middle"/>
            </svg>
        </SvgWrap>
    );
}

function QuadrilateralKindsSkillFigure({ topicIndex, color }) {
    // Topic 0: Trapezium
    if (topicIndex === 0) return (
        <SvgWrap title="Quick Figure" accent={color} compact caption="A trapezium has exactly ONE pair of parallel sides (the bases). The legs are non-parallel.">
            <svg viewBox="0 0 250 155" width="100%" height="145">
                <polygon points="42,124 86,46 174,46 210,124" fill={`${color}15`} stroke={color} strokeWidth="3"/>
                {/* parallel marks on top and bottom only */}
                <Para x1={86} y1={46} x2={174} y2={46} n={1} c="#0369a1"/>
                <Para x1={42} y1={124} x2={210} y2={124} n={1} c="#0369a1"/>
                <Dot x={42} y={124} fill={color}/><Dot x={86} y={46} fill={color}/>
                <Dot x={174} y={46} fill={color}/><Dot x={210} y={124} fill={color}/>
                <L x={28} y={140} t="A" c={color}/><L x={80} y={40} t="B" c={color}/>
                <L x={177} y={40} t="C" c={color}/><L x={214} y={140} t="D" c={color}/>
                <L x={126} y={76} t="BC ∥ AD" c="#0369a1" s={12} a="middle"/>
            </svg>
        </SvgWrap>
    );

    // Topic 1: Kite
    if (topicIndex === 1) return (
        <SvgWrap title="Quick Figure" accent={color} compact caption="A kite has 2 pairs of equal consecutive sides: AB = AD and CB = CD.">
            <svg viewBox="0 0 250 155" width="100%" height="145">
                <polygon points="126,18 200,90 126,152 52,90" fill={`${color}15`} stroke={color} strokeWidth="3"/>
                <line x1="126" y1="18" x2="126" y2="152" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 4"/>
                <Tick x1={126} y1={18} x2={200} y2={90} n={1} c="#0369a1"/>
                <Tick x1={126} y1={18} x2={52} y2={90} n={1} c="#0369a1"/>
                <Tick x1={200} y1={90} x2={126} y2={152} n={2} c="#7c3aed"/>
                <Tick x1={52} y1={90} x2={126} y2={152} n={2} c="#7c3aed"/>
                <Dot x={126} y={18} fill={color}/><Dot x={200} y={90} fill={color}/>
                <Dot x={126} y={152} fill={color}/><Dot x={52} y={90} fill={color}/>
                <L x={126} y={12} t="A" c={color} a="middle"/><L x={206} y={94} t="B" c={color}/>
                <L x={126} y={168} t="C" c={color} a="middle"/><L x={36} y={94} t="D" c={color}/>
            </svg>
        </SvgWrap>
    );

    // Topic 2: Parallelogram
    if (topicIndex === 2) return <TermFigure term="Parallelogram" color={color}/>;

    // Topic 3: Diagonals bisect each other
    if (topicIndex === 3) return (
        <SvgWrap title="Quick Figure" accent={color} compact caption="The diagonals of a parallelogram bisect each other: AO = OC and BO = OD.">
            <svg viewBox="0 0 250 155" width="100%" height="145">
                <polygon points="38,124 84,44 206,44 160,124" fill={`${color}12`} stroke={color} strokeWidth="2.8"/>
                <line x1="38" y1="124" x2="206" y2="44" stroke="#7c3aed" strokeWidth="2.5"/>
                <line x1="84" y1="44" x2="160" y2="124" stroke="#be185d" strokeWidth="2.5"/>
                <Dot x={122} y={84} fill="#1e293b" r={5}/>
                <Tick x1={38} y1={124} x2={122} y2={84} n={1} c="#7c3aed"/>
                <Tick x1={122} y1={84} x2={206} y2={44} n={1} c="#7c3aed"/>
                <Tick x1={84} y1={44} x2={122} y2={84} n={2} c="#be185d"/>
                <Tick x1={122} y1={84} x2={160} y2={124} n={2} c="#be185d"/>
                <L x={128} y={82} t="O" c="#1e293b" s={12}/>
                <L x={22} y={136} t="A" c={color}/><L x={78} y={38} t="B" c={color}/>
                <L x={208} y={38} t="C" c={color}/><L x={162} y={138} t="D" c={color}/>
            </svg>
        </SvgWrap>
    );

    // default — properties summary
    return (
        <SvgWrap title="Quick Figure" accent={color} compact caption="Parallelogram: opposite sides equal and parallel, opposite angles equal, diagonals bisect each other.">
            <svg viewBox="0 0 245 155" width="100%" height="145">
                {/* Base fill */}
                <polygon points="36,128 86,38 208,38 158,128" fill={`${color}12`} stroke="none"/>
                {/* Pair 1 (slanted): AB and DC — teal */}
                <line x1={36} y1={128} x2={86} y2={38} stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
                <line x1={158} y1={128} x2={208} y2={38} stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
                {/* Pair 2 (horizontal): BC and AD — blue */}
                <line x1={86} y1={38} x2={208} y2={38} stroke="#0369a1" strokeWidth="3.5" strokeLinecap="round"/>
                <line x1={36} y1={128} x2={158} y2={128} stroke="#0369a1" strokeWidth="3.5" strokeLinecap="round"/>
                {/* Single arrow on AB midpoint */}
                <g transform="translate(61,83) rotate(29)"><polyline points="-6,6 0,-7 6,6" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g>
                {/* Same arrow on DC midpoint */}
                <g transform="translate(183,83) rotate(29)"><polyline points="-6,6 0,-7 6,6" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g>
                {/* Double arrow on BC midpoint */}
                <g transform="translate(140,38) rotate(90)"><polyline points="-5,5 0,-6 5,5" fill="none" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g>
                <g transform="translate(154,38) rotate(90)"><polyline points="-5,5 0,-6 5,5" fill="none" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g>
                {/* Double arrow on AD midpoint */}
                <g transform="translate(90,128) rotate(90)"><polyline points="-5,5 0,-6 5,5" fill="none" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g>
                <g transform="translate(106,128) rotate(90)"><polyline points="-5,5 0,-6 5,5" fill="none" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g>
                
                {/* Angle arcs indicating equal opposite angles */}
                <Arc cx={36} cy={128} r={22} start={-50} end={20} c="#f59e0b"/>
                <Arc cx={208} cy={38} r={22} start={130} end={200} c="#f59e0b"/>
                
                <Dot x={36} y={128} fill={color}/><Dot x={86} y={38} fill={color}/>
                <Dot x={208} y={38} fill={color}/><Dot x={158} y={128} fill={color}/>
                <L x={18} y={144} t="A" c={color}/><L x={80} y={32} t="B" c={color}/>
                <L x={212} y={32} t="C" c={color}/><L x={162} y={144} t="D" c={color}/>
                <L x={122} y={96} t="∠A = ∠C" c="#f59e0b" s={11} a="middle"/>
            </svg>
        </SvgWrap>
    );
}

function SpecialParallelogramsSkillFigure({ topicIndex, color }) {
    // Topic 0: Rhombus
    if (topicIndex === 0) return (
        <SvgWrap title="Quick Figure" accent={color} compact caption="A rhombus has all 4 sides equal. Its diagonals are perpendicular bisectors of each other.">
            <svg viewBox="0 0 250 155" width="100%" height="145">
                <polygon points="126,18 208,84 126,150 44,84" fill={`${color}15`} stroke={color} strokeWidth="3"/>
                <line x1="126" y1="18" x2="126" y2="150" stroke="#1e293b" strokeWidth="2.5"/>
                <line x1="44" y1="84" x2="208" y2="84" stroke="#1e293b" strokeWidth="2.5"/>
                <Dot x={126} y={84} fill="#1e293b"/>
                <RBox x={126} y={84} dx={10} dy={-10} c="#ef4444"/>
                <Tick x1={126} y1={18} x2={208} y2={84} n={1} c={color}/>
                <Tick x1={208} y1={84} x2={126} y2={150} n={1} c={color}/>
                <Tick x1={126} y1={150} x2={44} y2={84} n={1} c={color}/>
                <Tick x1={44} y1={84} x2={126} y2={18} n={1} c={color}/>
                <L x={142} y={70} t="90°" c="#ef4444" s={11}/>
            </svg>
        </SvgWrap>
    );

    // Topic 1: Rectangle
    if (topicIndex === 1) return (
        <SvgWrap title="Quick Figure" accent={color} compact caption="A rectangle has 4 right angles. Its diagonals are equal in length and bisect each other.">
            <svg viewBox="0 0 250 155" width="100%" height="145">
                <rect x="38" y="32" width="176" height="94" fill={`${color}12`} stroke={color} strokeWidth="3"/>
                <line x1="38" y1="32" x2="214" y2="126" stroke="#7c3aed" strokeWidth="2.5"/>
                <line x1="214" y1="32" x2="38" y2="126" stroke="#be185d" strokeWidth="2.5"/>
                <Dot x={126} y={79} fill="#1e293b"/>
                <RBox x={38} y={126} dx={12} dy={-12} c="#374151"/>
                <RBox x={202} y={126} dx={-12} dy={-12} c="#374151"/>
                <RBox x={38} y={32} dx={12} dy={12} c="#374151"/>
                <RBox x={202} y={32} dx={-12} dy={12} c="#374151"/>
                <L x={126} y={26} t="AC = BD" c={color} s={12} a="middle"/>
            </svg>
        </SvgWrap>
    );

    // Topic 2: Square
    if (topicIndex === 2) return (
        <SvgWrap title="Quick Figure" accent={color} compact caption="A square has 4 equal sides, 4 right angles, and diagonals that are both equal and perpendicular.">
            <svg viewBox="0 0 250 155" width="100%" height="145">
                <rect x="68" y="22" width="114" height="114" fill={`${color}15`} stroke={color} strokeWidth="3"/>
                <line x1="68" y1="22" x2="182" y2="136" stroke="#7c3aed" strokeWidth="2.5"/>
                <line x1="182" y1="22" x2="68" y2="136" stroke="#be185d" strokeWidth="2.5"/>
                <Dot x={125} y={79} fill="#1e293b"/>
                <RBox x={68} y={136} dx={12} dy={-12} c="#374151"/>
                <RBox x={170} y={136} dx={-12} dy={-12} c="#374151"/>
                <RBox x={68} y={22} dx={12} dy={12} c="#374151"/>
                <RBox x={170} y={22} dx={-12} dy={12} c="#374151"/>
                <RBox x={125} y={79} dx={8} dy={-8} c="#ef4444"/>
                <Tick x1={68} y1={22} x2={182} y2={22} n={1} c="#374151"/>
                <Tick x1={182} y1={22} x2={182} y2={136} n={1} c="#374151"/>
                <Tick x1={182} y1={136} x2={68} y2={136} n={1} c="#374151"/>
                <Tick x1={68} y1={136} x2={68} y2={22} n={1} c="#374151"/>
                <L x={140} y={72} t="90°" c="#ef4444" s={11}/>
            </svg>
        </SvgWrap>
    );

    // Topic 3: Hierarchy
    if (topicIndex === 3) return <IdeaFigure idea="Angle and Quadrilateral Structure" rule="Hierarchy" color={color}/>;

    // default — side-by-side comparison
    return (
        <SvgWrap title="Quick Figure" accent={color} compact caption="Rhombus: ⊥ diagonals. Rectangle: equal diagonals. Square: both equal and perpendicular.">
            <svg viewBox="0 0 250 155" width="100%" height="145">
                {/* Rhombus */}
                <polygon points="46,82 68,50 90,82 68,114" fill="#fce7f3" stroke="#be185d" strokeWidth="2.5"/>
                <line x1="46" y1="82" x2="90" y2="82" stroke="#1e293b" strokeWidth="2"/>
                <line x1="68" y1="50" x2="68" y2="114" stroke="#1e293b" strokeWidth="2"/>
                <L x={68} y={136} t="Rhombus" c="#be185d" s={10} a="middle"/>
                {/* Rectangle */}
                <rect x="102" y="50" width="62" height="62" rx="2" fill="#dbeafe" stroke="#2563eb" strokeWidth="2.5"/>
                <line x1="102" y1="50" x2="164" y2="112" stroke="#7c3aed" strokeWidth="2"/>
                <line x1="164" y1="50" x2="102" y2="112" stroke="#be185d" strokeWidth="2"/>
                <L x={133} y={136} t="Rectangle" c="#2563eb" s={10} a="middle"/>
                {/* Square */}
                <rect x="180" y="56" width="52" height="52" rx="2" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5"/>
                <line x1="180" y1="56" x2="232" y2="108" stroke="#7c3aed" strokeWidth="2"/>
                <line x1="232" y1="56" x2="180" y2="108" stroke="#be185d" strokeWidth="2"/>
                <RBox x={206} y={82} dx={7} dy={-7} c="#ef4444"/>
                <L x={206} y={136} t="Square" c="#16a34a" s={10} a="middle"/>
            </svg>
        </SvgWrap>
    );
}

/* ─── Main Export ─────────────────────────────────────────── */
export function SkillFigure({ skillId, topicIndex, color }) {
    if (skillId === 'polygons-classification-diagonals') return <PolygonsSkillFigure topicIndex={topicIndex} color={color}/>;
    if (skillId === 'angle-sum-exterior-angles') return <AngleSkillFigure topicIndex={topicIndex} color={color}/>;
    if (skillId === 'kinds-of-quadrilaterals') return <QuadrilateralKindsSkillFigure topicIndex={topicIndex} color={color}/>;
    return <SpecialParallelogramsSkillFigure topicIndex={topicIndex} color={color}/>;
}
