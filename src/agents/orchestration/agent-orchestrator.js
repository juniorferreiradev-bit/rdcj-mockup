class AgentOrchestrator {
    constructor({ registry, contextProvider }) { if (!registry) throw new TypeError('AgentRegistry obrigatório.'); this.registry = registry; this.contextProvider = contextProvider || null; }
    run(agentId, request = {}, context = null) { const agent = this.registry.resolve(agentId); const resolvedContext = context || (this.contextProvider && this.contextProvider.getSnapshot ? this.contextProvider.getSnapshot() : {}); return agent.execute(request, { ...resolvedContext, fingerprint: resolvedContext.fingerprint || null }); }
}
module.exports = { AgentOrchestrator };
