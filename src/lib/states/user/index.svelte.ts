import { getContext, setContext } from 'svelte';
import { goto } from '$app/navigation';
import { pb } from '$services/pb';
import type { UsersRecord } from '$types/pocketbase-types';

const USER_KEY = Symbol('USER_KEY');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let user = $state(pb.authStore.record as unknown as UsersRecord);

export function getUser(): UsersRecord {
	return getContext(USER_KEY);
}

export function setUser(user: UsersRecord): UsersRecord {
	return setContext(USER_KEY, user);
}

$effect.root(() => {
	$effect(() => {
		return pb.authStore.onChange((_, record) => {
			if (!record) {
				return goto('/login');
			}

			user = record as unknown as UsersRecord;
		}, true);
	});
});
