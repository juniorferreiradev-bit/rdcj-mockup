if (!window.rdcjNavigationLoaded) {
    const navigationScript = document.createElement('script');
    navigationScript.src = '../js/navigation.js';
    document.head.appendChild(navigationScript);
}


const rdcjBaseManager = (() => {
    const PROCESSOS_KEY = 'rdcj-processos';
    const METADATA_KEY = 'rdcj-base-metadata';
    localStorage.removeItem('rdcj-imported-portfolio');
    const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; } };
    const metadata = () => read(METADATA_KEY, null);
    const processos = () => read(PROCESSOS_KEY, []);
    const salvar = (registros, meta) => { localStorage.setItem(PROCESSOS_KEY, JSON.stringify(registros)); if (meta) localStorage.setItem(METADATA_KEY, JSON.stringify({ ...meta, quantidadeProcessos: registros.length })); else localStorage.removeItem(METADATA_KEY); };
    const limparCaches = async () => { localStorage.clear(); sessionStorage.clear(); if (window.indexedDB?.databases) { const bases = await indexedDB.databases(); await Promise.all(bases.map((base) => base.name ? new Promise((resolve) => { const request = indexedDB.deleteDatabase(base.name); request.onsuccess = request.onerror = request.onblocked = resolve; }) : Promise.resolve())); } if (window.caches) { const nomes = await caches.keys(); await Promise.all(nomes.map((nome) => caches.delete(nome))); } };
    const criarMetadata = (nomeArquivo, quantidadeProcessos) => { const agora = new Date(); const versaoCarga = `${agora.getFullYear()}.${String(agora.getMonth() + 1).padStart(2, '0')}.${String(agora.getDate()).padStart(2, '0')}`; return { id: `${Date.now()}`, nomeArquivo, dataImportacao: agora.toISOString(), quantidadeProcessos, versaoCarga, status: 'ATIVA' }; };
    const mesclar = (novos) => { const mapa = new Map(processos().map((item) => [item.cnj, item])); novos.forEach((item) => mapa.set(item.cnj, { ...mapa.get(item.cnj), ...item })); return [...mapa.values()]; };
    const importarBase = (novos, meta) => { const resultado = mesclar(novos); salvar(resultado, meta); rdcjAuditoria.registrar({ tipo: 'IMPORTACAO_ADITIVA', usuario: 'usuário local', origemCarga: meta.nomeArquivo, versaoCarga: meta.versaoCarga, detalhes: `${novos.length} registros recebidos` }); return resultado; };
    const substituirBase = async (novos, meta) => { await limparCaches(); salvar(novos, meta); rdcjAuditoria.registrar({ tipo: 'SUBSTITUICAO_BASE', usuario: 'usuário local', origemCarga: meta.nomeArquivo, versaoCarga: meta.versaoCarga, detalhes: `${novos.length} registros carregados` }); return novos; };
    const limparBase = async () => { await limparCaches(); rdcjAuditoria.registrar({ tipo: 'LIMPEZA_BASE', usuario: 'usuário local', detalhes: 'Carteira removida' }); };
    return { processos, metadata, criarMetadata, importarBase, substituirBase, limparBase, limparCaches, PROCESSOS_KEY, METADATA_KEY };
})();
