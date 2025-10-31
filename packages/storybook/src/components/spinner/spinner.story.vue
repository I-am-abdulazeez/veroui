<script setup lang="ts">
import { reactive } from "vue";
import { Spinner } from "@veroui/spinner";

function initState() {
  return reactive({
    label: "Loading...",
    variant: "default",
    color: "primary",
    size: "md",
  });
}
</script>

<template>
  <Story title="Components/Spinner" :layout="{ type: 'single', iframe: false }">
    <!-- Default - WITH REACTIVE STATE -->
    <Variant title="Default" :init-state="initState">
      <template #default="{ state }">
        <Spinner v-bind="state" />
      </template>

      <template #controls="{ state }">
        <HstText v-model="state.label" title="Label" />
        <HstSelect
          v-model="state.variant"
          title="Variant"
          :options="['default', 'simple', 'spinner', 'wave', 'dots']"
        />
        <HstSelect
          v-model="state.color"
          title="Color"
          :options="[
            'current',
            'white',
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
      </template>
    </Variant>

    <!-- ALL SIZES -->
    <Variant title="Sizes">
      <div class="flex items-center gap-8">
        <div class="flex flex-col items-center gap-2">
          <Spinner size="sm" color="primary" />
          <span class="text-xs text-default-500">Small</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Spinner size="md" color="primary" />
          <span class="text-xs text-default-500">Medium</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Spinner size="lg" color="primary" />
          <span class="text-xs text-default-500">Large</span>
        </div>
      </div>
    </Variant>

    <!-- ALL COLORS -->
    <Variant title="Colors">
      <div class="flex items-center gap-6 flex-wrap">
        <div class="flex flex-col items-center gap-2">
          <Spinner color="current" />
          <span class="text-xs">Current</span>
        </div>
        <div
          class="flex flex-col items-center gap-2 bg-default-900 p-4 rounded"
        >
          <Spinner color="white" />
          <span class="text-xs text-white">White</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Spinner color="default" />
          <span class="text-xs">Default</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Spinner color="primary" />
          <span class="text-xs">Primary</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Spinner color="secondary" />
          <span class="text-xs">Secondary</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Spinner color="success" />
          <span class="text-xs">Success</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Spinner color="warning" />
          <span class="text-xs">Warning</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Spinner color="danger" />
          <span class="text-xs">Danger</span>
        </div>
      </div>
    </Variant>

    <!-- ALL VARIANTS -->
    <Variant title="Variants - Default">
      <div class="flex items-center gap-6 flex-wrap">
        <Spinner variant="default" color="primary" label="Default" />
      </div>
    </Variant>

    <Variant title="Variants - Simple">
      <div class="flex items-center gap-6 flex-wrap">
        <Spinner variant="simple" color="primary" label="Simple" />
      </div>
    </Variant>

    <Variant title="Variants - Spinner (12 bars)">
      <div class="flex items-center gap-6 flex-wrap">
        <Spinner variant="spinner" color="primary" label="Spinner" />
      </div>
    </Variant>

    <Variant title="Variants - Wave">
      <div class="flex items-center gap-6 flex-wrap">
        <Spinner variant="wave" color="primary" label="Wave" />
      </div>
    </Variant>

    <Variant title="Variants - Dots">
      <div class="flex items-center gap-6 flex-wrap">
        <Spinner variant="dots" color="primary" label="Dots" />
      </div>
    </Variant>

    <!-- ALL VARIANTS COMPARISON -->
    <Variant title="All Variants Comparison">
      <div class="flex flex-col gap-8">
        <div class="flex items-center gap-8 flex-wrap">
          <div class="flex flex-col items-center gap-2">
            <Spinner variant="default" color="primary" size="lg" />
            <span class="text-xs">Default</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Spinner variant="simple" color="primary" size="lg" />
            <span class="text-xs">Simple</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Spinner variant="spinner" color="primary" size="lg" />
            <span class="text-xs">Spinner</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Spinner variant="wave" color="primary" size="lg" />
            <span class="text-xs">Wave</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <Spinner variant="dots" color="primary" size="lg" />
            <span class="text-xs">Dots</span>
          </div>
        </div>
      </div>
    </Variant>

    <!-- WITH LABELS -->
    <Variant title="With Labels">
      <div class="flex flex-col gap-6">
        <Spinner color="primary" label="Loading..." />
        <Spinner color="secondary" label="Please wait" />
        <Spinner color="success" label="Processing..." />
        <Spinner variant="wave" color="warning" label="Syncing data" />
        <Spinner variant="dots" color="danger" label="Deleting files" />
      </div>
    </Variant>

    <!-- REAL WORLD EXAMPLES -->
    <Variant title="Real World - Loading Card">
      <div class="max-w-md p-6 border border-default-200 rounded-lg">
        <div class="flex flex-col items-center justify-center gap-4 py-8">
          <Spinner size="lg" color="primary" />
          <div class="text-center">
            <h3 class="text-lg font-semibold mb-1">Loading your data</h3>
            <p class="text-sm text-default-500">This may take a few seconds</p>
          </div>
        </div>
      </div>
    </Variant>

    <Variant title="Real World - Inline Button">
      <div class="flex gap-4">
        <button
          class="px-6 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2"
        >
          <Spinner size="sm" color="white" />
          <span>Processing...</span>
        </button>
        <button
          class="px-6 py-2 bg-secondary text-secondary-foreground rounded-md flex items-center gap-2"
        >
          <Spinner size="sm" color="white" variant="dots" />
          <span>Uploading...</span>
        </button>
      </div>
    </Variant>

    <Variant title="Real World - Full Page Overlay">
      <div class="relative h-96 bg-default-100 rounded-lg overflow-hidden">
        <div
          class="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <div class="flex flex-col items-center gap-4">
            <Spinner size="lg" color="primary" variant="spinner" />
            <p class="text-sm font-medium">Loading application...</p>
          </div>
        </div>
      </div>
    </Variant>

    <!-- Color Test -->
    <Variant title="Theme Colors Test">
      <div class="flex flex-col gap-4">
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
      </div>
    </Variant>
  </Story>
</template>
