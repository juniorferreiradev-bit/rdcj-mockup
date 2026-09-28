class RepositoryRegistry {
    constructor() { this.repositories = new Map(); }
    register(name, repository) { if (!name || !repository) throw new TypeError('Nome e repository são obrigatórios.'); this.repositories.set(name, repository); return repository; }
    resolve(name) { if (!this.repositories.has(name)) throw new Error(`Repository não registrado: ${name}`); return this.repositories.get(name); }
    has(name) { return this.repositories.has(name); }
    list() { return [...this.repositories.keys()]; }
}
module.exports = { RepositoryRegistry };
