<script setup lang="ts">
import { computed } from "vue";
// import { Spinner } from "@veroui/spinner";
// import { Ripple } from "@veroui/ripple";
import { useButton, type UseButtonProps } from "./use-button";

export interface ButtonProps extends /* @vue-ignore */ UseButtonProps {
  /**
   * Button content (default slot will be used if not provided)
   */
  children?: any;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  as: "button",
  size: "md",
  color: "default",
  variant: "solid",
  spinnerPlacement: "start",
  isLoading: false,
  isDisabled: false,
  disableRipple: false,
  disableAnimation: false,
  isIconOnly: false,
  fullWidth: false,
  type: "button",
});

const slots = defineSlots<{
  default?: () => any;
  startContent?: () => any;
  endContent?: () => any;
  spinner?: () => any;
}>();

const {
  Component,
  buttonRef,
  // spinnerSize,
  spinner: defaultSpinner,
  spinnerPlacement,
  startContent,
  endContent,
  isLoading,
  disableRipple,
  buttonProps,
  rippleProps,
  isIconOnly,
} = useButton(props);

// Use custom spinner from slot or default
const spinnerContent = computed(
  () => slots.spinner?.() || props.spinner || defaultSpinner
);
</script>

<template>
  <component :is="Component" v-bind="buttonProps">
    <!-- Start content -->
    <slot v-if="slots.startContent" name="startContent" />
    <template v-else-if="startContent">
      {{ startContent }}
    </template>

    <!-- Loading spinner at start -->
    <!-- <component
      v-if="isLoading && spinnerPlacement === 'start'"
      :is="Spinner"
      color="current"
      :size="spinnerSize"
    >
      {{ spinnerContent }}
    </component> -->

    <!-- Main content (hidden if loading and icon-only) -->
    <slot v-if="!(isLoading && isIconOnly)" />

    <!-- Loading spinner at end -->
    <!-- <component
      v-if="isLoading && spinnerPlacement === 'end'"
      :is="Spinner"
      color="current"
      :size="spinnerSize"
    >
      {{ spinnerContent }}
    </component> -->

    <!-- End content -->
    <slot v-if="slots.endContent" name="endContent" />
    <template v-else-if="endContent">
      {{ endContent }}
    </template>

    <!-- Ripple effect -->
    <Ripple v-if="!disableRipple" v-bind="rippleProps" />
  </component>
</template>
