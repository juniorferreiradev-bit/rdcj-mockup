(() => {
    if (window.rdcjNavigationLoaded) return;
    window.rdcjNavigationLoaded = true;

    const MENU_ITENS = [
        ['dashboard.html', '▦', 'Insights da Carteira'],
        ['matriz.html', '⊞', 'Matriz RDCJ'],
        ['trabalho.html', '✓', 'Caixa de Trabalho'],
        ['kanban.html', '▥', 'Kanban RDCJ'],
        ['radar-carteira.html', '◉', 'Radar da Carteira'],
        ['importar-carteira.html', '↑', 'Importar base'],
        ['carteira.html', '▤', 'Lista de processos'],
        ['configuracao-base.html', '⚙', 'Gestão da carteira']
    ];

    const paginaAtual = window.location.pathname.split('/').pop() || 'dashboard.html';
    const menuMarkup = MENU_ITENS.map(([href, icone, rotulo]) => `
        <li><a class="nav-link" href="${href}" data-nav-page="${href}">
            <span class="nav-icon" aria-hidden="true">${icone}</span>${rotulo}
        </a></li>
    `).join('');

    let sidebar = document.querySelector('.sidebar');
    if (!sidebar) {
        sidebar = document.createElement('aside');
        sidebar.className = 'sidebar';
        const shell = document.querySelector('.app-shell');
        (shell || document.body).prepend(sidebar);
    }

    sidebar.innerHTML = `
        <div class="brand">
            <div class="brand-mark">R</div>
            <div>
                <p class="brand-name">RDCJ</p>
                <p class="brand-subtitle">Inteligência da carteira</p>
            </div>
        </div>
        <nav aria-label="Navegação principal">
            <ul class="nav-list">${menuMarkup}</ul>
        </nav>
        <div class="sidebar-footer">Classificação explicável<br>e atuação operacional</div>
    `;

    const content = document.querySelector('main');
    if (content) content.classList.add('main-content');

    if (content && !document.querySelector('[data-menu-toggle]')) {
        const menuButton = document.createElement('button');
        menuButton.type = 'button';
        menuButton.className = 'mobile-menu';
        menuButton.dataset.menuToggle = 'true';
        menuButton.setAttribute('aria-label', 'Abrir menu lateral');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = '☰';
        content.prepend(menuButton);
    }

    sidebar.querySelector(`[data-nav-page="${paginaAtual}"]`)?.classList.add('active');

    const menuButton = document.querySelector('[data-menu-toggle]');
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            const isOpen = document.body.classList.toggle('menu-open');
            menuButton.setAttribute('aria-expanded', String(isOpen));
        });
    }

    sidebar.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => document.body.classList.remove('menu-open'));
    });
})();
