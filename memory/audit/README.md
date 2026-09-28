# Auditoria da Memória

As alterações da memória são registradas no array `audit` de `memory/project-memory.json` por meio do `MemoryRepository` e do `MemoryEngine`.

Cada entrada contém:

- `date`
- `type`
- `origin`
- `module`
- `author`
- `impact`

A pasta existe como ponto de extensão para exportações, snapshots e futura persistência server-side. O mecanismo atual não altera a auditoria existente do mockup (`src/js/auditoria.js`).
