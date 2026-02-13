import React from 'react';

export function SodeLogo({ className }: { className?: string }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Outer Golden Circle */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                <circle cx="50" cy="50" r="48" fill="white" stroke="#DAA520" strokeWidth="2" />
                <circle cx="50" cy="50" r="44" fill="#660000" stroke="#FFD700" strokeWidth="1" />

                {/* Stylized Shankha (Conch) Symbol - Path Proxy */}
                <path
                    d="M50 20 C65 20 80 35 80 50 C80 65 65 80 50 80 C35 80 20 65 20 50 C20 35 35 20 50 20 Z"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="1.5"
                    className="opacity-20"
                />

                {/* Central Text */}
                <text
                    x="50"
                    y="48"
                    textAnchor="middle"
                    fill="#FFD700"
                    fontSize="10"
                    fontWeight="900"
                    fontFamily="serif"
                >
                    SODE
                </text>
                <text
                    x="50"
                    y="62"
                    textAnchor="middle"
                    fill="#FFD700"
                    fontSize="10"
                    fontWeight="900"
                    fontFamily="serif"
                >
                    MATHA
                </text>

                {/* Decorative Gold Dots */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                    const rad = (angle * Math.PI) / 180;
                    return (
                        <circle
                            key={angle}
                            cx={50 + 40 * Math.cos(rad)}
                            cy={50 + 40 * Math.sin(rad)}
                            r="1.5"
                            fill="#FFD700"
                        />
                    );
                })}
            </svg>
        </div>
    );
}
