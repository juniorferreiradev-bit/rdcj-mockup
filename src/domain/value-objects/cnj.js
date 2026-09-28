class Cnj {
    constructor(value) { const normalized = String(value || '').trim(); if (!normalized) throw new TypeError('CNJ obrigatório.'); this.value = normalized; }
    toString() { return this.value; }
    equals(other) { return (other instanceof Cnj ? other.value : String(other || '').trim()) === this.value; }
}
module.exports = { Cnj };
