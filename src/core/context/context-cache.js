class ContextCache {
    constructor({ maxEntries = 2 } = {}) { this.maxEntries = maxEntries; this.entries = new Map(); this.hits = 0; this.misses = 0; }
    get(key) {
        if (!this.entries.has(key)) { this.misses += 1; return null; }
        const value = this.entries.get(key); this.entries.delete(key); this.entries.set(key, value); this.hits += 1; return clone(value);
    }
    set(key, value) {
        if (this.entries.has(key)) this.entries.delete(key);
        this.entries.set(key, clone(value));
        while (this.entries.size > this.maxEntries) this.entries.delete(this.entries.keys().next().value);
        return clone(value);
    }
    invalidate(key) { if (key) this.entries.delete(key); else this.entries.clear(); }
    stats() { return { size: this.entries.size, hits: this.hits, misses: this.misses }; }
}
function clone(value) { return JSON.parse(JSON.stringify(value)); }
module.exports = { ContextCache };
