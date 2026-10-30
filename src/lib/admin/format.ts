/*
 * Editors see a simple format instead of HTML:
 *   Enter       → <br>
 *   *woord*     → <em> (the accent style)
 * The original <em …> tag is reused so styled accents keep their colour.
 * Browser only (DOMParser); the admin runs client-side.
 */

// stands in for <br> while whitespace is collapsed (a private-use character never in content)
const BR = '';

export function toSimple(html: string): string {
	// DOMParser documents never run scripts or event handlers
	const body = new DOMParser().parseFromString(html.replace(/<br\s*\/?>/gi, BR), 'text/html').body;
	body.querySelectorAll('em').forEach((em) => em.replaceWith('*' + em.textContent + '*'));
	return (body.textContent ?? '')
		.replace(/\s+/g, ' ')
		.replace(new RegExp(` ?${BR} ?`, 'g'), '\n')
		.trim();
}

export function emTagOf(html: string): string {
	return html.match(/<em\b[^>]*>/i)?.[0] ?? '<em>';
}

export function toHtml(text: string, emTag = '<em>'): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/\*([^*\n]+)\*/g, (m, t: string) => emTag + t + '</em>')
		.replace(/\r?\n/g, '<br>');
}

/** Whether the simple format can represent this HTML without losing markup. */
export function isSimple(html: string): boolean {
	return !/<(?!\/?(br|em)\b)[a-z]/i.test(html);
}
