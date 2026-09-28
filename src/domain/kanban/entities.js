class KanbanMetrics {
    constructor(data = {}) { this.processoId = data.processoId || null; this.leadTime = Number(data.leadTime) || 0; this.cycleTime = Number(data.cycleTime) || 0; this.tempoMedio = Number(data.tempoMedio) || 0; this.tempoPorEtapa = data.tempoPorEtapa || {}; this.tempoTotal = Number(data.tempoTotal) || 0; this.tempoEspera = Number(data.tempoEspera) || 0; }
    toJSON() { return { processoId: this.processoId, leadTime: this.leadTime, cycleTime: this.cycleTime, tempoMedio: this.tempoMedio, tempoPorEtapa: this.tempoPorEtapa, tempoTotal: this.tempoTotal, tempoEspera: this.tempoEspera }; }
}

class KanbanMovement {
    constructor(data = {}) {
        ['data', 'origem', 'destino', 'responsavel', 'motivo', 'identificador'].forEach((field) => { if (!data[field]) throw new TypeError(`KanbanMovement requer ${field}.`); });
        this.id = data.id || data.identificador; this.data = data.data; this.origem = data.origem; this.destino = data.destino; this.responsavel = data.responsavel; this.motivo = data.motivo; this.identificador = data.identificador; this.processoId = data.processoId || null; this.tipo = data.tipo || 'MOVIMENTACAO';
    }
    toJSON() { return { id: this.id, data: this.data, origem: this.origem, destino: this.destino, responsavel: this.responsavel, motivo: this.motivo, identificador: this.identificador, processoId: this.processoId, tipo: this.tipo }; }
}

class KanbanSLA {
    constructor(data = {}) { this.id = data.id || null; this.coluna = data.coluna || null; this.tipo = data.tipo || null; this.criticidade = data.criticidade || null; this.quadrante = data.quadrante || null; this.limiteHoras = Number(data.limiteHoras); if (!Number.isFinite(this.limiteHoras) || this.limiteHoras < 0) throw new TypeError('KanbanSLA requer limiteHoras válido.'); this.ativo = data.ativo !== false; }
    toJSON() { return { id: this.id, coluna: this.coluna, tipo: this.tipo, criticidade: this.criticidade, quadrante: this.quadrante, limiteHoras: this.limiteHoras, ativo: this.ativo }; }
}

class KanbanHistory {
    constructor(data = {}) { ['data', 'estadoAnterior', 'estadoNovo', 'responsavel', 'motivo'].forEach((field) => { if (!data[field]) throw new TypeError(`KanbanHistory requer ${field}.`); }); this.id = data.id || null; this.processoId = data.processoId || null; this.data = data.data; this.estadoAnterior = data.estadoAnterior; this.estadoNovo = data.estadoNovo; this.responsavel = data.responsavel; this.motivo = data.motivo; this.tipo = data.tipo || 'TRANSICAO'; }
    toJSON() { return { id: this.id, processoId: this.processoId, data: this.data, estadoAnterior: this.estadoAnterior, estadoNovo: this.estadoNovo, responsavel: this.responsavel, motivo: this.motivo, tipo: this.tipo }; }
}

class KanbanGovernance {
    constructor(data = {}) { this.aprovacaoObrigatoria = data.aprovacaoObrigatoria === true; this.motivoObrigatorio = data.motivoObrigatorio !== false; this.auditoriaObrigatoria = data.auditoriaObrigatoria !== false; this.escalonamentoHoras = Number(data.escalonamentoHoras) || 0; this.regras = data.regras || {}; }
    toJSON() { return { aprovacaoObrigatoria: this.aprovacaoObrigatoria, motivoObrigatorio: this.motivoObrigatorio, auditoriaObrigatoria: this.auditoriaObrigatoria, escalonamentoHoras: this.escalonamentoHoras, regras: this.regras }; }
}

module.exports = { KanbanMetrics, KanbanMovement, KanbanSLA, KanbanHistory, KanbanGovernance };