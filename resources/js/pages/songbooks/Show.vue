<template>
    <h1 class="text-3xl">{{ songbook.title }}</h1>

    <div v-for="song in songbook.songs" class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
            <div>
                Title(s):
                <div v-for="titleData in song.titles">
                    {{ titleData.title }}
                </div>
            </div>

            <div>
                Lyrics:
                <div v-for="line in song.lyrics.split('\n')">
                    <div :class="{ 'font-bold': line.includes('(coro)') }">
                        {{ line.replaceAll("(coro)", "") }}
                    </div>
                </div>
            </div>
        </div>

        <hr />
    </div>
</template>

<script setup lang="ts">
import type { Songbook } from "./types";

interface Props {
    songbook: Songbook;
}

defineProps<Props>();
</script>
