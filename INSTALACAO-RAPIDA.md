# Instalação Rápida — RDCJ Mockup

Guia objetivo para colocar o mockup do RDCJ em execução local em poucos minutos. Não há instalação de dependências de sistema, banco de dados ou build — é um front-end estático.

## 1. Pré-requisitos

- Um navegador atual (Chrome, Edge ou Firefox).
- Um servidor HTTP simples para servir os arquivos estáticos. Qualquer uma das opções abaixo funciona; é necessário apenas **uma** delas:
  - **Python 3** (já vem instalado na maioria dos ambientes corporativos Windows/Linux/macOS); ou
  - **Node.js** (para usar `npx serve`); ou
  - A extensão **Live Server** do VS Code.

> Importante: não abra os arquivos `.html` diretamente com duplo clique (`file://`). Isso quebra o carregamento de scripts e a leitura de arquivos de importação. O projeto **precisa** ser servido por HTTP.

## 2. Obter o projeto

Se o projeto já estiver clonado/copiado localmente (ex.: `C:\dev\RDCJ-MOCKUP`), pule para o passo 3.

Caso esteja vindo de um backup/pacote `.zip` ou de um repositório Git:

```powershell
# Clonar do GitHub (repositório privado)
git clone https://github.com/juniorferreiradev-bit/rdcj-mockup.git RDCJ-MOCKUP
cd RDCJ-MOCKUP
```

Ou, se recebido como `.zip`, apenas extraia o conteúdo em uma pasta local (ex.: `C:\dev\RDCJ-MOCKUP`).

## 3. Subir o servidor local

Abra um terminal na **raiz do projeto** (`C:\dev\RDCJ-MOCKUP`) e execute uma das opções:

### Opção A — Python (recomendada)

```powershell
python -m http.server 8000
```

### Opção B — Node.js

```powershell
npx serve -l 8000
```

### Opção C — VS Code Live Server

1. Instale a extensão **Live Server** (se ainda não estiver instalada).
2. Clique com o botão direito em `src/index.html` → **Open with Live Server**.

## 4. Abrir no navegador

Com o servidor rodando na porta `8000` (opções A/B), acesse:

- `http://localhost:8000/src/index.html` — entrada padrão (redireciona para a Matriz RDCJ); ou
- `http://localhost:8000/src/pages/matriz.html` — Matriz RDCJ diretamente; ou
- `http://localhost:8000/src/pages/dashboard.html` — Dashboard executivo.

Se estiver usando Live Server, a URL será exibida automaticamente pela extensão (geralmente porta `5500`).

## 5. Carregar uma carteira de teste

1. No menu lateral, acesse **Importar base**.
2. Selecione um arquivo `.csv`, `.xls` ou `.xlsx` com, no mínimo, os campos: CNJ, cliente (`nm_lit`), valor da ação e data da decisão.
3. Confirme o mapeamento de colunas sugerido automaticamente (ou ajuste manualmente).
4. Clique em **Classificar e carregar base**.

A partir daqui, Dashboard, Matriz, Carteira, Kanban, Caixa de Trabalho e Processo 360° já exibem os dados importados.

## 6. Parar o servidor

No terminal onde o servidor está rodando, pressione `Ctrl + C`.

## 7. Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Tela em branco ou erro no console sobre `fetch`/`XMLHttpRequest` | Arquivo aberto via `file://` em vez de `http://` | Reinicie pelo servidor HTTP (passo 3) |
| Menu lateral não aparece | Cache do navegador desatualizado | `Ctrl + F5` para recarregar sem cache |
| Importação não reconhece colunas | Planilha sem os campos mínimos (CNJ, cliente, valor, data da decisão) | Ajuste manualmente o mapeamento na tela de importação |
| Dados de uma demonstração anterior aparecem misturados | Base antiga ainda salva no navegador | Vá em **Configuração** → **Limpar Base**, ou restaure um backup específico (ver `MANUAL-OPERADOR.md`) |

Para uso diário das telas, backup e restauração, consulte o [`MANUAL-OPERADOR.md`](MANUAL-OPERADOR.md).
