const ESTADOS = Object.freeze(['REVISAO_JURIDICA','PETICIONAMENTO','AGUARDANDO_RESULTADO','INVESTIGACAO_AGENCIA','INVESTIGACAO_RETAGUARDA','MONITORAMENTO','ENCERRADO']);
class FluxoOperacional {
    constructor(data = {}) { if (data.statusAtual && !ESTADOS.includes(data.statusAtual)) throw new TypeError('Estado operacional inválido.'); this.processoId = data.processoId; this.statusAtual = data.statusAtual || 'REVISAO_JURIDICA'; this.linhaAtual = data.linhaAtual || 'ADVOGADO'; this.responsavelAtual = data.responsavelAtual || null; this.coluna = data.coluna || null; this.ordem = Number.isFinite(Number(data.ordem)) ? Number(data.ordem) : 0; this.proximaRevisao = data.proximaRevisao || null; }
    toJSON() { return { processoId: this.processoId, statusAtual: this.statusAtual, linhaAtual: this.linhaAtual, responsavelAtual: this.responsavelAtual, coluna: this.coluna, ordem: this.ordem, proximaRevisao: this.proximaRevisao }; }
}
module.exports = { FluxoOperacional, ESTADOS };
