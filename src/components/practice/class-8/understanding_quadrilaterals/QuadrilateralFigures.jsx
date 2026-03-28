import React from 'react';

function SvgWrap({ title, caption, children, accent = '#0f766e', compact = false }) {
    return (
        <div
            style={{
                background: '#fff',
                borderRadius: 18,
                border: `2px solid ${accent}22`,
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
                padding: compact ? 12 : 16,
            }}
        >
            {title && (
                <div style={{ fontSize: 11, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 8 }}>
                    {title}
                </div>
            )}
            <div style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)', borderRadius: 14, padding: compact ? 8 : 12 }}>
                {children}
            </div>
            {caption && (
                <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.5, color: '#64748b', fontWeight: 600 }}>
                    {caption}
                </div>
            )}
        </div>
    );
}

function Label({ x, y, text, color = '#0f172a', size = 12 }) {
    return <text x={x} y={y} fill={color} fontSize={size} fontWeight="700">{text}</text>;
}

function Dot({ x, y, fill = '#1e293b' }) {
    return <circle cx={x} cy={y} r="4" fill={fill} />;
}

export function ChapterHeroFigure() {
    return (
        <SvgWrap title="Figure Map" caption="The chapter moves from polygons to angle sums and then to quadrilateral families." accent="#34d399">
            <svg viewBox="0 0 320 220" width="100%" height="220" role="img" aria-label="Understanding quadrilaterals concept map">
                <rect x="104" y="16" width="112" height="40" rx="16" fill="#ffffff" stroke="#0f766e" strokeWidth="2.5" />
                <Label x={127} y={40} text="Polygons" color="#0f766e" size={16} />

                <rect x="28" y="92" width="124" height="42" rx="16" fill="#ffffff" stroke="#1e40af" strokeWidth="2.5" />
                <Label x={47} y={118} text="Angle Sums" color="#1e40af" size={15} />

                <rect x="168" y="92" width="124" height="42" rx="16" fill="#ffffff" stroke="#7c3aed" strokeWidth="2.5" />
                <Label x={183} y={118} text="Quadrilaterals" color="#7c3aed" size={15} />

                <rect x="10" y="164" width="92" height="34" rx="14" fill="#ffffff" stroke="#b45309" strokeWidth="2.5" />
                <rect x="114" y="164" width="92" height="34" rx="14" fill="#ffffff" stroke="#be185d" strokeWidth="2.5" />
                <rect x="218" y="164" width="92" height="34" rx="14" fill="#ffffff" stroke="#0369a1" strokeWidth="2.5" />
                <Label x={30} y={185} text="Trapezium" color="#b45309" />
                <Label x={147} y={185} text="Kite" color="#be185d" />
                <Label x={228} y={185} text="Parallelogram" color="#0369a1" />

                <line x1="160" y1="56" x2="90" y2="92" stroke="#94a3b8" strokeWidth="3" />
                <line x1="160" y1="56" x2="230" y2="92" stroke="#94a3b8" strokeWidth="3" />
                <line x1="230" y1="134" x2="56" y2="164" stroke="#cbd5e1" strokeWidth="3" />
                <line x1="230" y1="134" x2="160" y2="164" stroke="#cbd5e1" strokeWidth="3" />
                <line x1="230" y1="134" x2="264" y2="164" stroke="#cbd5e1" strokeWidth="3" />
            </svg>
        </SvgWrap>
    );
}

