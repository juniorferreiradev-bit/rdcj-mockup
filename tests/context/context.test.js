const assert = require('node:assert/strict');
const path = require('node:path');
const { ContextRepository, ContextEngine, ContextService, ContextCache } = require('../../src/core/context');

const repository = new ContextRepository({ rootDir: path.resolve(__dirname, '../..') });
const cache = new ContextCache();
const engine = new ContextEngine({ repository, cache, persist: false });
const service = new ContextService({ engine });

const first = engine.build();
assert.ok(first.fingerprint, 'snapshot deve possuir fingerprint');
assert.ok(first.knowledgeIndex.categories.documentation.length > 0, 'documentação deve ser indexada');
assert.ok(first.knowledgeIndex.categories.architecture.length > 0, 'arquitetura deve ser indexada');
assert.equal(service.getProjectContext().name, 'RDCJ 2.0', 'consulta de projeto deve funcionar');
assert.ok(service.getArchitectureContext().target, 'consulta de arquitetura deve funcionar');
assert.ok(service.getFeatureContext().length > 0, 'features devem estar disponíveis');
assert.ok(service.getModuleContext().length > 0, 'módulos devem estar disponíveis');
assert.ok(Array.isArray(service.getBacklogContext()), 'backlog deve ser consultável');

const second = engine.build();
assert.equal(second.fingerprint, first.fingerprint, 'fontes inalteradas devem manter fingerprint');
assert.ok(cache.stats().hits >= 1, 'segunda consulta deve usar cache');

cache.invalidate();
assert.equal(cache.stats().size, 0, 'cache deve ser invalidável');
console.log('Context tests passed: indexação, contexto, cache, snapshot e consultas.');
