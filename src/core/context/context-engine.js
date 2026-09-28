const { ContextCache } = require('./context-cache');
const { ContextRepository } = require('./context-repository');
const { KnowledgeEngine } = require('./knowledge-engine');

class ContextEngine {
    constructor({ repository = new ContextRepository(), knowledge = new KnowledgeEngine(), cache = new ContextCache(), persist = true } = {}) {
        this.repository = repository;
        this.knowledge = knowledge;
        this.cache = cache;
        this.persist = persist;
    }

    build() {
        const documents = this.repository.readDocuments();
        const { memory, repository: memoryRepository } = this.repository.readMemory();
        const fingerprint = this.repository.fingerprint(documents, memory);
        const cached = this.cache.get(fingerprint);
        if (cached) return cached;
        const consolidated = this.knowledge.consolidate(documents, memory);
        const snapshot = { schemaVersion: '1.0', generatedAt: new Date().toISOString(), fingerprint, context: consolidated.model, knowledgeIndex: consolidated.index, memoryHistory: memoryRepository.getHistory() };
        this.cache.set(fingerprint, snapshot);
        if (this.persist) this.repository.writeArtifacts({ index: consolidated.index, model: consolidated.model, snapshot });
        return snapshot;
    }

    getProjectContext() { return this.build().context.project; }
    getArchitectureContext() { return this.build().context.architecture; }
    getDecisionContext() { return this.build().context.decisions; }
    getFeatureContext() { return this.build().context.features; }
    getModuleContext() { return this.build().context.modules; }
    getReleaseContext() { return this.build().context.releases; }
    getBacklogContext() { return this.build().context.backlog; }
}
module.exports = { ContextEngine };
