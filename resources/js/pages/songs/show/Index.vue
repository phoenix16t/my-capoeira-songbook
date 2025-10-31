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
import { router } from "@inertiajs/vue3";
import { computed, ref, watch } from "vue";
import { toast } from "vue-sonner";
import { route } from "ziggy-js";

import Lyrics from "@/components/Lyrics.vue";
import SongbookList from "@/components/SongbookList.vue";
import SubHeader from "@/components/SubHeader.vue";
import Translation from "@/components/Translation.vue";

import type { Permissions, Song, Songbook } from "@/types";

import Details from "./partials/Details.vue";
import Links from "./partials/Links.vue";
import Menu from "./partials/Menu.vue";

interface Props {
    permissions: Permissions;
    song: Song;
    songbooks: Songbook[];
}

const props = defineProps<Props>();

const showDetails = ref(props.permissions.song_show_details);
const showTranslation = ref(props.permissions.song_show_translation);
const translationMode = ref(props.permissions.translation_type);
const showSongbooks = ref(props.permissions.song_show_songbooks);

const shouldShowDataColumn = computed(
    () => showDetails.value || showSideTranslation.value || showSongbooks.value,
);
const showInlineTranslation = computed(
    () => showTranslation.value && translationMode.value === "inline",
);
const showSideTranslation = computed(
    () => showTranslation.value && translationMode.value === "side",
);

watch(showDetails, (newVal, oldVal) => {
    const previous = oldVal;

    router.post(
        route("permissions.update"),
        {
            song_show_details: newVal,
        },
        {
            onSuccess: () => {
                const text = newVal ? "Showing Details" : "Not Showing Details";

                toast.success(text, {
                    style: {
                        background: "#6ee7b7",
                    },
                });
            },
            onError: () => {
                showDetails.value = previous;
                toast.error("Error changing permission", {
                    style: {
                        background: "#e76e9e",
                    },
                });
            },
        },
    );
});

watch(showTranslation, (newVal, oldVal) => {
    const previous = oldVal;

    router.post(
        route("permissions.update"),
        {
            song_show_translation: newVal,
        },
        {
            onSuccess: () => {
                const text = newVal
                    ? "Showing Translations"
                    : "Not Showing Translations";

                toast.success(text, {
                    style: {
                        background: "#6ee7b7",
                    },
                });
            },
            onError: () => {
                showTranslation.value = previous;
                toast.error("Error changing permission", {
                    style: {
                        background: "#e76e9e",
                    },
                });
            },
        },
    );
});

watch(translationMode, (newVal, oldVal) => {
    const previous = oldVal;

    router.post(
        route("permissions.update"),
        {
            translation_type: newVal,
        },
        {
            onSuccess: () => {
                const text = newVal
                    ? "Showing Translations Inline"
                    : "Showing Translations Side-By-Side";

                toast.success(text, {
                    style: {
                        background: "#6ee7b7",
                    },
                });
            },
            onError: () => {
                translationMode.value = previous;
                toast.error("Error changing permission", {
                    style: {
                        background: "#e76e9e",
                    },
                });
            },
        },
    );
});

watch(showSongbooks, (newVal, oldVal) => {
    const previous = oldVal;

    router.post(
        route("permissions.update"),
        {
            song_show_songbooks: newVal,
        },
        {
            onSuccess: () => {
                const text = newVal
                    ? "Showing Songbooks"
                    : "Not Showing Songbooks";

                toast.success(text, {
                    style: {
                        background: "#6ee7b7",
                    },
                });
            },
            onError: () => {
                showSongbooks.value = previous;
                toast.error("Error changing permission", {
                    style: {
                        background: "#e76e9e",
                    },
                });
            },
        },
    );
});
</script>
