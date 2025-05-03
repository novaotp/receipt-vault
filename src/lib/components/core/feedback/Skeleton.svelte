<script lang="ts">
	import { cn } from '$utils/cn';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {}

	let { class: className = undefined, ...restProps }: Props = $props();
</script>

<!--
@component
A placeholder component to display while the content is loading.
-->

<div class={cn('animate-pulse rounded-lg bg-zinc-200', className)} {...restProps}></div>
