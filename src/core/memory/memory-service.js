class MemoryService {
    constructor({ engine }) {
        if (!engine) throw new TypeError('MemoryService requer um MemoryEngine.');
        this.engine = engine;
    }

    registerDecision(data, audit) { return this.engine.handle({ type: 'decision', payload: data, audit: auditContext('DECISION_REGISTERED', audit) }); }
    registerFeature(data, audit) { return this.engine.handle({ type: 'feature', payload: data, audit: auditContext('FEATURE_REGISTERED', audit) }); }
    registerTask(data, audit) { return this.engine.handle({ type: 'task', payload: data, audit: auditContext('TASK_REGISTERED', audit) }); }
    registerModule(data, audit) { return this.engine.handle({ type: 'module', payload: data, audit: auditContext('MODULE_REGISTERED', audit) }); }
    registerRelease(data, audit) { return this.engine.handle({ type: 'release', payload: data, audit: auditContext('RELEASE_REGISTERED', audit) }); }
    registerDocumentationChange(data, audit) { return this.engine.handle({ type: 'documentationChange', payload: data, audit: auditContext('DOCUMENTATION_CHANGED', audit) }); }
    registerArchitectureChange(data, audit) { return this.engine.handle({ type: 'architectureChange', payload: data, audit: auditContext('ARCHITECTURE_CHANGED', audit) }); }
    history(filters) { return this.engine.history(filters); }
}

function auditContext(type, audit = {}) {
    return { type, origin: audit.origin || 'memory-service', module: audit.module || 'memory', author: audit.author || 'system', impact: audit.impact || 'low', details: audit.details };
}

module.exports = { MemoryService, auditContext };
