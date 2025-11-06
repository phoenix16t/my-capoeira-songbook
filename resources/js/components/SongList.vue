<template>
    <div
        class="grid gap-4"
        :style="`grid-template-columns: repeat(${numberOfColumns}, minmax(0, 1fr))`"
    >
        <div
            v-for="col in numberOfColumns"
            :key="col"
            class="flex flex-col gap-4"
        >
            <template v-if="!showFullSongs">
                <div v-for="song in columnSongs(col)" class="flex w-full gap-1">
                    <Link :href="route('songs.show', song.id)" class="w-full">
                        <Card :class="computedClass">
                            {{ song.titles?.[0]?.title }}
                        </Card>
                    </Link>

                    <Card
                        cls="flex h-full w-10 items-center justify-center rounded-l-none p-0 transition-all hover:shadow-lg"
                    >
                        <AddToSongbooksButton
                            cls="w-full h-full"
                            :song="song"
                            :songbooks="songbooks"
                        />
                    </Card>
                </div>
            </template>
            <template v-else>
                <Lyrics
                    v-for="(song, index) in columnSongs(col)"
                    :key="index"
                    :song="song"
                    :songbooks="songbooks"
                />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Link, usePage } from "@inertiajs/vue3";
import { computed } from "vue";
import { route } from "ziggy-js";

import AddToSongbooksButton from "@/components/AddToSongbooksButton.vue";
import Card from "@/components/Card.vue";
import Lyrics from "@/components/Lyrics.vue";

import type { Song, Songbook } from "@/types";

interface Props {
    numberOfColumns: number;
    showFullSongs: boolean;
    songs: Song[];
    songbooks: Songbook[];
}

const { numberOfColumns, showFullSongs, songs, songbooks } =
    defineProps<Props>();

const page = usePage();

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

const computedClass = computed(() =>
    [
        "flex items-center px-4 py-2 transition-all hover:shadow-lg",
        !!page.props.auth.user ? "rounded-r-none" : "",
    ].join(" "),
);
</script>
