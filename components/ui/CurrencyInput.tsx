import React from 'react';

interface CurrencyInputProps {
    label: string;
    value: number;
    onValueChange: (value: number) => void;
    placeholder?: string;
}

const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const CurrencyInput: React.FC<CurrencyInputProps> = ({ label, value, onValueChange, placeholder = "0,00" }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const digitsOnly = inputValue.replace(/\D/g, '');

        if (digitsOnly === '') {
            onValueChange(0);
            return;
        }

        const numberValue = parseInt(digitsOnly, 10) / 100;
        onValueChange(numberValue);
    };

    const formattedValue = (value === 0 || isNaN(value)) ? '' : formatter.format(value);

    return (
        <div className="w-full group">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide ml-1">{label}</label>
            <div className="relative transition-all duration-200 ease-in-out transform group-focus-within:-translate-y-0.5">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-medium sm:text-sm group-focus-within:text-primary-500 transition-colors">R$</span>
                </div>
                <input
                    type="text"
                    inputMode="decimal"
                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 focus:bg-white transition-all shadow-sm font-medium"
                    placeholder={placeholder}
                    value={formattedValue}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};