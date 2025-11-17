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
                <QuickSearch
                    v-if="!isSmallerThan('sm')"
                    v-model:searchQuery="searchQuery"
                />
            </template>

            <template #mobile-search>
                <SearchDialog
                    v-if="isSmallerThan('sm')"
                    v-model:searchQuery="searchQuery"
                />
            </template>

            <template #menu>
                <ChangePageSettings header="Songbook Settings">
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
                            variant="outline"
                        >
                            Create a Songbook
                        </CreateSongbookDialog>

                        <EditSongbookDialog
                            v-if="page.props.isAuthenticated"
                            :songbook="songbook"
                            variant="outline"
                        >
                            Edit Songbook
                        </EditSongbookDialog>

                        <DeleteSongbook :songbook="songbook" />
                    </template>
                </ChangePageSettings>
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
import { usePage } from "@inertiajs/vue3";
import { ref, watchEffect } from "vue";

import Card from "@/components/Card.vue";
import DeleteSongbook from "@/components/DeleteSongbook.vue";
import SongList from "@/components/SongList.vue";
import SongbookIcon from "@/components/SongbookIcon.vue";
import SubHeader from "@/components/SubHeader.vue";
import CreateSongbookDialog from "@/components/dialogs/CreateSongbookDialog.vue";
import EditSongbookDialog from "@/components/dialogs/EditSongbookDialog.vue";
import SearchDialog from "@/components/dialogs/SearchDialog.vue";
import SonglistChangeColumnCount from "@/components/inputs/SonglistChangeColumnCount.vue";
import SonglistToggleFullLyrics from "@/components/inputs/SonglistToggleFullLyrics.vue";
import SonglistToggleIcons from "@/components/inputs/SonglistToggleIcons.vue";
import ChangePageSettings from "@/components/page-menu/ChangePageSettings.vue";
import MenuSearch from "@/components/search/MenuSearch.vue";
import QuickSearch from "@/components/search/QuickSearch.vue";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useSongFilter } from "@/hooks/useSongFilter";

import type { Song, Songbook } from "@/types";

interface Props {
    songbook: Songbook;
    songbooks: Songbook[];
}
const props = defineProps<Props>();

const searchQuery = ref<string>("");
const songsRef = ref<Song[]>(props.songbook.songs);

const page = usePage();
const { isSmallerThan } = useBreakpoint();
const { filteredSongs } = useSongFilter(songsRef, searchQuery);

watchEffect(() => {
    songsRef.value = props.songbook.songs;
});
</script>
