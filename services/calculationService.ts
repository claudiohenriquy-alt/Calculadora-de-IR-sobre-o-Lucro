import type { CalculatorInput, CalculationResult, DividendInput } from '../types';

const calculateMonthlyWithholding = (dividends: DividendInput[]): number => {
    const dividendsBySource: { [key: string]: number } = {};
    
    dividends.forEach(div => {
        const source = div.source.trim() || 'Fonte Padrão';
        if (!dividendsBySource[source]) {
            dividendsBySource[source] = 0;
        }
        dividendsBySource[source] += div.amount;
    });

    let totalWithholding = 0;
    Object.values(dividendsBySource).forEach(totalAmount => {
        if (totalAmount > 50000) {
            totalWithholding += (totalAmount - 50000) * 0.10;
        }
    });
    return totalWithholding;
};

const calculateMinimumTaxRate = (annualIncome: number): number => {
    if (annualIncome <= 600000) return 0;
    if (annualIncome >= 1200000) return 0.10; // 10% teto
    
    // Fórmula linear entre 600k e 1.2M: (REND / 60.000) - 10
    // O resultado da fórmula é em percentual, então dividimos por 100
    const rate = ((annualIncome / 60000) - 10) / 100;
    return rate;
};

export const calculateTaxes = (inputs: CalculatorInput): CalculationResult => {
    // 1. Cálculo Mensal (Art. 6º-A)
    const monthlyWithholding = calculateMonthlyWithholding(inputs.dividends);
    const totalMonthlyDividends = inputs.dividends.reduce((sum, div) => sum + div.amount, 0);

    // 2. Projeção Anual (Considerando 12 meses constantes para simulação)
    const projectedAnnualIncome = totalMonthlyDividends * 12;
    const projectedAnnualWithholding = monthlyWithholding * 12;

    // 3. Tributação Mínima (Art. 16-A)
    const minimumTaxRate = calculateMinimumTaxRate(projectedAnnualIncome);
    const minimumTaxTotalDue = projectedAnnualIncome * minimumTaxRate;

    // 4. Saldo a Pagar (Ajuste Anual)
    // O imposto mínimo é o total devido. Subtrai-se o que já foi retido na fonte.
    // Se o retido for maior que o mínimo (raro nesta regra, mas possível matematicamente), o saldo é 0.
    const annualBalanceDue = Math.max(0, minimumTaxTotalDue - projectedAnnualWithholding);

    return {
        totalMonthlyDividends,
        monthlyWithholding,
        projectedAnnualIncome,
        projectedAnnualWithholding,
        minimumTaxRate,
        minimumTaxTotalDue,
        annualBalanceDue
    };
};