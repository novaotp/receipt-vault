<script lang="ts">
	import { ToastContainer } from '$components/core';
	import '../app.css';

	let { children } = $props();
</script>

<ToastContainer />
{@render children()}
