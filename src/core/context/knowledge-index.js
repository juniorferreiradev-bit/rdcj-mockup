const CATEGORIES = Object.freeze(['modules', 'features', 'decisions', 'releases', 'backlog', 'documentation', 'architecture', 'roadmap']);

class KnowledgeIndex {
    build(documents, memory) {
        const index = Object.fromEntries(CATEGORIES.map((category) => [category, []]));
        documents.forEach((document) => {
            const categories = categoriesFor(document.path);
            categories.forEach((category) => index[category].push(documentEntry(document, category)));
        });
        index.modules.push(...memory.modules.map((item) => memoryEntry(item, 'modules')));
        index.features.push(...memory.features.map((item) => memoryEntry(item, 'features')));
        index.decisions.push(...memory.decisions.map((item) => memoryEntry(item, 'decisions')));
        index.releases.push(...memory.releases.map((item) => memoryEntry(item, 'releases')));
        index.documentation.push(...memory.documentation.map((item) => memoryEntry(item, 'documentation')));
        return { schemaVersion: '1.0', generatedAt: new Date().toISOString(), categories: index };
    }
}

function categoriesFor(file) {
    if (file.endsWith('backlog.md')) return ['backlog'];
    if (file.endsWith('decisions-log.md') || file.endsWith('feedback-log.md') || file.endsWith('product-memory.md')) return ['decisions', 'features'];
    if (file === 'CHANGELOG.md' || file.endsWith('docs/releases/RELEASE-v0.1.md')) return ['releases', 'documentation'];
    if (file.includes('architecture') || file === 'docs/architecture/gap-analysis.md') return ['architecture', 'documentation'];
    if (file === 'docs/servicenow/migration-roadmap.md') return ['roadmap', 'documentation'];
    return ['documentation', 'features', 'modules'];
}
function documentEntry(document, category) { return { id: `${category}:${document.id}`, type: 'document', category, path: document.path, title: document.title, headings: document.headings, hash: document.hash }; }
function memoryEntry(item, category) { return { ...item, type: 'memory', category }; }

module.exports = { KnowledgeIndex, CATEGORIES };
