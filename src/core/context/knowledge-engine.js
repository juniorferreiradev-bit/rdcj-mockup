const { KnowledgeIndex } = require('./knowledge-index');

class KnowledgeEngine {
    constructor({ index = new KnowledgeIndex() } = {}) { this.index = index; }

    consolidate(documents, memory) {
        const knowledgeIndex = this.index.build(documents, memory);
        return { index: knowledgeIndex, model: modelFrom(knowledgeIndex, documents, memory) };
    }
}

function modelFrom(knowledgeIndex, documents, memory) {
    return {
        project: { name: memory.project, version: memory.version, sources: documents.map((document) => document.path) },
        architecture: { current: 'architecture-current.md', target: 'architecture-target.md', gaps: 'gap-analysis.md', roadmap: 'migration-roadmap.md' },
        modules: uniqueBy([...memory.modules, ...knowledgeIndex.categories.modules], 'id'),
        features: uniqueBy([...memory.features, ...knowledgeIndex.categories.features], 'id'),
        decisions: uniqueBy([...memory.decisions, ...knowledgeIndex.categories.decisions], 'id'),
        releases: uniqueBy([...memory.releases, ...knowledgeIndex.categories.releases], 'id'),
        backlog: knowledgeIndex.categories.backlog,
        documentation: uniqueBy([...memory.documentation, ...knowledgeIndex.categories.documentation], 'id'),
        memory: [{ source: 'memory/project-memory.json', version: memory.version, updatedAt: memory.updatedAt }]
    };
}
function uniqueBy(items, field) { return [...new Map(items.map((item) => [item[field], item])).values()]; }

module.exports = { KnowledgeEngine };
