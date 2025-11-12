<template>
    <div
        v-if="songlistShowSongbooks && songbooks?.length"
        class="flex flex-wrap border-t pt-2"
    >
        <template v-for="songbook in songbooks?.sort((a, b) => a.id - b.id)">
            <component
                v-if="songbook.icon"
                :is="Icons[songbook.icon]"
                class="songbook-icon size-5 w-5"
                :color="songbook.color"
                :data-testid="songbook.title"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useSettingsStore } from "@/stores/useSettingsStore";

import type { Songbook } from "@/types";

import { Icons } from "@/lib/icons";

interface Props {
    songbooks: Songbook[] | undefined;
}
defineProps<Props>();

const store = useSettingsStore();
const { songlistShowSongbooks } = storeToRefs(store);
</script>
