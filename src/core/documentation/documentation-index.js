const CATEGORIES = Object.freeze(['arquitetura', 'produto', 'backlog', 'decisoes', 'releases', 'manuais', 'roadmap', 'integracoes', 'serviceNow']);

class DocumentationIndex {
    build(sources) {
        const categories = Object.fromEntries(CATEGORIES.map((category) => [category, []]));
        sources.forEach((source) => categoriesFor(source.path).forEach((category) => categories[category].push({ id: `${category}:${source.id}`, path: source.path, title: source.title, headings: source.headings, hash: source.hash, missing: source.missing })));
        return { schemaVersion: '1.0', generatedAt: new Date().toISOString(), categories };
    }
}
function categoriesFor(file) {
    if (file.includes('architecture') || file === 'memory/context-snapshot.json') return ['arquitetura'];
    if (file.includes('backlog')) return ['backlog', 'roadmap'];
    if (file.includes('decisions') || file.includes('feedback') || file.includes('product-memory')) return ['decisoes', 'produto'];
    if (file.includes('CHANGELOG')) return ['releases'];
    if (file.includes('MANUAL') || file.includes('GUIA')) return ['manuais'];
    if (file.includes('Service') || file.includes('service')) return ['integracoes', 'serviceNow'];
    if (file.endsWith('.json')) return ['produto'];
    return ['produto'];
}
module.exports = { DocumentationIndex, CATEGORIES };
