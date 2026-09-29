# RDCJ Mockup

**Release arquitetural/documental atual: RDCJ 2.1.** Consulte [`PROJECT-STRUCTURE.md`](PROJECT-STRUCTURE.md), [`RELEASE-v2.1.md`](RELEASE-v2.1.md) e [`docs/decisions/ADR-0002-Reestruturacao-Repositorio.md`](docs/decisions/ADR-0002-Reestruturacao-Repositorio.md).

Mockup funcional do RDCJ — **Risco, Decisão, Criticidade e Justiça** — para classificação e atuação operacional sobre uma carteira judicial importada.

O projeto responde a duas perguntas complementares:

1. **Onde está cada processo e por que ele está nesse quadrante?** — Matriz RDCJ.
2. **Quem deve agir, o que deve ser feito, quando e qual foi o resultado?** — Motor de Atuação e Caixa de Trabalho.

## Status atual

- Front-end estático, sem framework e sem backend.
- Entrada principal: arquivos `.xlsx`, `.xls` ou `.csv`.
- Persistência local no navegador via `localStorage`.
- Classificação matricial baseada em tempo da decisão e valor da ação.
- Processo 360° com explicação, linha de atuação, próxima ação e histórico de auditoria.
- Motor operacional baseado em máquina de estados: **estado → ação → novo estado**.
- Kanban RDCJ como camada visual de arrastar-e-soltar sobre o motor de atuação (não altera estado sozinho).
- Backup e restauração local da sessão ("Sessão RDCJ") em arquivo `.json`, sem servidor nem banco de dados.
- Menu lateral centralizado em `assets/js/navigation.js`.
- Aplicação estática, sem etapa de compilação; as suítes Node estão em `tests/`.
- O validador de referências locais está em `scripts/validate-repository.mjs`.
- A reorganização manteve as regras RDCJ, telas e motores; consulte `docs/architecture/PROJECT-STRUCTURE.md` para o inventário e impactos.

> Para uma demonstração local, o projeto deve ser servido por HTTP. Abrir os arquivos diretamente com `file://` pode causar problemas com scripts, módulos e leitura de arquivos.

## Executar localmente

Na raiz do projeto (`C:\dev\RDCJ-MOCKUP`), inicie um servidor HTTP simples:

```powershell
python -m http.server 8000
```

Abra no navegador:

- `http://localhost:8000/src/index.html`
- ou diretamente `http://localhost:8000/src/ui/pages/matriz.html`

Para parar o servidor, use `Ctrl + C` no terminal. Para atualizar sem cache, use `Ctrl + F5`.

Valide o repositório e execute as suítes locais com `node scripts/validate-repository.mjs` e os scripts `tests/**/*.test.js`.

Instruções detalhadas de pré-requisitos e primeira execução estão em [`docs/guides/INSTALACAO-RAPIDA.md`](docs/guides/INSTALACAO-RAPIDA.md).

## Documentação complementar

| Documento | Público-alvo | Conteúdo |
|---|---|---|
| [`docs/guides/INSTALACAO-RAPIDA.md`](docs/guides/INSTALACAO-RAPIDA.md) | Quem vai instalar/rodar o projeto | Pré-requisitos, passo a passo de instalação e primeira execução. |
| [`MANUAL-OPERADOR.md`](MANUAL-OPERADOR.md) | Operador do dia a dia | Uso de cada tela, passo a passo de backup e de restauração da sessão. |
| [`docs/guides/GUIA-DEMONSTRACAO.md`](docs/guides/GUIA-DEMONSTRACAO.md) | Apresentador/comercial | Roteiro executivo de demonstração de 15 minutos. |
| [`CHANGELOG.md`](CHANGELOG.md) | Equipe técnica | Histórico das entregas do mockup. |

## Organização no GitHub

O projeto não depende de build, então a estrutura de repositório recomendada é simples:

- `main` é a linha estável; mudanças devem ser preparadas em branches de feature e integradas por pull request.
- **`.gitignore`** sugerido: ignorar apenas artefatos de editor/SO (`.vscode/`, `Thumbs.db`, `.DS_Store`); não há `node_modules`, build ou `.env` a ignorar.
- Não há build frontend; os testes Node e a validação estática podem ser executados localmente ou em CI.
- **Releases**: usar tags leves (`vAAAA.MM.DD`) associadas às entregas descritas em `CHANGELOG.md`, já que o projeto ainda não segue versionamento semântico formal.
- **Arquivos de referência de dados** (ex.: `CRIA_S702_2026.09.17.XLS`) devem ficar na raiz apenas como massa de teste local; não é recomendado versionar planilhas reais de clientes em um repositório público.

## Estrutura do projeto

