<template>
    <div class="overflow-auto">
        <SubHeader>
            <template #title>
                <component
                    v-if="songbook.icon"
                    :is="Icons[songbook.icon]"
                    class="size-5 w-8"
                    :color="songbook.color"
                />
                {{ songbook.title }}
            </template>

            <template #menu>
                <SongMenu
                    v-model:showTitlesOnly="showTitlesOnly"
                    v-model:numberOfColumns="numberOfColumns"
                />
                <!-- TODO: add ability to change icon and color -->
            </template>
        </SubHeader>

        <SongList
            v-if="songbook.songs.length"
            :numberOfColumns="numberOfColumns"
            :showTitlesOnly="showTitlesOnly"
            :songs="songbook.songs"
        />
        <div v-else class="px-8 pt-4 pb-1">
            <Card>You don't have any songs in this songbook yet!</Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Default2Layout from "@/layouts/Default2.vue";

import Card from "@/components/Card.vue";
import SongList from "@/components/SongList.vue";
import SongMenu from "@/components/SongMenu.vue";
import SubHeader from "@/components/SubHeader.vue";

import { Icons } from "@/lib/icons";

import type { Songbook } from "./types";

defineOptions({ layout: Default2Layout });

interface Props {
    songbook: Songbook;
}

defineProps<Props>();

const showTitlesOnly = ref(true);
const numberOfColumns = ref(1);
</script>
