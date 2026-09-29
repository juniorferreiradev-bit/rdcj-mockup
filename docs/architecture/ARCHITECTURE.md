# Architecture Overview — RDCJ 2.0

> Visão das camadas presentes no repositório. A presença de uma camada/módulo não implica integração com o frontend legado, backend de produção ou runtime ServiceNow. O inventário efetivo está em `PROJECT-STRUCTURE.md` e `../../README.md`.

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
| Memory Layer | modelos, repositório local, decisões, feedback e memória de produto |
| Knowledge Layer | índice e consultas implementados no módulo Context |
| Context Layer | snapshot local de projeto/arquitetura e cache |
| Documentation Layer | leitura de fontes, índice, geração, snapshots e health local |
| Domain Layer | entidades, value objects, políticas e serviços de negócio |
| Repository Layer | contratos e adapters de persistência |
| Provider Layer | providers locais e stubs; ServiceNow/database não conectados |
| Agent Framework | sete agents locais, registry, factory, orquestração e health; sem execução remota |
| Governance Layer | artefatos documentais, templates e health; sem workflow corporativo ativo |
| Kanban 2.0 | serviços de domínio e testes isolados, sem conexão ao Kanban visual legado |
| ServiceNow Runtime | contratos, mapeamentos e readiness documental; sem runtime ativo |

## Fluxo de dependências

A apresentação atual permanece separada das camadas novas. O domínio não depende de ServiceNow. Providers e agents dependem de contratos explícitos; nenhuma integração remota ou execução mutável foi ativada.

## Fontes de verdade

- regras: domínio e decisões homologadas;
- processos: repository/provider persistente futuro;
- operação: motor de atuação e Kanban governado;
- conhecimento: Knowledge/Memory/Documentation;
- autorização: Governance e segurança corporativa;
- integração: ServiceNow Runtime Layer.

## Compatibilidade

O baseline legado continua sendo referência. Nenhuma integração futura deve substituir telas, regras ou persistência sem contrato, testes, aprovação e rollback.
