<template>
    <Card>
        <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold">
            <CheckIcon class="size-5 text-green-500" />
            Belongs to Songbooks
        </h3>
        <ul v-if="song.songbooks?.length" class="flex flex-col gap-2">
            <li
                v-for="songbook in song.songbooks?.sort((a, b) => a.id - b.id)"
                class="flex cursor-pointer rounded-lg border px-4 py-2 transition-all hover:shadow-lg"
                @click="removeFromSongbook(songbook)"
            >
                <div class="flex items-center">
                    <component
                        v-if="songbook.icon"
                        :is="Icons[songbook.icon]"
                        class="size-5 w-8"
                        :color="songbook.color"
                    />

                    <div class="flex flex-col">
                        {{ songbook.title }}

                        <div
                            v-if="songbook.id === Number(route().params.id)"
                            class="text-xs"
                        >
                            Current songbook
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else>No songbooks</div>
    </Card>

    <Card>
        <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold">
            <XIcon class="size-5 text-red-500" />
            Missing from Songbooks
        </h3>
        <ul v-if="songbooksWithoutSong.length" class="flex flex-col gap-2">
            <li
                v-for="songbook in songbooksWithoutSong.sort(
                    (a: Songbook, b: Songbook) => a.id - b.id,
                )"
                class="flex cursor-pointer rounded-lg border px-4 py-2 transition-all hover:shadow-lg"
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
        <div v-else>No songbooks</div>
    </Card>
</template>

<script setup lang="ts">
import { router } from "@inertiajs/vue3";
import { CheckIcon, XIcon } from "lucide-vue-next";
import { computed } from "vue";
import { route } from "ziggy-js";

import Card from "@/components/Card.vue";

import type { Song, Songbook } from "@/types";

import { handleErrorToast, handleSuccessToast } from "@/lib/helpers";
import { Icons } from "@/lib/icons";

interface Props {
    song: Song;
    songbooks: Songbook[];
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: "close"): void }>();

const addToSongbook = (songbook: Songbook) => {
    router.post(
        route("songbooks_songs.store"),
        {
            songbook_id: songbook.id,
            song_id: props.song.id,
        },
        {
            onSuccess: () => {
                handleSuccessToast(
                    `${props.song.titles[0]!.title} added to ${songbook.title}`,
                );
            },
            onError: () => {
                handleErrorToast(`Error adding song`);
            },
        },
    );
};

const removeFromSongbook = (songbook: Songbook) => {
    const songName = props.song.titles[0]?.title;

    router.delete(route("songbooks_songs.destroy"), {
        data: {
            songbook_id: songbook.id,
            song_id: props.song.id,
        },
        onSuccess: () => {
            handleSuccessToast(`${songName} removed from ${songbook.title}`);
            if (songbook.id === Number(route().params.id)) {
                emit("close");
            }
        },
        onError: () => {
            handleErrorToast(`Error removing song`);
        },
    });
};

const songbookIdsWithSong = computed(
    () => new Set(props.song.songbooks?.map((s) => s.id)),
);

const songbooksWithoutSong = computed(() =>
    props.songbooks.filter((s) => !songbookIdsWithSong.value.has(s.id)),
);
</script>
