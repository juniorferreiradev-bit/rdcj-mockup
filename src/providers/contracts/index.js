const PROVIDER_CONTRACTS = Object.freeze({
    IStorageProvider: ['connect','read','write','update','remove','health'],
    IProcessProvider: ['list','findById','findByCnj','save','remove','health'],
    IKanbanProvider: ['list','findByProcessId','save','move','health'],
    IAuditProvider: ['list','append','health'],
    IMemoryProvider: ['read','save','update','getHistory','health'],
    IContextProvider: ['getSnapshot','getProjectContext','getArchitectureContext','health'],
    IDocumentationProvider: ['getSnapshot','getIndex','getHealth','health']
});
function assertProviderContract(provider, name) { const methods = PROVIDER_CONTRACTS[name]; if (!methods) throw new Error(`Contrato desconhecido: ${name}`); methods.forEach((method) => { if (!provider || typeof provider[method] !== 'function') throw new TypeError(`${name} requer ${method}().`); }); return true; }
module.exports = { PROVIDER_CONTRACTS, assertProviderContract };
