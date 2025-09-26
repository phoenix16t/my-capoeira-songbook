<template>
    <div class="flex gap-8 flex-col">
        <h1>Welcome, {{ page.props.auth.user?.name || "Guest" }}</h1>

        <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center sm:text-start"
        >
            <div v-for="song in songs">
                <Link :href="route('songs.show', song.id)">
                    {{ song.titles[0].title }}
                </Link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Link, usePage } from "@inertiajs/vue3";
import { route } from "ziggy-js";

const props = defineProps({
    songs: {
        type: Array,
        required: true,
    },
});

const page = usePage();
</script>
