<script setup lang="ts">
import { reactive } from "vue";
import { Button, ButtonGroup } from "@veroui/button";
import { Icon } from "@iconify/vue";
import { logEvent } from "histoire/client";

function initButtonState() {
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
  });
}

function initGroupState() {
  return reactive({
    variant: "solid",
    color: "default",
    size: "md",
    radius: "md",
    isDisabled: false,
    fullWidth: false,
  });
}
</script>

<template>
  <Story title="Components/Button" :layout="{ type: 'single', iframe: false }">
    <!-- ====================================================== -->
    <!-- PLAYGROUND - INTERACTIVE DEMO -->
    <!-- ====================================================== -->
    <Variant title="Playground (Button)" :init-state="initButtonState">
      <template #default="{ state }">
        <Button v-bind="state" @click="logEvent('Button clicked')">
          {{ state.children }}
        </Button>
      </template>

      <template #controls="{ state }">
        <HstText v-model="state.children" title="Label" />
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
        <HstCheckbox v-model="state.isDisabled" title="Disabled" />
        <HstCheckbox v-model="state.isLoading" title="Loading" />
        <HstCheckbox v-model="state.fullWidth" title="Full Width" />
        <HstCheckbox v-model="state.isIconOnly" title="Icon Only" />
      </template>
    </Variant>

    <Variant title="Playground (Button Group)" :init-state="initGroupState">
      <template #default="{ state }">
        <ButtonGroup v-bind="state">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </template>

      <template #controls="{ state }">
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
        <HstCheckbox v-model="state.isDisabled" title="Disabled" />
        <HstCheckbox v-model="state.fullWidth" title="Full Width" />
      </template>
    </Variant>

    <!-- ====================================================== -->
    <!-- COLORS -->
    <!-- ====================================================== -->
    <Variant title="Colors">
      <div class="flex flex-wrap gap-3">
        <Button color="default">Default</Button>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- VARIANTS -->
    <!-- ====================================================== -->
    <Variant title="Variants">
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-3">
          <Button variant="solid" color="primary">Solid</Button>
          <Button variant="bordered" color="primary">Bordered</Button>
          <Button variant="light" color="primary">Light</Button>
          <Button variant="flat" color="primary">Flat</Button>
        </div>
        <div class="flex flex-wrap gap-3">
          <Button variant="faded" color="primary">Faded</Button>
          <Button variant="shadow" color="primary">Shadow</Button>
          <Button variant="ghost" color="primary">Ghost</Button>
        </div>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- SIZES -->
    <!-- ====================================================== -->
    <Variant title="Sizes">
      <div class="flex gap-4 items-end flex-wrap">
        <Button size="sm" color="primary">Small</Button>
        <Button size="md" color="primary">Medium</Button>
        <Button size="lg" color="primary">Large</Button>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- RADIUS -->
    <!-- ====================================================== -->
    <Variant title="Radius">
      <div class="flex flex-wrap gap-3">
        <Button radius="none" color="primary">None</Button>
        <Button radius="sm" color="primary">Small</Button>
        <Button radius="md" color="primary">Medium</Button>
        <Button radius="lg" color="primary">Large</Button>
        <Button radius="full" color="primary">Full</Button>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- WITH ICONS -->
    <!-- ====================================================== -->
    <Variant title="With Icons">
      <div class="flex flex-wrap gap-3">
        <Button color="primary">
          <template #startContent>
            <Icon icon="lucide:bell" class="w-4 h-4" />
          </template>
          Start Icon
        </Button>
        <Button color="secondary">
          End Icon
          <template #endContent>
            <Icon icon="lucide:camera" class="w-4 h-4" />
          </template>
        </Button>
        <Button color="success">
          <template #startContent>
            <Icon icon="lucide:download" class="w-4 h-4" />
          </template>
          Both Icons
          <template #endContent>
            <Icon icon="lucide:arrow-right" class="w-4 h-4" />
          </template>
        </Button>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- ICON ONLY -->
    <!-- ====================================================== -->
    <Variant title="Icon Only">
      <div class="flex flex-wrap gap-3 items-center">
        <Button is-icon-only color="default">
          <Icon icon="lucide:heart" class="w-5 h-5" />
        </Button>
        <Button is-icon-only color="primary">
          <Icon icon="lucide:search" class="w-5 h-5" />
        </Button>
        <Button is-icon-only color="secondary">
          <Icon icon="lucide:settings" class="w-5 h-5" />
        </Button>
        <Button is-icon-only color="success" radius="full">
          <Icon icon="lucide:check" class="w-5 h-5" />
        </Button>
        <Button is-icon-only color="danger" radius="full">
          <Icon icon="lucide:x" class="w-5 h-5" />
        </Button>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- STATES -->
    <!-- ====================================================== -->
    <Variant title="Loading">
      <div class="flex flex-wrap gap-3">
        <Button color="primary" is-loading>Loading</Button>
        <Button color="secondary" is-loading spinner-placement="end">
          Loading End
        </Button>
        <Button color="success" is-loading>
          <template #startContent>
            <Icon icon="lucide:save" class="w-4 h-4" />
          </template>
          Saving
        </Button>
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="flex flex-wrap gap-3">
        <Button color="default" is-disabled>Disabled</Button>
        <Button color="primary" is-disabled>Disabled</Button>
        <Button color="danger" is-disabled>Disabled</Button>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- FULL WIDTH -->
    <!-- ====================================================== -->
    <Variant title="Full Width">
      <div class="flex flex-col gap-3">
        <Button color="primary" full-width>Full Width Button</Button>
        <Button color="secondary" full-width variant="bordered">
          Full Width Bordered
        </Button>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- CUSTOM STYLING -->
    <!-- ====================================================== -->
    <Variant title="Custom Styling">
      <div class="flex flex-wrap gap-3">
        <Button
          radius="full"
          class="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        >
          Gradient Button
        </Button>
        <Button
          radius="full"
          class="bg-gradient-to-br from-purple-500 to-blue-500 text-white"
        >
          Purple to Blue
        </Button>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- BUTTON GROUP - BASIC -->
    <!-- ====================================================== -->
    <Variant title="Button Group - Basic">
      <div class="flex flex-col gap-4">
        <ButtonGroup color="primary">
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <ButtonGroup color="secondary" variant="bordered">
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- BUTTON GROUP - SIZES -->
    <!-- ====================================================== -->
    <Variant title="Button Group - Sizes">
      <div class="flex flex-col gap-4">
        <ButtonGroup size="sm" color="primary">
          <Button>Small</Button>
          <Button>Group</Button>
        </ButtonGroup>
        <ButtonGroup size="md" color="primary">
          <Button>Medium</Button>
          <Button>Group</Button>
        </ButtonGroup>
        <ButtonGroup size="lg" color="primary">
          <Button>Large</Button>
          <Button>Group</Button>
        </ButtonGroup>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- BUTTON GROUP - WITH ICONS -->
    <!-- ====================================================== -->
    <Variant title="Button Group - With Icons">
      <ButtonGroup color="primary">
        <Button>
          <template #startContent>
            <Icon icon="lucide:home" class="w-4 h-4" />
          </template>
          Home
        </Button>
        <Button>
          <template #startContent>
            <Icon icon="lucide:user" class="w-4 h-4" />
          </template>
          Profile
        </Button>
        <Button>
          <template #startContent>
            <Icon icon="lucide:settings" class="w-4 h-4" />
          </template>
          Settings
        </Button>
      </ButtonGroup>
    </Variant>

    <!-- ====================================================== -->
    <!-- BUTTON GROUP - VARIANTS -->
    <!-- ====================================================== -->
    <Variant title="Button Group - Variants">
      <div class="flex flex-col gap-4">
        <ButtonGroup variant="solid" color="primary">
          <Button>Solid</Button>
          <Button>Group</Button>
        </ButtonGroup>
        <ButtonGroup variant="bordered" color="secondary">
          <Button>Bordered</Button>
          <Button>Group</Button>
        </ButtonGroup>
        <ButtonGroup variant="flat" color="success">
          <Button>Flat</Button>
          <Button>Group</Button>
        </ButtonGroup>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- BUTTON GROUP - STATES -->
    <!-- ====================================================== -->
    <Variant title="Button Group - States">
      <div class="flex flex-col gap-4">
        <ButtonGroup color="danger" is-disabled>
          <Button>Disabled</Button>
          <Button>Group</Button>
        </ButtonGroup>
        <ButtonGroup color="warning">
          <Button>Active</Button>
          <Button is-disabled>Disabled</Button>
          <Button>Active</Button>
        </ButtonGroup>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- BUTTON GROUP - FULL WIDTH -->
    <!-- ====================================================== -->
    <Variant title="Button Group - Full Width">
      <ButtonGroup full-width color="primary">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </Variant>
  </Story>
</template>
