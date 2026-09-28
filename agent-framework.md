# Agent Framework

Componentes:

- `IAgent`: contrato mínimo.
- `AgentBase`: identidade, lifecycle, telemetria, auditoria e health.
- `AgentRegistry`: registro e resolução.
- `AgentFactory`: criação por tipo.
- `AgentOrchestrator`: solicitação → contexto → agente → validação → resultado.
- `AgentHealthService`: verificação de registro, configuração, contexto, capacidades e dependências.

Não há chamadas externas ou execução automática.
