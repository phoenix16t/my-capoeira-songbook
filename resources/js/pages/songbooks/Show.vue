<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #icon>
                <SongbookIcon :songbook="songbook" />
            </template>

            <template #title>
                {{ songbook.title }}
            </template>

            <template #search>
                <SearchDialog v-model:searchQuery="searchQuery" />
            </template>

            <template #menu>
                <SonglistToggleFullLyrics />
                <SonglistToggleIcons />
                <SonglistChangeColumnCount />

                <DeleteSongbook :songbook="songbook" />
            </template>
        </SubHeader>

        <div class="px-8 py-4">
            <SongList
                v-if="songbook.songs.length"
                :songs="filteredSongs"
                :songbooks="songbooks"
            />

            <Card v-else>You don't have any songs in this songbook yet!</Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

import Card from "@/components/Card.vue";
import DeleteSongbook from "@/components/DeleteSongbook.vue";
import SongList from "@/components/SongList.vue";
import SongbookIcon from "@/components/SongbookIcon.vue";
import SubHeader from "@/components/SubHeader.vue";
import SearchDialog from "@/components/dialogs/SearchDialog.vue";
import SonglistChangeColumnCount from "@/components/inputs/SonglistChangeColumnCount.vue";
import SonglistToggleFullLyrics from "@/components/inputs/SonglistToggleFullLyrics.vue";
import SonglistToggleIcons from "@/components/inputs/SonglistToggleIcons.vue";

import { useSongFilter } from "@/hooks/useSongFilter";

import type { Song, Songbook } from "@/types";

interface Props {
    songbook: Songbook;
    songbooks: Songbook[];
}
const props = defineProps<Props>();

const searchQuery = ref<string>("");
const songsRef = ref<Song[]>(props.songbook.songs);

const { filteredSongs } = useSongFilter(songsRef, searchQuery);

watchEffect(() => {
    songsRef.value = props.songbook.songs;
});
</script>
