const AGENT_TYPES = Object.freeze(['product-owner','architect','memory','documentation','development','qa','release']);
const AGENT_METHODS = Object.freeze(['execute','validate','health']);
function assertAgentContract(agent) { ['id','name','type','version','capabilities',...AGENT_METHODS].forEach((field) => { if (agent == null || typeof agent[field] === 'undefined') throw new TypeError(`IAgent requer ${field}.`); }); if (!AGENT_TYPES.includes(agent.type)) throw new TypeError(`Tipo de agente inválido: ${agent.type}`); return true; }
module.exports = { AGENT_TYPES, AGENT_METHODS, assertAgentContract };