export function IntroFigure({ type, color }) {
    const common = { title: 'Quick Figure', accent: color, compact: true };

    if (type === 'what') {
        return (
            <SvgWrap {...common} caption="Quadrilaterals are polygons with 4 sides, 4 vertices, and 2 diagonals.">
                <svg viewBox="0 0 260 170" width="100%" height="160">
                    <polygon points="52,125 92,42 194,58 214,128" fill="#e0f2fe" stroke={color} strokeWidth="3" />
                    <line x1="52" y1="125" x2="194" y2="58" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="6 4" />
                    <line x1="92" y1="42" x2="214" y2="128" stroke="#be185d" strokeWidth="2.5" strokeDasharray="6 4" />
                    <Dot x="52" y="125" /><Dot x="92" y="42" /><Dot x="194" y="58" /><Dot x="214" y="128" />
                    <Label x={39} y={141} text="A" /><Label x={84} y={34} text="B" /><Label x={198} y={54} text="C" /><Label x={220} y={141} text="D" />
                    <Label x={117} y={90} text="AC" color="#7c3aed" /><Label x={150} y={105} text="BD" color="#be185d" />
                </svg>
            </SvgWrap>
        );
    }

    if (type === 'when') {
        return (
            <SvgWrap {...common} caption="Quadrilateral angle sum is 360, and polygon angle sums grow by triangles.">
                <svg viewBox="0 0 260 170" width="100%" height="160">
                    <polygon points="58,124 95,52 184,48 214,122" fill="#ede9fe" stroke={color} strokeWidth="3" />
                    <path d="M58 124 A26 26 0 0 1 83 111" fill="none" stroke="#f59e0b" strokeWidth="3" />
                    <path d="M95 52 A24 24 0 0 1 116 66" fill="none" stroke="#ef4444" strokeWidth="3" />
                    <path d="M184 48 A24 24 0 0 1 171 70" fill="none" stroke="#10b981" strokeWidth="3" />
                    <path d="M214 122 A24 24 0 0 1 190 110" fill="none" stroke="#3b82f6" strokeWidth="3" />
                    <Label x={73} y={100} text="a" color="#f59e0b" />
                    <Label x={111} y={59} text="b" color="#ef4444" />
                    <Label x={171} y={62} text="c" color="#10b981" />
                    <Label x={189} y={117} text="d" color="#3b82f6" />
                    <Label x={88} y={150} text="a + b + c + d = 360" color="#1e293b" size={14} />
                </svg>
            </SvgWrap>
        );
    }

    if (type === 'how') {
        return (
            <SvgWrap {...common} caption="A diagonal splits a quadrilateral into 2 triangles, which supports angle reasoning.">
                <svg viewBox="0 0 260 170" width="100%" height="160">
                    <polygon points="54,122 96,44 198,62 216,126" fill="#dcfce7" stroke={color} strokeWidth="3" />
                    <line x1="54" y1="122" x2="198" y2="62" stroke="#0f172a" strokeWidth="2.5" />
                    <polygon points="54,122 96,44 198,62" fill="#bae6fd" opacity="0.65" />
                    <polygon points="54,122 198,62 216,126" fill="#fde68a" opacity="0.65" />
                    <Label x={105} y={78} text="Triangle 1" color="#0369a1" />
                    <Label x={142} y={116} text="Triangle 2" color="#b45309" />
                </svg>
            </SvgWrap>
        );
    }

    if (type === 'where') {
        return (
            <SvgWrap {...common} caption="Quadrilateral shapes appear in books, tiles, signs, and decorative objects.">
                <svg viewBox="0 0 260 170" width="100%" height="160">
                    <rect x="24" y="36" width="64" height="90" rx="6" fill="#dbeafe" stroke={color} strokeWidth="3" />
                    <rect x="108" y="36" width="58" height="58" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
                    <polygon points="188,38 238,38 224,112 174,112" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
                    <polygon points="136,116 164,142 136,156 108,142" fill="#fce7f3" stroke="#be185d" strokeWidth="3" />
                    <Label x={32} y={140} text="Book" color="#1e40af" />
                    <Label x={112} y={108} text="Tile" color="#166534" />
                    <Label x={183} y={128} text="Sign" color="#92400e" />
                </svg>
            </SvgWrap>
        );
    }

    if (type === 'why') {
        return (
            <SvgWrap {...common} caption="The chapter links shape recognition, angle facts, and classification.">
                <svg viewBox="0 0 260 170" width="100%" height="160">
                    <circle cx="62" cy="84" r="28" fill="#ffe4e6" stroke="#e11d48" strokeWidth="3" />
                    <circle cx="130" cy="84" r="28" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
                    <circle cx="198" cy="84" r="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
                    <Label x={43} y={89} text="Shape" color="#9f1239" />
                    <Label x={114} y={89} text="Angle" color="#1d4ed8" />
                    <Label x={172} y={89} text="Logic" color="#166534" />
                    <line x1="90" y1="84" x2="102" y2="84" stroke="#94a3b8" strokeWidth="3" />
                    <line x1="158" y1="84" x2="170" y2="84" stroke="#94a3b8" strokeWidth="3" />
                </svg>
            </SvgWrap>
        );
    }

    return (
        <SvgWrap {...common} caption="Special quadrilaterals are connected through shared properties.">
            <svg viewBox="0 0 260 170" width="100%" height="160">
                <polygon points="28,92 78,92 94,52 44,52" fill="#e0e7ff" stroke={color} strokeWidth="3" />
                <rect x="98" y="52" width="52" height="40" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
                <polygon points="170,72 194,48 218,72 194,96" fill="#fce7f3" stroke="#db2777" strokeWidth="3" />
                <rect x="104" y="112" width="40" height="40" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
                <Label x={22} y={112} text="Para." color={color} size={11} />
                <Label x={102} y={46} text="Rectangle" color="#2563eb" size={11} />
                <Label x={180} y={118} text="Kite" color="#db2777" size={11} />
                <Label x={108} y={166} text="Square" color="#166534" size={11} />
            </svg>
        </SvgWrap>
    );
}

