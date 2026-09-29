# Repository Diagrams

## Current Architecture
```mermaid
flowchart LR
 UI[UI] --> LEG[JS legado]
 LEG --> LS[(LocalStorage)]
```

## Domain Architecture
```mermaid
flowchart TD
 E[Entities] --> S[Domain Services]
 V[Value Objects] --> E
 P[Policies] --> S
```

## Repository Architecture
```mermaid
flowchart TD
 S[Services] --> R[Repositories]
 R --> A[Adapters]
 A --> LS[(LocalStorage)]
```

## Future Provider Architecture
```mermaid
flowchart LR
 R[Repositories] --> PR[Provider Layer]
 PR --> API[REST API]
 PR --> DB[(Database)]
 PR --> SN[ServiceNow]
```

## Future ServiceNow Architecture
```mermaid
flowchart LR
 UI[UI] --> S[Services]
 S --> R[Repositories]
 R --> ACL[ServiceNow Adapter]
 ACL --> T[Process/Kanban Tables]
 ACL --> AUD[Audit/Events]
```

## RDCJ 2.0 Layered Architecture
```mermaid
flowchart TD
 UI[UI atual] --> DOMAIN[Domain Layer]
 DOMAIN --> REPO[Repository Layer]
 REPO --> ADAPTER[Adapters locais]
 ADAPTER --> STORAGE[Persistência atual]
 MEMORY[Memory/Context/Documentation] --> DOMAIN
```
