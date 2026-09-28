const { StorageProviderBase } = require('./storage-provider-base');
class FutureDatabaseProvider extends StorageProviderBase {
    constructor(options = {}) { super({ name: 'database', available: false }); this.options = options; }
    health() { return { ...super.health(), configured: false, status: 'stub-only', realCalls: false }; }
}
module.exports = { FutureDatabaseProvider };
