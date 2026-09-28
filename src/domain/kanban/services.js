const { KanbanMetrics, KanbanMovement, KanbanHistory } = require('./entities');

const asDate = (value) => { const date = value instanceof Date ? value : new Date(value); if (Number.isNaN(date.getTime())) throw new TypeError('Data Kanban inválida.'); return date; };
const hoursBetween = (a, b) => Math.max(0, (asDate(b).getTime() - asDate(a).getTime()) / 3600000);
const nowIso = () => new Date().toISOString();

class KanbanMetricsService {
    calculate({ processoId = null, createdAt, startedAt = createdAt, completedAt = null, movements = [], stages = [], now = new Date() } = {}) {
        const end = completedAt || now;
        const ordered = [...movements].sort((a, b) => asDate(a.data || a.timestamp).getTime() - asDate(b.data || b.timestamp).getTime());
        const totalTime = createdAt ? hoursBetween(createdAt, end) : 0;
        const leadTime = startedAt && createdAt ? hoursBetween(createdAt, startedAt) : 0;
        const cycleTime = startedAt ? hoursBetween(startedAt, end) : 0;
        const tempoPorEtapa = {};
        stages.forEach((stage) => { if (stage.entrada) tempoPorEtapa[stage.nome || stage.estado || stage.coluna] = hoursBetween(stage.entrada, stage.saida || end); });
        ordered.forEach((movement, index) => { const start = movement.data || movement.timestamp; const next = ordered[index + 1]; const key = movement.origem || movement.estadoAnterior || 'SEM_ETAPA'; tempoPorEtapa[key] = (tempoPorEtapa[key] || 0) + (next ? hoursBetween(start, next.data || next.timestamp) : 0); });
        const durations = Object.values(tempoPorEtapa);
        const tempoEspera = Math.max(0, totalTime - cycleTime);
        return new KanbanMetrics({ processoId, leadTime, cycleTime, tempoMedio: durations.length ? durations.reduce((sum, value) => sum + value, 0) / durations.length : cycleTime, tempoPorEtapa, tempoTotal: totalTime, tempoEspera });
    }
    aggregate(items = []) { const metrics = items.map((item) => item instanceof KanbanMetrics ? item : this.calculate(item)); const average = (key) => metrics.length ? metrics.reduce((sum, item) => sum + item[key], 0) / metrics.length : 0; return { volume: metrics.length, leadTime: average('leadTime'), cycleTime: average('cycleTime'), tempoMedio: average('tempoMedio'), tempoTotal: average('tempoTotal'), tempoEspera: average('tempoEspera') }; }
}

class KanbanSLAService {
    constructor(rules = []) { this.rules = rules.map((rule) => rule.toJSON ? rule.toJSON() : rule); }
    resolve(criteria = {}) { return this.rules.find((rule) => rule.ativo !== false && ['coluna','tipo','criticidade','quadrante'].every((key) => !rule[key] || rule[key] === criteria[key])) || null; }
    evaluate({ enteredAt, now = new Date(), criteria = {} } = {}) { const rule = this.resolve(criteria); if (!rule || !enteredAt) return { configured: Boolean(rule), status: 'SEM_SLA', limiteHoras: rule?.limiteHoras ?? null, decorridoHoras: 0, restanteHoras: null }; const elapsed = hoursBetween(enteredAt, now); const remaining = rule.limiteHoras - elapsed; return { configured: true, status: remaining < 0 ? 'VENCIDO' : remaining <= rule.limiteHoras * 0.2 ? 'PROXIMO_VENCIMENTO' : 'EM_DIA', limiteHoras: rule.limiteHoras, decorridoHoras: elapsed, restanteHoras: remaining, regra: rule }; }
    add(rule) { this.rules.push(rule.toJSON ? rule.toJSON() : rule); return rule; }
}

class KanbanWIPService {
    constructor(limits = {}) { this.limits = limits; }
    count(cards = [], key = 'coluna') { return cards.reduce((result, card) => { const value = card[key] || 'SEM_VALOR'; result[value] = (result[value] || 0) + 1; return result; }, {}); }
    evaluate(cards = [], { fluxoKey = 'estado', equipeKey = 'equipe' } = {}) { const dimensions = { coluna: this.count(cards, 'coluna'), fluxo: this.count(cards, fluxoKey), equipe: this.count(cards, equipeKey) }; const alerts = []; Object.entries({ ...this.limits.coluna, ...this.limits.fluxo, ...this.limits.equipe }).forEach(([key, limit]) => { const dimension = this.limits.coluna?.[key] !== undefined ? dimensions.coluna : this.limits.fluxo?.[key] !== undefined ? dimensions.fluxo : dimensions.equipe; if ((dimension[key] || 0) > limit) alerts.push({ tipo: 'WIP_EXCEDIDO', chave: key, atual: dimension[key] || 0, limite: limit }); }); return { dimensions, alerts, exceeded: alerts.length > 0 }; }
}

