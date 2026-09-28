# Governança de Agentes — RDCJ 2.0

## Responsabilidades

Cada agente possui identidade, tipo, versão, capabilities e dependências explícitas.

## Limites

- Nenhum agente chama LLM.
- Nenhum agente altera UI ou regras de negócio.
- Nenhum agente executa automaticamente.
- Toda mutação proposta exige aprovação humana.
- Saídas devem conter contexto e fontes.

## Aprovações

Mudanças em memória, arquitetura, documentação oficial, releases ou ServiceNow exigem aprovação do responsável definido no RACI.

## Auditoria

O `AgentBase` registra telemetria e eventos de execução em memória local do agente. Integração com auditoria persistente é futura.

## Segregação de funções

Product Owner prioriza; Architect analisa arquitetura; Memory gerencia memória; Documentation gerencia documentação; Development analisa impacto; QA valida; Release avalia prontidão.
