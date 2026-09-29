# Security Model

- **Acesso:** autenticação ServiceNow futura, role mínima e escopo por função.
- **Segregação:** operador movimenta; gestor aprova; auditor consulta; administrador configura.
- **Auditoria:** eventos append-only com ator, timestamp, identificador e payload.
- **Aprovação:** mudanças de alto risco exigem aprovação independente.
- **Rastreabilidade:** `trace_id` liga solicitação, aprovação, execução e auditoria.
- **Princípio:** deny by default e menor privilégio.

Este é um modelo de design; não altera ACLs existentes nem executa controles.
