# Governança Documental — RDCJ 2.0

## Responsáveis

- Product Owner: produto, escopo e decisões funcionais.
- Chief Architect: arquitetura, rastreabilidade e compatibilidade futura.
- Donos de domínio: classificação, operação e regras jurídicas.
- Documentation Architect: índice, snapshots, saúde e documentação derivada.
- Segurança/Compliance: retenção, acesso, dados sensíveis e aprovação normativa.

## Fontes oficiais

As fontes oficiais são os documentos existentes no repositório, a memória persistente e os artefatos de contexto. Documentos derivados nunca substituem as fontes oficiais.

## Processo de atualização

1. Alteração é feita na fonte oficial apropriada.
2. O Documentation Engine recalcula hashes e índice.
3. O snapshot documental registra o novo fingerprint.
4. A matriz de rastreabilidade é revisada quando feature, decisão, módulo ou release mudar.
5. Health check identifica cobertura, duplicidade, orfandade e inconsistência.
6. Alterações normativas exigem aprovação do responsável antes da publicação.

## Controle de versões

Documentos devem ser versionados pelo Git. Releases devem apontar para decisões, features e documentação correspondente. Não apagar histórico para corrigir conteúdo; registrar nova versão.

## Política de aprovação

- README/manual: revisão do Product Owner.
- Regras e decisões jurídicas: aprovação do dono jurídico/operacional.
- Arquitetura: aprovação do Chief Architect e stakeholders técnicos.
- ServiceNow mapping: aprovação de integração e plataforma.
- Documentos gerados: não exigem aprovação para serem regenerados, mas não podem ser usados como fonte normativa.
