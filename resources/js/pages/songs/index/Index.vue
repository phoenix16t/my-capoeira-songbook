<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title> Song list </template>

            <template #menu>
                <SongMenu
                    v-model:showFullSongs="showFullSongs"
                    v-model:numberOfColumns="numberOfColumns"
                />
            </template>
        </SubHeader>

        <SongList
            :numberOfColumns="numberOfColumns"
            :showFullSongs="showFullSongs"
            :songs="songs"
            :songbooks="songbooks"
        />
    </div>
</template>

<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import { ref, watch } from "vue";
import { route } from "ziggy-js";

import SongList from "@/components/SongList.vue";
import SongMenu from "@/components/SongMenu.vue";
import SubHeader from "@/components/SubHeader.vue";

import type { Permissions, Song, Songbook } from "@/types";

import { handleErrorToast, handleSuccessToast } from "@/lib/helpers";

interface Props {
    permissions: Permissions;
    songs: Song[];
    songbooks: Songbook[];
}

const props = defineProps<Props>();

const showFullSongs = ref(props.permissions?.song_list_show_full_songs);
const numberOfColumns = ref(props.permissions?.song_list_columns_number || 2);

watch(showFullSongs, (newVal, oldVal) => {
    const previous = oldVal;
    const successText = newVal ? "Showing Full Songs" : "Showing Titles Only";

    router.post(
        route("permissions.update"),
        {
            song_list_show_full_songs: newVal,
        },
        {
            onSuccess: handleSuccessToast(successText),
            onError: () => {
                showFullSongs.value = previous;
                handleErrorToast();
            },
        },
    );
});

watch(numberOfColumns, (newVal, oldVal) => {
    const previous = oldVal;
    const successText = `Showing ${newVal} column${newVal === 1 ? "" : "s"}`;

    router.post(
        route("permissions.update"),
        {
            song_list_columns_number: newVal,
        },
        {
            onSuccess: handleSuccessToast(successText),
            onError: () => {
                numberOfColumns.value = previous;
                handleErrorToast();
            },
        },
    );
});
</script>
