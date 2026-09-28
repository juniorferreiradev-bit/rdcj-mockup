const { COLLECTIONS, assertValidMemory, clone } = require('./memory-schema');

const EVENT_COLLECTIONS = Object.freeze({
    decision: 'decisions',
    feature: 'features',
    task: 'tasks',
    module: 'modules',
    release: 'releases',
    documentationChange: 'documentation',
    architectureChange: 'decisions'
});

function idFor(type, now) {
    return `memory-${type}-${now.replace(/[^0-9]/g, '').slice(0, 17)}`;
}

class MemoryEngine {
    constructor({ repository, clock = () => new Date().toISOString(), idGenerator = idFor } = {}) {
        if (!repository) throw new TypeError('MemoryEngine requer um MemoryRepository.');
        this.repository = repository;
        this.clock = clock;
        this.idGenerator = idGenerator;
        this.indexes = {};
        this.rebuildIndexes(this.repository.read());
    }

    rebuildIndexes(memory) {
        this.indexes = {};
        COLLECTIONS.forEach((collection) => {
            this.indexes[collection] = new Map((memory[collection] || []).map((item) => [item.id, item]));
        });
        return this.indexes;
    }

    validateEvent(event) {
        if (!event || typeof event !== 'object') throw new TypeError('Evento de memória inválido.');
        if (!EVENT_COLLECTIONS[event.type]) throw new Error(`Tipo de evento não suportado: ${event.type}`);
        if (!event.payload || typeof event.payload !== 'object' || Array.isArray(event.payload)) throw new Error('Evento deve possuir payload objeto.');
        if (!event.audit || typeof event.audit !== 'object') throw new Error('Evento deve possuir contexto de auditoria.');
        ['origin', 'module', 'author', 'impact'].forEach((field) => {
            if (typeof event.audit[field] !== 'string' || !event.audit[field].trim()) throw new Error(`Auditoria exige ${field}.`);
        });
        return event;
    }

    handle(event) {
        this.validateEvent(event);
        const now = this.clock();
        const collection = EVENT_COLLECTIONS[event.type];
        const memory = this.repository.read();
        const item = {
            ...clone(event.payload),
            id: event.payload.id || this.idGenerator(event.type, now),
            createdAt: event.payload.createdAt || now,
            updatedAt: now
        };
        if (memory[collection].some((existing) => existing.id === item.id)) throw new Error(`Item já registrado: ${item.id}`);
        memory[collection].push(item);
        memory.audit.push({
            id: event.audit.id || this.idGenerator('audit', now),
            date: now,
            type: event.audit.type || `MEMORY_${event.type.toUpperCase()}`,
            origin: event.audit.origin,
            module: event.audit.module,
            author: event.audit.author,
            impact: event.audit.impact,
            entityId: item.id,
            details: event.audit.details || { collection }
        });
        assertValidMemory(memory);
        const saved = this.repository.save(memory);
        this.rebuildIndexes(saved);
        return clone(item);
    }

    history(filters) {
        return this.repository.getHistory(filters);
    }
}

module.exports = { MemoryEngine, EVENT_COLLECTIONS };
