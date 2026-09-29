const assert = require('node:assert/strict');
const { GovernanceHealthService } = require('../../src/governance');
const matrix = require('../../docs/governance/governance-matrix.json');
const raci = require('../../docs/governance/governance-raci-matrix.json');

assert.ok(matrix.artifacts.length >= 6, 'governance matrix deve cobrir artefatos principais');
assert.ok(raci.activities.length >= 6, 'RACI deve cobrir atividades principais');
const result = new GovernanceHealthService().check({ templates: ['feature'], policies: ['architecture'], workflows: ['change'], matrices: [matrix, raci] });
assert.equal(result.status, 'ready');
assert.equal(result.checks.templates, true);
assert.equal(result.checks.matrices, true);
console.log('Governance tests passed: templates, workflow, matrizes e health check.');
