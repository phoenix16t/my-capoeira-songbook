<template>
    <h1 class="text-3xl">Songs</h1>

    <div
        class="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 sm:text-start"
    >
        <div v-for="song in songs">
            <Link :href="route('songs.show', song.id)">
                <template v-if="song.titles?.[0]?.title">
                    {{ song.titles?.[0]?.title }}
                </template>
                <span v-else class="text-red-500"> Missing title </span>
            </Link>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Song } from "@/types";
import { Link } from "@inertiajs/vue3";
import { route } from "ziggy-js";

interface Props {
    songs: Song[];
}

defineProps<Props>();
</script>
