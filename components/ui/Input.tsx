import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, id, icon, className = '', ...props }) => {
    const inputId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined);

    return (
        <div className="w-full group">
            {label && <label htmlFor={inputId} className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide ml-1">{label}</label>}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    id={inputId}
                    className={`block w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 focus:bg-white transition-all shadow-sm font-medium ${className}`}
                    {...props}
                />
            </div>
        </div>
    );
};