# ServiceNow Governance Runtime

- **Aprovações:** mudanças classificadas por risco, com aprovador independente.
- **Releases:** gates de contrato, segurança, dados, testes e rollback.
- **Auditoria:** toda solicitação, decisão e execução recebe trace_id.
- **Workflow:** proposta → análise → aprovação → execução futura → validação → encerramento.
- **Segregação:** quem solicita não aprova a própria mudança crítica.

O modelo é documental e não inicia workflows reais.
