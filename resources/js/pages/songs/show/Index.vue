<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title> Song Details </template>

            <template #menu>
                <ChangePageSettings header="Song Details Settings">
                    <template #menu>
                        <div>
                            <SongToggleTranslation />
                            <SongSwitchTranslationType />
                        </div>
                        <SongToggleDetails />
                        <SongToggleSongbooks />
                    </template>
                </ChangePageSettings>
            </template>
        </SubHeader>

        <div
            class="grid grid-cols-1 gap-4 px-8 py-4"
            :class="
                cn({
                    'sm:grid-cols-2': shouldShowDataColumn,
                })
            "
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
                        v-if="songsShowSongbooks"
                        :song="song"
                        :songbooks="songbooks"
                    />
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";

import Lyrics from "@/components/Lyrics.vue";
import SongbookList from "@/components/SongbookList.vue";
import SubHeader from "@/components/SubHeader.vue";
import Translation from "@/components/Translation.vue";
import ChangePageSettings from "@/components/page-menu/ChangePageSettings.vue";
import SongSwitchTranslationType from "@/components/settings/SongSwitchTranslationType.vue";
import SongToggleDetails from "@/components/settings/SongToggleDetails.vue";
import SongToggleSongbooks from "@/components/settings/SongToggleSongbooks.vue";
import SongToggleTranslation from "@/components/settings/SongToggleTranslation.vue";

import { useSettingsStore } from "@/stores/useSettingsStore";

import type { Settings, Song, Songbook } from "@/types";

import { cn } from "@/lib/utils";

import Details from "./partials/Details.vue";
import Links from "./partials/Links.vue";

interface Props {
    settings: Settings;
    song: Song;
    songbooks: Songbook[];
}
defineProps<Props>();

const store = useSettingsStore();

const { showDetails, showTranslation, songsShowSongbooks, translationType } =
    storeToRefs(store);

const shouldShowDataColumn = computed(
    () =>
        showDetails.value ||
        showSideTranslation.value ||
        songsShowSongbooks.value,
);
const showInlineTranslation = computed(
    () => showTranslation.value && translationType.value === "inline",
);
const showSideTranslation = computed(
    () => showTranslation.value && translationType.value === "side",
);
</script>
