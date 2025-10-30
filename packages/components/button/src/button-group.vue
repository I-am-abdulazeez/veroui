<script setup lang="ts">
import type { PropType } from "vue";
import { provideButtonGroupContext } from "./button-group-context";
import { useButtonGroup } from "./use-button-group";
import type { Color, Radius, Size, Variant } from "./types";

const props = defineProps({
  as: {
    type: [String, Object] as PropType<string | any>,
    default: "div",
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
    default: false,
  },
  disableAnimation: {
    type: Boolean,
    default: false,
  },
  className: String,
});

const { Component, context, buttonGroupProps } = useButtonGroup(props);

provideButtonGroupContext(context);
</script>

<template>
  <component :is="Component" v-bind="buttonGroupProps">
    <slot />
  </component>
</template>
