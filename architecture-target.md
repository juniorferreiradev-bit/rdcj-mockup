# Arquitetura-Alvo — RDCJ 2.0

> Arquitetura de referência para transformar o mockup existente em plataforma jurídica corporativa orientada por Memória Persistente, Documentação Viva, Agentes, Governança e compatibilidade ServiceNow. Este documento não implementa código.

## 1. Princípios

1. **Preservar o domínio antes da tecnologia**: Matriz, Processo 360°, Motor de Atuação, Kanban e auditoria são capacidades de negócio.
2. **Uma fonte de verdade por conceito**: regra, processo, estado, evidência, decisão, memória e identidade não podem ter cópias concorrentes.
3. **Persistência no servidor**: `localStorage` deixa de ser banco de dados; permanece, no máximo, como cache temporário não autoritativo.
4. **Auditabilidade por padrão**: toda alteração relevante registra ator, data, motivo, origem, versão e resultado.
5. **Classificação versionada**: uma classificação deve ser reproduzível com a regra e os dados de entrada usados.
6. **Separação entre estado operacional e posição visual**: Kanban pode organizar a fila, mas transições formais passam pelo motor governado.
7. **Compatibilidade ServiceNow desde o contrato**: IDs, estados, grupos, auditoria, anexos e APIs devem ser mapeáveis sem acoplamento indevido à UI.
8. **Memória como produto**: decisões, feedbacks, evidências, aprendizados e contexto operacional são ativos persistentes, pesquisáveis e governados.
9. **Agentes com limites explícitos**: agentes recomendam, explicam e sinalizam; ações mutáveis exigem política, autorização e, quando necessário, aprovação humana.
10. **Identidade visual preservada**: a paleta, a hierarquia da Matriz e a explicabilidade são requisitos funcionais de experiência, não decoração.

## 2. Visão lógica

```text
Canais
  ├── RDCJ Web / Workspace compatível ServiceNow
  ├── APIs corporativas
  └── Jobs de ingestão e integração
        │
        ▼
BFF/API RDCJ
  ├── Identidade, sessão e autorização
  ├── Carteira e importações
  ├── Classificação e versões de regra
  ├── Motor de atuação e comandos
  ├── Processo 360° e evidências
  ├── Memória/documentação/agentes
  └── Auditoria e governança
        │
        ├── Banco transacional corporativo
        ├── Armazenamento de arquivos/evidências
        ├── Índice de busca
        ├── Event store/outbox
        └── Cache/materializações analíticas
        │
        ▼
Integrações
  ├── ServiceNow Table/Import/Attachment/Activity APIs
  ├── Processual
  ├── Patrimonial
  ├── Identidade corporativa
  └── Notificação/alertas
```

## 3. Contextos de domínio

### 3.1 Carteira e ingestão

Responsável por importar arquivos, validar schema, preservar arquivo original, mapear colunas, deduplicar por chave homologada e produzir uma versão de carteira. Cada carga deve possuir:

- `import_id`;
- origem e arquivo original;
- hash do arquivo;
- usuário/serviço executor;
- data e timezone;
- mapeamento aplicado;
- erros e avisos por linha;
- status: recebida, validada, processada, rejeitada, substituída ou arquivada;
- versão da carteira resultante.

### 3.2 Processo judicial

Entidade persistente com identidade corporativa estável, CNJ normalizado, campos de origem, dados financeiros, responsáveis, comarca, vínculos externos e histórico de alterações. O registro não deve carregar indiscriminadamente campos derivados sem indicar origem e versão.

### 3.3 Classificação RDCJ

Serviço determinístico e versionado:

```text
Dados do processo + versão da regra + data de referência
  → faixas T/V ou eixos futuros
  → quadrante
  → peso/prioridade
  → explicação e evidências de entrada
```

A classificação atual tempo × valor deve ser preservada como versão inicial. Risco de Perda, Potencial de Recuperação e IRP entram como versões de domínio homologadas, não como alteração silenciosa dos limites atuais.

Cada resultado deve guardar, no mínimo: `rule_version`, data de cálculo, entradas consideradas, resultado, motivos, confiança/qualidade e usuário/serviço que solicitou o cálculo.

