const assert = require('node:assert/strict');
const { ProcessRepository, KanbanRepository, AuditRepository, LocalStorageProcessAdapter, LocalStorageKanbanAdapter, LocalStorageAuditAdapter, RepositoryRegistry } = require('../../src/repositories');
const { assertContract } = require('../../src/domain/contracts');

class Storage { constructor() { this.map = new Map(); } getItem(k) { return this.map.get(k) || null; } setItem(k, v) { this.map.set(k, v); } }
const storage = new Storage();
const process = new ProcessRepository(new LocalStorageProcessAdapter({ storage }));
const kanban = new KanbanRepository(new LocalStorageKanbanAdapter({ storage }));
const audit = new AuditRepository(new LocalStorageAuditAdapter({ storage }));
process.save({ id: 'p1', cnj: '123' });
assert.equal(process.findByCnj('123').id, 'p1');
kanban.save({ processoId: 'p1', statusAtual: 'REVISAO_JURIDICA' });
assert.equal(kanban.findByProcessId('p1').processoId, 'p1');
kanban.move('p1', { coluna: 'P1' });
assert.equal(kanban.findByProcessId('p1').coluna, 'P1');
audit.append({ id: 'a1', tipo: 'TEST', data: new Date().toISOString(), usuario: 'test' });
assert.equal(audit.list().length, 1);
assertContract(process, 'IProcessRepository');
assertContract(kanban, 'IKanbanRepository');
assertContract(audit, 'IAuditRepository');
const registry = new RepositoryRegistry();
registry.register('process', process); registry.register('kanban', kanban);
assert.equal(registry.resolve('process'), process);
assert.deepEqual(registry.list(), ['process', 'kanban']);
assert.throws(() => registry.resolve('missing'), /não registrado/);
console.log('Repository tests passed: contracts, adapters, repositories e registry.');
