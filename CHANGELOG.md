# Changelog — RDCJ Mockup

Registro das entregas do mockup, em ordem cronológica decrescente. Este projeto ainda não segue versionamento semântico formal (ver `README.md`, seção "Estrutura recomendada para GitHub"); as datas abaixo refletem o momento da entrega funcional.

## 2026-09-21 — Persistência de demonstração (Sessão RDCJ)

### Adicionado
- Funcionalidade **Salvar Sessão**: gera arquivo `RDCJ-Backup-AAAAMMDD-HHMM.json` com processos, fluxos, históricos, timers, auditoria e metadados da base ativa.
- Funcionalidade **Restaurar Sessão**: permite selecionar um backup `.json`, confirma substituição ("Deseja substituir a sessão atual?") e sobrescreve a base local.
- Painel **Status da Sessão** na tela de Configuração: última importação, último backup, total de processos, total de fluxos, total de movimentações e total de eventos.
- Aviso **"Backup ainda não realizado"** quando nenhum backup foi gerado ainda.
- Novos eventos de auditoria: `BACKUP_GERADO` e `BACKUP_RESTAURADO`.
- Novo arquivo `src/js/sessao-rdcj.js` e nova chave de persistência `rdcj-sessao-status`.

### Não alterado
- Nenhuma regra de classificação, estado, transição ou timer foi modificada. O backup/restauração lê e grava diretamente as chaves existentes de `localStorage`, sem recalcular nada.

## 2026-09-21 — Processo 360° (nova versão)

### Adicionado
- Nova tela `src/pages/processo360.html` com sete seções: Identificação, Enquadramento RDCJ, Linha de Atuação, Explicabilidade, Timeline, Próxima Ação e Evidências (estrutura preparada para anexos futuros).
- Abertura do Processo 360° a partir de um clique na lista de processos da Matriz e a partir do ícone de atalho em cada cartão do Kanban.
- Timeline combinando eventos do motor de atuação (`historicos`) e da auditoria (`rdcjAuditoria`).

### Mantido
- A tela anterior (`src/pages/processo.html`) permanece disponível, sem alterações, para compatibilidade.
- Nenhuma regra de enquadramento, matriz ou motor foi alterada — a tela apenas consolida dados já existentes.

### Observação registrada na auditoria de entrega (v0.1)
- Como o link de CNJ na lista da Matriz passou a apontar para `processo360.html`, a tela legada `processo.html` (e, por consequência, `editar-processo.html`, só alcançável a partir dela) deixou de ser atingida pela navegação normal da aplicação. Ambas continuam funcionando por URL direta. Ver `CHECKLIST-ENTREGA.md`.

## 2026-09-21 — Kanban RDCJ

### Adicionado
- Nova tela `src/pages/kanban.html` com 6 raias (Classificação, Advogado, Agência, Central Retaguarda, Monitoramento, Concluídos) e 24 colunas.
- Drag-and-drop com SortableJS para reorganização visual dos cartões.
- Cartões exibindo CNJ, cliente, peso (cores: P4 vermelho, P3 laranja, P2 amarelo, P1 cinza), valor, responsável e próxima revisão/timer.
- Novos campos `coluna` e `ordem` no objeto de fluxo (`rdcj-motor-atuacao`), com migração automática dos fluxos existentes (`migrarColunasFluxos`).
- Novas funções em `motor-atuacao.js`: `normalizarColunaPorEstado`, `mapearColunaInicial`, `migrarColunasFluxos`, `moverCartaoColuna`, `reordenarColuna`.
- Item "Kanban RDCJ" adicionado ao menu lateral (`navigation.js`).

### Não alterado
- Nenhum estado, transição, linha de atuação ou timer do motor foi criado ou modificado. Mover um cartão no Kanban altera apenas `coluna`/`ordem` — nunca o estado real do processo.
- Importação, Matriz RDCJ e regras de enquadramento permanecem inalteradas.

## 2026-09-14 — Base funcional do mockup

### Adicionado
- Importação de carteira via CSV/XLS/XLSX com mapeamento de colunas (`importar-carteira.html`, `matrix-ui.js`).
- Classificação matricial tempo × valor (quadrantes N1–N9, pesos P1–P4) em `matriz-criticidade.js` / `matrizCriticidade.ts`.
- Matriz RDCJ com filtros, KPIs executivos e navegação por quadrante (`matriz.html`).
- Motor de Atuação como máquina de estados (`REVISAO_JURIDICA`, `PETICIONAMENTO`, `AGUARDANDO_RESULTADO`, `INVESTIGACAO_AGENCIA`, `INVESTIGACAO_RETAGUARDA`, `MONITORAMENTO`, `ENCERRADO`) com timers e histórico (`motor-atuacao.js`).
- Caixa de Trabalho com filas operacionais e timeline (`trabalho.html`).
- Processo 360° original com explicação e histórico de auditoria (`processo.html`).
- Dashboard executivo, Radar da Carteira e Lista de processos.
- Auditoria simples de eventos (`auditoria.js`) e persistência local via `localStorage`.
- Menu lateral único e centralizado (`navigation.js`).

## Limitações conhecidas (acumuladas)

- Sem autenticação, autorização ou identidade real de usuário.
- Sem backend, API, banco de dados ou sincronização entre usuários/máquinas fora do backup manual em `.json`.
- Sem testes automatizados, lint ou pipeline de CI configurados.
- Critérios de Risco de Perda, Potencial de Recuperação e IRP ainda não implementados (ver `src/memory/backlog.md`).
- Módulo de Evidências do Processo 360° é apenas uma estrutura preparada, sem upload real.
