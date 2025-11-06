import { type Ref, computed } from "vue";

import type { Song } from "@/types.js";

export function useSongFilter(
    songs: Ref<Song[]>,
    searchQuery: Ref<string>,
): { filteredSongs: Ref<Song[]> } {
    const getWords = (text: string): string[] =>
        text.toLowerCase().match(/\b\w+\b/g) || [];

    const normalizeText = (text: string) =>
        text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

    const filteredSongs = computed(() => {
        if (!searchQuery.value?.trim()) {
            return songs.value;
        }
        const normalizedQueryWords = getWords(searchQuery.value).map(
            normalizeText,
        );

        return songs.value.filter((song) => {
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

    return { filteredSongs };
}
