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
import { router } from "@inertiajs/vue3";
import { computed, ref, watch } from "vue";
import { route } from "ziggy-js";

import Lyrics from "@/components/Lyrics.vue";
import SongbookList from "@/components/SongbookList.vue";
import SubHeader from "@/components/SubHeader.vue";
import Translation from "@/components/Translation.vue";

import type { Permissions, Song, Songbook } from "@/types";

import { handleErrorToast, handleSuccessToast } from "@/lib/helpers";

import Details from "./partials/Details.vue";
import Links from "./partials/Links.vue";
import Menu from "./partials/Menu.vue";

interface Props {
    permissions: Permissions;
    song: Song;
    songbooks: Songbook[];
}

const props = defineProps<Props>();

const showDetails = ref(props.permissions?.song_show_details);
const showTranslation = ref(props.permissions?.song_show_translation);
const translationType = ref(props.permissions?.translation_type);
const showSongbooks = ref(props.permissions?.song_show_songbooks);

const shouldShowDataColumn = computed(
    () => showDetails.value || showSideTranslation.value || showSongbooks.value,
);
const showInlineTranslation = computed(
    () => showTranslation.value && translationType.value === "inline",
);
const showSideTranslation = computed(
    () => showTranslation.value && translationType.value === "side",
);

watch(showDetails, (newVal, oldVal) => {
    const previous = oldVal;
    const successText = newVal ? "Showing Details" : "Not Showing Details";

    router.post(
        route("permissions.update"),
        {
            song_show_details: newVal,
        },
        {
            onSuccess: handleSuccessToast(successText),
            onError: () => {
                showDetails.value = previous;
                handleErrorToast();
            },
        },
    );
});

watch(showTranslation, (newVal, oldVal) => {
    const previous = oldVal;
    const successText = `${newVal ? "" : "Not"} Showing Translations`;

    router.post(
        route("permissions.update"),
        {
            song_show_translation: newVal,
        },
        {
            onSuccess: handleSuccessToast(successText),
            onError: () => {
                showTranslation.value = previous;
                handleErrorToast();
            },
        },
    );
});

watch(translationType, (newVal, oldVal) => {
    const previous = oldVal;
    const type = newVal === "inline" ? "Inline" : "Side-By-Side";
    const successText = `Showing ${type} Translations`;

    router.post(
        route("permissions.update"),
        {
            translation_type: newVal,
        },
        {
            onSuccess: handleSuccessToast(successText),
            onError: () => {
                translationType.value = previous;
                handleErrorToast();
            },
        },
    );
});

watch(showSongbooks, (newVal, oldVal) => {
    const previous = oldVal;
    const successText = newVal ? "Showing Songbooks" : "Not Showing Songbooks";

    router.post(
        route("permissions.update"),
        {
            song_show_songbooks: newVal,
        },
        {
            onSuccess: handleSuccessToast(successText),
            onError: () => {
                showSongbooks.value = previous;
                handleErrorToast();
            },
        },
    );
});
</script>
