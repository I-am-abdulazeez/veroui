<script setup lang="ts">
import type { PropType } from "vue";
import { useSpinner } from "./use-spinner";
import type {
  SpinnerVariant,
  SpinnerSize,
  SpinnerColor,
  SpinnerSlots,
} from "./types";

const props = defineProps({
  size: {
    type: String as PropType<SpinnerSize>,
    default: "md",
  },
  color: {
    type: String as PropType<SpinnerColor>,
    default: "primary",
  },
  variant: {
    type: String as PropType<SpinnerVariant>,
    default: "default",
  },
  label: {
    type: String,
    default: undefined,
  },
  classNames: {
    type: Object as PropType<Partial<Record<SpinnerSlots, string>>>,
    default: undefined,
  },
  className: {
    type: String,
    default: undefined,
  },
});

const { variant, label, slots, classNames, spinnerProps } = useSpinner(props);
</script>

<template>
  <!-- Wave or Dots variant -->
  <div v-if="variant === 'wave' || variant === 'dots'" v-bind="spinnerProps">
    <div :class="slots.wrapper({ class: classNames?.wrapper })">
      <i
        v-for="index in 3"
        :key="`dot-${index}`"
        :class="slots.dots({ class: classNames?.dots })"
        :style="{ '--dot-index': index - 1 }"
      />
    </div>
    <span v-if="label" :class="slots.label({ class: classNames?.label })">
      {{ label }}
    </span>
  </div>

  <!-- Simple variant -->
  <div v-else-if="variant === 'simple'" v-bind="spinnerProps">
    <svg
      :class="slots.wrapper({ class: classNames?.wrapper })"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        :class="slots.circle1({ class: classNames?.circle1 })"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        :class="slots.circle2({ class: classNames?.circle2 })"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
    <span v-if="label" :class="slots.label({ class: classNames?.label })">
      {{ label }}
    </span>
  </div>

  <!-- Spinner variant (12 bars) -->
  <div v-else-if="variant === 'spinner'" v-bind="spinnerProps">
    <div :class="slots.wrapper({ class: classNames?.wrapper })">
      <i
        v-for="index in 12"
        :key="`bar-${index}`"
        :class="slots.spinnerBars({ class: classNames?.spinnerBars })"
        :style="{ '--bar-index': index - 1 }"
      />
    </div>
    <span v-if="label" :class="slots.label({ class: classNames?.label })">
      {{ label }}
    </span>
  </div>

  <!-- Default variant (two circles) -->
  <div v-else v-bind="spinnerProps">
    <div :class="slots.wrapper({ class: classNames?.wrapper })">
      <i :class="slots.circle1({ class: classNames?.circle1 })" />
      <i :class="slots.circle2({ class: classNames?.circle2 })" />
    </div>
    <span v-if="label" :class="slots.label({ class: classNames?.label })">
      {{ label }}
    </span>
  </div>
</template>
