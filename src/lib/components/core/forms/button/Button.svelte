<script lang="ts">
	import { cn } from '$utils/cn';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { buttonVariant, type ButtonVariant } from './variants.svelte';

	interface Props extends HTMLButtonAttributes {
		element?: HTMLButtonElement;
		/** @default "primary" */
		variant?: ButtonVariant;
	}

	let {
		children,
		class: className,
		disabled,
		element = $bindable(),
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
	bind:this={element}
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
