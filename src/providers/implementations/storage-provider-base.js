class StorageProviderBase {
    constructor({ name = 'storage', available = true } = {}) { this.name = name; this.available = available; this.connected = false; }
    connect() { this.connected = this.available; return this.connected; }
    read() { throw new Error(`${this.name}: read não implementado.`); }
    write() { throw new Error(`${this.name}: write não implementado.`); }
    update() { throw new Error(`${this.name}: update não implementado.`); }
    remove() { throw new Error(`${this.name}: remove não implementado.`); }
    health() { return { name: this.name, available: this.available, connected: this.connected, status: this.available ? 'available' : 'unavailable' }; }
}
module.exports = { StorageProviderBase };
