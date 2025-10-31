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
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        width="1em"
        v-bind="{ ...props } as {}"
    >
        <path d="m18 15-6-6-6 6" />
    </svg>
</template>
