<template>
    <Card>
        <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold">
            <CheckIcon class="size-5 text-green-500" />
            Belongs to Songbooks
        </h3>
        <ul>
            <li
                v-for="songbook in song.songbooks?.sort((a, b) => a.id - b.id)"
                class="m-2 flex cursor-pointer rounded-lg border px-4 py-2 hover:shadow-lg"
                @click="removeFromSongbook(songbook)"
            >
                <component
                    v-if="songbook.icon"
                    :is="Icons[songbook.icon]"
                    class="size-5 w-8"
                    :color="songbook.color"
                />
                {{ songbook.title }}
            </li>
        </ul>
    </Card>

    <Card>
        <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold">
            <XIcon class="size-5 text-red-500" />
            Missing from Songbooks
        </h3>
        <ul>
            <li
                v-for="songbook in songbooksWithoutSong.sort(
                    (a, b) => a.id - b.id,
                )"
                class="m-2 flex cursor-pointer rounded-lg border px-4 py-2 hover:shadow-lg"
                @click="addToSongbook(songbook)"
            >
                <component
                    v-if="songbook.icon"
                    :is="Icons[songbook.icon]"
                    class="size-5 w-8"
                    :color="songbook.color"
                />
                {{ songbook.title }}
            </li>
        </ul>
    </Card>
</template>

<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import { CheckIcon, XIcon } from "lucide-vue-next";
import { computed } from "vue";
import { toast } from "vue-sonner";
import { route } from "ziggy-js";

import Card from "@/components/Card.vue";

import type { Song, Songbook } from "@/types";

import { Icons } from "@/lib/icons";

interface Props {
    song: Song;
    songbooks: Songbook[];
}

const { songbooks, song } = defineProps<Props>();

const addToSongbook = (songbook: Songbook) => {
    router.post(
        route("songbooks_songs.store"),
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
    router.delete(route("songbooks_songs.destroy"), {
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
