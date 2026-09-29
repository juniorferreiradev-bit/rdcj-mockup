# ServiceNow Readiness

## Objetivo

Preparar o RDCJ para futura migração, integração, deploy, runtime e governança ServiceNow sem executar nenhuma dessas ações.

## Consolidado

- **Table Mapping:** Processo e Kanban mapeados; Auditoria, Memória, Contexto, Documentação, Agents e Governance propostos.
- **Data Contracts:** oito contratos JSON com identificadores, tipos e validações.
- **ACL Strategy:** perfis Administrador, Operador, Gestor, Auditor, Arquitetura e Agents.
- **Workspace Blueprint:** Dashboard, Matriz, Kanban, Processo 360°, Auditoria, Governança e Agents.
- **Migration Strategy:** descoberta, preparação, carga, validação, cutover e operação assistida.
- **Runbook:** deploy, rollback, incidentes, suporte e operações.

## Status atual

**Parcial / design-only.** Contratos, mapeamentos, blueprint, segurança conceitual, riscos e health model estão preparados. Tabelas, APIs, ACLs, Workspace, carga, conexão e runtime real não estão prontos por decisão de escopo.

## Restrições

Não foram criadas tabelas, Script Includes, Business Rules, Flows, ACLs reais ou chamadas REST. O `ServiceNowProvider` permanece stub-only.
