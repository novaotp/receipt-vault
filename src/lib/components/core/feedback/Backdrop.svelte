<script lang="ts">
	import { cn } from '$utils/cn';
	import { prefersReducedMotion } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	interface Props {
		class?: string;
		onclose?: () => void;
	}

	let { class: className = undefined, onclose }: Props = $props();
</script>

<!--
@component
A dimmed layer to use alongside modals.

The `onclose` property is called when the backdrop is clicked. It can be used to close the modal.

@example
```svelte
<Backdrop onclose={closeModal} />
```
-->

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onclick={onclose}
	transition:fade={{ duration: prefersReducedMotion.current ? 0 : 150 }}
	class={cn('fixed top-0 left-0 z-10 h-full w-full bg-black/50 backdrop-blur-[2px]', className)}
></div>
