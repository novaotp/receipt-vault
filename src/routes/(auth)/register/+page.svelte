<script lang="ts">
	import { ClientResponseError } from 'pocketbase';
	import { goto } from '$app/navigation';
	import { pb } from '$services/pb';
	import { toastManager } from '$states/toast/index.svelte';
	import { Button, Field, Input, Label } from '$components/core';
	import type { FormSubmitEvent } from '$types';

	let isLoading = $state(false);
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	const handleError = (message: string) => {
		isLoading = false;
		toastManager.error(message);
		password = '';
		confirmPassword = '';
	};

	async function onsubmit(event: FormSubmitEvent) {
		event.preventDefault();

		isLoading = true;

		if (!email || !password || !confirmPassword) {
			return handleError('All fields are required.');
		}

		if (password.length < 8) {
			return handleError('Password must be at least 8 characters long.');
		}

		if (password !== confirmPassword) {
			return handleError('Passwords do not match.');
		}

		const data = {
			email,
			emailVisibility: true,
			password,
			passwordConfirm: confirmPassword
		};

		try {
			await pb.collection('users').create(data);
			await pb.collection('users').authWithPassword(email, password);
		} catch (error) {
			if (error instanceof ClientResponseError) {
				return handleError(error.message);
			}

			return handleError('Internal server error.');
		}

		isLoading = false;
		toastManager.success('Registered account successfully.');
		goto('/');
	}
</script>

<svelte:head>
	<title>Register - Receipt Vault</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col items-center justify-center gap-10 p-5">
	<h1 class="text-3xl font-semibold">Register</h1>
	<form {onsubmit} class="relative flex w-full max-w-md flex-col items-center justify-center gap-5">
		<Field>
			<Label for="email">Email</Label>
			<Input
				bind:value={email}
				id="email"
				name="email"
				type="email"
				placeholder="Enter your email..."
			/>
		</Field>
		<Field>
			<Label for="password">Password</Label>
			<Input
				bind:value={password}
				id="password"
				name="password"
				type="password"
				placeholder="Enter your password..."
			/>
		</Field>
		<Field>
			<Label for="confirmPassword">Confirm password</Label>
			<Input
				bind:value={confirmPassword}
				id="confirmPassword"
				name="confirmPassword"
				type="password"
				placeholder="Enter your password again..."
			/>
		</Field>
		<Button type="submit" disabled={isLoading}>Register</Button>
	</form>
	<p class="text-sm text-zinc-500">
		Already have an account ? <a href="/login" class="text-blue-600 hover:underline">Log in</a>
	</p>
</main>
