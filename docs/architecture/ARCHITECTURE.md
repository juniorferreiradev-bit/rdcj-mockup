# Architecture Overview — RDCJ 2.0

## Princípios

- preservar o domínio antes da tecnologia;
- manter contratos e limites entre camadas;
- tornar decisões e alterações rastreáveis;
- manter providers substituíveis;
- preservar identidade visual e compatibilidade;
- exigir aprovação para efeitos mutáveis.

## Camadas

| Camada | Responsabilidade |
|---|---|
| Architecture Layer | princípios, decisões, dependências e arquitetura-alvo |
| Memory Layer | decisões, feedback, memória de produto e histórico persistente |
| Knowledge Layer | fontes, índices e conhecimento consultável |
| Context Layer | contexto de projeto, arquitetura e execução |
| Documentation Layer | documentação derivada, índices, snapshots e health |
| Domain Layer | entidades, value objects, políticas e serviços de negócio |
| Repository Layer | contratos e adapters de persistência |
| Provider Layer | LocalStorage, Memory, Context, Documentation e stubs futuros |
| Agent Framework | agents, registry, orquestração, health e contratos |
| Governance Layer | templates, matrizes, workflows, approvals e health |
| Kanban 2.0 | métricas, SLA, WIP, movimentação, auditoria, histórico e alertas |
| ServiceNow Runtime | contratos, mapeamentos, readiness, segurança e migração futura |

## Fluxo de dependências

A apresentação atual permanece separada das camadas novas. O domínio não depende de ServiceNow. Providers e agents dependem de contratos explícitos; integrações futuras serão feitas por adapters.

## Fontes de verdade

- regras: domínio e decisões homologadas;
- processos: repository/provider persistente futuro;
- operação: motor de atuação e Kanban governado;
- conhecimento: Knowledge/Memory/Documentation;
- autorização: Governance e segurança corporativa;
- integração: ServiceNow Runtime Layer.

## Compatibilidade

O baseline legado continua sendo referência. Nenhuma integração futura deve substituir telas, regras ou persistência sem contrato, testes, aprovação e rollback.
