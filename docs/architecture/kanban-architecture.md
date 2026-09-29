# Arquitetura Kanban 2.0

Kanban 2.0 é uma extensão de domínio isolada, organizada em entidades (`KanbanMetrics`, `KanbanMovement`, `KanbanSLA`, `KanbanHistory`, `KanbanGovernance`) e serviços de métricas, SLA, WIP, movimento, auditoria, histórico, alertas e indicadores executivos.

Fluxo de dependência: entidades → políticas → serviços → contratos de integração. A extensão não importa `assets/js/kanban.js`, não modifica `motor-atuacao.js` e não possui efeitos de persistência.

A fronteira com o legado é somente semântica: estados, raias e colunas foram reproduzidos em documentação e contratos. Providers, Dashboard e Agents recebem contratos, não chamadas reais.
