<template>
    <div class="flex">
        <Input
            v-model="searchQuery"
            id="search"
            class="rounded border"
            type="text"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";

import Input from "@/components/ui/input/Input.vue";

import type { Song } from "@/types";

interface Props {
    songs: Song[];
}

const { songs } = defineProps<Props>();
const searchQuery = defineModel<string>("searchQuery");
const emit = defineEmits<{
    (e: "update:filteredSongs", filteredSongs: Song[]): void;
}>();

const getWords = (text: string): string[] =>
    text.toLowerCase().match(/\b\w+\b/g) || [];

const normalizeText = (text: string) =>
    text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

const filteredSongs = computed(() => {
    if (!searchQuery.value?.trim()) {
        return songs;
    }

    const normalizedQueryWords = getWords(searchQuery.value).map(normalizeText);

    return songs.filter((song) => {
        const beat = normalizeText(song.beat);
        const group = normalizeText(song.group?.name ?? "None");
        const lyrics = normalizeText(song.lyrics);
        const titles = song.titles.map((t) => normalizeText(t.title));
        const translation = normalizeText(song.translation);
        const type = normalizeText(song.type.name);

        return normalizedQueryWords.every(
            (queryWord) =>
                beat.includes(queryWord) ||
                group.includes(queryWord) ||
                lyrics.includes(queryWord) ||
                titles.some((title) => title.includes(queryWord)) ||
                translation.includes(queryWord) ||
                type.includes(queryWord),
        );
    });
});

watch(
    filteredSongs,
    (val) => {
        emit("update:filteredSongs", val);
    },
    { immediate: true },
);
</script>
