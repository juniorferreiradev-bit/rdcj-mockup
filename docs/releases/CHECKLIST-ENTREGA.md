# Checklist de Entrega — RDCJ v0.1 MVP Demonstração

## Funcionalidades

- [x] Importação
- [x] Matriz
- [x] Processo 360
- [x] Kanban
- [x] Backup
- [x] Restore

## Documentação

- [x] README
- [x] Manual Operador
- [x] Guia Demonstração
- [x] GitHub

## Detalhamento de verificação

| Item | Evidência |
|---|---|
| Importação | `src/ui/pages/importar-carteira.html` + `assets/js/matrix-ui.js` (mapeamento e carga aditiva/substituição). |
| Matriz | `src/ui/pages/matriz.html` + `assets/js/matriz-criticidade.js` (quadrantes N1–N9, pesos P1–P4). |
| Processo 360 | `src/ui/pages/processo360.html` + `assets/js/processo360.js` (7 seções, aberto pela Matriz e pelo Kanban). |
| Kanban | `src/ui/pages/kanban.html` + `assets/js/kanban.js` (6 raias, 24 colunas, drag-and-drop). |
| Backup | `assets/js/sessao-rdcj.js` — botão "Salvar Sessão" em `src/ui/pages/configuracao-base.html`. |
| Restore | `assets/js/sessao-rdcj.js` — botão "Restaurar Sessão" com confirmação em `src/ui/pages/configuracao-base.html`. |
| README | `README.md` — atualizado com Kanban, Processo 360° atual, Sessão RDCJ e estrutura de repositório. |
| Manual Operador | `MANUAL-OPERADOR.md` — uso tela a tela e passo a passo de backup/restauração. |
| Guia Demonstração | `docs/guides/GUIA-DEMONSTRACAO.md` — roteiro executivo de 15 minutos. |
| GitHub | `.gitignore`, `LICENSE-INTERNA.md`, `docs/releases/RELEASE-v0.1.md` (com comandos Git prontos) criados nesta entrega. |

## Pendências conhecidas (não bloqueiam a entrega do MVP de demonstração)

- [ ] `processo.html` (Processo 360° legado) e `editar-processo.html` não são mais alcançados pela navegação da aplicação (apenas por URL direta) — decidir se devem ser removidos, relinkados ou mantidos como estão em uma próxima versão.
- [ ] `motor-rdcj.html` e `alertas.html` permanecem sem link no menu principal (placeholders documentados no `README.md`).
- [ ] `src/ui/components/base-info-card.js` e `assets/js/decision-engine.js` são arquivos não referenciados por nenhuma página (candidatos a remoção ou arquivamento em uma limpeza futura).
- [ ] Repositório Git ainda não inicializado/publicado (comandos prontos em `docs/releases/RELEASE-v0.1.md`, aguardando execução manual autorizada).