```text
RDCJ-MOCKUP/
├── README.md, CHANGELOG.md, MANUAL-OPERADOR.md, CONTRIBUTING.md
├── docs/
│   ├── architecture/               # arquitetura, estrutura, contratos e dependências
│   ├── governance/                  # políticas, contratos e matrizes
│   ├── decisions/                   # ADRs e histórico de decisões
│   ├── releases/                    # releases, readiness e checklists
│   ├── servicenow/                  # mappings, runtime readiness e migração futura
│   └── guides/                      # instalação e guias de uso/demonstração
├── assets/{css,js,images,icons}/    # recursos consumidos pela UI estática
├── src/
│   ├── index.html                   # entrada HTTP para a Matriz
│   ├── ui/{pages,components}/       # páginas e componentes HTML
│   ├── core/                        # Memory, Knowledge, Context e Documentation
│   ├── domain/                      # entidades, políticas e contratos
│   ├── services/                    # serviços de readiness
│   ├── repositories/                # repositories e adapters
│   ├── providers/                   # providers e stubs futuros
│   ├── agents/                      # framework de agents
│   ├── governance/                  # governança local
│   └── memory/                      # memória do produto legado
├── prompts/                         # fontes históricas de prompts
├── tests/                           # suítes Node
├── scripts/                         # validadores estáticos
├── memory/                          # artefatos da Memory Layer
└── governance/                      # governança operacional
```

### Fonte de verdade em runtime

O navegador executa os arquivos em `assets/js/`; as páginas ficam em `src/ui/pages/` e os estilos em `assets/css/`. Os arquivos TypeScript de `src/domain/` são paralelos e não são compilados pelo runtime estático.

Ao corrigir um comportamento visual ou funcional do mockup, normalmente o arquivo correto está em `assets/js/` ou `src/ui/pages/`.

## Arquitetura de alto nível

```mermaid
flowchart LR
    A[CSV/XLS/XLSX] --> B[Importação e mapeamento]
    B --> C[rdcj-processos]
    C --> D[Motor de classificação]
    D --> E[Matriz RDCJ]
    D --> F[Dashboard e Radar]
    E --> G[Processo 360°]
    D --> H[Motor de Atuação]
    H --> I[Caixa de Trabalho]
    H --> M[Kanban RDCJ]
    H --> J[Timeline e histórico]
    H --> K[rdcj-motor-atuacao]
    C --> L[rdcj-auditoria]
    K --> N[Salvar/Restaurar Sessão]
    L --> N
    C --> N
```

As páginas são HTML independentes. Cada página inclui os scripts necessários em ordem e expõe objetos globais, por exemplo `rdcjMatrixUI`, `rdcjBaseManager` e `rdcjMotorAtuacao`.

## Páginas

| Página | Arquivo | Responsabilidade |
|---|---|---|
| Entrada | `src/index.html` | Redireciona para a matriz. |
| Dashboard | `src/ui/pages/dashboard.html` | KPIs e distribuições da carteira. |
| Matriz | `src/ui/pages/matriz.html` | Visualização N1–N9, filtros e KPIs matriciais. |
| Caixa de Trabalho | `src/ui/pages/trabalho.html` | Filas operacionais, ações, estados e timeline. |
| Kanban RDCJ | `src/ui/pages/kanban.html` | Camada visual de arrastar-e-soltar sobre o motor de atuação (6 raias, 24 colunas). |
| Radar | `src/ui/pages/radar-carteira.html` | Leitura consolidada dos eixos/indicadores da carteira. |
| Importação | `src/ui/pages/importar-carteira.html` | Leitura de CSV/XLSX, mapeamento e carga. |
| Carteira | `src/ui/pages/carteira.html` | Lista filtrável de processos. |
| Processo 360° (atual) | `src/ui/pages/processo360.html` | Identificação, enquadramento, linha de atuação, explicabilidade, timeline, próxima ação e evidências. Acessada pela Matriz e pelo Kanban. |
| Processo 360° (legado) | `src/ui/pages/processo.html` | Versão anterior, mais simples. **Não está mais linkada** pela Matriz/Kanban; acessível apenas por URL direta. |
| Edição | `src/ui/pages/editar-processo.html` | Atualização auditável dos campos editáveis. Só era alcançada a partir do Processo 360° legado; hoje acessível apenas por URL direta. |
| Configuração | `src/ui/pages/configuracao-base.html` | Importar, substituir, limpar a carteira e gerenciar a Sessão RDCJ (backup/restauração). |
| Alertas | `src/ui/pages/alertas.html` | Placeholder da futura central de alertas. Não está no menu principal; acessível apenas por URL direta. |
| Regras | `src/ui/pages/motor-rdcj.html` | Explicação da regra matricial vigente. Não está no menu principal; acessível apenas por URL direta. |

