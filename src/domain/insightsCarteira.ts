export interface InsightItem { label: string; quantidade: number; valor: number; percentual: number; }
export interface InsightsCarteira { totalProcessos: number; valorTotal: number; valorTerceirizacao: number; distribuicoes: Record<string, InsightItem[]>; tops: Record<string, InsightItem[]>; }

export function calcularInsights(processos: Array<Record<string, unknown>>): InsightsCarteira {
  const valor = (processo: Record<string, unknown>, campo: string) => Number(processo[campo]) || 0;
  const total = processos.reduce((sum, processo) => sum + valor(processo, 'valor'), 0);
  const terceirizacao = processos.reduce((sum, processo) => sum + valor(processo, 'ValorAcaoFinsTerceirizacao'), 0);
  const agrupar = (campo: string, modo: 'valor' | 'quantidade' = 'quantidade'): InsightItem[] => {
    const mapa = new Map<string, InsightItem>();
    processos.forEach((processo) => { const label = String(processo[campo] || 'Não informado'); const atual = mapa.get(label) || { label, quantidade: 0, valor: 0, percentual: 0 }; atual.quantidade += 1; atual.valor += valor(processo, 'valor'); mapa.set(label, atual); });
    const lista = [...mapa.values()].sort((a, b) => modo === 'valor' ? b.valor - a.valor : b.quantidade - a.quantidade); const divisor = modo === 'valor' ? total : processos.length; return lista.map((item) => ({ ...item, percentual: divisor ? item[modo] / divisor * 100 : 0 }));
  };
  const distribuicoes = { quadrante: agrupar('quadrante'), faixaValor: agrupar('faixaValor'), faixaTempo: agrupar('faixaTempo'), advogado: agrupar('nm_adv'), responsavel: agrupar('responsavel'), comarca: agrupar('nm_mun') };
  return { totalProcessos: processos.length, valorTotal: total, valorTerceirizacao: terceirizacao, distribuicoes, tops: { processos: [...processos].sort((a, b) => valor(b, 'valor') - valor(a, 'valor')).slice(0, 10).map((p) => ({ label: String(p.cnj || 'Não informado'), quantidade: 1, valor: valor(p, 'valor'), percentual: 0 })), clientes: agrupar('cliente', 'valor').slice(0, 10), comarcas: agrupar('nm_mun', 'valor').slice(0, 10), advogados: agrupar('nm_adv', 'valor').slice(0, 10) } };
}
