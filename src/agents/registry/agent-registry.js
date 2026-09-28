const { assertAgentContract } = require('../contracts');
class AgentRegistry { constructor() { this.agents = new Map(); } register(agent) { assertAgentContract(agent); this.agents.set(agent.id, agent); return agent; } resolve(id) { if (!this.agents.has(id)) throw new Error(`Agente não registrado: ${id}`); return this.agents.get(id); } exists(id) { return this.agents.has(id); } list() { return [...this.agents.values()]; } health() { return Object.fromEntries([...this.agents.entries()].map(([id, agent]) => [id, agent.health()])); } }
module.exports = { AgentRegistry };
