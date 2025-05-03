<script lang="ts">
	import { cn } from '$utils/cn';
	import IconCircleCheckFilled from '@tabler/icons-svelte/icons/circle-check-filled';
	import IconAlertTriangleFilled from '@tabler/icons-svelte/icons/alert-triangle-filled';
	import IconInfoCircleFilled from '@tabler/icons-svelte/icons/info-circle-filled';
	import IconExclamationCircleFilled from '@tabler/icons-svelte/icons/exclamation-circle-filled';
	import type { Snippet } from 'svelte';
	import type { BannerType } from './types';

	interface Props {
		children?: Snippet;
		class?: string;
		/** @default "info" */
		type?: BannerType;
	}

	let { children, class: className = '', type = 'info' }: Props = $props();

	let { bgColor, Icon, iconColor } = $derived.by(() => {
		switch (type) {
			case 'success':
				return {
					bgColor: 'bg-green-50',
					Icon: IconCircleCheckFilled,
					iconColor: 'text-green-500'
				};
			case 'warning':
				return {
					bgColor: 'bg-yellow-50',
					Icon: IconAlertTriangleFilled,
					iconColor: 'text-yellow-500'
				};
			case 'info':
				return {
					bgColor: 'bg-blue-50',
					Icon: IconInfoCircleFilled,
					iconColor: 'text-blue-500'
				};
			case 'error':
				return {
					bgColor: 'bg-red-100',
					Icon: IconExclamationCircleFilled,
					iconColor: 'text-red-500'
				};
		}
	});
</script>

<div
	role="alert"
	class={cn('relative flex w-full items-center gap-5 rounded-2xl p-5', bgColor, className)}
>
	<Icon class="min-h-6 min-w-6 {iconColor}" />
	<span>{@render children?.()}</span>
</div>
