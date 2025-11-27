import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    color?: 'green' | 'yellow' | 'red' | 'blue';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'blue', className = '' }) => {
    const colorClasses = {
        green: 'bg-green-100 text-green-700',
        yellow: 'bg-yellow-100 text-yellow-700',
        red: 'bg-red-100 text-red-700',
        blue: 'bg-blue-100 text-blue-700',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorClasses[color]} ${className}`}>
            {children}
        </span>
    );
};