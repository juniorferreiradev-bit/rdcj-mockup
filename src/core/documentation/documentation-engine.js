const { DocumentationRepository } = require('./documentation-repository');
const { DocumentationIndex } = require('./documentation-index');
const { DocumentationGenerator } = require('./documentation-generator');
const { DocumentationHealthService } = require('./documentation-health-service');

class DocumentationEngine {
    constructor({ repository = new DocumentationRepository(), indexer = new DocumentationIndex(), generator = new DocumentationGenerator(), health = new DocumentationHealthService(), persist = true } = {}) {
        this.repository = repository; this.indexer = indexer; this.generator = generator; this.health = health; this.persist = persist;
    }
    build() {
        const sources = this.repository.readSources();
        const index = this.indexer.build(sources);
        const model = buildModel(sources, index);
        const issues = sources.filter((source) => source.missing).map((source) => `Fonte ausente: ${source.path}`);
        const health = this.health.evaluate({ sources, index, model, issues });
        const fingerprint = this.repositoryFingerprint(sources);
        const snapshot = { schemaVersion: '1.0', generatedAt: new Date().toISOString(), fingerprint, documentationState: { sources, index, model }, coverage: health.coverage, issues: [...issues, ...health.duplication.items.map((group) => `Conteúdo duplicado: ${group.join(', ')}`)], recommendations: recommendations(health) };
        if (this.persist) this.repository.writeDerived(this.generator.generateAll({ sources, index, model }));
        return { sources, index, model, health, snapshot };
    }
    repositoryFingerprint(sources) { return require('./documentation-repository').hash(JSON.stringify(sources.map((source) => [source.path, source.hash]))); }
    healthCheck() { return this.build().health; }
}
function buildModel(sources, index) {
    const memory = parseJson(sources.find((source) => source.path === 'memory/project-memory.json'));
    return { project: { name: memory.project || 'RDCJ 2.0', version: memory.version || 'unknown' }, architecture: { documents: index.categories.arquitetura }, modules: memory.modules || [], features: memory.features || [], decisions: memory.decisions || index.categories.decisoes, releases: memory.releases || index.categories.releases, manuals: index.categories.manuais, roadmap: index.categories.roadmap, integrations: index.categories.integracoes.concat(index.categories.serviceNow) };
}
function parseJson(source) { try { return source ? JSON.parse(source.content) : {}; } catch { return {}; } }
function recommendations(health) { const result = []; if (health.coverage.percentage < 100) result.push('Revisar fontes ausentes ou não indexadas.'); if (health.duplication.groups) result.push('Revisar grupos de conteúdo duplicado.'); if (health.orphanhood.count) result.push('Relacionar documentos órfãos a módulos ou releases.'); if (!result.length) result.push('Manter atualização por fingerprint e revisão periódica.'); return result; }
module.exports = { DocumentationEngine };
