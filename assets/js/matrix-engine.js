const rdcjMatrixCriticidade = window.rdcjCriticidade || (() => {
    const peso = (q) => ({ N1: 'P1', N2: 'P1', N3: 'P2', N4: 'P1', N5: 'P2', N6: 'P3', N7: 'P2', N8: 'P3', N9: 'P4' }[q]);
    const tempo = (d) => { const date = new Date(d || Date.now()); const anos = (Date.now() - date.getTime()) / 31557600000; return anos < 1 ? 'T1' : anos <= 2 ? 'T2' : 'T3'; };
    const valor = (v) => { const numero = typeof v === 'number' ? v : Number(String(v || '').replace(/[^\d,.-]/g, '').replace(/\.(?=\d{3}(?:\D|$))/g, '').replace(',', '.')) || 0; return numero <= 64840 ? 'V1' : numero <= 485040.04 ? 'V2' : 'V3'; };
    const quadrante = (t, v) => ({ T1: { V1: 'N1', V2: 'N2', V3: 'N3' }, T2: { V1: 'N4', V2: 'N5', V3: 'N6' }, T3: { V1: 'N7', V2: 'N8', V3: 'N9' } }[t][v]);
    return { calcularPeso: peso, calcularFaixaTempo: tempo, calcularFaixaValor: valor, classificarProcesso: (p) => { const texto = p.ValorAcaoMoedaCorrente ?? p.valorDaAcao ?? p.value; const v = typeof texto === 'number' ? texto : Number(String(texto || '').replace(/[^\d,.-]/g, '').replace(/\.(?=\d{3}(?:\D|$))/g, '').replace(',', '.')) || 0; const faixaTempo = tempo(p.dataDecisao), faixaValor = valor(v), quadranteAtual = quadrante(faixaTempo, faixaValor); return { ...p, value: v, valor: v, faixaTempo, faixaValor, quadrante: quadranteAtual, peso: peso(quadranteAtual) }; } };
})();

const rdcjMatrixEngine = (() => {
    const assess = (process) => {
        const ano = String(process.process || '').match(/\.(20\d{2})\./)?.[1];
        const classified = rdcjMatrixCriticidade.classificarProcesso({ ...process, dataDecisao: process.dataDecisao || process.decisionDate || (ano ? `${ano}-01-01` : undefined) });
        return { ...classified, level: classified.quadrante, priority: classified.peso, score: 0, reasons: [`${classified.faixaTempo} · ${classified.faixaValor}`] };
    };

    const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value || 0);
    return { assess, formatCurrency };
})();
