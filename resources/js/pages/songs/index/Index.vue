<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title> Song list </template>

            <template #menu>
                <SongsMenu
                    v-model:numberOfColumns="numberOfColumns"
                    v-model:showFullSongs="showFullSongs"
                    v-model:songlistShowSongbooks="songlistShowSongbooks"
                    v-model:searchQuery="searchQuery"
                />
            </template>
        </SubHeader>

        <div class="px-8 py-4">
            <SongList
                :numberOfColumns="numberOfColumns"
                :showFullSongs
                :songlistShowSongbooks
                :songs="filteredSongs"
                :songbooks="songbooks"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

import SongList from "@/components/SongList.vue";
import SongsMenu from "@/components/SongsMenu.vue";
import SubHeader from "@/components/SubHeader.vue";

import { useSettings } from "@/hooks/useSettings";
import { useSongFilter } from "@/hooks/useSongFilter";

import type { Song, Songbook } from "@/types";

interface Props {
    songs: Song[];
    songbooks: Songbook[];
}
const props = defineProps<Props>();

const searchQuery = ref<string>("");
const songsRef = ref<Song[]>(props.songs);

const { showFullSongs, songlistShowSongbooks, numberOfColumns } = useSettings();
const { filteredSongs } = useSongFilter(songsRef, searchQuery);

watchEffect(() => {
    songsRef.value = props.songs;
});
</script>
