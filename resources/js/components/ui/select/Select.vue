<script setup lang="ts">
import { SelectRoot, useForwardPropsEmits } from "reka-ui";

const props = defineProps();
const emits = defineEmits();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <SelectRoot v-bind="forwarded">
        <slot />
    </SelectRoot>
</template>
