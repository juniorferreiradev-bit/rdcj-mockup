# Agent Context Contract v2

## Fontes oficiais

Todo agente recebe, conforme escopo:

- Context Snapshot;
- Knowledge Index;
- Project Memory;
- Documentation Snapshot.

## Envelope mínimo

- `agentId`;
- `agentVersion`;
- `requestId`;
- `requestedBy`;
- `objective`;
- `contextFingerprint`;
- `sources`;
- `permissions`;
- `constraints`.

## Saída

- resultado estruturado;
- evidências/fontes;
- assumptions;
- capabilities utilizadas;
- propostas separadas de mudanças executadas;
- `requiresApproval`;
- status de health/conformidade.
