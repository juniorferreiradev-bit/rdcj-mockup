# ServiceNow API Mapping

## Fluxo futuro

`Repositories` definem operações de domínio → `Providers` encapsulam armazenamento → REST APIs futuras expõem contratos autorizados.

| Repository | Provider futuro | API futura | Status |
|---|---|---|---|
| ProcessRepository | ServiceNowProvider | `/api/x_825936_rdcj/carteira/processos` | mapeado, não executado |
| KanbanRepository | ServiceNowProvider | `/api/x_825936_rdcj/kanban_ops/board` e operações de movimento | mapeado, não executado |
| AuditRepository | ServiceNowProvider | `/api/x_825936_rdcj/audit` | proposto |
| MemoryRepository | ServiceNowProvider | `/api/x_825936_rdcj/memory` | proposto |
| ContextRepository | ServiceNowProvider | `/api/x_825936_rdcj/context` | proposto |
| DocumentationRepository | ServiceNowProvider | `/api/x_825936_rdcj/documentation` | proposto |
| Agent runtime | ServiceNowProvider/Agent gateway | `/api/x_825936_rdcj/agents` | proposto |
| Governance | ServiceNowProvider | `/api/x_825936_rdcj/governance` | proposto |

Nenhum endpoint é implementado, chamado ou autenticado nesta Sprint.
