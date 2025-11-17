<template>
    <div class="flex flex-row items-baseline items-center">
        <SearchIcon class="mr-2 size-5" />
        <SearchInput v-model="searchQuery" />
    </div>
</template>

<script setup lang="ts">
import { SearchIcon } from "lucide-vue-next";

import SearchInput from "@/components/search/SearchInput.vue";

const searchQuery = defineModel<string>("searchQuery", { default: "" });
</script>
