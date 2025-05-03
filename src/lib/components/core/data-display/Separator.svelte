<script lang="ts">
    import { cn } from "$utils/cn";

    interface Props {
        class?: string;
        orientation?: "horizontal" | "vertical";
    }

    let { class: className = undefined, orientation = "horizontal" }: Props = $props();
</script>

<div
    role="separator"
    aria-orientation={orientation}
    class={cn(
        "relative bg-zinc-700",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
    )}
></div>
