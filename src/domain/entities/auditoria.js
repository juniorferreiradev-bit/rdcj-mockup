class Auditoria {
    constructor(data = {}) { ['tipo','data','usuario'].forEach((field) => { if (!data[field]) throw new TypeError(`Auditoria requer ${field}.`); }); this.id = data.id || null; this.tipo = data.tipo; this.data = data.data; this.usuario = data.usuario; this.processoId = data.processoId || null; this.detalhes = data.detalhes || null; }
    toJSON() { return { id: this.id, tipo: this.tipo, data: this.data, usuario: this.usuario, processoId: this.processoId, detalhes: this.detalhes }; }
}
module.exports = { Auditoria };