export function TermFigure({ term, color }) {
    switch (term) {
        case 'Plane Curve':
            return (
                <SvgWrap title="Figure" caption="A plane curve may be open, closed, simple, or self-intersecting." accent={color} compact>
                    <svg viewBox="0 0 240 160" width="100%" height="150">
                        <path d="M32 104 C54 42, 88 36, 110 74 S162 130, 204 56" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
                        <path d="M76 120 C94 96, 122 98, 142 120 C126 142, 94 142, 76 120 Z" fill="none" stroke="#2563eb" strokeWidth="4" />
                        <Label x={28} y={24} text="Open curve" color={color} size={13} />
                        <Label x={90} y={152} text="Closed curve" color="#2563eb" size={13} />
                    </svg>
                </SvgWrap>
            );
        case 'Polygon':
            return (
                <SvgWrap title="Figure" caption="A polygon is a simple closed figure made of line segments." accent={color} compact>
                    <svg viewBox="0 0 240 160" width="100%" height="150">
                        <polygon points="60,124 42,78 72,36 130,26 184,54 194,110 152,138" fill="#dcfce7" stroke={color} strokeWidth="3" />
                        <Label x={72} y={151} text="Closed line segments" color={color} size={14} />
                    </svg>
                </SvgWrap>
            );
        case 'Diagonal':
            return (
                <SvgWrap title="Figure" caption="Diagonals connect non-consecutive vertices of a polygon." accent={color} compact>
                    <svg viewBox="0 0 240 160" width="100%" height="150">
                        <polygon points="48,114 88,42 176,50 196,118" fill="#ede9fe" stroke={color} strokeWidth="3" />
                        <line x1="48" y1="114" x2="176" y2="50" stroke="#0f172a" strokeWidth="2.5" strokeDasharray="5 4" />
                        <line x1="88" y1="42" x2="196" y2="118" stroke="#be185d" strokeWidth="2.5" strokeDasharray="5 4" />
                        <Label x={103} y={76} text="AC" color="#0f172a" />
                        <Label x={136} y={102} text="BD" color="#be185d" />
                    </svg>
                </SvgWrap>
            );
        case 'Convex Polygon':
            return (
                <SvgWrap title="Figure" caption="In a convex polygon, each diagonal lies inside the figure." accent={color} compact>
                    <svg viewBox="0 0 240 160" width="100%" height="150">
                        <polygon points="120,22 186,70 162,142 78,142 50,74" fill="#fef3c7" stroke={color} strokeWidth="3" />
                        <line x1="120" y1="22" x2="162" y2="142" stroke="#2563eb" strokeWidth="2.5" />
                        <line x1="120" y1="22" x2="78" y2="142" stroke="#2563eb" strokeWidth="2.5" />
                        <Label x={76} y={154} text="All diagonals stay inside" color={color} size={12} />
                    </svg>
                </SvgWrap>
            );
        case 'Exterior Angle':
            return (
                <SvgWrap title="Figure" caption="An exterior angle is formed by a side and the extension of an adjacent side." accent={color} compact>
                    <svg viewBox="0 0 240 160" width="100%" height="150">
                        <polygon points="58,118 116,48 182,112" fill="#ffe4e6" stroke={color} strokeWidth="3" />
                        <line x1="182" y1="112" x2="216" y2="144" stroke="#2563eb" strokeWidth="3" strokeDasharray="6 4" />
                        <path d="M168 98 A22 22 0 0 1 192 104" fill="none" stroke="#2563eb" strokeWidth="3" />
                        <Label x={192} y={98} text="Exterior" color="#2563eb" size={12} />
                    </svg>
                </SvgWrap>
            );
        default:
            return (
                <SvgWrap title="Figure" caption="A parallelogram has both pairs of opposite sides parallel." accent={color} compact>
                    <svg viewBox="0 0 240 160" width="100%" height="150">
                        <polygon points="54,112 118,112 178,56 114,56" fill="#e0f2fe" stroke={color} strokeWidth="3" />
                        <line x1="45" y1="46" x2="188" y2="46" stroke="#7c3aed" strokeWidth="3" strokeDasharray="8 5" />
                        <line x1="45" y1="122" x2="188" y2="122" stroke="#7c3aed" strokeWidth="3" strokeDasharray="8 5" />
                        <line x1="43" y1="120" x2="104" y2="48" stroke="#0f766e" strokeWidth="3" strokeDasharray="8 5" />
                        <line x1="128" y1="120" x2="190" y2="48" stroke="#0f766e" strokeWidth="3" strokeDasharray="8 5" />
                    </svg>
                </SvgWrap>
            );
    }
}

