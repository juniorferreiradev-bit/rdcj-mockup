const assert = require('node:assert/strict');
const {
    MemoryRepository,
    MemoryEngine,
    MemoryService,
    createDefaultMemory,
    validateMemory
} = require('../../src/core/memory');

class FakeStorage {
    constructor() { this.values = new Map(); }
    getItem(key) { return this.values.has(key) ? this.values.get(key) : null; }
    setItem(key, value) { this.values.set(key, value); }
    removeItem(key) { this.values.delete(key); }
}

const fixedNow = '2026-09-27T12:00:00.000Z';
const storage = new FakeStorage();
const initial = createDefaultMemory(fixedNow);
const repository = new MemoryRepository({ storage, initialMemory: initial, clock: () => fixedNow });
const engine = new MemoryEngine({ repository, clock: () => fixedNow, idGenerator: (type) => `id-${type}` });
const service = new MemoryService({ engine });

assert.equal(validateMemory(initial).valid, true, 'snapshot inicial deve ser válido');
assert.equal(repository.read().project, 'RDCJ 2.0', 'leitura deve retornar a memória inicial');

const decision = service.registerDecision(
    { id: 'decision-1', title: 'Preservar a Matriz como experiência primária', status: 'approved' },
    { origin: 'test', module: 'architecture', author: 'tester', impact: 'medium' }
);
assert.equal(decision.id, 'decision-1', 'escrita deve retornar o registro criado');
assert.equal(repository.collection('decisions').length, 1, 'registro deve ser persistido');
assert.equal(repository.getHistory({ entityId: 'decision-1' }).length, 1, 'escrita deve gerar auditoria');
assert.equal(repository.getHistory({ module: 'architecture' })[0].author, 'tester', 'auditoria deve preservar contexto');

const reloaded = new MemoryRepository({ storage, clock: () => fixedNow });
assert.equal(reloaded.collection('decisions')[0].title, decision.title, 'novo repositório deve ler o armazenamento');

assert.throws(() => engine.handle({ type: 'feature', payload: { id: 'invalid-audit' } }), /contexto de auditoria/, 'auditoria é obrigatória no engine');
assert.throws(() => repository.save({}), /Memória inválida/, 'snapshot inválido deve ser rejeitado');
assert.throws(() => service.registerTask({ id: 'duplicate' }, { origin: 'test', module: 'x', author: 'y', impact: 'low' }) && service.registerTask({ id: 'duplicate' }, { origin: 'test', module: 'x', author: 'y', impact: 'low' }), /Item já registrado/, 'IDs duplicados devem ser rejeitados');

console.log('Memory tests passed: leitura, escrita, validação e auditoria.');
