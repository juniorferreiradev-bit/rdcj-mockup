const { LocalStorageProvider } = require('../implementations/local-storage-provider');
const { ServiceNowProvider } = require('../implementations/servicenow-provider');
const { FutureDatabaseProvider } = require('../implementations/future-database-provider');
class ProviderFactory {
    static create(type, options = {}) { switch (type) { case 'localstorage': return new LocalStorageProvider(options); case 'servicenow': return new ServiceNowProvider(options); case 'database': return new FutureDatabaseProvider(options); case 'memory': return options.provider || options.repository; case 'context': return options.provider || options.engine; case 'documentation': return options.provider || options.engine; default: throw new Error(`Tipo de provider desconhecido: ${type}`); } }
}
module.exports = { ProviderFactory };
