<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';

	interface Props extends HTMLLabelAttributes {}

	let { children, ...restProps }: Props = $props();
</script>

<!--
@component
A pre-styled label for form controls.
-->

<label {...restProps}>
	{@render children?.()}
</label>
