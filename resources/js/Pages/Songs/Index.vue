<template>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center sm:text-start"
    >
        <h1>Welcome, {{ page.props.auth.user?.name || "Guest" }}</h1>

        <a :href="route('auth.google.redirect')">Login with Google</a>
        <button @click="logout">Logout</button>

        <div v-for="song in songs">
            <Link :href="route('songs.show', song.id)">
                {{ song.titles[0].title }}
            </Link>
        </div>
    </div>
</template>

<script setup>
import { Link, router, usePage } from "@inertiajs/vue3";
import { route } from "ziggy-js";

const props = defineProps({
    songs: {
        type: Array,
        required: true,
    },
});

const page = usePage();

function logout() {
    router.post(route("logout"));
}
</script>
