<template>
    <span
        :class="
            cn(
                'min-w-0 overflow-hidden text-ellipsis',
                {
                    'line-clamp-2': clamp === 2,
                    'line-clamp-3': clamp === 3,
                },
                cls,
            )
        "
    >
        <slot />
    </span>
</template>

<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Props {
    cls?: string;
    clamp?: number;
}
withDefaults(defineProps<Props>(), {
    clamp: 3,
});
</script>