### 3.4 Motor de Atuação

Serviço de domínio responsável por comandos, não por renderização:

- estado atual;
- transições permitidas;
- decisão tomada;
- justificativa obrigatória quando aplicável;
- linha de atuação;
- grupo/responsável;
- prazos e timers;
- resultado;
- histórico imutável;
- idempotência e controle de concorrência.

O motor deve rejeitar transições inválidas server-side. O Kanban apenas invoca comandos autorizados.

### 3.5 Processo 360° e evidências

Agrega dados do processo, classificação, atuação, auditoria, documentos, integrações e memória. Evidências devem ser objetos persistentes com metadados, hash, origem, classificação de sensibilidade, retenção e controle de acesso.

### 3.6 Analytics e projeções

Dashboard, Matriz, Radar e rankings devem consumir projeções/consultas próprias, sem recalcular toda a carteira no navegador a cada renderização. As projeções precisam indicar timestamp, versão de dados e filtros aplicados.

## 4. Memória persistente

A memória persistente do RDCJ 2.0 deve possuir tipos explícitos:

| Tipo | Exemplo | Governança |
|---|---|---|
| Memória de produto | missão, princípios, decisões de UX | Product Owner/aprovação |
| Memória de domínio | regra de classificação, transição, glossário | Jurídico/operação |
| Memória de processo | fatos, decisões, justificativas, aprendizados | grupo autorizado |
| Memória de integração | mapeamentos ServiceNow e sistemas externos | Arquitetura/integração |
| Memória de execução | jobs, falhas, reprocessamentos, incidentes | Operação/SRE |
| Memória de agente | prompt/política, versão, entradas, saída e validação | Governança de IA |

Requisitos mínimos: versionamento, autor, fonte, vigência, status, relação com entidades, trilha de aprovação e pesquisa por metadados. Memória não deve ser um campo livre sem origem ou um vetor sem explicabilidade.

## 5. Documentação viva

A documentação deve ser tratada como artefato versionado e relacionado ao sistema:

- ADRs para decisões arquiteturais;
- catálogo de regras de negócio;
- dicionário de dados;
- contratos de API versionados;
- matriz de rastreabilidade requisito → tela → serviço → teste → evidência;
- runbooks operacionais;
- catálogo de agentes e políticas;
- registro de homologações;
- changelog ligado a releases;
- mapa de integrações e campos.

O conteúdo atual de `src/memory/` e `src/agents/` deve ser migrado como histórico inicial, não sobrescrito. Cada decisão futura deve possuir status: proposta, aprovada, rejeitada, substituída ou obsoleta.

## 6. Agentes

### Agentes previstos

- **Agente de ingestão**: valida arquivos, sugere mapeamento e aponta erros; não publica carga sem autorização.
- **Agente de classificação**: executa ou explica uma versão de regra; não altera regra.
- **Agente de Processo 360°**: resume fatos e evidências com citações de origem.
- **Agente operacional**: identifica prazos, filas e próximos passos; não executa transição sem política/autorização.
- **Agente de governança**: detecta divergências, dados incompletos, alterações sem evidência e violações de SLA.
- **Agente de documentação**: mantém índices, relacionamentos e drafts; publicação exige revisão quando o conteúdo for normativo.
- **Agente de integração**: monitora sincronização com ServiceNow e prepara reconciliação.

### Contrato mínimo de execução

Cada execução registra:

- `agent_id` e versão;
- política/prompt vigente;
- usuário solicitante;
- contexto e fontes consultadas;
- ferramentas chamadas;
- saída estruturada;
- nível de confiança;
- decisões humanas posteriores;
- efeitos produzidos;
- correlação e auditoria.

Agentes não devem acessar dados fora do escopo do usuário, não devem inventar evidências e não devem transformar recomendação em mutação sem comando autorizado.

## 7. Segurança e governança

