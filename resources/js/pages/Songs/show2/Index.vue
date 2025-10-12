<template>
    <div class="overflow-auto">
        <header
            class="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm"
        >
            <h2 class="text-xl font-semibold">Song Details</h2>
            <Menu v-model:showDetails="showDetails" />
        </header>

        <!-- <button @click="showDetails = !showDetails">lskdjf</button> -->

        <div class="flex px-8 py-4 duration-300 ease-in-out">
            <section class="w-1/2 flex-grow pb-1 duration-300 ease-in-out">
                <Card>
                    <h3 class="mb-4 text-2xl font-bold">
                        {{ song.titles[0]?.title }}
                    </h3>

                    <Lyrics :song="song" />
                </Card>
            </section>

            <aside
                class="relative overflow-hidden pb-1 duration-300 ease-in-out"
                :class="
                    showDetails
                        ? 'ml-8 max-w-md min-w-md'
                        : 'ml-0 max-w-0 min-w-0'
                "
            >
                <Details :song="song" />
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
import Default2Layout from "@/layouts/Default2.vue";
import type { Song } from "@/types";
import { ref } from "vue";

import Card from "@/components/Card.vue";
import Lyrics from "@/components/Lyrics.vue";

import Details from "./partials/Details.vue";
import Menu from "./partials/Menu.vue";

defineOptions({ layout: Default2Layout });

interface Props {
    song: Song;
}

defineProps<Props>();

const showDetails = ref(true);
</script>
