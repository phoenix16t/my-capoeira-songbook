<template>
    <div class="overflow-auto">
        <SubHeader title="Songs">
            <Menu v-model:showTitlesOnly="showTitlesOnly" />
        </SubHeader>

        <div class="px-8 pt-4 pb-1">
            <Card v-if="showTitlesOnly" class="grid grid-cols-3 gap-4">
                <Link
                    v-for="song in songs"
                    :href="route('songs.show', song.id)"
                >
                    {{ song.titles?.[0]?.title }}
                </Link>
            </Card>

            <div v-else class="grid grid-cols-3 gap-4">
                <div class="flex flex-col gap-4">
                    <Lyrics :song="songs[0]!" />
                    <Lyrics :song="songs[3]!" />
                    <Lyrics :song="songs[6]!" />
                </div>
                <div class="flex flex-col gap-4">
                    <Lyrics :song="songs[1]!" />
                    <Lyrics :song="songs[4]!" />
                    <Lyrics :song="songs[7]!" />
                </div>
                <div class="flex flex-col gap-4">
                    <Lyrics :song="songs[2]!" />
                    <Lyrics :song="songs[5]!" />
                    <Lyrics :song="songs[8]!" />
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

defineProps<Props>();

const showTitlesOnly = ref(true);
</script>
