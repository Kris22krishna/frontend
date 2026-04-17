import React from 'react';

const VennDiagram = ({ type, color = '#6366f1' }) => {
    const strokeWidth = 2;
    const opacity = 0.2;
    const highlightOpacity = 0.6;

    const renderDiagram = () => {
        switch (type) {
            case 'union':
                return (
                    <svg viewBox="0 0 200 120" className="w-full h-auto">
                        <rect x="5" y="5" width="190" height="110" fill="none" stroke="#ccc" strokeWidth="1" />
                        <circle cx="75" cy="60" r="40" fill={color} fillOpacity={highlightOpacity} stroke={color} strokeWidth={strokeWidth} />
                        <circle cx="125" cy="60" r="40" fill={color} fillOpacity={highlightOpacity} stroke={color} strokeWidth={strokeWidth} />
                        <text x="55" y="35" fontSize="12" fontWeight="bold">A</text>
                        <text x="135" y="35" fontSize="12" fontWeight="bold">B</text>
                    </svg>
                );
            case 'intersection':
                return (
                    <svg viewBox="0 0 200 120" className="w-full h-auto">
                        <rect x="5" y="5" width="190" height="110" fill="none" stroke="#ccc" strokeWidth="1" />
                        <circle cx="75" cy="60" r="40" fill={color} fillOpacity={opacity} stroke={color} strokeWidth={strokeWidth} />
                        <circle cx="125" cy="60" r="40" fill={color} fillOpacity={opacity} stroke={color} strokeWidth={strokeWidth} />
                        <clipPath id="inter">
                            <circle cx="75" cy="60" r="40" />
                        </clipPath>
                        <circle cx="125" cy="60" r="40" fill={color} fillOpacity={highlightOpacity} clipPath="url(#inter)" />
                        <text x="55" y="35" fontSize="12" fontWeight="bold">A</text>
                        <text x="135" y="35" fontSize="12" fontWeight="bold">B</text>
                    </svg>
                );
            case 'difference-a-b':
                return (
                    <svg viewBox="0 0 200 120" className="w-full h-auto">
                        <rect x="5" y="5" width="190" height="110" fill="none" stroke="#ccc" strokeWidth="1" />
                        <mask id="diffMask">
                            <circle cx="75" cy="60" r="40" fill="white" />
                            <circle cx="125" cy="60" r="40" fill="black" />
                        </mask>
                        <circle cx="75" cy="60" r="40" fill={color} fillOpacity={highlightOpacity} mask="url(#diffMask)" stroke={color} strokeWidth={strokeWidth} />
                        <circle cx="125" cy="60" r="40" fill="none" stroke={color} strokeWidth={strokeWidth} />
                        <text x="55" y="35" fontSize="12" fontWeight="bold">A</text>
                        <text x="135" y="35" fontSize="12" fontWeight="bold">B</text>
                    </svg>
                );
            case 'complement-a':
                return (
                    <svg viewBox="0 0 200 120" className="w-full h-auto">
                        <rect x="5" y="5" width="190" height="110" fill={color} fillOpacity={highlightOpacity} stroke="#ccc" strokeWidth="1" />
                        <circle cx="100" cy="60" r="35" fill="white" stroke={color} strokeWidth={strokeWidth} />
                        <text x="95" y="65" fontSize="12" fontWeight="bold">A</text>
                        <text x="175" y="25" fontSize="12" fontWeight="bold">U</text>
                    </svg>
                );
            case 'subset':
                return (
                    <svg viewBox="0 0 200 120" className="w-full h-auto">
                        <rect x="5" y="5" width="190" height="110" fill="none" stroke="#ccc" strokeWidth="1" />
                        <circle cx="100" cy="60" r="45" fill={color} fillOpacity={opacity} stroke={color} strokeWidth={strokeWidth} />
                        <circle cx="100" cy="65" r="20" fill={color} fillOpacity={highlightOpacity} stroke={color} strokeWidth={strokeWidth} />
                        <text x="100" y="35" fontSize="12" fontWeight="bold" textAnchor="middle">B</text>
                        <text x="100" y="68" fontSize="10" fontWeight="bold" textAnchor="middle">A</text>
                    </svg>
                );
            case 'disjoint':
                return (
                    <svg viewBox="0 0 200 120" className="w-full h-auto">
                        <rect x="5" y="5" width="190" height="110" fill="none" stroke="#ccc" strokeWidth="1" />
                        <circle cx="60" cy="60" r="35" fill={color} fillOpacity={opacity} stroke={color} strokeWidth={strokeWidth} />
                        <circle cx="140" cy="60" r="35" fill={color} fillOpacity={opacity} stroke={color} strokeWidth={strokeWidth} />
                        <text x="55" y="35" fontSize="12" fontWeight="bold">A</text>
                        <text x="135" y="35" fontSize="12" fontWeight="bold">B</text>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="venn-diagram-container" style={{ maxWidth: '100%', margin: '0 auto' }}>
            {renderDiagram()}
        </div>
    );
};

export default VennDiagram;
