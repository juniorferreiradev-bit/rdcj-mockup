# Domain Architecture — RDCJ 2.0

## Objetivo

Criar um núcleo de domínio independente da UI e da persistência, sem alterar o runtime atual.

## Camadas

```text
UI existente → Services novos → Repositories novos → Adapters locais
                                      ↓
                         Providers futuros: API, DB, ServiceNow
```

## Entidades

Processo, FluxoOperacional, KanbanCard, MatrizClassificacao, Auditoria, MemoriaProjeto, ContextSnapshot e DocumentationSnapshot.

## Limitações

A camada ainda é opt-in. Nenhuma página existente foi conectada aos services novos.

## ServiceNow

As entidades utilizam IDs e atributos neutros; o mapeamento para tabelas ServiceNow deverá ocorrer em adapters/providers futuros.
