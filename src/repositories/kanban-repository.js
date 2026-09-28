const { assertContract } = require('../domain/contracts');
class KanbanRepository { constructor(adapter) { assertContract(adapter, 'IKanbanRepository'); this.adapter = adapter; } list() { return this.adapter.list(); } findByProcessId(id) { return this.adapter.findByProcessId(id); } save(item) { return this.adapter.save(item); } move(id, data) { return this.adapter.move(id, data); } }
module.exports = { KanbanRepository };
