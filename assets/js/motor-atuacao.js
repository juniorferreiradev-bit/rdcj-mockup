const rdcjMotorAtuacao = (() => {
    const STORAGE_KEY = 'rdcj-motor-atuacao';

    const ESTADOS = {
        REVISAO_JURIDICA: 'REVISAO_JURIDICA',
        PETICIONAMENTO: 'PETICIONAMENTO',
        AGUARDANDO_RESULTADO: 'AGUARDANDO_RESULTADO',
        INVESTIGACAO_AGENCIA: 'INVESTIGACAO_AGENCIA',
        INVESTIGACAO_RETAGUARDA: 'INVESTIGACAO_RETAGUARDA',
        MONITORAMENTO: 'MONITORAMENTO',
        ENCERRADO: 'ENCERRADO'
    };

    const LINHAS_ATUACAO = {
        REVISAO_JURIDICA: 'ADVOGADO',
        PETICIONAMENTO: 'ADVOGADO',
        AGUARDANDO_RESULTADO: 'ADVOGADO',
        INVESTIGACAO_AGENCIA: 'AGENCIA',
        INVESTIGACAO_RETAGUARDA: 'CENTRAL_RETAGUARDA',
        MONITORAMENTO: 'SISTEMA',
        ENCERRADO: 'SISTEMA'
    };

    const TRANSICOES = {
        REVISAO_JURIDICA: {
            'Existe oportunidade processual': 'PETICIONAMENTO',
            'Não existe oportunidade': 'INVESTIGACAO_AGENCIA'
        },
        INVESTIGACAO_AGENCIA: {
            'Informação relevante localizada': 'INVESTIGACAO_RETAGUARDA',
            'Nada localizado': 'MONITORAMENTO'
        },
        INVESTIGACAO_RETAGUARDA: {
            'Ativo localizado': 'PETICIONAMENTO',
            'Busca negativa': 'MONITORAMENTO'
        },
        PETICIONAMENTO: {
            'Petição protocolada': 'AGUARDANDO_RESULTADO'
        },
        AGUARDANDO_RESULTADO: {
            'Encerrar diligência': 'MONITORAMENTO'
        }
    };

    // Colunas visuais do Kanban RDCJ — camada de apresentação sobre o motor, não altera ESTADOS/TRANSICOES.
    const COLUNAS = {
        CLASSIFICACAO_NOVA_ENTRADA: 'CLASSIFICACAO_NOVA_ENTRADA',
        CLASSIFICACAO_P4: 'CLASSIFICACAO_P4',
        CLASSIFICACAO_P3: 'CLASSIFICACAO_P3',
        CLASSIFICACAO_P2: 'CLASSIFICACAO_P2',
        CLASSIFICACAO_P1: 'CLASSIFICACAO_P1',
        ADVOGADO_NOVOS: 'ADVOGADO_NOVOS',
        ADVOGADO_REVISAO: 'ADVOGADO_REVISAO',
        ADVOGADO_PETICIONAR: 'ADVOGADO_PETICIONAR',
        ADVOGADO_AGUARDANDO_RESULTADO: 'ADVOGADO_AGUARDANDO_RESULTADO',
        ADVOGADO_RETORNO_REVISAO: 'ADVOGADO_RETORNO_REVISAO',
        ADVOGADO_RETORNO_ATIVO: 'ADVOGADO_RETORNO_ATIVO',
        AGENCIA_RECEBIDOS: 'AGENCIA_RECEBIDOS',
        AGENCIA_INVESTIGACAO: 'AGENCIA_INVESTIGACAO',
        AGENCIA_ACHADOS: 'AGENCIA_ACHADOS',
        AGENCIA_SEM_ACHADOS: 'AGENCIA_SEM_ACHADOS',
        RETAGUARDA_RECEBIDOS: 'RETAGUARDA_RECEBIDOS',
        RETAGUARDA_BUSCA: 'RETAGUARDA_BUSCA',
        RETAGUARDA_FRUTIFERA: 'RETAGUARDA_FRUTIFERA',
        RETAGUARDA_NEGATIVA: 'RETAGUARDA_NEGATIVA',
        MONITORAMENTO_P4: 'MONITORAMENTO_P4',
        MONITORAMENTO_P3: 'MONITORAMENTO_P3',
        MONITORAMENTO_P2: 'MONITORAMENTO_P2',
        MONITORAMENTO_P1: 'MONITORAMENTO_P1',
        CONCLUIDOS: 'CONCLUIDOS'
    };

    // Cada estado do motor pode ter mais de uma coluna visual válida (sub-etapas do mesmo estado real).
    const COLUNAS_POR_ESTADO = {
        REVISAO_JURIDICA: [
            COLUNAS.CLASSIFICACAO_NOVA_ENTRADA, COLUNAS.CLASSIFICACAO_P4, COLUNAS.CLASSIFICACAO_P3,
            COLUNAS.CLASSIFICACAO_P2, COLUNAS.CLASSIFICACAO_P1,
            COLUNAS.ADVOGADO_NOVOS, COLUNAS.ADVOGADO_REVISAO, COLUNAS.ADVOGADO_RETORNO_REVISAO
        ],
        PETICIONAMENTO: [COLUNAS.ADVOGADO_PETICIONAR, COLUNAS.ADVOGADO_RETORNO_ATIVO],
        AGUARDANDO_RESULTADO: [COLUNAS.ADVOGADO_AGUARDANDO_RESULTADO],
        INVESTIGACAO_AGENCIA: [COLUNAS.AGENCIA_RECEBIDOS, COLUNAS.AGENCIA_INVESTIGACAO, COLUNAS.AGENCIA_ACHADOS, COLUNAS.AGENCIA_SEM_ACHADOS],
        INVESTIGACAO_RETAGUARDA: [COLUNAS.RETAGUARDA_RECEBIDOS, COLUNAS.RETAGUARDA_BUSCA, COLUNAS.RETAGUARDA_FRUTIFERA, COLUNAS.RETAGUARDA_NEGATIVA],
        MONITORAMENTO: [COLUNAS.MONITORAMENTO_P4, COLUNAS.MONITORAMENTO_P3, COLUNAS.MONITORAMENTO_P2, COLUNAS.MONITORAMENTO_P1],
        ENCERRADO: [COLUNAS.CONCLUIDOS]
    };

    const DEFAULT_STATE = { fluxos: [], historicos: [], timers: [] };

    const readState = () => {
        try {
            const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
            if (!raw) return { ...DEFAULT_STATE };
            return {
                ...DEFAULT_STATE,
                ...raw,
                fluxos: Array.isArray(raw.fluxos) ? raw.fluxos : [],
                historicos: Array.isArray(raw.historicos) ? raw.historicos : [],
                timers: Array.isArray(raw.timers) ? raw.timers : []
            };
        } catch {
            return { ...DEFAULT_STATE };
        }
    };

    const writeState = (state) => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const gerarId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    const agoraIso = () => new Date().toISOString();

    const normalizarPeso = (peso) => {
        const valor = String(peso || 'P2').toUpperCase();
        return ['P1', 'P2', 'P3', 'P4'].includes(valor) ? valor : 'P2';
    };

    const calcularProximaRevisao = (peso) => {
        const mapa = { P4: 90, P3: 180, P2: 240, P1: null };
        const valor = normalizarPeso(peso);
        if (!mapa[valor]) return null;
        const data = new Date(Date.now() + mapa[valor] * 24 * 60 * 60 * 1000);
        return data.toISOString();
    };

    const obterProcessoId = (processo) => processo && (processo.processoId || processo.cnj || processo.process || processo.id);

    // Coluna "padrão" de um estado, usada quando não há coluna manual válida registrada ainda.
    const calcularColunaPadrao = (estado, contexto = {}) => {
        const peso = normalizarPeso(contexto.peso);
        const ultimoHistorico = contexto.ultimoHistorico;
        switch (estado) {
            case 'REVISAO_JURIDICA':
                if (!contexto.jaTrabalhado) {
                    return contexto.peso ? COLUNAS[`CLASSIFICACAO_${peso}`] : COLUNAS.CLASSIFICACAO_NOVA_ENTRADA;
                }
                return COLUNAS.ADVOGADO_REVISAO;
            case 'PETICIONAMENTO':
                return ultimoHistorico?.estadoOrigem === 'INVESTIGACAO_RETAGUARDA' ? COLUNAS.ADVOGADO_RETORNO_ATIVO : COLUNAS.ADVOGADO_PETICIONAR;
            case 'AGUARDANDO_RESULTADO':
                return COLUNAS.ADVOGADO_AGUARDANDO_RESULTADO;
            case 'INVESTIGACAO_AGENCIA':
                return COLUNAS.AGENCIA_RECEBIDOS;
            case 'INVESTIGACAO_RETAGUARDA':
                return COLUNAS.RETAGUARDA_RECEBIDOS;
            case 'MONITORAMENTO':
                return COLUNAS[`MONITORAMENTO_${peso}`];
            case 'ENCERRADO':
                return COLUNAS.CONCLUIDOS;
            default:
                return COLUNAS.CLASSIFICACAO_NOVA_ENTRADA;
        }
    };

    // Garante compatibilidade entre estado atual, linha de atuação e coluna visual.
    // Se a coluna já registrada continuar válida para o estado atual, ela é preservada (respeita posição manual/drag-and-drop).
    // Caso contrário (ex.: acabou de ocorrer uma transição real), recalcula a coluna padrão do novo estado.
    const normalizarColunaPorEstado = (fluxo, processo) => {
        const estado = fluxo?.statusAtual || 'REVISAO_JURIDICA';
        const validas = COLUNAS_POR_ESTADO[estado] || [];
        if (fluxo?.coluna && validas.includes(fluxo.coluna)) return fluxo.coluna;

        const historico = historicoDoProcesso(fluxo?.processoId);
        const contexto = {
            peso: processo?.peso || fluxo?.peso,
            jaTrabalhado: historico.length > 0,
            ultimoHistorico: historico[0]
        };
        return calcularColunaPadrao(estado, contexto);
    };

    // Próxima posição livre ao final da coluna, para manter ordenação estável sem exigir drag-and-drop.
    const obterProximaOrdem = (state, coluna) => {
        const ordens = state.fluxos.filter((item) => item.coluna === coluna).map((item) => Number(item.ordem) || 0);
        return ordens.length ? Math.max(...ordens) + 1 : 0;
    };

    // Atribui coluna e ordem iniciais a um fluxo que ainda não possui essas propriedades (migração/criação).
    const mapearColunaInicial = (fluxo, processo, state) => {
        const coluna = normalizarColunaPorEstado(fluxo, processo);
        const ordem = obterProximaOrdem(state || readState(), coluna);
        return { ...fluxo, coluna, ordem };
    };

    // Varre todos os fluxos existentes e preenche coluna/ordem quando ausentes, sem alterar estado/linha/timer/histórico.
    const migrarColunasFluxos = () => {
        const state = readState();
        let alterado = false;
        state.fluxos = state.fluxos.map((fluxo) => {
            if (fluxo.coluna && typeof fluxo.ordem === 'number') return fluxo;
            alterado = true;
            const processo = (rdcjMatrixUI && rdcjMatrixUI.getPortfolio ? rdcjMatrixUI.getPortfolio() : []).find((item) => obterProcessoId(item) === fluxo.processoId);
            return mapearColunaInicial(fluxo, processo, state);
        });
        if (alterado) writeState(state);
        return state.fluxos;
    };

    // Move um cartão entre colunas/posições — apenas movimentação visual, nunca altera statusAtual/linhaAtual/timers/histórico.
    const moverCartaoColuna = (processoId, coluna, ordem) => {
        const state = readState();
        const index = state.fluxos.findIndex((item) => item.processoId === processoId);
        if (index < 0) return null;
        state.fluxos[index] = { ...state.fluxos[index], coluna, ordem };
        writeState(state);
        return state.fluxos[index];
    };

    // Regrava a ordem de todos os cartões de uma coluna a partir da sequência final exibida no Kanban.
    const reordenarColuna = (coluna, processoIdsEmOrdem) => {
        const state = readState();
        processoIdsEmOrdem.forEach((processoId, ordem) => {
            const index = state.fluxos.findIndex((item) => item.processoId === processoId);
            if (index >= 0) state.fluxos[index] = { ...state.fluxos[index], coluna, ordem };
        });
        writeState(state);
        return state.fluxos;
    };

    const responsavelPorEstado = (estado, processo, fluxoAtual) => {
        if (estado === 'INVESTIGACAO_AGENCIA') return 'Agência';
        if (estado === 'INVESTIGACAO_RETAGUARDA') return 'Retaguarda';
        if (estado === 'MONITORAMENTO' || estado === 'ENCERRADO') return 'Sistema';
        if (processo && processo.responsavel) return processo.responsavel;
        if (processo && processo.advogado) return processo.advogado;
        if (fluxoAtual && fluxoAtual.responsavelAtual) return fluxoAtual.responsavelAtual;
        return 'Advogado responsável';
    };

    const garantirFluxo = (processo) => {
        const state = readState();
        const processoId = obterProcessoId(processo);
        if (!processoId) return null;

        let fluxo = state.fluxos.find((item) => item.processoId === processoId);
        if (!fluxo) {
            fluxo = {
                processoId,
                statusAtual: 'REVISAO_JURIDICA',
                linhaAtual: LINHAS_ATUACAO.REVISAO_JURIDICA,
                responsavelAtual: responsavelPorEstado('REVISAO_JURIDICA', processo, null),
                dataEntrada: agoraIso(),
                ultimaAtualizacao: agoraIso(),
                proximaRevisao: calcularProximaRevisao(processo?.peso || 'P2'),
                ultimoResultado: 'Fluxo inicializado'
            };
            fluxo = mapearColunaInicial(fluxo, processo, state);
            state.fluxos = [fluxo, ...state.fluxos];
            writeState(state);
        }

        return state.fluxos.find((item) => item.processoId === processoId) || fluxo;
    };

    const registrarHistorico = (processoId, estadoOrigem, estadoDestino, usuario, justificativa) => {
        const state = readState();
        const registro = {
            id: gerarId('HIST'),
            processoId,
            estadoOrigem,
            estadoDestino,
            usuario,
            data: agoraIso(),
            justificativa: justificativa || 'Mudança de estado registrada'
        };
        state.historicos = [registro, ...state.historicos];
        writeState(state);
        return registro;
    };

    const registrarTimer = (processoId, peso) => {
        const state = readState();
        const timer = {
            id: gerarId('TIMER'),
            processoId,
            peso: normalizarPeso(peso),
            proximaRevisao: calcularProximaRevisao(peso),
            origem: 'CLASSIFICACAO_MATRIZ',
            dataCriacao: agoraIso()
        };
        state.timers = state.timers.filter((item) => item.processoId !== processoId);
        state.timers = [timer, ...state.timers];
        writeState(state);
        return timer;
    };

    const atualizarFluxo = (processoId, dados) => {
        const state = readState();
        const index = state.fluxos.findIndex((item) => item.processoId === processoId);
        if (index >= 0) {
            state.fluxos[index] = { ...state.fluxos[index], ...dados };
        } else {
            state.fluxos = [{ processoId, ...dados }, ...state.fluxos];
        }
        writeState(state);
        return state.fluxos.find((item) => item.processoId === processoId) || { processoId, ...dados };
    };

    const registrarAuditoria = (processoId, estadoOrigem, estadoDestino, usuario, resultado) => {
        if (window.rdcjAuditoria && typeof window.rdcjAuditoria.registrar === 'function') {
            window.rdcjAuditoria.registrar({
                tipo: 'MUDANCA_ESTADO',
                processoId,
                usuario,
                estadoOrigem,
                estadoDestino,
                resultado,
                data: agoraIso()
            });
        }
        registrarHistorico(processoId, estadoOrigem, estadoDestino, usuario, resultado);
    };

    const aplicarTransicao = (processoId, decisao, usuario = 'usuário local', justificativa = '') => {
        const state = readState();
        const fluxo = state.fluxos.find((item) => item.processoId === processoId) || garantirFluxo({ processoId });
        if (!fluxo) return null;

        const estadoOrigem = fluxo.statusAtual;
        const proximoEstado = TRANSICOES[estadoOrigem]?.[decisao] || null;
        if (!proximoEstado) return null;

        const processo = (rdcjMatrixUI && rdcjMatrixUI.getPortfolio ? rdcjMatrixUI.getPortfolio() : []).find((item) => (item.processoId || item.cnj || item.process) === processoId) || { peso: 'P2' };
        const linhaAtual = LINHAS_ATUACAO[proximoEstado] || 'SISTEMA';
        const responsavelAtual = responsavelPorEstado(proximoEstado, processo, fluxo);
        const resultado = justificativa || `Estado alterado de ${estadoOrigem} para ${proximoEstado} via "${decisao}"`;

        const coluna = normalizarColunaPorEstado({ ...fluxo, statusAtual: proximoEstado }, processo);
        const ordem = obterProximaOrdem(state, coluna);

        const fluxoAtualizado = atualizarFluxo(processoId, {
            statusAtual: proximoEstado,
            linhaAtual,
            responsavelAtual,
            ultimaAtualizacao: agoraIso(),
            proximaRevisao: calcularProximaRevisao(processo.peso || 'P2'),
            ultimoResultado: resultado,
            coluna,
            ordem
        });

        registrarAuditoria(processoId, estadoOrigem, proximoEstado, usuario, resultado);

        if (!state.timers.some((item) => item.processoId === processoId)) {
            registrarTimer(processoId, processo.peso || 'P2');
        }

        return fluxoAtualizado;
    };

    const listarFluxos = () => {
        const state = readState();
        const processos = (rdcjMatrixUI && rdcjMatrixUI.getPortfolio ? rdcjMatrixUI.getPortfolio() : []);

        return processos.map((processo) => {
            const processoId = obterProcessoId(processo);
            const fluxo = state.fluxos.find((item) => item.processoId === processoId) || garantirFluxo(processo);
            const timer = state.timers.find((item) => item.processoId === processoId) || registrarTimer(processoId, processo.peso || 'P2');
            return {
                ...processo,
                processoId,
                statusAtual: fluxo?.statusAtual || 'REVISAO_JURIDICA',
                linhaAtual: fluxo?.linhaAtual || LINHAS_ATUACAO.REVISAO_JURIDICA,
                responsavelAtual: fluxo?.responsavelAtual || responsavelPorEstado('REVISAO_JURIDICA', processo, fluxo),
                dataEntrada: fluxo?.dataEntrada || agoraIso(),
                ultimaAtualizacao: fluxo?.ultimaAtualizacao || agoraIso(),
                proximaRevisao: fluxo?.proximaRevisao || timer?.proximaRevisao || calcularProximaRevisao(processo.peso || 'P2'),
                ultimoResultado: fluxo?.ultimoResultado || 'Fluxo inicializado',
                coluna: fluxo?.coluna || normalizarColunaPorEstado(fluxo || { statusAtual: 'REVISAO_JURIDICA', processoId }, processo),
                ordem: typeof fluxo?.ordem === 'number' ? fluxo.ordem : 0,
                timer
            };
        });
    };

    const historicoDoProcesso = (processoId) => {
        const state = readState();
        return state.historicos.filter((item) => item.processoId === processoId).sort((a, b) => (b.data || '').localeCompare(a.data || ''));
    };

    const timelineDoProcesso = (processoId) => {
        const state = readState();
        const fluxo = state.fluxos.find((item) => item.processoId === processoId);
        const historico = historicoDoProcesso(processoId);
        const timer = state.timers.find((item) => item.processoId === processoId);

        const eventos = historico.map((item) => ({
            tipo: 'Mudança de Estado',
            titulo: `${item.estadoOrigem} → ${item.estadoDestino}`,
            data: item.data,
            detalhe: `${item.usuario} · ${item.justificativa}`
        }));

        if (fluxo) {
            eventos.push({
                tipo: 'Mudança de Linha de Atuação',
                titulo: fluxo.linhaAtual,
                data: fluxo.ultimaAtualizacao,
                detalhe: `Linha atual: ${fluxo.linhaAtual}`
            });
            eventos.push({
                tipo: 'Mudança de Responsável',
                titulo: fluxo.responsavelAtual,
                data: fluxo.ultimaAtualizacao,
                detalhe: `Responsável atual: ${fluxo.responsavelAtual}`
            });
        }

        if (timer) {
            eventos.push({
                tipo: 'Criação de Timer',
                titulo: `P${timer.peso.replace('P', '')}`,
                data: timer.dataCriacao,
                detalhe: `Próxima revisão: ${timer.proximaRevisao || 'sem revisão automática'}`
            });
        }

        if (fluxo && fluxo.statusAtual === 'MONITORAMENTO') {
            eventos.push({
                tipo: 'Conclusão de Diligência',
                titulo: 'Monitoramento atrelado',
                data: fluxo.ultimaAtualizacao,
                detalhe: fluxo.ultimoResultado || 'Diligência encerrada'
            });
        }

        return eventos.sort((a, b) => (b.data || '').localeCompare(a.data || ''));
    };

    const filaJuridica = () => listarFluxos().filter((item) => ['REVISAO_JURIDICA', 'PETICIONAMENTO', 'AGUARDANDO_RESULTADO'].includes(item.statusAtual));
    const filaAgencia = () => listarFluxos().filter((item) => item.statusAtual === 'INVESTIGACAO_AGENCIA');
    const filaRetaguarda = () => listarFluxos().filter((item) => item.statusAtual === 'INVESTIGACAO_RETAGUARDA');

    const estadoAnterior = (processoId) => {
        const historico = historicoDoProcesso(processoId);
        if (!historico.length) return 'REVISAO_JURIDICA';
        return historico[1]?.estadoDestino || historico[0]?.estadoOrigem || 'REVISAO_JURIDICA';
    };

    const proximaEtapa = (processoId) => {
        const fluxo = readState().fluxos.find((item) => item.processoId === processoId);
        if (!fluxo) return 'REVISAO_JURIDICA';
        const transicao = TRANSICOES[fluxo.statusAtual] || {};
        const destino = Object.values(transicao)[0];
        return destino || 'MONITORAMENTO';
    };

    const resumoAceitacao = (processoId) => {
        const fluxo = readState().fluxos.find((item) => item.processoId === processoId);
        return {
            estadoAtual: fluxo?.statusAtual || 'REVISAO_JURIDICA',
            responsavel: fluxo?.responsavelAtual || 'Advogado responsável',
            proximaEtapa: proximaEtapa(processoId),
            etapaAnterior: estadoAnterior(processoId),
            proximaRevisao: fluxo?.proximaRevisao || null,
            historico: historicoDoProcesso(processoId).length > 0
        };
    };

    const sincronizarFluxos = () => {
        const state = readState();
        const portfolio = (rdcjMatrixUI && rdcjMatrixUI.getPortfolio ? rdcjMatrixUI.getPortfolio() : []);
        portfolio.forEach((processo) => {
            const processoId = obterProcessoId(processo);
            if (!state.fluxos.some((item) => item.processoId === processoId)) {
                const novoFluxo = mapearColunaInicial({
                    processoId,
                    statusAtual: 'REVISAO_JURIDICA',
                    linhaAtual: 'ADVOGADO',
                    responsavelAtual: responsavelPorEstado('REVISAO_JURIDICA', processo, null),
                    dataEntrada: agoraIso(),
                    ultimaAtualizacao: agoraIso(),
                    proximaRevisao: calcularProximaRevisao(processo.peso || 'P2'),
                    ultimoResultado: 'Fluxo inicializado a partir da carteira'
                }, processo, state);
                state.fluxos.push(novoFluxo);
            }
        });
        migrarColunasFluxos();
        writeState(state);
        return state.fluxos;
    };

    const listarProcessosAtuacao = () => listarFluxos();

    return {
        STORAGE_KEY,
        ESTADOS,
        LINHAS_ATUACAO,
        TRANSICOES,
        COLUNAS,
        COLUNAS_POR_ESTADO,
        readState,
        writeState,
        calcularProximaRevisao,
        garantirFluxo,
        aplicarTransicao,
        registrarHistorico,
        registrarTimer,
        listarFluxos,
        listarProcessosAtuacao,
        filaJuridica,
        filaAgencia,
        filaRetaguarda,
        historicoDoProcesso,
        timelineDoProcesso,
        estadoAnterior,
        proximaEtapa,
        resumoAceitacao,
        sincronizarFluxos,
        responsavelPorEstado,
        normalizarPeso,
        normalizarColunaPorEstado,
        mapearColunaInicial,
        migrarColunasFluxos,
        moverCartaoColuna,
        reordenarColuna
    };
})();
