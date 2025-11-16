<template>
    <Card data-testid="translation-container">
        <h3 class="mb-4 text-lg font-semibold">Translation</h3>
        <p
            v-for="line in translation"
            class="text-base text-gray-600 italic"
            :class="
                cn({
                    'py-2 font-bold': line.includes('(chorus)'),
                })
            "
        >
            {{ line?.replaceAll("(chorus)", "") }}
        </p>
    </Card>
</template>

<script setup lang="ts">
import { computed } from "vue";

import Card from "@/components/Card.vue";

import type { Song } from "@/types";

import { cn } from "@/lib/utils";

interface Props {
    song: Song;
}
const props = defineProps<Props>();

const translation = computed(() => props.song.translation.split("\n"));
</script>
