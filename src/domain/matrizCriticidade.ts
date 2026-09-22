export type FaixaTempo = 'T1' | 'T2' | 'T3';
export type FaixaValor = 'V1' | 'V2' | 'V3';
export type Quadrante = 'N1' | 'N2' | 'N3' | 'N4' | 'N5' | 'N6' | 'N7' | 'N8' | 'N9';
export type Peso = 'P1' | 'P2' | 'P3' | 'P4';

export interface ProcessoClassificado {
  [key: string]: unknown;
  processo?: string;
  dataDecisao?: string | Date;
  valor?: number;
  valorDaAcao?: number | string;
  ValorAcaoMoedaCorrente?: number | string;
  faixaTempo: FaixaTempo;
  faixaValor: FaixaValor;
  quadrante: Quadrante;
  peso: Peso;
}

const LIMITE_V1 = 64840;
const LIMITE_V2 = 485040.04;
const LIMITE_V3 = 911128.94;

function numeroMonetario(valor: unknown): number {
  if (typeof valor === 'number') return valor;
  return Number(String(valor ?? '').replace(/[^\d,.-]/g, '').replace(/\.(?=\d{3}(?:\D|$))/g, '').replace(',', '.')) || 0;
}

function dataValida(data: string | Date | undefined, hoje = new Date()): Date {
  if (data instanceof Date) return data;
  if (!data) return hoje;
  const texto = String(data).trim();
  const brasileira = texto.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  const resultado = brasileira
    ? new Date(Number(brasileira[3]), Number(brasileira[2]) - 1, Number(brasileira[1]))
    : new Date(texto);
  return Number.isNaN(resultado.getTime()) ? hoje : resultado;
}

export function calcularFaixaTempo(dataDecisao: string | Date | undefined, hoje = new Date()): FaixaTempo {
  const data = dataValida(dataDecisao, hoje);
  const anos = (hoje.getTime() - data.getTime()) / (365.2425 * 24 * 60 * 60 * 1000);
  if (anos < 1) return 'T1';
  if (anos <= 2) return 'T2';
  return 'T3';
}

export function calcularFaixaValor(valor: unknown): FaixaValor {
  const numero = numeroMonetario(valor);
  if (numero <= LIMITE_V1) return 'V1';
  if (numero <= LIMITE_V2) return 'V2';
  // V3 absorve valores acima da tabela para que nenhum processo fique sem quadrante.
  return 'V3';
}

export function calcularQuadrante(faixaTempo: FaixaTempo, faixaValor: FaixaValor): Quadrante {
  return ({
    T1: { V1: 'N1', V2: 'N2', V3: 'N3' },
    T2: { V1: 'N4', V2: 'N5', V3: 'N6' },
    T3: { V1: 'N7', V2: 'N8', V3: 'N9' },
  } as const)[faixaTempo][faixaValor];
}

export function calcularPeso(quadrante: Quadrante): Peso {
  return ({ N1: 'P1', N2: 'P1', N3: 'P2', N4: 'P1', N5: 'P2', N6: 'P3', N7: 'P2', N8: 'P3', N9: 'P4' } as const)[quadrante];
}

export function classificarProcesso(processo: Omit<ProcessoClassificado, 'faixaTempo' | 'faixaValor' | 'quadrante' | 'peso'>): ProcessoClassificado {
  const valor = numeroMonetario(processo.ValorAcaoMoedaCorrente ?? processo.valorDaAcao ?? processo.valor);
  const faixaTempo = calcularFaixaTempo(processo.dataDecisao);
  const faixaValor = calcularFaixaValor(valor);
  const quadrante = calcularQuadrante(faixaTempo, faixaValor);
  return { ...processo, valor, faixaTempo, faixaValor, quadrante, peso: calcularPeso(quadrante) };
}

export { LIMITE_V1, LIMITE_V2, LIMITE_V3 };
