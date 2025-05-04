import { ClientResponseError } from 'pocketbase';
import { pb } from '../pb';
import type { Toast } from '$states/toast';

export async function createFolder(data: {
	userId: string;
	parentId: string | null;
	name: string;
}) {
	let type: Toast['type'] = 'success';
	let message = 'Created folder successfully';

	try {
		await pb.collection('folders').create(data);
	} catch (error) {
		type = 'error';

		if (error instanceof ClientResponseError) {
			message = error.message;
		} else {
			message = 'Internal server error.';
		}
	}

	return { type, message };
}
