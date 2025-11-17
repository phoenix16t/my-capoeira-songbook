<template>
    <div class="flex flex-col">
        <div class="flex items-baseline">
            <slot />
            <ClearButton v-model="searchQuery" />
        </div>
        <SearchInput v-model="searchQuery" />
    </div>
</template>

<script setup lang="ts">
import ClearButton from "@/components/search/ClearButton.vue";
import SearchInput from "@/components/search/SearchInput.vue";

const searchQuery = defineModel<string>("searchQuery", { default: "" });
</script>
