# Memória do Produto — RDCJ

## Decisão oficial
**O RDCJ passa a ser um visualizador matricial de carteira judicial orientado a enquadramento de processos em quadrantes operacionais.**

O produto responde visualmente: **“Onde está cada processo da carteira e por que ele está ali?”** A matriz é a entidade visual e a primeira experiência do MVP; o processo é a entidade exibida; a planilha é a principal entrada.

## Fluxo do MVP
1. Importar Excel ou CSV. 2. Mapear colunas. 3. Enquadrar cada processo automaticamente. 4. Posicionar uma bolha na Matriz RDCJ. 5. Abrir Processo 360° ao selecionar a bolha.

## Matriz RDCJ
- Eixo Y: **Risco de Perda** — Baixo, Médio, Alto, Crítico; derivado de prescrição, suspensão, tempo sem impulso, prazo revisional e eventos críticos.
- Eixo X: **Potencial de Recuperação** — Baixo, Médio, Alto, Muito Alto; derivado de ativos, garantias, empresa ativa, grupo econômico e pesquisas patrimoniais.
- Quadrantes: Prioridade Máxima; Decisão Estratégica; Oportunidade Operacional; Monitoramento.

Cada bolha representa processo, tamanho proporcional ao valor atualizado e cor N1–N4. Tooltip e Processo 360° exibem processo, valor, cliente, último evento, próxima revisão e motivo do enquadramento.

## Papel do score e dos KPIs
Score é variável técnica de ordenação/desempate e não deve conduzir a experiência. KPIs são camada secundária. Prioridade: **Matriz → Processos → Filtros → KPIs**.