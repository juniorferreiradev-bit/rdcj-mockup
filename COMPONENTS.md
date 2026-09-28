# Component Catalog

## Serviços e domínio

- `ProcessService`: acesso de aplicação a processos.
- `KanbanService`: acesso legado contratual a cartões.
- `ClassificationService`: classificação de domínio.
- `AuditService`: eventos de auditoria.
- Entidades: `Processo`, `FluxoOperacional`, `KanbanCard`, `MatrizClassificacao`, `Auditoria`.
- Value objects: identidade, CNJ, moeda, peso e quadrante.

## Repositories

- `ProcessRepository`
- `KanbanRepository`
- `AuditRepository`
- adapters de Memory, Context e Documentation

## Providers

- `LocalStorageProvider`
- `MemoryProvider`
- `ContextProvider`
- `DocumentationProvider`
- `ServiceNowProvider` stub-only
- `FutureDatabaseProvider` futuro

## Agents

- ProductOwnerAgent
- ArchitectAgent
- MemoryAgent
- DocumentationAgent
- DevelopmentAgent
- QAAgent
- ReleaseAgent

Registry, factory, orchestrator e health service compõem o framework.

## Governance

Templates, workflows, matrizes RACI, readiness e `GovernanceHealthService`.

## Kanban 2.0

- `KanbanMetricsService`
- `KanbanSLAService`
- `KanbanWIPService`
- `KanbanMovementService`
- `MovementReasonPolicy`
- `KanbanAuditService`
- `KanbanHistoryService`
- `KanbanExecutiveMetrics`
- `KanbanAlertService`

## Frontend legado

Dashboard, Matriz, Carteira, Processo 360° e Kanban continuam em HTML/CSS/JS sem build, com componentes visuais documentados no baseline.
