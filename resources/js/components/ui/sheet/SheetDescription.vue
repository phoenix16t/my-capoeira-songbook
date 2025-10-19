<script setup lang="ts">
import { cn } from "@/lib/utils";
import { reactiveOmit } from "@vueuse/core";
import { DialogDescription } from "reka-ui";

const props = defineProps();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
    <DialogDescription
        :class="cn('text-muted-foreground text-sm', props.class)"
        v-bind="delegatedProps"
    >
        <slot />
    </DialogDescription>
</template>
