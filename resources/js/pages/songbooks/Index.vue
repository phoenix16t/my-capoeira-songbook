<template>
    <h1 class="text-3xl">My Songbooks</h1>

    <div
        class="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 sm:text-start"
    >
        <div v-for="songbook in songbooks">
            {{ songbook }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Songbook } from "./types";

interface Props {
    songbooks: Songbook[];
}

defineProps<Props>();
</script>
