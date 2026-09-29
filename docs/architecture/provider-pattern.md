# Provider Pattern

O Provider Pattern abstrai a tecnologia de armazenamento por trás de contratos estáveis. Repositories não precisam conhecer LocalStorage, ServiceNow ou banco de dados.

`ProviderRegistry` resolve providers registrados e `ProviderFactory` cria implementações por configuração.
