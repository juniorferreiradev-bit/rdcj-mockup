function storageOf(storage) { return storage || (typeof globalThis !== 'undefined' ? globalThis.localStorage : null); }
function readJson(storage, key, fallback) { const value = storage && storage.getItem(key); if (!value) return fallback; try { return JSON.parse(value); } catch { return fallback; } }
function writeJson(storage, key, value) { if (storage) storage.setItem(key, JSON.stringify(value)); }

class LocalStorageProcessAdapter {
    constructor({ storage, key = 'rdcj-processos' } = {}) { this.storage = storageOf(storage); this.key = key; this.memory = []; }
    list() { return readJson(this.storage, this.key, this.memory); }
    findById(id) { return this.list().find((item) => item.id === id || item.sys_id === id); }
    findByCnj(cnj) { return this.list().find((item) => item.cnj === cnj); }
    save(item) { const items = this.list(); const id = item.id || item.cnj; const index = items.findIndex((current) => (current.id || current.cnj) === id); if (index >= 0) items[index] = { ...items[index], ...item }; else items.push(item); writeJson(this.storage, this.key, items); this.memory = items; return item; }
    remove(id) { const items = this.list().filter((item) => (item.id || item.cnj) !== id); writeJson(this.storage, this.key, items); this.memory = items; }
}

class LocalStorageKanbanAdapter {
    constructor({ storage, key = 'rdcj-motor-atuacao' } = {}) { this.storage = storageOf(storage); this.key = key; }
    state() { return readJson(this.storage, this.key, { fluxos: [], historicos: [], timers: [] }); }
    list() { return this.state().fluxos || []; }
    findByProcessId(id) { return this.list().find((item) => item.processoId === id); }
    save(item) { const state = this.state(); const items = state.fluxos || []; const index = items.findIndex((current) => current.processoId === item.processoId); if (index >= 0) items[index] = { ...items[index], ...item }; else items.push(item); state.fluxos = items; writeJson(this.storage, this.key, state); return item; }
    move(id, data) { const current = this.findByProcessId(id); if (!current) return null; return this.save({ ...current, ...data }); }
}

class LocalStorageAuditAdapter {
    constructor({ storage, key = 'rdcj-auditoria' } = {}) { this.storage = storageOf(storage); this.key = key; }
    list() { return readJson(this.storage, this.key, []); }
    append(event) { const events = [...this.list(), event]; writeJson(this.storage, this.key, events); return event; }
}
module.exports = { LocalStorageProcessAdapter, LocalStorageKanbanAdapter, LocalStorageAuditAdapter };
