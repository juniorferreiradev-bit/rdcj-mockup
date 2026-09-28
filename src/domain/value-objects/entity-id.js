class EntityId {
    constructor(value) { if (!value || typeof value !== 'string') throw new TypeError('EntityId inválido.'); this.value = value; }
    toString() { return this.value; }
    equals(other) { return other instanceof EntityId ? other.value === this.value : other === this.value; }
}
module.exports = { EntityId };
