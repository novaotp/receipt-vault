<script lang="ts">
	import { cn } from '$utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		type?: 'checkbox';
	}

	let {
		checked = $bindable(),
		class: className = undefined,
		type = 'checkbox',
		...restProps
	}: Props = $props();
</script>

<!--
@component
A pre-styled input.
-->

<input
	type="checkbox"
	bind:checked
	class={cn('relative cursor-pointer border border-zinc-300 accent-blue-600', className)}
	{...restProps}
/>
