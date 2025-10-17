<template>
    <div class="px-8 pt-4 pb-1">
        <Card
            v-if="showTitlesOnly"
            class="grid gap-4"
            :style="`grid-template-columns: repeat(${numberOfColumns}, minmax(0, 1fr))`"
        >
            <Link v-for="song in songs" :href="route('songs.show', song.id)">
                {{ song.titles?.[0]?.title }}
            </Link>
        </Card>

        <div
            v-else
            class="grid gap-4"
            :style="`grid-template-columns: repeat(${numberOfColumns}, minmax(0, 1fr))`"
        >
            <div
                v-for="col in numberOfColumns"
                :key="col"
                class="flex flex-col gap-4"
            >
                <Lyrics
                    v-for="(song, index) in columnSongs(col)"
                    :key="index"
                    :song="song"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Song } from "@/types";
import { Link } from "@inertiajs/vue3";
import { ref } from "vue";
import { route } from "ziggy-js";

import Card from "@/components/Card.vue";
import Lyrics from "@/components/Lyrics.vue";

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
