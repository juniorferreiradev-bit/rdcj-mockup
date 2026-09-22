const rdcjCriticidade = (() => {
    const limites = { V1: 64840, V2: 485040.04, V3: 911128.94 };
    const dataValida = (valor, hoje = new Date()) => {
        if (valor instanceof Date) return valor;
        const texto = String(valor || '').trim();
        const brasileira = texto.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
        const data = brasileira ? new Date(Number(brasileira[3]), Number(brasileira[2]) - 1, Number(brasileira[1])) : new Date(texto);
        return Number.isNaN(data.getTime()) ? hoje : data;
    };
    const calcularFaixaTempo = (dataDecisao, hoje = new Date()) => {
        const anos = (hoje.getTime() - dataValida(dataDecisao, hoje).getTime()) / (365.2425 * 24 * 60 * 60 * 1000);
        return anos < 1 ? 'T1' : anos <= 2 ? 'T2' : 'T3';
    };
    const calcularFaixaValor = (valor) => (Number(valor) <= limites.V1 ? 'V1' : Number(valor) <= limites.V2 ? 'V2' : 'V3');
    const calcularQuadrante = (tempo, valor) => ({ T1: { V1: 'N1', V2: 'N2', V3: 'N3' }, T2: { V1: 'N4', V2: 'N5', V3: 'N6' }, T3: { V1: 'N7', V2: 'N8', V3: 'N9' } }[tempo][valor]);
    const calcularPeso = (quadrante) => ({ N1: 'P1', N2: 'P1', N3: 'P2', N4: 'P1', N5: 'P2', N6: 'P3', N7: 'P2', N8: 'P3', N9: 'P4' }[quadrante]);
    const classificarProcesso = (processo) => {
        const valor = Number(processo.ValorAcaoMoedaCorrente ?? processo.valorDaAcao ?? processo.value) || 0;
        const faixaTempo = calcularFaixaTempo(processo.dataDecisao);
        const faixaValor = calcularFaixaValor(valor);
        const quadrante = calcularQuadrante(faixaTempo, faixaValor);
        return { ...processo, value: valor, valor, faixaTempo, faixaValor, quadrante, peso: calcularPeso(quadrante) };
    };
    return { limites, calcularFaixaTempo, calcularFaixaValor, calcularQuadrante, calcularPeso, classificarProcesso };
})();
