# Provider Diagrams

## Current Persistence Flow
```mermaid
flowchart LR
 UI[UI atual] --> LEG[JS legado] --> LS[(LocalStorage)]
```

## Provider Architecture
```mermaid
flowchart TD
 R[Repository] --> P[ProviderRegistry]
 P --> L[LocalStorageProvider]
 P --> M[MemoryProvider]
 P --> C[ContextProvider]
 P --> D[DocumentationProvider]
```

## Repository → Provider Flow
```mermaid
sequenceDiagram
 participant S as Service
 participant R as Repository
 participant P as Provider
 participant ST as Storage
 S->>R: comando/consulta
 R->>P: operação contratada
 P->>ST: leitura/escrita
 ST-->>P: resultado
 P-->>R: entidade/dado
 R-->>S: resposta
```

## Future ServiceNow Flow
```mermaid
flowchart LR
 R[Repository] --> SN[ServiceNowProvider]
 SN --> T[ServiceNow Tables/REST]
 SN --> A[Audit/Reconciliation]
```

## Future Database Flow
```mermaid
flowchart LR
 R[Repository] --> DBP[FutureDatabaseProvider]
 DBP --> DB[(Database)]
```

## Complete RDCJ Layered Architecture
```mermaid
flowchart TD
 UI[UI atual] --> DOMAIN[Domain Layer]
 DOMAIN --> REPO[Repository Layer]
 REPO --> PROVIDER[Provider Layer]
 PROVIDER --> STORAGE[LocalStorage / ServiceNow / DB / API]
 MEMORY[Memory] --> DOMAIN
 CONTEXT[Context] --> DOMAIN
 DOC[Documentation] --> DOMAIN
```
