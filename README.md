# RDCJ 2.1

RDCJ significa **Risco, Decisão, Criticidade e Justiça**. O repositório contém uma aplicação demonstrativa estática para importar uma carteira judicial, classificar processos por Tempo × Valor e visualizar sua atuação operacional.

## Estado real do projeto

- Aplicação web em HTML/CSS/JavaScript, sem framework frontend, bundler ou backend.
- A execução de páginas depende de um servidor HTTP; `src/index.html` encaminha para a Matriz.
- A carteira, a auditoria local e os fluxos do Motor de Atuação usam `localStorage` no navegador.
- A classificação atualmente implementada é **Tempo da decisão × Valor da ação**. A matriz futura de Risco × Recuperação e IRP está no backlog e **não está implementada**.
- As camadas Memory, Context, Documentation, Domain, Repository, Provider, Agents e Governance existem como módulos/contratos locais e têm testes; não substituem o runtime da aplicação estática nem constituem um backend integrado.
- Kanban 2.0 é uma extensão de domínio sem conexão ao Kanban visual legado.
- ServiceNow está em preparação documental; não existe conexão, migração nem runtime integrado.

## Executar localmente

Na raiz do repositório:

```powershell
python -m http.server 8000
```

Acesse `http://localhost:8000/src/index.html`. A Matriz também pode ser aberta em `http://localhost:8000/src/ui/pages/matriz.html`.

## Arquitetura e runtime atual

O frontend servido pelo navegador usa `src/ui/pages/`, `assets/js/` e `assets/css/`. A navegação lateral é definida em `assets/js/navigation.js`. Cada página carrega scripts globais e utiliza a carteira local.

A classificação está em `assets/js/matriz-criticidade.js` e o adaptador de domínio/runtime em `assets/js/matrix-engine.js`. Os quadrantes mantêm a disposição N7–N9 no topo, N4–N6 no meio e N1–N3 na base. Pesos atuais: P1 = N1/N2/N4; P2 = N3/N5/N7; P3 = N6/N8; P4 = N9. A Matriz usa fundos pastéis por peso (P1 verde, P2 amarelo, P3 laranja, P4 vermelho suave); cores não alteram o classificador.

O Motor de Atuação em `assets/js/motor-atuacao.js` define sete estados e oito transições. `assets/js/kanban.js` apresenta seis raias e 24 colunas; o arraste reorganiza a posição visual e não substitui a transição formal do motor.

Importação Excel depende de XLSX carregado por CDN; o drag-and-drop do Kanban depende de SortableJS via CDN. Essas bibliotecas não estão empacotadas localmente.

### Telas existentes

| Tela | Arquivo | Estado |
|---|---|---|
| Entrada | `src/index.html` | Redireciona para a Matriz. |
| Dashboard | `src/ui/pages/dashboard.html` | Indicadores e distribuições locais. |
| Matriz RDCJ | `src/ui/pages/matriz.html` | Classificação T/V, filtros e quadrantes N1–N9. |
| Caixa de Trabalho | `src/ui/pages/trabalho.html` | Filas, decisões e timeline do motor local. |
| Kanban | `src/ui/pages/kanban.html` | Quadro visual ligado ao Motor de Atuação local. |
| Radar | `src/ui/pages/radar-carteira.html` | Distribuições da carteira. |
| Importação | `src/ui/pages/importar-carteira.html` | Importa CSV/XLS/XLSX no navegador. |
| Carteira | `src/ui/pages/carteira.html` | Lista filtrável de processos. |
| Processo 360° atual | `src/ui/pages/processo360.html` | Consolida dados locais do processo. |
| Processo legado | `src/ui/pages/processo.html` | Tela antiga, mantida para acesso direto. |
| Edição | `src/ui/pages/editar-processo.html` | Edição local legada. |
| Configuração | `src/ui/pages/configuracao-base.html` | Gestão e backup local da carteira. |
| Alertas | `src/ui/pages/alertas.html` | Placeholder. |
| Regras | `src/ui/pages/motor-rdcj.html` | Explica a classificação atual. |

O menu atual é montado em `assets/js/navigation.js` e contém oito itens: Dashboard, Matriz, Caixa de Trabalho, Kanban, Radar, Importar base, Lista de processos e Gestão da carteira. Processo 360°, edição, Alertas e Regras são acessados por URL ou links contextuais.

## Camadas e módulos existentes

