const rdcjMatrixUI = (() => {
    const storageKey = 'rdcj-processos';
    const quadrantes = ['N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7', 'N8', 'N9'];
    const getPortfolio = () => rdcjBaseManager.processos().map((item) => rdcjMatrixEngine.assess({ ...item, process: item.cnj, client: item.cliente }));
    const options = (items, key) => [...new Set(items.map((item) => item[key]).filter(Boolean))].sort().map((value) => `<option value="${value}">${value}</option>`).join('');
    const formatCurrency = (value) => rdcjMatrixEngine.formatCurrency(value);
    const filterItems = (items, filters) => items.filter((item) => (!filters.quadrante || item.quadrante === filters.quadrante) && (!filters.peso || item.peso === filters.peso) && (!filters.comarca || item.comarca === filters.comarca || item.agency === filters.comarca) && (!filters.advogado || item.advogado === filters.advogado || item.owner === filters.advogado) && (!filters.responsavel || item.responsavel === filters.responsavel || item.owner === filters.responsavel) && (!filters.faixaValor || item.faixaValor === filters.faixaValor));

    const render = (root) => {
        const all = getPortfolio();
        const draw = () => {
            const filters = Object.fromEntries(new FormData(root.querySelector('[data-matrix-filters]')));
            const visible = filterItems(all, filters);
            const totalValue = visible.reduce((sum, item) => sum + item.value, 0);
            root.querySelector('[data-matrix-count]').textContent = `${visible.length} processos visíveis`;
            root.querySelector('[data-card-total]').textContent = visible.length;
            root.querySelector('[data-card-value]').textContent = formatCurrency(totalValue);
            root.querySelector('[data-card-n9]').textContent = visible.filter((item) => item.quadrante === 'N9').length;
            root.querySelector('[data-card-n8]').textContent = visible.filter((item) => item.quadrante === 'N8').length;
            root.querySelector('[data-card-n7]').textContent = visible.filter((item) => item.quadrante === 'N7').length;
            root.querySelector('[data-card-value-n9]').textContent = formatCurrency(visible.filter((item) => item.quadrante === 'N9').reduce((sum, item) => sum + item.value, 0));
            if (!visible.length) { root.querySelector('[data-matrix-canvas]').innerHTML = '<div class="empty-matrix"><strong>Nenhuma carteira carregada</strong><span>Importe ou substitua a base para preencher os quadrantes.</span></div>'; return; }
            root.querySelector('[data-matrix-canvas]').innerHTML = ['T1', 'T2', 'T3'].map((tempo) => quadrantes.slice((Number(tempo.slice(1)) - 1) * 3, Number(tempo.slice(1)) * 3).map((quadrante) => {
                const items = visible.filter((item) => item.quadrante === quadrante);
                const value = items.reduce((sum, item) => sum + item.value, 0);
                const percent = totalValue ? (value / totalValue * 100).toFixed(1) : '0.0';
                return `<button type="button" class="matrix-quadrant heat-${rdcjCriticidade.calcularPeso(quadrante).toLowerCase()}" data-quadrant="${quadrante}" title="Filtrar carteira por ${quadrante}"><header><strong>${quadrante} · ${rdcjCriticidade.calcularPeso(quadrante)}</strong><span>${tempo}</span></header><div class="matrix-cell-content"><b>${items.length}</b><span>processos</span><span>${formatCurrency(value)}</span><small>${percent}% da carteira</small></div></button>`;
            }).join('')).join('');
            root.querySelectorAll('[data-quadrant]').forEach((button) => button.addEventListener('click', () => { window.location.href = `carteira.html?quadrante=${button.dataset.quadrant}`; }));
        };
        root.innerHTML = `<section class="matrix-workspace"><div class="matrix-toolbar"><div><strong data-matrix-count></strong><span> · Matriz de criticidade tempo × valor</span></div><a class="button" href="importar-carteira.html">Importar base</a></div><form class="matrix-filters" data-matrix-filters><select name="quadrante"><option value="">Quadrante</option>${quadrantes.map((q) => `<option>${q}</option>`).join('')}</select><select name="peso"><option value="">Peso</option><option>P1</option><option>P2</option><option>P3</option><option>P4</option></select><select name="comarca"><option value="">Comarca</option>${options(all, 'comarca')}${options(all, 'agency')}</select><select name="advogado"><option value="">Advogado</option>${options(all, 'advogado')}${options(all, 'owner')}</select><select name="responsavel"><option value="">Responsável</option>${options(all, 'responsavel')}${options(all, 'owner')}</select><select name="faixaValor"><option value="">Faixa de valor</option><option>V1</option><option>V2</option><option>V3</option></select></form><div class="matrix-legend"><span><i class="legend-p1"></i>P1 Baixa</span><span><i class="legend-p2"></i>P2 Moderada</span><span><i class="legend-p3"></i>P3 Alta</span><span><i class="legend-p4"></i>P4 Crítica</span></div><div class="matrix-viewport"><div class="matrix-axis y-axis">TEMPO DA DECISÃO <span>Mais recente ↑ · Mais antiga ↓</span></div><div class="matrix-axis x-axis">VALOR DA AÇÃO <span>V1 ← · V3 →</span></div><div class="matrix-canvas matrix-grid-3x3" data-matrix-canvas></div></div><p class="matrix-help">Clique em um quadrante para abrir a carteira já filtrada.</p></section>`;
        root.querySelector('.matrix-toolbar').insertAdjacentHTML('afterend', '<div class="kpi-grid executive-kpis"><article class="card kpi-card"><p class="kpi-label">Total de Processos</p><h2 class="kpi-value" data-card-total>0</h2></article><article class="card kpi-card"><p class="kpi-label">Valor Total</p><h2 class="kpi-value" data-card-value>R$ 0</h2></article><article class="card kpi-card"><p class="kpi-label">Total N9</p><h2 class="kpi-value" data-card-n9>0</h2></article><article class="card kpi-card"><p class="kpi-label">Total N8</p><h2 class="kpi-value" data-card-n8>0</h2></article><article class="card kpi-card"><p class="kpi-label">Total N7</p><h2 class="kpi-value" data-card-n7>0</h2></article><article class="card kpi-card"><p class="kpi-label">Valor em N9</p><h2 class="kpi-value" data-card-value-n9>R$ 0</h2></article></div>');
        root.querySelector('[data-matrix-filters]').addEventListener('input', draw);
        draw();
    };

    const initImport = () => {
        const fileInput = document.querySelector('[data-file]');
        const importButton = document.querySelector('[data-import]');
        if (!fileInput || !importButton) return;
        const modoInicial = new URLSearchParams(location.search).get('modo');
        if (modoInicial) document.querySelector('[name="modoCarga"]').value = modoInicial;
        let rows = [];
        const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        const number = (value) => typeof value === 'number' ? value : Number(String(value ?? '').replace(/[^\d,.-]/g, '').replace(/\.(?=\d{3}(?:\D|$))/g, '').replace(',', '.')) || 0;
        const fields = { process: ['cnj', 'nr_prc', 'processo', 'numero'], client: ['nm_lit'], dateDecisao: ['data da decisao', 'data decisao', 'dt_decisao', 'decisao'], value: ['valoracaomoedacorrente', 'valordaacao', 'valor da acao', 'valor'], terceirizacao: ['valoracaofinsterceirizacao', 'valoracao fins terceirizacao', 'terceirizacao'], advogado: ['nm_adv', 'advogado'], comarca: ['nm_mun', 'comarca'], responsavel: ['responsavel'] };
        const guess = (headers, key) => headers.find((header) => fields[key].some((term) => normalize(header).includes(term))) || '';
        const showMapping = (headers) => { document.querySelector('[data-form]').innerHTML = Object.entries(fields).map(([key]) => `<label>${key}<select name="${key}"><option value="">Não mapeado</option>${headers.map((header) => `<option value="${header}" ${guess(headers, key) === header ? 'selected' : ''}>${header}</option>`).join('')}</select></label>`).join(''); document.querySelector('[data-mapping]').hidden = false; document.querySelector('[data-status]').textContent = `${rows.length} processos lidos. Confirme o mapeamento.`; };
        fileInput.addEventListener('change', async () => { const file = fileInput.files[0]; if (!file) return; if (/\.csv$/i.test(file.name)) { const lines = (await file.text()).trim().split(/\r?\n/).map((line) => line.split(/[;,]/)); const headers = lines.shift() || []; rows = lines.map((line) => Object.fromEntries(headers.map((header, index) => [header, line[index] || '']))); showMapping(headers); return; } const book = XLSX.read(await file.arrayBuffer(), { type: 'array', cellDates: true }); rows = XLSX.utils.sheet_to_json(book.Sheets[book.SheetNames[0]], { defval: '' }); showMapping(Object.keys(rows[0] || {})); });
        importButton.addEventListener('click', async () => { const map = Object.fromEntries(new FormData(document.querySelector('[data-form]'))); if (!map.process || !map.client || !map.value || !map.dateDecisao) { alert('Mapeie obrigatoriamente CNJ, nm_lit, Valor e Data da Decisão.'); return; } const arquivo = fileInput.files[0].name; const imported = rows.map((row, index) => { const valor = number(row[map.value] ?? row.ValorAcaoMoedaCorrente ?? row.valorDaAcao); const clienteFonte = String(row.nm_lit || '').trim(); const cliente = clienteFonte || 'Cliente não informado'; const cnjFonte = String(row[map.process] || '').trim(); const cnj = cnjFonte || `SEM-CNJ-${Date.now()}-${index + 1}`; const inconsistencias = []; if (!cnjFonte) inconsistencias.push('CNJ ausente'); if (!clienteFonte) inconsistencias.push('Nome Cliente ausente'); if (!valor) inconsistencias.push('Valor ausente ou inválido'); if (!row[map.dateDecisao]) inconsistencias.push('Data da Decisão ausente'); return { ...rdcjCriticidade.classificarProcesso({ cnj, process: cnj, cliente, client: cliente, dataDecisao: row[map.dateDecisao], ValorAcaoMoedaCorrente: valor, comarca: row[map.comarca] || row.Comarca || 'Não informado', advogado: row[map.advogado] || row.Advogado || '', responsavel: row[map.responsavel] || row.Responsável || '', status: row.Status || 'Importado' }), cnj, cliente, nm_lit: cliente, nm_adv: row[map.advogado] || row.nm_adv || '', nm_mun: row[map.comarca] || row.nm_mun || '', ValorAcaoFinsTerceirizacao: number(row[map.terceirizacao] ?? row.ValorAcaoFinsTerceirizacao), inconsistente: inconsistencias.length > 0, inconsistencias, origemCarga: arquivo, ultimaEdicao: null, ultimaImportacao: new Date().toISOString(), indiceLinha: index + 2 }; }); const meta = rdcjBaseManager.criarMetadata(arquivo, imported.length); imported.forEach((item) => { item.dataImportacao = meta.dataImportacao; item.versaoCarga = meta.versaoCarga; }); const modo = document.querySelector('[name="modoCarga"]').value; if (imported.some((item) => item.inconsistente)) alert(`${imported.filter((item) => item.inconsistente).length} registro(s) carregado(s) com inconsistências. Consulte a carteira.`); if (modo === 'substituir') await rdcjBaseManager.substituirBase(imported, meta); else rdcjBaseManager.importarBase(imported, meta); window.location.href = 'dashboard.html'; });
    };

    const initList = () => {
        const list = document.querySelector('[data-list]');
        if (!list) return;
        const items = getPortfolio();
        const card = list.closest('.decision-table-card');
        const filters = document.createElement('form');
        filters.className = 'portfolio-filters';
        filters.innerHTML = `<select name="quadrante"><option value="">Quadrante</option>${quadrantes.map((q) => `<option>${q}</option>`).join('')}</select><select name="peso"><option value="">Peso</option><option>P1</option><option>P2</option><option>P3</option><option>P4</option></select><select name="comarca"><option value="">Comarca</option>${options(items, 'comarca')}</select><select name="advogado"><option value="">Advogado</option>${options(items, 'advogado')}</select><select name="responsavel"><option value="">Responsável</option>${options(items, 'responsavel')}</select><select name="faixaValor"><option value="">Faixa de valor</option><option>V1</option><option>V2</option><option>V3</option></select>`;
        card.querySelector('.section-heading').after(filters);
        const draw = () => { const query = Object.fromEntries(new FormData(filters)); const selected = filterItems(items, { ...query, quadrante: query.quadrante || new URLSearchParams(location.search).get('quadrante') || '' }); list.innerHTML = selected.map((item) => `<tr><td><a class="process-number" href="processo360.html?processo=${encodeURIComponent(item.cnj)}">${item.cnj}</a></td><td>${item.cliente || 'Cliente não informado'}</td><td><strong>${item.quadrante}</strong><br><span class="muted">${item.faixaTempo} · ${item.faixaValor} · ${item.peso}</span></td><td>${formatCurrency(item.value)}</td><td>${item.inconsistente ? item.inconsistencias.join('; ') : '—'}</td><td>${item.dataProximaRevisao || '—'}</td></tr>`).join('') || '<tr><td colspan="6">Nenhuma carteira carregada.</td></tr>'; };
        filters.addEventListener('input', draw);
        draw();
    };
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initImport); document.addEventListener('DOMContentLoaded', initList); } else { initImport(); initList(); }
    return { render, getPortfolio, filterItems, storageKey };
})();
