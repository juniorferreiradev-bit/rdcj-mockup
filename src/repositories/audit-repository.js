const { assertContract } = require('../domain/contracts');
class AuditRepository { constructor(adapter) { assertContract(adapter, 'IAuditRepository'); this.adapter = adapter; } list() { return this.adapter.list(); } append(event) { return this.adapter.append(event); } }
module.exports = { AuditRepository };
