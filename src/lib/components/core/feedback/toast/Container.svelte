<script lang="ts">
	import { toastManager } from '$states/toast';
	import Toast from './Toast.svelte';
</script>

<!--
@component
A container that holds toast notifications created via the `ToastManager` API.
-->

<div
	class="fixed right-5 bottom-5 z-[1000] flex w-[calc(100%-40px)] flex-col justify-center gap-2 sm:w-auto md:max-w-[480px]"
>
	{#each toastManager.toasts as toast (toast.id)}
		<Toast type={toast.type} ondismiss={() => toastManager.dismiss(toast.id)}>
			{toast.message}
		</Toast>
	{/each}
</div>
