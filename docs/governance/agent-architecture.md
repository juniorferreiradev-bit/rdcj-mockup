# Agent Architecture — RDCJ 2.0

O Agent Layer é um framework determinístico para agentes especializados, sem IA real.

```text
AgentRegistry → AgentFactory → AgentBase → AgentOrchestrator
                                      ↓
                         Context/Memory/Documentation
```

Os agentes produzem análises e propostas. Não executam mutações automaticamente.