export function IdeaFigure({ idea, rule, color }) {
    if (idea === 'Polygon Foundations') {
        if (rule === 'Simple and Closed') {
            return (
                <SvgWrap title="Figure" caption="Polygons must be simple, closed, and made of segments." accent={color} compact>
                    <svg viewBox="0 0 240 170" width="100%" height="150">
                        <polygon points="44,122 76,52 144,44 188,102 120,138" fill="#dcfce7" stroke={color} strokeWidth="3" />
                        <path d="M26 42 L56 28 L72 48" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                        <Label x={24} y={24} text="Open: not a polygon" color="#ef4444" size={11} />
                        <Label x={84} y={156} text="Closed: polygon" color={color} size={12} />
                    </svg>
                </SvgWrap>
            );
        }

        if (rule === 'Convex vs Concave') {
            return (
                <SvgWrap title="Figure" caption="Convex polygons have no inward dent, but concave polygons do." accent={color} compact>
                    <svg viewBox="0 0 240 170" width="100%" height="150">
                        <polygon points="44,128 66,64 122,36 182,68 168,132 92,144" fill="#dbeafe" stroke={color} strokeWidth="3" />
                        <polygon points="50,68 102,42 128,86 180,42 190,122 90,136" fill="#ffe4e6" stroke="#ef4444" strokeWidth="3" />
                        <Label x={58} y={156} text="Convex" color={color} size={12} />
                        <Label x={160} y={156} text="Concave" color="#ef4444" size={12} />
                    </svg>
                </SvgWrap>
            );
        }

        if (rule === 'Regular vs Irregular') {
            return (
                <SvgWrap title="Figure" caption="Regular polygons have equal sides and equal angles." accent={color} compact>
                    <svg viewBox="0 0 240 170" width="100%" height="150">
                        <polygon points="76,34 134,34 172,84 134,134 76,134 38,84" fill="#fef3c7" stroke={color} strokeWidth="3" />
                        <polygon points="184,46 214,74 198,134 142,142 126,84" fill="#ffe4e6" stroke="#ef4444" strokeWidth="3" />
                        <Label x={50} y={154} text="Regular" color={color} size={12} />
                        <Label x={158} y={154} text="Irregular" color="#ef4444" size={12} />
                    </svg>
                </SvgWrap>
            );
        }
    }

    if (idea === 'Angle and Quadrilateral Structure') {
        if (rule === 'Interior Angle Sum') {
            return (
                <SvgWrap title="Figure" caption="A pentagon can be split into 3 triangles, so its angle sum is 3 x 180." accent={color} compact>
                    <svg viewBox="0 0 240 170" width="100%" height="150">
                        <polygon points="120,24 188,72 162,144 78,144 52,72" fill="#dbeafe" stroke={color} strokeWidth="3" />
                        <line x1="120" y1="24" x2="162" y2="144" stroke="#7c3aed" strokeWidth="2.5" />
                        <line x1="120" y1="24" x2="78" y2="144" stroke="#7c3aed" strokeWidth="2.5" />
                        <Label x={86} y={88} text="T1" color="#7c3aed" />
                        <Label x={120} y={105} text="T2" color="#7c3aed" />
                        <Label x={144} y={88} text="T3" color="#7c3aed" />
                    </svg>
                </SvgWrap>
            );
        }

        if (rule === 'Exterior Angle Sum') {
            return (
                <SvgWrap title="Figure" caption="Turning once around a polygon gives a full turn of 360." accent={color} compact>
                    <svg viewBox="0 0 240 170" width="100%" height="150">
                        <polygon points="64,126 54,76 92,36 156,36 188,86 158,136" fill="#dcfce7" stroke={color} strokeWidth="3" />
                        <path d="M72 138 C34 128, 28 66, 76 36" fill="none" stroke="#f59e0b" strokeWidth="4" />
                        <path d="M76 36 C136 8, 206 38, 198 96" fill="none" stroke="#ef4444" strokeWidth="4" />
                        <path d="M198 96 C192 146, 128 162, 72 138" fill="none" stroke="#3b82f6" strokeWidth="4" />
                        <Label x={90} y={158} text="Full turn = 360" color="#1e293b" size={13} />
                    </svg>
                </SvgWrap>
            );
        }

        if (rule === 'Hierarchy') {
            return (
                <SvgWrap title="Figure" caption="The square sits inside the rectangle and rhombus families." accent={color} compact>
                    <svg viewBox="0 0 240 170" width="100%" height="150">
                        <rect x="34" y="34" width="172" height="108" rx="20" fill="#e0f2fe" stroke="#0369a1" strokeWidth="3" />
                        <rect x="58" y="48" width="124" height="80" rx="18" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
                        <rect x="92" y="64" width="56" height="56" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
                        <Label x={94} y={30} text="Parallelogram" color="#0369a1" size={12} />
                        <Label x={104} y={144} text="Rectangle / Rhombus" color="#b45309" size={11} />
                        <Label x={106} y={96} text="Square" color="#166534" size={12} />
                    </svg>
                </SvgWrap>
            );
        }
    }

    return (
        <SvgWrap title="Figure" caption="Quadrilateral families grow by adding more special properties." accent={color} compact>
            <svg viewBox="0 0 240 170" width="100%" height="150">
                <polygon points="24,94 70,94 82,58 36,58" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
                <polygon points="100,94 152,94 176,58 124,58" fill="#e0f2fe" stroke="#0369a1" strokeWidth="3" />
                <rect x="44" y="118" width="48" height="28" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
                <polygon points="158,116 182,92 206,116 182,140" fill="#fce7f3" stroke="#db2777" strokeWidth="3" />
                <rect x="112" y="118" width="28" height="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
                <Label x={18} y={52} text="Trapezium" color="#92400e" size={11} />
                <Label x={107} y={52} text="Parallelogram" color="#0369a1" size={11} />
                <Label x={42} y={160} text="Rectangle" color="#2563eb" size={11} />
                <Label x={166} y={160} text="Kite" color="#db2777" size={11} />
                <Label x={104} y={160} text="Square" color="#166534" size={11} />
            </svg>
        </SvgWrap>
    );
}

