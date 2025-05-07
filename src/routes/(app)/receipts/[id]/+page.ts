import { pb } from '$services/pb';

export async function load({ params }) {
	return {
		receipt: await pb.collection('receipts').getOne(params.id)
	};
}
