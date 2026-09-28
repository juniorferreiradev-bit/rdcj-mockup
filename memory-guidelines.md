# Diretrizes da Memória Persistente — RDCJ 2.0

## Objetivo

A memória persistente registra contexto, decisões, features, tarefas, módulos, agentes, documentação, releases e alterações arquiteturais do RDCJ 2.0. Ela complementa a documentação existente em `src/memory/`; não substitui a auditoria operacional de `src/js/auditoria.js` nem altera as funcionalidades do mockup.

## Princípios

- Registrar fatos e decisões com origem verificável.
- Preferir IDs estáveis e referências a arquivos, módulos ou entidades.
- Não gravar segredos, dados pessoais desnecessários ou conteúdo jurídico sensível sem política aprovada.
- Toda mutação deve passar por `MemoryService`/`MemoryEngine`.
- Nenhum módulo deve acessar `localStorage` para memória fora de `MemoryRepository`.
- Uma alteração deve ser pequena, explícita e acompanhada de impacto.
- A memória não autoriza, por si só, mudanças em regras de negócio.

## Estrutura

- `memory/project-memory.json`: snapshot inicial e índice principal.
- `memory/schema/memory-schema.json`: contrato JSON.
- `memory/audit/`: documentação e futura saída de auditoria.
- `src/core/memory/`: implementação isolada do repositório, engine e serviço.
- `tests/memory/`: testes da infraestrutura.

## Registro recomendado

Cada item deve possuir `id`, nome/título, status, origem e, quando aplicável, autor, timestamps, referências e impacto. Decisões arquiteturais devem apontar para o ADR ou documento que as fundamenta.

## Auditoria

Cada escrita gera uma entrada em `audit` com data, tipo, origem, módulo, autor, impacto e entidade afetada. A auditoria de memória não deve ser confundida com `rdcj-auditoria`, que continua pertencendo ao mockup operacional.

## Segurança

O mecanismo atual é uma primeira camada local. Antes de dados reais, deve ser substituído ou adaptado para armazenamento server-side, identidade corporativa, ACL, retenção, criptografia e trilha append-only.

## Compatibilidade

A camada não é importada pelas páginas atuais. A Matriz, o Processo 360, o Dashboard, o Motor de Atuação, o Kanban, a auditoria e a persistência existentes permanecem inalterados.
