const assert = require('node:assert/strict');
const { ProviderRegistry, ProviderFactory, ProviderHealthService, LocalStorageProvider, MemoryProvider, ContextProvider, DocumentationProvider, ServiceNowProvider, FutureDatabaseProvider, PROVIDER_CONTRACTS } = require('../../src/providers');
const { MemoryRepository } = require('../../src/core/memory');
const { ContextEngine } = require('../../src/core/context');
const { DocumentationEngine } = require('../../src/core/documentation');

class Storage { constructor() { this.map = new Map(); } getItem(k) { return this.map.get(k) || null; } setItem(k,v) { this.map.set(k,v); } removeItem(k) { this.map.delete(k); } }
const provider = new LocalStorageProvider({ storage: new Storage() });
provider.connect(); provider.write('processos', [{ id: 'p1' }]);
assert.deepEqual(provider.read('processos'), [{ id: 'p1' }]);
assert.equal(provider.health().compatible, true);
const registry = new ProviderRegistry();
registry.register('localstorage', provider);
registry.register('servicenow', new ServiceNowProvider());
registry.register('database', new FutureDatabaseProvider());
assert.equal(registry.exists('localstorage'), true);
assert.deepEqual(registry.resolve('localstorage').read('processos'), [{ id: 'p1' }]);
assert.deepEqual(ProviderFactory.create('localstorage', { storage: new Storage() }).name, 'localstorage');
assert.equal(ProviderFactory.create('servicenow').health().status, 'stub-only');
assert.equal(new MemoryProvider(new MemoryRepository({ storage: null })).health().available, true);
assert.equal(new ContextProvider(new ContextEngine({ persist: false })).health().available, true);
assert.equal(new DocumentationProvider(new DocumentationEngine({ persist: false })).health().available, true);
const health = new ProviderHealthService(registry).checkAll();
assert.equal(health.localstorage.registered, true);
assert.equal(health.servicenow.available, false);
assert.ok(Object.keys(PROVIDER_CONTRACTS).length >= 7);
console.log('Provider tests passed: contracts, registry, factory, health e LocalStorage.');
