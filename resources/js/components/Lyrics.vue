<template>
    <Card>
        <h3 class="mb-4 text-lg font-semibold">
            <Link
                v-if="route().current() !== 'songs.show'"
                :href="route('songs.show', song.id)"
                class="hover:underline"
            >
                {{ song.titles[0]?.title }}
            </Link>
            <template v-else> {{ song.titles[0]?.title }}</template>
        </h3>

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
    </Card>
</template>

<script setup lang="ts">
import type { Song } from "@/types";
import { Link } from "@inertiajs/vue3";
import { computed } from "vue";
import { route } from "ziggy-js";

import Card from "@/components/Card.vue";

interface Props {
    showInlineTranslation?: boolean;
    song: Song;
}

const props = defineProps<Props>();

const lyrics = computed(() => props.song.lyrics.split("\n"));
const translation = computed(() => props.song.translation.split("\n"));
</script>
