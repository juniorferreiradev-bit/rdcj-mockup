# Métricas Kanban 2.0

`KanbanMetricsService` calcula durações em horas a partir de datas e eventos:

- **Lead Time:** criação até início de trabalho.
- **Cycle Time:** início de trabalho até conclusão ou instante atual.
- **Tempo médio:** média das durações das etapas observadas.
- **Tempo por etapa:** agrupamento por coluna/estado ou estágios explícitos.
- **Tempo total:** criação até conclusão/instante atual.
- **Tempo de espera:** tempo total menos ciclo.

`KanbanExecutiveMetrics` consolida volume, backlog, SLA, WIP, Lead Time, Cycle Time e produtividade. Os valores são calculados sob demanda e não são persistidos.
