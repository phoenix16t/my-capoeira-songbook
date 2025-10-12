<script setup lang="ts">
import { cn } from "@/lib/utils";
import { reactiveOmit } from "@vueuse/core";
import { DialogTitle } from "reka-ui";

const props = defineProps();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
    <DialogTitle
        :class="cn('text-foreground text-lg font-semibold', props.class)"
        v-bind="delegatedProps"
    >
        <slot />
    </DialogTitle>
</template>
