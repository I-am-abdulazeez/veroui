<script setup lang="ts">
import type { PropType } from "vue";
import { useButton } from "./use-button";

import type { Color, Radius, Size, SpinnerPlacement, Variant } from "./types";

const props = defineProps({
  as: {
    type: [String, Object] as PropType<string | any>,
    default: "button",
  },
  size: {
    type: String as PropType<Size>,
    default: "md",
  },
  color: {
    type: String as PropType<Color>,
    default: "default",
  },
  variant: {
    type: String as PropType<Variant>,
    default: "solid",
  },
  radius: {
    type: String as PropType<Radius>,
    default: undefined,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  isIconOnly: {
    type: Boolean,
    default: false,
  },
  disableRipple: {
    type: Boolean,
    default: true,
  },
  disableAnimation: {
    type: Boolean,
    default: false,
  },
  spinnerPlacement: {
    type: String as PropType<SpinnerPlacement>,
    default: "start",
  },
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button",
  },
  className: String,
  startContent: {
    type: null,
    default: undefined,
  },
  endContent: {
    type: null,
    default: undefined,
  },
  spinner: {
    type: null,
    default: undefined,
  },
  autoFocus: Boolean,
  onPress: Function as PropType<(e: MouseEvent) => void>,
  onClick: Function as PropType<(e: MouseEvent) => void>,
});

const slots = defineSlots<{
  default?: () => any;
  startContent?: () => any;
  endContent?: () => any;
}>();

const {
  Component,
  buttonProps,
  isIconOnly,
  startContent,
  endContent,
  isLoading,
} = useButton(props);
</script>

<template>
  <component :is="Component" v-bind="buttonProps">
    <slot v-if="slots.startContent" name="startContent" />
    <template v-else-if="startContent">
      {{ startContent }}
    </template>

    <slot v-if="!(isLoading && isIconOnly)" />

    <slot v-if="slots.endContent" name="endContent" />
    <template v-else-if="endContent">
      {{ endContent }}
    </template>
  </component>
</template>
