const { assertContract } = require('../domain/contracts');
class ProcessRepository { constructor(adapter) { assertContract(adapter, 'IProcessRepository'); this.adapter = adapter; } list() { return this.adapter.list(); } findById(id) { return this.adapter.findById(id); } findByCnj(cnj) { return this.adapter.findByCnj(cnj); } save(item) { return this.adapter.save(item); } remove(id) { return this.adapter.remove(id); } }
module.exports = { ProcessRepository };
