const { ContextRepository, DEFAULT_SOURCES } = require('./context-repository');
const { ContextEngine } = require('./context-engine');
const { ContextService } = require('./context-service');
const { KnowledgeEngine } = require('./knowledge-engine');
const { KnowledgeIndex, CATEGORIES } = require('./knowledge-index');
const { ContextCache } = require('./context-cache');

function createContextSystem(options = {}) {
    const repository = options.repository || new ContextRepository(options);
    const knowledge = options.knowledge || new KnowledgeEngine();
    const cache = options.cache || new ContextCache(options.cacheOptions);
    const engine = options.engine || new ContextEngine({ repository, knowledge, cache, persist: options.persist !== false });
    const service = options.service || new ContextService({ engine });
    return { repository, knowledge, cache, engine, service };
}

module.exports = { ContextRepository, ContextEngine, ContextService, KnowledgeEngine, KnowledgeIndex, ContextCache, createContextSystem, DEFAULT_SOURCES, CATEGORIES };
