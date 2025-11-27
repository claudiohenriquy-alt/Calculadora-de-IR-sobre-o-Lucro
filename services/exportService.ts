import type { CalculationResult, CalculatorInput } from '../types';

const formatCsvNumber = (value: number): string => {
    return value.toFixed(2).replace('.', ',');
};

export const exportToCsv = (results: CalculationResult, inputs: CalculatorInput) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    csvContent += "Simulação de IR sobre Lucros/Dividendos\r\n";
    csvContent += "\r\n";
    
    csvContent += "Dados de Entrada (Dividendos)\r\n";
    csvContent += "Origem (PJ);Valor Recebido\r\n";
    if (inputs.dividends.length > 0) {
        inputs.dividends.forEach((div) => {
            csvContent += `${div.source || 'Fonte não informada'};${formatCsvNumber(div.amount)}\r\n`;
        });
    } else {
        csvContent += "Nenhum dividendo informado;0,00\r\n";
    }
    csvContent += "\r\n";

    csvContent += "Resultado do Cálculo\r\n";
    csvContent += "Item;Valor\r\n";
    csvContent += `Total de Dividendos Recebidos;${formatCsvNumber(results.totalMonthlyDividends)}\r\n`;
    csvContent += `IR Retido na Fonte (10%);${formatCsvNumber(results.monthlyWithholding)}\r\n`;
    csvContent += `Projeção Anual;${formatCsvNumber(results.projectedAnnualIncome)}\r\n`;
    csvContent += `Imposto Mínimo Devido;${formatCsvNumber(results.minimumTaxTotalDue)}\r\n`;
    csvContent += `Saldo a Pagar (Ajuste);${formatCsvNumber(results.annualBalanceDue)}\r\n`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "simulacao_ir_lucros.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};