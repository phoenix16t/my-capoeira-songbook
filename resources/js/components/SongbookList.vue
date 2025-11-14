<template>
    <Card data-testid="songbook-links">
        <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold">
            <CheckIcon class="size-5 text-green-500" />
            Belongs to Songbooks
        </h3>
        <ul v-if="song.songbooks?.length" class="flex flex-col gap-2">
            <li
                v-for="songbook in song.songbooks?.sort((a, b) => a.id - b.id)"
                class="flex cursor-pointer rounded-lg border px-4 py-2 transition-all hover:shadow-lg"
                data-testid="remove-song-from-songbook-link"
                @click="removeFromSongbook(songbook)"
            >
                <div class="flex w-full items-center">
                    <SongbookIcon :songbook="songbook" />
                    <div class="flex min-w-0 flex-col">
                        <EllipsisText>
                            {{ songbook.title }}
                        </EllipsisText>

                        <div
                            v-if="
                                route().current() === 'songbooks.show' &&
                                songbook.id === Number(route().params.id)
                            "
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
                class="flex cursor-pointer items-center rounded-lg border px-4 py-2 transition-all hover:shadow-lg"
                data-testid="add-song-to-songbook-link"
                @click="addToSongbook(songbook)"
            >
                <SongbookIcon :songbook="songbook" />
                <EllipsisText>
                    {{ songbook.title }}
                </EllipsisText>
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
import EllipsisText from "@/components/EllipsisText.vue";
import SongbookIcon from "@/components/SongbookIcon.vue";

import type { Song, Songbook } from "@/types";

import { handleErrorToast, handleSuccessToast } from "@/lib/helpers";

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
    router.delete(
        route("songbooks_songs.destroy", [songbook.id, props.song.id]),
        {
            onSuccess: () => {
                handleSuccessToast(
                    `${songName} removed from ${songbook.title}`,
                );
                if (songbook.id === Number(route().params.id)) {
                    emit("close");
                }
            },
            onError: () => {
                handleErrorToast("Error removing song");
            },
        },
    );
};

const songbookIdsWithSong = computed(
    () => new Set(props.song.songbooks?.map((s) => s.id)),
);

const songbooksWithoutSong = computed(() =>
    props.songbooks.filter((s) => !songbookIdsWithSong.value.has(s.id)),
);
</script>
