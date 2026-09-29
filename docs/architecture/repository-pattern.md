# Repository Pattern — RDCJ 2.0

Repositories expõem operações do domínio e delegam detalhes a adapters.

`ProcessRepository`, `KanbanRepository` e `AuditRepository` usam adapters LocalStorage compatíveis com as chaves existentes. Adapters de Memory, Context e Documentation encapsulam os repositórios dos Prompts 02–04.

A UI atual não foi alterada; a migração para os services ocorrerá somente em etapa posterior e controlada.
