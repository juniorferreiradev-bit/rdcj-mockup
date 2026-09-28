# Política de Cache do Context Engine

## Objetivo

Evitar a reconstrução completa do contexto quando as fontes não mudaram, mantendo atualização determinística quando memória, backlog ou documentação forem alterados.

## Estratégia

- O `ContextRepository` calcula SHA-256 das fontes e da memória.
- O `ContextEngine` usa esse fingerprint como chave do cache.
- O `ContextCache` mantém uma pequena janela LRU em memória.
- Mudança em qualquer fonte produz nova chave e novo snapshot.
- O snapshot persistido em `memory/context-snapshot.json` é substituído somente após consolidação bem-sucedida.

## Invalidação

A invalidação é automática por fingerprint. Também é possível chamar `cache.invalidate()` para invalidar uma chave ou todo o cache.

## Limitações

- O cache atual é local ao processo Node/browser.
- Não há cache distribuído ou invalidação entre usuários.
- O snapshot físico não deve ser tratado como fonte de verdade; as fontes originais continuam sendo autoritativas.
- O mecanismo não observa filesystem em tempo real; a atualização ocorre na próxima consulta/construção.
