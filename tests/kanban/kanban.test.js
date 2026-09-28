const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
    KanbanMetricsService, KanbanSLAService, KanbanWIPService, MovementReasonPolicy,
    KanbanMovementService, KanbanAuditService, KanbanHistoryService,
    KanbanExecutiveMetrics, KanbanAlertService, KanbanSLA
} = require('../../src/domain');

const t0 = '2026-01-01T00:00:00.000Z';
const t1 = '2026-01-02T00:00:00.000Z';
const t2 = '2026-01-04T00:00:00.000Z';
const metrics = new KanbanMetricsService().calculate({ processoId: 'p1', createdAt: t0, startedAt: t1, completedAt: t2, movements: [{ data: t1, origem: 'P1' }] });
assert.equal(metrics.leadTime, 24);
assert.equal(metrics.cycleTime, 48);
assert.equal(metrics.tempoTotal, 72);
assert.ok(metrics.tempoPorEtapa.P1 >= 0);

const sla = new KanbanSLAService([new KanbanSLA({ coluna: 'P1', limiteHoras: 24 })]);
assert.equal(sla.evaluate({ enteredAt: t0, now: t1, criteria: { coluna: 'P1' } }).status, 'PROXIMO_VENCIMENTO');
assert.equal(sla.evaluate({ enteredAt: t0, now: t2, criteria: { coluna: 'P1' } }).status, 'VENCIDO');

const wip = new KanbanWIPService({ coluna: { P1: 1 } }).evaluate([{ coluna: 'P1' }, { coluna: 'P1' }]);
assert.equal(wip.exceeded, true);
assert.equal(wip.alerts[0].tipo, 'WIP_EXCEDIDO');

const policy = new MovementReasonPolicy();
assert.equal(policy.validate('operacional'), true);
assert.throws(() => policy.validate('sem justificativa'), /Motivo/);
const movement = new KanbanMovementService({ clock: () => t1, idGenerator: () => 'm1' }).move({ processoId: 'p1', coluna: 'P1' }, { destino: 'P2', responsavel: 'u1', motivo: 'reclassificação' });
assert.equal(movement.movement.identificador, 'm1');
assert.equal(movement.card.coluna, 'P2');

const audit = new KanbanAuditService({ clock: () => t1, idGenerator: () => 'a1' });
assert.equal(audit.movement({ processoId: 'p1' }).tipo, 'MOVIMENTACAO');
const history = new KanbanHistoryService({ clock: () => t1, idGenerator: () => 'h1' });
assert.equal(history.append({ processoId: 'p1', estadoAnterior: 'A', estadoNovo: 'B', responsavel: 'u1', motivo: 'operacional' }).id, 'h1');
assert.equal(history.timeline('p1').length, 1);

const alerts = new KanbanAlertService().evaluate({ sla: [{ status: 'VENCIDO' }], wip });
assert.equal(alerts.filter((item) => item.tipo === 'SLA_VENCIDO').length, 1);
assert.equal(alerts.filter((item) => item.tipo === 'WIP_EXCEDIDO').length, 1);
const executive = new KanbanExecutiveMetrics().calculate({ cards: [{ processoId: 'p1', estado: 'REVISAO_JURIDICA' }], metrics: [metrics], sla: [sla.evaluate({ enteredAt: t0, now: t2, criteria: { coluna: 'P1' } })], wip, productivity: { concluidos: 1 } });
assert.equal(executive.volume, 1);
assert.equal(executive.backlog, 1);
assert.equal(executive.produtividade.concluidos, 1);

['dashboard-kanban-contract.json', 'kanban-operational-matrix.json', 'kanban-provider-contract.json', 'kanban-agent-contract.json'].forEach((file) => {
    const content = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', file), 'utf8'));
    assert.ok(content.version);
});
console.log('Kanban 2.0 tests passed: metrics, SLA, WIP, movement, history, audit, alerts, executive metrics e contracts.');
