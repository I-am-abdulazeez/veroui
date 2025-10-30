<script lang="ts" setup>
import { useMeasure } from "@veroui/composables";
import { m, LazyMotion, domAnimation } from "motion-v";
import { ComponentInstance } from "vue";

const props = defineProps();
const parent = defineModel("parent");
const { elementRef, dimensions } = useMeasure();
</script>

<template>
    <LazyMotion :features="domAnimation as unknown as ComponentInstance<typeof LazyMotion>['$props']['features']">
        <m.div
            ref="parent"
            :animate="{
                width: dimensions.width && dimensions?.width > 0 ? dimensions.width : 'auto',
                height: dimensions.height && dimensions.height > 0 ? dimensions.height : 'auto',
            }"
        >
            <div ref="elementRef" v-bind="{ ...props } as {}">
                <slot />
            </div>
        </m.div>
    </LazyMotion>
</template>

<style scoped></style>