function PolygonsSkillFigure({ topicIndex, color }) {
    if (topicIndex === 0) return <TermFigure term="Plane Curve" color={color} />;
    if (topicIndex === 1) return <TermFigure term="Polygon" color={color} />;
    if (topicIndex === 2) return <TermFigure term="Diagonal" color={color} />;
    if (topicIndex === 3) return <TermFigure term="Convex Polygon" color={color} />;
    return <IdeaFigure idea="Polygon Foundations" rule="Regular vs Irregular" color={color} />;
}

function AngleSkillFigure({ topicIndex, color }) {
    if (topicIndex === 0) return <IntroFigure type="when" color={color} />;
    if (topicIndex === 1) return <IdeaFigure idea="Angle and Quadrilateral Structure" rule="Interior Angle Sum" color={color} />;
    if (topicIndex === 2) return <IdeaFigure idea="Angle and Quadrilateral Structure" rule="Exterior Angle Sum" color={color} />;

    return (
        <SvgWrap title="Quick Figure" caption="For a regular polygon, equal exterior angles divide the full turn equally." accent={color} compact>
            <svg viewBox="0 0 250 170" width="100%" height="150">
                <polygon points="126,30 186,64 186,132 126,166 66,132 66,64" fill="#dbeafe" stroke={color} strokeWidth="3" />
                <circle cx="126" cy="98" r="4" fill="#0f172a" />
                <line x1="126" y1="98" x2="126" y2="30" stroke="#0f172a" strokeWidth="2.5" />
                <line x1="126" y1="98" x2="186" y2="64" stroke="#0f172a" strokeWidth="2.5" />
                <path d="M126 58 A34 34 0 0 1 156 74" fill="none" stroke="#ef4444" strokeWidth="3" />
                <Label x={142} y={64} text="60" color="#ef4444" />
                <Label x={74} y={150} text="Regular hexagon" color={color} size={13} />
            </svg>
        </SvgWrap>
    );
}

