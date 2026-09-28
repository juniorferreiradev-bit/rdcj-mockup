const { StorageProviderBase } = require('./storage-provider-base');
class ServiceNowProvider extends StorageProviderBase {
    constructor({ instance = null, tables = {} } = {}) { super({ name: 'servicenow', available: false }); this.instance = instance; this.tables = { processo: 'x_825936_rdcj_processo', kanban: 'x_825936_rdcj_kanban', ...tables }; }
    health() { return { ...super.health(), connected: false, configured: Boolean(this.instance), tables: this.tables, realCalls: false, status: 'stub-only' }; }
}
module.exports = { ServiceNowProvider };
