/* Kanban RDCJ — camada 100% visual sobre rdcjMotorAtuacao. Não altera estado, linha, timer ou histórico. */
const rdcjKanban = (() => {
    const board = () => document.querySelector('[data-kanban-board]');

    const RAIAS = [
        {
            id: 'CLASSIFICACAO', titulo: 'Classificação', colunas: [
                { id: 'CLASSIFICACAO_NOVA_ENTRADA', titulo: 'Nova Entrada' },
                { id: 'CLASSIFICACAO_P4', titulo: 'P4' },
                { id: 'CLASSIFICACAO_P3', titulo: 'P3' },
                { id: 'CLASSIFICACAO_P2', titulo: 'P2' },
                { id: 'CLASSIFICACAO_P1', titulo: 'P1' }
            ]
        },
        {
            id: 'ADVOGADO', titulo: 'Advogado', colunas: [
                { id: 'ADVOGADO_NOVOS', titulo: 'Novos Processos' },
                { id: 'ADVOGADO_REVISAO', titulo: 'Em Revisão Jurídica' },
                { id: 'ADVOGADO_PETICIONAR', titulo: 'Peticionar' },
                { id: 'ADVOGADO_AGUARDANDO_RESULTADO', titulo: 'Aguardando Resultado Judicial' },
                { id: 'ADVOGADO_RETORNO_REVISAO', titulo: 'Retorno para Revisão' },
                { id: 'ADVOGADO_RETORNO_ATIVO', titulo: 'Retorno Ativo Localizado' }
            ]
        },
        {
            id: 'AGENCIA', titulo: 'Agência', colunas: [
                { id: 'AGENCIA_RECEBIDOS', titulo: 'Recebidos' },
                { id: 'AGENCIA_INVESTIGACAO', titulo: 'Em Investigação' },
                { id: 'AGENCIA_ACHADOS', titulo: 'Achados' },
                { id: 'AGENCIA_SEM_ACHADOS', titulo: 'Sem Achados' }
            ]
        },
        {
            id: 'RETAGUARDA', titulo: 'Central Retaguarda', colunas: [
                { id: 'RETAGUARDA_RECEBIDOS', titulo: 'Recebidos' },
                { id: 'RETAGUARDA_BUSCA', titulo: 'Busca Patrimonial' },
                { id: 'RETAGUARDA_FRUTIFERA', titulo: 'Busca Frutífera' },
                { id: 'RETAGUARDA_NEGATIVA', titulo: 'Busca Negativa' }
            ]
        },
        {
            id: 'MONITORAMENTO', titulo: 'Monitoramento', colunas: [
                { id: 'MONITORAMENTO_P4', titulo: 'P4 · 90 dias' },
                { id: 'MONITORAMENTO_P3', titulo: 'P3 · 180 dias' },
                { id: 'MONITORAMENTO_P2', titulo: 'P2 · 240 dias' },
                { id: 'MONITORAMENTO_P1', titulo: 'P1 · Reativo' }
            ]
        },
        {
            id: 'CONCLUIDOS', titulo: 'Concluídos', colunas: [
                { id: 'CONCLUIDOS', titulo: 'Concluídos' }
            ]
        }
    ];

    const formatCurrency = (valor) => (window.rdcjMatrixEngine ? rdcjMatrixEngine.formatCurrency(valor) : String(valor || 0));
    const formatRevisao = (iso) => iso ? new Date(iso).toLocaleDateString('pt-BR') : 'Reativo · sem prazo fixo';

    const cardMarkup = (item) => `
        <article class="kanban-card" draggable="true" data-processo-id="${item.processoId}">
            <header class="kanban-card-top">
                <strong class="kanban-card-cnj">${item.cnj || item.processoId}</strong>
                <span class="kanban-peso peso-${String(item.peso || 'P2').toLowerCase()}">${item.peso || 'P2'}</span>
            </header>
            <p class="kanban-card-cliente">${item.cliente || 'Cliente não informado'}</p>
            <div class="kanban-card-meta">
                <span class="kanban-card-valor">${formatCurrency(item.value ?? item.valor)}</span>
                <span class="kanban-card-responsavel">${item.responsavelAtual || 'Sem responsável'}</span>
            </div>
            <footer class="kanban-card-timer">
                <span class="kanban-timer-icon" aria-hidden="true">⏱</span>
                <span>${formatRevisao(item.proximaRevisao)}</span>
                <a class="kanban-card-open" href="processo360.html?processo=${encodeURIComponent(item.cnj || item.processoId)}" title="Abrir Processo 360">↗</a>
            </footer>
        </article>
    `;

    const agruparPorColuna = (itens) => {
        const mapa = new Map();
        itens.forEach((item) => {
            const lista = mapa.get(item.coluna) || [];
            lista.push(item);
            mapa.set(item.coluna, lista);
        });
        mapa.forEach((lista) => lista.sort((a, b) => (Number(a.ordem) || 0) - (Number(b.ordem) || 0)));
        return mapa;
    };

    const render = () => {
        const root = board();
        if (!root) return;

        rdcjMotorAtuacao.sincronizarFluxos();
        rdcjMotorAtuacao.migrarColunasFluxos();
        const itens = rdcjMotorAtuacao.listarFluxos();
        const porColuna = agruparPorColuna(itens);

        const totalChip = document.querySelector('[data-kanban-total]');
        if (totalChip) totalChip.textContent = `${itens.length} processos`;

        root.innerHTML = RAIAS.map((raia) => {
            const totalRaia = raia.colunas.reduce((soma, coluna) => soma + (porColuna.get(coluna.id) || []).length, 0);
            return `
                <section class="kanban-lane" data-lane="${raia.id}">
                    <header class="kanban-lane-header">
                        <h2>${raia.titulo}</h2>
                        <span class="kanban-lane-count">${totalRaia}</span>
                    </header>
                    <div class="kanban-columns">
                        ${raia.colunas.map((coluna) => {
                            const cartoes = porColuna.get(coluna.id) || [];
                            return `
                                <div class="kanban-column">
                                    <header class="kanban-column-header">
                                        <span>${coluna.titulo}</span>
                                        <span class="kanban-column-count" data-coluna-count="${coluna.id}">${cartoes.length}</span>
                                    </header>
                                    <div class="kanban-column-body" data-coluna="${coluna.id}">
                                        ${cartoes.length ? cartoes.map(cardMarkup).join('') : '<p class="kanban-empty">Sem processos</p>'}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </section>
            `;
        }).join('');

        ativarDragAndDrop(root);
    };

    const atualizarContadores = (colunaId) => {
        const corpo = document.querySelector(`[data-coluna="${colunaId}"]`);
        const contador = document.querySelector(`[data-coluna-count="${colunaId}"]`);
        if (corpo && contador) {
            const total = corpo.querySelectorAll('.kanban-card').length;
            contador.textContent = total;
            corpo.querySelector('.kanban-empty')?.remove();
            if (!total) corpo.insertAdjacentHTML('beforeend', '<p class="kanban-empty">Sem processos</p>');
        }
    };

    const ativarDragAndDrop = (root) => {
        if (!window.Sortable) return;
        root.querySelectorAll('.kanban-column-body').forEach((corpo) => {
            Sortable.create(corpo, {
                group: 'kanban-rdcj',
                animation: 150,
                ghostClass: 'kanban-card-ghost',
                filter: '.kanban-empty',
                onEnd: (evt) => {
                    const colunaDestino = evt.to.dataset.coluna;
                    const colunaOrigem = evt.from.dataset.coluna;

                    const idsDestino = [...evt.to.querySelectorAll('.kanban-card')].map((card) => card.dataset.processoId);
                    rdcjMotorAtuacao.reordenarColuna(colunaDestino, idsDestino);

                    if (colunaOrigem !== colunaDestino) {
                        const idsOrigem = [...evt.from.querySelectorAll('.kanban-card')].map((card) => card.dataset.processoId);
                        rdcjMotorAtuacao.reordenarColuna(colunaOrigem, idsOrigem);
                        atualizarContadores(colunaOrigem);
                    }
                    atualizarContadores(colunaDestino);
                }
            });
        });
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
    else render();

    return { render, RAIAS };
})();
