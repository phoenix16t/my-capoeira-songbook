<script setup lang="ts">
import { cn } from "@/lib/utils";
import { reactiveOmit } from "@vueuse/core";
import { SelectSeparator } from "reka-ui";

const props = defineProps();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
    <SelectSeparator
        v-bind="delegatedProps"
        :class="cn('bg-muted -mx-1 my-1 h-px', props.class)"
    />
</template>
