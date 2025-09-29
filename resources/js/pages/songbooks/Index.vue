<template>
    <h1 class="text-3xl">My Songbooks</h1>

    <div
        class="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 sm:text-start"
    >
        <div v-for="songbook in songbooks">
            <Link :href="route('songbooks.show', songbook.id)">
                <template v-if="songbook.title">
                    {{ songbook.title }}
                </template>
                <span v-else class="text-red-500"> Missing title </span>
            </Link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Link } from "@inertiajs/vue3";
import { route } from "ziggy-js";

import type { Songbook } from "./types";

interface Props {
    songbooks: Songbook[];
}

defineProps<Props>();
</script>
