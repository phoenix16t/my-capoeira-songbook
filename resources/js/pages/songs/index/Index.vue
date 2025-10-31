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
import { toast } from "vue-sonner";
import { route } from "ziggy-js";

import SongList from "@/components/SongList.vue";
import SongMenu from "@/components/SongMenu.vue";
import SubHeader from "@/components/SubHeader.vue";

import type { Permissions, Song, Songbook } from "@/types";

interface Props {
    permissions: Permissions;
    songs: Song[];
    songbooks: Songbook[];
}

const props = defineProps<Props>();

const showFullSongs = ref(props.permissions.song_list_show_full_songs);
const numberOfColumns = ref(props.permissions.song_list_columns_number);

watch(showFullSongs, (newVal, oldVal) => {
    const previous = oldVal;

    router.post(
        route("permissions.update"),
        {
            song_list_show_full_songs: newVal,
        },
        {
            onSuccess: () => {
                const text = newVal
                    ? "Showing Full Songs"
                    : "Showing Titles Only";

                toast.success(text, {
                    style: {
                        background: "#6ee7b7",
                    },
                });
            },
            onError: () => {
                showFullSongs.value = previous;
                toast.error("Error changing permission", {
                    style: {
                        background: "#e76e9e",
                    },
                });
            },
        },
    );
});

watch(numberOfColumns, (newVal, oldVal) => {
    const previous = oldVal;

    router.post(
        route("permissions.update"),
        {
            song_list_columns_number: newVal,
        },
        {
            onSuccess: () => {
                const text = `Showing ${newVal} column${newVal === 1 ? "" : "s"}`;

                toast.success(text, {
                    style: {
                        background: "#6ee7b7",
                    },
                });
            },
            onError: () => {
                numberOfColumns.value = previous;
                toast.error("Error changing setting", {
                    style: {
                        background: "#e76e9e",
                    },
                });
            },
        },
    );
});
</script>
