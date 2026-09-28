const assert = require('node:assert/strict');
const path = require('node:path');
const { DocumentationRepository, DocumentationEngine, DocumentationService } = require('../../src/core/documentation');

const repository = new DocumentationRepository({ rootDir: path.resolve(__dirname, '../..') });
const engine = new DocumentationEngine({ repository, persist: false });
const service = new DocumentationService({ engine });
const result = engine.build();

assert.equal(result.sources.length, 11, 'todas as fontes oficiais devem ser carregadas');
assert.ok(result.index.categories.produto.length > 0, 'produto deve ser indexado');
assert.ok(result.index.categories.manuais.length > 0, 'manuais devem ser indexados');
assert.ok(result.index.categories.releases.length > 0, 'releases devem ser indexados');
assert.ok(result.model.project.name, 'modelo documental deve conter projeto');
assert.ok(result.snapshot.fingerprint, 'snapshot deve ter fingerprint');
assert.ok(Array.isArray(service.health().recommendations), 'health check deve retornar recomendações');
assert.ok(service.generate().snapshot.documentationState, 'geração deve produzir estado documental');

console.log('Documentation tests passed: indexação, snapshot, geração, rastreabilidade e health check.');
