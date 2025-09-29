<template>
    <h1 class="text-3xl">{{ song.titles[0]?.title }}</h1>

    <div v-if="song.titles.slice(1)">
        Other names:
        <div v-for="titleData in song.titles.slice(1)">
            {{ titleData.title }}
        </div>
    </div>

    <div>
        Lyrics:
        <template v-for="line in lines">
            <div :class="{ 'font-bold': line.includes('(coro)') }">
                {{ line.replaceAll("(coro)", "") }}
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { Song } from "./types";

interface Props {
    song: Song;
}

const props = defineProps<Props>();

const lines = computed(() => props.song.lyrics.split("\n"));
</script>
