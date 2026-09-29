# RDCJ Documentation Audit — 2026-09-29

## Escopo auditado

Código/páginas/estilos, árvore atual, README, changelog, manual, backlog, memória de produto, decisões, feedback, release v2.1, ADRs, documentos ServiceNow, guias, snapshots e índices derivados.

## Inconsistências encontradas e corrigidas

1. **Matriz atual versus visão de produto:** `product-memory.md` descrevia Risco × Recuperação como se fosse classificação disponível; o código `assets/js/matriz-criticidade.js` executa Tempo × Valor. A memória agora separa estado implementado e visão-alvo; decisions-log marca R×R como não implementada.
2. **Backlog misturado com entrega:** itens existentes da Matriz/importação apareciam lado a lado com pendências sem status. `src/memory/backlog.md` agora separa capacidades existentes de evolução planejada.
3. **README incompleto/impreciso:** não refletia a estrutura reorganizada, os módulos locais, ausência de backend/integração e telas reais. Reescrito como inventário do estado atual.
4. **Manual com conteúdo deslocado:** tabela de timers/persistência e módulos estava estruturalmente corrompida; manual foi refeito com funcionamento observado e limitações.
5. **Landing antiga RDCJ 2.0:** `docs/guides/README-GITHUB.md` descrevia uma plataforma integrada e roadmap como estado atual. Agora encaminha à documentação canônica e distingue capacidades atuais de planos.
6. **Arquitetura “current” referia apenas v0.1:** o documento agora identifica explicitamente o snapshot histórico e aponta para a arquitetura/estrutura atuais.
7. **Paleta Matriz/Kanban confundida:** documentação agora descreve a paleta suave da Matriz e deixa claro que o Kanban mantém estilos próprios.
8. **Artefatos derivados defasados:** documentation/context snapshots, índices e fingerprints foram regenerados após atualizar as fontes.
9. **Links e referências:** links locais e paths foram verificados/corrigidos; caminhos arquivísticos relativos a `src/pages`, `src/js` e `src/css` permanecem somente em documentos que descrevem o estado histórico anterior.

## Estado funcional confirmado

- Frontend estático: HTML/CSS/JavaScript, páginas em `src/ui/pages`, assets em `assets/`.
- Classificação executada: Tempo da decisão × Valor da ação; pesos P1–P4 conforme o mapeamento N1–N9 existente.
- Dados e motor de atuação persistem localmente no navegador; sem autenticação/backend corporativo.
- Kanban visual: seis raias e 24 colunas; arraste organiza coluna/ordem e não substitui as transições formais.
- ServiceNow: documentação/readiness e provider stub; sem conexão, migração, APIs reais ou artefatos de instância.
- Risco × Recuperação, IRP, anexos gerenciados e persistência server-side permanecem backlog/planejamento.

## Histórico mantido intencionalmente

`architecture-current.md` descreve o baseline v0.1 e está marcado como histórico. `RDCJ-2.0-RELEASE.md`, `RDCJ-2.0-FINAL-DOCUMENTATION.md`, prompts e releases antigas permanecem como registros de época, não como documentação normativa do runtime atual.

## Validações executadas

- `node scripts/validate-repository.mjs`: referências HTML, Markdown, CSS e blocos de código Markdown.
- Todas as suítes Node de `tests/`.
- Sintaxe dos serviços e arquivos JavaScript relevantes.
- Smoke test HTTP das páginas principais, sem erros JavaScript.

Resultado no momento da auditoria: 11 fontes documentais do Documentation Engine presentes, sem issues reportadas.
