# ADR-0002 — Reestruturação do Repositório

- **Status:** Aprovado
- **Data:** 2026-09-29
- **Decisores:** Arquitetura RDCJ

## Contexto

O RDCJ cresceu por sprints incrementais. Documentos de arquitetura, governança, releases e ServiceNow estavam dispersos na raiz; o frontend estava separado em `src/js`, `src/css` e `src/pages`, com caminhos relativos e sem bundler.

## Problema

A dispersão dificultava descoberta, onboarding, revisão, validação de links e publicação no GitHub. Uma movimentação sem atualização de referências quebraria a aplicação estática e os testes que leem contratos/documentos por caminho.

## Alternativas consideradas

1. Manter a estrutura e adicionar somente índices — baixo risco imediato, mas deixa o problema de navegação documental.
2. Recriar o projeto em um novo layout — rejeitada por risco de perda e regressão.
3. Reorganizar incrementalmente, preservando conteúdo e corrigindo caminhos — escolhida.
4. Introduzir bundler/framework como parte da organização — rejeitada, pois altera o modelo de execução sem necessidade.

## Decisão

Adotar diretórios `docs/` por domínio documental, `assets/css` e `assets/js` para recursos web, `src/ui/pages` e `src/ui/components` para UI, mantendo as camadas de domínio e arquitetura existentes. Preservar `src/index.html` como entrada. Atualizar referências estáticas, consumers documentais e testes. Não deduplicar ou excluir arquivos históricos.

## Benefícios

- Navegação mais previsível para publicação e onboarding.
- Separação clara entre documentação, assets e fontes de domínio.
- Menor ambiguidade nas fontes de verdade e nos contratos.
- Estrutura preparada para validação de referências e evolução futura.

## Riscos e mitigação

- **Links relativos quebrados:** validador estático e inspeção de todas as páginas.
- **Catálogos de contexto/documentação desatualizados:** atualizar defaults e executar testes.
- **Mudanças visuais inadvertidas:** limitar alterações de UI a caminhos, preservando conteúdo e validar regressão.
- **Arquivos históricos duplicados:** preservar, categorizar e documentar sem remoção automática.
- **Build inexistente:** declarar o caráter estático e validar recursos sem introduzir bundler.

## Consequências

As páginas passam a residir em `src/ui/pages/`; CSS/JS passam a `assets/`; documentação passa a `docs/`. Consumers que leem documentos/contracts por path precisam usar os novos caminhos. `README.md`, `CHANGELOG.md` e `MANUAL-OPERADOR.md` continuam na raiz.
