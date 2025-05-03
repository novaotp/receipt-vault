<script lang="ts">
	import { cn } from '$utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {}

	let { class: className = undefined, value = $bindable(), ...restProps }: Props = $props();
</script>

<!--
@component
A pre-styled input.
-->

<input
	bind:value
	class={cn('relative h-[50px] w-full rounded-2xl border border-zinc-300 px-5 text-sm', className)}
	{...restProps}
/>
