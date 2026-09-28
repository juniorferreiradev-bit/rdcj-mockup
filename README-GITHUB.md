# RDCJ 2.0

## Visão executiva

O RDCJ é uma plataforma de gestão e operação de carteira judicial. Seu propósito é responder, de forma explicável, onde está cada processo, por que está nessa posição, quem deve agir, quando agir e qual foi o resultado.

A experiência combina Matriz RDCJ, Processo 360°, carteira operacional, Kanban governado, memória, conhecimento, documentação, agentes e preparação para futura integração ServiceNow.

## Objetivo

Transformar uma carteira judicial em uma visão operacional rastreável, com classificação, priorização, atuação, auditoria e governança preservadas por contratos.

## Problema resolvido

- baixa visibilidade sobre a posição dos processos;
- priorização pouco explicável;
- ausência de conexão entre análise e operação;
- decisões e movimentações sem histórico consolidado;
- dependência de armazenamento local e processos manuais.

## Arquitetura RDCJ 2.0

Architecture → Memory → Knowledge → Context → Documentation → Domain → Repository → Provider → Agents → Governance → Kanban 2.0 → ServiceNow Runtime Readiness.

A arquitetura é incremental e mantém o mockup como referência funcional, visual e de regressão.

## Principais capacidades

- classificação matricial e explicabilidade;
- carteira, filtros e Processo 360°;
- motor operacional e Kanban;
- métricas, SLA, WIP, auditoria e histórico;
- memória e documentação rastreáveis;
- agents com limites e governança;
- contratos e readiness para ServiceNow.

## Roadmap

1. Homologar a matriz e regras de negócio.
2. Persistir dados, eventos e auditoria.
3. Evoluir o frontend para cliente de APIs.
4. Governar memória, documentação e agentes.
5. Implementar integração ServiceNow em sandbox.
6. Executar migração controlada e operação assistida.

## Status do projeto

**Status:** preparado para evolução arquitetural; ServiceNow não conectado; migração não executada.

O repositório contém implementação de referência, camadas arquiteturais, contratos, testes e documentação. Consulte `ARCHITECTURE.md`, `PROJECT-JOURNEY.md` e `SERVICENOW-READINESS.md` para detalhes.

## Nota de reconciliação

A memória inicial do produto descreve uma visão Risco × Recuperação, enquanto o baseline atual também documenta a classificação Tempo × Valor. Essa divergência é uma decisão pendente de homologação e não foi resolvida silenciosamente.
