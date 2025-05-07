import { ClientResponseError } from 'pocketbase';
import { pb } from '../pb';
import type { Toast } from '$states/toast';

export async function createReceipt(data: {
	userId: string;
	folderId: string | null;
	name: string;
	image: Blob;
}) {
	let type: Toast['type'] = 'success';
	let message = 'Created receipt successfully';

	try {
		await pb.collection('receipts').create(data);
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

export async function deleteReceipt(id: string) {
	let type: Toast['type'] = 'success';
	let message = 'Deleted receipt successfully';

	try {
		await pb.collection('receipts').delete(id);
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
