const { assertProviderContract } = require('../contracts');
class ContextProvider {
    constructor(engine) { if (!engine || typeof engine.build !== 'function') throw new TypeError('ContextEngine incompatível.'); this.engine = engine; this.name = 'context'; }
    getSnapshot() { return this.engine.build(); } getProjectContext() { return this.engine.getProjectContext(); } getArchitectureContext() { return this.engine.getArchitectureContext(); } health() { return { name: this.name, available: true, compatible: true }; }
}
module.exports = { ContextProvider };