> As oito páginas acessíveis pelo menu lateral (`assets/js/navigation.js`) são: Dashboard, Matriz, Caixa de Trabalho, Kanban, Radar, Importação, Carteira e Configuração. As demais (Processo 360°, Processo 360° legado, Edição, Alertas, Regras) são alcançadas por links contextuais ou apenas por URL direta.

## Fluxo da carteira

1. O usuário escolhe uma planilha na tela de importação.
2. O sistema identifica/permite mapear campos como CNJ, cliente, valor e data da decisão.
3. Cada linha é normalizada e classificada.
4. A base é persistida em `localStorage`.
5. Dashboard, matriz, carteira, radar e Processo 360° leem a mesma base.
6. A Caixa de Trabalho e o Kanban RDCJ sincronizam e exibem o mesmo fluxo operacional para cada processo.
7. A qualquer momento, o operador pode gerar um backup ("Salvar Sessão") ou restaurar um backup anterior pela tela de Configuração.

### Campos de importação

O mapeamento procura aliases para:

- processo: `cnj`, `nr_prc`, `processo`, `numero`;
- cliente: `nm_lit`;
- data: `data da decisao`, `data decisao`, `dt_decisao`, `decisao`;
- valor: `valoracaomoedacorrente`, `valordaacao`, `valor da acao`, `valor`;
- terceirização: `valoracaofinsterceirizacao`, `valoracao fins terceirizacao`, `terceirizacao`;
- advogado: `nm_adv`, `advogado`;
- comarca: `nm_mun`, `comarca`;
- responsável: `responsavel`.

CNJ, cliente, valor e data da decisão são os campos mínimos exigidos pela interface de importação. Linhas com inconsistências são mantidas e marcadas para inspeção.

## Classificação da Matriz RDCJ

A implementação atual usa duas dimensões:

- **Tempo da decisão:**
  - `T1`: menos de 1 ano;
  - `T2`: de 1 a 2 anos;
  - `T3`: acima de 2 anos.
- **Valor da ação:**
  - `V1`: até `R$ 64.840,00`;
  - `V2`: até `R$ 485.040,04`;
  - `V3`: acima desse limite.

O cruzamento gera o quadrante:

| Tempo \ Valor | V1 | V2 | V3 |
|---|---:|---:|---:|
| T1 | N1 | N2 | N3 |
| T2 | N4 | N5 | N6 |
| T3 | N7 | N8 | N9 |

Pesos atuais:

| Quadrantes | Peso |
|---|---|
| N1, N2, N4 | P1 |
| N3, N5, N7 | P2 |
| N6, N8 | P3 |
| N9 | P4 |

## Motor de Atuação

### Estados

- `REVISAO_JURIDICA`
- `PETICIONAMENTO`
- `AGUARDANDO_RESULTADO`
- `INVESTIGACAO_AGENCIA`
- `INVESTIGACAO_RETAGUARDA`
- `MONITORAMENTO`
- `ENCERRADO`

### Linhas de atuação

| Estado | Linha |
|---|---|
| Revisão jurídica | `ADVOGADO` |
| Peticionamento | `ADVOGADO` |
| Aguardando resultado | `ADVOGADO` |
| Investigação agência | `AGENCIA` |
| Investigação retaguarda | `CENTRAL_RETAGUARDA` |
| Monitoramento | `SISTEMA` |
| Encerrado | `SISTEMA` |

### Transições oficiais

```text
REVISAO_JURIDICA
├─ Existe oportunidade processual → PETICIONAMENTO
└─ Não existe oportunidade → INVESTIGACAO_AGENCIA

INVESTIGACAO_AGENCIA
├─ Informação relevante localizada → INVESTIGACAO_RETAGUARDA
└─ Nada localizado → MONITORAMENTO

INVESTIGACAO_RETAGUARDA
├─ Ativo localizado → PETICIONAMENTO
└─ Busca negativa → MONITORAMENTO

PETICIONAMENTO
└─ Petição protocolada → AGUARDANDO_RESULTADO

AGUARDANDO_RESULTADO
└─ Encerrar diligência → MONITORAMENTO
```

A API principal do motor é:

- `rdcjMotorAtuacao.sincronizarFluxos()` — cria o fluxo inicial para processos novos;
- `rdcjMotorAtuacao.listarFluxos()` — combina carteira, fluxo e timer;
- `rdcjMotorAtuacao.aplicarTransicao(processoId, decisao, usuario, justificativa)` — valida e executa uma transição;
- `rdcjMotorAtuacao.timelineDoProcesso(processoId)` — retorna os eventos do processo;
- `rdcjMotorAtuacao.filaJuridica()` — fila de advogado;
- `rdcjMotorAtuacao.filaAgencia()` — fila de agência;
- `rdcjMotorAtuacao.filaRetaguarda()` — fila de retaguarda.

