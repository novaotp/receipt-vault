<script lang="ts">
	import { pb } from '$services/pb';
	import { toastManager } from '$states/toast';
	import { Button, Field, Input, Label } from '$components/core';
	import type { FormSubmitEvent } from '$types';

	let email = $state('');

	async function onsubmit(event: FormSubmitEvent) {
		event.preventDefault();

		if (!email) {
			return toastManager.error('Email is required.');
		}

		requestPasswordReset(email);
	}

	async function requestPasswordReset(email: string) {
		const isSent = await pb.collection('users').requestPasswordReset(email);

		if (!isSent) {
			return toastManager.error(
				'Unable to send password reset email. Please try again later or contact support.'
			);
		}

		return toastManager.success('Password reset email sent successfully. Check your inbox.');
	}
</script>

<svelte:head>
	<title>Reset Password - Receipt Vault</title>
</svelte:head>

<main class="relative flex h-full w-full items-center justify-center p-5">
	<div class="relative flex h-full w-full max-w-md flex-col items-center justify-center gap-10">
		<h1 class="text-3xl font-semibold">Reset password</h1>
		<form {onsubmit} class="relative flex w-full flex-col items-center justify-center gap-5">
			<Field>
				<Label for="email">Email</Label>
				<Input
					bind:value={email}
					id="email"
					type="email"
					placeholder="Enter your email..."
					required
				/>
			</Field>
			<Button type="submit">Request email</Button>
		</form>
	</div>
</main>
