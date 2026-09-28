# Gap Analysis — RDCJ Mockup v0.1 → RDCJ 2.0

## 1. Método

A análise compara o estado comprovado no repositório com a arquitetura-alvo definida em `architecture-target.md`. Nenhum gap abaixo implica alteração já executada.

Prioridade:

- **P0 — bloqueador corporativo**: impede operação segura/compartilhada ou migração confiável.
- **P1 — crítico**: precisa existir antes de produção/homologação ampla.
- **P2 — importante**: necessário para escala, governança ou qualidade.
- **P3 — evolução**: pode ocorrer após o núcleo corporativo.

## 2. Resumo executivo dos gaps

| Área | Estado atual | Estado alvo | Gap | Prioridade |
|---|---|---|---|---|
| Persistência | `localStorage` por navegador | banco/API corporativa | inexistência de fonte autoritativa | P0 |
| Identidade | usuário literal `usuário local` | SSO, RBAC/ABAC | sem autenticação/autorização | P0 |
| Auditoria | array editável local | trilha append-only governada | não há prova corporativa | P0 |
| Regras | hardcoded e duplicadas | serviço versionado/homologado | divergência e sem lifecycle | P0 |
| Workflow | estado local e coluna visual | comandos transacionais | sem concorrência/idempotência | P0 |
| Integração SN | documentação, sem código | adapter/API/reconciliação | inexistência de integração | P0 |
| Memória | Markdown estático | memória persistente relacionada | sem store, busca ou aprovação | P1 |
| Agentes | arquivos de visão | agentes executáveis governados | ausência de runtime e políticas | P1 |
| Documentação | README/Markdown | docs versionadas e rastreáveis | sem catálogo/traceability automatizados | P1 |
| Dados de entrada | arquivo local | ingestão persistente | sem arquivo original, jobs e histórico | P1 |
| Frontend | scripts globais/HTML | cliente de APIs | acoplamento à infraestrutura local | P1 |
| Qualidade | sem testes/CI | quality gates | risco de regressão | P1 |
| Evidências | placeholder | anexos governados | sem armazenamento/controle de acesso | P1 |
| Analytics | recalculado no browser | projeções/materializações | escala e consistência insuficientes | P2 |
| Dependências | CDN XLSX/Sortable | artefatos controlados | disponibilidade e segurança | P2 |
| Risco/Recuperação/IRP | planejados | domínio homologado | requisito de negócio incompleto | P1 |

## 3. Gaps detalhados

### G-01 — Persistência corporativa e concorrência — P0

**Evidência atual:** `src/js/base-manager.js`, `processo-repository.js`, `motor-atuacao.js`, `auditoria.js` e `sessao-rdcj.js` usam `localStorage`.

**Impacto:** dados não compartilhados, perda por limpeza de cache, ausência de transação, lock, histórico confiável, backup central e recuperação operacional.

**Necessário:** banco corporativo, API, transações, versionamento de registro, idempotência, backup, retenção e migração do JSON.

**Aceite:** dois usuários conseguem operar o mesmo processo sem sobrescrever silenciosamente alterações; restauração e auditoria são verificáveis.

### G-02 — Identidade, autorização e segregação — P0

**Evidência atual:** usuário fixo `usuário local`; sem login, role ou ACL.

**Impacto:** qualquer pessoa com acesso ao navegador vê e altera a carteira.

**Necessário:** SSO/MFA, RBAC/ABAC, escopo por unidade/grupo/carteira e autorização server-side.

**Aceite:** cada ação identifica o usuário; acessos indevidos são negados e auditados.

### G-03 — Auditoria confiável — P0

**Evidência atual:** `rdcj-auditoria` é JSON local e editável; `base-manager.js` limpa armazenamento antes de algumas operações.

**Impacto:** não atende não repúdio, investigação, compliance ou retenção.

**Necessário:** eventos imutáveis, correlação, origem, antes/depois, motivo, política de retenção e exportação controlada.

