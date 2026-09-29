# Arquitetura Atual — RDCJ Mockup v0.1

> Documento arquitetural factual, elaborado somente por inspeção do repositório existente. Não representa uma implementação nova.

## 1. Escopo e fonte de verdade

- Repositório analisado: `RDCJ-MOCKUP`.
- Versão documentada: `RDCJ v0.1 — MVP Demonstração`, datada de 21/09/2026.
- Runtime efetivo: HTML/CSS/JavaScript servido diretamente pelo navegador.
- Contratos TypeScript em `src/domain/`: paralelos e não compilados; não participam do runtime atual.
- Backend, API, banco de dados, autenticação, autorização, sincronização multiusuário, testes automatizados e CI não existem no repositório.

## 2. Contexto funcional atual

O mockup responde a duas perguntas:

1. Onde está cada processo e por que ele está naquele enquadramento?
2. Quem deve agir, o que deve ser feito, quando e qual foi o resultado?

A Matriz RDCJ é a experiência conceitual principal. A carteira é importada por arquivo, classificada localmente e exibida em Dashboard, Matriz, Carteira, Processo 360°, Caixa de Trabalho, Kanban e Radar.

O produto atual é uma demonstração funcional local, não uma plataforma corporativa. O próprio `README.md`, `docs/releases/RELEASE-v0.1.md` e `MANUAL-OPERADOR.md` registram essa limitação.

## 3. Topologia atual

```text
Navegador
  └── src/index.html
        └── src/ui/pages/*.html
              ├── CSS importado por página
              ├── scripts globais em ordem manual
              └── estado no localStorage

Entrada de dados
  └── CSV/XLS/XLSX
        └── matrix-ui.js + parser XLSX via CDN
              └── classificação em matriz-criticidade.js
                    └── base-manager.js
                          └── localStorage

Carteira
  ├── matriz-ui.js → Matriz / Carteira / importação
  ├── dashboard.js + insights-carteira.js → Dashboard
  ├── processo360.js → Processo 360°
  ├── motor-atuacao.js → estados, filas, timers, histórico
  └── kanban.js + SortableJS via CDN → colunas visuais

Auditoria e sessão
  ├── auditoria.js → localStorage
  └── sessao-rdcj.js → backup/restauração JSON local
```

## 4. Estrutura física

### 4.1 Páginas

- `src/index.html`: entrada e redirecionamento para a Matriz.
- `src/ui/pages/dashboard.html`: KPIs, distribuições e rankings.
- `src/ui/pages/matriz.html`: matriz 3×3, filtros e KPIs.
- `src/ui/pages/trabalho.html`: Caixa de Trabalho, filas e timeline.
- `src/ui/pages/kanban.html`: 6 raias, 24 colunas e drag-and-drop visual.
- `src/ui/pages/carteira.html`: lista filtrável.
- `src/ui/pages/processo360.html`: visão consolidada atual.
- `src/ui/pages/importar-carteira.html`: leitura e mapeamento de arquivos.
- `src/ui/pages/configuracao-base.html`: limpeza, backup, restauração e status.
- `src/ui/pages/radar-carteira.html`: radar e leitura consolidada.
- `src/ui/pages/motor-rdcj.html`: explicação da regra vigente.
- `src/ui/pages/alertas.html`: placeholder.
- `src/ui/pages/processo.html`: Processo 360° legado, fora da navegação normal.
- `src/ui/pages/editar-processo.html`: edição legada, alcançada apenas por URL/fluxo legado.

### 4.2 JavaScript efetivo

| Módulo | Responsabilidade | Observação arquitetural |
|---|---|---|
| `navigation.js` | Injeta sidebar, ativo e menu móvel | Existe também markup de navegação em algumas páginas |
| `base-manager.js` | Importar, mesclar, substituir e limpar carteira | Fonte de persistência principal do runtime |
| `processo-repository.js` | CRUD por CNJ | Duplica acesso à mesma chave de armazenamento |
| `matriz-criticidade.js` | T/V → N/P | Fonte executada; limites hardcoded |
| `matrix-engine.js` | Adaptador de classificação e moeda | Expõe objeto global |
| `matrix-ui.js` | Importação, matriz, filtros e lista | Centraliza múltiplos comportamentos |
| `insights-carteira.js` | Agregações e rankings | Consumido pelo Dashboard/Radar |
| `dashboard.js` | Renderização executiva | Depende de objetos globais |
| `motor-atuacao.js` | Estados, transições, timers, filas e colunas | Máquina de estados em `localStorage` |
| `kanban.js` | Renderização e ordenação visual | Não altera estado operacional |
| `processo360.js` | Consolidação de matriz, motor e auditoria | Somente leitura; evidências são placeholder |
| `auditoria.js` | Eventos locais | Sem imutabilidade, retenção ou servidor |
| `sessao-rdcj.js` | Backup/restauração da sessão | JSON local sem migração de schema |
| `radar-carteira.js` | Radar da carteira | Módulo não central |
| `app.js` | Comportamentos globais simples | Inicialização auxiliar |
| `decision-engine.js` | Score legado/experimental | Órfão, não carregado pelas páginas |
| `base-info-card.js` | Card de base | Há duplicata em `src/ui/components/` |

### 4.3 TypeScript paralelo

`src/domain/` contém contratos para base, auditoria, insights, repositório e classificação. Eles não são compilados, não possuem pipeline de build e alguns são stubs ou mantêm estado apenas em memória. Portanto, não podem ser considerados a fonte de verdade do comportamento atual.

### 4.4 CSS e identidade

- `tokens.css`: tokens de marca e superfície.
- `layout.css`: shell, sidebar e responsividade.
- `components.css`: componentes genéricos.
- `dashboard.css`, `kanban.css`, `motor-atuacao.css`, `motor-rdcj.css`, `processo360.css`.
- `style.css`: ponto de importação global.

