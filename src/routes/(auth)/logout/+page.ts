import { goto } from '$app/navigation';
import { pb } from '$services/pb';

export function load() {
	try {
		pb.authStore.clear();
		goto(`/login?message=${encodeURIComponent('Logged out successfully')}&type=success`);
	} catch (error) {
		console.error(error);
		goto(`/login?message=${encodeURIComponent('Internal Server Error')}&type=error`);
	}
}
