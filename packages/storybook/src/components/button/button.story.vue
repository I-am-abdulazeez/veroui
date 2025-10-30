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
    disableRipple: true,
    disableAnimation: false,
    fullWidth: false,
    isIconOnly: false,
    spinnerPlacement: "start",
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
    <!-- 1️⃣ DEFAULT - REACTIVE DEMO -->
    <!-- ====================================================== -->
    <Variant title="Default (Button)" :init-state="initButtonState">
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
          @click="logEvent('Button clicked')"
        >
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

    <Variant title="Default (Button Group)" :init-state="initGroupState">
      <template #default="{ state }">
        <ButtonGroup
          :variant="state.variant"
          :color="state.color"
          :size="state.size"
          :radius="state.radius"
          :is-disabled="state.isDisabled"
          :full-width="state.fullWidth"
        >
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
    <!-- 2️⃣ SIZES -->
    <!-- ====================================================== -->
    <Variant title="Sizes">
      <div class="flex flex-col gap-6">
        <div class="flex gap-4 items-end flex-wrap">
          <Button size="sm" color="primary">Small</Button>
          <Button size="md" color="primary">Medium</Button>
          <Button size="lg" color="primary">Large</Button>
        </div>

        <div class="flex gap-4 items-end flex-wrap">
          <ButtonGroup size="sm">
            <Button>Small</Button>
            <Button>Group</Button>
          </ButtonGroup>
          <ButtonGroup size="md">
            <Button>Medium</Button>
            <Button>Group</Button>
          </ButtonGroup>
          <ButtonGroup size="lg">
            <Button>Large</Button>
            <Button>Group</Button>
          </ButtonGroup>
        </div>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- 3️⃣ ALL VARIANTS (BUTTON) -->
    <!-- ====================================================== -->
    <Variant title="All Variants (Button)">
      <div class="flex flex-col gap-8">
        <template
          v-for="variant in [
            'solid',
            'bordered',
            'light',
            'flat',
            'faded',
            'shadow',
            'ghost',
          ]"
          :key="variant"
        >
          <h4 class="capitalize font-medium">{{ variant }} variant</h4>
          <div class="flex flex-wrap gap-3">
            <Button
              v-for="color in [
                'default',
                'primary',
                'secondary',
                'success',
                'warning',
                'danger',
              ]"
              :key="color + variant"
              :variant="variant"
              :color="color"
              class="capitalize"
            >
              {{ color }}
            </Button>
          </div>
        </template>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- 4️⃣ ALL VARIANTS (BUTTON GROUP) -->
    <!-- ====================================================== -->
    <Variant title="All Variants (Button Group)">
      <div class="flex flex-col gap-8">
        <template
          v-for="variant in [
            'solid',
            'bordered',
            'light',
            'flat',
            'faded',
            'shadow',
            'ghost',
          ]"
          :key="variant"
        >
          <h4 class="capitalize font-medium">{{ variant }} variant</h4>
          <div class="flex flex-wrap gap-3">
            <ButtonGroup
              v-for="color in [
                'default',
                'primary',
                'secondary',
                'success',
                'warning',
                'danger',
              ]"
              :key="color + variant"
              :variant="variant"
              :color="color"
            >
              <Button>{{ color }}</Button>
              <Button>Group</Button>
            </ButtonGroup>
          </div>
        </template>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- 5️⃣ WITH ICONS -->
    <!-- ====================================================== -->
    <Variant title="With Icons">
      <div class="flex flex-col gap-4">
        <Button color="primary">
          <template #startContent>
            <Icon icon="lucide:bell" />
          </template>
          Notifications
          <template #endContent>
            <Icon icon="lucide:camera" />
          </template>
        </Button>

        <ButtonGroup color="primary">
          <Button>
            <template #startContent>
              <Icon icon="lucide:home" class="w-4 h-4" />
            </template>
            Home
          </Button>
          <Button>
            Profile
            <template #endContent>
              <Icon icon="lucide:user" class="w-4 h-4" />
            </template>
          </Button>
          <Button>
            <template #startContent>
              <Icon icon="lucide:settings" class="w-4 h-4" />
            </template>
            Settings
          </Button>
        </ButtonGroup>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- 6️⃣ STATES -->
    <!-- ====================================================== -->
    <Variant title="Disabled & Loading">
      <div class="flex flex-col gap-4">
        <Button color="danger" is-disabled>Disabled</Button>
        <Button color="primary" is-loading>Loading</Button>
        <ButtonGroup color="danger" is-disabled>
          <Button>Cannot</Button>
          <Button>Click</Button>
          <Button>These</Button>
        </ButtonGroup>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- 7️⃣ SHAPE & LAYOUT -->
    <!-- ====================================================== -->
    <Variant title="Rounded & Full Width">
      <div class="flex flex-col gap-4">
        <ButtonGroup radius="none" color="primary">
          <Button>Square</Button>
          <Button>Edges</Button>
        </ButtonGroup>
        <ButtonGroup radius="full" color="success">
          <Button>Pill</Button>
          <Button>Shape</Button>
        </ButtonGroup>
        <ButtonGroup full-width color="secondary">
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- 8️⃣ MIXED STATES -->
    <!-- ====================================================== -->
    <Variant title="Mixed States">
      <ButtonGroup color="warning">
        <Button>Active</Button>
        <Button :is-disabled="true">Disabled</Button>
        <Button>Active</Button>
      </ButtonGroup>
    </Variant>

    <!-- ====================================================== -->
    <!-- 9️⃣ THEME COLORS TEST -->
    <!-- ====================================================== -->
    <Variant title="Theme Colors Test">
      <div class="flex flex-col gap-4">
        <div class="bg-primary text-primary-foreground p-4 rounded">
          Primary
        </div>
        <div class="bg-secondary text-secondary-foreground p-4 rounded">
          Secondary
        </div>
        <div class="bg-success text-success-foreground p-4 rounded">
          Success
        </div>
        <div class="bg-warning text-warning-foreground p-4 rounded">
          Warning
        </div>
        <div class="bg-danger text-danger-foreground p-4 rounded">Danger</div>
        <div class="bg-default text-default-foreground p-4 rounded">
          Default
        </div>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- 🔟 CUSTOM -->
    <!-- ====================================================== -->
    <Variant title="Custom & Icon Only">
      <div class="flex flex-wrap gap-4 items-center">
        <Button
          radius="full"
          class="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        >
          Gradient Button
        </Button>
        <Button is-icon-only color="primary">
          <Icon icon="lucide:headphones" class="w-5 h-5" />
        </Button>
      </div>
    </Variant>
  </Story>
</template>
