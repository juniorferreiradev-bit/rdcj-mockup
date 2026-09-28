class MatrizClassificacao {
    constructor(data = {}) { this.faixaTempo = data.faixaTempo || null; this.faixaValor = data.faixaValor || null; this.quadrante = data.quadrante || null; this.peso = data.peso || null; this.ruleVersion = data.ruleVersion || 'current'; }
    toJSON() { return { faixaTempo: this.faixaTempo, faixaValor: this.faixaValor, quadrante: this.quadrante, peso: this.peso, ruleVersion: this.ruleVersion }; }
}
module.exports = { MatrizClassificacao };
