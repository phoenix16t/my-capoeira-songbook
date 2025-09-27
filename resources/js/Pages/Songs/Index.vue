<template>
    <div class="flex gap-8 flex-col">
        <h1>Welcome, {{ page.props.auth.user?.name || "Guest" }}</h1>

        <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center sm:text-start"
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
    </div>
</template>

<script setup lang="ts">
import { Link, usePage } from "@inertiajs/vue3";
import { route } from "ziggy-js";
import type { Song } from "./types";

interface Props {
    songs: Song[];
}

defineProps<Props>();

const page = usePage();
</script>
