const rdcjAuditoria = (() => {
    const KEY = 'rdcj-auditoria';
    const listar = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
    const registrar = (evento) => { const registro = { ...evento, id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, data: new Date().toISOString() }; localStorage.setItem(KEY, JSON.stringify([...listar(), registro])); return registro; };
    return { listar, registrar, limpar: () => localStorage.removeItem(KEY) };
})();
