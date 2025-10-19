<template>
    <div class="px-8 pt-4 pb-4">
        <div
            class="grid gap-4"
            :style="`grid-template-columns: repeat(${numberOfColumns}, minmax(0, 1fr))`"
        >
            <div
                v-for="col in numberOfColumns"
                :key="col"
                class="flex flex-col gap-4"
            >
                <template v-if="showTitlesOnly">
                    <Link
                        v-for="song in columnSongs(col)"
                        :href="route('songs.show', song.id)"
                        class="flex"
                        :style="`grid-template-columns: repeat(${numberOfColumns}, minmax(0, 1fr))`"
                    >
                        <Card class="w-full transition-all hover:shadow-lg">
                            {{ song.titles?.[0]?.title }}
                        </Card>
                    </Link>
                </template>
                <template v-else>
                    <Lyrics
                        v-for="(song, index) in columnSongs(col)"
                        :key="index"
                        :song="song"
                    />
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Link } from "@inertiajs/vue3";
import { route } from "ziggy-js";

import Card from "@/components/Card.vue";
import Lyrics from "@/components/Lyrics.vue";

import type { Song } from "@/types";

interface Props {
    numberOfColumns: number;
    showTitlesOnly: boolean;
    songs: Song[];
}

const props = defineProps<Props>();

const columnSongs = (col: number) => {
    const result = [];
    for (let i = col - 1; i < props.songs.length; i += props.numberOfColumns) {
        const song = props.songs[i];
        if (song !== undefined) {
            result.push(song);
        }
    }
    return result;
};
</script>
