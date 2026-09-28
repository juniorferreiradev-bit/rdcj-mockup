# Governança Operacional do Kanban 2.0

## Aprovação
Mudanças de fluxo, SLA, WIP e regras de encerramento exigem aprovação do responsável de negócio e revisão do ArchitectAgent. O Kanban legado continua sendo a referência operacional atual.

## Movimentação
Toda movimentação nova deve informar origem, destino, data, responsável, identificador e motivo válido. Motivos aceitos: operacional, jurídico, negociação, encerramento, erro operacional e reclassificação.

## Reclassificação
Reclassificações devem preservar o processo, registrar estado anterior/novo e motivo `reclassificação`, sem persistir quadrante ou peso como substituto da classificação atual.

## Encerramento
Encerramento é governado e não é criado por drag-and-drop livre. A extensão apenas descreve e audita o evento; não altera a máquina legada.

## Escalonamento
SLA vencido, WIP excedido, fluxo parado e processo órfão geram alertas para o responsável da matriz operacional. O envio automático não está conectado.
