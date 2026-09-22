# RDCJ v0.1 — MVP Demonstração

## Data

21/09/2026

## Objetivo

Disponibilizar um mockup funcional e demonstrável do RDCJ (Risco, Decisão, Criticidade e Justiça), permitindo validar com stakeholders o fluxo completo de **classificação de carteira → atuação operacional → auditoria**, sem depender de backend, banco de dados ou infraestrutura de servidor.

## Funcionalidades entregues

### Importação
- Leitura de carteira via `.csv`, `.xls` ou `.xlsx`.
- Mapeamento automático (com ajuste manual) de colunas: CNJ, cliente, valor, data da decisão, advogado, comarca, responsável.
- Modo aditivo (mescla por CNJ) e modo substituição (troca completa da base).
- Classificação automática de cada processo no momento da carga.

### Matriz RDCJ
- Classificação matricial por tempo da decisão × valor da ação (quadrantes N1–N9, pesos P1–P4).
- Filtros por quadrante, peso, comarca, advogado, responsável e faixa de valor.
- KPIs executivos (total de processos, valor total, concentração em quadrantes críticos).
- Navegação por quadrante até a lista de processos.

### Processo 360°
- Visão consolidada por processo: identificação, enquadramento RDCJ, linha de atuação, explicabilidade das regras aplicadas, timeline de eventos, próxima ação e estrutura preparada para evidências.
- Abertura a partir da lista de processos da Matriz e a partir do Kanban.

### Kanban
- Quadro operacional com 6 raias (Classificação, Advogado, Agência, Central Retaguarda, Monitoramento, Concluídos) e 24 colunas.
- Cartões com CNJ, cliente, peso (cor por criticidade), valor, responsável e próxima revisão/timer.
- Reorganização por arrastar-e-soltar (SortableJS) como camada visual sobre o motor de atuação — não altera o estado real do processo.

### Backup
- Função **Salvar Sessão**: gera arquivo `RDCJ-Backup-AAAAMMDD-HHMM.json` com processos, fluxos, históricos, timers, auditoria e metadados.
- Registro automático do evento `BACKUP_GERADO` na auditoria.
- Painel de Status da Sessão com data do último backup.

### Restore
- Função **Restaurar Sessão**: seleciona um backup `.json`, confirma substituição ("Deseja substituir a sessão atual?") e sobrescreve processos, fluxos, históricos, timers e auditoria.
- Registro automático do evento `BACKUP_RESTAURADO` na auditoria.
- Recarregamento automático da página após restauração bem-sucedida.

## Limitações

- Front-end estático, sem backend, API, banco de dados ou autenticação/autorização real.
- Persistência exclusivamente local (`localStorage` do navegador); dados não são compartilhados entre usuários ou máquinas fora do backup manual.
- Sem testes automatizados, lint ou pipeline de CI/CD configurados.
- Critérios de Risco de Perda, Potencial de Recuperação e IRP (Índice de Recuperação Potencial) ainda não implementados — a classificação atual usa apenas tempo × valor.
- Movimentar um cartão no Kanban é apenas organização visual; não altera o estado real do motor de atuação (a mudança de estado formal ocorre na Caixa de Trabalho).
- Módulo de Evidências do Processo 360° é uma estrutura preparada, sem upload funcional.
- Páginas `motor-rdcj.html` e `alertas.html` permanecem como placeholders, sem link ativo no menu principal.
- `processo.html` (versão legada do Processo 360°) e `editar-processo.html` não são mais alcançados pela navegação padrão da aplicação, permanecendo acessíveis apenas por URL direta (ver `CHECKLIST-ENTREGA.md` e auditoria em anexo à entrega).

## Roadmap

Com base no backlog oficial (`src/memory/backlog.md`):

1. **Governança de classificação** — auditoria do arquivo de origem, versionamento de critérios e reprocessamento da carteira.
2. **Motor de enquadramento avançado** — Risco de Perda, Potencial de Recuperação e IRP como critérios reais de priorização.
3. **Matriz RDCJ operacional avançada** — escala de bolhas, pan/zoom, seleção múltipla e exportação.
4. **Processo 360° com evidências reais** — upload e anexação de documentos/laudos.
5. **Persistência e identidade** — avaliação de backend, autenticação e sincronização multiusuário para além do MVP de demonstração.
6. **Integrações** — processual e patrimonial, conforme dependências já registradas no backlog.
## Publicação no repositório (comandos Git)

Comandos prontos para publicar esta versão em um repositório privado. **Nenhum comando foi executado** — apenas documentado para execução manual pelo responsável pelo repositório.

```powershell
git init
git add .
git commit -m "RDCJ v0.1 MVP Demonstração"
git branch -M main
git remote add origin <REPOSITORIO_PRIVADO>
git push -u origin main
```

> Substitua `<REPOSITORIO_PRIVADO>` pela URL real do repositório privado (ex.: `https://github.com/<organizacao>/<repositorio>.git`). Confirme antes de rodar `git push` que o repositório remoto é **privado**, conforme `LICENSE-INTERNA.md`.
