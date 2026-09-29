# Contrato de Contexto para Agentes — RDCJ 2.0

## Entrada

Todo agente deve receber um envelope com:

- `agentId` e `agentVersion`;
- `requestId` e `requestedBy`;
- `query` ou objetivo operacional;
- `contextSnapshot` com fingerprint e data de geração;
- `minimumContext` indicando projeto, arquitetura, módulos, decisões e restrições relevantes;
- `sources` com caminhos e hashes consultados;
- `permissions` e escopo de dados;
- `constraints`, incluindo regras que não podem ser alteradas.

## Saída

A resposta deve conter:

- `agentId`;
- `requestId`;
- `answer` estruturada;
- `evidence` com referências aos documentos/fontes;
- `assumptions` explícitas;
- `confidence` qualitativa;
- `proposedChanges`, sempre separadas de alterações executadas;
- `requiresApproval`;
- `createdAt`;
- `contextFingerprint`.

## Contexto mínimo obrigatório

- identidade e versão do projeto;
- arquitetura atual e alvo;
- decisões vigentes;
- módulos/features relacionados;
- backlog e roadmap pertinentes;
- restrições de compatibilidade;
- fontes consultadas.

## Regras

Agentes não devem inventar fontes, alterar regras de negócio, executar mutações sem autorização ou tratar snapshot como fonte autoritativa. Toda execução futura deverá ser registrada na memória/auditoria apropriada.
