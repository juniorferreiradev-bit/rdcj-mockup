class MemoryProvider {
    constructor(repository) { if (!repository || !['read','save','update','getHistory'].every((method) => typeof repository[method] === 'function')) throw new TypeError('MemoryRepository incompatível.'); this.repository = repository; this.name = 'memory'; }
    read() { return this.repository.read(); } save(value) { return this.repository.save(value); } update(fn) { return this.repository.update(fn); } getHistory(filters) { return this.repository.getHistory(filters); } health() { return { name: this.name, available: true, compatible: true }; }
}
module.exports = { MemoryProvider };
