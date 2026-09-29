# Diretrizes de Repositories

## Objetivo

Separar domínio/serviços das implementações de armazenamento, preservando o comportamento local e preparando providers futuros.

## Responsabilidades

- Entidades: regras e invariantes de domínio.
- Services: casos de uso e orquestração.
- Repositories: contratos de acesso a entidades.
- Adapters: detalhes de armazenamento.
- Registry: resolução centralizada.

## Padrões

- Repository Pattern.
- Adapter Pattern.
- Registry Pattern.
- Dependency Inversion.
- Anti-corruption layer para integrações futuras.

Entidades não acessam `localStorage`, UI ou ServiceNow.
