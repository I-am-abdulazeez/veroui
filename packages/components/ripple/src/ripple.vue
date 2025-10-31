<script setup lang="ts">
import { type PropType } from "vue";
import { motion, AnimatePresence } from "motion-v";
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

const getDuration = (size: number) => {
  return clamp(0.01 * size, 0.2, size > 100 ? 0.75 : 0.5);
};

const getRippleStyle = (ripple: RippleType) => {
  return {
    position: "absolute",
    backgroundColor: props.color,
    borderRadius: "100%",
    transformOrigin: "center",
    pointerEvents: "none",
    overflow: "hidden",
    inset: 0,
    zIndex: 0,
    top: `${ripple.y}px`,
    left: `${ripple.x}px`,
    width: `${ripple.size}px`,
    height: `${ripple.size}px`,
  };
};

const handleMotionComplete = (ripple: RippleType) => {
  props.onClear(ripple.key);
};
</script>

<template>
  <AnimatePresence>
    <motion.span
      v-for="ripple in ripples"
      :key="ripple.key"
      class="veroui-ripple"
      :initial="{ transform: 'scale(0)', opacity: 0.35 }"
      :animate="{ transform: 'scale(2)', opacity: 0 }"
      :exit="{ opacity: 0 }"
      :transition="{
        duration: getDuration(ripple.size),
      }"
      :style="getRippleStyle(ripple)"
      @motion-complete="handleMotionComplete(ripple)"
    />
  </AnimatePresence>
</template>

<style scoped>
.veroui-ripple {
  /* Just for will-change optimization */
  will-change: transform, opacity;
}
</style>
