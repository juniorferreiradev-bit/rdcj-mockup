class KanbanCard {
    constructor(data = {}) { if (!data.processoId) throw new TypeError('KanbanCard requer processoId.'); this.id = data.id || null; this.processoId = data.processoId; this.estado = data.estado || data.statusAtual || 'REVISAO_JURIDICA'; this.coluna = data.coluna || null; this.ordem = Number(data.ordem) || 0; this.raia = data.raia || null; }
    toJSON() { return { id: this.id, processoId: this.processoId, estado: this.estado, coluna: this.coluna, ordem: this.ordem, raia: this.raia }; }
}
module.exports = { KanbanCard };
