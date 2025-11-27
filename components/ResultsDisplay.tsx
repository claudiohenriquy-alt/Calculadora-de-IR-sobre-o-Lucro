import React from 'react';
import type { CalculationResult } from '../types';
import { Card, CardContent } from './ui/Card';
import { Spinner } from './ui/Spinner';
import { BarChart3, AlertCircle, CheckCircle2, Info, ArrowRight, Wallet, Scale, Calculator, TrendingUp } from 'lucide-react';

interface ResultsDisplayProps {
    result: CalculationResult | null;
    loading: boolean;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const formatPercent = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 2 }).format(value);
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, loading }) => {
    if (loading) {
        return (
            <Card className="h-full flex items-center justify-center min-h-[400px] bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <div className="text-center">
                    <div className="bg-primary-50 p-4 rounded-full inline-block mb-4 relative">
                        <div className="absolute inset-0 bg-primary-200 rounded-full blur animate-pulse"></div>
                        <div className="relative">
                            <Spinner size="lg" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Processando Simulação...</h3>
                    <p className="text-slate-500 mt-2">Calculando projeções anuais e tributação mínima</p>
                </div>
            </Card>
        );
    }

    if (!result) {
        return (
            <Card className="h-full flex flex-col justify-center items-center min-h-[400px] bg-gradient-to-br from-white to-slate-50 border-0">
                <div className="text-center max-w-sm px-6">
                    <div className="bg-white p-6 rounded-3xl shadow-soft mb-6 inline-block transform rotate-3">
                        <BarChart3 className="h-16 w-16 text-primary-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">Pronto para simular</h3>
                    <p className="text-slate-500 leading-relaxed">
                        Preencha os dados das fontes pagadoras à esquerda e clique em calcular para ver a análise mensal e a projeção anual.
                    </p>
                </div>
            </Card>
        );
    }
    
    const hasWithholding = result.monthlyWithholding > 0;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* --- BLOCO MENSAL (Art. 6º-A) --- */}
            <div className={`relative overflow-hidden rounded-3xl p-8 md:p-10 text-white shadow-2xl transition-all duration-500 ${hasWithholding ? 'bg-gradient-to-br from-indigo-600 via-primary-600 to-primary-700 shadow-primary-500/30' : 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 shadow-teal-500/30'}`}>
                {/* Background Patterns */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <div className="flex items-center space-x-2 mb-3 opacity-90">
                            {hasWithholding ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                            <span className="font-semibold tracking-wide uppercase text-sm">Cenário Mensal (Art. 6º-A)</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-1">
                            Retenção na Fonte
                        </h3>
                        <p className="text-white/80 text-sm max-w-md">
                            10% sobre o excedente de R$ 50k por fonte.
                        </p>
                    </div>
                    
                    <div className="text-right">
                        <p className="text-sm font-medium opacity-80 mb-1">Valor Retido no Mês</p>
                        <div className="text-5xl md:text-6xl font-black tracking-tighter">
                            {formatCurrency(result.monthlyWithholding)}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- BLOCO ANUAL (Art. 16-A) --- */}
            <div>
                <h4 className="flex items-center gap-2 text-slate-800 font-bold text-lg mb-4 ml-1">
                    <Wallet className="text-primary-600" size={20}/>
                    Projeção de Impacto Anual
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
                    {/* Card 1: Base & Alíquota */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-10 -mt-10 opacity-50 transition-transform group-hover:scale-110"></div>
                        
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                1. Base Anual
                            </p>
                            <div className="text-2xl font-bold text-slate-800 tracking-tight truncate" title={formatCurrency(result.projectedAnnualIncome)}>
                                {formatCurrency(result.projectedAnnualIncome)}
                            </div>
                            <p className="text-xs text-slate-400 mt-1 mb-4">12x Renda Mensal Projetada</p>
                            
                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-xs font-semibold text-slate-600">Alíquota Efetiva</span>
                                    <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{formatPercent(result.minimumTaxRate)}</span>
                                </div>
                                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-primary-500 h-full rounded-full transition-all duration-700" 
                                        style={{ width: `${Math.min(result.minimumTaxRate * 1000, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Ajuste */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full -mr-10 -mt-10 opacity-50 transition-transform group-hover:scale-110"></div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                2. Ajuste (Art. 16-A)
                            </p>
                            
                            <div className="mt-auto space-y-2.5">
                                <div className="flex justify-between text-sm items-baseline">
                                    <span className="text-slate-500">Imposto Total</span>
                                    <span className="font-semibold text-slate-700">{formatCurrency(result.minimumTaxTotalDue)}</span>
                                </div>
                                <div className="flex justify-between text-sm items-baseline">
                                    <span className="text-slate-500">(-) Retido Fonte</span>
                                    <span className="font-semibold text-red-500">-{formatCurrency(result.projectedAnnualWithholding)}</span>
                                </div>
                                <div className="h-px bg-slate-100 my-1"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-slate-700">A Pagar no Ajuste</span>
                                    <span className="text-lg font-bold text-slate-800">{formatCurrency(result.annualBalanceDue)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Total */}
                    <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 shadow-sm hover:shadow-lg hover:border-slate-600 transition-all relative overflow-hidden group text-white">
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-600 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                                    Custo Total
                                </p>
                                <div className="text-3xl font-bold tracking-tight text-white mb-1 truncate" title={formatCurrency(result.minimumTaxTotalDue)}>
                                    {formatCurrency(result.minimumTaxTotalDue)}
                                </div>
                                <p className="text-xs text-slate-400">Soma do retido + ajuste anual</p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-300">Carga Real</span>
                                <span className="text-sm font-bold text-white bg-white/10 px-2 py-1 rounded-lg border border-white/5">
                                    {formatPercent(result.projectedAnnualIncome > 0 ? result.minimumTaxTotalDue / result.projectedAnnualIncome : 0)}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100 flex gap-4">
                <div className="flex-shrink-0 mt-1">
                    <Info className="text-primary-500" size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Como funciona a Tributação Mínima?</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Para rendas anuais acima de R$ 600 mil, aplica-se uma alíquota mínima que chega a 10% para rendas acima de R$ 1,2 milhão. 
                        O valor retido mensalmente (Art. 6º-A) é abatido deste total, e a diferença deve ser paga no ajuste anual.
                    </p>
                </div>
            </div>
        </div>
    );
};