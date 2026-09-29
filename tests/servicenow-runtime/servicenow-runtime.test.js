const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ServiceNowReadinessHealthService } = require('../../src/services/ServiceNowReadinessHealthService');

const rootDir = path.join(__dirname, '..', '..');
const json = (file) => JSON.parse(fs.readFileSync(path.join(rootDir, file), 'utf8'));
const contracts = ['process-contract.json','kanban-contract.json'].map((file) => json(path.join('docs', 'servicenow', 'contracts', file))).concat(['audit-contract.json','memory-contract.json','context-contract.json','documentation-contract.json','agent-contract.json','governance-contract.json'].map((file) => json(path.join('docs', 'governance', file))));
const health = new ServiceNowReadinessHealthService({ rootDir });
const result = health.check({
    contracts,
    mappings: json(path.join('docs', 'servicenow', 'servicenow-table-mapping.json')),
    migration: { strategy: true, data: true, provider: true },
    security: { acl: true, model: true },
    governance: { model: true, checklist: true },
    riskMatrix: json(path.join('docs', 'servicenow', 'servicenow-risk-matrix.json'))
});
assert.equal(result.status, 'ready');
assert.equal(result.connected, false);
assert.equal(result.migrationExecuted, false);
assert.equal(result.realCalls, false);
assert.equal(health.checkFiles().status, 'ready');
assert.equal(json(path.join('docs', 'servicenow', 'servicenow-table-mapping.json')).tables.length, 8);
assert.deepEqual(json(path.join('docs', 'servicenow', 'servicenow-risk-matrix.json')).levels, ['Baixo','Médio','Alto','Crítico']);
console.log('ServiceNow runtime tests passed: contracts, mappings, readiness, risk matrix e health model.');
