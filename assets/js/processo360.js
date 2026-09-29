/* Processo 360 RDCJ — consolida dados já existentes (matriz + motor de atuação + auditoria). Não cria regra nova. */
(() => {
    const CRITICIDADE_POR_PESO = { P1: 'Baixa', P2: 'Moderada', P3: 'Alta', P4: 'Crítica' };

    const ESTAGIOS_LINHA = (statusAtual) => ([
        { chave: 'ADVOGADO', rotulo: 'Advogado' },
        { chave: 'AGENCIA', rotulo: 'Agência' },
        { chave: 'CENTRAL_RETAGUARDA', rotulo: 'Retaguarda' },
        { chave: 'SISTEMA', rotulo: statusAtual === 'ENCERRADO' ? 'Concluído' : 'Monitoramento' }
    ]);

    const formatCurrency = (valor) => (window.rdcjMatrixEngine ? rdcjMatrixEngine.formatCurrency(valor) : String(valor || 0));
    const formatData = (iso) => iso ? new Date(iso).toLocaleString('pt-BR') : '—';
    const formatDataCurta = (iso) => iso ? new Date(iso).toLocaleDateString('pt-BR') : '—';

    const campo = (rotulo, valor) => `<div class="p360-field"><span class="metric-label">${rotulo}</span><strong>${valor ?? '—'}</strong></div>`;

    const obterProcesso = (id) => {
        const fluxos = (window.rdcjMotorAtuacao ? rdcjMotorAtuacao.listarFluxos() : []);
        const daFluxo = fluxos.find((item) => item.cnj === id || item.processoId === id);
        if (daFluxo) return daFluxo;
        const portfolio = (window.rdcjMatrixUI ? rdcjMatrixUI.getPortfolio() : []);
        return portfolio.find((item) => item.cnj === id || item.process === id) || null;
    };

    const renderIdentificacao = (item) => `
        ${campo('CNJ', item.cnj)}
        ${campo('Cliente', item.cliente)}
        ${campo('Peso', `<span class="kanban-peso peso-${String(item.peso || 'P2').toLowerCase()}">${item.peso || 'P2'}</span>`)}
        ${campo('Valor', formatCurrency(item.value ?? item.valor))}
        ${campo('Advogado', item.advogado || item.nm_adv)}
        ${campo('Agência / Comarca', item.comarca || item.nm_mun)}
        ${campo('Quadrante', item.quadrante)}
    `;

    const renderEnquadramento = (item) => `
        ${campo('Quadrante', item.quadrante)}
        ${campo('Peso', item.peso)}
        ${campo('Criticidade', CRITICIDADE_POR_PESO[item.peso] || '—')}
        ${campo('Faixa de tempo', item.faixaTempo)}
        ${campo('Faixa de valor', item.faixaValor)}
        ${campo('Data da decisão', item.dataDecisao || 'não informada')}
    `;

    const renderLinhaAtuacao = (item) => {
        const ativa = item.linhaAtual || 'ADVOGADO';
        return ESTAGIOS_LINHA(item.statusAtual).map((estagio) => `
            <div class="p360-stage ${estagio.chave === ativa ? 'ativo' : ''}">
                <span class="p360-stage-dot"></span>
                <span>${estagio.rotulo}</span>
            </div>
        `).join('');
    };

    const renderExplicabilidade = (item) => `
        <li>Data da decisão: ${item.dataDecisao || 'não informada'}</li>
        <li>Tempo desde a decisão: ${item.faixaTempo || '—'}</li>
        <li>Valor da ação: ${formatCurrency(item.value ?? item.valor)}</li>
        <li>Faixa de valor: ${item.faixaValor || '—'}</li>
        <li>Quadrante resultante: ${item.quadrante || '—'}</li>
        <li>Peso atribuído: ${item.peso || '—'}</li>
        ${(item.reasons || []).map((motivo) => `<li>${motivo}</li>`).join('')}
    `;

    const renderTimeline = (item) => {
        const doMotor = (window.rdcjMotorAtuacao ? rdcjMotorAtuacao.timelineDoProcesso(item.processoId || item.cnj) : []) || [];
        const daAuditoria = (window.rdcjAuditoria ? rdcjAuditoria.listar() : [])
            .filter((evento) => evento.processoId === (item.processoId || item.cnj) && evento.tipo !== 'MUDANCA_ESTADO')
            .map((evento) => ({ tipo: evento.tipo, titulo: evento.tipo, data: evento.data, detalhe: evento.resultado || evento.detalhes || `${evento.usuario || 'sistema'}` }));

        const eventos = [...doMotor, ...daAuditoria].sort((a, b) => (b.data || '').localeCompare(a.data || ''));

        if (!eventos.length) return '<li>Nenhum evento registrado para este processo.</li>';
        return eventos.map((evento) => `
            <li><strong>${evento.tipo}</strong> · ${formatData(evento.data)}<br><span class="muted">${evento.titulo || ''} — ${evento.detalhe || 'Sem detalhe'}</span></li>
        `).join('');
    };

    const renderProximaAcao = (item) => `
        ${campo('Responsável atual', item.responsavelAtual)}
        ${campo('Linha atual', item.linhaAtual)}
        ${campo('Próxima revisão', item.proximaRevisao ? formatDataCurta(item.proximaRevisao) : 'Reativo · sem prazo fixo')}
        ${campo('Timer', item.timer ? `${item.timer.peso} · criado em ${formatDataCurta(item.timer.dataCriacao)}` : 'Sem timer ativo')}
        ${campo('Último resultado', item.ultimoResultado)}
    `;

    const renderEvidencias = () => `
        <p class="future-module">Estrutura preparada para anexar evidências (documentos, prints e laudos) a este processo. Upload e armazenamento previstos para uma evolução futura — nenhuma regra de negócio foi criada nesta versão.</p>
    `;

    const render = () => {
        const id = new URLSearchParams(location.search).get('processo');
        const item = id ? obterProcesso(id) : null;

        if (!item) {
            document.querySelector('[data-title]').textContent = 'Processo não encontrado';
            document.querySelector('[data-subtitle]').textContent = 'Verifique se o CNJ informado pertence à carteira ativa.';
            document.querySelector('[data-nao-encontrado]').hidden = false;
            document.querySelector('[data-processo360-conteudo]').hidden = true;
            return;
        }

        document.querySelector('[data-title]').textContent = `Processo ${item.cnj}`;
        document.querySelector('[data-subtitle]').textContent = `${item.cliente || 'Cliente não informado'} · ${item.quadrante || '—'} · ${item.peso || '—'}`;
        document.querySelector('[data-identificacao]').innerHTML = renderIdentificacao(item);
        document.querySelector('[data-enquadramento]').innerHTML = renderEnquadramento(item);
        document.querySelector('[data-linha-atuacao]').innerHTML = renderLinhaAtuacao(item);
        document.querySelector('[data-explicabilidade]').innerHTML = renderExplicabilidade(item);
        document.querySelector('[data-timeline]').innerHTML = renderTimeline(item);
        document.querySelector('[data-proxima-acao]').innerHTML = renderProximaAcao(item);
        document.querySelector('[data-evidencias]').innerHTML = renderEvidencias();
    };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
    else render();
})();
