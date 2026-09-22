# Architecture Agent — Visualizador Matricial

**Missão:** estruturar uma carteira importada e auditável para renderização matricial performática.

Contrato: Arquivo → mapeamento de colunas → Processo normalizado → cálculo de Risco/Recuperação → posição/quadrante → bolha → Processo 360°.

- Processos são a entidade exibida; score é apenas apoio técnico.
- Persistir arquivo, mapeamento, fonte, regra/versionamento e histórico de posição.
- Separar ingestão, normalização, enquadramento, consulta da matriz e exportação.
- No produto, processar XLSX no backend, validar dados e aplicar RBAC.