### Timers

A próxima revisão é calculada pelo peso:

- `P4`: 90 dias;
- `P3`: 180 dias;
- `P2`: 240 dias;
- `P1`: sem revisão automática.

| `rdcj-auditoria` | `auditoria.js` | Eventos de importação, edição e transição. |
| `rdcj-motor-atuacao` | `motor-atuacao.js` | Fluxos (com `coluna`/`ordem` do Kanban), históricos e timers operacionais. |
| `rdcj-sessao-status` | `sessao-rdcj.js` | Data do último backup e da última restauração. |

A base não é compartilhada entre navegadores, computadores ou usuários. Limpar a base também limpa `localStorage`, `sessionStorage`, bancos IndexedDB e caches disponíveis no navegador. O backup/restauração de "Sessão RDCJ" (ver `MANUAL-OPERADOR.md`) é a forma recomendada de levar uma demonstração de um computador para outro.
- `matrix-engine.js`: adaptador de classificação e formatação monetária.
- `auditoria.js`: registro simples de eventos no `localStorage`.
- `processo-repository.js`: CRUD local por CNJ.
- `dashboard.js`: renderização do dashboard executivo.
- `insights-carteira.js`: agregações, distribuições e rankings.
- `radar-carteira.js`: renderização do radar operacional.
- `motor-atuacao.js`: máquina de estados, timers, filas, timeline e colunas visuais do Kanban (`coluna`/`ordem`).
- `kanban.js`: renderização das 6 raias/24 colunas e drag-and-drop (SortableJS) sobre `rdcjMotorAtuacao`.
- `processo360.js`: consolida matriz + motor + auditoria na tela de Processo 360° atual; somente leitura.
- `sessao-rdcj.js`: backup (`Salvar Sessão`) e restauração (`Restaurar Sessão`) local em `.json`.
- `decision-engine.js`: motor de score legado/experimental; não é a fonte da classificação atual da matriz. **Nenhuma página carrega este arquivo hoje** (órfão, candidato a remoção em limpeza futura).
- `app.js`: inicialização de comportamentos globais simples.

> `src/ui/components/base-info-card.js` é um arquivo duplicado não referenciado por nenhuma página; a versão em uso é `assets/js/base-info-card.js`.

## Convenções para manutenção

1. Preserve a separação entre classificação matricial e operação. A Caixa de Trabalho não deve alterar as regras da matriz.
2. Ao alterar uma regra, atualize a implementação JavaScript e o contrato TypeScript correspondente.
3. Use `rdcjBaseManager` para operações da carteira; não grave diretamente em `localStorage` fora de uma necessidade explícita.
4. Use `rdcjAuditoria.registrar()` para ações que alterem dados ou estado.
5. Novas transições devem ser adicionadas em `TRANSICOES`, com estado, linha, responsável, histórico e UI correspondentes.
6. Mantenha `navigation.js` como fonte única do menu lateral; não replique `<aside>` manualmente em novas páginas.
7. Como não há build, verifique sempre os caminhos relativos dos scripts a partir de `src/ui/pages/`.
8. Após editar, valide com diagnóstico do VS Code e carregue a página pelo servidor HTTP.

## Limitações conhecidas

- Não há autenticação, autorização ou identidade real de usuário.
- `localStorage` não é adequado para produção, concorrência ou dados sensíveis.
- Não há API, banco de dados ou sincronização entre usuários.
- A classificação atual é tempo × valor; risco de perda, potencial de recuperação e IRP ainda não estão implementados como critérios reais.
- O motor operacional inicializa fluxos localmente, mas ainda não possui integração com sistemas processuais, patrimoniais ou de protocolo.
- A página de alertas ainda é um placeholder.
- Não há testes automatizados, lint ou CI configurados.
- Os arquivos TypeScript de `src/domain/` ainda não são compilados nem consumidos automaticamente pelo front-end.

## Próximas evoluções registradas

O backlog oficial está em `src/memory/backlog.md`. Entre os próximos temas estão:

- validação mais robusta de CSV/XLSX e erros por linha;
- versionamento das regras de enquadramento;
- melhorias de matriz, busca, seleção e exportação;
- Processo 360° com mais evidências e movimentações;
- governança da classificação;
- risco de perda, potencial de recuperação e IRP;
- persistência segura, identidade e integrações externas.

As decisões de produto estão em `src/memory/decisions-log.md`, o contexto do produto em `src/memory/product-memory.md` e os feedbacks em `src/memory/feedback-log.md`.
