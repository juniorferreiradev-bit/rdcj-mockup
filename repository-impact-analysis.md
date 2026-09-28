# Repository Impact Analysis

| Módulo atual | Dependência atual | Dependência futura | Risco | Complexidade |
|---|---|---|---|---|
| Dashboard | `rdcjMatrixUI`, `localStorage` indiretamente | ProcessService/ProcessRepository | médio | média |
| Matriz RDCJ | `base-manager.js`, `matrix-ui.js` | ProcessService/ProcessRepository | alto | alta |
| Processo 360 | MatrixUI, Motor, Auditoria | ProcessService/KanbanService/AuditService | alto | alta |
| Kanban | Motor de Atuação e localStorage | KanbanService/KanbanRepository | alto | alta |
| Motor de Atuação | `rdcj-motor-atuacao` | KanbanRepository | alto | alta |
| Auditoria | `rdcj-auditoria` | AuditRepository | alto | média |
| Memory Layer | MemoryRepository | MemoryRepositoryAdapter | baixo | baixa |
| Context Layer | ContextRepository/Engine | ContextRepositoryAdapter | baixo | baixa |
| Documentation Layer | DocumentationRepository/Engine | DocumentationRepositoryAdapter | baixo | baixa |

A matriz é analítica; nenhuma migração foi executada.
