# Roadmap de Migração — RDCJ Mockup v0.1 → RDCJ 2.0

> Roadmap arquitetural sem implementação. O repositório atual permanece a base de referência funcional, visual e documental.

## 1. Estratégia

A migração deve ser incremental e orientada por contratos, mantendo o mockup como referência de regressão durante a transição. Não se deve substituir a UI antes de congelar regras, dados, estados e navegação homologados.

Estratégia recomendada: **strangler/parallel run**.

```text
Mockup v0.1 preservado
  ├── captura de contratos e casos de teste
  ├── backend persistente paralelo
  ├── migração controlada de dados de demonstração
  ├── frontend cliente consumindo APIs
  ├── integração ServiceNow em sandbox
  └── desligamento gradual do localStorage como fonte autoritativa
```

## 2. Fases e gates

### Fase 0 — Baseline e congelamento arquitetural

**Objetivo:** preservar o comportamento atual como referência.

**Atividades:**

- manter `RDCJ-MOCKUP` intacto como baseline v0.1;
- versionar este diagnóstico e os quatro documentos arquiteturais;
- catalogar páginas, scripts, CSS, regras, estados e chaves de `localStorage`;
- capturar casos de demonstração e massas anonimizadas;
- decidir quais telas são centrais, legadas, placeholder ou fora do escopo 2.0;
- registrar divergências JS/TS/documentação.

**Saídas:** baseline assinado, inventário, lista de decisões pendentes e matriz de rastreabilidade.

**Gate:** Product Owner, Jurídico e Arquitetura aprovam o comportamento que deve ser preservado.

### Fase 1 — Homologação do domínio e das regras

**Objetivo:** transformar comportamento implícito em contrato de negócio.

**Atividades:**

- homologar tempo × valor atual, limites exatos, datas de borda e inválidos;
- decidir se o v0.1 é versão de regra preservada;
- formalizar Risco de Perda, Potencial de Recuperação e IRP;
- catalogar os 7 estados, 8 transições, linhas, responsáveis e timers;
- definir semântica de coluna visual versus estado formal;
- criar casos de teste executáveis e exemplos de explicabilidade;
- definir glossário e códigos estáveis para ServiceNow.

**Saídas:** catálogo de regras versionado, máquina de estados homologada, dicionário de domínio e conjunto de testes de aceitação.

**Gate:** homologação jurídica/operacional de classificação e transições.

### Fase 2 — Contratos de dados, identidade e segurança

**Objetivo:** definir a fundação corporativa antes de mover dados reais.

**Atividades:**

- desenhar entidades Processo, Importação, Classificação, Fluxo, Evento, Evidência, Memória e Agente;
- definir IDs internos e externos, chaves, status, timestamps e versionamento;
- definir SSO, MFA, RBAC/ABAC, grupos e segregação de funções;
- classificar dados pessoais, financeiros e jurídicos;
- definir retenção, legal hold, criptografia e auditoria;
- especificar OpenAPI, eventos, idempotência e controle de concorrência;
- definir mapeamento inicial para ServiceNow.

**Saídas:** modelo lógico, matriz de autorização, contratos API/eventos, política de dados e threat model.

**Gate:** Segurança, Privacidade, Arquitetura e Compliance aprovam os contratos.

### Fase 3 — Persistência, ingestão e auditoria

**Objetivo:** substituir a autoridade do navegador por serviços persistentes.

**Atividades:**

- implementar banco e repositórios server-side;
- criar serviço de upload/importação com arquivo original, hash e relatório por linha;
- migrar o formato de backup JSON para schema versionado;
- criar auditoria append-only com correlação e antes/depois;
- criar jobs de classificação/reprocessamento;
- implementar observabilidade, métricas e alertas operacionais;
- importar dados anonimizados e comparar com o mockup.

**Saídas:** carteira persistente, pipeline de ingestão, audit store e migração reversível.

**Gate:** teste de perda/recuperação, concorrência, autorização e reconciliação de totais.

### Fase 4 — Motor de classificação e atuação

**Objetivo:** retirar regras críticas do browser mantendo resultado compatível.

**Atividades:**

