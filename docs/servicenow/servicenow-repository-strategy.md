# ServiceNow Repository Strategy

| Repository | Entidade ServiceNow | Estratégia futura |
|---|---|---|
| ProcessRepository | `x_825936_rdcj_processo` | adapter REST/Table API, paginação e mapeamento |
| KanbanRepository | `x_825936_rdcj_kanban` | adapter de comandos, validação e concorrência |
| AuditRepository | auditoria/eventos | tabela/event store append-only |
| MemoryRepository | memória RDCJ | tabela/document store versionado |
| ContextRepository | contexto consolidado | serviço/index de contexto |
| DocumentationRepository | documentação viva | knowledge/document store |

Não há integração ServiceNow nesta etapa. O objetivo é garantir contratos neutros e preservar regras de negócio.
