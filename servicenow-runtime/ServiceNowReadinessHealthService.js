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
            'servicenow-table-mapping.json', 'process-contract.json', 'kanban-contract.json', 'audit-contract.json', 'memory-contract.json', 'context-contract.json', 'documentation-contract.json', 'agent-contract.json', 'governance-contract.json',
            'servicenow-api-mapping.md', 'workspace-blueprint.md', 'acl-strategy.md', 'security-model.md', 'migration-strategy.md', 'data-migration-plan.md', 'provider-migration-plan.md', 'agent-runtime-model.md', 'servicenow-governance-model.md', 'operational-readiness-checklist.md', 'deployment-readiness-report.md', 'servicenow-risk-matrix.json', 'servicenow-runbook.md'
        ];
        const files = Object.fromEntries(required.map((file) => [file, fs.existsSync(path.join(this.rootDir, file))]));
        return { status: Object.values(files).every(Boolean) ? 'ready' : 'attention', files, connected: false, migrationExecuted: false, realCalls: false };
    }
}

module.exports = { ServiceNowReadinessHealthService };
