const rdcjBaseInfoCard = (() => {
    const render = (root) => { const meta = rdcjBaseManager.metadata(); if (!meta) { root.innerHTML = '<strong>Nenhuma carteira carregada</strong><span>Importe uma planilha para ativar a matriz.</span>'; return; } root.innerHTML = `<strong>BASE ATIVA · ${meta.status}</strong><span>Arquivo: ${meta.nomeArquivo}</span><span>Importado em: ${new Date(meta.dataImportacao).toLocaleString('pt-BR')}</span><span>Processos: ${meta.quantidadeProcessos}</span><span>Versão: ${meta.versaoCarga}</span>`; };
    return { render };
})();
