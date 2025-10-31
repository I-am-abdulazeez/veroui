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
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        width="1em"
        v-bind="{ ...props } as {}"
    >
        <path d="M13 17l5-5-5-5" />
        <path d="M6 17l5-5-5-5" />
    </svg>
</template>
