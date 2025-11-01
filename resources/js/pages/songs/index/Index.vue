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
import { ref } from "vue";

import SongList from "@/components/SongList.vue";
import SongMenu from "@/components/SongMenu.vue";
import SubHeader from "@/components/SubHeader.vue";

import { usePermissionWatcher } from "@/hooks/usePermissionWatcher";

import type { Permissions, Song, Songbook } from "@/types";

interface Props {
    permissions: Permissions;
    songs: Song[];
    songbooks: Songbook[];
}

const { permissions } = defineProps<Props>();

const showFullSongs = ref(permissions?.song_list_show_full_songs);
const numberOfColumns = ref(permissions?.song_list_columns_number || 2);

usePermissionWatcher(showFullSongs, "song_list_show_full_songs", (val) =>
    val ? "Showing Full Songs" : "Showing Titles Only",
);

usePermissionWatcher(
    numberOfColumns,
    "song_list_columns_number",
    (val) => `Showing ${val} column${val === 1 ? "" : "s"}`,
);
</script>
