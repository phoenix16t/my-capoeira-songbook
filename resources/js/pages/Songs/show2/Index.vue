<template>
    <div class="overflow-auto">
        <header
            class="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm"
        >
            <h2 class="text-xl font-semibold">Song Details</h2>
            <Menu
                v-model:showDetails="showDetails"
                v-model:showTranslation="showTranslation"
            />
        </header>

        <!-- <button @click="showDetails = !showDetails">lskdjf</button> -->

        <div class="flex px-8 py-4 duration-300 ease-in-out">
            <section class="w-1/2 flex-grow pb-1 duration-300 ease-in-out">
                <Lyrics :song="song" />
            </section>

            <aside
                class="relative overflow-hidden pb-1 duration-300 ease-in-out"
                :class="
                    showDetails
                        ? 'ml-8 max-w-md min-w-md'
                        : 'ml-0 max-w-0 min-w-0'
                "
            >
                <div class="flex min-w-md flex-col gap-8 whitespace-nowrap">
                    <Translation :song="song" />
                    <Details :song="song" />
                    <Links :song="song" />
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
import Default2Layout from "@/layouts/Default2.vue";
import type { Song } from "@/types";
import { ref } from "vue";

import Lyrics from "@/components/Lyrics.vue";
import Translation from "@/components/Translation.vue";

import Details from "./partials/Details.vue";
import Links from "./partials/Links.vue";
import Menu from "./partials/Menu.vue";

defineOptions({ layout: Default2Layout });

interface Props {
    song: Song;
}

defineProps<Props>();

const showDetails = ref(true);
const showTranslation = ref(false);
</script>
