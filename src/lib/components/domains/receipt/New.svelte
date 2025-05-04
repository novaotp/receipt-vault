<script lang="ts">
	import { page } from '$app/state';
	import { Camera, CameraResultType, CameraSource, type Photo } from '@capacitor/camera';

	import { createFolder, createReceipt } from '$services/pb';
	import { toastManager } from '$states/toast';
	import { getUser } from '$states/user';
	import { clickoutside } from '$lib/actions/click-outside.svelte';

	import { Backdrop, Button, Field, Input, Label, Modal } from '$components/core';
	import IconPlus from '@tabler/icons-svelte/icons/plus';
	import IconFolder from '@tabler/icons-svelte/icons/folder';
	import IconReceipt from '@tabler/icons-svelte/icons/receipt';
	import { dev } from '$app/environment';

	const user = getUser();

	let buttonNode = $state<HTMLButtonElement>()!;
	let modalState = $state<'menu' | 'receipt' | 'folder' | null>(null);

	let name = $state('');
	let photo = $state<Photo>();

	$inspect(modalState);

	function openModal(newState: typeof modalState) {
		modalState = newState;
	}

	function closeModal() {
		modalState = null;
	}

	function toggleMenu() {
		modalState = modalState === null ? 'menu' : null;
	}

	async function saveFolder() {
		if (!name) {
			return toastManager.error('The name field must be set');
		}

		const res = await createFolder({
			userId: user.id,
			parentId: page.url.searchParams.get('folderId'),
			name
		});
		toastManager.fromResponse(res);

		if (res.type === 'success') {
			modalState = null;
			name = '';
		}
	}

	async function takePicture() {
		openModal('receipt');

		try {
			photo = await Camera.getPhoto({
				quality: 100,
				allowEditing: true,
				resultType: CameraResultType.DataUrl,
				source: CameraSource.Camera
			});
		} catch (error) {
			modalState = null;

			const message = dev ? (error as Error).message : 'Internal server error.';
			return toastManager.error(message);
		}
	}

	async function saveReceipt() {
		if (!name || !photo || !photo.dataUrl) return;

		const response = await fetch(photo.dataUrl);
		const image = await response.blob();

		const res = await createReceipt({
			userId: user.id,
			folderId: page.url.searchParams.get('folderId'),
			name,
			image
		});
		toastManager.fromResponse(res);

		if (res.type === 'success') {
			name = '';
			modalState = null;
		}
	}
</script>

<Button
	bind:element={buttonNode}
	onclick={toggleMenu}
	class="fixed right-5 bottom-20 rounded-full p-4"
>
	<IconPlus class="pointer-events-none" />
</Button>

{#if modalState === 'menu'}
	<div
		use:clickoutside={{
			blacklist: [buttonNode],
			callback: closeModal
		}}
		class="fixed right-5 bottom-40 flex flex-col rounded-lg border border-zinc-100 bg-white p-2 shadow-lg"
	>
		<button
			onclick={takePicture}
			type="button"
			class="flex cursor-pointer items-center gap-[10px] rounded-md px-3 py-2 hover:bg-zinc-100"
		>
			<IconReceipt />
			<span>New Receipt</span>
		</button>
		<button
			onclick={() => openModal('folder')}
			type="button"
			class="flex cursor-pointer items-center gap-[10px] rounded-md px-3 py-2 hover:bg-zinc-100"
		>
			<IconFolder />
			<span>New Folder</span>
		</button>
	</div>
{:else if modalState === 'folder'}
	<Backdrop onclose={() => (modalState = null)} />
	<Modal class="gap-5">
		<Field>
			<Label for="name">Name *</Label>
			<Input id="name" bind:value={name} required />
		</Field>
		<Button onclick={saveFolder}>Create folder</Button>
	</Modal>
{:else if modalState === 'receipt' && photo}
	<Backdrop onclose={() => (photo = undefined)} />
	<Modal class="gap-5">
		<img src={photo.dataUrl} alt="Receipt - {name}" />
		<Field>
			<Label for="name">Name *</Label>
			<Input id="name" bind:value={name} required />
		</Field>
		<Button onclick={saveReceipt}>Create receipt</Button>
	</Modal>
{/if}
