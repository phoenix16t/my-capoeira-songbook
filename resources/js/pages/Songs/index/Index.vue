<template>
    <div class="overflow-auto">
        <SubHeader title="Songs">
            <Menu
                v-model:showTitlesOnly="showTitlesOnly"
                v-model:numberOfColumns="numberOfColumns"
            />
        </SubHeader>

        <div class="px-8 pt-4 pb-1">
            <Card
                v-if="showTitlesOnly"
                class="grid gap-4"
                :style="`grid-template-columns: repeat(${numberOfColumns}, minmax(0, 1fr))`"
            >
                <Link
                    v-for="song in songs"
                    :href="route('songs.show', song.id)"
                >
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
    </div>
</template>

<script setup lang="ts">
import Default2Layout from "@/layouts/Default2.vue";
import type { Song } from "@/types";
import { Link } from "@inertiajs/vue3";
import { ref } from "vue";
import { route } from "ziggy-js";

import Card from "@/components/Card.vue";
import Lyrics from "@/components/Lyrics.vue";
import SubHeader from "@/components/SubHeader.vue";

import Menu from "./partials/Menu.vue";

defineOptions({ layout: Default2Layout });

interface Props {
    songs: Song[];
}

const props = defineProps<Props>();

const showTitlesOnly = ref(true);
const numberOfColumns = ref(2);

const columnSongs = (col: number) => {
    const result = [];
    for (let i = col - 1; i < props.songs.length; i += numberOfColumns.value) {
        result.push(props.songs[i]);
    }
    return result;
};
</script>
