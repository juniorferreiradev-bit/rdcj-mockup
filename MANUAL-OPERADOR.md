# Manual do Operador — RDCJ 2.1

Este manual descreve o comportamento atualmente implementado no mockup. A aplicação usa dados locais no navegador e não possui autenticação, autorização ou sincronização entre usuários.

## Iniciar a aplicação

1. Na raiz do repositório, execute `python -m http.server 8000`.
2. Acesse `http://localhost:8000/src/index.html`.
3. A entrada encaminha para `src/ui/pages/matriz.html`.
4. A estrutura atual usa `src/ui/pages/`, `assets/js/` e `assets/css/`.

O passo a passo está em [`docs/guides/INSTALACAO-RAPIDA.md`](docs/guides/INSTALACAO-RAPIDA.md).

## Menu e telas

O menu de `assets/js/navigation.js` contém oito itens:

| Item | Tela | Função implementada |
|---|---|---|
| Insights da Carteira | Dashboard | Indicadores e distribuições calculados da carteira local. |
| Matriz RDCJ | Matriz | Classificação atual Tempo × Valor, filtros, KPIs e acesso à carteira filtrada. |
| Caixa de Trabalho | Trabalho | Filas e decisões do Motor de Atuação local. |
| Kanban RDCJ | Kanban | Organização visual de cartões em raias e colunas. |
| Radar da Carteira | Radar | Distribuições/indicadores da carteira. |
| Importar base | Importação | Leitura, mapeamento e carga no navegador. |
| Lista de processos | Carteira | Consulta e filtros de processos. |
| Gestão da carteira | Configuração | Gestão, limpeza e backup/restauração da base local. |

Processo 360° é aberto por links contextuais. Processo legado, edição, Alertas e Regras continuam disponíveis por URL; Alertas é placeholder.

## Carregar a carteira

1. Acesse **Importar base**.
2. Selecione CSV, XLS ou XLSX. A tela inclui a biblioteca XLSX por CDN para formatos Excel.
3. Confira o mapeamento. CNJ, cliente (`nm_lit`), valor e data da decisão são necessários para a carga.
4. Escolha entre adicionar/atualizar por CNJ ou substituir a base.
5. Selecione **Classificar e carregar base**.

O processamento e a persistência são locais no navegador. Não há upload para backend.

## Matriz RDCJ

A implementação atual classifica por:

- Tempo da decisão: T1 (<1 ano), T2 (1–2 anos), T3 (>2 anos).
- Valor: V1 (até R$ 64.840,00), V2 (até R$ 485.040,04), V3 (acima).
- Posição: T3 → N7/N8/N9; T2 → N4/N5/N6; T1 → N1/N2/N3.
- Pesos: P1 = N1/N2/N4; P2 = N3/N5/N7; P3 = N6/N8; P4 = N9.

A camada visual atual aplica paleta suave por peso: P1 verde, P2 amarelo, P3 laranja e P4 vermelho suave. Isso não altera a regra nem o cálculo. Os filtros reduzem os processos e valores usados nos indicadores; selecionar um quadrante abre a carteira com o filtro correspondente.

## Dashboard e Carteira

O Dashboard resume a base local em indicadores e distribuições. A Carteira lista e filtra processos. Selecionar o CNJ abre Processo 360°. Não há dados fictícios gerados automaticamente; as telas podem aparecer vazias até a importação de uma carteira.

## Caixa de Trabalho e Motor de Atuação

O Motor de Atuação persiste em `localStorage` sob `rdcj-motor-atuacao`. Estados implementados:

- `REVISAO_JURIDICA`
- `PETICIONAMENTO`
- `AGUARDANDO_RESULTADO`
- `INVESTIGACAO_AGENCIA`
- `INVESTIGACAO_RETAGUARDA`
- `MONITORAMENTO`
- `ENCERRADO`

Transições implementadas:

- Revisão Jurídica → Peticionamento ou Investigação Agência.
- Investigação Agência → Investigação Retaguarda ou Monitoramento.
- Investigação Retaguarda → Peticionamento ou Monitoramento.
- Peticionamento → Aguardando Resultado.
- Aguardando Resultado → Monitoramento.

A Caixa de Trabalho registra as decisões disponíveis no motor. `ENCERRADO` existe como estado, mas não tem transição de entrada configurada.

Timers atuais: P4 90 dias, P3 180 dias, P2 240 dias, P1 sem revisão automática.

## Kanban RDCJ

O quadro tem seis raias e 24 colunas. Arrastar um cartão reorganiza coluna/ordem visual e não muda o estado formal do motor. Para mudar o estado, use as decisões disponíveis na Caixa de Trabalho. Os badges visuais do Kanban são definidos em `assets/css/kanban.css`; a paleta pastel da Matriz não é a paleta do Kanban.

## Processo 360°

A tela atual apresenta identificação, enquadramento, linha de atuação, explicabilidade, timeline, próxima ação e uma área de evidências preparada. Upload/gestão de evidências não está implementado. Processo 360° agrega dados locais e não consulta um sistema externo.

## Auditoria local

`assets/js/auditoria.js` registra eventos no `localStorage` (`rdcj-auditoria`). Isso é histórico local do mockup, não trilha de auditoria corporativa imutável.

## Backup e restauração

1. Acesse **Gestão da carteira** e use **Salvar Sessão** para baixar o JSON.
2. Para restaurar, selecione um backup e confirme a substituição da sessão local.
3. A restauração substitui dados locais da carteira e operação; mantenha cópia do arquivo antes de restaurar.

O backup não transfere dados para servidor nem substitui uma estratégia corporativa de retenção.

## Limitações atuais

- Sem login, autorização, backend, API de negócio ou banco central.
- Dados locais pertencem ao navegador/dispositivo.
- Regras atuais são Tempo × Valor; Risco × Recuperação e IRP permanecem no backlog.
- ServiceNow não está conectado; readiness e mappings são documentais.
- Agentes e camadas arquiteturais possuem módulos/contratos locais, mas não operam como serviço corporativo integrado.
- Limpar a base é destrutivo para os dados locais. Use backup antes.
