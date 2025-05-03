import { ClientResponseError } from 'pocketbase';
import { pb } from '../pb';
import type { Toast } from '$states/toast';

export async function createReceipt(userId: string, name: string, image: Blob) {
	let type: Toast['type'] = 'success';
	let message = 'Created receipt successfully';

	try {
		await pb.collection('receipts').create({ userId, name, image });
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
