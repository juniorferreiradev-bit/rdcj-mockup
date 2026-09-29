/* Camada visual RDCJ 2.1. Mantém classificação e fonte de dados em rdcjMatrixUI/matrix-engine. */
(() => {
    const priorities = Object.freeze({ N1: 'P1', N2: 'P1', N3: 'P2', N4: 'P1', N5: 'P2', N6: 'P3', N7: 'P2', N8: 'P3', N9: 'P4' });
    const rows = Object.freeze([
        { tempo: 'T3', descricao: 'Acima de 2 anos', quadrantes: ['N7', 'N8', 'N9'] },
        { tempo: 'T2', descricao: 'De 1 a 2 anos', quadrantes: ['N4', 'N5', 'N6'] },
        { tempo: 'T1', descricao: 'Menos de 1 ano', quadrantes: ['N1', 'N2', 'N3'] }
    ]);
    const descriptions = Object.freeze({
        N1: 'Processos com decisão recente e valor na faixa V1.',
        N2: 'Processos com decisão recente e valor na faixa V2.',
        N3: 'Processos com decisão recente e valor na faixa V3.',
        N4: 'Processos entre 1 e 2 anos da decisão e valor na faixa V1.',
        N5: 'Processos entre 1 e 2 anos da decisão e valor na faixa V2.',
        N6: 'Processos entre 1 e 2 anos da decisão e valor na faixa V3.',
        N7: 'Processos acima de 2 anos da decisão e valor na faixa V1.',
        N8: 'Processos acima de 2 anos da decisão e valor na faixa V2.',
        N9: 'Processos acima de 2 anos da decisão e valor na faixa V3; destaque crítico da matriz.'
    });
    const formatCurrency = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0);
    const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
    const icon = (name) => {
        const paths = {
            portfolio: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h4"/>',
            money: '<circle cx="12" cy="12" r="9"/><path d="M15 8.5c-.7-.7-1.7-1-3-1-1.7 0-2.8.8-2.8 2s1.1 1.8 2.8 2 2.8.8 2.8 2-1.1 2-2.8 2c-1.3 0-2.4-.4-3.1-1.1M12 6v12"/>',
            alert: '<path d="M10.3 4.3 2.7 18a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 3h.01"/>',
            critical: '<path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v4m0 3h.01"/>'
        };
        return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
    };

    const render = (root) => {
        if (!root) return;
        const all = rdcjMatrixUI.getPortfolio();
        const existingFilters = new URLSearchParams(window.location.search);
        const draw = () => {
            const filters = Object.fromEntries(new FormData(root.querySelector('[data-matrix-filters]')));
            const visible = rdcjMatrixUI.filterItems(all, filters);
            const totalValue = visible.reduce((sum, item) => sum + item.value, 0);
            const n9 = visible.filter((item) => item.quadrante === 'N9');
            const n9Value = n9.reduce((sum, item) => sum + item.value, 0);
            root.querySelector('[data-matrix-count]').textContent = `${visible.length} processos na seleção`;
            root.querySelector('[data-card-total]').textContent = new Intl.NumberFormat('pt-BR').format(visible.length);
            root.querySelector('[data-card-value]').textContent = formatCurrency(totalValue);
            root.querySelector('[data-card-n9]').textContent = new Intl.NumberFormat('pt-BR').format(n9.length);
            root.querySelector('[data-card-value-n9]').textContent = formatCurrency(n9Value);

            const cards = rows.map((row) => `
                <div class="matrix-time-label" aria-label="${row.tempo}: ${row.descricao}">
                    <strong>${row.tempo}</strong><span>${row.descricao}</span>
                </div>
                ${row.quadrantes.map((quadrante) => {
                    const items = visible.filter((item) => item.quadrante === quadrante);
                    const value = items.reduce((sum, item) => sum + item.value, 0);
                    const percent = totalValue ? (value / totalValue * 100).toFixed(1) : '0.0';
                    const priority = priorities[quadrante];
                    const description = descriptions[quadrante];
                    const priorityBadge = quadrante === 'N9'
                        ? '<span class="quadrant-priority quadrant-priority-critical" aria-label="Prioridade P4"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v4m0 3h.01"/></svg>P4</span>'
                        : `<span class="quadrant-priority">Prioridade ${priority}</span>`;
                    const accessibleLabel = `${quadrante}, Prioridade ${priority}, ${items.length} processos, ${formatCurrency(value)}, ${percent}% do valor da seleção. ${description} Ativar para abrir carteira filtrada.`;
                    return `<button type="button" class="rdcj-quadrant rdcj-${quadrante.toLowerCase()} weight-${priority.toLowerCase()}${quadrante === 'N9' ? ' is-critical' : ''}" data-quadrant="${quadrante}" aria-label="${esc(accessibleLabel)}" title="${esc(accessibleLabel)}">
                        <span class="quadrant-topline"><span class="quadrant-code">${quadrante}</span>${priorityBadge}</span>
                        <span class="quadrant-count"><strong>${new Intl.NumberFormat('pt-BR').format(items.length)}</strong> processos</span>
                        <span class="quadrant-value">${formatCurrency(value)}</span>
                        <span class="quadrant-percent">${percent}% <span>do valor da seleção</span></span>
                        <span class="quadrant-tooltip" role="tooltip"><strong>${quadrante} · Prioridade ${priority}</strong><span>${items.length} processos · ${formatCurrency(value)} · ${percent}%</span><span>${description}</span></span>
                    </button>`;
                }).join('')}
            `).join('');
            root.querySelector('[data-matrix-canvas]').innerHTML = cards;
            root.querySelectorAll('[data-quadrant]').forEach((button) => button.addEventListener('click', () => {
                window.location.href = `carteira.html?quadrante=${encodeURIComponent(button.dataset.quadrant)}`;
            }));
        };

        const select = (name, label, options) => `<label class="matrix-filter"><span>${label}</span><select name="${name}" aria-label="Filtrar por ${label}">${options}</select></label>`;
        const optionList = (values) => values.map((value) => `<option value="${esc(value)}">${esc(value)}</option>`).join('');
        const uniqueOptions = (key) => [...new Set(all.map((item) => item[key]).filter(Boolean))].sort().map((value) => `<option value="${esc(value)}">${esc(value)}</option>`).join('');
        root.innerHTML = `<section class="rdcj-matrix-workspace" aria-labelledby="matrix-main-title">
            <div class="rdcj-matrix-heading">
                <div><p class="matrix-eyebrow">ANÁLISE DE CARTEIRA</p><h2 id="matrix-main-title">Matriz de criticidade</h2><p class="matrix-subtitle">Tempo da decisão × valor da ação. Selecione um quadrante para explorar os processos.</p></div>
                <a class="button" href="importar-carteira.html">Importar base</a>
            </div>
            <section class="rdcj-executive-kpis" aria-label="Indicadores executivos">
                <article class="rdcj-kpi"><span class="rdcj-kpi-icon icon-portfolio">${icon('portfolio')}</span><div><p>Total de processos</p><strong data-card-total>0</strong></div></article>
                <article class="rdcj-kpi"><span class="rdcj-kpi-icon icon-money">${icon('money')}</span><div><p>Valor total</p><strong data-card-value>R$ 0</strong></div></article>
                <article class="rdcj-kpi rdcj-kpi-critical"><span class="rdcj-kpi-icon icon-alert">${icon('alert')}</span><div><p>Críticos N9</p><strong data-card-n9>0</strong></div></article>
                <article class="rdcj-kpi rdcj-kpi-critical"><span class="rdcj-kpi-icon icon-critical">${icon('critical')}</span><div><p>Exposição N9</p><strong data-card-value-n9>R$ 0</strong></div></article>
            </section>
            <div class="rdcj-matrix-toolbar"><strong data-matrix-count aria-live="polite"></strong><span>Percentuais representam participação no valor total da seleção.</span></div>
            <form class="rdcj-matrix-filters" data-matrix-filters aria-label="Filtros da matriz">
                ${select('quadrante', 'Quadrante', `<option value="">Todos</option>${optionList(['N1','N2','N3','N4','N5','N6','N7','N8','N9'])}`)}
                ${select('peso', 'Prioridade', `<option value="">Todas</option>${optionList(['P1','P2','P3','P4'])}`)}
                ${select('comarca', 'Comarca', `<option value="">Todas</option>${uniqueOptions('comarca')}${uniqueOptions('agency')}`)}
                ${select('advogado', 'Advogado', `<option value="">Todos</option>${uniqueOptions('advogado')}${uniqueOptions('owner')}`)}
                ${select('responsavel', 'Responsável', `<option value="">Todos</option>${uniqueOptions('responsavel')}${uniqueOptions('owner')}`)}
                ${select('faixaValor', 'Faixa de valor', `<option value="">Todas</option>${optionList(['V1','V2','V3'])}`)}
            </form>
            <div class="rdcj-matrix-legend" aria-label="Legenda de criticidade">
                <span><i class="legend-green"></i>N1–N2 · Prioridade P1</span><span><i class="legend-yellow"></i>N3–N5 · Prioridade P1–P2</span><span><i class="legend-orange"></i>N6–N8 · Prioridade P2–P3</span><span><i class="legend-red"></i>N9 · Prioridade P4</span>
            </div>
            <div class="rdcj-matrix-shell">
                <div class="rdcj-axis-caption rdcj-y-caption">TEMPO DA DECISÃO</div>
                <div class="rdcj-matrix-grid">
                    <div class="rdcj-matrix-corner" aria-hidden="true"></div>
                    <div class="rdcj-value-label"><strong>V1</strong><span>Até R$ 64.840</span></div>
                    <div class="rdcj-value-label"><strong>V2</strong><span>Faixa intermediária</span></div>
                    <div class="rdcj-value-label"><strong>V3</strong><span>Maior valor</span></div>
                    <div class="rdcj-matrix-canvas" data-matrix-canvas role="group" aria-label="Quadrantes da Matriz RDCJ"></div>
                </div>
                <div class="rdcj-axis-caption rdcj-x-caption">VALOR DA AÇÃO <span>V1 → V3</span></div>
            </div>
            <p class="rdcj-matrix-help">Use Tab para navegar pelos quadrantes e Enter para abrir a carteira filtrada. Passe o cursor ou foque um card para consultar os detalhes.</p>
        </section>`;
        const quadrantFilter = existingFilters.get('quadrante');
        if (quadrantFilter) root.querySelector('[name="quadrante"]').value = quadrantFilter;
        root.querySelector('[data-matrix-filters]').addEventListener('input', draw);
        root.querySelector('[data-matrix-filters]').addEventListener('change', draw);
        draw();
    };

    rdcjMatrixUI.render = render;
})();
