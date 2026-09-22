/* Sessão RDCJ — backup/restauração local (JSON) do estado atual. Não recalcula nem altera nenhuma regra de negócio. */
const rdcjSessao = (() => {
    const CHAVE_PROCESSOS = 'rdcj-processos';
    const CHAVE_BASE_METADATA = 'rdcj-base-metadata';
    const CHAVE_MOTOR = 'rdcj-motor-atuacao';
    const CHAVE_AUDITORIA = 'rdcj-auditoria';
    const CHAVE_SESSAO_STATUS = 'rdcj-sessao-status';

    const lerJson = (chave, fallback) => {
        try { return JSON.parse(localStorage.getItem(chave) || JSON.stringify(fallback)); }
        catch { return fallback; }
    };

    const statusSessao = () => lerJson(CHAVE_SESSAO_STATUS, { ultimoBackup: null, ultimaRestauracao: null });
    const salvarStatusSessao = (status) => localStorage.setItem(CHAVE_SESSAO_STATUS, JSON.stringify(status));

    const registrarAuditoria = (tipo, detalhes) => {
        if (window.rdcjAuditoria && typeof window.rdcjAuditoria.registrar === 'function') {
            window.rdcjAuditoria.registrar({ tipo, usuario: 'usuário local', detalhes });
        }
    };

    const nomeArquivoBackup = (data = new Date()) => {
        const pad = (n) => String(n).padStart(2, '0');
        const aaaammdd = `${data.getFullYear()}${pad(data.getMonth() + 1)}${pad(data.getDate())}`;
        const hhmm = `${pad(data.getHours())}${pad(data.getMinutes())}`;
        return `RDCJ-Backup-${aaaammdd}-${hhmm}.json`;
    };

    const construirBackup = () => {
        const processos = lerJson(CHAVE_PROCESSOS, []);
        const motor = lerJson(CHAVE_MOTOR, { fluxos: [], historicos: [], timers: [] });
        const auditoria = lerJson(CHAVE_AUDITORIA, []);
        const baseMetadata = lerJson(CHAVE_BASE_METADATA, null);

        return {
            versao: '1.0',
            dataGeracao: new Date().toISOString(),
            totalProcessos: processos.length,
            processos,
            fluxos: motor.fluxos || [],
            historicos: motor.historicos || [],
            timers: motor.timers || [],
            auditoria,
            metadata: { baseMetadata, sessao: statusSessao() }
        };
    };

    const salvarSessao = () => {
        const backup = construirBackup();
        const arquivo = nomeArquivoBackup();
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = arquivo;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        const status = statusSessao();
        status.ultimoBackup = backup.dataGeracao;
        salvarStatusSessao(status);
        registrarAuditoria('BACKUP_GERADO', `${arquivo} · ${backup.totalProcessos} processos, ${backup.fluxos.length} fluxos`);

        return { arquivo, backup };
    };

    const validarBackup = (dados) => dados && Array.isArray(dados.processos) && Array.isArray(dados.fluxos);

    const restaurarSessao = async (arquivo) => {
        if (!arquivo) return { sucesso: false, motivo: 'Nenhum arquivo selecionado.' };
        if (!window.confirm('Deseja substituir a sessão atual?')) return { sucesso: false, motivo: 'Cancelado pelo usuário.' };

        let dados;
        try {
            dados = JSON.parse(await arquivo.text());
        } catch {
            alert('Arquivo inválido: não foi possível ler o backup JSON.');
            return { sucesso: false, motivo: 'JSON inválido.' };
        }

        if (!validarBackup(dados)) {
            alert('Arquivo de backup incompatível com a estrutura esperada do RDCJ.');
            return { sucesso: false, motivo: 'Estrutura inválida.' };
        }

        localStorage.setItem(CHAVE_PROCESSOS, JSON.stringify(dados.processos || []));
        localStorage.setItem(CHAVE_MOTOR, JSON.stringify({
            fluxos: dados.fluxos || [],
            historicos: dados.historicos || [],
            timers: dados.timers || []
        }));
        localStorage.setItem(CHAVE_AUDITORIA, JSON.stringify(dados.auditoria || []));
        if (dados.metadata?.baseMetadata) localStorage.setItem(CHAVE_BASE_METADATA, JSON.stringify(dados.metadata.baseMetadata));

        const status = statusSessao();
        status.ultimaRestauracao = new Date().toISOString();
        salvarStatusSessao(status);
        registrarAuditoria('BACKUP_RESTAURADO', `${dados.processos.length} processos, ${dados.fluxos.length} fluxos restaurados de backup gerado em ${dados.dataGeracao || 'data desconhecida'}`);

        return { sucesso: true };
    };

    const resumoStatus = () => {
        const processos = lerJson(CHAVE_PROCESSOS, []);
        const motor = lerJson(CHAVE_MOTOR, { fluxos: [], historicos: [], timers: [] });
        const auditoria = lerJson(CHAVE_AUDITORIA, []);
        const baseMetadata = lerJson(CHAVE_BASE_METADATA, null);
        const status = statusSessao();

        return {
            ultimaImportacao: baseMetadata?.dataImportacao || null,
            ultimoBackup: status.ultimoBackup || null,
            ultimaRestauracao: status.ultimaRestauracao || null,
            totalProcessos: processos.length,
            totalFluxos: (motor.fluxos || []).length,
            totalMovimentacoes: (motor.historicos || []).length,
            totalEventos: auditoria.length
        };
    };

    return { salvarSessao, restaurarSessao, resumoStatus };
})();
