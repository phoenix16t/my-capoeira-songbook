<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core";
import { X } from "lucide-vue-next";
import {
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    useForwardPropsEmits,
} from "reka-ui";
import type { HTMLAttributes } from "vue";

import { cn } from "@/lib/utils";

import type { SheetVariants } from ".";
import { sheetVariants } from ".";

interface SheetContentProps {
    class?: HTMLAttributes["class"];
    side?: SheetVariants["side"];
}

defineOptions({
    inheritAttrs: false,
});

const props = defineProps<SheetContentProps>();

const emits = defineEmits();

const delegatedProps = reactiveOmit(props, "class", "side");

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <DialogPortal>
        <DialogOverlay
            class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
        />
        <DialogContent
            :class="cn(sheetVariants({ side }), props.class)"
            v-bind="{ ...forwarded, ...$attrs }"
        >
            <slot />

            <DialogClose
                class="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
            >
                <X class="h-4 w-4" />
            </DialogClose>
        </DialogContent>
    </DialogPortal>
</template>
