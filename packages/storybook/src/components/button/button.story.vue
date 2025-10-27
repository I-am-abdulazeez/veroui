<script setup lang="ts">
import { reactive } from "vue";
import { Button } from "@veroui/button";
import { Icon } from "@iconify/vue";
import { logEvent } from "histoire/client";

function initState() {
  return reactive({
    children: "Button",
    variant: "solid",
    color: "default",
    size: "md",
    radius: "md",
    isDisabled: false,
    isLoading: false,
    disableRipple: false,
    disableAnimation: false,
    fullWidth: false,
    isIconOnly: false,
    spinnerPlacement: "start",
  });
}
</script>

<template>
  <Story title="Components/Button" :layout="{ type: 'grid', width: '100%' }">
    <!-- Default -->
    <Variant title="Default" :init-state="initState">
      <template #default="{ state }">
        <Button
          :variant="state.variant"
          :color="state.color"
          :size="state.size"
          :radius="state.radius"
          :is-disabled="state.isDisabled"
          :is-loading="state.isLoading"
          :disable-ripple="state.disableRipple"
          :disable-animation="state.disableAnimation"
          :full-width="state.fullWidth"
          :is-icon-only="state.isIconOnly"
          :spinner-placement="state.spinnerPlacement"
          @press="logEvent('Button pressed', $event)"
        >
          {{ state.children }}
        </Button>
      </template>

      <template #controls="{ state }">
        <HstText v-model="state.children" title="Children" />
        <HstSelect
          v-model="state.variant"
          title="Variant"
          :options="[
            'solid',
            'bordered',
            'light',
            'flat',
            'faded',
            'shadow',
            'ghost',
          ]"
        />
        <HstSelect
          v-model="state.color"
          title="Color"
          :options="[
            'default',
            'primary',
            'secondary',
            'success',
            'warning',
            'danger',
          ]"
        />
        <HstSelect
          v-model="state.size"
          title="Size"
          :options="['sm', 'md', 'lg']"
        />
        <HstSelect
          v-model="state.radius"
          title="Radius"
          :options="['none', 'sm', 'md', 'lg', 'full']"
        />
        <HstCheckbox v-model="state.isDisabled" title="Is Disabled" />
        <HstCheckbox v-model="state.isLoading" title="Is Loading" />
        <HstCheckbox v-model="state.disableRipple" title="Disable Ripple" />
        <HstCheckbox
          v-model="state.disableAnimation"
          title="Disable Animation"
        />
        <HstCheckbox v-model="state.fullWidth" title="Full Width" />
        <HstCheckbox v-model="state.isIconOnly" title="Is Icon Only" />
        <HstSelect
          v-model="state.spinnerPlacement"
          title="Spinner Placement"
          :options="['start', 'end']"
        />
      </template>
    </Variant>

    <!-- With Icons -->
    <Variant title="With Icons">
      <Button color="primary">
        <template #startContent>
          <Icon icon="lucide:bell" />
        </template>
        Notifications
        <template #endContent>
          <Icon icon="lucide:camera" />
        </template>
      </Button>
    </Variant>

    <!-- Icon Only -->
    <Variant title="Icon Only">
      <Button is-icon-only color="primary">
        <Icon icon="lucide:headphones" class="w-5 h-5" />
      </Button>
    </Variant>

    <!-- Loading -->
    <Variant title="Loading">
      <Button color="primary" is-loading> Loading </Button>
    </Variant>

    <!-- Custom Gradient -->
    <Variant title="Custom with Classes">
      <Button
        radius="full"
        class="bg-linear-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      >
        Gradient Button
      </Button>
    </Variant>
  </Story>
</template>
