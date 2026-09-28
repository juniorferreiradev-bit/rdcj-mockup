class ProviderRegistry {
    constructor() { this.providers = new Map(); }
    register(name, provider) { if (!name || !provider) throw new TypeError('Nome e provider são obrigatórios.'); this.providers.set(name, provider); return provider; }
    resolve(name) { if (!this.providers.has(name)) throw new Error(`Provider não registrado: ${name}`); return this.providers.get(name); }
    exists(name) { return this.providers.has(name); }
    list() { return [...this.providers.keys()]; }
    health() { return Object.fromEntries([...this.providers.entries()].map(([name, provider]) => [name, typeof provider.health === 'function' ? provider.health() : { status: 'invalid' }])); }
}
module.exports = { ProviderRegistry };
