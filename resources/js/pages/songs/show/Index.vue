<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title> Song Details </template>

            <template #menu>
                <Menu
                    v-model:showDetails="showDetails"
                    v-model:showTranslation="showTranslation"
                    v-model:translationType="translationType"
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

import Lyrics from "@/components/Lyrics.vue";
import SongbookList from "@/components/SongbookList.vue";
import SubHeader from "@/components/SubHeader.vue";
import Translation from "@/components/Translation.vue";

import { usePermissionWatcher } from "@/hooks/usePermissionWatcher";

import type { Permissions, Song, Songbook } from "@/types";

import Details from "./partials/Details.vue";
import Links from "./partials/Links.vue";
import Menu from "./partials/Menu.vue";

interface Props {
    permissions: Permissions;
    song: Song;
    songbooks: Songbook[];
}

const { permissions } = defineProps<Props>();

const showDetails = ref(permissions?.song_show_details);
const showTranslation = ref(permissions?.song_show_translation);
const translationType = ref(permissions?.translation_type);
const showSongbooks = ref(permissions?.song_show_songbooks);

const shouldShowDataColumn = computed(
    () => showDetails.value || showSideTranslation.value || showSongbooks.value,
);
const showInlineTranslation = computed(
    () => showTranslation.value && translationType.value === "inline",
);
const showSideTranslation = computed(
    () => showTranslation.value && translationType.value === "side",
);

usePermissionWatcher(showDetails, "song_show_details", (val) =>
    val ? "Showing Details" : "Not Showing Details",
);

usePermissionWatcher(
    showTranslation,
    "song_show_translation",
    (val) => `${val ? "" : "Not"} Showing Translations`,
);

usePermissionWatcher(translationType, "translation_type", (val) => {
    const type = val === "inline" ? "Inline" : "Side-By-Side";
    return `Showing ${type} Translations`;
});

usePermissionWatcher(showSongbooks, "song_show_songbooks", (val) =>
    val ? "Showing Songbooks" : "Not Showing Songbooks",
);
</script>
