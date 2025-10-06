<template>
    <div class="flex flex-col gap-8">
        <h1 v-if="shouldHighlightTitle" class="text-3xl">
            {{ song.titles[0]?.title }}
        </h1>
        <h2 v-else class="text-2xl">{{ song.titles[0]?.title }}</h2>

        <div>
            <div
                v-for="line in song.lyrics.split('\n')"
                :class="{ 'font-bold': line.includes('(coro)') }"
            >
                {{ line.replaceAll("(coro)", "") }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Song } from "@/types";

interface Props {
    shouldHighlightTitle?: boolean;
    song: Song;
}

defineProps<Props>();
</script>