- SSO corporativo e MFA conforme identidade institucional.
- RBAC por função e ABAC por carteira, unidade, grupo, sensibilidade e jurisdição.
- Separação de funções: importador, classificador, operador, aprovador, administrador e auditor.
- ACLs server-side para processo, evidência, memória, comandos e integrações.
- Criptografia em trânsito e repouso.
- Segredos fora do código e rotação controlada.
- Retenção, descarte, legal hold e classificação de dados pessoais/sensíveis.
- Auditoria append-only ou mecanismo equivalente com proteção contra alteração.
- Aprovação explícita para publicação de regra e mudanças de workflow.
- Observabilidade: logs correlacionados, métricas, tracing, alertas e runbooks.

## 8. Compatibilidade ServiceNow

A compatibilidade deve ser contratual, com um adaptador anti-corrupção entre o domínio RDCJ e ServiceNow. O núcleo RDCJ não deve depender de nomes internos de tabela ou campos de uma instância específica.

### Mapeamentos a homologar

| RDCJ | ServiceNow |
|---|---|
| Processo | tabela de processo/carteira aprovada |
| Estado operacional | campo de estado/workflow ou tabela de controle |
| Linha/grupo | assignment group/estrutura equivalente |
| Responsável | user/reference |
| Histórico | audit/activity/journal ou tabela de eventos |
| Evidência | attachment/document management |
| Memória e decisões | registros relacionados/documentação governada |
| Importação | Import Set/Transform Map ou API controlada |
| Identidade | SSO/roles/ACLs da instância |

O adaptador deve suportar correlação por ID externo, idempotência, retries, dead-letter, reconciliação e versionamento de contrato. REST APIs devem ser documentadas com OpenAPI e usar autenticação corporativa, nunca token exposto no browser.

## 9. Frontend-alvo

O frontend deve evoluir para cliente de serviços, preservando:

- Matriz como experiência primária;
- Processo 360° explicável;
- separação Estado × Coluna visual;
- identidade visual RDCJ;
- filtros e navegação contextual;
- acessibilidade e responsividade;
- estados de loading, vazio, erro, stale e conflito;
- deep links estáveis por ID corporativo.

A implementação pode ser hospedada em Workspace/UI Builder ou aplicação web corporativa, desde que os contratos do domínio permaneçam independentes. Dependências externas via CDN devem ser eliminadas ou empacotadas sob controle corporativo.

## 10. Dados e eventos alvo

Entidades mínimas:

- Processo;
- versão de carteira/importação;
- resultado de classificação;
- versão de regra;
- fluxo operacional;
- transição/evento de estado;
- timer/SLA;
- evidência/anexo;
- usuário/grupo;
- auditoria;
- memória/documento;
- execução de agente;
- sincronização externa.

Eventos de domínio sugeridos: `ProcessoImportado`, `ProcessoClassificado`, `ClassificacaoReprocessada`, `TransicaoSolicitada`, `EstadoAlterado`, `TimerCriado`, `EvidenciaAnexada`, `MemoriaAprovada`, `SincronizacaoAtualizada` e `AgenteExecutado`.

## 11. Qualidade e entrega

- Testes unitários para limites, datas, valores e mapeamentos.
- Testes de contrato para APIs e ServiceNow.
- Testes de integração para persistência, auditoria e filas.
- Testes E2E para Matriz → Carteira → Processo 360° e Caixa → Kanban.
- Testes de autorização e isolamento de dados.
- Testes de migração e reversibilidade.
- CI com lint, type-check, testes, análise de segurança e publicação de documentação.
- Ambientes separados: desenvolvimento, homologação e produção.

## 12. Critérios de sucesso arquitetural

A arquitetura-alvo só deve ser considerada atingida quando:

1. nenhum dado operacional depender de `localStorage` como fonte autoritativa;
2. uma classificação puder ser reproduzida por versão de regra e entradas;
3. toda transição possuir ator, motivo, autorização e evento auditável;
4. o usuário puder consultar Processo 360° com evidências de origem;
5. agentes tiverem contrato, trilha e limites de mutação;
6. documentação, decisões e regras tiverem ciclo de vida;
7. integrações ServiceNow puderem ser reprocessadas e reconciliadas;
8. as telas atuais forem cobertas por testes e preservarem a identidade homologada.