function QuadrilateralKindsSkillFigure({ topicIndex, color }) {
    if (topicIndex === 0) return <TermFigure term="Parallelogram" color={color} />;

    if (topicIndex === 1) {
        return (
            <SvgWrap title="Quick Figure" caption="A kite has 2 pairs of equal adjacent sides." accent={color} compact>
                <svg viewBox="0 0 250 170" width="100%" height="150">
                    <polygon points="124,24 192,86 124,154 68,86" fill="#fce7f3" stroke={color} strokeWidth="3" />
                    <line x1="124" y1="24" x2="124" y2="154" stroke="#0f172a" strokeWidth="2.5" strokeDasharray="6 4" />
                    <Label x={84} y={62} text="Equal" color="#db2777" />
                    <Label x={138} y={62} text="Equal" color="#db2777" />
                    <Label x={84} y={122} text="Equal" color="#db2777" />
                    <Label x={138} y={122} text="Equal" color="#db2777" />
                </svg>
            </SvgWrap>
        );
    }

    if (topicIndex === 2) return <TermFigure term="Parallelogram" color={color} />;

    if (topicIndex === 3) {
        return (
            <SvgWrap title="Quick Figure" caption="The diagonals AC and BD meet at O inside the parallelogram." accent={color} compact>
                <svg viewBox="0 0 250 170" width="100%" height="150">
                    <polygon points="42,114 114,114 186,56 114,56" fill="#e0f2fe" stroke={color} strokeWidth="3" />
                    <line x1="42" y1="114" x2="186" y2="56" stroke="#7c3aed" strokeWidth="2.5" />
                    <line x1="114" y1="56" x2="114" y2="114" stroke="#be185d" strokeWidth="2.5" />
                    <circle cx="114" cy="85" r="4" fill="#0f172a" />
                    <Label x={30} y={126} text="A" /><Label x={108} y={48} text="B" /><Label x={188} y={52} text="C" /><Label x={118} y={128} text="D" />
                    <Label x={122} y={82} text="O" color="#0f172a" />
                </svg>
            </SvgWrap>
        );
    }

    return (
        <SvgWrap title="Quick Figure" caption="Parallelogram properties connect equal sides, equal angles, and bisected diagonals." accent={color} compact>
            <svg viewBox="0 0 250 170" width="100%" height="150">
                <polygon points="44,114 116,114 186,56 114,56" fill="#fef3c7" stroke={color} strokeWidth="3" />
                <line x1="44" y1="114" x2="186" y2="56" stroke="#7c3aed" strokeWidth="2.5" />
                <line x1="114" y1="56" x2="116" y2="114" stroke="#be185d" strokeWidth="2.5" />
                <circle cx="115" cy="85" r="4" fill="#0f172a" />
                <path d="M44 114 A18 18 0 0 1 60 104" fill="none" stroke="#ef4444" strokeWidth="3" />
                <path d="M186 56 A18 18 0 0 1 170 66" fill="none" stroke="#ef4444" strokeWidth="3" />
                <Label x={58} y={100} text="a" color="#ef4444" />
                <Label x={168} y={72} text="a" color="#ef4444" />
                <Label x={84} y={80} text="AO = OC" color="#7c3aed" size={12} />
            </svg>
        </SvgWrap>
    );
}

