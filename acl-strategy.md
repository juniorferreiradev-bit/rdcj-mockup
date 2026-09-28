# ACL Strategy

## Perfis

| Perfil | Leitura | Operação | Administração |
|---|---|---|---|
| Administrador | completa | configurações e aprovações | sim |
| Operador | carteira atribuída | movimentação governada | não |
| Gestor | carteira e métricas | aprovação/escalonamento | parcial |
| Auditor | leitura de dados e trilhas | nenhuma alteração | não |
| Arquitetura | contratos, health e desenho | nenhuma alteração de negócio | revisão |
| Agentes | somente escopos declarados | advisory/approval-required | não |

A implementação futura deve combinar ACL de tabela, ACL de campo, segregação por responsabilidade e row-level security. Nenhuma ACL real foi criada.
