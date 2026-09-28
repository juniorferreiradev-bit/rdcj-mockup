class ProcessService { constructor(repository) { this.repository = repository; } list() { return this.repository.list(); } get(id) { return this.repository.findById(id); } save(processo) { return this.repository.save(processo); } }
class KanbanService { constructor(repository) { this.repository = repository; } list() { return this.repository.list(); } move(id, data) { return this.repository.move(id, data); } }
class ClassificationService { classify(classifier, processo) { if (!classifier || typeof classifier.classificarProcesso !== 'function') throw new TypeError('Classificador incompatível.'); return classifier.classificarProcesso(processo); } }
class AuditService { constructor(repository) { this.repository = repository; } list() { return this.repository.list(); } append(event) { return this.repository.append(event); } }
class MemoryDomainService { constructor(repository) { this.repository = repository; } read() { return this.repository.read(); } save(memory) { return this.repository.save(memory); } }
class ContextDomainService { constructor(repository) { this.repository = repository; } snapshot() { return this.repository.readSnapshot(); } }
class DocumentationDomainService { constructor(repository) { this.repository = repository; } snapshot() { return this.repository.readSnapshot(); } }
module.exports = { ProcessService, KanbanService, ClassificationService, AuditService, MemoryDomainService, ContextDomainService, DocumentationDomainService, ...require('../kanban/services') };
