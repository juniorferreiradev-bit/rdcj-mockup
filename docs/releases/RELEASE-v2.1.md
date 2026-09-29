# RDCJ 2.1 — Repository Hardening Release

## Escopo

Reorganização arquitetural do repositório e consolidação documental para publicação controlada no GitHub.

## Entregas

- Documentos organizados em `docs/architecture`, `governance`, `decisions`, `releases`, `servicenow` e `guides`.
- CSS e JavaScript organizados em `assets/css` e `assets/js`.
- Páginas e componentes em `src/ui/pages` e `src/ui/components`.
- Serviço de readiness em `src/services`.
- Referências HTML/CSS, consumers de Context/Documentation e testes atualizados.
- ADR-0002 e relatório de estrutura adicionados.
- Validador local de referências criado em `scripts/validate-repository.mjs`.

## Não alterado

Nenhuma regra de classificação, cálculo, estado operacional, transição, posição de quadrante ou integração de produto foi redesenhada. A reorganização altera localizações e referências para preservar a execução.

## Impacto

A entrada permanece em `src/index.html`; a URL direta da Matriz passa a `src/ui/pages/matriz.html`. Os demais arquivos HTML permanecem navegáveis por links de páginas irmãs.

## Validação

Executar `node scripts/validate-repository.mjs` e todas as suítes `tests/**/*.test.js` antes de merge.

## Limitações

O projeto continua sem bundler frontend. A publicação e o PR precisam de revisão de links no GitHub e aprovação de homologação.
