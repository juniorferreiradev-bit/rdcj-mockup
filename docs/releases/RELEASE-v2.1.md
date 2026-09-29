# RDCJ 2.1 — Matrix Visual Update and Repository Hardening

## Escopo

Modernização visual da Matriz RDCJ e reorganização arquitetural/documental do repositório para publicação controlada no GitHub.

## Entregas

- Documentos organizados em `docs/architecture`, `governance`, `decisions`, `releases`, `servicenow` e `guides`.
- CSS e JavaScript organizados em `assets/css` e `assets/js`.
- Páginas e componentes em `src/ui/pages` e `src/ui/components`.
- Serviço de readiness em `src/services`.
- Referências HTML/CSS, consumers de Context/Documentation e testes atualizados.
- ADR-0002 e relatório de estrutura adicionados.
- Validador local de referências criado em `scripts/validate-repository.mjs`.
- Matriz modernizada com KPIs, cards e cores suaves associadas a P1–P4; N9 permanece identificável sem alterar classificação, cálculos ou posição dos quadrantes.

## Não alterado

Nenhuma regra de classificação, cálculo, estado operacional ou transição foi redesenhada. A posição dos quadrantes foi preservada. A Matriz recebeu somente alteração de apresentação visual; Dashboard, Processo 360°, Kanban e Motor RDCJ não foram redesenhados.

## Impacto

A entrada permanece em `src/index.html`; a URL direta da Matriz passa a `src/ui/pages/matriz.html`. Os demais arquivos HTML permanecem navegáveis por links de páginas irmãs.

## Validação

Executar `node scripts/validate-repository.mjs` e todas as suítes `tests/**/*.test.js` antes de merge.

## Limitações

O projeto continua sem bundler frontend. A publicação e o PR precisam de revisão de links no GitHub e aprovação de homologação.
