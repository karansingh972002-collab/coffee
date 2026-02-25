import React from 'react';

const Logo = ({ className, size = 100 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="starGradientPrimary" x1="10%" y1="10%" x2="90%" y2="90%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FFA500" />
                </linearGradient>
                <filter id="starGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Orbit Ring */}
            <path
                d="M 20 60 A 40 15 0 1 1 80 40"
                stroke="#FFD700"
                strokeWidth="1.5"
                strokeOpacity="0.6"
                fill="none"
            />

            {/* Main Star */}
            <path
                d="M50 15 L58 38 L83 38 L63 54 L71 78 L50 64 L29 78 L37 54 L17 38 L42 38 Z"
                fill="url(#starGradientPrimary)"
                filter="url(#starGlowEffect)"
            />

            {/* Sparkles */}
            <circle cx="80" cy="20" r="2" fill="white" opacity="0.8">
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="20" cy="80" r="1.5" fill="white" opacity="1">
                <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
            </circle>
        </svg>
    );
};

export default Logo;
