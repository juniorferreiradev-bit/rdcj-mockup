# Provider Fallback Policy

- ServiceNow indisponível: permanecer em modo local somente quando explicitamente configurado; não executar escrita silenciosa em provider diferente.
- Banco indisponível: retornar health `unavailable`; fallback local somente em modo de demonstração.
- Provider inválido: rejeitar resolução e não alterar estado.
- Fallbacks devem ser explícitos, auditáveis e nunca mudar regras de negócio.
