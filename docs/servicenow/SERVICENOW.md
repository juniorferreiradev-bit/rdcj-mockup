# RDCJ — Documentação ServiceNow

## Status

Preparação documental apenas. Nenhuma migração, conexão, chamada REST ou criação de artefato ServiceNow foi executada.

## Referências

- Runtime readiness: `SERVICENOW-READINESS.md` e `servicenow-runtime-readiness.md`.
- Table mapping: `servicenow-table-mapping.json`.
- Data contracts: `contracts/`.
- API mapping: `servicenow-api-mapping.md`.
- Workspace blueprint: `workspace-blueprint.md`.
- Segurança: `../governance/acl-strategy.md` e `../governance/security-model.md`.
- Migração: `migration-strategy.md`, `data-migration-plan.md` e `provider-migration-plan.md`.
- Operação: `servicenow-runbook.md`.
- Decisão de reestruturação: `../decisions/ADR-0002-Reestruturacao-Repositorio.md`.

## Mapeamentos existentes

Processo e Kanban são mapeados às tabelas existentes documentadas. Auditoria, Memória, Contexto, Documentação, Agents e Governance permanecem propostas de design; não foram criadas tabelas reais.

## Segurança e governança

ACL Strategy e Security Model são referências arquiteturais, não ACLs implementadas. Qualquer execução futura depende de aprovação, ambiente homologado, least privilege, auditoria e plano de rollback.

## Preservação funcional

O ServiceNowProvider continua stub-only. A arquitetura atual e suas telas permanecem independentes do runtime futuro.
