# ServiceNow Runtime Guidelines

1. Não criar artefatos sem contrato e aprovação.
2. Preservar nomes e regras RDCJ existentes.
3. Aplicar menor privilégio e segregação.
4. Tornar cargas idempotentes e reconciliáveis.
5. Exigir auditoria e trace_id.
6. Testar rollback antes do cutover.
7. Manter providers substituíveis.
8. Não executar chamadas reais em ambiente de design.
