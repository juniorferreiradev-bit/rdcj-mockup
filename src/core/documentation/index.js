const { DocumentationRepository, DEFAULT_SOURCES } = require('./documentation-repository');
const { DocumentationEngine } = require('./documentation-engine');
const { DocumentationService } = require('./documentation-service');
const { DocumentationGenerator } = require('./documentation-generator');
const { DocumentationIndex, CATEGORIES } = require('./documentation-index');
const { DocumentationHealthService } = require('./documentation-health-service');

function createDocumentationSystem(options = {}) {
    const repository = options.repository || new DocumentationRepository(options);
    const engine = options.engine || new DocumentationEngine({ repository, persist: options.persist !== false });
    const service = options.service || new DocumentationService({ engine });
    return { repository, engine, service, generator: engine.generator, indexer: engine.indexer, health: engine.health };
}
module.exports = { DocumentationRepository, DocumentationEngine, DocumentationService, DocumentationGenerator, DocumentationIndex, DocumentationHealthService, createDocumentationSystem, DEFAULT_SOURCES, CATEGORIES };
