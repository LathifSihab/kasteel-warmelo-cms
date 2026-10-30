const ENTITIES: Record<string, string> = {
	amp: '&',
	lt: '<',
	gt: '>',
	quot: '"',
	apos: "'",
	nbsp: '\u00a0',
	shy: '\u00ad'
};

export function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

/** HTML fragment → plain text (for <title>, meta tags and placeholders). */
export function toPlain(html: string): string {
	return html
		.replace(/<br\s*\/?>/gi, ' ')
		.replace(/<[^>]*>/g, '')
		.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
			if (e[0] === '#')
				return String.fromCodePoint(
					parseInt(e.slice(e[1] === 'x' ? 2 : 1), e[1] === 'x' ? 16 : 10)
				);
			return ENTITIES[e.toLowerCase()] ?? m;
		})
		.replace(/\s+/g, ' ')
		.trim();
}
