const { AgentBase } = require('./agent-base');
class MemoryAgent extends AgentBase { constructor() { super({ id: 'memory', name: 'Memory Agent', type: 'memory', capabilities: ['memory','history','decisions','releases','memory-audit'], dependencies: ['project-memory','memory-history'] }); } run(request, context) { return { objective: request.objective || 'memory-context', memory: context.context?.memory || [], history: context.memoryHistory || [], proposedMutation: null }; } }
module.exports = { MemoryAgent };
