# Mapeamento de Repositórios — RDCJ 2.0

| Módulo | Repositório | Persistência atual | Futuro |
|---|---|---|---|
| Matriz RDCJ | `ProcessRepository` | `rdcj-processos` | API/ServiceNow Processo |
| Processo 360 | `ProcessRepository` | `rdcj-processos` | API/ServiceNow Processo |
| Kanban | `KanbanRepository` | `rdcj-motor-atuacao` | API/ServiceNow Kanban |
| Motor de Atuação | `KanbanRepository` | `rdcj-motor-atuacao` | Workflow/API |
| Auditoria | `AuditRepository` | `rdcj-auditoria` | Audit store/ServiceNow |
| Memory Engine | `MemoryRepositoryAdapter` | `MemoryRepository` | Memory Service |
| Context Engine | `ContextRepositoryAdapter` | `ContextRepository` | Context API |
| Documentation Engine | `DocumentationRepositoryAdapter` | `DocumentationRepository` | Documentation API |

A camada nova não é conectada às páginas existentes nesta sprint.