Paleta preservada no runtime: `#A6193C`, `#650F27`, `#F68B1F`, `#646464`, `#F6F4F2`, `#FFFFFF`, `#2B2928`, `#77716E`, `#E5E0DD`.

## 5. Fluxo de dados atual

1. O operador seleciona CSV/XLS/XLSX.
2. `matrix-ui.js` lê o arquivo, infere aliases e apresenta o mapeamento.
3. Cada linha recebe normalização, campos derivados e marca de inconsistência.
4. `rdcjCriticidade.classificarProcesso()` calcula `T1–T3`, `V1–V3`, `N1–N9` e `P1–P4`.
5. `base-manager.js` grava o array em `localStorage['rdcj-processos']`.
6. Metadados da carga são gravados em `rdcj-base-metadata`.
7. O motor sincroniza fluxos, timers e colunas Kanban em `rdcj-motor-atuacao`.
8. A auditoria registra eventos em `rdcj-auditoria`.
9. As páginas recalculam e renderizam dados diretamente no navegador.

## 6. Persistência atual

| Chave | Conteúdo | Limitação |
|---|---|---|
| `rdcj-processos` | carteira ativa | isolada por navegador/origem |
| `rdcj-base-metadata` | arquivo, versão da carga, quantidade e data | não é catálogo de importações persistente |
| `rdcj-motor-atuacao` | fluxos, históricos e timers | sem concorrência, lock ou histórico imutável |
| `rdcj-auditoria` | eventos locais | pode ser apagada com limpeza/cache |
| `rdcj-sessao-status` | status de backup/restauração | apenas metadados locais |

`localStorage.clear()` também é usado na limpeza ampla, o que eleva o risco operacional. Backup e restore são manuais, sem controle de versão/migração de schema.

## 7. Domínio implementado

### Classificação vigente

- Tempo: T1 < 1 ano; T2 de 1 a 2 anos; T3 > 2 anos.
- Valor: V1 até R$ 64.840,00; V2 até R$ 485.040,04; V3 acima disso.
- Quadrantes: combinação T×V em N1–N9.
- Pesos: N1/N2/N4 → P1; N3/N5/N7 → P2; N6/N8 → P3; N9 → P4.
- Revisão: P4 90 dias; P3 180 dias; P2 240 dias; P1 reativo.

A implementação JavaScript usa datas inválidas como data atual, enquanto os contratos ServiceNow/documentados tratam dados inválidos de forma diferente. Essa divergência deve ser homologada antes de qualquer migração.

### Motor de atuação

Estados: `REVISAO_JURIDICA`, `PETICIONAMENTO`, `AGUARDANDO_RESULTADO`, `INVESTIGACAO_AGENCIA`, `INVESTIGACAO_RETAGUARDA`, `MONITORAMENTO`, `ENCERRADO`.

Oito transições oficiais são controladas em `TRANSICOES`. O Kanban possui 6 raias e 24 colunas; mover cartão altera `coluna`/`ordem`, não o estado. Estado e coluna podem, portanto, ficar semanticamente separados.

## 8. Navegação atual

O menu runtime de `navigation.js` possui 8 itens: Dashboard, Matriz, Caixa de Trabalho, Kanban, Radar, Importação, Carteira e Configuração. Há acessos contextuais para Processo 360° e URLs diretas para telas legadas/placeholders.

Existe risco de duplicação: algumas páginas já contêm sidebar em HTML e também carregam `navigation.js`, que injeta/normaliza a sidebar.

## 9. Dependências externas

- XLSX via CDN em `importar-carteira.html`.
- SortableJS via CDN em `kanban.html`.

Não há `package.json`, bundler, build, lockfile, testes, lint ou pipeline CI no repositório atual.

## 10. Memória, documentação e agentes existentes

- `src/memory/product-memory.md`: decisão oficial de produto.
- `src/memory/decisions-log.md`: decisões e impactos.
- `src/memory/backlog.md`: épicos e dependências.
- `src/memory/feedback-log.md`: feedback incorporado.
- `src/agents/`: arquitetura, negócio, produto, roadmap e UX.

Esses artefatos já formam uma base inicial de documentação viva, mas não existe mecanismo técnico para versionar memória operacional, decisões de execução, evidências ou aprovações além do Git/Markdown.

## 11. Diagnóstico arquitetural

### Forças

- Fluxo de demonstração ponta a ponta coerente.
- Matriz, Processo 360°, motor e Kanban possuem conceitos explícitos.
- Regras de classificação e transições são legíveis.
- Identidade visual centralizada em tokens.
- Backup portátil para demonstração.
- Documentação de produto, decisões, feedback e agentes já iniciada.

### Fragilidades críticas

- Ausência de persistência corporativa, identidade, autorização e concorrência.
- Fonte de verdade distribuída entre JS executado, TS não compilado, HTML inline e Markdown.
- Dados sensíveis no navegador e apagáveis por limpeza de cache.
- Auditoria local não confiável para governança.
- Regras hardcoded e sem versionamento/homologação formal.
- Dependência de CDNs externas.
- Sem testes automatizados para classificação, transições, importação ou migração.
- Importação sem registro de arquivo original em repositório corporativo.
- Evidências, alertas, integrações e critérios Risco × Recuperação ainda não implementados.

## 12. Conclusão do baseline

O RDCJ v0.1 deve ser tratado como **referência funcional e visual**, não como plataforma reaproveitável diretamente em produção. A migração precisa preservar os comportamentos homologados, mas substituir a infraestrutura local por serviços persistentes, governados, auditáveis e compatíveis com ServiceNow.
