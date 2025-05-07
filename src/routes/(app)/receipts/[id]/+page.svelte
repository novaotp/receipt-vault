<script lang="ts">
	import { deleteReceipt, pb } from '$services/pb';
	import { Backdrop, Button, Modal } from '$components/core';

	import IconChevronLeft from '@tabler/icons-svelte/icons/chevron-left';
	import IconTrash from '@tabler/icons-svelte/icons/trash';
	import IconDownload from '@tabler/icons-svelte/icons/download';
	import { toastManager } from '$states/toast/index.svelte.js';
	import { goto } from '$app/navigation';

	let { data } = $props();

	let showDeleteConfirmation = $state(false);

	let receipt = $derived(data.receipt);
	let imageURL = $derived.by(() => {
		return pb.files.getURL(receipt, receipt.image);
	});

	async function urlToBlob(url: string) {
		return fetch(url).then((response) => response.blob());
	}

	async function downloadReceipt() {
		const objectUrl = URL.createObjectURL(await urlToBlob(imageURL));

		const link = document.createElement('a');
		link.href = objectUrl;
		link.download = receipt.name;
		link.target = '_blank';

		link.click();
		URL.revokeObjectURL(objectUrl);
	}

	async function destroyReceipt() {
		const response = await deleteReceipt(receipt.id);
		toastManager.fromResponse(response);

		goto(`/?folderId=${receipt.folderId}`);
	}
</script>

<svelte:head>
	<title>{receipt.name} | Receipts - Receipt Vault</title>
</svelte:head>

<div class="relative flex h-full w-full flex-col">
	<header class="relative flex w-full items-center justify-between p-5">
		<button
			onclick={() => history.back()}
			class="flex cursor-pointer items-center gap-5 border-b-2 border-transparent py-1.5 hover:border-black"
		>
			<IconChevronLeft />
			<span>Back</span>
		</button>
		<div class="flex gap-5">
			<Button
				onclick={() => (showDeleteConfirmation = true)}
				variant="destructive"
				class="rounded-md p-2"
			>
				<IconTrash />
			</Button>
			<Button onclick={downloadReceipt} class="rounded-md p-2">
				<IconDownload />
			</Button>
		</div>
	</header>
	<main class="relative flex w-full grow flex-col">
		<div class="relative flex h-[calc(100%-5rem)] w-full items-center justify-center bg-black">
			<img src={imageURL} alt="Receipt {receipt.name}" class="max-h-full max-w-full" />
		</div>
		<div class="relative flex h-20 w-full items-center justify-start p-5">
			<p>{receipt.name}</p>
		</div>
	</main>
</div>

{#if showDeleteConfirmation}
	<Backdrop onclose={() => (showDeleteConfirmation = false)} />
	<Modal>
		<h2 class="text-xl font-semibold">Delete "{receipt.name}" ?</h2>
		<p class="text-zinc-500">This action cannot be undone in the future.</p>
		{#snippet actions()}
			<Button onclick={() => (showDeleteConfirmation = false)} variant="secondary">Cancel</Button>
			<Button onclick={destroyReceipt} variant="destructive">Delete</Button>
		{/snippet}
	</Modal>
{/if}
