<template>
    <div class="flex gap-2">
        <Label for="search">Search</Label>
        <Input
            v-model="searchQuery"
            id="search"
            class="rounded border"
            type="text"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import Input from "@/components/ui/input/Input.vue";
import { Label } from "@/components/ui/label";

import type { Song } from "@/types";

interface Props {
    songs: Song[];
}

const { songs } = defineProps<Props>();

const emit = defineEmits<{
    (e: "update:filtered", filteredSongs: Song[]): void;
}>();

const searchQuery = ref("");

const getWords = (text: string): string[] =>
    text.toLowerCase().match(/\b\w+\b/g) || [];

const normalizeText = (text: string) =>
    text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

const filteredSongs = computed(() => {
    if (!searchQuery.value.trim()) {
        return songs;
    }

    const normalizedQueryWords = getWords(searchQuery.value).map(normalizeText);

    return songs.filter((song) => {
        const lyrics = normalizeText(song.lyrics);
        const translation = normalizeText(song.translation);
        const normalizedTitles = song.titles.map((t) => normalizeText(t.title));

        return normalizedQueryWords.every(
            (queryWord) =>
                lyrics.includes(queryWord) ||
                translation.includes(queryWord) ||
                normalizedTitles.some((title) => title.includes(queryWord)),
        );
    });
});

watch(
    filteredSongs,
    (val) => {
        emit("update:filtered", val);
    },
    { immediate: true },
);
</script>
