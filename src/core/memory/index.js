const { MemoryRepository, createDefaultMemory, DEFAULT_KEY } = require('./memory-repository');
const { MemoryEngine, EVENT_COLLECTIONS } = require('./memory-engine');
const { MemoryService } = require('./memory-service');
const { COLLECTIONS, ROOT_ARRAYS, validateMemory, assertValidMemory } = require('./memory-schema');

function createMemorySystem(options = {}) {
    const repository = options.repository || new MemoryRepository(options);
    const engine = options.engine || new MemoryEngine({ repository, clock: options.clock, idGenerator: options.idGenerator });
    const service = options.service || new MemoryService({ engine });
    return { repository, engine, service };
}

module.exports = {
    MemoryRepository,
    MemoryEngine,
    MemoryService,
    createMemorySystem,
    createDefaultMemory,
    DEFAULT_KEY,
    EVENT_COLLECTIONS,
    COLLECTIONS,
    ROOT_ARRAYS,
    validateMemory,
    assertValidMemory
};
