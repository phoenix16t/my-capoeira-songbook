<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title> Song List </template>

            <template #new_search>
                <NewSearch
                    v-model:searchQuery="searchQuery"
                    class="max-w-sm"
                    :count="filteredSongs.length"
                />
            </template>

            <template #menu>
                <ChangePageSettings header="Song List Settings">
                    <template #menu>
                        <SonglistToggleFullLyrics />
                        <SonglistToggleIcons />
                        <SonglistChangeColumnCount />

                        <MenuSearch v-model:searchQuery="searchQuery">
                            <h3 class="text-lg">Search Songs</h3>
                        </MenuSearch>
                    </template>

                    <template #actions>
                        <CreateSongbookDialog
                            v-if="page.props.isAuthenticated"
                            key="create-songbook"
                            variant="outline"
                        >
                            Create a Songbook
                        </CreateSongbookDialog>
                    </template>
                </ChangePageSettings>
            </template>
        </SubHeader>

        <div class="px-8 py-4">
            <SongList :songs="filteredSongs" :songbooks="songbooks" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePage } from "@inertiajs/vue3";
import { ref, watchEffect } from "vue";

import SongList from "@/components/SongList.vue";
import SubHeader from "@/components/SubHeader.vue";
import CreateSongbookDialog from "@/components/dialogs/CreateSongbookDialog.vue";
import SearchDialog from "@/components/dialogs/SearchDialog.vue";
import ChangePageSettings from "@/components/page-menu/ChangePageSettings.vue";
import MenuSearch from "@/components/search/MenuSearch.vue";
import NewSearch from "@/components/search/NewSearch.vue";
import QuickSearch from "@/components/search/QuickSearch.vue";
import SonglistChangeColumnCount from "@/components/settings/SonglistChangeColumnCount.vue";
import SonglistToggleFullLyrics from "@/components/settings/SonglistToggleFullLyrics.vue";
import SonglistToggleIcons from "@/components/settings/SonglistToggleIcons.vue";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useSongFilter } from "@/hooks/useSongFilter";

import type { Song, Songbook } from "@/types";

interface Props {
    songs: Song[];
    songbooks: Songbook[];
}
const props = defineProps<Props>();

const page = usePage();

const searchQuery = ref<string>("");
const songsRef = ref<Song[]>(props.songs);

const { isSmallerThan } = useBreakpoint();
const { filteredSongs } = useSongFilter(songsRef, searchQuery);

watchEffect(() => {
    songsRef.value = props.songs;
});
</script>
