<script lang="ts">
	import { cn } from '$utils/cn';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {}

	let { children, class: className = undefined, ...restProps }: Props = $props();
</script>

<!--
@component
A pre-styled container for wrapping labels and form controls.
-->

<div
	class={cn('relative flex w-full flex-col items-start justify-center gap-[10px]', className)}
	{...restProps}
>
	{@render children?.()}
</div>
