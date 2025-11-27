import type { CalculatorInput } from './types';

export const initialInputs: CalculatorInput = {
    dividends: [],
};

export const LEGAL_TEXTS = {
    'Art. 6º-A': `
        <h4 class="font-bold text-lg mb-2 text-gray-800">CAPÍTULO II-A - DA TRIBUTAÇÃO MENSAL DE ALTAS RENDAS</h4>
        <p class="text-gray-600"><strong>Art. 6º-A.</strong> A partir do mês de janeiro do ano-calendário de 2026, o pagamento, o creditamento, o emprego ou a entrega de lucros e dividendos por uma mesma pessoa jurídica a uma mesma pessoa física residente no Brasil em montante superior a <strong>R$ 50.000,00</strong> (cinquenta mil reais) em um mesmo mês fica sujeito à retenção na fonte do Imposto sobre a Renda das Pessoas Físicas à alíquota de <strong>10%</strong> (dez por cento) sobre o total do valor pago, creditado, empregado ou entregue.</p>`,
};