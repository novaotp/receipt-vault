<script lang="ts">
	import { page } from '$app/state';
	import { toastManager } from '$states/toast';
	import { cn } from '$utils/cn';

	import IconLibraryPhoto from '@tabler/icons-svelte/icons/library-photo';
	import IconSettings from '@tabler/icons-svelte/icons/settings';
</script>

<nav
	class="fixed bottom-0 left-0 flex h-[60px] w-full items-center justify-evenly border-t-2 border-zinc-200 bg-white"
>
	<a href="/" class={cn('rounded-md p-2', page.url.pathname === '/' && 'bg-blue-700 text-white')}>
		<IconLibraryPhoto />
	</a>
	<button
		type="button"
		onclick={() => toastManager.info('Feature not yet implemented')}
		class={cn('rounded-md p-2')}
	>
		<IconSettings />
	</button>
</nav>
