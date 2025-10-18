<template>
    <Card>
        <h3 class="mb-4 text-lg font-semibold">My Songbooks</h3>

        <div class="flex items-center gap-2 font-bold">
            <CheckIcon class="size-5 text-green-500" />
            Belongs to
        </div>
        <ul class="divide-y divide-gray-200">
            <li
                v-for="songbook in song.songbooks?.sort((a, b) => a.id - b.id)"
                class="flex cursor-pointer justify-between p-2 hover:shadow-lg"
                @click="removeFromSongbook(songbook)"
            >
                {{ songbook.title }}
            </li>
        </ul>

        <div class="mt-4 flex items-center gap-2 font-bold">
            <XIcon class="size-5 text-red-500" />
            Missing from
        </div>
        <ul class="divide-y divide-gray-200">
            <li
                v-for="songbook in songbooksWithoutSong.sort(
                    (a, b) => a.id - b.id,
                )"
                class="flex cursor-pointer justify-between p-2 hover:shadow-lg"
                @click="addToSongbook(songbook)"
            >
                {{ songbook.title }}
            </li>
        </ul>
        <!-- <ul class="divide-y divide-gray-200">
            <SongbookListItem
                v-for="songbook in songbooks"
                :song="song"
                :songbook="songbook"
            /> 
        </ul> -->
    </Card>
</template>

<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import { CheckIcon, XIcon } from "lucide-vue-next";
import { computed } from "vue";
import { toast } from "vue-sonner";

import Card from "@/components/Card.vue";

import type { Song, Songbook } from "@/types";

interface Props {
    song: Song;
    songbooks: Songbook[];
}

const { songbooks, song } = defineProps<Props>();

const addToSongbook = (songbook: Songbook) => {
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

const removeFromSongbook = (songbook: Songbook) => {
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

const songbookIdsWithSong = computed(
    () => new Set(song.songbooks?.map((s) => s.id)),
);

const songbooksWithoutSong = computed(() =>
    songbooks.filter((s) => !songbookIdsWithSong.value.has(s.id)),
);
</script>
