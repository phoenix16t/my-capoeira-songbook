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
import SongList from "@/components/SongList.vue";
import SongMenu from "@/components/SongMenu.vue";
import SubHeader from "@/components/SubHeader.vue";

import { usePermissions } from "@/hooks/usePermissions";

import type { Song, Songbook } from "@/types";

interface Props {
    songs: Song[];
    songbooks: Songbook[];
}

defineProps<Props>();

const { showFullSongs, numberOfColumns, updatePermissions } = usePermissions();

updatePermissions(showFullSongs, (val) =>
    val ? "Showing Full Songs" : "Showing Titles Only",
);

updatePermissions(
    numberOfColumns,
    (val) => `Showing ${val} column${val === 1 ? "" : "s"}`,
);
</script>
