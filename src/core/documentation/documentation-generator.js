class DocumentationGenerator {
    generateAll(state) {
        return {
            'README-consolidated.md': this.readme(state),
            'roadmap-consolidated.md': this.roadmap(state),
            'architecture-summary.md': this.architecture(state),
            'release-summary.md': this.releases(state),
            'project-summary.md': this.project(state)
        };
    }
    readme(state) { return `# RDCJ 2.0 — Resumo Consolidado\n\nProjeto: ${state.model.project.name}\nVersão: ${state.model.project.version}\n\nDocumentação indexada: ${state.sources.length}.\n\nEste arquivo é derivado e não substitui o README oficial.\n`; }
    roadmap(state) { return `# Roadmap Consolidado\n\nFontes de backlog/roadmap: ${state.index.categories.backlog.length + state.index.categories.roadmap.length}.\n\nEste arquivo é derivado e não substitui o roadmap oficial.\n`; }
    architecture(state) { return `# Architecture Summary\n\nDocumentos de arquitetura: ${state.index.categories.arquitetura.length}.\n\nEste arquivo é derivado e não substitui os documentos oficiais.\n`; }
    releases(state) { return `# Release Summary\n\nDocumentos/releases indexados: ${state.index.categories.releases.length}.\n\nEste arquivo é derivado e não substitui o CHANGELOG.\n`; }
    project(state) { return `# Project Summary\n\n${state.model.project.name} — ${state.model.project.version}.\n\nFeatures: ${state.model.features.length}. Módulos: ${state.model.modules.length}.\n`; }
}
module.exports = { DocumentationGenerator };
