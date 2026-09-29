# RDCJ 2.1

## 1. Visão Geral

RDCJ significa **Risco, Decisão, Criticidade e Justiça**. O repositório contém uma aplicação demonstrativa para importar e analisar uma carteira judicial, visualizar os processos numa Matriz RDCJ e acompanhar fluxos operacionais locais.

A aplicação atual é estática: HTML, CSS e JavaScript executados no navegador, sem backend, autenticação ou sincronização entre usuários.

## 2. Objetivo do RDCJ

A experiência ajuda o operador a responder:

1. Onde está cada processo e como foi classificado?
2. Qual estado e responsável operacional estão registrados localmente?

A classificação executável no código é **Tempo da decisão × Valor da ação**. A visão Risco × Recuperação/IRP é uma direção futura do produto, não o algoritmo disponível.

## 3. Funcionalidades Implementadas

- **Dashboard:** indicadores e distribuições calculados sobre a carteira local.
- **Matriz RDCJ:** classificação T1–T3 × V1–V3, quadrantes N1–N9, pesos P1–P4, filtros e navegação para a carteira. A apresentação usa paleta suave por peso; cores não alteram cálculos.
- **Processo 360°:** identificação, enquadramento, explicabilidade, timeline e próxima ação com dados locais. A área de evidências é apenas estrutura; upload não está implementado.
- **Kanban:** seis raias e 24 colunas. Drag-and-drop reorganiza coluna/ordem visual e não substitui as transições do Motor de Atuação.
- **Importação XLS/XLSX/CSV:** leitura, mapeamento e persistência local no navegador. O XLSX é carregado por CDN.
- **Backup e Restore:** exportação/importação JSON da sessão local; não é backup de servidor.
- **Carteira, Caixa de Trabalho, Radar e Configuração:** telas locais existentes descritas no Manual do Operador.

### Estado por capacidade

- **Implementado:** telas listadas acima, classificador Tempo × Valor, Motor de Atuação local, `localStorage`, backup/restore e suítes Node.
- **Em evolução:** RDCJ 2.1 consolida a documentação/estrutura; serviços de Kanban 2.0 existem como extensão de domínio isolada, sem integração com o Kanban visual.
- **Planejado:** Risco × Recuperação, IRP, persistência corporativa, autenticação/autorização, backend, evidências gerenciadas e integração ServiceNow.

## 4. Estrutura Atual do Projeto

```text
/
├── README.md, CHANGELOG.md, MANUAL-OPERADOR.md, CONTRIBUTING.md
├── PROJECT-STRUCTURE.md, RELEASE-v2.1.md, SERVICENOW.md
├── .github/                         # CODEOWNERS e templates
├── docs/
│   ├── architecture/                # arquitetura e estrutura
│   ├── governance/                  # políticas, matrizes e auditoria documental
│   ├── decisions/                   # ADRs e decisões
│   ├── releases/                    # releases e readiness
│   ├── servicenow/                  # mappings e readiness documental
│   └── guides/                      # guias e snapshots históricos
├── assets/{css,js,images,icons}/    # estilos, scripts e recursos web
├── src/
│   ├── index.html
│   ├── ui/{pages,components}/        # telas e componente visual
│   ├── core/{context,documentation,memory}/
│   ├── domain/                      # entidades, políticas e serviços
│   ├── repositories/                # repositories/adapters locais
│   ├── providers/                   # providers locais/stubs
│   ├── agents/                      # framework e agents locais
│   ├── governance/                  # health service
│   ├── services/                    # ServiceNow readiness health
│   └── memory/                      # memória e decisões do produto
├── prompts/                         # prompts históricos
├── tests/                           # suítes Node
├── scripts/                         # validador de referências
├── memory/                          # memória/índices/snapshots derivados
└── governance/                      # artefatos documentais de governança
```

A árvore detalhada e o inventário estão em [`PROJECT-STRUCTURE.md`](PROJECT-STRUCTURE.md) e [`docs/architecture/PROJECT-STRUCTURE.md`](docs/architecture/PROJECT-STRUCTURE.md).

## 5. Arquitetura Atual

