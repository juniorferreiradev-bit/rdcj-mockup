const { assertContract } = require('../domain/contracts');
class DocumentationRepositoryAdapter { constructor(repository, engine) { assertContract(repository, 'IDocumentationRepository'); this.repository = repository; this.engine = engine; } readSources() { return this.repository.readSources(); } writeDerived(files) { return this.repository.writeDerived(files); } readSnapshot() { return this.engine ? this.engine.build().snapshot : null; } }
module.exports = { DocumentationRepositoryAdapter };
