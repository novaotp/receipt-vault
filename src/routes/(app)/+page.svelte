<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { pb } from '$services/pb';
	import { getUser } from '$states/user';

	import New from '$components/domains/receipt/New.svelte';
	import DisplayItems from '$components/domains/receipt/DisplayItems.svelte';

	let { data } = $props();

	const user = getUser();

	let currentFolder = $derived(data.currentFolder);
	let folders = $derived(data.folders);
	let receipts = $derived(data.receipts);

	function back() {
		const href = currentFolder?.parentId ? `?folderId=${currentFolder.parentId}` : '/';
		goto(href);
	}

	onMount(async () => {
		await pb.collection('folders').subscribe('*', async () => {
			folders = await pb.collection('folders').getFullList({
				filter: `userId = '${user.id}' && parentId = '${currentFolder?.id ?? ''}'`
			});
		});

		await pb.collection('receipts').subscribe('*', async () => {
			receipts = await pb.collection('receipts').getFullList({
				filter: `userId = '${user.id}' && folderId = '${currentFolder?.id ?? ''}'`
			});
		});
	});
</script>

<svelte:head>
	<title>{currentFolder?.name ?? 'Home'} - Receipt Vault</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col items-start gap-5 p-5">
	{@render header()}
	<DisplayItems {folders} {receipts} />
	<New />
</main>

{#snippet header()}
	{#if currentFolder}
		<button onclick={back} class="cursor-pointer">
			<span>{currentFolder?.name}</span>
		</button>
	{:else}
		<span>Home</span>
	{/if}
{/snippet}