class MovementReasonPolicy {
    static get REASONS() { return Object.freeze(['operacional','jurídico','negociação','encerramento','erro operacional','reclassificação']); }
    validate(reason) { if (!MovementReasonPolicy.REASONS.includes(reason)) throw new TypeError(`Motivo de movimentação inválido: ${reason}`); return true; }
    list() { return [...MovementReasonPolicy.REASONS]; }
}

class KanbanMovementService {
    constructor({ reasonPolicy = new MovementReasonPolicy(), auditService = null, historyService = null, clock = nowIso, idGenerator = () => `MOV-${Date.now()}` } = {}) { this.reasonPolicy = reasonPolicy; this.auditService = auditService; this.historyService = historyService; this.clock = clock; this.idGenerator = idGenerator; }
    move(card, { destino, responsavel, motivo, identificador = this.idGenerator(), data = this.clock(), processoId = card.processoId } = {}) { if (!card || !card.coluna) throw new TypeError('Cartão Kanban inválido.'); if (!destino) throw new TypeError('Destino da movimentação é obrigatório.'); this.reasonPolicy.validate(motivo); const movement = new KanbanMovement({ id: identificador, identificador, data, origem: card.coluna, destino, responsavel, motivo, processoId }); const nextCard = { ...card, coluna: destino, ultimaMovimentacao: data, responsavelAtual: responsavel }; const audit = this.auditService ? this.auditService.movement({ ...movement.toJSON(), detalhes: movement.toJSON() }) : null; const history = this.historyService ? this.historyService.append({ id: identificador, processoId, data, estadoAnterior: card.estado || card.statusAtual || card.coluna, estadoNovo: nextCard.estado || nextCard.statusAtual || destino, responsavel, motivo }) : null; return { movement, card: nextCard, audit, history }; }
}

class KanbanAuditService {
    constructor({ clock = nowIso, idGenerator = () => `AUD-${Date.now()}` } = {}) { this.clock = clock; this.idGenerator = idGenerator; this.records = []; }
    record(type, data = {}) { const record = { id: this.idGenerator(), tipo: type, data: data.data || this.clock(), processoId: data.processoId || null, detalhes: data.detalhes || data }; this.records.push(record); return record; }
    movement(data) { return this.record('MOVIMENTACAO', data); }
    change(data) { return this.record('ALTERACAO', data); }
    reclassification(data) { return this.record('RECLASSIFICACAO', data); }
    sla(data) { return this.record('SLA', data); }
    wip(data) { return this.record('WIP', data); }
    list(filters = {}) { return this.records.filter((record) => Object.entries(filters).every(([key, value]) => record[key] === value)); }
}

class KanbanHistoryService {
    constructor({ clock = nowIso, idGenerator = () => `HIST-${Date.now()}` } = {}) { this.clock = clock; this.idGenerator = idGenerator; this.records = []; }
    append(data) { const history = new KanbanHistory({ ...data, id: data.id || this.idGenerator(), data: data.data || this.clock() }); this.records.push(history.toJSON()); return history; }
    timeline(processoId) { return this.records.filter((item) => !processoId || item.processoId === processoId).sort((a, b) => a.data.localeCompare(b.data)); }
}

class KanbanExecutiveMetrics {
    calculate({ cards = [], metrics = [], sla = [], wip = {}, productivity = {} } = {}) { const avg = (key) => metrics.length ? metrics.reduce((sum, item) => sum + (Number(item[key]) || 0), 0) / metrics.length : 0; return { volume: cards.length, backlog: cards.filter((card) => !['ENCERRADO','CONCLUIDOS'].includes(card.estado || card.statusAtual)).length, sla: { total: sla.length, vencidos: sla.filter((item) => item.status === 'VENCIDO').length, proximos: sla.filter((item) => item.status === 'PROXIMO_VENCIMENTO').length }, wip, leadTime: avg('leadTime'), cycleTime: avg('cycleTime'), produtividade: productivity }; }
}

class KanbanAlertService {
    evaluate({ sla = [], wip = {}, cards = [], now = new Date(), stoppedAfterHours = 48 } = {}) { const alerts = []; sla.filter((item) => ['VENCIDO','PROXIMO_VENCIMENTO'].includes(item.status)).forEach((item) => alerts.push({ tipo: item.status === 'VENCIDO' ? 'SLA_VENCIDO' : 'SLA_PROXIMO', severidade: item.status === 'VENCIDO' ? 'alta' : 'media', detalhe: item })); (wip.alerts || []).forEach((item) => alerts.push({ tipo: 'WIP_EXCEDIDO', severidade: 'alta', detalhe: item })); cards.forEach((card) => { if (!card.processoId) alerts.push({ tipo: 'PROCESSO_ORFAO', severidade: 'alta', detalhe: card }); if (card.ultimaMovimentacao && hoursBetween(card.ultimaMovimentacao, now) >= stoppedAfterHours) alerts.push({ tipo: 'FLUXO_PARADO', severidade: 'media', detalhe: card }); }); return alerts; }
}

module.exports = { KanbanMetricsService, KanbanSLAService, KanbanWIPService, MovementReasonPolicy, KanbanMovementService, KanbanAuditService, KanbanHistoryService, KanbanExecutiveMetrics, KanbanAlertService };