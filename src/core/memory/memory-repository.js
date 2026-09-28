const { assertValidMemory, clone } = require('./memory-schema');

const DEFAULT_KEY = 'rdcj-project-memory';

function createDefaultMemory(now = new Date().toISOString()) {
    return {
        project: 'RDCJ 2.0',
        version: '0.1-memory-layer',
        createdAt: now,
        updatedAt: now,
        features: [],
        modules: [],
        decisions: [],
        tasks: [],
        agents: [],
        documentation: [],
        releases: [],
        audit: []
    };
}

function browserStorage() {
    if (typeof globalThis !== 'undefined' && globalThis.localStorage) return globalThis.localStorage;
    return null;
}

class MemoryRepository {
    constructor({ storage = browserStorage(), key = DEFAULT_KEY, initialMemory, clock = () => new Date().toISOString() } = {}) {
        this.storage = storage;
        this.key = key;
        this.clock = clock;
        this.memory = clone(initialMemory || createDefaultMemory(this.clock()));
        assertValidMemory(this.memory);
    }

    read() {
        if (!this.storage) return clone(this.memory);
        const raw = this.storage.getItem(this.key);
        if (!raw) return clone(this.memory);
        let parsed;
        try { parsed = JSON.parse(raw); } catch (error) { throw new Error(`Não foi possível ler a memória: ${error.message}`); }
        assertValidMemory(parsed);
        this.memory = clone(parsed);
        return clone(this.memory);
    }

    save(memory) {
        assertValidMemory(memory);
        const next = clone(memory);
        next.updatedAt = this.clock();
        assertValidMemory(next);
        if (this.storage) this.storage.setItem(this.key, JSON.stringify(next));
        this.memory = clone(next);
        return clone(next);
    }

    update(updater) {
        if (typeof updater !== 'function') throw new TypeError('updater deve ser uma função.');
        const next = updater(this.read());
        return this.save(next);
    }

    collection(name) {
        const memory = this.read();
        if (!Array.isArray(memory[name])) throw new Error(`Coleção de memória desconhecida: ${name}`);
        return clone(memory[name]);
    }

    getHistory({ type, module, origin, author, entityId } = {}) {
        return this.read().audit.filter((entry) =>
            (!type || entry.type === type) &&
            (!module || entry.module === module) &&
            (!origin || entry.origin === origin) &&
            (!author || entry.author === author) &&
            (!entityId || entry.entityId === entityId)
        );
    }

    clear() {
        if (this.storage) this.storage.removeItem(this.key);
        this.memory = createDefaultMemory(this.clock());
        return clone(this.memory);
    }
}

module.exports = { MemoryRepository, createDefaultMemory, DEFAULT_KEY };
