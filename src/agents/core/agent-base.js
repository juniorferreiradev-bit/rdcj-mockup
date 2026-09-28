const { assertAgentContract } = require('../contracts');
class AgentBase {
    constructor({ id, name, type, version = '1.0.0', capabilities = [], dependencies = [] } = {}) { this.id = id; this.name = name; this.type = type; this.version = version; this.capabilities = capabilities; this.dependencies = dependencies; this.lifecycle = 'ready'; this.telemetry = []; this.audit = []; assertAgentContract(this); }
    validate(request = {}) { return { valid: Boolean(request && typeof request === 'object'), errors: request && typeof request === 'object' ? [] : ['request inválido'] }; }
    health() { return { id: this.id, type: this.type, lifecycle: this.lifecycle, capabilities: this.capabilities, dependencies: this.dependencies, status: 'ready' }; }
    execute(request = {}, context = {}) { const validation = this.validate(request); if (!validation.valid) throw new Error(validation.errors.join('; ')); const startedAt = new Date().toISOString(); const result = this.run(request, context); this.telemetry.push({ startedAt, completedAt: new Date().toISOString(), requestType: request.type || 'unspecified' }); this.audit.push({ type: 'AGENT_EXECUTED', agentId: this.id, at: new Date().toISOString() }); return { agentId: this.id, agentVersion: this.version, result, contextFingerprint: context.fingerprint || null, requiresApproval: true }; }
    run() { throw new Error(`${this.name} não implementa run().`); }
}
module.exports = { AgentBase };
