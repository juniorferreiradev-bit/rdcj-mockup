# Decision History

## Fontes consolidadas

Este documento consolida `src/memory/decisions-log.md`, `src/memory/feedback-log.md` e `src/memory/product-memory.md` sem substituí-los.

## Decisões principais

1. O RDCJ é um visualizador e operador de carteira judicial, não um produto de score.
2. A Matriz é a principal experiência e o processo é a unidade visual/operacional.
3. A planilha é a entrada principal do MVP.
4. O Processo 360° explica posição, motivos, evidências e histórico.
5. Score permanece técnico para apoio e desempate.
6. A identidade visual é requisito funcional.
7. Estado operacional e posição visual do Kanban devem permanecer conceitos separados.
8. O mockup deve ser preservado como baseline de regressão.
9. Providers e adapters devem isolar persistência e ServiceNow.
10. Agentes precisam de limites, fontes, trilha e aprovação para mutações.

## Feedback incorporado

- reduzir protagonismo do score;
- tornar a matriz a primeira informação;
- usar planilha para formar o mapa operacional;
- explicar cada posição por tooltip, motivos e Processo 360°.

## Divergência pendente

A memória inicial define Risco × Recuperação como matriz de produto, enquanto o baseline atual também implementa/documenta Tempo × Valor. A decisão oficial precisa ser homologada antes de qualquer migração ou alteração de regra.

## Impacto arquitetural

As decisões levaram à separação por camadas, contratos, memória persistente, documentação viva, governança, Kanban 2.0 e ServiceNow Runtime Readiness.
