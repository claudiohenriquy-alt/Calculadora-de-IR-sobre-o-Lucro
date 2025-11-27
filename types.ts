export interface DividendInput {
    source: string;
    amount: number;
}

export interface CalculatorInput {
    dividends: DividendInput[];
}

export interface CalculationResult {
    // Mensal
    totalMonthlyDividends: number;
    monthlyWithholding: number;
    
    // Projeção Anual (12 meses)
    projectedAnnualIncome: number;
    projectedAnnualWithholding: number;
    
    // Tributação Mínima (Art. 16-A)
    minimumTaxRate: number; // em decimal (ex: 0.10)
    minimumTaxTotalDue: number;
    
    // Resultado Final Anual
    annualBalanceDue: number; // Valor a pagar no ajuste (pode ser 0 se o retido for suficiente)
}