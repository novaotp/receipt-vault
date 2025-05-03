<script lang="ts">
	import { ClientResponseError } from 'pocketbase';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { pb } from '$services/pb';
	import { toastManager } from '$states/toast/index.svelte';
	import { Banner, Button, Checkbox, Field, Input, Label, toBannerType } from '$components/core';
	import type { FormSubmitEvent } from '$lib/types';

	let isLoading = $state(false);
	let email = $state('');
	let password = $state('');
	let rememberMe = $state(false);

	const searchParams = $derived(page.url.searchParams);

	async function onsubmit(event: FormSubmitEvent) {
		event.preventDefault();

		isLoading = true;

		if (!email || !password) {
			return handleError('All fields are required.');
		}

		try {
			await pb.collection('users').authWithPassword(email, password);
		} catch (error) {
			if (error instanceof ClientResponseError) {
				return handleError(error.message);
			}

			return handleError('Internal server error.');
		}

		isLoading = false;
		toastManager.success('Logged in successfully.');
		goto('/');
	}

	function handleError(message: string): void {
		isLoading = false;
		toastManager.error(message);
		password = '';
	}
</script>

<svelte:head>
	<title>Login - Receipt Vault</title>
</svelte:head>

<main class="relative flex h-full w-full items-center justify-center p-5">
	<div class="relative flex h-full w-full max-w-md flex-col items-center justify-center gap-10">
		{#if searchParams.has('message')}
			<Banner type={toBannerType(searchParams.get('type'))}>
				{searchParams.get('message')}
			</Banner>
		{/if}
		<h1 class="text-3xl font-semibold">Login</h1>
		<form {onsubmit} class="relative flex w-full flex-col items-center justify-center gap-5">
			<Field>
				<Label for="email">Email</Label>
				<Input bind:value={email} id="email" type="email" placeholder="Enter your email..." />
			</Field>
			<Field>
				<Label for="password">Password</Label>
				<Input
					bind:value={password}
					id="password"
					type="password"
					placeholder="Enter your password..."
				/>
			</Field>
			<div class="relative flex w-full items-center justify-between text-sm">
				<Field class="w-auto flex-row items-center">
					<Checkbox bind:checked={rememberMe} id="remember-me" />
					<Label for="remember-me">Remember me</Label>
				</Field>
				<a href="/reset-password" class="text-blue-600 hover:underline">Forgot password ?</a>
			</div>
			<Button type="submit" disabled={isLoading}>Log in</Button>
		</form>
		<p class="text-sm text-zinc-500">
			Don't have an account ? <a href="/register" class="text-blue-600 hover:underline">Register</a>
		</p>
	</div>
</main>
