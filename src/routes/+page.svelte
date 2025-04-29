<script lang="ts">
	import { Camera, CameraResultType } from '@capacitor/camera';

	let message = $state('');

	async function takePicture() {
		const image = await Camera.getPhoto({
			quality: 100,
			allowEditing: true,
			resultType: CameraResultType.Uri
		});

		// image.webPath will contain a path that can be set as an image src.
		// You can access the original file using image.path, which can be
		// passed to the Filesystem API to read the raw data of the image,
		// if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
		var imageUrl = image.webPath;
	}
</script>

<button onclick={takePicture}>get photo</button>
{message}
