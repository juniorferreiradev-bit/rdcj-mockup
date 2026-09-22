# Manual do Operador — RDCJ Mockup

Guia de uso tela a tela do mockup do RDCJ, incluindo os passos de backup e restauração da sessão de demonstração.

> Este manual descreve o comportamento atual do mockup. Não há autenticação: qualquer pessoa com acesso ao navegador vê e opera a mesma base carregada localmente.

## Visão geral do menu lateral

| Item do menu | Tela | Para que serve |
|---|---|---|
| Insights da Carteira | Dashboard | KPIs executivos e distribuições da carteira. |
| Matriz RDCJ | Matriz | Posição de cada processo no cruzamento tempo × valor (N1–N9). |
| Caixa de Trabalho | Trabalho | Lista operacional com estado, linha, responsável e prazos. |
| Kanban RDCJ | Kanban | Quadro visual com 6 raias e 24 colunas, arrastar-e-soltar. |
| Radar da Carteira | Radar | Leitura consolidada de indicadores da carteira. |
| Importar base | Importação | Carregar uma nova planilha (CSV/XLS/XLSX). |
| Lista de processos | Carteira | Lista filtrável de todos os processos importados. |
| Gestão da carteira | Configuração | Importar, substituir, limpar a base e gerenciar backups (Sessão RDCJ). |

## 1. Importar uma carteira

1. Acesse **Importar base**.
2. Selecione o arquivo (`.csv`, `.xls` ou `.xlsx`).
3. Confira o mapeamento automático de colunas (CNJ, cliente, valor, data da decisão são obrigatórios).
4. Escolha o modo de carga:
   - **Aditivo**: mescla com a base já existente (por CNJ).
   - **Substituir**: apaga a base atual e carrega somente a nova planilha.
5. Clique em **Classificar e carregar base**.

Cada processo é automaticamente classificado (quadrante N1–N9 e peso P1–P4) no momento da importação.

## 2. Consultar a Matriz RDCJ

1. Acesse **Matriz RDCJ**.
2. Use os filtros (quadrante, peso, comarca, advogado, responsável, faixa de valor) para restringir a visão.
3. Clique em um quadrante para abrir a lista de processos daquele quadrante.
4. Na lista, clique no número do CNJ para abrir o **Processo 360°**.

## 3. Trabalhar na Caixa de Trabalho

1. Acesse **Caixa de Trabalho**.
2. A aba **Caixa de trabalho** mostra todos os processos com peso, linha, responsável e próxima revisão.
3. A aba **Filas operacionais** permite registrar decisões (Sim/Não) que movem o processo entre estados do motor (ex.: "Existe oportunidade processual?").
4. A aba **Timeline RDCJ** mostra o histórico consolidado de mudanças de estado, linha, responsável e timers.

## 4. Operar o Kanban RDCJ

1. Acesse **Kanban RDCJ**.
2. O quadro está organizado em 6 raias: **Classificação, Advogado, Agência, Central Retaguarda, Monitoramento e Concluídos**, com colunas específicas em cada uma.
3. Cada cartão mostra: CNJ, Cliente, Peso (cor: P4 vermelho, P3 laranja, P2 amarelo, P1 cinza), Valor, Responsável e Próxima Revisão.
4. Arraste um cartão entre colunas para reorganizar a fila de trabalho visualmente.
   - **Importante:** mover um cartão no Kanban é **apenas organização visual** — não altera o estado real do processo no motor RDCJ. Para mudar o estado de fato (ex.: decidir que uma diligência terminou), use a Caixa de Trabalho.
5. Clique no ícone **↗** no rodapé do cartão para abrir o Processo 360° daquele processo.

## 5. Consultar o Processo 360°

Aberto a partir de um clique na Matriz (lista de processos) ou no Kanban (ícone ↗). Contém:

1. **Identificação** — CNJ, cliente, peso, valor, advogado, agência/comarca, quadrante.
2. **Enquadramento RDCJ** — quadrante, peso, criticidade e critérios utilizados (data da decisão, faixa de tempo, faixa de valor).
3. **Linha de Atuação** — destaque visual da linha atual (Advogado, Agência, Retaguarda ou Monitoramento/Concluído).
4. **Explicabilidade** — lista das regras que resultaram no enquadramento atual.
5. **Timeline** — eventos combinados do motor de atuação e da auditoria.
6. **Próxima Ação** — responsável atual, linha atual, próxima revisão e timer.
7. **Evidências** — painel preparado para uma futura funcionalidade de anexos (ainda não implementada).

## 6. Backup da sessão — "Salvar Sessão"

Use antes de encerrar uma demonstração, trocar de computador ou finalizar o dia.

1. Acesse **Gestão da carteira** (item **Configuração** no menu).
2. Na seção **Sessão RDCJ**, clique em **Salvar Sessão**.
3. O navegador baixa automaticamente um arquivo chamado:
   ```
   RDCJ-Backup-AAAAMMDD-HHMM.json
   ```
4. Guarde esse arquivo (ex.: em uma pasta de backups ou pendrive) — ele contém processos, fluxos, histórico, timers e auditoria da sessão atual.
5. O painel **Status da Sessão** é atualizado com a data/hora do último backup.

> Se nenhum backup foi realizado ainda, o painel exibe o aviso **"Backup ainda não realizado"**.

## 7. Restauração da sessão — "Restaurar Sessão"

Use para retomar uma demonstração anterior ou levar uma base pronta para outro computador.

1. Acesse **Gestão da carteira** → seção **Sessão RDCJ**.
2. Clique em **Restaurar Sessão**.
3. Selecione o arquivo `RDCJ-Backup-*.json` desejado.
4. Confirme na pergunta exibida: **"Deseja substituir a sessão atual?"**
   - **OK/Sim** → a sessão atual é completamente substituída pelo conteúdo do backup.
   - **Cancelar/Não** → nada é alterado.
5. Após a confirmação, a página recarrega automaticamente e todas as telas (Matriz, Kanban, Caixa de Trabalho, Processo 360°) já refletem os dados restaurados.

> A restauração sobrescreve processos, fluxos, histórico, timers e auditoria da base local. Faça um backup da sessão atual antes de restaurar, caso quiera preservá-la.

## 8. Painel "Status da Sessão"

Disponível na tela **Gestão da carteira**, mostra:

- **Última Importação** — data/hora da última planilha carregada.
- **Último Backup** — data/hora do último "Salvar Sessão".
- **Total de Processos** — quantidade de processos na base ativa.
- **Total de Fluxos** — quantidade de fluxos operacionais registrados no motor.
- **Total de Movimentações** — quantidade de mudanças de estado registradas no histórico do motor.
- **Total de Eventos** — quantidade de eventos registrados na auditoria (importações, backups, restaurações, mudanças de estado).

## 9. Boas práticas para demonstração

- Sempre gere um **Salvar Sessão** ao final de uma demonstração importante, para não depender do `localStorage` do computador usado.
- Antes de uma nova demonstração, se quiser começar "do zero", use **Limpar Base** (tela de Configuração) ou restaure um backup específico preparado para esse fim.
- Para alternar entre "carteira cheia" e "carteira vazia" rapidamente durante uma reunião, mantenha dois arquivos de backup prontos (ex.: `RDCJ-Backup-cenario-cheio.json` e `RDCJ-Backup-cenario-vazio.json`) e apenas renomeie/restaure o desejado.
