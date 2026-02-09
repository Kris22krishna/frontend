import React from 'react';

const StickerExit = ({ className, onClick }) => {
    return (
        <button
            className={className}
            onClick={onClick}
            style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.15))',
                transition: 'transform 0.1s ease-in-out'
            }}
            title="Exit Practice"
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
        >
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* White Border / Sticker Effect */}
                <circle cx="50" cy="50" r="48" fill="white" stroke="#E2E8F0" strokeWidth="2" />

                {/* Main Red Circle */}
                <circle cx="50" cy="50" r="40" fill="#EF4444" />

                {/* Inner Shadow/Gradient hint */}
                <circle cx="50" cy="50" r="36" stroke="#B91C1C" strokeWidth="2" opacity="0.2" />

                {/* The X Icon */}
                <path d="M35 35 L65 65" stroke="white" strokeWidth="8" strokeLinecap="round" />
                <path d="M65 35 L35 65" stroke="white" strokeWidth="8" strokeLinecap="round" />

                {/* Shine/Reflection */}
                <ellipse cx="35" cy="35" rx="10" ry="5" fill="white" fillOpacity="0.3" transform="rotate(-45 35 35)" />
            </svg>
        </button>
    );
};

export default StickerExit;
