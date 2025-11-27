import React from 'react';
import type { CalculatorInput, DividendInput } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Plus, Trash2, Building2, TrendingUp } from 'lucide-react';
import { CurrencyInput } from './ui/CurrencyInput';

interface CalculatorFormProps {
    inputs: CalculatorInput;
    setInputs: React.Dispatch<React.SetStateAction<CalculatorInput>>;
    onCalculate: () => void;
    loading: boolean;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ inputs, setInputs, onCalculate, loading }) => {

    const handleDividendChange = (divIndex: number, field: keyof DividendInput, value: any) => {
        const newDividends = [...inputs.dividends];
        (newDividends[divIndex] as any)[field] = value;
        setInputs(prev => ({ ...prev, dividends: newDividends }));
    };

    const addDividend = () => {
        setInputs(prev => ({
            ...prev,
            dividends: [...prev.dividends, { source: '', amount: 0 }]
        }));
    };

    const removeDividend = (divIndex: number) => {
        const newDividends = [...inputs.dividends];
        newDividends.splice(divIndex, 1);
        setInputs(prev => ({ ...prev, dividends: newDividends }));
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="bg-white">
                <div className="flex items-center space-x-2">
                    <div className="p-2 bg-indigo-50 rounded-lg text-primary-600">
                        <TrendingUp size={20} />
                    </div>
                    <CardTitle>Entrada de Dados</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <div className="space-y-6 flex-grow">
                    <div>
                         <div className="flex justify-between items-center mb-4">
                            <h4 className="text-sm font-medium text-slate-700">Fontes Pagadoras no Mês</h4>
                            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{inputs.dividends.length} {inputs.dividends.length === 1 ? 'registro' : 'registros'}</span>
                         </div>
                        
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {inputs.dividends.map((div, divIndex) => (
                                <div key={divIndex} className="group bg-white border border-slate-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all hover:border-indigo-100 relative">
                                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-3 mb-2 md:mb-0">
                                        <Input
                                            label="Empresa (PJ)"
                                            type="text"
                                            placeholder="Ex: Petrobras"
                                            value={div.source}
                                            onChange={e => handleDividendChange(divIndex, 'source', e.target.value)}
                                            icon={<Building2 size={16} />}
                                            className="bg-white border-slate-100 focus:bg-slate-50"
                                        />
                                        <div className="flex items-end gap-2">
                                            <CurrencyInput
                                                label="Valor Líquido"
                                                value={div.amount}
                                                onValueChange={value => handleDividendChange(divIndex, 'amount', value)}
                                            />
                                            <button 
                                                onClick={() => removeDividend(divIndex)} 
                                                className="mb-[3px] p-2.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                title="Remover"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                             {inputs.dividends.length === 0 && (
                                <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                                    <div className="mx-auto bg-white p-3 rounded-full w-fit shadow-sm mb-3">
                                        <Plus className="text-primary-500 opacity-50" size={24} />
                                    </div>
                                    <p className="text-slate-500 font-medium">Nenhuma fonte adicionada</p>
                                    <p className="text-slate-400 text-sm mt-1">Comece adicionando seus lucros</p>
                                    <Button onClick={addDividend} variant="secondary" size="sm" className="mt-4 mx-auto">
                                        Adicionar Primeiro
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {inputs.dividends.length > 0 && (
                    <div className="pt-4 mt-2">
                        <Button onClick={addDividend} variant="ghost" size="sm" className="w-full mb-4 border border-dashed border-slate-300 text-slate-500 hover:text-primary-600 hover:border-primary-300 hover:bg-primary-50">
                            <Plus size={16} className="mr-1.5" /> Adicionar Outra Fonte
                        </Button>
                    </div>
                )}

                <div className="pt-6 mt-auto border-t border-slate-100">
                    <Button onClick={onCalculate} loading={loading} className="w-full text-lg shadow-primary-500/30" size="lg">
                        {loading ? 'Processando...' : 'Calcular Retenção'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};