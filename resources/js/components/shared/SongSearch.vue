<template>
    <div :class="cn('flex flex-col', cls)">
        <div class="flex items-baseline">
            <slot name="header" />
        </div>
        <Input
            v-model="searchQuery"
            id="search"
            class="rounded border"
            type="text"
            data-testid="search"
        />
    </div>
</template>

<script setup lang="ts">
import Input from "@/components/ui/input/Input.vue";

import { cn } from "@/lib/utils";

defineProps<{
    cls?: string;
}>();

const searchQuery = defineModel<string>("searchQuery", { default: "" });
</script>
