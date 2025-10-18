<template>
    <li
        class="flex cursor-pointer justify-between p-2 hover:shadow-lg"
        @click="
            () =>
                doesSongbookContainSong ? removeFromSongbook() : addToSongbook()
        "
    >
        {{ songbook.title }}

        <span
            class="font-semibold"
            :class="
                doesSongbookContainSong
                    ? 'text-red-600 hover:text-red-800'
                    : 'text-green-600 hover:text-green-800'
            "
        >
            {{ doesSongbookContainSong ? "-" : "+" }}
        </span>
    </li>
</template>

<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import { computed } from "vue";
import { toast } from "vue-sonner";

import type { Song, Songbook } from "@/types";

interface Props {
    song: Song;
    songbook: Songbook;
}

const { song, songbook } = defineProps<Props>();

const addToSongbook = () => {
    router.post(
        `/songbooks_songs`,
        {
            songbook_id: songbook.id,
            song_id: song.id,
        },
        {
            onSuccess: () => {
                toast(`${song.titles[0]!.title} added to ${songbook.title}`);
            },
            onError: () => {
                toast(`Error adding song`);
            },
        },
    );
};

const removeFromSongbook = () => {
    router.delete(`/songbooks_songs`, {
        data: {
            songbook_id: songbook.id,
            song_id: song.id,
        },
        onSuccess: () => {
            toast(`${song.titles[0]!.title} removed from ${songbook.title}`);
        },
        onError: () => {
            toast(`Error removing song`);
        },
    });
};

const doesSongbookContainSong = computed(() =>
    song.songbooks?.some((s) => s.id === songbook.id),
);
</script>
