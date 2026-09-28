const { assertContract } = require('../domain/contracts');
class MemoryRepositoryAdapter { constructor(repository) { assertContract(repository, 'IMemoryRepository'); this.repository = repository; } read() { return this.repository.read(); } save(value) { return this.repository.save(value); } update(fn) { return this.repository.update(fn); } getHistory(filters) { return this.repository.getHistory(filters); } }
module.exports = { MemoryRepositoryAdapter };
