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
    disableRipple: true,
    disableAnimation: false,
    fullWidth: false,
    isIconOnly: false,
    spinnerPlacement: "start",
  });
}
</script>

<template>
  <Story title="Components/Button" :layout="{ type: 'single', iframe: false }">
    <!-- Default - WITH REACTIVE STATE -->
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
          @click="logEvent('Button clicked', $event)"
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
      </template>
    </Variant>

    <!-- ALL SIZES -->
    <Variant title="Sizes">
      <div class="flex items-end gap-4 flex-wrap">
        <Button size="sm" color="primary">Small</Button>
        <Button size="md" color="primary">Medium</Button>
        <Button size="lg" color="primary">Large</Button>
      </div>
      <div class="flex items-end gap-4 flex-wrap mt-6">
        <Button size="sm" color="primary" is-icon-only>
          <Icon icon="lucide:search" class="w-4 h-4" />
        </Button>
        <Button size="md" color="primary" is-icon-only>
          <Icon icon="lucide:search" class="w-5 h-5" />
        </Button>
        <Button size="lg" color="primary" is-icon-only>
          <Icon icon="lucide:search" class="w-6 h-6" />
        </Button>
      </div>
    </Variant>

    <!-- ALL VARIANTS -->
    <Variant title="Variants - Solid">
      <div class="flex gap-2 flex-wrap">
        <Button variant="solid" color="default">Default</Button>
        <Button variant="solid" color="primary">Primary</Button>
        <Button variant="solid" color="secondary">Secondary</Button>
        <Button variant="solid" color="success">Success</Button>
        <Button variant="solid" color="warning">Warning</Button>
        <Button variant="solid" color="danger">Danger</Button>
      </div>
    </Variant>

    <Variant title="Variants - Bordered">
      <div class="flex gap-2 flex-wrap">
        <Button variant="bordered" color="default">Default</Button>
        <Button variant="bordered" color="primary">Primary</Button>
        <Button variant="bordered" color="secondary">Secondary</Button>
        <Button variant="bordered" color="success">Success</Button>
        <Button variant="bordered" color="warning">Warning</Button>
        <Button variant="bordered" color="danger">Danger</Button>
      </div>
    </Variant>

    <Variant title="Variants - Light">
      <div class="flex gap-2 flex-wrap">
        <Button variant="light" color="default">Default</Button>
        <Button variant="light" color="primary">Primary</Button>
        <Button variant="light" color="secondary">Secondary</Button>
        <Button variant="light" color="success">Success</Button>
        <Button variant="light" color="warning">Warning</Button>
        <Button variant="light" color="danger">Danger</Button>
      </div>
    </Variant>

    <Variant title="Variants - Flat">
      <div class="flex gap-2 flex-wrap">
        <Button variant="flat" color="default">Default</Button>
        <Button variant="flat" color="primary">Primary</Button>
        <Button variant="flat" color="secondary">Secondary</Button>
        <Button variant="flat" color="success">Success</Button>
        <Button variant="flat" color="warning">Warning</Button>
        <Button variant="flat" color="danger">Danger</Button>
      </div>
    </Variant>

    <Variant title="Variants - Faded">
      <div class="flex gap-2 flex-wrap">
        <Button variant="faded" color="default">Default</Button>
        <Button variant="faded" color="primary">Primary</Button>
        <Button variant="faded" color="secondary">Secondary</Button>
        <Button variant="faded" color="success">Success</Button>
        <Button variant="faded" color="warning">Warning</Button>
        <Button variant="faded" color="danger">Danger</Button>
      </div>
    </Variant>

    <Variant title="Variants - Shadow">
      <div class="flex gap-2 flex-wrap">
        <Button variant="shadow" color="default">Default</Button>
        <Button variant="shadow" color="primary">Primary</Button>
        <Button variant="shadow" color="secondary">Secondary</Button>
        <Button variant="shadow" color="success">Success</Button>
        <Button variant="shadow" color="warning">Warning</Button>
        <Button variant="shadow" color="danger">Danger</Button>
      </div>
    </Variant>

    <Variant title="Variants - Ghost">
      <div class="flex gap-2 flex-wrap">
        <Button variant="ghost" color="default">Default</Button>
        <Button variant="ghost" color="primary">Primary</Button>
        <Button variant="ghost" color="secondary">Secondary</Button>
        <Button variant="ghost" color="success">Success</Button>
        <Button variant="ghost" color="warning">Warning</Button>
        <Button variant="ghost" color="danger">Danger</Button>
      </div>
    </Variant>

    <!-- Color Test Variant -->
    <Variant title="Theme Colors Test">
      <div class="flex flex-col gap-4">
        <!-- Test if colors exist -->
        <div class="bg-primary text-primary-foreground p-4 rounded">
          Primary - Should be blue background
        </div>
        <div class="bg-secondary text-secondary-foreground p-4 rounded">
          Secondary - Should have secondary color
        </div>
        <div class="bg-success text-success-foreground p-4 rounded">
          Success - Should be green background
        </div>
        <div class="bg-warning text-warning-foreground p-4 rounded">
          Warning - Should be yellow/orange background
        </div>
        <div class="bg-danger text-danger-foreground p-4 rounded">
          Danger - Should be red background
        </div>
        <div class="bg-default text-default-foreground p-4 rounded">
          Default - Should have default color
        </div>
        <div
          class="bg-transparent border-2 border-secondary p-6 rounded-lg text-secondary font-medium"
        >
          Secondary - Should have transparent background with secondary border
        </div>
      </div>
    </Variant>

    <!-- Separate variants for static demos -->
    <Variant title="Primary">
      <Button color="primary" variant="solid"> Primary Button </Button>
    </Variant>
    <Variant title="Bordered">
      <Button color="primary" variant="bordered"> Bordered Button </Button>
    </Variant>
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
    <Variant title="Icon Only">
      <Button is-icon-only color="primary">
        <Icon icon="lucide:headphones" class="w-5 h-5" />
      </Button>
    </Variant>
    <Variant title="Gradient (Custom)">
      <Button
        radius="full"
        class="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      >
        Gradient Button
      </Button>
    </Variant>
    <Variant title="All Colors">
      <div class="flex gap-2 flex-wrap">
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
      </div>
    </Variant>
  </Story>
</template>
