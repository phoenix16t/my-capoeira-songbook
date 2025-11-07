<template>
    <div
        class="grid gap-4"
        :style="`grid-template-columns: repeat(${numberOfColumns}, minmax(0, 1fr))`"
        data-testid="column-count"
    >
        <div
            v-for="col in numberOfColumns"
            :key="col"
            class="flex flex-col gap-4"
        >
            <template v-if="!showFullSongs">
                <div v-for="song in columnSongs(col)" class="flex w-full gap-1">
                    <Link
                        :href="route('songs.show', song.id)"
                        class="w-full"
                        data-testid="song-title-link"
                    >
                        <Card :class="computedClass">
                            <div>{{ song.titles?.[0]?.title }}</div>
                            <IconChain
                                v-if="songlistShowSongbooks"
                                :songbooks="song.songbooks"
                            />
                        </Card>
                    </Link>

                    <Card
                        v-if="page.props.auth.user"
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
                    :songlistShowSongbooks="songlistShowSongbooks"
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

import IconChain from "./IconChain.vue";

interface Props {
    numberOfColumns: number;
    showFullSongs: boolean;
    songlistShowSongbooks: boolean;
    songs: Song[];
    songbooks: Songbook[];
}

const props = defineProps<Props>();

const page = usePage();

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

const computedClass = computed(() =>
    [
        "flex flex-col justify-center px-4 py-2 transition-all hover:shadow-lg",
        !!page.props.auth.user ? "rounded-r-none" : "",
    ].join(" "),
);
</script>
