const { AgentBase } = require('./core/agent-base');
const agents = { ...require('./core/product-owner-agent'), ...require('./core/architect-agent'), ...require('./core/memory-agent'), ...require('./core/documentation-agent'), ...require('./core/development-agent'), ...require('./core/qa-agent'), ...require('./core/release-agent') };
const { AgentRegistry } = require('./registry/agent-registry');
const { AgentFactory } = require('./registry/agent-factory');
const { AgentOrchestrator } = require('./orchestration/agent-orchestrator');
const { AgentHealthService } = require('./governance/agent-health-service');
module.exports = { AgentBase, ...agents, AgentRegistry, AgentFactory, AgentOrchestrator, AgentHealthService };
