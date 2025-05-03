import { pb } from '$services/pb';

export async function load({ parent }) {
	await parent();

	return {
		receipts: await pb.collection('receipts').getFullList()
	};
}
