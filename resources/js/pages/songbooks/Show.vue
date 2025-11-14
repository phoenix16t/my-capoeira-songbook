<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #icon>
                <SongbookIcon :songbook="songbook" />
            </template>

            <template #title>
                {{ songbook.title }}
            </template>

            <template #menu>
                <SongsMenu v-model:searchQuery="searchQuery" />

                <DeleteSongbook :songbook="songbook" />
                <!-- TODO: add ability to change icon and color -->
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
import SongsMenu from "@/components/SongsMenu.vue";
import SubHeader from "@/components/SubHeader.vue";

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
