import { getContext, setContext } from 'svelte';
import type { Site } from './site';

const KEY = Symbol('site');

export const setSite = (site: Site) => setContext(KEY, site);
export const getSite = () => getContext<Site>(KEY);
