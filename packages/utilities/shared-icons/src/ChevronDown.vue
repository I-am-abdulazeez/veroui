<script setup lang="ts">
import type { IconSvgProps } from "./types";

const props = withDefaults(defineProps<IconSvgProps>(), {
    "stroke-width": 1.5,
});
</script>

<template>
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        :strokeWidth="props['stroke-width']"
        viewBox="0 0 24 24"
        width="1em"
        v-bind="{ ...props } as {}"
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
</template>
