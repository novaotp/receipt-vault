import { goto } from '$app/navigation';
import { pb } from '$services/pb';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	if (!pb.authStore.isValid) {
		const message = 'Please log in first to access the app.';
		return goto(`/login?${encodeURIComponent(message)}&type=error`);
	}
};
