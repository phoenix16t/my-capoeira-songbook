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
                        <Card
                            class="flex w-full items-center justify-between transition-all hover:shadow-lg"
                        >
                            {{ song.titles?.[0]?.title }}

                            <span
                                @click.stop.prevent="blah"
                                class="rounded-xl border p-2 transition-all hover:shadow-xl"
                            >
                                <AddToSongbooksButton
                                    :song="song"
                                    :songbooks="songbooks"
                                />
                            </span>
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

import type { Song, Songbook } from "@/types";

import AddToSongbooksButton from "./AddToSongbooksButton.vue";

interface Props {
    numberOfColumns: number;
    showTitlesOnly: boolean;
    songs: Song[];
    songbooks: Songbook[];
}

const { songs, numberOfColumns } = defineProps<Props>();

const blah = () => {
    console.log("blah");
};

const columnSongs = (col: number) => {
    const result = [];
    for (let i = col - 1; i < songs.length; i += numberOfColumns) {
        const song = songs[i];
        if (song !== undefined) {
            result.push(song);
        }
    }
    return result;
};
</script>