function SpecialParallelogramsSkillFigure({ topicIndex, color }) {
    if (topicIndex === 0) {
        return (
            <SvgWrap title="Quick Figure" caption="Rhombus diagonals are perpendicular bisectors of each other." accent={color} compact>
                <svg viewBox="0 0 250 170" width="100%" height="150">
                    <polygon points="126,28 200,84 126,140 52,84" fill="#fce7f3" stroke={color} strokeWidth="3" />
                    <line x1="126" y1="28" x2="126" y2="140" stroke="#0f172a" strokeWidth="2.5" />
                    <line x1="52" y1="84" x2="200" y2="84" stroke="#0f172a" strokeWidth="2.5" />
                    <circle cx="126" cy="84" r="4" fill="#0f172a" />
                    <Label x={136} y={78} text="90" color="#ef4444" />
                </svg>
            </SvgWrap>
        );
    }

    if (topicIndex === 1) {
        return (
            <SvgWrap title="Quick Figure" caption="Rectangle diagonals are equal and bisect each other." accent={color} compact>
                <svg viewBox="0 0 250 170" width="100%" height="150">
                    <rect x="54" y="38" width="142" height="96" fill="#dbeafe" stroke={color} strokeWidth="3" />
                    <line x1="54" y1="38" x2="196" y2="134" stroke="#7c3aed" strokeWidth="2.5" />
                    <line x1="196" y1="38" x2="54" y2="134" stroke="#be185d" strokeWidth="2.5" />
                    <circle cx="125" cy="86" r="4" fill="#0f172a" />
                    <Label x={76} y={28} text="AC = BD" color={color} size={13} />
                </svg>
            </SvgWrap>
        );
    }

    if (topicIndex === 2) {
        return (
            <SvgWrap title="Quick Figure" caption="Square diagonals are equal, perpendicular, and bisect each other." accent={color} compact>
                <svg viewBox="0 0 250 170" width="100%" height="150">
                    <rect x="74" y="34" width="102" height="102" fill="#dcfce7" stroke={color} strokeWidth="3" />
                    <line x1="74" y1="34" x2="176" y2="136" stroke="#7c3aed" strokeWidth="2.5" />
                    <line x1="176" y1="34" x2="74" y2="136" stroke="#be185d" strokeWidth="2.5" />
                    <circle cx="125" cy="85" r="4" fill="#0f172a" />
                    <Label x={132} y={78} text="90" color="#ef4444" />
                </svg>
            </SvgWrap>
        );
    }

    if (topicIndex === 3) return <IdeaFigure idea="Angle and Quadrilateral Structure" rule="Hierarchy" color={color} />;

    return (
        <SvgWrap title="Quick Figure" caption="Compare diagonals: rhombus perpendicular, rectangle equal, square both." accent={color} compact>
            <svg viewBox="0 0 250 170" width="100%" height="150">
                <polygon points="40,82 74,54 108,82 74,110" fill="#fce7f3" stroke="#be185d" strokeWidth="3" />
                <line x1="74" y1="54" x2="74" y2="110" stroke="#0f172a" strokeWidth="2.5" />
                <line x1="40" y1="82" x2="108" y2="82" stroke="#0f172a" strokeWidth="2.5" />
                <rect x="114" y="54" width="60" height="56" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
                <line x1="114" y1="54" x2="174" y2="110" stroke="#0f172a" strokeWidth="2.5" />
                <line x1="174" y1="54" x2="114" y2="110" stroke="#0f172a" strokeWidth="2.5" />
                <rect x="190" y="54" width="42" height="42" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
                <line x1="190" y1="54" x2="232" y2="96" stroke="#0f172a" strokeWidth="2.5" />
                <line x1="232" y1="54" x2="190" y2="96" stroke="#0f172a" strokeWidth="2.5" />
                <Label x={50} y={132} text="Rhombus" color="#be185d" size={11} />
                <Label x={118} y={132} text="Rectangle" color="#2563eb" size={11} />
                <Label x={194} y={132} text="Square" color="#16a34a" size={11} />
            </svg>
        </SvgWrap>
    );
}

export function SkillFigure({ skillId, topicIndex, color }) {
    if (skillId === 'polygons-classification-diagonals') return <PolygonsSkillFigure topicIndex={topicIndex} color={color} />;
    if (skillId === 'angle-sum-exterior-angles') return <AngleSkillFigure topicIndex={topicIndex} color={color} />;
    if (skillId === 'kinds-of-quadrilaterals') return <QuadrilateralKindsSkillFigure topicIndex={topicIndex} color={color} />;
    return <SpecialParallelogramsSkillFigure topicIndex={topicIndex} color={color} />;
}
