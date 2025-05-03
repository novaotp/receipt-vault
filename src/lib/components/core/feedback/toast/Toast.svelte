<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import { cn } from '$utils/cn';
	import { TEXT_COLOR_MAP, ICON_MAP, BG_COLOR_MAP } from './defaults';
	import CloseIcon from '@tabler/icons-svelte/icons/x';
	import type { Snippet } from 'svelte';
	import type { Toast } from '$states/toast';

	interface Props {
		type: Toast['type'];
		ondismiss: () => void;
		children: Snippet;
	}

	let { children, ondismiss, type }: Props = $props();

	let Icon = $derived(ICON_MAP[type]);
</script>

<!--
@component
A toast component to display a message with an icon and a close button.

Primarily used via the ToastManager (src/lib/stores/toast/index.svelte.js) API, which allows spawning toasts programmatically.
-->

<div
	role="alert"
	transition:fade={{ duration: prefersReducedMotion.current ? 0 : 150 }}
	class={cn(
		'relative flex w-full items-center gap-4 overflow-hidden rounded-lg border px-4 py-3 shadow-md',
		'border-zinc-200 bg-white'
	)}
>
	<div class="absolute top-0 left-0 h-full w-1 {BG_COLOR_MAP[type]}"></div>
	<Icon class="min-h-6 min-w-6 {TEXT_COLOR_MAP[type]}" />
	<p class="flex-grow text-sm">
		{@render children()}
	</p>
	<button class="cursor-pointer border-none bg-transparent" onclick={ondismiss}>
		<CloseIcon class="size-6" />
	</button>
</div>
