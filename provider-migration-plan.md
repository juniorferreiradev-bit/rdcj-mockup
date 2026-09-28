# Provider Migration Plan

`LocalStorageProvider` → `ServiceNowProvider`.

1. Implementar adapter contratual em ambiente isolado.
2. Mapear operações de leitura e escrita para APIs autorizadas.
3. Executar testes de contrato e reconciliação.
4. Habilitar leitura controlada.
5. Habilitar escrita somente após aprovação e rollback testado.
6. Retirar fallback apenas após operação assistida.

Nesta Sprint o `ServiceNowProvider` permanece stub-only, sem implementação ou chamadas.
