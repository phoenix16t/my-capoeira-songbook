<template>
    <Card>
        <h3 class="mb-4 text-lg font-semibold">{{ song.titles[0]?.title }}</h3>
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
import { computed } from "vue";

import Card from "@/components/Card.vue";

interface Props {
    showInlineTranslation?: boolean;
    song: Song;
}

const props = defineProps<Props>();

const lyrics = computed(() => props.song.lyrics.split("\n"));
const translation = computed(() => props.song.translation.split("\n"));
</script>
