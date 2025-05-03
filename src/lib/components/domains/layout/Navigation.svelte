<script lang="ts">
	import { NewReceipt } from '$components/domains/photo';
	import IconLibraryPhoto from '@tabler/icons-svelte/icons/library-photo';
	import IconSettings from '@tabler/icons-svelte/icons/settings';
</script>

<nav
	class="fixed bottom-0 left-0 flex h-[60px] w-full items-center justify-evenly border-t-2 border-zinc-200 bg-white"
>
	<IconLibraryPhoto />
	<div class="relative -top-1/2">
		<NewReceipt />
	</div>
	<IconSettings />
</nav>
