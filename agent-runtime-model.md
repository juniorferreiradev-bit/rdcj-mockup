# Agent Runtime Model

| Agent | Permissão | Limite | Fontes |
|---|---|---|---|
| ProductOwnerAgent | advisory/approval-required | não altera dados | requisitos, contratos, métricas |
| ArchitectAgent | read-only/review | não executa runtime | arquitetura, mapeamentos, health |
| MemoryAgent | read-only | não publica sem aprovação | Memory Layer |
| DocumentationAgent | read-only/derived | não altera fonte normativa | Documentation Layer |
| DevelopmentAgent | advisory | sem deploy automático | código e testes |
| QAAgent | read-only/validation | sem correção automática | contratos e suítes |
| ReleaseAgent | approval-required | não promove sem gate | readiness, riscos e governança |

Toda execução futura exige contexto, trace_id, escopo e política de aprovação.
