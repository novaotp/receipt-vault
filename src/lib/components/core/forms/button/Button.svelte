<script lang="ts">
	import { cn } from '$utils/cn';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { buttonVariant, type ButtonVariant } from './variants.svelte';

	interface Props extends HTMLButtonAttributes {
		/** @default "primary" */
		variant?: ButtonVariant;
	}

	let {
		children,
		class: className,
		disabled,
		type = 'button',
		variant = 'primary',
		...restProps
	}: Props = $props();
</script>

<!--
@component
A pre-styled button.
-->

<button
	{type}
	{disabled}
	aria-disabled={disabled}
	class={cn(
		'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
		buttonVariant(variant),
		className
	)}
	{...restProps}
>
	{@render children?.()}
</button>
