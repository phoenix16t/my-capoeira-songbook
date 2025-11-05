<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title> Song list </template>

            <template #menu>
                <Label>
                    <Switch v-model="showFullSongs" />
                    <span v-if="!showFullSongs"> Showing Titles Only </span>
                    <span v-else>Showing Full Songs</span>
                </Label>

                <Label for="columns">
                    <NumberField
                        v-model="numberOfColumns"
                        id="columns"
                        :default-value="1"
                        :min="1"
                        :max="4"
                    >
                        <NumberFieldContent class="w-20">
                            <NumberFieldDecrement />
                            <NumberFieldInput class="shadow-none" />
                            <NumberFieldIncrement />
                        </NumberFieldContent>
                    </NumberField>
                    <span>
                        {{ numberOfColumns === 1 ? "Column" : "Columns" }}
                    </span>
                </Label>

                <div class="flex flex-col">
                    <h3 class="flex items-center text-base font-semibold">
                        Universal Search
                    </h3>

                    <SearchSongs
                        v-model:searchQuery="searchQuery"
                        v-model:filteredSongs="filteredSongs"
                        :songs="songs"
                    />
                </div>
            </template>
        </SubHeader>

        <div class="px-8 py-4">
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
import SubHeader from "@/components/SubHeader.vue";
import { Label } from "@/components/ui/label";
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "@/components/ui/number-field";
import Switch from "@/components/ui/switch/Switch.vue";

import { usePermissions } from "@/hooks/usePermissions";

import type { Song, Songbook } from "@/types";

interface Props {
    songs: Song[];
    songbooks: Songbook[];
}

const { songs } = defineProps<Props>();

const filteredSongs = ref<Song[]>(songs);
const searchQuery = ref<string>("");

const { showFullSongs, numberOfColumns } = usePermissions();
</script>
