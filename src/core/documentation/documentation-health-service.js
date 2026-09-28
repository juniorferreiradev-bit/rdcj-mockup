class DocumentationHealthService {
    evaluate({ sources, index, model, issues = [] }) {
        const present = sources.filter((source) => !source.missing).length;
        const indexedPaths = new Set(Object.values(index.categories).flat().filter((item) => !item.missing).map((item) => item.path));
        const indexed = indexedPaths.size;
        const duplicateGroups = duplicateGroupsOf(sources);
        const orphaned = sources.filter((source) => !source.missing && !Object.values(index.categories).flat().some((item) => item.path === source.path)).map((source) => source.path);
        const recommendations = [];
        if (present < sources.length) recommendations.push('Revisar fontes ausentes.');
        if (duplicateGroups.length) recommendations.push('Revisar conteúdo duplicado.');
        if (orphaned.length) recommendations.push('Relacionar documentos órfãos a módulos ou releases.');
        if (!recommendations.length) recommendations.push('Manter atualização e revisão periódica.');
        return {
            coverage: { sourceCount: sources.length, presentCount: present, indexedCount: indexed, percentage: sources.length ? Number((indexed / sources.length * 100).toFixed(1)) : 0 },
            freshness: { status: 'computed-on-build', generatedAt: new Date().toISOString() },
            duplication: { groups: duplicateGroups.length, items: duplicateGroups.flat() },
            orphanhood: { count: orphaned.length, documents: orphaned },
            consistency: { issues: issues.length, status: issues.length ? 'attention' : 'ok' },
            model: { modules: model.modules.length, features: model.features.length, decisions: model.decisions.length, releases: model.releases.length },
            recommendations
        };
    }
}
function duplicateGroupsOf(sources) {
    const map = new Map();
    sources.filter((source) => !source.missing).forEach((source) => { const key = source.content.replace(/\s+/g, ' ').trim().toLowerCase(); if (!map.has(key)) map.set(key, []); map.get(key).push(source.path); });
    return [...map.values()].filter((group) => group.length > 1);
}
module.exports = { DocumentationHealthService };
