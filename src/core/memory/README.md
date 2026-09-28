# Núcleo de Memória RDCJ

Esta camada é independente do runtime atual do mockup. Ela não é carregada pelas páginas existentes e não altera as chaves atuais de `localStorage`.

## Uso

`MemoryRepository` é o único componente que conhece o armazenamento. Por padrão, usa `localStorage` quando disponível; em testes ou backend futuro, recebe um adaptador com `getItem`, `setItem` e `removeItem`.

`MemoryEngine` recebe eventos, valida o payload, persiste a entidade e gera auditoria na mesma atualização.

`MemoryService` expõe os registros de alto nível: decisões, features, tarefas, módulos, releases, documentação e arquitetura.

A integração atual é deliberadamente opt-in. Nenhuma página do mockup existente importa este módulo.
