import React, { useState } from 'react';

export default function SkillSparkEmbed({ spark, height = 500, mini = false, style={} }) {
    const [loading, setLoading] = useState(true);
    // Determine the URL. If mini=true, append ?mini to signal the HTML side to trim its UI down.
    const sparkUrl = `/sparks/${spark}.html${mini ? '?mini=true' : ''}`;

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: height,
            borderRadius: '24px',
            overflow: 'hidden',
            border: '2px solid rgba(0,0,0,0.05)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            background: '#0f172a',
            ...style
        }}>
            {loading && (
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: '#f8fafc', zIndex: 10
                }}>
                    <div style={{
                        width: '40px', height: '40px',
                        border: '4px solid #cbd5e1',
                        borderTopColor: '#3b82f6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            )}
            <iframe 
                src={sparkUrl} 
                style={{ width: '100%', height: '100%', border: 'none', background:'transparent' }}
                title={`Interactive Spark: ${spark}`}
                onLoad={() => setLoading(false)}
            />
        </div>
    );
}
