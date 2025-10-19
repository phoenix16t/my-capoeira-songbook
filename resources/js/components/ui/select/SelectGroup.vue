<script setup lang="ts">
import { cn } from "@/lib/utils";
import { reactiveOmit } from "@vueuse/core";
import { SelectGroup } from "reka-ui";

const props = defineProps();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
    <SelectGroup :class="cn('w-full p-1', props.class)" v-bind="delegatedProps">
        <slot />
    </SelectGroup>
</template>
