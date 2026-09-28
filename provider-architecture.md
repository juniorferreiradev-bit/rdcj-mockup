# Provider Architecture — RDCJ 2.0

## Objetivo

Desacoplar repositories de storage, preservando o runtime atual e permitindo providers futuros.

## Arquitetura

```text
Repository → Provider → Storage
```

Providers atuais:

- LocalStorageProvider;
- MemoryProvider;
- ContextProvider;
- DocumentationProvider.

Providers futuros estruturados:

- ServiceNowProvider;
- FutureDatabaseProvider.

## Limitações

Nenhum provider foi conectado automaticamente aos módulos atuais. ServiceNow e banco são somente stubs.