- implementar serviço determinístico de classificação;
- persistir `rule_version`, entradas, resultado e explicação;
- implementar workflow transacional e comandos autorizados;
- adicionar idempotência, optimistic locking e eventos de domínio;
- recalcular timers por regra/política, sem alterar histórico passado;
- executar comparação paralela contra `matriz-criticidade.js` e `motor-atuacao.js`.

**Saídas:** Rule Service, Workflow Service, eventos e relatório de compatibilidade.

**Gate:** todos os casos de borda e as oito transições passam; divergências são aprovadas ou corrigidas por decisão formal.

### Fase 5 — Frontend corporativo e Processo 360°

**Objetivo:** transformar as telas em cliente de serviços, preservando a experiência homologada.

**Atividades:**

- modularizar frontend e remover dependência de globais;
- substituir leitura direta de `localStorage` por API/cache não autoritativo;
- manter Matriz como entrada conceitual;
- reconstruir Dashboard, Carteira, Processo 360°, Caixa de Trabalho e Kanban sobre contratos;
- implementar estados de erro, loading, vazio, stale e conflito;
- incluir evidências com ACL e origem;
- eliminar CDNs não aprovadas e empacotar dependências;
- decidir destino das telas legadas, Radar, Alertas e Regras.

**Saídas:** cliente web/Workspace, biblioteca visual preservada, testes E2E e acessibilidade.

**Gate:** regressão visual/funcional, jornada Matriz → Carteira → Processo 360° e operação de transição.

### Fase 6 — Memória persistente, documentação viva e agentes

**Objetivo:** tornar conhecimento, decisões e automação ativos governados do produto.

**Atividades:**

- importar `src/memory` e `src/agents` como histórico inicial;
- criar catálogo de memórias, fontes, relações, aprovação e vigência;
- vincular regras, decisões, processos, evidências e releases;
- criar agentes de ingestão, classificação, Processo 360°, operação, governança e documentação;
- definir ferramentas permitidas, escopos, políticas, avaliação e human-in-the-loop;
- registrar toda execução de agente e sua saída estruturada;
- criar pesquisa e telas de governança.

**Saídas:** Memory Service, Agent Registry, políticas e trilha de execução.

**Gate:** revisão de Segurança, Jurídico e Governança de IA; nenhum agente mutável sem autorização explícita.

### Fase 7 — Integração ServiceNow e operação corporativa

**Objetivo:** conectar o RDCJ a ServiceNow sem transferir regras críticas de forma opaca.

**Atividades:**

- implementar adapter anti-corruption layer;
- homologar tabelas, campos, referências, roles, ACLs e attachments;
- configurar OAuth/SSO, filas, retries, DLQ e reconciliação;
- sincronizar processos, estados, grupos, históricos e evidências conforme contrato;
- testar falhas parciais, duplicidade, indisponibilidade e reprocessamento;
- criar runbooks de suporte e ownership por integração.

**Saídas:** integração sandbox, contrato versionado, dashboards de sync e runbooks.

**Gate:** homologação ponta a ponta e reconciliação sem divergências não explicadas.

### Fase 8 — Cutover e desativação controlada

**Objetivo:** operar RDCJ 2.0 com segurança e retirar a autoridade do mockup.

**Atividades:**

- executar piloto com carteira anonimizadas ou controlada;
- operar em paralelo e comparar classificação, fluxo, totais e auditoria;
- realizar treinamento e comunicação;
- congelar importação no mockup durante janela de cutover;
- migrar dados finais com checksum e relatório;
- habilitar monitoramento reforçado e plano de rollback;
- declarar `localStorage` somente legado/read-only ou removê-lo após retenção aprovada.

**Saídas:** termo de go-live, relatório de reconciliação, plano de suporte e baseline operacional.

**Gate:** aceite de negócio, segurança, operação, arquitetura e ServiceNow.

## 3. Ordem de dependências

```text
Baseline
  → Regras e domínio
      → Dados/API/Identidade
          → Persistência e auditoria
              → Classificação e workflow
                  → Frontend corporativo
                      → Memória e agentes
                          → ServiceNow
                              → Cutover
```

