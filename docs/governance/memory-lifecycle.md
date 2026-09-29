# Ciclo de Vida da Memória — RDCJ 2.0

## Objetivo

Definir como um registro de memória nasce, evolui, é consultado e perde vigência sem apagar sua rastreabilidade.

## Estados

1. **Proposto** — informação recebida, ainda não validada.
2. **Em revisão** — responsável analisa origem, impacto e duplicidade.
3. **Aprovado/Ativo** — pode ser usado como referência vigente.
4. **Substituído** — existe uma versão posterior que passa a ser a referência.
5. **Obsoleto** — não deve orientar novas decisões, mas permanece histórico.
6. **Arquivado** — retirado da consulta operacional comum, preservado conforme retenção.

## Fluxo

```text
Captura → Validação → Auditoria → Revisão → Aprovação → Uso → Atualização
                                      │                    │
                                      └── Rejeição          └── Substituição/Obsolescência
```

A implementação inicial registra e audita; aprovação, retenção e arquivamento são responsabilidades de governança futura.

## Regras de transição

- Não apagar memória aprovada para corrigir conteúdo; registrar nova versão.
- Toda substituição deve referenciar o item anterior.
- Alterações de arquitetura devem informar impacto e documentos afetados.
- Mudanças de documentação devem registrar caminho, versão e motivo.
- Registros conflitantes devem permanecer identificados até decisão formal.

## Papéis

- **Autor:** cria ou propõe o registro.
- **Dono do domínio:** valida conteúdo funcional/técnico.
- **Aprovador:** autoriza uso normativo.
- **Auditor:** consulta histórico e verifica rastreabilidade.
- **Memory Agent:** automatiza captura, indexação e preparação de drafts, sem aprovação implícita.

## Retenção e privacidade

A política definitiva depende de Segurança, Jurídico e Compliance. Até sua definição, a memória deve conter somente metadados e referências não sensíveis, usando dados anonimizados nos testes.
