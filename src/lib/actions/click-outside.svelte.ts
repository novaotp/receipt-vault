import type { Action } from 'svelte/action';
import { on } from 'svelte/events';

export const clickoutside: Action<
	HTMLElement,
	{ blacklist: HTMLElement[]; callback: () => void }
> = (node, { blacklist, callback }) => {
	$effect(() => {
		return on(window, 'click', (event) => {
			if (
				event.target &&
				event.target !== node &&
				!node.contains(event.target as Node) &&
				blacklist.every((b) => b !== event.target && !b.contains(event.target as Node))
			) {
				callback();
			}
		});
	});
};
