# Backlog RDCJ — estado e evoluções planejadas

Este backlog separa o que já está presente no código do trabalho ainda aberto. Itens planejados não são funcionalidades disponíveis.

## Capacidades já implementadas (não são backlog)

- Importação local CSV/XLS/XLSX, mapeamento e carga da carteira no navegador.
- Classificação executável Tempo da decisão × Valor da ação em T1–T3, V1–V3, N1–N9 e P1–P4.
- Matriz, filtros, agregados/KPIs e acesso à carteira filtrada.
- Dashboard, Carteira e Processo 360° local.
- Motor de Atuação com sete estados, oito transições, histórico e timers.
- Kanban visual com seis raias e 24 colunas; arraste altera organização visual.
- Backup/restauração local de sessão.

## Backlog ativo

### EPIC 01 — Robustez de importação
- Persistir mapeamentos reutilizáveis.
- Melhorar relatório de erros por linha e validação de arquivos.
- Homologar modelo de planilha e limites de volume.

### EPIC 02 — Evolução do enquadramento
- Homologar Risco de Perda e Potencial de Recuperação com Jurídico/Operação.
- Definir versionamento, explicabilidade e histórico de regras.
- Não substituir a classificação atual Tempo × Valor até aprovação formal.

### EPIC 03 — Evolução da Matriz
- Avaliar pan/zoom, seleção múltipla, busca avançada e exportação.
- A Matriz atual e seus filtros/KPIs já existem; os itens acima são incrementos.

### EPIC 04 — Processo 360° e evidências
- Definir armazenamento, upload, autorização e retenção de evidências.
- A tela atual existe; gestão de anexos/evidências não está implementada.

### EPIC 05 — Governança de classificação
- Auditar origem, versão da regra e reprocessamentos.
- Definir critérios formais de homologação e trilha corporativa.

### EPIC — Motor de Recuperação RDCJ (planejado)

- **Risco de Perda:** estimativa ainda não implementada.
- **Potencial de Recuperação:** estimativa ainda não implementada.
- **IRP:** indicador ainda não implementado.

## Dependências ainda abertas

Homologação jurídica/operacional dos critérios, processamento seguro de planilhas no backend, persistência corporativa, identidade/autorização e integrações processuais/patrimoniais. ServiceNow continua em readiness documental, não conectado.
