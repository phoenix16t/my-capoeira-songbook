<template>
    <Card>
        <h3 class="mb-2 text-lg font-semibold">Translation</h3>
        <div
            v-for="line in translation"
            :class="{ 'font-bold': line.includes('(chorus)') }"
        >
            {{ line.replaceAll("(chorus)", "") }}
        </div>
    </Card>
</template>

<script setup lang="ts">
import type { Song } from "@/types";
import { computed } from "vue";

import Card from "@/components/Card.vue";

interface Props {
    shouldHighlightTitle?: boolean;
    song: Song;
}

const props = defineProps<Props>();

const translation = computed(() => props.song.translation.split("\n"));
</script>
