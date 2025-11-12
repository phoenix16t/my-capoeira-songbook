<template>
    <Card data-testid="lyrics-container">
        <div class="mb-4 flex items-start justify-between">
            <h3
                class="line-clamp-3 w-full overflow-hidden text-lg font-semibold text-ellipsis"
            >
                <Link
                    v-if="route().current() !== 'songs.show'"
                    :href="route('songs.show', song.id)"
                    class="hover:underline"
                    data-testid="song-full-link"
                >
                    {{ song.titles[0]?.title }}
                </Link>
                <template v-else> {{ song.titles[0]?.title }}</template>
            </h3>

            <AddToSongbooksButton
                v-if="page.props.auth.user && songbooks"
                :song="song"
                :songbooks="songbooks"
            />
        </div>

        <div
            v-for="(line, i) in lyrics"
            :class="{
                'py-2 font-bold': line.includes('(coro)'),
                'mb-2': showInlineTranslation,
            }"
        >
            <p class="text-gray-900">{{ line.replaceAll("(coro)", "") }}</p>
            <p
                v-if="showInlineTranslation"
                class="text-sm text-gray-600 italic"
            >
                {{ translation[i]?.replaceAll("(chorus)", "") }}
            </p>
        </div>

        <IconChain :songbooks="song.songbooks" />
    </Card>
</template>

<script setup lang="ts">
import { Link, usePage } from "@inertiajs/vue3";
import { computed } from "vue";
import { route } from "ziggy-js";

import AddToSongbooksButton from "@/components/AddToSongbooksButton.vue";
import Card from "@/components/Card.vue";

import type { Song, Songbook } from "@/types";

import IconChain from "./IconChain.vue";

interface Props {
    showInlineTranslation?: boolean;
    song: Song;
    songbooks?: Songbook[];
}
const props = defineProps<Props>();

const page = usePage();

const lyrics = computed(() => props.song.lyrics.split("\n"));
const translation = computed(() => props.song.translation.split("\n"));
</script>
