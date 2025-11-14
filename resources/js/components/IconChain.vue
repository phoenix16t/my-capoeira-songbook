<template>
    <div
        v-if="songlistShowSongbookIcons && songbooks?.length"
        class="flex flex-wrap border-t pt-2"
    >
        <template v-for="songbook in songbooks?.sort((a, b) => a.id - b.id)">
            <SongbookIcon :songbook="songbook" testTag />
        </template>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import SongbookIcon from "@/components/SongbookIcon.vue";

import { useSettingsStore } from "@/stores/useSettingsStore";

import type { Songbook } from "@/types";

interface Props {
    songbooks: Songbook[] | undefined;
}
defineProps<Props>();

const store = useSettingsStore();
const { songlistShowSongbookIcons } = storeToRefs(store);
</script>
