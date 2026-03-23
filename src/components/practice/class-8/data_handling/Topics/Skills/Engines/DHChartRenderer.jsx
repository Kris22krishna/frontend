import React, { memo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, PieChart, Pie, Legend,
} from 'recharts';

// ── Vibrant multi-color palette for bars and pie sectors ──────────────────
const PALETTE = [
    '#3b82f6', // blue
    '#f59e0b', // amber
    '#10b981', // emerald
    '#ef4444', // red
    '#8b5cf6', // violet
    '#f97316', // orange
    '#06b6d4', // cyan
    '#ec4899', // pink
];

// ── Custom Tooltips ────────────────────────────────────────────────────────
const BarTip = memo(({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 10,
            padding: '8px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: payload[0].fill }}>{payload[0].value}</div>
        </div>
    );
});

const PieTip = memo(({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const { name, value, payload: p } = payload[0];
    return (
        <div style={{
            background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 10,
            padding: '8px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 2 }}>{name}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: p.fill }}>{value}</div>
        </div>
    );
});

// ── Bar Chart ──────────────────────────────────────────────────────────────
const DHBarChart = memo(({ chart }) => {
    const data = chart.data.map((d) => ({ name: d.label, value: d.value }));
    return (
        <div style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)',
            borderRadius: 14, border: '1.5px solid #e2e8f0',
            padding: '14px 10px 8px',
        }}>
            {chart.title && (
                <div style={{
                    textAlign: 'center', fontSize: 12, fontWeight: 800,
                    color: '#0f172a', marginBottom: 10, letterSpacing: 0.2,
                }}>
                    {chart.title}
                </div>
            )}
            <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data} margin={{ top: 4, right: 12, left: -8, bottom: 4 }} barCategoryGap="32%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fontWeight: 600, fill: '#475569', fontFamily: 'Open Sans, sans-serif' }}
                        axisLine={false} tickLine={false}
                    />
                    <YAxis
                        label={chart.yLabel ? {
                            value: chart.yLabel, angle: -90, position: 'insideLeft',
                            style: { fontSize: 10, fill: '#94a3b8', fontWeight: 600, fontFamily: 'Open Sans, sans-serif' },
                            dx: 14,
                        } : undefined}
                        tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'Open Sans, sans-serif' }}
                        axisLine={false} tickLine={false}
                    />
                    <Tooltip content={<BarTip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {data.map((_, i) => (
                            <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            {chart.xLabel && (
                <div style={{ textAlign: 'center', fontSize: 10, color: '#94a3b8', fontWeight: 600, marginTop: 2 }}>
                    {chart.xLabel}
                </div>
            )}
        </div>
    );
});

// ── Pie Chart ──────────────────────────────────────────────────────────────
const DHPieChart = memo(({ chart }) => {
    const data = chart.data.map((d, i) => ({
        name: d.label,
        value: d.value,
        fill: PALETTE[i % PALETTE.length],
    }));
    return (
        <div style={{
            background: 'linear-gradient(135deg, #faf8ff 0%, #f5f0ff 100%)',
            borderRadius: 14, border: '1.5px solid #e2e8f0',
            padding: '14px 10px 8px',
        }}>
            {chart.title && (
                <div style={{
                    textAlign: 'center', fontSize: 12, fontWeight: 800,
                    color: '#0f172a', marginBottom: 8, letterSpacing: 0.2,
                }}>
                    {chart.title}
                </div>
            )}
            <ResponsiveContainer width="100%" height={190}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%" cy="48%"
                        innerRadius={38}
                        outerRadius={68}
                        paddingAngle={3}
                        strokeWidth={2}
                        stroke="#fff"
                        isAnimationActive={false}
                    >
                        {data.map((d, i) => (
                            <Cell key={i} fill={d.fill} />
                        ))}
                    </Pie>
                    <Tooltip content={<PieTip />} />
                    <Legend
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{
                            fontSize: 11, fontWeight: 600,
                            fontFamily: 'Open Sans, sans-serif', color: '#475569',
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
});

// ── Main Export ────────────────────────────────────────────────────────────
export default memo(function DHChartRenderer({ chart }) {
    if (!chart) return null;
    if (chart.type === 'bar') return <DHBarChart chart={chart} />;
    if (chart.type === 'pie') return <DHPieChart chart={chart} />;
    return null;
});
