# Estrutura do Repositório — RDCJ 2.1

## Relatório de análise

Antes da reorganização, o repositório continha mais de cem documentos técnicos na raiz, frontend executável dividido entre `src/js`, `src/css` e `src/pages`, além das camadas arquiteturais em `src/core`, `src/domain`, `src/repositories`, `src/providers`, `src/agents` e `src/governance`. A UI referenciava scripts e estilos por caminhos relativos e não possui bundler.

## Estrutura final

```text
/
├── README.md
├── CHANGELOG.md
├── MANUAL-OPERADOR.md
├── CONTRIBUTING.md
├── LICENSE-INTERNA.md
├── docs/
│   ├── architecture/
│   ├── governance/
│   ├── decisions/
│   ├── releases/
│   ├── servicenow/
│   │   ├── contracts/
│   │   └── runtime/
│   └── guides/
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── icons/
├── src/
│   ├── index.html
│   ├── ui/
│   │   ├── pages/
│   │   └── components/
│   ├── core/
│   ├── domain/
│   ├── services/
│   ├── repositories/
│   ├── providers/
│   ├── agents/
│   ├── governance/
│   └── memory/
├── prompts/
├── tests/
├── scripts/
├── memory/
└── governance/
```

## Movimentos executados

- Documentos técnicos da raiz foram agrupados por arquitetura, governança, decisões, releases, ServiceNow e guias.
- CSS e JavaScript de `src/css/` e `src/js/` foram movidos para `assets/css/` e `assets/js/`.
- Páginas de `src/pages/` foram movidas para `src/ui/pages/`; componente de UI foi movido para `src/ui/components/`.
- `ServiceNowReadinessHealthService` foi movido para `src/services/`.
- Os prompts históricos, memória legada e artefatos existentes de governança foram preservados.

## Impactos e compatibilidade

Os caminhos relativos de página, scripts e estilos foram atualizados. Links de páginas irmãs permanecem relativos porque todas as páginas continuam juntas. A entrada `src/index.html` continua disponível e aponta para `src/ui/pages/matriz.html`. Os arquivos de UI existentes não tiveram algoritmos ou comportamento funcional alterados nesta reorganização.

O branch RDCJ 2.1 também inclui a camada visual moderna da Matriz (`assets/js/matriz-moderna-ui.js` e `assets/css/matriz-moderna.css`): apresentação por peso, com a disposição N1–N9 e o classificador atual preservados. Isso é uma alteração visual explícita da release, não uma consequência do movimento de arquivos.

## Decisões tomadas

- Manter README, CHANGELOG, manual, contribuição e licença na raiz por convenção de repositório.
- Organizar documentos por assunto sem deduplicar versões históricas.
- Preservar `src/domain` e camadas existentes em vez de renomeá-las.
- Manter diretórios reservados para imagens e ícones, mesmo sem ativos binários atuais.
- Não criar build frontend: o projeto continua estático.

## Validação

`node scripts/validate-repository.mjs` verifica referências HTML, Markdown e CSS locais. As suítes Node em `tests/` verificam contracts, domain, repositories, providers, agents, governance, Kanban 2.0 e ServiceNow readiness.
