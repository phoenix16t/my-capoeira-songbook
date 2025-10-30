<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title> Song Details </template>

            <template #menu>
                <Menu
                    v-model:showDetails="showDetails"
                    v-model:showTranslation="showTranslation"
                    v-model:translationMode="translationMode"
                    v-model:showSongbooks="showSongbooks"
                />
            </template>
        </SubHeader>

        <div
            class="grid grid-cols-1 gap-4 px-8 py-4"
            :class="shouldShowDataColumn && 'sm:grid-cols-2'"
        >
            <section class="pb-4">
                <Lyrics :showInlineTranslation :song="song" />
            </section>

            <aside v-if="shouldShowDataColumn" class="pb-4">
                <div class="flex flex-col gap-4">
                    <Translation v-if="showSideTranslation" :song="song" />
                    <Details v-if="showDetails" :song="song" />
                    <Links
                        v-if="showDetails && song.links.length"
                        :song="song"
                    />
                    <SongbookList
                        v-if="showSongbooks"
                        :song="song"
                        :songbooks="songbooks"
                    />
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import Default2Layout from "@/layouts/Default2.vue";

import Lyrics from "@/components/Lyrics.vue";
import SongbookList from "@/components/SongbookList.vue";
import SubHeader from "@/components/SubHeader.vue";
import Translation from "@/components/Translation.vue";

import type { Song, Songbook } from "@/types";

import Details from "./partials/Details.vue";
import Links from "./partials/Links.vue";
import Menu from "./partials/Menu.vue";

defineOptions({ layout: Default2Layout });

interface Props {
    song: Song;
    songbooks: Songbook[];
}

defineProps<Props>();

const showDetails = ref(false);
const showTranslation = ref(false);
const translationMode = ref("inline");
const showSongbooks = ref(true);

const shouldShowDataColumn = computed(
    () => showDetails.value || showSideTranslation.value || showSongbooks.value,
);
const showInlineTranslation = computed(
    () => showTranslation.value && translationMode.value === "inline",
);
const showSideTranslation = computed(
    () => showTranslation.value && translationMode.value === "side",
);
</script>
