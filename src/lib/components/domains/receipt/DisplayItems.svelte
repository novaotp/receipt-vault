<script lang="ts">
	import { pb } from '$services/pb';
	import { goto } from '$app/navigation';

	import IconFolderFilled from '@tabler/icons-svelte/icons/folder-filled';

	import type { FoldersRecord, ReceiptsRecord } from '$types/pocketbase-types';

	interface Props {
		folders: FoldersRecord[];
		receipts: ReceiptsRecord[];
	}

	let { folders, receipts }: Props = $props();
</script>

{#if folders.length === 0 && receipts.length === 0}
	<p>it looks empty in here... how about you add a new receipt :D</p>
{:else}
	{#each folders as folder (folder.id)}
		<button
			onclick={() => goto(`?folderId=${folder.id}`)}
			class="relative flex w-full cursor-pointer items-start justify-start gap-5"
		>
			<IconFolderFilled class="size-10 text-zinc-500" />
			<span>{folder.name}</span>
		</button>
	{/each}
	{#each receipts as receipt (receipt.id)}
		{@const src = pb.files.getURL(receipt, receipt.image, { thumb: '40x0' })}
		<a href="/receipts/{receipt.id}" class="relative flex w-full items-start justify-start gap-5">
			<img {src} alt="Receipt {receipt.name}" class="size-10" />
			<span>{receipt.name}</span>
		</a>
	{/each}
{/if}
