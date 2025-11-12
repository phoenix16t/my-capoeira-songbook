<template>
    <SonglistToggleFullLyrics />
    <SonglistToggleIcons />
    <SonglistChangeColumnCount />

    <div class="flex flex-col">
        <h3 class="flex items-center text-base font-semibold">Search</h3>

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
import SonglistChangeColumnCount from "@/components/inputs/SonglistChangeColumnCount.vue";
import SonglistToggleFullLyrics from "@/components/inputs/SonglistToggleFullLyrics.vue";
import SonglistToggleIcons from "@/components/inputs/SonglistToggleIcons.vue";
import Input from "@/components/ui/input/Input.vue";

const searchQuery = defineModel<string>("searchQuery", { default: "" });
</script>
