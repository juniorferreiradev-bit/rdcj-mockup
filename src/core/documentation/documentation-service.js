class DocumentationService {
    constructor({ engine }) { if (!engine) throw new TypeError('DocumentationService requer um DocumentationEngine.'); this.engine = engine; }
    snapshot() { return this.engine.build().snapshot; }
    index() { return this.engine.build().index; }
    model() { return this.engine.build().model; }
    health() { return this.engine.healthCheck(); }
    generate() { return this.engine.build(); }
}
module.exports = { DocumentationService };
