<script setup lang="ts">
import type { PropType } from "vue";
import { useButton } from "./use-button";
import { Ripple } from "@veroui/ripple";
import type { Color, Radius, Size, SpinnerPlacement, Variant } from "./types";

const props = defineProps({
  as: {
    type: [String, Object] as PropType<string | any>,
    default: "button",
  },
  size: {
    type: String as PropType<Size>,
    default: undefined,
  },
  color: {
    type: String as PropType<Color>,
    default: undefined,
  },
  variant: {
    type: String as PropType<Variant>,
    default: undefined,
  },
  radius: {
    type: String as PropType<Radius>,
    default: undefined,
  },
  isDisabled: {
    type: Boolean,
    default: undefined,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: undefined,
  },
  isIconOnly: {
    type: Boolean,
    default: undefined,
  },
  disableRipple: {
    type: Boolean,
    default: undefined,
  },
  disableAnimation: {
    type: Boolean,
    default: undefined,
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
  spinner?: () => any;
}>();

const {
  Component,
  buttonProps,
  isIconOnly,
  startContent,
  endContent,
  isLoading,
  spinnerSize,
  spinnerPlacement,
  disableRipple,
  getSpinner,
  ripples,
  onClearRipple,
} = useButton(props);
</script>

<template>
  <component :is="Component" v-bind="buttonProps">
    <Ripple
      v-if="!disableRipple"
      :ripples="ripples"
      :on-clear="onClearRipple"
    />

    <!-- Start Content -->
    <slot v-if="slots.startContent" name="startContent" />
    <template v-else-if="startContent">
      {{ startContent }}
    </template>

    <!-- Spinner at start -->
    <slot
      v-if="isLoading && spinnerPlacement === 'start' && slots.spinner"
      name="spinner"
    />
    <component
      v-else-if="isLoading && spinnerPlacement === 'start'"
      :is="getSpinner"
      :size="spinnerSize"
      color="current"
    />

    <!-- Main Content (hide if loading and icon only) -->
    <slot v-if="!(isLoading && isIconOnly)" />

    <!-- Spinner at end -->
    <slot
      v-if="isLoading && spinnerPlacement === 'end' && slots.spinner"
      name="spinner"
    />
    <component
      v-else-if="isLoading && spinnerPlacement === 'end'"
      :is="getSpinner"
      :size="spinnerSize"
      color="current"
    />

    <!-- End Content -->
    <slot v-if="slots.endContent" name="endContent" />
    <template v-else-if="endContent">
      {{ endContent }}
    </template>
  </component>
</template>
