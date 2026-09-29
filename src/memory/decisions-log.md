# Registro de decisões

| Data | Decisão | Motivo | Impacto / estado no código |
|---|---|---|---|
| 14/09/2026 | RDCJ é visualizador matricial de carteira judicial | A principal pergunta é onde está cada processo e por que está ali | Matriz RDCJ torna-se a tela inicial e maior área da interface |
| 14/09/2026 | Planilha é a entrada principal do MVP | Transformar uma carteira importada em mapa operacional | Criada importação CSV/XLSX com mapeamento de colunas |
| 14/09/2026 | Processo é a entidade visual | Permitir localizar e agir sobre cada crédito | Processo é bolha proporcional ao valor, clicável para Processo 360° |
| 14/09/2026 | Risco × Recuperação define quadrante-alvo | Orientar atuação com leitura espacial da carteira | Visão-alvo não implementada; classificador executável permanece Tempo × Valor (T1–T3 × V1–V3) |
| 14/09/2026 | Score perde protagonismo | Score não é produto nem visão principal | Permanece técnico para apoio e desempate; não é destaque da UI |

A implementação futura deve homologar a divergência entre a visão Risco × Recuperação e a regra atualmente executável Tempo × Valor antes de alterar qualquer classificação. Auditoria, versionamento de critérios e movimentações matriciais também permanecem requisitos de evolução.