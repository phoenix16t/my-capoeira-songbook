<script setup lang="ts">
import { cn } from "@/lib/utils";
import { reactiveOmit } from "@vueuse/core";
import { ChevronUp } from "lucide-vue-next";
import { SelectScrollUpButton, useForwardProps } from "reka-ui";

const props = defineProps();

const delegatedProps = reactiveOmit(props, "class");

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SelectScrollUpButton
        v-bind="forwardedProps"
        :class="
            cn(
                'flex cursor-default items-center justify-center py-1',
                props.class,
            )
        "
    >
        <slot>
            <ChevronUp />
        </slot>
    </SelectScrollUpButton>
</template>