Memória e agentes podem ter um trilho inicial de documentação antes da Fase 6, mas agentes com acesso a dados reais dependem de identidade, autorização, auditoria e contratos persistentes.

## 4. Migração dos dados do mockup

### Fontes

- `rdcj-processos` → Processos e carga/importação.
- `rdcj-base-metadata` → versão e origem da carga.
- `rdcj-motor-atuacao` → fluxos, históricos e timers.
- `rdcj-auditoria` → eventos locais, tratados como histórico não confiável até validação.
- `rdcj-sessao-status` → apenas metadado operacional de sessão.
- Backup `RDCJ-Backup-*.json` → pacote de migração de demonstração.

### Regras

1. Preservar o JSON original como artefato de evidência.
2. Validar schema e gerar relatório de rejeições.
3. Não assumir que o usuário local é identidade corporativa.
4. Não converter eventos locais em auditoria de compliance sem marcar sua proveniência.
5. Recalcular classificações somente com uma versão explicitamente identificada.
6. Manter o resultado anterior para comparação quando houver divergência.
7. Não migrar arquivos reais para ambientes não aprovados.

## 5. Critérios de aceite por domínio

### Dados

- importação reproduzível;
- arquivo original e hash preservados;
- deduplicação e erro por linha auditáveis;
- backup/restore testados.

### Classificação

- limites e datas de borda testados;
- resultado reproduzível por versão;
- explicação mostra entradas e regra;
- divergência v0.1/v2.0 aprovada.

### Operação

- todas as transições válidas e inválidas testadas;
- timer, responsável, linha, estado e histórico consistentes;
- Kanban não mascara estado formal;
- concorrência e idempotência testadas.

### Segurança

- identidade real em todas as mutações;
- least privilege e escopo de dados;
- anexos/memórias protegidos;
- auditoria consultável e resistente a alteração.

### ServiceNow

- contratos e mapeamentos homologados;
- sincronização idempotente;
- retries/DLQ/reconciliação funcionando;
- indisponibilidade externa não causa perda local.

### Agentes

- cada resposta tem fontes;
- escopo e política são registrados;
- mutações exigem autorização;
- resultados podem ser revisados e contestados.

## 6. Riscos de execução do roadmap

| Risco | Sinal | Resposta |
|---|---|---|
| Migrar UI antes do domínio | telas novas com regras indefinidas | bloquear Fase 5 até Gate da Fase 1 |
| Tratar auditoria local como compliance | eventos sem identidade | marcar como histórico e reconstituir quando possível |
| Sincronização bidirecional prematura | conflitos de estado | começar read/pull controlado e evoluir por contrato |
| Agente com poder excessivo | ação automática sem aprovação | policy engine, escopo mínimo e human-in-the-loop |
| Perda de identidade visual | redesign durante migração | testes visuais contra baseline v0.1 |
| Divergência de regras | resultados diferentes sem ADR | regra versionada e comparação paralela |
| Dependência de fornecedor | domínio acoplado a tabela SN | adapter anti-corruption e IDs externos |

## 7. Decisões que precisam ser tomadas antes da implementação

1. Qual é a versão oficial da classificação inicial: tempo × valor do mockup ou novo modelo Risco × Recuperação?
2. O Kanban permitirá apenas organização visual ou também comandos de transição autorizados?
3. Qual sistema será fonte de verdade para processo, estado e evidência após integração ServiceNow?
4. Quais dados e documentos podem ser armazenados no RDCJ e por quanto tempo?
5. Quais perfis podem importar, classificar, operar, aprovar regra e consultar memória?
6. Quais agentes serão somente leitura e quais poderão preparar/solicitar mutações?
7. Quais telas do mockup serão mantidas, substituídas, arquivadas ou expostas somente por URL?
8. Qual será o contrato de identidade visual e acessibilidade para Workspace/UI Builder?

## 8. Resultado esperado

Ao final do roadmap, o RDCJ 2.0 deverá manter a Matriz como centro da experiência, preservar a explicabilidade e o fluxo operacional do mockup, mas operar com dados persistentes, identidade corporativa, memória relacionada, agentes governados, documentação rastreável, auditoria confiável e integração ServiceNow reconciliável.
