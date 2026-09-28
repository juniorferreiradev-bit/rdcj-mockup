const { ProductOwnerAgent } = require('../core/product-owner-agent');
const { ArchitectAgent } = require('../core/architect-agent');
const { MemoryAgent } = require('../core/memory-agent');
const { DocumentationAgent } = require('../core/documentation-agent');
const { DevelopmentAgent } = require('../core/development-agent');
const { QAAgent } = require('../core/qa-agent');
const { ReleaseAgent } = require('../core/release-agent');
const TYPES = { 'product-owner': ProductOwnerAgent, architect: ArchitectAgent, memory: MemoryAgent, documentation: DocumentationAgent, development: DevelopmentAgent, qa: QAAgent, release: ReleaseAgent };
class AgentFactory { static create(type, dependencies = {}) { const Agent = TYPES[type]; if (!Agent) throw new Error(`Tipo de agente desconhecido: ${type}`); return new Agent(dependencies); } }
module.exports = { AgentFactory, TYPES };
