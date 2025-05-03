<script lang="ts">
	import { Camera, CameraResultType, CameraSource, type Photo } from '@capacitor/camera';
	import { dev } from '$app/environment';
	import { toastManager } from '$states/toast';
	import { Backdrop, Button, Field, Input, Label, Modal } from '$components/core';
	import IconPlus from '@tabler/icons-svelte/icons/plus';
	import { getUser } from '$states/user';
	import { createReceipt } from '$services/pb';

	const user = getUser();

	let photo = $state<Photo>();
	let name = $state('');

	async function takePicture() {
		try {
			photo = await Camera.getPhoto({
				quality: 100,
				allowEditing: true,
				resultType: CameraResultType.DataUrl,
				source: CameraSource.Camera
			});
		} catch (error) {
			if (dev) {
				return toastManager.error((error as Error).message, { duration: Infinity });
			}

			return toastManager.error('Internal server error.');
		}
	}

	async function save() {
		if (!name || !photo || !photo.dataUrl) return;

		const response = await fetch(photo.dataUrl);
		const image = await response.blob();

		const res = await createReceipt(user.id, name, image);
		toastManager.fromResponse(res);
	}
</script>

<Button onclick={takePicture} class="rounded-full p-4">
	<IconPlus />
</Button>

{#if photo}
	<Backdrop onclose={() => (photo = undefined)} />
	<Modal class="gap-5">
		<img src={photo.dataUrl} alt="Receipt - {name}" />
		<Field>
			<Label for="name">Name</Label>
			<Input id="name" bind:value={name} />
		</Field>
		<Button onclick={save}>Save</Button>
	</Modal>
{/if}