- **UI runtime:** `src/ui/pages/` + `assets/js/` + `assets/css/`; páginas carregam scripts globais no navegador.
- **Runtime de negócio legado:** classificador em `assets/js/matriz-criticidade.js`, adaptador `assets/js/matrix-engine.js`, motor em `assets/js/motor-atuacao.js`, auditoria local e repositories do frontend.
- **Core local:** Memory, Context/Knowledge e Documentation com serviços, índices, snapshots e health checks.
- **Domain:** entidades, value objects, policies, contratos e serviços JavaScript; arquivos TypeScript históricos não são compilados no frontend.
- **Repositories/Providers:** adapters locais, LocalStorageProvider e stubs futuros; não constituem uma API de backend integrada.
- **Agents/Governance:** framework determinístico, registry/orchestration e health/governance documental/local; sem execução remota nem enforcement corporativo.
- **Kanban 2.0:** serviços locais de métricas, SLA, WIP, movimento, auditoria, histórico e alertas, isolados do Kanban visual legado.

Não há bundler ou build frontend. Importação Excel e drag-and-drop usam dependências carregadas por CDN.

## 6. Governança

A governança está representada por documentos, matrizes, templates, `GovernanceHealthService`, contracts e templates GitHub em `.github/`. Aprovações e regras documentadas não são workflow automaticamente aplicado pela aplicação. Consulte [`docs/governance/DOCUMENTATION-AUDIT.md`](docs/governance/DOCUMENTATION-AUDIT.md) e [`docs/decisions/ADR-0002-Reestruturacao-Repositorio.md`](docs/decisions/ADR-0002-Reestruturacao-Repositorio.md).

## 7. Documentação

- Operação: [`MANUAL-OPERADOR.md`](MANUAL-OPERADOR.md) e `docs/guides/`.
- Arquitetura/estrutura: `docs/architecture/` e `PROJECT-STRUCTURE.md`.
- Decisões: `docs/decisions/` e `src/memory/decisions-log.md`.
- Produto/feedback/backlog: `src/memory/product-memory.md`, `feedback-log.md` e `backlog.md`.
- Governança: `docs/governance/` e `governance/`.
- Auditoria de consistência: [`docs/governance/DOCUMENTATION-AUDIT.md`](docs/governance/DOCUMENTATION-AUDIT.md).

Snapshots, índices e fingerprints derivados ficam em `memory/`; são regeneráveis a partir das fontes configuradas nos engines.

## 8. Releases

- **v0.1:** baseline do mockup em `docs/releases/RELEASE-v0.1.md`.
- **RDCJ 2.0:** registro histórico em `docs/releases/RDCJ-2.0-RELEASE.md`; descreve a conclusão das sprints, não uma integração corporativa.
- **RDCJ 2.1:** reorganização documental/estrutural e apresentação visual da Matriz em [`RELEASE-v2.1.md`](RELEASE-v2.1.md).
- O histórico acumulado está em [`CHANGELOG.md`](CHANGELOG.md).

## 9. ServiceNow Readiness

ServiceNow está em **readiness documental**, não integrado. `SERVICENOW.md` e `docs/servicenow/` contêm mappings, contracts, workspace blueprint, estratégia ACL/security, planos de migração e runbook. `ServiceNowProvider` é stub: `connected: false`, `realCalls: false`. Não há chamadas REST, migração, tabelas ou ACLs reais criadas por este repositório.

## 10. Roadmap

### Implementado

Telas e funcionalidades locais da seção 3; módulos e testes locais descritos nas seções 4–5.

### Em Evolução

Homologação da divergência entre a visão-alvo Risco × Recuperação e o classificador Tempo × Valor; aperfeiçoamento de documentação, contratos e extensão Kanban 2.0 sem ligação ao runtime legado.

### Planejado

- Regras homologadas de Risco de Perda, Potencial de Recuperação e IRP.
- Persistência server-side, identidade, autorização e auditoria corporativa.
- Gestão real de evidências e APIs.
- Integração ServiceNow após aprovação e testes em sandbox.

Não iniciar esses itens como capacidades atuais; dependem de validação de negócio, segurança e arquitetura.

## Executar e validar

Na raiz, execute `python -m http.server 8000` e abra `http://localhost:8000/src/index.html`.

```powershell
node scripts/validate-repository.mjs
Get-ChildItem tests -Recurse -Filter *.test.js | ForEach-Object { node $_.FullName }
```
