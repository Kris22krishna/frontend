import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

export const PatientTemperatureChart = () => {
    const data = [
        { time: '6 AM', temp: 37 },
        { time: '10 AM', temp: 40 },
        { time: '2 PM', temp: 38 },
        { time: '6 PM', temp: 35 },
    ];
    return (
        <div style={{ width: '100%', height: 220, background: '#f8fafc', padding: '16px 16px 0 0', borderRadius: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis domain={[34, 42]} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={3} dot={{ r: 5, fill: '#ef4444' }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export const CoordinateGridChart = ({ height = 220 }) => {
    const data = [{ x: 0, y: 0 }, { x: 5, y: 50 }];
    return (
        <div style={{ width: '100%', height, background: '#f8fafc', padding: '16px 16px 0 0', borderRadius: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="x" type="number" domain={[0, 5]} tick={{ fontSize: 11, fill: '#64748b' }} label={{ value: 'X-Axis', position: 'insideBottomRight', offset: -5, fontSize: 10 }} />
                    <YAxis dataKey="y" type="number" domain={[0, 50]} tick={{ fontSize: 11, fill: '#64748b' }} label={{ value: 'Y-Axis', angle: -90, position: 'insideLeft', fontSize: 10 }} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <ReferenceDot x={3} y={30} r={6} fill="#4f46e5" stroke="#fff" strokeWidth={2} />
                    <Line type="monotone" dataKey="y" stroke="transparent" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export const XAxisHighlightChart = ({ height = 220 }) => {
    return (
        <div style={{ width: '100%', height, background: '#f8fafc', padding: '16px 16px 0 0', borderRadius: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ x: 0, y: 0 }, { x: 10, y: 10 }]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="x" type="number" stroke="#0891b2" strokeWidth={4} tick={{ fill: '#0891b2', fontWeight: 800 }} label={{ value: 'X-AXIS (Horizontal)', position: 'insideBottomRight', offset: -5, fill: '#0891b2', fontWeight: 900, fontSize: 12 }} />
                    <YAxis dataKey="y" type="number" stroke="#cbd5e1" strokeWidth={1} tick={{ fill: '#94a3b8' }} />
                    <Line type="monotone" dataKey="y" stroke="transparent" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export const YAxisHighlightChart = ({ height = 220 }) => {
    return (
        <div style={{ width: '100%', height, background: '#f8fafc', padding: '16px 16px 0 0', borderRadius: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ x: 0, y: 0 }, { x: 10, y: 10 }]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="x" type="number" stroke="#cbd5e1" strokeWidth={1} tick={{ fill: '#94a3b8' }} />
                    <YAxis dataKey="y" type="number" stroke="#7c3aed" strokeWidth={4} tick={{ fill: '#7c3aed', fontWeight: 800 }} label={{ value: 'Y-AXIS', angle: -90, position: 'insideLeft', fill: '#7c3aed', fontWeight: 900, fontSize: 12 }} />
                    <Line type="monotone" dataKey="y" stroke="transparent" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export const StepByStepGraphChart = ({ height = 220 }) => {
    const data = [
        { day: 'Day 1', value: 10 },
        { day: 'Day 2', value: 25 },
        { day: 'Day 3', value: 15 },
        { day: 'Day 4', value: 30 },
    ];
    return (
        <div style={{ width: '100%', height, background: '#f8fafc', padding: '16px 16px 0 0', borderRadius: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="day" stroke="#334155" strokeWidth={2} label={{ value: 'Time (Days)', position: 'insideBottomRight', offset: -5, fill: '#64748b', fontSize: 10 }} />
                    <YAxis stroke="#334155" strokeWidth={2} label={{ value: 'Value', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#0f766e" strokeWidth={3} dot={{ r: 6, fill: '#0f766e', stroke: '#fff', strokeWidth: 2 }} animationDuration={2000} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export const OriginHighlightChart = ({ height = 220 }) => {
    return (
        <div style={{ width: '100%', height, background: '#f8fafc', padding: '16px 16px 0 0', borderRadius: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ x: 0, y: 0 }, { x: 5, y: 5 }]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 5]} />
                    <YAxis type="number" domain={[0, 5]} />
                    <ReferenceDot x={0} y={0} r={10} fill="#d97706" stroke="#fff" strokeWidth={3} label={{ value: 'ORIGIN (0,0)', position: 'top', fill: '#d97706', fontWeight: 900, fontSize: 14 }} />
                    <Line type="monotone" dataKey="y" stroke="transparent" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export const OrderedPairHighlightChart = ({ height = 220 }) => {
    return (
        <div style={{ width: '100%', height, background: '#f8fafc', padding: '16px 16px 0 0', borderRadius: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ x: 0, y: 0 }, { x: 5, y: 5 }]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 5]} />
                    <YAxis type="number" domain={[0, 5]} />
                    <ReferenceDot x={3} y={4} r={8} fill="#dc2626" stroke="#fff" strokeWidth={3} label={{ value: '(3, 4)', position: 'top', fill: '#dc2626', fontWeight: 900, fontSize: 16 }} />
                    {/* Visual guidelines */}
                    <Line type="linear" data={[{ x: 3, y: 0 }, { x: 3, y: 4 }]} dataKey="y" stroke="#dc2626" strokeDasharray="5 5" dot={false} />
                    <Line type="linear" data={[{ x: 0, y: 4 }, { x: 3, y: 4 }]} dataKey="x" stroke="#dc2626" strokeDasharray="5 5" dot={false} />
                    <Line type="monotone" dataKey="y" stroke="transparent" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export const ScaleHighlightChart = ({ height = 220 }) => {
    return (
        <div style={{ width: '100%', height, background: '#f8fafc', padding: '16px 16px 0 0', borderRadius: 12 }}>
            <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', background: '#0f766e', color: '#fff', fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 800, zIndex: 1 }}>UNIFORM SCALE (Gap = 10)</div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ x: 0, y: 0 }, { x: 5, y: 50 }]}>
                    <CartesianGrid strokeDasharray="10 10" stroke="#0f766e30" />
                    <XAxis type="number" domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tick={{ fill: '#0f766e', fontWeight: 800 }} />
                    <YAxis type="number" domain={[0, 50]} ticks={[0, 10, 20, 30, 40, 50]} tick={{ fill: '#0f766e', fontWeight: 800 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export const TrendLinesChart = () => {
    const data = [
        { time: 'Day 1', rising: 10, falling: 50, flat: 30 },
        { time: 'Day 2', rising: 20, falling: 40, flat: 30 },
        { time: 'Day 3', rising: 35, falling: 25, flat: 30 },
        { time: 'Day 4', rising: 45, falling: 15, flat: 30 },
    ];
    return (
        <div style={{ width: '100%', height: 220, background: '#f8fafc', padding: '16px 16px 0 0', borderRadius: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" name="Rising Trend" dataKey="rising" stroke="#10b981" strokeWidth={3} dot={false} />
                    <Line type="monotone" name="Falling Trend" dataKey="falling" stroke="#ef4444" strokeWidth={3} dot={false} />
                    <Line type="monotone" name="Flat Trend" dataKey="flat" stroke="#0891b2" strokeWidth={3} dot={false} strokeDasharray="5 5" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export const LinearGraphChart = () => {
    const data = [
        { x: 0, y: 0 },
        { x: 1, y: 2 },
        { x: 2, y: 4 },
        { x: 3, y: 6 },
        { x: 4, y: 8 },
    ];
    return (
        <div style={{ width: '100%', height: 220, background: '#f8fafc', padding: '16px 16px 0 0', borderRadius: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis dataKey="x" type="number" domain={[0, 4]} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis dataKey="y" type="number" domain={[0, 8]} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Line type="linear" name="y = 2x" dataKey="y" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
