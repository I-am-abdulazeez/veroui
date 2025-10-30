<script setup lang="ts">
import { ref, watch, type PropType, ComponentPublicInstance } from "vue";
import { animate } from "motion-v";
import { clamp } from "@veroui/shared-utils";
import type { RippleType } from "./types";

const props = defineProps({
  ripples: {
    type: Array as PropType<RippleType[]>,
    default: () => [],
  },
  color: {
    type: String,
    default: "currentColor",
  },
  onClear: {
    type: Function as PropType<(key: string) => void>,
    required: true,
  },
});

const rippleRefs = ref<Map<string, HTMLElement>>(new Map());

const getDuration = (size: number) => {
  return clamp(0.01 * size, 0.2, size > 100 ? 0.75 : 0.5);
};

const setRippleRef = (el: HTMLElement | null, key: string) => {
  if (el) {
    rippleRefs.value.set(key, el);
  }
};

// Animate ripples when they're added
watch(
  () => props.ripples,
  (newRipples, oldRipples) => {
    const oldKeys = new Set((oldRipples || []).map((r) => r.key));
    const newOnes = newRipples.filter((r) => !oldKeys.has(r.key));

    newOnes.forEach((ripple) => {
      const el = rippleRefs.value.get(ripple.key);
      if (!el) return;

      const duration = getDuration(ripple.size);

      animate(
        el,
        {
          transform: ["scale(0)", "scale(2)"],
          opacity: [0.35, 0],
        },
        {
          duration,
          ease: [0.4, 0, 0.2, 1], // cubic-bezier
        }
      ).finished.then(() => {
        props.onClear(ripple.key);
        rippleRefs.value.delete(ripple.key);
      });
    });
  },
  { deep: true }
);
</script>

<template>
  <span class="veroui-ripple-container">
    <span
      v-for="ripple in ripples"
      :key="ripple.key"
      :ref="(el: Element | ComponentPublicInstance | null) => setRippleRef(el as HTMLElement | null, ripple.key)"
      class="veroui-ripple"
      :style="{
        top: `${ripple.y}px`,
        left: `${ripple.x}px`,
        width: `${ripple.size}px`,
        height: `${ripple.size}px`,
      }"
    />
  </span>
</template>

<style>
.veroui-ripple-container {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  border-radius: inherit;
}

.veroui-ripple {
  position: absolute;
  background-color: currentColor;
  border-radius: 50%;
  pointer-events: none;
  transform-origin: center;
  will-change: transform, opacity;
}
</style>
