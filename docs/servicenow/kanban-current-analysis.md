# Análise do Kanban atual

## Escopo congelado
Esta análise descreve o Kanban legado sem alterar sua implementação. A UI está em `assets/js/kanban.js` e `src/ui/pages/kanban.html`; o motor está em `assets/js/motor-atuacao.js`.

## Estrutura visual
São 6 raias e 24 colunas:

| Raia | Colunas |
|---|---|
| CLASSIFICAÇÃO | Nova Entrada, P4, P3, P2, P1 |
| ADVOGADO | Novos Processos, Em Revisão Jurídica, Peticionar, Aguardando Resultado Judicial, Retorno para Revisão, Retorno Ativo Localizado |
| AGÊNCIA | Recebidos, Em Investigação, Achados, Sem Achados |
| CENTRAL RETAGUARDA | Recebidos, Busca Patrimonial, Busca Frutífera, Busca Negativa |
| MONITORAMENTO | P4 · 90 dias, P3 · 180 dias, P2 · 240 dias, P1 · Reativo |
| CONCLUÍDOS | Concluídos |

Os identificadores legados são mantidos por `COLUNAS` e `COLUNAS_POR_ESTADO`.

## Estados
`REVISAO_JURIDICA`, `PETICIONAMENTO`, `AGUARDANDO_RESULTADO`, `INVESTIGACAO_AGENCIA`, `INVESTIGACAO_RETAGUARDA`, `MONITORAMENTO` e `ENCERRADO`.

## Transições
- REVISAO_JURIDICA → PETICIONAMENTO: Existe oportunidade processual
- REVISAO_JURIDICA → INVESTIGACAO_AGENCIA: Não existe oportunidade
- INVESTIGACAO_AGENCIA → INVESTIGACAO_RETAGUARDA: Informação relevante localizada
- INVESTIGACAO_AGENCIA → MONITORAMENTO: Nada localizado
- INVESTIGACAO_RETAGUARDA → PETICIONAMENTO: Ativo localizado
- INVESTIGACAO_RETAGUARDA → MONITORAMENTO: Busca negativa
- PETICIONAMENTO → AGUARDANDO_RESULTADO: Petição protocolada
- AGUARDANDO_RESULTADO → MONITORAMENTO: Encerrar diligência

Não há transição livre para `ENCERRADO`.

## Motor operacional existente
`rdcjMotorAtuacao` persiste em `localStorage` com a chave `rdcj-motor-atuacao` e mantém `fluxos`, `historicos` e `timers`. Ele inicializa fluxos, calcula coluna padrão, responsável, próxima revisão, aplica transições, registra histórico e reordena cartões. A movimentação visual entre colunas não altera estado, linha, timers ou histórico; somente atualiza coluna e ordem.

## Auditoria existente
A auditoria existente é delegada a `window.rdcjAuditoria.registrar` quando disponível, com tipo `MUDANCA_ESTADO`, processo, usuário, origem, destino, resultado e data. O motor também grava um histórico simplificado local. Não existe histórico completo de alterações de coluna, SLA ou WIP.

## Drag and drop
`assets/js/kanban.js` usa SortableJS. O drop reordena a coluna de destino e, se necessário, a origem. Não há política de motivo obrigatório nem limite WIP no runtime legado.

## Compatibilidade
O Kanban 2.0 é uma camada adicional em `src/domain/kanban/`. Nenhum arquivo legado, tela, regra de classificação ou persistência existente é substituído.
