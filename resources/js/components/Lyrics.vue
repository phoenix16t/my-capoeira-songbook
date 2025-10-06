<template>
    <div class="flex flex-col gap-4">
        <h1 v-if="shouldHighlightTitle" class="text-3xl">
            {{ song.titles[0]?.title }}
        </h1>
        <Link v-else :href="route('songs.show', song.id)">
            <h2 class="text-2xl hover:underline">
                {{ song.titles[0]?.title }}
            </h2>
        </Link>

        <div>
            <div
                v-for="line in song.lyrics.split('\n')"
                :class="{ 'font-bold': line.includes('(coro)') }"
            >
                {{ line.replaceAll("(coro)", "") }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Song } from "@/types";
import { Link } from "@inertiajs/vue3";
import { route } from "ziggy-js";

interface Props {
    shouldHighlightTitle?: boolean;
    song: Song;
}

defineProps<Props>();
</script>
