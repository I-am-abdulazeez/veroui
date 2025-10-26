<script setup lang="ts">
import { provideButtonGroupContext } from "./button-group-context";
import { useButtonGroup } from "./use-button-group";
import type { ButtonGroupProps } from "./types";

const props = withDefaults(defineProps</* @vue-ignore */ ButtonGroupProps>(), {
  as: "div",
  size: "md",
  color: "default",
  variant: "solid",
  isDisabled: false,
  isIconOnly: false,
  disableRipple: false,
  disableAnimation: false,
  fullWidth: false,
});

const { Component, context, buttonGroupProps } = useButtonGroup(props);

// Provide context to child buttons
provideButtonGroupContext(context.value);
</script>

<template>
  <component :is="Component" v-bind="buttonGroupProps">
    <slot />
  </component>
</template>
