# Contributing to RDCJ 2.0

## Branch Strategy

- `main`: baseline publicável e releases aprovadas.
- `develop`: integração de mudanças aprovadas.
- `feature/*`: novas capacidades.
- `fix/*`: correções controladas.
- `docs/*`: documentação sem alteração de runtime.

## Pull Requests

Toda PR deve conter objetivo, escopo, arquivos afetados, riscos, testes executados, impacto arquitetural e plano de rollback quando aplicável.

Não misture mudança de código, arquitetura e documentação sem explicitar a dependência.

## Templates e checklist

- requisitos rastreáveis;
- compatibilidade com o baseline;
- testes aprovados;
- segurança e dados avaliados;
- documentação atualizada;
- nenhuma credencial ou dado real incluído;
- impacto ServiceNow declarado.

## Governança

Mudanças em regras, classificação, motor de atuação, Kanban, contratos, segurança, agents ou migração exigem revisão de Architecture, Product Owner, QA e Governance conforme risco.

## Fluxo de aprovação

1. autor cria branch;
2. executa testes e valida documentação;
3. abre PR com evidências;
4. revisores técnicos avaliam domínio e arquitetura;
5. QA valida regressão;
6. Governance aprova risco e release;
7. merge somente após checks obrigatórios.

## Documentação

Novas decisões devem ser registradas em ADR/decision history. Alterações de contrato devem atualizar versionamento, consumidores e readiness.
