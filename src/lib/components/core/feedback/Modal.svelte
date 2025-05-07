<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import { flyAndScale } from '$utils/transitions/fly-and-scale';
	import { cn } from '$utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		actions?: Snippet;
		children?: Snippet;
		class?: string;
	}

	let { actions, children, class: className = undefined, ...restProps }: Props = $props();
</script>

<!--
@component
A centered-dialog that interupts the flow of the page, used alongside backdrops.
-->

<article
	transition:flyAndScale={{ duration: prefersReducedMotion.current ? 0 : 150 }}
	class={cn(
		'fixed top-1/2 left-0 z-10 flex max-h-[85%] w-full -translate-y-1/2',
		'flex-col gap-5 overflow-auto bg-white p-5 shadow-2xl',
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<div class="relative flex w-full flex-col gap-[10px]">
		{@render actions?.()}
	</div>
</article>
