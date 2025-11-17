<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title> Song List </template>

            <template #search>
                <SongSearch
                    v-if="!isSmallerThan('sm')"
                    v-model:searchQuery="searchQuery"
                    cls="flex-row items-center"
                >
                    <template #header>
                        <SearchIcon class="mr-2 size-5" />
                    </template>
                </SongSearch>
            </template>

            <template #mobile-search>
                <SearchDialog
                    v-if="isSmallerThan('sm')"
                    v-model:searchQuery="searchQuery"
                />
            </template>

            <template #menu>
                <ChangePageSettings header="Song List Settings">
                    <template #menu>
                        <SonglistToggleFullLyrics />
                        <SonglistToggleIcons />
                        <SonglistChangeColumnCount />

                        <SongSearch v-model:searchQuery="searchQuery">
                            <template #header>
                                <h3 class="text-lg">Search Songs</h3>
                                <Button
                                    variant="smallLink"
                                    size="icon"
                                    class="ml-2"
                                    @click="searchQuery = ''"
                                >
                                    Clear
                                </Button>
                            </template>
                        </SongSearch>
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
import { SearchIcon } from "lucide-vue-next";
import { ref, watchEffect } from "vue";

import SongList from "@/components/SongList.vue";
import SubHeader from "@/components/SubHeader.vue";
import CreateSongbookDialog from "@/components/dialogs/CreateSongbookDialog.vue";
import SearchDialog from "@/components/dialogs/SearchDialog.vue";
import SonglistChangeColumnCount from "@/components/inputs/SonglistChangeColumnCount.vue";
import SonglistToggleFullLyrics from "@/components/inputs/SonglistToggleFullLyrics.vue";
import SonglistToggleIcons from "@/components/inputs/SonglistToggleIcons.vue";
import ChangePageSettings from "@/components/page-menu/ChangePageSettings.vue";
import SongSearch from "@/components/shared/SongSearch.vue";
import { Button } from "@/components/ui/button";

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
