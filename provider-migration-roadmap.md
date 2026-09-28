# Provider Migration Roadmap

```text
Persistência atual → Repository → Provider → Storage corporativo
```

- Baixo impacto: Memory, Context, Documentation e registry.
- Médio impacto: AuditProvider e leituras de Processo.
- Alto impacto: escritas de Processo, Kanban, Motor de Atuação e concorrência.

A migração futura deve usar execução paralela, reconciliação, idempotência, rollback e homologação ServiceNow.
