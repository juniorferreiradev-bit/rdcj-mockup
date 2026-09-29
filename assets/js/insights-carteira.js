const rdcjInsights = (() => {
    const valor = (processo, campo) => Number(processo[campo]) || 0;
    const agrupar = (processos, campo, total, porValor = false) => {
        const mapa = new Map();
        processos.forEach((processo) => { const label = String(processo[campo] || 'Não informado'); const atual = mapa.get(label) || { label, quantidade: 0, valor: 0, percentual: 0 }; atual.quantidade += 1; atual.valor += valor(processo, 'valor'); mapa.set(label, atual); });
        const lista = [...mapa.values()].sort((a, b) => porValor ? b.valor - a.valor : b.quantidade - a.quantidade); const divisor = porValor ? total : processos.length;
        return lista.map((item) => ({ ...item, percentual: divisor ? ((porValor ? item.valor : item.quantidade) / divisor * 100) : 0 }));
    };
    const calcular = (processos) => { const valorTotal = processos.reduce((sum, processo) => sum + valor(processo, 'valor'), 0); return { totalProcessos: processos.length, valorTotal, valorTerceirizacao: processos.reduce((sum, processo) => sum + valor(processo, 'ValorAcaoFinsTerceirizacao'), 0), distribuicoes: { quadrante: agrupar(processos, 'quadrante'), faixaValor: agrupar(processos, 'faixaValor'), faixaTempo: agrupar(processos, 'faixaTempo'), advogado: agrupar(processos, 'nm_adv'), responsavel: agrupar(processos, 'responsavel'), comarca: agrupar(processos, 'nm_mun') }, tops: { processos: [...processos].sort((a, b) => valor(b, 'valor') - valor(a, 'valor')).slice(0, 10).map((p) => ({ label: p.cnj, quantidade: 1, valor: valor(p, 'valor') })), clientes: agrupar(processos, 'cliente', valorTotal, true).slice(0, 10), comarcas: agrupar(processos, 'nm_mun', valorTotal, true).slice(0, 10), advogados: agrupar(processos, 'nm_adv', valorTotal, true).slice(0, 10) } }; };
    const formatar = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value || 0);
    return { calcular, formatar };
})();
