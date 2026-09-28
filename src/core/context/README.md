# Context + Knowledge Engine

Camada determinística do RDCJ 2.0 para consolidar memória e documentação em contexto consultável.

- `ContextRepository`: lê documentos e `memory/project-memory.json` sem modificar as fontes.
- `KnowledgeIndex`: organiza fontes por categoria.
- `KnowledgeEngine`: consolida índice e modelo.
- `ContextEngine`: calcula fingerprint, usa cache, gera snapshot e expõe consultas.
- `ContextService`: fachada de consultas para consumidores e futuros agentes.
- `ContextCache`: cache LRU simples em memória.

Não usa IA, embeddings ou frameworks externos. Não é importada pelo runtime das páginas do mockup.