### G-04 — Fonte única de regras — P0

**Evidência atual:** classificação em `src/js/matriz-criticidade.js` e contrato paralelo em `src/domain/matrizCriticidade.ts`; limites e comportamento de datas não são governados por versão.

**Impacto:** divergência entre documentação, runtime futuro e integração ServiceNow; resultados não reproduzíveis.

**Necessário:** catálogo de regras, versionamento, vigência, aprovação jurídica, casos de borda e serviço determinístico.

### G-05 — Semântica de classificação incompleta — P1

**Evidência atual:** runtime usa tempo × valor; backlog prevê Risco de Perda, Potencial de Recuperação e IRP. Há divergências de limites/teto e tratamento de data inválida entre artefatos documentados.

**Impacto:** o produto oficial ainda não está definido para todos os eixos estratégicos.

**Necessário:** decisão de produto/jurídica, dicionário de sinais, regra formal, explainability e estratégia de compatibilidade com a versão atual.

### G-06 — Workflow sem transação — P0

**Evidência atual:** `motor-atuacao.js` altera JSON local; `aplicarTransicao` não possui idempotência, controle de concorrência ou aprovação.

**Impacto:** transições duplicadas/perdidas e divergência entre fluxo, timer, histórico e Kanban.

**Necessário:** command handler server-side, máquina de estados persistente, optimistic locking, idempotency key, autorização e eventos.

### G-07 — Kanban separado do estado — P1

**Evidência atual:** `kanban.js` e `motor-atuacao.js` permitem mover `coluna`/`ordem` sem alterar `statusAtual`.

**Impacto:** a posição visual pode não representar o estado formal; risco de entendimento operacional.

**Necessário:** contrato explícito de coluna visual, invariantes, comandos permitidos e feedback de conflito.

**Aceite:** toda coluna exibida é compatível com o estado ou o sistema explica a exceção; nenhuma movimentação livre ignora política.

### G-08 — Importação sem linhagem corporativa — P1

**Evidência atual:** parser no browser, arquivo não armazenado no servidor, metadata limitada e inconsistências em objeto local.

**Impacto:** difícil reproduzir carga, corrigir linha, auditar origem ou reprocessar.

**Necessário:** ingestão assíncrona, arquivo original/hash, schema version, mapeamento persistido, relatório de erros e aprovação/publicação.

### G-09 — Memória persistente ausente — P1

**Evidência atual:** `src/memory/*.md` é documentação versionada; não existe memória operacional persistente relacionada a processos e decisões.

**Impacto:** conhecimento fica fora do fluxo, sem busca, acesso, retenção ou vínculo com evidências.

**Necessário:** entidades de memória, relações, fontes, vigência, aprovação, busca e auditoria.

### G-10 — Agentes não executáveis/governados — P1

**Evidência atual:** `src/agents/*.md` descreve papéis, não agentes com runtime, ferramentas, política ou registro de execução.

**Impacto:** não há automação segura nem rastreabilidade de recomendações.

**Necessário:** catálogo, contratos de entrada/saída, guardrails, avaliação, human-in-the-loop, logs e isolamento por escopo.

### G-11 — Documentação sem rastreabilidade operacional — P1

**Evidência atual:** README, changelog, backlog, decisões e feedback são Markdown manual.

**Impacto:** não há garantia de que regra documentada, tela, API, teste e versão estejam sincronizados.

**Necessário:** ADR, catálogo de requisitos, dicionário, OpenAPI, matriz de rastreabilidade, revisão e CI documental.

### G-12 — Frontend acoplado a globais e ordem de scripts — P1

**Evidência atual:** páginas carregam scripts manualmente; módulos usam `window.rdcj...`; parte da navegação está duplicada.

**Impacto:** difícil testar, empacotar, reutilizar em Workspace/UI Builder e evoluir sem regressão.

