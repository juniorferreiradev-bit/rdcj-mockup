const fs = require('node:fs');
const path = require('node:path');

class ServiceNowReadinessHealthService {
    constructor({ rootDir = process.cwd() } = {}) { this.rootDir = rootDir; }

    check({ contracts = [], mappings = [], migration = {}, security = {}, governance = {}, riskMatrix = null } = {}) {
        const checks = {
            contracts: Array.isArray(contracts) && contracts.length >= 8,
            mappings: Array.isArray(mappings) ? mappings.length >= 2 : Boolean(mappings && mappings.tables),
            migration: Boolean(migration.strategy && migration.data && migration.provider),
            security: Boolean(security.acl && security.model),
            governance: Boolean(governance.model && governance.checklist),
            riskMatrix: Boolean(riskMatrix && Array.isArray(riskMatrix.risks) && riskMatrix.risks.length > 0)
        };
        return { status: Object.values(checks).every(Boolean) ? 'ready' : 'attention', checks, connected: false, migrationExecuted: false, realCalls: false, rootDir: this.rootDir };
    }

    checkFiles() {
        const required = [
            'docs/servicenow/servicenow-table-mapping.json', 'docs/servicenow/contracts/process-contract.json', 'docs/servicenow/contracts/kanban-contract.json', 'docs/governance/audit-contract.json', 'docs/governance/memory-contract.json', 'docs/governance/context-contract.json', 'docs/governance/documentation-contract.json', 'docs/governance/agent-contract.json', 'docs/governance/governance-contract.json',
            'docs/servicenow/servicenow-api-mapping.md', 'docs/servicenow/workspace-blueprint.md', 'docs/governance/acl-strategy.md', 'docs/governance/security-model.md', 'docs/servicenow/migration-strategy.md', 'docs/servicenow/data-migration-plan.md', 'docs/servicenow/provider-migration-plan.md', 'docs/governance/agent-runtime-model.md', 'docs/servicenow/servicenow-governance-model.md', 'docs/releases/operational-readiness-checklist.md', 'docs/releases/deployment-readiness-report.md', 'docs/servicenow/servicenow-risk-matrix.json', 'docs/servicenow/servicenow-runbook.md'
        ];
        const files = Object.fromEntries(required.map((file) => [file, fs.existsSync(path.join(this.rootDir, file))]));
        return { status: Object.values(files).every(Boolean) ? 'ready' : 'attention', files, connected: false, migrationExecuted: false, realCalls: false };
    }
}

module.exports = { ServiceNowReadinessHealthService };
