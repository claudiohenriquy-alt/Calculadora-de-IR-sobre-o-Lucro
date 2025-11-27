import React, { useState, useCallback } from 'react';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LegalModal } from './components/LegalModal';
import type { CalculationResult, CalculatorInput } from './types';
import { calculateTaxes } from './services/calculationService';
import { initialInputs } from './constants';
import { Calculator, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
    const [inputs, setInputs] = useState<CalculatorInput>(initialInputs);
    const [results, setResults] = useState<CalculationResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

    const handleCalculate = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            try {
                const calculatedResults = calculateTaxes(inputs);
                setResults(calculatedResults);
            } catch (error) {
                console.error("Calculation error:", error);
                alert("Ocorreu um erro ao calcular. Verifique os dados de entrada.");
            } finally {
                setLoading(false);
            }
        }, 600); // Ligeiro aumento para dar sensação de processamento
    }, [inputs]);

    return (
        <div className="min-h-screen relative overflow-x-hidden bg-slate-50">
            {/* Background Decorativo */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50 to-slate-50 z-0"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50 z-0"></div>
            <div className="absolute top-24 -left-24 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 z-0"></div>

            <header className="relative z-10 pt-6 pb-2">
                <nav className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-md py-2 px-4 rounded-full border border-white/50 shadow-sm">
                        <div className="bg-gradient-to-tr from-primary-600 to-secondary p-1.5 rounded-lg text-white">
                            <Calculator size={20} />
                        </div>
                        <h1 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                            Calculadora para <span className="text-primary-600">Nossos Clientes</span>
                        </h1>
                    </div>
                    
                    <button 
                        onClick={() => setIsLegalModalOpen(true)}
                        className="hidden md:flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors bg-white/50 px-3 py-1.5 rounded-full hover:bg-white border border-transparent hover:border-slate-200"
                    >
                        <ShieldCheck size={16} />
                        <span>Base Legal</span>
                    </button>
                </nav>
            </header>

            <main className="relative z-10 container mx-auto p-4 md:p-6 lg:p-8 max-w-6xl pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 xl:col-span-5 space-y-6">
                        <div className="md:hidden mb-4">
                            <h2 className="text-2xl font-bold text-slate-800">Simule sua retenção</h2>
                            <p className="text-slate-500">Adicione os dividendos para calcular.</p>
                        </div>
                        <CalculatorForm inputs={inputs} setInputs={setInputs} onCalculate={handleCalculate} loading={loading} />
                    </div>

                    <div className="lg:col-span-7 xl:col-span-7">
                        <ResultsDisplay result={results} loading={loading} />
                    </div>
                </div>
            </main>

            <footer className="relative z-10 text-center py-12 text-sm text-slate-400">
                <p>Simulação orientativa conforme Lei 15.270/2025. Consulte seu contador.</p>
                <button
                    onClick={() => setIsLegalModalOpen(true)}
                    className="md:hidden mt-2 text-primary-600 font-medium underline decoration-dashed underline-offset-4"
                >
                    Ler Base Legal
                </button>
            </footer>

            <LegalModal isOpen={isLegalModalOpen} onClose={() => setIsLegalModalOpen(false)} />
        </div>
    );
};

export default App;