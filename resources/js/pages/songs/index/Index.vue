<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title> Song list </template>

            <template #search>
                <SearchDialog v-model:searchQuery="searchQuery" />
            </template>

            <template #menu>
                <SonglistToggleFullLyrics />
                <SonglistToggleIcons />
                <SonglistChangeColumnCount />

                <SongSearch v-model:searchQuery="searchQuery">
                    <template #header>
                        <h3 class="text-lg">Search Songs</h3>
                    </template>
                </SongSearch>
            </template>
        </SubHeader>

        <div class="px-8 py-4">
            <SongList :songs="filteredSongs" :songbooks="songbooks" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

import SongList from "@/components/SongList.vue";
import SubHeader from "@/components/SubHeader.vue";
import SearchDialog from "@/components/dialogs/SearchDialog.vue";
import SonglistChangeColumnCount from "@/components/inputs/SonglistChangeColumnCount.vue";
import SonglistToggleFullLyrics from "@/components/inputs/SonglistToggleFullLyrics.vue";
import SonglistToggleIcons from "@/components/inputs/SonglistToggleIcons.vue";
import SongSearch from "@/components/shared/SongSearch.vue";

import { useSongFilter } from "@/hooks/useSongFilter";

import type { Song, Songbook } from "@/types";

interface Props {
    songs: Song[];
    songbooks: Songbook[];
}
const props = defineProps<Props>();

const searchQuery = ref<string>("");
const songsRef = ref<Song[]>(props.songs);

const { filteredSongs } = useSongFilter(songsRef, searchQuery);

watchEffect(() => {
    songsRef.value = props.songs;
});
</script>
