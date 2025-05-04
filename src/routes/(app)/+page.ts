import { pb } from '$services/pb';

export async function load({ parent, url }) {
	const parentData = await parent();

	const folderId = url.searchParams.get('folderId') ?? '';

	return {
		currentFolder: folderId ? await pb.collection('folders').getOne(folderId) : null,
		receipts: await pb.collection('receipts').getFullList({
			filter: `userId = '${parentData.user!.id}' && folderId = '${folderId}'`
		}),
		folders: await pb.collection('folders').getFullList({
			filter: `userId = '${parentData.user!.id}' && parentId = '${folderId}'`
		})
	};
}
