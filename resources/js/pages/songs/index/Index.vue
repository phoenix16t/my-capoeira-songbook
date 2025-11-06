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
                        Search
                    </h3>

                    <Input
                        v-model="searchQuery"
                        id="search"
                        class="rounded border"
                        type="text"
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
import { ref, watchEffect } from "vue";

import SongList from "@/components/SongList.vue";
import SubHeader from "@/components/SubHeader.vue";
import Input from "@/components/ui/input/Input.vue";
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
import { useSongFilter } from "@/hooks/useSongFilter";

import type { Song, Songbook } from "@/types";

interface Props {
    songs: Song[];
    songbooks: Songbook[];
}

const props = defineProps<Props>();

const searchQuery = ref<string>("");
const songsRef = ref<Song[]>(props.songs);

const { showFullSongs, numberOfColumns } = usePermissions();
const { filteredSongs } = useSongFilter(songsRef, searchQuery);

watchEffect(() => {
    songsRef.value = props.songs;
});
</script>
