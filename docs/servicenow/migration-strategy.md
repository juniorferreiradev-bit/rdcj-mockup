# Migration Strategy

1. **Descoberta:** inventariar schemas, dados, dependências, usuários e volumes.
2. **Preparação:** validar contratos, mapeamentos, segurança, ambientes e critérios de aceite.
3. **Carga Inicial:** executar somente após aprovação; carga idempotente e reconciliável.
4. **Validação:** comparar contagens, chaves, classificação, Kanban e trilhas.
5. **Cutover:** janela aprovada, congelamento controlado, smoke tests e plano de rollback.
6. **Operação Assistida:** monitoramento, suporte, reconciliação e aceite operacional.

Status atual: desenho preparado; nenhuma fase executada.
