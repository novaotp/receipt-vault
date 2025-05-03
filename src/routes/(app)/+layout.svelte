<script lang="ts">
	import { pb } from '$services/pb';
	import { toastManager } from '$states/toast';
	import { setUser } from '$states/user';
	import { Button } from '$components/core';
	import { Navigation } from '$components/domains/layout';
	import type { UsersRecord } from '$types/pocketbase-types';

	let { children } = $props();

	const user = setUser(pb.authStore.record as unknown as UsersRecord);

	async function requestEmailVerification() {
		const isSent = await pb.collection('users').requestVerification(user.email);

		if (!isSent) {
			return toastManager.error(
				'Unable to request verification. Please try again later or contact support.'
			);
		}

		return toastManager.success('Verification email sent successfully. Check your inbox.');
	}
</script>

{#if user.verified}
	{@render children()}
	<Navigation />
{:else}
	<div
		class="fixed top-0 left-0 flex h-full w-full flex-col items-center justify-center gap-10 p-5"
	>
		<h1 class="text-2xl font-semibold">It looks like you are not verified.</h1>
		<p>
			Your account is not verified yet. To prevent spam accounts, we kindly ask you to click on the
			link in the verification email to comfirm your identity.
		</p>
		<Button onclick={requestEmailVerification}>Request email</Button>
		<p class="text-sm text-zinc-500">
			Need help ? <a href="/contact-us" class="text-blue-600 hover:underline">Contact Us</a>
		</p>
	</div>
{/if}
