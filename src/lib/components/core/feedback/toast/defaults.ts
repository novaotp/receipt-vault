import type { ComponentType } from "svelte";
import type { Toast } from "$stores/toast/index.svelte";
import IconCircleCheckFilled from "@tabler/icons-svelte/icons/circle-check-filled";
import IconExclamationCircleFilled from "@tabler/icons-svelte/icons/exclamation-circle-filled";
import InfoIconFilled from "@tabler/icons-svelte/icons/info-circle-filled";

export const ICON_MAP: Record<Toast["type"], ComponentType> = {
    success: IconCircleCheckFilled,
    info: InfoIconFilled,
    error: IconExclamationCircleFilled
};

export const TEXT_COLOR_MAP: Record<Toast["type"], string> = {
    success: "text-green-500 dark:text-green-400",
    info: "text-blue-500 dark:text-sky-400",
    error: "text-red-500 dark:text-red-400"
};

export const BG_COLOR_MAP: Record<Toast["type"], string> = {
    success: "bg-green-500 dark:bg-green-400",
    info: "bg-blue-500 dark:bg-sky-400",
    error: "bg-red-500 dark:bg-red-400"
};
