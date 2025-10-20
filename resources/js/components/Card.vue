<template>
    <div
        :class="
            cn(
                'rounded-2xl border bg-white p-6 whitespace-normal shadow-sm',
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";

const props = defineProps<{
    class?: string;
}>();
</script>
