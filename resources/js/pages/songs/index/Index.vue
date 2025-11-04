<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title> Song list </template>

            <!-- <template #search>
                <SearchSongs :songs="songs" v-model:filtered="filteredSongs" />
            </template> -->

            <template #menu>
                <SongMenu
                    v-model:showFullSongs="showFullSongs"
                    v-model:numberOfColumns="numberOfColumns"
                >
                    <!-- v-model:searchQuery="searchQuery" -->
                    <SearchSongs
                        v-model:filtered="filteredSongs"
                        :songs="songs"
                    />
                </SongMenu>
            </template>
        </SubHeader>

        <div class="px-8 py-4">
            <!-- {{ searchQuery }} -->
            <SongList
                :numberOfColumns="numberOfColumns"
                :showFullSongs="showFullSongs"
                :songs="filteredSongs"
                :songbooks="songbooks"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import SearchSongs from "@/components/SearchSongs.vue";
import SongList from "@/components/SongList.vue";
import SongMenu from "@/components/SongMenu.vue";
import SubHeader from "@/components/SubHeader.vue";

import { usePermissions } from "@/hooks/usePermissions";

import type { Song, Songbook } from "@/types";

interface Props {
    songs: Song[];
    songbooks: Songbook[];
}

const { songs } = defineProps<Props>();

const filteredSongs = ref<Song[]>(songs);
const searchQuery = ref<string>("");

const { showFullSongs, numberOfColumns, updatePermissions } = usePermissions();

updatePermissions(showFullSongs, (val) =>
    val ? "Showing Full Songs" : "Showing Titles Only",
);

updatePermissions(
    numberOfColumns,
    (val) => `Showing ${val} column${val === 1 ? "" : "s"}`,
);
</script>
