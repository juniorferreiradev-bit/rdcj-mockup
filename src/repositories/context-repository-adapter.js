const { assertContract } = require('../domain/contracts');
class ContextRepositoryAdapter { constructor(repository, engine) { assertContract(repository, 'IContextRepository'); this.repository = repository; this.engine = engine; } readDocuments() { return this.repository.readDocuments(); } readMemory() { return this.repository.readMemory(); } fingerprint(documents, memory) { return this.repository.fingerprint(documents, memory); } readSnapshot() { return this.engine ? this.engine.build() : null; } }
module.exports = { ContextRepositoryAdapter };
