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
    <!-- ====================================================== -->
    <!-- PLAYGROUND - INTERACTIVE DEMO -->
    <!-- ====================================================== -->
    <Variant title="Playground" :init-state="initState">
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

    <!-- ====================================================== -->
    <!-- COLORS -->
    <!-- ====================================================== -->
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

    <!-- ====================================================== -->
    <!-- VARIANTS -->
    <!-- ====================================================== -->
    <Variant title="Variants">
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
    </Variant>

    <!-- ====================================================== -->
    <!-- SIZES -->
    <!-- ====================================================== -->
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

    <!-- ====================================================== -->
    <!-- WITH LABELS -->
    <!-- ====================================================== -->
    <Variant title="With Labels">
      <div class="flex flex-col gap-6">
        <Spinner color="primary" label="Loading..." />
        <Spinner color="secondary" label="Please wait" />
        <Spinner color="success" label="Processing..." />
        <Spinner variant="wave" color="warning" label="Syncing data" />
        <Spinner variant="dots" color="danger" label="Deleting files" />
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- REAL WORLD EXAMPLES -->
    <!-- ====================================================== -->
    <Variant title="Example: Loading Card">
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

    <Variant title="Example: Button Loading State">
      <div class="flex gap-4 flex-wrap">
        <button
          class="px-6 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 font-medium"
        >
          <Spinner size="sm" color="white" />
          <span>Processing...</span>
        </button>
        <button
          class="px-6 py-2 bg-secondary text-secondary-foreground rounded-md flex items-center gap-2 font-medium"
        >
          <Spinner size="sm" color="white" variant="dots" />
          <span>Uploading...</span>
        </button>
        <button
          class="px-6 py-2 border-2 border-primary text-primary rounded-md flex items-center gap-2 font-medium"
        >
          <Spinner size="sm" color="current" variant="simple" />
          <span>Saving...</span>
        </button>
      </div>
    </Variant>

    <Variant title="Example: Full Page Overlay">
      <div class="relative h-96 bg-default-100 rounded-lg overflow-hidden">
        <!-- Mock content -->
        <div class="p-6 space-y-4">
          <div class="h-8 bg-default-200 rounded w-1/3"></div>
          <div class="h-4 bg-default-200 rounded w-full"></div>
          <div class="h-4 bg-default-200 rounded w-5/6"></div>
        </div>

        <!-- Overlay -->
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

    <Variant title="Example: Inline Text">
      <div class="flex flex-col gap-4">
        <p class="text-sm flex items-center gap-2">
          <Spinner size="sm" color="primary" variant="simple" />
          <span>Fetching latest updates...</span>
        </p>
        <p class="text-sm flex items-center gap-2">
          <Spinner size="sm" color="success" variant="dots" />
          <span>Successfully saved your changes</span>
        </p>
        <p class="text-sm flex items-center gap-2">
          <Spinner size="sm" color="warning" variant="wave" />
          <span>Synchronizing with server...</span>
        </p>
      </div>
    </Variant>

    <!-- ====================================================== -->
    <!-- VARIANT SHOWCASE -->
    <!-- ====================================================== -->
    <Variant title="Variant Showcase: Default">
      <div class="flex flex-col items-center gap-4 p-8">
        <Spinner variant="default" color="primary" size="lg" />
        <p class="text-sm text-default-500">
          Circular spinner with rotating border
        </p>
      </div>
    </Variant>

    <Variant title="Variant Showcase: Simple">
      <div class="flex flex-col items-center gap-4 p-8">
        <Spinner variant="simple" color="primary" size="lg" />
        <p class="text-sm text-default-500">Simple rotating circle</p>
      </div>
    </Variant>

    <Variant title="Variant Showcase: Spinner (12 bars)">
      <div class="flex flex-col items-center gap-4 p-8">
        <Spinner variant="spinner" color="primary" size="lg" />
        <p class="text-sm text-default-500">Classic 12-bar spinner animation</p>
      </div>
    </Variant>

    <Variant title="Variant Showcase: Wave">
      <div class="flex flex-col items-center gap-4 p-8">
        <Spinner variant="wave" color="primary" size="lg" />
        <p class="text-sm text-default-500">Smooth wave animation</p>
      </div>
    </Variant>

    <Variant title="Variant Showcase: Dots">
      <div class="flex flex-col items-center gap-4 p-8">
        <Spinner variant="dots" color="primary" size="lg" />
        <p class="text-sm text-default-500">Bouncing dots animation</p>
      </div>
    </Variant>
  </Story>
</template>
