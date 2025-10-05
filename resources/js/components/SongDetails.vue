<template>
    <div class="flex flex-col gap-4">
        <div class="flex items-center gap-8">
            <h2 class="text-2xl">{{ song.titles[0]?.title }}</h2>

            <div
                v-if="
                    controlPanelStore.showAllTitles &&
                    song.titles.slice(1).length
                "
                class="flex items-center gap-2"
            >
                Other names:
                <div class="flex flex-col">
                    <span
                        v-for="titleData in song.titles.slice(1)"
                        class="flex flex-col"
                    >
                        {{ titleData.title }}
                    </span>
                </div>
            </div>
        </div>

        <div>
            Lyrics:
            <div v-for="line in song.lyrics.split('\n')">
                <div :class="{ 'font-bold': line.includes('(coro)') }">
                    {{ line.replaceAll("(coro)", "") }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useControlPanelStore } from "@/stores/useControlPanelStore";
import type { Song } from "@/types";

interface Props {
    song: Song;
}

defineProps<Props>();

const controlPanelStore = useControlPanelStore();
</script>
