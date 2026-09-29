# RDCJ — GitHub Landing

## Projeto

Aplicação demonstrativa estática para gestão local de carteira judicial, com Dashboard, Matriz RDCJ, Carteira, Processo 360°, Caixa de Trabalho, Kanban, Radar, Importação e Configuração.

## Visão atual

A classificação efetivamente executada é Tempo da decisão × Valor da ação, gerando N1–N9 e pesos P1–P4. Os dados e fluxos são locais no navegador; não há backend, identidade ou sincronização multiusuário.

## Arquitetura

Frontend estático em `src/ui/pages/`, `assets/js/` e `assets/css/`; camadas locais de contexto, documentação, domínio, repositories, providers, agents e governance em `src/`. Essas camadas têm código/contratos e testes, mas não formam um backend integrado ao frontend legado.

## Roadmap, separado do estado atual

Risco × Recuperação, IRP, persistência corporativa e integração ServiceNow aparecem no backlog/readiness. Não estão implementados no runtime. ServiceNow está desconectado e sem migração.

## Tecnologias

HTML, CSS, JavaScript e módulos CommonJS/Node usados nos serviços/testes. Não há bundler frontend.

## Status

RDCJ 2.1: repositório organizado e documentação sincronizada. Consulte o README canônico [`../../README.md`](../../README.md), a release e o ServiceNow Readiness para o estado detalhado.
