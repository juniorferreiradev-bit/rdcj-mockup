# Operating Model

## Governança

Mudanças de regra, dados, fluxo, segurança, agentes e integração passam por proposta, análise de risco, aprovação, execução controlada e auditoria.

## Agentes

Agents aconselham, validam, documentam e preparam ações. Mutação exige política, escopo, identidade, `trace_id` e aprovação quando aplicável.

## Fluxos

O fluxo principal é Matriz → Carteira → Processo 360°. O fluxo operacional é processo → estado/coluna → responsável → SLA/WIP → movimentação → histórico/auditoria.

## Kanban

O Kanban visualiza e ordena o fluxo legado. Kanban 2.0 adiciona métricas, SLA, WIP, motivos, auditoria, histórico e alertas como extensão isolada.

## Auditoria

Toda alteração relevante futura deve registrar ator, data, origem, destino, motivo, identificador, versão e resultado. Eventos devem ser append-only ou protegidos contra alteração.

## Aprovações

- baixo risco: revisão técnica;
- médio risco: gestor e arquitetura;
- alto/crítico: Product Owner, Segurança, Jurídico e Arquitetura;
- releases: ReleaseAgent com gates aprovados.

## Operação

Dashboards, alertas, readiness, runbooks e reconciliação sustentam a operação assistida futura.
