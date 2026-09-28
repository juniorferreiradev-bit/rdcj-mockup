class Money {
    constructor(value = 0, currency = 'BRL') { const amount = Number(value); if (!Number.isFinite(amount)) throw new TypeError('Valor monetário inválido.'); this.amount = amount; this.currency = currency; }
    equals(other) { return other instanceof Money && other.amount === this.amount && other.currency === this.currency; }
}
module.exports = { Money };
