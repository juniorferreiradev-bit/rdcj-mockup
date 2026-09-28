const assert = require('node:assert/strict');
const domain = require('../../src/domain');

assert.equal(new domain.EntityId('x').toString(), 'x');
assert.equal(new domain.Cnj('123').toString(), '123');
assert.equal(new domain.Money('10.5').amount, 10.5);
assert.throws(() => new domain.Peso('P9'), /Peso inválido/);
assert.throws(() => new domain.Quadrante('N10'), /Quadrante inválido/);
const processo = new domain.Processo({ id: 'p1', cnj: '1', valor: 100 });
assert.equal(processo.toJSON().id, 'p1');
const fluxo = new domain.FluxoOperacional({ processoId: 'p1' });
assert.equal(fluxo.statusAtual, 'REVISAO_JURIDICA');
const card = new domain.KanbanCard({ processoId: 'p1', coluna: 'P1' });
assert.equal(card.processoId, 'p1');
assert.equal(domain.canTransition('REVISAO_JURIDICA', 'PETICIONAMENTO'), true);
assert.equal(domain.canTransition('MONITORAMENTO', 'ENCERRADO'), false);
assert.throws(() => new domain.Auditoria({ tipo: 'x' }), /data/);
console.log('Domain tests passed: entidades, value objects e políticas.');
