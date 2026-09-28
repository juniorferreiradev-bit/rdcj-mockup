const { StorageProviderBase } = require('./storage-provider-base');
class LocalStorageProvider extends StorageProviderBase {
    constructor({ storage, keys = {} } = {}) { super({ name: 'localstorage' }); this.storage = storage || (typeof globalThis !== 'undefined' ? globalThis.localStorage : null); this.keys = { processos: 'rdcj-processos', motor: 'rdcj-motor-atuacao', auditoria: 'rdcj-auditoria', ...keys }; }
    connect() { this.connected = true; return true; }
    read(name) { return parse(this.storage && this.storage.getItem(this.keys[name])); }
    write(name, value) { if (this.storage) this.storage.setItem(this.keys[name], JSON.stringify(value)); return value; }
    update(name, updater) { const value = updater(this.read(name)); return this.write(name, value); }
    remove(name) { if (this.storage) this.storage.removeItem(this.keys[name]); }
    health() { return { ...super.health(), keys: this.keys, compatible: true }; }
}
function parse(value) { if (!value) return null; try { return JSON.parse(value); } catch { return null; } }
module.exports = { LocalStorageProvider };
