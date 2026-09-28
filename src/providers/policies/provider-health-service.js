class ProviderHealthService {
    constructor(registry) { this.registry = registry; }
    check(name) { const provider = this.registry.resolve(name); const health = provider.health(); return { name, registered: true, resolved: true, compatible: health.compatible !== false, available: health.available !== false, health }; }
    checkAll() { return Object.fromEntries(this.registry.list().map((name) => [name, this.check(name)])); }
}
module.exports = { ProviderHealthService };
