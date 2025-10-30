<script setup lang="ts">
import { reactive } from "vue";
import { ButtonGroup, Button } from "@veroui/button";
import { Icon } from "@iconify/vue";
import { logEvent } from "histoire/client";

function initState() {
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
  <Story
    title="Components/ButtonGroup"
    :layout="{ type: 'single', iframe: false }"
  >
    <!-- DEFAULT – REACTIVE CONTROLS -->
    <Variant title="Default" :init-state="initState">
      <template #default="{ state }">
        <ButtonGroup
          :variant="state.variant"
          :color="state.color"
          :size="state.size"
          :radius="state.radius"
          :is-disabled="state.isDisabled"
          :full-width="state.fullWidth"
        >
          <Button @click="logEvent('One clicked')">One</Button>
          <Button @click="logEvent('Two clicked')">Two</Button>
          <Button @click="logEvent('Three clicked')">Three</Button>
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

    <!-- SIZES -->
    <Variant title="Sizes">
      <div class="flex flex-col gap-6">
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
    </Variant>

    <!-- ALL VARIANTS – ONE SECTION (7 variants × 6 colors) -->
    <Variant title="All Variants">
      <div class="flex flex-col gap-6">
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
          <div class="flex flex-wrap items-center gap-3">
            <ButtonGroup
              v-for="color in [
                'default',
                'primary',
                'secondary',
                'success',
                'warning',
                'danger',
              ]"
              :key="color"
              :variant="variant"
              :color="color"
              class="capitalize"
            >
              <Button>{{ color }}</Button>
              <Button>Group</Button>
            </ButtonGroup>
          </div>
        </template>
      </div>
    </Variant>

    <!-- WITH ICONS -->
    <Variant title="With Icons">
      <ButtonGroup color="primary" size="md">
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
    </Variant>

    <Variant title="Simple Test">
      <ButtonGroup color="primary">
        <Button>Test 1</Button>
        <Button>Test 2</Button>
      </ButtonGroup>
    </Variant>

    <!-- DISABLED STATE -->
    <Variant title="Disabled">
      <ButtonGroup color="danger" is-disabled>
        <Button>Cannot</Button>
        <Button>Click</Button>
        <Button>These</Button>
      </ButtonGroup>
    </Variant>

    <!-- FULL WIDTH -->
    <Variant title="Full Width">
      <ButtonGroup full-width color="secondary">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
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

    <!-- ROUNDED CORNERS -->
    <Variant title="Rounded">
      <div class="flex flex-col gap-4">
        <ButtonGroup radius="none" color="primary">
          <Button>Square</Button>
          <Button>Edges</Button>
        </ButtonGroup>
        <ButtonGroup radius="full" color="success">
          <Button>Pill</Button>
          <Button>Shape</Button>
        </ButtonGroup>
      </div>
    </Variant>

    <!-- MIXED STATES (One disabled) -->
    <Variant title="Mixed States">
      <ButtonGroup color="warning">
        <Button>Active</Button>
        <Button :is-disabled="true">Disabled</Button>
        <Button>Active</Button>
      </ButtonGroup>
    </Variant>
  </Story>
</template>
