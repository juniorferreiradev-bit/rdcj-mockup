# Provider Guidelines

- Providers não acessam UI.
- Providers não alteram regras de negócio.
- Providers devem expor `health()`.
- Providers ServiceNow não executam chamadas nesta sprint.
- Fallback deve ser explícito e auditável.
- A mesma entidade deve ser serializável entre providers.
- Falhas de provider não devem ser silenciosamente mascaradas.
