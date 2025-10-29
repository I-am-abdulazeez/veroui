<script setup lang="ts">
import type { IconSvgProps } from "../types";

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
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
    </svg>
</template>
