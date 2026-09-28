class GovernanceHealthService {
    constructor({ rootDir = process.cwd() } = {}) { this.rootDir = rootDir; }
    check({ templates = [], policies = [], workflows = [], matrices = [], approvals = [] } = {}) {
        const checks = { templates: templates.length > 0, policies: policies.length > 0, workflows: workflows.length > 0, matrices: matrices.length > 0, approvals: approvals.length >= 0 };
        return { status: Object.values(checks).every(Boolean) ? 'ready' : 'attention', checks, rootDir: this.rootDir };
    }
}
module.exports = { GovernanceHealthService };
