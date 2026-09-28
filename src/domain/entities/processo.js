const { Cnj, Money } = require('../value-objects');
class Processo {
    constructor(data = {}) { this.id = data.id || null; this.cnj = new Cnj(data.cnj); this.cliente = data.cliente || data.nm_lit || ''; this.valor = new Money(data.valor ?? data.valor_acao_moeda_corrente ?? 0); this.dataDecisao = data.dataDecisao || data.data_cadastro_da_fase_atual || null; this.attributes = { ...data }; }
    toJSON() { return { ...this.attributes, id: this.id, cnj: this.cnj.toString(), cliente: this.cliente, valor: this.valor.amount, dataDecisao: this.dataDecisao }; }
}
module.exports = { Processo };
