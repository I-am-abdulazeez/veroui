<script setup lang="ts">
import type { IconSvgProps } from "./types";

const props = defineProps<IconSvgProps>();
</script>

<template>
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        v-bind="{ ...props } as {}"
    >
        <path
            d="M15.5 19l-7-7 7-7"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
        />
    </svg>
</template>
