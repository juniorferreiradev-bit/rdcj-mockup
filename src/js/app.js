if (!window.rdcjNavigationLoaded) {
	const navigationScript = document.createElement('script');
	navigationScript.src = '../js/navigation.js';
	document.head.appendChild(navigationScript);
}

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('[data-current-year]').forEach((element) => {
		element.textContent = new Date().getFullYear();
	});
});

