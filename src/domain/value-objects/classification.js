const QUADRANTES = Object.freeze(['N1','N2','N3','N4','N5','N6','N7','N8','N9']);
const PESOS = Object.freeze(['P1','P2','P3','P4']);
class Quadrante { constructor(value) { if (!QUADRANTES.includes(value)) throw new TypeError(`Quadrante inválido: ${value}`); this.value = value; } }
class Peso { constructor(value) { if (!PESOS.includes(value)) throw new TypeError(`Peso inválido: ${value}`); this.value = value; } }
module.exports = { QUADRANTES, PESOS, Quadrante, Peso };
