class ContextService {
    constructor({ engine }) { if (!engine) throw new TypeError('ContextService requer um ContextEngine.'); this.engine = engine; }
    getProjectContext() { return this.engine.getProjectContext(); }
    getArchitectureContext() { return this.engine.getArchitectureContext(); }
    getDecisionContext() { return this.engine.getDecisionContext(); }
    getFeatureContext() { return this.engine.getFeatureContext(); }
    getModuleContext() { return this.engine.getModuleContext(); }
    getReleaseContext() { return this.engine.getReleaseContext(); }
    getBacklogContext() { return this.engine.getBacklogContext(); }
    snapshot() { return this.engine.build(); }
}
module.exports = { ContextService };
