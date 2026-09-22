# Guia de Demonstração Executiva — RDCJ (15 minutos)

Roteiro objetivo para apresentar o mockup do RDCJ a um público executivo/comercial em aproximadamente 15 minutos. Ajuste o ritmo conforme o interesse da plateia, mas priorize sempre a sequência **Matriz → Processo 360° → Motor de Atuação → Kanban → Backup**, que conta a história completa do produto.

## Preparação (antes da reunião)

- [ ] Servidor local rodando (`python -m http.server 8000`) — ver [`INSTALACAO-RAPIDA.md`](INSTALACAO-RAPIDA.md).
- [ ] Base de demonstração já carregada (uma carteira com volume representativo de processos em diferentes quadrantes e pesos).
- [ ] Um backup de segurança da base de demonstração salvo (`RDCJ-Backup-*.json`) — ver `MANUAL-OPERADOR.md`, seção 6.
- [ ] Abas do navegador organizadas na ordem do roteiro (Dashboard → Matriz → Processo 360° → Caixa de Trabalho → Kanban → Configuração).
- [ ] Zoom do navegador ajustado para boa leitura em projeção (`Ctrl` + `+`/`-`).

## Roteiro (15 minutos)

### 1. Abertura e contexto (0:00 – 1:30)

Fale, sem abrir o sistema ainda:

> "O RDCJ responde a duas perguntas: onde está cada processo da carteira e por que ele está ali; e quem deve agir, o que fazer e quando. Vamos ver isso na prática."

### 2. Dashboard executivo (1:30 – 3:00)

Abra **Insights da Carteira**.

- Mostre o valor total da carteira e o total de processos ativos.
- Destaque a distribuição por quadrante e por peso — "aqui já enxergamos onde está concentrado o risco/valor".

### 3. Matriz RDCJ (3:00 – 6:00)

Abra **Matriz RDCJ**.

- Explique o cruzamento **tempo da decisão × valor da ação**, gerando os quadrantes N1–N9 e os pesos P1–P4.
- Aplique um filtro ao vivo (ex.: peso P4) para mostrar a resposta imediata da matriz.
- Clique em um quadrante crítico (ex.: N9) para abrir a lista de processos filtrada.
- Clique no CNJ de um processo para abrir o **Processo 360°**.

### 4. Processo 360° (6:00 – 8:30)

Já dentro do Processo 360° aberto no passo anterior:

- **Identificação**: CNJ, cliente, peso, valor, advogado, agência/comarca.
- **Enquadramento RDCJ**: quadrante, peso e criticidade.
- **Explicabilidade**: mostre que cada classificação tem uma razão auditável (data da decisão, faixa de tempo, faixa de valor) — "nada aqui é caixa-preta".
- **Linha de Atuação** e **Próxima Ação**: responsável atual, linha atual e próxima revisão/timer.
- **Timeline**: histórico de tudo o que já aconteceu com aquele processo.

### 5. Caixa de Trabalho — o motor por trás do produto (8:30 – 10:30)

Abra **Caixa de Trabalho**.

- Mostre a lista com peso, linha de atuação, responsável, status e próxima revisão.
- Na aba **Filas operacionais**, execute ao vivo uma decisão (ex.: "Existe oportunidade processual? Sim") e mostre o processo mudando de fila/estado.
- Reforce: "esse é o motor real por trás do produto — uma máquina de estados auditável, não apenas uma lista".

### 6. Kanban RDCJ — visão de fila operacional (10:30 – 13:00)

Abra **Kanban RDCJ**.

- Mostre as 6 raias (Classificação, Advogado, Agência, Central Retaguarda, Monitoramento, Concluídos) e os cartões com CNJ, peso (cores), valor, responsável e timer.
- Arraste um cartão entre colunas ao vivo para mostrar a fluidez operacional.
- Deixe claro o limite atual do mockup: "mover aqui é organização visual da fila; a mudança de estado formal continua acontecendo na Caixa de Trabalho" — isso demonstra maturidade e transparência sobre o estágio do produto.
- Clique no ícone **↗** de um cartão para reabrir o Processo 360° e fechar o ciclo de navegação.

### 7. Backup e continuidade da demonstração (13:00 – 14:00)

Abra **Configuração** (Gestão da carteira).

- Mostre o painel **Status da Sessão** (última importação, último backup, totais).
- Clique em **Salvar Sessão** e mostre o arquivo `.json` sendo baixado.
- Explique: "isso permite levar essa mesma demonstração, com os mesmos dados e histórico, para outro computador ou outra reunião — sem depender de servidor ou internet".

### 8. Fechamento (14:00 – 15:00)

Retome os três pilares mostrados:

1. **Classificação explicável** (Matriz + Processo 360°).
2. **Atuação orientada por estado** (Caixa de Trabalho + Kanban).
3. **Portabilidade da demonstração** (Backup/Restauração de Sessão).

Encerre reforçando o backlog de evolução (`src/memory/backlog.md`) para próximas etapas (ex.: risco de perda, potencial de recuperação, IRP, integrações).

## Perguntas frequentes durante a demonstração

| Pergunta esperada | Resposta recomendada |
|---|---|
| "Isso já está em produção?" | Não — é um mockup funcional, front-end estático, sem backend, banco de dados ou autenticação real. |
| "Os dados ficam salvos onde?" | Apenas no navegador local (`localStorage`), por isso existe a função de backup/restauração em `.json`. |
| "O Kanban muda o processo de fato?" | Não automaticamente — o Kanban é uma camada visual; a mudança de estado real acontece via Caixa de Trabalho. |
| "Dá para importar a carteira real do banco?" | Sim, desde que em CSV/XLS/XLSX com os campos mínimos (CNJ, cliente, valor, data da decisão). |
| "Como validar os critérios de classificação?" | Pela aba de Explicabilidade no Processo 360°, que mostra as regras aplicadas ao processo específico. |

## Tempo alternativo (versão curta de 7–8 minutos)

Se o tempo for reduzido, priorize apenas: **Matriz (2 min) → Processo 360° (2 min) → Kanban (2 min) → Backup (1 min)**, omitindo Dashboard e Caixa de Trabalho detalhados.
