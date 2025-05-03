<script lang="ts">
    import { cn } from "$utils/cn";

    interface Props {
        class?: string;
        src?: string;
        alt?: string;
        fallback?: string;
    }

    let { class: className = undefined, src, alt, fallback }: Props = $props();
</script>

<!--
@component
An avatar component with a fallback string.

The fallback is used if the `src` is empty or `undefined`.

If you want to edit the size of the avatar, change the width class.
You should also probably change the size of the fallback text.
```svelte
<Avatar class="w-20" />
```
-->

{#if src}
    <img
        {src}
        {alt}
        class={cn(
            "relative aspect-square w-10 rounded-full object-cover object-center shadow-inner",
            className
        )}
    />
{:else}
    <div
        class={cn(
            "relative grid aspect-square w-10 place-items-center rounded-full bg-zinc-800 text-white shadow-inner",
            className
        )}
    >
        {fallback}
    </div>
{/if}
