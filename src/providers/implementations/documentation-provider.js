class DocumentationProvider {
    constructor(engine) { if (!engine || typeof engine.build !== 'function') throw new TypeError('DocumentationEngine incompatível.'); this.engine = engine; this.name = 'documentation'; }
    getSnapshot() { return this.engine.build().snapshot; } getIndex() { return this.engine.build().index; } getHealth() { return this.engine.healthCheck(); } health() { return { name: this.name, available: true, compatible: true }; }
}
module.exports = { DocumentationProvider };