- `src/core/memory/`: MemoryRepository, MemoryEngine e MemoryService.
- `src/core/context/`: contexto de projeto/arquitetura, KnowledgeIndex, KnowledgeEngine e cache.
- `src/core/documentation/`: indexação, geração, snapshots e health documental.
- `src/domain/`: entidades, value objects, contratos, políticas e serviços; contém também arquivos TypeScript históricos sem compilação frontend.
- `src/repositories/`: repositories e adapters locais.
- `src/providers/`: LocalStorage, Memory, Context, Documentation, ServiceNow stub e database stub.
- `src/agents/`: sete agents determinísticos, registry, factory, orchestrator e health service.
- `src/governance/` e `governance/`: health service e artefatos documentais de governança.
- `src/domain/kanban/`: métricas, SLA, WIP, movement, audit, history, executive metrics e alert services, sem integração com o runtime legado.
- `src/services/ServiceNowReadinessHealthService.js`: verificador local de readiness, sem conexão externa.

## Persistência atual

| Chave `localStorage` | Uso |
|---|---|
| `rdcj-processos` | Carteira importada/editada. |
| `rdcj-base-metadata` | Metadados da carga. |
| `rdcj-auditoria` | Eventos locais de auditoria. |
| `rdcj-motor-atuacao` | Fluxos, histórico e timers operacionais. |
| `rdcj-sessao-status` | Estado do backup/restauração local. |

Não há sincronização entre usuários ou navegadores, autenticação nem autorização.

## Documentação, decisões e governança

- Estrutura real e movimentos: [`PROJECT-STRUCTURE.md`](PROJECT-STRUCTURE.md) e [`docs/architecture/PROJECT-STRUCTURE.md`](docs/architecture/PROJECT-STRUCTURE.md).
- Arquitetura em camadas: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md); arquitetura-alvo está identificada separadamente.
- Decisão da reorganização: [`docs/decisions/ADR-0002-Reestruturacao-Repositorio.md`](docs/decisions/ADR-0002-Reestruturacao-Repositorio.md).
- Governança: `docs/governance/`, `governance/` e `src/governance/`.
- Auditoria de consistência documental: [`docs/governance/DOCUMENTATION-AUDIT.md`](docs/governance/DOCUMENTATION-AUDIT.md).
- Histórico: `src/memory/decisions-log.md`, `src/memory/feedback-log.md` e `src/memory/product-memory.md`.
- Backlog: `src/memory/backlog.md`; itens planejados estão separados das capacidades atuais.
- Manual: [`MANUAL-OPERADOR.md`](MANUAL-OPERADOR.md); instalação: `docs/guides/INSTALACAO-RAPIDA.md`.
- Releases: `docs/releases/RELEASE-v0.1.md`, `docs/releases/RDCJ-2.0-RELEASE.md` e [`RELEASE-v2.1.md`](RELEASE-v2.1.md).

Arquivos de entrada na raiz incluem `README.md`, `CHANGELOG.md`, `MANUAL-OPERADOR.md`, `CONTRIBUTING.md`, `LICENSE-INTERNA.md`, `PROJECT-STRUCTURE.md`, `RELEASE-v2.1.md` e `SERVICENOW.md`. `.github/` contém `CODEOWNERS` e templates; prompts ficam em `prompts/`.

## ServiceNow Readiness

A documentação em [`SERVICENOW.md`](SERVICENOW.md) e `docs/servicenow/` descreve tabelas mapeadas/propostas, contratos, workspace blueprint, estratégia de segurança, migração e runbook. Os contratos e mappings são planejamento, não evidência de implementação na instância. `ServiceNowProvider.health()` informa `connected: false` e `realCalls: false`.

## Releases

- `RELEASE-v0.1.md` em `docs/releases/`: baseline funcional do mockup.
- `RDCJ-2.0-RELEASE.md` em `docs/releases/`: consolidação das camadas e preparação do RDCJ 2.0.
- [`RELEASE-v2.1.md`](RELEASE-v2.1.md): hardening do repositório e modernização visual da Matriz; sem alteração dos cálculos de classificação.

## Backlog — não implementado

A memória de produto registra Risco de Perda, Potencial de Recuperação e IRP como evolução. O backlog também contempla versionamento das regras, importação mais robusta e evidências. Esses itens são planejamento e não devem ser apresentados como capacidades atuais.

## Testes e validação

```powershell
node scripts/validate-repository.mjs
Get-ChildItem tests -Recurse -Filter *.test.js | ForEach-Object { node $_.FullName }
```

As suítes cobrem Memory, Context, Documentation, Domain, Repository, Provider, Agents, Governance, Kanban 2.0 e ServiceNow readiness. Não há build frontend.
