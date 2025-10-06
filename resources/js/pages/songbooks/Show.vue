<template>
    <div class="flex gap-4">
        <h1 class="text-3xl">{{ songbook.title }}</h1>
    </div>

    <template v-if="songbook.songs.length">
        <div v-for="(song, i) in songbook.songs" class="flex flex-col gap-8">
            <hr v-if="i !== 0" />

            <Lyrics :song="song" />
        </div>
    </template>
    <span v-else>You don't have any songs in this songbook yet!</span>
</template>

<script setup lang="ts">
import Lyrics from "@/components/Lyrics.vue";

import type { Songbook } from "./types";

interface Props {
    songbook: Songbook;
}

defineProps<Props>();
</script>
