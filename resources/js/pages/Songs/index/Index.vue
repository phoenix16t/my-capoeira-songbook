<template>
    <div class="overflow-auto">
        <SubHeader title="Songs">
            <SongMenu
                v-model:showTitlesOnly="showTitlesOnly"
                v-model:numberOfColumns="numberOfColumns"
            />
        </SubHeader>

        <SongList
            :numberOfColumns="numberOfColumns"
            :showTitlesOnly="showTitlesOnly"
            :songs="songs"
        />
    </div>
</template>

<script setup lang="ts">
import Default2Layout from "@/layouts/Default2.vue";
import type { Song } from "@/types";
import { ref } from "vue";

import SongList from "@/components/SongList.vue";
import SongMenu from "@/components/SongMenu.vue";
import SubHeader from "@/components/SubHeader.vue";

defineOptions({ layout: Default2Layout });

interface Props {
    songs: Song[];
}

defineProps<Props>();

const showTitlesOnly = ref(true);
const numberOfColumns = ref(2);
</script>
