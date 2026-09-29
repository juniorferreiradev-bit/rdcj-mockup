# Memória do Produto — RDCJ

## Visão de produto

O RDCJ deve ajudar o usuário a responder: **“Onde está cada processo da carteira e por que ele está ali?”** A Matriz é a experiência central, o processo é a unidade analisada e a planilha é uma das entradas do mockup.

## Estado funcional implementado

O código executável em `assets/js/matriz-criticidade.js` classifica por **Tempo da decisão × Valor da ação**:

- Eixo temporal: T1 (<1 ano), T2 (1–2 anos), T3 (>2 anos).
- Eixo de valor: V1 (até R$ 64.840,00), V2 (até R$ 485.040,04), V3 (acima).
- Quadrantes: T1 → N1/N2/N3; T2 → N4/N5/N6; T3 → N7/N8/N9.
- Pesos: P1 = N1/N2/N4; P2 = N3/N5/N7; P3 = N6/N8; P4 = N9.

O fluxo disponível é importar uma planilha, mapear campos, classificar localmente, consultar a Matriz/Carteira e abrir Processo 360°. A Matriz usa uma paleta suave de apresentação por peso: P1 `#F4FAF6`/`#D6E8DA`/`#2E6B45`, P2 `#FFFBEF`/`#F1E3B5`/`#8A6D1D`, P3 `#FFF4EC`/`#F4D2B8`/`#A35B1F`, P4 `#FFF1F3`/`#E8B9C0`/`#A12A3A` (fundo/borda/texto). Essa camada visual não participa do algoritmo de classificação.

## Visão Risco × Recuperação — não implementada

A orientação de produto de evoluir para Risco de Perda × Potencial de Recuperação permanece uma **visão-alvo no backlog**, pendente de homologação de critérios jurídicos e operacionais. Não é o classificador executado atualmente. IRP, fatores de risco e ativos também não estão implementados como critérios ativos.

## Score e KPIs

Score não deve conduzir a experiência do produto. A ordem de prioridade da visão é **Matriz → Processos → Filtros → KPIs**; isso descreve a intenção de produto, enquanto as telas/KPIs efetivamente existentes estão listados no README.