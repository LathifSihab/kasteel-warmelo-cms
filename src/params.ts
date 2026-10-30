import { defineParams } from '@sveltejs/kit/params';

export const params = defineParams({
	// Dutch is the default and has no prefix; /en/… and /de/… are the other languages
	lang: (p) => (p === 'en' || p === 'de' ? p : undefined)
});
