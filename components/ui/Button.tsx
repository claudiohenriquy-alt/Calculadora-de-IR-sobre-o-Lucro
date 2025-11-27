import React from 'react';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ children, loading = false, variant = 'primary', size = 'md', className = '', ...props }) => {
    
    const baseClasses = "relative font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-300 flex items-center justify-center active:scale-[0.98]";
    
    const variantClasses = {
        primary: "bg-gradient-to-r from-primary-600 to-secondary text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:to-primary-600 border border-transparent",
        secondary: "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-sm",
        outline: "bg-transparent border-2 border-primary-100 text-primary-600 hover:border-primary-200 hover:bg-primary-50",
        ghost: "bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100 border-transparent",
    };

    const sizeClasses = {
        sm: "py-1.5 px-3 text-xs",
        md: "py-2.5 px-5 text-sm",
        lg: "py-3.5 px-8 text-base",
    };

    const disabledClasses = "disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none";

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? (
                <>
                    <span className="opacity-0">{children}</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Spinner size="sm" className={variant === 'primary' ? 'text-white' : 'text-primary-600'} />
                    </div>
                </>
            ) : children}
        </button>
    );
};