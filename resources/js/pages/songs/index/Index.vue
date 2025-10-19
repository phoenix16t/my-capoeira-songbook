<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title> Song list </template>

            <template #menu>
                <SongMenu
                    v-model:showTitlesOnly="showTitlesOnly"
                    v-model:numberOfColumns="numberOfColumns"
                />
            </template>
        </SubHeader>

        <SongList
            :numberOfColumns="numberOfColumns"
            :showTitlesOnly="showTitlesOnly"
            :songs="songs"
            :songbooks="songbooks"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Default2Layout from "@/layouts/Default2.vue";

import SongList from "@/components/SongList.vue";
import SongMenu from "@/components/SongMenu.vue";
import SubHeader from "@/components/SubHeader.vue";

import type { Song, Songbook } from "@/types";

defineOptions({ layout: Default2Layout });

interface Props {
    songs: Song[];
    songbooks: Songbook[];
}

defineProps<Props>();

const showTitlesOnly = ref(true);
const numberOfColumns = ref(2);
</script>
