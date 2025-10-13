<template>
    <header
        class="flex h-15 items-center justify-between border-b bg-white px-8 py-4 shadow-sm"
    >
        <h2 class="text-xl font-semibold">{{ title }}</h2>
        <slot />
    </header>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>