**Necessário:** frontend modular, contratos de serviço, estado de tela explícito, componentes reutilizáveis e tratamento de erro/conflito.

### G-13 — TypeScript não é fonte executável — P1

**Evidência atual:** `src/domain/*.ts` não é compilado; alguns arquivos são stubs e o JS continua autoritativo.

**Impacto:** falsa sensação de type safety e divergência de contrato.

**Necessário:** escolher fonte única, compilar, validar tipos e remover/arquivar duplicidades somente após cobertura.

### G-14 — Ausência de qualidade automatizada — P1

**Evidência atual:** README registra ausência de testes, lint, build e CI.

**Impacto:** regras críticas sem proteção contra regressão.

**Necessário:** testes unitários/contrato/E2E, lint, type-check, segurança, pipeline e ambientes.

### G-15 — Evidências e documentos não implementados — P1

**Evidência atual:** Processo 360° apenas prepara seção de evidências.

**Impacto:** explicabilidade não tem anexos verificáveis nem material probatório.

**Necessário:** storage de anexos, metadados, hash, OCR opcional, classificação, retenção e ACL.

### G-16 — ServiceNow apenas conceitual — P0

**Evidência atual:** `Servicenow.md` e documentação de prompts; nenhum cliente, contrato, endpoint ou adapter no repositório.

**Impacto:** não há integração, sincronização ou estratégia de reconciliação real.

**Necessário:** anti-corruption layer, OAuth/SSO, OpenAPI, mapeamentos homologados, filas, retries, DLQ e reconciliação.

### G-17 — Analytics com escala limitada — P2

**Evidência atual:** agregações percorrem toda a carteira no browser (`insights-carteira.js`).

**Impacto:** latência e memória crescem com volume; resultados dependem do estado local.

**Necessário:** consultas server-side, materializações, cache invalidado por evento e paginação.

### G-18 — Dependências CDN — P2

**Evidência atual:** XLSX e SortableJS são carregados via CDN.

**Impacto:** indisponibilidade, supply-chain e incompatibilidade com ambiente corporativo/offline.

**Necessário:** dependências empacotadas, checksum, atualização controlada e fallback.

## 4. Matriz de rastreabilidade da migração

| Capacidade atual | Fonte | Destino alvo | Validação obrigatória |
|---|---|---|---|
| Importação | `matrix-ui.js` | serviço de ingestão | massa com erros, duplicatas e reprocessamento |
| Classificação | `matriz-criticidade.js` | Rule Service | valores/datas de borda e explicação |
| Matriz | `matrix-ui.js`, HTML | API/projeção + frontend | orientação, filtros e contagens |
| Processo 360° | `processo360.js` | agregador de processo | timeline, evidências e ACL |
| Estado | `motor-atuacao.js` | workflow service | todas as transições e concorrência |
| Kanban | `kanban.js` | view/comandos de board | compatibilidade estado/coluna |
| Auditoria | `auditoria.js` | event/audit store | imutabilidade e consulta |
| Sessão | `sessao-rdcj.js` | backup/restore corporativo | schema migration e recuperação |
| Memory/agents | `src/memory`, `src/agents` | governança persistente | aprovação, versões e trilha |
| ServiceNow | `Servicenow.md` | adapter real | contrato, sync e reconciliação |

## 5. Riscos de não tratar os gaps

- Dados jurídicos podem ser perdidos ou expostos.
- Resultados de classificação podem mudar sem explicação.
- Uma decisão operacional pode não ser reproduzível.
- ServiceNow e RDCJ podem divergir sem detecção.
- Agentes podem produzir recomendações sem fonte ou autorização.
- A identidade visual pode ser preservada enquanto a semântica operacional se perde.

## 6. Estado de prontidão

**Pronto para:** descoberta, homologação de domínio, desenho de contratos, definição de segurança e preparação de migração.

**Não pronto para:** produção multiusuário, dados jurídicos reais, integração oficial ServiceNow ou execução autônoma de agentes.
