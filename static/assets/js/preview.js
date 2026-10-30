/* Runs inside the admin's preview iframe (?preview). Talks to the admin with postMessage:
 *   → wcms:ready  {path}      page loaded
 *   → wcms:focus  {key}       an editable element was clicked
 *   ← wcms:html   {key, html} show unsaved text right away
 */
(function () {
	if (window.parent === window) return;
	var origin = location.origin;
	var send = function (msg) { window.parent.postMessage(msg, origin); };

	var style = document.createElement('style');
	style.textContent =
		'[data-edit]{cursor:pointer}' +
		'[data-edit]:hover{outline:2px dashed rgba(191,140,42,.75)!important;outline-offset:3px}' +
		'.wcms-flash{outline:3px solid rgba(191,140,42,.95)!important;outline-offset:3px}';
	document.head.appendChild(style);

	// clicks edit instead of navigate
	document.addEventListener('click', function (e) {
		var el = e.target.closest('[data-edit]');
		if (el) send({ type: 'wcms:focus', key: el.getAttribute('data-edit') });
		if (el || e.target.closest('a')) { e.preventDefault(); e.stopPropagation(); }
	}, true);

	window.addEventListener('message', function (e) {
		if (e.origin !== origin || !e.data) return;
		if (e.data.type === 'wcms:html') {
			document.querySelectorAll('[data-edit="' + CSS.escape(e.data.key) + '"]').forEach(function (el) {
				el.innerHTML = e.data.html;
			});
		}
		if (e.data.type === 'wcms:show') {
			var el = document.querySelector('[data-edit="' + CSS.escape(e.data.key) + '"]');
			if (!el) return;
			el.scrollIntoView({ behavior: 'smooth', block: 'center' });
			el.classList.add('wcms-flash');
			setTimeout(function () { el.classList.remove('wcms-flash'); }, 1800);
		}
	});

	// keep the scroll position when the admin reloads the preview
	var key = 'wcms-scroll:' + location.pathname;
	try {
		var y = sessionStorage.getItem(key);
		if (y) window.addEventListener('load', function () { window.scrollTo(0, +y); });
		window.addEventListener('scroll', function () { sessionStorage.setItem(key, String(window.scrollY)); }, { passive: true });
	} catch { /* storage unavailable */ }

	send({ type: 'wcms:ready', path: location.pathname });
})();
