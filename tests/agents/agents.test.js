const assert = require('node:assert/strict');
const { AgentBase, AgentRegistry, AgentFactory, AgentOrchestrator, AgentHealthService } = require('../../src/agents');
const { ContextEngine } = require('../../src/core/context');

assert.throws(() => new AgentBase({ id: 'x', name: 'Invalid', type: 'invalid' }), /Tipo de agente inválido/);
const registry = new AgentRegistry();
['product-owner','architect','memory','documentation','development','qa','release'].forEach((type) => registry.register(AgentFactory.create(type)));
assert.equal(registry.list().length, 7);
assert.equal(registry.exists('architect'), true);
assert.equal(AgentFactory.create('qa').type, 'qa');
const health = new AgentHealthService(registry).checkAll();
assert.equal(health.architect.registered, true);
assert.equal(health.qa.capabilitiesReady, true);
const orchestrator = new AgentOrchestrator({ registry, contextProvider: new ContextEngine({ persist: false }) });
const result = orchestrator.run('architect', { objective: 'test' });
assert.equal(result.agentId, 'architect');
assert.equal(result.requiresApproval, true);
assert.ok(result.result.architecture);
console.log('Agent tests passed: contracts, registry, factory, orchestrator e health.');
