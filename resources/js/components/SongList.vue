<template>
    <div
        class="grid gap-4"
        :class="
            cn({
                'sm:grid-cols-1': numberOfColumns === 1,
                'sm:grid-cols-2': numberOfColumns === 2,
                'sm:grid-cols-3': numberOfColumns === 3,
                'sm:grid-cols-4': numberOfColumns === 4,
            })
        "
        data-testid="column-count"
    >
        <div
            v-for="col in numberOfColumns"
            :key="col"
            class="flex min-w-0 flex-col gap-4"
        >
            <template v-if="!showFullSongs">
                <div
                    v-for="song in columnSongs(col)"
                    class="flex w-full gap-1"
                    data-testid="song-title-wrapper"
                >
                    <Link
                        :href="route('songs.show', song.id)"
                        class="flex-grow overflow-hidden"
                        data-testid="song-title-link"
                    >
                        <Card
                            :class="
                                cn(
                                    'flex flex-col justify-center px-4 py-2 transition-all hover:shadow-lg',
                                    {
                                        'rounded-r-none':
                                            !!page.props.auth.user,
                                    },
                                )
                            "
                        >
                            <EllipsisText>
                                {{ song.titles?.[0]?.title }}
                            </EllipsisText>
                            <IconChain :songbooks="song.songbooks" />
                        </Card>
                    </Link>

                    <Card
                        v-if="page.props.auth.user"
                        cls="flex h-full min-w-10 max-w-10 items-center justify-center rounded-l-none p-0 transition-all hover:shadow-lg"
                    >
                        <AddToSongbooksDialog
                            cls="w-full h-full"
                            :song="song"
                            :songbooks="songbooks"
                        />
                    </Card>
                </div>
            </template>
            <template v-else>
                <Lyrics
                    v-for="(song, index) in columnSongs(col)"
                    :key="index"
                    :song="song"
                    :songbooks="songbooks"
                />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Link, usePage } from "@inertiajs/vue3";
import { storeToRefs } from "pinia";
import { route } from "ziggy-js";

import Card from "@/components/Card.vue";
import EllipsisText from "@/components/EllipsisText.vue";
import IconChain from "@/components/IconChain.vue";
import Lyrics from "@/components/Lyrics.vue";
import AddToSongbooksDialog from "@/components/dialogs/AddToSongbooksDialog.vue";

import { useSettingsStore } from "@/stores/useSettingsStore";

import type { Song, Songbook } from "@/types";

import { cn } from "@/lib/utils";

interface Props {
    songs: Song[];
    songbooks: Songbook[];
}
const props = defineProps<Props>();

const page = usePage();
const store = useSettingsStore();

const { numberOfColumns, showFullSongs } = storeToRefs(store);

const columnSongs = (col: number) => {
    const result = [];
    for (let i = col - 1; i < props.songs.length; i += numberOfColumns.value) {
        const song = props.songs[i];
        if (song !== undefined) {
            result.push(song);
        }
    }
    return result;
};
</script>
