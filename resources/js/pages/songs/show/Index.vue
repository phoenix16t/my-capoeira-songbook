<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title> Song Details </template>

            <template #menu>
                <div>
                    <Label>
                        <Switch
                            v-model="showTranslation"
                            data-testid="show-translation-toggle"
                            class="setting-toggle"
                        />
                        <span v-if="showTranslation">Showing Translation</span>
                        <span v-else>Not Showing Translation</span>
                    </Label>

                    <div
                        v-if="showTranslation"
                        class="mt-2 ml-6 flex flex-col gap-2"
                    >
                        <Label>
                            <input
                                v-model="translationType"
                                type="radio"
                                value="inline"
                                data-testid="show-inline-translation"
                                class="cursor-pointer accent-blue-600"
                            />
                            <span>Inline</span>
                        </Label>
                        <Label>
                            <input
                                v-model="translationType"
                                type="radio"
                                value="side"
                                data-testid="show-side-by-side-translation"
                                class="cursor-pointer accent-blue-600"
                            />
                            <span>Side-by-side</span>
                        </Label>
                    </div>
                </div>

                <Label>
                    <Switch
                        v-model="showDetails"
                        data-testid="show-details-toggle"
                        class="setting-toggle"
                    />
                    <span v-if="showDetails">Showing Details</span>
                    <span v-else>Not Showing Details</span>
                </Label>

                <Label
                    v-if="!!page.props.auth.user"
                    class="flex items-center gap-2"
                >
                    <Switch
                        v-model="songsShowSongbooks"
                        data-testid="show-songbooks-toggle"
                        class="setting-toggle"
                    />
                    <span v-if="songsShowSongbooks">Showing Songbooks</span>
                    <span v-else>Not Showing Songbooks</span>
                </Label>
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
import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";

import Lyrics from "@/components/Lyrics.vue";
import SongbookList from "@/components/SongbookList.vue";
import SubHeader from "@/components/SubHeader.vue";
import Translation from "@/components/Translation.vue";
import { Label } from "@/components/ui/label";
import Switch from "@/components/ui/switch/Switch.vue";

import { useSettings } from "@/hooks/useSettings";

import type { Settings, Song, Songbook } from "@/types";

import Details from "./partials/Details.vue";
import Links from "./partials/Links.vue";

interface Props {
    settings: Settings;
    song: Song;
    songbooks: Songbook[];
}
defineProps<Props>();

const page = usePage();
const { showDetails, songsShowSongbooks, showTranslation, translationType } =
    useSettings();

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
