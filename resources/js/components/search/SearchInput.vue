<template>
    <Input
        v-model="searchQuery"
        class="rounded border"
        type="text"
        data-testid="search"
    />
</template>

<script setup lang="ts">
import Input from "@/components/ui/input/Input.vue";

const searchQuery = defineModel<string>("searchQuery", { default: "" });
</script>
