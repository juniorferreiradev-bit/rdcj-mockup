const rdcjProcessoRepository = (() => {
    const KEY = 'rdcj-processos';
    const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
    const write = (processos) => localStorage.setItem(KEY, JSON.stringify(processos));
    return {
        listar: read,
        buscarPorCnj: (cnj) => read().find((processo) => processo.cnj === cnj),
        salvar: (processo) => { const processos = read(); const index = processos.findIndex((item) => item.cnj === processo.cnj); if (index >= 0) processos[index] = { ...processos[index], ...processo }; else processos.push(processo); write(processos); return processo; },
        substituir: write,
        removerTodos: () => localStorage.removeItem(KEY)
    };
})();
