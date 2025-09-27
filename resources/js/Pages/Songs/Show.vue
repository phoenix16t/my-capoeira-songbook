<template>
    <div>
        Titles:
        <div v-for="titleData in song.titles">
            {{ titleData.title }}
        </div>
    </div>

    <div class="mt-4">
        Song:
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
