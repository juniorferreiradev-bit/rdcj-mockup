const { AgentBase } = require('./agent-base');
class ReleaseAgent extends AgentBase { constructor() { super({ id: 'release', name: 'Release Agent', type: 'release', capabilities: ['releases','versioning','change-tracking','readiness'], dependencies: ['changelog','documentation-snapshot','traceability-matrix'] }); } run(request, context) { return { objective: request.objective || 'release-readiness', releases: context.context?.releases || [], changes: [], readiness: 'requires-human-approval' }; } }
module.exports = { ReleaseAgent };
