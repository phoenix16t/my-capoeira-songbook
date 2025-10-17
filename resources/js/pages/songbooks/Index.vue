<template>
    <h1 class="text-3xl">My Songbooks</h1>

    <div
        class="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 sm:text-start"
    >
        <Link
            v-for="songbook in songbooks"
            :href="route('songbooks.show', songbook.id)"
        >
            <Card class="transition-all hover:shadow-lg">
                {{ songbook.title }}
            </Card>
        </Link>
    </div>
</template>

<script setup lang="ts">
import { Link } from "@inertiajs/vue3";
import { route } from "ziggy-js";

import Card from "@/components/Card.vue";

import type { Songbook } from "./types";

interface Props {
    songbooks: Songbook[];
}

defineProps<Props>();
</script>
