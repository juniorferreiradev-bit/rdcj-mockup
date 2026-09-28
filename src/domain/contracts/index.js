const CONTRACTS = Object.freeze({
    IProcessRepository: ['list','findById','findByCnj','save','remove'],
    IKanbanRepository: ['list','findByProcessId','save','move'],
    IAuditRepository: ['list','append'],
    IMemoryRepository: ['read','save','update','getHistory'],
    IContextRepository: ['readDocuments','readMemory','fingerprint'],
    IDocumentationRepository: ['readSources','writeDerived']
});
function assertContract(candidate, name) { const required = CONTRACTS[name]; if (!required) throw new Error(`Contrato desconhecido: ${name}`); required.forEach((method) => { if (!candidate || typeof candidate[method] !== 'function') throw new TypeError(`${name} requer ${method}().`); }); return true; }
module.exports = { CONTRACTS, assertContract };
