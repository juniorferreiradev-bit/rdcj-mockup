# Data Migration Plan

| Origem | Destino futuro | Estratégia |
|---|---|---|
| localStorage | tabelas/processos e Kanban futuras | exportar, normalizar, validar e reconciliar |
| Memory Layer | tabela de memória futura | preservar versão, escopo e fingerprint |
| Context Layer | tabela de contexto futura | preservar fontes e hash |
| Documentation Layer | tabela/document store futuro | preservar caminho e content hash |
| Kanban | `x_825936_rdcj_kanban` existente | mapear estado, raia, coluna, ordem e responsável |
| Auditoria | tabela de auditoria futura | carga append-only com trace_id |

Pré-condições: backup, contagem esperada, chaves idempotentes, validação de classificação e aprovação formal. Não houve carga.
