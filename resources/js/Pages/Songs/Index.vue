<template>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center sm:text-start"
    >
        <div v-for="song in songs">
            <div>{{ song.titles[0].title }}</div>

            <Link :href="route('songs.show', song.id)">Users</Link>
        </div>
    </div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import { route } from "ziggy-js";

const props = defineProps({
    songs: {
        type: Array,
        required: true,
    },
});
</script>
